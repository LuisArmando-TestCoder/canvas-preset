import globalValues from './values/global.js';
import functionValues from './values/functions.js';

export default (callback, selector = 'canvas') => {
  globalValues.c = document.querySelector(selector);
  globalValues.ctx = globalValues.c.getContext('2d');

  callback({
    ...globalValues,
    ...functionValues
  });
};
