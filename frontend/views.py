from django.shortcuts import render
from knowledge.models import Category
from knowledge.serializers import CategorySerializer
from rest_framework import generics


# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')


class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
