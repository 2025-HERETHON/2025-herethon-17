from django.contrib import admin
from .models import HistoryCard, UserSavedCard

admin.site.register(HistoryCard)
admin.site.register(UserSavedCard)