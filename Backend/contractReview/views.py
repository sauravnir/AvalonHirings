from django.shortcuts import render
from django.http import HttpResponse
import sys;
# Create your views here.

def Test(request):
    print("This is print in the console!" , file=sys.stdout)
    return HttpResponse("<div>This is a test!</div>")