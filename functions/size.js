import upperFirst from '../utils/upperFirst.js'

export default function size(props = {}) {
    const dimensionKeys = ['width', 'height']

    dimensionKeys.forEach(key => {
        if (!props[key]) props[key] = window[`inner${upperFirst(key)}`]

        const innerAxis = () => window[`inner${upperFirst(key)}`]
        let value = props[key]

        if (value === innerAxis())
            value = innerAxis
        else if (typeof value !== 'function') value = () => value
        this.c[key] = value()

        window.addEventListener('resize', () => this.c[key] = value())
    })
}