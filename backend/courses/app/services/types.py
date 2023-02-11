import datetime
from typing import TypedDict, List, Optional

from courses.models import (
    RepetitionWeekdays,
    CourseTypes,
    CourseLevels,
    CoursePaymentTypes,
    CourseComplexities,
)


class CourseReviewCreateData(TypedDict):
    text: str


class LessonCreateData(TypedDict):
    weekday: RepetitionWeekdays
    start_time: datetime.time


class CourseCreateData(TypedDict):
    name: str
    description: str
    course_type: CourseTypes
    link: str
    link_info: str
    level: CourseLevels
    duration: str
    start_datetime: datetime.datetime
    deadline_datetime: Optional[datetime.datetime]
    payment: CoursePaymentTypes
    price: float
    complexity: CourseComplexities
    lessons: Optional[List[LessonCreateData]]
    lesson_participants_limit: Optional[int]
    is_draft: bool


class CourseUpdateData(TypedDict):
    description: str
    course_type: CourseTypes
    level: CourseLevels
    complexity: CourseComplexities
    price: float
    payment: CoursePaymentTypes


class LessonComplaintData(TypedDict):
    category: str
    title: str
    content: str
    lesson_id: int
