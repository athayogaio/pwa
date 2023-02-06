from typing import NamedTuple

from core.app.services.types import QuestionnaireTeacherData, TeacherBillingInfoData


class TeacherProfileCreateContext(NamedTuple):
    questionnaire_data: QuestionnaireTeacherData
    billing_data: TeacherBillingInfoData
