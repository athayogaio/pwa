import logging

from core.app.framework.queryset import ChunkedQuerySet
from courses.app.repositories.course_repository import CourseRepository
from courses.app.services.course_service import CourseComplete, CourseCompletionError
from server.celery import celery_app

logger = logging.getLogger("default_log")


@celery_app.task
def end_courses_task() -> None:
    courses_iter = ChunkedQuerySet(queryset=CourseRepository().find_ended_courses())
    for course in courses_iter.iter(chunk_size=50):
        try:
            CourseComplete(course=course).complete()
        except CourseCompletionError as e:
            logger.error(e)
            continue
