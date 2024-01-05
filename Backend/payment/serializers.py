from rest_framework import serializers
from .models import Payment , Subscription


class ServicePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class SubscriptionSerializer(serializers.Serializer):
    class Meta:
        model = Subscription
        field = '__all__'


