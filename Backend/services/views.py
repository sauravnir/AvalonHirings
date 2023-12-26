from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from .serializers import ServiceCreateSerializer
from rest_framework import status
from rest_framework.response import Response
from .models import ServiceList

# Create your views here.

class CreateServiceView(APIView):
    def post (self, request):
        serializer = ServiceCreateSerializer(data = request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)

        return Response(serializer.errors , status = status.HTTP_200_OK)
    

class GetCreatedServiceView(APIView):
    def get(self , request):
        createdservice = ServiceList.objects.all()
        serializer = ServiceCreateSerializer(createdservice , many = True)
        return Response(serializer.data , status=status.HTTP_200_OK)
        
