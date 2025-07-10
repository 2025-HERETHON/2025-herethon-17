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

const Quiztab = document.querySelector('.text-wrapper-1');
const Ranktab = document.querySelector('.text-wrapper-2');

    Quiztab.addEventListener('click', function() {
            setTimeout(function() {
            window.location.href = '1_intro.html';
        }, 200);
    });


    Ranktab.addEventListener('click', function() {
            setTimeout(function() {
            window.location.href = '6_ranking.html';
        }, 200);
    });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//↓요건 다음 페이지로 가는 이벤트용

const nextButton = document.querySelector('.next');
const unionImage = document.querySelector('.union');

nextButton.addEventListener('click', function() {
    nextButton.style.backgroundColor = '#91C84F'; 
    unionImage.src = '../../static/Now/image/Union_active_.svg'; 
        setTimeout(function() {
        window.location.href = '6_ranking.html';
    }, 200);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// 백엔드에서 전달받은 결과 데이터 처리..?

function displayQuizResults() {
    let correctCount = 0;

    for (let i = 1; i <= 3; i++) {
        const probButton = document.getElementById(`prob${i}`);
        const probText = document.querySelector(`.prob${i}-text`);

        const userAnswer = localStorage.getItem(`quiz_${i}_answer`);
        // ↑ 요 userAnswer은 임시로 localStorage에서 가져온 답안 사용할게요! 
        // 백엔드에서 수정해주시면 됩니다

        // 백엔드에서 is_correct 값이 전달되면 아래 주석 해제하고 사용
        /*
        if (quiz_results[i-1].is_correct) {
            probText.textContent = 'O';
            probButton.classList.add('correct');
            correctCount++;
        } else {
            probText.textContent = 'X';
            probButton.classList.add('incorrect');
            
            // X인 경우 해당 문제의 해설 페이지로 이동!
            probButton.addEventListener('click', function() {
                window.location.href = `5_sol.html?problem=${i}`;
            });
        }
        */
       
        if (quiz_results[i-1].is_correct) {
            probText.textContent = 'O';
            probButton.classList.add('correct');
            correctCount++;
        } else {
            probText.textContent = 'X';
            probButton.classList.add('incorrect');
            
            // X인 경우 해당 문제의 해설 페이지로 이동 가능하도록 설정
            probButton.addEventListener('click', function() {
                window.location.href = `5_sol.html?problem=${i}`;
            });
        }
    }

    // 총 맞힌 문제 수 업데이트
    document.getElementById('correct-count').textContent = correctCount;
    
    // 총점 계산 (문제당 10점)
    const totalScore = correctCount * 10;
    document.getElementById('tot_score').innerHTML = `<h3>총점: ${totalScore}점</h3>`;
}

// 페이지 로드 시 결과 표시
displayQuizResults();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


});
