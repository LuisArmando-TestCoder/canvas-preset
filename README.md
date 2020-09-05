# canvas-preset

## Import from CDN
#### https://luisarmando-testcoder.github.io/canvas-preset/index.js

## Visit the wiki
#### https://github.com/LuisArmando-TestCoder/canvas-preset/wiki

## Usage for React
```javascript
import React, {useEffect} from 'react'
import preset from 'canvas-preset'
export default () => {
  useEffect(
    () => {
      const { size, clear, draw } = preset()
      
      size()
      draw(() => clear('#f44'))
    },
    []
  )
  return <canvas />
}
```

## Usage for Vue.js
```javascript
import preset from 'canvas-preset'

export default {
  name: 'JustACircle',
  mounted () {
    const { render } = preset(null, '#justACircle')
    const circle = {
      x: 73,
      y: 42,
      radious: 17,
      color: '#001'
    }
    render(circle).arc()
  }
}
```
