export const initializeHamburgerMenu = () => {
    const menuButtonOpen = document.querySelector(
        ".js-hamburger-menu-button-open"
    );
    const menuButtonClose = document.querySelector(
        ".js-hamburger-menu-button-close"
    );
    const dialogMenu = document.querySelector(".js-hamburger-menu-dialog");
    if (!menuButtonOpen || !menuButtonClose || !dialogMenu) return;

    // メニューを開いたときのキーフレーム
    const showKeyframes = {
        opacity: [0, 1],
        visibility: `visible`,
    };
    // メニューを閉じたときのキーフレーム
    const hideKeyframes = {
        opacity: [1, 0],
        visibility: `hidden`,
    };

    // アニメーションのオプション
    const options = {
        duration: 500,
        easing: `ease`,
        fill: `forwards`,
    };

    // メニューを開く関数
    const openMenu = () => {
        dialogMenu.show();
        dialogMenu.animate(showKeyframes, options);
    };

    // メニューを閉じる関数
    const closeMenu = () => {
        const closeAnimation = dialogMenu.animate(hideKeyframes, options);
        closeAnimation.onfinish = () => {
            dialogMenu.close();
        };
    };

    //OPENメニューボタンを押したときの処理
    menuButtonOpen.addEventListener(`click`, () => {
        openMenu();
    });

    //CLOSEメニューボタンを押したときの処理
    menuButtonClose.addEventListener(`click`, () => {
        closeMenu();
    });

    // escキーを押した場合、メニューを閉じる
    document.addEventListener(`keydown`, (event) => {
        if (event.key === `Escape`) {
            closeMenu();
        }
    });
};
