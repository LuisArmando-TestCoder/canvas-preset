
export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');

export const width = () => window.innerWidth;

export const height = () => window.innerHeight;

export const mouse = () => window.mousePosition;

export const size = function size(w = window.innerWidth, h = window.innerHeight) {
  c.width = w;
  c.height = h;
  if (c.width === window.innerWidth) {
    window.addEventListener('resize', () => {
      c.width = window.innerWidth;
    });
  }
  if (c.height === window.innerHeight) {
    window.addEventListener('resize', () => {
      c.height = window.innerHeight;
    });
  }
};

export const clear = function clear(color) {
  if (!color) {
    ctx.clearRect(0, 0, c.width, c.height);
  } else if (typeof color === 'string') {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.beginPath();
  }
};

export const draw = function draw(f) {
  if (typeof f === 'function') f();
  requestAnimationFrame(() => draw(f));
};

export const render = function render(vertex) {
  return {
    lines() {
      // vertex {w = 1, c = '#000', group}
      // vertex.group [{x,y}]
      ctx.beginPath();
      ctx.moveTo(vertex.group[0].x, vertex.group[0].y);
      vertex.group.forEach(({ x, y }, i) => {
        if (i) ctx.lineTo(x, y);
      });
      ctx.lineWidth = vertex.w;
      ctx.strokeStyle = vertex.c;
      ctx.stroke();
    },
    rect() {
      ctx.beginPath();
      ctx.save();
      ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
      ctx.rotate(vertex.rot);
      ctx.fillStyle = vertex.c;
      ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
      ctx.restore();
    },
    arc() {
      ctx.beginPath();
      ctx.fillStyle = vertex.c;
      ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI * 2);
      ctx.fill();
    },
    img() {
      ctx.save();
      ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
      ctx.rotate(vertex.rot);
      if (vertex.img.complete) {
        ctx.drawImage(vertex.img, -vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h)
      } else {
        ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
      }
      ctx.fillStyle = vertex.c;
      ctx.restore();
    },
    txt() {
      ctx.beginPath();
      ctx.fillStyle = vertex.c;
      ctx.font = vertex.font;
      ctx.fillText(vertex.txt, vertex.x, vertex.y);
    }
  }
};

export const renderGroup = function renderGroup(type, array, call) {
  return array.forEach((obj, i) => {
    if (call) call(obj, i);
    render(obj)[type]();
  });
};

export const updateGroup = function updateGroup(array, f) {
  array.forEach((obj, i) => f(obj, i));
};

export const random = function random(max = 1, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const calculateDistance = function calculateDistance(obj1, obj2) {
  const x = obj2.x - obj1.x;
  const y = obj2.y - obj1.y;
  const distance = x ** 2 + y ** 2; // eslint-disable-line
  return distance;
};

export const fillArray = function fillArray(times, array, f) {
  for (let i = 0; i < times; i += 1) {
    array.push(f(i));
  }
};

// variable = analyseAudio(audio) --> after user triggering (click or alike)
// variable.getFrequency().array --> inside a framelooper function
export const analyseAudio = function analyseAudio(audio) { 
  const context = new AudioContext();
  const analyser = context.createAnalyser();
  const source = context.createMediaElementSource(audio);

  let audioArray;

  source.connect(analyser);
  analyser.connect(context.destination);

  function getAverage(array) {
    return array.reduce((a, b) => a + b) / array.length;
  }

  function getFrequency() {
    audioArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(audioArray);
    return {
      array: audioArray,
      average: getAverage(audioArray),
    };
  }

  function getAmplitude() {
    audioArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(audioArray);
    return {
      array: audioArray,
      average: getAverage(audioArray),
    };
  }
  return {
    getFrequency,
    getAmplitude,
  };
};

export const onMouseMove = function onMouseMove(callback) {
  window.addEventListener('mousemove', e => {
    if (!window.mousePosition) window.mousePosition = {};
    window.mousePosition.x = e.clientX;
    window.mousePosition.y = e.clientY;
    if (callback) callback(e);
  });
};

export const setFullScreen = function setFullScreen({ element, trigger, callback }) {
  // setFullScreen(btn, 'click');
  const { documentElement: doc } = document;
  const rfs = doc.requestFullScreen
  || doc.webkitRequestFullScreen
  || doc.mozRequestFullScreen
  || doc.msRequestFullScreen;
  const ifs = () => document.isFullScreen
  || document.webkitIsFullScreen
  || document.mozIsFullScreen;
  element.addEventListener('click', () => {
    if (!ifs()) rfs.call(doc);
    else document.exitFullscreen();
    if (callback) callback(ifs());
  });
};
