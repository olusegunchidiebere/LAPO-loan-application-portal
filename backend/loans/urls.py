from django.urls import path
from loans.views import LoanBalanceView

urlpatterns = [
    path('balance/', LoanBalanceView.as_view(), name='loan-balance'),
]