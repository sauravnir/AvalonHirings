from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework.authtoken.models import Token
from django.utils import timezone
from .manager import CustomUserManager
# Create your models here.

class Users(AbstractBaseUser , PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    fullname = models.CharField(max_length=255)
    user_type = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    # fileupload = models.FileField(upload_to='uploads/')

    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

    def __str__(self):
        return self.username


class CustomToken(models.Model):
    user = models.OneToOneField(Users, on_delete = models.CASCADE , related_name='custom_token')
    key = models.CharField(max_length=40, unique=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Token for {self.user.username}'