// $(window).on('load', function () {
//     $('main').removeClass('load')
// });
$(document).ready(function () {

    $('.mobile_menu_btn').on('click', function () {
        $(this).toggleClass('active');
        $('.mobile_menu').toggleClass('active');
        $('body').toggleClass('locked');
    });

    //Открытие и закрытие языка
    $('.language_title').on('click', function () {
        $(this).parent().toggleClass('active');
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest(".language").length) {
            $('.language').removeClass('active');
        }
    });

    AOS.init({
        easing: 'ease-in-out',
        delay: 100,
        once: true,
        duration: 700,
        offset: 100,
        // disable: 'mobile'
    });

    //Прокрутка к секции при клике из меню или на стрелку
    $('.arrow_down, .menu a').on('click', function (e) {
        e.preventDefault();
        let href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(href).offset().top
        }, 1000);

    });

    //Скролл к верху страницы
    $('.scrollup').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    //faq
    $(".faq_item_btn").click(function () {
        $('.faq_item_btn').not(this).parent().removeClass('active');
        $('.faq_item_btn').not(this).next().slideUp("ease-out")

        $(this).parent().toggleClass('active');
        $(this).next().slideToggle("ease-out");
    })

    //Скрыть/показать хедер при прокрутке
    let prevScroll = $(window).scrollTop();

    const header = document.querySelector('header');
    const headerElem = document.querySelector('.header_elem');
    const sticky = document.querySelector('.company_block_sticky');
    window.addEventListener('scroll', e => {
        if (window.scrollY > headerElem.clientHeight) {
            header.classList.add('fix')
        } else {
            header.classList.remove('fix')
        }

        let currentScroll;
        currentScroll = $(window).scrollTop()
        console.log(currentScroll < prevScroll);
        if (currentScroll < prevScroll && header.classList.contains('fix')) {
            header.classList.add('fix-on-scroll');
            sticky.classList.add('out');
        }
        if (currentScroll > prevScroll && header.classList.contains('fix')) {
            header.classList.remove('fix-on-scroll');
            sticky.classList.remove('out');
        }
        prevScroll = currentScroll
    })

    //слайдер в блоке результат
    var swiperWallet = new Swiper(".result_slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        effect: "fade",
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });

    //слайдер в блоке партнеры
    var swiperWallet = new Swiper(".partners_slider", {
        slidesPerView: 2,
        // spaceBetween: 20,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: ".partners_btn_next",
            prevEl: ".partners_btn_prev",
        },
        breakpoints: {
            577: {
                slidesPerView: 3,
            },
            1101: {
                slidesPerView: 4,
            },
        },
    });

    //слайдер в блоке Руководство
    var swiperWallet = new Swiper(".administration_slider", {
        slidesPerView: 'auto',
        spaceBetween: 35,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: ".administration_btn_next",
            prevEl: ".administration_btn_prev",
        },
        breakpoints: {
            577: {
                spaceBetween: 40,
            },
            1101: {
                spaceBetween: 62,
            },
        },
    });

    // счетчик
    var counters = document.querySelectorAll('.number span'),
        len = counters.length,
        duration = 5000;
    $.extend($.easing, {
        easing: function (x, t, b, c, d) {
            return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
    });

    // Animation
    function animate() {
        var x, number;

        if (len !== 0) {
            len -= 1;
        }

        x = counters[len];
        number = 'number' + len;


        // Numbers
        $({
            number: counters[len].getAttribute('data-from')
        }).animate({
            number: counters[len].getAttribute('data-to')
        }, {
            duration: duration,
            easing: 'easeInCubic',
            fade: true,
            queue: false,
            step: function (a) {
                a = Math.round(a);
                a = String(a);
                a = a.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                $(x).html(a);
            }
        });
    }

    function showAnimation() {
        var i;
        for (i = 0; i < 3; i += 1) {
            animate(i);
        }
    }

    var section = document.querySelector('.countup');
    var hasEntered = false;

    $(window).scroll(function () {
        var shouldAnimate = (window.scrollY + window.innerHeight) >= section.offsetTop + 100;

        if (shouldAnimate && !hasEntered) {
            hasEntered = true;
            showAnimation();
        }
    }).trigger("scroll");;


    // modals
    const body = document.querySelector('body');
    let getScrollWidth = () => window.innerWidth - document.documentElement.offsetWidth;
    let browserScrollWidth = getScrollWidth();

    const modalButton = document.querySelectorAll(".modal-button");
    modalButton.forEach(modalBtn => {
        const modal = document.querySelector(modalBtn.hash);
        if (modal) {
            modalBtn.addEventListener("click", function (e) {
                e.preventDefault();
                modal.hidden = false;
                body.classList.add('locked');
                if (getScrollWidth() == 0) {
                    body.style.paddingRight = `${browserScrollWidth}px`;
                }
            });

            modal.addEventListener("click", function (e) {
                const hasClickedOutside = !e.target.closest(".modal-content");
                const hasClickedCloseButton = e.target.closest(".modal .close");

                if (hasClickedOutside || hasClickedCloseButton) {
                    modal.classList.add("is-closing");

                    modal.addEventListener("animationend", () => hideModal(modal), {
                        once: true
                    });
                }
            });

            function hideModal(modal) {
                modal.hidden = true;
                modal.classList.remove("is-closing");
                body.classList.remove('locked');
                body.style.paddingRight = ``;
            }
        }

    })


});