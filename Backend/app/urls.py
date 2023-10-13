from django.urls import path
from .views import UserLoginView, UserRegistrationView


urlpatterns = [
    path("login/", UserLoginView.as_view() , name="Login"),
    path("register/", UserRegistrationView.as_view() , name="Register"),
]
