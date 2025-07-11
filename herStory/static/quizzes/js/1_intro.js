document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.querySelector('.next');
    const unionImage = document.querySelector('.union'); // mj - 이미지 바꾸기 data-속성
    
    nextButton.addEventListener('click', function() {
        nextButton.style.backgroundColor = '#91C84F'; //배경색 변경!
        //const unionImage = document.querySelector('.union'); // mj - 이미지 바꾸기 data-속성
    //이미지색 변경!
        unionImage.src = unionImage.dataset.activeSrc; // mj - 이미지 바꾸기 data-속성
        
        // 약간.. 지연 후에 이동
        setTimeout(function() {
            window.location.href = schoolSelectionUrl; // mj - django 템플릿으로 변경
        }, 200);
    });
});

