from rest_framework import serializers
from .models import ServiceList



class ServiceCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ServiceList
        fields = "__all__"


 