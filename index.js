export default callback => {
  const functionValues = require('canvas-preset/values/functions');
  const globalValues = require('canvas-preset/values/global');

  callback({
    ...globalValues,
    ...functionValues
  });
};
