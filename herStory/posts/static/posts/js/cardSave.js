document.addEventListener("DOMContentLoaded", () => {
  const cardSaveBtn = document.getElementById("cardSaveBtn");
  const modal = document.getElementById("modalOverlay");
  const confirmBtn = document.getElementById("confirmBtn");

  // 버튼 클릭 시 모달 보이기
  cardSaveBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // 확인 버튼 → 모달 닫기
  confirmBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});
