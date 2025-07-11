  // 탭 클릭 시 이동
  document.querySelector('.text-wrapper-1')?.addEventListener('click', () => {
    setTimeout(() => {
      window.location.href = "{% url 'quizzes:quiz_intro' %}";
    }, 200);
  });

  document.querySelector('.text-wrapper-2')?.addEventListener('click', () => {
    setTimeout(() => {
      window.location.href = "{% url 'quizzes:ranking' %}";
    }, 200);
  });

  // 뒤로 가기 버튼 기능
const backButton = document.querySelector('.back');
const unionImage = document.querySelector('.union');

backButton?.addEventListener('click', () => {
  backButton.style.backgroundColor = '#91C84F';

  setTimeout(() => {
    const targetUrl = backButton.getAttribute('data-url');
    window.location.href = targetUrl;
  }, 200);
});
