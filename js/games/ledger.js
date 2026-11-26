/* Securities Academy - minigame "Ledger": post a seeded stream of events as balanced journal entries.
   Classic script. The generator (SA.ledger.generate) is DOM-free so tools/smoke-ledger.js can run it in Node.
   Extend by adding rows to SA.ledger.GENERATORS: {id, minLevel, weight, can(state, level), make(rng, state, level)}.
   make() mutates the state (cash, capital, pos) in integer cents and returns {text, lines, facts} or null. */
(function (root) {
  'use strict';
  const SA = root.SA || (root.SA = {});
  const A = { cash: '1000 Cash at bank', sec: '1100 Securities at cost', pay: '2000 Client payable', cap: '3000 Capital', int: '4000 Interest income', div: '4100 Dividend income', gain: '4200 Realised gains', fee: '5000 Fees expense', wht: '5100 Withholding tax' };
  const ACCOUNTS = [A.cash, A.sec, A.pay, A.cap, A.int, A.div, A.gain, A.fee, A.wht];
  const TICKERS = { SAP: { px: [118, 182], dps: [1.2, 2.4] }, ENI: { px: [12, 16], dps: [0.2, 0.45] }, UCG: { px: [28, 46], dps: [0.6, 1.8] } };
  const eur = (c) => c / 100;
  const E = (c) => SA.fmt.num(eur(c), 2);
  const line = (account, c, side) => ({ account, dr: side === 'Dr' ? eur(c) : 0, cr: side === 'Cr' ? eur(c) : 0 });
  const dedupe = (ls) => ls.filter((l) => l.dr || l.cr);
  const held = (s) => Object.keys(s.pos).filter((t) => s.pos[t].sh > 0);

  /* ---------- event generators table (money in integer cents) ---------- */
  const GENERATORS = [
    { id: 'deposit', minLevel: 1, weight: 2, can: () => true, make(r, s) {
      const c = r.int(20, 100) * 10000; s.cash += c; s.capital += c;
      return { text: 'The client deposits EUR ' + E(c) + ' into the account.', lines: [line(A.cash, c, 'Dr'), line(A.cap, c, 'Cr')], facts: { cash: c, sec: 0, cap: c, pnl: 0 } }; } },
    { id: 'buy', minLevel: 1, weight: 5, can: (s) => s.cash >= 200000, make(r, s) {
      const t = r.pick(Object.keys(TICKERS)), d = TICKERS[t], px = Math.round(r.float(d.px[0], d.px[1], 0.05) * 100);
      const maxQ = Math.floor((s.cash * 0.7) / px / 10); if (maxQ < 1) return null;
      const q = r.int(1, Math.min(maxQ, 60)) * 10, gross = q * px, fee = Math.max(990, Math.round(gross * 0.001)), cost = gross + fee;
      const p = s.pos[t] || (s.pos[t] = { sh: 0, cost: 0 }); p.sh += q; p.cost += cost; s.cash -= cost;
      return { text: 'Buy ' + q + ' ' + t + ' at EUR ' + E(px) + ' (gross EUR ' + E(gross) + '), commission EUR ' + E(fee) + ' (add it to cost).', lines: [line(A.sec, cost, 'Dr'), line(A.cash, cost, 'Cr')], facts: { cash: -cost, sec: cost, cap: 0, pnl: 0 } }; } },
    { id: 'sell', minLevel: 1, weight: 4, can: (s) => held(s).length > 0, make(r, s, L) {
      const t = r.pick(held(s)), p = s.pos[t];
      const partial = L >= 2 && p.sh >= 20 && r.bool(0.6), q = partial ? Math.max(1, Math.floor(p.sh * r.pick([0.25, 0.4, 0.5]))) : p.sh;
      const px = Math.max(100, Math.round((p.cost / p.sh) * r.float(0.88, 1.2, 0.01))), gross = q * px, fee = Math.max(990, Math.round(gross * 0.001)), net = gross - fee;
      const rel = q === p.sh ? p.cost : Math.round(p.cost * q / p.sh), gain = net - rel, avg = p.cost / p.sh;
      p.sh -= q; p.cost -= rel; s.cash += net; if (p.sh === 0) p.cost = 0;
      const ls = [line(A.cash, net, 'Dr'), line(A.sec, rel, 'Cr')]; if (gain > 0) ls.push(line(A.gain, gain, 'Cr')); else if (gain < 0) ls.push(line(A.gain, -gain, 'Dr'));
      return { text: 'Sell ' + q + ' ' + t + ' at EUR ' + E(px) + ' (gross EUR ' + E(gross) + '), commission EUR ' + E(fee) + ' (deducted from proceeds). Average cost per share before the sale: EUR ' + SA.fmt.num(eur(avg), 4) + '; cost of the shares sold: EUR ' + E(rel) + '.', lines: dedupe(ls), facts: { cash: net, sec: -rel, cap: 0, pnl: gain } }; } },
    { id: 'dividend', minLevel: 1, weight: 2, can: (s) => held(s).length > 0, make(r, s, L) {
      const t = r.pick(held(s)), d = TICKERS[t], q = s.pos[t].sh, dps = r.float(d.dps[0], d.dps[1], 0.05), gross = Math.round(q * dps * 100);
      const rate = L >= 2 ? r.pick([0.15, 0.25]) : 0, tax = Math.round(gross * rate), net = gross - tax; s.cash += net;
      const txt = 'Dividend on ' + q + ' ' + t + ' at EUR ' + SA.fmt.num(dps, 2) + ' per share: gross EUR ' + E(gross) + (tax ? '; ' + SA.fmt.num(rate * 100, 0) + '% withholding tax (EUR ' + E(tax) + ') is deducted at source, so the cash received is net.' : ', received in full.');
      return { text: txt, lines: dedupe([line(A.cash, net, 'Dr'), line(A.wht, tax, 'Dr'), line(A.div, gross, 'Cr')]), facts: { cash: net, sec: 0, cap: 0, pnl: gross - tax } }; } },
    { id: 'custody', minLevel: 1, weight: 2, can: (s) => s.cash > 100000, make(r, s) {
      const c = r.int(12, 60) * 100 + r.pick([0, 50]); s.cash -= c;
      return { text: 'The custodian charges a custody fee of EUR ' + E(c) + ', debited from cash.', lines: [line(A.fee, c, 'Dr'), line(A.cash, c, 'Cr')], facts: { cash: -c, sec: 0, cap: 0, pnl: -c } }; } },
    { id: 'withdraw', minLevel: 1, weight: 1, can: (s) => s.cash >= 300000, make(r, s) {
      const c = Math.floor(s.cash * r.pick([0.1, 0.2, 0.3]) / 100000) * 100000; if (c < 100000) return null; s.cash -= c; s.capital -= c;
      return { text: 'The client withdraws EUR ' + E(c) + ' to their own bank.', lines: [line(A.cap, c, 'Dr'), line(A.cash, c, 'Cr')], facts: { cash: -c, sec: 0, cap: -c, pnl: 0 } }; } },
  ];

  /* ---------- generate(seed, level) -> {events, final} ---------- */
  function generate(seed, level) {
    level = level || 1;
    const r = SA.rng('ledger/' + seed + '/' + level), s = { cash: 0, capital: 0, pos: {} }, events = [];
    const n = r.int(8, 10), elig = (g) => g.minLevel <= level && g.can(s, level), byId = (id) => GENERATORS.find((g) => g.id === id);
    const push = (g) => { const e = g.make(r, s, level); if (!e) return false; e.type = g.id; e.n = events.length + 1; e.accounts = Array.from(new Set(e.lines.map((l) => l.account))); events.push(e); return true; };
    { const c = r.int(30, 80) * 100000; s.cash += c; s.capital += c;
      events.push({ type: 'deposit', n: 1, text: 'The client deposits EUR ' + E(c) + ' to open the account.', lines: [line(A.cash, c, 'Dr'), line(A.cap, c, 'Cr')], accounts: [A.cash, A.cap], facts: { cash: c, sec: 0, cap: c, pnl: 0 } }); }
    push(byId('buy'));
    while (events.length < n) {
      const left = n - events.length, hasSell = events.some((e) => e.type === 'sell'), hasDiv = events.some((e) => e.type === 'dividend');
      let g;
      if (!hasSell && left <= 2 && elig(byId('sell'))) g = byId('sell');
      else if (!hasDiv && left <= 3 && elig(byId('dividend'))) g = byId('dividend');
      else { const pool = GENERATORS.filter(elig), tot = pool.reduce((a, x) => a + x.weight, 0); let k = r.next() * tot; g = pool.find((x) => (k -= x.weight) < 0) || pool[0]; }
      if (!push(g)) push(byId('custody'));
    }
    return { events, final: s };
  }

  /* independent recomputation from per-event facts (not from the journal lines) */
  function recompute(events) {
    const t = { cash: 0, sec: 0, cap: 0, pnl: 0 };
    for (const e of events) { t.cash += e.facts.cash; t.sec += e.facts.sec; t.cap += e.facts.cap; t.pnl += e.facts.pnl; }
    return t;
  }
  const cents = (x) => Math.round(x * 100);
  function trialBalance(entries) {   // array of line arrays -> {account: net cents (dr - cr)}
    const tb = {}; for (const ls of entries) for (const l of ls) tb[l.account] = (tb[l.account] || 0) + cents(l.dr || 0) - cents(l.cr || 0);
    return tb;
  }
  SA.ledger = { ACCOUNTS, A, GENERATORS, generate, recompute, trialBalance, cents };

  /* ---------- UI ---------- */
  let mounts = 0;
  function h(tag, attrs) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) { const v = attrs[k]; if (v == null || v === false) continue; if (k === 'class') el.className = v; else if (k === 'text') el.textContent = v; else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v); else el.setAttribute(k, v === true ? '' : v); }
    for (let i = 2; i < arguments.length; i++) { const c = arguments[i]; if (c == null) continue; if (Array.isArray(c)) c.forEach((x) => x && el.appendChild(x)); else el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); }
    return el;
  }
  const bestOf = () => { try { return (SA.app && SA.app.state && SA.app.state.games && SA.app.state.games.ledger) || 0; } catch (e) { return 0; } };

  SA.minigame('ledger', {
    title: 'Ledger',
    mount(el, opts, done) {
      opts = opts || {};
      const level = Math.max(1, parseInt(opts.level, 10) || 1);
      mounts++;
      const seed = opts.seed != null ? opts.seed : SA.hash('ledger/' + (SA.today ? SA.today() : 0) + '/' + mounts + '/' + bestOf());
      el.textContent = '';
      const root = h('div', { class: 'game-ledger' }); el.appendChild(root);
      const events = generate(seed, level).events;
      let idx = 0, score = 0, tries = 0, hinted = false, lines = [], timer = null, secs = 0, timed = false;
      const posted = [];
      const stage = h('div', { class: 'gl-stage' }), side = h('div', { class: 'gl-side' });
      root.appendChild(h('div', { class: 'gl-layout' }, stage, side));

      function renderSide() {
        side.textContent = '';
        const tb = trialBalance(posted), accts = ACCOUNTS.filter((a) => tb[a] != null);
        let dr = 0, cr = 0;
        const body = accts.map((a) => { const v = tb[a]; if (v > 0) dr += v; else cr -= v; return h('tr', null, h('th', { scope: 'row', text: a }), h('td', { class: 'num', text: v > 0 ? SA.fmt.num(eur(v)) : '' }), h('td', { class: 'num', text: v < 0 ? SA.fmt.num(eur(-v)) : '' })); });
        side.appendChild(h('section', { class: 'panel', 'aria-label': 'Trial balance' }, h('h3', { text: 'Trial balance' }),
          h('table', { class: 'gl-tb' }, h('thead', null, h('tr', null, h('th', { scope: 'col', text: 'Account' }), h('th', { scope: 'col', class: 'num', text: 'Debit' }), h('th', { scope: 'col', class: 'num', text: 'Credit' }))),
            h('tbody', null, body.length ? body : h('tr', null, h('td', { colspan: 3, class: 'muted', text: 'Nothing posted yet.' }))),
            h('tfoot', null, h('tr', null, h('th', { scope: 'row', text: 'Total' }), h('td', { class: 'num', text: SA.fmt.num(eur(dr)) }), h('td', { class: 'num', text: SA.fmt.num(eur(cr)) }))))));
        const det = h('details', { class: 'panel gl-t' }, h('summary', { text: 'T-accounts' }));
        const wrap = h('div', { class: 'gl-tgrid' });
        ACCOUNTS.forEach((a) => {
          const d = [], c = []; posted.forEach((ls) => ls.forEach((l) => { if (l.account !== a) return; if (l.dr) d.push(SA.fmt.num(l.dr)); if (l.cr) c.push(SA.fmt.num(l.cr)); }));
          if (!d.length && !c.length) return;
          wrap.appendChild(h('div', { class: 'gl-tacc' }, h('div', { class: 'gl-tname', text: a }), h('div', { class: 'gl-tcols' }, h('ul', null, d.map((x) => h('li', { text: x }))), h('ul', null, c.map((x) => h('li', { text: x }))))));
        });
        if (!posted.length) wrap.appendChild(h('p', { class: 'muted', text: 'Posted entries appear here (debits left, credits right).' }));
        det.appendChild(wrap); if (posted.length) det.open = true; side.appendChild(det);
      }

      function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
      function startTimer() {
        stopTimer(); if (!timed || idx >= events.length) return; secs = 90;
        timer = setInterval(() => { secs--; const t = root.querySelector('.gl-time'); if (t) t.textContent = secs + ' s'; if (secs <= 0) reveal('Time is up: the answer is posted for 0 points.'); }, 1000);
      }
      function newEntry() { lines = [{ account: '', side: 'Dr', amount: '' }, { account: '', side: 'Cr', amount: '' }]; tries = 0; hinted = false; }
      function totals() { let dr = 0, cr = 0; lines.forEach((l) => { const v = SA.parseNum(l.amount); if (isFinite(v)) { if (l.side === 'Dr') dr += v; else cr += v; } }); return { dr, cr }; }

      function renderStage(msg, kind, focus) {
        stage.textContent = '';
        if (idx >= events.length) return renderEnd(msg);
        const e = events[idx];
        const rowsEl = h('div', { class: 'gl-lines', role: 'group', 'aria-label': 'Journal lines' });
        const tot = h('div', { class: 'gl-tot', 'aria-live': 'polite' });
        const upd = () => { const t = totals(), ok = Math.abs(t.dr - t.cr) < 0.005 && t.dr > 0; tot.className = 'gl-tot' + (ok ? ' ok' : ''); tot.textContent = 'Debits ' + SA.fmt.num(t.dr) + ' | Credits ' + SA.fmt.num(t.cr) + (ok ? ' | balanced' : (t.dr || t.cr) ? ' | difference ' + SA.fmt.num(Math.abs(t.dr - t.cr)) : ''); };
        lines.forEach((l, i) => {
          const sel = h('select', { 'aria-label': 'Account, line ' + (i + 1), onchange: (ev) => { l.account = ev.target.value; } }, h('option', { value: '', text: 'Account...' }), ACCOUNTS.map((a) => h('option', { value: a, text: a })));
          sel.value = l.account;
          const sd = h('select', { 'aria-label': 'Debit or credit, line ' + (i + 1), onchange: (ev) => { l.side = ev.target.value; upd(); } }, h('option', { value: 'Dr', text: 'Dr' }), h('option', { value: 'Cr', text: 'Cr' }));
          sd.value = l.side;
          const am = h('input', { type: 'text', inputmode: 'decimal', autocomplete: 'off', class: 'gl-amt', 'data-calc': '1', 'aria-label': 'Amount in EUR, line ' + (i + 1), placeholder: '0.00', value: l.amount, oninput: (ev) => { l.amount = ev.target.value; upd(); }, onkeydown: (ev) => { if (ev.key === 'Enter') { ev.preventDefault(); check(); } } });
          const rm = h('button', { type: 'button', class: 'btn small ghost', 'aria-label': 'Remove line ' + (i + 1), disabled: lines.length <= 2, onclick: () => { lines.splice(i, 1); renderStage(); } }, '×');
          rowsEl.appendChild(h('div', { class: 'gl-row' }, sel, sd, am, rm));
        });
        upd();
        const fb = h('div', { class: 'feedback ' + (kind || ''), role: 'status', hidden: !msg }, msg || '');
        const actions = h('div', { class: 'btn-row' },
          h('button', { type: 'button', class: 'btn primary', onclick: check }, tries ? 'Check again' : 'Check'),
          h('button', { type: 'button', class: 'btn', onclick: () => { lines.push({ account: '', side: 'Dr', amount: '' }); renderStage(); } }, 'Add line'),
          h('button', { type: 'button', class: 'btn', onclick: hint }, level === 1 ? 'Hint (free)' : 'Hint (costs 50)'),
          h('button', { type: 'button', class: 'btn ghost', onclick: () => reveal('Answer posted for 0 points.') }, 'Show answer'));
        stage.appendChild(h('section', { class: 'panel', 'aria-label': 'Current event' },
          h('div', { class: 'gl-head' }, h('span', { class: 'tag', text: 'Event ' + e.n + ' of ' + events.length }), h('span', { class: 'muted', text: 'Score ' + score }), timed ? h('span', { class: 'gl-time muted', text: secs + ' s' }) : null),
          h('p', { class: 'gl-ev', tabindex: '-1', text: e.text }), rowsEl, tot, actions, fb));
        if (focus) { const f = stage.querySelector(focus === 'ev' ? '.gl-ev' : '.gl-row select'); f && f.focus(); }
      }

      function hint() { hinted = true; renderStage('Accounts involved: ' + events[idx].accounts.join('; ') + '. Which side does each one move?', 'good'); }
      function post(e, pts, msg) {
        stopTimer(); posted.push(e.lines); score += pts; idx++;
        renderSide();
        if (idx < events.length) { newEntry(); renderStage(msg, 'good', 'ev'); startTimer(); } else renderEnd(msg);
      }
      function check() {
        const e = events[idx], r = SA.templates.journal.grade({ lines: e.lines, accounts: ACCOUNTS }, lines.map((l) => ({ account: l.account, side: l.side, amount: l.amount })));
        if (r.correct) { const pts = (!tries && !(hinted && level > 1)) ? 100 : 50; return post(e, pts, 'Correct, posted (+' + pts + ').'); }
        tries++;
        if (tries >= 2) return reveal('Still not right (' + (r.detail || 'wrong') + '). The correct entry is posted for 0 points.');
        renderStage('Not quite: ' + (r.detail || 'wrong') + '. You have one retry.', 'bad', 'sel');
      }
      function reveal(msg) { post(events[idx], 0, msg); }

      function renderEnd(msg) {
        stopTimer(); stage.textContent = ''; root.querySelectorAll('.gl-opts').forEach((o) => { o.hidden = true; }); // no timer after the last event
        const tb = trialBalance(posted), rc = recompute(events);
        let dr = 0, cr = 0; Object.keys(tb).forEach((a) => { if (tb[a] > 0) dr += tb[a]; else cr -= tb[a]; });
        const pnl = -((tb[A.int] || 0) + (tb[A.div] || 0) + (tb[A.gain] || 0) + (tb[A.fee] || 0) + (tb[A.wht] || 0));
        const agree = dr === cr && (tb[A.cash] || 0) === rc.cash && (tb[A.sec] || 0) === rc.sec && -(tb[A.cap] || 0) === rc.cap && pnl === rc.pnl;
        const bonus = agree ? 200 : 0, total = score + bonus, best = Math.max(bestOf(), total);
        stage.appendChild(h('section', { class: 'panel gl-end', 'aria-label': 'Results' }, h('h3', { text: 'Books closed' }),
          msg ? h('p', { class: 'muted', text: msg }) : null,
          h('p', null, 'Entries: ' + score + '. Balanced books bonus: ' + bonus + (agree ? ' (the trial balance agrees with an independent recomputation: cash EUR ' + SA.fmt.num(eur(rc.cash)) + ', securities at cost EUR ' + SA.fmt.num(eur(rc.sec)) + ').' : ' (no agreement).')),
          h('p', { class: 'gl-big', text: 'Score ' + total }), h('p', { class: 'muted', text: 'Best: ' + best }),
          h('div', { class: 'btn-row' }, h('button', { type: 'button', class: 'btn primary', onclick: () => { if (done) done(total); } }, 'Finish and record score'),
            h('button', { type: 'button', class: 'btn', onclick: () => SA.minigames.ledger.mount(el, Object.assign({}, opts, { seed: undefined }), done) }, 'Play again'))));
        const b = stage.querySelector('.btn.primary'); if (b) b.focus();
      }

      renderSide();
      if (level >= 2) {
        const id = 'gl-timer-' + mounts;
        root.insertBefore(h('div', { class: 'gl-opts' }, h('input', { type: 'checkbox', id, onchange: (ev) => { timed = ev.target.checked; if (timed) startTimer(); else stopTimer(); renderStage(); } }), h('label', { for: id, text: ' Optional timer: 90 s per event' })), root.firstChild);
      }
      newEntry(); renderStage(null, null, null);
    },
  });
  if (typeof module !== 'undefined' && module.exports) module.exports = SA.ledger;
})(typeof globalThis !== 'undefined' ? globalThis : this);
