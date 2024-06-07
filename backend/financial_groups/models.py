from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

# Create your models here.


class FinancialGroups(models.Model):
	name = models.CharField(max_length=30)
	creation_date = models.DateField(auto_now_add=True)
	group_owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='owned_groups')
	participants = models.ManyToManyField(get_user_model(), related_name='financial_groups', blank=True)

	
	def get_total_income(self, year, month):
		return self.incomes.filter(date__year=year, date__month=month).aggregate(total=models.Sum('amount'))['total'] or 0

	def get_total_expenses(self, year, month):
		return self.expenses.filter(date__year=year, date__month=month).aggregate(total=models.Sum('amount'))['total'] or 0

	def get_net_balance(self, year, month):
		total_income = self.get_total_income(year, month)
		total_expenses = self.get_total_expenses(year, month)
		return total_income - total_expenses

	def get_cumulative_net_balance(self):
		# Calculate cumulative balance up to the given day

		year = timezone.now().year
		month = timezone.now().month
		day = timezone.now().day

		cumulative_income = self.incomes.filter(date__lte=timezone.datetime(year, month, day)).aggregate(total=models.Sum('amount'))['total'] or 0
		cumulative_expenses = self.expenses.filter(date__lte=timezone.datetime(year, month, day)).aggregate(total=models.Sum('amount'))['total'] or 0
		# print(cumulative_income, 'teste')
		# print(cumulative_expenses, 'teste')
		return cumulative_income - cumulative_expenses

	class Meta:
		db_table = 'financial_groups'
		verbose_name_plural = ('Financial Groups')



class Expense(models.Model):
	group = models.ForeignKey(FinancialGroups, on_delete=models.CASCADE, related_name='expenses')
	amount = models.DecimalField(max_digits=10, decimal_places=2)
	date = models.DateField(auto_now_add=True)
	

	class Meta:
		db_table = 'expenses'
		verbose_name_plural = ('Expenses')
		

class Income(models.Model):
	group = models.ForeignKey(FinancialGroups, on_delete=models.CASCADE, related_name='incomes')
	amount = models.DecimalField(max_digits=10, decimal_places=2)
	date = models.DateField(auto_now_add=True)
	

	class Meta:
		db_table = 'income'
		verbose_name_plural = ('Income')


# class MonthlySummary(models.Model):
# 	group = models.OneToOneField(Group, on_delete=models.CASCADE, related_name='monthly_summary')
# 	total_income = models.DecimalField(max_digits=10, decimal_places=2)
# 	total_expenses = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
# 	final_value = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
# 	month = models.DateField()

# 	def save(self, *args, **kwargs):
# 		self.total_expenses = sum(expense.amount for expense in self.group.expenses.all())
# 		self.total_income = sum(income.amount for income in self.group.incomes.all())
# 		self.final_value = self.total_income - self.total_expenses
# 		super().save(*args, **kwargs)
	

# 	class Meta:
# 		db_table = 'montly_summary'
# 		verbose_name_plural = ('Montly Summary')
