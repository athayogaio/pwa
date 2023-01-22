from rest_framework import serializers

from core.app.framework.serializers import UnimplementedSerializer


class CourseCommentCreateRequest(UnimplementedSerializer):
    text = serializers.CharField(max_length=512)
