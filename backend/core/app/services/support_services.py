from core.app.repositories.support_repository import AppealSupportRepository
from core.app.services.types import AppealSupportData
from core.models import User, AppealSupport


class AppealSupportCreate:
    repository = AppealSupportRepository()

    def __init__(self, user: User, data: AppealSupportData):
        self._user = user
        self._data = data

    def _appeal(self) -> AppealSupport:
        appeal = AppealSupport()
        appeal.category = self._data["category"]
        appeal.title = self._data["title"]
        appeal.content = self._data["content"]
        appeal.user = self._user

        return appeal

    def create(self) -> AppealSupport:
        appeal = self._appeal()
        self.repository.store(appeal=appeal)
        return appeal
