# Generated by Django 4.2.23 on 2025-07-07 11:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('quizzes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userquizresult',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_quiz_result', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='ranking',
            name='school',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='quizzes.school'),
        ),
        migrations.AddField(
            model_name='quizsession',
            name='school',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='quizzes.school'),
        ),
        migrations.AddField(
            model_name='quizsession',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_session', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='choice',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='quizzes.quiz'),
        ),
    ]
