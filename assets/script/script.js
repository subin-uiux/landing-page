

document.addEventListener("DOMContentLoaded", function () {
    const reviewSwiperElement = document.querySelector(".reviewSwiper");
    const reviewWrapper = reviewSwiperElement.querySelector(".swiper-wrapper");

    // 처음 작성한 리뷰 카드 4개 가져오기
    const originalSlides = [...reviewWrapper.children];

    // 리뷰 카드 전체를 두 번 더 복사
    // 4개 → 총 12개
    for (let i = 0; i < 2; i++) {
        originalSlides.forEach(function (slide) {
            const clonedSlide = slide.cloneNode(true);
            reviewWrapper.appendChild(clonedSlide);
        });
    }

    const reviewSwiper = new Swiper(reviewSwiperElement, {
        // CSS에 입력한 카드 너비 사용
        slidesPerView: "auto",

        // 카드 사이 간격
        spaceBetween: 20,

        // 무한 반복
        loop: true,

        // 반복에 사용할 슬라이드를 추가 확보
        loopAdditionalSlides: 20,

        // 숫자가 커질수록 천천히 이동
        speed: 12000,

        autoplay: {
            // 카드 사이에서 기다리지 않음
            delay: 0,

            // 사용자가 건드린 뒤에도 자동재생
            disableOnInteraction: false,

            // 마우스를 올려도 멈추지 않음
            pauseOnMouseEnter: false,

            // 마지막 슬라이드에서도 멈추지 않음
            stopOnLastSlide: false,
        },

        // 마우스나 손가락으로 움직이지 못하게 설정
        allowTouchMove: false,
    });
});

$(function () {
  const $introImg = $(".intro-img");

  function showIntroImage() {
    // 현재 스크롤된 거리
    const scrollTop = $(window).scrollTop();

    // 브라우저 화면 높이
    const windowHeight = $(window).height();

    // intro-img가 문서 위쪽에서 얼마나 떨어져 있는지
    const introTop = $introImg.offset().top;

    // 화면 위에서부터 80% 지점을 기준으로 실행
    const triggerPoint = scrollTop + windowHeight * 0.7;

    

    if (triggerPoint >= introTop) {
      $introImg.addClass("active");

      // 한 번 실행된 후에는 스크롤 검사 종료
      $(window).off("scroll", showIntroImage);
    }
  }

  // 스크롤할 때마다 실행
  $(window).on("scroll", showIntroImage);

  // 새로고침했을 때 이미 화면 안에 있는지도 확인
  showIntroImage();
});