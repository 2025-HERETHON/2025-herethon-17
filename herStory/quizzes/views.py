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
    # 선택지 픽스x 임시 데이터
    school_names = ['덕성여자대학교', '동덕여자대학교', '서울여자대학교', '성신여자대학교', '숙명여자대학교', '이화여자대학교', '기타']
    for name in school_names: # 있으면 가져오고 없으면 생성 - fixture로 저장하면 삭제
        School.objects.get_or_create(name=name)

    if request.method == 'POST':
        school_id = request.POST.get('school_id')
        if school_id:
            # 학교 - 퀴즈 시작 시 입력한 학교 정보로 처리
            request.session['selected_school_id'] = school_id  # 해당 사용자의 세션에 저장
            return redirect('quizzes:quiz_detail')  # 퀴즈 시작 뷰로 이동

        messages.error(request, '학교를 선택해주세요.')
        return redirect('quizzes:school_selection')

    schools = School.objects.all() # 첫 접속 시 모든 학교 보여줌
    return render(request, 'quizzes/school_selection.html', {'schools': schools})

# 퀴즈 시작
@login_required
def quiz_detail(request):
    # 이미 푼 퀴즈는 제외
    # ㄴ한 퀴즈들 id만 리스트로
    # answered_quizzes = [result.quiz.id for result in UserQuizResult.objects.filter(user=request.user)]
    answered_quizzes = UserQuizResult.objects.filter(user=request.user).values_list('quiz_id', flat=True)
    # 안 푼 퀴즈들만 랜덤으로 - 첫 1개
    quiz = Quiz.objects.filter(is_active=True).exclude(id__in=answered_quizzes).order_by('?').first()

    # 그냥 모든 퀴즈 중에서 랜덤으로 - 첫 1개
    # quiz = Quiz.objects.filter(is_active=True).order_by('?').first()

    if not quiz:
        return redirect('quizzes:quiz_result')  # 모든 문제 다 풀면 결과 페이지로

    return render(request, 'quizzes/quiz_detail.html', {'quiz': quiz}) # 문제들 남았으면 다시 랜덤 돌림

# 풀고 제출
@login_required
def submit_answer(request):
    if request.method == 'POST':
        quiz_id = request.POST.get('quiz_id')
        quiz = get_object_or_404(Quiz, id=quiz_id)
        choice_id = request.POST.get('choice_id')
        choice = get_object_or_404(Choice, id=choice_id)
        # 정오답 처리
        # 전체 선택지
        choices = list(quiz.choices.all())
        try:
            selected_index = choices.index(choice) # 객체들 중 선택한 choice_id
            is_correct = (selected_index == quiz.answer_index)
        except ValueError:
            is_correct = False


        points = quiz.points if is_correct else 0 #틀리면 0점

        school_id = request.session.get('selected_school_id') # 학교 - 세션에 저장된 학교 정보로 처리
        school = get_object_or_404(School, id=school_id)

        UserQuizResult.objects.create(
            user=request.user,
            school = school,
            quiz=quiz,
            selected_choice=choice,
            is_correct=is_correct,
            points_earned=points
        )

        # 퀴즈 끝날 때마ㄷ 세션 상황 업데이트
        # 원래 있던 세션
        session = QuizSession.objects.filter(user=request.user).last()
        if session is None: # 처음 푸는 거면 세션 생성
            school_id = request.session.get('selected_school_id')
            school = get_object_or_404(School, id=school_id)
            # session = QuizSession.objects.get_or_create( # 여러 번 접근불가능
            #     user=request.user,
            #     school=school
            # )
            session = QuizSession.objects.create(
                user=request.user,
                school=school,
            )

        session.total_answers += 1
        if is_correct: # 정답이면
            session.correct_answers += 1
            session.total_score += points
        session.save()

        return redirect('quizzes:quiz_detail')  # 다음 문제로

@login_required
def quiz_result(request): 
    # 마지막 제출만 반영 - 주의
    session = QuizSession.objects.filter(user=request.user).last()

    # 전체 응답 중에서 각 quiz.id 기준으로 중복 제거 (마지막 기록만)
    all_results = UserQuizResult.objects.filter(user=request.user).order_by('-id') # 모든 퀴즈응답 최신순으로
    latest_results = OrderedDict() # quiz_id 기준 최신순으로 - 서비스 확대 시 ORM 쿼리로
    for result in all_results:
        if result.quiz_id not in latest_results: # 처음이면 (result.quiz_id가 딕셔너리에 아직 없다면)
            latest_results[result.quiz_id] = result

    # 전체 응답 중에서 각 quiz.id 기준으로 중복 제거 (마지막 기록만)
    correct_count = sum(1 for result in latest_results.values() if result.is_correct)
    total_score = sum(result.quiz.points for result in latest_results.values() if result.is_correct)

    # 세션 값 갱신
    if session:
        session.total_answers = len(latest_results)
        session.correct_answers = correct_count
        session.total_score = total_score
        session.save()
        
    return render(request, 'quizzes/quiz_result.html', {
        'session': session,
        'user_results': latest_results.values(),
        'total_score': total_score
    })

@login_required
def explanation(request, quiz_id):
    quiz = get_object_or_404(Quiz, id=quiz_id)
    choices = list(quiz.choices.all())
    try:
        correct_choice = choices[quiz.answer_index] # 정답
    except IndexError:
        correct_choice = None

    return render(request, 'quizzes/explanation.html', {
        'quiz': quiz,
        'choices': choices,
        'correct_choice': correct_choice,
    })

def ranking(request):
    schools = list(School.objects.all())
    # total_score 기준으로 정렬
    schools.sort(key=lambda s: s.total_score, reverse=True)
    return render(request, 'quizzes/ranking.html', {'schools': schools})
