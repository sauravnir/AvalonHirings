from django.urls import path
from .views import CreateServiceView,GetCreatedServiceView

urlpatterns=[
    path("createservice/" , CreateServiceView.as_view() , name="Services"),
    path("getservices/" ,GetCreatedServiceView.as_view() , name="Created Services")
]