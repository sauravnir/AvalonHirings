from rest_framework import serializers
from .models import ServiceList , ServiceUse , AssignedEmployees
from app.models import Users
from payment.models import Caliber
from payment.models import Payment , Subscription

# Creating Services by the admin
class ServiceCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ServiceList
        fields = "__all__"

# Requesting services by the client
class UserServiceRequestSerializer(serializers.ModelSerializer):
    class Meta : 
        model = ServiceUse 
        fields = ["expiry_date" , "servicevalue" , "totalprice" , "servicelocation" , "startHour", "endHour"]

# Viewing all the services 
class ViewUserSerializer(serializers.ModelSerializer):
    class Meta :        
        model = Users
        fields = "__all__"
# Getting the employee caliber
class EmployeeCaliberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caliber
        fields = "__all__"


# Creating a serializer for fetching the Client Payment Information
        
class ClientPaymentInfoSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Payment 
        fields = "__all__"

class AssignedEmployeesSerializer(serializers.ModelSerializer):
    assigned_employee= ViewUserSerializer()
    caliber = EmployeeCaliberSerializer(source ='assigned_employee.employee_caliber' , read_only=True)
    class Meta : 
        model = AssignedEmployees
        fields = "__all__"

class SubscriptionView(serializers.ModelSerializer):
    # user = ViewUserSerializer()
    class Meta:
        model = Subscription
        fields= "__all__"

# Viewing all the combined service using the user and services instance
class ViewServiceRequestedSerializer(serializers.ModelSerializer):
    user = ViewUserSerializer()
    services = ServiceCreateSerializer()
    payments = ClientPaymentInfoSerializer(many=True)
    subscription = serializers.SerializerMethodField()
    class Meta: 
        model = ServiceUse
        fields = "__all__"

    def get_subscription(self , obj):
        user_id = obj.user_id
        subscription = Subscription.objects.filter(user_id=user_id).first()
        if subscription:
            return SubscriptionView(subscription).data
        return None


class ViewServiceRequestedEmployeeSerializer(serializers.ModelSerializer):
    user = ViewUserSerializer()
    services = ServiceCreateSerializer()
    assigned_employee = AssignedEmployeesSerializer()
    class Meta: 
        model = ServiceUse
        fields = "__all__"
        
# Updating the services status 
class UpdateServiceStatusSerializer(serializers.Serializer):
    action = serializers.CharField(required=True)
    assignedEmployee = serializers.CharField(required=False , allow_blank=True)
    paymentApproval = serializers.CharField(required=False, allow_blank=True)
   
class EmployeeAssignedServiceSerializer(serializers.ModelSerializer):
    assigned_employee= ViewUserSerializer()
    service_request = UserServiceRequestSerializer()
    assigned_service_details = serializers.SerializerMethodField()
    client_details = ViewUserSerializer(source='service_request.user' , read_only=True)
    class Meta : 
        model = AssignedEmployees
        fields = "__all__"

    def get_assigned_service_details(self, instance):
        services_id = instance.service_request.services_id
        assigned_service = ServiceList.objects.get(pk=services_id)
        assigned_service_serializer = ServiceCreateSerializer(assigned_service)
        
        # Include approved_date from service_request
        service_request_data = {
            'approved_date': instance.service_request.approved_date,
            **assigned_service_serializer.data
        }
        
        return service_request_data
    
class SoloServiceClientSerializer(serializers.ModelSerializer):
    services = ServiceCreateSerializer()
    class Meta:
        model = ServiceUse 
        fields = "__all__"