# Generated by Django 4.2.5 on 2023-12-22 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0018_remove_users_otp"),
    ]

    operations = [
        migrations.AddField(
            model_name="users", name="otp", field=models.IntegerField(default=None),
        ),
    ]
