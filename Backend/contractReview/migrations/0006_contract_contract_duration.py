# Generated by Django 4.2.5 on 2023-12-24 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contractreview", "0005_remove_contract_contract_duration"),
    ]

    operations = [
        migrations.AddField(
            model_name="contract",
            name="contract_duration",
            field=models.IntegerField(default=None),
        ),
    ]
