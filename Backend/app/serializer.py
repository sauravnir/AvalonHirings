from rest_framework import serializers
from django.contrib.auth.models import User  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'fullname','email','password','usertype','dateofbirth','username']
