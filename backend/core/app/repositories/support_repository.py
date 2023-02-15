from typing import List

from django.db.models import QuerySet

from core.app.repositories.base_repository import BaseRepository
from core.models import AppealSupport, User, AppealSupportCategory


class AppealSupportRepository(BaseRepository):
    model = AppealSupport

    def store(self, appeal: AppealSupport) -> None:
        appeal.save()

    def find_by_user(self, user: User) -> QuerySet[AppealSupport]:
        return self.model.objects.filter(user_id=user.id)

    def bulk_update(self, objs: QuerySet[AppealSupport], fields: List[str]) -> None:
        self.model.objects.bulk_update(objs=objs, fields=fields)


class AppealSupportCategoriesRepository(BaseRepository):
    model = AppealSupportCategory

    def find_all(self) -> QuerySet[AppealSupportCategory]:
        return self.model.objects.all()

    def find_by_id(self, id_: int) -> AppealSupportCategory:
        return self.model.objects.filter(id=id_).first()
