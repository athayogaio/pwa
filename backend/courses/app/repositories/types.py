import datetime
from typing import TypedDict, Optional

from courses.models import CourseComplexities


class CourseFilterData(TypedDict, total=False):
    query: Optional[str]
    complexity: Optional[CourseComplexities]
    day: Optional[int]
    start_datetime: Optional[datetime.datetime]
    end_datetime: Optional[datetime.datetime]


class LessonFilterData(TypedDict, total=False):
    creator: Optional[bool]
    enrolled: Optional[bool]
    start_datetime: Optional[datetime.datetime]
    end_datetime: Optional[datetime.datetime]
