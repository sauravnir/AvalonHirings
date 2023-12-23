from rest_framework import serializers
from django.core.mail import send_mail
from .models import Reports
from app.models import Users

class UserReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reports
        fields = ('title' , 'description' );


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class ReportsSerializer(serializers.ModelSerializer):
    user = UserModelSerializer()

    class Meta:
        model = Reports
        fields = '__all__'