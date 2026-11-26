/* Securities Academy - views (one function per route). Each view(root, arg) fills `root`. Uses SA.app (state, save, announce, onLeave). */
(function (root) {
  'use strict';
  const SA = root.SA || (root.SA = {});
  const { h, mdEl, clear } = SA.render;
  const C = () => SA.COURSE;
  const S = () => SA.app.state;
  const LV = () => SA.LEVELS;
  const V = {};

  /* ---------- helpers ---------- */
  const unitMeta = (id) => C().unitMeta[id];
  const unitTitle = (id) => (unitMeta(id) || {}).title || id;
  const builtUnits = (mod) => mod.units.filter((u) => unitMeta(u).built);
  const isLocked = (mod) => !SA.moduleUnlocked(S(), mod, C().modules);
  const levelOf = (mod) => C().levels.find((l) => l.id === mod.level);
  // learner-facing names: a level (L1..L8) is a "Module"; a skill-tree node keeps its code (F1, Q2) and title
  const levelName = (lv) => 'Module ' + String(lv.id).replace(/^L/, '');
  const lvChip = (lv) => (lv > 0 ? h('span', { class: 'chip-lv lv' + lv }, LV()[lv]) : null);
  const link = (href, text, cls) => h('a', { href, class: cls || null }, text);
  const btnLink = (href, text, cls, title) => h('a', { href, class: 'btn ' + (cls || ''), title: title || null }, text);
  const crumb = (href, text) => h('p', { class: 'crumb' }, link(href, '‹ ' + text));
  const fmtTime = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  const xpOf = (events) => events.filter((e) => e.type === 'xp').reduce((a, e) => a + e.n, 0);
  const award = (events, anchor) => { SA.app.save(); SA.app.announce(events, anchor); };
  function page(rootEl, title) {
    clear(rootEl);
    const head = h('header', { class: 'page-head' }, h('h1', null, title));
    rootEl.appendChild(head); return head;
  }
  function panel(rootEl, title, children) {
    clear(rootEl);
    rootEl.appendChild(h('div', { class: 'panel narrow center' }, h('h1', null, title), children));
  }
  function notFound(rootEl, what) { panel(rootEl, 'Not found', [h('p', null, what || 'That page does not exist.'), btnLink('#/', 'Skill tree', 'primary')]); }
  function prereqLinks(mod) { return mod.prereqs.map((p, i) => { const pm = C().modules[p]; return [i ? ', ' : '', link('#/m/' + p, pm.title)]; }); }
  function lockedPanel(rootEl, mod) {
    panel(rootEl, 'Locked', [h('p', null, mod.title + ' opens when you reach Proficient in ', prereqLinks(mod), '.'), btnLink('#/m/' + mod.id, 'Back', 'primary')]);
  }
  function comingSoon(rootEl, what) { panel(rootEl, 'Coming soon', [h('p', null, what + ' has not been written yet.'), btnLink('#/', 'Skill tree', 'primary')]); }
  function nextUnitAfter(unitId) {
    const mod = C().modules[unitMeta(unitId).module], i = mod.units.indexOf(unitId);
    for (let k = i + 1; k < mod.units.length; k++) if (unitMeta(mod.units[k]).built) return mod.units[k];
    return null;
  }
  // returns a check that is true while the current page is still the one that started the async work
  const stillHere = () => { const t = SA.app.token ? SA.app.token() : 0; return () => !SA.app.token || SA.app.token() === t; };
  async function prepareItems(items) {
    const ids = Array.from(new Set(items.map((i) => i.unitId))), ok = new Set();
    await Promise.all(ids.map((id) => SA.loadUnit(id).then(() => ok.add(id), () => { /* unit missing: drop its items */ })));
    return items.filter((i) => ok.has(i.unitId)).map((i) => Object.assign({}, i, { exId: i.exId || SA.pickExercise(i.unitId, i.seed) }));
  }
  const builtCount = (lv) => lv.modules.reduce((a, mid) => a + builtUnits(C().modules[mid]).length, 0);

  /* ---------- exercise runner (shared by lessons, practice, tests) ----------
     o.deferred: no marking now. The main button says Next, the answer is graded silently and the marked-up
     exercise is kept for the review at the end. o.skip adds a "Don't know" button (placement). */
  function runExercise(host, inst, o) {
    o = o || {};
    let attempts = 0, firstOk = false, lastOk = false, hintUsed = false, retried = false, locked = false, resp, handle, hintsShown = 0, lastRes = null;
    clear(host);
    const hints = inst.hints || [];
    const prompt = mdEl('div', 'ex-prompt', inst.prompt || '');
    const area = h('div', { class: 'ex-area' });
    const hintBox = h('div', { class: 'hints', 'aria-live': 'polite' });
    const fb = h('div', { class: 'feedback', hidden: true, role: 'status' });
    const checkBtn = h('button', { type: 'button', class: 'btn primary', disabled: true }, o.deferred ? (o.nextLabel || 'Next') : 'Check');
    const hintBtn = o.hints && hints.length ? h('button', { type: 'button', class: 'btn ghost' }, 'Hint') : null;
    const skipBtn = o.skip ? h('button', { type: 'button', class: 'btn ghost' }, "Don't know") : null;
    host.appendChild(prompt); host.appendChild(area); host.appendChild(hintBox);
    const row0 = h('div', { class: 'btn-row' }, checkBtn, hintBtn, skipBtn); host.appendChild(row0); host.appendChild(fb);

    const sync = () => { checkBtn.disabled = locked || !SA.render.isAnswered(inst, resp); };
    function mountR() {
      clear(area); resp = undefined;
      handle = SA.render.mount(area, inst, (r) => { resp = r; sync(); });
      resp = handle.get(); sync();
    }
    if (hintBtn) hintBtn.addEventListener('click', () => {
      if (locked || hintsShown >= hints.length) return;
      hintUsed = true; hintsShown++;
      hintBox.appendChild(h('div', { class: 'hint' }, mdEl('span', '', hints[hintsShown - 1], true)));
      hintBtn.textContent = hintsShown >= hints.length ? 'No more hints' : 'Another hint'; hintBtn.disabled = hintsShown >= hints.length;
    });
    const result = () => ({ correct: firstOk && !hintUsed && !retried, retried: hintUsed || retried, hinted: hintUsed, tries: attempts, solved: lastOk, attempts, res: lastRes });
    let nextBtn = null;
    function grade(skipped) {
      const res = skipped ? { correct: false } : SA.grade(inst, handle.get());
      attempts++; locked = true; lastOk = !!res.correct; lastRes = res; if (attempts === 1 && !retried) firstOk = lastOk;
      try { handle.lock(skipped ? SA.grade(inst, handle.get()) : res); } catch (e) { /* unanswered skip: nothing to mark */ }
      return res;
    }
    function check() {
      if (locked || checkBtn.disabled) return;
      if (o.deferred) { grade(false); row0.remove(); return o.onNext && o.onNext(result(), host); }
      const res = grade(false);
      checkBtn.hidden = true; if (hintBtn) hintBtn.disabled = true;
      clear(fb); fb.hidden = false; fb.className = 'feedback ' + (res.correct ? 'good' : 'bad');
      const part = res.partial != null && res.partial > 0 && res.partial < 1;
      fb.appendChild(h('div', { class: 'fb-title' }, res.correct ? 'Correct' : (part ? 'Partly right (' + Math.round(res.partial * 100) + '%)' : 'Not quite')));
      if (inst.solution) fb.appendChild(mdEl('div', 'solution', inst.solution));
      const row = h('div', { class: 'btn-row' });
      if (o.retry && !res.correct) {
        const again = h('button', { type: 'button', class: 'btn' }, 'Try again');
        again.addEventListener('click', () => { retried = true; locked = false; fb.hidden = true; checkBtn.hidden = false; if (hintBtn) hintBtn.disabled = hintsShown >= hints.length; mountR(); const f = area.querySelector('input,select,[tabindex="0"],button'); if (f) f.focus(); });
        row.appendChild(again);
      }
      if (!o.noNext) { nextBtn = h('button', { type: 'button', class: 'btn primary' }, o.nextLabel || 'Next'); nextBtn.addEventListener('click', () => o.onNext && o.onNext(result(), host)); row.appendChild(nextBtn); }
      fb.appendChild(row);
      if (nextBtn) nextBtn.focus();
      if (o.onChecked) o.onChecked(res, checkBtn);
    }
    checkBtn.addEventListener('click', check);
    if (skipBtn) skipBtn.addEventListener('click', () => { if (locked) return; grade(true); row0.remove(); if (o.onNext) o.onNext(result(), host); });
    host.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' || e.shiftKey || e.ctrlKey || e.altKey) return;
      const t = e.target, tag = t && t.tagName;
      if (tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'A' || tag === 'SELECT') return;
      e.preventDefault();
      if (locked) { if (nextBtn) nextBtn.click(); } else check();
    });
    mountR();
    if (o.autofocus) { const f = area.querySelector('input,select,[tabindex="0"]'); if (f) f.focus(); }
    return { result };
  }

  /* review of a deferred session: every question, marked, with its solution */
  function review(rootEl, results) {
    const sec = h('section', { class: 'review' }, h('h2', null, 'Your answers'));
    results.forEach((r, k) => {
      if (!r.host) return;
      const inst = r.inst || {};
      // three outcomes: right first time, right in the end but with help (not counted), wrong
      const helped = !r.correct && r.solved, how = r.hinted && r.tries > 1 ? 'after a hint and a retry' : r.hinted ? 'after a hint' : 'on a retry';
      const item = h('details', { class: 'rv ' + (r.correct ? 'rv-ok' : helped ? 'rv-help' : 'rv-bad'), open: r.correct ? null : true },
        h('summary', null, h('span', { class: 'rv-mark', 'aria-hidden': 'true' }, r.correct ? '✓' : helped ? '✓' : '✗'), ' Question ' + (k + 1) + (helped ? ' (right ' + how + ', so not counted)' : '')));
      item.appendChild(r.host);
      if (inst.solution) item.appendChild(h('div', { class: 'feedback ' + (r.correct ? 'good' : helped ? 'neutral' : 'bad') }, mdEl('div', 'solution', inst.solution)));
      sec.appendChild(item);
    });
    rootEl.appendChild(sec);
  }

  /* run a list of items one at a time. cfg: {title, items, hints, retry, deferred, timer, liveXp, skip, finish(results, root)} */
  function runSession(rootEl, cfg) {
    const results = [], items = cfg.items; let idx = 0, tick = null, run = 0;
    clear(rootEl);
    const dots = items.map(() => h('span', { class: 'dot' }));
    const timerEl = cfg.timer ? h('span', { class: 'timer', title: cfg.timer.target ? 'Suggested time: ' + cfg.timer.target + ' min' : null }, '0:00') : null;
    if (cfg.crumb) rootEl.appendChild(cfg.crumb);
    rootEl.appendChild(h('header', { class: 'page-head' }, h('h1', null, cfg.title)));
    rootEl.appendChild(h('div', { class: 'dots', role: 'progressbar', 'aria-label': 'Progress', 'aria-valuemin': '0', 'aria-valuemax': String(items.length), 'aria-valuenow': '0' }, dots, timerEl));
    const body = h('section', { class: 'session-body' }); rootEl.appendChild(body);
    if (timerEl) { const t0 = Date.now(); tick = setInterval(() => { timerEl.textContent = fmtTime(Math.floor((Date.now() - t0) / 1000)); }, 1000); SA.app.onLeave(() => clearInterval(tick)); }
    function step() {
      if (idx >= items.length) { if (tick) clearInterval(tick); dots.forEach((d) => d.classList.remove('cur')); body.remove(); cfg.finish(results, rootEl); if (cfg.deferred) review(rootEl, results); return; }
      const it = items[idx]; let inst;
      try { inst = SA.instance(it.unitId, it.exId, it.seed); } catch (e) { items.splice(idx, 1); dots.pop().remove(); return step(); }
      dots.forEach((d, k) => d.classList.toggle('cur', k === idx));
      clear(body);
      if (it.callback) body.appendChild(h('p', { class: 'item-meta' }, h('span', { class: 'tag review', title: 'A question from an earlier unit' }, 'Review: ' + unitTitle(it.unitId))));
      const host = h('div', { class: 'exercise' }); body.appendChild(host);
      runExercise(host, inst, {
        hints: cfg.hints, retry: cfg.retry, deferred: cfg.deferred, skip: cfg.skip, autofocus: true, nextLabel: idx === items.length - 1 ? 'Finish' : 'Next',
        onNext(res, el) {
          run = res.correct ? run + 1 : 0;
          const rec = { unitId: it.unitId, correct: res.correct, retried: res.retried, hinted: res.hinted, tries: res.tries, solved: res.solved, callback: it.callback, inst, host: cfg.deferred ? el : null };
          results.push(rec);
          if (cfg.liveXp) { const n = SA.itemXp(rec, run) * (cfg.xpMult || 1); if (n) award(SA.awardXp(S(), n), el.querySelector('.feedback .btn.primary') || el); }
          const d = dots[idx]; if (!cfg.deferred) d.classList.add(res.correct ? 'ok' : 'bad'); else d.classList.add('done');
          idx++; step();
        },
      });
      window.scrollTo(0, 0);
    }
    step();
  }

  function summary(rootEl, o) {
    const pct = Math.round(o.score * 100);
    const box = h('section', { class: 'summary' },
      h('div', { class: 'big-score ' + (o.pass === false ? 'fail' : 'pass') }, pct + '%'),
      h('p', { class: 'lead' }, o.headline),
      o.xp ? h('p', { class: 'sum-xp' }, '+' + o.xp + ' XP') : null);
    const lv = o.events.filter((e) => e.type === 'level' && !e.quiet);
    if (lv.length) {
      const ul = h('ul', { class: 'lvl-changes' });
      lv.forEach((e) => ul.appendChild(h('li', { class: e.to > e.from ? 'up' : 'down' }, h('strong', null, e.unitId), ' ' + unitTitle(e.unitId) + ': ', lvChip(e.from) || LV()[0], ' → ', lvChip(e.to))));
      box.appendChild(ul);
    }
    const bd = o.events.filter((e) => e.type === 'badge');
    if (bd.length) box.appendChild(h('p', { class: 'badge-line' }, bd.map((b) => h('span', { class: 'badge' }, SA.app.badgeLabel(b.id)))));
    box.appendChild(h('div', { class: 'btn-row' }, o.actions));
    rootEl.appendChild(box);
  }

  /* ---------- skill tree ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  const sv = function (tag, attrs) { const e = document.createElementNS(NS, tag); for (const k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]); for (let i = 2; i < arguments.length; i++) { const x = arguments[i]; if (x) e.appendChild(typeof x === 'string' ? document.createTextNode(x) : x); } return e; };
  const R = 26, CIRC = 2 * Math.PI * R;
  // wrap a title into lines of at most `w` characters, never truncating
  function wrap(t, w) { const lines = ['']; t.split(' ').forEach((x) => { const cur = lines[lines.length - 1]; if (cur && (cur + ' ' + x).length > w) lines.push(x); else lines[lines.length - 1] = (cur + ' ' + x).trim(); }); return lines; }
  const getView = () => { try { return localStorage.getItem('sa-tree-view') || 'layers'; } catch (e) { return 'layers'; } };
  const setView = (v) => { try { localStorage.setItem('sa-tree-view', v); } catch (e) { /* ignore */ } };

  function layoutLayers(c) {
    const W = 1000, ROW = 118, HEAD = 50, BOT = 18, pos = {}, bands = []; let y0 = 0;
    c.levels.forEach((lv) => {
      const mods = lv.modules.map((id) => c.modules[id]), depth = {};
      const dep = (m) => { if (depth[m.id] != null) return depth[m.id]; depth[m.id] = 0; let d = 0; m.prereqs.forEach((p) => { if (lv.modules.indexOf(p) >= 0) d = Math.max(d, dep(c.modules[p]) + 1); }); return (depth[m.id] = d); };
      mods.forEach(dep);
      const ncols = Math.max.apply(null, mods.map((m) => depth[m.id])) + 1, cols = Array.from({ length: ncols }, () => []);
      mods.forEach((m) => cols[depth[m.id]].push(m));
      const rows = Math.max.apply(null, cols.map((x) => x.length)), bh = HEAD + rows * ROW + BOT;
      cols.forEach((col, d) => col.forEach((m, j) => { pos[m.id] = { x: 70 + (W - 140) * (d + 0.5) / ncols, y: y0 + HEAD + ((rows - col.length) / 2 + j) * ROW + 34 }; }));
      bands.push({ lv, y: y0, h: bh }); y0 += bh;
    });
    return { W, H: y0, pos, bands };
  }
  /* Rings: each Module (course level) is a stripe around the centre; inside a stripe, nodes sit on sub-rings by
     prerequisite depth, so a stripe is as thick as it needs to be. Completed nodes shrink to keep the rest readable.
     The view zooms to the learner's frontier (outermost stripe with an unlocked node) plus a peek at the next one. */
  const R_FULL = 26, R_DONE = 13;
  function layoutRings(c, st) {
    const pos = {}, stripes = [], ang = {}, TAU = 2 * Math.PI;
    // frontier = outermost Module holding an unlocked node, judged on real progress (sandbox ignored)
    const real = Object.assign({}, st, { settings: Object.assign({}, st.settings, { sandbox: false }) });
    let fi = 0; c.levels.forEach((lv, k) => { if (lv.modules.some((id) => SA.moduleUnlocked(real, c.modules[id], c.modules))) fi = Math.max(fi, k); });
    // full size: not yet completed and within the frontier or the one after it; everything else is drawn small
    const isSmall = (m) => SA.moduleLevel(st, m) >= 3 || c.levels.findIndex((l) => l.id === m.level) > fi + 1;
    let r = 0, first = true;
    c.levels.forEach((lv) => {
      const mods = lv.modules.map((id) => c.modules[id]), depth = {};
      const dep = (m) => { if (depth[m.id] != null) return depth[m.id]; depth[m.id] = 0; let d = 0; m.prereqs.forEach((q) => { if (lv.modules.indexOf(q) >= 0) d = Math.max(d, dep(c.modules[q]) + 1); }); return (depth[m.id] = d); };
      mods.forEach(dep);
      const nd = Math.max.apply(null, mods.map((m) => depth[m.id])) + 1, subs = [];
      for (let d = 0; d < nd; d++) {
        const ring = mods.filter((m) => depth[m.id] === d);
        const size = (m) => (isSmall(m) ? 2 * R_DONE + 30 : 132); // arc a node needs, label included
        const need = ring.reduce((a, m) => a + size(m), 0) / TAU;
        const big = ring.some((m) => !isSmall(m));
        r = Math.max(first ? 70 : r + (big ? (d === 0 ? 120 : 104) : (d === 0 ? 70 : 44)), need); first = false;
        const pref = ring.map((m, i) => {
          const ps = m.prereqs.filter((q) => ang[q] != null);
          if (!ps.length) return { m, a: (TAU * i) / ring.length - Math.PI / 2 };
          return { m, a: Math.atan2(ps.reduce((a, q) => a + Math.sin(ang[q]), 0), ps.reduce((a, q) => a + Math.cos(ang[q]), 0)) };
        }).sort((a, b) => a.a - b.a);
        const out = []; pref.forEach((q, i) => { out.push(i === 0 ? q.a : Math.max(q.a, out[i - 1] + (size(pref[i - 1].m) + size(q.m)) / 2 / r)); });
        const n = out.length, over = n > 1 ? out[n - 1] - out[0] + size(pref[n - 1].m) / r - TAU : 0;
        if (over > 0) for (let i = 0; i < n; i++) out[i] -= over * i / n;
        const shift = pref.reduce((a, q, i) => a + (q.a - out[i]), 0) / n;
        pref.forEach((q, i) => { ang[q.m.id] = out[i] + shift; pos[q.m.id] = { r, a: ang[q.m.id], nr: isSmall(q.m) ? R_DONE : R_FULL }; });
        subs.push(r);
      }
      // stripe label: near the stripe's outer edge, in the widest empty arc of the stripe
      const as = mods.map((m) => ((ang[m.id] % TAU) + TAU) % TAU).sort((a, b) => a - b);
      let best = 0, la = -Math.PI / 2; as.forEach((a, i) => { const nx = i === as.length - 1 ? as[0] + TAU : as[i + 1]; if (nx - a > best) { best = nx - a; la = (a + nx) / 2; } });
      const bigS = mods.some((m) => !isSmall(m));
      stripes.push({ lv, inner: subs[0] - (bigS ? 60 : 30), outer: subs[subs.length - 1] + (bigS ? 70 : 30), subs, la, r0: subs[0] });
    });
    // frontier: outermost stripe holding an unlocked module (sandbox = everything)
    const RMAX = stripes[stripes.length - 1].outer + 10;
    const view = Math.min(RMAX, (stripes[Math.min(fi + 1, stripes.length - 1)].inner + (fi + 1 < stripes.length ? 70 : 10)));
    Object.keys(pos).forEach((id) => { const q = pos[id]; q.x = RMAX + q.r * Math.cos(q.a); q.y = RMAX + q.r * Math.sin(q.a); });
    return { W: 2 * RMAX, H: 2 * RMAX, pos, stripes, cx: RMAX, cy: RMAX, view, full: RMAX, fi };
  }

  V.tree = function (rootEl, focusId) {
    const c = C(), st = S(), mode = getView();
    const L = mode === 'rings' ? layoutRings(c, st) : layoutLayers(c), pos = L.pos;
    const svg = sv('svg', { viewBox: mode === 'rings' ? (L.cx - L.view) + ' ' + (L.cy - L.view) + ' ' + 2 * L.view + ' ' + 2 * L.view : '0 0 ' + L.W + ' ' + L.H, class: 'tree-svg ' + mode, role: 'group', 'aria-label': 'Skill tree', preserveAspectRatio: 'xMidYMid meet' });
    // metal ring gradients: dark edge, bright middle, dark edge; the gradient turns slowly so the highlight travels round
    const still = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const metal = (k, id) => sv('linearGradient', { id, x1: '0', y1: '0', x2: '1', y2: '1' }, sv('stop', { offset: '0', class: k + '1' }), sv('stop', { offset: '.5', class: k + '2' }), sv('stop', { offset: '1', class: k + '3' }),
      still ? null : sv('animateTransform', { attributeName: 'gradientTransform', type: 'rotate', from: '0 .5 .5', to: '360 .5 .5', dur: '12s', repeatCount: 'indefinite' }));
    svg.appendChild(sv('defs', {}, sv('linearGradient', { id: 'sa-grad', x1: '0', y1: '0', x2: '1', y2: '0' }, sv('stop', { offset: '0', class: 'gs1' }), sv('stop', { offset: '1', class: 'gs2' })), sv('radialGradient', { id: 'sa-band-glow', cx: '0.1', cy: '0', r: '0.7' }, sv('stop', { offset: '0', class: 'bg1' }), sv('stop', { offset: '1', class: 'bg2' })), ...['bz', 'sv', 'gd'].map((k, i) => metal(k, ['sa-bronze', 'sa-silver', 'sa-gold'][i]))));
    const cpLabel = (lv) => { if (st.checkpoints[lv.id]) return 'Checkpoint passed ✓'; return builtCount(lv) >= 3 ? 'Checkpoint ›' : null; };
    if (mode === 'rings') {
      L.stripes.slice().reverse().forEach((g) => { const k = L.stripes.indexOf(g); svg.appendChild(sv('circle', { cx: L.cx, cy: L.cy, r: g.outer, class: 'ring-band ' + (k % 2 ? 'alt' : '') + (k > L.fi + 1 ? ' far' : '') })); });
      L.stripes.forEach((g) => {
        g.subs.forEach((rr) => svg.appendChild(sv('circle', { cx: L.cx, cy: L.cy, r: rr, class: 'ring-guide' })));
        const lr = g.outer - 22, t = sv('text', { x: L.cx + lr * Math.cos(g.la), y: L.cy + lr * Math.sin(g.la) + 7, 'text-anchor': 'middle', class: 'ring-title' }, levelName(g.lv));
        const cp = cpLabel(g.lv);
        svg.appendChild(cp ? sv('a', { href: '#/c/' + g.lv.id, class: 'cp-link' }, sv('title', {}, g.lv.title + ': ' + cp), t) : sv('g', {}, sv('title', {}, g.lv.title), t));
      });
    } else {
      L.bands.forEach((b, i) => {
        svg.appendChild(sv('rect', { x: 0, y: b.y, width: L.W, height: b.h, class: 'band ' + (i % 2 ? 'alt' : '') }));
        svg.appendChild(sv('rect', { x: 0, y: b.y, width: L.W, height: b.h, class: 'band-glow' }));
        if (i) svg.appendChild(sv('line', { x1: 0, x2: L.W, y1: b.y, y2: b.y, class: 'band-rule' }));
        svg.appendChild(sv('text', { x: 18, y: b.y + 32, class: 'band-title' }, levelName(b.lv) + ' · ' + b.lv.title));
        const cp = cpLabel(b.lv);
        if (cp) svg.appendChild(sv('a', { href: '#/c/' + b.lv.id, class: 'cp-link' }, sv('text', { x: L.W - 18, y: b.y + 32, 'text-anchor': 'end', class: 'cp-text' + (st.checkpoints[b.lv.id] ? ' done' : '') }, cp)));
      });
    }
    const edges = sv('g', { class: 'edges' }), nodes = sv('g', { class: 'nodes' });
    Object.values(c.modules).forEach((m) => m.prereqs.forEach((p) => {
      const a = pos[p], b = pos[m.id]; if (!a || !b) return;
      const pm = c.modules[p], cross = pm.level !== m.level, ok = SA.moduleLevel(st, pm) >= 3;
      let d;
      if (mode === 'rings') {
        // gentle curve bowing away from the centre
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, vx = mx - L.cx, vy = my - L.cy, vl = Math.hypot(vx, vy) || 1, k = 0.12 * Math.hypot(b.x - a.x, b.y - a.y);
        const ux = (b.x - a.x), uy = (b.y - a.y), ul = Math.hypot(ux, uy) || 1;
        d = 'M' + (a.x + ux / ul * a.nr) + ' ' + (a.y + uy / ul * a.nr) + ' Q' + (mx + vx / vl * k) + ' ' + (my + vy / vl * k) + ' ' + (b.x - ux / ul * b.nr) + ' ' + (b.y - uy / ul * b.nr);
      } else if (!cross) {
        // same level: prerequisite is always in an earlier column, so leave from its right side, arrive at the left side
        const mx = (a.x + b.x) / 2; d = 'M' + (a.x + R) + ' ' + a.y + ' C' + mx + ' ' + a.y + ' ' + mx + ' ' + b.y + ' ' + (b.x - R) + ' ' + b.y;
      } else {
        // across levels: the prerequisite is always above, so leave from its bottom and arrive at the top
        const my = (a.y + R + b.y - R) / 2; d = 'M' + a.x + ' ' + (a.y + R) + ' C' + a.x + ' ' + my + ' ' + b.x + ' ' + my + ' ' + b.x + ' ' + (b.y - R);
      }
      edges.appendChild(sv('path', { d, class: 'edge' + (ok ? ' ok' : '') + (cross ? ' cross' : '') }));
    }));
    const recMod = SA.recommendModule(st); // the module to take next: semibold title with a star
    Object.values(c.modules).forEach((m) => {
      const p = pos[m.id], n = builtUnits(m).length, locked = isLocked(m), prof = m.units.filter((u) => SA.unitLevel(st, u) >= 3).length, frac = prof / m.units.length, mastered = n > 0 && m.units.every((u) => SA.unitLevel(st, u) >= 4);
      const label = m.id + ' ' + m.title + (n ? '' : ' (coming soon)') + (locked ? ' (locked)' : '') + (mastered ? ', mastered' : frac ? ', ' + Math.round(frac * 100) + '% proficient or better' : '');
      const NR = p.nr || R, done = NR < R, CI = 2 * Math.PI * NR;
      const far = mode === 'rings' && C().levels.findIndex((l) => l.id === m.level) > L.fi + 1;
      const g = sv('a', { href: '#/m/' + m.id, class: 'node tk-' + m.id[0] + (n ? '' : ' soon') + (locked ? ' locked' : '') + (done ? ' small' : '') + (far ? ' far' : '') + (mastered ? ' mastered' : ''), 'aria-label': label });
      g.appendChild(sv('title', {}, levelName(levelOf(m)) + ', ' + label + ' · ' + m.hours + ' h'));
      g.appendChild(sv('circle', { cx: p.x, cy: p.y, r: NR, class: 'ring-bg' }));
      // one arc per level (gold Mastered, silver Proficient, bronze Familiar), each as long as its share of units and
      // touching the next with no gap. Each arc ends in a round cap that sits over the start of the next: ===)===)===)
      const cnt = [4, 3, 2].map((v) => m.units.filter((u) => SA.unitLevel(st, u) === v).length), CLS = ['m4', 'm3', 'm2'], rot = 'rotate(-90 ' + p.x + ' ' + p.y + ')';
      const W = done ? 3 : 4, arcs = []; let acc = 0;
      cnt.forEach((c, i) => { if (c) { arcs.push({ from: CI * acc / m.units.length, len: CI * c / m.units.length, cls: CLS[i] }); acc += c; } });
      // every arc after the first starts tucked under the one before it, so only its round end cap shows: ===)===)
      arcs.slice().reverse().forEach((r) => { const ds = r.from ? r.from - W : r.from + W / 2, dl = r.from + r.len - W / 2 - ds;
        g.appendChild(sv('circle', { cx: p.x, cy: p.y, r: NR, class: 'ring ' + r.cls, 'stroke-dasharray': Math.max(0.01, dl).toFixed(2) + ' ' + CI.toFixed(2), 'stroke-dashoffset': (-ds).toFixed(2), transform: rot }));
        // the first arc starts flat at 12 o'clock: a short square-ended piece fills in its round start cap
        if (!r.from) g.appendChild(sv('circle', { cx: p.x, cy: p.y, r: NR, class: 'ring flat ' + r.cls, 'stroke-dasharray': Math.min(W, r.len).toFixed(2) + ' ' + CI.toFixed(2), transform: rot })); });
      // mastered: gold ring with a glint that sweeps round it now and then
      if (mastered) g.appendChild(sv('circle', { cx: p.x, cy: p.y, r: NR, class: 'shine', style: '--ci:' + CI.toFixed(1) + 'px', 'stroke-dasharray': (CI * 0.12).toFixed(1) + ' ' + CI.toFixed(1), transform: 'rotate(-90 ' + p.x + ' ' + p.y + ')' }));
      g.appendChild(sv('circle', { cx: p.x, cy: p.y, r: Math.max(NR - (done ? 3 : 5), 4), class: 'disc' }));
      g.appendChild(sv('text', { x: p.x, y: p.y + (done ? 3.5 : 6), 'text-anchor': 'middle', class: 'node-id' }, m.id));
      const isRec = recMod === m.id, lines = wrap(m.title, 16), tg = sv('g', { class: 'node-label' }); lines.forEach((t, i) => tg.appendChild(sv('text', { x: p.x, y: p.y + NR + 17 + i * 14, 'text-anchor': 'middle', class: 'node-title' + (isRec ? ' rec' : '') }, t + (isRec && i === lines.length - 1 ? ' ✪' : '')))); g.appendChild(tg);
      if (locked) g.appendChild(sv('g', { class: 'lock', transform: 'translate(' + (p.x + NR * 0.55) + ',' + (p.y - NR - 14) + ')' }, sv('rect', { x: 0, y: 7, width: 14, height: 10, rx: 2 }), sv('path', { d: 'M3 7V5a4 4 0 0 1 8 0v2', fill: 'none' })));
      nodes.appendChild(g);
    });
    svg.appendChild(edges); svg.appendChild(nodes);
    const seg = h('div', { class: 'seg-group view-toggle', role: 'group', 'aria-label': 'Tree layout' });
    [['layers', 'Layers'], ['rings', 'Rings']].forEach(([v, t]) => seg.appendChild(h('button', { type: 'button', class: 'seg-btn' + (mode === v ? ' sel' : ''), 'aria-pressed': String(mode === v), onclick: () => { setView(v); SA.app.reload(); } }, t)));
    if (mode !== 'rings') {
      page(rootEl, 'Skill tree');
      rootEl.appendChild(h('div', { class: 'tree-bar' }, h('div'), seg));
      rootEl.appendChild(h('div', { class: 'tree-wrap' }, svg));
      // coming back from a module: scroll its node to the middle of the screen and mark it briefly
      const fn = focusId && svg.querySelector('.node[href="#/m/' + focusId + '"]');
      if (fn) { fn.classList.add('focus'); requestAnimationFrame(() => fn.scrollIntoView({ block: 'center', inline: 'center' })); }
      return;
    }
    // Rings: a full-screen map. Drag to pan, wheel or +/- to zoom, the target button re-centres on the learner's frontier.
    clear(rootEl);
    const map = h('div', { class: 'map', role: 'application', 'aria-label': 'Skill map. Drag to move, scroll or use the plus and minus buttons to zoom.' }, svg, h('div', { class: 'map-vignette', 'aria-hidden': 'true' }));
    const vb = { x: L.cx - L.view, y: L.cy - L.view, w: 2 * L.view, h: 2 * L.view }, home = Object.assign({}, vb);
    const MIN = 260, MAX = 2 * L.full * 1.15;
    // set the viewBox; with anim, glide there in 250 ms (skipped under reduced motion)
    let shown = Object.assign({}, vb), raf = 0;
    const put = (b) => { shown = b; svg.setAttribute('viewBox', b.x + ' ' + b.y + ' ' + b.w + ' ' + b.h); };
    let token = 0;
    const apply = (anim) => {
      cancelAnimationFrame(raf);
      const my = ++token, to = Object.assign({}, vb), from = Object.assign({}, shown);
      if (!anim || (root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches)) return put(to);
      const t0 = performance.now();
      const step = (t) => { if (my !== token) return; const k = Math.min(1, (t - t0) / 250), e = 1 - Math.pow(1 - k, 3); put({ x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, w: from.w + (to.w - from.w) * e, h: from.h + (to.h - from.h) * e }); if (k < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
      setTimeout(() => { if (my === token) { cancelAnimationFrame(raf); put(to); } }, 320); // finish even if rAF is throttled (background tab)
    };
    // zoom by factor k around a point given in svg units (defaults to the view centre)
    const zoomAt = (k, px, py, anim) => {
      const w = Math.min(MAX, Math.max(MIN, vb.w * k)), f = w / vb.w;
      if (px == null) { px = vb.x + vb.w / 2; py = vb.y + vb.h / 2; }
      vb.x = px - (px - vb.x) * f; vb.y = py - (py - vb.y) * f; vb.w = w; vb.h = vb.h * f; apply(anim);
    };
    const toSvg = (ev) => { const r = svg.getBoundingClientRect(), s = Math.max(vb.w / r.width, vb.h / r.height); return { x: vb.x + vb.w / 2 + (ev.clientX - r.left - r.width / 2) * s, y: vb.y + vb.h / 2 + (ev.clientY - r.top - r.height / 2) * s, s }; };
    svg.addEventListener('wheel', (ev) => { ev.preventDefault(); const p = toSvg(ev); zoomAt(Math.exp(ev.deltaY * 0.0015), p.x, p.y); }, { passive: false });
    let drag = null, moved = false;
    svg.addEventListener('pointerdown', (ev) => { if (ev.button !== 0) return; drag = { x: ev.clientX, y: ev.clientY, vx: vb.x, vy: vb.y, s: toSvg(ev).s }; moved = false; });
    window.addEventListener('pointermove', (ev) => {
      if (!drag) return; const dx = ev.clientX - drag.x, dy = ev.clientY - drag.y;
      if (!moved && Math.hypot(dx, dy) < 5) return;
      if (!moved) { moved = true; map.classList.add('dragging'); }
      vb.x = drag.vx - dx * drag.s; vb.y = drag.vy - dy * drag.s; apply(false);
    });
    const end = () => { drag = null; map.classList.remove('dragging'); };
    window.addEventListener('pointerup', end); SA.app.onLeave(() => window.removeEventListener('pointerup', end));
    svg.addEventListener('click', (ev) => { if (moved) { ev.preventDefault(); ev.stopPropagation(); moved = false; } }, true); // a drag is not a click on a node
    const btn = (t, label, fn) => h('button', { type: 'button', class: 'map-btn', title: label, 'aria-label': label, onclick: fn }, t);
    map.appendChild(h('div', { class: 'map-tools' }, seg));
    map.appendChild(h('div', { class: 'map-zoom' },
      btn('+', 'Zoom in', () => zoomAt(0.7, null, null, true)),
      btn('\u2212', 'Zoom out', () => zoomAt(1 / 0.7, null, null, true)),
      btn('\u25CE', 'Back to my progress', () => { Object.assign(vb, home); apply(true); })));
    map.addEventListener('keydown', (ev) => { if (ev.key === '+' || ev.key === '=') zoomAt(0.8, null, null, true); else if (ev.key === '-') zoomAt(1.25, null, null, true); });
    rootEl.appendChild(map);
    // coming back from a module: centre the map on its node at the usual zoom and mark it briefly
    const fp = focusId && pos[focusId], fnode = focusId && svg.querySelector('.node[href="#/m/' + focusId + '"]');
    if (fp) { vb.x = fp.x - vb.w / 2; vb.y = fp.y - vb.h / 2; apply(false); if (fnode) fnode.classList.add('focus'); }
  };

  /* ---------- module page ---------- */
  V.module = function (rootEl, id) {
    const c = C(), m = c.modules[id], st = S();
    if (!m) return notFound(rootEl, 'No module ' + id);
    const locked = isLocked(m), lvl = levelOf(m);
    clear(rootEl);
    rootEl.appendChild(crumb('#/at/' + m.id, levelName(lvl) + ' · ' + lvl.title));
    rootEl.appendChild(h('header', { class: 'page-head' }, h('h1', null, m.title)));
    rootEl.appendChild(mdEl('p', 'story', m.hook, true));
    if (locked) rootEl.appendChild(h('p', { class: 'notice warn' }, 'Opens when you reach Proficient in ', prereqLinks(m), '.'));
    const list = h('div', { class: 'unit-list' });
    m.units.forEach((u) => {
      const meta = unitMeta(u), lv = SA.unitLevel(st, u), can = meta.built && !locked;
      const det = h('div', { class: 'unit-detail', hidden: true, id: 'ud-' + u.replace('.', '-') },
        meta.objectives.length ? h('ul', { class: 'obj-list' }, meta.objectives.map((o) => mdEl('li', null, o.replace(/^Learner can /i, '').replace(/^./, (x) => x.toUpperCase()), true))) : null,
        (meta.reading || []).length ? h('div', { class: 'reading' }, h('h4', null, 'Further reading'), h('ul', null, meta.reading.map((s) => h('li', null, s.url ? h('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer' }, s.text) : s.text)))) : null,
        h('p', { class: 'unit-time' }, 'About ' + meta.minutes + ' minutes'));
      const toggle = h('button', { type: 'button', class: 'unit-toggle', 'aria-expanded': 'false', 'aria-controls': det.id },
        h('span', { class: 'unit-id' }, u), h('span', { class: 'unit-name' }, meta.title), lvChip(lv), h('span', { class: 'chev', 'aria-hidden': 'true' }));
      toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); det.hidden = !open; row.classList.toggle('open', open); });
      const row = h('article', { class: 'unit-card' + (meta.built ? '' : ' soon') },
        h('div', { class: 'unit-top' }, toggle, h('div', { class: 'btn-row' }, can ? [btnLink('#/u/' + u, (st.lessons[u] && !st.lessons[u].d && st.lessons[u].c > 0) ? 'Continue lesson' : 'Learn', '', (st.lessons[u] && !st.lessons[u].d && st.lessons[u].c > 0) ? 'Pick up at card ' + (st.lessons[u].c + 1) : null), SA.hasReward(st, 'challenge') && lv >= 2 ? btnLink('#/p/' + u + '/challenge', 'Challenge', 'ghost', 'No hints or retries. Double XP.') : null, btnLink('#/p/' + u, 'Practise', 'primary')] : h('span', { class: 'muted' }, meta.built ? '' : 'Coming soon'))),
        det);
      list.appendChild(row);
    });
    rootEl.appendChild(list);
    const nb = builtUnits(m).length;
    if (nb && !locked) {
      rootEl.appendChild(h('h2', null, 'Unit test'));
      const tip = 'Two questions per unit, no hints. 80% to pass.' + (nb < m.units.length ? ' Covers the ' + nb + ' units written so far.' : '');
      rootEl.appendChild(h('div', { class: 'btn-row' }, btnLink('#/t/' + m.id, st.modTests[m.id] ? 'Take it again' : 'Take the unit test', 'primary', tip), st.modTests[m.id] ? h('span', { class: 'good' }, 'Passed ✓') : null));
    }
    if (m.minigame) {
      const mg = m.minigame, reg = SA.minigames[mg.key], best = st.games[mg.key];
      if (reg && !locked) {
        const host = h('div', { class: 'game-host' }), out = h('p', { class: 'muted', 'aria-live': 'polite' });
        const play = h('button', { type: 'button', class: 'btn primary' }, 'Play');
        rootEl.appendChild(h('h2', null, mg.name));
        rootEl.appendChild(h('p', null, mg.variant));
        play.addEventListener('click', () => {
          play.hidden = true; clear(host);
          try {
            reg.mount(host, { level: parseInt(String(m.level).slice(1), 10) || 1, module: m.id, variant: mg.variant }, (score) => {
              const r = SA.applyGame(S(), mg.key, score); award(r.events, out); out.textContent = 'Score ' + Math.round(score); play.hidden = false; play.textContent = 'Play again';
            });
          } catch (e) { out.textContent = 'The game failed to start: ' + e.message; play.hidden = false; }
        });
        rootEl.appendChild(h('div', { class: 'btn-row' }, play, best ? h('span', { class: 'muted' }, 'Best: ' + best) : null)); rootEl.appendChild(out); rootEl.appendChild(host);
      }
    }
    if (m.jurisdiction_notes) { rootEl.appendChild(h('h2', null, 'Other jurisdictions')); rootEl.appendChild(mdEl('p', null, m.jurisdiction_notes, true)); }
  };

  /* ---------- lesson ---------- */
  V.lesson = function (rootEl, id) {
    const meta = unitMeta(id);
    if (!meta) return notFound(rootEl, 'No unit ' + id);
    const mod = C().modules[meta.module];
    if (isLocked(mod)) return lockedPanel(rootEl, mod);
    if (!meta.built) return comingSoon(rootEl, id + ' ' + meta.title);
    clear(rootEl); rootEl.appendChild(h('p', { class: 'muted' }, 'Loading…'));
    const here = stillHere(); SA.loadUnit(id).then((u) => { if (!here()) return;
      const cards = u.lesson, n = cards.length, answered = {}, ls = (S().lessons || {})[id];
      // pick up where the learner left off; a finished lesson starts again from the first card
      let idx = ls && !ls.d ? Math.min(ls.c || 0, n - 1) : 0, finished = false;
      for (let k = 0; k < idx; k++) answered[k] = true;
      if (ls && ls.k) Object.keys(ls.k).forEach((k) => { answered[k] = true; });
      clear(rootEl);
      rootEl.appendChild(crumb('#/m/' + mod.id, mod.title));
      rootEl.appendChild(h('header', { class: 'page-head' }, h('h1', null, id + ' · ' + meta.title)));
      const bar = h('div', { class: 'progress', role: 'progressbar', 'aria-label': 'Lesson progress', 'aria-valuemin': '0', 'aria-valuemax': String(n), 'aria-valuenow': '1' }, h('div', { class: 'bar' }));
      const cardBox = h('article', { class: 'lesson-card prose', tabindex: '-1' });
      const back = h('button', { type: 'button', class: 'btn' }, '‹ Back'), next = h('button', { type: 'button', class: 'btn primary' }, 'Next ›');
      rootEl.appendChild(bar); rootEl.appendChild(cardBox); rootEl.appendChild(h('div', { class: 'btn-row lesson-nav' }, back, next));
      function show() {
        const card = cards[idx];
        bar.firstChild.style.width = Math.round(((finished ? n : idx + 1) / n) * 100) + '%'; bar.setAttribute('aria-valuenow', String(idx + 1));
        clear(cardBox); cardBox.classList.remove('enter'); void cardBox.offsetWidth; cardBox.classList.add('enter');
        SA.md.into(cardBox, card.md);
        if (card.check) {
          const inst = Object.assign({ seed: 7000 + idx, unitId: id, exId: 'lesson-' + idx }, card.check), host = h('div', { class: 'exercise inline' }), k = idx;
          cardBox.appendChild(h('h3', { class: 'check-title' }, 'Quick check')); cardBox.appendChild(host);
          runExercise(host, inst, { hints: true, retry: true, noNext: true, onChecked(res, btn) { answered[k] = true; sync(); award(SA.lessonCheck(S(), id, k, res.correct), host.querySelector('.feedback') || btn); } });
        }
        sync(); back.disabled = idx === 0; next.textContent = idx === n - 1 ? 'Finish lesson' : 'Next ›';
        window.scrollTo(0, 0);
      }
      function sync() { const need = cards[idx].check && !answered[idx]; next.disabled = !!need; next.title = need ? 'Answer the quick check first' : ''; }
      back.addEventListener('click', () => { if (finished) { finished = false; show(); } else if (idx > 0) { idx--; show(); } });
      next.addEventListener('click', () => {
        if (idx < n - 1) { idx++; award(SA.lessonCard(S(), id, idx), next); show(); return; }
        finished = true; clear(cardBox); SA.md.into(cardBox, '## Lesson complete');
        award(SA.lessonDone(S(), id), next);
        const nu = nextUnitAfter(id);
        cardBox.appendChild(h('div', { class: 'btn-row' }, btnLink('#/p/' + id, 'Practise this unit', 'primary'), nu ? btnLink('#/u/' + nu, 'Next lesson: ' + unitTitle(nu)) : btnLink('#/m/' + mod.id, 'Back')));
        bar.firstChild.style.width = '100%'; next.disabled = true; back.disabled = false;
      });
      show();
      const papers = u.exercises.filter((e) => e.template === 'paper');
      if (papers.length) {
        const sec = h('section', { class: 'panel' }, h('h2', { title: 'You mark it yourself. It earns XP but does not change your level.' }, 'Written exercise'));
        papers.forEach((ex, k) => {
          const holder = h('div', { class: 'paper-holder' }), openBtn = h('button', { type: 'button', class: 'btn' }, 'Open written exercise' + (papers.length > 1 ? ' ' + (k + 1) : ''));
          openBtn.addEventListener('click', () => {
            openBtn.hidden = true; const inst = SA.instance(id, ex.id, 1 + k);
            holder.appendChild(mdEl('div', 'ex-prompt', inst.prompt));
            SA.render.mount(holder, inst, () => {}, { onSelfScore(score) { const r = SA.applyPaper(S(), id, score); award(r.events, holder); holder.appendChild(h('p', { class: 'good' }, 'Saved')); } });
          });
          sec.appendChild(openBtn); sec.appendChild(holder);
        });
        rootEl.appendChild(sec);
      }
    }, (e) => panel(rootEl, 'Could not load the unit', [h('p', null, String(e.message || e)), btnLink('#/m/' + mod.id, 'Back')]));
  };

  /* ---------- practice ---------- */
  V.practice = function (rootEl, arg) {
    const id = String(arg).split('/')[0], challenge = /\/challenge$/.test(arg) && SA.hasReward(S(), 'challenge');
    const meta = unitMeta(id);
    if (!meta) return notFound(rootEl, 'No unit ' + id);
    const mod = C().modules[meta.module];
    if (isLocked(mod)) return lockedPanel(rootEl, mod);
    if (!meta.built) return comingSoon(rootEl, id + ' ' + meta.title);
    clear(rootEl); rootEl.appendChild(h('p', { class: 'muted' }, 'Loading…'));
    const here = stillHere(); SA.loadUnit(id).then(() => prepareItems(SA.composePractice(S(), id, Date.now()))).then((items) => { if (!here()) return;
      if (!items.length) return panel(rootEl, 'Nothing to practise yet', [btnLink('#/m/' + mod.id, 'Back')]);
      const deferred = S().settings.feedback === 'end', xp0 = S().xp, mult = challenge ? 2 : 1;
      runSession(rootEl, {
        crumb: crumb('#/m/' + mod.id, mod.title), title: (challenge ? 'Challenge ' : 'Practise ') + id + ' · ' + meta.title, items, hints: !challenge, retry: !deferred && !challenge, deferred, liveXp: !deferred, xpMult: mult,
        finish(results, rootEl2) {
          const out = SA.applyPractice(S(), id, results, { xpDone: !deferred, mult }); SA.app.save(); SA.app.announce(out.events);
          const own = results.filter((r) => !r.callback), nu = nextUnitAfter(id);
          summary(rootEl2, {
            score: out.score, events: out.events, xp: S().xp - xp0,
            headline: own.filter((r) => r.correct).length + ' of ' + own.length + ' right first time',
            actions: [h('button', { type: 'button', class: 'btn primary', onclick: () => SA.app.reload() }, challenge ? 'Again' : 'Practise again'), nu ? btnLink('#/u/' + nu, 'Next unit') : null, btnLink('#/m/' + mod.id, 'Back')],
          });
        },
      });
    }).catch((e) => panel(rootEl, 'Could not start practice', [h('p', null, String(e.message || e)), btnLink('#/m/' + mod.id, 'Back')]));
  };

  /* ---------- unit test (always marked at the end) ---------- */
  V.test = function (rootEl, modId) {
    const m = C().modules[modId];
    if (!m) return notFound(rootEl, 'No module ' + modId);
    if (isLocked(m)) return lockedPanel(rootEl, m);
    const built = builtUnits(m);
    if (!built.length) return comingSoon(rootEl, 'This unit test');
    const sub = { id: m.id, units: built };
    clear(rootEl); rootEl.appendChild(h('p', { class: 'muted' }, 'Loading…'));
    const here = stillHere(); prepareItems(SA.composeUnitTest(sub, Date.now())).then((items) => { if (!here()) return;
      runSession(rootEl, {
        crumb: crumb('#/m/' + m.id, m.title), title: 'Unit test', items, hints: false, retry: false, deferred: true,
        finish(results, rootEl2) {
          const before = S().xp, out = SA.applyUnitTest(S(), sub, results.map((r) => ({ unitId: r.unitId, correct: r.correct }))); SA.app.save(); SA.app.announce(out.events);
          summary(rootEl2, {
            score: out.score, pass: out.pass, events: out.events, xp: S().xp - before,
            headline: out.pass ? 'Passed' : 'Not passed yet. You need 80%.',
            actions: [h('button', { type: 'button', class: 'btn primary', onclick: () => SA.app.reload() }, 'Try another test'), btnLink('#/m/' + m.id, 'Back')],
          });
        },
      });
    }).catch((e) => panel(rootEl, 'Could not start the test', [h('p', null, String(e.message || e))]));
  };

  /* ---------- checkpoint ---------- */
  V.checkpoint = function (rootEl, levelId) {
    const c = C(), lv = c.levels.find((l) => l.id === levelId);
    if (!lv) return notFound(rootEl, 'No level ' + levelId);
    const units = []; lv.modules.forEach((mid) => { const m = c.modules[mid]; if (!isLocked(m)) builtUnits(m).forEach((u) => units.push(u)); });
    if (units.length < 3) return panel(rootEl, 'Not open yet', [h('p', null, builtCount(lv) < 3 ? 'This level has no lessons yet.' : 'Unlock more of this level first.'), btnLink('#/', 'Skill tree', 'primary')]);
    clear(rootEl); rootEl.appendChild(h('p', { class: 'muted' }, 'Loading…'));
    const here = stillHere(); prepareItems(SA.composeCheckpoint(units, Date.now(), 30)).then((items) => { if (!here()) return;
      runSession(rootEl, {
        crumb: crumb('#/', 'Skill tree'), title: levelName(lv) + ' checkpoint', items, hints: false, retry: false, deferred: true, timer: { target: 35 },
        finish(results, rootEl2) {
          const before = S().xp, out = SA.applyCheckpoint(S(), lv.id, results.map((r) => ({ unitId: r.unitId, correct: r.correct }))); SA.app.save(); SA.app.announce(out.events);
          summary(rootEl2, {
            score: out.score, pass: out.pass, events: out.events, xp: S().xp - before,
            headline: out.pass ? 'Checkpoint passed' : 'Not passed yet. You need 80%.',
            actions: [h('button', { type: 'button', class: 'btn primary', onclick: () => SA.app.reload() }, 'Try again'), btnLink('#/', 'Skill tree')],
          });
        },
      });
    }).catch((e) => panel(rootEl, 'Could not start the checkpoint', [h('p', null, String(e.message || e))]));
  };

  /* ---------- placement quiz ---------- */
  V.placement = function (rootEl) {
    page(rootEl, 'Placement quiz');
    const start = h('button', { type: 'button', class: 'btn primary' }, 'Start');
    rootEl.appendChild(h('p', { class: 'lead' }, 'About 15 minutes. Use "Don\'t know" rather than guessing.'));
    rootEl.appendChild(h('div', { class: 'btn-row' }, start, btnLink('#/', 'Not now')));
    start.addEventListener('click', () => {
      const ps = SA.placementStart(Date.now()), t0 = Date.now(), tally = { n: 0, ok: 0 };
      clear(rootEl);
      rootEl.appendChild(h('header', { class: 'page-head' }, h('h1', null, 'Placement quiz')));
      const meter = h('div', { class: 'dots place-meter' }, h('span', { class: 'muted place-count' }, ''), h('span', { class: 'timer' }, '0:00'));
      rootEl.appendChild(meter);
      const body = h('section', { class: 'session-body' }); rootEl.appendChild(body);
      const tick = setInterval(() => { meter.lastChild.textContent = fmtTime(Math.floor((Date.now() - t0) / 1000)); }, 1000); SA.app.onLeave(() => clearInterval(tick));
      const elapsed = () => Math.floor((Date.now() - t0) / 1000);
      async function nextProbe() {
        const pr = SA.placementNext(ps, S(), elapsed());
        if (!pr) return done();
        const here = stillHere(), items = await prepareItems(pr.items), res = []; if (!here()) return;
        if (!items.length) { SA.placementRecord(ps, pr.modId, []); return nextProbe(); }
        let i = 0;
        const ask = () => {
          if (i >= items.length) { SA.placementRecord(ps, pr.modId, res); return nextProbe(); }
          const it = items[i]; let inst; try { inst = SA.instance(it.unitId, it.exId, it.seed); } catch (e) { i++; return ask(); }
          clear(body); const host = h('div', { class: 'exercise' }); body.appendChild(host);
          meter.firstChild.textContent = 'Question ' + (tally.n + 1);
          runExercise(host, inst, { deferred: true, skip: true, autofocus: true, onNext(r) { res.push({ correct: r.correct }); tally.n++; if (r.correct) tally.ok++; i++; ask(); } });
        };
        ask();
      }
      function done() {
        clearInterval(tick);
        const out = SA.applyPlacement(S(), ps, tally.ok); SA.app.save(); SA.app.announce(out.events);
        clear(rootEl); page(rootEl, 'Placement done');
        const placed = ps.passed.map((id) => C().modules[id]);
        rootEl.appendChild(h('p', { class: 'lead' }, placed.length ? 'You start with ' + placed.length + (placed.length === 1 ? ' topic' : ' topics') + ' marked Proficient.' : 'Start from the beginning. Nothing was skipped.'));
        if (placed.length) rootEl.appendChild(h('ul', { class: 'placed-list' }, placed.map((m) => h('li', null, link('#/m/' + m.id, m.title)))));
        rootEl.appendChild(h('p', { class: 'muted' }, tally.ok + ' of ' + tally.n + ' right in ' + fmtTime(elapsed())));
        rootEl.appendChild(h('div', { class: 'btn-row' }, btnLink('#/', 'Skill tree', 'primary')));
      }
      nextProbe();
    });
  };

  /* ---------- icons (simple line drawings, stroke = currentColor) ---------- */
  const ICONS = {
    freeze: '<path d="M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17M12 2l-2.5 2.5M12 2l2.5 2.5M12 22l-2.5-2.5M12 22l2.5-2.5"/>',
    challenge: '<path d="M12 22c4.4 0 7-2.9 7-6.6 0-3.1-2-5.4-3.6-7.2-.4 1.9-1.4 3.1-2.7 3.6.3-3.3-1-6.4-3.7-8.8.1 3.4-1.6 5.5-3.1 7.4C4.8 12.3 5 13.9 5 15.4 5 19.1 7.6 22 12 22z"/>',
    accent: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-1.4-1.2-1.6-1.2-2.8 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7.2" r="1.2"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h7"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    ring: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 9 9"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a2 2 0 0 0 2 4h1M16 6h3a2 2 0 0 1-2 4h-1M12 13v4M8 21h8M9 17h6"/>',
    flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2-5 1 1.5 2 2 2.5 2C11 7.5 11 5 12 3z"/>',
    game: '<rect x="3" y="7" width="18" height="11" rx="4"/><path d="M8 10v4M6 12h4"/><circle cx="15.5" cy="11" r=".8"/><circle cx="17.5" cy="13.5" r=".8"/>',
  };
  const icon = (name, cls) => h('span', { class: 'ic ' + (cls || ''), 'aria-hidden': 'true', html: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICONS[name] + '</svg>' });

  /* ---------- profile ---------- */
  V.profile = function (rootEl) {
    const c = C(), st = S();
    page(rootEl, 'Profile');
    if (!SA.store.isPersistent()) rootEl.appendChild(h('p', { class: 'notice warn' }, 'This browser is not saving progress. Copy your progress code before you close the tab.'));
    const counts = [0, 0, 0, 0, 0]; c.unitIds.forEach((u) => counts[SA.unitLevel(st, u)]++);
    const stats = h('div', { class: 'stat-grid' });
    [['XP', st.xp], ['Day streak', SA.app.streak()], ['Units Proficient', counts[3] + counts[4]], ['Units Mastered', counts[4]], ['Unit tests passed', Object.keys(st.modTests).length], ['Checkpoints', Object.keys(st.checkpoints).length]]
      .forEach(([k, v]) => stats.appendChild(h('div', { class: 'stat' }, h('div', { class: 'stat-v' }, String(v)), h('div', { class: 'stat-k' }, k))));
    rootEl.appendChild(stats);

    // rank and rewards
    const rk = SA.rankOf(st.xp), nx = SA.nextReward(st);
    rootEl.appendChild(h('h2', null, 'Rank ' + rk.level + ' · ' + rk.title));
    rootEl.appendChild(h('div', { class: 'rank-bar', role: 'progressbar', 'aria-valuemin': String(rk.base), 'aria-valuemax': String(rk.next), 'aria-valuenow': String(st.xp), 'aria-label': 'Progress to the next rank' }, h('div', { class: 'bar', style: 'width:' + Math.round(rk.frac * 100) + '%' })));
    rootEl.appendChild(h('p', { class: 'muted' }, SA.fmt.num(rk.next - st.xp, 0) + ' XP to rank ' + (rk.level + 1)));
    // streak freezes: three snowflakes, lit for each one banked
    const fz = st.freezes || 0;
    rootEl.appendChild(h('div', { class: 'freezes', title: 'Streak freezes: ' + fz + ' of 3. Every rank-up banks one. A missed day uses one instead of resetting your streak.', 'aria-label': 'Streak freezes: ' + fz + ' of 3' },
      [0, 1, 2].map((i) => icon('freeze', i < fz ? 'on' : 'off'))));
    // reward track: one tile per reward, lit once reached
    rootEl.appendChild(h('div', { class: 'reward-track', role: 'list', 'aria-label': 'Rank rewards' }, SA.REWARDS.filter((r) => r.kind !== 'game' || (SA.blitz && SA.blitz.games[r.id])).map((r) => {
      const got = rk.level >= r.level, next = nx && nx === r, name = r.kind === 'accent' ? r.label.replace(' colour theme', '') : r.kind === 'game' ? r.label.split(': ')[1] : r.label.split(':')[0];
      return h('div', { class: 'reward' + (got ? ' got' : '') + (next ? ' next' : '') + (r.kind === 'accent' ? ' rw-' + r.id : ''), role: 'listitem', title: r.label + (got ? '' : ' (rank ' + r.level + ')') },
        h('div', { class: 'reward-ic' }, got ? icon(r.kind === 'game' ? 'game' : r.kind) : icon('lock')), h('div', { class: 'reward-rank' }, 'Rank ' + r.level), h('div', { class: 'reward-name' }, name));
    })));
    const ACC = [['copper', 'Copper', 1]].concat(SA.REWARDS.filter((r) => r.kind === 'accent').map((r) => [r.id, r.label.replace(' colour theme', ''), r.level]));
    const sw = h('div', { class: 'swatches', role: 'group', 'aria-label': 'Colour theme' });
    ACC.forEach(([id, name, lvl]) => {
      const open = rk.level >= lvl, cur = (st.settings.accent || 'copper') === id;
      const b = h('button', { type: 'button', class: 'swatch acc-' + id + (cur ? ' sel' : '') + (open ? '' : ' locked'), title: open ? name : name + ': unlocks at rank ' + lvl, 'aria-pressed': String(cur), disabled: open ? null : true }, open ? '' : String(lvl));
      b.addEventListener('click', () => { S().settings.accent = id; SA.app.save(); SA.app.applyAccent(); SA.app.reload(); });
      sw.appendChild(b);
    });
    rootEl.appendChild(h('div', { class: 'setting' }, h('span', { class: 'setting-k' }, 'Colour theme'), sw));

    // achievements shelf: lit when earned, the description is the tooltip
    const A = st.ach || {};
    rootEl.appendChild(h('h2', null, 'Achievements ', h('span', { class: 'muted small' }, SA.ACH.filter((a) => A[a.id]).length + ' of ' + SA.ACH.length)));
    rootEl.appendChild(h('div', { class: 'trophies', role: 'list' }, SA.ACH.map((a) => h('div', { class: 'trophy' + (A[a.id] ? ' got' : ''), role: 'listitem', title: a.desc + (A[a.id] ? '' : ' (not yet)') }, icon(a.icon), h('span', null, a.name)))));

    const bd = SA.app.badges();
    if (bd.length) { rootEl.appendChild(h('h2', null, 'Badges')); rootEl.appendChild(h('div', { class: 'badge-wrap' }, bd.map((b) => h('span', { class: 'badge' }, b.label)))); }

    const tip = 'Your progress is saved in this browser only. Copy this code to carry it to another browser or device, and paste it there under Load. Older long passwords still work.';
    rootEl.appendChild(h('h2', null, 'Progress code ', h('span', { class: 'info', title: tip, tabindex: '0', 'aria-label': tip }, 'ⓘ')));
    const pwOut = h('pre', { class: 'pw', hidden: true, tabindex: '0' }), showBtn = h('button', { type: 'button', class: 'btn' }, 'Show'), copyBtn = h('button', { type: 'button', class: 'btn', hidden: true }, 'Copy'), cmsg = h('span', { class: 'muted', 'aria-live': 'polite' });
    showBtn.addEventListener('click', () => {
      try { pwOut.textContent = SA.encodeCode(Object.assign({}, S(), { settings: Object.assign({}, S().settings, { theme: document.documentElement.getAttribute('data-theme') || undefined }) })); pwOut.hidden = false; copyBtn.hidden = false; showBtn.hidden = true; } catch (e) { cmsg.textContent = 'Could not create the code: ' + e.message; }
    });
    copyBtn.addEventListener('click', () => SA.render.copyText(pwOut.textContent, (ok) => { cmsg.textContent = ok ? 'Copied' : 'Copy failed. Select the text and copy it.'; }));
    rootEl.appendChild(h('div', { class: 'btn-row' }, showBtn, copyBtn, cmsg)); rootEl.appendChild(pwOut);
    const ta = h('textarea', { rows: '3', class: 'pw-in', placeholder: 'Paste a progress code to load it', 'aria-label': 'Progress code to load', spellcheck: 'false' }), err = h('p', { class: 'badtxt', role: 'alert' }), loadBtn = h('button', { type: 'button', class: 'btn' }, 'Load');
    loadBtn.addEventListener('click', () => {
      err.textContent = '';
      let ns; try { ns = SA.decodePassword(ta.value); } catch (e) { err.textContent = e.message; return; }
      if (!root.confirm('Replace your current progress (' + S().xp + ' XP) with the progress in this code (' + ns.xp + ' XP)?')) return;
      if (ns.noSettings) ns.settings = Object.assign({}, S().settings); // codes made before settings were included
      else if (ns.settings.theme) { document.documentElement.setAttribute('data-theme', ns.settings.theme); try { localStorage.setItem('sa-theme', ns.settings.theme); } catch (e) { /* ignore */ } }
      delete ns.settings.theme; ns.settings.toured = 1; SA.app.state = ns; if (SA.app.applyAccent) SA.app.applyAccent(); SA.app.save(); SA.app.refreshHeader(); SA.app.reload();
    });
    rootEl.appendChild(ta); rootEl.appendChild(h('div', { class: 'btn-row' }, loadBtn)); rootEl.appendChild(err);

    rootEl.appendChild(h('h2', null, 'Settings'));
    const fbSeg = h('div', { class: 'seg-group', role: 'group', 'aria-label': 'Practice answers' });
    [['each', 'After each question'], ['end', 'At the end']].forEach(([v, t]) => fbSeg.appendChild(h('button', { type: 'button', class: 'seg-btn' + (st.settings.feedback === v ? ' sel' : ''), 'aria-pressed': String(st.settings.feedback === v), onclick: () => { S().settings.feedback = v; SA.app.save(); SA.app.reload(); } }, t)));
    rootEl.appendChild(h('div', { class: 'setting' }, h('span', { class: 'setting-k', title: 'Unit tests and checkpoints always show results at the end.' }, 'Practice answers'), fbSeg));
    const calSeg = h('div', { class: 'seg-group', role: 'group', 'aria-label': 'Calculator' }), calNow = st.settings.calc || 'auto';
    [['auto', 'Opens by itself'], ['button', 'From its button'], ['off', 'Off']].forEach(([v, t]) => calSeg.appendChild(h('button', { type: 'button', class: 'seg-btn' + (calNow === v ? ' sel' : ''), 'aria-pressed': String(calNow === v), onclick: () => { S().settings.calc = v; SA.app.save(); if (SA.calc) SA.calc.sync(); SA.app.reload(); } }, t)));
    rootEl.appendChild(h('div', { class: 'setting' }, h('span', { class: 'setting-k', title: 'A calculator for numeric answers. It can open by itself when you reach a number field, wait for its button, or stay hidden.' }, 'Calculator'), calSeg));
    const dgSeg = h('div', { class: 'seg-group', role: 'group', 'aria-label': 'Daily goal' });
    const goal = st.settings.dailyGoal || 10, preset = [5, 10, 20].includes(goal);
    const setGoal = (n) => { const ev = SA.setDailyGoal(S(), n); if (!ev) return false; SA.app.save(); if (ev.length) SA.app.announce(ev); SA.app.reload(); return true; };
    [5, 10, 20].forEach((n) => dgSeg.appendChild(h('button', { type: 'button', class: 'seg-btn' + (goal === n ? ' sel' : ''), 'aria-pressed': String(goal === n), onclick: () => setGoal(n) }, n + ' a day')));
    // custom goal: a number box that appears when Custom is picked (or is already in use)
    const cIn = h('input', { type: 'number', min: String(SA.GOAL_MIN), max: String(SA.GOAL_MAX), step: '1', class: 'goal-in', value: preset ? '' : String(goal), 'aria-label': 'Custom daily goal, correct answers a day' });
    const cErr = h('span', { class: 'badtxt small', role: 'alert' });
    const cBox = h('span', { class: 'goal-custom', hidden: preset ? true : null }, cIn, ' a day ', h('button', { type: 'button', class: 'btn', onclick: () => { if (!setGoal(cIn.value)) cErr.textContent = 'Enter a whole number from ' + SA.GOAL_MIN + ' to ' + SA.GOAL_MAX + '.'; } }, 'Set'), ' ', cErr);
    cIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); cBox.querySelector('button').click(); } });
    dgSeg.appendChild(h('button', { type: 'button', class: 'seg-btn' + (preset ? '' : ' sel'), 'aria-pressed': String(!preset), onclick: () => { cBox.hidden = false; cIn.focus(); } }, preset ? 'Custom' : 'Custom (' + goal + ')'));
    rootEl.appendChild(h('div', { class: 'setting' }, h('span', { class: 'setting-k', title: 'Correct answers a day. Meeting it earns 25 XP.' }, 'Daily goal'), dgSeg, cBox));
    const sb = h('input', { type: 'checkbox', id: 'sandbox' }); sb.checked = !!st.settings.sandbox;
    sb.addEventListener('change', () => { S().settings.sandbox = sb.checked; SA.app.save(); SA.app.refreshHeader(); });
    rootEl.appendChild(h('div', { class: 'setting' }, h('label', { class: 'check', for: 'sandbox' }, sb, ' Unlock everything')));
    const rst = h('button', { type: 'button', class: 'btn danger' }, 'Reset progress');
    rst.addEventListener('click', () => { if (!root.confirm('Erase all progress in this browser? This cannot be undone unless you saved your progress code.')) return; SA.store.clear(); SA.app.state = SA.newState(); SA.app.save(); SA.app.refreshHeader(); SA.app.reload(); });
    rootEl.appendChild(h('div', { class: 'btn-row' }, btnLink('#/placement', st.settings.placed ? 'Retake the placement quiz' : 'Take the placement quiz'), h('button', { type: 'button', class: 'btn', onclick: () => SA.tour && SA.tour.start() }, 'Replay the tour'), rst));
  };

  /* ---------- refresher (spaced review of Proficient units) ---------- */
  V.review = function (rootEl) {
    const due = SA.dueUnits(S());
    if (!due.length) return panel(rootEl, 'Nothing due', [h('p', null, 'Every unit you know is fresh. New reviews appear as days pass.'), btnLink('#/', 'Skill tree', 'primary')]);
    clear(rootEl); rootEl.appendChild(h('p', { class: 'muted' }, 'Loading…'));
    const here = stillHere(); prepareItems(SA.composeReview(S(), Date.now(), 8)).then((items) => { if (!here()) return;
      runSession(rootEl, {
        crumb: crumb('#/', 'Skill tree'), title: 'Refresher', items, hints: false, retry: false, deferred: S().settings.feedback === 'end',
        finish(results, rootEl2) {
          const before = S().xp, out = SA.applyReviewSet(S(), results.map((r) => ({ unitId: r.unitId, correct: r.correct }))); SA.app.save(); SA.app.announce(out.events);
          const left = SA.dueUnits(S()).length;
          summary(rootEl2, { score: out.score, events: out.events, xp: S().xp - before, headline: left ? left + ' still due' : 'Queue cleared',
            actions: [left ? h('button', { type: 'button', class: 'btn primary', onclick: () => SA.app.reload() }, 'Next batch') : null, btnLink('#/', 'Skill tree', left ? '' : 'primary')] });
        },
      });
    }).catch((e) => panel(rootEl, 'Could not start the refresher', [h('p', null, String(e.message || e))]));
  };

  /* ---------- desk: blitz games unlocked by rank ---------- */
  const gameOpen = (st, key) => st.settings.sandbox || SA.hasReward(st, 'game', key);
  V.desk = function (rootEl) {
    const st = S(), rk = SA.rankOf(st.xp).level;
    page(rootEl, 'Desk');
    rootEl.appendChild(h('div', { class: 'desk-grid' }, SA.REWARDS.filter((r) => r.kind === 'game' && SA.blitz && SA.blitz.games[r.id]).map((r) => {
      const g = SA.blitz && SA.blitz.games[r.id], open = gameOpen(st, r.id) && g, best = st.games[r.id];
      const card = h(open ? 'a' : 'div', { class: 'game-card' + (open ? '' : ' locked'), href: open ? '#/play/' + r.id : null, title: open ? null : (g ? 'Unlocks at rank ' + r.level : 'Coming soon') },
        h('div', { class: 'game-ic' }, icon(open ? (g.icon || 'game') : 'lock')),
        h('div', { class: 'game-name' }, r.label.split(': ')[1]),
        h('div', { class: 'game-blurb' }, g ? g.blurb : 'Coming soon'),
        h('div', { class: 'game-foot' }, open ? (best ? 'Best ' + best : 'Not played') : (g ? 'Rank ' + r.level + (rk < r.level ? ' (you: ' + rk + ')' : '') : '')));
      return card;
    })));
  };
  V.play = function (rootEl, key) {
    const g = SA.blitz && SA.blitz.games[key];
    if (!g) return notFound(rootEl, 'No such game');
    if (!gameOpen(S(), key)) { const r = SA.REWARDS.find((x) => x.id === key); return panel(rootEl, 'Locked', [h('p', null, g.name + ' unlocks at rank ' + r.level + '.'), btnLink('#/desk', 'Desk', 'primary')]); }
    clear(rootEl);
    rootEl.appendChild(crumb('#/desk', 'Desk'));
    rootEl.appendChild(h('header', { class: 'page-head' }, h('h1', null, g.name)));
    const host = h('div', { class: 'bz-host' }); let handle = null;
    const intro = () => {
      clear(host); const best = S().games[key];
      const go = h('button', { type: 'button', class: 'btn primary bz-go' }, 'Start');
      host.appendChild(h('div', { class: 'bz-intro' }, h('p', { class: 'lead' }, g.blurb), h('p', { class: 'muted' }, '60-second clock. Right answer +2 s, wrong −3 s. Keys 1 to 4.'), best ? h('p', null, 'Your best: ', h('strong', null, String(best))) : null, go));
      go.addEventListener('click', start); go.focus();
    };
    const start = () => {
      handle = SA.blitz.mount(host, key, (res) => {
        const prev = S().games[key] || 0, out = SA.applyBlitz(S(), key, res.score, res.right); SA.app.save(); SA.app.announce(out.events, host);
        clear(host);
        const again = h('button', { type: 'button', class: 'btn primary' }, 'Play again'); again.addEventListener('click', start);
        host.appendChild(h('div', { class: 'bz-result' }, h('div', { class: 'big-score pass' }, String(res.score)),
          h('p', { class: 'lead' }, res.score > prev ? (prev ? 'New personal best' : 'First score on the board') : 'Best: ' + prev),
          h('p', { class: 'muted' }, res.right + ' right, ' + res.wrong + ' wrong'),
          h('div', { class: 'btn-row' }, again, btnLink('#/desk', 'Desk'))));
        again.focus();
      });
    };
    SA.app.onLeave(() => { if (handle) handle.stop(); });
    rootEl.appendChild(host); intro();
  };

  SA.views = V;
  SA.views.icon = icon;
  SA.views.runExercise = runExercise;
})(typeof globalThis !== 'undefined' ? globalThis : this);
