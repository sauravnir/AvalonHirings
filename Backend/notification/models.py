from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey , GenericRelation
from django.contrib.contenttypes.models import ContentType
from app.models import Users
from django.utils import timezone
# Create your models here.


class Notification(models.Model):
    users = models.ForeignKey(Users , on_delete = models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    content_type = models.ForeignKey(ContentType , on_delete = models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type' , 'object_id')

    reverse_relation = GenericRelation('Notification', related_query_name='reverse_notifications')

    def __str__(self):
        return f"{self.user.username}'s Notification - {self.message}"

