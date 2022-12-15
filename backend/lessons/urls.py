from django.urls import path

from lessons.app.handlers.comment_handler import (
    CommentCreateHandler,
    CommentListHandler,
)
from lessons.app.handlers.lesson_handlers import (
    LessonsFilterHandler,
    LessonCreateHandler,
    FavoriteLessonAddHandler,
    FavoriteLessonRemoveHandler,
    FavoriteLessonListHandler, LessonTicketUseHandler, LessonTicketBuyHandler,
)

urlpatterns = [
    path("comments/create/", CommentCreateHandler.as_view(), name="comment_create"),
    path("comments/", CommentListHandler.as_view(), name="comment_list"),
    path("create/", LessonCreateHandler.as_view(), name="lesson_create"),
    path("filter/", LessonsFilterHandler.as_view(), name="lessons_filter"),
    path(
        "favorites/", FavoriteLessonListHandler.as_view(), name="favorite_lesson_list"
    ),
    path(
        "favorites/add/", FavoriteLessonAddHandler.as_view(), name="favorite_lesson_add"
    ),
    path(
        "favorites/remove/",
        FavoriteLessonRemoveHandler.as_view(),
        name="favorite_lesson_remove",
    ),
    path("TicketBuy/", LessonTicketBuyHandler.as_view(), name="comment_create"),
    path("TicketUse/", LessonTicketUseHandler.as_view(), name="comment_create"),
]
