from typing import Any

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.app.http.resources.ticket_resourses import TicketResource
from courses.app.repositories.ticket_repository import TicketRepository


@permission_classes([IsAuthenticated])
class TicketListHandler(APIView):
    @extend_schema(responses=OpenApiTypes.OBJECT)
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        repository = TicketRepository()
        data = repository.fetch_relations(
            queryset=repository.find_user_tickets(user_id=request.user.id)
        )

        return Response({"data": TicketResource(data, many=True).data})
