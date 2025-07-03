from django.shortcuts import render, redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from .forms import UserUpdateForm
from django.urls import reverse
from django.contrib import messages

def signup(request):
    return render(request, 'users/signup.html')

def login(request):
    return render(request, 'users/login.html')

def logout(request):
    if request.user.is_authenticated:
        auth_logout(request)
        messages.success(request, "성공적으로 로그아웃되었습니다.")
    return redirect('home')

@login_required
def mypage(request):
    return render(request, 'users/mypage.html', {
        'user' : request.user
    })

@login_required
def redirect_after_login(request):
    if not request.user.real_name:
        return redirect(reverse('users:edit_profile'))
    return redirect('/')

@login_required
def edit_profile(request):
    user = request.user

    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=user)
        if form.is_valid():
            if not form.cleaned_data.get('real_name'):
                form.add_error('real_name', "이름은 필수입니다.")
            else:
                form.save()
                return redirect('users:mypage')
    else:
        form = UserUpdateForm(instance=user)

    return render(request, 'users/edit_profile.html', {'form': form})