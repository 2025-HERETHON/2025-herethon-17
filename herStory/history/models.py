from django.db import models
from users.models import User

class HistoryContent(models.Model):
    title = models.CharField(max_length=280, null=True)
    period = models.CharField(max_length=165, null=True)
    type = models.CharField(max_length=10,
                            choices=[('인물', '인물'), ('퀴즈', '퀴즈')],
                            null=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class HistoryCard(models.Model):
    content = models.ForeignKey(HistoryContent, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=True)
    period = models.CharField(max_length=50, null=True)
    role = models.CharField(max_length=100, null=True)
    image_url = models.CharField(max_length=255, null=True)
    info = models.TextField(null=True)

    def __str__(self):
        return self.name or f'카드 {self.card_id}'


class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.ForeignKey(HistoryContent, on_delete=models.CASCADE)
    completion = models.BooleanField(null=True)
    quiz_score = models.FloatField(default=0.0)
    percentage = models.DecimalField(max_digits=5, decimal_places=1, null=True)

    def __str__(self):
        return f'{self.user.username} - {self.content.title}'

class SchoolScore(models.Model):
    school_name = models.CharField(max_length=100)
    total_score = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.school_name