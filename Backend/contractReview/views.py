from django.shortcuts import get_object_or_404
from .models import Contract
from .serializers import UserContractSerializer , ContractUpdateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from app.models import Users , CustomToken
from django.conf import settings
from django.core.mail import send_mail
import math , random 
from rest_framework.generics import RetrieveAPIView
from services.models import AssignedEmployees
from payment.models import Caliber
# Create your views here.

class ContractList(APIView):
    def get(self , request ):
        contracts = Contract.objects.all()
        serializer =UserContractSerializer(contracts , many = True)
        return Response(serializer.data , status = status.HTTP_200_OK)


class ContractObjectView(RetrieveAPIView):
    queryset = Contract.objects.all()
    serializer_class = UserContractSerializer
        

class UpdatedContractView(APIView):
    def post(self , request ,id) : 
        contract = get_object_or_404(Contract,id = id)
        serializer = ContractUpdateSerializer(data=request.data)
        user_data = Users.objects.get(id=contract.user.id)
        if serializer.is_valid():
            contract_status = serializer.validated_data.get('action');
            if contract_status == "Approved":
                contract.contract_status = "Approved"


                # Populating the AssignedEmployee model 

                if (user_data.user_type == "Employee"):
                    assigned_employee = AssignedEmployees.objects.create(
                        assigned_employee = user_data , 
                        work_status = 'Free For Work',   
                    )

                    employee_caliber = Caliber.objects.create(
                        employee = user_data ,
                    )

                    employee_caliber.save()
                    assigned_employee.save();
                

                user_data.is_auth = True 
                print(user_data.is_auth)
                otp_digits = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                OTP = ""
                for i in range(4):
                    OTP += otp_digits[math.floor(random.random() * len(otp_digits))]
                
                subject = "One Transaction Pin";
                message = f"Here is your One Time Transaction PIN. Use it to login into the system : {OTP}";
                recipient_list = [user_data.email];
                if user_data.otp == "":
                    user_data.otp = OTP;
                    user_data.save();
                    send_mail(subject , message ,settings.EMAIL_HOST_USER, recipient_list);
                    
                contract.save()
                return Response({'message': 'Report updated successfully'}, status=status.HTTP_200_OK)
            elif contract_status == "Terminated":
                contract.contract_status = "Terminated"
                user_data.is_auth = False;

                if(user_data.otp):
                    user_data.otp = "";
                if(user_data.is_auth == True):
                    user_data.is_auth = False;
                
                AssignedEmployees.objects.filter(assigned_employee = user_data).delete()
                user_data.save()
                contract.save()
                return Response({'message': 'Report updated successfully'}, status=status.HTTP_200_OK)
                
        return Response({'message': 'error'}, status=status.HTTP_400_BAD_REQUEST)