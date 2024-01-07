from django.db import models
from app.models import Users
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal

# Create your models here.

class Rating(models.Model):
    client = models.ForeignKey(Users , on_delete=models.CASCADE , related_name='client_rating');
    employee = models.ForeignKey(Users , on_delete=models.CASCADE , related_name = 'employee_rating');
    ratings = models.DecimalField(max_digits= 3, decimal_places = 1, validators=[MinValueValidator(1), MaxValueValidator(5)] , default=Decimal('1.0'));
    comments = models.TextField()
    created_date = models.DateTimeField(auto_now_add = True) 


