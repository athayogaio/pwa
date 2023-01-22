from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.models import QuestionnaireTeacher, User
from courses.app.http.resources.context import BaseCourseResourceContext
from courses.models import Course, Lesson, BaseCourse


class LessonResource(ModelSerializer):
    end_at = serializers.DateTimeField(allow_null=True)

    class Meta:
        model = Lesson
        fields = [
            "id",
            "course",
            "start_at",
            "end_at",
        ]


class TeacherShortResource(ModelSerializer):
    class Meta:
        model = QuestionnaireTeacher
        fields = [
            "id",
            "name",
            "surname",
            "user_photo",
        ]


class TeacherUserResource(ModelSerializer):
    teacher_profile = serializers.SerializerMethodField()

    def get_teacher_profile(self, obj: User) -> dict:
        profiles = TeacherShortResource(obj.teacher_profiles, many=True).data
        return next(iter(profiles), {})

    class Meta:
        model = User
        fields = [
            "id",
            "teacher_profile",
        ]


class BaseCourseResource(ModelSerializer):
    class Meta:
        model = BaseCourse
        fields = [
            "id",
            "name",
            "description",
            "course_type",
            "level",
            "teacher",
        ]


class CourseResource(ModelSerializer):
    base_course = BaseCourseResource()

    class Meta:
        model = Course
        fields = [
            "id",
            "base_course",
            "duration",
            "start_datetime",
            "deadline_datetime",
            "payment",
            "price",
            "status",
        ]


class BaseCourseCardResource(ModelSerializer):
    teacher = TeacherUserResource()

    class Meta:
        model = BaseCourse
        fields = [
            "id",
            "name",
            "description",
            "course_type",
            "level",
            "teacher",
        ]


class CourseCardResource(ModelSerializer):
    base_course = BaseCourseCardResource()
    lessons = LessonResource(many=True, allow_null=True)
    reviews_count = serializers.IntegerField(allow_null=True, default=0)
    comments_count = serializers.IntegerField(allow_null=True, default=0)
    tickets_amount = serializers.IntegerField(allow_null=True, default=0)
    participant = serializers.BooleanField(default=False)
    favorite = serializers.BooleanField(default=False)
    votes_count = serializers.IntegerField(default=0)
    rate = serializers.DecimalField(
        default=0, max_digits=None, decimal_places=3, coerce_to_string=False
    )

    def to_representation(self, instance: Course) -> dict:
        result = super().to_representation(instance=instance)
        context: BaseCourseResourceContext = self.context
        if context:
            if context["user"].id == instance.base_course.teacher_id:
                result["link"] = instance.link
                result["link_info"] = instance.link_info
        return result

    class Meta:
        model = Course
        fields = [
            "id",
            "base_course",
            "duration",
            "start_datetime",
            "deadline_datetime",
            "payment",
            "price",
            "lessons",
            "reviews_count",
            "comments_count",
            "tickets_amount",
            "participant",
            "favorite",
            "votes_count",
            "rate",
        ]
