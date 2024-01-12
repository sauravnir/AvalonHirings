from django.utils import timezone
from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView , ListAPIView
from django.http import HttpResponse
from .serializers import ServiceCreateSerializer , UserServiceRequestSerializer ,ViewServiceRequestedSerializer  , UpdateServiceStatusSerializer , AssignedEmployeesSerializer , ViewServiceRequestedEmployeeSerializer , EmployeeAssignedServiceSerializer
from rest_framework import status
from rest_framework.response import Response
from .models import ServiceList , ServiceUse , AssignedEmployees
from app.models import Users 
from payment.models import Payment
from datetime import datetime
# Creating Service By The Admin
class CreateServiceView(APIView):
    def post (self, request):
        serializer = ServiceCreateSerializer(data = request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response({"message" : "Service Created Successfully"} , status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_200_OK)
       
# Fetching all the services from the database
class GetCreatedServiceView(APIView):
    def get(self , request):
        createdservice = ServiceList.objects.all()
        serializer = ServiceCreateSerializer(createdservice , many = True)
        return Response(serializer.data , status=status.HTTP_200_OK)
    
# Fetching single services based on the PK 
class GetSingleServiceView(RetrieveAPIView):
    queryset = ServiceList.objects.all()
    serializer_class = ServiceCreateSerializer

# updating the single services created by the admin 
class UpdateSingleServiceView(APIView):
    def post(self, request):
        service_list_id = request.data.get('service_list_id')
        servicelist = get_object_or_404(ServiceList, id=service_list_id)

        if servicelist:
            
            if 'servicedesc' in request.data:
                servicelist.servicedesc = request.data['servicedesc']

            if 'servicetarget' in request.data:
                servicelist.servicetarget = request.data['servicetarget']

            if 'serviceavailable' in request.data:
                servicelist.serviceavailable = request.data['serviceavailable']

            if 'servicepricing' in request.data:
                servicelist.serviceprice = request.data['servicepricing']

            if 'serviceavailability' in request.data:
                servicelist.status = request.data['serviceavailability']

            servicelist.save()
            return Response({"message": "Service Updated Successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'error'}, status=status.HTTP_400_BAD_REQUEST)


# User Service Entry View        
class UserServiceRequestView(APIView):
    def post(self , request):
        serializer = UserServiceRequestSerializer(data = request.data)
        if serializer.is_valid():
           
            username = request.data.get('username')
            userdata = get_object_or_404(Users , username = username)
            user_id = userdata.id
            service_id = request.data.get('serviceid')
            
            service_use = ServiceUse.objects.create(
                 user_id = user_id , 
                 services_id =service_id , 
                 expiry_date = request.data.get('expiry_date'),
                 servicevalue = request.data.get('servicevalue'),
                 totalprice = request.data.get('totalprice'),
                 servicelocation = request.data.get('servicelocation'),   
                 status = "Payment Required",
                 startHour = request.data.get('startHour') ,
                 endHour = request.data.get('endHour')
             )

            service_use.save();
          
            return Response({"message": "Service request created successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error" :'Error Performing Request'}, status=status.HTTP_400_BAD_REQUEST)

# Viewing ALl Requested Services from the Client
class ViewServiceRequestView(APIView):
     def get(self ,request):
            requestedservice = ServiceUse.objects.all()
            serializer = ViewServiceRequestedSerializer(requestedservice , many=True)
            return Response(serializer.data ,status=status.HTTP_200_OK)
     
# Fetching Single Request Service 
class SingleRequestedServiceView(RetrieveAPIView):
     queryset = ServiceUse.objects.prefetch_related('payments').all()
     serializer_class = ViewServiceRequestedSerializer 

# Updating the requested service 
class UpdateServiceRequestView(RetrieveAPIView):
    def post(self, request, id):
        service_use = get_object_or_404(ServiceUse, id=id)
        serializer = UpdateServiceStatusSerializer(data=request.data)
        
        if serializer.is_valid(): 
            serviceuse_status = serializer.validated_data.get('action')
            assigned_employee_fullname = serializer.validated_data.get('assignedEmployee')
            payment_approval = serializer.validated_data.get('paymentApproval')
            
            assigned_employee_data = Users.objects.get(fullname=assigned_employee_fullname)
            assigned_employee_id = assigned_employee_data.id
            payment_object = get_object_or_404(Payment , service_use_id = service_use.id)
            if serviceuse_status == "On-Going":
                if assigned_employee_id:
                    assigned_employee_table = AssignedEmployees.objects.filter(assigned_employee=assigned_employee_id).first()
                    if assigned_employee_table:
                        assigned_employee_table.service_request = service_use
                        assigned_employee_table.work_status = "Occupied"
                        assigned_employee_table.save()
                if payment_approval == "Payment Received":
                    payment_object.payment_approval = True
                else:
                    payment_object.payment_approval = False
                payment_object.save()
                service_use.status = serviceuse_status
                service_use.approved_date = timezone.now()
                service_use.save()

            return Response({'message': 'Status updated!'}, status=status.HTTP_200_OK)

        return Response({'message': 'error'}, status=status.HTTP_400_BAD_REQUEST)



# Getting the requested service for solo client
class ClientServiceView(ListAPIView):
    serializer_class = ViewServiceRequestedEmployeeSerializer    
    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        service_uses = ServiceUse.objects.filter(user_id = user_id)
        for service_use in service_uses:
             assigned_employee =  AssignedEmployees.objects.filter(service_request = service_use).first()
             service_use.assigned_employee = assigned_employee 
        return service_uses     


# Fetching the free for work employees in the requested service panel in admin 
class AssignedEmployeesView(APIView):
    def get(self, request, format=None):
        # Fetch AssignedEmployees data
        assigned_employees = AssignedEmployees.objects.filter(work_status='Free For Work')
        serializer = AssignedEmployeesSerializer(assigned_employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class EmployeeWorkScheduleView(RetrieveAPIView):
    queryset = AssignedEmployees.objects.all()
    serializer_class = EmployeeAssignedServiceSerializer
    lookup_field = "assigned_employee_id"
