from rest_framework import serializers

from core.app.framework.serializers import UnimplementedSerializer
from core.models import AppealSupportCategories


class AppealSupportRequest(UnimplementedSerializer):
    category = serializers.ChoiceField(choices=AppealSupportCategories.choices)
    title = serializers.CharField(max_length=120)
    content = serializers.CharField(max_length=1200)
