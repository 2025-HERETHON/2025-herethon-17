document.addEventListener('DOMContentLoaded', function() {
    const selctionbutton = document.querySelectorAll('.selction button');
    const nextButton = document.querySelector('.next');
    const unionImage = document.querySelector('.union');
    let selectedButton = null;

    nextButton.addEventListener('click', function() {
        nextButton.style.backgroundColor = '#91C84F'; 
        const unionImage = document.querySelector('.union'); // mj - 이미지 바꾸기 data-속성
    
            setTimeout(function() {
            window.location.href = '6_ranking.html';
        }, 200);
    });


    const quizData = {
    1: { correct: 1 }, // 첫 번째 문제의 정답은 1번
    2: { correct: 4 }, // 두 번째 문제의 정답은 4번
    3: { correct: 1 }  // 세 번째 문제의 정답은 1번
};
let userAnswers = {};
let currentQuiz = 1;
});
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

document.addEventListener("DOMContentLoaded", () => {
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

function showSolution() {
    alert('해설 페이지는 아직 구현되지 않았습니다.');
}

