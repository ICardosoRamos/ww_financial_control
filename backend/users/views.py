
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import HTTP_200_OK
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth import logout, login, authenticate, get_user_model

from .serializers import UserSerializer, UserLoginAndLogoutSerializer


class UserVS(ModelViewSet):
	queryset = get_user_model().objects.all()
	serializer_class = UserSerializer
	permission_classes = [IsAuthenticated]
	authentication_classes = [TokenAuthentication]


class UserLoginAndLogout(GenericViewSet):
	permission_classes = [AllowAny]
	serializer_class = UserLoginAndLogoutSerializer

	@action(methods=['post'], detail=False, url_path='login')
	def login(self, request):
		email = request.data.get('email')
		password = request.data.get('password')
		user_instance = get_user_model().objects.get(email=email)
		user = authenticate(username=user_instance.username, password=password)
		
		if user is not None:
			login(request, user)
			token, _ = Token.objects.get_or_create(user=user)
			
			return Response({'token': token.key})
		else:
			return Response({'error': 'Invalid credentials'}, status=401)

	@action(methods=['post'], detail=False, url_path='logout')
	def logout(self, request):
		logout(request)
		return Response(
			{'success': 'Logged out successfully'}, status=HTTP_200_OK
		)
	
	@action(methods=['get'], detail=False, url_path='teste')
	def teste(self, request):
		print(5)
		return Response(
			{'success': 'Logged out successfully'}, status=HTTP_200_OK
		)