from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import LoanAccount
from .serializers import LoanBalanceSerializer


class LoanBalanceView(APIView):
    def post(self, request):
        serializer = LoanBalanceSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        identifier = serializer.validated_data['lookup_number']

        try:
            account = LoanAccount.objects.get(
                Q(ippis_number__iexact=identifier) | Q(oracle_number__iexact=identifier)
            )
            return Response({
                "found": True,
                "full_name": account.full_name,
                "loan_balance": str(account.loan_balance),
                "identifier": identifier
            }, status=status.HTTP_200_OK)

        except LoanAccount.DoesNotExist:
            return Response({
                "found": False,
                "message": "No account found with that IPPIS or Oracle number. Please check and try again."
            }, status=status.HTTP_404_NOT_FOUND)