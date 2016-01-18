from elections.views import SoulMateDetailView
from votai_theme.calculator import YQSCalculator
from django.http import JsonResponse
from candidator.models import TakenPosition
from votai_theme.models import AnswerValue, ExtraInfoTopic
from sorl.thumbnail import get_thumbnail
from django.views.decorators.clickjacking import xframe_options_exempt

class juegoView(SoulMateDetailView):
    @xframe_options_exempt
    def dispatch(self, *args, **kwargs):
        return super(juegoView, self).dispatch(*args, **kwargs)


class MediaNaranjaView(SoulMateDetailView):
    calculator_class = YQSCalculator

    @xframe_options_exempt
    def dispatch(self, *args, **kwargs):
        return super(MediaNaranjaView, self).dispatch(*args, **kwargs)


class MedianaranjaJsonView(MediaNaranjaView):
    @xframe_options_exempt
    def dispatch(self, *args, **kwargs):
        super(MedianaranjaJsonView, self).dispatch(*args, **kwargs)
        election = self.object
        response = {
            'election_id': election.id,
            "election_name": election.name,
            "district": election.area.name,
            # "level": election.extra_info['nivel'],
            # "post": election.extra_info['cargo'],
            "categories": [],
            "candidates": []

        }
        for category in election.categories.all():
            category_dict = {'category_id': category.id,
                             'name': category.name,
                             'questions': []
                             }
            extra_infos = [e.topic.id for e in ExtraInfoTopic.objects.filter(is_hidden=True, topic__category=category)]
            for topic in category.topics.exclude(id__in=extra_infos):
                question_dict = {"question_id": topic.id,
                                 "question_text": topic.label,
                                 "answers": []
                                 }
                for position in topic.positions.all():
                    position_dict = {"answer_id": position.id,
                                     "answer_text": position.label
                                     }
                    try:
                        position_dict['answer_value'] = position.answervalue.value
                    except AnswerValue.DoesNotExist, e:
                        position_dict['answer_value'] = 0
                    question_dict['answers'].append(position_dict)
                category_dict['questions'].append(question_dict)
            response['categories'].append(category_dict)


        candidates = election.candidates.all();

        show_all_candidates = self.request.GET.get('show_all_candidates', "False")

        if show_all_candidates == "False":
          candidates = candidates.exclude(did_not_pass_primaries=True)

        for candidate in candidates:

            imurl = candidate.extra_info['portrait_photo']
            try:
                im = get_thumbnail(candidate.image, '100x100', format='PNG', crop='50% 0%', quality=99)
                if im is not None:
                    imurl = im.url

            except e:
                pass

            candidate_dict = {'candidate_id': candidate.id,
                              'candidate_name': candidate.name,
                              'candidate_pic': imurl,
                              'did_not_pass_primaries': candidate.did_not_pass_primaries,
			      'candidate_bio': candidate.biography,
                              'positions': []
                              }
            for key in candidate.extra_info.keys():
                candidate_dict['candidate_' + key] = candidate.extra_info[key]

            taken_positions = TakenPosition.objects.filter(position__topic__category__in=election.categories.all(), person=candidate)
            for taken_position in taken_positions:
                taken_position_dict = {'question_id': taken_position.topic.id,
                                       'answer_id': taken_position.position.id,
                                       'answer_text': taken_position.description
                                       }
                candidate_dict['positions'].append(taken_position_dict)
            response['candidates'].append(candidate_dict)
        return JsonResponse(response)
