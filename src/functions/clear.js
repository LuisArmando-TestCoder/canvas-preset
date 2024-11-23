
export default function clear(color) {
    if (!color) {
        this.ctx.clearRect(0, 0, this.c.width, this.c.height)
    } else if (typeof color === 'string') {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.c.width, this.c.height)
        this.ctx.beginPath()
    }
}