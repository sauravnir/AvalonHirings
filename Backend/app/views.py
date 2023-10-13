from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
# from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class UserLoginView(APIView):
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            return Response({'error': 'Invalid credentials'}, status=400)
        
        refresh_token = RefreshToken.for_user(user)
        allow_token = refresh_token.allow_token
    
        return Response({'refresh': str(refresh_token),
            'access': str(allow_token)
            })


class UserRegistrationView(APIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)