from django.urls import path
from .views import ContractList , ContractObjectView , UpdatedContractView

urlpatterns = [
    path("contract/", ContractList.as_view(), name="Contract Get"),
    path("contractupdate/<int:id>", UpdatedContractView.as_view(), name="Contract Update")
]