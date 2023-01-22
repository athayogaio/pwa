from typing import Optional, Type, Dict

from django.conf import settings
from django.core.paginator import Paginator, EmptyPage
from django.db.models import QuerySet
from rest_framework.request import Request
from rest_framework.serializers import Serializer


class Pagination:
    def __init__(
        self,
        resource: Type[Serializer],
        data: QuerySet,
        request: Request,
        context: Optional[dict] = None,
    ):
        self.data = data
        if not self.data.query.order_by:
            if isinstance(getattr(self.data.model._meta, "ordering", None), list):
                self.data = self.data.order_by(*self.data.model._meta.ordering)
        self.context = context or {}
        self.request = request
        self.resource = resource
        try:
            self.page = int(request.GET.get("page", 1))
        except ValueError:
            self.page = 1
        if self.page < 1:
            self.page = 1

    @property
    def per_page(self) -> int:
        try:
            per_page = (
                int(self.request.GET.get("per_page", settings.DEFAULT_PER_PAGE))
                or settings.DEFAULT_PER_PAGE
            )
        except ValueError:
            per_page = settings.DEFAULT_PER_PAGE
        return per_page

    def paginate(self) -> Dict:
        paginator = Paginator(self.data, self.per_page)
        try:
            output = paginator.page(self.page)
        except EmptyPage:
            output = paginator.page(paginator.num_pages)

        return {
            "data": self.resource(output, many=True, context=self.context).data,
            "links": {
                "current_page": self.page,
                "next_page": output.next_page_number() if output.has_next() else None,
                "prev_page": output.previous_page_number()
                if output.has_previous()
                else 1,
                "last_page": paginator.num_pages,
                "count": self.data.count(),
            },
        }
