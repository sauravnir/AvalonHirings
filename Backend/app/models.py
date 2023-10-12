from django.db import models
from django.contrib.auth.models import AbstractUser

# Place to create database models here

class Users(AbstractUser):
    FullName = models.CharField(max_length=50)
    Email = models.CharField(max_length=50 , unique=True)
    UserName = None
    UserType= models.CharField(max_length=10)
    DateOfBirth = models.CharField(max_length=15);
    Password= models.CharField(max_length=100 , default='Password')
    USERNAME_FIELD = 'Email';
    REQUIRED_FIELDS = []

