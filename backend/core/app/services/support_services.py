from core.app.repositories.support_repository import AppealSupportRepository, AppealSupportCategoriesRepository
from core.app.services.types import AppealSupportData
from core.models import User, AppealSupport, AppealSupportStatus


class AppealSupportCreate:
    repository = AppealSupportRepository()
    categories_repository = AppealSupportCategoriesRepository()

    def __init__(self, user: User, data: AppealSupportData):
        self._user = user
        self._data = data

    def _appeal(self) -> AppealSupport:
        appeal = AppealSupport()
        appeal.category = self.categories_repository.find_by_id(self._data["category_id"])
        appeal.title = self._data["title"]
        appeal.content = self._data["content"]
        appeal.user = self._user
        appeal.status = AppealSupportStatus.OPEN

        return appeal

    def create(self) -> AppealSupport:
        appeal = self._appeal()
        self.repository.store(appeal=appeal)
        return appeal
