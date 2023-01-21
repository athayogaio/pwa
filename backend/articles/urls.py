from django.urls import path

from articles.app.handlers.article_handlers import (
    ArticleListHandler,
    ArticleDetailHandler,
    ArticleListByCategoryHandler,
    ArticleListBySearchQueryHandler,
)


urlpatterns = [
    path("", ArticleListHandler.as_view(), name="index"),
    path("article/<slug:article_slug>", ArticleDetailHandler.as_view(), name="article"),
    path(
        "category/<slug:category_slug>",
        ArticleListByCategoryHandler.as_view(),
        name="category",
    ),
    path("search", ArticleListBySearchQueryHandler.as_view(), name="search"),
]
