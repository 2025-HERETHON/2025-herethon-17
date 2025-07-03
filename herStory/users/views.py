from django.shortcuts import render, redirect
from django.contrib.auth import logout as auth_logout

def signup(request):
    return render(request, 'users/signup.html')

def login(request):
    return render(request, 'users/login.html')

def logout(request):
    if request.user.is_authenticated:
        auth_logout(request)
    return redirect('posts:index')

def mypage(request):
    return render(request, 'users/mypage.html')