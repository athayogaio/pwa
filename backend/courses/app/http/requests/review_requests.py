from rest_framework import serializers

from core.app.framework.serializers import UnimplementedSerializer


class CourseReviewCreateRequest(UnimplementedSerializer):
    text = serializers.CharField(max_length=512)
    star_rating = serializers.IntegerField(min_value=1, max_value=5)
