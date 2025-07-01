document.addEventListener('DOMContentLoaded', () => {
    const footerListControl = document.querySelectorAll(
        '.footer__list-control',
    );

    footerListControl.forEach((button) => {
        const targetSelector = button.dataset.target;
        const list = document.querySelector(targetSelector);

        button.addEventListener('click', () => {
            list.classList.toggle('footer__list--open');
        });
    });
});
