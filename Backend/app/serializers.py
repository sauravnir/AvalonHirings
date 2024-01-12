from rest_framework import serializers
from .models import Users , Announcements
from payment.models import Caliber

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('fullname', 'user_type','date_of_birth','email','password','username','contact')

        extra_kwargs = {
            'password': {'write_only': True}, 
        }

    def create(self, validated_data):
       
        password = validated_data.pop('password', None)
        instance = super().create(validated_data)
        if password:
            instance.set_password(password)
            instance.save()
        return instance

class EmployeeCaliberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caliber
        fields = "__all__"

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class UserForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class OTPTransactionSerializer(serializers.Serializer):
    otp_pin = serializers.CharField();

class ViewUserProfileSerializer(serializers.ModelSerializer):
    employee_caliber = EmployeeCaliberSerializer() 
    class Meta:
        model =  Users 
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['profilepic'] = instance.profilepic.url if instance.profilepic else None
        return data 

class UpdateUserProfileSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True , required=False)
   

class UpdateProfilePictureSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    profilepicture = serializers.ImageField()
   

class PostAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcements 
        fields = "__all__"

class AllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users 
        fields = "__all__"