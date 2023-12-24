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
# Create your views here.

class ContractList(APIView):
    def get(self , request ):
        contracts = Contract.objects.all()
        serializer =UserContractSerializer(contracts , many = True)
        return Response(serializer.data , status = status.HTTP_200_OK)


class ContractObjectView(APIView):
    def get(self , request , id=None):
        contracts = get_object_or_404(Contract,id=id)
        serializer = UserContractSerializer(contracts)
        return Response(serializer.data , status = status.HTTP_200_OK)
        

class UpdatedContractView(APIView):
    def post(self , request ,id) : 
        contract = get_object_or_404(Contract,id = id)
        serializer = ContractUpdateSerializer(data=request.data)
        user_data = Users.objects.get(id=contract.user.id)
        if serializer.is_valid():
            contract_status = serializer.validated_data.get('action');
            if contract_status == "Approved":
                contract.contract_status = "Approved"
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
                # if(get_object_or_404(CustomToken , user_id = user_data.id)):
                #     token = get_object_or_404(CustomToken , user_id = user_data.id)
                #     destroy_token = token("");
                
                user_data.save()
                # destroy_token.save()
                contract.save()
                return Response({'message': 'Report updated successfully'}, status=status.HTTP_200_OK)
                
        return Response({'message': 'error'}, status=status.HTTP_400_BAD_REQUEST)