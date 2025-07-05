from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.exceptions import ImmediateHttpResponse
from django.contrib.auth import get_user_model
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter

User = get_user_model()

# 소셜 로그인 시 적용되는 룰들을 컨트롤 해줄 수 있는 클래스
## 기존 계정과 연동되게끔 했고, 로그인 시 자동 계정 생성 제한함
class MySocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        # 이미 로그인한 경우 무시
        if request.user.is_authenticated:
            return

        email = sociallogin.account.extra_data.get('email')
        if not email:
            return

        try:
            # 동일 이메일의 기존 사용자 찾기
            existing_user = User.objects.get(email=email)
            sociallogin.connect(request, existing_user)
        except User.DoesNotExist:
            pass  # 새 사용자면 그대로 진행
        
    # 새롭게 만들어지는 계정 전부 이름 받아오기 => 구글은 계속 아이디로만 이름이 설정돼서 실명 받아오는 걸로 변경함
    def populate_user(self, request, sociallogin, data):
        # Allauth가 기본적으로 만드는 user 객체
        user = super().populate_user(request, sociallogin, data)
        extra_data = sociallogin.account.extra_data

        # 이름 값을 username으로 설정 (또는 first_name, nickname 등으로도 가능)
        name = extra_data.get("name") or extra_data.get("given_name")
        if name:
            user.username = name

        return user
