// UI smoke test (Node, no npm): node tools/smoke-ui.js
// Loads core.js, content/index.js, F1.1.js, storage.js, markdown.js, render.js in a vm with a minimal fake DOM.
// Checks: markdown converts every lesson card + exercise text without throwing; every renderer mounts and locks.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');

/* ---- minimal fake DOM ---- */
class Node_ {
  constructor(tag) { this.nodeType = 1; this.tagName = String(tag).toUpperCase(); this.children = []; this.attrs = {}; this.listeners = {}; this._cls = new Set(); this.style = {}; this.parentNode = null; this._text = ''; this.value = ''; this.disabled = false; this.hidden = false; }
  get className() { return Array.from(this._cls).join(' '); }
  set className(v) { this._cls = new Set(String(v).split(/\s+/).filter(Boolean)); }
  get classList() { const s = this._cls; return { add: (c) => s.add(c), remove: (c) => s.delete(c), toggle: (c, f) => { const on = f == null ? !s.has(c) : f; if (on) s.add(c); else s.delete(c); return on; }, contains: (c) => s.has(c) }; }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(t, fn) { (this.listeners[t] = this.listeners[t] || []).push(fn); }
  appendChild(c) { if (c.parentNode) c.parentNode.removeChild(c); c.parentNode = this; this.children.push(c); return c; }
  removeChild(c) { const i = this.children.indexOf(c); if (i >= 0) this.children.splice(i, 1); c.parentNode = null; return c; }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
  set innerHTML(v) { this.children.forEach((c) => { c.parentNode = null; }); this.children = []; this._html = String(v); }
  get innerHTML() { return this._html || ''; }
  set textContent(v) { this.children = []; this._text = String(v); }
  get textContent() { return this._text + this.children.map((c) => c.textContent).join(''); }
  get dataset() { return {}; }
  focus() {}
  click() { (this.listeners.click || []).forEach((f) => f({ stopPropagation() {}, preventDefault() {}, target: this })); }
  dispatch(t, ev) { (this.listeners[t] || []).forEach((f) => f(Object.assign({ stopPropagation() {}, preventDefault() {}, target: this }, ev))); }
  querySelectorAll(sel) { const out = [], want = sel.split(',').map((s) => s.trim()); const walk = (n) => n.children.forEach((c) => { if (c.nodeType === 1) { if (want.some((w) => match(c, w))) out.push(c); walk(c); } }); walk(this); return out; }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
}
function match(n, sel) { const m = /^([a-z0-9]*)((?:\.[\w-]+)*)$/i.exec(sel.replace(/:not\([^)]*\)/g, '')); if (!m) return false; if (m[1] && n.tagName !== m[1].toUpperCase()) return false; return m[2].split('.').filter(Boolean).every((c) => n._cls.has(c)); }
const document = { createElement: (t) => new Node_(t), createTextNode: (t) => { const n = new Node_('#text'); n.nodeType = 3; n._text = String(t); return n; }, body: new Node_('body') };
// text nodes: textContent getter works through _text; children empty

const ctx = vm.createContext({ console, document, setTimeout, clearTimeout });
ctx.window = ctx; ctx.globalThis = ctx;
const run = (p) => vm.runInContext(fs.readFileSync(path.join(ROOT, p), 'utf8'), ctx, { filename: p });
['app/js/core.js', 'app/content/index.js', 'app/content/L1/F1.1.js', 'app/js/storage.js', 'app/js/markdown.js', 'app/js/render.js'].forEach(run);
const SA = ctx.SA;
let problems = 0;
const bad = (m) => { problems++; console.log('  FAIL ' + m); };

/* ---- storage works with no localStorage ---- */
{
  const st = SA.newState(); st.xp = 42;
  if (!SA.store.save(st) && SA.store.load().xp !== 42) bad('storage memory fallback');
  if (SA.store.load().xp !== 42) bad('storage round trip without localStorage');
}

