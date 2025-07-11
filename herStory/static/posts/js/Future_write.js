document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const menuItems = menu.querySelectorAll("li");

  // 햄버거 버튼 클릭 시 메뉴 토글
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  // 메뉴 항목 클릭 시 active 적용
  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      menuItems.forEach(el => el.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // 메뉴 외부 클릭 시 닫기
  document.addEventListener("click", () => {
    menu.classList.remove("active");
  });

  // 메뉴 안쪽 클릭 시 이벤트 전파 방지
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // 태그 선택할 때 색상 바꾸고 체크박스 값 토글
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.addEventListener('click', function (e) {
      e.preventDefault();  // label의 기본 input 동작 막기
      tag.classList.toggle('active');

      // 해당 태그 안에 있는 input 요소 체크 상태 토글
      const input = tag.querySelector('input');
      input.checked = !input.checked;
    });
  });

  // 맨 아래 등록 버튼 눌렀을 때 색상/아이콘 변경
  const uploadButton = document.querySelector('.upload');
  const uploadimg = document.querySelector('.upload-plus');
  uploadButton.addEventListener('click', function() {
    uploadButton.style.backgroundColor = '#91C84F'; 
    uploadimg.src = "../../static/posts/image/Future__Upload_active.svg";
    // form submit은 서버단에서 하니, setTimeout은 생략 가능
  });

  // 작성자 유형 클릭했을 때 체크 이미지 바꾸고 radio 체크
  const checkButtons = document.querySelectorAll('.Hashtag');
  checkButtons.forEach(button => {
    button.addEventListener('click', function() {
      checkButtons.forEach(b => {
        b.querySelector('.checkimg').src = "../../static/posts/image/Future__Check_.svg";
        b.querySelector('input').checked = false;
      });
      button.querySelector('.checkimg').src = "../../static/posts/image/Future__Check_active.svg";
      button.querySelector('input').checked = true;
    });
  });

});
