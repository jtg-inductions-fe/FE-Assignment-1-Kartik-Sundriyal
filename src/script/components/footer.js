document.addEventListener('DOMContentLoaded', () => {
    const footerListControl = document.querySelectorAll(
        '.footer__list-control',
    );

    const footerLists = document.querySelectorAll('.footer__list');
    const arrowDownIcons = document.querySelectorAll(
        '.footer__list-control-arrow',
    );

    function footerDropdownButtonsToggle(toggle) {
        footerListControl.forEach((button) => {
            button.disabled = toggle;
        });
    }

    footerListControl.forEach((button) => {
        const targetSelector = button.dataset.target;
        const arrowSelector = button.dataset.arrow;
        const list = document.querySelector(targetSelector);
        const arrow = document.querySelector(arrowSelector);

        if (!list || !arrow) {
            return;
        }

        button.addEventListener('click', () => {
            list.classList.toggle('footer__list--open');
            arrow.classList.toggle('footer__list-control-arrow--open');

            const isOpen = list.classList.contains('footer__list--open');
            button.setAttribute('aria-expanded', isOpen);
            list.setAttribute('aria-hidden', !isOpen);
        });
    });

    //Changing the disabled state of footer buttons on changing the viewport from mobile to larger screens.
    const tablet = window.matchMedia('(min-width: 1024px)');
    if (tablet.matches) {
        footerDropdownButtonsToggle(true);
    }
    tablet.addEventListener('change', (e) => {
        if (e.matches) {
            footerDropdownButtonsToggle(true);
            footerLists.forEach((list) => {
                list.classList.remove('footer__list--open');
            });
            arrowDownIcons.forEach((arrow) => {
                arrow.classList.remove('footer__list-control-arrow--open');
            });
        } else {
            footerDropdownButtonsToggle(false);
        }
    });
});
