from django.urls import path
from .views import *

app_name = 'quizzes'

urlpatterns = [
    path('', quiz_index, name='quiz_index'),
    path('school_selection/', school_selection, name='school_selection'),
    #path('start_quiz/', start_quiz, name='start_quiz'),
    path('quiz_detail/', quiz_detail, name='quiz_detail'),
    path('submit_answer/', submit_answer, name='submit_answer'),
    path('quiz_result/', quiz_result, name='quiz_result'),
    # path('quiz/<int:session_id>/', quiz_page, name='quiz_page'),  # 다음에 구현
]