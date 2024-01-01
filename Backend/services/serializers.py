from rest_framework import serializers
from .models import ServiceList , ServiceUse , AssignedEmployees
from app.models import Users


# Creating Services by the admin
class ServiceCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ServiceList
        fields = "__all__"

# Requesting services by the client
class UserServiceRequestSerializer(serializers.ModelSerializer):
    class Meta : 
        model = ServiceUse 
        fields = ["expiry_date" , "servicevalue" , "totalprice" , "servicelocation"]

# Viewing all the services 
class ViewUserSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Users
        fields = "__all__"


class AssignedEmployeesSerializer(serializers.ModelSerializer):
    assigned_employee= ViewUserSerializer()
    class Meta : 
        model = AssignedEmployees
        fields = "__all__"

    def get_assigned_employee_details(self , obj):
        assigned_employee = obj.assigned_employee
        user_details = {
            'username': assigned_employee.username,
            'fullname': assigned_employee.fullname,  
        }
        return user_details

# Viewing all the combined service using the user and services instance
class ViewServiceRequestedSerializer(serializers.ModelSerializer):
    user = ViewUserSerializer()
    services = ServiceCreateSerializer()
    class Meta: 
        model = ServiceUse
        fields = "__all__"

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

    def validate(self, data):
        action = data.get('action')

        if action == 'Payment Required' and not data.get('assignedEmployee'):
            raise serializers.ValidationError("assignedEmployee is required for Payment Required status.")

        return data

# Fetching the Employees Data from the Free Employees 
