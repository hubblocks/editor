// Name: HubBlocks – Measure (English)
// ID: hbmeasure
// Description: Stopwatch, speed and live graphs for HubBlocks. Part of HubBlocks (GPL-3.0).
(function (Scratch) {
  'use strict';
  const LANG = 'en';
  const STRINGS = {
    el: {
      name: 'Μετρήσεις',
      lWatch: 'Χρονόμετρο', lSpeed: 'Ταχύτητα', lGraph: 'Γράφημα',
      start: 'ξεκίνα το χρονόμετρο', stop: 'σταμάτα το χρονόμετρο', reset: 'μηδένισε το χρονόμετρο',
      watch: 'χρονόμετρο (δευτ.)', show: 'δείξε το χρονόμετρο', hide: 'κρύψε το χρονόμετρο',
      speed: 'ταχύτητα για [D] μέτρα σε [U]',
      gStart: 'ξεκίνα γράφημα για [SRC]', gStop: 'σταμάτα το γράφημα', gAdd: 'πρόσθεσε [V] στο γράφημα',
      gClear: 'καθάρισε το γράφημα', gShow: 'δείξε το γράφημα', gHide: 'κρύψε το γράφημα',
      gCsv: 'κατέβασε τα δεδομένα του γραφήματος',
      srcDistance: 'απόσταση', srcTilt: 'κλίση (κωδικός)', srcPower: 'ισχύ μοτέρ', srcWatch: 'χρονόμετρο', srcValue: 'τιμή',
      time: 'χρόνος (δευτ.)', sec: 'δευτ.', file: 'hubblocks-metriseis'
    },
    en: {
      name: 'Measure',
      lWatch: 'Stopwatch', lSpeed: 'Speed', lGraph: 'Graph',
      start: 'start stopwatch', stop: 'stop stopwatch', reset: 'reset stopwatch',
      watch: 'stopwatch (s)', show: 'show stopwatch', hide: 'hide stopwatch',
      speed: 'speed for [D] metres in [U]',
      gStart: 'start graph of [SRC]', gStop: 'stop graph', gAdd: 'add [V] to graph',
      gClear: 'clear graph', gShow: 'show graph', gHide: 'hide graph',
      gCsv: 'download graph data',
      srcDistance: 'distance', srcTilt: 'tilt (code)', srcPower: 'motor power', srcWatch: 'stopwatch', srcValue: 'value',
      time: 'time (s)', sec: 's', file: 'hubblocks-measurements'
    }
  };
  const T = STRINGS[LANG];
  const vm = Scratch.vm;
  const SAMPLE_MS = 100;        // graph sampling: 10 values per second
  const MAX_POINTS = 3000;      // 5 minutes at 10 per second
  const RANGES = { distance: [0, 100], tilt: [0, 10], power: [0, 10] };
  const fmt = (v, d) => {
    const s = Number(v).toFixed(d);
    return LANG === 'el' ? s.replace('.', ',') : s;
  };

  if (!Scratch.extensions.unsandboxed) throw new Error('HubBlocks Measure must run unsandboxed');

  class Measure {
    constructor () {
      // stopwatch
      this.t0 = 0; this.elapsed = 0; this.running = false; this.showWatch = false;
      // graph
      this.points = []; this.src = 'value'; this.recording = false; this.gStart = 0;
      this.showGraph = false; this.sourceTarget = null; this.lastSample = 0;
      this.overlay = null;
      this._frame = this._frame.bind(this);
      requestAnimationFrame(this._frame);
      vm.runtime.on('PROJECT_STOP_ALL', () => { this.stopWatch(); this.stopGraph(); });
    }

    getInfo () {
      const B = Scratch.BlockType; const A = Scratch.ArgumentType;
      return {
        id: 'hbmeasure',
        name: T.name,
        color1: '#7E57C2', color2: '#6A45AD', color3: '#5A3A96',
        blocks: [
          { blockType: B.LABEL, text: T.lWatch },
          { opcode: 'startWatch', blockType: B.COMMAND, text: T.start },
          { opcode: 'stopWatch', blockType: B.COMMAND, text: T.stop },
          { opcode: 'resetWatch', blockType: B.COMMAND, text: T.reset },
          { opcode: 'watch', blockType: B.REPORTER, text: T.watch },
          { opcode: 'showWatchBlock', blockType: B.COMMAND, text: T.show },
          { opcode: 'hideWatchBlock', blockType: B.COMMAND, text: T.hide },
          { blockType: B.LABEL, text: T.lSpeed },
          { opcode: 'speed', blockType: B.REPORTER, text: T.speed,
            arguments: { D: { type: A.NUMBER, defaultValue: 1 }, U: { type: A.STRING, menu: 'units', defaultValue: 'ms' } } },
          { blockType: B.LABEL, text: T.lGraph },
          { opcode: 'startGraph', blockType: B.COMMAND, text: T.gStart,
            arguments: { SRC: { type: A.STRING, menu: 'source', defaultValue: 'distance' } } },
          { opcode: 'stopGraph', blockType: B.COMMAND, text: T.gStop },
          { opcode: 'addToGraph', blockType: B.COMMAND, text: T.gAdd, arguments: { V: { type: A.NUMBER, defaultValue: 0 } } },
          { opcode: 'clearGraph', blockType: B.COMMAND, text: T.gClear },
          { opcode: 'showGraphBlock', blockType: B.COMMAND, text: T.gShow },
          { opcode: 'hideGraphBlock', blockType: B.COMMAND, text: T.gHide },
          { opcode: 'downloadCsv', blockType: B.COMMAND, text: T.gCsv }
        ],
        menus: {
          units: { acceptReporters: false, items: [{ text: 'm/s', value: 'ms' }, { text: 'km/h', value: 'kmh' }] },
          source: { acceptReporters: false, items: [
            { text: T.srcDistance, value: 'distance' }, { text: T.srcTilt, value: 'tilt' },
            { text: T.srcPower, value: 'power' }, { text: T.srcWatch, value: 'watch' }] }
        }
      };
    }

    // ---------- stopwatch ----------
    _now () { return performance.now(); }
    seconds () { return this.running ? this.elapsed + (this._now() - this.t0) / 1000 : this.elapsed; }
    startWatch () { this.elapsed = 0; this.t0 = this._now(); this.running = true; }
    stopWatch () { if (this.running) { this.elapsed = this.seconds(); this.running = false; } }
    resetWatch () { this.elapsed = 0; this.t0 = this._now(); }
    watch () { return Math.round(this.seconds() * 100) / 100; }
    showWatchBlock () { this.showWatch = true; }
    hideWatchBlock () { this.showWatch = false; }

    // ---------- speed = distance / stopwatch time ----------
    speed (args) {
      const d = Scratch.Cast.toNumber(args.D); const t = this.seconds();
      if (!(t > 0)) return 0;
      const v = d / t * (args.U === 'kmh' ? 3.6 : 1);
      return Math.round(v * 100) / 100;
    }

    // ---------- graph ----------
    _hubFor (target) {
      const m = globalThis.hubblocksHub;
      if (!m) return null;
      return m.hubs[m._index ? m._index(target) : 0];
    }
    _read () {
      if (this.src === 'watch') return this.watch();
      const h = this._hubFor(this.sourceTarget);
      if (!h) return 0;
      if (this.src === 'distance') return h.sensors.distance || 0;
      if (this.src === 'tilt') return h.sensors.tiltCode || 0;
      if (this.src === 'power') { const m = h.motors[0]; return m.on ? m.level : 0; }
      return 0;
    }
    startGraph (args, util) {
      this.src = args.SRC; this.sourceTarget = util && util.target;
      this.points = []; this.gStart = this._now(); this.lastSample = 0;
      this.recording = true; this.showGraph = true;
      this._push(this._read());
    }
    stopGraph () { this.recording = false; }
    addToGraph (args) {
      if (!this.recording && !this.points.length) { this.gStart = this._now(); this.src = 'value'; }
      this.showGraph = true;
      this._push(Scratch.Cast.toNumber(args.V));
    }
    clearGraph () { this.points = []; this.gStart = this._now(); }
    showGraphBlock () { this.showGraph = true; }
    hideGraphBlock () { this.showGraph = false; }
    _push (v) {
      this.points.push({ t: (this._now() - this.gStart) / 1000, v });
      if (this.points.length > MAX_POINTS) this.points.shift();
    }
    downloadCsv () {
      const sep = LANG === 'el' ? ';' : ',';
      const label = { distance: T.srcDistance, tilt: T.srcTilt, power: T.srcPower, watch: T.srcWatch, value: T.srcValue }[this.src];
      const rows = [T.time + sep + label].concat(this.points.map((p) => fmt(p.t, 2) + sep + fmt(p.v, 2)));
      const blob = new Blob(['\ufeff' + rows.join('\r\n')], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = T.file + '.csv';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    }

    // ---------- drawing on the stage ----------
    _overlay () {
      const r = Scratch.renderer; const stage = r && r.canvas; if (!stage || !stage.parentElement) return null;
      if (!this.overlay) {
        const c = document.createElement('canvas');
        c.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:5;';
        this.overlay = c;
      }
      const parent = stage.parentElement;
      if (this.overlay.parentElement !== parent) {
        if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
        parent.appendChild(this.overlay);
      }
      return this.overlay;
    }
    _frame (now) {
      requestAnimationFrame(this._frame);
      if (this.recording && now - this.lastSample >= SAMPLE_MS) { this.lastSample = now; this._push(this._read()); }
      if (typeof document === 'undefined') return;
      const c = this._overlay(); if (!c) return;
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, Math.round(c.clientWidth * dpr)); const h = Math.max(1, Math.round(c.clientHeight * dpr));
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
      const g = c.getContext('2d'); g.clearRect(0, 0, w, h);
      const u = Math.min(w / 480, h / 360);          // 1 stage unit in device pixels
      if (this.showGraph) this._drawGraph(g, w, h, u);
      if (this.showWatch) this._drawWatch(g, u);
    }
    _drawWatch (g, u) {
      const text = '⏱ ' + fmt(this.seconds(), 2) + ' ' + T.sec;
      g.font = `bold ${Math.round(22 * u)}px "Helvetica Neue", Arial, sans-serif`;
      const tw = g.measureText(text).width; const x = 8 * u; const y = 8 * u; const hh = 34 * u;
      g.fillStyle = this.running ? 'rgba(126,87,194,0.92)' : 'rgba(40,40,60,0.85)';
      this._round(g, x, y, tw + 24 * u, hh, 10 * u); g.fill();
      g.fillStyle = '#FFFFFF'; g.textBaseline = 'middle'; g.fillText(text, x + 12 * u, y + hh / 2);
    }
    _round (g, x, y, w, h, r) {
      g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
      g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
    }
    _nice (max) {
      const steps = [1, 2, 5, 10, 20, 30, 60, 120, 300];
      for (const s of steps) if (max <= s * 5) return s;
      return 600;
    }
    _drawGraph (g, w, h, u) {
      const X = 10 * u, Y = 52 * u, W = w - 20 * u, H = h - 62 * u;
      g.fillStyle = 'rgba(255,255,255,0.9)'; this._round(g, X, Y, W, H, 10 * u); g.fill();
      g.strokeStyle = '#C9D3DD'; g.lineWidth = 1 * u; g.stroke();
      const px = X + 46 * u, py = Y + 26 * u, pw = W - 60 * u, ph = H - 58 * u;   // plot area
      const pts = this.points;
      const tMax = Math.max(5, pts.length ? pts[pts.length - 1].t : 0);
      const tStep = this._nice(tMax); const tEnd = Math.ceil(tMax / tStep) * tStep;
      let [vMin, vMax] = RANGES[this.src] || [0, 0];
      if (!RANGES[this.src]) {
        vMin = Math.min(0, ...pts.map((p) => p.v)); vMax = Math.max(1, ...pts.map((p) => p.v));
        const pad = (vMax - vMin) * 0.1; vMax += pad; if (vMin < 0) vMin -= pad;
      }
      const sx = (t) => px + (t / tEnd) * pw; const sy = (v) => py + ph - ((v - vMin) / (vMax - vMin || 1)) * ph;
      g.font = `${Math.round(11 * u)}px "Helvetica Neue", Arial, sans-serif`; g.fillStyle = '#52667A';
      g.strokeStyle = '#E3E9EF'; g.lineWidth = 1 * u; g.textBaseline = 'middle';
      for (let i = 0; i <= 4; i++) {                       // horizontal grid + value labels
        const v = vMin + (vMax - vMin) * i / 4; const y = sy(v);
        g.beginPath(); g.moveTo(px, y); g.lineTo(px + pw, y); g.stroke();
        g.textAlign = 'right'; g.fillText(fmt(v, Math.abs(vMax - vMin) < 10 ? 1 : 0), px - 6 * u, y);
      }
      g.textAlign = 'center'; g.textBaseline = 'top';
      for (let t = 0; t <= tEnd + 1e-9; t += tStep) {        // vertical grid + time labels
        const x = sx(t); g.beginPath(); g.moveTo(x, py); g.lineTo(x, py + ph); g.stroke();
        g.fillText(fmt(t, 0), x, py + ph + 5 * u);
      }
      g.fillText(T.time, px + pw / 2, py + ph + 18 * u);
      const label = { distance: T.srcDistance, tilt: T.srcTilt, power: T.srcPower, watch: T.srcWatch, value: T.srcValue }[this.src];
      const last = pts.length ? pts[pts.length - 1].v : null;
      g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = '#102A43';
      g.font = `bold ${Math.round(13 * u)}px "Helvetica Neue", Arial, sans-serif`;
      g.fillText(label + (last !== null ? ':  ' + fmt(last, Number.isInteger(last) ? 0 : 2) : ''), X + 12 * u, Y + 13 * u);
      if (this.recording) { g.fillStyle = '#E5413B'; g.beginPath(); g.arc(X + W - 14 * u, Y + 13 * u, 5 * u, 0, Math.PI * 2); g.fill(); }
      if (pts.length) {                                      // the data line
        g.save(); g.beginPath(); g.rect(px, py - 2 * u, pw, ph + 4 * u); g.clip();
        g.strokeStyle = '#006BB6'; g.lineWidth = 2.5 * u; g.lineJoin = 'round'; g.beginPath();
        pts.forEach((p, i) => { const x = sx(p.t), y = sy(p.v); if (i) g.lineTo(x, y); else g.moveTo(x, y); });
        g.stroke(); g.restore();
      }
    }
  }

  const em = vm && vm.extensionManager;
  if (em && typeof em.isExtensionLoaded === 'function' && em.isExtensionLoaded('hbmeasure')) return;
  const ext = new Measure();
  globalThis.hubblocksMeasure = ext;
  Scratch.extensions.register(ext);
})(Scratch);
