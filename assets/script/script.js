

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

$(function () {
    // =====================================
    // 1. 상품 데이터
    // =====================================

    const CATEGORY_DATA = {
        "딸기": [
            {
                name: "딸기 품은 딸기 삼각이",
                kcal: 314,
                image: "./assets/images/strawberry1.png"
            },
            {
                name: "화이트 청크 딸기 삼각이",
                kcal: 222,
                image: "./assets/images/strawberry2.png"
            },
            {
                name: "딸기 삼각이",
                kcal: 242,
                image: "./assets/images/strawberry3.png"
            },
            {
                name: "초코에 빠진 딸기 삼각이",
                kcal: 250,
                image: "./assets/images/strawberry4.png"
            }
        ],

        "송이": [
            {
                name: "누텔라 헤이즐넛 삼각이",
                kcal: 242,
                image: "./assets/images/choco1.png"
            },
            {
                name: "진정한 타로송이 삼각이",
                kcal: 308,
                image: "./assets/images/choco2.png"
            },
            {
                name: "치즈송이 삼각이",
                kcal: 260,
                image: "./assets/images/choco3.png"
            },
            {
                name: "피스타치오 빼빼로 삼각이",
                kcal: 260,
                image: "./assets/images/choco4.png"
            }
        ],

        "말차": [
            {
                name: "카카오 마차차 삼각이",
                kcal: 235,
                image: "./assets/images/matcha1.png"
            },
            {
                name: "딸기 말차(층층) 삼각이",
                kcal: 220,
                image: "./assets/images/matcha2.png"
            },
            {
                name: "말차나무 초코 숲 삼각이",
                kcal: 216,
                image: "./assets/images/matcha3.png"
            },
            {
                name: "제주 성읍 호말 삼각이",
                kcal: 208,
                image: "./assets/images/matcha4.png"
            }
        ],

        "견과류": [
            {
                name: "로스팅 호지 피칸 삼각이",
                kcal: 220,
                image: "./assets/images/nuts1.png"
            },
            {
                name: "하루견과 삼각이",
                kcal: 231,
                image: "./assets/images/nuts2.png"
            },
            {
                name: "넛츠 초코칩 삼각이",
                kcal: 217,
                image: "./assets/images/nuts3.png"
            },
            {
                name: "솔티 너티 초코뱅 삼각이",
                kcal: 233,
                image: "./assets/images/nuts4.png"
            }
        ]
    };


    // =====================================
    // 2. 기본 설정
    // =====================================

    const FORK_IMAGE = "./assets/images/fork.png";

    const AUTO_SLIDE_TIME = 4000;
    const SLIDE_DISTANCE = 130;

    let selectedCategory = "딸기";
    let currentIndex = 0;
    let autoTimer = null;
    let isSliding = false;


    // =====================================
    // 3. DOM 선택
    // =====================================

    const $buttons = $(".falvor-btn");

    const $productTrack = $(".product-track");
    const $mainProduct = $(".product-img");
    const $mainImage = $(".flavor-scone-img");

    const $title = $(".product-text h3");
    const $kcal = $(".product-text p");

    const $otherImages = $(".other-scone img");


    // left 애니메이션에 필요
    $mainProduct.css({
        position: "relative",
        left: 0,
        opacity: 1
    });


    // =====================================
    // 4. 현재 순서대로 상품 출력
    // =====================================

    function renderProducts(softChange = false) {
        const products = CATEGORY_DATA[selectedCategory];
        const productLength = products.length;

        const mainProduct =
            products[currentIndex % productLength];

        // 메인 스콘 변경
        $mainImage.attr({
            src: mainProduct.image,
            alt: mainProduct.name
        });

        $title.text(mainProduct.name);
        $kcal.text(`100g 당 ${mainProduct.kcal}kcal`);

        // 오른쪽 작은 스콘
        $otherImages.each(function (index) {
            const $image = $(this);

            const nextIndex =
                (currentIndex + index + 1) % productLength;

            const nextProduct = products[nextIndex];

            if (softChange) {
                /*
                 * 위치는 고정한 상태에서
                 * 이미지만 약하게 페이드 변경
                 */
                $image
                    .stop(true, true)
                    .animate(
                        {
                            opacity: 0.15
                        },
                        180,
                        function () {
                            $image.attr({
                                src: nextProduct.image,
                                alt: nextProduct.name
                            });

                            $image.animate(
                                {
                                    opacity: 0.5
                                },
                                250
                            );
                        }
                    );
            } else {
                $image.attr({
                    src: nextProduct.image,
                    alt: nextProduct.name
                });

                $image.css("opacity", 0.5);
            }
        });
    }


    // =====================================
    // 5. 다음 상품으로 슬라이드
    // =====================================

    const $movingScone = $(".flavor-scone-img");

    $movingScone.css({
        position: "relative",
        left: 0,
        opacity: 1
    });

    function moveToNextProduct() {
        if (isSliding) {
            return;
        }

        isSliding = true;

        /*
         * 메인 스콘만 왼쪽으로 밀려나감
         * 오른쪽 작은 스콘은 움직이지 않음
         */
        $mainProduct
            .stop(true, false)
            .animate(
                {
                    left: -SLIDE_DISTANCE,
                    opacity: 0
                },
                700,
                function () {
                    const products = CATEGORY_DATA[selectedCategory];

                    // 다음 상품 번호
                    currentIndex =
                        (currentIndex + 1) % products.length;

                    // 메인 및 오른쪽 이미지 내용 변경
                    renderProducts(true);

                    /*
                     * 새로운 메인 스콘을 오른쪽에 배치
                     */
                    $mainProduct.css({
                        left: SLIDE_DISTANCE,
                        opacity: 0
                    });

                    /*
                     * 메인 스콘만 오른쪽에서 중앙으로 들어옴
                     */
                    $mainProduct.animate(
                        {
                            left: 0,
                            opacity: 1
                        },
                        800,
                        function () {
                            isSliding = false;
                        }
                    );
                }
            );
    }


    // =====================================
    // 6. 자동 슬라이드
    // =====================================

    function startAutoSlide() {
        stopAutoSlide();

        autoTimer = setInterval(function () {
            moveToNextProduct();
        }, AUTO_SLIDE_TIME);
    }

    function stopAutoSlide() {
        clearInterval(autoTimer);
        autoTimer = null;
    }

    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }


    // =====================================
    // 7. 카테고리 버튼 활성화
    // =====================================

    function changeActiveButton($selectedButton) {
        $(".fork-icon").remove();

        // 나머지 카테고리 연하게
        $buttons.css({
            opacity: 0.35,
            fontWeight: 500,
            cursor: "pointer"
        });

        // 선택된 카테고리만 진하게
        $selectedButton.css({
            opacity: 1,
            fontWeight: 700
        });

        const $forkIcon = $("<img>", {
            class: "fork-icon",
            src: FORK_IMAGE,
            alt: ""
        });

        $forkIcon.css({
            width: "28px",
            height: "28px",
            objectFit: "contain",
            marginLeft: "12px",
            position: "relative",
            left: "-10px",
            opacity: 0
        });

        // 포크 파일이 없을 때 깨진 아이콘 숨김
        $forkIcon.on("error", function () {
            $(this).hide();
        });

        $selectedButton.append($forkIcon);

        $forkIcon.animate(
            {
                left: 0,
                opacity: 1
            },
            300
        );
    }


    // =====================================
    // 8. 카테고리 변경
    // =====================================

    function changeCategory(categoryName, $clickedButton) {
        if (!CATEGORY_DATA[categoryName]) {
            return;
        }

        if (selectedCategory === categoryName) {
            return;
        }

        stopAutoSlide();
        changeActiveButton($clickedButton);

        isSliding = true;

        // 메인 스콘만 왼쪽으로 이동
        $movingScone
            .stop(true, false)
            .animate(
                {
                    left: -SLIDE_DISTANCE,
                    opacity: 0
                },
                600,
                function () {
                    selectedCategory = categoryName;
                    currentIndex = 0;

                    const products = CATEGORY_DATA[selectedCategory];
                    const mainProduct = products[0];

                    // 선택된 카테고리의 첫 상품
                    $movingScone.attr({
                        src: mainProduct.image,
                        alt: mainProduct.name
                    });

                    // 글씨는 자리 그대로, 내용만 변경
                    $title.text(mainProduct.name);
                    $kcal.text(`100g 당 ${mainProduct.kcal}kcal`);

                    // 오른쪽 스콘은 위치를 움직이지 않고 이미지 교체
                    $otherImages.each(function (index) {
                        const nextProduct = products[index + 1];

                        $(this).attr({
                            src: nextProduct.image,
                            alt: nextProduct.name
                        });
                    });

                    // 새 스콘을 오른쪽에서 준비
                    $movingScone.css({
                        left: SLIDE_DISTANCE,
                        opacity: 0
                    });

                    // 새 스콘만 원 안으로 들어옴
                    $movingScone.animate(
                        {
                            left: 0,
                            opacity: 1
                        },
                        700,
                        function () {
                            isSliding = false;
                            startAutoSlide();
                        }
                    );
                }
            );
    }


    // =====================================
    // 9. 버튼 클릭
    // =====================================

    $buttons.each(function () {
        const $button = $(this);
        const categoryName = $button.text().trim();

        $button.attr("data-category", categoryName);

        $button.on("click", function () {
            changeCategory(
                categoryName,
                $(this)
            );
        });
    });


    // =====================================
    // 10. 마우스를 올리면 잠시 정지
    // =====================================

    $(".flavor-window").on({
        mouseenter: function () {
            stopAutoSlide();
        },

        mouseleave: function () {
            startAutoSlide();
        }
    });


    // =====================================
    // 11. 최초 실행
    // =====================================

    const $firstButton = $buttons.eq(0);

    changeActiveButton($firstButton);
    renderProducts();
    startAutoSlide();
});