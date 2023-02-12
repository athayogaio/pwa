from typing import Dict

from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.models import (
    User,
    QuestionnaireTeacher,
    TeacherProfileDB,
    LegalUserBillingInfoEU,
)


class QuestionnaireTeacherResource(ModelSerializer):
    class Meta:
        model = QuestionnaireTeacher
        fields = [
            "id",
            "name",
            "surname",
            "date_of_birth",
            "gender",
            "about_me",
            "work_experience",
            "vk_link",
            "telegram_link",
        ]


class UserBillingInfoResource(ModelSerializer):
    class Meta:
        model = LegalUserBillingInfoEU
        fields = [
            "id",
            "organization",
            "bank",
            "organization_address",
            "inn",
            "correspondent_account",
            "prc",
            "bic",
            "account_number",
        ]


class TeacherPrivateProfileResource(ModelSerializer):
    questionnaire = QuestionnaireTeacherResource()
    billing_info = UserBillingInfoResource()

    class Meta:
        model = TeacherProfileDB
        fields = ["id", "questionnaire", "billing_info", "status"]


class TeacherPublicProfileResource(ModelSerializer):
    questionnaire = QuestionnaireTeacherResource()

    class Meta:
        model = TeacherProfileDB
        fields = ["id", "questionnaire"]


class UserDetailedProfileResource(ModelSerializer):
    teacher_profiles = TeacherPrivateProfileResource(many=True, allow_null=True)
    rate = serializers.DecimalField(
        default=0, max_digits=None, decimal_places=3, coerce_to_string=False
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "about",
            "avatar",
            "teacher_profiles",
            "gender",
            "birthday",
            "rate",
            "hide_birthday",
            "roles",
            "background",
        ]


class UserResource(ModelSerializer):
    public_teacher_profiles = TeacherPublicProfileResource(many=True, allow_null=True)
    rate = serializers.DecimalField(
        default=0, max_digits=None, decimal_places=3, coerce_to_string=False
    )

    def to_representation(self, instance: User) -> Dict:
        data = super().to_representation(instance=instance)
        if instance.hide_birthday:
            data["birthday"] = None
        return data

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "about",
            "avatar",
            "public_teacher_profiles",
            "rate",
            "gender",
            "birthday",
            "roles",
            "background",
        ]
