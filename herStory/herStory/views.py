from django.http import HttpResponse

def home(request):
    return HttpResponse("홈 화면입니다.")