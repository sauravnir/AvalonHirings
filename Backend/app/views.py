from rest_framework.views import APIView
from django.contrib.auth import authenticate , login
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer , UserForgotPasswordSerializer 
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password , check_password
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from datetime import timedelta
from django.utils import timezone
import uuid

from app.models import Users , CustomToken

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
                user_type = user.user_type
                user_name = user.username 
                print(user_type)
                token, created  = CustomToken.objects.get_or_create(user=user)
                unique_key = str(uuid.uuid4())
                token.key = unique_key
                token.created = timezone.now(); 
                expiration_time = timezone.now() + timedelta(seconds=10);
                print(expiration_time);
                token.expiration = expiration_time 
                if (token.expiration < timezone.now()):
                    token.delete(); 
                    return Response({"Error":"Token Has Expired" } , status = status.HTTP_401_UNAUTHORIZED)    
                # Saving the token 
                token.save();

                return Response({
                    'token' : token.key , 
                    'user_type' : user_type,
                    'username': user_name, 
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
    

# class UserLogoutView(APIView):
#     class UserLogoutView(APIView):
#         def post(self, request):
#             token = self.get_token(request)
            
#             if token:
#                 return self.logout_user(request.user, token)

#             return Response({"detail": "Token not provided"}, status=status.HTTP_400_BAD_REQUEST)

#     def get_token(self, request):
#         authorization_header = request.headers.get('Authorization', '')
#         try:
#             auth_type, token = authorization_header.split()
#             if auth_type.lower() != 'bearer':
#                 raise ValueError('Invalid Authorization header format')
#             return token
#         except ValueError:
#             return None

#     def logout_user(self, user, token):
#         try:
#             custom_token = CustomToken.objects.get(user=user, key=token)
#             custom_token.delete()
#             return Response({"detail": "Successfully logged out"}, status=status.HTTP_201_CREATED)
#         except CustomToken.DoesNotExist:
#             return Response({"detail": "Token not found"}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             print('Error:', e)
#             return Response({"detail": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# Sending OTP To The user 