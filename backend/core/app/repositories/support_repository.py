from typing import List

from django.db.models import QuerySet

from core.app.repositories.base_repository import BaseRepository
from core.models import AppealSupport, User


class AppealSupportRepository(BaseRepository):
    model = AppealSupport

    def store(self, appeal: AppealSupport) -> None:
        appeal.save()

    def find_by_user(self, user: User) -> QuerySet[AppealSupport]:
        return self.model.objects.filter(user_id=user.id)

    def bulk_update(self, objs: QuerySet[AppealSupport], fields: List[str]) -> None:
        self.model.objects.bulk_update(objs=objs, fields=fields)
