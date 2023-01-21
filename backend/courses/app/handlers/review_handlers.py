from typing import Any

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from core.app.framework.handlers import GenericHandler, Handler
from core.app.framework.pagination import Pagination
from courses.app.http.requests.review_requests import CourseReviewCreateRequest
from courses.app.http.resources.review_resources import CourseReviewResource
from courses.app.repositories.review_repository import CourseReviewRepository
from courses.app.services.review_service import CourseReviewCreate, CourseReviewRemove


class CourseReviewListHandler(Handler):
    @extend_schema(responses=OpenApiTypes.OBJECT)
    def get(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        reviews = CourseReviewRepository().find_by_course_id(course_id=pk)
        return Response(
            Pagination(
                resource=CourseReviewResource, data=reviews, request=self.request
            ).paginate()
        )


@permission_classes([IsAuthenticated])
class CourseReviewCreateHandler(GenericHandler):
    serializer_class = CourseReviewCreateRequest

    def post(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        review = CourseReviewCreate(
            course_id=pk, data=data.validated_data, user=request.user
        ).create()
        return Response({"review": CourseReviewResource(review).data})


@permission_classes([IsAuthenticated])
class CourseReviewRemoveHandler(Handler):
    @extend_schema(responses=OpenApiTypes.OBJECT)
    def delete(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        review = CourseReviewRemove(review_id=pk, user=request.user).remove()
        return Response({"review": CourseReviewResource(review).data})
