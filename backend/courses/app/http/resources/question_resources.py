from rest_framework.serializers import ModelSerializer

from core.models import User
from courses.models import CourseQuestion, CourseAnswer


class CourseQuestionUserResource(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "avatar",
        ]


class CourseQuestionResource(ModelSerializer):
    author = CourseQuestionUserResource()

    class Meta:
        model = CourseQuestion
        fields = [
            "id",
            "title",
            "text",
            "author",
            "created_at",
        ]


class CourseAnswerResource(ModelSerializer):
    author = CourseQuestionUserResource()

    class Meta:
        model = CourseAnswer
        fields = [
            "id",
            "text",
            "author",
            "created_at",
        ]
