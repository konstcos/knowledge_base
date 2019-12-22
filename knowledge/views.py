from django.shortcuts import render
from .models import Category


# Create your views here.
def index(request):
    categories = Category.objects.filter(parent__isnull=True).all()
    context = {'categories': categories}
    return render(request, 'knowledge/index.html', context)

