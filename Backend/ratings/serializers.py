from rest_framework import serializers
from .models import Rating
from app.models import Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users 
        fields = ['id' , 'fullname' , 'username' , 'email' , 'profilepic','contact']

class RatingSerializer(serializers.ModelSerializer):
    client = UserSerializer()
    employee = UserSerializer()
    class Meta:
        model = Rating
        fields = "__all__"

