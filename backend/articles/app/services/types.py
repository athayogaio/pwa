from typing import TypedDict, Optional


class ArticleFilterData(TypedDict, total=False):
    query: Optional[str]
