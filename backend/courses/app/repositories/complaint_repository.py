from django.db.models import QuerySet

from core.app.repositories.base_repository import BaseRepository
from core.models import User
from courses.models import LessonComplaint, ComplaintDecision


class LessonComplaintRepository(BaseRepository):
    model = LessonComplaint

    def store(self, complaint: LessonComplaint) -> None:
        complaint.save()

    def find_by_user(self, user: User) -> QuerySet[LessonComplaint]:
        return self.model.objects.filter(decision=False, author=user.id)


class ComplaintDecisionRepository(BaseRepository):
    model = ComplaintDecision

    def find_by_user(self, user: User) -> QuerySet[ComplaintDecision]:
        return self.model.objects.filter(complaint__author=user.id, feedback=False)

    def find_by_id(self, _id: int, ) -> ComplaintDecision:
        return self.model.objects.filter(id=_id).first()

    def store(self, decision: ComplaintDecision) -> None:
        decision.save()
