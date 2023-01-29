from typing import Any

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from core.app.framework.handlers import GenericHandler, Handler
from core.app.framework.pagination import Pagination
from courses.app.http.resources.question_resources import (
    CourseQuestionResource,
    CourseAnswerResource,
)
from courses.app.repositories.question_repository import CourseQuestionRepository
from courses.app.http.requests.course_requests import (
    CourseQuestionCreateRequest,
    CourseAnswerCreateRequest,
)
from courses.app.services.question_service import (
    CourseQuestionCreate,
    CourseAnswerCreate,
    CourseQuestionRemove,
    CourseAnswerRemove,
)


@permission_classes([IsAuthenticated])
class CourseQuestionCreateHandler(GenericHandler):
    serializer_class = CourseQuestionCreateRequest

    def post(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        question = CourseQuestionCreate(
            course_id=pk,
            author=request.user,
            title=data.validated_data["title"],
            text=data.validated_data["text"],
        ).create()
        return Response({"question": CourseQuestionResource(question).data})


@permission_classes([IsAuthenticated])
class CourseAnswerCreateHandler(GenericHandler):
    serializer_class = CourseAnswerCreateRequest

    def post(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        answer = CourseAnswerCreate(
            question_id=pk, author=request.user, text=data.validated_data["text"]
        ).create()
        return Response({"answer": CourseAnswerResource(answer).data})


class CourseQuestionListHandler(Handler):
    def get(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        questions = CourseQuestionRepository().find_questions_by_course_id(course_id=pk)
        return Response(
            Pagination(
                resource=CourseQuestionResource, data=questions, request=request
            ).paginate()
        )


class CourseAnswerListHandler(Handler):
    def get(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        answers = CourseQuestionRepository().find_answers_by_question_id(question_id=pk)
        return Response(
            Pagination(
                resource=CourseAnswerResource, data=answers, request=request
            ).paginate()
        )


@permission_classes([IsAuthenticated])
class CourseQuestionRemoveHandler(Handler):
    def delete(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        question = CourseQuestionRemove(question_id=pk, user=request.user).remove()
        return Response({"question": CourseQuestionResource(question).data})


@permission_classes([IsAuthenticated])
class CourseAnswerRemoveHandler(Handler):
    def delete(self, request: Request, pk: int, *args: Any, **kwargs: Any) -> Response:
        answer = CourseAnswerRemove(answer_id=pk, user=request.user).remove()
        return Response({"answer": CourseAnswerResource(answer).data})
