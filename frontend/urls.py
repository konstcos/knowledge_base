from django.urls import path
from . import views

app_name = 'frontend'

urlpatterns = [
    path('', views.index, name='index'),
    # path('categories', views.CategoryList.as_view(), name='categories'),
]
