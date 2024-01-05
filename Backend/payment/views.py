from django.shortcuts import get_object_or_404
# from .serializers import UserContractSerializer , ContractUpdateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from app.models import Users , CustomToken
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.generics import RetrieveAPIView
from .models import Payment , Subscription
from django.http import JsonResponse
import requests
from services.models import ServiceUse
from datetime import datetime

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
            return JsonResponse({'message': 'Payment successful'}, status=200)
        else:
         return JsonResponse({'message': 'Payment verification failed'}, status=400)


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
       )

       subscription_model.save()
       return JsonResponse({'message': 'Payment successful'}, status=200)
    else:
         return JsonResponse({'message': 'Payment verification failed'}, status=400)