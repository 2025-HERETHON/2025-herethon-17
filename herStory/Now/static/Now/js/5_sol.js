document.addEventListener('DOMContentLoaded', function() {
    const selctionbutton = document.querySelectorAll('.selction button');
    const nextButton = document.querySelector('.next');
    const unionImage = document.querySelector('.union');
    let selectedButton = null;
    
    selctionbutton.forEach(button => {
        button.addEventListener('click', function() {
            if (selectedButton) { 
                selectedButton.style.backgroundColor = '#f5ffef';
            }   
            this.style.backgroundColor = '#91C84F'; 
            selectedButton = this;
        });
    });
    
    nextButton.addEventListener('click', function() {
        if (!selectedButton) {
            return; 
        } 
        
        nextButton.style.backgroundColor = '#91C84F'; 
        unionImage.src = '../../static/Now/image/Union_active_.svg'; 
            setTimeout(function() {
            window.location.href = '4_score.html';
        }, 200);
    });
      function saveAnswerAndNext(quizNum, selectedAnswer) {
          userAnswers[quizNum] = selectedAnswer;
          // 다음 페이지로 이동 또는 결과 계산
      }


});