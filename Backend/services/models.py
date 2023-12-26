from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.


class ServiceList(models.Model):
    servicename = models.CharField(max_length=255)
    servicetarget = models.CharField(max_length=255)
    servicedesc = models.TextField()
    serviceprice = models.IntegerField(default=None)

    def __str__(self):
        return self.servicename


class ServiceUse(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE) 
    services = models.ManyToManyField(ServiceList)  # Changed to 'services' instead of 'service'
    approved_date = models.DateTimeField()
    expiry_date = models.DateTimeField()
    status = models.CharField(max_length=255)
    service_id = models.IntegerField(default=None)
    assigned = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {', '.join(service.servicename for service in self.services.all())}"

class AssignedEmployees(models.Model):
    service_request = models.OneToOneField(ServiceUse, on_delete=models.CASCADE)
    assigned_employee = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.service_request} - {self.assigned_employee.username}"
