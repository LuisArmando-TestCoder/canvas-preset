export default function onMouseMove(callback) {
    window.addEventListener('mousemove', e => {
        if (!window.mousePosition) window.mousePosition = {}
        window.mousePosition.x = e.clientX
        window.mousePosition.y = e.clientY
        if (callback) callback(e)
    })
}