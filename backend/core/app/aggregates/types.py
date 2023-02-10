from typing import NamedTuple

from core.app.services.types import (
    QuestionnaireTeacherData,
)


class TeacherProfileCreateContext(NamedTuple):
    questionnaire_data: QuestionnaireTeacherData
