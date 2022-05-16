from django.db import models
from django.db import models
from django.contrib.auth.models import User


class Doctor(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    Doctor = models.CharField(max_length=50, null=True)
    Patient = models.CharField(max_length=50)
    case = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=10)
    date= models.DateField()
    description = models.TextField()


class Reset(models.Model):
    email = models.CharField(max_length=255)
    token = models.CharField(max_length=255, unique=True)
