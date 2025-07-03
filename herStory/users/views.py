from django.shortcuts import render, redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
#from .forms import UserUpdateForm

def signup(request):
    return render(request, 'users/signup.html')

def login(request):
    return render(request, 'users/login.html')

def logout(request):
    if request.user.is_authenticated:
        auth_logout(request)
    return redirect('posts:index')

@login_required
def mypage(request):
    return render(request, 'users/mypage.html', {
        'user' : request.user
    })

# @login_required
# def edit_profile(request):
#     user = request.user
#     if request.method == 'POST':
#         form = UserUpdateForm(request.POST, instance=user)
#         if form.is_valid():
#             form.save()
#             return redirect('users:mypage')
#     else:
#         form = UserUpdateForm(instance=user)

#     return render(request, 'users/edit_profile.html', {
#         'form': form
#     })