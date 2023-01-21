from typing import List, TypeVar

from django.db.models import QuerySet

T = TypeVar("T")


class OrderedQueryset:
    def __init__(self, queryset: QuerySet[T]) -> None:
        self._queryset = queryset

    def order_by(self, columns: List[str]) -> QuerySet[T]:
        return self._queryset.order_by(*columns)
