import global from '../values/global.js';

export default function render(vertex) {
    return {
        lines() {
            // vertex {w = 1, c = '#000', group}
            // vertex.group [{x,y}]
            global.ctx.beginPath();
            global.ctx.moveTo(vertex.group[0].x, vertex.group[0].y);
            vertex.group.forEach(({
                x,
                y
            }, i) => {
                if (i) global.ctx.lineTo(x, y);
            });
            global.ctx.lineWidth = vertex.w;
            global.ctx.strokeStyle = vertex.c;
            global.ctx.stroke();
        },
        rect() {
            global.ctx.beginPath();
            global.ctx.save();
            global.ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
            global.ctx.rotate(vertex.rot);
            global.ctx.fillStyle = vertex.c;
            global.ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
            global.ctx.restore();
        },
        arc() {
            global.ctx.beginPath();
            global.ctx.fillStyle = vertex.c;
            global.ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI * 2);
            global.ctx.fill();
        },
        img() {
            global.ctx.save();
            global.ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
            global.ctx.rotate(vertex.rot);
            if (vertex.img.complete) {
                global.ctx.drawImage(vertex.img, -vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h)
            } else {
                global.ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
            }
            global.ctx.fillStyle = vertex.c;
            global.ctx.restore();
        },
        txt() {
            global.ctx.beginPath();
            global.ctx.fillStyle = vertex.c;
            global.ctx.font = vertex.font;
            global.ctx.fillText(vertex.txt, vertex.x, vertex.y);
        }
    }
};