# -*- coding: utf-8 -*-
from django import forms
from django.contrib import admin
from django.db import models
from django_json_widget.widgets import JSONEditorWidget

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
        "star_rating",
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
        "star_rating",
        "user",
        "base_course",
    )
    list_filter = ("created_at", "updated_at")
    date_hierarchy = "created_at"


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
