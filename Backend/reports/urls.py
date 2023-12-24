from django.urls import path
from .views import UserReportSubmitView,UserReportGetView,ApprovedReportView, UserReportGetObjectView

urlpatterns=[
    path("report/", UserReportSubmitView.as_view(), name="Payment"),
    path("getreport/" ,UserReportGetView.as_view() , name="Get Reports"),
    path('getreportobject/<int:id>/', UserReportGetObjectView.as_view(), name='Get Report Objects'),
    path("updatereport/<int:id>" ,ApprovedReportView.as_view() , name="Approve Report Status")
]