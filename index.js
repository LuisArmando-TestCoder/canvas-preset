import globalValues from './values/global.js'
import functionValues from './values/functions.js'

export default (callback, selector = 'canvas', contextType = '2d') => {
  const global = {...globalValues}
  const functions = {...functionValues}

  global.c = document.querySelector(selector)

  const canSetContext = global.c && contextType

  if (canSetContext) global.ctx = global.c.getContext(contextType)

  Object.keys(functions).forEach(key => {
    functions[key] = functions[key].bind({
      ...global
    })
  })

  const presetObject = {
    ...global,
    ...functions
  }

  if (callback) callback(presetObject)

  return presetObject
}
