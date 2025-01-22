const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.documentElement.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`);

const setFullHeight = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
};

window.addEventListener('resize', setFullHeight);
setFullHeight();