from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import authenticate , login
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from .models import Users
# from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class UserLoginView(APIView):
    def post(self,request):
        username = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request ,username=username, password=password , backend= 'django.contrib.auth.backends.ModelBackend')
        if user is not None:
            login(request , user)
            return Response({'message': 'Login Successful'})

        else:
            return Response({'error': 'Invalid Credentials'}, status=400);

        # refresh_token = RefreshToken.for_user(user)
        # allow_token = refresh_token.allow_token
    
        # return Response({'refresh': str(refresh_token),
        #     'access': str(allow_token),
        #     'user':{'username' : user.username},
        #     })


class UserRegistrationView(APIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)