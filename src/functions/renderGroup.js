import render from './render.js'

export default function renderGroup(type, group, callbackBeforeRender, ...callbacksAfterRender) {
    return group.forEach((obj, i) => {
        render.call({
            ...this,
            temporal: callbackBeforeRender && callbackBeforeRender(obj, i) || {}
        }, obj)[type]()
        if (callbacksAfterRender) {
            callbacksAfterRender.forEach(callbackAfterRender => {
                if (callbackAfterRender) callbackAfterRender(obj, i)
            })
        }
    })
}