/* ---- markdown over every lesson card, exercise text, hint, solution ---- */
const u = SA.units['F1.1'];
let mdCount = 0;
const md = (label, s) => { try { const html = SA.md.render(s); if (typeof html !== 'string') bad(label + ' not a string'); if (/<script/i.test(html)) bad(label + ' contains <script'); mdCount++; } catch (e) { bad(label + ': ' + e.message); } };
u.lesson.forEach((c, i) => { md('lesson card ' + (i + 1), c.md); if (c.check) { md('card ' + (i + 1) + ' check prompt', c.check.prompt); } });
for (const ex of u.exercises) for (let seed = 1; seed <= 20; seed++) {
  const inst = SA.instance('F1.1', ex.id, seed);
  md(ex.id + ' prompt', inst.prompt); (inst.hints || []).forEach((hh) => md(ex.id + ' hint', hh)); if (inst.solution) md(ex.id + ' solution', inst.solution);
  if (SA.md.inline(inst.prompt).length === 0) bad('inline empty');
}
{
  const html = SA.md.render('> [!recall] Q1.3\n> hi\n\n| a | b |\n|---|---|\n| $|x|$ | 2 |\n\n$$\nx^2\n$$\n- one\n- **two**\n1. a\n\n<b>raw</b> [x](javascript:alert(1))');
  if (!/href="#\/u\/Q1\.3"/.test(html)) bad('recall callout not linked');
  if (!/<table>/.test(html) || !/math-block/.test(html) || !/<ul>/.test(html) || !/<ol>/.test(html)) bad('md structures missing');
  if (/<b>raw/.test(html)) bad('HTML not escaped');
  if (/href="javascript/i.test(html)) bad('javascript: link allowed');
}

/* ---- every renderer mounts, reports a response, locks ---- */
const synth = {
  multi: { template: 'multi', seed: 1, prompt: 'p', choices: ['a', 'b', 'c'], answers: [0, 2] },
  order: { template: 'order', seed: 2, prompt: 'p', items: ['one', 'two', 'three'] },
  bucket: { template: 'bucket', seed: 3, prompt: 'p', buckets: ['A', 'B'], items: [{ text: 'x', bucket: 0 }, { text: 'y', bucket: 1 }] },
  timeline: { template: 'timeline', seed: 4, prompt: 'p', slots: ['T', 'T+1'], events: [{ text: 'a', slot: 0 }, { text: 'b', slot: 1 }] },
  journal: { template: 'journal', seed: 5, prompt: 'p', accounts: ['Cash', 'Sec', 'Fee'], lines: [{ account: 'Sec', dr: 10 }, { account: 'Cash', cr: 10 }] },
  table: { template: 'table', seed: 6, prompt: 'p', columns: ['A', 'B'], rows: [['x', { answer: 5, dp: 0 }]] },
  spot: { template: 'spot', seed: 7, prompt: 'p', count: 1, doc: [{ text: 'ok', error: false }, { text: 'bad', error: true, why: 'w' }] },
  paper: { template: 'paper', seed: 8, prompt: 'p', rubric: 'r', gradingPrompt: 'G {{answer}}' },
};
const seen = new Set();
function mountAll(inst, label) {
  const c = document.createElement('div'); let last; let calls = 0;
  try {
    const hnd = SA.render.mount(c, inst, (r) => { last = r; calls++; });
    if (!calls) bad(label + ': onChange never fired');
    if (inst.choices && c.querySelectorAll('.choice').length !== inst.choices.length) bad(label + ': ' + c.querySelectorAll('.choice').length + ' of ' + inst.choices.length + ' choices shown');
    const r = hnd.get();
    if (inst.template !== 'paper') hnd.lock(SA.grade(inst, r));
    seen.add(inst.template);
  } catch (e) { bad(label + ': ' + e.stack.split('\n').slice(0, 3).join(' | ')); }
}
for (const ex of u.exercises) for (let seed = 1; seed <= 10; seed++) mountAll(SA.instance('F1.1', ex.id, seed), ex.id + '#' + seed);
u.lesson.forEach((c, i) => { if (c.check) mountAll(Object.assign({ seed: 7000 + i }, c.check), 'lesson check ' + i); });
for (const k of Object.keys(synth)) mountAll(synth[k], 'synthetic ' + k);
const need = ['mcq', 'multi', 'numeric', 'cloze', 'order', 'match', 'bucket', 'timeline', 'journal', 'table', 'spot', 'paper'];
need.forEach((t) => { if (!seen.has(t)) bad('renderer not exercised: ' + t); if (!SA.renderers[t]) bad('missing renderer ' + t); });

/* ---- isAnswered sanity ---- */
if (SA.render.isAnswered(synth.bucket, [0, null])) bad('isAnswered bucket partial');
if (!SA.render.isAnswered(synth.bucket, [0, 1])) bad('isAnswered bucket full');
if (SA.render.isAnswered({ template: 'numeric' }, '  ')) bad('isAnswered numeric blank');

console.log(problems ? 'SMOKE FAILED (' + problems + ' problems)' : 'SMOKE OK (' + mdCount + ' markdown strings, ' + seen.size + ' templates mounted)');
process.exit(problems ? 1 : 0);
