from core.app.framework.serializers import UnimplementedSerializer
from rest_framework import serializers

from courses.models import ComplaintsCategories


class LessonComplaintRequest(UnimplementedSerializer):
    category = serializers.ChoiceField(choices=ComplaintsCategories.choices)
    title = serializers.CharField(max_length=120)
    content = serializers.CharField(max_length=1200)
    lesson_id = serializers.IntegerField(min_value=1)


class FeedbackDecision(UnimplementedSerializer):
    decision = serializers.IntegerField(min_value=1)
    star_rating = serializers.IntegerField(min_value=1, max_value=5)
