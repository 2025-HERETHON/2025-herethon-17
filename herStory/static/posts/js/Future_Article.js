document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const menuItems = menu.querySelectorAll("li");

  // 햄버거 버튼 클릭 시 메뉴 토글
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  // li 클릭 시 해당 li에 active 클래스 적용
  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      menuItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });

  menu.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("click", () => menu.classList.remove("active"));

  // 새글 작성 버튼
  const New = document.querySelector('.new');
  if (New) {
    New.addEventListener('click', function() {
      setTimeout(function() {
        window.location.href = '/posts/create/';  // ← 실제 글쓰기 URL로 변경
      }, 200);
    });
  }
});
