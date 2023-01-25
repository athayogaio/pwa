from django.db.models import QuerySet

from core.models import User
from courses.app.repositories.calendar_repository import CalendarRepository
from courses.models import Calendar, Lesson
from functools import cached_property


class CalendarCreate:
    repository = CalendarRepository()

    def __init__(self, user: User, lessons: QuerySet[Lesson]):
        self.user = user
        self.lessons = lessons

    def create(self) -> None:
        for lesson in self.lessons:
            if not self.repository.find(lesson_id=lesson.id, user_id=self.user.id):
                self.repository.store(calendar=self._calendar(lesson=lesson))

    def _calendar(self, lesson: Lesson) -> Calendar:
        calendar = Calendar()
        calendar.user = self.user
        calendar.lesson = lesson
        return calendar


class CalendarRemove:
    repository = CalendarRepository()

    def __init__(self, user: User, delete_lesson_id: int):
        self.user_id = user.id
        self.delete_lesson_id = delete_lesson_id

    @cached_property
    def lesson(self) -> Lesson:
        lesson = self.repository.find_lesson(user_id=self.user_id, delete_lesson_id=self.delete_lesson_id)
        return lesson

    def remove(self) -> Lesson:
        self.repository.remove(lesson=self.lesson)
        return self.lesson
