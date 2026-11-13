// Validate unit content files against app/CONTENT-CONTRACT.md.
//   node tools/validate-content.js app/content/L1/F1.1.js [more files...]   (or a directory, e.g. app/content/L1)
//   node tools/validate-content.js --core     (self-tests for core.js: parseNum, graders, password round-trip)
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const ctx = vm.createContext({ console });
const runFile = (p) => vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: p });
runFile(path.join(ROOT, 'app/js/core.js'));
runFile(path.join(ROOT, 'app/content/index.js'));
const SA = ctx.SA;
const SEEDS = 50;
let problems = 0;
const CCY_RE = /\b(EUR|USD|GBP|CHF|SGD|HKD)\b/g, ccyTally = {};
const bad = (where, msg) => { problems++; if (problems <= (+process.env.VMAX || 200)) console.log('  ✗ ' + where + ': ' + msg); };
// house style (CONTENT-CONTRACT.md "Voice"): British English, no em dashes, few semicolons, no S-ids, vetted links only
const LINKS = new Set(Object.values(JSON.parse(fs.readFileSync(path.join(ROOT, 'syllabus/LINKS.json'), 'utf8')).links));
const IZE_OK = /^(size|sizes|sized|sizing|prize|prizes|seize|seized|seizes|capsize|resize|downsize|downsized|citizen|citizens|baize|maize)$/i;
const US_WORDS = /\b(analyz(e|es|ed|ing)|color(s|ed)?|behavior|favor(able|ite)?|honor|labor|neighbor|center(s|ed)?|catalog|defense|offense|fulfill|enrollment|traveled|canceled|cancelation|modeling|modeled|labeled|labeling|percent|gray|toward|afterward|judgment)\b/i;

if (process.argv.includes('--core')) { coreTests(); process.exit(problems ? 1 : 0); }

const files = [];
for (const a of process.argv.slice(2)) {
  const p = path.resolve(a);
  if (fs.statSync(p).isDirectory()) for (const f of fs.readdirSync(p)) { if (f.endsWith('.js')) files.push(path.join(p, f)); }
  else files.push(p);
}
if (!files.length) { console.log('usage: node tools/validate-content.js <file|dir>...'); process.exit(2); }

