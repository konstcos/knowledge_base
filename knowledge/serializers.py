from rest_framework import serializers
from .models import Category, Knowledge
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)
from taggit.models import Tag


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'comment', 'description')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug')


class KnowledgeSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    category = CategorySerializer()

    class Meta:
        model = Knowledge
        fields = ('id', 'short_desc', 'text', 'category', 'tags')
