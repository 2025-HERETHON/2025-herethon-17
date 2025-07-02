from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    # 작성자 (User 모델과 연결)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='posts'
    )

    # 제목
    title = models.CharField(max_length=100, null=True, blank=True)

    # 내용 - body>content로 수정
    content = models.TextField(null=True, blank=True)

    # 카테고리 ID (추후 Category 모델 만들면 ForeignKey로 교체 가능)
    #category_id = models.IntegerField()
    # 카테고리, 태그 다대다 참조
    category = models.ManyToManyField(to=Category, through="PostCategory", related_name="posts")
    tags = models.ManyToManyField(to=Tag, related_name="posts", blank=True)
    like = models.ManyToManyField(to=settings.AUTH_USER_MODEL, through="Like", related_name="like_posts")

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

class Like(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_likes")
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name="post_likes")

class Comment(models.Model):
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="comments")
    # auth_user_model 참조

    def __str__(self):
        return f'[{self.id}] {self.content}'

class PostCategory(models.Model):
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name="post_categories")
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE, related_name="post_categories")
    
