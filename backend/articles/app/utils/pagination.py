from django.core.paginator import Page, Paginator
from django.db.models import QuerySet
from rest_framework.request import Request


class TMPLPagination:
    def __init__(self, request: Request, queryset: QuerySet, per_page: int = 1) -> None:
        self.per_page = per_page
        self.queryset = queryset
        self.request = request

    def paginate(self) -> Page:
        paginator = Paginator(self.queryset, self.per_page)
        page_number = self.request.GET.get("page")
        return paginator.get_page(page_number)
