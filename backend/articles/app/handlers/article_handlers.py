from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.request import Request
from rest_framework.response import Response

from articles.app.http.requests.article_requests import ArticleSearchRequest
from articles.app.repositories.article_repositories import (
    ArticleRepository,
    ArticleCategoryRepository,
    ArticleTagRepository,
)
from articles.app.utils.util import encode_dict_to_query_params
from articles.app.utils.pagination import TMPLPagination
from core.app.framework.handlers import Handler


class ArticleListHandler(Handler):
    serializer_class = ArticleSearchRequest
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "articles/index.html"

    def get(self, request: Request) -> Response:
        search_form = self.serializer_class(data=request.query_params)
        search_form.is_valid(raise_exception=True)
        articles = ArticleRepository().filter_articles(data=search_form.validated_data)
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
                "params": encode_dict_to_query_params(search_form.validated_data),
            }
        )


class ArticleListByCategoryHandler(Handler):
    serializer_class = ArticleSearchRequest
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "articles/index.html"

    def get(self, request: Request, category_slug: str) -> Response:
        search_form = self.serializer_class(data=request.query_params)
        search_form.is_valid(raise_exception=True)
        category = ArticleCategoryRepository().find_category_by_slug(
            category_slug=category_slug
        )
        articles = ArticleRepository().filter_articles(
            data=search_form.validated_data, category=category
        )
        categories = ArticleCategoryRepository().find_all_categories()
        tags = ArticleTagRepository().find_all_tags()
        return Response(
            {
                "articles": TMPLPagination(
                    request=request, queryset=articles
                ).paginate(),
                "category_slug": category_slug,
                "categories": categories,
                "tags": tags,
                "search_form": search_form,
                "params": encode_dict_to_query_params(search_form.validated_data),
            }
        )


class ArticleListByTagHandler(Handler):
    serializer_class = ArticleSearchRequest
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "articles/index.html"

    def get(self, request: Request, tag_slug: str) -> Response:
        search_form = self.serializer_class(data=request.query_params)
        search_form.is_valid(raise_exception=True)
        tag = ArticleTagRepository().find_tag_by_slug(tag_slug=tag_slug)
        articles = ArticleRepository().filter_articles(
            data=search_form.validated_data, tag=tag
        )
        categories = ArticleCategoryRepository().find_all_categories()
        tags = ArticleTagRepository().find_all_tags()

        return Response(
            {
                "articles": TMPLPagination(
                    request=request, queryset=articles
                ).paginate(),
                "categories": categories,
                "tag_slug": tag_slug,
                "tags": tags,
                "search_form": search_form,
                "params": encode_dict_to_query_params(search_form.validated_data),
            }
        )


class ArticleDetailHandler(Handler):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "articles/article.html"

    def get(self, request: Request, article_slug: str) -> Response:
        article = ArticleRepository().find_article_by_slug(article_slug=article_slug)
        return Response({"article": article})
