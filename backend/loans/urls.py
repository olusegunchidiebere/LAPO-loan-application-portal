from django.urls import path
from loans.views import LoanBalanceView, AdminLoginView

urlpatterns = [
    path('balance/', LoanBalanceView.as_view(), name='loan-balance'),
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
]