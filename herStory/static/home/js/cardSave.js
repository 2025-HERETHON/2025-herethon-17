// document.addEventListener("DOMContentLoaded", () => {
//   const cardSaveBtn = document.getElementById("cardSaveBtn");
//   const icon2 = document.getElementById("card-save-union");
//   const modal = document.getElementById("modalOverlay");
//   const confirmBtn = document.getElementById("confirmBtn");

//   if (cardSaveBtn && icon2) {
//     // 버튼 클릭 시: 모달 열기 + 이미지 변경 + 배경색 변경
//     cardSaveBtn.addEventListener("click", () => {
//       modal.classList.remove("hidden");

//       // 버튼 배경색 토글
//       cardSaveBtn.classList.toggle("clicked");

//       // 이미지 변경
//       icon2.src = cardSaveBtn.classList.contains("clicked")
//         ? "../../static/posts/image/save_union_hover.svg"
//         : "../../static/posts/image/save_union.svg";
//     });
//   }

  document.addEventListener("DOMContentLoaded", () => {
  const cardSaveBtn = document.getElementById("cardSaveBtn");
  const icon2 = document.getElementById("card-save-union");
  const modal = document.getElementById("modalOverlay");
  const confirmBtn = document.getElementById("confirmBtn");

  if (cardSaveBtn && icon2 && modal) {
    cardSaveBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      cardSaveBtn.classList.toggle("clicked");
      icon2.src = cardSaveBtn.classList.contains("clicked")
        ? "/static/home/image/save_union_hover.svg"
        : "/static/home/image/save_union.svg";
    });
  }

  if (confirmBtn && modal) {
    confirmBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      // 수동 저장도 하려면 여기에 submit 추가
      // confirmBtn.closest('form').submit();
    });
  }
});


//   if (confirmBtn) {
//     confirmBtn.addEventListener("click", () => {
//       modal.classList.add("hidden");
//     });
//   }
// });
