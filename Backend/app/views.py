from rest_framework.views import APIView
from django.contrib.auth import authenticate , login
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer , UserForgotPasswordSerializer  , OTPTransactionSerializer
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password , check_password
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from datetime import timedelta
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
import math , random 
from django.http import FileResponse
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
                token, created  = CustomToken.objects.get_or_create(user=user)
                unique_key = str(uuid.uuid4())
                token.key = unique_key
                token.created = timezone.now(); 
                expiration_time = timezone.now() + timedelta(seconds=10);
                token.expiration = expiration_time 

                # Generating OTP and storing into database

                otp_digits = "123456789"
                OTP = ""
                

                for i in range(4):
                    OTP += otp_digits[math.floor(random.random() * 9)]
                
                print(OTP);


                subject = "One Transaction Pin";
                message = f"Here is your One Time Transaction PIN. Use it to login into the system : {OTP}";
                recipient_list = [user.email];

                if user.otp is None:
                    user.otp = OTP;
                    user.save();
                    send_mail(subject , message ,settings.EMAIL_HOST_USER, recipient_list);

                # Sending Email To The User:
                if (token.expiration < timezone.now()):
                    token.delete(); 
                    return Response({"Error":"Token Has Expired" } , status = status.HTTP_401_UNAUTHORIZED)    
                # Saving the token 
                token.save();

                return Response({
                    'token' : token.key , 
                    'user_type' : user_type,
                    'username': user_name, 
                    'otp': user.otp,
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
    
