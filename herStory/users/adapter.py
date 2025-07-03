from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.exceptions import ImmediateHttpResponse
from django.contrib.auth import get_user_model
from django.shortcuts import redirect

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
