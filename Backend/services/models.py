from django.utils import timezone
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone


class ServiceList(models.Model):
    servicename = models.CharField(max_length=255)
    servicetarget = models.CharField(max_length=255)
    servicedesc = models.TextField()
    serviceprice = models.IntegerField(default=None)
    status = models.CharField(max_length=255 , default=None)
    serviceavailable= models.CharField(max_length=255, default=None)
    required_caliber = models.CharField(max_length=255, default="Bronze")
    def __str__(self):
        return self.servicename


class ServiceUse(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE) 
    services = models.ForeignKey(ServiceList , on_delete=models.CASCADE) 
    approved_date = models.DateTimeField(default = timezone.now)
    expiry_date = models.DateTimeField()
    status = models.CharField(max_length=255, default="Pending")
    servicevalue = models.IntegerField(default=None)
    totalprice = models.IntegerField(default=None)
    servicelocation = models.CharField(max_length=255, default=None)
    startHour = models.TimeField(default = None);


    def __str__(self):
       return f"{self.user.username} - {self.services.servicename}"

class AssignedEmployees(models.Model):
    service_request = models.OneToOneField(ServiceUse, on_delete=models.CASCADE , null=True, blank=True)
    assigned_employee = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    work_status = models.CharField(max_length=255 , default='Free For Work')
    def __str__(self):
        return f"{self.service_request} - {self.assigned_employee.username}"



