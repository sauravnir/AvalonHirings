from django.shortcuts import render
from .serializer import NotificationSeralizer
from rest_framework import generics
from .models import Notification
from rest_framework.permissions import IsAuthenticated

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSeralizer
    
    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(content_object=user)






 