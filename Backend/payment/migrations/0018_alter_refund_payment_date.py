# Generated by Django 4.2.5 on 2024-02-11 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("payment", "0017_refund_refund_status_refund_service_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="refund",
            name="payment_date",
            field=models.DateField(default=None),
        ),
    ]
