from rest_framework import serializers

from core.app.framework.serializers import UnimplementedSerializer


class ArticleSearchRequest(UnimplementedSerializer):
    query = serializers.CharField(
        allow_blank=True, style={"placeholder": "Поиск статей..."}
    )
