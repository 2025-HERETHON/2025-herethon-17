// ------------------ 햄버거 메뉴 ------------------
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const menuItems = menu.querySelectorAll("li");

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

    // 🔥 네비바 메뉴 클릭 → 페이지 이동
    const navLinks = document.querySelectorAll('.menu-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const url = link.dataset.url;
        if (url) {
          window.location.href = url;
        }
      });
    });
  });

  menu.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});
