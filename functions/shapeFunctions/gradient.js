function distributeColorsInGradient(colors, gradient) {
    const fraction = 1 / colors.length

    colors && colors.forEach((color, i) => {
        const colorStop = ((i + 1) * fraction + i * fraction) / 2
        gradient.addColorStop(colorStop, color)
    })
}

export default function gradient() {
    const {colors} = this.vector
    const gradient = this.ctx.createRadialGradient(
        this.vector.x, // first circle x
        this.vector.y, // first circle y
        0,             // first circle radius
        this.vector.x, // second circle x
        this.vector.y, // second circle y
        this.vector.r  // second circle radius
    )
    distributeColorsInGradient(colors, gradient)
    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.c.width, this.c.height)
}