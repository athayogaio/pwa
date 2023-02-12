# -*- coding: utf-8 -*-
from django import forms
from django.contrib import admin
from django.db import models
from django.db.models import QuerySet
from django_json_widget.widgets import JSONEditorWidget

from .app.repositories.complaint_repository import LessonComplaintRepository
from .models import (
    BaseCourse,
    Course,
    CourseCycle,
    Review,
    CourseReview,
    Lesson,
    CourseComment,
    Ticket,
    TicketTransaction,
    LessonRatingStar, LessonComplaint, ComplaintDecision,
)


@admin.register(BaseCourse)
class BaseCourseAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created_at",
        "updated_at",
        "name",
        "description",
        "course_type",
        "level",
        "complexity",
        "teacher",
        "lesson_participants_limit",
    )
    list_filter = ("created_at", "updated_at")
    raw_id_fields = ("favorites",)
    search_fields = ("name",)
    date_hierarchy = "created_at"
    formfield_overrides = {
        models.JSONField: {"widget": JSONEditorWidget},
    }


class CourseAdminForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = [
            "base_course",
            "duration",
            "start_datetime",
            "deadline_datetime",
            "link",
            "link_info",
            "payment",
            "price",
            "status",
        ]


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    form = CourseAdminForm
    list_display = (
        "id",
        "created_at",
        "updated_at",
        "base_course",
        "duration",
        "start_datetime",
        "deadline_datetime",
        "link",
        "link_info",
        "payment",
        "price",
        "schedule",
        "status",
    )
    list_filter = (
        "created_at",
        "updated_at",
        "start_datetime",
        "deadline_datetime",
    )
    date_hierarchy = "created_at"


@admin.register(CourseCycle)
class CourseCycleAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created_at",
        "updated_at",
        "course",
        "start_at",
        "end_at",
        "canceled_lessons_amount",
        "transferred_lessons_amount",
    )
    list_filter = (
        "created_at",
        "updated_at",
        "course",
        "start_at",
        "end_at",
    )
    date_hierarchy = "created_at"


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "polymorphic_ctype",
        "id",
        "created_at",
        "updated_at",
        "text",
        "user",
    )
    list_filter = ("created_at", "updated_at")
    date_hierarchy = "created_at"


@admin.register(CourseReview)
class CourseReviewAdmin(admin.ModelAdmin):
    list_display = (
        "polymorphic_ctype",
        "id",
        "created_at",
        "updated_at",
        "text",
        "user",
        "base_course",
    )
    list_filter = ("created_at", "updated_at")
    date_hierarchy = "created_at"


@admin.register(LessonRatingStar)
class LessonRatingStarAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "star_rating",
        "user",
        "lesson",
    )


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created_at",
        "updated_at",
        "course",
        "start_at",
        "status",
    )
    list_filter = ("created_at", "updated_at", "start_at")
    raw_id_fields = ("participants",)
    date_hierarchy = "created_at"


@admin.register(CourseComment)
class CourseCommentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "polymorphic_ctype",
        "text",
        "user",
        "created_at",
        "base_course",
    )
    list_filter = ("created_at",)
    date_hierarchy = "created_at"


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created_at",
        "updated_at",
        "course",
        "user",
        "amount",
    )
    list_filter = ("created_at", "updated_at")
    date_hierarchy = "created_at"


@admin.register(TicketTransaction)
class TicketTransactionAdmin(admin.ModelAdmin):
    list_display = (
        "polymorphic_ctype",
        "id",
        "amount",
        "payment_id",
        "user",
        "status",
        "created_at",
        "updated_at",
        "ticket",
        "ticket_amount",
    )
    list_filter = ("created_at", "updated_at", "ticket")
    date_hierarchy = "created_at"


@admin.register(LessonComplaint)
class LessonComplaintAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created_at",
        "updated_at",
        "reviewed",
        "decision",
        "category",
        "title",
        "content",
        "lesson",
        "author",
    )
    list_filter = ("created_at", "updated_at")
    date_hierarchy = "created_at"
    actions = ["mark_reviewed", "mark_decision"]

    @admin.action(description="Пометить жалобу как прочитанную")
    def mark_reviewed(self, request, queryset: QuerySet[LessonComplaint]):
        repository = LessonComplaintRepository()
        for complaint in queryset:
            complaint.reviewed = True
        repository.bulk_update(objs=queryset, fields=["reviewed"])

    @admin.action(description="Решение написано")
    def mark_decision(self, request, queryset: QuerySet[LessonComplaint]):
        repository = LessonComplaintRepository()
        for complaint in queryset:
            complaint.decision = True
        repository.bulk_update(objs=queryset, fields=["decision"])


@admin.register(ComplaintDecision)
class ComplaintDecisionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created_at",
        "updated_at",
        "decision",
        "feedback",
        "decision_rate",
        "complaint_id",
    )

    list_filter = ("created_at", "updated_at")
    date_hierarchy = "created_at"
