import random
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from .models import HistoryCard, UserSavedCard
from django.contrib import messages

def card_intro(request):
    return render(request, 'card_intro.html')

def random_card(request):
    cards = HistoryCard.objects.all()
    if not cards.exists():
        return render(request, 'no_card.html')

    card = random.choice(list(cards))
    return render(request, 'card_detail.html', {'card': card})

@login_required
def save_card(request, card_id):
    card = get_object_or_404(HistoryCard, id=card_id)
    saved, created = UserSavedCard.objects.get_or_create(user=request.user, card=card)
    if created:
        messages.success(request, f"{card.name} 카드를 저장했어요!")
    else:
        messages.info(request, f"{card.name} 카드는 이미 저장되어 있어요.")
    return redirect('history:card_intro')

def card_detail(request, card_id):
    card = get_object_or_404(HistoryCard, id=card_id)
    return render(request, 'card_detail.html', {'card': card})