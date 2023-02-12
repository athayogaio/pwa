from abc import ABC, abstractmethod
from functools import cached_property
from typing import Type

from core.app.framework.unit_of_work import transaction_method
from core.app.repositories.attachment_repository import AttachmentRepository
from core.app.repositories.teacher_profile_repository import TeacherProfileRepository
from core.app.repositories.teachers_questionnaire_repository import (
    QuestionnaireTeacherRepository,
)
from core.app.repositories.user_billing_info_repository import (
    UserLegalBillingInfoRepository,
    UserIndividualBillingInfoRepository,
)
from core.app.repositories.user_repository import UserRepository
from core.app.services.types import (
    QuestionnaireTeacherData,
    TeacherLegalBillingInfoData,
    TeacherIndividualBillingInfoData,
    TeacherBillingDataCreateType,
)
from core.models import (
    User,
    QuestionnaireTeacher,
    UserRoles,
    Attachment,
    UserRegions,
    LegalUserBillingInfoEU,
    LegalBillingInfoModelType,
    TeacherProfileDB,
    TeacherProfileStatuses,
    IndividualUserBillingInfoRU,
    IndividualUserBillingInfoEU,
    IndividualBillingInfoModelType,
    BillingInfoModelType,
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


class TeacherBillingInfoCreate(ABC):
    def __init__(self, user: User, data: TeacherBillingDataCreateType):
        self._user = user
        self._data = data

    @abstractmethod
    def create(self) -> BillingInfoModelType:
        raise NotImplementedError


class TeacherLegalBillingInfoCreate(TeacherBillingInfoCreate):
    _data: TeacherLegalBillingInfoData

    def __init__(self, user: User, data: TeacherLegalBillingInfoData):
        super().__init__(user, data)
        self.repository = UserLegalBillingInfoRepository()

    @property
    def billing_info_model(self) -> Type[LegalBillingInfoModelType]:
        if self._user.region == UserRegions.RU.value:
            return LegalUserBillingInfoEU
        return LegalUserBillingInfoEU

    @property
    def billing_info(self) -> LegalBillingInfoModelType:
        new_billing_info = self.billing_info_model()
        new_billing_info.organization = self._data["organization"]
        new_billing_info.bic = self._data["bic"]
        new_billing_info.inn = self._data["inn"]
        new_billing_info.prc = self._data["prc"]
        new_billing_info.account_number = self._data["account_number"]
        return new_billing_info

    def create(self) -> LegalBillingInfoModelType:
        billing_info = self.billing_info
        self.repository.store(obj=billing_info)
        return billing_info


class TeacherIndividualBillingInfoCreate(TeacherBillingInfoCreate):
    _data: TeacherIndividualBillingInfoData

    def __init__(self, user: User, data: TeacherIndividualBillingInfoData):
        super().__init__(user, data)
        self.repository = UserIndividualBillingInfoRepository()

    @property
    def billing_info_model(self) -> Type[IndividualBillingInfoModelType]:
        if self._user.region == UserRegions.RU.value:
            return IndividualUserBillingInfoRU
        return IndividualUserBillingInfoEU

    @property
    def billing_info(self) -> LegalBillingInfoModelType:
        new_billing_info = self.billing_info_model()
        new_billing_info.recipient = self._data["recipient"]
        new_billing_info.bic = self._data["bic"]
        new_billing_info.inn = self._data["inn"]
        new_billing_info.account_number = self._data["account_number"]
        return new_billing_info

    def create(self) -> LegalBillingInfoModelType:
        billing_info = self.billing_info
        self.repository.store(obj=billing_info)
        return billing_info


class TeacherProfileStore:
    def __init__(
        self,
        user: User,
        questionnaire: QuestionnaireTeacher,
    ):
        self.repository = TeacherProfileRepository()
        self._user = user
        self._questionnaire = questionnaire

    @cached_property
    def profile(self) -> TeacherProfileDB:
        profile = TeacherProfileDB()
        profile.user = self._user
        profile.questionnaire = self._questionnaire
        return profile

    def store(self) -> TeacherProfileDB:
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
