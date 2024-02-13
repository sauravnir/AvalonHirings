from rest_framework import serializers
from .models import Rating
from app.models import Users
from .models import Notification

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


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['timestamp' , 'message']