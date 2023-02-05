from core.app.repositories.base_repository import BaseRepository
from core.models import UserBillingInfo, BillingInfoModelType


class UserBillingInfoRepository(BaseRepository):
    model = UserBillingInfo

    def store(self, obj: BillingInfoModelType) -> None:
        obj.save()
