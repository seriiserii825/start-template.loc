jQuery(document).ready(function ($) {
    const tabs = document.querySelector('.tabs');
    if (tabs) {
        isTabs();
    }

    function isTabs() {
        const tabs_items = document.querySelectorAll('.tabs__item');
        const tabs_wraps = document.querySelectorAll('.tabs__wrap');
        tabs_items.forEach((item, index) => {
            item.addEventListener('click', function () {
                resetTabsItemsActive();
                resetTabsContentActive();
                item.classList.add('active');
                setTabsWrapActive(index);
            })
        })
        function resetTabsItemsActive() {
            tabs_items.forEach((item, index) => {
                item.classList.remove('active');
            })
        }
        function resetTabsContentActive() {
            tabs_wraps.forEach((item, index) => {
                item.classList.remove('active');
            })
        }
        function setTabsWrapActive(index) {
            tabs_wraps[index].classList.add('active');
        }
    }
    $('.accordion__text').eq(0).show();
    $('.accordion__title').each(function () {

        $(this).on('click', function () {
            const title = $(this);
            const item = title.closest('.accordion__item');
            const text = item.find('.accordion__text');
            if (item.hasClass('active')) {
                item.removeClass('active');
                text.slideUp();
            } else {
                removeActive();
                item.addClass('active');
                text.slideDown();
            }
        });
    });
    function removeActive() {
        $('.accordion__item').removeClass('active');
        $('.accordion__text').slideUp();
    }
    const slider = $(".studies__wrap")

    if (slider) {
        studiesSlider()
    }

    function studiesSlider() {
        slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 1000,
            arrows: false,
            dots: false,
            variableWidth: true
        })
        const studies__arrow_prev = $('.studies__arrow--prev')
        const studies__arrow_next = $('.studies__arrow--next')
        studies__arrow_prev.on('click', function () {
            slider.slick('slickPrev')
        })
        studies__arrow_next.on('click', function () {
            slider.slick('slickNext')
        })
    }

    const plans = document.querySelector('.plans');
    if (plans) {
        isPlans();
    }
    function isPlans() {

        const plans_btn = document.querySelectorAll('.plans__btn');
        const plans_wraps = document.querySelectorAll('.plans__wrap');
        plans_btn.forEach((item, index) => {
            item.addEventListener('click', function () {
                resetTabsItemsActive();
                resetTabsContentActive();
                item.classList.add('active');
                setTabsWrapActive(index);
            })
        })
        function resetTabsItemsActive() {
            plans_btn.forEach((item, index) => {
                item.classList.remove('active');
            })
        }
        function resetTabsContentActive() {
            plans_wraps.forEach((item, index) => {
                item.classList.remove('active');
            })
        }
        function setTabsWrapActive(index) {
            plans_wraps[index].classList.add('active');
        }
    }

    const slider_single = $(".comment__wrap");

    if (slider_single) {
        commentSlider()
    }

    function commentSlider() {
        slider_single.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            arrows: false,
            dots: false,
            variableWidth: true
        })
        const comment_arrow_prev = $('.comment__arrow--prev')
        const comment_arrow_next = $('.comment__arrow--next')
        comment_arrow_prev.on('click', function () {
            slider_single.slick('slickPrev')
        })
        comment_arrow_next.on('click', function () {
            slider_single.slick('slickNext')
        })
    }
});
