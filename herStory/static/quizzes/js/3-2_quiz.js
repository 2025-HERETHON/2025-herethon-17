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
        const unionImage = document.querySelector('.union'); // mj - 이미지 바꾸기 data-속성
    
            setTimeout(function() {
            window.location.href = '3-3_quiz.html';
        }, 200);
    });
      function saveAnswerAndNext(quizNum, selectedAnswer) {
          userAnswers[quizNum] = selectedAnswer;
          // 다음 페이지로 이동? or 결과 계산
      }

});