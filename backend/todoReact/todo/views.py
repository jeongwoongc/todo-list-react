from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status, viewsets
from .validations import custom_validation, validate_email, validate_password
from todo.serializers import TodoItemSerializer
from todo.models import TodoItem
from django.http import JsonResponse


UserModel = get_user_model()

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)

	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

	def delete(self, request, *args, **kwargs):
			return self.destroy(request, *args, **kwargs)

class TodoItemViewSet(viewsets.ModelViewSet):
	serializer_class = TodoItemSerializer
 
	def get_queryset(self):
		return TodoItem.objects.filter(user=self.request.user)

	def destroy(self, request, *args, **kwargs):
			instance = self.get_object()
			self.perform_destroy(instance)
			return Response(status=status.HTTP_204_NO_CONTENT)
 
def delete_all_items(request):
	if request.method == 'POST':
			TodoItem.delete_all_items()
			return JsonResponse({'message': 'All items deleted successfully.'})
	else:
			return JsonResponse({'message': 'Invalid request method.'}, status=400)