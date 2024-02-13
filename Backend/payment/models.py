from django.db import models
from services.models import ServiceUse
from app.models import Users
from ratings.models import Rating
import datetime
from decimal import Decimal 

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
    user = models.ForeignKey(Users, on_delete = models.CASCADE , null = True , related_name='subscriptions' )
    subscription_name = models.CharField(max_length=255, default="Premium Subscription Plan", blank=True)
    amount = models.IntegerField(default=2000 , blank=True)
    transaction_reference =models.CharField(max_length=255, blank=True, null=True)
    is_subscribed = models.BooleanField(default=False)
    payment_date = models.DateField(default = None)

    def __str__(self):
        return f"{self.subscription_name} - {self.amount} - {self.user} - {self.is_subscribed}"
    
class Caliber(models.Model):
    employee = models.OneToOneField(Users , on_delete = models.CASCADE , related_name = 'employee_caliber')
    ratings = models.OneToOneField(Rating, on_delete=models.CASCADE, null=True, blank=True, related_name='employee_caliber_rating')
    caliber_level = models.CharField(max_length = 255 , choices=[('bronze', 'Bronze'), ('silver', 'Silver'), ('gold', 'Gold')], default='bronze')

class Salary(models.Model):
    caliber = models.ForeignKey(Caliber , on_delete = models.CASCADE)
    amount = models.DecimalField(max_digits = 10 , decimal_places = 2  , null = True )
    action_date= models.DateField(default = datetime.date.today)
    description = models.TextField(blank = True)
    salary_book = models.DecimalField(max_digits = 10 , decimal_places = 2 , null = True)
    def __str__(self):
        return f"{self.caliber.employee.username} - {self.amount} - {self.payment_date} - {self.salary_book}"
    
class Refund(models.Model):
    user = models.ForeignKey(Users , on_delete = models.CASCADE)
    amount = models.DecimalField(max_digits = 10 , decimal_places = 3)
    payment_date = models.DateField(default = None)
    description = models.TextField(blank = True)
    service_name = models.CharField(max_length = 255 , default = None)
    refund_status = models.CharField(max_length=255 , default = "Pending");
    def __str__(self):
        return f"{self.user.username} - {self.amount} - {self.payment_date}"