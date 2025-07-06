from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import School, Quiz, QuizSession,UserQuizResult, Ranking, Choice
from django.http import JsonResponse
from users.models import User
from collections import OrderedDict

def quiz_index(request):
    return render(request, 'quizzes/quiz_index.html')

@login_required
def school_selection(request):
    """학교 선택 페이지"""
    school_names = ['덕성여자대학교', '동덕여자대학교', '서울여자대학교', '성신여자대학교', '숙명여자대학교', '이화여자대학교']
    for name in school_names:
        School.objects.get_or_create(name=name)

    if request.method == 'POST':
        school_id = request.POST.get('school_id')
        if school_id:
            # 학교 - 퀴즈 시작 시 입력한 학교 정보로 처리
            request.session['selected_school_id'] = school_id  # 해당 사용자의 세션에 저장
            return redirect('quizzes:quiz_detail')  # 퀴즈 시작 뷰로 이동

        messages.error(request, '학교를 선택해주세요.')
        return redirect('quizzes:school_selection')

    schools = School.objects.all()
    return render(request, 'quizzes/school_selection.html', {'schools': schools})

# 퀴즈 시작
@login_required
def quiz_detail(request):
    # 이미 푼 퀴즈는 제외
    # ㄴ한 퀴즈들 id만 리스트로
    answered_quizzes = UserQuizResult.objects.filter(user=request.user).values_list('quiz_id', flat=True)
    # 안 푼 퀴즈들만 랜덤으로 - 첫 1개
    quiz = Quiz.objects.filter(is_active=True).exclude(id__in=answered_quizzes).order_by('?').first()

    # 그냥 모든 퀴즈 중에서 랜덤으로 - 첫 1개
    # quiz = Quiz.objects.filter(is_active=True).order_by('?').first()

    if not quiz:
        return redirect('quizzes:quiz_result')  # 모든 문제 다 풀면 결과 페이지로

    return render(request, 'quizzes/quiz_detail.html', {'quiz': quiz})

# 풀고 제출
@login_required
def submit_answer(request):
    if request.method == 'POST':
        quiz_id = request.POST.get('quiz_id')
        choice_id = request.POST.get('choice_id')
        quiz = get_object_or_404(Quiz, id=quiz_id)
        choice = get_object_or_404(Choice, id=choice_id)
        # 정오답 처리
        # choice_id를 통해 choice 객체를 가져온 뒤,
        # quiz.choices.all()의 리스트에서의 인덱스를 기준으로 정답 여부를 판단
        choices = list(quiz.choices.all())  # 순서는 Choice 모델의 order에 따라 정렬되어 있음
        try:
            selected_index = choices.index(choice)
            is_correct = (selected_index == quiz.answer_index)
        except ValueError:
            is_correct = False


        points = quiz.points if is_correct else 0 #틀리면 0점

        school_id = request.session.get('selected_school_id') # 학교 - 퀴즈 시작 시 입력한 학교 정보로 처리
        school = get_object_or_404(School, id=school_id)

        # 저장
        UserQuizResult.objects.create(
            user=request.user,
            school = school,
            quiz=quiz,
            selected_choice=choice,
            is_correct=is_correct,
            points_earned=points
        )

        # 퀴즈 끝날 때마ㄷ 세션 상황 업데이트
        session = QuizSession.objects.filter(user=request.user).last()

        if session is None: # 처음 푸는 거면 세션 생성
            school_id = request.session.get('selected_school_id')
            school = get_object_or_404(School, id=school_id)
            session = QuizSession.objects.create(
            user=request.user,
            school=school,
            )

        session.total_questions += 1
        if is_correct:
            session.correct_answers += 1
            session.total_score += points
        session.save()

        return redirect('quizzes:quiz_detail')  # 다음 문제로

@login_required
def quiz_result(request):
    session = QuizSession.objects.filter(user=request.user).last()
    if session:
        session.update_school_score()

    # 전체 응답 중에서 각 quiz.id 기준으로 중복 제거 (마지막 기록만)
    all_results = UserQuizResult.objects.filter(user=request.user).order_by('-id')
    unique_results = OrderedDict()

    for result in all_results:
        if result.quiz_id not in unique_results:
            unique_results[result.quiz_id] = result

    # 전체 응답 중에서 각 quiz.id 기준으로 중복 제거 (마지막 기록만)
    session.total_questions = len(unique_results)
    correct_count = sum(1 for result in unique_results.values() if result.is_correct)
    session.correct_answers = correct_count
    session.save()

    total_score = sum(result.quiz.points for result in unique_results.values() if result.is_correct)

    return render(request, 'quizzes/quiz_result.html', {
        'session': session,
        'user_results': unique_results.values(),
        'total_score': total_score
    })