const FORBIDDEN = [/\bfetch\s*\(/, /\bimport\s*[\s({'"]/, /\bexport\s/, /\brequire\s*\(/, /Math\.random/, /Date\.now/, /new Date\s*\(\s*\)/, /\bdocument\./, /\bwindow\./, /localStorage/, /type\s*=\s*["']module/];
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8'), rel = path.relative(ROOT, file);
  const before = problems;
  FORBIDDEN.forEach((re) => { if (re.test(src)) bad(rel, 'forbidden pattern ' + re); });
  const id = path.basename(file, '.js'), level = path.basename(path.dirname(file));
  try { runFile(file); } catch (e) { bad(rel, 'script error: ' + e.message); continue; }
  const u = SA.units[id];
  if (!u) { bad(rel, 'SA.unit id does not match file name ' + id); continue; }
  const meta = SA.COURSE.unitMeta[id];
  if (!meta) bad(rel, 'unit not in syllabus'); else if (meta.level !== level) bad(rel, 'unit belongs in ' + meta.level);
  // lesson
  if (!Array.isArray(u.lesson) || u.lesson.length < 3) bad(id, 'lesson needs 4–8 cards');
  (u.lesson || []).forEach((c, k) => {
    if (!c.md || typeof c.md !== 'string' || c.md.trim().length < 40) bad(id + ' card ' + k, 'empty/short md');
    checkText(id + ' card ' + k, c.md); checkStyle(id + ' card ' + k, c.md);
    if (((c.md.match(/\$/g) || []).length - (c.md.match(/\\\$/g) || []).length) % 2) bad(id + ' card ' + k, 'unbalanced $ math delimiters');
    if (c.check) checkInstance(id + ' card ' + k + ' check', Object.assign({}, c.check), true);
  });
  // exercises
  const syl = loadSyllabusUnit(level, id);
  if (syl && syl.exercises.length !== u.exercises.length) bad(id, `has ${u.exercises.length} exercises, syllabus lists ${syl.exercises.length}`);
  const seen = new Set();
  u.exercises.forEach((ex, k) => {
    const w = id + '/' + ex.id;
    if (!ex.id || seen.has(ex.id)) bad(w, 'missing or duplicate id'); seen.add(ex.id);
    if (!SA.templates[ex.template]) { bad(w, 'unknown template ' + ex.template); return; }
    if (syl && syl.exercises[k] && syl.exercises[k].template !== ex.template) bad(w, `template ${ex.template}, syllabus says ${syl.exercises[k].template}`);
    if (typeof ex.generate !== 'function') { bad(w, 'no generate()'); return; }
    const sigs = new Set();
    for (let s = 1; s <= SEEDS; s++) {
      let inst;
      try { inst = SA.instance(id, ex.id, s); } catch (e) { bad(w + ' seed ' + s, 'generate threw: ' + e.message); break; }
      let again; try { again = SA.instance(id, ex.id, s); } catch (e) { again = null; }
      if (JSON.stringify(again) !== JSON.stringify(inst)) { bad(w, 'not deterministic for the same seed'); break; }
      sigs.add(JSON.stringify(inst));
      const codes = new Set(JSON.stringify(inst).match(CCY_RE) || []);
      codes.forEach((c) => { ccyTally[c] = (ccyTally[c] || 0) + 1; });
      if (codes.size > 1 && !ex.multiCcy) { bad(w + ' seed ' + s, 'mixes currencies ' + [...codes].join('/') + ' (set multiCcy: true if deliberate)'); break; }
      const n0 = problems; checkInstance(w + ' seed ' + s, inst, false); if (problems > n0) break; if (s <= 3) styleInstance(w + ' seed ' + s, inst);
    }
    if (sigs.size < Math.min(10, SEEDS) && ex.template !== 'paper') bad(w, `only ${sigs.size} distinct instances in ${SEEDS} seeds — vary more`);
    if (!ex.multiCcy && /r\.market\(/.test(ex.generate.toString())) checkScale(w, id, ex.id);
  });
  console.log((problems === before ? '✓ ' : '✗ ') + rel + ` (${u.lesson.length} cards, ${u.exercises.length} exercises)`);
}
console.log('currency mix across instances: ' + Object.entries(ccyTally).sort((a, b) => b[1] - a[1]).map(([c, n]) => c + ' ' + n).join(', '));
console.log(problems ? `PROBLEMS: ${problems}` : 'OK');
process.exit(problems ? 1 : 0);

// same seed forced to EUR and to HKD: every HKD amount should be about 10x the EUR one (M.amt), not the same number
function checkScale(w, id, exId) {
  const amounts = (inst, c) => { const out = []; const re = new RegExp(c + ' (\\d[\\d,]*(?:\\.\\d+)?)( ?(k|m|bn))?', 'g'); let m; const t = JSON.stringify(inst); while ((m = re.exec(t))) out.push(+m[1].replace(/,/g, '') * ({ k: 1e3, m: 1e6, bn: 1e9 }[m[3]] || 1)); return out; };
  for (let s = 1; s <= 20; s++) {
    let a, b;
    try { SA.forceMarket = 'DE'; a = SA.instance(id, exId, s); SA.forceMarket = 'HK'; b = SA.instance(id, exId, s); } finally { SA.forceMarket = null; }
    const ea = amounts(a, 'EUR'), hb = amounts(b, 'HKD');
    if (!ea.length || !hb.length) continue;
    const ra = Math.max(...ea), rb = Math.max(...hb);
    // amounts scale 10x (M.amt), share prices 2x (M.px): anything under 1.8x means raw euro numbers in HKD
    if (ra > 0 && rb / ra < 1.8) { bad(w + ' seed ' + s, `HKD amounts not scaled: largest EUR ${ra} vs HKD ${rb} (use M.amt, or M.px for a share price)`); return; }
  }
}

function loadSyllabusUnit(level, id) {
  try { const L = JSON.parse(fs.readFileSync(path.join(ROOT, 'syllabus/levels', level + '.json'), 'utf8')); for (const m of L.modules) for (const u of m.units) if (u.id === id) return u; } catch (e) {}
  return null;
}
function checkText(w, v) {
  const s = typeof v === 'string' ? v : JSON.stringify(v);
  // \t, \f, \b in a normal JS string turn "\times", "\frac", "\bar" into control characters: use \\ or String.raw
  const raw = typeof v === 'string' ? v : JSON.stringify(v, (k, x) => (typeof x === 'string' && /[\t\f\b\v]/.test(x) ? '<<CTRL>>' : x));
  if (/[\t\f\b\v]|<<CTRL>>/.test(raw)) bad(w, 'control character in text (a TeX backslash in a normal string: write \\\\times or use String.raw)');
  if (/\bNaN\b|\bundefined\b|\bnull\b|Infinity|\[object Object\]/.test(s)) bad(w, 'text contains NaN/undefined/null/Infinity/[object Object]: ' + s.slice(0, 120));
}
function checkStyle(w, text) {
  if (typeof text !== 'string') return;
  // maths the renderer will not pick up (same rule as markdown.js: no space just inside the $...$) shows raw TeX
  text.split('\n').forEach((line) => {
    const rest = line.replace(/\\\$/g, '').replace(/\$\$[\s\S]*?\$\$/g, ' ').replace(/\$([^\s$](?:[^$\n]*?[^\s$\\])?)\$(?!\d)/g, ' ');
    if (/\$(?!\d)/.test(rest)) bad(w, 'maths not rendered (a $ is unmatched, or there is a space just inside $...$): ' + line.trim().slice(0, 100));
  });
  const prose =text.replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$/g, ' ');
  if (/\[!source\]/.test(prose) || /\bS\d{3}\b/.test(prose)) bad(w, 'source id or [!source] callout (use plain author/title in prose, sources live in the syllabus)');
  if (/—/.test(prose)) bad(w, 'em dash: rewrite with a full stop, comma or brackets');
  const semi = (prose.match(/;/g) || []).length; if (semi > 1) bad(w, semi + ' semicolons: split into sentences');
  (prose.match(/\b[A-Za-z]+iz(e|es|ed|ing|ation|ations)\b/g) || []).forEach((x) => { if (!IZE_OK.test(x)) bad(w, 'American spelling "' + x + '" (use -ise/-isation)'); });
  const m = US_WORDS.exec(prose); if (m) bad(w, 'American or banned form "' + m[0] + '" (British: analyse, colour, centre, per cent, towards...)');
  (prose.match(/https?:\/\/[^\s)\]]+/g) || []).forEach((u) => { if (!LINKS.has(u)) bad(w, 'URL not in syllabus/LINKS.json allowlist: ' + u); });
}
function styleInstance(w, i) {
  ['prompt', 'solution', 'text', 'title', 'rubric'].forEach((k) => checkStyle(w + '.' + k, i[k]));
  (i.hints || []).forEach((x, n) => checkStyle(w + '.hint' + n, x));
  (i.choices || []).forEach((x, n) => checkStyle(w + '.choice' + n, x));
  (i.doc || []).forEach((x, n) => { checkStyle(w + '.doc' + n, x.text); checkStyle(w + '.why' + n, x.why); });
}
function nonEmpty(w, v, name) { if (typeof v !== 'string' || !v.trim()) bad(w, name + ' must be a non-empty string'); }
function checkInstance(w, i, isCheck) {
  const t = i.template; if (!SA.templates[t]) { bad(w, 'unknown template ' + t); return; }
  nonEmpty(w, i.prompt, 'prompt'); checkText(w, i);
  if (i.hints && !Array.isArray(i.hints)) bad(w, 'hints must be an array');
  if (['numeric', 'table', 'journal'].includes(t) && !isCheck) nonEmpty(w, i.solution, 'solution');
  const fmtSet = (arr) => new Set(arr.map((x) => SA.normText(x)));
  switch (t) {
    case 'mcq': if (!Array.isArray(i.choices) || i.choices.length < 3 || i.choices.length > 5) bad(w, 'mcq needs 3–5 choices');
      else { if (!(i.answer >= 0 && i.answer < i.choices.length)) bad(w, 'answer index out of range'); if (fmtSet(i.choices).size !== i.choices.length) bad(w, 'duplicate choices: ' + i.choices.join(' | ')); i.choices.forEach((c, k) => { nonEmpty(w, c, 'choice'); if (k !== i.answer && SA.grade(i, k).correct) bad(w, 'distractor grades correct'); }); } break;
    case 'multi': if (!Array.isArray(i.choices) || i.choices.length < 3) bad(w, 'multi needs 3+ choices');
      else { if (!i.answers || !i.answers.length || i.answers.length === i.choices.length) bad(w, 'multi needs at least one right and one wrong'); if (fmtSet(i.choices).size !== i.choices.length) bad(w, 'duplicate choices'); } break;
    case 'numeric': if (typeof i.answer !== 'number' || !isFinite(i.answer)) bad(w, 'answer must be a finite number');
      if (i.unit === '%' && Math.abs(i.answer) < 0.5 && i.answer !== 0 && /%/.test(i.prompt) === false) bad(w, 'percent answer looks like a fraction'); break;
    case 'cloze': { const n = (i.text.match(/\[\[\d+\]\]/g) || []).length; if (!i.blanks || n !== i.blanks.length) bad(w, `cloze has ${n} placeholders, ${i.blanks ? i.blanks.length : 0} blanks`);
      (i.blanks || []).forEach((b) => { if (!b.numeric && !(b.accept && b.accept.length)) bad(w, 'blank needs accept[] or numeric'); });
      if (i.bank) (i.blanks || []).forEach((b) => { if (b.accept && !i.bank.some((x) => SA.normText(x) === SA.normText(b.accept[0]))) bad(w, 'bank lacks answer ' + b.accept[0]); }); break; }
    case 'order': if (!i.items || i.items.length < 3) bad(w, 'order needs 3+ items'); else if (fmtSet(i.items).size !== i.items.length) bad(w, 'duplicate items'); break;
    case 'match': if (!i.pairs || i.pairs.length < 3) bad(w, 'match needs 3+ pairs'); else { if (fmtSet(i.pairs.map((p) => p[1])).size !== i.pairs.length) bad(w, 'duplicate right sides'); if (fmtSet(i.pairs.map((p) => p[0])).size !== i.pairs.length) bad(w, 'duplicate left sides'); } break;
    case 'bucket': if (!i.buckets || i.buckets.length < 2 || !i.items || i.items.length < 3) bad(w, 'bucket needs 2+ buckets, 3+ items'); else i.items.forEach((it) => { if (!(it.bucket >= 0 && it.bucket < i.buckets.length)) bad(w, 'item bucket out of range'); nonEmpty(w, it.text, 'item text'); }); break;
    case 'timeline': if (!i.slots || !i.events || i.events.length < 2) bad(w, 'timeline needs slots and 2+ events'); else i.events.forEach((e) => { if (!(e.slot >= 0 && e.slot < i.slots.length)) bad(w, 'event slot out of range'); }); break;
    case 'journal': { if (!i.lines || !i.lines.length || !i.accounts) { bad(w, 'journal needs lines and accounts'); break; }
      let dr = 0, cr = 0; for (const l of i.lines) { if (!i.accounts.includes(l.account)) bad(w, 'line account not in accounts list: ' + l.account); dr += l.dr || 0; cr += l.cr || 0; if (!((l.dr > 0) ^ (l.cr > 0))) bad(w, 'each line needs exactly one positive dr or cr'); }
      if (Math.abs(dr - cr) > 0.005) bad(w, `answer key does not balance: Dr ${dr} Cr ${cr}`);
      if (i.accounts.length < new Set(i.lines.map((l) => l.account)).size + 2) bad(w, 'add 2+ distractor accounts'); break; }
    case 'table': if (!i.columns || !i.rows) bad(w, 'table needs columns and rows'); else { let blanks = 0; i.rows.forEach((r) => { if (r.length !== i.columns.length) bad(w, 'row length != columns'); r.forEach((c) => { if (c && typeof c === 'object') { blanks++; if (c.answer != null && !isFinite(c.answer)) bad(w, 'cell answer not finite'); } }); }); if (!blanks) bad(w, 'table has no blanks'); } break;
    case 'spot': if (!i.doc || i.doc.length < 3) bad(w, 'spot needs 3+ segments'); else { const errs = i.doc.filter((d) => d.error); if (!errs.length) bad(w, 'spot has no error segment'); if (errs.length === i.doc.length) bad(w, 'every segment is an error'); errs.forEach((d) => nonEmpty(w, d.why, 'why')); } break;
    case 'paper': nonEmpty(w, i.rubric, 'rubric'); if (!/\{\{answer\}\}/.test(i.gradingPrompt || '')) bad(w, 'gradingPrompt needs {{answer}}'); break;
  }
  if (t === 'multi' && i.answers) { const wrong = i.answers.slice(1); if (SA.grade(i, wrong).correct && wrong.length) bad(w, 'partial selection grades correct'); }
  // the answer key must grade as correct
  try { const g = SA.grade(i, JSON.parse(JSON.stringify(SA.answerKey(i)))); if (!g.correct) bad(w, 'answer key does not grade as correct (' + (g.detail || '') + ')'); } catch (e) { bad(w, 'grading threw: ' + e.message); }
}

