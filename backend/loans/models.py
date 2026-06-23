from django.db import models

class LoanAccount(models.Model):
    full_name = models.CharField(max_length=200)
    ippis_number = models.CharField(max_length=50, unique=True, blank=True, null=True)
    oracle_number = models.CharField(max_length=50, unique=True, blank=True, null=True)
    loan_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    def __str__(self):
        if self.ippis_number:
            return f"{self.full_name} | IPPIS: {self.ippis_number}"
        return f"{self.full_name} | ORACLE: {self.oracle_number}"
    

class StaffMember(models.Model):
    ROLE_CHOICES = [
        ("verification", "Verification Officer"),
        ("approval", "Approval Officer"),
        ("disbursement", "Disbursement Officer"),
    ]

    staff_id = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.staff_id} - {self.get_role_display()}"