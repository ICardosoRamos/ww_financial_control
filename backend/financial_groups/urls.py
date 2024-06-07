from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FinancialGroupsVS

router = DefaultRouter()
router.register(r'groups', FinancialGroupsVS, basename='groups')

urlpatterns = [
    path('', include(router.urls)),
]
