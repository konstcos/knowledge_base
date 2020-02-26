from django.urls import path
from . import views

app_name = 'api_v1'

urlpatterns = [
    path('categories', views.CategoriesView.as_view(), name='categories'),
    path('edit/category', views.EditCategoryView.as_view(), name='edit.category'),
    path('knowledge/all/get', views.GetKnowledgeView.as_view(), name='knowledge.all.get'),
    path('knowledge/detail/get', views.GetKnowledgeDetailView.as_view(), name='knowledge.detail.get'),
    path('knowledge/detail/save', views.SaveKnowledgeDetailView.as_view(), name='knowledge.detail.save'),
]
