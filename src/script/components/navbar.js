import trapFocus from '../utils/focusTrap';

document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.header__menubar');
    const navLinks = document.querySelector('.header__links');
    const menuBtn = document.querySelector('.header__hamburger-icon');
    const header = document.querySelector('.header');
    const menuBtnWrapper = document.querySelector('.header__icon-wrapper');

    if (!navMenu || !navLinks || !menuBtn) {
        return;
    }

    let removeFocusTrap = () => {};

    const closeMenu = () => {
        removeFocusTrap();
        document.body.classList.remove('body--no-scroll');
        document
            .querySelector('.body__main')
            .classList.remove('body__main--blur');

        menuBtn.classList.replace('icon-cross', 'icon-hamburger');
        navMenu.classList.remove('header__menubar--visible');
        navLinks.classList.remove('header__links--visible');
        menuBtn.setAttribute('aria-expanded', 'false');
        if (window.matchMedia('(max-width: 1023px)').matches) {
            navMenu.setAttribute('aria-hidden', 'true');
        }
        navLinks.setAttribute('aria-hidden', 'true');
    };

    menuBtn.addEventListener('click', () => {
        const isOpen = menuBtn.classList.contains('icon-cross');

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
            menuBtn.classList.replace('icon-hamburger', 'icon-cross');
            menuBtn.setAttribute('aria-expanded', 'true');
            document.body.classList.add('body--no-scroll');
            document
                .querySelector('.body__main')
                .classList.add('body__main--blur');
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
        if (menuBtn.classList.contains('icon-cross')) {
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

    //Making header sticky
    document.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('header--sticky');
        } else header.classList.remove('header--sticky');
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
