from django.urls import path
from . import views

app_name = 'vue_frontend'

urlpatterns = [
    path('', views.index, name='index')
]
