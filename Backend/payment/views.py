from django.shortcuts import render
from django.http import HttpResponse
import sys
# Create your views here.


def Test(request):
        print("This is a test view" , file=sys.stdout);
        return HttpResponse("<h1>Test</h1>");