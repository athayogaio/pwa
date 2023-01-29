from functools import cached_property

from rest_framework.exceptions import NotFound, PermissionDenied

from core.app.repositories.user_repository import UserRepository
from core.models import User
from courses.app.repositories.question_repository import CourseQuestionRepository
from courses.app.repositories.course_repository import BaseCourseRepository
from courses.models import CourseQuestion, CourseAnswer


class CourseQuestionCreate:
    repository = CourseQuestionRepository()
    user_repository = UserRepository()
    course_repository = BaseCourseRepository()

    def __init__(self, course_id: int, author: User, title: str, text: str):
        self.title = title
        self.text = text
        self.user = author
        self.course_id = course_id

    @cached_property
    def question(self) -> CourseQuestion:
        course = self.course_repository.find_by_id(id_=self.course_id)
        if not course:
            raise NotFound(f"Undefined course with id {self.course_id}")

        question = CourseQuestion()
        question.author = self.user
        question.course = course
        question.title = self.title
        question.text = self.text

        return question

    def create(self) -> CourseQuestion:
        self.repository.store_question(question=self.question)
        return self.question


class CourseQuestionRemove:
    repository = CourseQuestionRepository()

    def __init__(self, question_id: int, user: User):
        self.question_id = question_id
        self.user = user

    @cached_property
    def question(self) -> CourseQuestion:
        question = self.repository.find_question_by_id(id_=self.question_id)
        if not question:
            raise NotFound(f"Undefined question with id {self.question_id}")
        if question.author.id != self.user.id:
            raise PermissionDenied(
                f"User with id {self.user.id} can't remove question with id {self.question_id}"
            )

        return question

    def remove(self) -> CourseQuestion:
        self.repository.remove_question(question=self.question)
        return self.question


class CourseAnswerCreate:
    repository = CourseQuestionRepository()
    user_repository = UserRepository()

    def __init__(self, question_id: int, author: User, text: str):
        self.text = text
        self.user = author
        self.question_id = question_id

    @cached_property
    def answer(self) -> CourseAnswer:
        question = self.repository.find_question_by_id(id_=self.question_id)
        if not question:
            raise NotFound(f"Undefined question with id {self.question_id}")

        answer = CourseAnswer()
        answer.author = self.user
        answer.question = question
        answer.text = self.text

        return answer

    def create(self) -> CourseAnswer:
        self.repository.store_answer(answer=self.answer)
        return self.answer


class CourseAnswerRemove:
    repository = CourseQuestionRepository()

    def __init__(self, answer_id: int, user: User):
        self.answer_id = answer_id
        self.user = user

    @cached_property
    def answer(self) -> CourseAnswer:
        answer = self.repository.find_answer_by_id(id_=self.answer_id)
        if not answer:
            raise NotFound(f"Undefined answer with id {self.answer_id}")
        if answer.author.id != self.user.id:
            raise PermissionDenied(
                f"User with id {self.user.id} can't remove answer with id {self.answer_id}"
            )

        return answer

    def remove(self) -> CourseAnswer:
        self.repository.remove_answer(answer=self.answer)
        return self.answer
