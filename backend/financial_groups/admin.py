from django.contrib import admin
from .models import FinancialGroups, Income, Expense

# Register your models here.

admin.site.register(FinancialGroups)
admin.site.register(Income)
admin.site.register(Expense)
# admin.site.register(MonthlySummary)
