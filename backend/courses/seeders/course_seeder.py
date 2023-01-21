import random
import time
from datetime import timedelta

import pytz
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
            level=random.choice([i[0] for i in CourseLevels.choices]),
            teacher=self.user,
        )


class CourseSeeder:
    def __init__(self, base_course: BaseCourse) -> None:
        self.faker = Faker("ru-RU")
        self.base_course = base_course

    def seed(self) -> Course:
        random.seed(time.time())
        start_datetime = self.faker.date_time(tzinfo=pytz.UTC)
        return Course(
            start_datetime=start_datetime,
            duration=timedelta(minutes=random.randint(60, 300)),
            price=random.randint(1000, 100000),
            deadline_datetime=self.faker.date_time_between(
                start_datetime, now() + timedelta(days=30), tzinfo=pytz.UTC
            ),
            base_course_id=self.base_course.id,
            link=self.faker.url(),
            link_info=self.faker.sentence()[:100],
            payment=random.choice([i[0] for i in CoursePaymentTypes.choices]),
            status="PUBLISHED"
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
            star_rating=random.randint(1, 5),
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
