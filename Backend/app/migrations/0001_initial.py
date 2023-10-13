# Generated by Django 4.2.6 on 2023-10-12 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("username", models.CharField(max_length=255, unique=True)),
                ("email", models.EmailField(max_length=255, unique=True)),
                ("fullname", models.CharField(max_length=255)),
                ("user_type", models.CharField(max_length=255)),
                ("password", models.CharField(max_length=255)),
                ("date_of_birth", models.DateField()),
                ("fileupload", models.FileField(upload_to="uploads/")),
            ],
        ),
    ]
