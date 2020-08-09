import getRotation from '../../utils/getRotation.js'

export default function img() {
    this.ctx.save()
    offsetImage.call(this)
    setImageRotation.call(this)
    if (this.vector.img.complete) {
        drawImage.call(this)
    } else {
        drawEmptyRect.call(this)
    }
    this.ctx.fillStyle = (this.temporal.c || this.vector.c)
    this.ctx.restore()
}

function drawEmptyRect() {
    this.ctx.fillRect(
        -(this.temporal.w || this.vector.w) / 2,
        -(this.temporal.h || this.vector.h) / 2,
        this.temporal.w || this.vector.w,
        this.temporal.h || this.vector.h
    )
}

function drawImage() {
    this.ctx.drawImage(
        this.temporal.img || this.vector.img,
        -(this.temporal.w || this.vector.w) / 2,
        -(this.temporal.h || this.vector.h) / 2,
        this.temporal.w || this.vector.w,
        this.temporal.h || this.vector.h
    )
}

function setImageRotation() {
    this.ctx.rotate(
        getRotation(
            this.temporal.rot || this.vector.rot
        )
    )
}

function offsetImage() {
    this.ctx.translate(
        (this.temporal.x || this.vector.x) +
        (this.temporal.w || this.vector.w) / 2,
        (this.temporal.y || this.vector.y) +
        (this.temporal.h || this.vector.h) / 2
    )
}