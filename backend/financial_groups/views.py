from rest_framework import viewsets, permissions, status, decorators
from .models import FinancialGroups, Income, Expense
from django.db.models import Sum
from .serializers import FinancialGroupSerializer
from rest_framework.response import Response


# Create your views here.


class FinancialGroupsVS(viewsets.ModelViewSet):
    queryset = FinancialGroups.objects.all()
    serializer_class = FinancialGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
        
    
    
    # @decorators.action(methods=['get'], detail=True, url_path='total_amount')
    # def total_amount(self, request, pk):
    #     group = self.get_object()
    #     total_incomes = Income.objects.filter(group=group).aggregate(Sum('amount'))['amount__sum']
    #     total_expenses = Expense.objects.filter(group=group).aggregate(Sum('amount'))['amount__sum']
    #     return Response({'total_amount': FinancialGroups.get_total_income()}, status=status.HTTP_200_OK)