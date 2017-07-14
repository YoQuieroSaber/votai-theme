# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('votai_theme', '0002_topic'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExtraInfoTopic',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('is_hidden', models.BooleanField(default=False)),
                ('topic', models.OneToOneField(related_name='extra_info', to='elections.Topic')),
            ],
        ),
    ]
