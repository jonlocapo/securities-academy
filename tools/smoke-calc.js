// Calculator engine test (Node, no npm): node tools/smoke-calc.js
// Types key sequences into SA.calcEngine.Editor and checks the value, the text form and the answer-field string.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const ctx = vm.createContext({ console });
ctx.globalThis = ctx;
vm.runInContext(fs.readFileSync(path.join(ROOT, 'app/js/core.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'app/js/calc.js'), 'utf8'), ctx);
const SA = ctx.SA, C = SA.calcEngine;
let problems = 0, n = 0;
const bad = (m) => { problems++; console.log('  FAIL ' + m); };
// keys: a string typed char by char, or an array mixing chars and key names
function run(keys, ans) {
  const E = C.Editor();
  for (const k of Array.isArray(keys) ? keys : [keys]) { if (k.length > 1 && /^[a-z]+$/.test(k) && !['left', 'right', 'up', 'down', 'back', 'del', 'home', 'end', 'logb'].includes(k)) E.type(k); else if (k.length > 1 && !/^[a-z]+$/.test(k)) E.type(k); else E.key(k); }
  return { E, r: C.evaluate(E.root, { ans }) };
}
function val(keys, want, ans) {
  n++; const { E, r } = run(keys, ans);
  if (!r.ok || Math.abs(r.v - want) > 1e-9 * Math.max(1, Math.abs(want))) bad(JSON.stringify(keys) + ' -> ' + (r.ok ? r.v : r.msg || 'incomplete') + ', want ' + want + ' [' + C.lin(E.root) + ']');
  return E;
}
function err(keys, inc) {
  n++; const { r } = run(keys);
  if (r.ok || (inc ? !r.inc : r.inc)) bad(JSON.stringify(keys) + ' should be ' + (inc ? 'incomplete' : 'an error') + ', got ' + JSON.stringify(r));
}
function text(keys, want) { n++; const { E } = run(keys); const t = C.lin(E.root); if (t !== want) bad(JSON.stringify(keys) + ' text "' + t + '", want "' + want + '"'); }

// arithmetic and precedence
val('2+3*4', 14); val('2*3+4', 10); val('10-4-3', 3); val('8:2:2', 2); val('-2^2', -4); val('(-2)^2', 4);
val('2^3^2', 512); val('1,5*2', 3); val('2(3+4)', 14); val('(1+2)(3+4)', 21); val('2pi', 2 * Math.PI); val('3e', 3 * Math.E);
val('(1+2', 3); // a missing ) closes at the end
// fractions take the operand before the cursor
val('1/4', 0.25); val('3+1/4', 3.25); val('(1+3)/8', 0.5); text('(1+3)/8', '(1 + 3)/8');
val(['/', '1', 'down', '4'], 0.25); val(['1', '/', '4', 'right', '+', '1'], 1.25);
val(['1', '0', '0', '/', '1', '.', '0', '5', '^', '3'], 100 / Math.pow(1.05, 3));
// powers, percent, compounding: 1000 × (1 + 5%)^3
val('1000*(1+5%)^3', 1157.625); val(['2', '^', '1', '0', 'right', '+', '1'], 1025); val(['1', '.', '0', '1', '^', '1', '/', '1', '2'], Math.pow(1.01, 1 / 12));
// roots, logs, exp, factorial, combinations
val('sqrt16', 4); val(['sqrt', '2', 'right', '*', '3'], Math.sqrt(2) * 3); val(['root', '3', 'right', '2', '7'], 3); val(['root', '3', 'right', '-', '8'], -2);
val('ln1', 0); val('exp1', Math.E); val(['exp', '0', '.', '0', '5', 'right', '-', '1'], Math.exp(0.05) - 1); val('log1000', 3);
val(['logb', '2', 'right', '8'], 3); val(['log', '8', '1', '_', '3'], 4); val(['log', '_', '2', 'right', '3', '2'], 5); val(['l', 'n', '2', 'right', '/', '0', '.', '0', '5'], Math.log(2) / 0.05);
val('5!', 120); val('0!', 1); val('5ncr2', 10); val(['ncr', '1', '0', 'down', '3'], 120); val('52ncr5', 2598960);
val('ans*2', 10, 5); val('pi', Math.PI);
// editing: backspace removes empty boxes and unwraps filled ones
val(['5', '/', 'back'], 5); val(['2', '^', 'back', '3'], 23); val(['1', '2', 'left', 'back', '3'], 32); val(['sqrt', 'back', '9'], 9);
val(['4', '/', '2', 'back', 'back'], 4); val(['4', '/', '2', 'back', 'back', '+', '1'], 5); val(['1', '+', '2', 'home', '9'], 93);
// errors and unfinished input
err('1/0'); err('sqrt(-1)'); err('ln0'); err('2.5!'); err('x+1'); err('1)'); err(['logb', '1', 'right', '5']); err('ans+1');
err('2+', true); err('', true); err('1/', true); err(['^', '2']);
// answer-field strings: no exponents, no separators, readable by parseNum
[[1157.625, '1157.625'], [0.1 + 0.2, '0.3'], [1e-7, '0.0000001'], [-2.5, '-2.5'], [123456789.123, '123456789.123'], [1 / 3, '0.333333333333']].forEach(([v, s]) => {
  n++; const p = C.plain(v); if (p !== s) bad('plain(' + v + ') = ' + p + ', want ' + s);
  if (Math.abs(SA.parseNum(p) - v) > 1e-9 * Math.max(1, Math.abs(v))) bad('parseNum(plain(' + v + ')) does not round trip');
});
// answer-field output: rounding to the field's decimals, × 100 for % fields, significant figures under a relative tolerance
[[[0.0365438829846, { dp: 2, pct: true }], '3.65'], [[1157.625, { dp: 2 }], '1157.63'], [[2.675, { dp: 2 }], '2.68'], [[1157.625, { dp: 0 }], '1158'],
  [[-0.001, { dp: 2 }], '0.00'], [[0.000123456789, { dp: 2, rel: true }], '0.000123457'], [[729, { dp: 8, rel: true }], '729'], [[1 / 3, {}], '0.333333333333'],
  [[0.05, { dp: 4, pct: true }], '5.0000']].forEach(([[v, o], s]) => { n++; const g = C.output(v, o); if (g !== s) bad('output(' + v + ', ' + JSON.stringify(o) + ') = ' + g + ', want ' + s); });
[[1157.625, '1,157.625'], [1e16, '1 × 10^16'], [0.5, '0.5']].forEach(([v, s]) => { n++; if (C.show(v) !== s) bad('show(' + v + ') = ' + C.show(v)); });

// the setting travels in the progress code; codes made before it read as 'auto'
vm.runInContext(fs.readFileSync(path.join(ROOT, 'app/content/index.js'), 'utf8'), ctx);
['auto', 'button', 'off'].forEach((m) => { n++; const s = SA.newState(); s.settings.calc = m; const d = SA.decodePassword(SA.encodeCode(s)); if (d.settings.calc !== m) bad('progress code calc ' + m + ' -> ' + d.settings.calc); });

if (problems) { console.log('CALC: ' + problems + ' problem(s) in ' + n + ' checks'); process.exit(1); }
console.log('CALC OK (' + n + ' checks)');
