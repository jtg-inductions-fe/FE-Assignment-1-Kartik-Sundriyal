import trapFocus from '../utils/focusTrap';

document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.header__menubar');
    const navLinks = document.querySelector('.header__links');
    const menuBtn = document.querySelector('.header__icon-wrapper');
    const hamIcon = document.querySelector('.header__hamburger-icon');
    const menuBtnWrapper = document.querySelector('.header__icon-wrapper');
    const bodyMain = document.querySelector('.body__main');

    if (!navMenu || !navLinks || !menuBtn) {
        return;
    }

    let removeFocusTrap = () => {};

    const closeMenu = () => {
        removeFocusTrap();
        document.body.classList.remove('body--no-scroll');
        bodyMain.classList.remove('body__main--blur');
        hamIcon.classList.replace('icon-cross', 'icon-hamburger');
        navMenu.classList.remove('header__menubar--visible');
        navLinks.classList.remove('header__links--visible');
        menuBtn.setAttribute('aria-expanded', 'false');
        if (window.matchMedia('(max-width: 1023px)').matches) {
            navMenu.setAttribute('aria-hidden', 'true');
        }
        navLinks.setAttribute('aria-hidden', 'true');
    };

    menuBtn.addEventListener('click', () => {
        const isOpen = hamIcon.classList.contains('icon-cross');

        if (isOpen) {
            closeMenu();
        } else {
            if (window.matchMedia('(max-width: 1023px)').matches) {
                navMenu.classList.add('header__menubar--visible');
                removeFocusTrap = trapFocus(navMenu, closeMenu, menuBtnWrapper);
            } else {
                navLinks.classList.add('header__links--visible');
                removeFocusTrap = trapFocus(
                    navLinks,
                    closeMenu,
                    menuBtnWrapper,
                );
            }
            navLinks.setAttribute('aria-hidden', 'false');
            navMenu.setAttribute('aria-hidden', 'false');
            hamIcon.classList.replace('icon-hamburger', 'icon-cross');
            menuBtn.setAttribute('aria-expanded', 'true');
            document.body.classList.add('body--no-scroll');
            bodyMain.classList.add('body__main--blur');
        }
    });

    document.addEventListener('click', (e) => {
        const clickedInsideSidebar =
            navMenu.contains(e.target) || navLinks.contains(e.target);
        const clickedMenuBtn = menuBtn.contains(e.target);

        if (!clickedInsideSidebar && !clickedMenuBtn) {
            closeMenu();
        }
    });

    const mobile = window.matchMedia('(max-width: 1024px)');
    mobile.addEventListener('change', () => {
        if (hamIcon.classList.contains('icon-cross')) {
            navMenu.classList.add('header__menubar--visible');
            navLinks.classList.add('header__links--visible');
            navMenu.setAttribute('aria-hidden', 'false');
            navLinks.setAttribute('aria-hidden', 'false');
        }
    });

    const desktop = window.matchMedia('(min-width: 1440px)');
    desktop.addEventListener('change', (e) => {
        if (e.matches) {
            navMenu.setAttribute('aria-hidden', 'false');
            navLinks.setAttribute('aria-hidden', 'false');
        }
    });

    requestAnimationFrame(() => {
        document
            .querySelector('.header__links')
            .classList.add('header__links--is-loaded');
        document
            .querySelector('.header__menubar')
            .classList.add('header__menubar--is-loaded');
    });
});
