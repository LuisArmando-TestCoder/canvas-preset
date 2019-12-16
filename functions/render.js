module.exports = function render(vertex) {
    return {
        lines() {
            // vertex {w = 1, c = '#000', group}
            // vertex.group [{x,y}]
            ctx.beginPath();
            ctx.moveTo(vertex.group[0].x, vertex.group[0].y);
            vertex.group.forEach(({
                x,
                y
            }, i) => {
                if (i) ctx.lineTo(x, y);
            });
            ctx.lineWidth = vertex.w;
            ctx.strokeStyle = vertex.c;
            ctx.stroke();
        },
        rect() {
            ctx.beginPath();
            ctx.save();
            ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
            ctx.rotate(vertex.rot);
            ctx.fillStyle = vertex.c;
            ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
            ctx.restore();
        },
        arc() {
            ctx.beginPath();
            ctx.fillStyle = vertex.c;
            ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI * 2);
            ctx.fill();
        },
        img() {
            ctx.save();
            ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
            ctx.rotate(vertex.rot);
            if (vertex.img.complete) {
                ctx.drawImage(vertex.img, -vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h)
            } else {
                ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
            }
            ctx.fillStyle = vertex.c;
            ctx.restore();
        },
        txt() {
            ctx.beginPath();
            ctx.fillStyle = vertex.c;
            ctx.font = vertex.font;
            ctx.fillText(vertex.txt, vertex.x, vertex.y);
        }
    }
};