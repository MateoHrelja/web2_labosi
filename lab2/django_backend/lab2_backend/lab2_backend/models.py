from django.db import models


class UserDataModel(models.Model):
    user_data_model_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    role = models.CharField(max_length=20)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    big_secret = models.CharField(max_length=100)
    user_id = models.IntegerField()

    class Meta:
        db_table = "user_data"
        app_label = "lab2_backend"
