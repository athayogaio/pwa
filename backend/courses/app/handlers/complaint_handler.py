from typing import Any
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from core.app.framework.handlers import GenericHandler, Handler
from core.app.framework.pagination import Pagination
from courses.app.http.requests.complaint_request import LessonComplaintRequest, FeedbackDecision
from courses.app.http.resources.complaint_resources import ComplaintResource, ComplaintDecisionResource
from courses.app.repositories.complaint_repository import LessonComplaintRepository, ComplaintDecisionRepository
from courses.app.services.complaint_service import LessonComplaintWork, DecisionFeedback


@permission_classes([IsAuthenticated])
class LessonComplaintHandler(GenericHandler):
    serializer_class = LessonComplaintRequest

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        complaint = LessonComplaintWork(data=data.validated_data, user=self.request.user).create()

        return Response({"data": "Сomplaint formed"})


@permission_classes([IsAuthenticated])
class ComplaintRetriveHandler(Handler):
    repository = LessonComplaintRepository()

    def get(
            self, request: Request, *args: Any, **kwargs: Any
    ) -> Response:
        complaint = self.repository.find_by_user(user=request.user)
        if not complaint:
            return Response({"data": "You dont have complaint"})
        return Response(Pagination(
            data=complaint, request=request, resource=ComplaintResource
        ).paginate())


@permission_classes([IsAuthenticated])
class ComplaintDecisionHandler(Handler):
    repository = ComplaintDecisionRepository()

    def get(
            self, request: Request, *args: Any, **kwargs: Any
    ) -> Response:
        decision = self.repository.find_by_user(user=request.user)
        if not decision:
            return Response({"data": "You dont have decision for now"})
        return Response(Pagination(
            data=decision, request=request, resource=ComplaintDecisionResource
        ).paginate())


@permission_classes([IsAuthenticated])
class DecisionRateFeedbackHandler(GenericHandler):
    serializer_class = FeedbackDecision

    def patch(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        decision = DecisionFeedback(
            user=request.user, data=data.validated_data).update()

        return Response({"data": "Thank you for feedback"})
