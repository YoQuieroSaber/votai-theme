# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('elections', '0009_topic'),
        ('votai_theme', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Topic',
            fields=[
            ],
            options={
                'proxy': True,
            },
            bases=('elections.topic',),
        ),
    ]
