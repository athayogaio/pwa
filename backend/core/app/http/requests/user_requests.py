from django.conf import settings
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.app.framework.serializers import UnimplementedSerializer, PasswordField
from core.models import GenderTypes


class UserRegisterRequest(UnimplementedSerializer):
    email = serializers.EmailField()
    password = PasswordField()
    password_confirmation = PasswordField()

    def validate(self, attrs: dict) -> dict:
        if attrs["password"] != attrs["password_confirmation"]:
            raise ValidationError(
                "`password` and `password_confirmation` should be equal"
            )
        return attrs


class UserConfirmRegisterRequest(UnimplementedSerializer):
    email = serializers.EmailField()
    register_confirm_code = serializers.CharField(
        max_length=settings.CONFIRMATION_TOKEN_LENGTH,
        min_length=settings.CONFIRMATION_TOKEN_LENGTH,
    )


class UserLoginRequest(UnimplementedSerializer):
    email = serializers.EmailField()
    password = PasswordField()


class UserChangePassRequest(UnimplementedSerializer):
    email = serializers.EmailField()
    password = PasswordField()
    new_password = PasswordField()

    def validate(self, attrs: dict) -> dict:
        if attrs["password"] == attrs["new_password"]:
            raise ValidationError("old and new passwords shouldn't be equal")
        return attrs


class SendTextRequest(UnimplementedSerializer):
    subject = serializers.CharField(min_length=0, max_length=100)
    message = serializers.CharField(min_length=0, max_length=10000)
    receivers = serializers.ListField(min_length=1)


class SendHTMLRequest(UnimplementedSerializer):
    subject = serializers.CharField(min_length=0, max_length=100)
    message = serializers.CharField(min_length=0, max_length=10000)
    receivers = serializers.ListField(min_length=1)


class UserSendPwdResetMailRequest(UnimplementedSerializer):
    email = serializers.EmailField()


class UserResetPassRequest(UnimplementedSerializer):
    pwd_reset_token = serializers.CharField(max_length=128)
    email = serializers.EmailField()
    new_password = PasswordField()


class UserProfileUpdateRequest(UnimplementedSerializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    about = serializers.CharField(max_length=100)
    avatar = serializers.ImageField()
    background = serializers.ImageField()
    birthday = serializers.DateField()
    gender = serializers.ChoiceField(choices=GenderTypes.choices)
    hide_birthday = serializers.BooleanField()
