# Generated by Django 4.2.5 on 2023-12-27 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("services", "0003_servicelist_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="servicelist",
            name="serviceavailable",
            field=models.CharField(default=None, max_length=255),
        ),
    ]
