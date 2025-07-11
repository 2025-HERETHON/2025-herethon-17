document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const menuItems = menu.querySelectorAll("li");

  // 햄버거 버튼 클릭 시 메뉴 토글
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  // li 클릭 시 해당 li에 active 클래스 적용
  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
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

  // 태그 선택할 때 색상 바뀌는 거
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.addEventListener('click', function () {
      tag.classList.toggle('active');
    });
  });

  // 제목 눌렀을 때, 해당 글 페이지로 이동
  const titles = document.querySelectorAll('.Title');
  titles.forEach(title => {
    title.addEventListener('click', function() {
      setTimeout(function() {
        window.location.href = 'Future_Article.html';
      }, 200);
    });
  });

  // 새글 작성 버튼
  const New = document.querySelector('.new');
  if (New) {
    New.addEventListener('click', function() {
      setTimeout(function() {
        window.location.href = 'Future_write.html';
      }, 200);
    });
  }

  // 🔻🔻🔻 댓글 img 클릭 시 폼 submit 하기 🔻🔻🔻
  const submitImg = document.getElementById("comment-submit");
  const commentForm = document.getElementById("comment-form");

  if (submitImg && commentForm) {
    submitImg.addEventListener("click", function () {
      const input = commentForm.querySelector('input[name="content"]');
      if (input.value.trim() === "") {
        alert("댓글을 입력해주세요!");
        return;
      }
      commentForm.submit();
    });
  }

});
