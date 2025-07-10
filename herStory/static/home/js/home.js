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

// ------------------ 랜덤 카드 뽑기 버튼 ------------------
const randomBtn = document.querySelector(".random-card-btn");
const randomImg = document.querySelector(".card-union");

if (randomBtn && randomImg) {
  randomBtn.addEventListener("touchstart", () => {
    randomBtn.classList.add("hovered");
    randomImg.src = "../../static/posts/image/card_union_hover.png";
  });

  randomBtn.addEventListener("touchend", () => {
    randomBtn.classList.remove("hovered");
    randomImg.src = "../../static/posts/image/card_union.png";
  });

  randomBtn.addEventListener("touchcancel", () => {
    randomBtn.classList.remove("hovered");
    randomImg.src = "../../static/posts/image/card_union.png";
  });
}

// ------------------ 카드 저장 버튼 ------------------
const saveBtn = document.querySelector(".card-save-btn");
const saveImg = document.querySelector(".card-save");

if (saveBtn && saveImg) {
  saveBtn.addEventListener("touchstart", () => {
    saveBtn.classList.add("hovered");
    saveImg.src = "../../static/posts/image/save_union_hover.svg";
  });

  saveBtn.addEventListener("touchend", () => {
    saveBtn.classList.remove("hovered");
    saveImg.src = "../../static/posts/image/save_union.svg"; // ← 여기 오타 있었어!
  });

  saveBtn.addEventListener("touchcancel", () => {
    saveBtn.classList.remove("hovered");
    saveImg.src = "../../static/posts/image/save_union.svg";
  });
}