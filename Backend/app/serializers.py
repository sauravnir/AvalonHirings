from rest_framework import serializers
from .models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('fullname', 'user_type', 'date_of_birth','email','password','username')

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
