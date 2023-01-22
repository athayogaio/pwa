from typing import List, TypeVar, Iterator

from django.db.models import QuerySet

T = TypeVar("T")


class OrderedQuerySet:
    def __init__(self, queryset: QuerySet[T]) -> None:
        self._queryset = queryset

    def order_by(self, columns: List[str]) -> QuerySet[T]:
        return self._queryset.order_by(*columns)


class ChunkedQuerySet:
    def __init__(self, queryset: QuerySet[T]) -> None:
        self.queryset = queryset

    def iter(self, chunk_size: int) -> Iterator[T]:
        return self.queryset.iterator(chunk_size=chunk_size)
