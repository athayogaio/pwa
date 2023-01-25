from typing import List

from django.db.models import QuerySet, F

from core.app.repositories.base_repository import BaseRepository
from core.models import User
from courses.models import Calendar, Lesson


class CalendarRepository(BaseRepository):
    model = Calendar

    def store(self, calendar: Calendar) -> None:
        calendar.save()

    def find(self, lesson_id: int, user_id: int) -> Lesson:
        return self.model.objects.filter(lesson_id=lesson_id, user_id=user_id).first()

    def find_lesson(self, delete_lesson_id: int, user_id: int) -> Lesson:
        return self.model.objects.filter(id=delete_lesson_id, user_id=user_id).first()

    def remove(self, lesson: Lesson) -> None:
        lesson.delete()

    def find_calendar(self, user_id: int) -> QuerySet[Lesson]:
        return self.model.objects.filter(user_id=user_id)

    def fetch_relations(self, lessons: QuerySet[Lesson]) -> QuerySet[Lesson]:
        return lessons.annotate(end_at=F("start_at") + F("course__duration"))
