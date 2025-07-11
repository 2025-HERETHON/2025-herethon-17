document.addEventListener("DOMContentLoaded", () => {
  const withdrawBtn = document.getElementById("withdrawBtn");
  const modal = document.getElementById("modalOverlay");
  const cancelBtn = document.getElementById("cancelBtn");
  const confirmBtn = document.getElementById("confirmBtn");

  // 버튼 클릭 시 모달 보이기
  withdrawBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // 취소 버튼 → 모달 닫기
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // 확인 버튼 → 실제 탈퇴 요청 로직 추가 예정
  confirmBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    alert("탈퇴 처리가 진행됩니다."); // 실제로는 fetch 또는 form 전송 등으로 처리
  });


  // [2] 인물 카드 조회 버튼 배경색 + 이미지 변경
  const peopleBtn = document.getElementById("withdrawBtn");
  const peopleIcon = document.getElementById("cardIcon2");

  peopleBtn.addEventListener("click", () => {
    peopleBtn.classList.toggle("clicked");
  });
});