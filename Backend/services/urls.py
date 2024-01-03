from django.urls import path
from .views import CreateServiceView,GetCreatedServiceView,GetSingleServiceView,UserServiceRequestView ,ClientServiceView, ViewServiceRequestView,SingleRequestedServiceView, UpdateServiceRequestView ,AssignedEmployeesView,EmployeeWorkScheduleView 
urlpatterns=[
    path("createservice/" , CreateServiceView.as_view() , name="Services"),
    path("getservices/" ,GetCreatedServiceView.as_view() , name="Created Services"),
    path("getservice/<int:pk>" , GetSingleServiceView.as_view() , name="Single Service Items"),
    path("postrequest/" , UserServiceRequestView.as_view() , name="Post Requests"),
    path('getrequestedservice/',ViewServiceRequestView.as_view() , name= "Get Requested Service"),
    path('singlerequestedservice/<int:pk>',SingleRequestedServiceView.as_view() , name = "Single Requested Service"),
    path("updateservicerequest/<int:id>" , UpdateServiceRequestView.as_view() , name="Update Service Request"),
    path("viewclientservice/<int:user_id>",ClientServiceView.as_view() , name="Single Client Service View"),
    path("freeemployees/" , AssignedEmployeesView.as_view() , name="Free Employees View"),
    path("assignedservices/<int:assigned_employee_id>",EmployeeWorkScheduleView.as_view() , name="Employee Service Assigned")
]