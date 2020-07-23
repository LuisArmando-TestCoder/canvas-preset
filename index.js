import globalValues from './values/global.js';
import functionValues from './values/functions.js';

export default (callback, selector = 'canvas') => {
  const global = {...globalValues};
  const functions = {...functionValues};

  global.c = document.querySelector(selector);
  global.ctx = global.c.getContext('2d');

  Object.keys(functions).forEach(key => {
    functions[key] = functions[key].bind({
      ...global
    });
  });

  const presetObject = {
    ...global,
    ...functions
  };

  callback(presetObject);

  return presetObject;
};
