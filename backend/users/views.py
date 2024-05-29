from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout, login, authenticate, get_user_model
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserLoginAndLogout(viewsets.GenericViewSet):
    permission_classes = [permissions.AllowAny]

    @action(methods=["post"], detail=False, url_path="login")
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

    @action(methods=["post"], detail=False, url_path="logout")
    def logout(self, request):
        logout(request)
        return Response(
            {"success": "Logged out successfully"}, status=status.HTTP_200_OK
        )
