document.addEventListener('DOMContentLoaded', function() {
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


// 요기까지 내비바 기능
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const Quiztab = document.querySelector('.text-wrapper-1');
const Ranktab = document.querySelector('.text-wrapper-2');

    Quiztab.addEventListener('click', function() {
            setTimeout(function() {
            window.location.href = '1_intro.html';
        }, 200);
    });


    Ranktab.addEventListener('click', function() {
            setTimeout(function() {
            window.location.href = '6_ranking.html';
        }, 200);
    });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const selctionbutton = document.querySelectorAll('.selction button');
const nextButton = document.querySelector('.next');
const unionImage = document.querySelector('.union');
let selectedButton = null;
let selectedAnswer = null; // 선택된 답안 번호 저장 → 프론트인지 백인지 몰라서 일단..
    
    selctionbutton.forEach((button, index) => {
      button.setAttribute('data-choice', index + 1);

      button.addEventListener('click', function () {
        // 모든 버튼 초기화: 배경색 & 이미지 되돌리기
        selctionbutton.forEach((btn, i) => {
          btn.style.backgroundColor = '#ffffff';

          const img = btn.querySelector('img');
          img.src = `../../static/Now/image/_Num_${i + 1}.png`;
        });

        // 현재 선택된 버튼 스타일 적용
        this.style.backgroundColor = '#91C84F';
        const selectedImg = this.querySelector('img');
        selectedImg.src = `../../static/Now/image/_Num_${index + 1}_active.png`;

        selectedButton = this;
        selectedAnswer = parseInt(this.getAttribute('data-choice'));
      });
    });

    
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    nextButton.addEventListener('click', function() {
        if (!selectedButton) {
            return; 
        } 
        
         // 선택된 답안을 localStorage에 저장 (일단 1번문제!)
        if (selectedAnswer) {
            localStorage.setItem('quiz_1_answer', selectedAnswer);
        }
        
        nextButton.style.backgroundColor = '#91C84F'; 
        unionImage.src = '../../static/Now/image/Union_active_.svg'; 
            setTimeout(function() {
            window.location.href = '3-2_quiz.html';
        }, 200);
    });

});

