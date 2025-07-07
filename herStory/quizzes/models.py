from django.db import models
from users.models import User
from django.conf import settings

class School(models.Model):
    name = models.CharField(max_length=100, unique=True)

    total_score = models.IntegerField(default=0)
    participant_count = models.IntegerField(default=0)

    updated_at = models.DateTimeField(auto_now=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta: # views에서 로직으로 처리하는 대신 모델에 직접 정의
        ordering = ['-total_score', '-updated_at'] # 높은 점수 > 최근 참여 순 정렬

    def __str__(self):
        return self.name

    @property # 읽기 전용으로 함수를 변수처럼 호출
    def average_score(self):
        if self.participant_count > 0:
            return round(self.total_score / self.participant_count, 2) # 누적점수 ÷ 참여자 수로 평균
        return 0


class Quiz(models.Model):
    question = models.TextField()
    explanation = models.TextField(null=True, blank=True)
    answer_index = models.IntegerField(default=0)
    points = models.IntegerField(default=10) # 문제별 점수 다르게?
    is_active = models.BooleanField(default=True) # 퀴즈 수정 전 비활성화용

    def __str__(self):
        return f"{self.question[:10]}..."

    @property
    def correct_answer(self):
        choices = list(self.choices.order_by('order'))  # ← 추가!
        if 0 <= self.answer_index < len(choices):
            return choices[self.answer_index]
        return None


# 퀴즈의 선택지들
class Choice(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=255)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.text

    @property
    def is_correct(self): # 정답 여부
        return self.order == self.quiz.answer_index



# 퀴즈 하나에 응답한 기록
class UserQuizResult(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_quiz_result")
    school = models.ForeignKey(School, on_delete=models.SET_NULL, null=True, blank=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    selected_choice = models.ForeignKey(Choice, on_delete=models.CASCADE, null=True, blank=True)
    is_correct = models.BooleanField(default=False)
    points_earned = models.IntegerField(default=0)

    # class Meta:
    #    unique_together = ['user', 'quiz'] # 같은 퀴즈를 두 번 풀지 못하도록 제한

    def __str__(self): # 사용자가 맞췄는지 표시
        return f"{self.user.username}: {'정답' if self.is_correct else '오답'}"
        

# 퀴즈 전체 기준 응답한 기록
class QuizSession(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_session')
    school = models.ForeignKey(School, on_delete=models.SET_NULL, null=True, blank=True)
    total_questions = models.IntegerField(default=0) # 문제 수
    correct_answers = models.IntegerField(default=0) # 맞은 문제수
    total_score = models.IntegerField(default=0)

    @property # 정답률
    def accuracy_rate(self):
        if self.total_questions > 0:
            return round((self.correct_answers / self.total_questions) * 100, 2)
        return 0

    def update_school_score(self): # 사용자 학교의 점수와 참가자 수 업뎃
        if self.school:
            self.school.total_score += self.total_score
            self.school.participant_count += 1
            self.school.save()


class Ranking(models.Model):
    school = models.OneToOneField(School, on_delete=models.CASCADE) # 일대일
    rank = models.IntegerField()

    class Meta: # 순위 - 오름차순 정렬
        ordering = ['rank']

    def __str__(self):
        return f"{self.rank}위 - {self.school.name}"