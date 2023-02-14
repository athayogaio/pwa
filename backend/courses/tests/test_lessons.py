from datetime import timedelta
from typing import Optional

import pytest
from django.utils.timezone import now
from rest_framework.exceptions import NotFound, ValidationError

from core.models import UserRoles, User
from core.seeders.user_seeder import UserSeeder
from courses.app.services.lessons_service import LessonReschedule
from courses.models import Course, Lesson, LessonStatuses
from courses.seeders.course_seeder import (
    CourseSeeder,
    BaseCourseSeeder,
    LessonSeeder,
    CourseCycleSeeder,
)


def fake_lesson(user: User, course: Optional[Course] = None) -> Lesson:
    if not course:
        base_course = BaseCourseSeeder(user=user).seed()
        base_course.save()
        course = CourseSeeder(base_course=base_course).seed()
        course.save()
        course_cycle = CourseCycleSeeder(course=course).seed()
        course_cycle.save()

    lesson = LessonSeeder(course=course).seed()
    lesson.save()
    return lesson


def test_lesson_reschedule():
    teacher = UserSeeder().seed()
    teacher.add_roles([UserRoles.TEACHER])
    teacher.save()

    lesson = fake_lesson(user=teacher)
    lesson.status = LessonStatuses.ACTIVE
    lesson.start_at = now() + timedelta(minutes=10)
    lesson.save()
    with pytest.raises(NotFound):
        _ = LessonReschedule(lesson_id=0, user=teacher, reschedule_to=now()).lesson

    reschedule_to_time = now() + timedelta(hours=3)
    reschedule = LessonReschedule(
        lesson_id=lesson.id, user=teacher, reschedule_to=reschedule_to_time
    )
    assert reschedule.lesson.id == lesson.id
    assert reschedule.lesson.course.base_course.teacher_id == teacher.id

    overlap_lesson = fake_lesson(user=teacher)
    overlap_lesson.start_at = reschedule_to_time
    overlap_lesson.save()
    with pytest.raises(ValidationError) as e:
        reschedule.reschedule()
    assert str(overlap_lesson.start_at) in str(e.value)
    overlap_lesson.delete()

    reschedule.current_course_cycle.transferred_lessons_amount = 1000
    print(
        reschedule.current_course_cycle.start_at,
        reschedule.current_course_cycle.end_at,
        lesson.start_at,
    )
    assert reschedule._can_process() is False
    reschedule.current_course_cycle.refresh_from_db()
    transferred_lessons_amount = (
        reschedule.current_course_cycle.transferred_lessons_amount
    )

    reschedule.reschedule()
    reschedule.lesson.refresh_from_db()
    assert (
        reschedule.current_course_cycle.transferred_lessons_amount
        == transferred_lessons_amount + 1
    )
    assert reschedule.lesson.start_at == reschedule_to_time
