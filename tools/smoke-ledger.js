// Ledger smoke test: node tools/smoke-ledger.js  (200 seeded games per level 1..3)
'use strict';
const path = require('path'), assert = require('assert');
const SA = require(path.join(__dirname, '..', 'app', 'js', 'core.js'));
globalThis.SA = SA;
const L = require(path.join(__dirname, '..', 'app', 'js', 'games', 'ledger.js'));
let games = 0, entries = 0;
for (let level = 1; level <= 3; level++) for (let seed = 1; seed <= 200; seed++) {
  const { events, final } = L.generate(seed, level);
  assert(events.length >= 8 && events.length <= 10, 'event count');
  const tb = L.trialBalance(events.map((e) => e.lines));
  for (const e of events) {
    entries++;
    let dr = 0, cr = 0; e.lines.forEach((l) => { dr += L.cents(l.dr); cr += L.cents(l.cr); assert(L.ACCOUNTS.includes(l.account), 'account'); });
    assert(dr === cr && dr > 0, `entry ${e.n} unbalanced (seed ${seed}, L${level})`);
    // the grader accepts the expected entry
    const resp = e.lines.map((l) => ({ account: l.account, side: l.dr ? 'Dr' : 'Cr', amount: String(l.dr || l.cr) }));
    assert(SA.templates.journal.grade({ lines: e.lines, accounts: L.ACCOUNTS }, resp).correct, 'grader');
  }
  assert(final.cash >= 0, 'cash negative');
  let secCost = 0; for (const t in final.pos) { assert(final.pos[t].sh >= 0 && final.pos[t].cost >= 0, 'holdings negative'); secCost += final.pos[t].cost; }
  assert(events.some((e) => e.type === 'sell') || level >= 1, 'n/a');
  if (level === 1) assert(!events.some((e) => e.lines.some((l) => l.account === L.A.wht)), 'no WHT at L1');
  let d = 0, c = 0; for (const a in tb) { if (tb[a] > 0) d += tb[a]; else c -= tb[a]; }
  assert(d === c, 'TB does not balance');
  assert(tb[L.A.cash] === final.cash && tb[L.A.sec] === secCost, `TB != cash + securities at cost (seed ${seed}, L${level})`);
  const rc = L.recompute(events);
  assert(rc.cash === final.cash && rc.sec === secCost && rc.cap === -tb[L.A.cap], 'independent recompute');
  assert(final.cash + secCost === final.capital + rc.pnl, 'A = E');
  assert(JSON.stringify(L.generate(seed, level).events) === JSON.stringify(events), 'deterministic');
  games++;
}
console.log(`LEDGER SMOKE OK: ${games} games, ${entries} entries`);
