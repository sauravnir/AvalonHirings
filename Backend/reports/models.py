from django.db import models
from app.models import Users
from django.utils import timezone

# Create your models here.
class Reports(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    issue_date = models.DateField(default=timezone.now)
    title = models.CharField(max_length=255)
    description = models.TextField()
    report_action = models.CharField(max_length=255 , default="Pending")

    def __str__(self):
        return f"{self.user.username}'s Report - {self.title}"


