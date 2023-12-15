from django.urls import path
from .views import UserLoginView, UserCreateView

urlpatterns = [
    path("login/", UserLoginView.as_view() , name="Login"),
    path("register/", UserCreateView.as_view() , name="Register"),
]
