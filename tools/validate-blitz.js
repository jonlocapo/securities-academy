// Validate blitz desk games (app/js/games/blitz-*.js) against the contract in app/js/games/blitz.js.
//   node tools/validate-blitz.js            (all games)
//   node tools/validate-blitz.js bz_ledger  (one game)
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..'), GAMES = path.join(ROOT, 'app/js/games');
const ctx = vm.createContext({ console });
const run = (p) => vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: p });
run(path.join(ROOT, 'app/js/core.js')); run(path.join(GAMES, 'blitz.js'));
const FORBIDDEN = [/Math\.random/, /Date\.now/, /new Date\s*\(/, /\bdocument\./, /\bwindow\./, /localStorage/, /\bfetch\s*\(/, /\brequire\s*\(/];
let problems = 0; const bad = (w, m) => { problems++; if (problems < 80) console.log('  ✗ ' + w + ': ' + m); };
const files = fs.readdirSync(GAMES).filter((f) => /^blitz-.+\.js$/.test(f));
for (const f of files) { const src = fs.readFileSync(path.join(GAMES, f), 'utf8'); FORBIDDEN.forEach((re) => { if (re.test(src)) bad(f, 'forbidden ' + re); }); try { run(path.join(GAMES, f)); } catch (e) { bad(f, 'script error: ' + e.message); } }
const only = process.argv[2], B = ctx.SA.blitz;
const keys = Object.keys(B.games).filter((k) => !only || k === only);
const want = ctx.SA.REWARDS.filter((r) => r.kind === 'game').map((r) => r.id);
if (!only) want.forEach((k) => { if (!B.games[k]) console.log('  - not built yet: ' + k); });
for (const key of keys) {
  const g = B.games[key], before = problems, seen = new Set(), answers = [0, 0, 0, 0];
  if (want.indexOf(key) < 0) bad(key, 'key not in SA.REWARDS (kind game)');
  ['name', 'blurb', 'icon'].forEach((k) => { if (!g[k] || typeof g[k] !== 'string') bad(key, 'missing ' + k); });
  if (/—/.test(g.blurb || '')) bad(key, 'em dash in blurb');
  for (let s = 1; s <= 40 && problems - before < 5; s++) for (let k = 0; k < 30; k++) {
    let it, again;
    try { it = g.item(ctx.SA.rng('v/' + key + '/' + s + '/' + k), ctx.SA.fmt, k); again = g.item(ctx.SA.rng('v/' + key + '/' + s + '/' + k), ctx.SA.fmt, k); } catch (e) { bad(key + ' s' + s + ' k' + k, 'item threw: ' + e.message); break; }
    const w = key + ' s' + s + ' k' + k, txt = JSON.stringify(it);
    if (txt !== JSON.stringify(again)) { bad(w, 'not deterministic'); break; }
    if (/NaN|undefined|null|Infinity|\[object/.test(txt)) { bad(w, 'bad value in ' + txt.slice(0, 120)); break; }
    if (/—/.test(txt)) { bad(w, 'em dash'); break; }
    if (typeof it.prompt !== 'string' || !it.prompt.trim()) { bad(w, 'empty prompt'); break; }
    if (it.prompt.length > 220) { bad(w, 'prompt too long for a blitz item (' + it.prompt.length + ' chars)'); break; }
    if (!Array.isArray(it.choices) || it.choices.length < 2 || it.choices.length > 4) { bad(w, 'needs 2-4 choices'); break; }
    if (new Set(it.choices).size !== it.choices.length || it.choices.some((c) => typeof c !== 'string' || !c.trim())) { bad(w, 'choices must be distinct non-empty strings: ' + JSON.stringify(it.choices)); break; }
    if (!Number.isInteger(it.answer) || it.answer < 0 || it.answer >= it.choices.length) { bad(w, 'answer index out of range'); break; }
    if (it.data && (!Array.isArray(it.data) || it.data.some((r) => !Array.isArray(r) || r.length !== 2))) { bad(w, 'data must be [[label, value], ...]'); break; }
    seen.add(it.prompt);
    const inst = B.instance(key, s, k); answers[inst.answer]++;
  }
  if (seen.size < 25) bad(key, 'only ' + seen.size + ' distinct prompts in 1,200 items: vary more');
  console.log((problems === before ? '✓ ' : '✗ ') + key + ' (' + seen.size + ' distinct prompts; answer positions ' + answers.join('/') + ')');
}
console.log(problems ? 'PROBLEMS: ' + problems : 'OK');
process.exit(problems ? 1 : 0);
