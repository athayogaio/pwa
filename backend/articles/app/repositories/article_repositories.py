from typing import Optional

from django.db.models import QuerySet, Q
from django.template.defaultfilters import slugify

from articles.app.services.types import ArticleFilterData
from articles.models import Article, Tag, Category
from core.app.repositories.base_repository import BaseRepository


class ArticleRepository(BaseRepository):
    model = Article

    def store(self, article: Article) -> None:
        if not article.slug:
            article.slug = slugify(article.title)
        article.save()

    def find_article_by_slug(self, article_slug: str) -> Article:
        return self.model.objects.filter(published=True, slug=article_slug).first()

    def filter_articles(
        self,
        data: Optional[ArticleFilterData] = None,
        category: Optional[Category] = None,
        tag: Optional[Tag] = None,
    ) -> QuerySet[Article]:
        filter_query = Q(published=True)
        if data:
            if query := data.get("query", None):
                filter_query &= Q(title__icontains=query)
        if tag:
            filter_query &= Q(tags__exact=tag)
        if category:
            filter_query &= Q(category__in=category.get_children()) | Q(
                category=category
            )

        return self.model.objects.filter(filter_query)


class ArticleCategoryRepository(BaseRepository):
    model = Category

    def store(self, category: Category) -> None:
        if not category.slug:
            category.slug = slugify(category.name)
        category.save()

    def find_all_categories(self) -> QuerySet[Category]:
        return self.model.objects.all()

    def find_category_by_slug(self, category_slug: str) -> Category:
        return self.model.objects.filter(slug=category_slug).first()


class ArticleTagRepository(BaseRepository):
    model = Tag

    def store(self, tag: Tag) -> None:
        if not tag.slug:
            tag.slug = slugify(tag.name)
        tag.save()

    def find_all_tags(self) -> QuerySet[Tag]:
        return self.model.objects.all()

    def find_tag_by_slug(self, tag_slug: str) -> Tag:
        return self.model.objects.filter(slug=tag_slug).first()
