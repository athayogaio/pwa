from typing import NamedTuple

from core.app.services.types import (
    QuestionnaireTeacherData,
    TeacherBillingDataCreateType,
)
from core.models import UserBillingType


class TeacherProfileCreateContext(NamedTuple):
    questionnaire_data: QuestionnaireTeacherData
    billing_type: UserBillingType
    billing_data: TeacherBillingDataCreateType
