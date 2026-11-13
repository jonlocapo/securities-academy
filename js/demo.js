/* Securities Academy - demo. Loaded only by demo.html, after storage.js and before app.js. It swaps the store for an
   in-memory sample learner (nothing is ever saved) and drives the real app through a slideshow of scenarios.
   Steps a learner would take (finishing sets, waiting days for refreshers) are skipped and said so on the slide. */
(function (root) {
  'use strict';
  const SA = root.SA;

  // ---- the sample learner: part-way through Level 1 ----
  function sampleState() {
    const st = SA.newState(), d = SA.today(), C = SA.COURSE;
    const set = (id, lv, extra) => { if (C.unitMeta[id]) st.units[id] = Object.assign({ lv, pd: lv >= 3 ? d - 12 : 0 }, extra || {}); };
    // Q1 nearly mastered, P1 proficient with gaps, F1 and T1 under way
    ['Q1.1', 'Q1.2', 'Q1.3'].forEach((id) => set(id, 4, { ix: 2, rv: d - 4 }));
    ['Q1.4', 'Q1.5', 'Q1.6'].forEach((id) => set(id, 3, { ix: 1, rv: d - 3 }));
    set('Q1.7', 3, { ix: 0, rv: d - 6 }); set('Q1.8', 3, { ix: 0, rv: d - 1 });
    ['P1.1', 'P1.2', 'P1.3'].forEach((id) => set(id, 3, { ix: 1, rv: d - 6 })); set('P1.4', 4, { ix: 2, rv: d - 2 }); set('P1.5', 3, { ix: 0, rv: d - 1 });
    set('F1.1', 3, { ix: 0, rv: d - 2 }); set('F1.2', 2); set('F1.3', 1);
    set('T1.1', 2); set('T1.2', 1);
    Object.keys(st.units).forEach((id) => { st.lessons[id] = { c: 99, k: {}, d: 1 }; });
    st.lessons['F1.4'] = { c: 2, k: { 0: 1 }, d: 0 }; // a lesson left half-way
    st.xp = 2460; st.streak = 6; st.lastDay = d; st.freezes = 2;
    st.daily = { d, n: 6, done: 0 };
    st.stats = { sets: 23, cleared: 3, flawless: 5, reviews: 41, plays: 7, pb: 2, dailyDays: 9, bestCombo: 11 };
    st.games = { bz_ledger: 26 };
    st.modTests = { Q1: 1 };
    ['first-lesson', 'first-set', 'flawless', 'daily-7', 'combo-9'].forEach((id) => { if (SA.ACH.some((a) => a.id === id)) st.ach[id] = d - 3; });
    st.settings = Object.assign(st.settings, { toured: 1, placed: 1, dailyGoal: 10 });
    return st;
  }

  // ---- storage: memory only ----
  let demoState = null;
  SA.store = {
    load() { return demoState || (demoState = sampleState()); },
    save() { return true; },
    clear() { demoState = null; },
    isPersistent() { return false; },
  };
  SA.isDemo = true;

  // ---- the slides ----
  const SLIDES = [
    { hash: '#/', title: 'A learner part-way through Level 1', text: 'This is the skill tree of a sample learner, about three weeks into the course. Each circle is a module. The ring round it shows its units: bronze for Familiar, silver for Proficient, gold for Mastered. The ✪ marks the module the learner should take next.', skip: 'Three weeks of study are skipped: the progress is preloaded.' },
    { hash: '#/m/Q1', title: 'Inside a module', text: 'A module lists its units with their level. Each unit has a short lesson and a practice set. Open a unit to see its objectives and further reading.' },
    { hash: '#/u/F1.1', title: 'A lesson', text: 'Lessons are a few cards long, with worked examples and quick checks. The examples rotate across EU, UK, US, Singapore and Hong Kong markets.' },
    { hash: '#/p/F1.3', title: 'Practice', text: 'Try a question. Every set is generated afresh, so the numbers change each time. Hints and retries are there, but only an answer that is right first time without them counts towards the level.', skip: 'Answer as many as you like: the set does not need finishing, and nothing is saved.' },
    { hash: '#/m/Q1', title: 'Levels move', text: 'A practice set with every question right makes a unit Proficient. A correct refresher on a later day makes it Mastered. A wrong refresher, or a Mastered unit left too long, drops it back to Proficient.', skip: 'The days between refreshers are skipped: Q1.4 is promoted to Mastered here without the wait.',
      enter: () => { const u = SA.app.state.units['Q1.4']; if (u && u.lv < 4) { u.lv = 4; SA.app.reload(); SA.app.announce([{ type: 'level', unitId: 'Q1.4', from: 3, to: 4 }]); } } },
    { hash: '#/review', title: 'Refreshers', text: 'Proficient and Mastered units come back for a short refresher after 2, 5, 12, 30 and 75 days. A badge in the header shows how many are due.' },
    { hash: '#/desk', title: 'The Desk', text: 'Short timed games that drill the same skills, such as posting ledger entries against the clock. More games open as the learner ranks up and as modules are added.' },
    { hash: '#/profile', title: 'Rank, rewards and settings', text: 'XP builds a rank, and ranks unlock rewards such as colour themes and Challenge mode. Profile also holds achievements, settings and the progress code that carries progress between devices.' },
    { hash: '#/', title: 'End of the demo', text: 'The full course runs from market arithmetic to operations and the post-trade chain. The demo used a sample learner and changed nothing on this device.', end: true },
  ];

  let k = 0, bar = null;
  function go(i) {
    k = Math.max(0, Math.min(SLIDES.length - 1, i));
    const s = SLIDES[k];
    if (location.hash !== s.hash) location.hash = s.hash; else if (SA.app.reload) SA.app.reload();
    draw();
    if (s.enter) setTimeout(s.enter, 500);
  }
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  function draw() {
    const s = SLIDES[k]; bar.textContent = '';
    const head = el('div', 'demo-head');
    head.appendChild(el('span', 'demo-tag', 'Demo'));
    head.appendChild(el('span', 'demo-count', (k + 1) + ' / ' + SLIDES.length));
    head.appendChild(el('strong', 'demo-title', s.title));
    bar.appendChild(head);
    bar.appendChild(el('p', 'demo-text', s.text));
    if (s.skip) bar.appendChild(el('p', 'demo-skip', s.skip));
    const row = el('div', 'demo-nav');
    const b = (label, cls, fn, dis) => { const x = el('button', 'btn ' + cls, label); x.type = 'button'; x.disabled = !!dis; x.addEventListener('click', fn); row.appendChild(x); };
    b('Back', 'ghost', () => go(k - 1), k === 0);
    if (s.end) { const a = el('a', 'btn primary', 'Open the course'); a.href = 'index.html'; row.appendChild(a); }
    else b('Next', 'primary', () => go(k + 1));
    const ex = el('a', 'demo-exit', 'Leave the demo'); ex.href = 'index.html'; row.appendChild(ex);
    bar.appendChild(row);
  }
  function start() {
    bar = el('aside', 'demo-bar'); bar.setAttribute('aria-label', 'Demo slides'); bar.setAttribute('aria-live', 'polite');
    document.body.appendChild(bar); document.body.classList.add('is-demo');
    root.addEventListener('keydown', (e) => {
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === 'PageDown') { e.preventDefault(); go(k + 1); } else if (e.key === 'PageUp') { e.preventDefault(); go(k - 1); }
    });
    go(0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(start, 0)); else setTimeout(start, 0);
  SA.demo = { slides: SLIDES, go, sampleState };
})(typeof globalThis !== 'undefined' ? globalThis : this);
