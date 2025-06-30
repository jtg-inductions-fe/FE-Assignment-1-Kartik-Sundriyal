import Glide from '@glidejs/glide';
const glide = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay: 2500,
    animationDuration: 600,
});

const prevBtn = document.querySelector('.glide__arrow--left');
const nextBtn = document.querySelector('.glide__arrow--right');
const totalSlides = document.querySelectorAll(
    '.glide__slide:not(.glide__slide--clone)',
).length;

function updateArrowStates(index) {
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === totalSlides - 1;
}

glide.on('mount.after', () => {
    updateArrowStates(glide.index);
});

glide.on('run.after', () => {
    updateArrowStates(glide.index);
});

glide.mount();
