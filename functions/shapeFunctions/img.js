import getRotation from '../../utils/getRotation.js'

export default function img() {
    this.ctx.save()
    this.ctx.translate(this.vector.x + this.vector.w / 2, this.vector.y + this.vector.h / 2)
    this.ctx.rotate(getRotation(this.vector.rot))
    if (this.vector.img.complete) {
        this.ctx.drawImage(this.vector.img, -this.vector.w / 2, -this.vector.h / 2, this.vector.w, this.vector.h)
    } else {
        this.ctx.fillRect(-this.vector.w / 2, -this.vector.h / 2, this.vector.w, this.vector.h)
    }
    this.ctx.fillStyle = this.vector.c
    this.ctx.restore()
}