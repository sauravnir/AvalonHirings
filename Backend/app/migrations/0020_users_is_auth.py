# Generated by Django 4.2.5 on 2023-12-24 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0019_users_otp"),
    ]

    operations = [
        migrations.AddField(
            model_name="users",
            name="is_auth",
            field=models.BooleanField(default=False),
        ),
    ]
