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
    const nextButton = document.querySelector('.next');
    const unionImage = document.querySelector('.union');
    
    nextButton.addEventListener('click', function() {
        nextButton.style.backgroundColor = '#91C84F'; //배경색 변경!
        unionImage.src = '../../static/Now/image/Union_active_.svg'; //이미지색 변경!
        
        // 약간.. 지연 후에 이동
        setTimeout(function() {
            window.location.href = '2_school.html';
        }, 200);
    });
});
