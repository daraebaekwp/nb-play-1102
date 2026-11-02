/* 오프닝 v3 (10/23): 새 곡 「고양이를 키웠더니 오프닝 (내 집)」 1:06, 156BPM.
   레퍼런스: .feast Tarot(빨강·검정·흰 3색, 아주 길쭉한 큰 글자, 띄엄띄엄 작은 단어, 띠 사진, 눈),
   케데헌 HOW IT'S DONE(인물과 겹치는 굵은 글자, 좌우로 쌓는 단어), hfm(단어 하나씩 툭), 루더스(시계).
   단어 시간 = 새 곡 받아적기(whisper) 단어 시작 시간. 쓰는 법: playOpeningV3({ stage, name, onDone }) */
(function () {
  const BASE = (window.OP3_BASE || '');
  const SRC = BASE + 'bgm/오프닝_내집_v3.mp3';
  const IMG = p => BASE + 'img/' + p;
  const BEAT = 60 / 156;
  const BEATS = [0.096,0.512,0.896,1.312,1.696,2.112,2.496,2.880,3.296,3.680,4.096,4.480,4.864,5.248,5.568,5.888,6.272,6.656,7.040,7.456,7.840,8.224,8.608,8.992,9.408,9.792,10.208,10.592,10.976,11.392,11.776,12.160,12.576,12.960,13.376,13.760,14.144,14.528,14.944,15.328,15.712,16.128,16.512,16.928,17.312,17.696,18.080,18.496,18.880,19.264,19.680,20.064,20.480,20.864,21.248,21.664,22.048,22.432,22.816,23.232,23.616,24.000,24.416,24.800,25.184,25.600,25.984,26.368,26.784,27.168,27.552,27.968,28.352,28.736,29.152,29.536,29.920,30.304,30.720,31.104,31.488,31.904,32.288,32.672,33.056,33.440,33.856,34.240,34.656,35.040,35.424,35.808,36.224,36.608,36.992,37.408,37.792,38.176,38.560,38.944,39.360,39.744,40.160,40.544,40.928,41.312,41.728,42.112,42.496,42.880,43.296,43.680,44.064,44.480,44.864,45.248,45.632,46.048,46.432,46.816,47.232,47.616,48.000,48.384,48.768,49.184,49.568,49.952,50.336,50.752,51.136,51.520,51.936,52.320,52.704,53.088,53.504,53.888,54.272,54.688,55.072,55.456,55.840,56.256,56.640,57.024,57.408,57.792,58.176,58.560,58.976,59.360,59.776,60.160,60.544,60.928,61.344,61.728,62.112,62.496,62.880,63.296,63.680,64.064,64.448]; /* 노래에서 뽑은 실제 박자(초) */

  const CSS = `
  @font-face { font-family:'Op3Black'; src:url(${BASE}fonts/BlackHanSans-Regular.ttf) format('truetype'); font-display:block; }
  @font-face { font-family:'Op3Pre'; src:url(${BASE}fonts/PretendardVariable.woff2) format('woff2'); font-weight:100 900; font-display:block; }
  #op3 { --ink:#0d0d0e; --red:#e3222f; --paper:#eeebe4; --forest:#15382a; --cream:#f6eedc; --coral:#ff5a5c; --gold:#f3c95a; --violet:#9a66ff;
    position:absolute; inset:0; z-index:96; overflow:hidden; container-type:size; background:var(--ink); color:var(--paper);
    font-family:'Op3Pre',sans-serif; transition:opacity .7s; }
  #op3.out { opacity:0; }
  #op3 .sc { display:block; opacity:1; gap:0; padding:0; font-size:inherit; align-items:normal; animation:none; } /* 10/24: 게임 본편 .sc(결과창, 흐리게 .45)가 오프닝 장면에 먹던 것 막기 */
  #op3 .hh { background:none; -webkit-text-fill-color:currentColor; font-weight:inherit; }
  #op3 .sc { position:absolute; inset:-2%; transform-origin:50% 50%; }
  #op3 .grain { position:absolute; inset:0; pointer-events:none; z-index:50; opacity:0; mix-blend-mode:multiply;
    background:radial-gradient(circle, #000 0 32%, transparent 36%) 0 0/.42cqw .42cqw; }
  #op3 .vig { position:absolute; inset:0; pointer-events:none; z-index:49; background:radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.28)); }
  #op3 .a { position:absolute; }
  #op3 .a > * { display:block; }
  #op3 .w { white-space:nowrap; line-height:.9; }
  #op3 .blk { font-family:'Op3Black',sans-serif; font-weight:400 !important; font-synthesis:none; letter-spacing:-.01em; }
  #op3 .tall { font-family:'Op3Black',sans-serif; transform:scale(.88,1.14); transform-origin:50% 50%; line-height:.8; letter-spacing:-.02em; }
  #op3 .sm { font-weight:800; letter-spacing:.14em; font-size:2.7cqw; }
  #op3 .xs { font-weight:700; letter-spacing:.12em; font-size:1.7cqw; opacity:.9; }
  #op3 .st { color:transparent !important; -webkit-text-stroke:.22cqw currentColor; }
  #op3 .ph { position:absolute; background-size:cover; background-position:center; }
  #op3 .duo { filter:grayscale(1) contrast(1.35) brightness(.9); }
  #op3 .tint { position:absolute; inset:0; mix-blend-mode:multiply; }
  #op3 .card { position:absolute; background:var(--cream); box-shadow:0 1.2cqw 0 rgba(0,0,0,.35); overflow:hidden; }
  #op3 .card img, #op3 .card .ph { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 8%; }
  #op3 .card.fr { border:.55cqw solid var(--cream); }
  #op3 .bar { position:absolute; left:0; right:0; background:#000; }
  #op3 .skip { position:absolute; right:2cqw; top:2.4cqh; z-index:60; padding:.5cqw 1.4cqw; border:1px solid #fff; background:transparent; color:#fff; font:600 1.1cqw 'Op3Pre',sans-serif; letter-spacing:.08em; cursor:pointer; opacity:.5; mix-blend-mode:difference; }
  #op3 .tag { font-weight:800; font-size:2cqw; letter-spacing:.06em; }
  #op3 svg { position:absolute; overflow:visible; }
  #op3 .sh { text-shadow:.022em .028em 0 rgba(27,18,12,.85), 0 .02em .16em rgba(20,12,8,.45), 0 0 .6em rgba(0,0,0,.18); }
  #op3 .px { position:absolute; inset:0; z-index:45; display:grid; grid-template-columns:repeat(16,1fr); grid-template-rows:repeat(9,1fr); pointer-events:none; }
  #op3 .scan { position:absolute; inset:0; z-index:48; pointer-events:none; background:none; opacity:0; }
  `;

  function playOpeningV3(cfg = {}) {
    const stage = cfg.stage || document.getElementById('stage') || document.body;
    const NAME = cfg.name || '나비';
    if (!document.getElementById('op3css')) { const s = document.createElement('style'); s.id = 'op3css'; s.textContent = CSS; document.head.appendChild(s); }
    const op = document.createElement('div'); op.id = 'op3';
    op.innerHTML = '<div class="vig"></div><div class="grain"></div><div class="scan"></div><button class="skip">SKIP ▶▶</button>';
    stage.appendChild(op);
    const cam = document.createElement('div'); cam.style.cssText = 'position:absolute;inset:0;transform-origin:50% 50%'; op.insertBefore(cam, op.firstChild);
    cam.animate([{ scale:'1.02', translate:'0 0' }, { scale:'1.055', translate:'-.7% .35%' }, { scale:'1.035', translate:'.6% -.3%' }, { scale:'1.02', translate:'0 0' }], { duration:15000, iterations:Infinity, easing:'ease-in-out' });
    const pre = ['cg/여는_1_1.jpg','cg/여는_1_2.jpg','cg/여는_1_3.jpg','cg/여는_1_3b.jpg','op3/전/여는_2_1.jpg','op3/전/여는_2_2.jpg','op3/전/여는_3_2.jpg','op3/전/여는_4_2.jpg','op3/전/엔딩_창문_기본.jpg','op3/전/타이틀_키비주얼.jpg',
      ...['나비_청소년.png','폼폼.png','모모.png','로완.png','밀로.png','헤이즐.png','루비.png','몰리_상반신.png','카일_상반신.png','루네.png','실라스.jpg','휴고.jpg','언니.png'].map(f => 'op3/' + f)];
    const keepPre = []; [...pre, 'op3/전/여는_2_1.jpg','op3/전/여는_2_3.jpg','op3/전/여는_3_1.jpg','op3/전/열여덟_웃음.jpg','op3/전/여는_3_2.jpg','op3/전/여는_4_2.jpg','op3/전/여는_2_2.jpg','op3/전/엔딩_창문_기본.jpg','op3/전/타이틀_키비주얼.jpg','타이틀_글자.png'].forEach(p => { const i = new Image(); i.src = IMG(p); i.decode && i.decode().catch(() => {}); keepPre.push(i); });
    const preV = document.createElement('video'); preV.preload = 'auto'; preV.muted = true; /* 10/23: 나무 눈금 영상(동생 아기 때) 뺌 */

    const a = new Audio(SRC); a.volume = cfg.volume ?? 1; a.preload = 'auto';
    let sc = null, ei = 0, done = false, raf = 0, wall0 = performance.now(), started = false, seekT = cfg.from || 0;

    /* ---------- 도구 ---------- */
    const ease = { o:'cubic-bezier(.2,.9,.25,1)', bk:'cubic-bezier(.3,1.5,.45,1)', io:'cubic-bezier(.6,0,.2,1)', in:'cubic-bezier(.7,0,.9,.4)' };
    const BG = { ink:'#0d0d0e', red:'#e3222f', paper:'#eeebe4', gray:'#8b8a87', forest:'#15382a', cream:'#f6eedc', coral:'#ff5a5c', night:'#0b1020' };
    const FG = { ink:'#eeebe4', red:'#0d0d0e', paper:'#0d0d0e', gray:'#f6f4ef', forest:'#f6eedc', cream:'#15382a', coral:'#fff4e6', night:'#f6eedc' };
    let cur = 'ink';
    function cut(bg, o = {}) {
      const old = sc; cur = bg;
      sc = document.createElement('div'); sc.className = 'sc'; sc.style.background = BG[bg]; sc.style.color = FG[bg];
      if (old && o.wipe) { old.after(sc); const dir = { l:['inset(0 100% 0 0)','inset(0 0 0 0)'], r:['inset(0 0 0 100%)','inset(0 0 0 0)'], u:['inset(100% 0 0 0)','inset(0 0 0 0)'], d:['inset(0 0 100% 0)','inset(0 0 0 0)'] }[o.wipe]; const wd = Math.max(320, o.wms || 0); sc.animate([{ clipPath:dir[0] }, { clipPath:dir[1] }], { duration:wd, easing:'cubic-bezier(.65,0,.35,1)', fill:'both' }); setTimeout(() => old.remove(), wd + 30); }
      else { if (old) old.remove(); cam.appendChild(sc); }
      const d = 0; /* 카메라가 계속 조금씩 움직임 */
      if (d) sc.animate([{ transform:`scale(1) translate(0,0) rotate(0deg)` }, { transform:`scale(${1 + .05 * d}) translate(${o.dx ?? -.6}%, ${o.dy ?? .3}%) rotate(${o.rot ?? 0}deg)` }], { duration:(o.len || 4) * 1000, easing:'linear', fill:'forwards' });
      if (o.flash && o.flash !== '#fff' && o.flash !== '#0d0d0e') flash(o.flash);
      if (old && !o.wipe) { sc.animate([{ opacity:0 }, { opacity:1 }], { duration:180, fill:'both' }); }
      return sc;
    }
    function flash(c = '#fff', ms = 140) { const f = add(`<div style="position:absolute;inset:0;background:${c};z-index:40"></div>`, {}, op); f.animate([{ opacity:1 }, { opacity:0 }], { duration:ms, fill:'forwards' }); setTimeout(() => f.remove(), ms + 60); }
    function add(html, st = {}, parent = sc) { const t = document.createElement('template'); t.innerHTML = html.trim(); const el = t.content.firstChild; Object.assign(el.style, st); parent.appendChild(el); return el; }
    /* 글자: x,y는 화면 % 위치, ax/ay는 기준점(0=왼쪽/위, .5=가운데, 1=오른쪽/아래) */
    function W(text, o = {}) {
      const box = add(`<div class="a"></div>`, { left:(o.x ?? 50) + '%', top:(o.y ?? 50) + '%', transform:`translate(${-(o.ax ?? .5) * 100}%, ${-(o.ay ?? .5) * 100}%) rotate(${o.r || 0}deg)`, zIndex:o.z || 5 }, o.p || sc);
      const span = document.createElement('div'); span.className = 'w ' + (o.c || 'blk');
      if (o.split) [...text].forEach((ch, k) => { const c = document.createElement('span'); c.textContent = ch; c.style.display = 'inline-block'; span.appendChild(c); c.animate(punch ? [{ transform:'translateY(-70%) rotate(-6deg)', opacity:0 }, { transform:'translateY(5%) rotate(1deg)', opacity:1, offset:.65 }, { transform:'none', opacity:1 }] : [{ transform:'translateY(45%)', opacity:0, clipPath:'inset(100% -30% -80% -30%)' }, { transform:'translateY(0)', opacity:1, clipPath:'inset(-80% -30% -80% -30%)' }], { duration:240, delay:(o.d || 0) + k * (o.split === true ? 60 : o.split), easing:'cubic-bezier(.16,1,.3,1)', fill:'both' }); });
      else span.textContent = text;
      if (o.s) span.style.fontSize = o.s + 'cqw'; span.style.transformOrigin = `${(o.ax ?? .5) * 100}% 50%`; if (o.col) { span.style.color = o.col; if ((o.c || '').includes('st')) span.style.webkitTextStrokeColor = o.col; }
      if (o.box) { span.style.background = o.box; span.style.padding = '.18em .32em .1em'; } if (o.ls != null) span.style.letterSpacing = o.ls + 'em';
      const inner = document.createElement('div'); inner.appendChild(span); box.appendChild(inner);
      if (!o.split) anim(o.in === 'track' ? span : inner, o.in || 'pop', o.d);
      if ((o.s || 0) >= 6) box.animate([{ scale:'1' }, { scale:'1.05' }], { duration:4200, delay:(o.d || 0) + 250, easing:'linear', fill:'forwards' });
      if (o.gl) glitch(span, (o.d || 0) + (o.split ? [...text].length * 60 + 120 : 200));
      return box;
    }
    const ROWS = {};
    function ROW(k, o = {}) { /* 가사 한 줄 자리: 단어가 왼쪽부터 차례로 붙음 */
      ROWS[k] = add(`<div class="a" style="left:${o.x}%;top:${o.y}%;transform:translateY(-50%);display:flex;gap:.32em;align-items:baseline;font:800 ${o.s || 4.4}cqw 'Op3Pre',sans-serif;letter-spacing:-.01em;white-space:nowrap;z-index:${o.z || 6};color:${o.col || 'inherit'}"></div>`);
      return ROWS[k];
    }
    function RW(k, text, o = {}) { const r = ROWS[k]; if (!r || !r.isConnected) return; const w = document.createElement('span'); w.textContent = text; if (o.col) w.style.color = o.col; if (o.s) { w.style.fontSize = o.s + 'em'; w.style.lineHeight = '.9'; } r.appendChild(w);
      w.animate([{ transform:'translateY(40%)', opacity:0, clipPath:'inset(100% -20% -60% -20%)' }, { transform:'none', opacity:1, clipPath:'inset(-60% -20% -60% -20%)' }], { duration:220, easing:'cubic-bezier(.16,1,.3,1)', fill:'both' }); }
    /* 가운데 정렬 줄: 단어 자리를 미리 잡아 두고(안 보이게) 차례로 나타나게 → 줄이 흔들리지 않음 */
    function ROWC(k, words, o = {}) {
      const r = add(`<div class="a${o.blk ? ' blk' : ''}${o.sh ? ' sh' : ''}" style="left:${o.x ?? 50}%;top:${o.y}%;transform:translate(-50%,-50%);display:flex;gap:${o.gap ?? .3}em;align-items:baseline;font-size:${o.s}cqw;font-weight:${o.blk ? 400 : 800};white-space:nowrap;line-height:.95;z-index:${o.z || 8};${o.blk ? "font-family:'Op3Black',sans-serif;" : "font-family:'Op3Pre',sans-serif;"}"></div>`);
      words.forEach((w, i) => { const sp = document.createElement('span'); sp.textContent = w; sp.style.opacity = 0; sp.style.display = 'inline-block'; if (o.cols && o.cols[i]) sp.style.color = o.cols[i]; r.appendChild(sp); });
      if ((o.s || 0) >= 6) r.animate([{ scale:'1' }, { scale:'1.05' }], { duration:4200, easing:'linear', fill:'forwards' });
      ROWS[k] = r; return r;
    }
    function RV(k, i, how = 'rise') { const r = ROWS[k]; if (!r || !r.isConnected) return; const sp = r.children[i]; if (!sp) return; sp.style.opacity = 1;
      const K = { rise:[[{ transform:'translateY(40%)', opacity:0, clipPath:'inset(100% -20% -60% -20%)' }, { transform:'none', opacity:1, clipPath:'inset(-60% -20% -60% -20%)' }], 240],
        slam:[[{ transform:'scale(1.7)', opacity:0 }, { transform:'scale(.97)', opacity:1, offset:.7 }, { transform:'scale(1)', opacity:1 }], 200],
        drop:[[{ transform:'translateY(-90%)', opacity:0 }, { transform:'translateY(6%)', opacity:1, offset:.65 }, { transform:'none', opacity:1 }], 300],
        track:[[{ letterSpacing:'1em', opacity:0 }, { letterSpacing:'0em', opacity:1 }], 360] }[how];
      sp.animate(K[0], { duration:K[1], easing:'cubic-bezier(.16,1,.3,1)', fill:'both' }); }
    function glitch(el, d = 0) {
      el.animate([
        { transform:'translate(0,0)', textShadow:'none', clipPath:'inset(-50% -10% -50% -10%)' },
        { transform:'translate(-.8cqw,.2cqw)', textShadow:'.6cqw 0 #00e5ff, -.6cqw 0 #ff2a3a', clipPath:'inset(10% -10% 55% -10%)', offset:.15 },
        { transform:'translate(.9cqw,-.3cqw)', textShadow:'-.5cqw 0 #00e5ff, .5cqw 0 #ff2a3a', clipPath:'inset(48% -10% 8% -10%)', offset:.35 },
        { transform:'translate(-.3cqw,0)', textShadow:'.3cqw 0 #00e5ff', clipPath:'inset(-50% -10% -50% -10%)', offset:.55 },
        { transform:'translate(0,0)', textShadow:'none', clipPath:'inset(-50% -10% -50% -10%)' }], { duration:320, delay:d, easing:'steps(1,end)' });
    }
    function pixels(col, ms = 260) { /* 픽셀 블록이 촤르륵 덮였다가 사라짐 */
      const g = document.createElement('div'); g.className = 'px'; op.appendChild(g);
      for (let i = 0; i < 144; i++) { const c = document.createElement('i'); c.style.background = col; g.appendChild(c); const d = Math.random() * ms * .6;
        c.animate([{ opacity:0 }, { opacity:1, offset:.01 }, { opacity:1, offset:.5 }, { opacity:0, offset:.51 }, { opacity:0 }], { duration:ms * 1.6, delay:d, fill:'both', easing:'steps(1,end)' }); }
      setTimeout(() => g.remove(), ms * 2.2);
    }
    function TUNNEL(o = {}) { /* 사각형 터널이 달려옴 */
      const n = o.n || 14, col = o.col || '#9a66ff', dur = (o.dur || 1.2) * 1000;
      const w = add(`<div style="position:absolute;inset:0;z-index:${o.z || 4};overflow:hidden"></div>`);
      for (let i = 0; i < n; i++) { const r = document.createElement('div'); r.style.cssText = `position:absolute;left:50%;top:50%;width:40cqw;height:22.5cqw;margin:-11.25cqw 0 0 -20cqw;border:.5cqw solid ${i % 3 === 0 ? (o.acc || '#eeebe4') : col}`; w.appendChild(r);
        r.animate([{ transform:'scale(.02)', opacity:0 }, { transform:'scale(.2)', opacity:1, offset:.3 }, { transform:'scale(4)', opacity:1 }], { duration:dur, delay:i * dur / n, iterations:o.loop || 2, easing:'cubic-bezier(.7,0,.9,.6)' }); }
      return w;
    }
    function anim(el, k, d = 0) {
      const K = {
        stretch:[[{ transform:'scaleX(2.4)', opacity:0 }, { transform:'scaleX(.96)', opacity:1, offset:.7 }, { transform:'scaleX(1)', opacity:1 }], 320, 'cubic-bezier(.16,1,.3,1)'],
        blur:  [[{ transform:'scale(1.35)', opacity:0 }, { transform:'scale(1)', opacity:1 }], 380, 'cubic-bezier(.16,1,.3,1)'],
        track: [[{ letterSpacing:'1.2em', opacity:0 }, { letterSpacing:'0em', opacity:1 }], 380, 'cubic-bezier(.16,1,.3,1)'],
        drop:  [[{ transform:'translateY(-90%)', opacity:0 }, { transform:'translateY(6%)', opacity:1, offset:.65 }, { transform:'translateY(0)', opacity:1 }], 300, 'cubic-bezier(.2,.9,.3,1.2)'],
        rise:  [[{ transform:'translateY(38%)', clipPath:'inset(100% -30% -80% -30%)' }, { transform:'translateY(0)', clipPath:'inset(-80% -30% -80% -30%)' }], 260, 'cubic-bezier(.16,1,.3,1)'],
        pop:   [[{ transform:'scale(.55)', opacity:0 }, { transform:'scale(1.08)', opacity:1, offset:.6 }, { transform:'scale(1)', opacity:1 }], 230, ease.o],
        slam:  [[{ transform:'scale(1.7)', opacity:0 }, { transform:'scale(.97)', opacity:1, offset:.7 }, { transform:'scale(1)', opacity:1 }], 170, ease.o],
        up:    [[{ transform:'translateY(45%)', opacity:0 }, { transform:'translateY(0)', opacity:1 }], 260, ease.o],
        down:  [[{ transform:'translateY(-70%)', opacity:0 }, { transform:'translateY(0)', opacity:1 }], 240, ease.o],
        left:  [[{ transform:'translateX(-40%)', opacity:0 }, { transform:'translateX(0)', opacity:1 }], 260, ease.o],
        right: [[{ transform:'translateX(40%)', opacity:0 }, { transform:'translateX(0)', opacity:1 }], 260, ease.o],
        wipe:  [[{ clipPath:'inset(0 100% 0 0)' }, { clipPath:'inset(0 0 0 0)' }], 300, ease.io],
        wipeu: [[{ clipPath:'inset(100% 0 0 0)' }, { clipPath:'inset(0 0 0 0)' }], 320, ease.io],
        fade:  [[{ opacity:0 }, { opacity:1 }], 500, 'linear'],
        type:  [[{ opacity:0, letterSpacing:'.9em' }, { opacity:1 }], 380, ease.o],
        none:  null };
      if (!el.classList.contains('ph')) { if (punch && ['pop','slam','up','down','left','right','rise'].includes(k)) k = 'slam'; else if (!punch && ['pop','slam','up','down','left','right','wipeu'].includes(k)) k = 'rise'; }
      const s = K[k]; if (!s) return; el.animate(s[0], { duration:s[1], delay:d, easing:s[2], fill:'both' });
    }
    /* 사진: 화면 위 네모(x,y,w,h %). duo=흑백+색 입히기 */
    let kbi = 0;
    function P(src, o = {}) {
      const el = add(`<div class="ph${o.duo ? ' duo' : ''}"></div>`, { left:(o.x ?? 0) + '%', top:(o.y ?? 0) + '%', width:(o.w ?? 100) + '%', height:(o.h ?? 100) + '%', backgroundImage:`url("${IMG(src)}")`, backgroundPosition:o.pos || 'center', zIndex:o.z || 1, transform:`rotate(${o.r || 0}deg)` }); if (o.filter) el.style.filter = o.filter;
      if (o.tint) { const t = add(`<div class="tint" style="background:${o.tint}"></div>`, {}, el); t.style.opacity = o.ta ?? 1; }
      if (o.zoom !== false) { const dir = (kbi++ % 2) ? 1 : -1; el.animate([{ transform:`rotate(${o.r || 0}deg) scale(1.02) translate(0,0)` }, { transform:`rotate(${o.r || 0}deg) scale(${(o.zoom || 1.08) + .1}) translate(${dir * 2.4}%, -1.2%)` }], { duration:Math.max(9, (o.zl || 3) * 2.2) * 1000, easing:'linear', fill:'forwards' }); }
      anim(el, o.in || 'fade', o.d);
      return el;
    }
    function SWAP(src, pos, dir) { const p = P(src, { pos, in:'none', zoom:1.1, zl:3.6 }); p.style.zIndex = 1; p.animate([{ clipPath: dir === 'l' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }, { clipPath:'inset(0 0 0 0)' }], { duration:380, easing:'cubic-bezier(.7,0,.2,1)', fill:'both' }); return p; }
    function SHADE() { return add('<div style="position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,rgba(0,0,0,.38),rgba(0,0,0,.08) 38%,rgba(0,0,0,.08) 62%,rgba(0,0,0,.45))"></div>'); }
    function FULL(src, pos) { const p = P(src, { pos, in:'none', zoom:1.1, zl:3.6 }); SHADE(); return p; }
    function CARD(src, o = {}) {
      const el = add(`<div class="card fr"><img src="${IMG(src)}" alt=""></div>`, { left:o.x + '%', top:o.y + '%', width:o.w + '%', height:o.h + '%', zIndex:o.z || 6, background:o.bg || 'var(--cream)' });
      if (o.pos) el.firstChild.style.objectPosition = o.pos;
      if (o.fit) el.firstChild.style.objectFit = o.fit;
      el.animate([{ transform:`translateY(${o.from ?? 60}cqh) rotate(${(o.r || 0) * 3}deg)` }, { transform:`translateY(-1.5cqh) rotate(${o.r || 0}deg)`, offset:.75 }, { transform:`translateY(0) rotate(${o.r || 0}deg)` }], { duration:o.dur || 380, easing:ease.o, fill:'both', delay:o.d || 0 });
      el.animate([{ translate:'0 0', rotate:'0deg' }, { translate:'0 -1.4cqh', rotate:`${(o.r || 0) > 0 ? -.8 : .8}deg` }, { translate:'0 0', rotate:'0deg' }], { duration:2600, delay:(o.dur || 380) + (o.d || 0), iterations:Infinity, easing:'ease-in-out' });
      return el;
    }
    /* 시계: 루더스 레퍼런스. 4시에 바늘이 탁 꽂힘 */
    function CLOCK(o = {}) {
      const s = o.size || 30, col = o.col || 'currentColor';
      const el = add(`<svg viewBox="-50 -50 100 100" style="left:${o.x}%;top:${o.y}%;width:${s}cqw;height:${s}cqw;transform:translate(-50%,-50%);z-index:${o.z || 3}">
        <circle r="46" fill="none" stroke="${col}" stroke-width="${o.sw || .8}"/>
        ${[...Array(12)].map((_, i) => `<line x1="0" y1="-46" x2="0" y2="${i % 3 ? -42 : -38}" stroke="${col}" stroke-width="${i % 3 ? .6 : 1.4}" transform="rotate(${i * 30})"/>`).join('')}
        <g class="hh"><line x1="0" y1="4" x2="0" y2="-24" stroke="${col}" stroke-width="3" stroke-linecap="round"/></g>
        <g class="mh"><line x1="0" y1="6" x2="0" y2="-38" stroke="${col}" stroke-width="1.8" stroke-linecap="round"/></g>
        <g class="sh"><line x1="0" y1="8" x2="0" y2="-42" stroke="${o.acc || '#e3222f'}" stroke-width=".8"/></g>
        <circle r="2.2" fill="${o.acc || '#e3222f'}"/></svg>`);
      return el;
    }
    function hands(el, h, m, ms = 0, from, turns = 0) { /* 시침 각도 = 시*30 + 분*.5 */
      const H = el.querySelector('.hh'), M = el.querySelector('.mh');
      const th = h * 30 + m * .5, tm = m * 6;
      if (!ms) { H.style.transform = `rotate(${th}deg)`; M.style.transform = `rotate(${tm}deg)`; return; }
      H.animate([{ transform:`rotate(${from ? from[0] : 0}deg)` }, { transform:`rotate(${th + 6}deg)`, offset:.8 }, { transform:`rotate(${th}deg)` }], { duration:ms, easing:ease.o, fill:'forwards' });
      M.animate([{ transform:`rotate(${from ? from[1] : 0}deg)` }, { transform:`rotate(${tm + 720 + turns * 360 + 10}deg)`, offset:.85 }, { transform:`rotate(${tm + 720 + turns * 360}deg)` }], { duration:ms, easing:ease.o, fill:'forwards' });
    }
    function tick(el, beats = 40) { /* 초침이 박자마다 한 칸 */
      const S = el.querySelector('.sh'); const kf = []; for (let i = 0; i <= beats; i++) kf.push({ transform:`rotate(${i * 6}deg)`, easing:'steps(1,end)' });
      S.animate(kf, { duration:beats * BEAT * 1000, fill:'forwards' });
    }
    /* 디지털 숫자 시계(7세그먼트). set('0359') 로 바꿈 */
    const SEG = { 0:'abcdef', 1:'bc', 2:'abged', 3:'abgcd', 4:'fgbc', 5:'afgcd', 6:'afgedc', 7:'abc', 8:'abcdefg', 9:'abcdfg' };
    function DIGI(o = {}) {
      const col = o.col || '#eeebe4', off = o.off || 'rgba(238,235,228,.07)';
      const segs = (x) => { const P = { a:[x+3,0,x+27,0,x+23,4,x+7,4], b:[x+30,3,x+30,27,x+26,24,x+26,7], c:[x+30,33,x+30,57,x+26,53,x+26,36], d:[x+3,60,x+27,60,x+23,56,x+7,56], e:[x,33,x,57,x+4,53,x+4,36], f:[x,3,x,27,x+4,24,x+4,7], g:[x+3,30,x+8,27.5,x+22,27.5,x+27,30,x+22,32.5,x+8,32.5] };
        return Object.entries(P).map(([k, p]) => `<polygon data-s="${k}" points="${p.join(' ')}"/>`).join(''); };
      const xs = [0, 36, 86, 122];
      const el = add(`<svg viewBox="-2 -4 158 72" style="left:${o.x}%;top:${o.y}%;width:${o.w}cqw;transform:translate(-50%,-50%);z-index:${o.z || 3}">
        ${xs.map((x, i) => `<g class="dg" data-i="${i}">${segs(x)}</g>`).join('')}
        <g class="cl"><rect x="72" y="16" width="6" height="6" fill="${o.acc || '#e3222f'}"/><rect x="72" y="40" width="6" height="6" fill="${o.acc || '#e3222f'}"/></g></svg>`);
      const set = str => [...str].forEach((ch, i) => { const g = el.querySelector(`.dg[data-i="${i}"]`); if (!g) return; g.querySelectorAll('polygon').forEach(pg => pg.setAttribute('fill', (SEG[ch] || '').includes(pg.dataset.s) ? col : off)); });
      el.set = set; set(o.v || '0359'); return el;
    }
    /* 고양이 눈: 보라 눈, 세로 동공 */
    function EYE(o = {}) {
      const el = add(`<svg viewBox="-100 -60 200 120" style="left:50%;top:50%;width:${o.w || 70}cqw;transform:translate(-50%,-50%);z-index:8">
        <defs><clipPath id="op3eye"><path d="M-96 0 Q-44 -56 0 -56 Q44 -56 96 0 Q44 56 0 56 Q-44 56 -96 0Z"/></clipPath>
        <radialGradient id="op3ir" cx="50%" cy="42%" r="60%"><stop offset="0" stop-color="#f1e4ff"/><stop offset=".45" stop-color="#b58cff"/><stop offset="1" stop-color="#4b2398"/></radialGradient></defs>
        <g class="lid"><g clip-path="url(#op3eye)"><rect x="-100" y="-60" width="200" height="120" fill="#efe6d6"/>
          <circle class="iris" r="46" fill="url(#op3ir)"/>
          <ellipse class="pup" rx="13" ry="44" fill="#0b0712"/>
          <ellipse cx="-14" cy="-20" rx="7" ry="10" fill="#fff" opacity=".9"/></g>
          <path d="M-96 0 Q-44 -56 0 -56 Q44 -56 96 0 Q44 56 0 56 Q-44 56 -96 0Z" fill="none" stroke="#0b0712" stroke-width="4"/></g></svg>`);
      return el;
    }
    /* 그림자 실루엣(언니)이 뛰어감 */
    function RUN(o = {}) {
      const el = add(`<img src="${IMG(o.src || 'op3/언니.png')}" alt="">`, { position:'absolute', height:(o.h || 70) + '%', left:'0', top:(o.y ?? 20) + '%', zIndex:o.z || 7, filter:o.white ? 'brightness(0) invert(1)' : 'brightness(0)', opacity:o.op ?? 1, transformOrigin:'50% 100%' });
      const n = o.steps || 8, kf = [];
      for (let i = 0; i <= n; i++) { const k = i / n; const x = o.x0 + (o.x1 - o.x0) * k, sc = (o.s0 ?? 1) + ((o.s1 ?? 1) - (o.s0 ?? 1)) * k; kf.push({ transform:`translate(${x}cqw, ${i % 2 ? -2.2 : 0}cqh) scale(${sc}) skewX(${o.lean ?? -8}deg)` }); }
      el.animate(kf, { duration:(o.dur || 1.5) * 1000, easing:'linear', fill:'both', delay:o.d || 0 });
      return el;
    }
    /* 옆모습으로 걷는 사람(벡터). legs:1 이면 다리만 크게 */
    function WALK(o = {}) {
      const col = o.col || '#0d0d0e', vb = o.legs ? '-40 -26 80 64' : '-40 -92 80 130';
      const el = add(`<svg viewBox="${vb}" style="left:0;top:${o.y ?? 20}%;height:${o.h || 60}%;z-index:${o.z || 7}">
        <g class="bd">${o.legs ? '' : `<circle cx="2" cy="-76" r="9" fill="${col}"/><path d="M-6 -66 Q2 -70 8 -64 L10 -20 L-8 -20 Z" fill="${col}"/>
          <g class="ar1"><line x1="0" y1="-60" x2="0" y2="-30" stroke="${col}" stroke-width="6" stroke-linecap="round"/></g>`}
          ${o.legs ? `<path d="M-15 -26 L15 -26 L19 -10 L-19 -10 Z" fill="${col}"/>` : `<path d="M-9 -24 L11 -24 L16 -2 L-14 -2 Z" fill="${col}"/>`}
          <g class="lg1"><line x1="0" y1="-14" x2="0" y2="26" stroke="${col}" stroke-width="${o.legs ? 7 : 6}" stroke-linecap="round"/><ellipse cx="7" cy="28" rx="${o.legs ? 11 : 10}" ry="${o.legs ? 4.6 : 4.6}" fill="${col}"/></g>
          <g class="lg2"><line x1="0" y1="-14" x2="0" y2="26" stroke="${col}" stroke-width="${o.legs ? 7 : 6}" stroke-linecap="round"/><ellipse cx="7" cy="28" rx="${o.legs ? 11 : 10}" ry="${o.legs ? 4.6 : 4.6}" fill="${col}"/></g></g></svg>`);
      const st = (o.run ? BEAT : BEAT * 2) * 1000, sw = o.run ? 34 : 22;
      const swing = (g, ph) => { const x = el.querySelector(g); if (!x) return; x.style.transformOrigin = g.startsWith('.ar') ? '0px -60px' : '0px -14px'; x.style.transformBox = 'view-box';
        x.animate([{ transform:`rotate(${ph * sw}deg)` }, { transform:`rotate(${-ph * sw}deg)` }, { transform:`rotate(${ph * sw}deg)` }], { duration:st, iterations:Infinity, easing:'ease-in-out' }); };
      swing('.lg1', 1); swing('.lg2', -1); swing('.ar1', -1);
      el.querySelector('.bd').animate([{ transform:'translateY(0)' }, { transform:'translateY(-1.5px)' }, { transform:'translateY(0)' }], { duration:st / 2, iterations:Infinity });
      const n = 2, kf = []; for (let i = 0; i <= n; i++) { const k = i / n; kf.push({ transform:`translateX(${o.x0 + (o.x1 - o.x0) * k}cqw) scale(${(o.s0 ?? 1) + ((o.s1 ?? 1) - (o.s0 ?? 1)) * k})` }); }
      el.style.transformOrigin = '50% 100%'; el.animate(kf, { duration:(o.dur || 2) * 1000, easing:'linear', fill:'both', delay:o.d || 0 });
      return el;
    }
    /* 줄리언 오피 느낌: 굵은 검은 외곽선 + 납작한 색, 화면을 꽉 채우는 큰 다리가 옆모습으로 걸어감 */
    function OPIE(o = {}) { /* 무릎이 굽는 걸음: 허벅지(엉덩이에서 회전) + 정강이(무릎에서 회전) */
      const K = '#26262a', sw = 1.2, st = BEAT * 2 * 1000; /* 진회색 실루엣 */
      const leg = (cls, tone) => `<g class="${cls}"><path d="M-5.2 -2 L5.2 -2 L4.4 26 L-4.4 26 Z" fill="#2b2b30" stroke="${K}" stroke-width="${sw}" stroke-linejoin="round"/>
          <g class="kn"><path d="M-4.4 25 L4.4 25 L3.6 50 L-3.6 50 Z" fill="#2b2b30" stroke="${K}" stroke-width="${sw}" stroke-linejoin="round"/>
            <path d="M-3.8 41 L3.8 41 L3.6 50 L-3.6 50 Z" fill="${tone}" stroke="${K}" stroke-width="${sw}" stroke-linejoin="round"/>
            <path d="M-4 49.4 L4.2 49.4 Q11.5 49.6 12 53.2 L12 54.2 L-4.2 54.2 Z" fill="#2b2b30" stroke="${K}" stroke-width="${sw}" stroke-linejoin="round"/></g></g>`;
      const el = add(`<svg viewBox="-34 -40 68 98" style="left:0;bottom:-1%;height:${o.h || 132}%;z-index:${o.z || 7}">
        ${leg('lgB', '#2b2b30')}${leg('lgA', '#2b2b30')}
        <path d="M-21 -40 L21 -40 L26 4 Q0 8 -26 4 Z" fill="#2b2b30" stroke="${K}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`);
      /* 한 걸음 주기 동안 [허벅지, 무릎] 각도 (오른쪽으로 걸음: 음수 = 앞) */
      const G = [[-24, 2], [-12, 6], [4, 4], [18, 8], [22, 30], [8, 58], [-14, 40], [-24, 2]];
      const go = (sel, shift) => { const g = el.querySelector(sel), k = g.querySelector('.kn'); [g, k].forEach(x => { x.style.transformBox = 'view-box'; });
        g.style.transformOrigin = '0px 0px'; k.style.transformOrigin = '0px 25px';
        const n = G.length - 1, rot = (idx) => G[(idx + shift) % n];
        g.animate(G.map((_, q) => ({ transform:`rotate(${rot(q)[0]}deg)` })), { duration:st, iterations:Infinity });
        k.animate(G.map((_, q) => ({ transform:`rotate(${rot(q)[1]}deg)` })), { duration:st, iterations:Infinity }); };
      go('.lgA', 0); go('.lgB', 4);
      el.animate([{ transform:`translateX(${o.x0}cqw)` }, { transform:`translateX(${o.x1}cqw)` }], { duration:(o.dur || 2.6) * 1000, easing:'linear', fill:'both' });
      el.animate([{ translate:'0 0' }, { translate:'0 -.8cqh' }, { translate:'0 0' }], { duration:st / 2, iterations:Infinity, easing:'ease-in-out' });
      return el;
    }
    /* 사무실 책상 줄(벡터): 모니터 네모가 줄지어 있고 하나만 켜짐 */
    function DESKS(o = {}) {
      const n = o.n || 9, lit = o.lit ?? 6, col = o.col || '#eeebe4';
      const cells = [...Array(n)].map((_, i) => `<g transform="translate(${i * 22} 0)"><rect x="2" y="0" width="16" height="11" fill="${i === lit ? col : 'none'}" stroke="${col}" stroke-width=".6" opacity="${i === lit ? 1 : .45}"/><line x1="10" y1="11" x2="10" y2="14" stroke="${col}" stroke-width=".6" opacity=".45"/><line x1="0" y1="16" x2="20" y2="16" stroke="${col}" stroke-width=".8" opacity=".5"/></g>`).join('');
      const el = add(`<svg viewBox="-2 -4 ${n * 22 + 2} 24" style="left:${o.x ?? 0}%;top:${o.y ?? 40}%;width:${o.w ?? 100}%;z-index:${o.z || 3}">${cells}</svg>`);
      anim(el, o.in || 'fade');
      return el;
    }
    function MARQ(text, o = {}) { /* 배경에 단어가 줄지어 흘러감 */
      const rep = (text + '   ').repeat(o.n || 14);
      const el = add(`<div class="a w ${o.c || 'blk'}${o.st ? ' st' : ''}" style="left:0;top:${o.y ?? 50}%;font-size:${o.s || 4}cqw;opacity:${o.op ?? .18};z-index:${o.z || 1};color:${o.col || 'currentColor'};-webkit-text-stroke-color:${o.col || 'currentColor'};transform:translateY(-50%)">${rep}</div>`);
      const d = o.dir || 1; el.animate([{ translate:`${d > 0 ? -20 : -60}% 0` }, { translate:`${d > 0 ? -60 : -20}% 0` }], { duration:(o.dur || 14) * 1000, easing:'linear', fill:'both' });
      return el;
    }
    function RULE(o = {}) { /* 가는 선이 그어짐 (편집 디자인 느낌) */
      const el = add(`<div style="position:absolute;left:${o.x ?? 0}%;top:${o.y}%;width:${o.w ?? 100}%;height:${o.t || .18}cqh;background:${o.col || 'currentColor'};opacity:${o.op ?? .6};z-index:${o.z || 3};transform-origin:${o.from === 'r' ? '100%' : '0'} 50%"></div>`);
      el.animate([{ transform:'scaleX(0)' }, { transform:'scaleX(1)' }], { duration:o.ms || 500, delay:o.d || 0, easing:ease.io, fill:'both' });
      return el;
    }
    function META(text, o = {}) { return W(text, Object.assign({ c:'xs', in:'type', ax:0, ay:0 }, o)); }
    function LINE(o = {}) { /* 냉장고 소리: 떨리는 가로선 */
      const el = add(`<div style="position:absolute;left:0;right:0;top:${o.y || 50}%;height:${o.t || .5}cqh;background:currentColor;z-index:4"></div>`);
      el.animate([{ transform:'translateY(0) scaleY(1)' }, { transform:'translateY(-.4cqh) scaleY(2.2)' }, { transform:'translateY(.3cqh) scaleY(.6)' }, { transform:'translateY(0) scaleY(1)' }], { duration:BEAT * 500, iterations:40 });
      anim(el, 'wipe');
      return el;
    }
    function shake() { return; }
    function shake_old(el = sc, amt = 1.2, ms = 260) { el.animate([{ translate:'0 0' }, { translate:`${amt}cqw ${-amt * .6}cqh` }, { translate:`${-amt}cqw ${amt * .4}cqh` }, { translate:`${amt * .5}cqw 0` }, { translate:'0 0' }], { duration:ms }); }

    /* ---------- 장면표 (초) ---------- */
    let clk, eye, nameBox, dg;
    const T = [
      /* 1. 인트로: 검정. 편집 디자인 같은 가는 선과 작은 표기, 띄엄띄엄 단어, 시계 초침 (Tarot 'ini · bukan · yang') */
      [0.00, () => { punch = false; cut('ink', { len:13, drift:.3 }); clk = null; dg = DIGI({ x:70, y:46, w:46, v:'0359' }); anim(dg, 'fade');
        const cl = dg.querySelector('.cl'); const kf = []; for (let k = 0; k < 34; k++) kf.push({ opacity:k % 2 ? .15 : 1, easing:'steps(1,end)' }); cl.animate(kf, { duration:34 * BEAT * 1000, fill:'forwards' });
        const bar = add('<div style="position:absolute;left:46%;top:76%;width:44%;height:1.4cqh;display:grid;grid-template-columns:repeat(30,1fr);gap:.25cqw;z-index:3"></div>');
        for (let k = 0; k < 30; k++) { const c = document.createElement('i'); c.style.cssText = 'background:rgba(238,235,228,.12)'; bar.appendChild(c); c.animate([{ background:'rgba(238,235,228,.12)' }, { background:'#e3222f' }], { duration:60, delay:k * 360, fill:'forwards', easing:'steps(1,end)' }); } }],
      [0.04, () => { ROW('a', { x:14, y:28 }); RW('a', '다들'); }],
      [1.48, () => RW('a', '쉬는')],
      [2.95, () => RW('a', '날인데')],
      [5.18, () => W('나만', { x:14, y:50, c:'blk', s:13, ax:0, split:110, z:4, col:'#e3222f', gl:1 })],
      [11.2, () => { if (!dg || !dg.isConnected) return; let n = 0; const go = () => { if (!dg.isConnected || n > 22) return; dg.set(n > 20 ? '0400' : String(Math.floor(Math.random() * 10000)).padStart(4, '0')); n++; setTimeout(go, Math.max(30, 120 - n * 4)); }; go(); }],
      [7.69, () => { add('<div style="position:absolute;left:0;right:0;top:84%;height:14%;background:#e3222f;z-index:1"></div>').animate([{ clipPath:'inset(0 100% 0 0)' }, { clipPath:'inset(0 0 0 0)' }], { duration:420, easing:ease.io, fill:'both' }); DESKS({ x:4, y:86.4, w:92, col:'#0d0d0e', lit:6, z:2, in:'wipe' }); ROW('b', { x:14, y:72 }); RW('b', '아직'); }],
      [8.95, () => RW('b', '여기', { col:'#e3222f' })],
      [10.21, () => RW('b', '있네')],
      /* 2. 새벽 네 시: 빨강, 큰 시계 바늘이 4시에 꽂힘. 뒤로 04:00 이 흐름 */
      [12.74, () => { cut('red', { len:1.3, wipe:'u', wms:200 }); MARQ('04:00', { y:16, s:5, op:.16, c:'blk' }); MARQ('04:00', { y:86, s:5, op:.16, c:'blk', dir:-1 }); clk = CLOCK({ x:50, y:50, size:34, col:'#0d0d0e', sw:1.2, acc:'#eeebe4' }); hands(clk, 4, 0, 640, [0, 0], 4); W('4', { x:50, y:50, c:'blk st', s:62, in:'fade', z:1, col:'rgba(13,13,14,.35)' }); W('새벽', { x:14, y:50, c:'tall', s:9, split:90, ax:0 }); }],
      [13.32, () => { W('04:00', { x:50, y:84, c:'blk', s:7, z:6, gl:1 }); flash('#fff', 80); W('네 시', { x:86, y:50, c:'tall', s:12, ax:1, split:90, z:6 }); shake(sc, 1); }],
      /* 3. 사무실: 책상 줄 세 칸, 뒤로 '사무실' 외곽선 글자가 흐름, 켜진 자리 하나에 빨간 네모 */
      [13.90, () => { cut('ink', { len:2.2, dx:-1.2, wipe:'l' }); MARQ('사무실', { y:50, s:22, op:.08, st:1, c:'blk', dur:10 }); DESKS({ x:30, y:16, w:66, lit:-1, in:'none' }); DESKS({ x:30, y:36, w:66, lit:6, in:'none' }); DESKS({ x:30, y:56, w:66, lit:-1, in:'none' }); W('사무실', { x:12, y:88, c:'tall', s:9, ax:0, ay:1, z:6, split:80, gl:1 }); }],
      [14.98, () => { ROW('c', { x:47, y:86 }); RW('c', '켜진'); }],
      [15.35, () => RW('c', '자리는')],
      [15.82, () => { RW('c', '하나', { col:'#e3222f', s:2.1 }); add('<div style="position:absolute;left:73.9%;top:37.4%;width:6.6%;height:8.6%;border:.35cqw solid #e3222f;z-index:5"></div>').animate([{ transform:'scale(2.2)', opacity:0 }, { transform:'scale(1)', opacity:1 }], { duration:220, easing:ease.o, fill:'both' }); }],
      /* 4. 모니터 불빛이 얼굴에 바르는 회색: 흰 화면이 빛나고 단어가 오른쪽에 쌓임 → 회색 */
      [16.04, () => { cut('ink', { len:2.1, wipe:'r' }); const m = add('<div style="position:absolute;left:7%;top:16%;width:44%;height:50%;background:#fff;box-shadow:0 0 8cqw 2cqw rgba(255,255,255,.55);z-index:2"></div>'); anim(m, 'wipeu');
        add('<div style="position:absolute;left:26%;top:66%;width:6%;height:8%;background:#2a2a2c;z-index:2"></div>'); add('<div style="position:absolute;left:17%;top:74%;width:24%;height:1%;background:#2a2a2c;z-index:2"></div>');
        const hd = add('<svg viewBox="-60 -70 120 120" style="left:9%;top:28%;width:40cqw;height:40cqw;z-index:3"><path d="M-22 -24 Q-22 -52 0 -52 Q22 -52 22 -24 Q22 -4 12 0 L-12 0 Q-22 -4 -22 -24Z" fill="#0d0d0e"/><path d="M-12 -6 L12 -6 L14 6 L-14 6Z" fill="#0d0d0e"/><path d="M-58 50 Q-56 10 -20 4 Q0 0 20 4 Q56 10 58 50Z" fill="#0d0d0e"/></svg>'); anim(hd, 'up');
        W('모니터', { x:58, y:22, c:'blk', s:7, ax:0, in:'left' }); }],
      [16.37, () => W('불빛이', { x:58, y:36, c:'blk', s:7, ax:0, in:'left' })],
      [16.93, () => W('얼굴에', { x:58, y:50, c:'blk', s:7, ax:0, in:'left' })],
      [17.51, () => W('바르는', { x:58, y:64, c:'blk', s:7, ax:0, in:'left', col:'#e3222f' })],
      [17.62, () => { pixels('#8b8a87', 160); cut('gray', { len:.4, wipe:'l', wms:200, drift:0 }); W('회색', { x:50, y:50, c:'tall', s:24, in:'none', gl:1 }); }],
      /* 5. 이름보다 먼저 불리는 건 내 직책: 이름표에 빨간 줄, 뒤로 '직책'이 흐름 */
      [18.42, () => { cut('ink', { len:2, wipe:'d', wms:180 }); MARQ('직책  직책', { y:22, s:6, op:.1, c:'blk', col:'#e3222f' }); MARQ('직책  직책', { y:78, s:6, op:.1, c:'blk', col:'#e3222f', dir:-1 });
        nameBox = add('<div style="position:absolute;left:24%;top:38%;transform:translate(-50%,-50%);background:#eeebe4;color:#0d0d0e;padding:1.2cqw 3cqw;z-index:6;font:900 5cqw Op3Pre;letter-spacing:.1em"><div style="font:600 1cqw Op3Pre;letter-spacing:.3em;margin-bottom:.4cqw">HELLO, MY NAME IS</div>이 름</div>'); anim(nameBox, 'pop'); W('보다', { x:47, y:44, c:'blk', s:4.4, ax:0, in:'rise' }); }],
      [19.22, () => { const l = add('<div style="position:absolute;left:22%;top:46.5%;width:20.5%;height:.9cqh;background:#e3222f;z-index:7;transform-origin:0 50%"></div>'); l.animate([{ transform:'scaleX(0)' }, { transform:'scaleX(1)' }], { duration:200, easing:ease.io, fill:'both' }); ROW('d', { x:20, y:64 }); RW('d', '먼저'); RW('d', '불리는'); RW('d', '건'); }],
      [19.8, () => { W('내', { x:56, y:55, c:'blk', s:9, z:8, ax:1, col:'#eeebe4' }); W('직책', { x:86, y:52, c:'tall', s:18, ax:1, col:'#e3222f', in:'none', z:8, gl:1 }); shake(sc, .9); }],
      /* 6. 현관: 어둠 속 스위치 → 딸깍, 빨간 불. 옆모습 다리가 걸어 들어옴 */
      [20.38, () => { cut('ink', { len:3.3, wipe:'l', wms:200, drift:.4 }); RULE({ y:84, op:.3 }); ROW('e', { x:14, y:22 }); RW('e', '현관에서'); }],
      [20.94, () => RW('e', '더듬는')],
      [21.64, () => { const sw = add('<div style="position:absolute;left:50%;top:46%;width:4cqw;height:7cqw;transform:translate(-50%,-50%);border:.3cqw solid #eeebe4;border-radius:.6cqw;z-index:6"><div class="kn" style="position:absolute;left:25%;right:25%;top:12%;height:38%;background:#eeebe4;border-radius:.3cqw"></div></div>'); anim(sw, 'pop'); RW('e', '불 스위치'); }],
      [22.08, () => { const k = sc.querySelector('.kn'); if (k) k.style.top = '50%'; sc.style.background = '#e3222f'; sc.style.color = '#0d0d0e'; flash('#fff', 90); OPIE({ x0:-30, x1:40, dur:2.8 }); if (ROWS.e) ROWS.e.animate([{ opacity:1 }, { opacity:0 }], { duration:160, fill:'forwards' }); }],
      [22.22, () => W('신발도', { x:62, y:26, c:'blk', s:6, ax:0, in:'left' })],
      [22.92, () => W('못', { x:80, y:52, c:'tall', s:20, col:'#eeebe4', in:'slam', z:8 })],
      [23.06, () => W('벗고', { x:62, y:78, c:'blk', s:6, ax:0, in:'left' })],
      /* 7. 냉장고 소리만 대답하는 방: 떨리는 선 + 작은 냉장고, 마지막에 '방' */
      [23.64, () => { cut('ink', { len:3.2, drift:.3, wipe:'l' }); LINE({ y:90, t:.35 });
        const glow = add('<div style="position:absolute;left:52%;top:2%;width:46%;height:96%;background:radial-gradient(ellipse at 50% 45%, rgba(220,240,255,.55), rgba(220,240,255,0) 62%);z-index:2"></div>');
        const fr = add('<svg viewBox="0 0 60 110" style="left:62%;top:6%;height:86%;z-index:4"><rect x="2" y="2" width="56" height="106" rx="4" fill="#141518" stroke="#eeebe4" stroke-width="1.6"/><line x1="2" y1="38" x2="58" y2="38" stroke="#eeebe4" stroke-width="1.6"/><rect x="49" y="12" width="3" height="18" rx="1.5" fill="#eeebe4"/><rect x="49" y="46" width="3" height="30" rx="1.5" fill="#eeebe4"/><rect class="led" x="8" y="8" width="10" height="4" rx="1" fill="#7fe3ff"/><rect x="8" y="104" width="8" height="4" fill="#eeebe4"/><rect x="44" y="104" width="8" height="4" fill="#eeebe4"/></svg>');
        anim(fr, 'fade');
        const fl = [1, .25, 1, 1, .1, .9, 1, .35, 1, 1, 1, .15, .8, 1]; const kf = fl.map(v => ({ opacity:v, easing:'steps(1,end)' }));
        glow.animate(kf, { duration:2600, iterations:2 }); fr.querySelector('.led').animate(kf, { duration:2600, iterations:2 });
        fr.animate([{ translate:'0 0' }, { translate:'.12cqw 0' }, { translate:'0 0' }], { duration:90, iterations:36, delay:300 });
        W('냉장고', { x:14, y:40, c:'blk', s:7, ax:0, in:'up' }); }],
      [24.21, () => W('소리만', { x:14, y:56, c:'blk', s:7, ax:0, in:'up' })],
      [25.06, () => W('대답하는', { x:14, y:72, c:'blk', s:7, ax:0, in:'rise', col:'#7fe3ff' })],
      [25.6, () => { pixels('#e3222f', 160); cut('red', { len:.5, drift:0 }); const b = W('방', { x:50, y:52, c:'blk', s:40, in:'none', gl:1 }); b.animate([{ rotate:'-9deg', opacity:0 }, { rotate:'2deg', opacity:1, offset:.6 }, { rotate:'0deg', opacity:1 }], { duration:260, easing:'cubic-bezier(.2,.9,.3,1.2)', fill:'both' }); b.animate([{ translate:'0 0' }, { translate:'.25cqw -.1cqh' }, { translate:'-.2cqw .1cqh' }, { translate:'0 0' }], { duration:120, iterations:8, delay:260 }); }],
      /* 8. 일 말고 나를 필요로 하는 데가 있을까: 가운데 한 기둥, 크게 → 흰빛이 화면을 덮음 */
      [26.82, () => { cut('paper', { len:5.5, drift:.4, wipe:'u', wms:220 }); W('일 말고', { x:50, y:14, c:'blk', s:5.5, in:'rise' }); }],
      [27.74, () => W('나를', { x:50, y:40, c:'blk', s:17, in:'rise', gl:1 })],
      [29.01, () => { ROWC('j', ['필요로', '하는', '데가'], { y:68, s:7 }); RV('j', 0); }],
      [29.96, () => RV('j', 1)],
      [30.60, () => RV('j', 2)],
      [31.23, () => { W('있을까', { x:50, y:86, c:'blk', s:7, in:'rise', col:'#e3222f' }); const p = add('<div style="position:absolute;left:50%;top:50%;width:2%;height:2%;background:#fff;border-radius:50%;box-shadow:0 0 4cqw 2cqw #fff;z-index:9;transform:translate(-50%,-50%)"></div>'); p.animate([{ width:'1%', height:'1.8%', opacity:1 }, { width:'160%', height:'240%', opacity:1 }], { duration:1050, easing:'cubic-bezier(.55,0,.85,.4)', fill:'both' }); }],
      /* 9. 그래서 꿈꿨어: 흰 화면 그대로 이어서, 글자가 보랏빛으로 물들고 곡선 눈꺼풀이 감김 */
      [32.22, () => { cut('paper', { len:3, drift:.25 }); sc.style.background = '#ffffff'; W('그래서', { x:50, y:34, c:'blk', s:5.5, in:'track', col:'#1a1a1d' }); }],
      [33.28, () => { const w = W('꿈꿨어', { x:50, y:55, c:'blk', s:13, z:3, col:'#1a1a1d', in:'blur' }); w.querySelector('.w').animate([{ color:'#1a1a1d' }, { color:'#7c4dff' }], { duration:900, delay:300, fill:'forwards' });
        const lid = (top) => { const el = add(`<svg viewBox="0 0 100 60" preserveAspectRatio="none" style="left:-2%;width:104%;height:62%;${top ? 'top:-12%' : 'bottom:-12%'};z-index:9"><path d="${top ? 'M0 0 H100 V40 Q50 70 0 40 Z' : 'M0 60 H100 V20 Q50 -10 0 20 Z'}" fill="#0d0d0e"/></svg>`);
          el.animate([{ transform:`translateY(${top ? -100 : 100}%)` }, { transform:'translateY(0)' }], { duration:1400, delay:250, easing:'cubic-bezier(.45,0,.25,1)', fill:'both' }); };
        lid(1); lid(0); const bk = add('<div style="position:absolute;inset:0;background:#0d0d0e;z-index:10"></div>'); bk.animate([{ opacity:0 }, { opacity:0, offset:.85 }, { opacity:1 }], { duration:1650, easing:'linear', fill:'both' }); }],
      /* 10. 아주 멀리 있는 숲: 어둠 속 고양이 눈이 뜨고 동공이 좁아짐, 언니 그림자가 눈 속으로 뛰어 들어감 → 동공으로 빨려 들어감 */
      [35.06, () => { cut('ink', { len:2.9, wipe:'l', wms:200, drift:.2 }); eye = EYE({ w:64 }); const L = eye.querySelector('.lid'); L.style.transformOrigin = '0 0'; L.animate([{ transform:'scaleY(.02)' }, { transform:'scaleY(1.05)', offset:.7 }, { transform:'scaleY(1)' }], { duration:420, easing:ease.o, fill:'both' }); ROWC('f', ['아주', '멀리', '있는'], { y:91, s:5.4 }).style.color = '#eeebe4'; RV('f', 0); }],
      [35.57, () => { eye.querySelector('.pup').animate([{ transform:'scaleX(1)' }, { transform:'scaleX(.28)' }], { duration:300, easing:ease.o, fill:'forwards' }); RV('f', 1); }],
      [36.10, () => { const L = eye.querySelector('.lid'); L.animate([{ transform:'scaleY(1)' }, { transform:'scaleY(.05)' }, { transform:'scaleY(1)' }], { duration:220, easing:ease.io }); }],
      [36.59, () => { RV('f', 2); }],
      [37.10, () => { W('숲', { x:50, y:50, c:'blk', s:30, z:12, col:'#2f8a55', in:'blur' }); const dur = Math.max(600, (mp(37.88) - mp(37.10)) * 1000);
        eye.animate([{ transform:'translate(-50%,-50%) scale(1)' }, { transform:'translate(-50%,-50%) scale(1.5)', offset:.62 }, { transform:'translate(-50%,-50%) scale(30)' }], { duration:dur, easing:'cubic-bezier(.45,0,.9,.5)', fill:'forwards' });
        eye.querySelector('.pup').animate([{ transform:'scaleX(.28)' }, { transform:'scaleX(1.25)', offset:.6 }, { transform:'scaleX(2.4)' }], { duration:dur, fill:'forwards' });
        const L = eye.querySelector('.lid'); L.animate([{ transform:'scaleY(1)' }, { transform:'scaleY(.08)', offset:.5 }, { transform:'scaleY(1)' }], { duration:200, delay:dur * .3 }); }],
      /* 11. 후렴: 그림을 화면 가득, 글자는 그림 위 가운데에 크게 */
      [37.88, () => { punch = true; cut('forest', { len:3.6, flash:'#fff', drift:1.2 }); FULL('op3/전/여는_2_1.jpg', '45% 40%'); ROWC('g', ['거기', '내가'], { y:38, s:5, blk:1, sh:1 }); RV('g', 0); }],
      [38.49, () => RV('g', 1)],
      [39.10, () => W('꿈꾸던', { x:50, y:54, c:'blk sh', s:15, z:8, in:'stretch', col:'#ffd36b' })],
      [40.20, () => SWAP('op3/전/여는_2_3.jpg', '50% 45%', 'l')],
      [41.24, () => W('곳', { x:50, y:73, c:'blk sh', s:8, z:9, col:'#ff6b6b' })],
      [41.58, () => { cut('forest', { len:3.3, wipe:'l', wms:220, drift:1.2, dx:.8 }); FULL('op3/전/여는_3_2.jpg', '40% 50%'); ROWC('h', ['누가', '날'], { y:38, s:5, blk:1, sh:1 }); RV('h', 0); }],
      [42.21, () => RV('h', 1)],
      [42.52, () => W('기다리는', { x:50, y:54, c:'blk sh', s:13, z:8, split:80, col:'#9fe6ff' })],
      [43.46, () => SWAP('op3/전/여는_3_1.jpg', '50% 50%', 'r')],
      [44.40, () => W('곳', { x:50, y:73, c:'blk sh', s:8, z:9, col:'#ff6b6b' })],
      [44.74, () => { cut('coral', { len:2.9, wipe:'r', wms:220, drift:1.2 }); FULL('op3/전/여는_4_2.jpg', '50% 55%'); W('날', { x:50, y:38, c:'blk sh', s:5, in:'rise' }); ROWC('k', ['부르는', '소리'], { y:73, s:6, blk:1, sh:1, cols:[null, '#ffd36b'] }); }],
      [44.97, () => W('가족이라', { x:50, y:54, c:'blk sh', s:14, z:8, col:'#ffb8cf', in:'blur' })],
      [45.6, () => RV('k', 0, 'track')],
      [46.72, () => RV('k', 1, 'track')],
      [47.54, () => { cut('forest', { len:2, wipe:'u', wms:200, drift:1.2 }); FULL('op3/전/여는_2_2.jpg', '55% 50%'); ROWC('l', ['그게', '다야'], { y:52, s:11, blk:1, sh:1, cols:[null, '#ff6b6b'] }); RV('l', 0, 'slam'); }],
      [48.54, () => RV('l', 1, 'drop')],
      [49.52, () => { cut('night', { len:1.6, wipe:'l', wms:200, drift:1.6 }); FULL('op3/전/엔딩_창문_기본.jpg', '35% 60%'); W('그게', { x:50, y:38, c:'blk sh', s:5, in:'rise' }); ROWC('m', ['내', '집'], { y:56, s:16, blk:1, sh:1, cols:[null, '#f3c95a'] }); }],
      [50.28, () => RV('m', 0, 'slam')],
      [50.66, () => RV('m', 1, 'slam')],
      /* 12. 이게 내 꿈이야: 나무 마법 영상 */
      [51.06, () => { cut('night', { len:3, drift:.6, wipe:'r', wms:200 }); { const p = P('op3/전/열여덟_웃음.jpg', { pos:'50% 45%', in:'none', zoom:1.1, zl:3.6, x:-2, w:130 }); SHADE(); } ROWC('i', ['이게', '내'], { y:37, s:5, blk:1, sh:1 }); RV('i', 0); }],
      [52.01, () => RV('i', 1)],
      [52.48, () => W('꿈이야', { x:50, y:55, c:'blk sh', s:15, z:8, col:'#f3c95a', split:90 })],
      /* 13. 내가 꿈꾸던 곳(길게): 인물 카드가 박자마다 한 명씩 */
      [53.96, () => { cut('forest', { len:1, wipe:'l', wms:200, drift:0 }); W('그냥', { x:50, y:50, c:'blk', s:9, in:'pop' }); }],
      ...[
        ['나비', 'op3/나비_청소년.png', NAME, '언니의 고양이 동생'],
        ['폼폼', 'op3/폼폼.png', '폼폼', '숟가락 자리까지 아는 솜털 요정'],
        ['모모', 'op3/모모.png', '모모', '소문을 모으는 수다쟁이 토끼 선배'],
        ['로완', 'op3/로완.png', '로완', '도서관 창가의 조용한 왕자'],
        ['밀로', 'op3/밀로.png', '밀로', '용감한 기사가 되고 싶은 강아지'],
        ['헤이즐', 'op3/헤이즐.png', '헤이즐', '빵집의 부지런한 다람쥐'],
        ['루비', 'op3/루비.png', '루비', '꽃축제의 깐깐한 여우'],
        ['몰리', 'op3/몰리_상반신.png', '몰리', '말없이 예쁜 그림을 그리는 양'],
        ['카일', 'op3/카일_상반신.png', '카일', '뒷골목의 삐딱한 박쥐 소년'],
        ['루네', 'op3/루네.png', '루네', '별빛 언덕 탑의 사슴 마법사'],
        ['실라스', 'op3/실라스.jpg', '실라스', '류트를 든 떠돌이 늑대'],
        ['휴고', 'op3/휴고.jpg', '휴고', '왕궁의 백호 장군'],
      ].map(([k, src, nm, tag], i) => [(t => BEATS.reduce((q, x) => Math.abs(x - t) < Math.abs(q - t) ? x : q, t))(56.31 + i * .628) - .02, () => {
        const pal = [['cream', '#15382a', '#ff5a5c'], ['forest', '#f6eedc', '#f3c95a'], ['coral', '#fff4e6', '#15382a']][i % 3];
        cut(pal[0], { len:.9, dx:i % 2 ? 1 : -1, rot:i % 2 ? .4 : -.4 });
        const left = i % 2 === 0; /* 카드 좌우를 번갈아 */
        W(nm, { x:left ? 70 : 30, y:52, c:'tall' + (i % 4 === 1 ? ' st' : ''), s:nm.length > 2 ? 12 : 17, in:'slam', col:pal[2], z:2 });
        CARD(src, { x:left ? 8 : 58, y:9, w:34, h:76, r:left ? -2.5 : 2.5, z:6, dur:300, from:70, bg:'#f6eedc', pos:({ 헤이즐:'50% 20%' })[k] || (src.endsWith('.jpg') ? '50% 20%' : '50% 6%') });
        W(tag, { x:left ? 70 : 30, y:90, c:'tag', in:'type', col:pal[1], z:7 });
        W('그냥, 이게 내 꿈', { x:left ? 70 : 30, y:10, c:'xs', in:'none', col:pal[1], z:7 });
      }]),
      /* 14. 곳: 제목 (글자로) */
      [63.95, () => { cut('night', { len:2.6 }); FULL('op3/전/타이틀_키비주얼.jpg', '50% 50%'); const t = add(`<img src="${IMG('타이틀_글자.png')}" alt="" style="position:absolute;left:50%;top:44%;width:52cqw;transform:translate(-50%,-50%);z-index:8;filter:drop-shadow(0 .6cqw 1.6cqw rgba(0,0,0,.45))">`);
        t.animate([{ transform:'translate(-50%,-50%) scale(1.25)', opacity:0, }, { transform:'translate(-50%,-50%) scale(1)', opacity:1 }], { duration:700, easing:'cubic-bezier(.16,1,.3,1)', fill:'both' }); }],
      [65.95, () => end()],
    ].sort((p, q) => p[0] - q[0]);
    /* 다래가 노래 들으며 누른 줄 시작(10/23) 기준으로 시간 옮기기: [받아적기 시간, 실제 시간] */
    const MAP = [[0, 0], [0.04, 1.693], [1.48, 2.848], [2.95, 4.018], [5.18, 8.024], [7.69, 8.685], [8.95, 9.584], [10.21, 10.649], [12.74, 13.666], [13.9, 14.413], [16.04, 16.077], [18.42, 18.521], [20.38, 20.506], [22.22, 22.234], [23.64, 23.666], [26.82, 27.178], [27.1, 27.6], [27.74, 27.944], [29.01, 28.514], [29.96, 29.715], [30.6, 30.285], [31.23, 30.899], [32.22, 32.835], [33.28, 33.18], [35.06, 35.338], [35.57, 35.774], [36.59, 36.194], [37.1, 36.585], [37.88, 38.968], [38.49, 39.344], [39.1, 39.735], [41.24, 41.159], [41.58, 42.015], [42.21, 42.464], [42.52, 42.914], [44.4, 44.145], [44.74, 44.823], [47.54, 48.175], [48.54, 48.774], [49.52, 49.691], [50.28, 50.112], [50.66, 50.471], [51.06, 51.281], [52.01, 51.778], [52.48, 52.138], [53.96, 55.946], [56.31, 56.047], [65.95, 65.95]];
    const mp = t => { for (let i = 1; i < MAP.length; i++) if (t <= MAP[i][0]) { const [a0, b0] = MAP[i - 1], [a1, b1] = MAP[i]; return b0 + (t - a0) * (b1 - b0) / (a1 - a0); } return t; };
    T.forEach(e => { e[0] = mp(e[0]); }); T.sort((p, q) => p[0] - q[0]);

    /* ---------- 재생 ---------- */
    function now() { if (!a.paused && a.currentTime > 0) return a.currentTime; return seekT + (performance.now() - wall0) / 1000; }
    function run(i, t) {
      const before = new Set(op.getAnimations({ subtree:true }));
      try { T[i][1](); } catch (e) { console.warn('op3', T[i][0], e); }
      const lag = (t - T[i][0]) * 1000;
      if (lag > 40) op.getAnimations({ subtree:true }).forEach(x => { if (!before.has(x)) { try { x.currentTime = (x.currentTime || 0) + lag; } catch (e) {} } });
    }
    let punch = false;
    let lastB = -1; const syncB = t => { lastB = -1; while (lastB + 1 < BEATS.length && BEATS[lastB + 1] <= t) lastB++; };
    function loop() { if (done) return; const t = now(); while (ei < T.length && T[ei][0] <= t) run(ei++, t);
      let b = lastB; while (b + 1 < BEATS.length && BEATS[b + 1] <= t) b++;
      if (b !== lastB) { const jumped = b - lastB > 1; lastB = b; if (false) sc.animate([{ scale:'1.016' }, { scale:'1' }], { duration:140, easing:'ease-out', composite:'add' }); }
      window._op3T = t; raf = requestAnimationFrame(loop); }
    function end() { if (done) return; done = true; cancelAnimationFrame(raf); op.classList.add('out'); const fade = setInterval(() => { a.volume = Math.max(0, a.volume - .08); if (a.volume <= 0) { clearInterval(fade); a.pause(); } }, 50); setTimeout(() => { op.remove(); cfg.onDone && cfg.onDone(); }, 750); }
    op.querySelector('.skip').addEventListener('click', e => { e.stopPropagation(); end(); });
    function start(from = 0) {
      seekT = from; a.currentTime = from; ei = 0; syncB(from); wall0 = performance.now(); started = true;
      a.play().catch(() => {});
      cancelAnimationFrame(raf); loop();
    }
    if (cfg.still != null) { /* 화면 점검용: 그 시간의 모습으로 멈춤 */
      seekT = cfg.still; const t = cfg.still; while (ei < T.length && T[ei][0] <= t) run(ei++, t); done = true;
      op.getAnimations({ subtree:true }).forEach(x => { try { x.pause(); } catch (e) {} }); op.querySelectorAll('video').forEach(v => { try { v.pause(); } catch (e) {} });
      return { el:op };
    }
    start(cfg.from || 0);
    return { end, seek:t => { if (done) return; start(t); }, audio:a, el:op };
  }
  window.playOpeningV3 = playOpeningV3;
})();
