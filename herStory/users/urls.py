from django.urls import path, include
from users import views

# 앱 단위의 네임스페이스 정의
app_name = "users"

urlpatterns = [
    #path('accounts/', include('accounts.urls', namespace='accounts')),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('mypage/', views.mypage, name='mypage'),
    # 추후 home에 추가
]