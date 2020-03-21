import global from '../values/global.js';

export default function clear(color) {
    if (!color) {
        global.ctx.clearRect(0, 0, global.c.width, global.c.height);
    } else if (typeof color === 'string') {
        global.ctx.fillStyle = color;
        global.ctx.fillRect(0, 0, global.c.width, global.c.height);
        global.ctx.beginPath();
    }
};