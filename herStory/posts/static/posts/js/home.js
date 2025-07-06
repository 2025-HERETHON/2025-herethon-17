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

// past 버튼 터치
const btn = document.querySelector(".random-card-btn");
const img = document.querySelector(".card-union");

// 터치 시작하면 스타일 변경
btn.addEventListener("touchstart", () => {
  btn.classList.add("hovered");
  img.src = "../../static/posts/image/card_union_hover.png";
});

// 터치 끝나면 원래대로
btn.addEventListener("touchend", () => {
  btn.classList.remove("hovered");
  img.src = "../../static/posts/image/card_union.png";
});
