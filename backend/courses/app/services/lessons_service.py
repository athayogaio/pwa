import datetime
from abc import ABC
from functools import cached_property

import math
from django.conf import settings
from django.utils.timezone import now
from rest_framework.exceptions import NotFound, ValidationError

from core.app.framework.unit_of_work import UnitOfWork
from core.app.repositories.user_repository import UserRepository
from core.app.services.email_services import SimpleEmailTextService
from core.app.services.types import TextMailData
from core.models import User
from courses.app.repositories.course_cycle_repository import CourseCycleRepository
from courses.app.repositories.course_repository import CourseRepository
from courses.app.repositories.lesson_enrolled_user_repository import (
    LessonEnrolledUserRepository,
)
from courses.app.repositories.lesson_repository import LessonRepository
from courses.app.repositories.ticket_repository import TicketRepository
from courses.models import (
    Lesson,
    LessonStatuses,
    CourseCycle,
    Course,
    CoursePaymentTypes,
    LessonEnrolledUser,
    LessonRatingStar,
)


class LessonRescheduleCancel(ABC):
    user_repos = UserRepository()
    lesson_repos = LessonRepository()
    course_cycle_repos = CourseCycleRepository()
    course_repos = CourseRepository()

    def __init__(self, lesson_id: int, user: User) -> None:
        self.lesson_id = lesson_id
        self.user = user

    @cached_property
    def lesson(self) -> Lesson:
        lesson = self.lesson_repos.find_by_id_creator(
            id_=self.lesson_id, user_id=self.user.id
        )
        if not lesson:
            raise NotFound(f"Undefined lesson with pk {self.lesson_id}")
        return lesson

    @cached_property
    def course(self) -> Course:
        return self.course_repos.find_by_id(
            id_=int(self.lesson.course_id), raise_exception=True
        )

    @cached_property
    def current_course_cycle(self) -> CourseCycle:
        return self.course_cycle_repos.current_course_cycle(course=self.lesson.course)

    def _can_process(self) -> bool:
        lessons_in_cycle = self.lesson_repos.lessons_in_range_count(
            course_id=self.course.id,
            start_at=self.current_course_cycle.start_at,
            end_at=self.current_course_cycle.end_at,
        )
        reschedule_cancel_lessons_count = (
            self.current_course_cycle.canceled_lessons_amount
            + self.current_course_cycle.transferred_lessons_amount
        )
        max_count = math.ceil(
            lessons_in_cycle * settings.RESCHEDULE_CANCEL_COUNT_PERCENT
        )
        print(lessons_in_cycle, reschedule_cancel_lessons_count)
        return max_count > reschedule_cancel_lessons_count

    def _fine_coef(self) -> float:
        for fine_coef, time_delta in settings.RATE_FINES_MAPPING.items():
            if self.lesson.start_at > (now() + time_delta):
                return fine_coef
        return settings.MAX_FINE

    def _reduce_user_coef(self) -> None:
        self.user.sys_rate = max(0.0, round(self.user.sys_rate - self._fine_coef(), 4))
        self.user_repos.store(user=self.user)


class LessonCancel(LessonRescheduleCancel):
    def _send_cancel_message(self) -> None:
        SimpleEmailTextService(
            data=TextMailData(
                subject="Отмена занятия",
                message=f"Преподаватель отменил занятие на курсе `{self.course.base_course.name}` "
                f"{self.lesson.start_at}",
                receivers=self.lesson_repos.lesson_participants_emails(
                    lesson=self.lesson
                ),
            )
        ).send()

    def cancel(self) -> None:
        if self.lesson.status != LessonStatuses.ACTIVE:
            raise ValidationError("Lesson not active")
        if not self._can_process():
            raise ValidationError("Cannot cancel lesson in current cycle")
        with UnitOfWork():
            self._reduce_user_coef()
            self.lesson.status = LessonStatuses.CANCELED
            self.lesson_repos.store(lesson=self.lesson)


