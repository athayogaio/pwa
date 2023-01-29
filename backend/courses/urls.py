from django.urls import path

from courses.app.handlers.comment_handlers import (
    CourseCommentListHandler,
    CourseCommentCreateHandler,
    CourseCommentRemoveHandler,
)
from courses.app.handlers.course_handlers import (
    CourseFilterHandler,
    CourseCreateHandler,
    BaseCourseUpdateHandler,
    FavoriteCourseAddHandler,
    FavoriteCourseRemoveHandler,
    FavoriteCourseListHandler,
    CourseTicketBuyHandler,
    CourseRetrieveHandler,
    SuccessTicketPaymentHandler,
    CourseEnrollHandler,
)
from courses.app.handlers.lesson_enrolled_users_handlers import (
    ActivationLessonEnrolledUser,
)
from courses.app.handlers.lesson_handlers import (
    LessonRescheduleHandler,
    LessonCancelHandler,
    LessonRetrieveHandler,
    LessonListHandler,
    UserLessonsParticipateHandler,
    LessonParticipateHandler,
)
from courses.app.handlers.question_handlers import (
    CourseQuestionListHandler,
    CourseQuestionCreateHandler,
    CourseQuestionRemoveHandler,
    CourseAnswerListHandler,
    CourseAnswerCreateHandler,
    CourseAnswerRemoveHandler,
)
from courses.app.handlers.review_handlers import (
    CourseReviewListHandler,
    CourseReviewCreateHandler,
    CourseReviewRemoveHandler,
)
from courses.app.handlers.ticket_handlers import TicketListHandler

urlpatterns = [
    path("", CourseCreateHandler.as_view(), name="course_create"),
    path("<int:pk>/", CourseRetrieveHandler.as_view(), name="course_retrieve"),
    path("<int:pk>/update/", BaseCourseUpdateHandler.as_view(), name="course_update"),
    path("filter/", CourseFilterHandler.as_view(), name="courses_filter"),
    path(
        "lessons/<int:lesson_id>/",
        LessonRetrieveHandler.as_view(),
        name="lesson_retrieve",
    ),
    path("<int:course_pk>/lessons/", LessonListHandler.as_view(), name="lesson_list"),
    path("im/lessons/", UserLessonsParticipateHandler.as_view(), name="im_lesson_list"),
    path(
        "favorites/", FavoriteCourseListHandler.as_view(), name="favorite_course_list"
    ),
    path(
        "favorites/add/", FavoriteCourseAddHandler.as_view(), name="favorite_course_add"
    ),
    path(
        "favorites/remove/",
        FavoriteCourseRemoveHandler.as_view(),
        name="favorite_course_remove",
    ),
    path("ticket/buy/", CourseTicketBuyHandler.as_view()),
    path("enroll/", CourseEnrollHandler.as_view()),
    path(
        "lesson-enrolled-user/activation/<int:lesson_id>/<int:active>/",
        ActivationLessonEnrolledUser.as_view(),
    ),
    path("lessons/participate/", LessonParticipateHandler.as_view()),
    path("<int:pk>/comments/", CourseCommentListHandler.as_view(), name="comment_list"),
    path(
        "<int:pk>/comments/create/",
        CourseCommentCreateHandler.as_view(),
        name="comment_create",
    ),
    path(
        "comments/<int:pk>/remove/",
        CourseCommentRemoveHandler.as_view(),
        name="comment_remove",
    ),
    path(
        "<int:pk>/course-reviews/",
        CourseReviewListHandler.as_view(),
        name="course_review_list",
    ),
    path(
        "<int:pk>/course-reviews/create/",
        CourseReviewCreateHandler.as_view(),
        name="course_review_create",
    ),
    path(
        "course-reviews/<int:pk>/remove/",
        CourseReviewRemoveHandler.as_view(),
        name="course_review_remove",
    ),
    path(
        "success-payment/<str:transaction_id>/", SuccessTicketPaymentHandler.as_view()
    ),
    path("reschedule-lesson/<int:lesson_id>/", LessonRescheduleHandler.as_view()),
    path("cancel-lesson/<int:lesson_id>/", LessonCancelHandler.as_view()),
    path("tickets/", TicketListHandler.as_view()),
    path(
        "<int:pk>/questions/",
        CourseQuestionListHandler.as_view(),
        name="course_question_list",
    ),
    path(
        "<int:pk>/questions/create/",
        CourseQuestionCreateHandler.as_view(),
        name="course_question_create",
    ),
    path(
        "questions/<int:pk>/remove/",
        CourseQuestionRemoveHandler.as_view(),
        name="course_question_remove",
    ),
    path(
        "questions/<int:pk>/answers/",
        CourseAnswerListHandler.as_view(),
        name="course_answer_list",
    ),
    path(
        "questions/<int:pk>/answers/create/",
        CourseAnswerCreateHandler.as_view(),
        name="course_answer_create",
    ),
    path(
        "answers/<int:pk>/remove/",
        CourseAnswerRemoveHandler.as_view(),
        name="course_answer_remove",
    ),
]
