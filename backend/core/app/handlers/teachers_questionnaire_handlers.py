from typing import Any

from rest_framework.decorators import permission_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from core.app.framework.handlers import GenericHandler
from core.app.http.requests.teachers_questionnaire_requests import (
    QuestionnaireTeacherRequest,
)
from core.app.http.resources.teachers_questionnaire_resources import (
    QuestionnaireTeacherResource,
)
from core.app.services.teachers_questionnaire_services import (
    QuestionnaireTeacherRegister,
)


@permission_classes([IsAuthenticated])
class QuestionnaireTeacherHandler(GenericHandler):
    serializer_class = QuestionnaireTeacherRequest
    parser_classes = [MultiPartParser]

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        user = QuestionnaireTeacherRegister(
            data=data.validated_data, user=self.request.user
        ).create()
        return Response(
            {
                "data": QuestionnaireTeacherResource(user).data,
            }
        )
