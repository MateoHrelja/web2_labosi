import json

from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import UserDataModel


def serialize_user_data(user_data):
    return {
        'first_name': user_data.first_name,
        'last_name': user_data.last_name,
        'role': user_data.role,
        'age': user_data.age,
        'gender': user_data.gender,
        'big_secret': user_data.big_secret
    }


class UserView(APIView):
    def get(self, request, id):
        protection_enabled = True if request.GET.get('protection_enabled', None) == '1' else False
        request_user_id = request.user.id
        if protection_enabled:
            if request_user_id != id:
                return Response("You do not have permission to view this page", status=status.HTTP_401_UNAUTHORIZED)
        try:
            user_data = UserDataModel.objects.get(user_id=id)
        except:
            return Response("How did we get here?", status=status.HTTP_404_NOT_FOUND)

        return Response(data=serialize_user_data(user_data), status=status.HTTP_200_OK)

    def post(self, request):
        pass

    def put(self, request):
        pass

    def delete(self, request):
        pass
