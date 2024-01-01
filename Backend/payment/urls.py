from django.urls import path
from .views import ServicePaymentView


urlpatterns = [
    path("servicetransaction/", ServicePaymentView.as_view(), name="ServicePayment")
]