  // 퀴즈 결과 버튼 클릭 시 (예: 해설 페이지로 이동 등 필요하면 추가 가능)
  const resultButtons = document.querySelectorAll('.result-button');
  resultButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 필요시 클릭 이벤트 처리
      // 현재는 클릭 시 아무 동작 없음
    });
  });

  // 랭킹 보기 버튼 클릭 효과
  const nextButton = document.querySelector('.next');
  nextButton.addEventListener('click', () => {
    nextButton.style.backgroundColor = '#91C84F';

    setTimeout(() => {
      // 실제 랭킹 페이지 URL은 form action 속성에서 처리됨
      // 여기서는 딜레이 후 form 제출이 기본 동작으로 이루어짐
    }, 200);
  });


// 해설 링크(X) 클릭 시 효과
const wrongButtons = document.querySelectorAll('.wrong-button');
wrongButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // 클릭 효과
    button.style.backgroundColor = '#91C84F';

    setTimeout(() => {
      // 폼 제출은 기본 submit 동작으로 진행 (form action에 의해 이동)
    }, 200);
  });
});



// // 아래 함수는 필요하면 호출해서 동적으로 점수와 결과를 재표시할 수 있음
// function calculateAndShowScore(userAnswers, quizData) {
//   let correctCount = 0;

//   for (let i = 1; i <= Object.keys(quizData).length; i++) {
//     const isCorrect = userAnswers[i] === quizData[i].correct;
//     const button = document.getElementById(`prob${i}`);
//     if (!button) continue;

//     const span = button.querySelector('.result-text');
//     if (!span) continue;

//     if (isCorrect) {
//       correctCount++;
//       span.textContent = 'O';
//       button.classList.add('correct');
//       button.classList.remove('incorrect');
//     } else {
//       span.textContent = 'X';
//       button.classList.add('incorrect');
//       button.classList.remove('correct');
//     }
//   }

//   const totalScore = correctCount * 10;
//   const correctCountElem = document.getElementById('correct-count');
//   const totalScoreElem = document.querySelector('#tot_score h3');

//   if (correctCountElem) correctCountElem.textContent = correctCount;
//   if (totalScoreElem) totalScoreElem.textContent = `총점: ${totalScore}점`;

//   // score-screen이라는 영역이 있다면 보이게 하기
//   const scoreScreen = document.getElementById('score-screen');
//   if (scoreScreen) scoreScreen.classList.remove('hidden');
// }
