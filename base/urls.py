from django.urls import path

from .import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes, name='Routes'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.Register, name='register'),
    path('names/', views.getPatients),
    path('names/<str:pk>/',views.getPatient),
    path('forget/', views.Forgot, name='send-reset-password-email'),
    path('reset/', views.Resett, name='reset-password'),
    path('names/new',views.create),
    path('names/<str:pk>/update',views.update),
    path('names/<str:pk>/delete', views.DeleteInfo),
]
