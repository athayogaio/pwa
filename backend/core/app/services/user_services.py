import random
import uuid
from functools import cached_property
from typing import Tuple

from django.conf import settings
from django.core.cache import cache
from rest_framework.exceptions import (
    ValidationError,
    AuthenticationFailed,
    PermissionDenied,
)

from core.app.errors import ErrorsMessages
from core.app.repositories.user_repository import UserRepository
from core.app.services.email_services import SimpleEmailTextService
from core.app.services.types import TextMailData, UserProfileUpdateData
from core.app.services.types import (
    UserRegisterData,
    UserRegisterConfirmData,
    UserLoginData,
    UserChangePassData,
)
from core.app.utils.jwt import UserToken, get_tokens_for_user
from core.app.utils.profile_photo_creator import ProfilePhotoCreator
from core.app.utils.util import setup_resource_attributes
from core.models import User


class UserRegisterConfirm:
    repository = UserRepository()

    def __init__(self, data: UserRegisterConfirmData):
        self.data = data

    def confirm(self) -> Tuple[User, UserToken]:
        user = self.repository.find_by_email(self.data["email"], fetch_rels=True)
        if not user:
            raise PermissionDenied("User with this email does not exist")
        if self.data["register_confirm_code"] != user.register_confirm_code:
            raise AuthenticationFailed("Codes don't match")
        user.is_active = True
        user.register_confirm_code = None
        self.repository.store(user=user)
        token_data = get_tokens_for_user(user)
        return user, token_data


class UserRegister:
    repository = UserRepository()

    def __init__(self, data: UserRegisterData):
        self.data = data

    @cached_property
    def user(self) -> User:
        user = self.repository.find_by_email(self.data["email"])
        if user and user.is_active:
            raise ValidationError("User with this email already exists")
        if cache.get(self.data["email"]):
            cache.set(self.data["email"], True, 55)
            raise PermissionDenied("Too many requests per minute")
        cache.set(self.data["email"], True, 55)
        user = user if user else User()
        user.username = user.email = self.data["email"]
        user.set_password(self.data["password"])
        user.is_active = False
        return user

    def _send_confirmation_mail(self, confirm_code: str) -> None:
        SimpleEmailTextService(
            data=TextMailData(
                subject="Регистрация в Atha.Yoga",
                message=f"Дорогой пользователь, для завершения процедуры регистрации на платформе Atha.Yoga, "
                f"пожалуйста, введите следующий "
                f"код:\n{confirm_code}.\n"
                f"Если Вы не регистрировались на платформе, просто проигнорируйте это письмо."
                f"\nС уважением и заботой,\nкоманда ATHAYOGA.",
                receivers=[self.user.email],
            )
        ).send()

    def register(self) -> None:
        confirm_code = "".join(
            random.choices("0123456789", k=settings.CONFIRMATION_TOKEN_LENGTH)
        )
        self._send_confirmation_mail(confirm_code=confirm_code)
        self.user.register_confirm_code = confirm_code
        self.repository.store(self.user)


class UserLogin:
    repository = UserRepository()

    def __init__(self, data: UserLoginData):
        self.data = data

    @cached_property
    def user(self) -> User:
        user = self.repository.find_by_email(self.data["email"], fetch_rels=True)
        if not user or not user.check_password(self.data["password"]):
            raise AuthenticationFailed(ErrorsMessages.AUTH_FAILED.value)
        return user

    def login(self) -> Tuple[User, UserToken]:
        token_data = get_tokens_for_user(self.user)
        return self.user, token_data


class UserChangePass:
    repository = UserRepository()

    def __init__(self, data: UserChangePassData):
        self.data = data

    @cached_property
    def user(self) -> User:
        user = self.repository.find_by_email(self.data["email"], fetch_rels=True)
        if not user or not user.check_password(self.data["password"]):
            raise AuthenticationFailed()
        user.set_password(self.data["new_password"])
        return user

    def change(self) -> Tuple[User, UserToken]:
        self.repository.store(self.user)
        token_data = get_tokens_for_user(self.user)
        return self.user, token_data


class UserResetPass:
    repository = UserRepository()

    def _send_confirmation_mail(self, email: str, token: str) -> None:
        SimpleEmailTextService(
            data=TextMailData(
                subject="Восстановление пароля",
                message=f"Дорогой пользователь, для восстановления доступа к Atha.Yoga, "
                f"пожалуйста, перейдите по следующей "
                f"ссылке: <a href='{settings.SITE_URL}/reset-password/{token}/'>Ссылка</a>.\n"
                f"Если Вы не запрашивали восстановление пароля, просто проигнорируйте это письмо."
                f"\nС уважением и заботой,\nкоманда ATHAYOGA.",
                receivers=[email],
            )
        ).send()

    def reset(self, email: str) -> None:
        user = self.repository.find_by_email(email)
        if not user:
            raise PermissionDenied("User with this email does not exist")
        pwd_reset_token = str(uuid.uuid4())
        self._send_confirmation_mail(email=email, token=pwd_reset_token)
        user.pwd_reset_token = pwd_reset_token
        self.repository.store(user=user)

    def change(
        self, new_password: str, email: str, pwd_reset_token: str
    ) -> Tuple[User, UserToken]:
        user = self.repository.find_by_email(email=email, fetch_rels=True)
        if not user:
            raise PermissionDenied("User with this email does not exist")
        if pwd_reset_token != user.pwd_reset_token:
            raise AuthenticationFailed("Tokens don't match")
        user.set_password(new_password)
        self.repository.store(user=user)
        token_data = get_tokens_for_user(user)
        return user, token_data


class UserProfileUpdator:
    repository = UserRepository()

    def __init__(self, user: User, data: UserProfileUpdateData):
        self.user = user
        self.data = data

    def update(self) -> User:
        if username := self.data.pop("username", None):
            self.repository.update_username(self.user, username)

        if "avatar" in self.data:
            self.user.avatar = ProfilePhotoCreator(
                photo=self.data.pop("avatar")
            ).create()
        setup_resource_attributes(
            instance=self.user,
            validated_data=self.data,
            fields=list(UserProfileUpdateData.__annotations__.keys()),
        )
        self.repository.store(self.user)

        return self.user
