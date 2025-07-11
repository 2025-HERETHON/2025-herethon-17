document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const menuItems = menu.querySelectorAll("li");

  // 햄버거 메뉴 toggle
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      menuItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });

  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    menu.classList.remove("active");
  });

  // 탭 클릭 시 이동
  document.querySelector('.text-wrapper-1')?.addEventListener('click', () => {
    setTimeout(() => {
      window.location.href = "{% url 'quizzes:quiz_intro' %}";
    }, 200);
  });

  document.querySelector('.text-wrapper-2')?.addEventListener('click', () => {
    setTimeout(() => {
      window.location.href = "{% url 'quizzes:ranking' %}";
    }, 200);
  });

  // 뒤로 가기 버튼 기능
const backButton = document.querySelector('.back');
const unionImage = document.querySelector('.union');

backButton?.addEventListener('click', () => {
  backButton.style.backgroundColor = '#91C84F';
  if (unionImage) {
    unionImage.src = "/static/Now/image/Union_active_.svg";
  }

  setTimeout(() => {
    const targetUrl = backButton.getAttribute('data-url');
    window.location.href = targetUrl;
  }, 200);
});

});
