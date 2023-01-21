from typing import Any

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import permission_classes
from rest_framework.exceptions import NotFound
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from core.app.utils.pagination import paginate
from core.app.utils.permissions import IsTeacher
from core.app.utils.queryset import OrderedQueryset
from courses.app.http.requests.lesson_requests import LessonRescheduleRequest
from courses.app.http.resources.course_resources import LessonResource
from courses.app.repositories.lesson_repository import LessonRepository
from courses.app.services.lessons_service import LessonReschedule, LessonCancel


@permission_classes([IsTeacher])
class LessonRescheduleHandler(GenericAPIView):
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
class LessonCancelHandler(APIView):
    @extend_schema(responses=OpenApiTypes.OBJECT)
    def post(
        self, request: Request, lesson_id: int, *args: Any, **kwargs: Any
    ) -> Response:
        LessonCancel(lesson_id=lesson_id, user=self.request.user).cancel()

        return Response({"data": "Success canceled"})


class LessonRetrieveHandler(APIView):
    @extend_schema(responses=OpenApiTypes.OBJECT)
    def get(
        self, request: Request, lesson_id: int, *args: Any, **kwargs: Any
    ) -> Response:
        lesson = LessonRepository().find_by_id(id_=lesson_id)
        if not lesson:
            raise NotFound(f"Undefined lesson with pk {lesson_id}")
        return Response({"data": LessonResource(lesson).data})


class LessonListHandler(APIView):
    repository = LessonRepository()

    @extend_schema(responses=OpenApiTypes.OBJECT)
    def get(
        self, request: Request, course_pk: int, *args: Any, **kwargs: Any
    ) -> Response:
        lessons = self.repository.fetch_relations(
            self.repository.find_by_course_id(course_id=course_pk)
        )
        return Response(
            paginate(data=lessons, request=request, resource=LessonResource)
        )


@permission_classes([IsAuthenticated])
class UserLessonsParticipateHandler(APIView):
    repository = LessonRepository()

    @extend_schema(responses=OpenApiTypes.OBJECT)
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        lessons = OrderedQueryset(
            queryset=self.repository.fetch_relations(
                self.repository.find_user_participant(
                    user_id=request.user.id, skip_past=True
                )
            )
        ).order_by(columns=["start_at"])
        return Response(
            paginate(data=lessons, request=request, resource=LessonResource)
        )
