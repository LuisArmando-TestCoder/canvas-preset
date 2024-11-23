const v = {
  c: null,
  ctx: null,
  width: () => window.innerWidth,
  height: () => window.innerHeight,
  mouse: () => window.mousePosition
}, d = (t) => t.split("").map((i, e) => e ? i : i.toUpperCase()).join("");
function y(t = {}) {
  ["width", "height"].forEach((e) => {
    t[e] || (t[e] = window[`inner${d(e)}`]);
    const s = () => window[`inner${d(e)}`];
    let o = t[e];
    o === s() ? o = s : typeof o != "function" && (o = () => t[e]), this.c[e] = o(), window.addEventListener("resize", () => this.c[e] = o());
  });
}
function w(t) {
  t ? typeof t == "string" && (this.ctx.fillStyle = t, this.ctx.fillRect(0, 0, this.c.width, this.c.height), this.ctx.beginPath()) : this.ctx.clearRect(0, 0, this.c.width, this.c.height);
}
function p(t, i) {
  const e = this || {}, s = e.maxFrameRate || 60, o = i || s, r = !(e.currentFrame % Math.floor(s / o)), n = e.currentFrame || 0;
  e.currentFrame = (n + 1) % s, r && t(e.currentFrame), requestAnimationFrame(() => p.call(e, t, o));
}
function S() {
  const t = this.temporal.colors || this.vector.colors, i = b.call(this);
  F(t, i), this.ctx.fillStyle = i, this.ctx.fillRect(0, 0, this.c.width, this.c.height);
}
function b() {
  return this.ctx.createRadialGradient(
    this.temporal.x || this.vector.x,
    this.temporal.y || this.vector.y,
    0,
    this.temporal.x || this.vector.x,
    this.temporal.y || this.vector.y,
    this.temporal.radius || this.vector.radius
  );
}
function F(t, i) {
  const e = 1 / t.length;
  t && t.forEach((s, o) => {
    const r = ((o + 1) * e + o * e) / 2;
    i.addColorStop(r, s);
  });
}
function u(t) {
  return t / 180 * Math.PI;
}
function R(t) {
  const i = {
    group: this.vector.laidGroup || this.vector.group,
    x: this.vector.x || 0,
    y: this.vector.y || 0,
    scale: this.vector.scale || 1
  }, e = () => this.vector.size;
  P.call(this, e), this.ctx.beginPath(), this.ctx.save(), T.call(
    {
      ...this,
      groupTemporalVectorCallback: t
    },
    e,
    i
  ), A.call(this), G.call(this), this.ctx.restore();
}
function A() {
  (this.vector.fill || this.temporal.fill) && (this.ctx.fillStyle = this.temporal.fill || this.vector.fill, this.ctx.fill());
}
function E(t, i) {
  t.forEach(({ x: e, y: s }) => {
    e < i.x && (i.x = e), s < i.y && (i.y = s);
  });
}
function z(t, i) {
  t.forEach((e) => {
    e.x -= i.x, e.y -= i.y;
  });
}
function C(t) {
  const i = JSON.parse(JSON.stringify(t)), e = {
    x: 1 / 0,
    y: 1 / 0
  };
  return E(i, e), z(i, e), i;
}
function k(t) {
  const i = { x: 0, y: 0 };
  return t.laidGroup.forEach(({ x: e, y: s }) => {
    e > i.x && (i.x = e), s > i.y && (i.y = s);
  }), i;
}
function P(t) {
  const i = () => !isNaN(this.temporal.rotation || this.vector.rotation), e = () => this.vector.laidGroup;
  i() && !t() && !e() && (this.vector.laidGroup = C(this.temporal.group || this.vector.group), this.vector.size = k(this.vector));
}
function T(t, i) {
  t() && (L.call(this, i), I.call(this), V.call(this, i)), i.group && i.group[0] && (q.call(this, i), M.call(this, i));
}
function V(t) {
  this.ctx.translate(
    -(this.temporal.x || t.x) - (this.temporal.size && this.temporal.size.x || this.vector.size.x) / 2 * (this.temporal.scale || t.scale),
    -(this.temporal.y || t.y) - (this.temporal.size && this.temporal.size.y || this.vector.size.y) / 2 * (this.temporal.scale || t.scale)
  );
}
function I() {
  this.ctx.rotate(
    u(
      this.temporal.rotation || this.vector.rotation
    )
  );
}
function L(t) {
  this.ctx.translate(
    this.temporal.x || t.x,
    this.temporal.y || t.y
  );
}
function q(t) {
  const i = this.groupTemporalVectorCallback && this.groupTemporalVectorCallback(t.group[0], 0) || t.group[0];
  m.call(
    { ...this, chosen: t },
    i,
    "moveTo"
  );
}
function M(t) {
  [...this.temporal.group || t.group].splice(1).forEach((i, e) => {
    const s = this.groupTemporalVectorCallback && this.groupTemporalVectorCallback(i, e + 1) || i;
    m.call(
      { ...this, chosen: t },
      s,
      "lineTo"
    );
  });
}
function m(t, i) {
  this.ctx[i](
    t.x * (this.temporal.scale || this.chosen.scale) + (this.temporal.x || this.chosen.x),
    t.y * (this.temporal.scale || this.chosen.scale) + (this.temporal.y || this.chosen.y)
  );
}
function G() {
  (this.temporal.thickness || this.vector.thickness && this.temporal.color || this.vector.color) && (this.ctx.lineWidth = this.temporal.thickness || this.vector.thickness, this.ctx.strokeStyle = this.temporal.color || this.vector.color, this.ctx.stroke());
}
function O() {
  this.ctx.save(), N.call(this), U.call(this), this.vector.image.complete ? D.call(this) : B.call(this), this.ctx.fillStyle = this.temporal.color || this.vector.color, this.ctx.restore();
}
function B() {
  this.ctx.fillRect(
    -(this.temporal.width || this.vector.width) / 2,
    -(this.temporal.height || this.vector.height) / 2,
    this.temporal.width || this.vector.width,
    this.temporal.height || this.vector.height
  );
}
function D() {
  this.ctx.drawImage(
    this.temporal.image || this.vector.image,
    -(this.temporal.width || this.vector.width) / 2,
    -(this.temporal.height || this.vector.height) / 2,
    this.temporal.width || this.vector.width,
    this.temporal.height || this.vector.height
  );
}
function U() {
  this.ctx.rotate(
    u(
      this.temporal.rotation || this.vector.rotation
    )
  );
}
function N() {
  this.ctx.translate(
    (this.temporal.x || this.vector.x) + (this.temporal.width || this.vector.width) / 2,
    (this.temporal.y || this.vector.y) + (this.temporal.height || this.vector.height) / 2
  );
}
function W() {
  this.ctx.beginPath(), this.ctx.save(), X.call(this), H.call(this), J.call(this);
  const t = K.call(this);
  $.call(this, t), Y.call(this, t), this.ctx.restore();
}
function K() {
  return [
    -(this.temporal.width || this.vector.width) / 2,
    -(this.temporal.height || this.vector.height) / 2,
    this.temporal.width || this.vector.width,
    this.temporal.height || this.vector.height
  ];
}
function $(t) {
  this.ctx.strokeStyle = this.temporal.border && this.temporal.border.color || this.vector.border && this.vector.border.color, this.ctx.lineWidth = this.temporal.border && this.temporal.border.thickness || this.vector.border && this.vector.border.thickness, (this.temporal.border || this.vector.border) && this.ctx.strokeRect(...t);
}
function J() {
  this.ctx.fillStyle = this.temporal.color || this.vector.color;
}
function H() {
  this.ctx.rotate(
    u(
      this.temporal.rotation || this.vector.rotation
    )
  );
}
function X() {
  this.ctx.translate(
    (this.temporal.x || this.vector.x) + (this.temporal.width || this.vector.width) / 2,
    (this.temporal.y || this.vector.y) + (this.temporal.height || this.vector.height) / 2
  );
}
function Y(t) {
  this.ctx.fillRect(...t);
}
function j() {
  this.ctx.beginPath(), _.call(this), Z.call(this), Q.call(this);
}
function Q() {
  this.ctx.fillText(
    this.temporal.text || this.vector.text,
    this.temporal.x || this.vector.x,
    this.temporal.y || this.vector.y
  );
}
function Z() {
  this.ctx.font = this.temporal.font || this.vector.font;
}
function _() {
  this.ctx.fillStyle = this.temporal.color || this.vector.color;
}
function tt() {
  this.ctx.beginPath(), ot.call(this), it.call(this), this.ctx.fill(), (this.vector.border || this.temporal.border) && et.call(this);
}
function it() {
  this.ctx.arc(
    this.temporal.x || this.vector.x,
    this.temporal.y || this.vector.y,
    this.temporal.radius || this.vector.radius,
    0,
    Math.PI * 2
  );
}
function f(t) {
  return this.temporal.border && this.temporal.border[t] || this.vector.border && this.vector.border[t];
}
function et() {
  const t = f.call(this, "color"), i = f.call(this, "thickness");
  this.ctx.strokeStyle = t, this.ctx.lineWidth = i, this.ctx.stroke();
}
function ot() {
  this.ctx.fillStyle = this.temporal.color || this.vector.color;
}
function x(t) {
  const i = {
    gradient: S,
    lines: R,
    image: O,
    rect: W,
    text: j,
    arc: tt
  };
  return st.call(this), Object.keys(i).forEach((e) => {
    i[e] = i[e].bind({ ...this, vector: t });
  }), i;
}
function st() {
  this.temporal || (this.temporal = {});
}
function rt(t, i, e, ...s) {
  return i.forEach((o, r) => {
    x.call({
      ...this,
      temporal: e && e(o, r) || {}
    }, o)[t](), s && s.forEach((n) => {
      n && n(o, r);
    });
  });
}
function nt(t = 1, i = 0) {
  return Math.floor(Math.random() * (t - i + 1) + i);
}
function ct(t, i) {
  const e = i.x - t.x, s = i.y - t.y, o = e ** 2 + s ** 2;
  return Math.sqrt(o);
}
function g(t) {
  return t.reduce((i, e) => i + e) / t.length;
}
function ht() {
  return this.audioArray = new Uint8Array(this.analyser.frequencyBinCount), this.analyser.getByteFrequencyData(this.audioArray), this.audioArray.average = g(this.audioArray), this.audioArray;
}
function at() {
  return this.audioArray = new Uint8Array(this.analyser.frequencyBinCount), this.analyser.getByteTimeDomainData(this.audioArray), this.audioArray.average = g(this.audioArray), this.audioArray;
}
function lt(t) {
  const i = new AudioContext(), e = i.createAnalyser(), s = i.createMediaElementSource(t);
  let o;
  s.connect(e), e.connect(i.destination);
  const r = { analyser: e, audioArray: o };
  return {
    getFrequencies: ht.bind(r),
    getAmplitudes: at.bind(r),
    analyser: e,
    source: s,
    audioContext: i
  };
}
function ut({
  toggler: t = window,
  triggerBy: i = "click",
  audio: e,
  src: s
}, o) {
  const r = e || new Audio();
  r.crossOrigin = "anonymous", r.src = s, r.addEventListener("canplay", () => {
    t.addEventListener(i, () => {
      if (o && o(r), r.paused) return r.play();
      r.pause();
    });
  });
}
function dt(t) {
  window.addEventListener("mousemove", (i) => {
    window.mousePosition || (window.mousePosition = {}), window.mousePosition.x = i.clientX, window.mousePosition.y = i.clientY, t && t(i);
  });
}
function ft({
  element: t,
  triggerBy: i = "click",
  callback: e,
  wrapper: s
}) {
  const {
    documentElement: o
  } = document, r = s || o, n = r.requestFullScreen || r.webkitRequestFullScreen || r.mozRequestFullScreen || r.msRequestFullScreen, h = () => document.isFullScreen || document.webkitIsFullScreen || document.mozIsFullScreen;
  t.addEventListener(i, (a) => {
    h() ? document.exitFullscreen() : n.call(r), e && e(h(), a);
  });
}
function pt({
  voiceName: t = "Google UK English Male",
  rate: i = 0.85,
  pitch: e = 0.75,
  lang: s = "en-US"
}) {
  const o = new (window.speechRecognition || window.webkitSpeechRecognition)();
  o.continuous = !0, o.interimResult = !1, o.lang = s;
  const r = window.speechSynthesis;
  let n = r.getVoices(), h;
  return r.onvoiceschanged = () => n = r.getVoices(), {
    listen(a) {
      return o.isRecognizing || (o.start(), o.onresult = (c) => {
        const l = c.results[c.resultIndex][0].transcript;
        a(l, c);
      }, o.onspeechstart = () => o.isRecognizing = !0, o.onspeechend = () => o.isRecognizing = !1), {
        stopAt(c) {
          window.setTimeout(o.stop, c);
        }
      };
    },
    talk(a) {
      if (!r.speaking) {
        const c = new SpeechSynthesisUtterance(a);
        c.voice = n.find((l) => t === l.name), c.rate = i, c.pitch = e, h && (c.onend = h), r.speak(c);
      }
    },
    voices: () => n,
    isSpeaking: () => r.speaking,
    onEnd: (a) => h = a
    // gets redefined each time it is called
  };
}
function mt({
  x: t,
  y: i
}) {
  return {
    and({
      x: e,
      y: s
    }) {
      const [o, r] = [
        t - e,
        i - s
      ];
      return {
        value: Math.sqrt(Math.abs(o ** 2) + Math.abs(r ** 2)),
        leg1: o,
        leg2: r
      };
    }
  };
}
const xt = {
  size: y,
  clear: w,
  draw: p,
  render: x,
  renderGroup: rt,
  random: nt,
  get2DVerticesDistance: ct,
  analyseAudio: lt,
  setAudioToggle: ut,
  onMouseMove: dt,
  setFullScreen: ft,
  speech: pt,
  getDistanceBetween: mt
}, gt = (t, i = "canvas", e = "2d") => {
  const s = { ...v }, o = { ...xt };
  s.c = document.querySelector(i), s.c && e && (s.ctx = s.c.getContext(e)), Object.keys(o).forEach((h) => {
    o[h] = o[h].bind({
      ...s
    });
  });
  const n = {
    ...s,
    ...o
  };
  return t && t(n), n;
};
export {
  gt as default
};
