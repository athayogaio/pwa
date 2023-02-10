from core.app.repositories.base_repository import BaseRepository
from core.models import (
    LegalUserBillingInfo,
    LegalBillingInfoModelType,
    IndividualUserBillingInfo,
    IndividualBillingInfoModelType,
)


class UserLegalBillingInfoRepository(BaseRepository):
    model = LegalUserBillingInfo

    def store(self, obj: LegalBillingInfoModelType) -> None:
        obj.save()


class UserIndividualBillingInfoRepository(BaseRepository):
    model = IndividualUserBillingInfo

    def store(self, obj: IndividualBillingInfoModelType) -> None:
        obj.save()
