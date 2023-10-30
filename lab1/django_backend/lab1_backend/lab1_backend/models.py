from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    user_id = models.CharField(max_length=255, unique=True, null=True, blank=True)


class TournamentModel(models.Model):
    tournament_id = models.AutoField(primary_key=True)
    tournament_name = models.CharField(max_length=50)
    competitors = models.CharField(max_length=200, blank=True, null=True)
    sport = models.CharField(max_length=30)
    results = models.CharField(max_length=200, blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    class Meta:
        db_table = "tournaments"
        app_label = "lab1_backend"
