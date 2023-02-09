from abc import ABC

from rest_framework.decorators import permission_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED

from core.app.aggregates.teacher_profile_aggregate import TeacherProfileAggregate
from core.app.aggregates.types import TeacherProfileCreateContext
from core.app.framework.handlers import GenericHandler
from core.app.http.requests.teachers_requests import (
    TeacherProfileCreateReqContext,
    LegalTeacherProfileCreateRequest,
    IndividualTeacherProfileCreateRequest,
)
from core.models import UserBillingType


@permission_classes([IsAuthenticated])
class TeacherProfileCreateHandler(GenericHandler, ABC):
    parser_classes = [MultiPartParser]
    billing_type: UserBillingType

    def post(self) -> Response:
        data = self.serializer_class(
            data=self.request.data, context=TeacherProfileCreateReqContext
        )
        data.is_valid(raise_exception=True)

        teacher_profile = TeacherProfileAggregate(user=self.request.user)
        teacher_profile.create(
            ctx=TeacherProfileCreateContext(
                questionnaire_data=data.validated_data.get("questionnaire"),
                billing_data=data.validated_data.get("billing_info"),
                billing_type=self.billing_type,
            ),
        )
        return Response(status=HTTP_201_CREATED)


class LegalTeacherProfileCreateHandler(TeacherProfileCreateHandler):
    serializer_class = LegalTeacherProfileCreateRequest
    billing_type = UserBillingType.LEGAL_USER


class IndividualTeacherProfileCreateHandler(TeacherProfileCreateHandler):
    serializer_class = IndividualTeacherProfileCreateRequest
    billing_type = UserBillingType.INDIVIDUAL_USER
