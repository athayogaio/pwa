from rest_framework.exceptions import NotFound

from core.models import User
from courses.app.repositories.complaint_repository import LessonComplaintRepository, ComplaintDecisionRepository
from courses.app.repositories.lesson_repository import LessonRepository
from courses.app.services.types import LessonComplaintData
from courses.models import LessonComplaint, ComplaintDecision


class LessonComplaintWork:
    repository = LessonComplaintRepository()
    lesson_repository = LessonRepository()

    def __init__(self, user: User, data: LessonComplaintData):
        self._user = user
        self._data = data

    def _complaint(self) -> LessonComplaint:
        complaint = LessonComplaint()
        complaint.category = self._data["category"]
        complaint.title = self._data["title"]
        complaint.content = self._data["content"]
        complaint.author = self._user

        lesson = self.lesson_repository.find_by_id(id_=self._data["lesson_id"])
        if not lesson:
            raise NotFound(f"Undefined lesson with id {self._data['lesson_id']}")
        complaint.lesson = lesson
        return complaint

    def create(self) -> LessonComplaint:
        complaint = self._complaint()
        self.repository.store(complaint=complaint)
        return complaint


class DecisionFeedback:
    repository = ComplaintDecisionRepository()

    def __init__(self, user: User, data):
        self._user = user
        self._data = data

    def update(self) -> ComplaintDecision:
        decision = self.repository.find_by_id(id_=self._data["decision"])
        if not decision:
            raise NotFound(f"Undefined decision with pk {self._data['decision']}")

        decision.decision_rate = self._data['star_rating']
        decision.feedback = True

        self.repository.store(decision)

        return decision
