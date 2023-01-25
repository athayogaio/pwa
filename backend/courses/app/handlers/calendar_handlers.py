from typing import Any

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import permission_classes
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from core.app.framework.pagination import Pagination
from courses.app.http.requests.calendar_request import CalendarLessonsAddRequest, CalendarLessonRemoveRequest
from courses.app.http.resources.calendar_resourse import CalendarResource
from courses.app.repositories.calendar_repository import CalendarRepository
from courses.app.repositories.lesson_repository import LessonRepository
from courses.app.services.calendar_service import CalendarCreate, CalendarRemove


@permission_classes([IsAuthenticated])
class CalendarLessonAddHandler(GenericAPIView):
    serializer_class = CalendarLessonsAddRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        lessons = LessonRepository().find_by_course_id(course_id=data.validated_data["course_id"])
        CalendarCreate(lessons=lessons, user=request.user).create()

        return Response("added")


@permission_classes([IsAuthenticated])
class CalendarLessonRemoveHandler(GenericAPIView):
    serializer_class = CalendarLessonRemoveRequest

    def patch(self, request: Request) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        CalendarRemove(user=request.user, delete_lesson_id=data.validated_data["delete_lesson_id"]).remove()

        return Response("deleted")


class CalendarListHandler(APIView):
    repository = CalendarRepository()

    @extend_schema(responses=OpenApiTypes.OBJECT)
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        calendar = CalendarRepository().find_calendar(user_id=request.user.id)

        return Response(
            Pagination(
                data=calendar, request=request, resource=CalendarResource
            ).paginate()
        )
