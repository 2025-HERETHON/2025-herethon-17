from django.db import models
from users.models import User
from history.models import HistoryContent

class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    content = models.ForeignKey(HistoryContent, on_delete=models.CASCADE)
    question = models.TextField(null=True)

    def __str__(self):
        return f"[{self.content.title}] {self.question[:30]}"


class QuizOption(models.Model):
    quiz_option_id = models.AutoField(primary_key=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    option = models.TextField(null=True)
    is_correct = models.BooleanField(null=True)
    option_order = models.CharField(
        max_length=1,
        choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D')],
        null=True
        )

    def __str__(self):
        return f'Q{self.quiz.quiz_id} - {self.option_order}'


class CopyOfQuizOption(models.Model):
    quiz_result_id = models.AutoField(primary_key=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz_option = models.ForeignKey(QuizOption, on_delete=models.CASCADE)
    is_correct = models.BooleanField(null=True)
    option_order = models.CharField(
        max_length=1,
        choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D')],
        null=True
        )
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - Q{self.quiz.quiz_id} 답안'
