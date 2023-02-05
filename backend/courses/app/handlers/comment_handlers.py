from typing import Any

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from core.app.framework.handlers import Handler, GenericHandler
from core.app.framework.pagination import Pagination
from courses.app.http.requests.comment_requests import CourseCommentCreateRequest
from courses.app.http.resources.comment_resources import CourseCommentResource
from courses.app.repositories.comment_repository import CourseCommentRepository
from courses.app.services.comment_service import (
    CourseCommentCreate,
    CourseCommentRemove,
)


class CourseCommentListHandler(Handler):
    def get(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        comments = CourseCommentRepository().find_by_course_id(course_id=pk)
        return Response(
            Pagination(
                resource=CourseCommentResource, data=comments, request=self.request
            ).paginate()
        )


@permission_classes([IsAuthenticated])
class CourseCommentCreateHandler(GenericHandler):
    serializer_class = CourseCommentCreateRequest

    def post(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        comment = CourseCommentCreate(
            course_id=pk, text=data.validated_data["text"], user=request.user
        ).create()
        return Response({"comment": CourseCommentResource(comment).data})


@permission_classes([IsAuthenticated])
class CourseCommentRemoveHandler(Handler):
    def delete(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        comment = CourseCommentRemove(comment_id=pk, user=request.user).remove()
        return Response({"comment": CourseCommentResource(comment).data})
