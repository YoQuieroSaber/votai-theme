from django.contrib import admin
from votai_theme.models import AnswerValue, ExtraInfoTopic
from elections.models import Topic
from elections.admin import TakenPositionInline, PositionInline
from elections.admin import Position, TopicModelForm
from django import forms
from django.utils.encoding import python_2_unicode_compatible
from candidator.models import TakenPosition
from django.db import models

    
class AnswerValueInline(admin.TabularInline):
    model = AnswerValue
    extra = 1
    max_num = 1


class YQSPositionAdmin(admin.ModelAdmin):
    inlines = [TakenPositionInline, AnswerValueInline, ]
    search_fields = ['label', 'topic__label', 'topic__category__name']

admin.site.unregister(Position)
admin.site.register(Position, YQSPositionAdmin) 

admin.site.unregister(Topic)
class YQSTopic(Topic):
    def save(self, *args, **kwargs):
        super(YQSTopic, self).save(*args, **kwargs)
        for candidate in self.election.candidates.all():
            Topic.objects.get_or_create(topic=self.topic, position=null, person=candidate)


    class Meta:
        proxy = True


class TopicExtraInfoInline(admin.TabularInline):
    model = ExtraInfoTopic
    extra = 1


class YQSTopicAdmin(admin.ModelAdmin):
    inlines = [TopicExtraInfoInline, PositionInline, ]
    form = TopicModelForm
    list_display = ('__str__', 'election')
    search_fields = ['label', 'category__name']

admin.site.register(Topic, YQSTopicAdmin)
