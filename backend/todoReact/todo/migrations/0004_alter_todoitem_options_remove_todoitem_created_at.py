# Generated by Django 4.2.2 on 2023-07-01 03:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_alter_todoitem_options_todoitem_created_at'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='todoitem',
            options={},
        ),
        migrations.RemoveField(
            model_name='todoitem',
            name='created_at',
        ),
    ]
