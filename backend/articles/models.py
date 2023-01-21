from typing import Any

from ckeditor.fields import RichTextField
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.template.defaultfilters import slugify, striptags
from django.urls import reverse
from mptt.models import MPTTModel, TreeForeignKey

from core.models import TimeStampedModel, User, Comment


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Тэг"
        verbose_name_plural = "Тэги"

    def __str__(self) -> str:
        return self.name


class Article(TimeStampedModel):
    title = models.CharField(max_length=100)
    content = RichTextField()
    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    rating = models.FloatField(
        default=0.0,
        validators=(
            MinValueValidator(limit_value=0.0),
            MaxValueValidator(limit_value=5.0),
        ),
    )
    slug = models.SlugField(max_length=150, unique=True)
    published = models.BooleanField(default=False)
    seo_keywords = models.CharField(max_length=255, blank=True)
    seo_description = models.TextField(blank=True)
    category = TreeForeignKey(
        "Category",
        blank=False,
        null=False,
        on_delete=models.PROTECT,
        related_name="articles",
    )
    tags = models.ManyToManyField(Tag, related_name="articles", blank=True)

    class Meta:
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"
        ordering = ["-created_at"]

    def get_absolute_url(self) -> str:
        return reverse("article", kwargs={"article_slug": self.slug})

    def get_reading_time(self) -> int:
        time = round(len(striptags(self.content).split(" ")) / settings.READING_SPEED)
        return time if time > 0 else 1

    def save(self, *args: Any, **kwargs: Any) -> None:
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title


class ArticleComment(Comment):
    article = models.ForeignKey(
        Article, related_name="comments", on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Комментарий к статье"
        verbose_name_plural = "Комментарии к статье"


class Category(MPTTModel):
    name = models.CharField(max_length=50, unique=True)
    parent = TreeForeignKey(
        "self", on_delete=models.PROTECT, null=True, blank=True, related_name="children"
    )
    slug = models.SlugField()

    class MPTTMeta:
        order_insertion_by = ["name"]

    class Meta:
        unique_together = ("parent", "slug")
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def get_absolute_url(self) -> str:
        return reverse("category", kwargs={"category_slug": self.slug})

    def save(self, *args: Any, **kwargs: Any) -> None:
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name
