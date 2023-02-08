import logging
from functools import cached_property

from django.conf import settings
from django.db import transaction
from django.utils.timezone import now
from furl import furl
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied

from core.app.framework.queryset import ChunkedQuerySet
from core.app.services.payment_service import TinkoffPaymentService
from core.app.services.types import PaymentStatuses
from core.app.utils.util import setup_resource_attributes
from core.models import User, TransactionStatuses
from core.models import UserRoles
from courses.app.repositories.course_cycle_repository import CourseCycleRepository
from courses.app.repositories.course_repository import (
    CourseRepository,
    BaseCourseRepository,
)
from courses.app.repositories.lesson_enrolled_user_repository import (
    LessonEnrolledUserRepository,
)
from courses.app.repositories.lesson_repository import LessonRepository
from courses.app.repositories.ticket_repository import TicketRepository
from courses.app.repositories.transaction_repository import TicketTransactionRepository
from courses.app.services.types import CourseCreateData
from courses.app.services.types import (
    CourseUpdateData,
)
from courses.models import (
    Course,
    Lesson,
    Ticket,
    TicketTransaction,
    CoursePaymentTypes,
    CourseCycle,
    CourseSchedule,
    BaseCourse,
    CourseStatuses,
    LessonEnrolledUser,
    CourseTypes,
)


class CourseCreator:
    repos = CourseRepository()
    base_course_repos = BaseCourseRepository()
    course_cycle_repos = CourseCycleRepository()
    lesson_repos = LessonRepository()

    def __init__(self, data: CourseCreateData, user: User):
        self._data = data
        self._user = user

    def _base_course(self) -> BaseCourse:
        base_course = BaseCourse()
        base_course.name = self._data["name"]
        base_course.description = self._data["description"]
        base_course.course_type = self._data["course_type"]
        base_course.complexity = self._data["complexity"]
        base_course.level = list(self._data["level"])
        base_course.teacher = self._user
        if base_course.course_type == CourseTypes.ONLINE:
            base_course.lesson_participants_limit = self._data.get(
                "lesson_participants_limit", settings.MAX_ONLINE_PARTICIPANTS
            )
        return base_course

    def _course(self, base_course: BaseCourse) -> Course:
        course = Course()
        course.base_course = base_course
        course.link = self._data["link"]
        course.link_info = self._data["link_info"]
        course.duration = self._data["duration"]
        course.start_datetime = self._data["start_datetime"]
        course.deadline_datetime = self._data["deadline_datetime"]
        course.payment = self._data["payment"]
        course.price = self._data["price"]
        if self._data["is_draft"]:
            course.status = CourseStatuses.DRAFT
        course.schedule = [
            CourseSchedule(weekday=item["weekday"], start_time=item["start_time"])
            for item in self._data["lessons"]
        ]
        return course

    def _init_course_cycle(self, course: Course) -> CourseCycle:
        course_cycle = CourseCycle()
        course_cycle.course = course
        course_cycle.start_at = course.start_datetime
        course_cycle.end_at = course.deadline_datetime
        return course_cycle

    def _create_lessons(self, course: Course) -> None:
        if not self._data["lessons"]:
            return
        lessons_to_create = []
        possible_lessons = course.lessons_in_range(
            date_start=course.start_datetime,
            date_end=course.deadline_datetime,
        )
        if not possible_lessons:
            raise ValidationError("Undefined any lesson to create")

        for lesson_datetime in possible_lessons:
            lesson = Lesson()
            lesson.course = course
            lesson.start_at = lesson_datetime
            lessons_to_create.append(lesson)
        self.lesson_repos.bulk_create(objs=lessons_to_create)

    def _created_course(self) -> Course:
        base_course = self._base_course()
        course = self._course(base_course=base_course)
        self.base_course_repos.store(base_course=base_course)
        self.repos.store(course=course)
        return course

    def create(self) -> Course:
        if not self._user.has_role(UserRoles.TEACHER):
            raise PermissionDenied("User must be teacher for create courses")
        course = self._created_course()
        if self._data["lessons"]:
            course_cycle = self._init_course_cycle(course=course)
            self.course_cycle_repos.store(course_cycle)
        self._create_lessons(course=course)
        return course


class BaseCourseUpdator:
    repository = BaseCourseRepository()

    def __init__(self, user: User, pk: int, data: CourseUpdateData):
        self._pk = pk
        self._user = user
        self._data = data

    def update(self) -> BaseCourse:
        base_course = self.repository.find_by_id_teacher(
            id_=self._pk, teacher_id=self._user.id
        )
        if not base_course:
            raise NotFound(f"Undefined base_course with pk {self._pk}")
        setup_resource_attributes(
            instance=base_course,
            validated_data=self._data,
            fields=list(CourseUpdateData.__annotations__.keys()),
        )
        self.repository.store(base_course=base_course)
        return base_course


class FavoriteCoursesWork:
    repository = CourseRepository()

    def __init__(self, user: User, course_id: int):
        self.user = user
        self.course_id = course_id

    @cached_property
    def course(self) -> Course:
        course = self.repository.find_by_id(id_=self.course_id)
        if not course:
            raise NotFound(f"Undefined course with id {self.course_id}")
        return course

    def add(self) -> Course:
        if self.course in self.repository.find_user_favorite_courses(user=self.user):
            raise ValidationError(
                f"Course with id {self.course_id} already in favorites"
            )
        self.repository.add_user_favorite_course(user=self.user, course=self.course)
        return self.course

    def remove(self) -> Course:
        if self.course not in self.repository.find_user_favorite_courses(
            user=self.user
        ):
            raise NotFound(f"Undefined course with id {self.course_id} in favorites")
        self.repository.remove_user_favorite_course(user=self.user, course=self.course)
        return self.course


