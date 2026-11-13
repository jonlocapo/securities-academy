/* Securities Academy — core (pure logic, no DOM). Loaded as a classic script in the browser and by
   tools/validate-content.js in Node. Owns: registry, seeded RNG, formatters, number parsing, template graders,
   mastery rules, session composition, progress password. Spec: app/CONTENT-CONTRACT.md */
(function (root) {
  'use strict';
  const SA = root.SA || (root.SA = {});
  SA.units = SA.units || {};          // unitId -> unit definition (from content/<L>/<unit>.js)
  SA.minigames = SA.minigames || {};  // name -> { mount(el, opts, done) }
  SA.unit = function (def) { SA.units[def.id] = def; if (SA.onUnitLoaded) SA.onUnitLoaded(def.id); };
  SA.minigame = function (name, def) { SA.minigames[name] = def; };

  /* ---------- seeded RNG ---------- */
  function hash(str) { let h = 2166136261 >>> 0; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) {
    let a = typeof seed === 'number' ? seed >>> 0 : hash(String(seed));
    const next = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const r = {
      next,
      int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
      float: (lo, hi, step) => { step = step || 0.01; const n = Math.round((hi - lo) / step); return round(lo + Math.floor(next() * (n + 1)) * step, decimals(step)); },
      pick: (arr) => arr[Math.floor(next() * arr.length)],
      bool: (p) => next() < (p == null ? 0.5 : p),
      shuffle: (arr) => { const a2 = arr.slice(); for (let i = a2.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [a2[i], a2[j]] = [a2[j], a2[i]]; } return a2; },
      sample: (arr, k) => r.shuffle(arr).slice(0, k),
      // a coherent example market (currency, city, venue, CSD, names, real listed companies). Weighted towards
      // the EU. opts.only = ['EU','UK','US','SG','HK'] limits regions; opts.except removes some.
      market: (opts) => {
        const o = opts || {};
        let keys = Object.keys(MARKETS).filter((k) => (!o.only || o.only.includes(MARKETS[k].region) || o.only.includes(k)) && (!o.except || !(o.except.includes(MARKETS[k].region) || o.except.includes(k))));
        if (!keys.length) keys = Object.keys(MARKETS);
        const tot = keys.reduce((s, k) => s + MARKETS[k].w, 0);
        let x = next() * tot;
        if (SA.forceMarket && keys.includes(SA.forceMarket)) return MARKETS[SA.forceMarket]; // validator hook, same RNG draws
        for (const k of keys) { x -= MARKETS[k].w; if (x < 0) return MARKETS[k]; }
        return MARKETS[keys[keys.length - 1]];
      },
    };
    return r;
  }
  SA.rng = rng; SA.hash = hash;

  /* ---------- example markets: every ISIN passes the check digit (validated in tools/validate-content.js) ---------- */
  const MARKETS = {
    DE: { key: 'DE', region: 'EU', w: 1, country: 'Germany', adj: 'German', ccy: 'EUR', city: 'Frankfurt', venue: 'Xetra', mic: 'XETR', csd: 'Clearstream Banking Frankfurt', settle: 2,
      names: ['Anna Weber', 'Jonas Becker', 'Lena Schmidt', 'Felix Wagner'],
      companies: [{ n: 'SAP SE', isin: 'DE0007164600' }, { n: 'Siemens AG', isin: 'DE0007236101' }, { n: 'Allianz SE', isin: 'DE0008404005' }] },
    FR: { key: 'FR', region: 'EU', w: 1, country: 'France', adj: 'French', ccy: 'EUR', city: 'Paris', venue: 'Euronext Paris', mic: 'XPAR', csd: 'Euroclear France', settle: 2,
      names: ['Pierre Martin', 'Camille Dubois', 'Julien Moreau', 'Claire Laurent'],
      companies: [{ n: 'TotalEnergies SE', isin: 'FR0000120271' }, { n: 'LVMH', isin: 'FR0000121014' }, { n: 'BNP Paribas', isin: 'FR0000131104' }] },
    NL: { key: 'NL', region: 'EU', w: 1, country: 'the Netherlands', adj: 'Dutch', ccy: 'EUR', city: 'Amsterdam', venue: 'Euronext Amsterdam', mic: 'XAMS', csd: 'Euroclear Nederland', settle: 2,
      names: ['Jan de Vries', 'Sanne Jansen', 'Pieter Visser', 'Eva Bakker'],
      companies: [{ n: 'ASML Holding', isin: 'NL0010273215' }, { n: 'ING Groep', isin: 'NL0011821202' }] },
    IT: { key: 'IT', region: 'EU', w: 1, country: 'Italy', adj: 'Italian', ccy: 'EUR', city: 'Milan', venue: 'Euronext Milan', mic: 'XMIL', csd: 'Euronext Securities Milan', settle: 2,
      names: ['Luca Ferri', 'Sofia Rossi', 'Marco Rinaldi', 'Elena Costa'],
      companies: [{ n: 'Enel SpA', isin: 'IT0003128367' }, { n: 'Eni SpA', isin: 'IT0003132476' }, { n: 'Intesa Sanpaolo', isin: 'IT0000072618' }] },
    ES: { key: 'ES', region: 'EU', w: 1, country: 'Spain', adj: 'Spanish', ccy: 'EUR', city: 'Madrid', venue: 'Bolsa de Madrid', mic: 'XMAD', csd: 'Iberclear', settle: 2,
      names: ['Carmen Ruiz', 'Javier Lopez', 'Lucia Garcia', 'Pablo Navarro'],
      companies: [{ n: 'Banco Santander', isin: 'ES0113900J37' }, { n: 'Iberdrola', isin: 'ES0144580Y14' }, { n: 'Inditex', isin: 'ES0148396007' }] },
    UK: { key: 'UK', region: 'UK', w: 2, country: 'the UK', adj: 'UK', ccy: 'GBP', city: 'London', venue: 'the London Stock Exchange', mic: 'XLON', csd: 'Euroclear UK & International (CREST)', settle: 2,
      names: ['Oliver Hughes', 'Emily Clarke', 'James Patel', 'Charlotte Evans'],
      companies: [{ n: 'AstraZeneca plc', isin: 'GB0009895292' }, { n: 'BP plc', isin: 'GB0007980591' }, { n: 'Unilever plc', isin: 'GB00B10RZP78' }] },
    US: { key: 'US', region: 'US', w: 2, country: 'the US', adj: 'US', ccy: 'USD', city: 'New York', venue: 'Nasdaq', mic: 'XNAS', csd: 'DTC', settle: 1,
      names: ['Michael Johnson', 'Sarah Miller', 'David Brown', 'Ashley Carter'],
      companies: [{ n: 'Apple Inc.', isin: 'US0378331005' }, { n: 'Microsoft Corp.', isin: 'US5949181045' }, { n: 'Alphabet Inc. (Class A)', isin: 'US02079K3059' }] },
    SG: { key: 'SG', region: 'SG', w: 1.5, country: 'Singapore', adj: 'Singapore', ccy: 'SGD', city: 'Singapore', venue: 'SGX', mic: 'XSES', csd: 'The Central Depository (CDP)', settle: 2,
      names: ['Tan Wei Ming', 'Lim Hui Min', 'Rajesh Kumar', 'Nur Aisyah'],
      companies: [{ n: 'DBS Group Holdings', isin: 'SG1L01001701' }, { n: 'Singtel', isin: 'SG1T75931496' }, { n: 'OCBC', isin: 'SG1S04926220' }] },
    HK: { key: 'HK', region: 'HK', w: 1.5, country: 'Hong Kong', adj: 'Hong Kong', ccy: 'HKD', city: 'Hong Kong', venue: 'HKEX', mic: 'XHKG', csd: 'HKSCC (CCASS)', settle: 2,
      names: ['Chan Tai Man', 'Wong Ka Yan', 'Lee Chi Hung', 'Cheung Mei Ling'],
      companies: [{ n: 'Tencent Holdings', isin: 'KYG875721634' }, { n: 'AIA Group', isin: 'HK0000069689' }, { n: 'Hong Kong Exchanges and Clearing', isin: 'HK0388045442' }] },
  };
  // k: rough size of one unit of the currency against EUR, so amounts look realistic (HKD 5,000,000 not HKD 500,000).
  // M.amt(x) scales an amount written for EUR, keeping the decimals x already had (52.35 -> HKD 523.50, SGD 78.53).
  const SCALE = { EUR: 1, GBP: 1, USD: 1, SGD: 1.5, HKD: 10 };
  // pk: share prices are not 10x bigger in Hong Kong (most trade at HKD 10 to 600) and SGX prices are lower, so M.px(x) scales a per-share price separately
  const PSCALE = { EUR: 1, GBP: 1, USD: 1, SGD: 0.5, HKD: 2 };
  Object.values(MARKETS).forEach((m) => {
    m.k = SCALE[m.ccy];
    m.pk = PSCALE[m.ccy];
    m.px = (x) => { const s = String(x), dp = Math.max(2, s.includes('.') ? s.split('.')[1].length : 0); return round(x * m.pk, dp); };
    m.amt = (x) => { const s = String(x), dp = s.includes('.') ? s.split('.')[1].length : 0; return round(x * m.k, Math.max(dp, x * m.k < 1 ? 2 : 0)); };
  });
  SA.MARKETS = MARKETS;

  /* ---------- formatting ---------- */
  function decimals(step) { const s = String(step); return s.includes('.') ? s.split('.')[1].length : 0; }
  function round(x, dp) { const k = Math.pow(10, dp || 0); return Math.round((x + Number.EPSILON * Math.sign(x)) * k) / k; }
  function num(x, dp) { dp = dp == null ? 2 : dp; const neg = x < 0; const s = Math.abs(round(x, dp)).toFixed(dp); const [i, d] = s.split('.'); return (neg ? '-' : '') + i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (d ? '.' + d : ''); }
  const f = {
    round, num,
    money: (x, ccy, dp) => (ccy || 'EUR') + ' ' + num(x, dp == null ? 2 : dp),
    eur: (x, dp) => 'EUR ' + num(x, dp == null ? 2 : dp),
    pct: (frac, dp) => num(frac * 100, dp == null ? 2 : dp) + '%',   // takes a FRACTION: 0.032 -> "3.20%"
    bp: (frac, dp) => num(frac * 10000, dp == null ? 0 : dp) + ' bp', // takes a FRACTION: 0.0045 -> "45 bp"
    // dates are ISO strings 'YYYY-MM-DD' (UTC, no time zones)
    date: (iso) => { const d = new Date(iso + 'T00:00:00Z'); return d.getUTCDate() + ' ' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getUTCMonth()] + ' ' + d.getUTCFullYear(); },
    addDays: (iso, n) => { const d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); },
    addBusinessDays: (iso, n) => { let d = iso, k = 0; const step = n < 0 ? -1 : 1; while (k < Math.abs(n)) { d = f.addDays(d, step); const w = new Date(d + 'T00:00:00Z').getUTCDay(); if (w !== 0 && w !== 6) k++; } return d; },
    dayDiff: (a, b) => Math.round((new Date(b + 'T00:00:00Z') - new Date(a + 'T00:00:00Z')) / 86400000),
    weekday: (iso) => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(iso + 'T00:00:00Z').getUTCDay()],
  };
  SA.fmt = f;

  /* ---------- number parsing (accepts 4000 / 4,000.00 / 4.000,00 / 1 234,5 / 3.2% / -12) ---------- */
  function parseNum(input) {
    if (typeof input === 'number') return input;
    let s = String(input == null ? '' : input).trim().replace(/[\s ']/g, '').replace(/^(EUR|USD|GBP|CHF|SGD|HKD|HK\$|S\$|US\$|€|\$|£)/i, '').replace(/(EUR|USD|GBP|CHF|SGD|HKD|€|\$|£|%|bp|x)$/i, '');
    s = s.replace(/^−/, '-');
    if (!/^[-+]?[\d.,]+$/.test(s)) return NaN;
    const lastDot = s.lastIndexOf('.'), lastComma = s.lastIndexOf(',');
    if (lastDot >= 0 && lastComma >= 0) {                       // both: the last one is the decimal mark
      const dec = lastDot > lastComma ? '.' : ',', th = dec === '.' ? ',' : '.';
      s = s.split(th).join('').replace(dec, '.');
    } else if (lastComma >= 0) {
      const parts = s.split(',');
      if (parts.length > 2 || (parts.length === 2 && parts[1].length === 3 && parts[0].replace(/[-+]/, '').length <= 3 && parts[0].replace(/[-+]/, '') !== '0')) s = parts.join(''); // 4,000 -> thousands
      else s = s.replace(',', '.');                              // 3,25 -> decimal
    } else if (lastDot >= 0) {
      const parts = s.split('.');
      if (parts.length > 2) s = parts.join('');                 // 1.234.567 -> thousands
    }
    const v = Number(s);
    return isFinite(v) ? v : NaN;
  }
  SA.parseNum = parseNum;
  function within(x, answer, tol, dp) {
    if (!isFinite(x)) return false;
    const t = tol || {};
    const abs = t.abs != null ? t.abs : (t.rel != null ? Math.abs(answer) * t.rel : 0.5 * Math.pow(10, -(dp == null ? 2 : dp)) + 1e-9);
    return Math.abs(x - answer) <= abs + 1e-9;
  }
  const norm = (s) => String(s == null ? '' : s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9%.,\-+ ]/g, ' ').replace(/\s+/g, ' ').trim();
  SA.normText = norm;

  /* ---------- templates: grade(inst, resp) -> {correct, partial (0..1), detail} ; key(inst) -> canonical correct response ---------- */
  const sameSet = (a, b) => a.length === b.length && a.slice().sort((x, y) => x - y).every((v, i) => v === b.slice().sort((x, y) => x - y)[i]);
  const T = {
    mcq: { grade: (i, r) => ({ correct: r === i.answer }), key: (i) => i.answer },
    multi: { grade: (i, r) => ({ correct: Array.isArray(r) && sameSet(r, i.answers) }), key: (i) => i.answers.slice() },
    numeric: {
      grade: (i, r) => ({ correct: within(parseNum(r), i.answer, i.tol, i.dp) }),
      key: (i) => num(i.answer, i.dp == null ? 2 : i.dp),
    },
    cloze: {
      grade: (i, r) => { const ok = i.blanks.map((b, k) => blankOk(b, (r || [])[k])); return { correct: ok.every(Boolean), partial: ok.filter(Boolean).length / ok.length, detail: ok }; },
      key: (i) => i.blanks.map((b) => b.numeric ? num(b.numeric.answer, b.numeric.dp == null ? 2 : b.numeric.dp) : b.accept[0]),
    },
    order: { grade: (i, r) => { const ok = Array.isArray(r) && r.length === i.items.length && r.every((v, k) => v === k); return { correct: ok }; }, key: (i) => i.items.map((_, k) => k) },
    // response: array where resp[leftIndex] = rightIndex (original pair index)
    match: { grade: (i, r) => { const ok = i.pairs.map((_, k) => (r || [])[k] === k); return { correct: ok.every(Boolean), partial: ok.filter(Boolean).length / ok.length, detail: ok }; }, key: (i) => i.pairs.map((_, k) => k) },
    // response: array resp[itemIndex] = bucketIndex
    bucket: { grade: (i, r) => { const ok = i.items.map((it, k) => (r || [])[k] === it.bucket); return { correct: ok.every(Boolean), partial: ok.filter(Boolean).length / ok.length, detail: ok }; }, key: (i) => i.items.map((it) => it.bucket) },
    timeline: { grade: (i, r) => { const ok = i.events.map((e, k) => (r || [])[k] === e.slot); return { correct: ok.every(Boolean), partial: ok.filter(Boolean).length / ok.length, detail: ok }; }, key: (i) => i.events.map((e) => e.slot) },
    // response: [{account, side:'Dr'|'Cr', amount}] ; graded on net per account + balance, not line order
    journal: {
      grade: (i, r) => {
        const tol = (i.tol && i.tol.abs) || 0.005 + 1e-9, net = {}, want = {};
        let dr = 0, cr = 0;
        for (const l of r || []) { const a = parseNum(l.amount); if (!isFinite(a) || !l.account) return { correct: false, detail: 'incomplete line' }; const v = l.side === 'Cr' ? -a : a; net[l.account] = (net[l.account] || 0) + v; if (v > 0) dr += v; else cr -= v; }
        for (const l of i.lines) want[l.account] = (want[l.account] || 0) + (l.dr || 0) - (l.cr || 0);
        if (Math.abs(dr - cr) > tol) return { correct: false, detail: 'entry does not balance' };
        const accts = new Set([...Object.keys(net), ...Object.keys(want)]);
        for (const a of accts) if (Math.abs((net[a] || 0) - (want[a] || 0)) > tol) return { correct: false, detail: 'wrong amount or account: ' + a };
        return { correct: true };
      },
      key: (i) => i.lines.map((l) => ({ account: l.account, side: l.dr ? 'Dr' : 'Cr', amount: num(l.dr || l.cr, 2) })),
    },
    // cells: plain value (given) or {answer, tol, dp} / {accept:[...]} (blank to fill). response: {"r,c": value}
    table: {
      grade: (i, r) => { const ok = []; i.rows.forEach((row, ri) => row.forEach((c, ci) => { if (isBlank(c)) ok.push(blankOk(c.accept ? c : { numeric: c }, (r || {})[ri + ',' + ci])); })); return { correct: ok.every(Boolean), partial: ok.filter(Boolean).length / (ok.length || 1), detail: ok }; },
      key: (i) => { const k = {}; i.rows.forEach((row, ri) => row.forEach((c, ci) => { if (isBlank(c)) k[ri + ',' + ci] = c.accept ? c.accept[0] : num(c.answer, c.dp == null ? 2 : c.dp); })); return k; },
    },
    // response: array of segment indices flagged as wrong
    spot: { grade: (i, r) => { const want = i.doc.map((d, k) => d.error ? k : -1).filter((k) => k >= 0); return { correct: Array.isArray(r) && sameSet(r, want) }; }, key: (i) => i.doc.map((d, k) => d.error ? k : -1).filter((k) => k >= 0) },
    // self-graded: response {text, selfScore 0..100}; never gates
    paper: { grade: (i, r) => ({ correct: true, selfScore: r && r.selfScore }), key: () => ({ text: 'x', selfScore: 0 }), selfGraded: true },
  };
  function isBlank(c) { return c && typeof c === 'object' && (c.answer != null || c.accept); }
  function blankOk(b, v) {
    if (b.numeric) return within(parseNum(v), b.numeric.answer, b.numeric.tol, b.numeric.dp);
    if (b.answer != null) return within(parseNum(v), b.answer, b.tol, b.dp);
    const nv = norm(v); return nv !== '' && b.accept.some((a) => norm(a) === nv);
  }
  SA.templates = T;
  SA.grade = (inst, resp) => T[inst.template].grade(inst, resp);
  SA.answerKey = (inst) => T[inst.template].key(inst);

  /* make an exercise instance: deterministic in (unitId, exId, seed) */
  SA.instance = function (unitId, exId, seed) {
    const u = SA.units[unitId]; if (!u) throw new Error('unit not loaded: ' + unitId);
    const ex = u.exercises.find((e) => e.id === exId); if (!ex) throw new Error('no exercise ' + unitId + '/' + exId);
    const inst = ex.generate(rng(unitId + '/' + exId + '/' + seed), f);
    inst.template = ex.template; inst.unitId = unitId; inst.exId = exId; inst.seed = seed;
    return inst;
  };

  /* ---------- state & mastery ---------- */
  // levels: 0 none, 1 attempted, 2 familiar, 3 proficient, 4 mastered
  SA.LEVELS = ['Not started', 'Attempted', 'Familiar', 'Proficient', 'Mastered'];
  SA.today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000); // local day number
  // settings.feedback: 'each' (mark each practice answer as you go) | 'end' (all marking and solutions at the end)
  SA.newState = () => ({ v: 1, xp: 0, streak: 0, lastDay: 0, freezes: 0, units: {}, modTests: {}, checkpoints: {}, badges: {}, games: {}, lessons: {}, daily: { d: 0, n: 0, done: 0 }, stats: {}, ach: {}, settings: { sandbox: false, feedback: 'each', placed: 0, dailyGoal: 10 } });
  const U = (st, id) => st.units[id] || (st.units[id] = { lv: 0, pd: 0 }); // pd = day reached proficient
  SA.unitLevel = (st, id) => (st.units[id] ? st.units[id].lv : 0);
  SA.moduleLevel = (st, mod) => Math.min(...mod.units.map((u) => SA.unitLevel(st, u)));
  SA.moduleUnlocked = (st, mod, mods) => st.settings.sandbox || mod.prereqs.every((p) => SA.moduleLevel(st, mods[p]) >= 3);
  /* ---------- rank ladder: XP buys a career title and real rewards ----------
     Rank L needs 50*L*(L-1) XP in total (L2 = 100, L5 = 1,000, L10 = 4,500, L20 = 19,000). Every rank-up also banks a
     streak freeze (max 3): a missed day is covered automatically instead of resetting the streak. */
  SA.RANK_TITLES = [[1, 'Trainee'], [3, 'Junior analyst'], [6, 'Analyst'], [10, 'Senior analyst'], [15, 'Associate'], [20, 'Vice president'], [26, 'Director'], [32, 'Managing director']];
  SA.REWARDS = [
    { level: 2, kind: 'freeze', label: 'Streak freezes: each rank-up banks one (up to 3)' },
    { level: 3, kind: 'challenge', label: 'Challenge practice: no hints or retries, double XP' },
    { level: 4, kind: 'accent', id: 'emerald', label: 'Emerald colour theme' },
    { level: 7, kind: 'accent', id: 'sapphire', label: 'Sapphire colour theme' },
    { level: 11, kind: 'accent', id: 'amethyst', label: 'Amethyst colour theme' },
    { level: 16, kind: 'accent', id: 'ruby', label: 'Ruby colour theme' },
    { level: 22, kind: 'accent', id: 'gold', label: 'Gold colour theme' },
    // desk games (blitz): one per rank band, ordered by when their topic is taught
    { level: 2, kind: 'game', id: 'bz_ledger', label: 'Desk game: Ledger Blitz' },
    { level: 3, kind: 'game', id: 'bz_orderbook', label: 'Desk game: Order Book' },
    { level: 5, kind: 'game', id: 'bz_dealer', label: 'Desk game: Dealer Desk' },
    { level: 6, kind: 'game', id: 'bz_settle', label: 'Desk game: Settlement Chase' },
    { level: 8, kind: 'game', id: 'bz_gate', label: 'Desk game: Gatekeeper' },
    { level: 9, kind: 'game', id: 'bz_nav', label: 'Desk game: NAV Strike' },
    { level: 12, kind: 'game', id: 'bz_caelect', label: 'Desk game: Election Desk' },
    { level: 14, kind: 'game', id: 'bz_margin', label: 'Desk game: Margin Hotline' },
  ].sort((a, b) => a.level - b.level);
  SA.xpForRank = (L) => 50 * L * (L - 1);
  SA.rankOf = function (xp) {
    const L = Math.max(1, Math.floor((1 + Math.sqrt(1 + 0.08 * Math.max(0, xp))) / 2));
    let title = SA.RANK_TITLES[0][1]; for (const [l, t] of SA.RANK_TITLES) if (L >= l) title = t;
    const base = SA.xpForRank(L), next = SA.xpForRank(L + 1);
    return { level: L, title, base, next, frac: (xp - base) / (next - base) };
  };
  SA.hasReward = (st, kind, id) => SA.REWARDS.some((r) => r.kind === kind && (id == null || r.id === id) && SA.rankOf(st.xp).level >= r.level);
  SA.nextReward = (st) => SA.REWARDS.find((r) => r.level > SA.rankOf(st.xp).level) || null;
  // is the streak still alive on day d? (missed days are fine while freezes cover them)
  SA.streakAlive = (st, d) => !!st.lastDay && (d == null ? SA.today() : d) - st.lastDay - 1 <= (st.freezes || 0);
  function addXp(st, n, events) {
    if (n <= 0) return;
    const before = SA.rankOf(st.xp).level; st.xp += n;
    const d = SA.today();
    if (st.lastDay !== d) {
      const gap = d - st.lastDay - 1;
      if (st.lastDay && gap === 0) st.streak += 1;
      else if (st.lastDay && gap > 0 && gap <= (st.freezes || 0)) { st.freezes -= gap; st.streak += 1; events.push({ type: 'freezeUsed', n: gap }); }
      else st.streak = 1;
      st.lastDay = d;
    }
    events.push({ type: 'xp', n });
    const after = SA.rankOf(st.xp).level;
    if (after > before) { st.freezes = Math.min(3, (st.freezes || 0) + (after - before)); events.push({ type: 'rankup', from: before, to: after }); }
  }
  SA.XP = { first: 10, retry: 3, unitTest: 50, checkpoint: 200, paperMax: 30, card: 2, check: 5, lesson: 15, combo: 5, placement: 5, daily: 25, keeper: 8, cleared: 20, blitzMax: 40, blitzPb: 10 };

  /* ---------- daily goal: N correct answers a day (setting), +25 XP once per day ---------- */
  const stat = (st, k, n) => { const S = st.stats || (st.stats = {}); S[k] = (S[k] || 0) + (n == null ? 1 : n); return S[k]; };
  function noteCorrect(st, n, ev) {
    const d = SA.today(), D = st.daily || (st.daily = { d: 0, n: 0, done: 0 });
    if (D.d !== d) { D.d = d; D.n = 0; D.done = 0; }
    D.n += Math.max(0, n || 0);
    const goal = (st.settings && st.settings.dailyGoal) || 10;
    if (!D.done && D.n >= goal) { D.done = 1; stat(st, 'dailyDays'); addXp(st, SA.XP.daily, ev); ev.push({ type: 'dailyDone' }); }
  }
  // change the daily goal (1-100 correct answers). If today's count already meets a lowered goal, the goal is met now.
  SA.GOAL_MIN = 1; SA.GOAL_MAX = 100;
  SA.setDailyGoal = function (st, n) {
    const ev = []; n = Math.round(Number(n));
    if (!(n >= SA.GOAL_MIN && n <= SA.GOAL_MAX)) return null;
    st.settings.dailyGoal = n; noteCorrect(st, 0, ev); return ev;
  };
  SA.dailyProgress = function (st) { const D = st.daily || {}, goal = (st.settings && st.settings.dailyGoal) || 10, today = D.d === SA.today(); return { n: today ? D.n : 0, goal, done: today && !!D.done }; };

  /* ---------- achievements: one-off feats. ids are APPEND-ONLY (they are stored by position in the progress code) ---------- */
  const lvCount = (st, min) => Object.values(st.units).filter((u) => u.lv >= min).length;
  const S0 = (st, k) => (st.stats && st.stats[k]) || 0;
  SA.ACH = [
    { id: 'first-lesson', icon: 'book', name: 'First lesson', desc: 'Finish a lesson', test: (st) => Object.values(st.lessons || {}).some((l) => l.d) },
    { id: 'first-set', icon: 'target', name: 'Warm-up', desc: 'Finish a practice set', test: (st) => S0(st, 'sets') >= 1 },
    { id: 'flawless', icon: 'star', name: 'Flawless', desc: 'Every question right first time in a practice set', test: (st) => S0(st, 'flawless') >= 1 },
    { id: 'combo-9', icon: 'bolt', name: 'On a roll', desc: 'Nine first-try answers in a row', test: (st) => S0(st, 'bestCombo') >= 9 },
    { id: 'streak-7', icon: 'challenge', name: 'One week', desc: 'A 7-day streak', test: (st) => st.streak >= 7 },
    { id: 'streak-30', icon: 'challenge', name: 'One month', desc: 'A 30-day streak', test: (st) => st.streak >= 30 },
    { id: 'daily-7', icon: 'ring', name: 'Regular', desc: 'Meet the daily goal on 7 days', test: (st) => S0(st, 'dailyDays') >= 7 },
    { id: 'keeper-10', icon: 'refresh', name: 'Keeper', desc: 'Ten correct refresher answers', test: (st) => S0(st, 'reviews') >= 10 },
    { id: 'keeper-100', icon: 'refresh', name: 'Archivist', desc: 'A hundred correct refresher answers', test: (st) => S0(st, 'reviews') >= 100 },
    { id: 'clean-slate', icon: 'check', name: 'Clean slate', desc: 'Clear the refresher queue', test: (st) => S0(st, 'cleared') >= 1 },
    { id: 'challenger-5', icon: 'bolt', name: 'Challenger', desc: 'Finish five Challenge sets', test: (st) => S0(st, 'challenge') >= 5 },
    { id: 'first-test', icon: 'shield', name: 'Tested', desc: 'Pass a unit test', test: (st) => Object.keys(st.modTests).length >= 1 },
    { id: 'module-1', icon: 'trophy', name: 'Module 1', desc: 'Pass the Module 1 checkpoint', test: (st) => !!st.checkpoints.L1 },
    { id: 'placed', icon: 'target', name: 'Placed', desc: 'Take the placement quiz', test: (st) => !!st.settings.placed },
    { id: 'proficient-10', icon: 'star', name: 'Ten down', desc: 'Ten units Proficient', test: (st) => lvCount(st, 3) >= 10 },
    { id: 'mastered-10', icon: 'trophy', name: 'Master of ten', desc: 'Ten units Mastered', test: (st) => lvCount(st, 4) >= 10 },
    { id: 'desk-first', icon: 'game', name: 'On the desk', desc: 'Play a desk game', test: (st) => S0(st, 'plays') >= 1 },
    { id: 'desk-pb5', icon: 'game', name: 'Personal best', desc: 'Beat your best score five times', test: (st) => S0(st, 'pb') >= 5 },
    { id: 'analyst', icon: 'trophy', name: 'Analyst', desc: 'Reach rank 6', test: (st) => SA.rankOf(st.xp).level >= 6 },
  ];
  function checkAch(st, ev) {
    const A = st.ach || (st.ach = {}), d = SA.today();
    for (const a of SA.ACH) if (!A[a.id] && a.test(st)) { A[a.id] = d; ev.push({ type: 'achievement', id: a.id }); }
  }
  // every apply* ends here: count correct answers towards the daily goal, then look for new achievements
  function finish(st, ev, nCorrect) { if (nCorrect) noteCorrect(st, nCorrect, ev); checkAch(st, ev); return ev; }
  SA.checkAchievements = (st) => checkAch(st, []);

  /* ---------- refresher queue (spaced repetition) ----------
     A unit at Proficient or better comes due for review after 2, 5, 12, 30 and then 75 days. A first-try correct review
     moves it to the next interval (and Proficient -> Mastered once a day has passed); a miss sends it back to 2 days
     and Mastered -> Proficient. A Mastered unit left overdue for a whole extra interval fades back to Proficient.
     Fading never locks anything: unlocks only need Proficient. */
  const IV = SA.REVIEW_IV = [2, 5, 12, 30, 75];
  const lastSeen = (u) => u.rv || u.pd || 0, ivOf = (u) => IV[Math.min(u.ix || 0, IV.length - 1)];
  // the module to take next (shown on the skill tree): the one holding the recommended unit
  /* the module to take next (skill tree star). Each unit scores 0-3 points (its level, capped at Proficient), and a
     module's progress is points / (3 x units). Among open modules with written units and progress below 100%, the
     lowest progress wins (the module furthest behind). Ties go to the module more later modules depend on (directly or
     through others), then the earlier level, then fewer unstarted units, then course order. */
  SA.moduleProgress = (st, mod) => mod.units.reduce((a, u) => a + Math.min(3, SA.unitLevel(st, u)), 0) / (3 * mod.units.length);
  SA.recommendModule = function (st, course) {
    const C = course || SA.COURSE, M = C.modules, ids = C.moduleIds, lvIdx = (m) => C.levelIds.indexOf(m.level);
    const deps = {}; const under = (id, seen) => { ids.forEach((x) => { if (!seen[x] && M[x].prereqs.includes(id)) { seen[x] = 1; under(x, seen); } }); return seen; };
    const cand = ids.map((id) => M[id]).filter((m) => m.units.some((u) => C.unitMeta[u].built) && SA.moduleUnlocked(st, m, M) && SA.moduleProgress(st, m) < 1);
    cand.forEach((m) => { deps[m.id] = Object.keys(under(m.id, {})).length; });
    const unstarted = (m) => m.units.filter((u) => !SA.unitLevel(st, u)).length;
    cand.sort((a, b) => SA.moduleProgress(st, a) - SA.moduleProgress(st, b) || deps[b.id] - deps[a.id] || lvIdx(a) - lvIdx(b) || unstarted(a) - unstarted(b) || ids.indexOf(a.id) - ids.indexOf(b.id));
    return cand.length ? cand[0].id : null;
  };
  SA.dueUnits = function (st, d) {
    d = d == null ? SA.today() : d; const C = SA.COURSE;
    return Object.keys(st.units).filter((id) => { const u = st.units[id]; return u.lv >= 3 && C.unitMeta[id] && C.unitMeta[id].built && d >= lastSeen(u) + ivOf(u); })
      .sort((a, b) => (lastSeen(st.units[a]) + ivOf(st.units[a])) - (lastSeen(st.units[b]) + ivOf(st.units[b])));
  };
  SA.composeReview = function (st, seed, max) { const r = rng('review/' + seed); return SA.dueUnits(st).slice(0, max || 8).map((u) => ({ unitId: u, exId: null, seed: r.int(1, 1e9), callback: true })); };
  SA.applyReviewSet = function (st, results) {
    const ev = [], d = SA.today(); let ok = 0;
    for (const x of results) if (x.correct) { ok++; addXp(st, SA.XP.keeper, ev); }
    reviewByUnit(st, results, d, ev); mergeLevels(ev);
    stat(st, 'reviews', ok);
    if (results.length && !SA.dueUnits(st, d).length) { stat(st, 'cleared'); addXp(st, SA.XP.cleared, ev); ev.push({ type: 'queueCleared' }); }
    return { score: results.length ? ok / results.length : 0, events: finish(st, ev, ok) };
  };
  SA.decayMastery = function (st, d) {
    d = d == null ? SA.today() : d; let n = 0;
    for (const id of Object.keys(st.units)) { const u = st.units[id]; if (u.lv === 4 && d >= lastSeen(u) + 2 * ivOf(u)) { u.lv = 3; u.ix = Math.max(0, (u.ix || 0) - 1); n++; } }
    return n;
  };

  /* ---------- blitz desk games: XP is small and capped so the games can't replace study ---------- */
  SA.applyBlitz = function (st, key, score, nCorrect) {
    const ev = [], best = st.games[key] || 0;
    stat(st, 'plays');
    addXp(st, Math.min(SA.XP.blitzMax, 2 * (nCorrect || 0)), ev);
    if (score > best) { st.games[key] = Math.min(65535, Math.round(score)); if (best) { stat(st, 'pb'); addXp(st, SA.XP.blitzPb, ev); } ev.push({ type: 'highscore', name: key, score, first: !best }); }
    return { events: finish(st, ev, nCorrect) };
  };
  SA.awardXp = function (st, n) { const ev = []; addXp(st, n, ev); return ev; };

  /* lesson XP: each first-time card, first correct quick check, finishing the lesson. All once per unit, so it can't be farmed. */
  const LS = (st, id) => (st.lessons || (st.lessons = {}))[id] || (st.lessons[id] = { c: 0, k: {}, d: 0 });
  SA.lessonCard = function (st, unitId, idx) { const l = LS(st, unitId), ev = []; if (idx > l.c) { l.c = idx; addXp(st, SA.XP.card, ev); } return ev; };
  SA.lessonCheck = function (st, unitId, idx, correct) { const l = LS(st, unitId), ev = []; if (correct && !l.k[idx]) { l.k[idx] = 1; addXp(st, SA.XP.check, ev); } return finish(st, ev, correct ? 1 : 0); };
  SA.lessonDone = function (st, unitId) { const l = LS(st, unitId), ev = []; if (!l.d) { l.d = 1; addXp(st, SA.XP.lesson, ev); } return finish(st, ev, 0); };

  /* XP for one practice item, given how many first-try answers in a row it completes (combo bonus every 3rd) */
  SA.itemXp = function (x, run) { return x.correct ? SA.XP.first + (run > 0 && run % 3 === 0 ? SA.XP.combo : 0) : (x.retried && x.solved !== false ? SA.XP.retry : 0); };
  SA.practiceXp = function (results) { let run = 0, total = 0; for (const x of results) { run = x.correct ? run + 1 : 0; total += SA.itemXp(x, run); } return total; };

  /* results: [{unitId, correct (first try), retried, callback}] for a finished practice set of `unitId`.
     opts.xpDone: the view already awarded per-item XP live (SA.itemXp), so don't award it again. */
  SA.applyPractice = function (st, unitId, results, opts) {
    const ev = [], d = SA.today(), own = results.filter((x) => !x.callback);
    if (!(opts && opts.xpDone)) addXp(st, SA.practiceXp(results) * ((opts && opts.mult) || 1), ev);
    const score = own.length ? own.filter((x) => x.correct).length / own.length : 0;
    const u = U(st, unitId), before = u.lv;
    u.lv = Math.max(u.lv, 1);
    if (score >= 0.7) u.lv = Math.max(u.lv, 2);
    if (score === 1 && u.lv < 3) { u.lv = 3; u.pd = d; }
    if (u.lv !== before) ev.push({ type: 'level', unitId, from: before, to: u.lv });
    reviewByUnit(st, results.filter((r) => r.callback && r.unitId !== unitId), d, ev); // own unit: the set itself decides
    mergeLevels(ev);
    stat(st, 'sets'); if (own.length >= 3 && own.every((x) => x.correct)) stat(st, 'flawless');
    if (opts && opts.mult > 1) stat(st, 'challenge');
    let run = 0, best = 0; for (const x of results) { run = x.correct ? run + 1 : 0; best = Math.max(best, run); }
    if (best > S0(st, 'bestCombo')) st.stats.bestCombo = best;
    return { score, events: finish(st, ev, results.filter((x) => x.correct).length) };
  };
  function applyReview(st, id, correct, d, ev) {
    const u = U(st, id), b = u.lv;
    if (correct && u.lv === 3 && d > u.pd) u.lv = 4;
    if (!correct && u.lv === 4) u.lv = 3;
    if (u.lv >= 3) { u.ix = correct ? Math.min((u.ix || 0) + 1, IV.length - 1) : 0; u.rv = d; }
    if (u.lv !== b) ev.push({ type: 'level', unitId: id, from: b, to: u.lv });
  }
  // one level decision per unit per set: a unit with several items counts as right only if all of them were
  function reviewByUnit(st, results, d, ev) {
    const by = {}; for (const x of results) by[x.unitId] = (by[x.unitId] !== false) && !!x.correct;
    for (const id of Object.keys(by)) applyReview(st, id, by[id], d, ev);
  }
  // collapse several level events of one unit into its net change, and drop changes that cancel out
  function mergeLevels(ev) {
    const first = {};
    for (let i = 0; i < ev.length; i++) {
      const e = ev[i]; if (e.type !== 'level') continue;
      if (first[e.unitId] == null) { first[e.unitId] = i; continue; }
      ev[first[e.unitId]].to = e.to; ev.splice(i--, 1);
    }
    for (let i = ev.length - 1; i >= 0; i--) if (ev[i].type === 'level' && ev[i].from === ev[i].to) ev.splice(i, 1);
    return ev;
  }
  /* unit test of a module: results [{unitId, correct}] (2 per unit). pass >= 80% */
  SA.applyUnitTest = function (st, mod, results) {
    const ev = [], d = SA.today();
    for (const x of results) addXp(st, x.correct ? SA.XP.first : 0, ev);
    const score = results.filter((x) => x.correct).length / results.length, pass = score >= 0.8;
    for (const uid of mod.units) {
      const rs = results.filter((x) => x.unitId === uid); if (!rs.length) continue;
      const u = U(st, uid), b = u.lv;
      if (rs.every((x) => x.correct)) { if (u.lv < 2) u.lv = 2; else if (u.lv === 2) { u.lv = 3; u.pd = d; } else if (u.lv === 3 && d > u.pd) u.lv = 4; }
      else if (u.lv === 4) u.lv = 3;
      if (u.lv !== b) ev.push({ type: 'level', unitId: uid, from: b, to: u.lv });
    }
    if (pass && !st.modTests[mod.id]) { st.modTests[mod.id] = 1; addXp(st, SA.XP.unitTest, ev); ev.push({ type: 'badge', id: 'test-' + mod.id }); }
    return { score, pass, events: finish(st, ev, results.filter((x) => x.correct).length) };
  };
  SA.applyCheckpoint = function (st, levelId, results) {
    const ev = [], score = results.filter((x) => x.correct).length / results.length, pass = score >= 0.8;
    for (const x of results) addXp(st, x.correct ? SA.XP.first : 0, ev);
    if (pass && !st.checkpoints[levelId]) { st.checkpoints[levelId] = 1; st.badges['level-' + levelId] = 1; addXp(st, SA.XP.checkpoint, ev); ev.push({ type: 'badge', id: 'level-' + levelId }); }
    return { score, pass, events: finish(st, ev, results.filter((x) => x.correct).length) };
  };
  SA.applyPaper = function (st, unitId, selfScore) { const ev = []; addXp(st, Math.round(SA.XP.paperMax * Math.max(0, Math.min(100, selfScore)) / 100), ev); U(st, unitId).lv = Math.max(U(st, unitId).lv, 1); return { events: ev }; };
  SA.applyGame = function (st, name, score) { const ev = [], best = st.games[name] || 0; addXp(st, Math.round(score / 10), ev); if (score > best) { st.games[name] = Math.min(65535, Math.round(score)); ev.push({ type: 'highscore', name, score }); } return { events: ev }; };

  /* ---------- session composition (pure; needs SA.COURSE index + loaded units) ---------- */
  // practice: every exercise of the unit once + ~1 callback per 3 own items, from callback units the learner reached >= Familiar
  SA.composePractice = function (st, unitId, seed) {
    const r = rng('practice/' + unitId + '/' + seed), u = SA.units[unitId], meta = SA.COURSE.unitMeta[unitId];
    const items = u.exercises.filter((e) => e.template !== 'paper').map((e) => ({ unitId, exId: e.id, seed: r.int(1, 1e9), callback: false }));
    const pool = (meta.callbacks || []).filter((id) => SA.unitLevel(st, id) >= 2);
    const nCb = Math.min(pool.length ? Math.max(1, Math.round(items.length / 3)) : 0, 3);
    const cbs = [];
    for (let k = 0; k < nCb; k++) cbs.push({ unitId: r.pick(pool), exId: null, seed: r.int(1, 1e9), callback: true });
    return r.shuffle(items.concat(cbs)); // callback items have exId:null -> resolve with SA.pickExercise after loading the unit
  };
  // pick exercise for a callback/test item once its unit is loaded
  SA.pickExercise = function (unitId, seed) { const ex = SA.units[unitId].exercises.filter((e) => e.template !== 'paper'); return rng('pick/' + unitId + '/' + seed).pick(ex).id; };
  SA.composeUnitTest = function (mod, seed) { const r = rng('test/' + mod.id + '/' + seed); const out = []; for (const uid of mod.units) for (let k = 0; k < 2; k++) out.push({ unitId: uid, exId: null, seed: r.int(1, 1e9), callback: false }); return r.shuffle(out); };
  /* ---------- placement quiz (pure) ----------
     Probes one module at a time: one question per built unit (max 4), no hints. A module passes on >= 80% (all right
     when it has 4 or fewer probes). Passed modules are placed at Proficient, so the modules after them unlock.
     Only modules whose prerequisites are passed (or already Proficient) are probed; a failed module blocks its dependents.
     Stops after 2 failed modules in a row, when nothing is left, or after ~15 min unless the last module was passed
     (a learner who keeps one-shotting modules continues, up to 45 min). */
  SA.PLACEMENT = { softSec: 15 * 60, hardSec: 45 * 60, maxProbe: 4, maxFails: 2 };
  SA.placementStart = (seed) => ({ seed: String(seed), passed: [], failed: [], fails: 0, n: 0, lastPass: false, stop: false });
  function placementEligible(ps, st, c, m) {
    if (ps.passed.indexOf(m.id) >= 0 || ps.failed.indexOf(m.id) >= 0) return false;
    if (!m.units.some((u) => c.unitMeta[u].built)) return false;
    if (SA.moduleLevel(st, m) >= 3) return false; // already proficient: nothing to place
    return m.prereqs.every((p) => ps.passed.indexOf(p) >= 0 || SA.moduleLevel(st, c.modules[p]) >= 3);
  }
  SA.placementNext = function (ps, st, elapsedSec) {
    const c = SA.COURSE, P = SA.PLACEMENT;
    if (ps.stop || ps.fails >= P.maxFails || elapsedSec >= P.hardSec || (elapsedSec >= P.softSec && !ps.lastPass)) { ps.stop = true; return null; }
    let mod = null;
    for (const lv of c.levels) { for (const id of lv.modules) if (placementEligible(ps, st, c, c.modules[id])) { mod = c.modules[id]; break; } if (mod) break; }
    if (!mod) { ps.stop = true; return null; }
    const r = rng('place/' + ps.seed + '/' + (ps.n++)), built = mod.units.filter((u) => c.unitMeta[u].built);
    const units = built.length > P.maxProbe ? r.sample(built, P.maxProbe) : built;
    return { modId: mod.id, items: units.map((u) => ({ unitId: u, exId: null, seed: r.int(1, 1e9), callback: false })) };
  };
  SA.placementRecord = function (ps, modId, results) {
    const n = results.length, ok = results.filter((x) => x.correct).length, pass = n > 0 && ok >= (n <= 4 ? n : Math.ceil(0.8 * n));
    if (pass) { ps.passed.push(modId); ps.fails = 0; } else { ps.failed.push(modId); ps.fails++; }
    ps.lastPass = pass; return pass;
  };
  // apply the outcome: passed modules -> every unit at least Proficient (never lowers a level); XP per correct answer
  SA.applyPlacement = function (st, ps, nCorrect) {
    const ev = [], d = SA.today(), c = SA.COURSE;
    addXp(st, (nCorrect || 0) * SA.XP.placement, ev);
    for (const mid of ps.passed) for (const uid of c.modules[mid].units) { const u = U(st, uid), b = u.lv; if (u.lv < 3) { u.lv = 3; u.pd = d; ev.push({ type: 'level', unitId: uid, from: b, to: 3, quiet: true }); } }
    st.settings.placed = 1;
    return { events: finish(st, ev, nCorrect || 0) };
  };

  SA.composeCheckpoint = function (levelUnits, seed, n) { const r = rng('cp/' + seed); const out = []; for (let k = 0; k < (n || 30); k++) out.push({ unitId: r.pick(levelUnits), exId: null, seed: r.int(1, 1e9), callback: false }); return out; };

  /* ---------- progress password ----------
     bytes: [version=1][xp u32][streak u16][lastDay u32][nUnits u16][unit levels 3 bits each, by SA.COURSE.unitIds order]
            [nMods u16][module-test bits][nLevels u8][checkpoint bits][nGames u8][game bests u16 each, by SA.COURSE.games order]
            [crc32 u32]  -> Crockford base32, groups of 5 separated by '-' */
  const B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  function crc32(bytes) { let c, crc = 0xFFFFFFFF; for (let n = 0; n < bytes.length; n++) { c = (crc ^ bytes[n]) & 0xFF; for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xEDB88320 : c >>> 1; crc = (crc >>> 8) ^ c; } return (crc ^ 0xFFFFFFFF) >>> 0; }
  function Writer() { const b = []; let acc = 0, nb = 0; return { u: (v, n) => { for (let i = n - 1; i >= 0; i--) { acc = (acc << 1) | ((v >>> i) & 1); nb++; if (nb === 8) { b.push(acc & 0xFF); acc = 0; nb = 0; } } }, done: () => { if (nb) { b.push((acc << (8 - nb)) & 0xFF); } return b; } }; }
  function Reader(b) { let pos = 0; return { u: (n) => { let v = 0; for (let i = 0; i < n; i++) { const byte = b[pos >> 3]; if (byte === undefined) throw new Error('short'); v = v * 2 + ((byte >> (7 - (pos & 7))) & 1); pos++; } return v; } }; }
  /* v2 "progress code": the same data, run-length coded so it stays short (about 30 characters for a new learner,
     rarely over 60), then written as an old-school password: Crockford base32, groups of 4, four groups a line.
     Codes written as UUIDs (Nov 2026), older v2 codes and v1 passwords (the 351-character form) still load.
     [ver 8][xp][streak][freezes 2 bits][lastDay-20000][nUnits][(level 3 bits, run)...][nMods][alternating 0/1 runs...]
     [nLevels][bits][nGames][present bits][best per present game][crc16]; numbers are 4-bit groups + continuation bit */
  // fixed orders for the code: append new entries at the end only
  const GOALS = [5, 10, 20], STATS = ['sets', 'cleared', 'flawless', 'reviews', 'challenge', 'plays', 'pb', 'dailyDays', 'bestCombo'];
  SA.accentIds = () => ['copper'].concat((SA.REWARDS || []).filter((r) => r.kind === 'accent').map((r) => r.id));
  function vlq(w, v) { v = Math.max(0, Math.floor(v)); do { const c = v % 16; v = Math.floor(v / 16); w.u(c, 4); w.u(v ? 1 : 0, 1); } while (v); }
  function rvlq(r) { let v = 0, m = 1, more; do { v += r.u(4) * m; m *= 16; more = r.u(1); } while (more && m < 1e12); return v; }
  SA.encodeCode = function (st, course) {
    const C = course || SA.COURSE, w = Writer();
    w.u(2, 8); vlq(w, st.xp); vlq(w, st.streak); w.u(Math.min(3, st.freezes || 0), 2); vlq(w, Math.max(0, st.lastDay - 20000));
    // unit levels: runs of a coarse class (0 = not started, 1 = attempted/familiar, 2 = proficient/mastered), then one
    // bit per started unit for the fine level. Progress runs along the course, so the runs stay few.
    const cls = (lv) => (lv === 0 ? 0 : lv <= 2 ? 1 : 2), U = C.unitIds.map((id) => SA.unitLevel(st, id));
    vlq(w, U.length); let k = 0;
    while (k < U.length) { const c0 = cls(U[k]); let n = 1; while (k + n < U.length && cls(U[k + n]) === c0) n++; w.u(c0, 2); vlq(w, n); k += n; }
    for (const lv of U) if (lv) w.u(lv === 2 || lv === 4 ? 1 : 0, 1);
    vlq(w, C.moduleIds.length); let bit = 0; k = 0;
    while (k < C.moduleIds.length) { let n = 0; while (k + n < C.moduleIds.length && (st.modTests[C.moduleIds[k + n]] ? 1 : 0) === bit) n++; vlq(w, n); k += n; bit ^= 1; }
    vlq(w, C.levelIds.length); for (const id of C.levelIds) w.u(st.checkpoints[id] ? 1 : 0, 1);
    vlq(w, C.games.length); for (const g of C.games) w.u(st.games[g] ? 1 : 0, 1); for (const g of C.games) if (st.games[g]) vlq(w, st.games[g]);
    vlq(w, SA.ACH.length); for (const a of SA.ACH) w.u(st.ach && st.ach[a.id] ? 1 : 0, 1);
    // settings, daily goal and counters (added later; older codes stop before this block)
    const se = st.settings || {}, acc = SA.accentIds().indexOf(se.accent || 'copper');
    w.u(se.feedback === 'end' ? 1 : 0, 1); { const gi = GOALS.indexOf(se.dailyGoal || 10); w.u(gi < 0 ? 3 : gi, 2); if (gi < 0) vlq(w, se.dailyGoal); } /* 3 = custom goal, value follows */ w.u(se.sandbox ? 1 : 0, 1); w.u(se.placed ? 1 : 0, 1);
    w.u(se.theme === 'light' ? 2 : se.theme === 'dark' ? 1 : 0, 2); vlq(w, Math.max(0, acc));
    const D = st.daily || {}; vlq(w, D.d ? Math.max(0, D.d - 20000) : 0); vlq(w, D.n || 0); w.u(D.done ? 1 : 0, 1);
    vlq(w, STATS.length); for (const k of STATS) vlq(w, (st.stats && st.stats[k]) || 0);
    const bytes = w.done(), crc = crc32(bytes) & 0xFFFF; bytes.push(crc >>> 8, crc & 255);
    // password form: Crockford base32 (no I, L, O, U), groups of 4, four groups a line
    let bits = '', out = ''; for (const x of bytes) bits += x.toString(2).padStart(8, '0');
    while (bits.length % 5) bits += '0';
    for (let i = 0; i < bits.length; i += 5) out += B32[parseInt(bits.slice(i, i + 5), 2)];
    return out.match(/.{1,4}/g).map((g, i, a) => g + (i === a.length - 1 ? '' : i % 4 === 3 ? '\n' : ' ')).join('');
  };
  // reads the UUID form; returns null when the text is not a run of UUIDs, so older codes fall through
  function uuidBytes(pw) {
    if (!/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i.test(String(pw))) return null; // only codes written as UUIDs
    const s = String(pw).toLowerCase().replace(/o/g, '0').replace(/[il]/g, '1').replace(/[^0-9a-z]/g, '');
    if (!s.length || s.length % 32 || /[^0-9a-f]/.test(s)) return null;
    const bytes = [];
    for (let i = 0; i < s.length; i += 32) {
      const u = s.slice(i, i + 32); if (u[12] !== '4' || '89ab'.indexOf(u[16]) < 0) return null;
      const hx = u.slice(0, 12) + u.slice(13, 16) + u.slice(17);
      for (let j = 0; j < 30; j += 2) bytes.push(parseInt(hx.slice(j, j + 2), 16));
    }
    if (!bytes[0] || bytes[0] + 1 > bytes.length || bytes.slice(bytes[0] + 1).some((x) => x)) throw new Error('That code does not check out. Look for a typo.');
    return bytes.slice(1, bytes[0] + 1);
  }
  function decodeV2(bytes, C) {
    for (let cut = bytes.length; cut >= bytes.length - 1 && cut >= 3; cut--) {
      const body = bytes.slice(0, cut - 2), crc = (bytes[cut - 2] << 8) | bytes[cut - 1];
      if ((crc32(body) & 0xFFFF) !== crc) continue;
      const r = Reader(body), st = SA.newState(), d = SA.today();
      r.u(8); st.xp = rvlq(r); st.streak = rvlq(r); st.freezes = r.u(2); st.lastDay = rvlq(r) + 20000; if (st.lastDay === 20000) st.lastDay = 0;
      const nU = rvlq(r), cl = []; let k = 0;
      while (k < nU) { const c0 = r.u(2), n = rvlq(r); if (!n || c0 > 2) throw new Error('bad run'); for (let i = 0; i < n && k < nU; i++, k++) cl.push(c0); }
      cl.forEach((c0, i) => { if (!c0) return; const hi = r.u(1), lv = c0 === 1 ? 1 + hi : 3 + hi, id = C.unitIds[i]; if (id) st.units[id] = { lv, pd: d - 1 }; });
      const nM = rvlq(r); let bit = 0; k = 0;
      while (k < nM) { const n = rvlq(r); for (let i = 0; i < n && k < nM; i++, k++) if (bit && C.moduleIds[k]) st.modTests[C.moduleIds[k]] = 1; bit ^= 1; }
      const nL = rvlq(r); for (let i = 0; i < nL; i++) if (r.u(1) && C.levelIds[i]) { st.checkpoints[C.levelIds[i]] = 1; st.badges['level-' + C.levelIds[i]] = 1; }
      const nG = rvlq(r), has = []; for (let i = 0; i < nG; i++) has.push(r.u(1)); for (let i = 0; i < nG; i++) if (has[i]) { const v = rvlq(r); if (C.games[i]) st.games[C.games[i]] = v; }
      try { const nA = rvlq(r); for (let i = 0; i < nA; i++) if (r.u(1) && SA.ACH[i]) st.ach[SA.ACH[i].id] = d; } catch (e) { /* older code without achievements */ }
      try {
        const fb = r.u(1), gi = r.u(2), se = { feedback: fb ? 'end' : 'each', dailyGoal: gi === 3 ? Math.min(SA.GOAL_MAX, Math.max(SA.GOAL_MIN, rvlq(r))) : GOALS[gi] || 10, sandbox: !!r.u(1), placed: r.u(1) };
        const th = r.u(2), acc = rvlq(r); if (th) se.theme = th === 2 ? 'light' : 'dark'; const ids = SA.accentIds(); if (acc && ids[acc]) se.accent = ids[acc];
        const dd = rvlq(r), dn = rvlq(r), done = r.u(1); if (dd) st.daily = { d: dd + 20000, n: dn, done };
        const nS = rvlq(r); for (let i = 0; i < nS; i++) { const v = rvlq(r); if (v && STATS[i]) st.stats[STATS[i]] = v; }
        st.settings = Object.assign(st.settings, se);
      } catch (e) { Object.defineProperty(st, 'noSettings', { value: true }); /* older code without settings */ }
      return st;
    }
    throw new Error('That code does not check out. Look for a typo.');
  }
  // units already started count as read, so lesson XP can't be earned twice after loading a code
  function markLessons(st, C) { for (const id of C.unitIds) if (SA.unitLevel(st, id) >= 1) st.lessons[id] = { c: 99, k: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1 }, d: 1 }; }
  SA.encodePassword = function (st, course) {
    const C = course || SA.COURSE, w = Writer();
    w.u(1, 8); w.u(Math.min(st.xp, 0xFFFFFFFF), 32); w.u(Math.min(st.streak, 65535), 16); w.u(st.lastDay, 32);
    w.u(C.unitIds.length, 16); for (const id of C.unitIds) w.u(SA.unitLevel(st, id), 3);
    w.u(C.moduleIds.length, 16); for (const id of C.moduleIds) w.u(st.modTests[id] ? 1 : 0, 1);
    w.u(C.levelIds.length, 8); for (const id of C.levelIds) w.u(st.checkpoints[id] ? 1 : 0, 1);
    w.u(C.games.length, 8); for (const g of C.games) w.u(st.games[g] || 0, 16);
    const bytes = w.done(), crc = crc32(bytes); bytes.push(crc >>> 24, (crc >>> 16) & 255, (crc >>> 8) & 255, crc & 255);
    let bits = '', out = ''; for (const x of bytes) bits += x.toString(2).padStart(8, '0');
    while (bits.length % 5) bits += '0';
    for (let i = 0; i < bits.length; i += 5) out += B32[parseInt(bits.slice(i, i + 5), 2)];
    return out.match(/.{1,5}/g).join('-');
  };
  SA.decodePassword = function (pw, course) {
    const C = course || SA.COURSE;
    const ub = uuidBytes(pw); if (ub) { if (ub[0] !== 2) throw new Error('Unknown code version'); const st3 = decodeV2(ub, C); markLessons(st3, C); return st3; }
    const s = String(pw).toUpperCase().replace(/[^0-9A-Z]/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
    let bits = ''; for (const ch of s) { const v = B32.indexOf(ch); if (v < 0) throw new Error('Invalid character in password'); bits += v.toString(2).padStart(5, '0'); }
    const bytes = []; for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
    if (bytes.length < 3) throw new Error('That code is too short');
    if (bytes[0] === 2) { const st2 = decodeV2(bytes, C); markLessons(st2, C); return st2; }
    if (bytes.length < 5) throw new Error('That code is too short');
    // find payload length: try trailing CRC positions (padding may add one byte of zeros at most)
    for (let cut = bytes.length; cut >= bytes.length - 1 && cut >= 5; cut--) {
      const body = bytes.slice(0, cut - 4), c = bytes.slice(cut - 4, cut), crc = ((c[0] << 24) | (c[1] << 16) | (c[2] << 8) | c[3]) >>> 0;
      if (crc32(body) !== crc) continue;
      const r = Reader(body), st = SA.newState();
      if (r.u(8) !== 1) throw new Error('Unknown password version');
      st.xp = r.u(32); st.streak = r.u(16); st.lastDay = r.u(32);
      const nU = r.u(16), d = SA.today();
      for (let k = 0; k < nU; k++) { const lv = r.u(3); const id = C.unitIds[k]; if (lv && id) st.units[id] = { lv, pd: d - 1 }; }
      const nM = r.u(16); for (let k = 0; k < nM; k++) if (r.u(1) && C.moduleIds[k]) st.modTests[C.moduleIds[k]] = 1;
      const nL = r.u(8); for (let k = 0; k < nL; k++) if (r.u(1) && C.levelIds[k]) { st.checkpoints[C.levelIds[k]] = 1; st.badges['level-' + C.levelIds[k]] = 1; }
      const nG = r.u(8); for (let k = 0; k < nG; k++) { const v = r.u(16); if (v && C.games[k]) st.games[C.games[k]] = v; }
      markLessons(st, C); return st;
    }
    throw new Error('That code does not check out. Look for a typo.');
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = SA;
})(typeof globalThis !== 'undefined' ? globalThis : this);
