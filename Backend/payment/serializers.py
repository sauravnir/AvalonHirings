from rest_framework import serializers
from .models import Payment , Subscription, Caliber , Salary , Refund
from services.models import ServiceUse , ServiceList
from app.models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['fullname' , 'user_type' , 'username']

class ServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceList 
        fields =["servicename"]

class CashPaymentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    services = ServiceListSerializer()
    class Meta:
        model = ServiceUse
        fields = '__all__'

class ServicePaymentSerializer(serializers.ModelSerializer):
    service_use = CashPaymentSerializer()
    
    class Meta:
        model = Payment
        fields = '__all__'

class SubscriptionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Subscription
        fields = '__all__'

class CaliberSerializer(serializers.ModelSerializer):
    employee = UserSerializer()
    class Meta:
        model = Caliber 
        fields = "__all__"

class EmployeeSalarySerializer(serializers.ModelSerializer):
    caliber = CaliberSerializer()  

    class Meta:
        model = Salary
        fields = "__all__"

class CombinedPaymentSerializer(serializers.Serializer):
    payment_details = serializers.SerializerMethodField()
    subscription_details = serializers.SerializerMethodField()
    salary_details = serializers.SerializerMethodField()

    def get_payment_details(self, obj):
        payments = Payment.objects.all()
        return {
            'description' : 'Paid For Service Usage',
            'data':ServicePaymentSerializer(payments, many=True).data
            }

    def get_subscription_details(self, obj):
        subscriptions = Subscription.objects.all()
        return {
            'description' :'Premium Membership Subscription',
            'data':SubscriptionSerializer(subscriptions, many=True).data
        }
    def get_salary_details(self, obj):
        salary = Salary.objects.all()
        return {
            'description' : 'Salary Payment',
            'data':EmployeeSalarySerializer(salary, many=True).data
    }


# class ClientRefundSerializer(serializers.Serializer):
#     user = UserSerializer()
#     class Meta:
#         model = Refund 
#         fields = "__all__"
    
class ClientTransactionDetailsSerializer(serializers.ModelSerializer):
    service_use = CashPaymentSerializer()
    class Meta:
        model = Payment
        fields = "__all__"
