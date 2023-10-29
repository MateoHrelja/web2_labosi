import json

from django.http import HttpResponse
from django.views import View

from ..models import TournamentModel


class HomeView(View):
    def get(self, request):
        loaded_request = json.loads(request.body)
        check_if_query_is_ok = TournamentModel.objects.all()
        status_msg = "OK"
        try:
            t_model = TournamentModel.objects.get(id=loaded_request.get('id'))
        except:
            status_msg = "NOT OK"
        return HttpResponse(json.dumps(
            {
                'id': loaded_request['abc'],
                'data': loaded_request['def'],
                'status': status_msg
            }
        ))

    def post(self, request):
        loaded_request = json.loads(request.body)
        print(loaded_request)
        if len(TournamentModel.objects.all()) == 0:
            tournament_model = TournamentModel(
                tournament_name="Test 123",
                sport="Nogomet",
                schedule="TEst schedule 123"
            )
            tournament_model.save()
        return HttpResponse(json.dumps(
            {
                'status': 'Success!'
            }
        ))
