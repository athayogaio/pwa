from core.app.repositories.base_repository import BaseRepository
from core.models import QuestionnaireTeacher


class QuestionnaireTeacherRepository(BaseRepository):
    model = QuestionnaireTeacher

    def store(self, questionnaire: QuestionnaireTeacher) -> None:
        questionnaire.save()
