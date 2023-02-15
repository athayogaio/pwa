from rest_framework import serializers

from core.app.framework.serializers import UnimplementedSerializer
from core.models import AppealSupportCategory


class AppealSupportRequest(UnimplementedSerializer):
    category_id = serializers.IntegerField(min_value=1)
    title = serializers.CharField(max_length=50)
    content = serializers.CharField(max_length=1200)
