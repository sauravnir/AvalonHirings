from django.db import models
from app.models import Users

class Contract(models.Model):
    CONTRACT_STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
        ('Pending' , 'Pending'),
        ('Terminated' , 'Terminated')
    ]

    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    contract_id = models.CharField(max_length=255, unique=True)
    client_name = models.CharField(max_length=255)
    created_date = models.DateField()
    contract_status = models.CharField(max_length=20, choices=CONTRACT_STATUS_CHOICES)
    contract_type = models.CharField(max_length=255)
    renewal_date = models.DateField()
    contract_duration = models.IntegerField()

    def __str__(self):
        return f"{self.contract_id} - {self.client_name}"