from django.urls import path

from courses.app.handlers.comment_handlers import (
    CourseCommentListHandler,
    CourseCommentCreateHandler,
    CourseCommentRemoveHandler,
)
from courses.app.handlers.complaint_handler import (
    LessonComplaintHandler,
    ComplaintRetriveHandler,
    ComplaintDecisionHandler,
    DecisionRateFeedbackHandler,
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
    CourseDeleteHandler,
    CourseStatusChangeHandler,
    CourseArchivingHandler,
    ImCoursesRetrieveHandler,
)
from courses.app.handlers.lesson_enrolled_users_handlers import (
    ActivationLessonEnrolledUser,
)
from courses.app.handlers.lesson_handlers import (
    LessonRescheduleHandler,
    LessonCancelHandler,
    LessonRetrieveHandler,
    LessonListHandler,
    LessonParticipateHandler,
    LessonRateHandler,
    UserLessonsFilterHandler,
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
    path("", CourseCreateHandler.as_view()),
    path("<int:pk>/", CourseRetrieveHandler.as_view()),
    path("<int:course_pk>/change-status", CourseStatusChangeHandler.as_view()),
    path("<int:pk>/update/", BaseCourseUpdateHandler.as_view()),
    path("filter/", CourseFilterHandler.as_view()),
    path("lessons/<int:lesson_id>/rate/", LessonRateHandler.as_view()),
    path("<int:course_pk>/lessons/", LessonListHandler.as_view()),
    path("retrieve/lessons/<int:lesson_id>/", LessonRetrieveHandler.as_view()),
    path("<int:course_pk>/archiving/", CourseArchivingHandler.as_view()),
    path("im/lessons/filter/", UserLessonsFilterHandler.as_view()),
    path("im/courses/", ImCoursesRetrieveHandler.as_view()),
    path("favorites/", FavoriteCourseListHandler.as_view()),
    path("favorites/add/", FavoriteCourseAddHandler.as_view()),
    path("favorites/remove/", FavoriteCourseRemoveHandler.as_view()),
    path("ticket/buy/", CourseTicketBuyHandler.as_view()),
    path("destroy/", CourseDeleteHandler.as_view()),
    path("<int:pk>/enroll/", CourseEnrollHandler.as_view()),
    path(
        "lesson-enrolled-user/activation/<int:lesson_id>/<int:active>/",
        ActivationLessonEnrolledUser.as_view(),
    ),
    path("lessons/participate/", LessonParticipateHandler.as_view()),
    path("<int:pk>/comments/", CourseCommentListHandler.as_view()),
    path("<int:pk>/comments/create/", CourseCommentCreateHandler.as_view()),
    path("comments/<int:pk>/remove/", CourseCommentRemoveHandler.as_view()),
    path("<int:pk>/course-reviews/", CourseReviewListHandler.as_view()),
    path("<int:pk>/course-reviews/create/", CourseReviewCreateHandler.as_view()),
    path("course-reviews/<int:pk>/remove/", CourseReviewRemoveHandler.as_view()),
    path(
        "success-payment/<str:transaction_id>/", SuccessTicketPaymentHandler.as_view()
    ),
    path("reschedule-lesson/<int:lesson_id>/", LessonRescheduleHandler.as_view()),
    path("cancel-lesson/<int:lesson_id>/", LessonCancelHandler.as_view()),
    path("tickets/", TicketListHandler.as_view()),
    path("<int:pk>/questions/", CourseQuestionListHandler.as_view()),
    path("<int:pk>/questions/create/", CourseQuestionCreateHandler.as_view()),
    path("questions/<int:pk>/remove/", CourseQuestionRemoveHandler.as_view()),
    path("questions/<int:pk>/answers/", CourseAnswerListHandler.as_view()),
    path("questions/<int:pk>/answers/create/", CourseAnswerCreateHandler.as_view()),
    path("answers/<int:pk>/remove/", CourseAnswerRemoveHandler.as_view()),
    path("complaint/create", LessonComplaintHandler.as_view()),
    path("complaint/retrive/", ComplaintRetriveHandler.as_view()),
    path("complaint/retrive/decision/", ComplaintDecisionHandler.as_view()),
    path("complaint/feedback/", DecisionRateFeedbackHandler.as_view()),
]
