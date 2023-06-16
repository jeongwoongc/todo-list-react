from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=250)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class User(models.Model):
    username = models.CharField(max_length=120)
    email = models.CharField(max_length=120)
    password = models.CharField(max_length=120)

    def __str__(self):
        return self.username