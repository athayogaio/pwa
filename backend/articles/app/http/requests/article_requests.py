from rest_framework import serializers

from core.app.framework.serializers import UnimplementedSerializer


class ArticleSearchRequest(UnimplementedSerializer):
    query = serializers.CharField(
        style={"placeholder": "Поиск статей..."}, required=False, allow_blank=True
    )
