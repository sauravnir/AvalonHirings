from rest_framework.views import APIView
from django.contrib.auth import authenticate , login
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer , UserForgotPasswordSerializer 
from rest_framework import status
from .models import Users
from django.contrib.auth.hashers import make_password , check_password
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from datetime import timedelta
from django.utils import timezone


class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            # rememberme = serializer.validated_data.get'rememberme',False]
            # print(rememberme);
            user = authenticate(request, email=email, password=password)
            if user:
                login(request, user)

                # if remember_me:
                #     expiration_time = timezone.now() + timedelta(days=2)
                # else:
                #     expiration_time = timezone.now() + timedelta(hours=1)


                token, created = Token.objects.get_or_create(user=user)
                # token.created = timezone.now();
                # print(token.created);
                # token.expires = expiration_time 
                # print(token.expires);
                token.save();
                print(token.key);
                return Response({
                    'token' : token.key , 
                    'message' : 'Login Successfull'} , status = status.HTTP_200_OK)

            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

# New User Creation
class UserCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Forgot Password 
    
class UserForgotPasswordView(APIView):
    def post(self, request):
        serializer = UserForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            new_password = serializer.validated_data['password']
            try:
                user = get_object_or_404(Users, email=email)
                print(user)
                checking_password = check_password(new_password, user.password)
                print(checking_password)
                if checking_password == True:
                    return Response({"detail": "Password is the same as the current one"}, status=400)

                user.password = make_password(new_password)
                user.save()
                return Response({"detail": "Password changed successfully"}, status=200)

            except ObjectDoesNotExist:
                return Response({"detail": "Email does not exist"}, status=404)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)