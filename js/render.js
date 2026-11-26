/* Securities Academy - exercise renderers (one per template).
   SA.renderers[template](container, inst, onChange, opts) builds the input UI and returns a handle:
     { get(): response in the shape SA.grade expects, lock(gradeResult): freeze + mark correct/incorrect }
   onChange(response) fires on every change (and once on mount). SA.render.isAnswered(inst, resp) says whether Check may be pressed. */
(function (root) {
  'use strict';
  const SA = root.SA || (root.SA = {});

  /* ---------- tiny DOM helpers ---------- */
  function add(e, k) {
    if (k == null || k === false) return;
    if (Array.isArray(k)) { k.forEach((x) => add(e, x)); return; }
    e.appendChild(typeof k === 'object' && k.nodeType ? k : document.createTextNode(String(k)));
  }
  function h(tag, props) {
    const e = document.createElement(tag);
    if (props) for (const k in props) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : String(v));
    }
    for (let i = 2; i < arguments.length; i++) add(e, arguments[i]);
    return e;
  }
  // THE way content reaches the screen: every course string (prompts, choices, labels, keys) goes through mdEl, so maths and
  // emphasis render the same everywhere. stripMd/plainTex are only for attributes (aria-label), which cannot hold markup.
  function mdEl(tag, cls, src, isInline) { const e = h(tag, { class: cls }); SA.md.into(e, src, isInline); return e; }
  // plain text for places that cannot hold rendered maths (aria-labels): TeX turned into a readable approximation
  const plainTex = (t) => { let x = t, prev;
    do { prev = x; x = x.replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)').replace(/\\sqrt\[([^\]]*)\]\{([^{}]*)\}/g, 'root $1 of ($2)').replace(/\\sqrt\{([^{}]*)\}/g, 'sqrt($1)'); } while (x !== prev);
    return x.replace(/\\(times|cdot)(?![a-zA-Z])/g, '×').replace(/\\div(?![a-zA-Z])/g, '÷').replace(/\\leq?(?![a-zA-Z])/g, '≤').replace(/\\geq?(?![a-zA-Z])/g, '≥').replace(/\\neq?(?![a-zA-Z])/g, '≠').replace(/\\approx/g, '≈').replace(/\\%/g, '%')
      .replace(/\\(left|right|,|;|!|quad|qquad)/g, ' ').replace(/\\text\{([^{}]*)\}/g, '$1').replace(/\\([a-zA-Z]+)/g, '$1').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim(); };
  const stripMd = (s) => String(s == null ? '' : s).replace(/\$([^$]*)\$/g, (m, t) => plainTex(t)).replace(/[*`]/g, '');

  /* a dropdown whose options can hold maths (a native <select> shows raw TeX). Button + listbox, keyboard as a select:
     arrows / Home / End move, Enter or Space picks, Escape or Tab closes. */
  let mselN = 0;
  function mathSelect(opts, label, placeholder, onPick) {
    const id = 'msel' + (++mselN), wrap = h('div', { class: 'msel' });
    const shown = h('span', { class: 'msel-val placeholder' }, placeholder);
    const btn = h('button', { type: 'button', class: 'msel-btn', 'aria-haspopup': 'listbox', 'aria-expanded': 'false', 'aria-label': label }, shown, h('span', { class: 'msel-caret', 'aria-hidden': 'true' }, '▾'));
    const list = h('ul', { class: 'msel-list', role: 'listbox', id: id + '-l', tabindex: '-1', 'aria-label': label, hidden: true });
    const items = opts.map((o, i) => { const li = mdEl('li', 'msel-opt', o.src, true); li.setAttribute('role', 'option'); li.setAttribute('id', id + '-' + i); li.setAttribute('aria-selected', 'false'); li.addEventListener('mousedown', (e) => e.preventDefault()); li.addEventListener('click', () => pick(i)); list.appendChild(li); return li; });
    let cur = -1, act = -1, open = false, dis = false;
    const setAct = (i) => { act = Math.max(0, Math.min(items.length - 1, i)); items.forEach((li, j) => li.classList.toggle('active', j === act)); list.setAttribute('aria-activedescendant', id + '-' + act); if (items[act].scrollIntoView) items[act].scrollIntoView({ block: 'nearest' }); };
    const outside = (e) => { if (!wrap.contains(e.target)) close(false); };
    function show() {
      if (dis || open) return; open = true; list.hidden = false; btn.setAttribute('aria-expanded', 'true');
      const r = btn.getBoundingClientRect ? btn.getBoundingClientRect() : null, vh = (typeof window !== 'undefined' && window.innerHeight) || 0;
      wrap.classList.toggle('up', !!(r && vh && r.bottom + 270 > vh && r.top > 270)); // not enough room below: open upwards
      setAct(cur < 0 ? 0 : cur); list.focus(); document.addEventListener('mousedown', outside, true);
    }
    function close(refocus) { if (!open) return; open = false; list.hidden = true; btn.setAttribute('aria-expanded', 'false'); document.removeEventListener('mousedown', outside, true); if (refocus) btn.focus(); }
    function pick(i) {
      cur = i; items.forEach((li, j) => li.setAttribute('aria-selected', j === i ? 'true' : 'false'));
      shown.textContent = ''; shown.classList.remove('placeholder'); SA.md.into(shown, opts[i].src, true);
      btn.setAttribute('aria-label', label + ': ' + stripMd(opts[i].src)); close(true); onPick(opts[i].value);
    }
    btn.addEventListener('click', () => (open ? close(true) : show()));
    btn.addEventListener('keydown', (e) => { if (['ArrowDown', 'ArrowUp', 'Enter', ' '].indexOf(e.key) >= 0) { e.preventDefault(); show(); } });
    list.addEventListener('keydown', (e) => {
      const k = e.key;
      if (k === 'ArrowDown') setAct(act + 1); else if (k === 'ArrowUp') setAct(act - 1); else if (k === 'Home') setAct(0); else if (k === 'End') setAct(items.length - 1);
      else if (k === 'Enter' || k === ' ') pick(act); else if (k === 'Escape') close(true); else if (k === 'Tab') { close(false); return; } else return;
      e.preventDefault(); e.stopPropagation();
    });
    wrap.appendChild(btn); wrap.appendChild(list);
    return { el: wrap, disable() { dis = true; close(false); btn.disabled = true; } };
  }
  const clear = (e) => { e.innerHTML = ''; return e; };
  const letter = (i) => String.fromCharCode(65 + i);
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const shuffled = (inst, tag, n) => SA.rng(tag + '/' + inst.seed).shuffle(range(n));
  function copyText(text, onDone) {
    const fallback = () => {
      const ta = h('textarea', { style: 'position:fixed;opacity:0;left:-999px' }); ta.value = text; document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e) { /* ignore */ }
      ta.remove(); onDone(ok);
    };
    try { if (root.navigator && navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(() => onDone(true), fallback); return; } } catch (e) { /* fall through */ }
    fallback();
  }
  const keyOf = (inst) => SA.answerKey(inst);
  const R = {};

  /* ---------- mcq ---------- */
  R.mcq = function (c, inst, onChange) {
    const perm = inst.fixedOrder ? range(inst.choices.length) : shuffled(inst, 'mcq', inst.choices.length);
    let sel = null, locked = false; const rows = [];
    const list = h('div', { class: 'choices', role: 'radiogroup' });
    function pick(orig) {
      if (locked) return; sel = orig;
      rows.forEach((r) => { const on = +r.getAttribute('data-orig') === orig; r.classList.toggle('sel', on); r.setAttribute('aria-checked', on ? 'true' : 'false'); });
      onChange(sel);
    }
    perm.forEach((orig, pos) => {
      const row = h('div', { class: 'choice', role: 'radio', 'aria-checked': 'false', tabindex: '0', 'data-orig': orig },
        h('span', { class: 'choice-key' }, letter(pos)), mdEl('div', 'choice-text', inst.choices[orig], true));
      row.addEventListener('click', () => pick(orig));
      row.addEventListener('keydown', (e) => {
        if (e.key === ' ') { e.preventDefault(); pick(orig); }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); const n = rows[(pos + 1) % rows.length]; n.focus(); pick(perm[(pos + 1) % rows.length]); }
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); const p2 = (pos + rows.length - 1) % rows.length; rows[p2].focus(); pick(perm[p2]); }
      });
      rows.push(row); list.appendChild(row);
    });
    c.appendChild(list);
    onChange(sel);
    return {
      get: () => sel,
      lock(res) {
        locked = true;
        rows.forEach((r) => { const o = +r.getAttribute('data-orig'); r.setAttribute('aria-disabled', 'true'); if (o === inst.answer) r.classList.add('ok'); else if (o === sel) r.classList.add('bad'); });
      },
    };
  };

  /* ---------- multi ---------- */
  R.multi = function (c, inst, onChange) {
    const perm = inst.fixedOrder ? range(inst.choices.length) : shuffled(inst, 'multi', inst.choices.length);
    const sel = new Set(); let locked = false; const rows = [];
    const list = h('div', { class: 'choices', role: 'group' });
    const get = () => Array.from(sel).sort((a, b) => a - b);
    function toggle(orig, row) {
      if (locked) return; if (sel.has(orig)) sel.delete(orig); else sel.add(orig);
      row.classList.toggle('sel', sel.has(orig)); row.setAttribute('aria-checked', sel.has(orig) ? 'true' : 'false'); onChange(get());
    }
    perm.forEach((orig, pos) => {
      const row = h('div', { class: 'choice multi', role: 'checkbox', 'aria-checked': 'false', tabindex: '0', 'data-orig': orig },
        h('span', { class: 'choice-key box' }, ''), mdEl('div', 'choice-text', inst.choices[orig], true));
      row.addEventListener('click', () => toggle(orig, row));
      row.addEventListener('keydown', (e) => { if (e.key === ' ') { e.preventDefault(); toggle(orig, row); } });
      rows.push(row); list.appendChild(row);
    });
    c.appendChild(h('p', { class: 'ex-note' }, 'Select all that apply.')); c.appendChild(list);
    onChange(get());
    return {
      get,
      lock() {
        locked = true;
        rows.forEach((r) => { const o = +r.getAttribute('data-orig'), should = inst.answers.indexOf(o) >= 0, did = sel.has(o); r.setAttribute('aria-disabled', 'true'); if (should && did) r.classList.add('ok'); else if (should && !did) r.classList.add('missed'); else if (did) r.classList.add('bad'); });
      },
    };
  };

  // how a number field asks for input: 'decimal' keyboard, or none on touch screens while the calculator types for it
  const numMode = () => (SA.calc && SA.calc.inputMode ? SA.calc.inputMode() : 'decimal');
  // what the calculator writes into a field: decimals to round to, relative tolerance, and % fields (value × 100)
  const calcAttrs = (dp, tol, pct) => ({ 'data-calc': '1', 'data-calc-dp': String(dp == null ? 2 : dp), 'data-calc-rel': tol && tol.rel ? String(tol.rel) : null, 'data-calc-pct': pct ? '1' : null });

  /* ---------- numeric ---------- */
  R.numeric = function (c, inst, onChange) {
    const input = h('input', Object.assign({ type: 'text', inputmode: numMode(), autocomplete: 'off', spellcheck: 'false', class: 'num-input', 'aria-label': 'Your answer' }, calcAttrs(inst.dp, inst.tol, /^\s*%\s*$/.test(inst.unit || ''))));
    input.addEventListener('input', () => onChange(input.value));
    const unit = inst.unit ? mdEl('span', 'unit', inst.unit, true) : null;
    c.appendChild(h('div', { class: 'num-row' }, input, unit));
    onChange('');
    return {
      get: () => input.value,
      lock(res) {
        input.disabled = true; input.classList.add(res.correct ? 'ok' : 'bad');
        if (!res.correct) c.appendChild(h('p', { class: 'key-line' }, 'Answer: ', mdEl('strong', null, keyOf(inst) + (inst.unit ? ' ' + inst.unit : ''), true)));
      },
    };
  };

  /* ---------- cloze ---------- */
  R.cloze = function (c, inst, onChange) {
    const n = inst.blanks.length, vals = Array(n).fill(''), chipOf = Array(n).fill(-1), slots = [], inputs = [];
    const bank = inst.bank && inst.bank.length ? inst.bank : null;
    const useBank = (k) => !!bank && !inst.blanks[k].numeric;
    let active = -1, locked = false;
    const p = h('p', { class: 'cloze-text' });
    const parts = inst.text.split(/\[\[(\d+)\]\]/);
    parts.forEach((part, idx) => {
      if (idx % 2 === 0) { if (part) p.appendChild(mdEl('span', 'cloze-seg', part, true)); return; }
      const k = +part;
      if (useBank(k)) {
        const b = h('button', { type: 'button', class: 'blank-slot', 'aria-label': 'Blank ' + (k + 1) }, '      ');
        b.addEventListener('click', () => { if (locked) return; if (vals[k]) { release(k); } else { active = k; refresh(); } });
        slots[k] = b; p.appendChild(b);
      } else {
        const nb = inst.blanks[k].numeric, after = parts[idx + 1] || '';
        const inp = h('input', Object.assign({ type: 'text', class: 'blank-input', autocomplete: 'off', spellcheck: 'false', inputmode: nb ? numMode() : null, 'aria-label': 'Blank ' + (k + 1) }, nb ? calcAttrs(nb.dp, nb.tol, /^\s*%(?!²)/.test(after)) : {}));
        inp.addEventListener('input', () => { vals[k] = inp.value; onChange(vals.slice()); });
        inputs[k] = inp; p.appendChild(inp);
      }
    });
    c.appendChild(p);
    const chips = [];
    if (bank) {
      const wrap = h('div', { class: 'bank', role: 'group', 'aria-label': 'Word bank' });
      bank.forEach((w, ci) => {
        const chip = h('button', { type: 'button', class: 'chip' }, mdEl('span', '', w, true));
        chip.addEventListener('click', () => {
          if (locked) return;
          let k = active >= 0 && !vals[active] ? active : -1;
          if (k < 0) for (let j = 0; j < n; j++) if (useBank(j) && !vals[j]) { k = j; break; }
          if (k < 0) return;
          vals[k] = w; chipOf[k] = ci; active = -1; refresh(); onChange(vals.slice());
        });
        chips.push(chip); wrap.appendChild(chip);
      });
      c.appendChild(wrap);
    }
    function release(k) { vals[k] = ''; chipOf[k] = -1; refresh(); onChange(vals.slice()); }
    function refresh() {
      slots.forEach((s, k) => { if (!s) return; if (vals[k]) SA.md.into(s, vals[k], true); else s.textContent = '      '; s.classList.toggle('filled', !!vals[k]); s.classList.toggle('active', active === k); });
      chips.forEach((ch, ci) => { ch.disabled = chipOf.indexOf(ci) >= 0; });
    }
    refresh(); onChange(vals.slice());
    return {
      get: () => vals.slice(),
      lock(res) {
        locked = true; const ok = res.detail || [];
        for (let k = 0; k < n; k++) { const el = slots[k] || inputs[k]; if (inputs[k]) inputs[k].disabled = true; el.classList.add(ok[k] ? 'ok' : 'bad'); }
        chips.forEach((ch) => { ch.disabled = true; });
        if (!res.correct) c.appendChild(h('p', { class: 'key-line' }, 'Answers: ', mdEl('strong', null, keyOf(inst).join(' · '), true)));
      },
    };
  };

  /* ---------- order ---------- */
  R.order = function (c, inst, onChange) {
    const n = inst.items.length;
    let cur = shuffled(inst, 'order', n);
    if (n > 1 && cur.every((v, i) => v === i)) cur = cur.slice(1).concat(cur[0]);
    let locked = false, dragFrom = -1, focusPos = -1, focusKind = 'down'; let okMask = null;
    const ol = h('ol', { class: 'order-list' });
    function move(from, to) {
      if (to < 0 || to >= n || from === to) return;
      const [x] = cur.splice(from, 1); cur.splice(to, 0, x); focusPos = to; draw(); onChange(cur.slice());
    }
    function draw() {
      clear(ol);
      cur.forEach((orig, pos) => {
        const li = h('li', { class: 'order-item' + (okMask ? (okMask[pos] ? ' ok' : ' bad') : ''), draggable: locked ? null : 'true' },
          h('span', { class: 'grip', 'aria-hidden': 'true' }, '≡'), mdEl('div', 'order-text', inst.items[orig], true));
        const up = h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Move up', disabled: locked || pos === 0 }, '▲');
        const dn = h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Move down', disabled: locked || pos === n - 1 }, '▼');
        up.addEventListener('click', () => { focusKind = 'up'; move(pos, pos - 1); });
        dn.addEventListener('click', () => { focusKind = 'down'; move(pos, pos + 1); });
        li.appendChild(h('span', { class: 'order-btns' }, up, dn));
        li.addEventListener('dragstart', (e) => { dragFrom = pos; try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(pos)); } catch (x) { /* ignore */ } li.classList.add('dragging'); });
        li.addEventListener('dragend', () => { li.classList.remove('dragging'); });
        li.addEventListener('dragover', (e) => { if (locked || dragFrom < 0) return; e.preventDefault(); li.classList.add('over'); });
        li.addEventListener('dragleave', () => li.classList.remove('over'));
        li.addEventListener('drop', (e) => { e.preventDefault(); const f = dragFrom; dragFrom = -1; if (!locked && f >= 0) { focusKind = 'drag'; move(f, pos); } });
        ol.appendChild(li);
        if (pos === focusPos && !locked) { const t = focusKind === 'up' && !up.disabled ? up : (dn.disabled ? up : dn); if (focusKind !== 'drag') setTimeout(() => t.focus(), 0); }
      });
      focusPos = -1;
    }
    c.appendChild(h('p', { class: 'ex-note' }, 'Put the steps in order: drag, or use the arrow buttons.'));
    c.appendChild(ol); draw(); onChange(cur.slice());
    return {
      get: () => cur.slice(),
      lock(res) {
        locked = true; okMask = cur.map((v, k) => v === k); draw();
        if (!res.correct) { const ans = h('ol', { class: 'key-list' }); inst.items.forEach((it) => ans.appendChild(mdEl('li', '', it, true))); c.appendChild(h('div', { class: 'key-line' }, h('strong', null, 'Correct order'), ans)); }
      },
    };
  };

  /* ---------- match ---------- */
  R.match = function (c, inst, onChange) {
    const n = inst.pairs.length, resp = Array(n).fill(null), perm = shuffled(inst, 'match', n), selects = [], rows = [];
    const box = h('div', { class: 'match-list' });
    inst.pairs.forEach((pr, k) => {
      const sel = mathSelect(perm.map((ri) => ({ value: ri, src: inst.pairs[ri][1] })), 'Match for ' + stripMd(pr[0]), 'Choose…', (v) => { resp[k] = v; onChange(resp.slice()); });
      const row = h('div', { class: 'match-row' }, mdEl('div', 'match-left', pr[0], true), h('span', { class: 'arrow', 'aria-hidden': 'true' }, '→'), sel.el);
      selects.push(sel); rows.push(row); box.appendChild(row);
    });
    c.appendChild(box); onChange(resp.slice());
    return {
      get: () => resp.slice(),
      lock(res) {
        const ok = res.detail || [];
        rows.forEach((row, k) => { selects[k].disable(); row.classList.add(ok[k] ? 'ok' : 'bad'); if (!ok[k]) row.appendChild(h('div', { class: 'key-line small' }, 'Correct: ', mdEl('strong', null, inst.pairs[k][1], true))); });
      },
    };
  };

  /* ---------- bucket ---------- */
  R.bucket = function (c, inst, onChange) {
    const n = inst.items.length, resp = Array(n).fill(null), perm = shuffled(inst, 'bucket', n), rows = [], btns = [];
    const box = h('div', { class: 'bucket-list' });
    perm.forEach((k) => {
      const group = h('div', { class: 'seg-group', role: 'radiogroup', 'aria-label': 'Category' }); btns[k] = [];
      inst.buckets.forEach((b, bi) => {
        const btn = h('button', { type: 'button', class: 'seg-btn', role: 'radio', 'aria-checked': 'false' }, mdEl('span', '', b, true));
        btn.addEventListener('click', () => { resp[k] = bi; btns[k].forEach((x, j) => { x.setAttribute('aria-checked', j === bi ? 'true' : 'false'); x.classList.toggle('sel', j === bi); }); onChange(resp.slice()); });
        btns[k].push(btn); group.appendChild(btn);
      });
      const row = h('div', { class: 'bucket-row' }, mdEl('div', 'bucket-text', inst.items[k].text, true), group);
      rows[k] = row; box.appendChild(row);
    });
    c.appendChild(box); onChange(resp.slice());
    return {
      get: () => resp.slice(),
      lock(res) {
        const ok = res.detail || [];
        inst.items.forEach((it, k) => { btns[k].forEach((b) => { b.disabled = true; }); rows[k].classList.add(ok[k] ? 'ok' : 'bad'); if (!ok[k]) rows[k].appendChild(h('div', { class: 'key-line small' }, 'Correct: ', mdEl('strong', null, inst.buckets[it.bucket], true))); });
      },
    };
  };

  /* ---------- timeline ---------- */
  R.timeline = function (c, inst, onChange) {
    const ne = inst.events.length, resp = Array(ne).fill(null), order = shuffled(inst, 'timeline', ne);
    let selected = null, locked = false, okMask = null;
    const track = h('div', { class: 'tl-track' }), tray = h('div', { class: 'tl-tray', 'aria-label': 'Unplaced events' });
    const status = h('p', { class: 'ex-note' });
    function chip(e) {
      const ok = okMask ? okMask[e] : null;
      const b = h('button', { type: 'button', class: 'tl-chip' + (selected === e ? ' sel' : '') + (ok === true ? ' ok' : ok === false ? ' bad' : ''), disabled: locked ? true : null }, mdEl('span', '', inst.events[e].text, true));
      if (ok === false) b.appendChild(h('small', { class: 'tl-fix' }, ' → ', mdEl('span', null, inst.slots[inst.events[e].slot], true)));
      b.addEventListener('click', (ev) => {
        ev.stopPropagation(); if (locked) return;
        if (selected == null) selected = e;
        else if (selected === e) selected = null;
        else if (resp[e] != null) { resp[selected] = resp[e]; selected = null; onChange(resp.slice()); }
        else selected = e;
        draw();
      });
      return b;
    }
    function draw() {
      clear(track); clear(tray);
      inst.slots.forEach((s, si) => {
        const col = h('div', { class: 'tl-slot', role: 'button', tabindex: locked ? '-1' : '0', 'aria-label': 'Slot ' + stripMd(s) }, mdEl('div', 'tl-label', s, true), h('div', { class: 'tl-dot', 'aria-hidden': 'true' }));
        const body = h('div', { class: 'tl-body' });
        order.filter((e) => resp[e] === si).forEach((e) => body.appendChild(chip(e)));
        col.appendChild(body);
        const place = () => { if (locked || selected == null) return; resp[selected] = si; selected = null; onChange(resp.slice()); draw(); };
        col.addEventListener('click', place);
        col.addEventListener('keydown', (ev) => { if (ev.key === ' ') { ev.preventDefault(); place(); } });
        track.appendChild(col);
      });
      const un = order.filter((e) => resp[e] == null);
      un.forEach((e) => tray.appendChild(chip(e)));
      if (!un.length) tray.appendChild(h('span', { class: 'muted' }, 'All events placed.'));
      status.textContent = locked ? '' : (selected == null ? 'Tap an event, then tap the slot where it belongs.' : 'Now tap a slot (or tap the event again to cancel).');
    }
    tray.addEventListener('click', () => { if (locked || selected == null) return; resp[selected] = null; selected = null; onChange(resp.slice()); draw(); });
    c.appendChild(status); c.appendChild(h('div', { class: 'tl-scroll' }, track)); c.appendChild(h('div', { class: 'tl-tray-wrap' }, h('div', { class: 'tl-tray-title' }, 'Events to place'), tray));
    draw(); onChange(resp.slice());
    return {
      get: () => resp.slice(),
      lock(res) { locked = true; selected = null; okMask = res.detail || null; draw(); },
    };
  };

  /* ---------- journal ---------- */
  R.journal = function (c, inst, onChange) {
    const lines = [{ account: '', side: 'Dr', amount: '' }, { account: '', side: 'Cr', amount: '' }];
    let locked = false;
    const rowsBox = h('div', { class: 'j-rows' }), totals = h('p', { class: 'j-totals', 'aria-live': 'polite' });
    const addBtn = h('button', { type: 'button', class: 'btn small' }, '+ Add line');
    const get = () => lines.filter((l) => l.account || String(l.amount).trim() !== '').map((l) => ({ account: l.account, side: l.side, amount: l.amount }));
    function upd() {
      let dr = 0, cr = 0;
      lines.forEach((l) => { const a = SA.parseNum(l.amount); if (isFinite(a)) { if (l.side === 'Dr') dr += a; else cr += a; } });
      const bal = Math.abs(dr - cr) < 0.005 && dr > 0;
      totals.className = 'j-totals ' + (bal ? 'balanced' : (dr || cr ? 'unbalanced' : ''));
      totals.textContent = 'Dr total ' + SA.fmt.num(dr, 2) + '  |  Cr total ' + SA.fmt.num(cr, 2) + '  |  ' + (bal ? 'Balanced' : (dr || cr ? 'Not balanced (difference ' + SA.fmt.num(Math.abs(dr - cr), 2) + ')' : 'Not balanced'));
    }
    function draw() {
      clear(rowsBox);
      lines.forEach((l, i) => {
        const sel = h('select', { 'aria-label': 'Account, line ' + (i + 1) }, h('option', { value: '' }, 'Account…'), inst.accounts.map((a) => h('option', { value: a, selected: a === l.account ? true : null }, a)));
        sel.addEventListener('change', () => { l.account = sel.value; upd(); onChange(get()); });
        const dr = h('button', { type: 'button', class: 'seg-btn' + (l.side === 'Dr' ? ' sel' : ''), 'aria-pressed': l.side === 'Dr' ? 'true' : 'false' }, 'Dr');
        const cr = h('button', { type: 'button', class: 'seg-btn' + (l.side === 'Cr' ? ' sel' : ''), 'aria-pressed': l.side === 'Cr' ? 'true' : 'false' }, 'Cr');
        const setSide = (s) => { l.side = s; dr.classList.toggle('sel', s === 'Dr'); cr.classList.toggle('sel', s === 'Cr'); dr.setAttribute('aria-pressed', s === 'Dr' ? 'true' : 'false'); cr.setAttribute('aria-pressed', s === 'Cr' ? 'true' : 'false'); upd(); onChange(get()); };
        dr.addEventListener('click', () => setSide('Dr')); cr.addEventListener('click', () => setSide('Cr'));
        const amt = h('input', { type: 'text', inputmode: numMode(), autocomplete: 'off', class: 'j-amt', 'data-calc': '1', 'data-calc-dp': '2', placeholder: 'Amount', 'aria-label': 'Amount, line ' + (i + 1), value: l.amount });
        amt.addEventListener('input', () => { l.amount = amt.value; upd(); onChange(get()); });
        const rm = h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Remove line ' + (i + 1), disabled: lines.length <= 1 }, '×');
        rm.addEventListener('click', () => { lines.splice(i, 1); draw(); upd(); onChange(get()); });
        rowsBox.appendChild(h('div', { class: 'j-row' }, sel, h('span', { class: 'seg-group' }, dr, cr), amt, rm));
      });
    }
    addBtn.addEventListener('click', () => { if (locked) return; lines.push({ account: '', side: 'Dr', amount: '' }); draw(); upd(); });
    c.appendChild(h('div', { class: 'journal' }, rowsBox, addBtn, totals));
    draw(); upd(); onChange(get());
    return {
      get,
      lock(res) {
        locked = true;
        c.querySelectorAll('select,input,button').forEach((x) => { x.disabled = true; });
        c.appendChild(h('p', { class: 'ex-note ' + (res.correct ? 'good' : 'badtxt') }, res.correct ? 'Entry matches.' : 'Problem: ' + (typeof res.detail === 'string' ? res.detail : 'entry differs')));
        if (!res.correct) {
          const t = h('table', { class: 'key-table' }, h('thead', null, h('tr', null, h('th', null, 'Account'), h('th', null, 'Dr'), h('th', null, 'Cr'))));
          const tb = h('tbody'); keyOf(inst).forEach((l) => tb.appendChild(h('tr', null, h('td', null, l.account), h('td', null, l.side === 'Dr' ? l.amount : ''), h('td', null, l.side === 'Cr' ? l.amount : ''))));
          t.appendChild(tb); c.appendChild(h('div', { class: 'key-line' }, h('strong', null, 'Expected entry'), t));
        }
      },
    };
  };

  /* ---------- table ---------- */
  const isBlankCell = (cell) => cell && typeof cell === 'object' && (cell.answer != null || cell.accept);
  R.table = function (c, inst, onChange) {
    const resp = {}, inputs = []; let locked = false;
    const thead = h('thead', null, h('tr', null, inst.columns.map((col) => h('th', null, mdEl('span', '', col, true)))));
    const tbody = h('tbody');
    inst.rows.forEach((row, ri) => {
      const tr = h('tr');
      row.forEach((cell, ci) => {
        if (isBlankCell(cell)) {
          const inp = h('input', Object.assign({ type: 'text', class: 'cell-input', autocomplete: 'off', inputmode: cell.accept ? 'text' : numMode(), 'aria-label': 'Row ' + (ri + 1) + ', ' + stripMd(inst.columns[ci]) }, cell.accept ? {} : calcAttrs(cell.dp, cell.tol, /%(?!²)/.test(String(inst.columns[ci])))));
          inp.addEventListener('input', () => { resp[ri + ',' + ci] = inp.value; onChange(Object.assign({}, resp)); });
          inputs.push({ key: ri + ',' + ci, el: inp }); tr.appendChild(h('td', { class: 'blank' }, inp));
        } else tr.appendChild(h('td', null, mdEl('span', '', String(cell), true)));
      });
      tbody.appendChild(tr);
    });
    c.appendChild(h('div', { class: 'table-wrap' }, h('table', { class: 'ex-table' }, thead, tbody)));
    onChange({});
    return {
      get: () => Object.assign({}, resp),
      lock(res) {
        locked = true; const ok = res.detail || [], key = keyOf(inst);
        inputs.forEach((x, k) => { x.el.disabled = true; x.el.classList.add(ok[k] ? 'ok' : 'bad'); if (!ok[k]) x.el.parentNode.appendChild(h('div', { class: 'key-line small' }, key[x.key])); });
      },
    };
  };

  /* ---------- spot ---------- */
  R.spot = function (c, inst, onChange) {
    const flagged = new Set(); let locked = false; const segs = [];
    const nErr = inst.doc.filter((d) => d.error).length;
    const count = h('p', { class: 'ex-note spot-count', 'aria-live': 'polite' });
    const get = () => Array.from(flagged).sort((a, b) => a - b);
    function upd() { count.textContent = (inst.count ? 'Find ' + inst.count + ' error' + (inst.count === 1 ? '' : 's') + '. ' : 'Flag every error. ') + 'Flagged: ' + flagged.size + '.'; }
    const doc = h('div', { class: 'spot-doc' });
    if (inst.title) doc.appendChild(mdEl('div', 'spot-title', inst.title, true));
    inst.doc.forEach((d, k) => {
      const s = h('div', { class: 'seg', role: 'checkbox', 'aria-checked': 'false', tabindex: '0' }, mdEl('span', '', d.text, true));
      const tog = () => { if (locked) return; if (flagged.has(k)) flagged.delete(k); else flagged.add(k); s.classList.toggle('flag', flagged.has(k)); s.setAttribute('aria-checked', flagged.has(k) ? 'true' : 'false'); upd(); onChange(get()); };
      s.addEventListener('click', tog); s.addEventListener('keydown', (e) => { if (e.key === ' ') { e.preventDefault(); tog(); } });
      segs.push(s); doc.appendChild(s);
    });
    c.appendChild(count); c.appendChild(doc); upd(); onChange(get());
    return {
      get,
      lock() {
        locked = true; const why = h('ul', { class: 'why-list' });
        inst.doc.forEach((d, k) => {
          const s = segs[k], f = flagged.has(k); s.setAttribute('aria-disabled', 'true');
          if (d.error && f) s.classList.add('ok'); else if (d.error) s.classList.add('missed'); else if (f) s.classList.add('bad');
          if (d.error) why.appendChild(h('li', null, h('strong', null, (f ? 'Found: ' : 'Missed: ')), mdEl('span', '', d.text, true), h('br'), mdEl('span', 'muted', d.why || '', true)));
        });
        c.appendChild(h('div', { class: 'key-line' }, h('strong', null, nErr + ' error' + (nErr === 1 ? '' : 's') + ' in the document'), why));
      },
    };
  };

  /* ---------- paper ---------- */
  R.paper = function (c, inst, onChange, opts) {
    opts = opts || {};
    const ta = h('textarea', { class: 'paper-text', rows: '10', placeholder: 'Write your answer here…', 'aria-label': 'Your answer' });
    const submit = h('button', { type: 'button', class: 'btn primary', disabled: true }, 'Submit answer');
    const reveal = h('div', { class: 'paper-reveal', hidden: true });
    let score = null, submitted = false;
    ta.addEventListener('input', () => { submit.disabled = !ta.value.trim(); onChange({ text: ta.value, selfScore: score }); });
    submit.addEventListener('click', () => {
      if (submitted || !ta.value.trim()) return; submitted = true; ta.disabled = true; submit.disabled = true;
      const gp = String(inst.gradingPrompt || '').split('{{answer}}').join(ta.value);
      const copyBtn = h('button', { type: 'button', class: 'btn' }, 'Copy grading prompt');
      const copied = h('span', { class: 'muted', 'aria-live': 'polite' });
      copyBtn.addEventListener('click', () => copyText(gp, (ok) => { copied.textContent = ok ? ' Copied.' : ' Copy failed: select the text below.'; }));
      const scoreIn = h('input', { type: 'number', min: '0', max: '100', step: '1', class: 'score-input', 'aria-label': 'Self-score 0 to 100' });
      const save = h('button', { type: 'button', class: 'btn primary', disabled: true }, 'Save score');
      scoreIn.addEventListener('input', () => { const v = parseFloat(scoreIn.value); save.disabled = !(isFinite(v) && v >= 0 && v <= 100); });
      save.addEventListener('click', () => { score = Math.max(0, Math.min(100, parseFloat(scoreIn.value))); scoreIn.disabled = true; save.disabled = true; onChange({ text: ta.value, selfScore: score }); if (opts.onSelfScore) opts.onSelfScore(score); });
      reveal.hidden = false;
      reveal.appendChild(h('h4', null, 'Rubric')); reveal.appendChild(mdEl('div', 'rubric', inst.rubric || ''));
      reveal.appendChild(h('h4', null, 'Grade it with your own assistant'));
      reveal.appendChild(h('p', { class: 'muted' }, 'Copy the prompt, paste it into your chatbot, then enter the score it gives (or your own judgement). Paper scores give XP only and never unlock anything.'));
      reveal.appendChild(h('div', null, copyBtn, copied));
      const pre = h('textarea', { class: 'paper-prompt', readonly: true, rows: '6', 'aria-label': 'Grading prompt' }); pre.value = gp; reveal.appendChild(pre);
      reveal.appendChild(h('div', { class: 'score-row' }, h('label', null, 'Self-score (0–100) ', scoreIn), save));
    });
    c.appendChild(ta); c.appendChild(h('div', { class: 'btn-row' }, submit)); c.appendChild(reveal);
    onChange({ text: '', selfScore: null });
    return { get: () => ({ text: ta.value, selfScore: score }), lock() { ta.disabled = true; } };
  };

  /* ---------- answered? ---------- */
  function isAnswered(inst, r) {
    switch (inst.template) {
      case 'mcq': return r != null;
      case 'multi': return Array.isArray(r) && r.length > 0;
      case 'numeric': return String(r == null ? '' : r).trim() !== '';
      case 'cloze': return Array.isArray(r) && r.length === inst.blanks.length && r.every((v) => String(v == null ? '' : v).trim() !== '');
      case 'order': return Array.isArray(r) && r.length === inst.items.length;
      case 'match': return Array.isArray(r) && r.length === inst.pairs.length && r.every((v) => v != null);
      case 'bucket': return Array.isArray(r) && r.length === inst.items.length && r.every((v) => v != null);
      case 'timeline': return Array.isArray(r) && r.length === inst.events.length && r.every((v) => v != null);
      case 'journal': return Array.isArray(r) && r.length >= 2 && r.every((l) => l.account && SA.parseNum(l.amount) > 0);
      case 'table': {
        let ok = true; inst.rows.forEach((row, ri) => row.forEach((cell, ci) => { if (isBlankCell(cell) && !String((r || {})[ri + ',' + ci] || '').trim()) ok = false; })); return ok;
      }
      case 'spot': return Array.isArray(r) && r.length > 0;
      case 'paper': return !!(r && String(r.text || '').trim());
      default: return false;
    }
  }

  SA.renderers = R;
  SA.render = {
    mount(container, inst, onChange, opts) { if (!R[inst.template]) throw new Error('no renderer for ' + inst.template); return R[inst.template](container, inst, onChange || function () {}, opts); },
    isAnswered, h, mdEl, clear, copyText, stripMd,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = SA.render;
})(typeof globalThis !== 'undefined' ? globalThis : this);
