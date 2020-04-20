from django.db import models

# Create your models here.

class Books(models.Model):
    title = models.CharField(max_length = 30)
    description = models.CharField(max_length = 30)
    author = models.ForeignKey('Author', on_delete=models.CASCADE)

class Author(models.Model):
    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length = 30)
    email = models.EmailField(max_length = 30)
