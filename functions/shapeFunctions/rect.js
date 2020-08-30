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
        this.temporal.color || this.vector.color
    )
}

function rotateRect() {
    this.ctx.rotate(
        getRotation(
            this.temporal.rotation || this.vector.rotation
        )
    )
}

function offsetRectForRotation() {
    this.ctx.translate(
        (this.temporal.x || this.vector.x) +
        (this.temporal.width || this.vector.width) / 2,
        (this.temporal.y || this.vector.y) +
        (this.temporal.height || this.vector.height) / 2
    )
}

function drawRect() {
    this.ctx.fillRect(
        -(this.temporal.width || this.vector.width) / 2,
        -(this.temporal.height || this.vector.height) / 2,
        this.temporal.width || this.vector.width,
        this.temporal.height || this.vector.height
    )
}