class LessonReschedule(LessonRescheduleCancel):
    def __init__(self, lesson_id: int, user: User, reschedule_to: datetime.datetime):
        super().__init__(lesson_id, user)
        self.reschedule_to = reschedule_to
        self.old_lesson_datetime = self.lesson.start_at

    def _send_reschedule_message(self) -> None:
        SimpleEmailTextService(
            data=TextMailData(
                subject="Перенос занятия",
                message=f"Преподаватель перенес занятие на курсе `{self.course.base_course.name}` "
                f"c {self.old_lesson_datetime} на {self.reschedule_to}",
                receivers=self.lesson_repos.lesson_participants_emails(
                    lesson=self.lesson
                ),
            )
        ).send()

    def _accept_reschedule(self) -> None:
        self.lesson.start_at = self.reschedule_to
        self.lesson_repos.store(lesson=self.lesson)

    def _inc_transferred_lessons_amount(self) -> None:
        self.current_course_cycle.transferred_lessons_amount += 1
        self.course_cycle_repos.store(cycle=self.current_course_cycle)

    def reschedule(self) -> None:
        if not self._can_process():
            raise ValidationError("Can not reschedule lesson")
        if overlap_lesson := self.lesson_repos.overlap_lesson(
            start_at=self.reschedule_to,
            end_at=self.reschedule_to + self.lesson.course.duration,
            skip_lessons_ids=[self.lesson.id],
        ):
            raise ValidationError(f"User has lesson at {overlap_lesson.start_at}")
        with UnitOfWork():
            self._reduce_user_coef()
            self._accept_reschedule()
            self._inc_transferred_lessons_amount()
        self._send_reschedule_message()


class LessonParticipation:
    repository = TicketRepository()
    lesson_repository = LessonRepository()

    def __init__(self, lesson_id: int, user: User):
        self._lesson_id = lesson_id
        self._user = user

    @cached_property
    def lesson(self) -> Lesson:
        lesson = self.lesson_repository.find_by_id(id_=self._lesson_id)
        if not lesson:
            raise NotFound(f"Undefined lesson with id {self._lesson_id}")
        return lesson

    def reduce_tickets(self) -> None:
        ticket = self.repository.ticket_for_course_to_update(
            course_id=self.lesson.course.id, user=self._user
        )
        if not ticket or ticket.amount < 1:
            raise NotFound("You dont have ticket for this course")
        ticket.amount = int(ticket.amount) - 1
        self.repository.store(ticket=ticket)

    def participate(self) -> str:
        participant = self.lesson_repository.is_participant(
            lesson=self.lesson, user=self._user
        )
        if participant:
            return self.lesson.course.link

        with UnitOfWork():
            if self.lesson.course.payment == CoursePaymentTypes.PAYMENT:
                self.reduce_tickets()

            self.lesson_repository.add_participant(lesson=self.lesson, user=self._user)
        return self.lesson.course.link


class LessonEnrolledUserWork:
    repository = LessonEnrolledUserRepository()

    def __init__(self, enrolled_user: LessonEnrolledUser) -> None:
        self._enrolled_user = enrolled_user

    def activation(self, active: bool) -> None:
        self._enrolled_user.active = active
        self.repository.store(enrolled_user=self._enrolled_user)


class LessonRate:
    repository = LessonRepository()

    def __init__(self, lesson_id: int, user: User, star_rating: int):
        self.star_rating = star_rating
        self.user = user
        self.lesson_id = lesson_id

    @cached_property
    def rating_star(self) -> LessonRatingStar:
        lesson = self.repository.find_by_id(id_=self.lesson_id)
        if not lesson:
            raise NotFound(f"Undefined lesson with id {self.lesson_id}")

        star = LessonRatingStar()
        star.user = self.user
        star.lesson = lesson
        star.star_rating = self.star_rating

        return star

    def rate(self) -> LessonRatingStar:
        self.repository.rate_lesson(rating_star=self.rating_star)
        return self.rating_star
