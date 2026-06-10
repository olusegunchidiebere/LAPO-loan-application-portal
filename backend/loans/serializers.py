from rest_framework import serializers

class LoanBalanceSerializer(serializers.Serializer):
    """Validates the input from the user"""
    lookup_number = serializers.CharField(max_length=50)
    