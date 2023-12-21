from django.urls import path
from .views import ContractList

urlpatterns = [
    path("contract/", ContractList.as_view(), name="contractreview")
]