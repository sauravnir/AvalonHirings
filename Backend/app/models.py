from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .manager import CustomUserManager
import uuid
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_save


def default_profilepic_path(instance , filename):
    return f"WebsiteFiles/UserProfile/"

def default_citizenship_front_path(instance , filename):
    return f"Citizenship/"

def default_citizenship_back_path(instance , filename):
    return f"Citizenship/"

def default_work_cv_path(instance , filename):
    return f"CV/"

class Users(AbstractBaseUser , PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    fullname = models.CharField(max_length=255)
    user_type = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    otp = models.CharField(max_length=255)
    is_auth = models.BooleanField(default = False)
    contact = models.CharField(max_length=255)
    profilepic = models.ImageField(upload_to ="", default="WebsiteFiles/UserProfile/A.png")
    citizenship_front = models.ImageField(upload_to ="" , default = None, blank = True)
    citizenship_back = models.ImageField(upload_to ="", default = None, blank = True)
    work_cv = models.FileField(upload_to ="", default = None, blank = True)
    is_otp = models.BooleanField(default = False); 
    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

    def __str__(self):
        return self.username


@receiver(post_save, sender=Users)
def insert_contract(sender, instance, created, **kwargs):
    if created:
        from contractreview.models import Contract
        unique_id = str(uuid.uuid4())[:4]
        contract = Contract.objects.create(
            user=instance,
            contract_id=unique_id,
            created_date=timezone.now(),
            contract_status='Pending',
            renewal_date=timezone.now(),
        )
        contract.save()


class CustomToken(models.Model):
    user = models.OneToOneField(Users, on_delete = models.CASCADE , related_name='custom_token')
    key = models.CharField(max_length=40, unique = True)
    created = models.DateTimeField(auto_now_add=True)
    expiration = models.DateTimeField(default=timezone.now , blank = True)

    def __str__(self):
        return f'Token for {self.user.username}'

class Announcements(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)


