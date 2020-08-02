export default function arc() {
    this.ctx.beginPath()
    this.ctx.fillStyle = this.vector.c
    this.ctx.arc(this.vector.x, this.vector.y, this.vector.r, 0, Math.PI * 2)
    this.ctx.fill()
}