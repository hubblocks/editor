// Name: HubBlocks – Hub (English)
// ID: wedo2gr
// Description: HubBlocks – blocks for the LEGO® Education WeDo 2.0 hub over Web Bluetooth. Not affiliated with the LEGO Group.
// License: MIT
//
// Load: turbowarp.org/editor -> Extensions -> Custom Extension -> Files -> wedo2-en.js
//       and CHECK "Run extension without sandbox".
// Browser: Chrome or Edge (Windows, macOS, ChromeOS, Android). Not Firefox / Safari.
// BLE protocol based on the official scratch-vm wedo2 extension.
// Projects are interchangeable with the Greek version (wedo2-gr.js).

(function (Scratch) {
  'use strict';

  const LANG = 'en';
  const STRINGS = {
    el: {
      name: 'Hub',
      sandbox: '⚠ Ξαναφόρτωσε τη σελίδα και τσέκαρε «Run without sandbox»',
      noBt: 'Αυτός ο browser δεν υποστηρίζει Bluetooth.\nΆνοιξε το TurboWarp σε Chrome ή Edge.',
      connErr: 'Δεν έγινε σύνδεση με το hub:\n',
      connHint: '\n\nΠάτα το κουμπί του hub (να αναβοσβήνει) και ξαναδοκίμασε.',
      stDisconnected: 'Αποσυνδεδεμένο', stSearching: 'Αναζήτηση…', stConnecting: 'Σύνδεση…',
      stConnected: 'Συνδεδεμένο: ', stError: 'Σφάλμα σύνδεσης',
      stReconnect: 'Η σύνδεση χάθηκε – επανασύνδεση', stLost: 'Η σύνδεση χάθηκε',
      bConnect: '🔗 Σύνδεση με το hub', bDisconnect: '✖ Αποσύνδεση',
      bStatus: 'κατάσταση σύνδεσης', bIsConnected: 'συνδεδεμένο;',
      bMotorOnFor: '[MOTOR] ενεργοποίηση για [SEC] δευτερόλεπτα', bMotorOn: '[MOTOR] ενεργοποίηση',
      bMotorOff: '[MOTOR] απενεργοποίηση', bPower: 'όρισε ισχύ [MOTOR] σε [LEVEL] (0-10)',
      bDir: 'όρισε φορά [MOTOR] σε [DIR]',
      bColor: 'άναψε το φως σε χρώμα [COLOR]', bHue: 'άναψε το φως σε απόχρωση [HUE] (0-100)',
      bRGB: 'άναψε το φως σε R [R] G [G] B [B]', bLightOff: 'σβήσε το φως',
      bNote: 'παίξε νότα [NOTE] για [SEC] δευτερόλεπτα', bFreq: 'παίξε ήχο [HZ] Hz για [SEC] δευτερόλεπτα',
      bStopTone: 'σταμάτα τον ήχο',
      bWhenDist: 'όταν η απόσταση [OP] [REF]', bDist: 'απόσταση',
      bWhenTilt: 'όταν γείρει [DIR]', bIsTilt: 'γέρνει [DIR];', bTiltAngle: 'γωνία κλίσης [DIR]',
      bTiltDir: 'κατεύθυνση κλίσης', bTiltCode: 'κωδικός κλίσης (0/3/5/7/9)', bShake: 'όταν κουνηθεί ο αισθητήρας κλίσης',
      bWhenBtn: 'όταν πατηθεί το κουμπί του hub', bBtn: 'κουμπί hub πατημένο;',
      bBattery: 'μπαταρία %', bRename: 'μετονόμασε το hub σε [NAME]',
      lSprites: 'Sprites του hub', bShows: 'αυτό το sprite δείχνει [PART]', bSim: 'προσομοίωση (χωρίς hub);',
      badgeOff: 'Σύνδεση hub', badgeOn: 'Hub', badgeTip: 'Πάτησε για σύνδεση με το hub',
      pMotorA: 'το μοτέρ Α', pMotorB: 'το μοτέρ Β', pLight: 'το φως', pTilt: 'την κλίση', pDist: 'την απόσταση',
      mAll: 'όλα τα μοτέρ', mA: 'μοτέρ Α', mB: 'μοτέρ Β',
      dThis: 'αυτή τη φορά ↻', dThat: 'την άλλη φορά ↺', dRev: 'αντίστροφη ⇄',
      up: 'πάνω', down: 'κάτω', left: 'αριστερά', right: 'δεξιά', any: 'οπουδήποτε', none: 'καμία',
      colors: ['σβηστό', 'ροζ', 'μωβ', 'μπλε', 'γαλάζιο', 'τιρκουάζ', 'πράσινο', 'κίτρινο', 'πορτοκαλί', 'κόκκινο', 'λευκό'],
      notes: ['Ντο', 'Ρε', 'Μι', 'Φα', 'Σολ', 'Λα', 'Σι', 'Ντο (ψηλό)'],
      defName: 'Omada 1'
    },
    en: {
      name: 'Hub',
      sandbox: '⚠ Reload the page and tick “Run without sandbox”',
      noBt: 'This browser does not support Bluetooth.\nOpen TurboWarp in Chrome or Edge.',
      connErr: 'Could not connect to the hub:\n',
      connHint: '\n\nPress the hub button (the light should blink) and try again.',
      stDisconnected: 'Disconnected', stSearching: 'Searching…', stConnecting: 'Connecting…',
      stConnected: 'Connected: ', stError: 'Connection error',
      stReconnect: 'Connection lost – reconnecting', stLost: 'Connection lost',
      bConnect: '🔗 Connect hub', bDisconnect: '✖ Disconnect',
      bStatus: 'connection status', bIsConnected: 'connected?',
      bMotorOnFor: 'turn [MOTOR] on for [SEC] seconds', bMotorOn: 'turn [MOTOR] on',
      bMotorOff: 'turn [MOTOR] off', bPower: 'set [MOTOR] power to [LEVEL] (0-10)',
      bDir: 'set [MOTOR] direction to [DIR]',
      bColor: 'set light color to [COLOR]', bHue: 'set light hue to [HUE] (0-100)',
      bRGB: 'set light to R [R] G [G] B [B]', bLightOff: 'turn light off',
      bNote: 'play note [NOTE] for [SEC] seconds', bFreq: 'play tone [HZ] Hz for [SEC] seconds',
      bStopTone: 'stop sound',
      bWhenDist: 'when distance [OP] [REF]', bDist: 'distance',
      bWhenTilt: 'when tilted [DIR]', bIsTilt: 'tilted [DIR]?', bTiltAngle: 'tilt angle [DIR]',
      bTiltDir: 'tilt direction', bTiltCode: 'tilt code (0/3/5/7/9)', bShake: 'when tilt sensor is shaken',
      bWhenBtn: 'when hub button pressed', bBtn: 'hub button pressed?',
      bBattery: 'battery %', bRename: 'rename hub to [NAME]',
      lSprites: 'Hub sprites', bShows: 'this sprite shows [PART]', bSim: 'simulation (no hub)?',
      badgeOff: 'Connect hub', badgeOn: 'Hub', badgeTip: 'Click to connect to the hub',
      pMotorA: 'motor A', pMotorB: 'motor B', pLight: 'the light', pTilt: 'the tilt', pDist: 'the distance',
      mAll: 'all motors', mA: 'motor A', mB: 'motor B',
      dThis: 'this way ↻', dThat: 'that way ↺', dRev: 'reverse ⇄',
      up: 'up', down: 'down', left: 'left', right: 'right', any: 'any', none: 'none',
      colors: ['off', 'pink', 'purple', 'blue', 'light blue', 'cyan', 'green', 'yellow', 'orange', 'red', 'white'],
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C (high)'],
      defName: 'Team 1'
    }
  };
  const T = STRINGS[LANG];

  if (!Scratch.extensions.unsandboxed) {
    // Αν φορτώθηκε σε sandbox, δεν πετάμε σφάλμα (κολλάει τη φόρτωση του editor).
    // Δείχνουμε μόνο ένα μήνυμα στην παλέτα.
    Scratch.extensions.register({
      getInfo: () => ({
        id: 'wedo2gr',
        name: T.name,
        color1: '#0FBD8C', color2: '#0DA57A', color3: '#0B8E69',
        blocks: [{ blockType: Scratch.BlockType.LABEL, text: T.sandbox }]
      })
    });
    return;
  }

  const vm = Scratch.vm;

  const DEVICE_SERVICE = '00001523-1212-efde-1523-785feabcd123';
  const IO_SERVICE = '00004f0e-1212-efde-1523-785feabcd123';
  const CH = {
    NAME: '00001524-1212-efde-1523-785feabcd123',
    BUTTON: '00001526-1212-efde-1523-785feabcd123',
    ATTACHED_IO: '00001527-1212-efde-1523-785feabcd123',
    LOW_VOLTAGE: '00001528-1212-efde-1523-785feabcd123',
    INPUT_VALUES: '00001560-1212-efde-1523-785feabcd123',
    INPUT_COMMAND: '00001563-1212-efde-1523-785feabcd123',
    OUTPUT_COMMAND: '00001565-1212-efde-1523-785feabcd123'
  };

  const DEV = { MOTOR: 1, PIEZO: 22, LED: 23, TILT: 34, DISTANCE: 35 };
  const LED_PORT = 6;
  const PIEZO_PORT = 5;
  const TILT_THRESHOLD = 15;
  const BRAKE_MS = 1000;

  // Τα 11 χρώματα της εφαρμογής WeDo 2.0 (0 = σβηστό)
  const WEDO_COLORS = [
    [0, 0, 0], [255, 60, 160], [140, 0, 255], [0, 0, 255], [0, 140, 255], [0, 255, 200],
    [0, 255, 0], [255, 210, 0], [255, 90, 0], [255, 0, 0], [255, 255, 255]
  ];
  const COLOR_NAMES = T.colors;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const signed = (v) => (v > 45 ? v - 256 : v);
  const bytesOf = (dv) => new Uint8Array(dv.buffer, dv.byteOffset, dv.byteLength);

  class WeDo2GR {
    constructor () {
      this.device = null;
      this.server = null;
      this.chars = {};
      this.ports = [null, null];
      this.motors = [0, 1].map(() => ({ level: 10, dir: 1, on: false, timer: null, token: 0 }));
      this.sensors = { tiltX: 0, tiltY: 0, distance: 0, button: false, battery: '' };
      this.status = T.stDisconnected;
      this.queue = [];
      this.busy = false;
      this.userDisconnect = false;
      this.keepAlive = null;
      this.shakeHits = [];
      this.lastShake = 0;
      this.prevTilt = null;

      this._onDisconnected = this._onDisconnected.bind(this);
      this._onAttachedIO = this._onAttachedIO.bind(this);
      this._onInputValue = this._onInputValue.bind(this);
      this._onButton = this._onButton.bind(this);

      // Sprites του hub και προσομοίωση
      this.lightIndex = 0;                 // τελευταίο χρώμα του φωτός (0 = σβηστό)
      this.mirrors = new Map();            // sprites που ορίστηκαν με το block «αυτό το sprite δείχνει…»
      this.mirrorState = new Map();        // στροφή μοτέρ, πάτημα ποντικιού ανά sprite
      this.lastDown = false;
      this.lastTick = 0;
      this._mirrorLoop = this._mirrorLoop.bind(this);
      requestAnimationFrame(this._mirrorLoop);

      vm.runtime.on('PROJECT_STOP_ALL', () => this.stopAll());
    }

    getInfo () {
      return {
        id: 'wedo2gr',
        name: T.name,
        // Ίδια χρώματα με τις επίσημες επεκτάσεις του Scratch 3 (και του WeDo 2.0)
        color1: '#0FBD8C',
        color2: '#0DA57A',
        color3: '#0B8E69',
        blocks: [
          { func: 'connect', blockType: Scratch.BlockType.BUTTON, text: T.bConnect },
          { func: 'disconnect', blockType: Scratch.BlockType.BUTTON, text: T.bDisconnect },
          { opcode: 'getStatus', blockType: Scratch.BlockType.REPORTER, text: T.bStatus },
          { opcode: 'isConnectedBlock', blockType: Scratch.BlockType.BOOLEAN, text: T.bIsConnected },
          '---',
          {
            opcode: 'motorOnFor', blockType: Scratch.BlockType.COMMAND,
            text: T.bMotorOnFor,
            arguments: {
              MOTOR: { type: Scratch.ArgumentType.STRING, menu: 'motor' },
              SEC: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: 'motorOn', blockType: Scratch.BlockType.COMMAND, text: T.bMotorOn,
            arguments: { MOTOR: { type: Scratch.ArgumentType.STRING, menu: 'motor' } }
          },
          {
            opcode: 'motorOff', blockType: Scratch.BlockType.COMMAND, text: T.bMotorOff,
            arguments: { MOTOR: { type: Scratch.ArgumentType.STRING, menu: 'motor' } }
          },
          {
            opcode: 'setPower', blockType: Scratch.BlockType.COMMAND,
            text: T.bPower,
            arguments: {
              MOTOR: { type: Scratch.ArgumentType.STRING, menu: 'motor' },
              LEVEL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 8 }
            }
          },
          {
            opcode: 'setDirection', blockType: Scratch.BlockType.COMMAND,
            text: T.bDir,
            arguments: {
              MOTOR: { type: Scratch.ArgumentType.STRING, menu: 'motor' },
              DIR: { type: Scratch.ArgumentType.STRING, menu: 'direction' }
            }
          },
          '---',
          {
            opcode: 'setLightColor', blockType: Scratch.BlockType.COMMAND,
            text: T.bColor,
            arguments: { COLOR: { type: Scratch.ArgumentType.STRING, menu: 'color', defaultValue: '3' } }
          },
          {
            opcode: 'setLightHue', blockType: Scratch.BlockType.COMMAND,
            text: T.bHue,
            arguments: { HUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 } }
          },
          {
            opcode: 'setLightRGB', blockType: Scratch.BlockType.COMMAND,
            text: T.bRGB,
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 255 },
              G: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          { opcode: 'lightOff', blockType: Scratch.BlockType.COMMAND, text: T.bLightOff },
          '---',
          {
            opcode: 'playNote', blockType: Scratch.BlockType.COMMAND, hideFromPalette: true,
            text: T.bNote,
            arguments: {
              NOTE: { type: Scratch.ArgumentType.STRING, menu: 'note', defaultValue: '60' },
              SEC: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.5 }
            }
          },
          {
            opcode: 'playFreq', blockType: Scratch.BlockType.COMMAND, hideFromPalette: true,
            text: T.bFreq,
            arguments: {
              HZ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 440 },
              SEC: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.5 }
            }
          },
          { opcode: 'stopTone', blockType: Scratch.BlockType.COMMAND, hideFromPalette: true, text: T.bStopTone },
          {
            opcode: 'whenDistance', blockType: Scratch.BlockType.HAT,
            text: T.bWhenDist,
            arguments: {
              OP: { type: Scratch.ArgumentType.STRING, menu: 'op', defaultValue: '<' },
              REF: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            }
          },
          { opcode: 'getDistance', blockType: Scratch.BlockType.REPORTER, text: T.bDist },
          {
            opcode: 'whenTilted', blockType: Scratch.BlockType.HAT, text: T.bWhenTilt,
            arguments: { DIR: { type: Scratch.ArgumentType.STRING, menu: 'tiltAny', defaultValue: 'any' } }
          },
          {
            opcode: 'isTilted', blockType: Scratch.BlockType.BOOLEAN, text: T.bIsTilt,
            arguments: { DIR: { type: Scratch.ArgumentType.STRING, menu: 'tiltAny', defaultValue: 'any' } }
          },
          {
            opcode: 'tiltAngle', blockType: Scratch.BlockType.REPORTER, hideFromPalette: true, text: T.bTiltAngle,
            arguments: { DIR: { type: Scratch.ArgumentType.STRING, menu: 'tilt', defaultValue: 'up' } }
          },
          { opcode: 'tiltDirection', blockType: Scratch.BlockType.REPORTER, text: T.bTiltDir },
          { opcode: 'tiltCode', blockType: Scratch.BlockType.REPORTER, text: T.bTiltCode },
          { opcode: 'whenShaken', blockType: Scratch.BlockType.HAT, text: T.bShake },
          '---',
          { opcode: 'whenButton', blockType: Scratch.BlockType.HAT, text: T.bWhenBtn },
          { opcode: 'buttonPressed', blockType: Scratch.BlockType.BOOLEAN, text: T.bBtn },
          { opcode: 'getBattery', blockType: Scratch.BlockType.REPORTER, text: T.bBattery },
          {
            opcode: 'renameHub', blockType: Scratch.BlockType.COMMAND,
            text: T.bRename,
            arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: T.defName } }
          },
          { blockType: Scratch.BlockType.LABEL, text: T.lSprites },
          {
            opcode: 'spriteShows', blockType: Scratch.BlockType.COMMAND, text: T.bShows,
            arguments: { PART: { type: Scratch.ArgumentType.STRING, menu: 'part', defaultValue: 'motorA' } }
          },
          { opcode: 'isSimulation', blockType: Scratch.BlockType.BOOLEAN, text: T.bSim }
        ],
        menus: {
          part: {
            acceptReporters: false,
            items: [
              { text: T.pMotorA, value: 'motorA' }, { text: T.pMotorB, value: 'motorB' },
              { text: T.pLight, value: 'light' }, { text: T.pTilt, value: 'tilt' }, { text: T.pDist, value: 'distance' }
            ]
          },
          motor: {
            acceptReporters: false,
            items: [
              { text: T.mAll, value: 'all' },
              { text: T.mA, value: 'A' },
              { text: T.mB, value: 'B' }
            ]
          },
          direction: {
            acceptReporters: false,
            items: [
              { text: T.dThis, value: '1' },
              { text: T.dThat, value: '-1' },
              { text: T.dRev, value: 'reverse' }
            ]
          },
          color: {
            acceptReporters: true,
            items: COLOR_NAMES.map((n, i) => ({ text: `${i} ${n}`, value: String(i) }))
          },
          note: {
            acceptReporters: true,
            items: ['60', '62', '64', '65', '67', '69', '71', '72'].map((v, i) => ({ text: T.notes[i], value: v }))
          },
          op: { acceptReporters: false, items: ['<', '>'] },
          tilt: {
            acceptReporters: false,
            items: [
              { text: T.up, value: 'up' }, { text: T.down, value: 'down' },
              { text: T.left, value: 'left' }, { text: T.right, value: 'right' }
            ]
          },
          tiltAny: {
            acceptReporters: false,
            items: [
              { text: T.any, value: 'any' },
              { text: T.up, value: 'up' }, { text: T.down, value: 'down' },
              { text: T.left, value: 'left' }, { text: T.right, value: 'right' }
            ]
          }
        }
      };
    }

    // ---------- Σύνδεση ----------

    isConnected () {
      return !!(this.device && this.device.gatt.connected && this.chars.outputCommand);
    }

    async connect () {
      if (!navigator.bluetooth) {
        alert(T.noBt);
        return;
      }
      try {
        this.status = T.stSearching;
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ services: [DEVICE_SERVICE] }],
          optionalServices: [IO_SERVICE, 'battery_service']
        });
        if (this.device && this.device !== device) this.disconnect();
        this.device = device;
        this.userDisconnect = false;
        device.removeEventListener('gattserverdisconnected', this._onDisconnected);
        device.addEventListener('gattserverdisconnected', this._onDisconnected);
        await this._setup();
      } catch (e) {
        if (e && e.name === 'NotFoundError') {
          this.status = this.isConnected() ? this.status : T.stDisconnected;
        } else {
          console.error('WeDo2', e);
          this.status = T.stError;
          alert(T.connErr + (e && e.message ? e.message : e) + T.connHint);
        }
      }
    }

    async _optChar (service, uuid) {
      try { return await service.getCharacteristic(uuid); } catch (e) { return null; }
    }

    async _setup () {
      this.status = T.stConnecting;
      this.server = await this.device.gatt.connect();
      const dev = await this.server.getPrimaryService(DEVICE_SERVICE);
      const io = await this.server.getPrimaryService(IO_SERVICE);

      const chars = {};
      chars.inputCommand = await io.getCharacteristic(CH.INPUT_COMMAND);
      chars.outputCommand = await io.getCharacteristic(CH.OUTPUT_COMMAND);
      chars.inputValues = await io.getCharacteristic(CH.INPUT_VALUES);
      chars.attachedIO = await dev.getCharacteristic(CH.ATTACHED_IO);
      chars.name = await this._optChar(dev, CH.NAME);
      chars.button = await this._optChar(dev, CH.BUTTON);
      chars.lowVoltage = await this._optChar(dev, CH.LOW_VOLTAGE);
      try {
        const bs = await this.server.getPrimaryService('battery_service');
        chars.battery = await bs.getCharacteristic('battery_level');
      } catch (e) { chars.battery = null; }

      this.ports = [null, null];
      this.chars = chars;

      chars.inputValues.addEventListener('characteristicvaluechanged', this._onInputValue);
      await chars.inputValues.startNotifications();
      chars.attachedIO.addEventListener('characteristicvaluechanged', this._onAttachedIO);
      await chars.attachedIO.startNotifications();
      if (chars.button) {
        try {
          chars.button.addEventListener('characteristicvaluechanged', this._onButton);
          await chars.button.startNotifications();
        } catch (e) { /* δεν υποστηρίζεται */ }
      }

      // Λειτουργία RGB για το φως και μπλε χρώμα, όπως το Scratch
      this._send('inputCommand', [1, 2, LED_PORT, DEV.LED, 1, 0, 0, 0, 0, 0, 0]);
      this._setRGB(0, 0, 255);

      // Ανάγνωση μπαταρίας κάθε 5" (κρατάει και τη σύνδεση ζωντανή)
      clearInterval(this.keepAlive);
      this._readBattery();
      this.keepAlive = setInterval(() => this._readBattery(), 5000);

      this.status = T.stConnected + (this.device.name || 'hub');
    }

    disconnect () {
      this.userDisconnect = true;
      clearInterval(this.keepAlive);
      if (this.device && this.device.gatt.connected) this.device.gatt.disconnect();
      this.status = T.stDisconnected;
    }

    async _onDisconnected () {
      clearInterval(this.keepAlive);
      this.chars = {};
      this.ports = [null, null];
      this.queue.splice(0).forEach((q) => q.resolve());
      if (this.userDisconnect) {
        this.status = T.stDisconnected;
        return;
      }
      // Αυτόματη επανασύνδεση στο ίδιο hub
      for (let i = 1; i <= 5; i++) {
        this.status = `${T.stReconnect} (${i}/5)…`;
        await sleep(1500);
        if (this.userDisconnect) return;
        try {
          await this._setup();
          return;
        } catch (e) { /* ξαναδοκίμασε */ }
      }
      this.status = T.stLost;
    }

    // ---------- Ουρά εντολών (το Bluetooth δέχεται μία λειτουργία τη φορά) ----------

    _enqueue (key, fn) {
      if (key) {
        const existing = this.queue.find((q) => q.key === key);
        if (existing) {
          existing.fn = fn; // κράτα μόνο την πιο πρόσφατη εντολή για τη συγκεκριμένη έξοδο
          return existing.promise;
        }
      }
      const item = { key, fn, resolve: null, promise: null };
      item.promise = new Promise((r) => { item.resolve = r; });
      this.queue.push(item);
      this._pump();
      return item.promise;
    }

    async _pump () {
      if (this.busy) return;
      this.busy = true;
      while (this.queue.length) {
        const item = this.queue.shift();
        try {
          if (this.isConnected()) await item.fn();
        } catch (e) {
          console.warn('WeDo2 BLE', e);
        }
        item.resolve();
      }
      this.busy = false;
    }

    _send (charKey, bytes, key) {
      if (!this.isConnected()) return Promise.resolve();
      const data = new Uint8Array(bytes);
      return this._enqueue(key, async () => {
        const ch = this.chars[charKey];
        if (!ch) return;
        // Οι ρυθμίσεις αισθητήρων στέλνονται με επιβεβαίωση: αν χαθούν, ο αισθητήρας δεν στέλνει τιμές
        const confirm = charKey === 'inputCommand' && ch.properties.write;
        if (!confirm && ch.properties.writeWithoutResponse && ch.writeValueWithoutResponse) {
          await ch.writeValueWithoutResponse(data);
        } else if (ch.writeValueWithResponse && ch.properties.write) {
          await ch.writeValueWithResponse(data);
        } else {
          await ch.writeValue(data);
        }
      });
    }

    _readBattery () {
      if (!this.isConnected()) return;
      this._enqueue('battery', async () => {
        if (this.chars.battery) {
          const v = await this.chars.battery.readValue();
          this.sensors.battery = v.getUint8(0);
        } else if (this.chars.lowVoltage) {
          await this.chars.lowVoltage.readValue();
        }
      });
    }

    // ---------- Εισερχόμενα δεδομένα ----------

    _onAttachedIO (e) {
      const d = bytesOf(e.target.value);
      const port = d[0];
      if (port !== 1 && port !== 2) return;
      if (d[1] === 0) {
        const old = this.ports[port - 1];
        if (old === DEV.TILT) { this.sensors.tiltX = 0; this.sensors.tiltY = 0; this.sensors.tiltCode = 0; }
        if (old === DEV.DISTANCE) this.sensors.distance = 0;
        this.ports[port - 1] = null;
        return;
      }
      const type = d[3];
      this.ports[port - 1] = type;
      if (type === DEV.TILT || type === DEV.DISTANCE) this._configureSensor(port, type, 0);
    }

    // Ρύθμιση αισθητήρα· αν δεν έρθουν τιμές σε 1,5 s, ξαναστέλνεται (έως 3 φορές)
    _configureSensor (port, type, attempt) {
      if (!this.sensorSeen) this.sensorSeen = [false, false];
      this.sensorSeen[port - 1] = false;
      const cmd = type === DEV.TILT
        ? [1, 2, port, DEV.TILT, 1, 1, 0, 0, 0, 0, 1] // λειτουργία κατεύθυνσης (όπως η εφαρμογή WeDo)
        : [1, 2, port, DEV.DISTANCE, 0, 1, 0, 0, 0, 1, 1];
      this._send('inputCommand', cmd);
      setTimeout(() => {
        if (this.isConnected() && this.ports[port - 1] === type && !this.sensorSeen[port - 1] && attempt < 3) {
          this._configureSensor(port, type, attempt + 1);
        }
      }, 1500);
    }

    _onInputValue (e) {
      const d = bytesOf(e.target.value);
      const port = d[1];
      const type = this.ports[port - 1];
      if ((port === 1 || port === 2) && this.sensorSeen) this.sensorSeen[port - 1] = true;
      if (type === DEV.DISTANCE) {
        this.sensors.distance = d[2];
      } else if (type === DEV.TILT) {
        const code = d[2];
        if (code !== this.sensors.tiltCode) {
          this.sensors.tiltCode = code;
          this._detectShake();
        }
      }
    }

    _onButton (e) {
      const d = bytesOf(e.target.value);
      this.sensors.button = d[0] === 1;
    }

    // «Κούνημα»: τουλάχιστον 3 αλλαγές κατεύθυνσης μέσα σε 0,8 s
    _detectShake () {
      const now = Date.now();
      this.shakeHits = this.shakeHits.filter((t) => now - t < 800);
      this.shakeHits.push(now);
      if (this.shakeHits.length >= 3) {
        this.lastShake = now;
        this.shakeHits = [];
      }
    }

    // ---------- Μοτέρ ----------

    _motorIndexes (id) {
      const list = id === 'A' ? [0] : id === 'B' ? [1] : [0, 1];
      if (!this.isConnected()) return list; // προσομοίωση: τα sprites δείχνουν τι θα έκανε το μοτέρ
      return list.filter((i) => this.ports[i] === DEV.MOTOR);
    }

    _rawPower (m) {
      if (m.level <= 0) return 0;
      // Το hub γυρίζει τα μοτέρ μόνο από 30 έως 100
      return Math.round(30 + 70 * (Math.min(m.level, 10) / 10));
    }

    _clearTimer (m) {
      if (m.timer) clearTimeout(m.timer);
      m.timer = null;
      m.token++;
    }

    _motorStart (i) {
      const m = this.motors[i];
      this._clearTimer(m);
      const p = this._rawPower(m);
      if (p === 0) { this._motorStop(i); return; }
      m.on = true;
      this._send('outputCommand', [i + 1, 1, 1, p * m.dir], 'motor' + i);
    }

    _motorStop (i) {
      const m = this.motors[i];
      this._clearTimer(m);
      m.on = false;
      this._send('outputCommand', [i + 1, 1, 1, 0], 'motor' + i);
    }

    _motorBrake (i) {
      const m = this.motors[i];
      this._clearTimer(m);
      m.on = false;
      this._send('outputCommand', [i + 1, 1, 1, 127], 'motor' + i); // 127 = φρένο
      const token = m.token;
      m.timer = setTimeout(() => {
        if (m.token === token) this._send('outputCommand', [i + 1, 1, 1, 0], 'motor' + i);
      }, BRAKE_MS);
    }

    motorOnFor (args) {
      const ms = clamp(Scratch.Cast.toNumber(args.SEC) * 1000, 0, 15000);
      const idx = this._motorIndexes(args.MOTOR);
      const tokens = idx.map((i) => {
        this._motorStart(i);
        return this.motors[i].token;
      });
      return sleep(ms).then(() => {
        idx.forEach((i, k) => {
          if (this.motors[i].token === tokens[k]) this._motorBrake(i);
        });
      });
    }

    motorOn (args) {
      this._motorIndexes(args.MOTOR).forEach((i) => this._motorStart(i));
    }

    motorOff (args) {
      this._motorIndexes(args.MOTOR).forEach((i) => this._motorStop(i));
    }

    setPower (args) {
      const level = clamp(Scratch.Cast.toNumber(args.LEVEL), 0, 10);
      const list = args.MOTOR === 'A' ? [0] : args.MOTOR === 'B' ? [1] : [0, 1];
      list.forEach((i) => {
        this.motors[i].level = level;
        if (this.motors[i].on && this.ports[i] === DEV.MOTOR) this._motorStart(i);
      });
    }

    setDirection (args) {
      const list = args.MOTOR === 'A' ? [0] : args.MOTOR === 'B' ? [1] : [0, 1];
      list.forEach((i) => {
        const m = this.motors[i];
        if (args.DIR === 'reverse') m.dir = -m.dir;
        else m.dir = args.DIR === '-1' ? -1 : 1;
        if (m.on && this.ports[i] === DEV.MOTOR) this._motorStart(i);
      });
    }

    // ---------- Φως ----------

    // Το πλησιέστερο από τα 11 χρώματα (για το sprite του φωτός)
    _nearestColor (r, g, b) {
      let best = 0;
      let bestD = Infinity;
      WEDO_COLORS.forEach((c, i) => {
        const d = (c[0] - r) ** 2 + (c[1] - g) ** 2 + (c[2] - b) ** 2;
        if (d < bestD) { bestD = d; best = i; }
      });
      return best;
    }

    _setRGB (r, g, b) {
      this.lightIndex = this._nearestColor(r, g, b);
      return this._send('outputCommand',
        [LED_PORT, 4, 3, clamp(Math.round(r), 0, 255), clamp(Math.round(g), 0, 255), clamp(Math.round(b), 0, 255)],
        'led');
    }

    setLightColor (args) {
      const idx = clamp(Math.round(Scratch.Cast.toNumber(args.COLOR)), 0, 10);
      this.lightIndex = idx;
      const [r, g, b] = WEDO_COLORS[idx];
      return this._setRGB(r, g, b);
    }

    setLightHue (args) {
      let h = Scratch.Cast.toNumber(args.HUE) % 100;
      if (h < 0) h += 100;
      const hue = h * 3.6;
      const f = (n) => {
        const k = (n + hue / 60) % 6;
        return 255 * (1 - Math.max(0, Math.min(k, 4 - k, 1)));
      };
      return this._setRGB(f(5), f(3), f(1));
    }

    setLightRGB (args) {
      return this._setRGB(Scratch.Cast.toNumber(args.R), Scratch.Cast.toNumber(args.G), Scratch.Cast.toNumber(args.B));
    }

    lightOff () {
      return this._setRGB(0, 0, 0);
    }

    // ---------- Ήχος ----------

    _tone (hz, ms) {
      hz = clamp(Math.round(hz), 20, 20000);
      ms = clamp(Math.round(ms), 0, 3000);
      if (ms === 0) return Promise.resolve(); // διάρκεια 0 = παίζει για πάντα στο WeDo
      this._send('outputCommand',
        [PIEZO_PORT, 2, 4, hz & 0xff, (hz >> 8) & 0xff, ms & 0xff, (ms >> 8) & 0xff], 'tone');
      return sleep(ms);
    }

    playNote (args) {
      const note = clamp(Scratch.Cast.toNumber(args.NOTE), 25, 125);
      const hz = 440 * Math.pow(2, (note - 69) / 12);
      return this._tone(hz, Scratch.Cast.toNumber(args.SEC) * 1000);
    }

    playFreq (args) {
      return this._tone(Scratch.Cast.toNumber(args.HZ), Scratch.Cast.toNumber(args.SEC) * 1000);
    }

    stopTone () {
      return this._send('outputCommand', [PIEZO_PORT, 3], 'tone');
    }

    // ---------- Αισθητήρες ----------

    getDistance () {
      return this.sensors.distance;
    }

    whenDistance (args) {
      const ref = Scratch.Cast.toNumber(args.REF);
      return args.OP === '<' ? this.sensors.distance < ref : this.sensors.distance > ref;
    }

    // Κωδικοί κατεύθυνσης του αισθητήρα κλίσης (ίδιοι με την εφαρμογή WeDo 2.0):
    // 0 = καμία, 3 = πίσω (κάτω), 5 = δεξιά, 7 = αριστερά, 9 = μπροστά (πάνω)
    _dir () {
      switch (this.sensors.tiltCode) {
      case 9: return 'up';
      case 3: return 'down';
      case 7: return 'left';
      case 5: return 'right';
      default: return null;
      }
    }

    // Η γωνία δεν μετριέται στη λειτουργία κατεύθυνσης· κρατιέται για παλιά projects
    _angle (dir) { return this._dir() === dir ? 45 : 0; }

    _tilted (dir) {
      const d = this._dir();
      return dir === 'any' ? d !== null : d === dir;
    }

    whenTilted (args) { return this._tilted(args.DIR); }
    isTilted (args) { return this._tilted(args.DIR); }
    tiltAngle (args) { return this._angle(args.DIR); }
    tiltCode () { return this.sensors.tiltCode || 0; }

    tiltDirection () {
      const names = { up: T.up, down: T.down, left: T.left, right: T.right };
      const d = this._dir();
      return d ? names[d] : T.none;
    }

    whenShaken () {
      return Date.now() - this.lastShake < 300;
    }

    // ---------- Hub ----------

    whenButton () { return this.sensors.button; }
    buttonPressed () { return this.sensors.button; }
    getBattery () { return this.sensors.battery; }
    getStatus () { return this.status; }
    isConnectedBlock () { return this.isConnected(); }

    renameHub (args) {
      if (!this.isConnected() || !this.chars.name) return;
      const enc = new TextEncoder();
      let out = '';
      for (const ch of String(args.NAME)) {
        if (enc.encode(out + ch).length > 14) break;
        out += ch;
      }
      if (!out) return;
      const data = enc.encode(out);
      return this._enqueue('name', () => this.chars.name.writeValue(data));
    }

    // ---------- Sprites του hub ----------

    isSimulation () { return !this.isConnected(); }

    spriteShows (args, util) {
      const t = util && util.target;
      if (t && !t.isStage) this.mirrors.set(t.id, args.PART);
    }

    // Ποιο μέρος του hub δείχνει ένα sprite: από το block ή από τα ονόματα των στολών (hb:…)
    _kindOf (t) {
      if (this.mirrors.has(t.id)) return this.mirrors.get(t.id);
      const names = t.getCostumes().map((c) => c.name);
      if (!names.some((n) => n.indexOf('hb:') === 0)) return null;
      if (names.includes('hb:motor')) return 'motorA';
      if (names.includes('hb:motor-b')) return 'motorB';
      if (names.some((n) => n.indexOf('hb:light-') === 0)) return 'light';
      if (names.some((n) => n.indexOf('hb:tilt-') === 0)) return 'tilt';
      if (names.includes('hb:distance')) return 'distance';
      if (names.includes('hb:obstacle')) return 'obstacle';
      return null;
    }

    _costume (t, name) {
      const i = t.getCostumeIndexByName(name);
      if (i >= 0 && t.currentCostume !== i) t.setCostume(i);
      return i >= 0;
    }

    _mirrorLoop (now) {
      requestAnimationFrame(this._mirrorLoop);
      const dt = this.lastTick ? Math.min(0.1, (now - this.lastTick) / 1000) : 0;
      this.lastTick = now;
      const rt = vm.runtime;
      const mouse = rt.ioDevices && rt.ioDevices.mouse;
      const down = mouse ? mouse.getIsDown() : false;
      let obstacle = null;
      const shown = [];
      for (const t of rt.targets) {
        if (!t.isOriginal || t.isStage) continue;
        const kind = this._kindOf(t);
        if (kind === 'obstacle') obstacle = t;
        else if (kind) shown.push([t, kind]);
      }
      for (const [t, kind] of shown) {
        try {
          this._mirrorOne(t, kind, dt, down, obstacle);
        } catch (e) { /* ένα sprite με πρόβλημα δεν σταματά τα υπόλοιπα */ }
      }
      for (const id of this.mirrors.keys()) if (!rt.getTargetById(id)) this.mirrors.delete(id);
      this.lastDown = down;
      if (now - (this.badgeTime || 0) > 400) {
        this.badgeTime = now;
        this._updateBadge();
      }
    }

    // Ένδειξη στη γραμμή μενού: κατάσταση σύνδεσης και μπαταρία· με κλικ γίνεται σύνδεση
    _updateBadge () {
      if (typeof document === 'undefined') return;
      const host = document.getElementById('hubblocks-status');
      if (!host) return;
      if (!this.badge || !host.contains(this.badge)) {
        const b = document.createElement('button');
        b.type = 'button';
        b.style.cssText = 'font: inherit; font-weight: 700; font-size: 0.8rem; color: #FFFFFF; cursor: pointer; ' +
          'background: rgba(255, 255, 255, 0.18); border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 999px; ' +
          'padding: 4px 12px; white-space: nowrap; line-height: 1.4;';
        b.addEventListener('click', () => {
          if (!this.isConnected()) this.connect();
        });
        host.appendChild(b);
        this.badge = b;
      }
      let text;
      if (this.isConnected()) {
        const bat = this.sensors.battery;
        text = '🟢 ' + T.badgeOn + (bat !== '' && bat !== undefined ? ' · 🔋 ' + bat + '%' : '');
        this.badge.title = this.status;
        this.badge.style.cursor = 'default';
      } else if (/…$/.test(this.status)) {
        text = '🟡 ' + this.status;
        this.badge.title = this.status;
      } else {
        text = '⚪ ' + T.badgeOff;
        this.badge.title = T.badgeTip;
        this.badge.style.cursor = 'pointer';
      }
      if (this.badge.textContent !== text) this.badge.textContent = text;
    }

    _mirrorOne (t, kind, dt, down, obstacle) {
      const state = this.mirrorState.get(t.id) || { angle: 0 };
      this.mirrorState.set(t.id, state);
      if (kind === 'motorA' || kind === 'motorB') {
        const m = this.motors[kind === 'motorA' ? 0 : 1];
        if (m.on && m.level > 0) {
          state.angle = (state.angle + m.level * 36 * m.dir * dt) % 360; // ισχύς 10 = μία στροφή το δευτερόλεπτο
          t.setDirection(90 + state.angle);
        }
      } else if (kind === 'light') {
        if (!this._costume(t, 'hb:light-' + this.lightIndex)) t.setEffect('ghost', this.lightIndex === 0 ? 70 : 0);
      } else if (kind === 'tilt') {
        // χωρίς hub: κάθε κλικ στο sprite = επόμενη κατεύθυνση
        if (!this.isConnected() && down && !this.lastDown && t.isTouchingObject('_mouse_')) {
          const order = [0, 9, 3, 7, 5];
          const next = order[(order.indexOf(this.sensors.tiltCode || 0) + 1) % order.length];
          this.sensors.tiltCode = next;
          state.pressHome = { x: t.x, y: t.y };
        }
        if (state.pressHome && !down) {
          t.setXY(state.pressHome.x, state.pressHome.y); // στον editor το κλικ μπορεί να μετακίνησε το sprite
          state.pressHome = null;
        }
        const name = { 9: 'up', 3: 'down', 7: 'left', 5: 'right' }[this.sensors.tiltCode] || 'none';
        if (!this._costume(t, 'hb:tilt-' + name)) {
          t.setDirection({ up: 0, down: 180, left: -90, right: 90, none: 90 }[name]);
        }
      } else if (kind === 'distance' && obstacle) {
        const start = t.x + 70;
        if (this.isConnected()) {
          obstacle.setXY(start + this.sensors.distance * 2.5, t.y); // με hub: το εμπόδιο δείχνει την πραγματική απόσταση
        } else {
          this.sensors.distance = clamp(Math.round((obstacle.x - start) / 2.5), 0, 100); // χωρίς hub: η απόσταση ακολουθεί το εμπόδιο
        }
      }
    }

    stopAll () {
      if (!this.isConnected()) {
        this.motors.forEach((m) => { this._clearTimer(m); m.on = false; });
        return;
      }
      [0, 1].forEach((i) => {
        if (this.ports[i] === DEV.MOTOR) this._motorStop(i);
      });
      this.stopTone();
    }
  }

  Scratch.extensions.register(new WeDo2GR());
})(Scratch);