class TicketBuyConfirmError(Exception):
    pass


class TicketBuy:
    repository = TicketRepository()
    course_repository = CourseRepository()
    transaction_repository = TicketTransactionRepository()

    def ticket(self, course: Course, user: User) -> Ticket:
        ticket = self.repository.ticket_for_course(course_id=course.id, user=user)
        if not ticket:
            ticket = self._init_ticket(course=course, user=user)
            self.repository.store(ticket=ticket)
        return ticket

    def _init_ticket(self, course: Course, user: User) -> Ticket:
        ticket = Ticket()
        ticket.course = course
        ticket.user = user
        ticket.amount = 0
        return ticket

    def _init_ticket_transaction(
        self, ticket: Ticket, amount: int
    ) -> TicketTransaction:
        ticket_transaction = TicketTransaction()
        ticket_transaction.ticket = ticket
        ticket_transaction.ticket_amount = amount
        ticket_transaction.amount = ticket.course.price * amount
        ticket_transaction.user = ticket.user
        return ticket_transaction

    def buy(self, course_id: int, user: User, amount: int) -> str:
        course = self.course_repository.find_by_id(id_=course_id, raise_exception=True)
        if course.payment != CoursePaymentTypes.PAYMENT:
            raise ValidationError("The course does not require tickets")
        ticket = self.ticket(course=course, user=user)
        ticket_transaction = self._init_ticket_transaction(ticket=ticket, amount=amount)
        self.transaction_repository.store(transaction=ticket_transaction)
        pay_info = TinkoffPaymentService().init_pay(
            amount=ticket_transaction.amount,
            transaction_id=ticket_transaction.id,
            description=ticket.course.base_course.name,
            success_url=furl(url=settings.BACKEND_URL)
            .join(f"api/courses/success-payment/{ticket_transaction.id}/")
            .url,
        )
        ticket_transaction.payment_id = pay_info.PaymentId
        self.transaction_repository.store(transaction=ticket_transaction)
        return pay_info.PaymentURL

    def ticket_transaction(self, transaction_id: str) -> TicketTransaction:
        ticket_transaction = self.transaction_repository.find_by_id(id_=transaction_id)
        if not ticket_transaction:
            logging.getLogger("daily_log").error(
                f"Undefined transaction with pk {transaction_id}"
            )
            raise TicketBuyConfirmError
        return ticket_transaction

    def update_tickets_amount(self, ticket_transaction: TicketTransaction) -> None:
        with transaction.atomic():
            ticket = self.repository.find_by_id_to_update(
                id_=ticket_transaction.ticket_id, user=ticket_transaction.user
            )
            ticket.amount += ticket_transaction.ticket_amount
            self.repository.store(ticket=ticket)

    def confirm(self, transaction_id: str) -> str:
        try:
            ticket_transaction = self.ticket_transaction(transaction_id=transaction_id)
            if ticket_transaction.status != TransactionStatuses.INITIAL:
                raise TicketBuyConfirmError
            payment_status = TinkoffPaymentService().payment_status(
                payment_id=ticket_transaction.payment_id
            )
            if payment_status != PaymentStatuses.CONFIRMED:
                ticket_transaction.status = TransactionStatuses.DECLINED
                self.transaction_repository.store(transaction=ticket_transaction)
                raise TicketBuyConfirmError
            self.update_tickets_amount(ticket_transaction=ticket_transaction)
        except TicketBuyConfirmError:
            return furl(settings.SITE_URL).join("failed-payment").url
        else:
            ticket_transaction.status = TransactionStatuses.CONFIRMED
            self.transaction_repository.store(transaction=ticket_transaction)
            return furl(settings.SITE_URL).join("success-payment").url


class CourseCompletionError(Exception):
    pass


class CourseComplete:
    def __init__(self, course: Course):
        self.course = course

    def complete(self) -> None:
        if self.course.deadline_datetime.date() > now().date():
            raise CourseCompletionError(
                f"Course can complete after {self.course.deadline_datetime.date()}"
            )
        if self.course.status != CourseStatuses.PUBLISHED:
            raise CourseCompletionError(
                f"Course `{self.course.id}` must be with `{CourseStatuses.PUBLISHED}` status for completion"
            )
        self.course.status = CourseStatuses.COMPLETED
        CourseRepository().store(course=self.course)


class CourseEnroll:
    SCHEDULE_LESSON_CHUNK_SIZE = 50

    lesson_repository = LessonRepository()
    course_repository = CourseRepository()
    user_course_schedule_repository = LessonEnrolledUserRepository()

    def __init__(self, user: User, course: Course):
        self._user = user
        self._course = course

    def _register_user_course_schedule(self) -> None:
        lessons_iter = ChunkedQuerySet(
            queryset=LessonRepository().find_by_course_id(course_id=self._course.id)
        ).iter(chunk_size=self.SCHEDULE_LESSON_CHUNK_SIZE)
        enrolled_users_to_create = []
        for lesson in lessons_iter:
            enrolled_user = LessonEnrolledUser()
            enrolled_user.user = self._user
            enrolled_user.lesson = lesson
            enrolled_users_to_create.append(enrolled_user)
            if len(enrolled_users_to_create) == self.SCHEDULE_LESSON_CHUNK_SIZE:
                self.user_course_schedule_repository.bulk_create(
                    objs=enrolled_users_to_create
                )
                enrolled_users_to_create = []
        else:
            if enrolled_users_to_create:
                self.user_course_schedule_repository.bulk_create(
                    objs=enrolled_users_to_create
                )

    def enroll(self) -> None:
        if self.course_repository.already_enrolled(
            user=self._user, course=self._course
        ):
            raise ValidationError("User already enrolled")
        with transaction.atomic():
            self._register_user_course_schedule()
