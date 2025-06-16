document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.header__menubar');
    const navLinks = document.querySelector('.header__nav-links');
    const menuBtn = document.querySelector('.header__menu-logo');
    const closeBtn = document.querySelector('.icon-cross');

    menuBtn.addEventListener('click', () => {
        if (window.getComputedStyle(navMenu).position == 'absolute') {
            navMenu.classList.toggle('header__menubar--visible');
        } else navLinks.classList.toggle('header__nav-links--visible');
    });

    document.addEventListener('click', (e) => {
        const clickedInsideSidebar =
            navMenu.contains(e.target) || navLinks.contains(e.target);
        const clickedMenuBtn = menuBtn.contains(e.target);
        const clickedCloseBtn = closeBtn.contains(e.target);

        if ((!clickedInsideSidebar && !clickedMenuBtn) || clickedCloseBtn) {
            if (window.getComputedStyle(navMenu).position == 'absolute') {
                navMenu.classList.remove('header__menubar--visible');
            } else navLinks.classList.remove('header__nav-links--visible');
        }
    });
});
