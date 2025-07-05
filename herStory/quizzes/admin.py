from django.contrib import admin
from .models import School, Quiz, UserQuizResult

admin.site.register(School)
admin.site.register(Quiz)
admin.site.register(UserQuizResult)