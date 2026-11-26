/* Securities Academy - calculator. Clicking a number field opens a one-line input under it, in the manner of a
   search bar: type the calculation as text (1.26^(1/8) - 1, ln(2)/0.05, ncr(10,3)); the formula is read back typeset
   under the line with its value, and the value goes straight into the field above (rounded to the field's decimals,
   times 100 for a % field). Function names are suggested while typing. Beside the line: symbols, a short guide, close.
   On touch screens a maths keyboard docks on the bottom edge instead of the phone keyboard.
   Engine (SA.calcEngine) is pure and tested in tools/smoke-calc.js. Setting: settings.calc = 'auto' | 'off'
   ('button' from older saves counts as 'auto'). */
(function (root) {
  'use strict';
  const SA = root.SA || (root.SA = {});

  /* ---------- the names a calculation can use ---------- */
  // [name, what it is, example, text inserted when picked (| marks the caret), arguments]
  const NAMES = [
    ['ln', 'natural log', 'ln(2)', 'ln(|)', 1],
    ['log', 'log base 10', 'log(1000)', 'log(|)', 1],
    ['log_b', 'log to a base', 'log_2(8)', 'log_|', 1],
    ['exp', 'e to the power', 'exp(0.05)', 'exp(|)', 1],
    ['sqrt', 'square root', 'sqrt(2)', 'sqrt(|)', 1],
    ['root', 'nth root', 'root(3, 27)', 'root(|, )', 2],
    ['ncr', 'combinations, n choose r', 'ncr(10, 3)', 'ncr(|, )', 2],
    ['pi', 'π', '2pi', 'pi', 0],
    ['e', 'Euler’s number', 'e^2', 'e', 0],
    ['ans', 'last result', 'ans*2', 'ans', 0],
  ];
  const FUNCS = { ln: 1, log: 1, exp: 1, sqrt: 1, root: 2, ncr: 2 };
  const CONSTS = { pi: 1, e: 1, ans: 1 };

  /* ---------- lexer ---------- */
  const fail = (msg) => ({ msg });
  const INC = { inc: true };
  const BUILTIN = ['sqrt', 'root', 'ncr', 'exp', 'log', 'ans', 'ln', 'pi', 'e'];
  function lex(src, vars) {
    const names = BUILTIN.concat(Object.keys(vars || {})).sort((a, b) => b.length - a.length); // longest name first
    const s = String(src == null ? '' : src).replace(/\*\*/g, '^').replace(/[×·]/g, '*').replace(/[÷:]/g, '/').replace(/[−–]/g, '-').replace(/π/g, 'pi').replace(/√/g, 'sqrt');
    const out = [], two = []; // stack: does this bracket belong to a two-argument function (its commas separate)?
    const dec = (j) => s[j] === ',' && !two[two.length - 1] && /[0-9]/.test(s[j + 1] || '') && /[0-9]/.test(s[j - 1] || ''); // 3,25 = 3.25
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (/[0-9.]/.test(c)) {
        let j = i, t = '';
        while (j < s.length && (/[0-9.]/.test(s[j]) || dec(j))) { t += s[j] === ',' ? '.' : s[j]; j++; }
        if ((t.match(/\./g) || []).length > 1 || t === '.') throw fail('Check the number ' + s.slice(i, j));
        out.push({ t: 'num', v: Number(t), s: t }); i = j; continue;
      }
      if (/[a-zA-Z]/.test(c)) {
        let j = i; while (j < s.length && /[a-zA-Z]/.test(s[j])) j++;
        const word = s.slice(i, j).toLowerCase(); i = j;
        // a run of letters is split into known names where it can be (2qpi = 2·q·π, pie = π·e); a run that cannot be
        // split is a name of its own (pv, ytm)
        const parts = []; let k = 0;
        while (k < word.length) { const nm = names.find((n) => word.startsWith(n, k)); if (!nm) break; parts.push(nm); k += nm.length; }
        if (k < word.length) { parts.length = 0; parts.push(word); }
        for (let q = 0; q < parts.length; q++) {
          const nm = parts[q];
          if (nm === 'log' && q === parts.length - 1 && s[i] === '_') { // log_2(8), log_e(x), log_b(x), log_(1/8)(64), log_{1/8}(64)
            i++; let b;
            if (s[i] === '(' || s[i] === '{') { // any expression as the base, in brackets
              const open = s[i], close = open === '(' ? ')' : '}'; let depth = 0, j2 = i;
              for (; j2 < s.length; j2++) { if (s[j2] === open) depth++; else if (s[j2] === close && !--depth) break; }
              if (j2 >= s.length) throw INC;
              b = s.slice(i + 1, j2); i = j2 + 1;
            } else { let j2 = i; while (j2 < s.length && /[0-9.a-zA-Z]/.test(s[j2])) j2++; b = s.slice(i, j2); i = j2; }
            if (!b.trim()) throw (i >= s.length ? INC : fail('Put the base after log_, as in log_2(8) or log_(1/8)(64)'));
            out.push({ t: 'id', v: 'log', base: b }); continue;
          }
          out.push(BUILTIN.includes(nm) ? { t: 'id', v: nm } : { t: 'var', v: nm });
        }
        continue;
      }
      if ('+-*/^'.includes(c)) { out.push({ t: 'op', v: c }); i++; continue; }
      if (c === '(' || c === '[') { const prev = out[out.length - 1]; two.push(!!(prev && prev.t === 'id' && FUNCS[prev.v] === 2)); out.push({ t: 'lp' }); i++; continue; }
      if (c === ')' || c === ']') { two.pop(); out.push({ t: 'rp' }); i++; continue; }
      if (c === ',' || c === ';') { out.push({ t: 'comma' }); i++; continue; }
      if (c === '!' || c === '%') { out.push({ t: 'post', v: c }); i++; continue; }
      throw fail('Unknown symbol “' + c + '”');
    }
    return out;
  }

  /* ---------- parser: text -> tree ---------- */
  // nodes: num {v,s} | const {v} | var {v} | neg {a} | bin {op,a,b,imp} | pow {a,b} | post {op,a} | fn {f,args,base (a tree)} | par {a}
  function parse(src, vars) {
    const t = lex(src, vars);
    if (!t.length) throw INC;
    let p = 0;
    const peek = () => t[p];
    const starts = (x) => x && (x.t === 'num' || x.t === 'id' || x.t === 'var' || x.t === 'lp');
    function add() {
      let a = mul();
      while (peek() && peek().t === 'op' && (peek().v === '+' || peek().v === '-')) { const op = t[p++].v; a = { k: 'bin', op, a, b: mul() }; }
      return a;
    }
    function mul() {
      let a = unary();
      for (;;) {
        const x = peek();
        if (x && x.t === 'op' && (x.v === '*' || x.v === '/')) { p++; a = { k: 'bin', op: x.v, a, b: unary() }; }
        else if (starts(x)) a = { k: 'bin', op: '*', a, b: unary(), imp: true }; // 2pi, 3sqrt(2), (1+r)(1+s)
        else return a;
      }
    }
    function unary() {
      const x = peek();
      if (x && x.t === 'op' && x.v === '-') { p++; return { k: 'neg', a: unary() }; }
      if (x && x.t === 'op' && x.v === '+') { p++; return unary(); }
      return pow();
    }
    function pow() {
      const a = post(primary());
      if (peek() && peek().t === 'op' && peek().v === '^') { p++; return post({ k: 'pow', a, b: unary() }); } // right-associative
      return a;
    }
    function post(a) { while (peek() && peek().t === 'post') a = { k: 'post', op: t[p++].v, a }; return a; }
    function primary() {
      const x = t[p];
      if (!x) throw INC;
      p++;
      if (x.t === 'num') return { k: 'num', v: x.v, s: x.s };
      if (x.t === 'var') return { k: 'var', v: x.v };
      if (x.t === 'lp') { const a = add(); if (peek() && peek().t === 'rp') p++; else if (peek()) throw fail('Expected )'); return { k: 'par', a }; } // a missing ) closes at the end
      if (x.t === 'id') {
        if (CONSTS[x.v]) return { k: 'const', v: x.v };
        const n = FUNCS[x.v];
        if (peek() && peek().t === 'lp') {
          p++; const args = [];
          if (!peek()) throw INC;
          if (peek().t !== 'rp') { args.push(add()); while (peek() && peek().t === 'comma') { p++; args.push(add()); } }
          let closed = false;
          if (peek() && peek().t === 'rp') { p++; closed = true; } else if (peek()) throw fail('Expected )');
          if (args.length < n) throw (!closed ? INC : fail(x.v + ' needs ' + n + ' numbers, separated by a comma'));
          if (args.length > n) throw fail(x.v + ' takes ' + n + (n === 1 ? ' number' : ' numbers'));
          return { k: 'fn', f: x.v, args, base: x.base != null ? parse(x.base, vars) : null };
        }
        if (n === 2) throw (peek() ? fail(x.v + '(…, …) needs brackets') : INC);
        return { k: 'fn', f: x.v, args: [post(primary())], base: x.base != null ? parse(x.base, vars) : null }; // sqrt 2, ln 5
      }
      if (x.t === 'rp') throw fail('A ) has no matching (');
      if (x.t === 'comma') throw fail('A comma belongs inside root(…, …) or ncr(…, …)');
      throw INC; // an operator where a number should be: still typing
    }
    const tree = add();
    if (p < t.length) throw (t[p].t === 'rp' ? fail('A ) has no matching (') : fail('Check the input near “' + (t[p].v || t[p].t) + '”'));
    return tree;
  }

  /* ---------- evaluation ---------- */
  const isInt = (x) => Math.abs(x - Math.round(x)) < 1e-9;
  function fact(x) {
    if (x < 0 || !isInt(x)) throw fail('n! needs a whole number, 0 or more');
    if (x > 170) throw fail('Too large');
    let f = 1; for (let i = 2; i <= Math.round(x); i++) f *= i; return f;
  }
  function ev(n, ctx) {
    switch (n.k) {
      case 'num': return n.v;
      case 'par': return ev(n.a, ctx);
      case 'var': if (!ctx.vars || ctx.vars[n.v] == null) throw fail(n.v + ' has no value'); return ctx.vars[n.v];
      case 'neg': return -ev(n.a, ctx);
      case 'const': if (n.v === 'pi') return Math.PI; if (n.v === 'e') return Math.E; if (ctx.ans == null) throw fail('ans is the last result: there is none yet'); return ctx.ans;
      case 'post': { const a = ev(n.a, ctx); return n.op === '!' ? fact(a) : a / 100; }
      case 'pow': { const a = ev(n.a, ctx), b = ev(n.b, ctx), v = Math.pow(a, b); if (isNaN(v)) throw fail(a < 0 ? 'A negative number to a fractional power is undefined' : 'Undefined power'); return v; }
      case 'bin': {
        const a = ev(n.a, ctx), b = ev(n.b, ctx);
        if (n.op === '+') return a + b; if (n.op === '-') return a - b; if (n.op === '*') return a * b;
        if (b === 0) throw fail('Division by zero'); return a / b;
      }
      case 'fn': {
        const A = n.args.map((x) => ev(x, ctx)), x = A[0];
        if (n.f === 'sqrt') { if (x < 0) throw fail('Square root of a negative number'); return Math.sqrt(x); }
        if (n.f === 'exp') return Math.exp(x);
        if (n.f === 'ln') { if (x <= 0) throw fail('ln needs a number above 0'); return Math.log(x); }
        if (n.f === 'log') {
          if (x <= 0) throw fail('log needs a number above 0');
          const b = n.base ? ev(n.base, ctx) : 10; if (b <= 0 || b === 1) throw fail('A log base must be above 0 and not 1');
          return b === 10 ? Math.log10(x) : Math.log(x) / Math.log(b);
        }
        if (n.f === 'root') {
          const k = A[0], y = A[1]; if (k === 0) throw fail('A 0th root is undefined');
          if (y < 0) { if (isInt(k) && Math.round(k) % 2) return -Math.pow(-y, 1 / k); throw fail('Even root of a negative number'); }
          return Math.pow(y, 1 / k);
        }
        if (n.f === 'ncr') {
          const N = A[0], K = A[1];
          if (!isInt(N) || !isInt(K) || N < 0 || K < 0) throw fail('ncr needs whole numbers');
          if (K > N) return 0;
          let r = 1; const k = Math.min(Math.round(K), Math.round(N - K));
          for (let i = 1; i <= k; i++) r = r * (Math.round(N) - k + i) / i;
          return Math.round(r);
        }
      }
    }
    throw INC;
  }
  /* variables: "q = 20/4" defines q (a name of letters, not one of the built-in names); later lines use it, as in 20q */
  function assignment(src) {
    const m = /^\s*([a-zA-Z]+)\s*=(.*)$/.exec(String(src == null ? '' : src));
    if (!m) return null;
    const name = m[1].toLowerCase();
    if (BUILTIN.includes(name)) throw fail('“' + name + '” is a built-in name: pick another');
    return { name, expr: m[2] };
  }
  // -> { ok, v, name? } | { ok: false, inc: true } (still typing) | { ok: false, msg }; ctx = { ans, vars }
  function evaluate(src, ctx) {
    ctx = ctx || {};
    try {
      const a = assignment(src), vars = ctx.vars || {}; // in q = q + 1 the right side uses the earlier q
      const v = ev(parse(a ? a.expr : src, vars), Object.assign({}, ctx, { vars }));
      if (!isFinite(v)) return { ok: false, msg: 'Too large' };
      const r = { ok: true, v: Math.abs(v) < 1e-13 ? 0 : v };
      if (a) r.name = a.name;
      return r;
    } catch (e) {
      if (e && e.inc) return { ok: false, inc: true };
      if (e && e.msg) return { ok: false, msg: e.msg };
      throw e;
    }
  }

  /* a calculation of several lines, worked out together like a small worksheet:
     - a line with "=" is an equation: q = 3 + 5 defines q; 2x + y = 3 is solved together with the other equations;
     - the one line without "=" is the answer, and fills the answer field (a second such line is an error);
     - equations are taken in any order; "name = expression" lines are worked out directly, the rest are solved
       numerically for their unknowns (linear systems exactly, others such as a yield by Newton's method);
     - too few equations, equations that contradict each other, and impossible values (5/x with x = 0) are errors.
     -> { lines: [{ src, kind: 'empty' | 'eq' | 'expr', r, tex }], vars, solved: [names], main, value } */
  const vlist = (n, out) => { if (!n || typeof n !== 'object') return out; if (n.k === 'var') out.add(n.v); ['a', 'b', 'base'].forEach((k) => vlist(n[k], out)); (n.args || []).forEach((x) => vlist(x, out)); return out; };
  const fmtList = (xs) => xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1];
  function solveSystem(eqs, unknown, vars) { // Gauss-Newton with a numerical Jacobian; -> values, or { msg }
    const n = unknown.length, at = (x) => { const v = Object.assign({}, vars); unknown.forEach((u, i) => { v[u] = x[i]; }); return v; };
    const F = (x) => { try { const v = at(x); return eqs.map((L) => ev(L.a, { vars: v }) - ev(L.b, { vars: v })); } catch (e) { return null; } };
    const norm = (r) => (r ? Math.sqrt(r.reduce((a, b) => a + b * b, 0)) : Infinity);
    let best = null;
    for (const s0 of [1, 0.1, 0.5, 2, 10, -1, 0.01, 100]) {
      let x = Array(n).fill(s0), r = F(x);
      if (!r || !r.every(isFinite)) continue;
      for (let it = 0; it < 100 && norm(r) > 1e-12; it++) {
        const J = eqs.map(() => Array(n).fill(0));
        for (let j = 0; j < n; j++) { const h = 1e-6 * Math.max(1, Math.abs(x[j])), xp = x.slice(), xm = x.slice(); xp[j] += h; xm[j] -= h; const a = F(xp), b = F(xm); if (!a || !b) { r = null; break; } for (let i = 0; i < eqs.length; i++) J[i][j] = (a[i] - b[i]) / (2 * h); }
        if (!r) break;
        // normal equations (J'J) dx = -J'r, by Gaussian elimination with partial pivoting
        const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => J.reduce((acc, row) => acc + row[i] * row[j], 0)));
        const g = Array.from({ length: n }, (_, i) => -J.reduce((acc, row, k) => acc + row[i] * r[k], 0));
        const scale = Math.max(1e-300, ...A.map((row) => Math.max(...row.map(Math.abs))));
        let rank = n;
        for (let c = 0; c < n; c++) {
          let piv = c; for (let i = c + 1; i < n; i++) if (Math.abs(A[i][c]) > Math.abs(A[piv][c])) piv = i;
          if (Math.abs(A[piv][c]) < 1e-12 * scale) { rank = c; break; }
          [A[c], A[piv]] = [A[piv], A[c]]; [g[c], g[piv]] = [g[piv], g[c]];
          for (let i = c + 1; i < n; i++) { const f = A[i][c] / A[c][c]; for (let j = c; j < n; j++) A[i][j] -= f * A[c][j]; g[i] -= f * g[c]; }
        }
        if (rank < n) break;
        const dx = Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) { let t = g[i]; for (let j = i + 1; j < n; j++) t -= A[i][j] * dx[j]; dx[i] = t / A[i][i]; }
        let step = 1, x2, r2;
        for (let k = 0; k < 30; k++, step /= 2) { x2 = x.map((v, i) => v + step * dx[i]); r2 = F(x2); if (r2 && r2.every(isFinite) && norm(r2) < norm(r)) break; r2 = null; }
        if (!r2) break;
        x = x2; r = r2;
      }
      if (r && norm(r) <= 1e-9 * Math.max(1, ...x.map(Math.abs))) { best = x; break; }
    }
    if (!best) return { msg: (n > 1 ? 'No values of ' + fmtList(unknown) + ' make' : 'No value of ' + unknown[0] + ' makes') + ' these equations true' };
    // a solution that is one of many (a = b, b = a) does not fix the unknowns
    if (rankAt(best) < n) return { msg: 'These equations do not fix ' + fmtList(unknown) + ': there are many solutions' };
    return best;
    function rankAt(x) {
      const r0 = F(x); if (!r0) return 0;
      const M = eqs.map(() => Array(n).fill(0));
      for (let j = 0; j < n; j++) { const h = 1e-6 * Math.max(1, Math.abs(x[j])), xp = x.slice(), xm = x.slice(); xp[j] += h; xm[j] -= h; const a = F(xp), b = F(xm); if (!a || !b) return 0; for (let i = 0; i < eqs.length; i++) M[i][j] = (a[i] - b[i]) / (2 * h); }
      const big = Math.max(1e-300, ...M.map((row) => Math.max(...row.map(Math.abs))));
      let rank = 0;
      for (let c = 0; c < n && rank < M.length; c++) {
        let piv = rank; for (let i = rank + 1; i < M.length; i++) if (Math.abs(M[i][c]) > Math.abs(M[piv][c])) piv = i;
        if (Math.abs(M[piv][c]) < 1e-9 * big) continue;
        [M[rank], M[piv]] = [M[piv], M[rank]];
        for (let i = rank + 1; i < M.length; i++) { const f = M[i][c] / M[rank][c]; for (let j = c; j < n; j++) M[i][j] -= f * M[rank][j]; }
        rank++;
      }
      return rank;
    }
  }
  function sheet(text, ctx) {
    ctx = ctx || {};
    const lines = String(text == null ? '' : text).split('\n').map((src) => ({ src }));
    // names written on the left of "name = ..." may be longer than a letter (pv, rate); every other letter is its own name
    const declared = {};
    lines.forEach((L) => { const m = /^\s*([a-zA-Z]+)\s*=[^=]/.exec(L.src + ' '); if (m && !BUILTIN.includes(m[1].toLowerCase())) declared[m[1].toLowerCase()] = 0; });
    lines.forEach((L) => {
      const s = L.src.trim();
      if (!s) { L.kind = 'empty'; return; }
      const parts = s.split('=');
      if (parts.length > 2) { L.kind = 'eq'; L.r = { ok: false, msg: 'One = per line' }; return; }
      try {
        if (parts.length === 2) {
          L.kind = 'eq';
          const left = parts[0].trim();
          if (BUILTIN.includes(left.toLowerCase())) throw fail('“' + left + '” is a built-in name: pick another');
          L.a = parse(parts[0], declared); L.b = parse(parts[1], declared);
          L.names = [...vlist(L.b, vlist(L.a, new Set()))];
          if (L.a.k === 'var') L.name = L.a.v;
          L.tex = tex(L.a) + ' = ' + tex(L.b);
        } else { L.kind = 'expr'; L.t = parse(s, declared); L.names = [...vlist(L.t, new Set())]; L.tex = tex(L.t); }
      } catch (e) { L.r = e && e.inc ? { ok: false, inc: true } : { ok: false, msg: (e && e.msg) || 'Check this line' }; }
    });
    const vars = {}, solved = [];
    const evalIn = (t) => { try { const v = ev(t, { ans: ctx.ans, vars }); return isFinite(v) ? { ok: true, v: Math.abs(v) < 1e-13 ? 0 : v } : { ok: false, msg: 'Too large' }; } catch (e) { return e && e.msg ? { ok: false, msg: e.msg } : { ok: false, inc: true }; } };
    const eqs = lines.filter((L) => L.kind === 'eq' && !L.r);
    // 1. "name = expression" with everything on the right already known: work it out directly, repeating until stuck
    for (let moved = true; moved;) {
      moved = false;
      for (const L of eqs) {
        if (L.done || !L.name || vars[L.name] != null || L.names.some((v) => v !== L.name && vars[v] == null) || vlist(L.b, new Set()).has(L.name)) continue;
        L.r = evalIn(L.b); L.done = true; moved = true;
        if (L.r.ok) vars[L.name] = L.r.v;
      }
    }
    // 2. everything else is solved together
    const rest = eqs.filter((L) => !L.done), unknown = [...new Set([].concat(...rest.map((L) => L.names)).filter((v) => vars[v] == null))];
    if (rest.length && !unknown.length) {
      rest.forEach((L) => { const a = evalIn(L.a), b = evalIn(L.b); L.r = !a.ok ? a : !b.ok ? b : Math.abs(a.v - b.v) <= 1e-9 * Math.max(1, Math.abs(a.v), Math.abs(b.v)) ? { ok: true, check: true } : { ok: false, msg: 'Does not hold: the left side is ' + show(a.v, 7) + ', the right side ' + show(b.v, 7) }; });
    } else if (rest.length) {
      if (rest.length < unknown.length) rest.forEach((L) => { L.r = { ok: false, msg: 'Needs ' + (unknown.length - rest.length) + ' more equation' + (unknown.length - rest.length > 1 ? 's' : '') + ' to find ' + fmtList(unknown) }; });
      else {
        const x = solveSystem(rest, unknown, vars);
        if (x.msg) rest.forEach((L) => { L.r = { ok: false, msg: x.msg }; });
        else { unknown.forEach((u, i) => { vars[u] = Math.abs(x[i]) < 1e-13 ? 0 : x[i]; solved.push(u); }); rest.forEach((L) => { L.r = { ok: true, check: true }; }); }
      }
    }
    // 3. the answer line
    const answers = lines.filter((L) => L.kind === 'expr');
    let main = -1;
    if (answers.length > 1) answers.forEach((L) => { L.r = { ok: false, msg: 'Only one line can give the answer: turn the others into name = …' }; });
    const broken = lines.some((L) => L.kind === 'eq' && L.r && !L.r.ok && !L.r.inc);
    lines.forEach((L, i) => {
      if (L.kind !== 'expr' || L.r) return;
      main = i;
      const missing = L.names.filter((v) => vars[v] == null);
      L.r = broken ? { ok: false, msg: 'One of the equations has a problem' } : missing.length ? { ok: false, msg: fmtList(missing) + (missing.length > 1 ? ' have' : ' has') + ' no value' } : evalIn(L.t);
    });
    return { lines, vars, solved, main, value: main >= 0 ? lines[main].r : answers.length > 1 ? { ok: false, msg: 'more than one answer line' } : null };
  }

  /* ---------- typeset form (TeX for KaTeX) ---------- */
  const strip = (n) => (n.k === 'par' ? n.a : n);
  const atom = (n) => n.k === 'num' || n.k === 'const' || n.k === 'var' || n.k === 'par' || (n.k === 'fn' && n.f !== 'exp');
  const wrap = (n) => (atom(n) ? tex(n) : '\\left(' + tex(n) + '\\right)');
  const sum = (n) => n.k === 'bin' && (n.op === '+' || n.op === '-');
  function tex(n) {
    switch (n.k) {
      case 'num': return n.s.replace(/^\./, '0.');
      case 'const': return n.v === 'pi' ? '\\pi' : n.v === 'e' ? 'e' : '\\mathrm{Ans}';
      case 'var': return n.v.length === 1 ? n.v : '\\mathit{' + n.v + '}';
      case 'par': return '\\left(' + tex(n.a) + '\\right)';
      case 'neg': return '-' + (sum(n.a) ? wrap(n.a) : tex(n.a));
      case 'post': return wrap(n.a) + (n.op === '%' ? '\\%' : '!');
      case 'pow': return (atom(n.a) && n.a.k !== 'fn' ? tex(n.a) : '\\left(' + tex(strip(n.a)) + '\\right)') + '^{' + tex(strip(n.b)) + '}';
      case 'bin':
        if (n.op === '/') return '\\frac{' + tex(strip(n.a)) + '}{' + tex(strip(n.b)) + '}';
        if (n.op === '*') {
          const b = n.b, numNext = b.k === 'num' || (b.k === 'pow' && b.a.k === 'num') || b.k === 'neg';
          return (sum(n.a) ? wrap(n.a) : tex(n.a)) + (n.imp && !numNext ? '' : ' \\times ') + (sum(b) ? wrap(b) : tex(b));
        }
        return tex(n.a) + ' ' + n.op + ' ' + (n.op === '-' && sum(n.b) ? wrap(n.b) : tex(n.b));
      case 'fn': {
        const A = n.args.map((x) => tex(strip(x)));
        if (n.f === 'sqrt') return '\\sqrt{' + A[0] + '}';
        if (n.f === 'root') return '\\sqrt[' + A[0] + ']{' + A[1] + '}';
        if (n.f === 'exp') return 'e^{' + A[0] + '}';
        if (n.f === 'ncr') return '\\binom{' + A[0] + '}{' + A[1] + '}';
        if (n.f === 'ln') return '\\ln\\left(' + A[0] + '\\right)';
        return '\\log' + (n.base ? '_{' + tex(strip(n.base)) + '}' : '') + '\\left(' + A[0] + '\\right)';
      }
    }
    return '';
  }
  function toTex(src, vars) {
    try { const a = assignment(src); if (a) return (a.name.length === 1 ? a.name : '\\mathit{' + a.name + '}') + ' = ' + tex(parse(a.expr, vars)); return tex(parse(src, vars)); } catch (e) { return null; }
  }

  /* ---------- numbers out ---------- */
  // for the answer field: plain digits that SA.parseNum reads (no exponent, no separators), 12 significant figures
  function plain(v) {
    let s = String(Number(v.toPrecision(12)));
    if (/e/i.test(s)) s = Number(v.toPrecision(12)).toFixed(20).replace(/\.?0+$/, '');
    return s;
  }
  // for display: thousands separated, up to `sig` (default 10) significant figures
  function show(v, sig) {
    const a = Math.abs(v), S = sig || 10;
    if (a !== 0 && (a >= 1e15 || a < 1e-9)) { const [m, e] = v.toExponential(Math.min(8, S - 1)).split('e'); return m.replace(/\.?0+$/, '') + ' × 10^' + Number(e); }
    const s = String(Number(v.toPrecision(S)));
    const [i, d] = (/e/i.test(s) ? Number(v.toPrecision(S)).toFixed(12).replace(/\.?0+$/, '') : s).split('.');
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
  // names that begin with the word being typed
  function suggest(word) {
    const w = String(word || '').toLowerCase();
    if (!w) return [];
    return NAMES.filter((n) => n[0].startsWith(w) && !(n[0] === w && n[4] === 0)).slice(0, 5);
  }
  SA.calcEngine = { parse, evaluate, sheet, tex: toTex, plain, show, output, suggest, NAMES };

  /* ---------- the popup (browser only) ---------- */
  const doc = root.document;
  if (!doc || !doc.addEventListener || !root.MutationObserver) return;

  const TOUCH = !!(root.matchMedia && root.matchMedia('(pointer: coarse)').matches); // phones and tablets: maths keyboard
  // keys: [label html, text inserted (| marks the caret), spoken name, style]
  const FR = '<span class="ck-frac"><span>a</span><span>b</span></span>';
  const SYM = {
    frac: [FR, '/', 'Fraction'], pow: ['x<sup>y</sup>', '^', 'Power'], sq: ['x<sup>2</sup>', '^2', 'Squared'], sqrt: ['√', 'sqrt(|)', 'Square root'],
    root: ['<sup>n</sup>√', 'root(|, )', 'nth root'], lp: ['(', '(', 'Open bracket'], rp: [')', ')', 'Close bracket'], ln: ['ln', 'ln(|)', 'Natural log'],
    log: ['log', 'log(|)', 'Log base 10'], logb: ['log<sub>b</sub>', 'log_|', 'Log to a base'], exp: ['e<sup>x</sup>', 'exp(|)', 'e to the power'],
    ten: ['10<sup>x</sup>', '10^', 'Ten to the power'], pi: ['π', 'π', 'Pi'], e: ['e', 'e', 'Euler’s number'], fact: ['n!', '!', 'Factorial'],
    ncr: ['<sup>n</sup>C<sub>r</sub>', 'ncr(|, )', 'Combinations'], pct: ['%', '%', 'Per cent'], ans: ['Ans', 'ans', 'Last result'],
    mul: ['×', '×', 'Times', 'o'], div: ['÷', '÷', 'Divide', 'o'], add: ['+', '+', 'Plus', 'o'], sub: ['−', '−', 'Minus', 'o'], comma: [',', ', ', 'Comma'],
    dot: ['.', '.', 'Decimal point', 'n'], left: ['←', '', 'Move left', 'nav'], right: ['→', '', 'Move right', 'nav'], back: ['⌫', '', 'Delete', 'nav'],
    clear: ['AC', '', 'Clear', 'nav'], enter: ['↵', '', 'Check the answer', 'go'],
  };
  for (let d = 0; d <= 9; d++) SYM[d] = [String(d), String(d), null, 'n'];
  const DESK_SYMS = ['frac', 'pow', 'sq', 'sqrt', 'root', 'lp', 'rp', 'pi', 'e', 'ln', 'log', 'logb', 'exp', 'ten', 'fact', 'ncr', 'pct', 'ans'];
  const PAGES = {
    num: { name: '123', cols: 10, rows: ['lp', 'rp', 'frac', 'pow', 7, 8, 9, 'mul', 'div', 'back', 'sq', 'sqrt', 'pi', 'pct', 4, 5, 6, 'add', 'sub', 'clear',
      'left', 'right', 'ln', 'log', 1, 2, 3, 'ans', 'e', 'exp', 'fact', 'ncr', 'root', 'logb', [0, 2], 'dot', 'comma', ['enter', 2]] },
    fx: { name: 'f(x)', cols: 8, rows: ['frac', 'pow', 'sq', 'sqrt', 'root', 'lp', 'rp', 'back', 'ln', 'log', 'logb', 'exp', 'ten', 'pi', 'e', 'clear',
      'fact', 'ncr', 'pct', 'ans', 'mul', 'div', 'add', 'sub', 'left', 'right', 'comma', 'dot', ['enter', 4]] },
  };
  const GUIDE = [['^', 'power: 1.05^3'], ['/', 'divide or fraction: 1/8'], ['*', 'times'], ['( )', 'group: (1+r)^n'], ['sqrt(x), root(n, x)', 'square and nth root'],
    ['ln(x), log(x), log_b(x)', 'logs: natural, base 10, base b'], ['log_(1/8)(x)', 'a base worked out first'], ['exp(x), e', 'e to the power, e'], ['pi, ans', 'π, last result'], ['n!, ncr(n, r)', 'factorial, combinations'],
    ['5%', 'per cent (0.05)'], ['Enter', 'check the answer']];

  let box = null, inp, prev, sugEl, symEl, tipEl, symBtn, tipBtn, kb = null, kbBody, kbTabs = {}, page = 'num';
  let target = null, suppress = null, ans = null, sugs = [], sugAt = 0;
  const exprs = new WeakMap(); // what was typed for each field
  const mode = () => { const st = SA.app && SA.app.state; const m = st && st.settings && st.settings.calc; return m === 'off' ? 'off' : 'auto'; };
  const live = (x) => x && doc.body.contains(x) && !x.disabled;
  const el = (tag, cls, html) => { const x = doc.createElement(tag); if (cls) x.className = cls; if (html != null) x.innerHTML = html; return x; };
  const fieldOpts = (f) => ({ dp: f && f.getAttribute('data-calc-dp') != null ? Number(f.getAttribute('data-calc-dp')) : null, rel: !!(f && f.getAttribute('data-calc-rel')), pct: !!(f && f.getAttribute('data-calc-pct')) });
  // touch screens: number fields do not call up the phone keyboard while the calculator is on (the maths keyboard types)
  function inputMode() { return TOUCH && mode() !== 'off' ? 'none' : 'decimal'; }
  const noFocusLoss = (b) => b.addEventListener('mousedown', (ev) => ev.preventDefault());

  function build() {
    box = el('div', 'cq'); box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Calculator'); box.hidden = true;
    const row = el('div', 'cq-row');
    inp = el('textarea', 'cq-in'); inp.rows = 1;
    ['autocomplete', 'autocorrect', 'autocapitalize', 'spellcheck'].forEach((a) => inp.setAttribute(a, 'off'));
    inp.setAttribute('aria-label', 'Calculation'); inp.setAttribute('enterkeyhint', 'done');
    inp.setAttribute('role', 'combobox'); inp.setAttribute('aria-autocomplete', 'list'); inp.setAttribute('aria-expanded', 'false'); inp.setAttribute('aria-controls', 'cq-sug');
    if (TOUCH) inp.setAttribute('inputmode', 'none');
    const btn = (html, label) => { const b = el('button', 'cq-btn', html); b.type = 'button'; b.setAttribute('aria-label', label); noFocusLoss(b); return b; };
    symBtn = btn('√x', 'Symbols'); symBtn.setAttribute('aria-expanded', 'false');
    tipBtn = btn('?', 'How to type'); tipBtn.setAttribute('aria-expanded', 'false');
    const xBtn = btn('×', 'Close calculator');
    if (TOUCH) symBtn.hidden = true; // the docked keyboard has the symbols
    row.append(inp, symBtn, tipBtn, xBtn);
    sugEl = el('div', 'cq-sug'); sugEl.id = 'cq-sug'; sugEl.setAttribute('role', 'listbox'); sugEl.hidden = true;
    symEl = el('div', 'cq-sym'); symEl.hidden = true;
    DESK_SYMS.forEach((id) => symEl.appendChild(key(id)));
    tipEl = el('div', 'cq-tip'); tipEl.hidden = true; tipEl.setAttribute('role', 'note');
    const tx = el('button', 'cq-tipx', '×'); tx.type = 'button'; tx.setAttribute('aria-label', 'Close'); noFocusLoss(tx);
    const dl = el('dl'); GUIDE.forEach(([k, d]) => { const dt = el('dt'), dd = el('dd'); dt.textContent = k; dd.textContent = d; dl.append(dt, dd); });
    tipEl.append(tx, el('h4', null, 'How to type'), dl);
    prev = el('div', 'cq-prev'); prev.setAttribute('aria-live', 'polite'); prev.hidden = true;
    row.appendChild(sugEl); row.appendChild(tipEl);
    box.append(row, symEl, prev);

    symBtn.addEventListener('click', () => { symEl.hidden = !symEl.hidden; symBtn.classList.toggle('on', !symEl.hidden); symBtn.setAttribute('aria-expanded', String(!symEl.hidden)); place(); });
    tipBtn.addEventListener('click', () => toggleTip());
    tx.addEventListener('click', () => toggleTip(false));
    xBtn.addEventListener('click', () => { const t = target; close(); if (live(t)) { suppress = t; t.focus(); } });
    inp.addEventListener('input', changed);
    inp.addEventListener('keydown', onKey);
    inp.addEventListener('click', () => suggestNow());
    inp.addEventListener('blur', () => { setTimeout(() => { if (doc.activeElement !== inp) hideSug(); }, 120); });

    if (TOUCH) {
      kb = el('div', 'mkb'); kb.hidden = true; kb.setAttribute('role', 'group'); kb.setAttribute('aria-label', 'Maths keyboard');
      const bar = el('div', 'mkb-bar'), tabs = el('div', 'mkb-tabs');
      Object.keys(PAGES).forEach((id) => {
        const t = el('button', 'mkb-tab'); t.type = 'button'; t.textContent = PAGES[id].name; noFocusLoss(t);
        t.addEventListener('click', () => { page = id; drawKb(); });
        kbTabs[id] = t; tabs.appendChild(t);
      });
      bar.appendChild(tabs);
      kbBody = el('div', 'mkb-keys');
      kb.append(bar, kbBody);
      doc.body.appendChild(kb);
      drawKb();
    }
  }
  function key(id, span) {
    const [label, ins, aria, cls] = SYM[id];
    const b = el('button', 'ck' + (cls ? ' ck-' + cls : ''), label); b.type = 'button'; b.setAttribute('aria-label', aria || String(id));
    if (span > 1) b.style.gridColumn = 'span ' + span;
    noFocusLoss(b);
    b.addEventListener('click', () => {
      if (id === 'left' || id === 'right') { const q = Math.max(0, inp.selectionStart + (id === 'left' ? -1 : 1)); inp.setSelectionRange(q, q); suggestNow(); return; }
      if (id === 'back') { const a = inp.selectionStart, z = inp.selectionEnd; if (a === z && a > 0) setText(inp.value.slice(0, a - 1) + inp.value.slice(z), a - 1); else setText(inp.value.slice(0, a) + inp.value.slice(z), a); return; }
      if (id === 'clear') { setText('', 0); return; }
      if (id === 'enter') { if (onEmptyLine()) submit(); else insert('\n'); return; }
      insert(ins);
    });
    return b;
  }
  function drawKb() {
    const P = PAGES[page];
    kbBody.innerHTML = ''; kbBody.style.gridTemplateColumns = 'repeat(' + P.cols + ', minmax(0, 1fr))';
    Object.keys(kbTabs).forEach((id) => kbTabs[id].classList.toggle('on', id === page));
    P.rows.forEach((c) => { const [id, span] = Array.isArray(c) ? c : [c, 1]; kbBody.appendChild(key(id, span)); });
  }
  function toggleTip(on) {
    const showIt = on == null ? tipEl.hidden : on;
    tipEl.hidden = !showIt; tipBtn.classList.toggle('on', showIt); tipBtn.setAttribute('aria-expanded', String(showIt));
  }
  // text editing (| in a snippet marks where the caret goes)
  function setText(v, caret) { inp.value = v; inp.setSelectionRange(caret, caret); changed(); }
  function insert(snippet, from) {
    const a = from == null ? inp.selectionStart : from, z = inp.selectionEnd, c = snippet.indexOf('|'), s = snippet.replace('|', '');
    setText(inp.value.slice(0, a) + s + inp.value.slice(z), a + (c < 0 ? s.length : c));
    if (!TOUCH) inp.focus({ preventScroll: true });
  }

  /* ---------- suggestions ---------- */
  function wordAtCaret() { const m = /[a-zA-Z_]+$/.exec(inp.value.slice(0, inp.selectionStart)); return m ? m[0] : ''; }
  function suggestNow() {
    const w = wordAtCaret(), after = inp.value.slice(inp.selectionStart);
    sugs = /^[a-zA-Z(_]/.test(after) ? [] : suggest(w);
    if (sugs.length === 1 && sugs[0][0] === w.toLowerCase()) sugs = []; // already typed in full
    sugAt = 0; drawSug();
  }
  function drawSug() {
    sugEl.innerHTML = '';
    sugEl.style.top = (36 + 23 * (inp.value.slice(0, inp.selectionStart).split('\n').length - 1)) + 'px'; // under the caret's line
    sugEl.hidden = !sugs.length; inp.setAttribute('aria-expanded', String(!!sugs.length));
    sugs.forEach((n, i) => {
      const r = el('div', 'cq-opt' + (i === sugAt ? ' on' : '')); r.setAttribute('role', 'option'); r.setAttribute('aria-selected', String(i === sugAt));
      const c = el('code'), d = el('span', 'cq-d'), x = el('span', 'cq-ex'); c.textContent = n[0]; d.textContent = n[1]; x.textContent = n[2];
      r.append(c, d, x);
      r.addEventListener('mousedown', (ev) => { ev.preventDefault(); pick(i); });
      sugEl.appendChild(r);
    });
  }
  function hideSug() { sugs = []; drawSug(); }
  function pick(i) {
    const n = sugs[i]; if (!n) return;
    const w = wordAtCaret(); hideSug();
    insert(n[3], inp.selectionStart - w.length);
  }

  /* ---------- typing ---------- */
  function onKey(ev) {
    // the calculator sits inside the exercise, which checks the answer on Enter: keep its own keys to itself
    if (ev.key === 'Enter' || ev.key === 'Escape') ev.stopPropagation();
    if (sugs.length && (ev.key === 'ArrowDown' || ev.key === 'ArrowUp')) { ev.preventDefault(); sugAt = (sugAt + (ev.key === 'ArrowDown' ? 1 : sugs.length - 1)) % sugs.length; drawSug(); return; }
    if (sugs.length && (ev.key === 'Tab' || (ev.key === 'Enter' && !ev.shiftKey))) { ev.preventDefault(); pick(sugAt); return; }
    if (ev.key === 'Escape') {
      ev.preventDefault();
      if (sugs.length) { hideSug(); return; }
      if (!tipEl.hidden) { toggleTip(false); return; }
      const t = target; close(); if (live(t)) { suppress = t; t.focus(); } return;
    }
    if (ev.key === 'Enter') { if (onEmptyLine()) { ev.preventDefault(); submit(); } } // otherwise a new line
  }
  // Enter: the field already holds the value; check the answer as Enter in the field would
  // the caret's line is empty (or there is nothing typed): Enter checks the answer instead of starting a line
  function onEmptyLine() {
    const v = inp.value, a = inp.selectionStart, from = v.lastIndexOf('\n', a - 1) + 1, to = v.indexOf('\n', a);
    return !v.slice(from, to < 0 ? v.length : to).trim();
  }
  function submit() {
    const r = sheet(inp.value, { ans }).value || {};
    if (r.ok) ans = r.v;
    if (target && doc.body.contains(target)) target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  }
  function changed() {
    if (target) exprs.set(target, inp.value);
    suggestNow();
    fit();
    prev.innerHTML = '';
    const res = sheet(inp.value, { ans }), shown = res.lines.filter((L) => L.kind !== 'empty');
    prev.hidden = !shown.length;
    shown.forEach((L) => {
      const row = el('div', 'cq-line'), r = L.r || { ok: false, inc: true };
      row.appendChild(el('span', 'cq-arrow', '↳'));
      if (L.tex != null) { const m = el('span', 'cq-tex'); try { if (root.katex) root.katex.render(L.tex, m, { throwOnError: false }); else m.textContent = L.src; } catch (e) { m.textContent = L.src; } row.appendChild(m); }
      if (r.ok) { const v = el('span', 'cq-val'), t = show(r.v, 7); v.textContent = '= ' + t + (Math.abs(Number(t.replace(/,/g, '')) - r.v) > 1e-12 * Math.max(1, Math.abs(r.v)) ? '…' : ''); row.appendChild(v); }
      else if (!r.inc) row.appendChild(el('span', 'cq-err', 'Error'));
      else if (L.tex == null) row.appendChild(el('span', 'cq-wait', '…'));
      prev.appendChild(row);
    });
    // the field takes the line that is not a definition; with none, or nothing typed, it is empty
    if (live(target)) {
      const v = res.value, s = v && v.ok ? output(v.v, fieldOpts(target)) : (res.main < 0 ? '' : null);
      if (s != null && target.value !== s) { target.value = s; target.dispatchEvent(new Event('input', { bubbles: true })); }
    }
    place();
  }
  // one line high, growing a line at a time
  function fit() { inp.rows = Math.max(1, inp.value.split('\n').length); }


  /* ---------- open, place, close ---------- */
  // a standalone number answer gets the calculator in the page flow, under its row; fields inside tables, sentences and
  // journal lines get it as an overlay under the field. Either way its input lines up with the field's left edge.
  function place() {
    if (!box || box.hidden || !target) return;
    if (box.classList.contains('cq-float')) {
      const r = target.getBoundingClientRect(), vw = doc.documentElement.clientWidth, W = Math.min(640, vw - 16);
      const left = Math.max(8, Math.min(r.left - 9.5, vw - W - 8));
      box.style.left = (left + root.scrollX) + 'px'; box.style.top = (r.bottom + root.scrollY + 8) + 'px'; box.style.width = W + 'px';
    }
    if (kb && !kb.hidden) doc.body.style.paddingBottom = (kb.offsetHeight + 16) + 'px';
  }
  function open(f) {
    if (mode() === 'off' || !live(f)) return;
    if (!box) build();
    if (target && target !== f) target.classList.remove('calc-target');
    target = f; f.classList.add('calc-target');
    const row = f.classList.contains('num-input') && f.closest('.num-row');
    if (row) { box.classList.remove('cq-float'); box.style.left = box.style.top = box.style.width = ''; row.after(box); }
    else { box.classList.add('cq-float'); doc.body.appendChild(box); }
    box.hidden = false;
    inp.value = exprs.get(f) || '';
    toggleTip(false); hideSug();
    if (kb) kb.hidden = false;
    changed();
    if (!TOUCH) setTimeout(() => { if (target === f) { inp.focus({ preventScroll: true }); inp.setSelectionRange(inp.value.length, inp.value.length); hideSug(); } }, 0);
    root.requestAnimationFrame(inView);
  }
  function inView() { // keep the line in view (on phones, above the docked keyboard)
    if (!box || box.hidden) return;
    const b = box.getBoundingClientRect(), limit = kb && !kb.hidden ? kb.getBoundingClientRect().top : root.innerHeight;
    if (b.bottom > limit - 8) root.scrollBy(0, b.bottom - limit + 16);
  }
  function close() {
    if (!box || box.hidden) return;
    const r = sheet(inp.value, { ans }).value; if (r && r.ok) ans = r.v;
    box.hidden = true; if (kb) kb.hidden = true; doc.body.style.paddingBottom = '';
    if (target) target.classList.remove('calc-target');
    target = null; hideSug();
  }
  SA.calc = { open: (f) => open(f), close, inputMode, sync: () => { if (mode() === 'off') close(); } };

  function init() {
    doc.addEventListener('focusin', (ev) => {
      const t = ev.target;
      if (!t || !t.matches || !t.matches('input[data-calc]')) return;
      if (suppress === t) return; // closed with × or Esc: typing goes into the field itself
      if (t !== target || !box || box.hidden) open(t);
      else if (!TOUCH) setTimeout(() => { if (target === t) inp.focus({ preventScroll: true }); }, 0); // typing goes to the calculation
    });
    doc.addEventListener('focusout', (ev) => { if (ev.target === suppress) suppress = null; });
    // a click anywhere else closes it
    doc.addEventListener('pointerdown', (ev) => {
      if (!box || box.hidden) return;
      const t = ev.target;
      if (box.contains(t) || (kb && kb.contains(t)) || t === target) return;
      if (t.matches && t.matches('input[data-calc]')) return; // another number field: focusin moves it there
      close();
    }, true);
    // the field was marked or removed, or the page changed
    let queued = false;
    new root.MutationObserver(() => { if (queued) return; queued = true; root.requestAnimationFrame(() => { queued = false; if (target && !live(target)) close(); }); })
      .observe(doc.getElementById('app') || doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled'] });
    root.addEventListener('resize', place);
    root.addEventListener('hashchange', close);
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
})(typeof globalThis !== 'undefined' ? globalThis : this);
