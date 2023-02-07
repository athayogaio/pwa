from typing import Any

from rest_framework.decorators import permission_classes
from rest_framework.exceptions import NotFound
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from core.app.framework.handlers import Handler, GenericHandler
from core.app.http.requests.user_requests import (
    UserRegisterRequest,
    UserConfirmRegisterRequest,
    UserLoginRequest,
    UserChangePassRequest,
    UserResetPassRequest,
    UserSendPwdResetMailRequest,
    UserProfileUpdateRequest,
)
from core.app.http.resources.user_resources import UserResource, UserDetailedProfile
from core.app.repositories.user_repository import UserRepository
from core.app.services.user_services import (
    UserRegister,
    UserRegisterConfirm,
    UserLogin,
    UserChangePass,
    UserResetPass,
    UserProfileUpdator,
)


class UserRegisterHandler(GenericHandler):
    serializer_class = UserRegisterRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        UserRegister(data=data.validated_data).register()
        return Response("Success")


class UserRegisterConfirmHandler(GenericHandler):
    serializer_class = UserConfirmRegisterRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        user, token = UserRegisterConfirm(data=data.validated_data).confirm()
        return Response(
            {"data": {"user": UserResource(user).data, "tokens": token._asdict()}}
        )


class UserLoginHandler(GenericHandler):
    serializer_class = UserLoginRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        user, token = UserLogin(data=data.validated_data).login()
        return Response(
            {"data": {"user": UserResource(user).data, "tokens": token._asdict()}}
        )


class UserChangePassHandler(GenericHandler):
    serializer_class = UserChangePassRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        user, token = UserChangePass(data=data.validated_data).change()
        return Response(
            {"data": {"user": UserResource(user).data, "tokens": token._asdict()}}
        )


class UserSendPwdResetMailHandler(GenericHandler):
    serializer_class = UserSendPwdResetMailRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        UserResetPass().reset(email=data.validated_data["email"])
        return Response("Success")


class UserResetPassHandler(GenericHandler):
    serializer_class = UserResetPassRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        user, token = UserResetPass().change(
            new_password=data.validated_data["new_password"],
            email=data.validated_data["email"],
            pwd_reset_token=data.validated_data["pwd_reset_token"],
        )
        return Response(
            {"data": {"user": UserResource(user).data, "tokens": token._asdict()}}
        )


@permission_classes([IsAuthenticated])
class LoggedUserProfileHandler(Handler):
    repository = UserRepository()

    def get(self, *args: Any, **kwargs: Any) -> Response:
        user = self.repository.find_by_id(id_=self.request.user.id, fetch_rels=True)
        return Response({"data": UserDetailedProfile(user).data})


class UserProfileHandler(Handler):
    repository = UserRepository()

    def get(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        user = self.repository.find_by_id(id_=pk, fetch_rels=True)
        if not user:
            raise NotFound(f"Undefined user with pk {pk}")

        return Response({"data": UserResource(user).data})


@permission_classes([IsAuthenticated])
class UserProfileUpdateHandler(GenericHandler):
    serializer_class = UserProfileUpdateRequest
    parser_classes = [MultiPartParser]

    def patch(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data, partial=True)
        data.is_valid(raise_exception=True)
        user = UserProfileUpdator(
            user=self.request.user, data=data.validated_data
        ).update()
        repository = UserRepository()

        return Response(
            {
                "data": UserResource(
                    repository.find_by_id(id_=user.id, fetch_rels=True)
                ).data
            }
        )
