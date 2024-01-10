from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model 
from django.utils import timezone
from reports.models import Reports 
from services.models import ServiceUse , ServiceList
from payment.models import Payment 
from .models import Notification

Users = get_user_model()

@receiver(post_save , sender = Reports)
def reports_notification(sender , instance ,created , **kwargs):
    if created:
        Notification.objects.create(
            user = instance.user , 
            message = f'Report"{instance.title}has been created"',
            content_object = instance
        )
