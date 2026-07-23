//헤더
const header = document.querySelector(".header");

let lastScrollY = window.scrollY;
let scrollReady = false;


// 새로고침하거나 이전 페이지에서 돌아왔을 때
window.addEventListener("pageshow", () => {
    // 헤더를 무조건 표시
    header.classList.remove("hide");

    // 브라우저가 스크롤 위치를 복원한 다음
    // 현재 위치를 기준점으로 다시 저장
    setTimeout(() => {
        lastScrollY = window.scrollY;
        scrollReady = true;
    }, 100);
});


window.addEventListener("scroll", () => {
    // 페이지 로딩 직후 발생하는 스크롤 이벤트는 무시
    if (!scrollReady) return;

    const currentScrollY = window.scrollY;

    // 페이지 맨 위에서는 항상 헤더 표시
    if (currentScrollY <= 0) {
        header.classList.remove("hide");
    }

    // 아래로 스크롤하면 숨기기
    else if (currentScrollY > lastScrollY) {
        header.classList.add("hide");
    }

    // 위로 스크롤하면 보이기
    else {
        header.classList.remove("hide");
    }

    lastScrollY = currentScrollY;
});


// 리뷰카드

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

        // 기본값: 768px 미만에서 카드 사이 간격
        spaceBetween: 12,

        // 반응형 설정
        breakpoints: {
            // 화면 너비가 768px 이상일 때
            768: {
                spaceBetween: 16,
            },

            1024: {
                spaceBetween: 16,
            }
        },

        // 무한 반복
        loop: true,

        // 반복에 사용할 슬라이드를 추가 확보
        loopAdditionalSlides: 30,

        // 숫자가 커질수록 천천히 이동
        speed: 12000,

        autoplay: {
            // 카드 사이에서 기다리지 않음
            delay: 0,

            // 사용자가 건드린 뒤에도 자동재생
            disableOnInteraction: false,

            // 마우스를 올려도 멈추지 않음
            pauseOnMouseEnter: true,

            // 마지막 슬라이드에서도 멈추지 않음
            stopOnLastSlide: false,
        },

        // 마우스나 손가락으로 움직이지 못하게 설정
        allowTouchMove: false,
    });

});

var swiper = new Swiper('.checkSwiper', {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

var swiper = new Swiper('.reviewSwiper', {
    speed: 7000,
    loop: true,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        reverseDirection: false,
    },
    slidesPerView: 'auto',
    // centeredSlides: true,
    spaceBetween: 30,

    pagination: {
        clickable: true,
    },
});






// 모바일햄버거바

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

function closeMenu() {
    menuBtn.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
}

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", closeMenu);

document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});



// 메뉴
var swiper = new Swiper('.menuSwiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: true,
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3.5,
            spaceBetween: 30,
        },
    },
});