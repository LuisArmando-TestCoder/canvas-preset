const { ctx, c } = require('../values/global');

module.exports = function clear(color) {
    if (!color) {
        ctx.clearRect(0, 0, c.width, c.height);
    } else if (typeof color === 'string') {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.beginPath();
    }
};