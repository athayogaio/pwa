from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from courses.app.http.resources.course_resources import LessonResource
from courses.models import Calendar


class CalendarResource(ModelSerializer):
    lesson = LessonResource()

    class Meta:
        model = Calendar
        fields = [
            "id",
            "lesson"
        ]
