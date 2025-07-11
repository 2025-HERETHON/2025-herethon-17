const btn = document.getElementById("peoplecard");
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
