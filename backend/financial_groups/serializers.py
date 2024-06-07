
from rest_framework.serializers import ModelSerializer

from .models import FinancialGroups


class FinancialGroupSerializer(ModelSerializer):


    class Meta:
        model = FinancialGroups
        fields = '__all__'


    def to_representation(self, instance: FinancialGroups):
        representation = super().to_representation(instance)
        representation['total_amount'] = instance.get_cumulative_net_balance()

        return representation