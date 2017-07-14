from django import template

register = template.Library()

from django.utils.safestring import mark_safe
from elections.models import Election, Candidate
import json
from django.core.urlresolvers import reverse


@register.simple_tag
def elections_json():
    expected_elections = []
    for election in Election.objects.filter(searchable=True, uses_soul_mate=True):
        tags = []
        for tag in election.tags.all():
            tags.append(tag.name)

        election_dict = {
            'name': election.name,
            'slug': election.slug,
            'detaillink': election.get_absolute_url(),
            'medianaranja_link': reverse('soul_mate_detail_view_json', kwargs={'slug': election.slug}),
            'tags': tags
        }
        expected_elections.append(election_dict)
    return mark_safe(json.dumps(expected_elections))


@register.simple_tag
def candidate_extra_info(candidate, extra_info):
    candidate = Candidate.objects.get(id=candidate.id)
    return candidate.extra_info.get(extra_info, None)
