from django.shortcuts import get_object_or_404
from .serializers import SubscriptionSerializer , CombinedPaymentSerializer , CaliberSerializer , ClientTransactionDetailsSerializer , EmployeeSalarySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from app.models import Users , CustomToken
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.generics import RetrieveAPIView , ListAPIView
from .models import Payment , Subscription , Caliber , Salary
from django.http import JsonResponse
import requests
from services.models import ServiceUse
from datetime import datetime
from django.core.mail import EmailMessage
import math , random

class ServicePaymentView(APIView):
    def post(self , request ):
        payment_token = request.data.get('payment_token');
        payment_amount = request.data.get('payment_amount');
        service_use_id = request.data.get('serviceuseid');

        khalti_secret_key = "test_secret_key_2e2a4748321a4cc4b3b13f1d42929907"
        verification_url = "https://khalti.com/api/v2/payment/verify/"
        
        headers = {
            'Authorization' : f'key {khalti_secret_key}',
        }

        payload = {
            'token' : payment_token,
            'amount' : payment_amount,
        }
        response = requests.post(verification_url, headers=headers, json=payload)

        if response.status_code == 200 :
            serviceuse = get_object_or_404(ServiceUse , id = service_use_id)
            serviceuse.status = "Paid (Waiting For Approval)"
            payment = Payment.objects.create(
                service_use = serviceuse,
                amount = payment_amount * 100,
                transaction_reference = payment_token ,
                payment_method = "Khalti Payment",
                payment_date = datetime.now()
            )

            payment.save();
            serviceuse.save();    
            return Response({'message': 'Payment successful'}, status=200)
        else:
         return Response({'message': 'Payment verification failed'}, status=400)


class CashPaymentView(APIView):
    def post(self , request ):
        service_use_id =  request.data.get("service_use_id")
        total_price = request.data.get("total_price")
        
        serviceuse = get_object_or_404(ServiceUse , id = service_use_id)
        if serviceuse is not None:
           serviceuse.status = "Paid (Waiting For Approval)";
            # Generating random traansaction reference  
           transaction_digits = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
           ref = ""
           for i in range(22):
                ref += transaction_digits[math.floor(random.random() * len(transaction_digits))]
           payment = Payment.objects.create(
              service_use = serviceuse, 
              amount = total_price , 
              payment_method = "Cash Payment",
              payment_date = datetime.now(),
              transaction_reference = ref 
           )
           payment.save()
           serviceuse.save()
           return Response({'message':'Payment Made Successfully'} , status = status.HTTP_200_OK)
        else:
            return Response({'error': 'Failed To Make Payment'}, status=status.HTTP_400_BAD_REQUEST)



class SubscriptionView(APIView):
   def post(self , request):
    payment_token = request.data.get('payment_token');
    payment_amount = request.data.get('payment_amount');
    user_id = request.data.get('user_id');
    print('The user id is' , user_id)
    khalti_secret_key = "test_secret_key_2e2a4748321a4cc4b3b13f1d42929907"
    verification_url = "https://khalti.com/api/v2/payment/verify/"

    headers = {
            'Authorization' : f'key {khalti_secret_key}',
        }

    payload = {
       'token' : payment_token,
        'amount' : payment_amount,
    }          

    response = requests.post(verification_url, headers=headers, json=payload)

    if response.status_code == 200:
       user = get_object_or_404(Users , id = user_id)   
       subscription_model = Subscription.objects.create(
          user = user , 
          amount = payment_amount/10 ,
          transaction_reference = payment_token ,
          is_subscribed = True, 
          payment_date = datetime.now()
       )

       subscription_model.save()
       return JsonResponse({'message': 'Payment successful'}, status=200)
    else:
         return JsonResponse({'message': 'Payment verification failed'}, status=400)
    


class SubscriptionDetailsView(RetrieveAPIView):
   queryset = Subscription.objects.all()
   serializer_class = SubscriptionSerializer
   lookup_field = "user_id"



class CombinedPaymentView(APIView):
   def get(self, request, *args, **kwargs):
        combined_data = {
           'client_payment_details' : Payment.objects.all(),
           'client_offer_subscription' : Subscription.objects.all(),
           'salary_payment_details': Salary.objects.all(),
        }

        serializer = CombinedPaymentSerializer(combined_data)
        return Response(serializer.data)

# Get the Employee Details for creating transaction   
class EmployeeSalaryView(ListAPIView):
    queryset = Caliber.objects.all()
    serializer_class =  CaliberSerializer


# Class Fetch the employee details for updating the caliber table for employee salary     
class CreateEmployeeSalaryView(APIView):
   def post (self , request):
            amount = request.data.get('amount')
            description =  request.data.get('description')
            caliber =  request.data.get('caliber')
            caliber_object = Caliber.objects.get(id = caliber)
            if caliber is not None : 
                if description is not None :
                    salary_object = Salary.objects.create(
                        amount = amount , 
                        payment_date = datetime.now(),
                        description = description ,
                        caliber_id = caliber_object.id  
                        

                    )
                    salary_object.save()
            
                    return Response({'message' : "Transaction Created Successfully"} , status = status.HTTP_200_OK)
            else:
                return Response({'error' : "Transaction Failed"} , status= status.HTTP_400_BAD_REQUEST)
            

# Single Client Payment View 
class ClientTransactionView(APIView):
    def get(self , request ,user_id):
        try:
            payments = Payment.objects.filter(service_use__user_id = user_id)

            serializer =ClientTransactionDetailsSerializer(payments , many = True)

            return Response(serializer.data,  status = status.HTTP_200_OK)

        except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class EmployeeDashboardSalaryView(APIView):
    def get(self , request , user_id):
        try :
            salary = Salary.objects.filter(caliber__employee = user_id)

            serializer = EmployeeSalarySerializer(salary , many = True)

            return Response(serializer.data , status = status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)