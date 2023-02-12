from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

handler500 = "rest_framework.exceptions.server_error"
urlpatterns = (
    [
        path("admin/", admin.site.urls),
        path("pages/", include('cms.urls')),
        path("journal/", include("articles.urls")),
        re_path(
            r"^api/",
            include(
                [
                    path("schema/", SpectacularAPIView.as_view(), name="schema"),
                    path(
                        "swagger/",
                        SpectacularSwaggerView.as_view(url_name="schema"),
                        name="swagger-ui",
                    ),
                    path("core/", include("core.urls")),
                    path("courses/", include("courses.urls")),
                ]
            ),
        ),
    ]
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
)

admin.site.site_header = "Администрирование ATHAYOGA"
admin.site.site_title = "ATHAYOGA"
admin.site.index_title = "ATHAYOGA"
