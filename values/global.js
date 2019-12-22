const c = document.querySelector('canvas');
const globalValues = {
    c,
    ctx: c.getContext('2d'),
    width: () => window.innerWidth,
    height: () => window.innerHeight,
    mouse: () => window.mousePosition
};

export default globalValues;