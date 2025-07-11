document.addEventListener("DOMContentLoaded", () => {
  // [1] 모달 로직
  const withdrawBtn = document.getElementById("withdrawBtn");
  const modal = document.getElementById("modalOverlay");
  const cancelBtn = document.getElementById("cancelBtn");
  const confirmBtn = document.getElementById("confirmBtn");

  withdrawBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  confirmBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    alert("탈퇴가 완료되었습니다.");
  });

  // [2] 인물 카드 조회 버튼 배경색 + 이미지 변경
  const peopleBtn = document.getElementById("withdrawBtn");
  const peopleIcon = document.getElementById("cardIcon2");

  peopleBtn.addEventListener("click", () => {
    peopleBtn.classList.toggle("clicked");

    if (peopleBtn.classList.contains("clicked")) {
      peopleIcon.src = "../../static/posts/image/card_union_hover.png";
    } else {
      peopleIcon.src = "../../static/posts/image/card_union.png";
    }
  });
});
