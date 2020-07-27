export default function draw(f) {
    if (typeof f === 'function') f()
    requestAnimationFrame(() => draw(f))
}