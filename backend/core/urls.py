from django.urls import path

from core.app.handlers.support_handlers import AppealSupportHandler, AppealRetriveHandler, \
    AppealSupportCategoriesRetriveHandler
from core.app.handlers.teachers_handlers import (
    TeacherProfileAddLegalBillingHandler,
    TeacherProfileAddIndividualBillingHandler,
    TeacherProfileCreateHandler,
)
from core.app.handlers.user_handlers import (
    UserRegisterHandler,
    UserRegisterConfirmHandler,
    UserLoginHandler,
    UserChangePassHandler,
    UserSendPwdResetMailHandler,
    UserResetPassHandler,
    LoggedUserProfileHandler,
    UserProfileHandler,
    UserProfileUpdateHandler,
)

urlpatterns = [
    path("register/", UserRegisterHandler.as_view(), name="registration"),
    path("register/confirm/", UserRegisterConfirmHandler.as_view()),
    path("login/", UserLoginHandler.as_view(), name="login"),
    path("changepass/", UserChangePassHandler.as_view(), name="changepass"),
    path(
        "teacher-profile/legal-billing-info",
        TeacherProfileAddLegalBillingHandler.as_view(),
    ),
    path(
        "teacher-profile/individual-billing-info",
        TeacherProfileAddIndividualBillingHandler.as_view(),
    ),
    path("teacher-profile/", TeacherProfileCreateHandler.as_view()),
    path("resetpass/", UserSendPwdResetMailHandler.as_view(), name="resetpass"),
    path("resetpass/confirm/", UserResetPassHandler.as_view(), name="resetpass_change"),
    path("im/", LoggedUserProfileHandler.as_view(), name="im"),
    path("im/update/", UserProfileUpdateHandler.as_view(), name="im_update"),
    path("profile/<int:pk>/", UserProfileHandler.as_view(), name="im"),
    path("support/create/", AppealSupportHandler.as_view()),
    path("support/im/", AppealRetriveHandler.as_view()),
    path("support/categories/", AppealSupportCategoriesRetriveHandler.as_view()),
]
