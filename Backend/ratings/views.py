from .models import Rating
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from rest_framework import status
from app.models import Users
from payment.models import Caliber
from rest_framework.generics import ListAPIView , RetrieveAPIView
from .serializers import RatingSerializer
# Create your views here.

# Client rating the employee
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
                rating.ratings = employee_ratings
            else:
                employee_ratings = Rating.objects.create(
                  ratings = rating_num , 
                  comments = None ,
                  created_date = datetime.now(),
                  client = client,
                  employee = employee,
                  )
                rating.ratings = employee_ratings
            rating.save()
            employee_ratings.save()
            
            return Response({"message":"Rating Successful"} , status = status.HTTP_200_OK)

        return Response({'error': "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)


# Getting the single ratings for the employee
class GetSingleRatingsView(ListAPIView):
    serializer_class = RatingSerializer
    def get_queryset(self):
        employee_id = self.kwargs['employee_id']
        return Rating.objects.filter(employee__id = employee_id , ratings__gt=3)
    
# Getting all the ratings
    
class GetAllRatingsView(ListAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

# Getting single ratings for the admin 
class SingleRatingView(RetrieveAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    lookup_field = 'pk'