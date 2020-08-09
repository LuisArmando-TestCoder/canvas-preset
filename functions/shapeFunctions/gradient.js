export default function gradient() {
    const colors = this.temporal.colors || this.vector.colors
    const gradient = getGradient.call(this)
    distributeColorsInGradient(colors, gradient)
    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.c.width, this.c.height)
}

function getGradient() {
    return this.ctx.createRadialGradient(
        this.temporal.x || this.vector.x, // first circle x
        this.temporal.y || this.vector.y, // first circle y
        0,             // first circle radius
        this.temporal.x || this.vector.x, // second circle x
        this.temporal.y || this.vector.y, // second circle y
        this.temporal.r || this.vector.r  // second circle radius
    )
}

function distributeColorsInGradient(colors, gradient) {
    const fraction = 1 / colors.length

    colors && colors.forEach((color, i) => {
        const colorStop = ((i + 1) * fraction + i * fraction) / 2
        gradient.addColorStop(colorStop, color)
    })
}