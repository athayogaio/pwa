from functools import cached_property

from rest_framework.exceptions import NotFound, PermissionDenied

from core.models import User
from courses.app.repositories.course_repository import CourseRepository
from courses.app.repositories.review_repository import CourseReviewRepository
from courses.app.services.types import CourseReviewCreateData
from courses.models import CourseReview


class CourseReviewCreate:
    repository = CourseReviewRepository()
    course_repository = CourseRepository()

    def __init__(self, course_id: int, data: CourseReviewCreateData, user: User):
        self.data = data
        self.user = user
        self.course_id = course_id

    @cached_property
    def review(self) -> CourseReview:
        course = self.course_repository.find_by_id(
            id_=self.course_id, raise_exception=True
        )
        if course.base_course.teacher.id == self.user.id:
            raise PermissionDenied("Teacher can't review own course")
        if self.repository.check_for_user_review(user_id=self.user.id, course=course):
            raise PermissionDenied("User can't review course twice")

        review = CourseReview()
        review.user = self.user
        review.base_course = course.base_course
        review.text = self.data["text"]

        return review

    def create(self) -> CourseReview:
        self.repository.store(review=self.review)
        return self.review


class CourseReviewRemove:
    repository = CourseReviewRepository()

    def __init__(self, review_id: int, user: User):
        self.review_id = review_id
        self.user = user

    @cached_property
    def review(self) -> CourseReview:
        review = self.repository.find_by_id(id_=self.review_id)
        if not review:
            raise NotFound(f"Undefined review with id {self.review_id}")
        if review.user.id != self.user.id:
            raise PermissionDenied(
                f"User with id {self.user.id} can't remove review with id {self.review_id}"
            )

        return review

    def remove(self) -> CourseReview:
        self.repository.remove(review=self.review)
        return self.review
