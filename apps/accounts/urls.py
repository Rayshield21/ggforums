from django.urls import path, include
from .api import LoginAPI, RegisterAPI, UserAPI, ViewProfileAPI, EditProfileAPI, EditAvatarAPI
from knox import views as knox_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/profile/<username>', ViewProfileAPI.as_view()),
    path('api/profile/<username>/', EditProfileAPI.as_view()),
    path('api/profile/avatar/<username>/', EditAvatarAPI.as_view()),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth', include('knox.urls'))
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)