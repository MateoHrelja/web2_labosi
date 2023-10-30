from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    user_id = models.CharField(max_length=255, unique=True, null=True, blank=True)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_users',
        related_query_name='custom_user'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_users_permissions',
        related_query_name='custom_user_permission'
    )


class TournamentModel(models.Model):
    tournament_id = models.AutoField(primary_key=True)
    tournament_name = models.CharField(max_length=50)
    competitors = models.CharField(max_length=200, blank=True, null=True)
    sport = models.CharField(max_length=30)
    results = models.CharField(max_length=200, blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = "tournaments"
        app_label = "lab1_backend"
