from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import School, Quiz, QuizSession
from django.http import JsonResponse

def quiz_index(request):
    return render(request, 'quizzes/quiz_index.html')

@login_required
def school_selection(request):
    """학교 선택 페이지"""
    schools = School.objects.all()
    
    # 기본 학교들 > 나중에 db에 따로 저장?
    school_names = ['덕성여자대학교', '동덕여자대학교', '서울여자대학교', '성신여자대학교', '숙명여자대학교', '이화여자대학교']
    for name in school_names:
        School.objects.get_or_create(name=name)
    
    schools = School.objects.all()
    
    context = {
        'schools': schools,
        'user': request.user,
    }
    return render(request, 'quizzes/school_selection.html', context)

@login_required
def start_quiz(request):
    """퀴즈 시작 - 학교 선택 후"""
    if request.method == 'POST':
        school_id = request.POST.get('school_id')
        
        if not school_id:
            messages.error(request, '학교를 선택해주세요.')
            return redirect('quizzes:school_selection')
        
        school = get_object_or_404(School, id=school_id)
        
        # 활성화된 퀴즈들 확인
        active_quizzes = Quiz.objects.filter(is_active=True)
        if not active_quizzes.exists():
            messages.error(request, '현재 이용 가능한 퀴즈가 없습니다.')
            return redirect('quizzes:school_selection')
        
        # 새로운 퀴즈 세션 생성
        quiz_session = QuizSession.objects.create(
            user=request.user,
            school=school,
            total_questions=active_quizzes.count()
        )
        
        messages.success(request, f'{school.name}을 선택했습니다. 퀴즈를 시작합니다!')
        return redirect('quizzes:quiz_page', session_id=quiz_session.id)
    
    return redirect('quizzes:school_selection')