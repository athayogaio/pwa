from typing import Any
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from core.app.framework.handlers import GenericHandler, Handler
from core.app.framework.pagination import Pagination
from core.app.http.requests.support_request import AppealSupportRequest
from core.app.http.resources.support_resourse import AppealSupportResource, AppealSupportCategoriesResource
from core.app.repositories.support_repository import AppealSupportRepository, AppealSupportCategoriesRepository
from core.app.services.support_services import AppealSupportCreate


@permission_classes([IsAuthenticated])
class AppealSupportHandler(GenericHandler):
    serializer_class = AppealSupportRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        appeal = AppealSupportCreate(data=data.validated_data, user=self.request.user).create()

        return Response({"data": "Appeal formed"})


@permission_classes([IsAuthenticated])
class AppealRetriveHandler(Handler):
    repository = AppealSupportRepository()

    def get(
            self, request: Request, *args: Any, **kwargs: Any
    ) -> Response:
        appeal = self.repository.find_by_user(user=request.user)
        if not appeal:
            return Response({"data": "You dont have appeal"})
        return Response(Pagination(
            data=appeal, request=request, resource=AppealSupportResource
        ).paginate())


class AppealSupportCategoriesRetriveHandler(Handler):
    repository = AppealSupportCategoriesRepository()

    def get(
            self, request: Request, *args: Any, **kwargs: Any
    ) -> Response:
        category = self.repository.find()

        return Response(Pagination(
            data=category, request=request, resource=AppealSupportCategoriesResource
        ).paginate())
