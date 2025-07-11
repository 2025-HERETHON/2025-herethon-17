document.addEventListener('DOMContentLoaded', function() {
    const schoolButtons = document.querySelectorAll('.school-selction button');
    const nextButton = document.querySelector('.next'); /// mj - 이미지 바꾸기 data-속성
    const unionImage = document.querySelector('.union'); 
    
    let selectedButton = null;
    const hiddenInput = document.getElementById('selectedSchoolId'); // mj - hidden input
    
    schoolButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (selectedButton) { 
                selectedButton.style.backgroundColor = '#f5ffef';
            }   // 이전에 선택된 버튼 있을 수도 있으니가.. 원래 색상으로 되돌리기
            this.style.backgroundColor = '#91C84F'; // 확인후 현재 버튼 상태변경
            selectedButton = this;
            // mj - 선택된 학교의 hidden ID를 hidden input에 넣기
            hiddenInput.value = button.dataset.schoolId;
        });
    });
    
    nextButton.addEventListener('click', function() {
        if (!selectedButton) {
            alert("학교를 선택해주세요."); // mj - 선택 안했을 때 경고 메시지 추가
            return; // 다음 페이지로 이동 X
        } // 경고 메시지 표시? 할 필요까진 없겠죠..? 디자인이 없길래 안했습니다
        
        nextButton.style.backgroundColor = '#91C84F'; 
        const unionImage = document.querySelector('.union'); // mj - 이미지 바꾸기 data-속성
    
        
        setTimeout(function () {
        document.getElementById('schoolForm').submit(); // mj - form 제출하도록 수정
    }, 200);
    });

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