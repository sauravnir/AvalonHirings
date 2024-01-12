from django.urls import path
from .views import UserLoginView, UserCreateView , UserForgotPasswordView , OTPTransactionView ,UserDownloadFileView, UserProfileData,UserProfileUpdateView,UserProfileView,UpdateProfilePictureView, PostAnnouncementView , GetAllAnnouncementView , AllUsersView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("login/", UserLoginView.as_view() , name="Login"),
    path("register/", UserCreateView.as_view() , name="Register"),
    path("forgotpassword/" , UserForgotPasswordView.as_view() , name="Forgot Password"),
    path('otp/' , OTPTransactionView.as_view() , name="OTP"),
    path('downloadfile/' , UserDownloadFileView.as_view() , name="Download File"),
    path('userdata/' , UserProfileData.as_view() , name="User Profile"),
    path('updateprofile/', UserProfileUpdateView.as_view() , name="Update User Profile"),
    path('viewprofile/<int:pk>' , UserProfileView.as_view() , name="View Profile"),
    path('updateprofilepicture/', UpdateProfilePictureView.as_view() , name="Update Profile Picture"),
    path('postannouncement/' , PostAnnouncementView.as_view() , name ="Post Announcement"),
    path('updateannouncement/<int:pk>' ,PostAnnouncementView.as_view() , name ="Update Announcement" ),
    path('deleteannouncement/<int:pk>' ,PostAnnouncementView.as_view() , name ="Delete Announcement" ),
    path('getannouncement/' , GetAllAnnouncementView.as_view() , name="All Announcements"),
    path('getannouncement/<int:pk>' , GetAllAnnouncementView.as_view() , name="Single Announcement"),
    path('allusers/', AllUsersView.as_view() ,name="All Users")
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)