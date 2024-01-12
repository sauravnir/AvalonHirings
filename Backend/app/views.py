from rest_framework.views import APIView
from django.contrib.auth import authenticate , login
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer , UserForgotPasswordSerializer  , OTPTransactionSerializer , UpdateUserProfileSerializer , ViewUserProfileSerializer , UpdateProfilePictureSerializer , EmployeeCaliberSerializer , PostAnnouncementSerializer , AllUsersSerializer
from rest_framework.generics import RetrieveAPIView
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
from rest_framework.parsers import MultiPartParser
from app.models import Users , CustomToken , Announcements
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
                        'otp': user.otp,
                        'employee_count' : employees_count,
                        'clients_count' : clients_count,
                        'total_reports' : total_reports,
                        'user_id': user_id,
                        'is_auth':is_auth,
                        
                        'message' : 'Login Successful'} , status = status.HTTP_200_OK)
                    else:
                        return Response({
                            'token' : token.key, 
                            'user_type' : user_type,
                            'username': user_name, 
                            'otp': user.otp,
                            'user_id': user_id,
                            'is_auth':is_auth,
                            'message' : 'Login Successful'} , status = status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({'Error' : 'User is not authenticated!'},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

# New User Creation
class UserCreateView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer)
            serializer.save()
            return Response({'message':'User Registered Successfully'}, status=status.HTTP_201_CREATED)
        return Response({"error" : "Failed to register user"}, status=status.HTTP_400_BAD_REQUEST)
    
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
    
# Checking OTP
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



# View User Profile
class UserProfileView(RetrieveAPIView):
    queryset= Users.objects.all()
    serializer_class = ViewUserProfileSerializer
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            employee_caliber = instance.employee_caliber
            caliber_serializer = EmployeeCaliberSerializer(employee_caliber)
            user_data = self.get_serializer(instance).data
            user_data['employee_caliber'] = caliber_serializer.data
            return Response(user_data)
            
        except:
            return super().retrieve(request, *args, **kwargs)


# Updating user password
class UserProfileUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        serializers = UpdateUserProfileSerializer(data=request.data)
        if serializers.is_valid():
            newpass = serializers.validated_data['password']
            username = serializers.validated_data['username']
            user = get_object_or_404(Users, username=username)
            if user is not None:
                 if not check_password(newpass, user.password):
                        user.password = make_password(newpass)
                        user.save()

            return Response({"message": "Profile Updated Successfully"}, status=status.HTTP_200_OK)
            
        return Response({"message": "Error in Updating the profile"}, status=status.HTTP_400_BAD_REQUEST)
    

# Updating profile picture
class UpdateProfilePictureView(APIView):
    parser_classes = (MultiPartParser,)
    def post(self,request):
        serializers = UpdateProfilePictureSerializer(data=request.data)
        if  serializers.is_valid():
            username = serializers.validated_data['username']
            profilepic = request.FILES['profilepicture']
            user = get_object_or_404(Users , username = username)
            if user is not None:
                user.profilepic = profilepic 
                user.save()
            return Response({"message" : "Profile Picture Updated" }, status = status.HTTP_200_OK)
        return Response({"message": "Error in Updating the profile"}, status=status.HTTP_400_BAD_REQUEST)
    

class PostAnnouncementView(APIView):
    def post(self , request):
        serializers = PostAnnouncementSerializer(data = request.data)

        if serializers.is_valid():
            title = serializers.validated_data['title']
            description = serializers.validated_data['description']

            if title and description is not None:
                announcement = Announcements.objects.create(
                    title = title,
                    description = description,
                    created_date = timezone.now()
                )

                announcement.save()
            return Response({'message' : 'Announcement Created Successfully'}, status=status.HTTP_200_OK)
        
        return Response({'error' : "Faild To Create Announcement"} , status=status.HTTP_400_BAD_REQUEST)
    
    def put(self , request , pk):
        try :
            announcement = Announcements.objects.get(id = pk)

        except Announcements.DoesNotExist:
            return Response({'error': 'Announcement not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PostAnnouncementSerializer(announcement, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Announcement updated successfully'}, status=status.HTTP_200_OK)

        return Response({'error': 'Failed to update announcement'}, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self , request , pk):
        try:
            announcement = Announcements.objects.get(id=pk)
        except Announcements.DoesNotExist:
            return Response({'error': 'Announcement not found'}, status=status.HTTP_404_NOT_FOUND)

        announcement.delete()
        return Response({'message': 'Announcement deleted successfully'}, status=status.HTTP_200_OK)


class GetAllAnnouncementView(APIView):
    def get(self , request , pk = None):

        if pk is not None:
            announcement = Announcements.objects.get(id = pk)
            serializers = PostAnnouncementSerializer( announcement)
            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            announcements = Announcements.objects.all()
            serializer = PostAnnouncementSerializer(announcements, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        

# All User Details View 
class AllUsersView(APIView):
    def get(self,request):
        users = Users.objects.all()
        serializer = AllUsersSerializer(users , many=True)
        return Response(serializer.data , status = status.HTTP_200_OK)