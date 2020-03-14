import global from '../values/global.js';

const { ctx, c } = global;

export default function clear(color) {
    if (!color) {
        ctx.clearRect(0, 0, c.width, c.height);
    } else if (typeof color === 'string') {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.beginPath();
    }
};