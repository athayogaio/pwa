from rest_framework.serializers import ModelSerializer

from courses.models import LessonComplaint, ComplaintDecision


class ComplaintResource(ModelSerializer):
    class Meta:
        model = LessonComplaint
        fields = [
            "id",
            "reviewed",
            "category",
            "title",
            "content",
            "lesson",
        ]


class ComplaintResource(ModelSerializer):
    class Meta:
        model = LessonComplaint
        fields = [
            "id",
            "reviewed",
            "category",
            "title",
            "content",
            "lesson",
        ]


class СomplaintDecisionResource(ModelSerializer):
    complaint = ComplaintResource()
    class Meta:
        model = ComplaintDecision
        fields = [
            "id",
            "complaint_id",
            "complaint",
        ]
