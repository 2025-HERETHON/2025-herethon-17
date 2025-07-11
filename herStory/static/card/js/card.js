const btn = document.getElementById("randomCardBtn");
const icon = document.getElementById("cardIcon");

btn.addEventListener("click", () => {
  // 버튼 배경색 변경
  btn.classList.toggle("clicked");

  // 이미지 변경
  if (btn.classList.contains("clicked")) {
    icon.src = "../../static/posts/image/card_union_hover.png"; // 선택된 상태
  } else {
    icon.src = "../../static/posts/image/card_union.png"; // 원래 이미지
  }
});

const btn2 = document.getElementById("cardSaveBtn");
const icon2 = document.getElementById("card-save-union");

btn2.addEventListener("click", () => {
  // 버튼 배경색 변경
  btn2.classList.toggle("clicked");

  // 이미지 변경
  if (btn2.classList.contains("clicked")) {
    icon2.src = "../../static/posts/image/save_union_hover.svg"; // 선택된 상태
  } else {
    icon2.src = "../../static/posts/image/save_union.svg"; // 원래 이미지
  }
});
