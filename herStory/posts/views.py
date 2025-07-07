from django.shortcuts import render, redirect, get_object_or_404
from .models import Post, Comment, Category, Tag
from allauth.socialaccount.models import SocialAccount #Django Allauth가 socialaccount 모델에 저장한 정보
from django.contrib.auth.decorators import login_required
from django.contrib import messages # 에러 메시지
from django.db.models import Q # Q 객체 - 검색
from django.utils.html import escape # escape - 하이라이터


# def index(request):
#     categories = Category.objects.all()

#     category_posts = []
#     for category in categories:
#         posts = Post.objects.filter(category=category).order_by('-id')[:5]
#         category_posts.append({
#             'category': category,
#             'posts': posts
#         })

#     return render(request, 'posts/index.html', {
#         'categories': categories,
#         'category_posts': category_posts
#     })

@login_required #로그인한 사용자만 글 작성 가능
def create(request):
    categories = Category.objects.all()

    if request.method=="POST":
        title=request.POST.get('title')
        content=request.POST.get('content')

        category_ids = request.POST.getlist('category')
        category_list = [get_object_or_404(Category, id=category_id) for category_id in category_ids]

        type_choice = request.POST.get('type')

        post = Post.objects.create(
            title = title,
            content = content,
            user = request.user,    
            type=type_choice
        )

        for category in category_list:
            post.category.add(category)
        
        return redirect('posts:detail', post.id) # 방금 쓴 글의 detail로
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

    comments = Comment.objects.filter(post=post).select_related('author').order_by('created_at')

    # 수정 대상 댓글id
    update_comment_id = request.GET.get('update')
    
    # 지금 수정 중인 댓글이 있으면 정수 처리해서 넘김
    if update_comment_id:
        update_comment_id = int(update_comment_id)
    else:
        update_comment_id = None

    # 조회수
    post.views += 1
    post.save()
        
    return render(request, 'posts/detail.html', {'post': post,
    'social_name': social_name,
    'comments': comments,
    'update_comment_id': update_comment_id})

@login_required
def update(request, id):
    post = get_object_or_404(Post, id=id)

    if request.method == 'POST':
        post.title = request.POST.get('title')
        post.content = request.POST.get('content')

        # 카테고리 수정
        category_ids = request.POST.getlist('category')
        categories = Category.objects.filter(id__in=category_ids)
        post.category.set(categories)

        # 타입 수정
        post.type = request.POST.get('type')
        if post.type not in ['현직자', '취준생', '기타']:
            post.type = '기타'
        post.save()
        return redirect('posts:detail', id)

    categories = Category.objects.all()

    return render(request, 'posts/update.html', {'post': post,
        'categories': categories,
        'type': post.type})

def delete(request, id):
    post = get_object_or_404(Post, id=id)
    post.delete()
    return redirect('posts:index')


def create_comment(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.method == 'POST':
        content = request.POST.get('content')
        parent_id = request.POST.get('parent_comment_id')  #대댓글 부모 아이디
        
        parent_comment = None
        if parent_id:
            try:
                parent_comment = Comment.objects.get(id=parent_id)
            except Comment.DoesNotExist:
                parent_comment = None  # 잘못된 거거나 ID 없으면 일반 댓글로 처리

        Comment.objects.create(
            post = post,
            content = content,
            author = request.user,
            parent_comment=parent_comment,
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



@login_required
def delete_comment(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id)

    # 다른 사용자가 삭제하려고 하면 거부
    if comment.author != request.user:
        messages.error(request, "본인의 댓글만 삭제할 수 있어요!")
        return redirect('posts:detail', comment.post.id)

    post_id = comment.post.id
    comment.delete()
    return redirect('posts:detail', post_id)

@login_required
def update_comment(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id)

    if comment.author != request.user:
        return redirect('posts:detail', comment.post.id)

    if request.method == 'POST':
        new_content = request.POST.get('content')
        if new_content:
            comment.content = new_content
            comment.save()

    return redirect('posts:detail', comment.post.id)



# 카테고리별 게시파ㄴ
def category(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    posts = Post.objects.filter(category=category).order_by('-id')
    categories = Category.objects.all()  # 카테고리 목록 상단 고정용-카테고리 셋 넘기기

    return render(request, 'posts/category_detail.html', {
        'category': category,
        'posts': posts,
        'categories': categories
    })

def board(request):
    categories = Category.objects.all()

    category_posts = []
    for category in categories:
        posts = Post.objects.filter(category=category).order_by('-id')[:5]
        category_posts.append({
            'category': category,
            'posts': posts
        })

    return render(request, 'posts/board.html', {
        'category_posts': category_posts
    })

# 검색

def search(request):
    query = request.GET.get('q', '')
    # q 객체로 중첩 - 제목, 내용 포함 검색
    posts = Post.objects.filter(Q(title__icontains=query) | Q(content__icontains=query)).order_by('-id') if query else []
    categories = Category.objects.all()

    # 하이라이트 처리?
    if query:
        posts = Post.objects.filter(
            Q(title__icontains=query) | Q(content__icontains=query)
        ).order_by('-id')

        highlighted_posts = []
        for post in posts: 
            # 검색어가 들어있으면 mark태그로 감싸기 - 템플릿에서 변수|safe < 식으로
            highlighted_title = escape(post.title).replace(
                query, f"<mark>{escape(query)}</mark>"
            )
            highlighted_content = escape(post.content).replace(
                query, f"<mark>{escape(query)}</mark>"
            )

            highlighted_posts.append({
                'id': post.id,
                'title': highlighted_title,
                'content': highlighted_content,
                'created_at': post.created_at
            })
    else:
        highlighted_posts = []


    return render(request, 'posts/search_result.html', {
        'query': query,
        'posts': highlighted_posts,
        'categories': categories})
