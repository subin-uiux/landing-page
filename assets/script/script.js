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