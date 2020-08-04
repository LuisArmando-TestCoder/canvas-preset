import getRotation from '../../utils/getRotation.js'

export default function rect() {
    this.ctx.beginPath()
    this.ctx.save()
    this.ctx.translate(this.vector.x + this.vector.w / 2, this.vector.y + this.vector.h / 2)
    this.ctx.rotate(getRotation(this.vector.rot))
    this.ctx.fillStyle = this.vector.c
    this.ctx.fillRect(-this.vector.w / 2, -this.vector.h / 2, this.vector.w, this.vector.h)
    this.ctx.restore()
}