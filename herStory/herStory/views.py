# herStory/views.py
from django.http import HttpResponse

def home(request):
    return HttpResponse("홈 화면입니다. 로그인 후 환영합니다!")