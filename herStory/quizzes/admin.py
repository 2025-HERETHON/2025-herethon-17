from django.contrib import admin
from .models import *

admin.site.register(School)
admin.site.register(Quiz)
admin.site.register(Choice)
admin.site.register(UserQuizResult)
admin.site.register(QuizSession)
admin.site.register(Ranking)