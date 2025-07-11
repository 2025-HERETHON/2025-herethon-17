from django.urls import path
from . import views

app_name = 'history'

urlpatterns = [
    path('card/', views.card_intro, name='card_intro'),
    path('card/random/', views.random_card, name='random_card'),
    path('card/save/<int:card_id>/', views.save_card, name='save_card'),
    path('card/<int:card_id>/', views.card_detail, name='card_detail'),
]