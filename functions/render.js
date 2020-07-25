export default function render(vertex) {
    return {
        lines: () => {
            // vertex {w = 1, c = '#000', group}
            // vertex.group [{x,y}]
            this.ctx.beginPath();
            if (vertex.group && vertex.group[0]) {
                this.ctx.moveTo(vertex.group[0].x, vertex.group[0].y);
                vertex.group.forEach(({
                    x,
                    y
                }, i) => {
                    if (i) this.ctx.lineTo(x, y);
                });
            }
            this.ctx.lineWidth = vertex.w;
            this.ctx.strokeStyle = vertex.c;
            this.ctx.stroke();
        },
        rect: () => {
            this.ctx.beginPath();
            this.ctx.save();
            this.ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
            this.ctx.rotate(vertex.rot);
            this.ctx.fillStyle = vertex.c;
            this.ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
            this.ctx.restore();
        },
        arc: () => {
            this.ctx.beginPath();
            this.ctx.fillStyle = vertex.c;
            this.ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI * 2);
            this.ctx.fill();
        },
        img: () => {
            this.ctx.save();
            this.ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
            this.ctx.rotate(vertex.rot);
            if (vertex.img.complete) {
                this.ctx.drawImage(vertex.img, -vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h)
            } else {
                this.ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
            }
            this.ctx.fillStyle = vertex.c;
            this.ctx.restore();
        },
        txt: () => {
            this.ctx.beginPath();
            this.ctx.fillStyle = vertex.c;
            this.ctx.font = vertex.font;
            this.ctx.fillText(vertex.txt, vertex.x, vertex.y);
        }
    }
};