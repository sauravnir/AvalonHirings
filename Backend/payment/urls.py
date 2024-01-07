from django.urls import path
from .views import ServicePaymentView , SubscriptionView , SubscriptionDetailsView , CashPaymentView


urlpatterns = [
    path("servicetransaction/", ServicePaymentView.as_view(), name="ServicePayment"),
    path("subscriptionpayment/" , SubscriptionView.as_view(), name="Subscription Payment"),
    path("subscriptiondetails/<int:user_id>" , SubscriptionDetailsView.as_view(), name="Subscription Details"),
    path("cashpayment/" , CashPaymentView.as_view(), name="Cash Payment")
]