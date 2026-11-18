// which units are used as callback sources? node tools/scan-callbacks.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const ctx = vm.createContext({ console }); ctx.window = ctx; ctx.globalThis = ctx;
for (const f of ['app/js/core.js', 'app/content/index.js']) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx);
const C = ctx.SA.COURSE, cnt = {}; let built = 0, none = 0;
for (const id of C.unitIds) { const m = C.unitMeta[id]; if (!m.built) continue; built++; const cb = m.callbacks || []; if (!cb.length) none++; for (const x of cb) cnt[x] = (cnt[x] || 0) + 1; }
console.log('built units', built, '| without callbacks', none);
console.log(Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => k + ' x' + v).join(', '));
for (const id of ['Q1.5', 'P1.2', 'F1.3']) console.log(id, '->', JSON.stringify(C.unitMeta[id].callbacks));
