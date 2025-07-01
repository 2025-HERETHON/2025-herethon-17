from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# 장고에서 사용자를 생성/관리하는 커스텀 매니저 클래스
class UserManager(BaseUserManager):
    ## 일반 사용자 생성
    def create_user(self, email, username=None):
        # 이메일 필수 입력으로 설정
        if not email:
            raise ValueError('이메일은 필수입니다.')
        email = self.normalize_email(email)
        # 이메일 주소 정규화
        user = self.model(email=email, username=username)
        # 소셜 로그인이면 비밀번호 필요 X -> 입력을 못하게 아예 차단
        ### 보니까 저희 서비스가 소셜 로그인만 가능하게 하더라구요! 그래서 비밀번호 애초에 없게 코딩했습니다 :)
        user.set_unusable_password()
        # DB에 저장 후 반환
        user.save(using=self._db)
        return user

    # python manage.py createsuperuser 실행 시 작동하는 함수
    ## 무조건 이메일 입력 필수
    ### User 모델에서 AbstractBaseUser 상속 받는데, 기본 유저 생성 메소드가 정의 안되어있기에 함수선언 필수
    def create_superuser(self, email, username=None, password=None):
        user = self.create_user(email=email, username=username)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=20, null=False)
    email = models.EmailField(max_length=70, unique=True, null=False)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email