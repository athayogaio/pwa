from typing import List, Optional

from rest_framework.exceptions import NotFound

from core.app.repositories.base_repository import BaseRepository
from courses.models import LessonEnrolledUser


class LessonEnrolledUserRepository(BaseRepository):
    model = LessonEnrolledUser

    def bulk_create(self, objs: List[LessonEnrolledUser]) -> None:
        self.model.objects.bulk_create(objs)

    def store(self, enrolled_user: LessonEnrolledUser) -> None:
        enrolled_user.save()

    def find_by_user_lesson(
        self, user_id: int, lesson_id: int, raise_exception: bool = False
    ) -> Optional[LessonEnrolledUser]:
        enrolled_user = self.model.objects.filter(user_id=user_id, lesson_id=lesson_id)
        if not enrolled_user and raise_exception:
            raise NotFound(
                f"Undefined user course schedule for lesson {lesson_id} and user {user_id}"
            )
        return enrolled_user
