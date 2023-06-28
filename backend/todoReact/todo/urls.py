from django.urls import include, path
from . import views

urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
	path('todo', views.TodoItemViewSet.as_view({'get': 'list', 'post': 'create'}), name='todo'),
]