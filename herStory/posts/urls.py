from django.urls import path
from .views import *

app_name = 'posts'

urlpatterns = [
    #인덱스 페이지 사용 안 함 path('', index, name='index'),
    path('create/', create, name='create'),
    path('detail/<int:id>/', detail, name='detail'),
    path('update/<int:id>/', update, name='update'),
    path('delete/<int:id>/', delete, name='delete'),
    path('create-comment/<int:post_id>/', create_comment, name='create-comment'),
    path('comments/<int:comment_id>/delete/', delete_comment, name='delete-comment'),
    path('comments/<int:comment_id>/update/', update_comment, name='update-comment'),
    path('like/<int:post_id>/', like, name='like'),
    path('board/',board, name='board'),
    path('category/<int:category_id>/', category, name='category'),
    path('search/', search, name='search'),

]

'''
    path('category/<slug:slug>/', category, name='category'),
    path('scrap/<int:post_id>/', scrap, name='scrap'),
'''