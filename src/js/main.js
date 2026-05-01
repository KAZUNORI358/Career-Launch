import '/styles/style.scss';
import '@splidejs/splide/dist/css/splide.min.css';
import { initializeHamburgerMenu } from './modules/hamburger-menu.js';
import { initializeAboutStaffSlider, initializeRecruitCultureSlider } from './modules/slider.js';

initializeHamburgerMenu();
initializeAboutStaffSlider();
initializeRecruitCultureSlider();