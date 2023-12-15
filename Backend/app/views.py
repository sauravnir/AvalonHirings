
from rest_framework.views import APIView
from django.contrib.auth import authenticate , login
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer 
from .models import Users
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import AllowAny

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            # Authenticate the user
            user = authenticate(request, username=email, password=password)

            if user is not None:
                # Log in the user
                login(request, user)
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # def post(self, request, *args, **kwargs):
    #     serializer = UserLoginSerilizer(data=request.data)
    #     if serializer.is_valid():
    #         email = serializer.validated_data['email']
    #         password = serializer.validated_data['password']
    #         print(f"Attempting login with email:{email}, password:{password}")
    #         user = authenticate(request, username=email, password=password)
    #         if user : 
    #             print("Logged in successfully");
    #         if user is not None:
    #             token, created = Token.objects.get_or_create(user=user)
    #             return Response({'token': token.key}, status=status.HTTP_200_OK)
    #         else:
    #             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # def post(self,request):
    #     email = request.data.get('email')
    #     password = request.data.get('password')
    #     user = authenticate(request ,username=email, password=password , backend= 'django.contrib.auth.backends.ModelBackend')
    #     if user is not None:
    #         login(request , user)
    #         return Response({'message': 'Login Successful'})

    #     else:
    #         return Response({'error': 'Invalid Credentials'}, status=400);

class UserCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)