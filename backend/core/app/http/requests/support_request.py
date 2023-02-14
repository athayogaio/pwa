from rest_framework import serializers

from core.app.framework.serializers import UnimplementedSerializer
from core.models import AppealSupportCategories


class AppealSupportRequest(UnimplementedSerializer):
    category = serializers.CharField(max_length=30)
    title = serializers.CharField(max_length=50)
    content = serializers.CharField(max_length=1200)
