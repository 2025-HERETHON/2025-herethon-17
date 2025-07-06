import random
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from .models import HistoryCard, UserSavedCard
from django.contrib import messages

def card_intro(request):
    return render(request, 'card_intro.html')

@login_required
def random_card(request):
    # 1. 유저가 저장한 카드 id 목록 가져오기
    saved_card_ids = UserSavedCard.objects.filter(user=request.user).values_list('card_id', flat=True)

    # 2. 저장하지 않은 카드들만 가져오기
    remaining_cards = HistoryCard.objects.exclude(id__in=saved_card_ids)

    if not remaining_cards.exists():
        # 3. 남은 카드 없으면 no_card.html 렌더링
        return render(request, 'no_card.html')

    # 4. 남은 카드 중 랜덤으로 하나 선택
    card = random.choice(list(remaining_cards))

    return render(request, 'card_detail.html', {
        'card': card,
        'is_saved': False,  # 저장 안 했으니까 버튼 보여주기
    })

@login_required
def save_card(request, card_id):
    card = HistoryCard.objects.get(id=card_id)
    _, created = UserSavedCard.objects.get_or_create(user=request.user, card=card)

    if created:
        messages.success(request, "카드를 저장했습니다!")
    else:
        messages.info(request, "이미 저장한 카드입니다.")
    
    return redirect('history:card_intro')

def card_detail(request, card_id):
    card = get_object_or_404(HistoryCard, id=card_id)
    return render(request, 'card_detail.html', {'card': card})