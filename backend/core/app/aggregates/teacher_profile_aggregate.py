from functools import cached_property
from typing import Type, Optional

from rest_framework.exceptions import ValidationError, NotFound

from core.app.aggregates.types import TeacherProfileCreateContext
from core.app.framework.unit_of_work import transaction_method, UnitOfWork
from core.app.repositories.teacher_profile_repository import TeacherProfileRepository
from core.app.services.teachers_services import (
    QuestionnaireTeacherRegister,
    TeacherProfileStore,
    TeacherLegalBillingInfoCreate,
    TeacherIndividualBillingInfoCreate,
    TeacherBillingInfoCreate,
)
from core.app.services.types import TeacherBillingDataCreateType
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

    @cached_property
    def profile(self) -> Optional[TeacherProfileDB]:
        return self.repository.find_last_by_user(user=self._user)

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
        profile = TeacherProfileStore(
            user=self._user,
            questionnaire=questionnaire,
        ).store()
        return profile

    def add_billing_info(
        self, billing_type: UserBillingType, billing_data: TeacherBillingDataCreateType
    ) -> None:
        if not self.profile:
            raise NotFound(f"Undefined teacher profile for user {self._user.id}")
        with UnitOfWork():
            billing_create_svc = self._billing_info_create_svc(
                billing_type=billing_type
            )
            billing_info = billing_create_svc(
                user=self._user, data=billing_data
            ).create()
            self.profile.billing_info_content_type = billing_info.polymorphic_ctype
            self.profile.billing_info_obj_id = billing_info.id
            self.repository.store(obj=self.profile)
