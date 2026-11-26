// Calculator engine test (Node, no npm): node tools/smoke-calc.js
// Parses typed calculations with SA.calcEngine and checks values, errors, the typeset form, suggestions and the
// string written into answer fields.
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
function val(src, want, ans) {
  n++; const r = C.evaluate(src, { ans });
  if (!r.ok || Math.abs(r.v - want) > 1e-9 * Math.max(1, Math.abs(want))) bad(JSON.stringify(src) + ' -> ' + (r.ok ? r.v : r.msg || 'incomplete') + ', want ' + want);
}
function err(src, inc) {
  n++; const r = C.evaluate(src);
  if (r.ok || (inc ? !r.inc : r.inc)) bad(JSON.stringify(src) + ' should be ' + (inc ? 'unfinished' : 'an error') + ', got ' + JSON.stringify(r));
}
function tex(src, want) { n++; const t = C.tex(src); if (t !== want) bad('tex(' + JSON.stringify(src) + ') = ' + t + ', want ' + want); }

// arithmetic, precedence, signs
val('2+3*4', 14); val('2*3+4', 10); val('10-4-3', 3); val('8/2/2', 2); val('-2^2', -4); val('(-2)^2', 4); val('2^3^2', 512);
val('2^-1', 0.5); val('3 × 4 ÷ 2', 6); val('5 − 7', -2); val('6:3', 2); val('2**3', 8);
// implicit multiplication, constants, a missing bracket at the end
val('2(3+4)', 14); val('(1+2)(3+4)', 21); val('2pi', 2 * Math.PI); val('3e', 3 * Math.E); val('2π', 2 * Math.PI); val('(1+2', 3);
// decimal commas, but commas separate in root(…, …) and ncr(…, …)
val('1,5*2', 3); val('3,25', 3.25); val('ncr(10,3)', 120); val('ncr(10, 3)', 120); val('root(3,27)', 3);
// course formulae: compounding, discounting, growth rates, continuous compounding
val('1000*(1+5%)^3', 1157.625); val('1000*1.05^3', 1157.625); val('100/1.05^3', 100 / Math.pow(1.05, 3)); val('1.26^(1/8) - 1', Math.pow(1.26, 1 / 8) - 1);
val('exp(0.05) - 1', Math.exp(0.05) - 1); val('ln(2)/0.05', Math.log(2) / 0.05); val('100*e^(-0.03*2)', 100 * Math.exp(-0.06));
val('(1 - 1.05^-10)/0.05', (1 - Math.pow(1.05, -10)) / 0.05);
// functions
val('sqrt(16)', 4); val('sqrt 2', Math.SQRT2); val('√9', 3); val('root(3, -8)', -2); val('ln(1)', 0); val('log(1000)', 3); val('log_2(8)', 3); val('log_e(e)', 1);
val('5!', 120); val('0!', 1); val('ncr(52, 5)', 2598960); val('ans*2', 10, 5); val('pi', Math.PI); val('PI', Math.PI); val('Sqrt(4)', 2);
// errors and unfinished input
err('1/0'); err('sqrt(-1)'); err('ln(0)'); err('2.5!'); err('x+1'); err('1)'); err('log_1(5)'); err('ans+1'); err('1..2'); err('ncr(5)'); err('root(2,3,4)'); err('2 # 3');
err('2+', true); err('', true); err('1/', true); err('sqrt(', true); err('ncr(10,', true); err('log_', true);
// typeset form
tex('1.26^(1/8) - 1', '1.26^{\\frac{1}{8}} - 1'); tex('100/1.05^3', '\\frac{100}{1.05^{3}}'); tex('2pi', '2\\pi'); tex('2*3', '2 \\times 3');
tex('sqrt(2)', '\\sqrt{2}'); tex('root(3, 27)', '\\sqrt[3]{27}'); tex('ncr(10,3)', '\\binom{10}{3}'); tex('log_2(8)', '\\log_{2}\\left(8\\right)');
tex('exp(0.05)', 'e^{0.05}'); tex('5%', '5\\%'); tex('-(1+2)', '-\\left(1 + 2\\right)'); tex('(1+0.05)^3', '\\left(1 + 0.05\\right)^{3}'); tex('2+', null);
// variables: q = 20/4 defines q; later lines use it (20q, 2qpi), multi-letter names, redefinition, built-in names refused
{
  const V = {}, def = (src) => { n++; const r = C.evaluate(src, { vars: V }); if (!r.ok || !r.name) bad('definition ' + src + ' -> ' + JSON.stringify(r)); else V[r.name] = r.v; };
  def('q = 20/4'); def('pv = 100/1.05^3'); def('Rate=5%');
  const vv = (src, want) => { n++; const r = C.evaluate(src, { vars: V }); if (!r.ok || Math.abs(r.v - want) > 1e-9 * Math.max(1, Math.abs(want))) bad(src + ' with variables -> ' + JSON.stringify(r) + ', want ' + want); };
  vv('20q', 100); vv('q^2', 25); vv('2qpi', 10 * Math.PI); vv('sqrt(q)', Math.sqrt(5)); vv('pv*1.05^3', 100); vv('1000*(1+rate)', 1050); vv('qq', 25);
  n++; const r = C.evaluate('q = q + 1', { vars: V }); if (!r.ok || r.v !== 6 || r.name !== 'q') bad('q = q + 1 -> ' + JSON.stringify(r));
  n++; if (C.evaluate('e = 3', { vars: V }).ok) bad('e = 3 should be refused');
  n++; if (C.evaluate('z + 1', { vars: V }).ok) bad('an undefined name should be an error');
  n++; if (C.evaluate('20q').ok) bad('q without its definition should be an error');
  n++; if (C.tex('pv = 100/1.05^3', V) !== '\\mathit{pv} = \\frac{100}{1.05^{3}}') bad('tex of a definition: ' + C.tex('pv = 100/1.05^3', V));
  n++; if (C.tex('20q', V) !== '20q') bad('tex of 20q: ' + C.tex('20q', V));
}
// a log base can be any expression in brackets, or a name
val('log_(1/8)(64)', -2); val('log_{1/8}(64)', -2); val('log_(2^3)(64)', 2); val('log_(2)(8) + 1', 4);
n++; if (C.sheet('b = 1/8\nlog_b(64)').value.v !== -2) bad('log_b with b defined');
err('log_(1/8)', true); err('log_(1', true); err('log_(1)(5)'); err('log_(-2)(4)');
tex('log_(1/8)(64)', '\\log_{\\frac{1}{8}}\\left(64\\right)');
// several lines: definitions in any order, the one line that is not a definition fills the field
{
  const sv = (text, want) => { n++; const r = C.sheet(text).value; if (!r || !r.ok || Math.abs(r.v - want) > 1e-9 * Math.max(1, Math.abs(want))) bad('sheet ' + JSON.stringify(text) + ' -> ' + JSON.stringify(r) + ', want ' + want); };
  sv('q = 20/4\n20q', 100); sv('20q\n\nq = 3+5', 160); sv('a = b + 1\nb = 2\na*10', 30); sv('pv = 100/1.05^3\nr = 5%\npv*(1+r)^3', 100);
  n++; if (C.sheet('q = 5').main !== -1) bad('definitions alone fill nothing');
  const no = (text, lineRe, why) => { n++; const r = C.sheet(text); const msgs = r.lines.map((L) => (L.r && L.r.msg) || '').join(' | '); if ((r.value && r.value.ok) || !lineRe.test(msgs)) bad(why + ': ' + msgs); };
  no('q = 1\nq = 2\nq', /Does not hold/, 'a name defined twice');
  no('a = b\nb = a\na', /many solutions/, 'equations that do not fix their unknowns');
  no('q = q + 1\nq', /No value of q/, 'an equation with no solution');
  no('5/x\nx = 0', /Division by zero/, 'an impossible value');
  no('2+2\n3+3', /Only one line/, 'two answer lines');
  no('x + y = 3\nx', /Needs 1 more equation/, 'too few equations');
  no('x + y = 3\nx - y = 1\nx + y = 4\nx', /No values of x and y/, 'equations that contradict each other');
  no('e = 3\ne', /built-in/, 'a built-in name on the left');
  // equations: linear systems, a yield, a root, a consistent extra equation
  sv('2x + y = 3\nx - 5y = 10\n\nx', 25 / 11); sv('2x + y = 3\nx - 5y = 10\ny', 3 - 50 / 11);
  sv('100 = 5*(1-(1+r)^-10)/r + 100*(1+r)^-10\nr', 0.05); sv('x^2 = 2\nx', Math.SQRT2); sv('x + y = 3\nx - y = 1\n2x + 2y = 6\ny', 1);
  sv('fv = 1000\nfv = pv*1.05^3\npv', 1000 / Math.pow(1.05, 3));
  n++; { const r = C.sheet('2+2\n\n'); if (!r.value.ok || r.value.v !== 4) bad('blank lines are ignored'); }
}
// suggestions: by prefix, not once a constant is typed in full
[['l', ['ln', 'log', 'log_b']], ['sq', ['sqrt']], ['e', ['exp']], ['pi', []], ['z', []], ['nc', ['ncr']]].forEach(([w, want]) => {
  n++; const got = C.suggest(w).map((x) => x[0]).join(','); if (got !== want.join(',')) bad('suggest(' + w + ') = ' + got + ', want ' + want.join(','));
});
// answer-field strings: no exponents, no separators, readable by parseNum
[[1157.625, '1157.625'], [0.1 + 0.2, '0.3'], [1e-7, '0.0000001'], [-2.5, '-2.5'], [123456789.123, '123456789.123'], [1 / 3, '0.333333333333']].forEach(([v, s]) => {
  n++; const p = C.plain(v); if (p !== s) bad('plain(' + v + ') = ' + p + ', want ' + s);
  if (Math.abs(SA.parseNum(p) - v) > 1e-9 * Math.max(1, Math.abs(v))) bad('parseNum(plain(' + v + ')) does not round trip');
});
// rounding to the field's decimals, × 100 for % fields, significant figures under a relative tolerance
[[[0.0365438829846, { dp: 2, pct: true }], '3.65'], [[1157.625, { dp: 2 }], '1157.63'], [[2.675, { dp: 2 }], '2.68'], [[1157.625, { dp: 0 }], '1158'],
  [[-0.001, { dp: 2 }], '0.00'], [[0.000123456789, { dp: 2, rel: true }], '0.000123457'], [[729, { dp: 8, rel: true }], '729'], [[1 / 3, {}], '0.333333333333'],
  [[0.05, { dp: 4, pct: true }], '5.0000']].forEach(([[v, o], s]) => { n++; const g = C.output(v, o); if (g !== s) bad('output(' + v + ', ' + JSON.stringify(o) + ') = ' + g + ', want ' + s); });
[[1157.625, '1,157.625'], [1e16, '1 × 10^16'], [0.5, '0.5']].forEach(([v, s]) => { n++; if (C.show(v) !== s) bad('show(' + v + ') = ' + C.show(v)); });
// the setting travels in the progress code
vm.runInContext(fs.readFileSync(path.join(ROOT, 'app/content/index.js'), 'utf8'), ctx);
['auto', 'off'].forEach((m) => { n++; const s = SA.newState(); s.settings.calc = m; const d = SA.decodePassword(SA.encodeCode(s)); if (d.settings.calc !== m) bad('progress code calc ' + m + ' -> ' + d.settings.calc); });

if (problems) { console.log('CALC: ' + problems + ' problem(s) in ' + n + ' checks'); process.exit(1); }
console.log('CALC OK (' + n + ' checks)');
