# herStory/views.py
from django.shortcuts import render

# 외부 templates 폴더 내에 있는 home 화면으로 리다이렉트
def home(request):
    return render(request, 'home.html')