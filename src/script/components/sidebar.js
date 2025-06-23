import trapFocus from '../utils/focusTrap';

document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.header__menubar');
    const navLinks = document.querySelector('.header__nav-links');
    const menuBtn = document.querySelector('.header__hamburger-icon');

    if (!navMenu || !navLinks || !menuBtn) {
        return;
    }

    let removeFocusTrap = () => {};

    menuBtn.addEventListener('click', () => {
        const isOpen = menuBtn.classList.contains('icon-cross');

        if (isOpen) {
            menuBtn.classList.remove('icon-cross');
            menuBtn.classList.add('icon-hamburger');
            navMenu.classList.remove('header__menubar--visible');
            navLinks.classList.remove('header__nav-links--visible');
            if (window.matchMedia('(max-width: 1023px)').matches) {
                navMenu.setAttribute('aria-hidden', 'true');
            }
            navLinks.setAttribute('aria-hidden', 'true');
            removeFocusTrap();
            document.body.classList.remove('body--no-scroll');
            document
                .querySelector('.body__main')
                .classList.remove('body__main--blur');
        } else {
            if (window.matchMedia('(max-width: 1023px)').matches) {
                navMenu.classList.add('header__menubar--visible');
                removeFocusTrap = trapFocus(navMenu);
            } else {
                navLinks.classList.toggle('header__nav-links--visible');
                removeFocusTrap = trapFocus(navLinks);
            }
            navLinks.setAttribute('aria-hidden', 'false');
            navMenu.setAttribute('aria-hidden', 'false');

            menuBtn.classList.add('icon-cross');
            menuBtn.classList.remove('icon-hamburger');
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
            if (window.matchMedia('(max-width: 1023px)').matches) {
                navMenu.classList.remove('header__menubar--visible');
            } else navLinks.classList.remove('header__nav-links--visible');

            menuBtn.classList.remove('icon-cross');
            menuBtn.classList.add('icon-hamburger');
            menuBtn.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
            navLinks.setAttribute('aria-hidden', 'true');
            removeFocusTrap();
            document.body.classList.remove('body--no-scroll');
            document
                .querySelector('.body__main')
                .classList.remove('body__main--blur');
        }
    });

    const mobile = window.matchMedia('(max-width: 1024px)');
    mobile.addEventListener('change', () => {
        if (menuBtn.classList.contains('icon-cross')) {
            navMenu.classList.add('header__menubar--visible');
            navLinks.classList.add('header__nav-links--visible');
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
});
