document.addEventListener('DOMContentLoaded', function () {
  // ----------------------- 메뉴 (햄버거) -----------------------
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

  // ----------------------- 탭 클릭 이동 -----------------------
  const Quiztab = document.querySelector('.text-wrapper-1');
  const Ranktab = document.querySelector('.text-wrapper-2');

  Quiztab?.addEventListener('click', function () {
    setTimeout(function () {
      window.location.href = '/quizzes/';  // Django 내부 URL로 변경 필요 시 수정
    }, 200);
  });

  Ranktab?.addEventListener('click', function () {
    setTimeout(function () {
      window.location.href = '/quizzes/ranking/';
    }, 200);
  });

  // ----------------------- 퀴즈 선택 처리 -----------------------
  const selctionButtons = document.querySelectorAll('.selction button');
  const nextButton = document.querySelector('.next');
  const unionImage = document.querySelector('.union');
  const hiddenInput = document.getElementById('selected-choice-id');
  const form = document.getElementById('quiz-form');

  let selectedButton = null;
  let selectedAnswer = null;

  selctionButtons.forEach((button, index) => {
    button.setAttribute('data-choice', index + 1);

    button.addEventListener('click', function () {
      // 모든 버튼 초기화
      selctionButtons.forEach((btn, i) => {
        btn.style.backgroundColor = '#ffffff';
        const img = btn.querySelector('img');
        if (img) {
          img.src = `/static/quizzes/image/_Num_${i + 1}.png`;
        }
      });

      // 선택한 버튼 스타일 적용
      this.style.backgroundColor = '#91C84F';
      const selectedImg = this.querySelector('img');
      if (selectedImg) {
        selectedImg.src = `/static/quizzes/image/_Num_${index + 1}_active.png`;
      }

      selectedButton = this;
      selectedAnswer = parseInt(this.getAttribute('data-choice'));

      // hidden input에 값 설정 (서버 전송용)
      if (hiddenInput) {
        hiddenInput.value = this.getAttribute('data-choice-id');
      }
    });
  });

  // ----------------------- 다음 버튼 처리 -----------------------
  nextButton?.addEventListener('click', function (e) {
    if (!selectedButton) {
      alert("답안을 선택해 주세요!");
      e.preventDefault();
      return;
    }

    // localStorage 저장 (선택 시)
    if (selectedAnswer) {
      localStorage.setItem('quiz_1_answer', selectedAnswer);
    }

    // 버튼 UI 업데이트
    nextButton.style.backgroundColor = '#91C84F';
    if (unionImage) {
      unionImage.src = '/static/quizzes/image/Union_active_.svg';
    }

    // Django form submit
    if (form) {
      form.submit();
    } else {
      // 만약 페이지 이동 방식 사용 시
      setTimeout(function () {
        window.location.href = '3-2_quiz.html';
      }, 200);
    }
  });
});
