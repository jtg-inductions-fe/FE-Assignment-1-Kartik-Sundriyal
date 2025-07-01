import Glide from '@glidejs/glide';

const GLIDE_CONFIG = {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay: 2000,
    animationDuration: 600,
};

const glide = new Glide('.glide', GLIDE_CONFIG);

glide.mount();
