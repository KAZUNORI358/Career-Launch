import { Splide } from '@splidejs/splide';

// about > staffスライダー
export const initializeAboutStaffSlider = () => {
    const sliders = document.querySelectorAll(".js-about-staff-slider");

    if (!sliders) return;

    sliders.forEach((slider) => {
        new Splide(slider, {
            type: "loop",
            focus: 0, // 最初のスライダーを表示
            pagination: false, // ページネーションを非表示
            arrows: false, // 矢印を非表示
            fixedWidth: "285px",
            gap: "40px", // スライダーの間隔
            padding:{left: "172px"},
            autoplay: true,
            interval: 3000,
            breakpoints: {
                768: {
                    fixedWidth: "230px",
                    gap: "32px",
                    padding:{left: "20px"},
                },
            },
        }).mount();
    });
};

// recruit > cultureスライダー
export const initializeRecruitCultureSlider = () => {
    const sliders = document.querySelectorAll(".js-recruit-culture-slider");

    if (!sliders) return;

    sliders.forEach((slider) => {
        new Splide(slider, {
            type: "loop",
            focus: 0,
            pagination: false,
            arrows: false,
            fixedWidth: "350px",
            gap: "32px",
            autoplay: true,
            interval: 3000,
            padding:{left: "112px"},
            breakpoints: {
                700: {
                    perPage: 2,
                    fixedWidth: "223px",
                    gap: "16px",
                    padding:{left: "10px"},
                },
            },
        }).mount();
    });
};