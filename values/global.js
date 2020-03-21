let c = document.querySelector('canvas');
const globalValues = {
    c,
    ctx: c ? c.getContext('2d') : null,
    width: () => window.innerWidth,
    height: () => window.innerHeight,
    mouse: () => window.mousePosition,
};

export default globalValues;