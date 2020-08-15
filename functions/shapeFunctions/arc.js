export default function arc() {
    this.ctx.beginPath()
    setArcColor.call(this)
    drawArc.call(this)
    this.ctx.fill()
    if (this.vector.border || this.temporal.border) {
        setArcStroke.call(this)
    }
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

function getBorderKey(key) {
    return this.temporal.border &&
        this.temporal.border[key] ||
        this.vector.border &&
        this.vector.border[key]
}

function setArcStroke() {
    const color = getBorderKey.call(this, 'c')
    const strokeWidth = getBorderKey.call(this, 'w')
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = strokeWidth
    this.ctx.stroke()
}

function setArcColor() {
    this.ctx.fillStyle = this.temporal.c || this.vector.c
}