from rest_framework.response import Response
from rest_framework.views import APIView
from knowledge.serializers import CategorySerializer, KnowledgeSerializer
from knowledge.models import Category, Knowledge
from django.core.paginator import Paginator
import json
from rest_framework import status


# Create your views here.
class CategoriesView(APIView):
    def post(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response({
            "status": 'success',
            "articles": serializer.data,
        })


class EditCategoryView(APIView):
    def post(self, request):

        # received_json_data = json.loads(request.body.decode("utf-8"))
        received_json_data = request.data

        category_id = int(received_json_data['id'])
        name = str(received_json_data['name'])
        comment = str(received_json_data['comment'])
        description = str(received_json_data['description'])

        if category_id == 0:
            category = Category(name=name, comment=comment, description=description)
        else:
            category = Category.objects.get(id=category_id)
            category.name = name
            category.comment = comment
            category.description = description

        category.save()

        return Response({
            "status": 'success',
        })


class GetKnowledgeView(APIView):
    def post(self, request):

        # received_json_data = json.loads(request.data)
        received_json_data = request.data

        page_num = int(received_json_data['page'])
        category = int(received_json_data['category'])

        if page_num < 1:
            page_num = 1

        knowledge_objects = Knowledge.objects

        if category > 0:
            knowledge_objects = knowledge_objects.filter(category=category)
        else:
            knowledge_objects = knowledge_objects.all()

        paginate = Paginator(knowledge_objects, 5)

        page = paginate.page(page_num)

        knowledge = page.object_list

        serializer = KnowledgeSerializer(knowledge, many=True)

        return Response({
            "status": 'success',
            "knowledge": serializer.data,
            "page": page_num,
            "num_pages": paginate.num_pages,
        })


class GetKnowledgeDetailView(APIView):
    def post(self, request):

        received_json_data = request.data

        knowledge_id = int(received_json_data['knowledge_id'])

        result = None
        if knowledge_id > 0:
            knowledge = Knowledge.objects.get(id=knowledge_id)
            serializer = KnowledgeSerializer(knowledge)
            result = serializer.data

        return Response({
            "status": 'success',
            "knowledge": result,
            "received_json_data": received_json_data,
        })


class SaveKnowledgeDetailView(APIView):
    def post(self, request):

        received_json_data = request.data

        knowledge_id = int(received_json_data['knowledge_id'])
        category_id = int(received_json_data['category_id'])
        short_desc = str(received_json_data['short_description'])
        text = str(received_json_data['knowledge_text'])

        category = Category.objects.get(id=category_id)

        if not category:
            return Response({
                "status": 'fail',
            })

        result = None
        saved_knowledge_id = 0
        if knowledge_id == 0:
            knowledge = Knowledge()
        else:
            knowledge = Knowledge.objects.get(id=knowledge_id)

        if knowledge:
            knowledge.category = category
            knowledge.short_desc = short_desc
            knowledge.text = text
            knowledge.save()
            saved_knowledge_id = knowledge.id
            # serializer = KnowledgeSerializer(knowledge)

        return Response({
            "status": 'success',
            "knowledge_id": saved_knowledge_id,
            # "serializer": serializer,
            "received_json_data": received_json_data,
        })
