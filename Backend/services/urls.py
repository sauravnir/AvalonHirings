from django.urls import path
from .views import CreateServiceView,GetCreatedServiceView,GetSingleServiceView,UserServiceRequestView
urlpatterns=[
    path("createservice/" , CreateServiceView.as_view() , name="Services"),
    path("getservices/" ,GetCreatedServiceView.as_view() , name="Created Services"),
    path("getservice/<int:pk>" , GetSingleServiceView.as_view() , name="Single Service Items"),
    path("postrequest/" , UserServiceRequestView.as_view() , name="Post Requests")
]