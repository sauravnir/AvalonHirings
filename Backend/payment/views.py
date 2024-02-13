from django.shortcuts import get_object_or_404
from .serializers import SubscriptionSerializer , CombinedPaymentSerializer , CaliberSerializer , ClientTransactionDetailsSerializer , EmployeeSalarySerializer
from rest_framework.views import APIView
from rest_framework.response import Response 
from django.http import HttpResponse
from rest_framework import status
from app.models import Users , CustomToken
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.generics import RetrieveAPIView , ListAPIView
from .models import Payment , Subscription , Caliber , Salary
from django.http import JsonResponse
import requests
from services.models import ServiceUse , ServiceList
from datetime import datetime
from django.core.mail import EmailMessage
import math , random
from django.template.loader import render_to_string
from django.utils import timezone
from decimal import Decimal
from django.db import transaction
from ratings.models import Notification
from rest_framework.exceptions import ValidationError


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
           
            serviceuse.status = "Allocating"
            payment = Payment.objects.create(
                service_use = serviceuse,
                amount = payment_amount * 100,
                transaction_reference = payment_token ,
                payment_method = "Khalti Payment",
                payment_date = datetime.now()
            )
        
            userdata = get_object_or_404(Users , id = serviceuse.user_id)    
            servicename = serviceuse.services
            user_email = userdata.email
            email_data = {
                'name' : userdata.fullname ,
                'servicename' : servicename , 
                'payment_time' : timezone.now().date(),
                'amount' : payment_amount * 100,
                'mode' : 'Online Payment (Khalti)'
            }    


            # Implementing Notfication 
            try:
                admin_user = Users.objects.get(is_superuser = True);
            except Users.DoesNotExist:
                    return HttpResponse({'error': 'Admin User Not Found'}, status=500)
            with transaction.atomic():
                Notification.objects.create(
                    from_user = userdata , 
                    to_user = admin_user, 
                    message = f"Online Payment Received from {userdata.username}"
                )
        

            email_body = render_to_string('servicepayment.html' , email_data);
            email = EmailMessage(
                'Payment For Service Subscription',
                email_body ,
                settings.EMAIL_HOST_USER,
                [user_email] ,
            )

            email.content_subtype = "html"
            email.send(fail_silently=False)

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
           serviceuse.status = "Allocating";
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
    def post(self, request):
        payment_token = request.data.get('payment_token')
        payment_amount = request.data.get('payment_amount')
        user_id = request.data.get('user_id')
        print('The user id is', user_id)
        khalti_secret_key = "test_secret_key_2e2a4748321a4cc4b3b13f1d42929907"
        verification_url = "https://khalti.com/api/v2/payment/verify/"

        headers = {
            'Authorization': f'key {khalti_secret_key}',
        }

        payload = {
            'token': payment_token,
            'amount': payment_amount,
        }

        response = requests.post(verification_url, headers=headers, json=payload)

        if response.status_code == 200:
            user = get_object_or_404(Users, id=user_id)
            subscription_model = Subscription.objects.create(
                user=user,
                amount=payment_amount / 10,
                transaction_reference=payment_token,
                is_subscribed=True,
                payment_date=datetime.now()
            )

            email_data = {
                'name': user.fullname,
                'servicename': 'Premium Subscription Plan',
                'amount': payment_amount / 10,
                'payment_time': timezone.now().date(),
                'mode': "Khalti Payment",
            }

            email_body = render_to_string('servicepayment.html', email_data)
            email = EmailMessage(
                'Payment For Premium Subscription',
                email_body,
                settings.EMAIL_HOST_USER,
                [user.email],
            )

            email.content_subtype = "html"
            email.send(fail_silently=False)

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


# Salary payment/booking view for the employee


class CreateEmployeeSalaryView(APIView):
       def post (self , request):
            amount = request.data.get('amount')
            description =  request.data.get('description')
            caliber =  request.data.get('caliber')
            payment_type = request.data.get("payment_type");
            caliber_object = Caliber.objects.get(id = caliber)
            if caliber is not None and payment_type == "Salary Booking": 
                salary_object = Salary.objects.create(
                    salary_book=amount , 
                    action_date = datetime.now(),
                    description = description,
                    caliber_id = caliber_object.id  
                )
                # Implementing Notification 
                try:
                    admin_user = Users.objects.get(is_superuser=True)
                except Users.DoesNotExist:
                    return HttpResponse({'error': 'Admin User Not Found'}, status=500)

                with transaction.atomic():
                    notification = Notification.objects.create(
                        from_user = admin_user , 
                        to_user = caliber_object.employee,
                        message = f"{payment_type} made for {caliber_object.employee.username}.", 
                    );

                salary_object.save()
                return Response({'message' : "Salary Booked Successfully"} , status = status.HTTP_201_CREATED)
            elif caliber is not None and payment_type == "Salary Payment":
                salary_object = Salary.objects.create(
                    amount = amount , 
                    action_date = datetime.now(),
                    description = description,
                    caliber_id = caliber_object.id
                )

                try:
                    admin_user = Users.objects.get(is_superuser=True)
                except Users.DoesNotExist:
                    return HttpResponse({'error': 'Admin User Not Found'}, status=500)

                with transaction.atomic():
                    notification = Notification.objects.create(
                        from_user = admin_user , 
                        to_user = caliber_object.employee,
                        message = f"{payment_type} made for {caliber_object.employee.username}.", 
                    );

                salary_object.save();
                return Response({'message' : "Salary Paid Successfully"} , status= status.HTTP_201_CREATED)

            
            
# Fetching the salary_book-amount value for the specified employee
class FetchSalaryAmountView(APIView):
    def get(self , request , caliber_id):
        # Query Salary objects for the given caliber_id
        salary_table = Salary.objects.filter(caliber_id=caliber_id) 

        # Calculating the total sum of the salary_book amount 
        total_salary_book = sum(salary.salary_book for salary in salary_table if salary.salary_book is not None)
        print(total_salary_book)
        # Latest transacted amount
        if salary_table.exists():
            latest_salary = salary_table.last()
            latest_amount = latest_salary.amount if latest_salary.amount is not None else Decimal(0)
        else:
            latest_amount = Decimal(0)
        
        print(latest_amount);
        # Total payable amount 
        total_payable = total_salary_book - latest_amount
        print(total_payable);

        return Response({
            'total_payable' : total_payable,
        } , status = status.HTTP_200_OK )


# Single Client Payment View 
class ClientTransactionView(APIView):
    def get(self , request ,user_id):
        try:
            payments = Payment.objects.filter(service_use__user_id = user_id)

            serializer =ClientTransactionDetailsSerializer(payments , many = True)

            return Response(serializer.data,  status = status.HTTP_200_OK)

        except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# Displaying the payment details in the employee dashboard 
class EmployeeDashboardSalaryView(APIView):
    def get(self , request , user_id):
        try :
            salary = Salary.objects.filter(caliber__employee = user_id)

            serializer = EmployeeSalarySerializer(salary , many = True)

            return Response(serializer.data , status = status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)