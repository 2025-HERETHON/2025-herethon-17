  // 탭 클릭 이동 기능
  const Quiztab = document.querySelector('.text-wrapper-1');
  const Ranktab = document.querySelector('.text-wrapper-2');

  if (Quiztab) {
    Quiztab.addEventListener('click', function() {
      setTimeout(() => window.location.href = '{% url "quizzes:quiz_index" %}', 200);
    });
  }

  if (Ranktab) {
    Ranktab.addEventListener('click', function() {
      setTimeout(() => window.location.href = '{% url "quizzes:ranking" %}', 200);
    });
  }
