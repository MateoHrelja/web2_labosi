import json

from django.http import HttpResponse
from django.views import View


class HomeView(View):
    def get(self, request):
        loaded_request = json.loads(request.body)
        return HttpResponse(json.dumps(
            {
                'id': loaded_request['abc'],
                'data': loaded_request['def']
            }
        ))

    def post(self, request):
        loaded_request = json.loads(request.body)
        print(loaded_request)
        return HttpResponse(json.dumps(
            {
                'status': 'Success!'
            }
        ))
