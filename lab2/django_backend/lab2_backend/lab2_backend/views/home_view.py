import json

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.html import escape


class HomeView(APIView):
    def get(self, request):
        return Response(data={'aaa': 'bbb'}, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        protection_enabled = True if request.GET.get('xssProtection', None) == '1' else False
        title = data['title']
        content = data['content']
        if protection_enabled:
            title = escape(title)
            content = escape(content)

        if title == '' or content == '':
            return Response("", status=status.HTTP_400_BAD_REQUEST)

        response_data = {
            'title': title,
            'content': content
        }

        return Response(data=response_data, status=status.HTTP_200_OK)
