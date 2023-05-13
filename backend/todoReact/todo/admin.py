from django.contrib import admin
from .models import Todo, User

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'completed')

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')
    

# Register your models here.

admin.site.register(Todo, TodoAdmin)
admin.site.register(User, UserAdmin)
