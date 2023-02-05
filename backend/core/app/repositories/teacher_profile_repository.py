from core.app.repositories.base_repository import BaseRepository
from core.models import User, TeacherProfileDB, TeacherProfileStatuses


class TeacherProfileRepository(BaseRepository):
    model = TeacherProfileDB

    def store(self, obj: TeacherProfileDB) -> None:
        obj.save()

    def has_moderate_profile(self, user: User) -> bool:
        return self.model.objects.filter(
            user_id=user.id,
            status__in=[
                TeacherProfileStatuses.MODERATION,
                TeacherProfileStatuses.ACCEPTED,
            ],
        )
