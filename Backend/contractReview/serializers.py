from rest_framework import serializers
from .models import Contract
from app.models import Users

class UserTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"

class UserContractSerializer(serializers.ModelSerializer):
    user = UserTableSerializer()

    class Meta:
        model = Contract
        fields = '__all__'

