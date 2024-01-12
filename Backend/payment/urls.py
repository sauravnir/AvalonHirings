from django.urls import path
from .views import ServicePaymentView , SubscriptionView , SubscriptionDetailsView , CashPaymentView , CombinedPaymentView , EmployeeSalaryView , CreateEmployeeSalaryView , ClientTransactionView , EmployeeDashboardSalaryView


urlpatterns = [
    path("servicetransaction/", ServicePaymentView.as_view(), name="ServicePayment"),
    path("subscriptionpayment/" , SubscriptionView.as_view(), name="Subscription Payment"),
    path("subscriptiondetails/<int:user_id>" , SubscriptionDetailsView.as_view(), name="Subscription Details"),
    path("cashpayment/" , CashPaymentView.as_view(), name="Cash Payment"),
    path("alltransactions/" , CombinedPaymentView.as_view(), name="Combined Payment"),
    path('salaryfield/' , EmployeeSalaryView.as_view() , name="Salary Field"),
    path('givesalary/', CreateEmployeeSalaryView.as_view() , name="Give Salary"),
    path('clienttransaction/<int:user_id>', ClientTransactionView.as_view() , name="Client Transaction"),
    path('employeesalary/<int:user_id>' , EmployeeDashboardSalaryView.as_view() , name="Employee Salary")
    # path('getclientrefund/', ClientRefundView.as_view() , name="Get Client Refund"),
]