document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.querySelector('.next');
    const unionImage = document.querySelector('.union'); // mj - 이미지 바꾸기 data-속성
    
    nextButton.addEventListener('click', function() {
        nextButton.style.backgroundColor = '#91C84F'; //배경색 변경!
        //const unionImage = document.querySelector('.union'); // mj - 이미지 바꾸기 data-속성
    //이미지색 변경!
        unionImage.src = unionImage.dataset.activeSrc; // mj - 이미지 바꾸기 data-속성
        
        // 약간.. 지연 후에 이동
        setTimeout(function() {
            window.location.href = schoolSelectionUrl; // mj - django 템플릿으로 변경
        }, 200);
    });
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