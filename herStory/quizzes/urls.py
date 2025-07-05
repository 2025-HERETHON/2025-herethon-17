from django.urls import path
from .views import *

app_name = 'quizzes'

urlpatterns = [
    path('', quiz_index, name='quiz_index'),
    path('school_selection/', school_selection, name='school_selection'),
    path('start/', start_quiz, name='start_quiz'),
    # path('quiz/<int:session_id>/', quiz_page, name='quiz_page'),  # 다음에 구현
]