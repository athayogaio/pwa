from rest_framework import serializers

from articles.app.repositories.article_repositories import ArticleTagRepository
from core.app.framework.serializers import UnimplementedSerializer


class ArticleSearchRequest(UnimplementedSerializer):
    query = serializers.CharField(
        style={"placeholder": "Поиск статей..."}, required=False, allow_blank=True
    )
    tags = serializers.MultipleChoiceField(
        choices=ArticleTagRepository().find_all_tags().values_list("name", flat=True),
        required=False,
        allow_blank=True,
        allow_empty=True,
    )
