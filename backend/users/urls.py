from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UserLoginAndLogout

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')  # Register the UserViewSet under the 'user' namespace
router.register(r'auth', UserLoginAndLogout, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
]
