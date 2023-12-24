from rest_framework.views import APIView
from django.contrib.auth import authenticate , login
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer , UserForgotPasswordSerializer  , OTPTransactionSerializer
from rest_framework import status

from django.contrib.auth.hashers import make_password , check_password
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404

from datetime import timedelta
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
import math , random 
from django.http import FileResponse
import uuid

from app.models import Users , CustomToken
from reports.models import Reports

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)

            if user.is_auth is True:
                if user:
                    login(request, user)
                    user_type = user.user_type
                    user_name = user.username 
                    token, created  = CustomToken.objects.get_or_create(user=user)
                    unique_key = str(uuid.uuid4())
                    token.key = unique_key
                    token.created = timezone.now(); 
                    expiration_time = timezone.now() + timedelta(seconds=10);
                    token.expiration = expiration_time 

                    # Saving the token 
                    token.save();
                    is_auth =  user.is_auth;
                    user_id = user.id;
                    employees_count = Users.objects.filter(user_type = 'Employee').count();
                    clients_count = Users.objects.filter(user_type='Client').count()
                    total_reports = Reports.objects.all().count();
                    if (user_type == "Admin"):
                        return Response({
                        'token' : token.key, 
                        'user_type' : user_type,
                        'username': user_name, 
                        # 'otp': user.otp,
                        'employee_count' : employees_count,
                        'clients_count' : clients_count,
                        'total_reports' : total_reports,
                        'user_id': user_id,
                        'is_auth':is_auth,
                        'message' : 'Login Successfull'} , status = status.HTTP_200_OK)
                    else:
                        return Response({
                            'token' : token.key, 
                            'user_type' : user_type,
                            'username': user_name, 
                            'otp': user.otp,
                            'user_id': user_id,
                            'is_auth':is_auth,
                            'message' : 'Login Successfull'} , status = status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                print("Chirna diyena!")        
                return Response({'Error' : 'User is not authenticated!'},status=status.HTTP_401_UNAUTHORIZED)
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
    

class OTPTransactionView(APIView):
    def post(self , request):
        serializer = OTPTransactionSerializer(data = request.data)
        if serializer.is_valid():
            otp_pin = serializer.validated_data['otp_pin']
            user = get_object_or_404(Users , otp = otp_pin)
            if user.otp == otp_pin:
                return Response({'message' :'OTP Verification Successful',} , status=status.HTTP_200_OK)
            else:
                    return Response({'error':'Invalid OTP'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Download File
        
class UserDownloadFileView(APIView):
    def get(self, request, *args, **kwargs):
        file_path = "../WebsiteFiles/TermsAndConditions/TermsAndConditions.txt"

        return FileResponse(open(file_path , 'rb'))
    

# Fetch User Data 
    

class UserProfileData(APIView):
    def post(self, request):
        user_token_key = request.GET.get('token',None)
        user_otp = request.GET.get('otp_pin', None)
        print(user_otp)
        if user_token_key:
            try:
                custom_token = CustomToken.objects.get(key=user_token_key)
                user = custom_token.user    
                if user_otp and user.otp == user_otp:
                    login(request , user)
                    user_otp = ""
                    user.save()
                    serializer = UserRegisterSerializer(user)
                    return Response(serializer.data)
                else:
                    return Response({'error': 'OTP does not match'}, status=status.HTTP_400_BAD_REQUEST)
            except CustomToken.DoesNotExist:
                return Response({'error': 'CustomToken not found'}, status=404)
        else:
            return Response({'error': 'Token Not Provided'}, status=400)

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
    
