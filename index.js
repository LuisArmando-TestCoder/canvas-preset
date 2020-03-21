import globalValues from './values/global.js';
import functionValues from './canvas-preset/values/functions.js';

export default (callback, selector) => {
  if(selector) {
    globalValues.c = document.querySelector(selector);
    globalValues.ctx = c.getContext('2d');
  }

  callback({
    ...globalValues,
    ...functionValues
  });
};
