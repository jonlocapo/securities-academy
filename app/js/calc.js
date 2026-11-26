/* Securities Academy - calculator. A small maths editor that sits beside numeric answer fields.
   Keys build a formula as it would be written: / starts a fraction (taking the number before it as the numerator),
   ^ a power, * gives ×, - gives −, and typed names become functions (sqrt, root, ln, log, exp, pi, ans, ncr).
   The value shows as you type and goes straight into the answer field. Typed first; a keypad hides behind a button. Engine (SA.calcEngine) is pure and tested in
   tools/smoke-calc.js; the panel only starts in a real browser. Setting: settings.calc = 'auto' | 'button' | 'off'. */
(function (root) {
  'use strict';
  const SA = root.SA || (root.SA = {});

  /* ---------- model: a row is a list of items; structures hold rows ---------- */
  // frac r[0]/r[1]; pow r[0] = exponent of what stands before it; sqrt r[0]; root r[0] = index, r[1] = radicand;
  // ln r[0]; log r[0] = base (empty means 10), r[1] = argument; ncr r[0] = n, r[1] = k
  const STRUCT = { frac: 2, pow: 1, sqrt: 1, root: 2, ln: 1, log: 2, ncr: 2 };
  const OPS = '+−×÷';
  const mkRow = (up) => ({ it: [], up: up || null });
  function mk(k, v) {
    const n = { k, in: null };
    if (STRUCT[k]) { n.r = []; for (let i = 0; i < STRUCT[k]; i++) n.r.push(mkRow(n)); } else n.v = v;
    return n;
  }
  const isS = (n) => !!n.r;
  const allEmpty = (n) => n.r.every((r) => !r.it.length);
  const posOf = (n) => n.in.it.indexOf(n);
  // letters typed in a row become these, longest names first
  const CMDS = ['sqrt', 'root', 'ncr', 'exp', 'log', 'ans', 'ln', 'pi'];
  // visual order of two-row structures, top row first (the log base is written below)
  const TOP = { frac: 0, root: 0, ncr: 0, log: 1 };

  function Editor() {
    const E = {};
    E.clear = function () { E.root = mkRow(null); E.cur = { row: E.root, i: 0 }; };
    E.clear();
    E.isEmpty = () => !E.root.it.length;
    function put(n) { const c = E.cur; n.in = c.row; c.row.it.splice(c.i, 0, n); c.i++; return n; }
    function enter(n, k, atEnd) { const r = n.r[k]; E.cur = { row: r, i: atEnd ? r.it.length : 0 }; }
    // the operand just before the cursor (a number, a constant, a bracketed group, structures): becomes a numerator
    function takeOperand() {
      const it = E.cur.row.it; let j = E.cur.i, depth = 0;
      while (j > 0) {
        const n = it[j - 1];
        if (!isS(n)) {
          if (n.v === ')') depth++;
          else if (n.v === '(') { if (!depth) break; depth--; }
          else if (!depth && OPS.includes(n.v)) break;
        }
        j--;
      }
      const got = it.splice(j, E.cur.i - j); E.cur.i = j;
      // (1+r)/ -> numerator 1+r: the bar already groups it
      if (got.length > 2 && !isS(got[0]) && got[0].v === '(' && !isS(got[got.length - 1]) && got[got.length - 1].v === ')') {
        let d = 0, whole = true;
        for (let q = 0; q < got.length; q++) { const v = isS(got[q]) ? '' : got[q].v; if (v === '(') d++; else if (v === ')') { d--; if (!d && q < got.length - 1) { whole = false; break; } } }
        if (whole) return got.slice(1, -1);
      }
      return got;
    }
    function struct(k, takes) {
      const taken = takes ? takeOperand() : [], n = mk(k);
      taken.forEach((x) => { x.in = n.r[0]; n.r[0].it.push(x); });
      put(n);
      if (k === 'log') enter(n, 1);
      else enter(n, taken.length && n.r.length > 1 ? 1 : 0, false);
      return n;
    }
    function command(name) {
      if (name === 'pi') return put(mk('c', 'π'));
      if (name === 'ans') return put(mk('c', 'Ans'));
      if (name === 'exp') { put(mk('c', 'e')); return struct('pow'); }
      if (name === 'ncr') return struct('ncr', true);
      return struct(name);
    }
    // after a letter: did the letters before the cursor spell a command?
    function checkCmd() {
      const it = E.cur.row.it; let j = E.cur.i, s = '';
      while (j > 0 && !isS(it[j - 1]) && /^[a-z]$/.test(it[j - 1].v)) { j--; s = it[j].v + s; }
      for (const c of CMDS) {
        if (s.endsWith(c)) { it.splice(E.cur.i - c.length, c.length); E.cur.i -= c.length; command(c); return; }
      }
    }
    function left() {
      const c = E.cur;
      if (c.i > 0) { const p = c.row.it[c.i - 1]; if (isS(p)) enter(p, p.r.length - 1, true); else c.i--; return; }
      const n = c.row.up; if (!n) return;
      const k = n.r.indexOf(c.row);
      if (k > 0) enter(n, k - 1, true); else E.cur = { row: n.in, i: posOf(n) };
    }
    function right() {
      const c = E.cur;
      if (c.i < c.row.it.length) { const p = c.row.it[c.i]; if (isS(p)) enter(p, 0); else c.i++; return; }
      const n = c.row.up; if (!n) return;
      const k = n.r.indexOf(c.row);
      if (k < n.r.length - 1) enter(n, k + 1); else E.cur = { row: n.in, i: posOf(n) + 1 };
    }
    function vert(dir) { // dir -1 up, +1 down
      let r = E.cur.row;
      while (r.up) {
        const n = r.up, k = n.r.indexOf(r);
        if (n.r.length === 2 && TOP[n.k] != null) {
          const top = TOP[n.k], want = dir < 0 ? top : 1 - top;
          if (k !== want) { enter(n, want, true); return true; }
        }
        if (n.k === 'pow' && dir > 0) { E.cur = { row: n.in, i: posOf(n) + 1 }; return true; }
        r = n.in;
      }
      return false;
    }
    function back() {
      const c = E.cur;
      if (c.i > 0) {
        const p = c.row.it[c.i - 1];
        if (isS(p) && !allEmpty(p)) { enter(p, p.r.length - 1, true); return; }
        c.row.it.splice(c.i - 1, 1); c.i--; return;
      }
      const n = c.row.up; if (!n) return;
      const k = n.r.indexOf(c.row), at = posOf(n);
      if (allEmpty(n)) { n.in.it.splice(at, 1); E.cur = { row: n.in, i: at }; return; }
      if (k > 0 && c.row.it.length) { enter(n, k - 1, true); return; }
      // at the start of a box that is empty or first: unwrap the structure, keeping what was inside (5/□ -> 5)
      const inner = [].concat(...n.r.map((r) => r.it)), before = n.r.slice(0, k).reduce((s, r) => s + r.it.length, 0);
      inner.forEach((x) => { x.in = n.in; });
      n.in.it.splice(at, 1, ...inner);
      E.cur = { row: n.in, i: at + before };
    }
    function del() {
      const c = E.cur;
      if (c.i < c.row.it.length) { const p = c.row.it[c.i]; if (isS(p) && !allEmpty(p)) { enter(p, 0); return; } c.row.it.splice(c.i, 1); }
    }
    /* key names: digits, '.', '+', '-', '*', ':', '/', '^', '(', ')', '!', '%', letters a-z, and
       'sqrt' 'root' 'ln' 'log' 'logb' 'exp' 'pi' 'e' 'ans' 'ncr' 'left' 'right' 'up' 'down' 'home' 'end' 'back' 'del' */
    E.key = function (k) {
      if (/^[0-9.]$/.test(k)) put(mk('c', k));
      else if (k === ',') put(mk('c', '.'));
      else if (k === '+') put(mk('c', '+'));
      else if (k === '-' || k === '−') put(mk('c', '−'));
      else if (k === '*' || k === '×') put(mk('c', '×'));
      else if (k === ':' || k === '÷') put(mk('c', '÷'));
      else if (k === '(' || k === ')' || k === '!' || k === '%') put(mk('c', k));
      else if (k === '/') struct('frac', true);
      else if (k === '^') struct('pow');
      else if (k === 'logb') { const n = mk('log'); put(n); enter(n, 0); }
      else if (k === '_') { const n = E.cur.row.up; if (n && n.k === 'log' && E.cur.row === n.r[1]) enter(n, 0, true); else return false; }
      else if (k === 'e') put(mk('c', 'e'));
      else if (k === 'π') put(mk('c', 'π'));
      else if (CMDS.includes(k)) command(k);
      else if (/^[a-z]$/.test(k)) { put(mk('c', k)); checkCmd(); }
      else if (k === 'left') left();
      else if (k === 'right') right();
      else if (k === 'up') vert(-1);
      else if (k === 'down') vert(1);
      else if (k === 'home') E.cur = { row: E.cur.row, i: 0 };
      else if (k === 'end') E.cur = { row: E.cur.row, i: E.cur.row.it.length };
      else if (k === 'back') back();
      else if (k === 'del') del();
      else return false;
      return true;
    };
    E.type = function (text) { for (const ch of String(text)) { if (ch === ' ') continue; E.key(/[A-Z]/.test(ch) ? ch.toLowerCase() : ch); } };
    E.setCursor = function (row, i) { E.cur = { row, i: Math.max(0, Math.min(i, row.it.length)) }; };
    return E;
  }

  /* ---------- evaluation ---------- */
  const INC = { inc: true };
  const fail = (msg) => ({ msg });
  function lex(row) {
    const out = [], it = row.it;
    for (let i = 0; i < it.length; i++) {
      const n = it[i];
      if (isS(n)) { out.push(n.k === 'pow' ? { t: 'pow', n } : { t: 'val', n }); continue; }
      const v = n.v;
      if (/[0-9.]/.test(v)) {
        let s = v; while (i + 1 < it.length && !isS(it[i + 1]) && /[0-9.]/.test(it[i + 1].v)) s += it[++i].v;
        if ((s.match(/\./g) || []).length > 1 || s === '.') throw fail('Check the number ' + s);
        out.push({ t: 'num', v: Number(s) });
      } else if (OPS.includes(v)) out.push({ t: 'op', v });
      else if (v === '(') out.push({ t: 'lp' });
      else if (v === ')') out.push({ t: 'rp' });
      else if (v === '!' || v === '%') out.push({ t: 'post', v });
      else if (v === 'π' || v === 'e' || v === 'Ans') out.push({ t: 'const', v });
      else throw fail('Unknown symbol “' + v + '”');
    }
    return out;
  }
  function fact(x) {
    if (x < 0 || Math.abs(x - Math.round(x)) > 1e-9) throw fail('n! needs a whole number, 0 or more');
    if (x > 170) throw fail('Too large');
    let f = 1; for (let i = 2; i <= Math.round(x); i++) f *= i; return f;
  }
  const isInt = (x) => Math.abs(x - Math.round(x)) < 1e-9;
  function evalRow(row, ctx) {
    const t = lex(row);
    if (!t.length) throw INC;
    let p = 0;
    const peek = () => t[p];
    const startsOperand = (x) => x && (x.t === 'num' || x.t === 'const' || x.t === 'lp' || x.t === 'val');
    function expr() {
      let v = term();
      while (peek() && peek().t === 'op' && (peek().v === '+' || peek().v === '−')) { const o = t[p++].v; const b = term(); v = o === '+' ? v + b : v - b; }
      return v;
    }
    function term() {
      let v = unary();
      for (;;) {
        const x = peek();
        if (x && x.t === 'op' && (x.v === '×' || x.v === '÷')) { p++; const b = unary(); if (x.v === '÷') { if (b === 0) throw fail('Division by zero'); v /= b; } else v *= b; }
        else if (startsOperand(x)) v *= unary(); // 2π, 3√2, (1+r)(1+s)
        else return v;
      }
    }
    function unary() {
      const x = peek();
      if (x && x.t === 'op' && x.v === '−') { p++; return -unary(); }
      if (x && x.t === 'op' && x.v === '+') { p++; return unary(); }
      return power();
    }
    function power() {
      let b = postfix(primary());
      const ex = [];
      while (peek() && peek().t === 'pow') ex.push(evalRow(t[p++].n.r[0], ctx));
      if (ex.length) {
        const e = ex.reduceRight((acc, x) => (acc === null ? x : Math.pow(x, acc)), null);
        const v = Math.pow(b, e);
        if (isNaN(v)) throw fail(b < 0 ? 'A negative number to a fractional power is undefined' : 'Undefined power');
        b = postfix(v);
      }
      return b;
    }
    function postfix(v) {
      while (peek() && peek().t === 'post') v = t[p++].v === '!' ? fact(v) : v / 100;
      return v;
    }
    function primary() {
      const x = t[p];
      if (!x) throw INC;
      p++;
      if (x.t === 'num') return x.v;
      if (x.t === 'const') {
        if (x.v === 'π') return Math.PI;
        if (x.v === 'e') return Math.E;
        if (ctx.ans == null) throw fail('Ans is empty until you press =');
        return ctx.ans;
      }
      if (x.t === 'lp') { const v = expr(); if (peek() && peek().t === 'rp') p++; return v; } // a missing ) closes at the end
      if (x.t === 'val') return evalStruct(x.n, ctx);
      if (x.t === 'rp') throw fail('A ) has no matching (');
      if (x.t === 'pow') throw x.n.in.it.indexOf(x.n) === 0 ? fail('A power needs something before it') : INC;
      throw INC; // an operator where a number should be: still typing
    }
    const v = expr();
    if (p < t.length) throw t[p].t === 'rp' ? fail('A ) has no matching (') : INC;
    return v;
  }
  function evalStruct(n, ctx) {
    const a = () => evalRow(n.r[0], ctx), b = () => evalRow(n.r[1], ctx);
    if (n.k === 'frac') { const x = a(), y = b(); if (y === 0) throw fail('Division by zero'); return x / y; }
    if (n.k === 'sqrt') { const x = a(); if (x < 0) throw fail('Square root of a negative number'); return Math.sqrt(x); }
    if (n.k === 'root') {
      const k = a(), x = b();
      if (k === 0) throw fail('A 0th root is undefined');
      if (x < 0) { if (isInt(k) && Math.round(k) % 2) return -Math.pow(-x, 1 / k); throw fail('Even root of a negative number'); }
      return Math.pow(x, 1 / k);
    }
    if (n.k === 'ln') { const x = a(); if (x <= 0) throw fail('ln needs a number above 0'); return Math.log(x); }
    if (n.k === 'log') {
      const base = n.r[0].it.length ? a() : 10, x = b();
      if (base <= 0 || base === 1) throw fail('A log base must be above 0 and not 1');
      if (x <= 0) throw fail('log needs a number above 0');
      return base === 10 ? Math.log10(x) : Math.log(x) / Math.log(base);
    }
    if (n.k === 'ncr') {
      const N = a(), K = b();
      if (!isInt(N) || !isInt(K) || N < 0 || K < 0) throw fail('nCr needs whole numbers');
      if (K > N) return 0;
      let r = 1; const k = Math.min(Math.round(K), Math.round(N - K));
      for (let i = 1; i <= k; i++) r = r * (Math.round(N) - k + i) / i;
      return Math.round(r);
    }
    throw INC;
  }
  // -> { ok, v } | { ok: false, inc: true } (still typing) | { ok: false, msg }
  function evaluate(row, ctx) {
    try {
      const v = evalRow(row, ctx || {});
      if (!isFinite(v)) return { ok: false, msg: 'Too large' };
      return { ok: true, v: Math.abs(v) < 1e-13 ? 0 : v };
    } catch (e) {
      if (e && e.inc) return { ok: false, inc: true };
      if (e && e.msg) return { ok: false, msg: e.msg };
      throw e;
    }
  }

  /* ---------- text forms ---------- */
  function lin(row) {
    const g = (r) => (r.it.length === 1 && !isS(r.it[0]) ? lin(r) : '(' + lin(r) + ')');
    return row.it.map((n) => {
      if (!isS(n)) return OPS.includes(n.v) ? ' ' + n.v + ' ' : n.v;
      if (n.k === 'frac') return g(n.r[0]) + '/' + g(n.r[1]);
      if (n.k === 'pow') return '^' + g(n.r[0]);
      if (n.k === 'sqrt') return '√(' + lin(n.r[0]) + ')';
      if (n.k === 'root') return 'root ' + lin(n.r[0]) + ' of (' + lin(n.r[1]) + ')';
      if (n.k === 'ln') return 'ln(' + lin(n.r[0]) + ')';
      if (n.k === 'log') return (n.r[0].it.length ? 'log base ' + lin(n.r[0]) + ' ' : 'log') + '(' + lin(n.r[1]) + ')';
      if (n.k === 'ncr') return 'C(' + lin(n.r[0]) + ', ' + lin(n.r[1]) + ')';
      return '';
    }).join('').replace(/\s+/g, ' ').trim();
  }
  // for the answer field: plain digits that SA.parseNum reads (no exponent, no separators), 12 significant figures
  function plain(v) {
    let s = String(Number(v.toPrecision(12)));
    if (/e/i.test(s)) s = Number(v.toPrecision(12)).toFixed(20).replace(/\.?0+$/, '');
    return s;
  }
  // for display: thousands separated, up to 10 significant figures
  function show(v) {
    const a = Math.abs(v);
    if (a !== 0 && (a >= 1e15 || a < 1e-9)) { const [m, e] = v.toExponential(8).split('e'); return m.replace(/\.?0+$/, '') + ' × 10^' + Number(e); }
    const s = String(Number(v.toPrecision(10)));
    const [i, d] = (/e/i.test(s) ? Number(v.toPrecision(10)).toFixed(12).replace(/\.?0+$/, '') : s).split('.');
    return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (d ? '.' + d : '');
  }
  /* what goes into an answer field: × 100 for a % field, then rounded to the field's decimals. With a relative tolerance
     (significant-figure questions) it keeps at least 6 significant figures instead. o = { dp, rel, pct } */
  function output(v, o) {
    o = o || {};
    const x = o.pct ? v * 100 : v;
    if (o.dp == null || !isFinite(o.dp)) return plain(x);
    let dec = Math.max(0, Math.floor(o.dp));
    if (o.rel && x !== 0) dec = Math.max(dec, Math.min(12, 5 - Math.floor(Math.log10(Math.abs(x)))));
    let s = (x + Math.sign(x) * 1e-12 * Math.max(1, Math.abs(x))).toFixed(dec);
    if (o.rel && s.indexOf('.') >= 0) s = s.replace(/\.?0+$/, '');
    if (/^-0(\.0*)?$/.test(s)) s = s.slice(1);
    return s;
  }
  SA.calcEngine = { Editor, evaluate, lin, plain, show, output };

  /* ---------- panel (browser only) ---------- */
  const doc = root.document;
  if (!doc || !doc.addEventListener || !root.MutationObserver) return;

  /* maths keyboard, docked along the bottom of the screen like GeoGebra's. Two pages: "123" (numbers first, the default on
     phones and tablets, where it replaces the phone keyboard) and "f(x)" (symbols first, the default on desktop, where
     the physical keyboard types the numbers and this keyboard is optional, opened from a floating button).
     A key is [action, label html, spoken name, style, columns]; an action is a key name for Editor.key, or a list of them */
  const FRAC = '<span class="ck-frac"><span>a</span><span>b</span></span>';
  const K = {
    '(': ['(', '('], ')': [')', ')'], frac: ['/', FRAC, 'Fraction'], pow: ['^', 'x<sup>y</sup>', 'Power'], sq: [['^', '2', 'right'], 'x<sup>2</sup>', 'Squared'],
    sqrt: ['sqrt', '√', 'Square root'], root: ['root', '<sup>n</sup>√', 'nth root'], ln: ['ln', 'ln', 'Natural log'], log: ['log', 'log', 'Log base 10'],
    logb: ['logb', 'log<sub>b</sub>', 'Log to a base'], exp: ['exp', 'e<sup>x</sup>', 'e to the power'], ten: [['1', '0', '^'], '10<sup>x</sup>', 'Ten to the power'],
    fact: ['!', 'n!', 'Factorial'], ncr: ['ncr', '<sup>n</sup>C<sub>r</sub>', 'Combinations, n choose r'], pct: ['%', '%', 'Per cent'],
    pi: ['π', 'π', 'Pi'], e: ['e', 'e', 'Euler’s number e'], ans: ['ans', 'Ans', 'Last result'],
    mul: ['*', '×', 'Times', 'o'], div: [':', '÷', 'Divide', 'o'], add: ['+', '+', 'Plus', 'o'], sub: ['-', '−', 'Minus', 'o'], eq: ['=', '=', 'Keep as Ans', 'o'],
    left: ['left', '←', 'Move left', 'nav'], right: ['right', '→', 'Move right', 'nav'], up: ['up', '↑', 'Move up', 'nav'], down: ['down', '↓', 'Move down', 'nav'],
    back: ['back', '⌫', 'Delete', 'nav'], clear: ['clear', 'AC', 'Clear', 'nav'], enter: ['enter', '↵', 'Enter: keep as Ans, again to check', 'go'], dot: ['.', '.', 'Decimal point', 'n'],
  };
  for (let d = 0; d <= 9; d++) K[d] = [String(d), String(d), null, 'n'];
  const PAGES = {
    num: { name: '123', cols: 10, rows: [
      ['(', ')', 'frac', 'pow', 7, 8, 9, 'mul', 'div', 'back'],
      ['sq', 'sqrt', 'pi', 'pct', 4, 5, 6, 'add', 'sub', 'clear'],
      ['left', 'right', 'up', 'down', 1, 2, 3, 'ans', 'e', 'eq'],
      ['ln', 'log', 'exp', 'fact', [0, 2], 'dot', 'ncr', 'root', 'enter']] },
    fx: { name: 'f(x)', cols: 8, rows: [
      ['frac', 'pow', 'sq', 'sqrt', 'root', '(', ')', 'back'],
      ['ln', 'log', 'logb', 'exp', 'ten', 'pi', 'e', 'clear'],
      ['fact', 'ncr', 'pct', 'ans', 'mul', 'div', 'add', 'sub'],
      ['left', 'right', 'up', 'down', 'eq', ['enter', 3]]] },
  };
  const HELP = [['/', 'fraction (the number before it goes on top)'], ['^', 'power'], ['*', '×'], [':', '÷'], ['sqrt, root', 'square and nth root'],
    ['ln, log, exp', 'logs, e to the power'], ['log then _', 'log to another base'], ['pi, e, ans', 'π, e, last result'], ['!, ncr', 'factorial, combinations'], ['%', 'per cent (5% = 0.05)'],
    ['arrows', 'move in and out of boxes'], ['Enter', 'keep the result as Ans; again to check'], ['Esc', 'back to the answer']];
  const TOUCH = !!(root.matchMedia && root.matchMedia('(pointer: coarse)').matches); // phones and tablets: the maths keyboard is the keyboard
  const SENT = '​'; // the text box always holds one invisible character, so Backspace on phone keyboards reaches us

  let panel = null, edEl, cap, resEl, histEl, forEl, helpEl, kb, kbBody, kbTabs = {}, kbFab, fab = null, page = TOUCH ? 'num' : 'fx';
  let target = null, dismissed = false, ans = null, hist = [], fresh = false, touch = false;
  const E = Editor(), spots = new WeakMap(); // drawn element -> where a tap on it puts the cursor
  const mode = () => { const st = SA.app && SA.app.state; return (st && st.settings && st.settings.calc) || 'auto'; };
  const fields = () => Array.from(doc.querySelectorAll('#app input[data-calc]'));
  const live = (x) => x && doc.body.contains(x) && !x.disabled;
  const el = (tag, cls, html) => { const x = doc.createElement(tag); if (cls) x.className = cls; if (html != null) x.innerHTML = html; return x; };
  // keyboard shown or hidden: remembered per browser; shown by default on touch screens, hidden on desktop
  const pref = (v) => { try { if (v == null) { const s = root.localStorage.getItem('sa-calc-kb'); return s == null ? TOUCH : s === '1'; } root.localStorage.setItem('sa-calc-kb', v ? '1' : '0'); } catch (e) { /* per browser only */ } return TOUCH; };
  const fieldOpts = (f) => ({ dp: f && f.getAttribute('data-calc-dp') != null ? Number(f.getAttribute('data-calc-dp')) : null, rel: !!(f && f.getAttribute('data-calc-rel')), pct: !!(f && f.getAttribute('data-calc-pct')) });
  // on touch screens the calculator is the keyboard: number fields stop calling up the phone keyboard while it is on
  function inputMode() { return TOUCH && mode() !== 'off' && !dismissed && (mode() === 'auto' || (panel && !panel.hidden)) ? 'none' : 'decimal'; }
  function setModes() { const m = inputMode(); fields().forEach((f) => { if (f.getAttribute('inputmode') !== m) f.setAttribute('inputmode', m); }); }
  const focusCap = () => { if (!touch) cap.focus({ preventScroll: true }); };
  const kbOn = () => !!kb && !kb.hidden;

  function build() {
    panel = el('div', 'calc'); panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Calculator'); panel.hidden = true;
    const top = el('div', 'calc-top'), title = el('span', 'calc-title', 'Calculator');
    const helpBtn = el('button', 'calc-ic', '?'); helpBtn.type = 'button'; helpBtn.setAttribute('aria-label', 'What to type'); helpBtn.setAttribute('aria-expanded', 'false');
    const x = el('button', 'calc-ic', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Close calculator');
    top.append(title, helpBtn, x);
    helpEl = el('dl', 'calc-help'); helpEl.hidden = true;
    HELP.forEach(([k, d]) => { helpEl.append(el('dt', null, k), el('dd', null, d)); });
    const wrap = el('div', 'calc-edwrap');
    edEl = el('div', 'calc-ed'); edEl.setAttribute('aria-hidden', 'true');
    // a real text box over the drawing: takes the typing from a physical keyboard
    cap = el('input', 'calc-cap'); cap.type = 'text'; cap.value = SENT;
    ['autocomplete', 'autocorrect', 'autocapitalize', 'spellcheck'].forEach((a) => cap.setAttribute(a, 'off'));
    cap.setAttribute('aria-label', 'Calculation'); cap.setAttribute('aria-describedby', 'calc-res'); cap.setAttribute('enterkeyhint', 'done');
    wrap.append(edEl, cap);
    resEl = el('div', 'calc-res'); resEl.id = 'calc-res'; resEl.setAttribute('aria-live', 'polite');
    histEl = el('div', 'calc-hist');
    forEl = el('div', 'calc-for');
    panel.append(top, helpEl, wrap, resEl, histEl, forEl);
    doc.body.appendChild(panel);

    // the docked maths keyboard
    kb = el('div', 'mkb'); kb.hidden = true; kb.setAttribute('role', 'group'); kb.setAttribute('aria-label', 'Maths keyboard');
    const bar = el('div', 'mkb-bar'), tabs = el('div', 'mkb-tabs');
    Object.keys(PAGES).forEach((id) => {
      const t = el('button', 'mkb-tab'); t.type = 'button'; t.textContent = PAGES[id].name; t.setAttribute('aria-pressed', 'false');
      t.addEventListener('mousedown', (ev) => ev.preventDefault());
      t.addEventListener('click', () => { page = id; drawKeys(); });
      kbTabs[id] = t; tabs.appendChild(t);
    });
    const hide = el('button', 'mkb-hide', '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    hide.type = 'button'; hide.setAttribute('aria-label', 'Hide maths keyboard');
    hide.addEventListener('mousedown', (ev) => ev.preventDefault());
    hide.addEventListener('click', () => { showKb(false); pref(false); });
    bar.append(tabs, hide);
    kbBody = el('div', 'mkb-keys');
    kb.append(bar, kbBody);
    doc.body.appendChild(kb);

    // floating keyboard button: brings the maths keyboard back
    kbFab = el('button', 'mkb-fab', '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 9.5h1M9.5 9.5h1M13 9.5h1M16.5 9.5h1M6 12.5h1M9.5 12.5h1M13 12.5h1M16.5 12.5h1M8 15.5h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>');
    kbFab.type = 'button'; kbFab.hidden = true; kbFab.setAttribute('aria-label', 'Maths keyboard');
    kbFab.addEventListener('mousedown', (ev) => ev.preventDefault());
    kbFab.addEventListener('click', () => { showKb(true); pref(true); focusCap(); });
    doc.body.appendChild(kbFab);
    drawKeys();

    fab = el('button', 'calc-fab', '<span aria-hidden="true">±×</span> Calculator'); fab.type = 'button'; fab.hidden = true; fab.setAttribute('aria-label', 'Open calculator');
    doc.body.appendChild(fab);

    x.addEventListener('click', () => { close(); if (live(target)) target.focus(); });
    helpBtn.addEventListener('click', () => { helpEl.hidden = !helpEl.hidden; helpBtn.setAttribute('aria-expanded', String(!helpEl.hidden)); pad(); });
    fab.addEventListener('click', () => { dismissed = false; setModes(); if (TOUCH) { const a = doc.activeElement; if (a && a.matches && a.matches('input[data-calc]')) a.blur(); open(false); } else open(true); });
    cap.addEventListener('keydown', onKey);
    cap.addEventListener('input', onInput);
    cap.addEventListener('paste', (ev) => { const t = (ev.clipboardData || root.clipboardData).getData('text'); ev.preventDefault(); if (fresh) { E.clear(); fresh = false; } E.type(t); edited(); });
    cap.addEventListener('click', (ev) => { place(ev.clientX, ev.clientY); });
    cap.addEventListener('focus', () => { touch = false; panel.classList.add('focus'); draw(); });
    cap.addEventListener('blur', () => { panel.classList.remove('focus'); draw(); });
  }
  function drawKeys() {
    const P = PAGES[page];
    kbBody.innerHTML = ''; kbBody.className = 'mkb-keys mkb-' + page; kbBody.style.gridTemplateColumns = 'repeat(' + P.cols + ', minmax(0, 1fr))';
    Object.keys(kbTabs).forEach((id) => { kbTabs[id].classList.toggle('on', id === page); kbTabs[id].setAttribute('aria-pressed', String(id === page)); });
    P.rows.forEach((row) => row.forEach((cell) => {
      const [id, span] = Array.isArray(cell) ? cell : [cell, 1], [act, label, aria, cls] = K[id];
      const b = el('button', 'ck' + (cls ? ' ck-' + cls : ''), label); b.type = 'button'; b.setAttribute('aria-label', aria || String(id));
      if (span > 1) b.style.gridColumn = 'span ' + span;
      b.addEventListener('pointerdown', (ev) => { touch = ev.pointerType === 'touch'; });
      b.addEventListener('mousedown', (ev) => ev.preventDefault()); // keep the caret where it is
      b.addEventListener('click', () => { if (act === 'enter') enterKey(); else (Array.isArray(act) ? act : [act]).forEach((a) => press(a)); focusCap(); });
      kbBody.appendChild(b);
    }));
  }
  function showKb(on) {
    if (!kb) return;
    kb.hidden = !on; panel.classList.toggle('with-kb', !!on);
    // with the maths keyboard up on a touch screen, tapping the calculation must not bring up the phone keyboard as well
    cap.setAttribute('inputmode', TOUCH && on ? 'none' : 'text');
    pad();
  }
  function enterKey() { // Enter: keep the result as Ans; again (or on an empty calculation) check the answer
    if (fresh || E.isEmpty()) { if (target && doc.body.contains(target)) target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); } else equals();
  }
  // a tap on the text box: find the drawn symbol under it and put the cursor there
  function place(x, y) {
    const under = doc.elementsFromPoint ? doc.elementsFromPoint(x, y) : [];
    for (const u of under) {
      const s = spots.get(u); if (!s) continue;
      if (s.item) { const b = u.getBoundingClientRect(); E.setCursor(s.row, s.i + (x > b.left + b.width / 2 ? 1 : 0)); } else E.setCursor(s.row, s.row.it.length);
      fresh = false; draw(); return;
    }
    E.setCursor(E.root, E.root.it.length); draw();
  }

  const NAV = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', Home: 'home', End: 'end', Backspace: 'back', Delete: 'del' };
  function onKey(ev) {
    if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.isComposing) return;
    let k = ev.key;
    if (k === 'Escape') { ev.preventDefault(); if (live(target)) target.focus(); else close(); return; }
    if (k === 'Enter') { ev.preventDefault(); enterKey(); return; } // first Enter keeps the result as Ans; Enter again checks the answer
    else if (NAV[k]) k = NAV[k];
    else if (k.length !== 1) return; // phone keyboards send 'Unidentified': the input event below takes it
    else if (/[A-Z]/.test(k)) k = k.toLowerCase();
    ev.preventDefault();
    if (k !== ' ') press(k);
  }
  function onInput() {
    const v = cap.value;
    if (v.indexOf(SENT) < 0) press('back');
    else for (const ch of v.replace(SENT, '')) if (ch !== ' ') press(/[A-Z]/.test(ch) ? ch.toLowerCase() : ch);
    cap.value = SENT; try { cap.setSelectionRange(1, 1); } catch (e) { /* ignore */ }
  }
  // after =, an operator carries on from the result; anything else starts a new calculation
  function press(k) {
    if (k === '=') { equals(); return true; }
    if (k === 'clear') { E.clear(); fresh = false; edited(); return true; }
    const nav = /^(left|right|up|down|home|end)$/.test(k);
    if (fresh && !nav) {
      const carry = /^[+\-*:\/^!%−×÷]$/.test(k);
      E.clear();
      if (carry && ans != null) E.key('ans');
    }
    fresh = false;
    const done = E.key(k);
    if (done) { if (nav) draw(); else edited(); }
    return done;
  }
  function equals() {
    const r = evaluate(E.root, { ans });
    if (!r.ok) { resEl.className = 'calc-res err'; resEl.textContent = r.inc ? 'Not finished yet' : r.msg; return; }
    if (fresh) return;
    ans = r.v;
    hist.unshift({ t: lin(E.root), v: r.v }); hist = hist.slice(0, 5);
    fresh = true; draw();
  }
  // every change to the calculation goes straight into the answer field
  function edited() {
    draw();
    const r = evaluate(E.root, { ans });
    if (!r.ok || E.isEmpty()) return;
    if (!live(target)) pickTarget();
    if (!live(target)) return;
    const s = output(r.v, fieldOpts(target));
    if (target.value === s) return;
    target.value = s;
    target.dispatchEvent(new Event('input', { bubbles: true }));
  }
  function pickTarget() { target = fields().find((f) => !f.disabled) || null; }
  function label(f) { return (f && (f.getAttribute('aria-label') || f.getAttribute('placeholder'))) || 'answer'; }

  /* ---------- drawing ---------- */
  function caret() { return el('span', 'cx-caret'); }
  function rowEl(r, cls) {
    const box = el('span', 'cx-row' + (cls ? ' ' + cls : ''));
    spots.set(box, { row: r });
    const here = E.cur.row === r;
    if (!r.it.length) { box.classList.add('cx-empty'); if (here) box.appendChild(caret()); }
    r.it.forEach((n, i) => {
      if (here && E.cur.i === i) box.appendChild(caret());
      const ne = itemEl(n);
      spots.set(ne, { row: r, i, item: true });
      box.appendChild(ne);
    });
    if (here && r.it.length && E.cur.i === r.it.length) box.appendChild(caret());
    return box;
  }
  function itemEl(n) {
    if (!isS(n)) {
      const v = n.v, c = OPS.includes(v) ? 'cx-op' : /^[0-9.]$/.test(v) ? 'cx-d' : v === 'π' || v === 'e' || v === 'Ans' ? 'cx-k' : /^[a-z]$/.test(v) ? 'cx-l' : 'cx-p';
      const s = el('span', c); s.textContent = v; return s;
    }
    const w = el('span', 'cx-s cx-' + n.k);
    if (n.k === 'frac') w.append(rowEl(n.r[0], 'cx-num'), rowEl(n.r[1], 'cx-den'));
    else if (n.k === 'pow') w.append(rowEl(n.r[0], 'cx-sup'));
    else if (n.k === 'sqrt') w.append(el('span', 'cx-rad', '√'), rowEl(n.r[0], 'cx-under'));
    else if (n.k === 'root') w.append(rowEl(n.r[0], 'cx-idx'), el('span', 'cx-rad', '√'), rowEl(n.r[1], 'cx-under'));
    else if (n.k === 'ln') w.append(el('span', 'cx-f', 'ln'), el('span', 'cx-par', '('), rowEl(n.r[0]), el('span', 'cx-par', ')'));
    else if (n.k === 'log') {
      const base = rowEl(n.r[0], 'cx-sub');
      if (!n.r[0].it.length && E.cur.row !== n.r[0]) base.classList.add('cx-ghost'); // empty base = 10, shown only while editing it
      w.append(el('span', 'cx-f', 'log'), base, el('span', 'cx-par', '('), rowEl(n.r[1]), el('span', 'cx-par', ')'));
    } else if (n.k === 'ncr') {
      const st = el('span', 'cx-stack'); st.append(rowEl(n.r[0]), rowEl(n.r[1]));
      w.append(el('span', 'cx-bpar', '('), st, el('span', 'cx-bpar', ')'));
    }
    return w;
  }
  function draw() {
    if (!panel) return;
    edEl.innerHTML = '';
    if (E.isEmpty() && !panel.classList.contains('focus')) edEl.appendChild(el('span', 'cx-hint', 'Type a calculation'));
    edEl.appendChild(rowEl(E.root, 'cx-root'));
    const c = edEl.querySelector('.cx-caret');
    if (c) { // keep the caret in view on long formulas
      const er = edEl.getBoundingClientRect(), cr = c.getBoundingClientRect();
      if (cr.right > er.right - 12) edEl.scrollLeft += cr.right - er.right + 24;
      else if (cr.left < er.left + 12) edEl.scrollLeft -= er.left - cr.left + 24;
    }
    const r = evaluate(E.root, { ans });
    resEl.className = 'calc-res' + (fresh ? ' done' : '') + (!r.ok && !r.inc ? ' err' : '');
    resEl.textContent = r.ok ? '= ' + show(r.v) : r.inc ? '' : r.msg;
    if (r.ok && live(target)) { // what the field receives, when rounding or % changes it
      const o = fieldOpts(target), out = output(r.v, o);
      if (show(Number(out)) !== show(r.v) || o.pct) resEl.appendChild(el('span', 'calc-out', '→ ' + out + (o.pct ? ' %' : '')));
    }
    histEl.innerHTML = '';
    hist.forEach((x) => {
      const b = el('button', 'calc-h'); b.type = 'button'; b.title = 'Insert this result';
      b.append(el('span', 'calc-ht'), el('span', 'calc-hv'));
      b.firstChild.textContent = x.t; b.lastChild.textContent = '= ' + show(x.v);
      b.addEventListener('pointerdown', (ev) => { touch = ev.pointerType === 'touch'; });
      b.addEventListener('mousedown', (ev) => ev.preventDefault());
      b.addEventListener('click', () => { if (fresh) { E.clear(); fresh = false; } E.type(plain(x.v)); edited(); focusCap(); });
      histEl.appendChild(b);
    });
    histEl.hidden = !hist.length;
    if (!live(target)) pickTarget();
    forEl.textContent = live(target) ? 'Writes to: ' + label(target) : 'No open answer field';
    pad();
  }

  /* ---------- open, close, follow the page ---------- */
  /* layout: the keyboard sits on the bottom edge; the calculator sits on top of it (phones: full width, desktop: bottom
     right); the floating keyboard button sits beside the calculator when the keyboard is down; the page gets room below */
  const narrow = () => !!(root.matchMedia && root.matchMedia('(max-width: 600px)').matches);
  function pad() {
    if (!panel || panel.hidden) { doc.body.style.paddingBottom = ''; if (kbFab) kbFab.hidden = true; return; }
    const kh = kbOn() ? kb.offsetHeight : 0, ph = panel.offsetHeight, n = narrow();
    panel.style.bottom = (n ? kh : kh ? kh + 12 : 16) + 'px';
    kbFab.hidden = kbOn();
    if (n) { kbFab.style.right = '12px'; kbFab.style.bottom = (ph + kh + 10) + 'px'; }
    else { kbFab.style.right = (panel.offsetWidth + 28) + 'px'; kbFab.style.bottom = '16px'; }
    doc.body.style.paddingBottom = (ph + kh + 24) + 'px';
  }
  function open(focusEd) {
    if (!panel) build();
    if (mode() === 'off') return;
    const was = panel.hidden;
    panel.hidden = false; fab.hidden = true; setModes();
    if (was) showKb(pref());
    draw();
    if (focusEd) cap.focus({ preventScroll: true });
    root.requestAnimationFrame(inView);
  }
  function inView() { // keep the answer field visible above the panel
    if (!panel || panel.hidden || !live(target)) return;
    const tr = target.getBoundingClientRect(), pr = panel.getBoundingClientRect();
    if (tr.bottom > pr.top - 8 && tr.right > pr.left) root.scrollBy(0, Math.min(tr.top - 72, tr.bottom - pr.top + 24));
  }
  function close() { if (!panel) return; panel.hidden = true; kb.hidden = true; dismissed = true; setModes(); pad(); sync(); }
  function sync() {
    const m = mode(), any = fields().some((f) => !f.disabled);
    if (!panel) { if (m === 'off' || !any) return; build(); }
    if (m === 'off' || !any) { panel.hidden = true; kb.hidden = true; fab.hidden = true; pad(); return; }
    if (!live(target)) pickTarget();
    setModes();
    if (panel.hidden) fab.hidden = false; else draw();
  }
  SA.calc = { open: () => { dismissed = false; open(!TOUCH); }, close, sync, editor: E, inputMode };

  function init() {
    doc.addEventListener('focusin', (ev) => {
      const t = ev.target;
      if (!t || !t.matches || !t.matches('input[data-calc]')) return;
      const isNew = t !== target;
      if (isNew) { target = t; E.clear(); fresh = false; } // a new field starts a new calculation
      const m = mode();
      if (m === 'off') return;
      if (m === 'auto' && !dismissed) open(false); else sync();
      if (panel && !panel.hidden) {
        draw(); root.requestAnimationFrame(inView);
        // desktop: a new field sends the typing to the calculator (clicking the field again lets you type there)
        if (isNew && !TOUCH) cap.focus({ preventScroll: true });
      }
    });
    root.addEventListener('hashchange', () => { dismissed = false; });
    let queued = false;
    new root.MutationObserver(() => { if (queued) return; queued = true; root.requestAnimationFrame(() => { queued = false; sync(); }); })
      .observe(doc.getElementById('app') || doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled'] });
    root.addEventListener('resize', pad);
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
})(typeof globalThis !== 'undefined' ? globalThis : this);
