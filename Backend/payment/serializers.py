from rest_framework import serializers
from .models import Payment


class ServicePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'





