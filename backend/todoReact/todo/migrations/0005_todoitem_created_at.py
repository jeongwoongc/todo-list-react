# Generated by Django 4.2.2 on 2023-07-01 03:38

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0004_alter_todoitem_options_remove_todoitem_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='todoitem',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
    ]