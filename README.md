# canvas-preset

## Usage for React
```javascript
import React, {useEffect} from 'react';
import preset from 'canvas-preset';
export default () => {
  useEffect(
    () =>
      preset(({size, clear, draw}) => {
        size();
        draw(() => clear());
      }),
    []
  );
  return <canvas />;
};
```

## Usage for Vue.js
```javascript
import preset from 'canvas-preset'

export default {
  name: 'JustACircle',
  mounted () {
    preset(({ render }) => {
      const circle = {x: 73, y: 42, r: 12, c: '#000'};
      render(circle).arc()
    }, '#justACircle');
  }
}
```
