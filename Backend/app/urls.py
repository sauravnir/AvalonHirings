from django.urls import path
from .views import UserLoginView, UserCreateView , UserForgotPasswordView , OTPTransactionView ,UserDownloadFileView

urlpatterns = [
    path("login/", UserLoginView.as_view() , name="Login"),
    path("register/", UserCreateView.as_view() , name="Register"),
    path("forgotpassword/" , UserForgotPasswordView.as_view() , name="Forgot Password"),
    path('otp/' , OTPTransactionView.as_view() , name="OTP"),
    path('downloadfile/' , UserDownloadFileView.as_view() , name="Download File")
]
