from time import timezone
from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from django.http import HttpResponse
from .serializers import ServiceCreateSerializer , UserServiceRequestSerializer , ViewServiceRequesteSerializer , UpdateServiceStatusSerializer
from rest_framework import status
from rest_framework.response import Response
from .models import ServiceList , ServiceUse
from app.models import Users 
# Create your views here.
# Creating Service By The Admin
class CreateServiceView(APIView):
    def post (self, request):
        serializer = ServiceCreateSerializer(data = request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)
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
                 totalprice = request.data.get('totalprice')
             )

            service_use.save();
          
            return Response({"message": "Service request created successfully"}, status=status.HTTP_201_CREATED)
        else:
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Viewing ALl Requested Services from the Client
class ViewServiceRequestView(APIView):
     def get(self ,request):
            requestedservice = ServiceUse.objects.all()
            serializer = ViewServiceRequesteSerializer(requestedservice , many=True)
            return Response(serializer.data ,status=status.HTTP_200_OK)
     
# Fetching Single Request Service 
class SingleRequestedServiceView(RetrieveAPIView):
     queryset = ServiceUse.objects.all()
     serializer_class = ViewServiceRequesteSerializer 

# Updating the requested service 
     
class UpdateServiceRequestView(RetrieveAPIView):
    def post(self,request,id):
        service_use = get_object_or_404(ServiceUse , id = id)
       
        serializer =  UpdateServiceStatusSerializer(data = request.data)
        
        if serializer.is_valid():
            serviceuse_status = serializer.validated_data.get('action')
            service_use.status = serviceuse_status
            service_use.save()
            return Response({'message': 'Status updated!'}, status=status.HTTP_200_OK) 
        return Response({'message': 'error'}, status=status.HTTP_400_BAD_REQUEST)




