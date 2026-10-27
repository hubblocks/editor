// HubBlocks – τελικά βήματα μετά το «npm run build».
// 1. Κάνει την εφαρμογή εγκαταστάσιμη και να λειτουργεί χωρίς internet.
// 2. Φορτώνει αυτόματα τα blocks του hub στη γλώσσα του editor.
// 3. Η αρχική διεύθυνση ανοίγει κατευθείαν τον editor.
// Δεν αλλάζει τίποτα στον κώδικα του TurboWarp.
'use strict';
const fs = require('fs');
const path = require('path');

const BUILD = 'build';
const ROOT = process.env.ROOT;                 // /editor/
const VERSION = process.env.VERSION || String(Date.now());

// ---------- 1. Manifest ----------
const manifest = {
  name: 'HubBlocks: Coding for Robots',
  short_name: 'HubBlocks',
  description: 'Block coding for the LEGO® Education WeDo 2.0 hub. Works on tablets and offline, without Scratch Link. Not affiliated with the LEGO Group.',
  start_url: 'editor.html',
  scope: './',
  display: 'standalone',
  background_color: '#FFFFFF',
  theme_color: '#006BB6',
  icons: [
    { src: 'hubblocks-icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: 'hubblocks-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: 'hubblocks-icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ],
  shortcuts: [
    { name: 'Ελληνικά', url: 'editor.html?lang=el' },
    { name: 'English', url: 'editor.html?lang=en' }
  ]
};
fs.writeFileSync(path.join(BUILD, 'hubblocks.webmanifest'), JSON.stringify(manifest, null, 2));

// ---------- 2. Κοινά στοιχεία για όλες τις σελίδες ----------
const head = `
<link rel="manifest" href="hubblocks.webmanifest">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="theme-color" content="#006BB6">
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('offline-sw.js', { scope: './' }).catch(function (e) { console.warn('offline', e); });
    });
  }
</script>
`;

// Φορτώνει τα blocks του hub στη γλώσσα του editor (ίδια ρύθμιση με το μενού γλώσσας του TurboWarp).
// ?lang=el ή ?lang=en αλλάζει τη γλώσσα και την αποθηκεύει.
const autoload = `
<script>
(function () {
  var p = new URLSearchParams(location.search);
  var lang = p.get('lang');
  try {
    if (lang === 'el' || lang === 'en') localStorage.setItem('tw:language', lang);
    else lang = localStorage.getItem('tw:language');
  } catch (e) {}
  if (!lang) lang = (navigator.language || '').toLowerCase();
  lang = lang.indexOf('el') === 0 ? 'el' : 'en';
  var ext = new URL('extensions/hub-' + lang + '.js', location.href).href;
  var others = p.getAll('extension').filter(function (u) { return !/\\/extensions\\/hub-(el|en)\\.js$/.test(u); });
  var want = others.concat([ext]);
  var have = p.getAll('extension');
  if (p.has('lang') || want.join('|') !== have.join('|')) {
    p.delete('lang');
    p.delete('extension');
    want.forEach(function (u) { p.append('extension', u); });
    location.replace(location.pathname + '?' + p.toString() + location.hash);
  }
})();
</script>
`;

const inject = (file, extra) => {
  const p = path.join(BUILD, file);
  if (!fs.existsSync(p)) return;
  let html = fs.readFileSync(p, 'utf8');
  if (html.includes('hubblocks.webmanifest')) return;
  // το autoload μπαίνει πρώτο στο <head>, πριν φορτωθεί ο editor
  html = html.replace(/<head>/i, '<head>' + (extra || ''));
  html = html.replace('</head>', head + '</head>');
  fs.writeFileSync(p, html);
};
inject('editor.html', autoload);
inject('fullscreen.html');

// Η αρχική σελίδα (/editor/) ανοίγει κατευθείαν τον editor
fs.writeFileSync(path.join(BUILD, 'index.html'), `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>HubBlocks</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
${head}
<script>location.replace('editor.html' + location.search + location.hash);</script>
</head><body><a href="editor.html">HubBlocks</a></body></html>
`);

// ---------- 3. Offline service worker ----------
const files = [];
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else files.push(path.relative(BUILD, full).split(path.sep).join('/'));
  }
};
walk(BUILD);
const precache = files
  .filter((f) => !f.endsWith('.map') && f !== 'offline-sw.js' && f !== 'sw.js')
  .map((f) => ROOT + f.split('/').map(encodeURIComponent).join('/'));

const sw = `// HubBlocks offline service worker – ${VERSION}
const CACHE = 'hubblocks-' + ${JSON.stringify(VERSION)};
const ROOT = ${JSON.stringify(ROOT)};
const PRECACHE = ${JSON.stringify(precache)};

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(PRECACHE.map((url) => cache.add(new Request(url, { cache: 'reload' }))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('hubblocks-') && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(ROOT)) return;

  if (request.mode === 'navigate') {
    // σελίδες: πρώτα το internet (ενημερώσεις), αλλιώς η αποθηκευμένη
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) (await caches.open(CACHE)).put(url.pathname, response.clone());
        return response;
      } catch (e) {
        return (await caches.match(url.pathname, { ignoreSearch: true })) ||
          (await caches.match(ROOT + 'editor.html')) || Response.error();
      }
    })());
    return;
  }

  // υπόλοιπα αρχεία: από τη συσκευή, αλλιώς από το internet
  event.respondWith((async () => {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) (await caches.open(CACHE)).put(request, response.clone());
    return response;
  })());
});
`;
fs.writeFileSync(path.join(BUILD, 'offline-sw.js'), sw);
console.log(`HubBlocks: ${precache.length} files for offline use, version ${VERSION}`);
