from typing import Type

from rest_framework.exceptions import ValidationError

from core.app.aggregates.types import TeacherProfileCreateContext
from core.app.framework.unit_of_work import transaction_method
from core.app.repositories.teacher_profile_repository import TeacherProfileRepository
from core.app.services.teachers_services import (
    QuestionnaireTeacherRegister,
    TeacherProfileCreate,
    TeacherLegalBillingInfoCreate,
    TeacherIndividualBillingInfoCreate,
    TeacherBillingInfoCreate,
)
from core.models import (
    User,
    UserRoles,
    TeacherProfileDB,
    UserBillingType,
)


class TeacherProfileAggregate:
    def __init__(self, user: User):
        self.repository = TeacherProfileRepository()
        self._user = user

    def _can_create(self) -> None:
        if self._user.has_role(UserRoles.TEACHER):
            raise ValidationError("User already has teacher role")
        if self.repository.has_moderate_profile(user=self._user):
            raise ValidationError("User already has profile on moderation")

    def _billing_info_create_svc(
        self, billing_type: UserBillingType
    ) -> Type[TeacherBillingInfoCreate]:
        if billing_type == UserBillingType.LEGAL_USER:
            return TeacherLegalBillingInfoCreate
        return TeacherIndividualBillingInfoCreate

    @transaction_method
    def create(self, ctx: TeacherProfileCreateContext) -> TeacherProfileDB:
        self._can_create()
        questionnaire = QuestionnaireTeacherRegister(
            data=ctx.questionnaire_data
        ).create()
        billing_create_svc = self._billing_info_create_svc(
            billing_type=ctx.billing_type
        )
        billing_info = billing_create_svc(
            user=self._user, data=ctx.billing_data
        ).create()
        profile = TeacherProfileCreate(
            user=self._user,
            questionnaire=questionnaire,
            billing_info=billing_info,
        ).create()
        return profile
