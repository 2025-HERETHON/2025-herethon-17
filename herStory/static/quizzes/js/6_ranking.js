document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const menuItems = menu.querySelectorAll("li");

  // 햄버거 메뉴 열기/닫기 토글
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  // 메뉴 항목 클릭 시 active 클래스 토글
  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      menuItems.forEach(el => el.classList.remove("active"));
      item.classList.add("active");

      // data-url이 있으면 이동
      const url = item.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });
  });

  // 메뉴 내부 클릭 시 이벤트 버블링 방지
  menu.addEventListener("click", (e) => e.stopPropagation());

  // 메뉴 외부 클릭 시 메뉴 닫기
  document.addEventListener("click", () => {
    menu.classList.remove("active");
  });

  // 탭 클릭 이동 기능
  const Quiztab = document.querySelector('.text-wrapper-1');
  const Ranktab = document.querySelector('.text-wrapper-2');

  if (Quiztab) {
    Quiztab.addEventListener('click', function() {
      setTimeout(() => window.location.href = '{% url "quizzes:quiz_index" %}', 200);
    });
  }

  if (Ranktab) {
    Ranktab.addEventListener('click', function() {
      setTimeout(() => window.location.href = '{% url "quizzes:ranking" %}', 200);
    });
  }
});
