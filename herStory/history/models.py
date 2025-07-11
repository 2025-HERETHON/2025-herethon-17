from django.db import models
from users.models import User

class HistoryCard(models.Model):
    name = models.CharField(max_length=50)               # 인물 이름
    era = models.CharField(max_length=100, default="20세기 초")               # 시대
    region = models.CharField(max_length=100, default="아시아")            # 지역
    image_url = models.URLField(null=True, blank=True)   # 이미지
    description = models.TextField(null=True, blank=True)  # 설명
    birth_date = models.DateField(null=True, blank=True)
    death_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name

    def lifespan(self):
        if self.birth_date and self.death_date:
            return f"({self.birth_date.strftime('%Y.%m.%d')} - {self.death_date.strftime('%Y.%m.%d')})"
        return ""
    
class UserSavedCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey(HistoryCard, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        unique_together = ('user', 'card')  # 중복 저장 방지

    def __str__(self):
        return f"{self.user.username} - {self.card.name}"