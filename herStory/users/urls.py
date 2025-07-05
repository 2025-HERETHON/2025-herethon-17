from django.urls import path, include
from users import views

# 앱 단위의 네임스페이스 정의
app_name = "users"

urlpatterns = [
    # 소셜 로그인 하자마자 바로 회원가입이 되는 구조라서 이 부분은 주석처리 할게요!
    # path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('delete/', views.delete_account, name='delete_account'),
    path('mypage/', views.mypage, name='mypage'),
    path('mypage/edit/', views.edit_profile, name='edit_profile'),
    
    path('my-cards/', views.my_saved_cards, name='my_cards'),
    
       #path('redirect/', views.redirect_after_login, name='redirect'),
]