from typing import Dict, List

from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.models import QuestionnaireTeacher, User
from courses.app.http.resources.context import BaseCourseResourceContext
from courses.models import Course, Lesson, BaseCourse, LessonRatingStar


class DetailedLessonCourseResource(ModelSerializer):
    name = serializers.CharField(source="base_course.name")

    class Meta:
        model = Course
        fields = ["id", "name"]


class LessonDetailResource(ModelSerializer):
    end_at = serializers.DateTimeField(allow_null=True)
    rate_mean = serializers.DecimalField(
        default=0, max_digits=None, decimal_places=3, coerce_to_string=False
    )
    course = DetailedLessonCourseResource()

    class Meta:
        model = Lesson
        fields = [
            "id",
            "course",
            "rate_mean",
            "start_at",
            "end_at",
        ]


class LessonResource(ModelSerializer):
    end_at = serializers.DateTimeField(allow_null=True)
    rate_mean = serializers.DecimalField(
        default=0, max_digits=None, decimal_places=3, coerce_to_string=False
    )

    class Meta:
        model = Lesson
        fields = [
            "id",
            "course",
            "rate_mean",
            "start_at",
            "end_at",
        ]


class LessonRatingStarResource(ModelSerializer):
    class Meta:
        model = LessonRatingStar
        fields = [
            "id",
            "star_rating",
            "user",
            "lesson",
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
            "lesson_participants_limit",
        ]


class CourseResource(ModelSerializer):
    base_course = BaseCourseResource()
    schedule = serializers.SerializerMethodField()

    def get_schedule(self, obj: Course) -> List[Dict]:
        return obj.primitive_schedule_value()

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
            "schedule",
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
            "lesson_participants_limit",
        ]


class CourseCardResource(ModelSerializer):
    base_course = BaseCourseCardResource()
    lessons = LessonResource(many=True, allow_null=True, source="lessons_set")
    reviews_count = serializers.IntegerField(allow_null=True, default=0)
    comments_count = serializers.IntegerField(allow_null=True, default=0)
    tickets_amount = serializers.IntegerField(allow_null=True, default=0)
    participant = serializers.BooleanField(default=False)
    favorite = serializers.BooleanField(default=False)
    votes_count = serializers.IntegerField(default=0)
    rate_mean = serializers.DecimalField(
        default=0, max_digits=None, decimal_places=3, coerce_to_string=False
    )
    tickets_available = serializers.IntegerField(allow_null=True, default=None)
    schedule = serializers.SerializerMethodField()

    def get_schedule(self, obj: Course) -> List[Dict]:
        return obj.primitive_schedule_value()

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
            "rate_mean",
            "tickets_available",
            "schedule",
        ]


class ShortBaseCourseResource(ModelSerializer):
    class Meta:
        model = BaseCourse
        fields = [
            "id",
            "name",
            "teacher_id",
        ]


class ShortImCourseResourse(ModelSerializer):
    base_course = ShortBaseCourseResource()
    lessons = LessonResource(many=True, allow_null=True, source="lessons_set")

    class Meta:
        model = Course
        fields = [
            "id",
            "deadline_datetime",
            "status",
            "base_course",
            "lessons",
        ]
