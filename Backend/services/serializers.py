from rest_framework import serializers
from .models import ServiceList , ServiceUse

class ServiceCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ServiceList
        fields = "__all__"


class UserServiceRequestSerializer(serializers.ModelSerializer):
    class Meta : 
        model = ServiceUse 
        fields = ["expiry_date" , "servicevalue" , "totalprice"]