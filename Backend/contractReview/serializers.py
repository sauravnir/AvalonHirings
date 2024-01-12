from rest_framework import serializers
from .models import Contract
from app.models import Users
from payment.models import Caliber

class UserTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"

class CaliberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caliber 
        fields = ["caliber_level"]

class UserContractSerializer(serializers.ModelSerializer):
    user = UserTableSerializer()
    caliber = CaliberSerializer(source = "user.employee_caliber" , read_only = True)
    class Meta:
        model = Contract
        fields = '__all__'

class ContractUpdateSerializer(serializers.Serializer):
    action = serializers.CharField()

class CaliberAssignSerilizer(serializers.Serializer):
    caliber_level = serializers.CharField()