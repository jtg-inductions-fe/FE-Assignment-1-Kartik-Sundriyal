document.addEventListener('DOMContentLoaded', () => {
    const footerListControl = document.querySelectorAll(
        '.footer__list-control',
    );

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
        });
    });
});
