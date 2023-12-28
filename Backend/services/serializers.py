from rest_framework import serializers
from .models import ServiceList , ServiceUse
from app.models import Users


# Creating Services by the admin
class ServiceCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ServiceList
        fields = "__all__"

# Requesting services by the client
class UserServiceRequestSerializer(serializers.ModelSerializer):
    class Meta : 
        model = ServiceUse 
        fields = ["expiry_date" , "servicevalue" , "totalprice"]

# Viewing all the services 
class ViewUserSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Users
        fields = "__all__"


# Viewing all the combined service using the user and services instance
class ViewServiceRequesteSerializer(serializers.ModelSerializer):
    user = ViewUserSerializer()
    services = ServiceCreateSerializer()
    class Meta: 
        model = ServiceUse
        fields = "__all__"


# Updating the services status 
class UpdateServiceStatusSerializer(serializers.Serializer):
    action = serializers.CharField()



