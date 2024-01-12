from django.urls import path
from .views import ContractList , ContractObjectView , UpdatedContractView , AdminUpdateCaliberView

urlpatterns = [
    path("contract/", ContractList.as_view(), name="Contract Get"),
    path("contractupdate/<int:id>", UpdatedContractView.as_view(), name="Contract Update"),
    path("contractinfo/<int:pk>", ContractObjectView.as_view(), name="Single Contract Data"),
    path("assigncaliber/<int:pk>" , AdminUpdateCaliberView.as_view() , name="Assign Caliber")

]