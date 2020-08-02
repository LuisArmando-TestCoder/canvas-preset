export default function txt() {
    this.ctx.beginPath()
    this.ctx.fillStyle = this.vector.c
    this.ctx.font = this.vector.font
    this.ctx.fillText(this.vector.txt, this.vector.x, this.vector.y)
}