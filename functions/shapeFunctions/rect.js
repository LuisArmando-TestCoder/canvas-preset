import getRotation from '../../utils/getRotation.js'

export default function rect() {
    this.ctx.beginPath()
    this.ctx.save()
    offsetRectForRotation.call(this)
    rotateRect.call(this)
    setRectColor.call(this)
    drawRect.call(this)
    this.ctx.restore()
}

function setRectColor() {
    this.ctx.fillStyle = (
        this.temporal.c || this.vector.c
    )
}

function rotateRect() {
    this.ctx.rotate(
        getRotation(
            this.temporal.rot || this.vector.rot
        )
    )
}

function offsetRectForRotation() {
    this.ctx.translate(
        (this.temporal.x || this.vector.x) +
        (this.temporal.w || this.vector.w) / 2,
        (this.temporal.y || this.vector.y) +
        (this.temporal.h || this.vector.h) / 2
    )
}

function drawRect() {
    this.ctx.fillRect(
        -(this.temporal.w || this.vector.w) / 2,
        -(this.temporal.h || this.vector.h) / 2,
        this.temporal.w || this.vector.w,
        this.temporal.h || this.vector.h
    )
}