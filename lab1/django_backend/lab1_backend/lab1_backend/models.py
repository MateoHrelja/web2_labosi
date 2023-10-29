from django.db import models


class TournamentModel(models.Model):
    tournament_id = models.AutoField(primary_key=True)
    tournament_name = models.CharField(max_length=50)
    sport = models.CharField(max_length=30)
    schedule = models.CharField(max_length=100)

    class Meta:
        db_table = "tournaments"
        app_label = "lab1_backend"
