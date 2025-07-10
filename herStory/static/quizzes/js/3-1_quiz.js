document.addEventListener('DOMContentLoaded', function () {
  const selctionButtons = document.querySelectorAll('.selction button');
  const nextButton = document.querySelector('.next');
  const unionImage = document.querySelector('.union');
  const hiddenInput = document.getElementById('selected-choice-id');
  const form = document.getElementById('quiz-form');
  let selectedButton = null;

  // 선택 버튼 클릭 처리
  selctionButtons.forEach(button => {
    button.addEventListener('click', function () {
      // 스타일 초기화
      if (selectedButton) {
        selectedButton.style.backgroundColor = '#f5ffef';
      }

      // 새 선택 스타일 적용
      this.style.backgroundColor = '#91C84F';
      selectedButton = this;

      // hidden input에 선택한 값 설정
      const choiceId = this.getAttribute('data-choice-id');
      hiddenInput.value = choiceId;
    });
  });

  // 다음 버튼 클릭 시 폼 제출
  nextButton.addEventListener('click', function (e) {
    if (!selectedButton) {
      alert("답안을 선택해 주세요!");
      e.preventDefault();
      return;
    }

    // form 전송 (기본 동작)
    form.submit();
  });

  // 햄버거 메뉴 관련 기존 코드 유지
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
  });

  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});
