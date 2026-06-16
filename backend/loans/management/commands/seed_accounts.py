from django.core.management.base import BaseCommand
from loans.models import LoanAccount

class Command(BaseCommand):
    help = 'Seeds dummy account data for testing'

    def handle(self, *args, **kwargs):
        accounts = [
            {"full_name": "Amara Okafor", "ippis_number": "IPPIS001", "oracle_number": "ORC001", "loan_balance": 150000.00},
            {"full_name": "Chukwudi Eze", "ippis_number": "IPPIS002", "oracle_number": "ORC002", "loan_balance": 75000.00},
            {"full_name": "Fatima Bello", "ippis_number": "IPPIS003", "oracle_number": "ORC003", "loan_balance": 0.00},
            {"full_name": "Tunde Adeyemi", "ippis_number": "IPPIS004", "oracle_number": "ORC004", "loan_balance": 200000.00},
            {"full_name": "Ngozi Nwosu", "ippis_number": "IPPIS005", "oracle_number": "ORC005", "loan_balance": 50000.00},
        ]
        for a in accounts:
            obj, created = LoanAccount.objects.get_or_create(
                ippis_number=a['ippis_number'],
                defaults=a
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created: {obj.full_name}"))
            else:
                self.stdout.write(f"Already exists: {obj.full_name}")

        self.stdout.write(self.style.SUCCESS('✅ Dummy data seeded successfully!'))