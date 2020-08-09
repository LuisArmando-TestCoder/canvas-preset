export default function txt() {
    this.ctx.beginPath()
    setTextColor.call(this)
    setTextFont.call(this)
    setText.call(this)
}

function setText() {
    this.ctx.fillText(
        this.temporal.txt || this.vector.txt, 
        this.temporal.x || this.vector.x, 
        this.temporal.y || this.vector.y
    )
}

function setTextFont() {
    this.ctx.font = this.temporal.font || this.vector.font
}

function setTextColor() {
    this.ctx.fillStyle = this.temporal.c || this.vector.c
}