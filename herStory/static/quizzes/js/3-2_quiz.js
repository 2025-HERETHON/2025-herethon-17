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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const menuItems = menu.querySelectorAll("li");

  // 햄버거 버튼 클릭 시 메뉴 토글
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // 상위로 이벤트 전파 방지
    menu.classList.toggle("active");
  });

  // li 클릭 시 해당 li에 active 클래스 적용
  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation(); // 클릭해도 메뉴가 바로 닫히지 않도록
      menuItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // 메뉴 영역 클릭 시 이벤트 전파 방지
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // 메뉴 외부 클릭 시 메뉴 닫기
  document.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});