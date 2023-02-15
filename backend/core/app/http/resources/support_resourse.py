from rest_framework.serializers import ModelSerializer

from core.models import AppealSupport, AppealSupportCategory


class AppealSupportCategoriesResource(ModelSerializer):
    class Meta:
        model = AppealSupportCategory
        fields = [
            "id",
            "category"
        ]


class AppealSupportResource(ModelSerializer):
    category = AppealSupportCategoriesResource()

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
