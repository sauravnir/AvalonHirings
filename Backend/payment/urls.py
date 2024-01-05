from django.urls import path
from .views import ServicePaymentView , SubscriptionView


urlpatterns = [
    path("servicetransaction/", ServicePaymentView.as_view(), name="ServicePayment"),
    path("subscriptionpayment/" , SubscriptionView.as_view(), name="Subscription Payment")
]