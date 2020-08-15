import gradient from './shapeFunctions/gradient.js'
import lines from './shapeFunctions/lines.js'
import rect from './shapeFunctions/rect.js'
import arc from './shapeFunctions/arc.js'
import img from './shapeFunctions/img.js'
import txt from './shapeFunctions/txt.js'

export default function render(vector) {
    const shapeFunctions = {
        gradient,
        lines,
        rect,
        arc,
        img,
        txt
    }
    patchTemporalVector.call(this)
    Object.keys(shapeFunctions).forEach(key => {
        shapeFunctions[key] = shapeFunctions[key].bind({...this, vector})
    })
    return shapeFunctions
}

function patchTemporalVector() {
    if (!this.temporal) this.temporal = {}
}