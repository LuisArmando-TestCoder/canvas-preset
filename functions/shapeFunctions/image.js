import getRotation from '../../utils/getRotation.js'

export default function image() {
    this.ctx.save()
    offsetImage.call(this)
    setImageRotation.call(this)
    if (this.vector.image.complete) {
        drawImage.call(this)
    } else {
        drawEmptyRect.call(this)
    }
    this.ctx.fillStyle = (this.temporal.color || this.vector.color)
    this.ctx.restore()
}

function drawEmptyRect() {
    this.ctx.fillRect(
        -(this.temporal.width || this.vector.width) / 2,
        -(this.temporal.height || this.vector.height) / 2,
        this.temporal.width || this.vector.width,
        this.temporal.height || this.vector.height
    )
}

function drawImage() {
    this.ctx.drawImage(
        this.temporal.image || this.vector.image,
        -(this.temporal.width || this.vector.width) / 2,
        -(this.temporal.height || this.vector.height) / 2,
        this.temporal.width || this.vector.width,
        this.temporal.height || this.vector.height
    )
}

function setImageRotation() {
    this.ctx.rotate(
        getRotation(
            this.temporal.rotation || this.vector.rotation
        )
    )
}

function offsetImage() {
    this.ctx.translate(
        (this.temporal.x || this.vector.x) +
        (this.temporal.width || this.vector.width) / 2,
        (this.temporal.y || this.vector.y) +
        (this.temporal.height || this.vector.height) / 2
    )
}