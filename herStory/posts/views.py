from django.shortcuts import render, redirect, get_object_or_404
from .models import Post, Comment, Category, Tag
from allauth.socialaccount.models import SocialAccount #Django Allauth가 socialaccount 모델에 저장한 정보
from django.contrib.auth.decorators import login_required

def index(request):
    categories = Category.objects.all()
    category_id = request.GET.get('category')

    if category_id:
        category = get_object_or_404(Category, id=category_id)
        posts = Post.objects.filter(category=category).order_by('-id')
    else: 
        posts = Post.objects.all().order_by('-id')
        
    social_name = '로그인하지 않은 사용자'  # socialaccount 모델의 소셜 정보를 name으로
    if request.user.is_authenticated:
        try:
            social_account = SocialAccount.objects.get(user=request.user)
            social_name = social_account.extra_data.get("name")
        except SocialAccount.DoesNotExist:
            pass  # 로그인은 했지만 소셜 계정은 아니면 > 패스
    context = {"posts": posts,"social_name": social_name, "categories": categories}

    return render(request, 'posts/index.html', context)

@login_required #로그인한 사용자만 글 작성 가능
def create(request):
    categories = Category.objects.all()

    if request.method=="POST":
        title=request.POST.get('title')
        content=request.POST.get('content')

        category_ids = request.POST.getlist('category')
        category_list = [get_object_or_404(Category, id=category_id) for category_id in category_ids]

        post = Post.objects.create(
            title = title,
            content = content,
            user = request.user,
        )

        for category in category_list:
            post.category.add(category)

        tag_string = request.POST.get('tags')  # 자유글,질문,경험 공유
        if tag_string:
            tag_names = [tag.strip() for tag in tag_string.split(',') if tag.strip()]
            for tag_name in tag_names:
                tag, created = Tag.objects.get_or_create(name=tag_name)
                post.tags.add(tag)
        
        return redirect('posts:index')
    return render(request, 'posts/create.html', {'categories':categories})

def detail(request, id):
    post = get_object_or_404(Post, id=id)
    social_name = '로그인하지 않은 사용자'  # socialaccount 모델의 소셜 정보를 name으로
    if request.user.is_authenticated:
        try:
            social_account = SocialAccount.objects.get(user=request.user)
            social_name = social_account.extra_data.get("name")
        except SocialAccount.DoesNotExist:
            pass

    context = {
        'post': post,
        'social_name': social_name
    }
    return render(request, 'posts/detail.html', context)

def update(request, id):
    post = get_object_or_404(Post, id=id)

    if request.method == 'POST':
        post.title = request.POST.get('title')
        post.content = request.POST.get('content')
        post.save()
        return redirect('posts:detail', id)
    return render(request, 'posts/update.html', {'post':post})

def delete(request, id):
    post = get_object_or_404(Post, id=id)
    post.delete()
    return redirect('posts:index')


def create_comment(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.method == 'POST':
        content = request.POST.get('content')
        
        Comment.objects.create(
            post = post,
            content = content,
            author = request.user
        )
        return redirect('posts:detail', post_id)
    return redirect('posts:index')

@login_required
def like(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user

    if post in user.like_posts.all():
        post.like.remove(user)
    else:
        post.like.add(user)
    return redirect('posts:detail', post_id)
