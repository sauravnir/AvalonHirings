from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
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
    REQUIRED_FIELDS = ['fullname', 'user_type', 'date_of_birth','email','password','username']

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='app_users',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='app_users',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username
