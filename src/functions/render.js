import gradient from './shapeFunctions/gradient.js'
import lines from './shapeFunctions/lines.js'
import image from './shapeFunctions/image.js'
import rect from './shapeFunctions/rect.js'
import text from './shapeFunctions/text.js'
import arc from './shapeFunctions/arc.js'

export default function render(vector) {
    const shapeFunctions = {
        gradient,
        lines,
        image,
        rect,
        text,
        arc,
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