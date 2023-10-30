import json

from django.http import HttpResponse
from django.views import View
from itertools import combinations
from ..models import TournamentModel


def return_schedule(competitors):
    if len(competitors) not in [4, 6, 8]:
        return "INVALID"

    pairings = list(combinations(competitors, 2))
    schedule = "|".join([";".join(pair) for pair in pairings])

    return schedule


class TournamentView(View):
    def get(self, request, id):
        if id is not None:
            try:
                tournament = TournamentModel.objects.get(tournament_id=id)
                data = {
                    'id': tournament.tournament_id,
                    'name': tournament.tournament_name,
                    'competitors': tournament.competitors.split(';'),
                    'schedule': return_schedule(tournament.competitors.split(';')),
                    'sport': tournament.sport,
                    'results': tournament.results,
                    'is_editable': tournament.user == request.user,
                }
            except TournamentModel.DoesNotExist:
                return HttpResponse("Tournament not found", status=404)
        else:
            tournaments = TournamentModel.objects.filter(user=request.user)
            data = [{
                'id': tournament.tournament_id,
                'name': tournament.tournament_name
            } for tournament in tournaments]
        return HttpResponse(json.dumps(data))

    def post(self, request):
        loaded_request = json.loads(request.body)
        try:
            new_tournament = TournamentModel(
                tournament_name=loaded_request['name'],
                competitors=loaded_request['competitors'],
                sport=loaded_request['sport'],
                user=request.user,
                results=''
            )
            if len(new_tournament.competitors.split(';')) not in [4, 6, 8]:
                return HttpResponse("Invalid number of competitors, it has to be 4, 6 or 8.", status=400)
            new_tournament.save()
        except:
            return HttpResponse("Invalid request.", status=400)
        return HttpResponse("Success! Tournament created.", status=200)

    def put(self, request, id):
        loaded_request = json.loads(request.body)
        results = loaded_request.get('results', None)
        if results is None:
            return HttpResponse("Invalid request.", status=400)
        try:
            tournament = TournamentModel.objects.get(id=id)
            if tournament.user != request.user:
                return "Invalid request"
            tournament.results = results
            tournament.save()
        except:
            return HttpResponse("Invalid request.", status=400)
