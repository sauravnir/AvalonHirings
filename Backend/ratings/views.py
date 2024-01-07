from .models import Rating
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from rest_framework import status
from app.models import Users
from payment.models import Caliber
# Create your views here.


class EmployeeRating(APIView):
    def post(self , request):
        rating_num = request.data.get('rating_num')
        rating_feedback = request.data.get('rating_feedback')
        client_id = request.data.get('client_id')
        employee_id = request.data.get('employee_id')

        client = get_object_or_404(Users , id = client_id)
        employee = get_object_or_404(Users , id = employee_id)

        

        rating = get_object_or_404(Caliber , employee = employee_id)
        
        if client and employee is not None:
            if rating_feedback is not None:
                employee_ratings = Rating.objects.create(
                  ratings = rating_num , 
                  comments = rating_feedback ,
                  created_date = datetime.now(),
                  client = client,
                  employee = employee,
                )
            else:
                employee_ratings = Rating.objects.create(
                  ratings = rating_num , 
                  comments = None ,
                  created_date = datetime.now(),
                  client = client,
                  employee = employee,
                  )
                
                
            employee_ratings.save()
            
            return Response({"message":"Ratings Saved Successfully"} , status = status.HTTP_200_OK)

        return Response({'message': "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)
