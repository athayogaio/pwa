from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.request import Request
from rest_framework.response import Response

from articles.app.http.requests.article_requests import ArticleSearchRequest
from articles.app.repositories.article_repositories import (
    ArticleRepository,
    ArticleCategoryRepository,
    ArticleTagRepository,
)
from articles.app.utils.pagination import TMPLPagination
from core.app.framework.handlers import Handler


class ArticleListHandler(Handler):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "articles/index.html"

    def get(self, request: Request) -> Response:
        articles = ArticleRepository().find_all_articles()
        categories = ArticleCategoryRepository().find_all_categories()
        tags = ArticleTagRepository().find_all_tags()
        return Response(
            {
                "articles": TMPLPagination(
                    request=request, queryset=articles
                ).paginate(),
                "categories": categories,
                "tags": tags,
                "search_form": ArticleSearchRequest(),
            }
        )


class ArticleListBySearchQueryHandler(Handler):
    serializer_class = ArticleSearchRequest
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "articles/index.html"

    def post(self, request: Request) -> Response:
        search_form = self.serializer_class(data=request.data)
        search_form.is_valid(raise_exception=True)
        articles = ArticleRepository().find_articles_by_search_query(
            query=search_form.validated_data["query"]
        )
        categories = ArticleCategoryRepository().find_all_categories()
        tags = ArticleTagRepository().find_all_tags()
        return Response(
            {
                "articles": TMPLPagination(
                    request=request, queryset=articles
                ).paginate(),
                "categories": categories,
                "tags": tags,
                "search_form": search_form,
            }
        )


class ArticleListByCategoryHandler(Handler):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "articles/index.html"

    def get(self, request: Request, category_slug: str) -> Response:
        category = ArticleCategoryRepository().find_category_by_slug(
            category_slug=category_slug
        )
        articles = ArticleRepository().find_articles_by_category(category=category)
        categories = ArticleCategoryRepository().find_all_categories()
        tags = ArticleTagRepository().find_all_tags()
        return Response(
            {
                "articles": TMPLPagination(
                    request=request, queryset=articles
                ).paginate(),
                "categories": categories,
                "tags": tags,
                "search_form": ArticleSearchRequest(),
            }
        )


class ArticleDetailHandler(Handler):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "articles/article.html"

    def get(self, request: Request, article_slug: str) -> Response:
        article = ArticleRepository().find_article_by_slug(article_slug=article_slug)
        return Response({"article": article})
