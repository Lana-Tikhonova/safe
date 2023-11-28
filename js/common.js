$(document).ready(function () {

    //Открытие и закрытие языка
    $('.language_title').on('click', function () {
        $(this).parent().toggleClass('active');
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest(".language").length) {
            $('.language').removeClass('active');
        }
    });

    //Прокрутка к секции при клике из меню или на стрелку
    $('.arrow_down, .menu a').on('click', function () {
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
    const onScrollHeader = () => {
        const header = $('.header_block_wrapper');
        const sticky = $('.company_block_sticky');
        let prevScroll = $(window).scrollTop();
        let currentScroll;

        $(window).scroll(() => {
            currentScroll = $(window).scrollTop()
            const headerHidden = () => header.hasClass('header_hidden')

            if (currentScroll > prevScroll && !headerHidden()) {
                setTimeout(() => {
                    header.addClass('header_hidden');
                    sticky.removeClass('out')
                }, 0);
            }
            if (currentScroll < prevScroll && headerHidden()) {
                // setTimeout(() => {
                header.removeClass('header_hidden');
                sticky.addClass('out');
                // }, 0);
            }
            prevScroll = currentScroll
        })
    }
    onScrollHeader()

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
        slidesPerView: 'auto',
        // spaceBetween: 20,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: ".partners_btn_next",
            prevEl: ".partners_btn_prev",
        },
        // breakpoints: {
        //         769: {
        //             spaceBetween: 20,
        //         },
        //     },
    });

    //слайдер в блоке Руководство
    var swiperWallet = new Swiper(".administration_slider", {
        slidesPerView: 'auto',
        spaceBetween: 62,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: ".administration_btn_next",
            prevEl: ".administration_btn_prev",
        },
    });

    // счетчик
    class countUp {
        constructor(el) {
            this.el = el;
            this.setVars();
            this.init();
        }

        setVars() {
            this.number = this.el.querySelectorAll("[data-countup-number]");
            this.observerOptions = {
                root: null,
                rootMargin: "0px 0px",
                threshold: 0
            };
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const end = parseFloat(
                        entry.target.dataset.countupNumber.replace(/,/g, "")
                    );
                    const decimals = this.countDecimals(end);
                    if (entry.isIntersecting) {
                        this.iterateValue(entry.target, end, decimals);
                    }
                });
            }, this.observerOptions);
        }

        init() {
            if (this.number.length > 0) {
                this.number.forEach((el) => {
                    this.observer.observe(el);
                });
            }
        }

        iterateValue(el, end, decimals) {
            const start = 0;
            const duration = 5000;
            let startTimestamp = null;

            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const elapsedPercent = (timestamp - startTimestamp) / duration;
                const easedProgress = Math.min(this.easeOutQuint(elapsedPercent), 1);
                let interimNumber = Math.abs(easedProgress * (end - start) + start);
                el.innerHTML = this.formatNumber(interimNumber, decimals);
                if (easedProgress < 1) {
                    window.requestAnimationFrame(step);
                }
            };

            // requestAnimationFrame returns DOMHighResTimeStamp as a callback (used as timestamp)
            window.requestAnimationFrame(step);
        }

        easeOutQuad(x) {
            return 1 - Math.pow(1 - x, 3);
        }

        easeOutQuint(x) {
            return 1 - Math.pow(1 - x, 5);
        }

        countDecimals(val) {
            if (Math.floor(val) === val) return 0;
            return val.toString().split(".")[1].length || 0;
        }

        formatNumber(val, decimals) {
            return val.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
        }
    }

    const dataModules = [...document.querySelectorAll('[data-module="countup"]')];

    dataModules.forEach((element) => {
        element.dataset.module.split(" ").forEach(function () {
            new countUp(element);
        });
    });

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