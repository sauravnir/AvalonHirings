from django.db import models
from services.models import ServiceUse
from app.models import Users
# Create your models here.
class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('Cash', 'Cash'),
        ('Khalti Payment','Khalti Payment')
    ]

    service_use = models.ForeignKey(ServiceUse, on_delete=models.CASCADE , null = True , related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField()
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    transaction_reference = models.CharField(max_length=255, blank=True, null=True)
    payment_approval = models.BooleanField(default = False , null = True)
    def __str__(self):
        return f"{self.service_use.id} - {self.amount} - {self.payment_date} - {self.payment_approval}"
    
class Subscription(models.Model):
    user = models.ForeignKey(Users, on_delete = models.CASCADE , null = True )
    subscription_name = models.CharField(max_length=255, default="Premium Subscription Plan", blank=True)
    amount = models.IntegerField(default=2000 , blank=True)
    transaction_reference =models.CharField(max_length=255, blank=True, null=True)
    is_subscribed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.subscription_name} - {self.amount} - {self.user} - {self.is_subscribed}"