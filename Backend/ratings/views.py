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
from .serializers import RatingSerializer , NotificationSerializer
from .models import Notification

# Client rating the employee
class EmployeeRating(APIView):
    def post(self, request):
        rating_num = request.data.get('rating_num')
        rating_feedback = request.data.get('rating_feedback')
        client_id = request.data.get('client_id')
        employee_id = request.data.get('employee_id')

        client = get_object_or_404(Users, id=client_id)
        employee = get_object_or_404(Users, id=employee_id)

        if client is None or employee is None:
            return Response({"error": "Client or employee not found"}, status=status.HTTP_404_NOT_FOUND)

        # Creating the rating object
        rating = Rating.objects.create(
            ratings=rating_num,
            comments=rating_feedback,
            created_date=datetime.now(),
            client=client,
            employee=employee,
        )
        rating.save()
        return Response({"message": "Rating successful"}, status=status.HTTP_200_OK)

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

# Sending Notification 
class NotificationView(APIView):
    def get(self,request,user_id):
        user = get_object_or_404(Users , id = user_id);
        notifications = Notification.objects.filter(to_user = user , is_read = False);
        serializer = NotificationSerializer(notifications , many = True);
        return Response(serializer.data);

class NotificationCountView(APIView):
    def post(self ,request, user_id):
        user = get_object_or_404(Users, id = user_id)
        # Marking the notificaiton 
        notificationRead = Notification.objects.filter(to_user = user , is_read = False);
        notificationRead.update(is_read = True);
        return Response({"success":"Notification Updated"} , status = 200)