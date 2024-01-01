from django.db import models
from services.models import ServiceUse
# Create your models here.
class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('Cash', 'Cash'),
        ('Khalti Payment','Khalti Payment')
    ]

    

    service_use = models.ForeignKey(ServiceUse, on_delete=models.CASCADE , null = True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField()
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    transaction_reference = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return f"{self.contract.contract_id} - {self.amount} - {self.payment_date}"