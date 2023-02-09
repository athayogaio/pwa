from typing import Union, Type, TypedDict

from rest_framework import serializers

from core.app.framework.serializers import UnimplementedSerializer
from core.models import GenderTypes, BillingInfoRegexes, UserRegions


class QuestionnaireTeacherRequest(UnimplementedSerializer):
    name = serializers.CharField(max_length=30)
    surname = serializers.CharField(max_length=50)
    date_of_birth = serializers.DateField()
    gender = serializers.ChoiceField(choices=GenderTypes.choices)
    about_me = serializers.CharField(max_length=3000)
    work_experience = serializers.CharField(max_length=1000)
    vk_link = serializers.URLField()
    telegram_link = serializers.URLField()
    certificate_photos = serializers.ListField(child=serializers.ImageField())
    passport_photo = serializers.ImageField()
    user_photo = serializers.ImageField()
    user_with_passport_photo = serializers.ImageField()


class UserLegalBillingInfoEURequest(UnimplementedSerializer):
    organization = serializers.CharField(max_length=255)
    bic = serializers.CharField(max_length=50)
    bank = serializers.CharField(max_length=50)
    organization_address = serializers.CharField(max_length=255)
    inn = serializers.CharField(max_length=50)
    correspondent_account = serializers.CharField(max_length=50)
    prc = serializers.CharField(max_length=50)
    account_number = serializers.CharField(max_length=50)


class UserLegalBillingInfoRURequest(UnimplementedSerializer):
    organization = serializers.CharField(max_length=255)
    bank = serializers.CharField(max_length=50)
    organization_address = serializers.CharField(max_length=255)
    bic = serializers.RegexField(regex=BillingInfoRegexes.BIC_RU.value)
    inn = serializers.RegexField(regex=BillingInfoRegexes.INN_RU.value)
    correspondent_account = serializers.RegexField(
        regex=BillingInfoRegexes.CORRESPONDENT_ACCOUNT_RU.value
    )
    prc = serializers.RegexField(regex=BillingInfoRegexes.PRC_RU.value)
    account_number = serializers.RegexField(
        regex=BillingInfoRegexes.ACCOUNT_NUMBER_RU.value
    )


class UserIndividualBillingInfoRURequest(UnimplementedSerializer):
    recipient = serializers.CharField(max_length=255)
    bic = serializers.RegexField(regex=BillingInfoRegexes.BIC_RU.value)
    inn = serializers.RegexField(regex=BillingInfoRegexes.INN_RU.value)
    account_number = serializers.RegexField(
        regex=BillingInfoRegexes.ACCOUNT_NUMBER_RU.value
    )


class UserIndividualBillingInfoEURequest(UnimplementedSerializer):
    recipient = serializers.CharField(max_length=255)
    bic = serializers.CharField(max_length=50)
    inn = serializers.CharField(max_length=50)
    account_number = serializers.CharField(max_length=50)


class TeacherProfileCreateReqContext(TypedDict):
    region: UserRegions


class LegalTeacherProfileCreateRequest(UnimplementedSerializer):
    questionnaire = QuestionnaireTeacherRequest()

    def _billing_info_request(
        self, region: UserRegions
    ) -> Type[Union[UserLegalBillingInfoRURequest, UserLegalBillingInfoEURequest,]]:
        if region == UserRegions.RU:
            return UserLegalBillingInfoRURequest
        return UserLegalBillingInfoEURequest

    def get_fields(self) -> dict:
        fields = super().get_fields()
        context: TeacherProfileCreateReqContext = self.context
        fields["billing_info"] = self._billing_info_request(
            region=context.get("region", UserRegions.RU),
        )()
        return fields


class IndividualTeacherProfileCreateRequest(UnimplementedSerializer):
    questionnaire = QuestionnaireTeacherRequest()

    def _billing_info_request(
        self, region: UserRegions
    ) -> Type[
        Union[
            UserIndividualBillingInfoEURequest,
            UserIndividualBillingInfoRURequest,
        ]
    ]:
        if region == UserRegions.RU:
            return UserIndividualBillingInfoRURequest
        return UserIndividualBillingInfoEURequest

    def get_fields(self) -> dict:
        fields = super().get_fields()
        context: TeacherProfileCreateReqContext = self.context
        fields["billing_info"] = self._billing_info_request(
            region=context.get("region", UserRegions.RU),
        )()
        return fields
