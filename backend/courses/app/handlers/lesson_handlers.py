from typing import Any

from rest_framework.decorators import permission_classes
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from core.app.framework.handlers import GenericHandler, Handler
from core.app.framework.pagination import Pagination
from core.app.framework.permissions import IsTeacher
from core.app.framework.queryset import OrderedQuerySet
from courses.app.http.requests.course_requests import CourseTicketUseRequest
from courses.app.http.requests.lesson_requests import (
    LessonRescheduleRequest,
    LessonRateRequest,
    LessonFilterRequest,
)
from courses.app.http.resources.course_resources import (
    LessonResource,
    LessonRatingStarResource,
    LessonDetailResource,
)
from courses.app.repositories.lesson_repository import LessonRepository
from courses.app.services.lessons_service import (
    LessonReschedule,
    LessonCancel,
    LessonParticipation,
    LessonRate,
)


@permission_classes([IsTeacher])
class LessonRescheduleHandler(GenericHandler):
    serializer_class = LessonRescheduleRequest

    def post(
        self, request: Request, lesson_id: int, *args: Any, **kwargs: Any
    ) -> Response:
        data = self.serializer_class(data=self.request.data)
        data.is_valid(raise_exception=True)

        LessonReschedule(
            lesson_id=lesson_id,
            reschedule_to=data.validated_data["reschedule_to"],
            user=self.request.user,
        ).reschedule()

        return Response({"data": "Success rescheduled"})


@permission_classes([IsTeacher])
class LessonCancelHandler(Handler):
    def post(
        self, request: Request, lesson_id: int, *args: Any, **kwargs: Any
    ) -> Response:
        LessonCancel(lesson_id=lesson_id, user=self.request.user).cancel()

        return Response({"data": "Success canceled"})


class LessonRetrieveHandler(Handler):
    def get(
        self, request: Request, lesson_id: int, *args: Any, **kwargs: Any
    ) -> Response:
        lesson = LessonRepository().find_by_id(id_=lesson_id, fetch_rels=True)
        if not lesson:
            raise NotFound(f"Undefined lesson with pk {lesson_id}")
        return Response({"data": LessonResource(lesson).data})


@permission_classes([IsAuthenticated])
class LessonRateHandler(GenericHandler):
    serializer_class = LessonRateRequest

    def put(
        self, request: Request, lesson_id: int, *args: Any, **kwargs: Any
    ) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)
        star = LessonRate(
            lesson_id=lesson_id,
            user=self.request.user,
            star_rating=data.validated_data["star_rating"],
        ).rate()
        return Response({"data": LessonRatingStarResource(star).data})


class LessonListHandler(Handler):
    repository = LessonRepository()

    def get(
        self, request: Request, course_pk: int, *args: Any, **kwargs: Any
    ) -> Response:
        lessons = self.repository.fetch_relations(
            self.repository.find_by_course_id(course_id=course_pk)
        )
        return Response(
            Pagination(
                data=lessons, request=request, resource=LessonResource
            ).paginate()
        )


@permission_classes([IsAuthenticated])
class UserLessonsFilterHandler(GenericHandler):
    repository = LessonRepository()
    serializer_class = LessonFilterRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """
        The method returns the lessons the user is participating in by default
        """
        data = self.serializer_class(data=request.data, partial=True)
        data.is_valid(raise_exception=True)

        lessons = OrderedQuerySet(
            queryset=self.repository.fetch_relations(
                self.repository.filter(user=request.user, data=data.validated_data)
            )
        ).order_by(columns=["start_at"])

        return Response(
            Pagination(
                data=lessons, request=request, resource=LessonDetailResource
            ).paginate()
        )


@permission_classes([IsAuthenticated])
class LessonParticipateHandler(GenericHandler):
    serializer_class = CourseTicketUseRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        link = LessonParticipation(
            lesson_id=data.validated_data["lesson_id"], user=self.request.user
        ).participate()

        return Response({"data": {"course_link": link}})
