from rest_framework import serializers

from core.app.framework.serializers import UnimplementedSerializer


class CalendarLessonsAddRequest(UnimplementedSerializer):
    course_id = serializers.IntegerField(min_value=1)


class CalendarLessonRemoveRequest(UnimplementedSerializer):
    delete_lesson_id = serializers.IntegerField(min_value=1)
