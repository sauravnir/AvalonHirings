# Generated by Django 4.2.5 on 2023-12-21 13:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0008_users_user_id"),
    ]

    operations = [
        migrations.RemoveField(model_name="users", name="user_id",),
    ]
