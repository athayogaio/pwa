from django.core.paginator import Page, Paginator
from django.db.models import QuerySet
from rest_framework.request import Request


def paginate(request: Request, queryset: QuerySet, per_page: int = 1) -> Page:
    paginator = Paginator(queryset, per_page)
    page_number = request.GET.get("page")
    return paginator.get_page(page_number)
