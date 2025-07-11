const btn1 = document.getElementById("postListBtn");
const icon1 = document.getElementById("cardIcon3");
const icon3 = document.getElementById("cardIcon5");

btn1.addEventListener("click", () => {
  // 버튼 배경색 변경
  btn1.classList.toggle("clicked");

  // 이미지 변경
  if (btn1.classList.contains("clicked")) {
    icon1.src = "../../static/posts/image/card_union_hover.png"; // 선택된 상태
    icon3.src = "../../static/posts/image/Xnix/Line/card_message_hover.png";
  } else {
    icon1.src = "../../static/posts/image/card_union.png"; // 원래 이미지
    icon3.src = "../../static/posts/image/Xnix/Line/card_message.png";
  }
});

const btn2 = document.getElementById("commentListBtn");
const icon2 = document.getElementById("cardIcon4");
const icon4 = document.getElementById("cardIcon6");

btn2.addEventListener("click", () => {
  // 버튼 배경색 변경
  btn2.classList.toggle("clicked");

  // 이미지 변경
  if (btn2.classList.contains("clicked")) {
    icon2.src = "../../static/posts/image/card_union_hover.png"; // 선택된 상태
    icon4.src = "../../static/posts/image/Xnix/Line/card_message_hover.png";
  } else {
    icon2.src = "../../static/posts/image/card_union.png"; // 원래 이미지
    icon4.src = "../../static/posts/image/Xnix/Line/card_message.png";
  }
});
