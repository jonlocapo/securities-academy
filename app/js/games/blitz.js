/* Securities Academy - blitz desk games: short timed rounds of quick decisions, like blitz chess.
   One shared clock (60 s). A right answer adds 2 s, a wrong one costs 3 s. Score per right answer = 10 + speed bonus,
   times a combo multiplier that grows every 5 right answers in a row. Keys 1-4 answer.

   Game contract (one file per game, registered with SA.blitz.register):
     { key: 'bz_ledger', name, blurb: 'one line', icon: 'book',
       item(r, f, k) -> { prompt: md (short), data?: [[label, value], ...], choices: [md, ...] (2-4, distinct), answer: idx } }
   r/f are the course RNG and formatters; k is the item number (0, 1, 2, ...) so games can ramp difficulty.
   item() must be pure and deterministic: only r and f, no Math.random / Date / DOM. */
(function (root) {
  'use strict';
  const SA = root.SA || (root.SA = {});
  const B = SA.blitz = { games: {}, CLOCK: 60, GAIN: 2, LOSS: 3 };
  B.register = function (def) { B.games[def.key] = def; };
  B.instance = function (key, seed, k) {
    const g = B.games[key], r = SA.rng('blitz/' + key + '/' + seed + '/' + k);
    const it = g.item(r, SA.fmt, k);
    // shuffle choices so the answer position varies (games list the right answer anywhere)
    const order = r.shuffle(it.choices.map((_, i) => i));
    return { prompt: it.prompt, data: it.data || null, choices: order.map((i) => it.choices[i]), answer: order.indexOf(it.answer) };
  };
  B.points = (secs, combo) => Math.round((10 + Math.max(0, Math.round((5 - secs) * 2))) * Math.min(3, 1 + Math.floor(combo / 5) * 0.5));

  /* mount a full round in `host`; onEnd({score, right, wrong, best}) */
  B.mount = function (host, key, onEnd) {
    const { h, clear, mdEl } = SA.render, g = B.games[key];
    const reduced = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seed = Date.now(), k = 0, clock = B.CLOCK, score = 0, combo = 0, right = 0, wrong = 0, cur = null, shownAt = 0, timer = 0, last = 0, over = false, locked = false;
    clear(host);
    const clockBar = h('div', { class: 'bz-clock' }, h('i')), clockTxt = h('span', { class: 'bz-time' }, '60'), scoreTxt = h('span', { class: 'bz-score' }, '0'), comboTxt = h('span', { class: 'bz-combo' });
    const stage = h('div', { class: 'bz-stage', 'aria-live': 'polite' });
    const pad = h('div', { class: 'bz-pad' });
    host.appendChild(h('div', { class: 'bz' }, h('div', { class: 'bz-top' }, clockTxt, clockBar, h('span', { class: 'bz-scorebox' }, scoreTxt, comboTxt)), stage, pad));
    function draw() {
      cur = B.instance(key, seed, k); k++;
      clear(stage); clear(pad);
      stage.appendChild(mdEl('div', 'bz-prompt', cur.prompt));
      if (cur.data) stage.appendChild(h('dl', { class: 'bz-data' }, cur.data.map(([a, b]) => [h('dt', null, a), mdEl('dd', '', String(b), true)])));
      cur.choices.forEach((c, i) => { const b = h('button', { type: 'button', class: 'bz-choice' }, h('kbd', null, String(i + 1)), mdEl('span', '', c, true)); b.addEventListener('click', () => answer(i, b)); pad.appendChild(b); });
      stage.classList.remove('in'); void stage.offsetWidth; if (!reduced) stage.classList.add('in');
      shownAt = performance.now(); locked = false;
    }
    function answer(i, btn) {
      if (over || locked || !cur) return; locked = true;
      const secs = (performance.now() - shownAt) / 1000, ok = i === cur.answer;
      const btns = pad.querySelectorAll('.bz-choice');
      if (ok) { right++; combo++; const p = B.points(secs, combo); score += p; clock += B.GAIN; float('+' + p, 'good'); }
      else { wrong++; combo = 0; clock = Math.max(0, clock - B.LOSS); float('−' + B.LOSS + ' s', 'bad'); if (btns[cur.answer]) btns[cur.answer].classList.add('right'); }
      (btn || btns[i]).classList.add(ok ? 'ok' : 'no');
      scoreTxt.textContent = String(score); comboTxt.textContent = combo >= 5 ? ' ×' + Math.min(3, 1 + Math.floor(combo / 5) * 0.5) : '';
      setTimeout(() => { if (!over) draw(); }, ok ? 160 : 650); // a wrong answer shows the right one briefly
    }
    function float(t, cls) { const f = h('span', { class: 'bz-float ' + cls }, t); stage.appendChild(f); setTimeout(() => f.remove(), 700); }
    function tick(now) {
      if (over) return;
      const dt = last ? (now - last) / 1000 : 0; last = now; clock = Math.max(0, clock - dt);
      clockTxt.textContent = String(Math.ceil(clock)); clockBar.firstChild.style.width = Math.min(100, clock / B.CLOCK * 100) + '%';
      clockBar.classList.toggle('low', clock < 10);
      if (clock <= 0) return end();
      timer = requestAnimationFrame(tick);
    }
    function end() {
      over = true; cancelAnimationFrame(timer); document.removeEventListener('keydown', onKey);
      clear(pad); clear(stage);
      onEnd({ score, right, wrong });
    }
    function onKey(e) { if (/^[1-4]$/.test(e.key)) { const b = pad.querySelectorAll('.bz-choice')[+e.key - 1]; if (b) { e.preventDefault(); answer(+e.key - 1, b); } } }
    // 3-2-1 then go
    let n = 3; stage.appendChild(h('div', { class: 'bz-count' }, '3'));
    const cd = setInterval(() => { n--; if (n > 0) stage.firstChild.textContent = String(n); else { clearInterval(cd); document.addEventListener('keydown', onKey); draw(); timer = requestAnimationFrame(tick); } }, reduced ? 350 : 650);
    return { stop() { over = true; clearInterval(cd); cancelAnimationFrame(timer); document.removeEventListener('keydown', onKey); } };
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = B;
})(typeof globalThis !== 'undefined' ? globalThis : this);
