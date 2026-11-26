// Copy check (Node, no npm): node tools/lint-copy.js
// Fails when text meant for authors, or text that explains the interface, reaches the course. Rules: DECISIONS.md,
// "Interface design". Checks the built course data, the lesson files and the interface code.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
let problems = 0;
const bad = (where, msg) => { problems++; console.log('  FAIL ' + where + ': ' + msg); };

// scoping notes and author voice from the syllabus (build_course.py strips the scoping notes; nothing else may add them)
const AUTHOR = [
  [/\b(?:at|on) (?:a )?(?:headline|high|conceptual) level\b/i, 'author scoping note'],
  [/\bconceptually\b|\(simplified\)|in an intuitive example|to a simple example/i, 'author scoping note'],
  [/\b(?:preview only|headline only|headline reading|for role names only|skim only|reference only)\b/i, 'reading note for authors'],
  [/\bthe learner\b|\blearners? can\b/i, 'written about the learner, not to them'],
  [/\b(?:drills?|unlimited retries|callbacks?|minigame|boss quiz|spaced[- ]review)\b/i, 'describes how the course works'],
  [/\b(?:TODO|TBD|FIXME|unverified)\b|\(verify\)/, 'unfinished note'],
];
const authorCheck = (where, text) => { for (const [re, why] of AUTHOR) if (re.test(text)) { bad(where, why + ': "' + text.slice(0, 120) + '"'); return; } };

/* 1. course data shown on module and unit pages */
const ctx = vm.createContext({}); ctx.globalThis = ctx;
vm.runInContext(fs.readFileSync(path.join(ROOT, 'app/js/core.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'app/content/index.js'), 'utf8'), ctx);
const C = ctx.SA.COURSE;
for (const m of Object.values(C.modules)) {
  authorCheck('module ' + m.id + ' hook', m.hook || '');
  if ('jurisdiction_notes' in m) bad('module ' + m.id, 'jurisdiction notes are for authors and must not be in the course data');
}
for (const [id, u] of Object.entries(C.unitMeta)) {
  (u.objectives || []).forEach((o) => authorCheck('unit ' + id + ' objective', o.replace(/^Learner can /i, '')));
  (u.reading || []).forEach((r) => authorCheck('unit ' + id + ' reading', typeof r === 'string' ? r : r.text));
}

/* 2. lesson files: no level codes (the course says "Module N"), no author voice in the text */
const contentDir = path.join(ROOT, 'app/content');
for (const lv of fs.readdirSync(contentDir).filter((d) => /^L\d$/.test(d))) {
  for (const f of fs.readdirSync(path.join(contentDir, lv)).filter((x) => x.endsWith('.js'))) {
    const src = fs.readFileSync(path.join(contentDir, lv, f), 'utf8');
    // text only: the contents of backtick and quote strings
    const strings = src.match(/`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g) || [];
    for (const s of strings) {
      if (/\b(?:in|see|from|to|until|at) L[1-8]\b|\bLevel [1-8]\b/.test(s)) bad(lv + '/' + f, 'level code in the text, say "Module N": ' + s.slice(0, 100));
      if (/\bthe learner\b|\blearners? can\b/i.test(s)) bad(lv + '/' + f, 'written about the learner: ' + s.slice(0, 100));
      if (/\b(?:TODO|TBD|FIXME)\b/.test(s)) bad(lv + '/' + f, 'unfinished note: ' + s.slice(0, 100));
    }
  }
}

/* 3. interface code: no placeholder text, no tooltips that explain. A line may carry `copy-ok` (with a reason) for a
      deliberate exception, such as a note the learner opens on purpose. */
const jsDir = path.join(ROOT, 'app/js');
const files = fs.readdirSync(jsDir).filter((f) => f.endsWith('.js')).map((f) => path.join(jsDir, f))
  .concat(fs.readdirSync(path.join(jsDir, 'games')).filter((f) => f.endsWith('.js')).map((f) => path.join(jsDir, 'games', f)));
const GUIDES = ['tour.js', 'demo.js']; // opened on purpose: they exist to explain
for (const file of files) {
  if (GUIDES.includes(path.basename(file))) continue;
  fs.readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (/copy-ok/.test(line)) return;
    const where = path.relative(ROOT, file) + ':' + (i + 1);
    if (/\bplaceholder\s*[:=,]\s*['"`][^'"`]/.test(line) || /setAttribute\(\s*'placeholder'/.test(line)) bad(where, 'placeholder text');
    // a tooltip is a label, not a sentence: flag title strings that read as explanations
    for (const m of line.matchAll(/title:\s*'([^']*)'/g)) {
      const t = m[1];
      if (/\.\s+[A-Z]|\.\s*$/.test(t) || t.split(/\s+/).length > 10) bad(where, 'explanatory tooltip: "' + t.slice(0, 80) + '"');
    }
  });
}

if (problems) { console.log('COPY: ' + problems + ' problem(s)'); process.exit(1); }
console.log('COPY OK');
