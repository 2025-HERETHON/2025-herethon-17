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
