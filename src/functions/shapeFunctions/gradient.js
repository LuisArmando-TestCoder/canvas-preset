export default function gradient() {
    const colors = this.temporal.colors || this.vector.colors
    const gradient = getGradient.call(this)
    distributeColorsInGradient(colors, gradient)
    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.c.width, this.c.height)
}

function getGradient() {
    return this.ctx.createRadialGradient(
        this.temporal.x || this.vector.x, 
        this.temporal.y || this.vector.y, 
        0,
        this.temporal.x || this.vector.x, 
        this.temporal.y || this.vector.y, 
        this.temporal.radius || this.vector.radius  
    )
}

function distributeColorsInGradient(colors, gradient) {
    const fraction = 1 / colors.length

    colors && colors.forEach((color, i) => {
        const colorStop = ((i + 1) * fraction + i * fraction) / 2
        gradient.addColorStop(colorStop, color)
    })
}