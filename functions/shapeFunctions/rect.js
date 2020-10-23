import getRotation from '../../utils/getRotation.js'

export default function rect() {
    this.ctx.beginPath()
    this.ctx.save()
    offsetRectForRotation.call(this)
    rotateRect.call(this)
    setRectColor.call(this)
    const rectOffsets = getRectOffsets.call(this)
    setRectStroke.call(this, rectOffsets)
    drawRect.call(this, rectOffsets)
    this.ctx.restore()
}

function getRectOffsets() {
    return [
        -(this.temporal.width || this.vector.width) / 2,
        -(this.temporal.height || this.vector.height) / 2,
        this.temporal.width || this.vector.width,
        this.temporal.height || this.vector.height
    ]
}

function setRectStroke(rectOffsets) {
    this.ctx.strokeStyle =  this.temporal.border && this.temporal.border.color ||
                            this.vector.border &&
                            this.vector.border.color
    this.ctx.lineWidth =    this.temporal.border &&
                            this.temporal.border.thickness ||
                            this.vector.border &&
                            this.vector.border.thickness
    if (this.temporal.border || this.vector.border) {
        this.ctx.strokeRect(...rectOffsets);
    }
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

function drawRect(rectOffsets) {
    this.ctx.fillRect(...rectOffsets)
}