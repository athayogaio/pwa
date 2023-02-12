import datetime
import random
import time
from datetime import timedelta
from typing import Optional

import pytz
from django.conf import settings
from django.utils.timezone import now
from faker import Faker

from core.models import User
from courses.models import (
    Course,
    CourseTypes,
    CourseLevels,
    CoursePaymentTypes,
    CourseReview,
    CourseComment,
    Ticket,
    Lesson,
    BaseCourse,
    CourseCycle,
)
from courses.models import CourseComplexities


class BaseCourseSeeder:
    def __init__(self, user: User) -> None:
        self.faker = Faker("ru-RU")
        self.user = user

    def seed(self) -> BaseCourse:
        random.seed(time.time())
        return BaseCourse(
            name=" ".join(self.faker.words(self.faker.random_int(1, 5))),
            description=self.faker.sentence(),
            course_type=random.choice([i[0] for i in CourseTypes.choices]),
            complexity=random.choice([i[0] for i in CourseComplexities.choices]),
            level=[random.choice([i[0] for i in CourseLevels.choices])],
            teacher=self.user,
        )


class CourseSeeder:
    def __init__(self, base_course: BaseCourse) -> None:
        self.faker = Faker("ru-RU")
        self.base_course = base_course

    def seed(self) -> Course:
        random.seed(time.time())
        start_datetime = self.faker.date_time_between(
            now() + timedelta(days=1), now() + timedelta(days=30), tzinfo=pytz.UTC
        )
        return Course(
            start_datetime=start_datetime,
            duration=timedelta(minutes=random.randint(60, 300)),
            price=random.randint(1000, 100000),
            deadline_datetime=self.faker.date_time_between(
                start_datetime + timedelta(days=10),
                start_datetime + timedelta(days=30),
                tzinfo=pytz.UTC,
            ),
            base_course_id=self.base_course.id,
            link=self.faker.url(),
            link_info=self.faker.sentence()[:100],
            payment=random.choice([i[0] for i in CoursePaymentTypes.choices]),
            status="PUBLISHED",
        )


class CourseCycleSeeder:
    def __init__(
        self,
        course: Course,
        start_at: Optional[datetime.datetime] = None,
        end_at: Optional[datetime.datetime] = None,
    ):
        self._course = course
        self._start_at = start_at
        self._end_at = end_at

    def seed(self) -> CourseCycle:
        return CourseCycle(
            course=self._course,
            start_at=self._start_at or now(),
            end_at=(self._start_at or now()) + settings.COURSE_LESSONS_CYCLE,
            canceled_lessons_amount=0,
            transferred_lessons_amount=0,
        )


class TicketSeeder:
    def __init__(self, user: User, course: Course) -> None:
        self.user = user
        self.course = course

    def seed(self) -> Ticket:
        return Ticket(user=self.user, course=self.course, amount=random.randint(1, 10))


class CourseCommentSeeder:
    def __init__(self, user: User, course: Course) -> None:
        self.faker = Faker("ru-RU")
        self.user = user
        self.course = course

    def seed(self) -> CourseComment:
        return CourseComment(
            text=self.faker.sentence(),
            user=self.user,
            base_course=self.course.base_course,
        )


class CourseReviewSeeder:
    def __init__(self, user: User, course: Course) -> None:
        self.faker = Faker("ru-RU")
        self.user = user
        self.course = course

    def seed(self) -> CourseReview:
        return CourseReview(
            text=self.faker.sentence(),
            user=self.user,
            base_course=self.course.base_course,
        )


class LessonSeeder:
    def __init__(self, course: Course) -> None:
        self.course = course
        self.faker = Faker()

    def seed(self) -> Lesson:
        return Lesson(
            course=self.course,
            start_at=self.faker.date_time_between(
                now(), now() + timedelta(days=30), tzinfo=pytz.UTC
            ),
        )
