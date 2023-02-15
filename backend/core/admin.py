# -*- coding: utf-8 -*-
from django.contrib import admin
from django.core.handlers.wsgi import WSGIRequest
from django.db import models
from django.db.models import QuerySet
from django_json_widget.widgets import JSONEditorWidget

from .app.http.resources.support_resourse import AppealSupportCategoriesResource
from .app.repositories.support_repository import AppealSupportRepository
from .app.services.email_services import SimpleEmailTextService
from .app.services.types import TextMailData
from .models import Attachment, User, Transaction, QuestionnaireTeacher, Comment, AppealSupport, AppealSupportStatus, \
    AppealSupportCategory


@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "polymorphic_ctype",
        "image",
        "created_at",
        "updated_at",
    )
    list_filter = ("polymorphic_ctype", "created_at", "updated_at")
    date_hierarchy = "created_at"


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "password",
        "last_login",
        "is_superuser",
        "username",
        "is_staff",
        "is_active",
        "date_joined",
        "first_name",
        "last_name",
        "email",
        "about",
        "avatar",
        "roles",
        "register_confirm_code",
        "pwd_reset_token",
        "sys_rate",
        "background",
    )
    list_filter = (
        "last_login",
        "is_superuser",
        "is_staff",
        "is_active",
        "date_joined",
    )
    raw_id_fields = ("groups", "user_permissions")
    formfield_overrides = {
        models.JSONField: {"widget": JSONEditorWidget},
    }


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = (
        "polymorphic_ctype",
        "id",
        "amount",
        "payment_id",
        "user",
        "status",
        "created_at",
        "updated_at",
    )
    list_filter = ("created_at", "updated_at")
    date_hierarchy = "created_at"


@admin.register(QuestionnaireTeacher)
class QuestionnaireTeacherAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created_at",
        "updated_at",
        "name",
        "surname",
        "date_of_birth",
        "gender",
        "about_me",
        "work_experience",
        "vk_link",
        "telegram_link",
        "user_photo",
        "passport_photo",
        "user_with_passport_photo",
    )
    list_filter = ("created_at", "updated_at", "date_of_birth")
    raw_id_fields = ("certificate_photos",)
    search_fields = ("name",)
    date_hierarchy = "created_at"


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "polymorphic_ctype", "text", "user", "created_at")
    list_filter = ("created_at",)
    date_hierarchy = "created_at"


@admin.register(AppealSupportCategory)
class AppealSupportCategoriesAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "category")


@admin.register(AppealSupport)
class AppealSupportAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "status",
        "user",
        "created_at",
        "category",
        "title",
        "content",

    )
    list_filter = ("created_at", "updated_at")
    date_hierarchy = "created_at"
    actions = ["mailing_reject_appeal", "mark_in_process", "mark_closed"]

    @admin.action(description="Отказать")
    def mailing_reject_appeal(self, request: WSGIRequest, queryset: QuerySet[AppealSupport]):
        repository = AppealSupportRepository()
        for item in queryset:
            item.status = AppealSupportStatus.REJECTED
            SimpleEmailTextService(
                data=TextMailData(
                    subject=f"Вашa {item.category} отклонена",
                    message=f"Дорогой пользователь тыр тыр",
                    receivers=[item.user.email],
                )
            ).send()
        repository.bulk_update(objs=queryset, fields=["status"])

    @admin.action(description="Отметить прочитанным")
    def mark_in_process(self, request: WSGIRequest, queryset: QuerySet[AppealSupport]):
        repository = AppealSupportRepository()
        for item in queryset:
            item.status = AppealSupportStatus.IN_PROCESS
        repository.bulk_update(objs=queryset, fields=["status"])

    @admin.action(description="Ответ написан")
    def mark_closed(self, request: WSGIRequest, queryset: QuerySet[AppealSupport]):
        repository = AppealSupportRepository()
        for item in queryset:
            item.status = AppealSupportStatus.CLOSED
        repository.bulk_update(objs=queryset, fields=["status"])
