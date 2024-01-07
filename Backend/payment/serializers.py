from rest_framework import serializers
from .models import Payment , Subscription
from services.models import ServiceUse

class ServicePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

class CashPaymentSerializer(serializers.Serializer):
    class Meta:
        model = ServiceUse
        fields = '__all__'