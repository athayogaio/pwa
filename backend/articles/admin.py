from django.contrib import admin
from django.forms import ModelForm
from django.http import HttpRequest
from django_mptt_admin.admin import DjangoMpttAdmin

from articles.app.repositories.article_repositories import (
    ArticleRepository,
    ArticleCategoryRepository,
    ArticleTagRepository,
)
from articles.models import Article, Category, ArticleComment, Tag


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "author",
        "rating",
        "category",
        "published",
        "created_at",
        "updated_at",
    )
    list_filter = (
        "published",
        "category",
        "created_at",
        "updated_at",
    )
    date_hierarchy = "created_at"
    prepopulated_fields = {"slug": ("title",)}

    def save_model(
        self, request: HttpRequest, obj: Article, form: ModelForm, change: bool
    ) -> None:
        ArticleRepository().store(obj)


@admin.register(Category)
class CategoryAdmin(DjangoMpttAdmin):
    prepopulated_fields = {"slug": ("name",)}

    def save_model(
        self, request: HttpRequest, obj: Category, form: ModelForm, change: bool
    ) -> None:
        ArticleCategoryRepository().store(obj)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    list_display = ("name",)

    def save_model(
        self, request: HttpRequest, obj: Tag, form: ModelForm, change: bool
    ) -> None:
        ArticleTagRepository().store(obj)


@admin.register(ArticleComment)
class ArticleCommentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "polymorphic_ctype",
        "text",
        "user",
        "created_at",
        "article",
    )
    list_filter = ("created_at",)
    date_hierarchy = "created_at"
