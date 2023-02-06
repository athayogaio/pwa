import random
from typing import Any

from django.conf import settings
from django.core.management import BaseCommand
from faker import Faker

from core.app.framework.unit_of_work import transaction_method
from core.models import User, UserRoles
from core.seeders.user_seeder import (
    UserSeeder,
    TransactionSeeder,
    QuestionnaireTeacherSeeder,
)
from courses.app.services.course_service import CourseCreator
from courses.app.services.types import CourseCreateData, LessonCreateData
from courses.models import (
    Course,
    CoursePaymentTypes,
    CourseTypes,
    CourseComplexities,
    RepetitionWeekdays,
    CourseStatuses,
)
from courses.seeders.course_seeder import (
    CourseSeeder,
    TicketSeeder,
    CourseCommentSeeder,
    CourseReviewSeeder,
    LessonSeeder,
    BaseCourseSeeder,
)

DEFAULT_USERS_COUNT = 5
DEFAULT_LESSONS_COUNT = DEFAULT_USERS_COUNT * 10


class Command(BaseCommand):
    @transaction_method
    def handle(self, *args: Any, **options: Any) -> None:
        self._init_superuser()
        self._seed_users()
        self._seed_courses()
        self._seed_transactions()
        self._seed_tickets()
        self._seed_comments()
        self._seed_questionnaires()
        self._seed_coursereviews()
        self._seed_lessonseeder()

    def _init_superuser(self) -> None:
        user = User()
        user.username = user.email = "test@user.ru"
        user.set_password(settings.DEFAULT_SUPERUSER_PASSWORD)
        user.is_staff = user.is_superuser = True
        user.roles = ["TEACHER"]
        user.save()

    def _seed_users(self, count: int = DEFAULT_USERS_COUNT) -> None:
        for i in range(count):
            UserSeeder().seed().save()

    def _seed_courses(self, count: int = DEFAULT_LESSONS_COUNT) -> None:
        for i in range(count):
            faker = Faker()
            base_course = BaseCourseSeeder(
                user=User.objects.order_by("?").first()
            ).seed()
            base_course.save()
            course = CourseSeeder(base_course=base_course).seed()
            user = User.objects.order_by("?").first()
            if not user.has_role(UserRoles.TEACHER):
                user.add_roles([UserRoles.TEACHER])
                user.save()
            created_course = CourseCreator(
                data=CourseCreateData(
                    name=base_course.name,
                    description=base_course.description,
                    course_type=CourseTypes(base_course.course_type),
                    link=course.link,
                    link_info=course.link_info,
                    level=base_course.level,
                    duration=course.duration,
                    start_datetime=course.start_datetime,
                    deadline_datetime=course.deadline_datetime,
                    payment=CoursePaymentTypes(course.payment),
                    price=course.price,
                    complexity=CourseComplexities(base_course.complexity),
                    lessons=[
                        LessonCreateData(
                            weekday=RepetitionWeekdays(random.randint(0, 6)),
                            start_time=faker.date_time_between(
                                course.start_datetime, course.deadline_datetime
                            ).time(),
                        )
                        for _ in range(2)
                    ],
                    is_draft=False,
                ),
                user=user,
            ).create()
            created_course.status = CourseStatuses.PUBLISHED
            created_course.save()

    def _seed_transactions(self, count: int = DEFAULT_LESSONS_COUNT) -> None:
        for i in range(count):
            TransactionSeeder(User.objects.order_by("?").first()).seed().save()

    def _seed_tickets(self, count: int = DEFAULT_LESSONS_COUNT) -> None:
        for i in range(count):
            TicketSeeder(
                user=User.objects.order_by("?").first(),
                course=Course.objects.order_by("?").first(),
            ).seed().save()

    def _seed_comments(self, count: int = DEFAULT_LESSONS_COUNT) -> None:
        for i in range(count):
            CourseCommentSeeder(
                user=User.objects.order_by("?").first(),
                course=Course.objects.order_by("?").first(),
            ).seed().save()

    def _seed_questionnaires(self, count: int = DEFAULT_LESSONS_COUNT) -> None:
        for i in range(count):
            QuestionnaireTeacherSeeder(
                user=User.objects.order_by("?").first(),
            ).seed().save()

    def _seed_coursereviews(self, count: int = DEFAULT_LESSONS_COUNT) -> None:
        for i in range(count):
            CourseReviewSeeder(
                user=User.objects.order_by("?").first(),
                course=Course.objects.order_by("?").first(),
            ).seed().save()

    def _seed_lessonseeder(self, count: int = DEFAULT_LESSONS_COUNT) -> None:
        for i in range(count):
            LessonSeeder(course=Course.objects.order_by("?").first()).seed().save()
