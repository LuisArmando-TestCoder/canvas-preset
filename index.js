import functionValues from './values/functions.js';
import globalValues from './values/global.js';

export default callback => {

  callback({
    ...globalValues,
    ...functionValues
  });
};
