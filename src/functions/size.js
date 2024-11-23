import upperFirst from '../utils/upperFirst.js'

export default function size(props = {}) {
    const dimensionKeys = ['width', 'height']

    dimensionKeys.forEach(key => {
        if (!props[key]) props[key] = window[`inner${upperFirst(key)}`]

        const innerAxis = () => window[`inner${upperFirst(key)}`]
        let value = props[key]

        if (value === innerAxis()) {
            // If value is -> key: x
            // ... and x == window[`inner${upperFirst(key)}`]
            // ... then value = () => window[`inner${upperFirst(key)}`]
            value = innerAxis
        } else if (typeof value !== 'function') {
            // If value is -> key: x
            // ... and x != window[`inner${upperFirst(key)}`]
            // ... then value = () => props[key]
            value = () => props[key]
        }

        // If value is -> key: () => x
        // ... and (() => x) != window[`inner${upperFirst(key)}`]
        this.c[key] = value()

        window.addEventListener('resize', () => this.c[key] = value())
    })
}