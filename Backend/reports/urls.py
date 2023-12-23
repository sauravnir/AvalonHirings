from django.urls import path
from .views import UserReportSubmitView,UserReportGetView

urlpatterns=[
    path("report/", UserReportSubmitView.as_view(), name="Payment"),
    path("getreport/" ,UserReportGetView.as_view() , name="Get Reports")
]