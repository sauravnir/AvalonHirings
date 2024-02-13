from django.urls import path
from .views import EmployeeRating , GetSingleRatingsView , GetAllRatingsView , SingleRatingView ,NotificationView

urlpatterns = [
    path('rateemployee/' , EmployeeRating.as_view(), name="Rate Employee"),
    path('getratings/<int:employee_id>', GetSingleRatingsView.as_view() , name="Get Total Ratings"),
    path('allratings/' , GetAllRatingsView.as_view() , name="All Ratings"),
    path('singleratings/<int:pk>', SingleRatingView.as_view() , name="Singleratings"),
    path('notification/<int:user_id>' , NotificationView.as_view() , name="Notification ")
]