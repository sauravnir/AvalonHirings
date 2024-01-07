from django.urls import path
from .views import EmployeeRating


urlpatterns = [
    path('rateemployee/' , EmployeeRating.as_view(), name="Rate Employee")
]