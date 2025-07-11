document.addEventListener('DOMContentLoaded', function() {
    const GoogleLogin = document.querySelector('.Google');
    const KakaoLogin = document.querySelector('.Kakao');

    GoogleLogin.addEventListener('click', function() {
            setTimeout(function() {
            window.location.href = '1_intro.html'; //이건 구글로그인 페이지로 바꿔주시고
        }, 200);
    });

    KakaoLogin.addEventListener('click', function() {
            setTimeout(function() {
            window.location.href = '2_school.html'; //이건 카카오로그인 페이지로 바꿔주시면 됩니다!
        }, 200);
    });
});