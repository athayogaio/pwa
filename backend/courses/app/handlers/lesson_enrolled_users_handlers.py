from typing import Any

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from core.app.framework.handlers import Handler
from courses.app.repositories.lesson_enrolled_user_repository import (
    LessonEnrolledUserRepository,
)
from courses.app.services.lessons_service import LessonEnrolledUserWork


@permission_classes([IsAuthenticated])
class ActivationLessonEnrolledUser(Handler):
    def post(
        self, request: Request, lesson_id: int, active: int, *args: Any, **kwargs: Any
    ) -> Response:
        LessonEnrolledUserWork(
            enrolled_user=LessonEnrolledUserRepository().find_by_user_lesson(
                lesson_id=lesson_id, user_id=self.request.user.id, raise_exception=True
            )
        ).activation(active=bool(active))
        return Response({"data": "Success"})
