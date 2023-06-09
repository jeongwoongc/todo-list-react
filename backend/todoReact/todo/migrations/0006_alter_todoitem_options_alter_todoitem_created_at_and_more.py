# Generated by Django 4.2.2 on 2023-07-01 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0005_todoitem_created_at'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='todoitem',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterField(
            model_name='todoitem',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='todoitem',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
