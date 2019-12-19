from django.urls import path
from . import views


app_name = 'knovledg'

urlpatterns = [
    path('', views.index, name='index'),
]
