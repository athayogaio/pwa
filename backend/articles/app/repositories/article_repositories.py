from django.db.models import QuerySet, Q
from core.app.repositories.base_repository import BaseRepository
from articles.models import Article, Tag, Category


class ArticleRepository(BaseRepository):
    model = Article

    def find_all_articles(self) -> QuerySet[Article]:
        return self.model.objects.filter(published=True)

    def find_article_by_slug(self, article_slug: str) -> Article:
        return self.model.objects.filter(published=True, slug=article_slug).first()

    def find_articles_by_search_query(self, query: str) -> QuerySet[Article]:
        return self.model.objects.filter(published=True, title__icontains=query)

    def find_articles_by_category(self, category: Category) -> QuerySet[Article]:
        return self.model.objects.filter(
            Q(published=True)
            & (Q(category__in=category.get_children()) | Q(category=category))
        )


class ArticleCategoryRepository(BaseRepository):
    model = Category

    def find_all_categories(self) -> QuerySet[Category]:
        return self.model.objects.all()

    def find_category_by_slug(self, category_slug: str) -> Category:
        return self.model.objects.filter(slug=category_slug).first()


class ArticleTagRepository(BaseRepository):
    model = Tag

    def find_all_tags(self) -> QuerySet[Tag]:
        return self.model.objects.all()
