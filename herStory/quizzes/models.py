from django.db import models
from users.models import User

class School(models.Model):
    name = models.CharField(max_length=100, unique=True)
    total_score = models.IntegerField(default=0)  # 누적 점수
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name


class Quiz(models.Model):
    question = models.TextField()
    explanation = models.TextField(null=True, blank=True)
    correct_answer_index = models.IntegerField(null=True)  # 0~3 중 정답 위치
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.question


class Choice(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.quiz.id} - {self.text}"


class UserQuizResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.SET_NULL, null=True)
    score = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.score}점"
