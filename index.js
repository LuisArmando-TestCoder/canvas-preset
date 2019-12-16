const funcPath = './functions/';

const functions = {
  size: require(`${funcPath}size`),
  clear: require(`${funcPath}clear`),
  draw: require(`${funcPath}draw`),
  render: require(`${funcPath}render`),
  renderGroup: require(`${funcPath}renderGroup`),
  random: require(`${funcPath}random`),
  calculateDistance: require(`${funcPath}calculateDistance`),
  analyseAudio: require(`${funcPath}analyseAudio`),
  onMouseMove: require(`${funcPath}onMouseMove`),
  setFullScreen: require(`${funcPath}setFullScreen`)
};

export default callback => {
  const c = document.querySelector('canvas');
  const ctx = c.getContext('2d');
  const width = () => window.innerWidth;
  const height = () => window.innerHeight;
  const mouse = () => window.mousePosition;

  callback({
    c,
    ctx,
    width,
    height,
    mouse,
    ...functions
  });
}
