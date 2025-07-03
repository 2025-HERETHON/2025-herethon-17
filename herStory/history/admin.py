from django.contrib import admin

# 컨텐츠 DB 개발 중 직접 관리하기 위해서 추가했습니다!
from .models import HistoryContent, UserProgress

admin.site.register(HistoryContent)
admin.site.register(UserProgress)