export default function arc() {
    this.ctx.beginPath()
    setArcColor.call(this)
    drawArc.call(this)
    this.ctx.fill()
}

function drawArc() {
    this.ctx.arc(
        this.temporal.x || this.vector.x,
        this.temporal.y || this.vector.y,
        this.temporal.r || this.vector.r,
        0,
        Math.PI * 2
    )
}

function setArcColor() {
    this.ctx.fillStyle = this.temporal.c || this.vector.c
}