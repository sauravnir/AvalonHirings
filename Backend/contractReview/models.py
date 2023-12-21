from django.db import models
from app.models import Users

class Contract(models.Model):
    CONTRACT_STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Pending' , 'Pending'),
        ('Terminated' , 'Terminated')
    ]

    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    contract_id = models.CharField(max_length=255, unique=True)
    created_date = models.DateField()
    contract_status = models.CharField(max_length=20, choices=CONTRACT_STATUS_CHOICES)
    renewal_date = models.DateField()
    contract_duration = models.IntegerField()

    def __str__(self):
        return f"{self.contract_id} - {self.client_name}"