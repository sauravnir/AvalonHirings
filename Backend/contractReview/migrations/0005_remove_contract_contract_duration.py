# Generated by Django 4.2.5 on 2023-12-24 14:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("contractreview", "0004_alter_contract_contract_status"),
    ]

    operations = [
        migrations.RemoveField(model_name="contract", name="contract_duration",),
    ]
