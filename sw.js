/* 11/6 기차용: 저장해 둔 파일로 인터넷 없이 하기 */
const CN = 'nb-offline-1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const c = await caches.open(CN);
    const nav = req.mode === 'navigate' || /\/(index\.html)?$/.test(new URL(req.url).pathname);
    if (nav) {   // 첫 화면은 인터넷 되면 새 판, 안 되면 저장본
      try { const r = await fetch(req); if (r.ok) return r; } catch (err) {}
      return (await c.match('index.html')) || (await c.match('./')) || Response.error();
    }
    let r = await c.match(req, { ignoreSearch: true });
    if (!r) return fetch(req);
    const range = req.headers.get('range');
    if (range) {   // 영상·소리는 사파리가 조각으로 달라고 해서 잘라서 줌
      const buf = await r.arrayBuffer(), n = buf.byteLength, m = /bytes=(\d*)-(\d*)/.exec(range) || [];
      let s = m[1] ? +m[1] : 0, en = m[2] ? Math.min(+m[2], n - 1) : n - 1;
      if (!m[1] && m[2]) { s = Math.max(0, n - +m[2]); en = n - 1; }
      return new Response(buf.slice(s, en + 1), { status: 206, headers: { 'Content-Range': `bytes ${s}-${en}/${n}`, 'Content-Length': String(en - s + 1), 'Content-Type': r.headers.get('Content-Type') || 'application/octet-stream', 'Accept-Ranges': 'bytes' } });
    }
    return r;
  })());
});