function coreTests() {
  const eq = (name, got, want) => { if (got !== want && !(Number.isNaN(got) && Number.isNaN(want))) bad('core', `${name}: got ${got}, want ${want}`); };
  const P = SA.parseNum;
  [['4000', 4000], ['4,000.00', 4000], ['4.000,00', 4000], ['1 234,5', 1234.5], ['3,25', 3.25], ['0,5', 0.5], ['3.2%', 3.2], ['EUR 4,000', 4000],
   ['-12', -12], ['1.234.567', 1234567], ['1,234,567.89', 1234567.89], ['12.5', 12.5], ['abc', NaN], ['', NaN], ['€1.5', 1.5], ['−5', -5]].forEach(([s, v]) => eq('parseNum ' + s, P(s), v));
  [['SGD 1,200', 1200], ['HK$ 50', 50], ['S$3.5', 3.5], ['US$10', 10], ['1,200 HKD', 1200]].forEach(([s, v]) => eq('parseNum ' + s, P(s), v));
  const isinOk = (i) => { if (!/^[A-Z]{2}[A-Z0-9]{9}\d$/.test(i)) return false; const d = i.slice(0, 11).split('').map((c) => (/\d/.test(c) ? c : String(c.charCodeAt(0) - 55))).join(''); let sum = 0, dbl = true; for (let k = d.length - 1; k >= 0; k--) { let x = +d[k]; if (dbl) { x *= 2; if (x > 9) x -= 9; } sum += x; dbl = !dbl; } return (10 - (sum % 10)) % 10 === +i[11]; };
  Object.values(SA.MARKETS).forEach((m) => m.companies.forEach((c) => { if (!isinOk(c.isin)) bad('core', 'bad ISIN check digit ' + m.key + ' ' + c.n + ' ' + c.isin); }));
  { const r = SA.rng('mk'), seen = {}; for (let k = 0; k < 2000; k++) { const m = r.market(); seen[m.region] = (seen[m.region] || 0) + 1; } if (['EU', 'UK', 'US', 'SG', 'HK'].some((g) => !seen[g]) || seen.EU < 600) bad('core', 'market mix off: ' + JSON.stringify(seen)); if (SA.rng('x').market({ only: ['HK'] }).key !== 'HK') bad('core', 'market only filter'); }
  eq('fmt.num', SA.fmt.num(1234567.891, 2), '1,234,567.89'); eq('fmt.pct', SA.fmt.pct(0.032), '3.20%'); eq('fmt.bp', SA.fmt.bp(0.0045), '45 bp');
  eq('addBusinessDays Fri+1', SA.fmt.addBusinessDays('2026-11-06', 1), '2026-11-09'); eq('dayDiff', SA.fmt.dayDiff('2026-01-01', '2026-03-01'), 59);
  eq('round 2.675', SA.fmt.round(2.675, 2), 2.68);
  const j = { template: 'journal', accounts: ['Cash', 'Securities', 'Fees', 'X'], lines: [{ account: 'Securities', dr: 100 }, { account: 'Fees', dr: 2 }, { account: 'Cash', cr: 102 }] };
  eq('journal key', SA.grade(j, SA.answerKey(j)).correct, true);
  eq('journal split lines', SA.grade(j, [{ account: 'Securities', side: 'Dr', amount: '60' }, { account: 'Securities', side: 'Dr', amount: '40' }, { account: 'Fees', side: 'Dr', amount: '2' }, { account: 'Cash', side: 'Cr', amount: '102,00' }]).correct, true);
  eq('journal wrong side', SA.grade(j, [{ account: 'Securities', side: 'Cr', amount: '100' }, { account: 'Fees', side: 'Dr', amount: '2' }, { account: 'Cash', side: 'Dr', amount: '98' }]).correct, false);
  // mastery
  const st = SA.newState();
  SA.applyPractice(st, 'F1.1', [{ unitId: 'F1.1', correct: true }, { unitId: 'F1.1', correct: true }, { unitId: 'F1.1', correct: false, retried: true }]);
  eq('lv after 2/3', SA.unitLevel(st, 'F1.1'), 1);
  SA.applyPractice(st, 'F1.1', [{ unitId: 'F1.1', correct: true }, { unitId: 'F1.1', correct: true }, { unitId: 'F1.1', correct: true }]);
  eq('lv after 3/3', SA.unitLevel(st, 'F1.1'), 3);
  st.units['F1.1'].pd -= 1; SA.applyPractice(st, 'F1.2', [{ unitId: 'F1.2', correct: true }, { unitId: 'F1.1', correct: true, callback: true }]);
  eq('mastered via callback next day', SA.unitLevel(st, 'F1.1'), 4);
  eq('xp', st.xp, 10 * 2 + 3 + 30 + 5 + 20); // +5 combo for 3 first-try answers in a row
  // password round-trip + tamper detection
  const r = SA.rng('pw');
  for (let n = 0; n < 200; n++) {
    const s = SA.newState(); s.xp = r.int(0, 2e6); s.streak = r.int(0, 900); s.lastDay = r.int(19000, 30000);
    for (const id of SA.COURSE.unitIds) if (r.bool(0.4)) s.units[id] = { lv: r.int(1, 4), pd: 0 };
    for (const id of SA.COURSE.moduleIds) if (r.bool(0.3)) s.modTests[id] = 1;
    for (const id of SA.COURSE.levelIds) if (r.bool(0.3)) s.checkpoints[id] = 1;
    for (const g of SA.COURSE.games) if (r.bool(0.5)) s.games[g] = r.int(1, 65535);
    const pw = SA.encodePassword(s), d = SA.decodePassword(pw.toLowerCase());
    const lv = (x) => SA.COURSE.unitIds.map((id) => SA.unitLevel(x, id)).join('');
    if (d.xp !== s.xp || d.streak !== s.streak || d.lastDay !== s.lastDay || lv(d) !== lv(s) || JSON.stringify(Object.keys(d.modTests).sort()) !== JSON.stringify(Object.keys(s.modTests).sort()) || JSON.stringify(d.games) !== JSON.stringify(Object.fromEntries(SA.COURSE.games.filter((g) => s.games[g]).map((g) => [g, s.games[g]])))) { bad('core', 'password round-trip mismatch at ' + n); break; }
    const chars = pw.replace(/-/g, ''); const k = r.int(0, chars.length - 1); const alt = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'.replace(chars[k], '')[r.int(0, 30)];
    let rejected = false; try { SA.decodePassword(chars.slice(0, k) + alt + chars.slice(k + 1)); } catch (e) { rejected = true; }
    if (!rejected) { bad('core', 'tampered password accepted at ' + n); break; }
    if (n === 0) console.log('  sample password length: ' + pw.length + ' chars');
  }
  // v2 progress code: round trip, tamper rejection, typical length; v1 passwords still load
  {
    const r = SA.rng('code-v2'), lens = [];
    for (let n = 0; n < 200; n++) {
      const s = SA.newState(); s.xp = r.int(0, 2e6); s.streak = r.int(0, 900); s.lastDay = r.int(20001, 30000); s.freezes = r.int(0, 3);
      const reach = r.int(0, SA.COURSE.unitIds.length); // realistic: progress runs along the course
      SA.COURSE.unitIds.forEach((id, k) => { if (k < reach) s.units[id] = { lv: r.bool(0.97) ? 3 + r.int(0, 1) : r.int(1, 2), pd: 0 }; }); // realistic: behind the frontier almost everything is Proficient+
      for (const id of SA.COURSE.moduleIds) if (r.bool(0.2)) s.modTests[id] = 1;
      for (const id of SA.COURSE.levelIds) if (r.bool(0.3)) s.checkpoints[id] = 1;
      for (const g of SA.COURSE.games) if (r.bool(0.5)) s.games[g] = r.int(1, 65535);
      const code = SA.encodeCode(s), d = SA.decodePassword(code.toUpperCase()); lens.push(code.length);
      const lv = (x) => SA.COURSE.unitIds.map((id) => SA.unitLevel(x, id)).join('');
      if (d.xp !== s.xp || d.streak !== s.streak || d.lastDay !== s.lastDay || d.freezes !== s.freezes || lv(d) !== lv(s) || JSON.stringify(Object.keys(d.modTests).sort()) !== JSON.stringify(Object.keys(s.modTests).sort()) || JSON.stringify(Object.keys(d.checkpoints).sort()) !== JSON.stringify(Object.keys(s.checkpoints).sort()) || JSON.stringify(d.games) !== JSON.stringify(Object.fromEntries(SA.COURSE.games.filter((g) => s.games[g]).map((g) => [g, s.games[g]])))) { bad('core', 'code v2 round-trip mismatch at ' + n); break; }
      const chars = code.replace(/-/g, '').toUpperCase(), k = r.int(0, chars.length - 1), alt = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'.replace(chars[k], '')[r.int(0, 30)];
      let rejected = false; try { const t = SA.decodePassword(chars.slice(0, k) + alt + chars.slice(k + 1)); rejected = JSON.stringify(t) !== JSON.stringify(d) ? false : true; } catch (e) { rejected = true; }
      if (!rejected) lens.tampered = (lens.tampered || 0) + 1;
    }
    if ((lens.tampered || 0) > 2) bad('core', 'code v2 accepted ' + lens.tampered + '/200 typos');
    const fresh = SA.encodeCode(SA.newState()); lens.sort((a, b) => a - b);
    console.log('  progress code: new learner ' + fresh.length + ' chars (' + fresh + '), median ' + lens[100] + ', max ' + lens[199] + '; typos accepted ' + (lens.tampered || 0) + '/200');
    const old = SA.newState(); old.xp = 1234; old.units['F1.1'] = { lv: 3, pd: 0 };
    if (SA.decodePassword(SA.encodePassword(old)).xp !== 1234) bad('core', 'v1 password no longer loads');
    { const s2 = SA.newState(); Object.assign(s2.settings, { feedback: 'end', dailyGoal: 20, sandbox: true, placed: 1, theme: 'light', accent: SA.accentIds()[2] }); s2.daily = { d: SA.today(), n: 7, done: 0 }; s2.stats = { sets: 12, dailyDays: 4, bestCombo: 9 };
      const code = SA.encodeCode(s2), t = SA.decodePassword(code);
      if (!/^([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12} ?)+$/.test(code)) bad('core', 'progress code is not a run of v4 UUIDs: ' + code);
      { const s3 = SA.newState(); s3.settings.dailyGoal = 37; s3.settings.sandbox = true; const t3 = SA.decodePassword(SA.encodeCode(s3)); if (t3.settings.dailyGoal !== 37 || !t3.settings.sandbox) bad('core', 'custom daily goal lost in progress code'); }
      { const s4 = SA.newState(); s4.daily = { d: SA.today(), n: 8, done: 0 }; SA.setDailyGoal(s4, 8); if (!s4.daily.done || SA.setDailyGoal(s4, 0) !== null) bad('core', 'setDailyGoal: lowering to the count must meet the goal, 0 must be refused'); }
      if (JSON.stringify(t.settings) !== JSON.stringify(s2.settings) || JSON.stringify(t.daily) !== JSON.stringify(s2.daily) || JSON.stringify(t.stats) !== JSON.stringify(s2.stats)) bad('core', 'settings/daily/stats lost in progress code: ' + JSON.stringify([t.settings, t.daily, t.stats])); }
  }
  // daily goal, refresher queue, fading, blitz XP cap, achievements in the progress code
  {
    const d = SA.today(), s = SA.newState(); s.settings.dailyGoal = 5;
    const ev = SA.applyPractice(s, 'F1.1', [1, 1, 1, 1, 1].map(() => ({ unitId: 'F1.1', correct: true }))).events;
    if (!ev.some((e) => e.type === 'dailyDone') || !SA.dailyProgress(s).done) bad('core', 'daily goal not met after 5 correct');
    if (!s.ach['first-set'] || !s.ach.flawless) bad('core', 'achievements first-set/flawless not awarded');
    // F1.1 is now Proficient (pd = today): not due today, due in 2 days
    if (SA.dueUnits(s, d).length !== 0 || SA.dueUnits(s, d + 2).indexOf('F1.1') < 0) bad('core', 'review due dates wrong: ' + SA.dueUnits(s, d + 2));
    s.units['F1.1'].pd = d - 2; // pretend it became Proficient two days ago
    const rv = SA.applyReviewSet(s, [{ unitId: 'F1.1', correct: true }]);
    if (s.units['F1.1'].lv !== 4 || s.units['F1.1'].ix !== 1 || s.units['F1.1'].rv !== d) bad('core', 'review did not advance: ' + JSON.stringify(s.units['F1.1']));
    if (!rv.events.some((e) => e.type === 'queueCleared')) bad('core', 'queue-cleared bonus missing');
    s.units['F1.1'].rv = d - 10; // interval 5 days, overdue by 10 >= 2 x interval -> fades
    if (SA.decayMastery(s, d) !== 1 || s.units['F1.1'].lv !== 3) bad('core', 'mastery did not fade');
    const b = SA.newState(); SA.applyBlitz(b, 'bz_ledger', 500, 60);
    if (b.xp !== SA.XP.blitzMax + SA.XP.daily || b.games.bz_ledger !== 500 || !b.ach['desk-first']) bad('core', 'blitz XP/PB wrong: xp ' + b.xp);
    SA.applyBlitz(b, 'bz_ledger', 600, 1); if (b.stats.pb !== 1) bad('core', 'blitz PB beat not counted');
    const back = SA.decodePassword(SA.encodeCode(s));
    if (!back.ach.flawless || !back.ach['first-set']) bad('core', 'achievements lost in progress code');
  }
  // rank ladder and streak freezes
  {
    eq('rank 0', SA.rankOf(0).level, 1); eq('rank 100', SA.rankOf(100).level, 2); eq('rank 299', SA.rankOf(299).level, 2); eq('rank 300', SA.rankOf(300).level, 3); eq('rank title 10', SA.rankOf(SA.xpForRank(10)).title, 'Senior analyst');
    const s = SA.newState(); const ev = SA.awardXp(s, 320);
    if (!ev.some((e) => e.type === 'rankup' && e.to === 3) || s.freezes !== 2) bad('core', 'rank-up did not bank freezes: ' + s.freezes);
    s.lastDay = SA.today() - 3; s.streak = 5; SA.awardXp(s, 1); // missed 2 days, 2 freezes cover them
    if (s.streak !== 6 || s.freezes !== 0) bad('core', 'freezes did not cover missed days: streak ' + s.streak + ', freezes ' + s.freezes);
    s.lastDay = SA.today() - 2; SA.awardXp(s, 1); if (s.streak !== 1) bad('core', 'streak should reset without freezes');
  }
  // lesson XP is one-time; practice XP has a combo bonus; xpDone avoids double counting
  {
    const s = SA.newState();
    const a = SA.lessonCard(s, 'F1.1', 1).length + SA.lessonCard(s, 'F1.1', 1).length + SA.lessonCard(s, 'F1.1', 2).length;
    const b = SA.lessonCheck(s, 'F1.1', 1, true).filter((e) => e.type === 'xp').length + SA.lessonCheck(s, 'F1.1', 1, true).filter((e) => e.type === 'xp').length + SA.lessonCheck(s, 'F1.1', 2, false).filter((e) => e.type === 'xp').length;
    const xpEv = (ev) => ev.filter((e) => e.type === 'xp').length; const c = xpEv(SA.lessonDone(s, 'F1.1')) + xpEv(SA.lessonDone(s, 'F1.1'));
    if (a !== 2 || b !== 1 || c !== 1 || s.xp !== 2 * SA.XP.card + SA.XP.check + SA.XP.lesson) bad('core', 'lesson XP not one-time: ' + [a, b, c, s.xp]);
    const res = [1, 1, 1, 0, 1].map((k) => ({ unitId: 'F1.1', correct: !!k, retried: !k, solved: true, callback: false }));
    if (SA.practiceXp(res) !== 4 * SA.XP.first + SA.XP.combo + SA.XP.retry) bad('core', 'practiceXp combo maths ' + SA.practiceXp(res));
    const s2 = SA.newState(); SA.applyPractice(s2, 'F1.1', res, { xpDone: true }); if (s2.xp !== 0) bad('core', 'xpDone still awarded XP');
    const s3 = SA.newState(); SA.applyPractice(s3, 'F1.1', res); if (s3.xp !== SA.practiceXp(res)) bad('core', 'applyPractice XP ' + s3.xp);
    // two callbacks for one unit, one right and one wrong: no promote-then-demote, no level rows at all
    { const td = SA.today(), own = [1, 2, 3].map(() => ({ unitId: 'F1.1', correct: true }));
      const flip = SA.newState(); flip.units['Q1.1'] = { lv: 3, pd: td - 3 };
      const o1 = SA.applyPractice(flip, 'F1.1', own.concat([{ unitId: 'Q1.1', correct: true, callback: true }, { unitId: 'Q1.1', correct: false, callback: true }]));
      const q = o1.events.filter((e) => e.type === 'level' && e.unitId === 'Q1.1');
      if (flip.units['Q1.1'].lv !== 3 || q.length) bad('core', 'mixed callbacks flip-flopped: lv ' + flip.units['Q1.1'].lv + ', events ' + JSON.stringify(q));
      const up = SA.newState(); up.units['Q1.1'] = { lv: 3, pd: td - 3 };
      const o2 = SA.applyPractice(up, 'F1.1', own.concat([{ unitId: 'Q1.1', correct: true, callback: true }, { unitId: 'Q1.1', correct: true, callback: true }]));
      if (up.units['Q1.1'].lv !== 4 || o2.events.filter((e) => e.type === 'level' && e.unitId === 'Q1.1').length !== 1) bad('core', 'all-right callbacks should master once');
      const rv = SA.newState(); rv.units['Q1.1'] = { lv: 4, pd: td - 30, ix: 2, rv: td - 20 };
      const o3 = SA.applyReviewSet(rv, [{ unitId: 'Q1.1', correct: false }, { unitId: 'Q1.1', correct: true }]);
      if (rv.units['Q1.1'].lv !== 3 || o3.events.filter((e) => e.type === 'level').length !== 1) bad('core', 'review set mixed result: ' + JSON.stringify(rv.units['Q1.1'])); }
  }
  // placement: all-correct learner places every built module; all-wrong learner stops after 2 modules and places nothing
  {
    const run = (answer, timePerQ) => {
      const st = SA.newState(), ps = SA.placementStart(42); let t = 0, nOk = 0, probes = 0, guard = 0;
      for (let p; (p = SA.placementNext(ps, st, t)) && guard++ < 500;) {
        probes++; const rs = p.items.map(() => ({ correct: answer() })); nOk += rs.filter((x) => x.correct).length; t += timePerQ * rs.length;
        SA.placementRecord(ps, p.modId, rs);
      }
      SA.applyPlacement(st, ps, nOk); return { st, ps, probes, t };
    };
    const builtMods = SA.COURSE.moduleIds.filter((id) => SA.COURSE.modules[id].units.some((u) => SA.COURSE.unitMeta[u].built));
    const ace = run(() => true, 20);
    if (ace.ps.passed.length !== builtMods.length) bad('core', 'placement ace passed ' + ace.ps.passed.length + '/' + builtMods.length);
    if (builtMods.some((m) => SA.moduleLevel(ace.st, SA.COURSE.modules[m]) < 3)) bad('core', 'placement did not set passed modules to Proficient');
    const dud = run(() => false, 20);
    if (dud.ps.passed.length || dud.probes !== SA.PLACEMENT.maxFails || Object.keys(dud.st.units).length) bad('core', 'placement dud: probes ' + dud.probes + ', passed ' + dud.ps.passed.length);
    const slow = run(() => false, 400); if (slow.probes > 2) bad('core', 'placement ignores time limit');
    const hi = SA.newState(); hi.units['F1.1'] = { lv: 4, pd: 1 }; const ps = SA.placementStart(1); ps.passed.push('F1'); SA.applyPlacement(hi, ps, 0);
    if (hi.units['F1.1'].lv !== 4) bad('core', 'placement lowered a level');
    console.log('  placement: ace ' + ace.probes + ' modules in ' + Math.round(ace.t / 60) + ' min, dud stops after ' + dud.probes);
  }
  console.log(problems ? `CORE PROBLEMS: ${problems}` : 'CORE OK');
}
