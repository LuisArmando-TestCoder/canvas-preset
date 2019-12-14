# canvas-preset

```javascript
import React, { useEffect } from 'react';
import preset from 'canvas-preset';
export default () => {
    useEffect(() => preset(({size, clear, draw}) => {
        size();
        draw(() => clear())
    }), []);
    return <canvas/>;
}
```
