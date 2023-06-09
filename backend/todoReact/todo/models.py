from django.db import models
from django.utils import timezone
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
    
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user

	def create_superuser(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password)
		user.is_superuser = True
		user.save()
		return user

	def delete(self, using=None, keep_parents=False):
			# Perform any necessary cleanup or additional actions before deleting
			super().delete(using=using, keep_parents=keep_parents)


class AppUser(AbstractBaseUser, PermissionsMixin):
    
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
 
	# return both username and user id instead of only username
	def __str__(self):
		return self.username

# new model for storing the todo items 
# the items will be given to the backend in a list 
# and the backend will store them in the database accordingly

class TodoItem(models.Model):

	user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
	item = models.CharField(max_length=100)
	completed = models.BooleanField(default=False)
	important = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-created_at']

	def delete(self, using=None, keep_parents=False):
		# Perform any necessary cleanup or additional actions before deleting
		super().delete(using=using, keep_parents=keep_parents)

	def __str__(self):
		return self.item

	@classmethod
	def delete_all_items(cls):
			cls.objects.all().delete()