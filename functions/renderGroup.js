import render from './render.js'

export default function renderGroup(type, group, callbackBeforeRender, callbackAfterRender) {
    return group.forEach((obj, i) => {
        if (callbackBeforeRender) callbackBeforeRender(obj, i)
        render.call(this, obj)[type]()
        if (callbackAfterRender) callbackAfterRender(obj, i)
    })
}