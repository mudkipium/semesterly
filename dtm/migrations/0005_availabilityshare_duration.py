# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2017-03-09 18:17
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dtm', '0004_auto_20170223_1502'),
    ]

    operations = [
        migrations.AddField(
            model_name='availabilityshare',
            name='duration',
            field=models.DurationField(default=datetime.timedelta(0, 1800), null=True),
        ),
    ]
