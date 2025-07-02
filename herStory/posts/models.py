from django.db import models
from django.conf import settings

class Post(models.Model):
    # 작성자 (User 모델과 연결)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='posts'
    )

    # 제목
    title = models.CharField(max_length=100, null=True, blank=True)

    # 내용
    body = models.TextField(null=True, blank=True)

    # 카테고리 ID (추후 Category 모델 만들면 ForeignKey로 교체 가능)
    category_id = models.IntegerField()

    # 작성자 타입 (현직자, 취준생)
    TYPE_CHOICES = [
        ('현직자', '현직자'),
        ('취준생', '취준생'),
    ]
    type = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES,
        null=True,
        blank=True
    )

    # 좋아요 수
    like_count = models.IntegerField(default=0)

    # 작성 시간
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title