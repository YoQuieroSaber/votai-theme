# coding=utf-8
from django.db import models
from candidator.models import Position
from elections.models import Topic


class AnswerValue(models.Model):
	position = models.OneToOneField(Position)
	value = models.IntegerField(default=0)


class ExtraInfoTopic(models.Model):
	topic = models.OneToOneField(Topic, related_name='extra_info')
	is_hidden = models.BooleanField(default=False)
