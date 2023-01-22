from typing import Any

from django.http import HttpResponseRedirect
from django.shortcuts import redirect
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from core.app.framework.handlers import GenericHandler, Handler
from core.app.framework.pagination import Pagination
from core.app.framework.permissions import IsTeacher
from courses.app.http.requests.course_requests import (
    CourseFilterRequest,
    CourseCreateRequest,
    BaseCourseUpdateRequest,
    FavoriteCourseAddRemoveRequest,
    CourseTicketBuyRequest,
)
from courses.app.http.resources.context import BaseCourseResourceContext
from courses.app.http.resources.course_resources import (
    CourseResource,
    CourseCardResource,
)
from courses.app.repositories.course_repository import CourseRepository
from courses.app.repositories.transaction_repository import TicketTransactionRepository
from courses.app.services.course_service import (
    BaseCourseUpdator,
    CourseEnroll,
)
from courses.app.services.course_service import (
    CourseCreator,
    FavoriteCoursesWork,
    TicketBuy,
)


class CourseFilterHandler(GenericHandler):
    serializer_class = CourseFilterRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data, partial=True)
        data.is_valid(raise_exception=True)

        repository = CourseRepository(user=self.request.user)
        courses = repository.fetch_relations(
            queryset=repository.filter(
                data=data.validated_data,
                base_query=repository.find_public_all(user_id=self.request.user.id),
            )
        )

        return Response(
            Pagination(
                data=courses, request=request, resource=CourseCardResource
            ).paginate()
        )


class CourseRetrieveHandler(Handler):
    @extend_schema(responses=OpenApiTypes.OBJECT)
    def get(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        repository = CourseRepository(user=request.user)
        course = repository.find_by_id(id_=pk, raise_exception=True, fetch_rels=True)
        return Response(
            {
                "data": CourseCardResource(
                    course, context=BaseCourseResourceContext(user=self.request.user)
                ).data
            }
        )


@permission_classes([IsTeacher])
class CourseCreateHandler(GenericHandler):
    serializer_class = CourseCreateRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        course = CourseCreator(
            data=data.validated_data, user=self.request.user
        ).create()

        return Response(
            {
                "data": CourseResource(
                    course, context=BaseCourseResourceContext(user=self.request.user)
                ).data
            }
        )


@permission_classes([IsTeacher])
class BaseCourseUpdateHandler(GenericHandler):
    serializer_class = BaseCourseUpdateRequest

    def patch(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data, partial=True)
        data.is_valid(raise_exception=True)

        course = BaseCourseUpdator(
            user=request.user, data=data.validated_data, pk=pk
        ).update()

        return Response(
            {
                "data": CourseResource(
                    course, context=BaseCourseResourceContext(user=self.request.user)
                ).data
            }
        )


@permission_classes([IsAuthenticated])
class FavoriteCourseAddHandler(GenericHandler):
    serializer_class = FavoriteCourseAddRemoveRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        course = FavoriteCoursesWork(
            user=request.user, course_id=data.validated_data["course_id"]
        ).add()

        return Response(
            {
                "data": CourseResource(
                    course, context=BaseCourseResourceContext(user=self.request.user)
                ).data
            }
        )


@permission_classes([IsAuthenticated])
class FavoriteCourseRemoveHandler(GenericHandler):
    serializer_class = FavoriteCourseAddRemoveRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        course = FavoriteCoursesWork(
            user=self.request.user, course_id=data.validated_data["course_id"]
        ).remove()

        return Response(
            {
                "data": CourseResource(
                    course, context=BaseCourseResourceContext(user=self.request.user)
                ).data
            }
        )


@permission_classes([IsAuthenticated])
class FavoriteCourseListHandler(Handler):
    @extend_schema(responses=OpenApiTypes.OBJECT)
    def get(self, *args: Any, **kwargs: Any) -> Response:
        repository = CourseRepository(user=self.request.user)
        courses = repository.fetch_relations(
            queryset=repository.find_user_favorite_courses(user=self.request.user)
        )
        return Response(
            Pagination(
                data=courses,
                request=self.request,
                resource=CourseCardResource,
                context=BaseCourseResourceContext(user=self.request.user),
            ).paginate()
        )


@permission_classes([IsAuthenticated])
class CourseTicketBuyHandler(GenericHandler):
    serializer_class = CourseTicketBuyRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        payment_url = TicketBuy().buy(
            course_id=data.validated_data["course_id"],
            user=self.request.user,
            amount=data.validated_data["amount"],
        )

        return Response({"data": payment_url})


class SuccessTicketPaymentHandler(Handler):
    repos = TicketTransactionRepository()

    @extend_schema(responses=OpenApiTypes.OBJECT)
    def get(self, request: Request, transaction_id: str) -> HttpResponseRedirect:
        redirect_url = TicketBuy().confirm(transaction_id=transaction_id)
        return redirect(redirect_url)


@permission_classes([IsAuthenticated])
class CourseEnrollHandler(Handler):
    def post(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        CourseEnroll(
            user=self.request.user,
            course=CourseRepository().find_by_id(id_=pk, raise_exception=True),
        ).enroll()
        return Response({"data": "Success"})
