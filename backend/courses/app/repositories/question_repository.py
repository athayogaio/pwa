from typing import Optional

from django.db.models import QuerySet

from core.app.repositories.base_repository import BaseRepository
from courses.models import CourseQuestion, CourseAnswer


class CourseQuestionRepository(BaseRepository):
    question_model = CourseQuestion
    answer_model = CourseAnswer

    def store_question(self, question: CourseQuestion) -> None:
        question.save()

    def store_answer(self, answer: CourseAnswer) -> None:
        answer.save()

    def find_question_by_id(self, id_: int) -> Optional[CourseQuestion]:
        return self.question_model.objects.filter(id=id_).first()

    def find_answer_by_id(self, id_: int) -> Optional[CourseAnswer]:
        return self.answer_model.objects.filter(id=id_).first()

    def find_questions_by_course_id(self, course_id: int) -> QuerySet[CourseQuestion]:
        return self.question_model.objects.filter(course_id=course_id)

    def find_answers_by_question_id(self, question_id: int) -> QuerySet[CourseAnswer]:
        return self.answer_model.objects.filter(question_id=question_id)

    def remove_question(self, question: CourseQuestion) -> None:
        question.delete()

    def remove_answer(self, answer: CourseAnswer) -> None:
        answer.delete()
