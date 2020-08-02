export default function draw(callback, frameRate) {
    this = this || {}
    const maxFrameRate = this.maxFrameRate || 60
    const rate = frameRate || maxFrameRate
    const canShowFrame = !(this.currentFrame % Math.floor(maxFrameRate / rate))
    const currentFrame = this.currentFrame || 0

    this.currentFrame = (currentFrame + 1) % maxFrameRate

    if (canShowFrame) callback(this.currentFrame)

    requestAnimationFrame(() => draw.call(this, callback, rate))
}