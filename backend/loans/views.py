from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import LoanAccount,StaffMember
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
        

class AdminLoginView(APIView):
    def post(self, request):
        staff_id = request.data.get("staff_id", "").strip()
        role = request.data.get("role", "").strip()

        if not staff_id or not role:
            return Response(
                {"error": "staff_id and role are both required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            staff = StaffMember.objects.get(staff_id__iexact=staff_id, role=role)
        except StaffMember.DoesNotExist:
            return Response(
                {"error": "Invalid Staff ID or role does not match our records."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not staff.is_active:
            return Response(
                {"error": "This staff account has been deactivated."},
                status=status.HTTP_403_FORBIDDEN,
            )

        return Response({
            "staff_id": staff.staff_id,
            "full_name": staff.full_name,
            "role": staff.role,
            "role_display": staff.get_role_display(),
        }, status=status.HTTP_200_OK)