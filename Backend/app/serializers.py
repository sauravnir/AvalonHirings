from rest_framework import serializers
from .models import Users

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('fullname', 'user_type','date_of_birth','email','password','username')

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


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    rememberme = serializers.BooleanField(default=False)

class UserForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class OTPTransactionSerializer(serializers.Serializer):
    otp_pin = serializers.IntegerField();