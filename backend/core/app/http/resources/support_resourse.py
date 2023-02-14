from rest_framework.serializers import ModelSerializer

from core.models import AppealSupport, AppealSupportCategories


class AppealSupportResource(ModelSerializer):
    class Meta:
        model = AppealSupport
        fields = [
            "id",
            "created_at",
            "category",
            "title",
            "content",
            "status",
        ]


class AppealSupportCategoriesResource(ModelSerializer):

    class Meta:
        model = AppealSupportCategories
        fields = [
            "id",
            "category"
            ]
