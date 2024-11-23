export default function draw(callback, frameRate) {
    const context = (this || {})
    const maxFrameRate = context.maxFrameRate || 60
    const rate = frameRate || maxFrameRate
    const canShowFrame = !(context.currentFrame % Math.floor(maxFrameRate / rate))
    const currentFrame = context.currentFrame || 0

    context.currentFrame = (currentFrame + 1) % maxFrameRate

    if (canShowFrame) callback(context.currentFrame)

    requestAnimationFrame(() => draw.call(context, callback, rate))
}