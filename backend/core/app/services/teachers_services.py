from functools import cached_property
from typing import Type

from core.app.framework.unit_of_work import transaction_method
from core.app.repositories.attachment_repository import AttachmentRepository
from core.app.repositories.teacher_profile_repository import TeacherProfileRepository
from core.app.repositories.teachers_questionnaire_repository import (
    QuestionnaireTeacherRepository,
)
from core.app.repositories.user_billing_info_repository import UserBillingInfoRepository
from core.app.repositories.user_repository import UserRepository
from core.app.services.types import QuestionnaireTeacherData, TeacherBillingInfoData
from core.models import (
    User,
    QuestionnaireTeacher,
    UserRoles,
    Attachment,
    UserRegions,
    UserBillingInfoEU,
    BillingInfoModelType,
    TeacherProfileDB,
    TeacherProfileStatuses,
)


class QuestionnaireTeacherRegister:
    def __init__(self, data: QuestionnaireTeacherData):
        self.questionnaire_repository = QuestionnaireTeacherRepository()
        self.user_repository = UserRepository()
        self.data = data

    @cached_property
    def questionnaire(self) -> QuestionnaireTeacher:
        questionnaire = QuestionnaireTeacher()
        questionnaire.name = self.data["name"]
        questionnaire.surname = self.data["surname"]
        questionnaire.date_of_birth = self.data["date_of_birth"]
        questionnaire.gender = self.data["gender"]
        questionnaire.about_me = self.data["about_me"]
        questionnaire.work_experience = self.data["work_experience"]
        questionnaire.vk_link = self.data["vk_link"]
        questionnaire.telegram_link = self.data["telegram_link"]
        questionnaire.passport_photo = self.data["passport_photo"]
        questionnaire.user_photo = self.data["user_photo"]
        questionnaire.user_with_passport_photo = self.data["user_with_passport_photo"]
        return questionnaire

    def create_questionnaire_certificate_photos(
        self, questionnaire: QuestionnaireTeacher
    ) -> None:
        photos = []
        for item in self.data["certificate_photos"]:
            attachment = Attachment()
            attachment.image = item
            photos.append(attachment)
        AttachmentRepository(model=Attachment).bulk_create(models=photos)
        questionnaire.setup_certificate_photos(photos=photos)

    def create(self) -> QuestionnaireTeacher:
        self.questionnaire_repository.store(questionnaire=self.questionnaire)
        self.create_questionnaire_certificate_photos(self.questionnaire)
        return self.questionnaire


class TeacherBillingInfoCreate:
    def __init__(self, user: User, data: TeacherBillingInfoData):
        self.repository = UserBillingInfoRepository()
        self._user = user
        self._data = data

    def _billing_info_model(self) -> Type[BillingInfoModelType]:
        if self._user.region == UserRegions.RU.value:
            return UserBillingInfoEU
        return UserBillingInfoEU

    @property
    def billing_info(self) -> BillingInfoModelType:
        model = self._billing_info_model()
        new_billing_info = model()
        new_billing_info.organization = self._data["organization"]
        new_billing_info.bic = self._data["bic"]
        new_billing_info.bank = self._data["bank"]
        new_billing_info.organization_address = self._data["organization_address"]
        new_billing_info.inn = self._data["inn"]
        new_billing_info.correspondent_account = self._data["correspondent_account"]
        new_billing_info.prc = self._data["prc"]
        new_billing_info.account_number = self._data["account_number"]
        new_billing_info.user = self._user
        return new_billing_info

    def create(self) -> BillingInfoModelType:
        billing_info = self.billing_info
        self.repository.store(obj=billing_info)
        return billing_info


class TeacherProfileCreate:
    def __init__(
        self,
        user: User,
        questionnaire: QuestionnaireTeacher,
        billing_info: BillingInfoModelType,
    ):
        self.repository = TeacherProfileRepository()
        self._user = user
        self._questionnaire = questionnaire
        self._billing_info = billing_info

    @cached_property
    def profile(self) -> TeacherProfileDB:
        profile = TeacherProfileDB()
        profile.user = self._user
        profile.questionnaire = self._questionnaire
        profile.billing_info_content_type = self._billing_info.polymorphic_ctype
        profile.billing_info_obj_id = self._billing_info.id
        return profile

    def create(self) -> TeacherProfileDB:
        self.repository.store(obj=self.profile)
        return self.profile


class TeacherProfileAccept:
    def __init__(self, profile: TeacherProfileDB):
        self.repo = TeacherProfileRepository()
        self.user_repo = UserRepository()
        self._profile = profile

    def _accept_questionnaire(self) -> None:
        self._profile.status = TeacherProfileStatuses.ACCEPTED
        self.repo.store(obj=self._profile)

    def _user_settings_update(self) -> None:
        user = self._profile.user
        user.add_roles([UserRoles.TEACHER])
        user.gender = self._profile.questionnaire.gender
        self.user_repo.store(user=user)

    @transaction_method
    def accept(self) -> None:
        self._accept_questionnaire()
        self._user_settings_update()
