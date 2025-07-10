document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const menuItems = menu.querySelectorAll("li");

  // 햄버거 버튼 클릭 시 메뉴 토글
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // 상위로 이벤트 전파 방지
    menu.classList.toggle("active");
  });

  // li 클릭 시 해당 li에 active 클래스 적용
  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation(); // 클릭해도 메뉴가 바로 닫히지 않도록
      menuItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // 메뉴 영역 클릭 시 이벤트 전파 방지
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // 메뉴 외부 클릭 시 메뉴 닫기
  document.addEventListener("click", () => {
    menu.classList.remove("active");
  });

// 요기까지 내비바 기능
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const nextButton = document.querySelector('.next');
const unionImage = document.querySelector('.union');

    nextButton.addEventListener('click', function() {
        nextButton.style.backgroundColor = '#91C84F'; 
        unionImage.src = '../../static/Now/image/Union_active_.svg'; 
            setTimeout(function() {
            window.location.href = '6_ranking.html';
        }, 200);
    });

    // 페이지 이동기능

    const quizData = {
    1: { correct: 1 }, // 1번 문제 정답 → 1번
    2: { correct: 4 }, // 2번 문제 정답 → 4번
    3: { correct: 1 }  // 3번 문제 정답 → 1번
};
    let userAnswers = {};
    let currentQuiz = 1;
});


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function calculateAndShowScore() {
    let correctCount = 0;
    
    // 각 문제별 정답 확인
    for (let i = 1; i <= 3; i++) {
        const isCorrect = userAnswers[i] === quizData[i].correct;
        const resultElement = document.getElementById(`prob${i}`);

        if (isCorrect) {
            correctCount++;
            resultElement.textContent = 'O';
            resultElement.classList.add('correct');
        } 
        else {
            resultElement.textContent = 'X';
            resultElement.classList.add('incorrect');
        }
    }

    // 점수 계산 (문제당 10점)
    const totalScore = correctCount * 10;

    // 결과 표시
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('tot_score').textContent = `총점: ${totalScore}점`;

    // 결과 화면 표시
    document.getElementById('score-screen').classList.remove('hidden');
}
