from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from .forms import UserUpdateForm
from history.models import UserSavedCard, HistoryCard
from posts.models import Post, Comment
from django.urls import reverse
from django.contrib import messages

def signup(request):
    return render(request, 'users/signup.html')

def login(request):
    return render(request, 'users/login.html')

def logout(request):
    if request.user.is_authenticated:
        auth_logout(request)
    return redirect('home')

@login_required
def delete_account(request):
    if request.method == 'POST':
        request.user.delete()
        logout(request)
        messages.success(request, "회원 탈퇴가 완료되었습니다.")
        return redirect('home')
    return render(request, 'users/delete_confirm.html')

@login_required
def mypage(request):
    return render(request, 'users/mypage.html', {
        'user' : request.user
    })

@login_required
def edit_profile(request):
    user = request.user

    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=user)
        if form.is_valid():
            if not form.cleaned_data.get('username'):
                form.add_error('username', "이름은 필수입니다.")
            else:
                form.save()
                return redirect('users:mypage')
    else:
        form = UserUpdateForm(instance=user)

    return render(request, 'users/edit_profile.html', {'form': form})

@login_required
def my_saved_cards(request):
    saved_cards = UserSavedCard.objects.filter(user=request.user).select_related('card').order_by('-saved_at')
    return render(request, 'users/my_cards.html', {'saved_cards': saved_cards})

@login_required
def saved_card_detail(request, card_id):
    card = get_object_or_404(HistoryCard, id=card_id)
    return render(request, 'users/my_cards_detail.html', {'card': card})

@login_required
def my_archives(request):
    my_posts = Post.objects.filter(user=request.user).order_by('-created_at')
    my_comments = Comment.objects.filter(author=request.user).order_by('-created_at')
    return render(request, 'users/my_archives.html', {
        'my_posts': my_posts,
        'my_comments': my_comments,
    })