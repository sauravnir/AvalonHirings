from django.shortcuts import render
from django.http import HttpResponse
from .serializers import UserReportSerializer , UserModelSerializer , ReportsSerializer , ReportUpdateSerializer
from .models import Reports
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView 
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail , EmailMessage
from django.conf import settings
from app.models import Users
from django.utils import timezone
from django.template.loader import render_to_string
from ratings.models import Notification
from django.db import transaction
# Users report creation view
class UserReportSubmitView(APIView):
    def post(self, request):
        user_name = request.data.get('username')
        if user_name is not None:   
            user_details = get_object_or_404(Users, username=user_name)
            user_email = user_details.email
        else:
            return HttpResponse({'error': 'user_name not provided'}, status=400)

        serializer = UserReportSerializer(data=request.data)

        if serializer.is_valid():
            title = serializer.validated_data['title']
            desc = serializer.validated_data['description']
            current_time = timezone.now().date()

            save_report = Reports(user=user_details,title=title, description=desc)

            save_report.save();

            #Storing the data for notification 

            try:
                admin_user = Users.objects.get(is_superuser = True)
            except Users.DoesNotExist:
                return HttpResponse({'error' :'Admin User Not Found'} , status =500) 


            with transaction.atomic():
                notification = Notification.objects.create(
                    from_user = user_details , 
                    to_user = admin_user , 
                    message = f"Report Submitted by {user_details.username} : {title}",
                )

            # Sending Emails 
            email_data = {
                "name" : user_details.fullname,
                "title" : title , 
                "description" : desc,
                "current_time" : current_time
            }

            email_body= render_to_string('userreportemail.html',email_data)
            email = EmailMessage(
                'Report Registration',
                email_body,
                user_email,
                [settings.EMAIL_HOST_USER], 
            )

            email.content_subtype = "html"
            email.send(fail_silently=False)

            return Response({'message': 'Report created successfully'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserReportGetView(APIView):
    def get(self , request):
            reports = Reports.objects.all()
            serializer = ReportsSerializer(reports, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
class UserReportGetObjectView(ListAPIView):
    serializer_class = ReportsSerializer
    def get_queryset(self):
        report_id= self.kwargs.get('id')
        return Reports.objects.filter(id= report_id)
    
class ClientReportGetObject(ListAPIView):
    serializer_class = ReportsSerializer
    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        return Reports.objects.filter(user_id=user_id)    


class ApprovedReportView(APIView):
    def put(self, request, id):
        report = get_object_or_404(Reports, id=id)
        serializer = ReportUpdateSerializer(data=request.data)
        if serializer.is_valid():
            report_action = serializer.validated_data.get('action')
            fullname = report.user.fullname
            useremail = report.user.email
            print(useremail)
            if report_action == 'Approved':
                report.report_action = 'Approved'
                report.save()


# Implementing Notification 
                try:
                    admin_user = Users.objects.get(is_superuser=True)
                except Users.DoesNotExist:
                    return HttpResponse({'error': 'Admin User Not Found'}, status=500)

                with transaction.atomic():
                    notification = Notification.objects.create(
                        from_user=admin_user,
                        to_user=report.user,
                        message=f"Report Approved: {report.title}",
                    )

                    email_data = {
                        "name": fullname,
                        "title": "Successful Review On Your Report",
                    }

                    email_body = render_to_string('adminreportemail.html', email_data)
                    email = EmailMessage(
                        'Report Approval Notification',
                        email_body,
                        settings.EMAIL_HOST_USER,
                        [useremail],
                    )

                    email.content_subtype = "html"
                    email.send(fail_silently=False)

                    return Response({'message': 'Report updated successfully'}, status=status.HTTP_200_OK)
            elif report_action == 'Denied':
                report.report_action = 'Denied'
                report.save()
# Implementing Notification 
                try:
                    admin_user = Users.objects.get(is_superuser=True)
                except Users.DoesNotExist:
                    return HttpResponse({'error': 'Admin User Not Found'}, status=500)

                with transaction.atomic():
                    notification = Notification.objects.create(
                        from_user=admin_user,
                        to_user=report.user,
                        message=f"Report Not Approved: {report.title}",
                    )
                return Response({'message': 'Report updated successfully'}, status=status.HTTP_200_OK)

        return Response({'message': 'error'}, status=status.HTTP_400_BAD_REQUEST)


