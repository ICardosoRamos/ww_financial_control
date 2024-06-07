from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserVS, UserLoginAndLogout

router = DefaultRouter()
router.register(r'user', UserVS, basename='user')  # Register the UserViewSet under the 'user' namespace
router.register(r'auth', UserLoginAndLogout, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
]
