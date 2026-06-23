from django.core.management.base import BaseCommand
from loans.models import StaffMember


class Command(BaseCommand):
    help = "Seeds the database with one staff account per role."

    def handle(self, *args, **options):
        staff_data = [
            {"staff_id": "VER001", "full_name": "Verification Officer", "role": "verification"},
            {"staff_id": "APP001", "full_name": "Approval Officer", "role": "approval"},
            {"staff_id": "DIS001", "full_name": "Disbursement Officer", "role": "disbursement"},
        ]

        for data in staff_data:
            staff, created = StaffMember.objects.update_or_create(
                staff_id=data["staff_id"],
                defaults={
                    "full_name": data["full_name"],
                    "role": data["role"],
                    "is_active": True,
                },
            )
            status = "Created" if created else "Updated"
            self.stdout.write(self.style.SUCCESS(f"{status}: {staff.staff_id} ({staff.role})"))