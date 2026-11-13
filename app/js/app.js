/* Securities Academy - app shell: state, lazy unit loading, hash router, header, toasts. */
(function (root) {
  'use strict';
  const SA = root.SA;
  const { h, clear } = SA.render;
  const app = SA.app = { state: null };
  let leaveFns = [], routeToken = 0, fadeDay = null;

  /* ---------- lazy unit loading (classic <script> injection; works from file://) ---------- */
  const pending = {}, waiters = {};
  SA.onUnitLoaded = function (id) { if (waiters[id]) { waiters[id](SA.units[id]); delete waiters[id]; } };
  SA.loadUnit = function (id) {
    if (SA.units[id]) return Promise.resolve(SA.units[id]);
    const meta = SA.COURSE.unitMeta[id];
    if (!meta || !meta.built) return Promise.reject(new Error('Unit ' + id + ' has not been written yet'));
    if (pending[id]) return pending[id];
    pending[id] = new Promise(function (resolve, reject) {
      waiters[id] = resolve;
      const s = document.createElement('script');
      s.src = 'content/' + meta.level + '/' + id + '.js' + (SA.COURSE.build ? '?v=' + SA.COURSE.build : '');
      s.onerror = function () { delete pending[id]; delete waiters[id]; reject(new Error('Could not load content for ' + id)); };
      s.onload = function () { if (SA.units[id]) resolve(SA.units[id]); else { delete pending[id]; reject(new Error('Content file for ' + id + ' did not register the unit')); } };
      document.head.appendChild(s);
    });
    return pending[id];
  };

  /* ---------- state helpers ---------- */
  app.save = function () { return SA.store.save(app.state); };
  app.onLeave = function (fn) { leaveFns.push(fn); };
  app.streak = function () { const st = app.state; return SA.streakAlive(st) ? st.streak : 0; };
  app.applyAccent = function () { const a = (app.state.settings || {}).accent; if (a && a !== 'copper' && SA.hasReward(app.state, 'accent', a)) document.documentElement.setAttribute('data-accent', a); else document.documentElement.removeAttribute('data-accent'); };
  app.currentLevel = function () { const ls = SA.COURSE.levels; return ls.find((l) => !app.state.checkpoints[l.id]) || ls[ls.length - 1]; };
  app.badgeLabel = function (id) {
    let m;
    if ((m = /^level-(L\d+)$/.exec(id))) { const l = SA.COURSE.levels.find((x) => x.id === m[1]); return 'Module ' + m[1].slice(1) + ' checkpoint' + (l ? ': ' + l.title : ''); }
    if ((m = /^test-(.+)$/.exec(id))) { const mod = SA.COURSE.modules[m[1]]; return 'Test passed: ' + (mod ? mod.title : m[1]); }
    return id;
  };
  app.badges = function () {
    const st = app.state, ids = Object.keys(st.badges).filter((k) => st.badges[k]);
    Object.keys(st.modTests).forEach((k) => { if (st.modTests[k]) ids.push('test-' + k); });
    return ids.map((id) => ({ id, label: app.badgeLabel(id) }));
  };

  /* ---------- toasts ---------- */
  let toastBox = null;
  function box() { if (!toastBox) { toastBox = h('div', { class: 'toasts', 'aria-live': 'polite', role: 'status' }); document.body.appendChild(toastBox); } return toastBox; }
  app.toast = function (text, kind, ms) {
    const t = h('div', { class: 'toast ' + (kind || '') }, text);
    box().appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, ms || 3200);
  };
  app.celebrate = function (title, text) {
    const t = h('div', { class: 'toast celebrate' }, h('div', { class: 'cel-title' }, title), h('div', null, text));
    box().appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 4800);
  };
  const reduced = () => root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // "+10 XP" floats up from where it was earned; the header counter then counts up
  app.xpFloat = function (n, anchor) {
    const r = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : null;
    const f = h('div', { class: 'xp-float', 'aria-hidden': 'true' }, '+' + n + ' XP');
    if (r && r.width) { f.style.left = Math.round(r.left + r.width / 2) + 'px'; f.style.top = Math.round(r.top) + 'px'; } else { f.classList.add('corner'); }
    document.body.appendChild(f); setTimeout(function () { f.remove(); }, 1300);
  };
  let shownXp = null;
  function tweenXp(el, from, to) {
    if (reduced() || from == null || to <= from) { el.textContent = String(to); return; }
    const t0 = performance.now(), dur = 700;
    el.parentNode.classList.remove('bump'); void el.offsetWidth; el.parentNode.classList.add('bump');
    (function f(t) { const k = Math.min(1, (t - t0) / dur); el.textContent = String(Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(f); })(t0);
  }
  app.announce = function (events, anchor) {
    const xp = events.filter((e) => e.type === 'xp').reduce((a, e) => a + e.n, 0);
    if (xp > 0) app.xpFloat(xp, anchor);
    const placed = events.filter((e) => e.type === 'level' && e.quiet).length;
    if (placed) app.celebrate('Placement', placed + ' units marked Proficient');
    events.forEach(function (e) {
      if (e.type === 'rankup') { const rk = SA.rankOf(app.state.xp), got = SA.REWARDS.filter((r) => r.level > e.from && r.level <= e.to); app.celebrate('Promoted to rank ' + e.to, rk.title + (got.length ? '. Unlocked: ' + got.map((r) => r.label.split(':')[0].toLowerCase()).join(', ') : '') + '. +1 streak freeze.'); }
      else if (e.type === 'freezeUsed') app.toast('Streak freeze used. Your streak is safe.', 'xp');
      else if (e.type === 'achievement') { const a = SA.ACH.find((x) => x.id === e.id); if (a) app.celebrate('Achievement: ' + a.name, a.desc); }
      else if (e.type === 'dailyDone') app.toast('Daily goal met: +' + SA.XP.daily + ' XP', 'xp');
      else if (e.type === 'queueCleared') app.toast('Refresher queue cleared: +' + SA.XP.cleared + ' XP', 'xp');
      else if (e.type === 'level' && e.to > e.from && !e.quiet) { const m = SA.COURSE.unitMeta[e.unitId]; app.celebrate('Level up', (m ? e.unitId + ' ' + m.title : e.unitId) + ' is now ' + SA.LEVELS[e.to] + '.'); }
      else if (e.type === 'badge') app.celebrate('Badge earned', app.badgeLabel(e.id));
      else if (e.type === 'highscore' && !e.first) app.toast('New personal best: ' + Math.round(e.score), 'xp');
    });
    app.refreshHeader();
  };

  /* ---------- header ---------- */
  let headerEl = null;
  app.refreshHeader = function () {
    if (!headerEl) return;
    const st = app.state, hash = location.hash || '#/';
    const nav = (href, label, match) => h('a', { href, class: 'nav-link' + (match ? ' active' : ''), 'aria-current': match ? 'page' : null }, label);
    clear(headerEl); const xpEl = h('b', null, String(shownXp == null ? st.xp : shownXp));
    headerEl.appendChild(h('div', { class: 'hdr-inner' },
      h('a', { href: '#/', class: 'brand' }, 'Securities Academy'),
      h('nav', { 'aria-label': 'Main' }, nav('#/', 'Skill tree', hash === '#/' || hash === '#' || /^#\/(m|u|t|p|c|at)\//.test(hash)), nav('#/desk', 'Desk', /^#\/(desk|play)/.test(hash)), nav('#/profile', 'Profile', hash === '#/profile')),
      h('div', { class: 'stats', 'aria-label': 'Your progress' }, trackDots(),
        dailyRing(st), reviewBadge(st), rankPill(st, xpEl),
        app.streak() ? h('span', { class: 'stat-pill streak', title: app.streak() + (app.streak() === 1 ? ' day' : ' days') + ' in a row with some practice' }, SA.views.icon('flame'), h('b', null, String(app.streak()))) : null),
      lessonBtn(hash), themeBtn()));
    tweenXp(xpEl, shownXp, st.xp); shownXp = st.xp;
    document.documentElement.style.setProperty('--hdr-h', headerEl.offsetHeight + 'px');
  };
  // daily goal: a small ring that fills as correct answers come in
  function dailyRing(st) {
    const p = SA.dailyProgress(st), C = 2 * Math.PI * 8, k = Math.min(1, p.n / p.goal);
    const s = h('span', { class: 'daily' + (p.done ? ' done' : ''), title: 'Daily goal: ' + Math.min(p.n, p.goal) + ' of ' + p.goal + ' correct answers' + (p.done ? '. Done for today.' : ''), 'aria-label': 'Daily goal ' + Math.min(p.n, p.goal) + ' of ' + p.goal });
    s.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="8" class="dr-bg"/><circle cx="10" cy="10" r="8" class="dr-fg" stroke-dasharray="' + (C * k).toFixed(1) + ' ' + C.toFixed(1) + '" transform="rotate(-90 10 10)"/></svg>';
    s.appendChild(h('span', { class: 'dr-txt' }, p.done ? 'Daily goal met' : Math.min(p.n, p.goal) + ' of ' + p.goal + ' today'));
    return s;
  }
  // refresher: a badge with the number of units due, only when something is due
  function reviewBadge(st) {
    const n = SA.dueUnits(st).length; if (!n) return null;
    return h('a', { href: '#/review', class: 'rv-badge', title: n + (n === 1 ? ' unit is' : ' units are') + ' due for a refresher' }, SA.views.icon('refresh'), h('b', null, String(n)));
  }
  // remembers the last lesson or practice page so the header can take you back to it from anywhere
  const LAST = 'sa-last-lesson';
  function lessonBtn(hash) {
    let last = null; try { last = localStorage.getItem(LAST); } catch (e) { /* ignore */ }
    if (!last || last === hash) return null;
    const id = last.split('/')[2], m = SA.COURSE.unitMeta[id];
    if (!m) return null;
    return h('a', { href: last, class: 'stat-pill back-lesson', title: (last.indexOf('#/p/') === 0 ? 'Practice: ' : 'Lesson: ') + id + ' ' + m.title }, '↩ Resume');
  }
  function rankPill(st, xpEl) {
    const rk = SA.rankOf(st.xp);
    return h('a', { href: '#/profile', class: 'stat-pill rank-pill', title: rk.title + ': ' + SA.fmt.num(rk.next - st.xp, 0) + ' XP to rank ' + (rk.level + 1) },
      h('span', { class: 'rank-n' }, 'Rank ' + rk.level), h('span', { class: 'mini-bar', 'aria-hidden': 'true' }, h('i', { style: 'width:' + Math.round(rk.frac * 100) + '%' })), xpEl, ' XP');
  }
  /* ---------- track dots: each node letter has a colour, revealed once a module of that track is unlocked ---------- */
  const TRACKS = [['Q', 'Quantitative methods'], ['F', 'Finance maths'], ['P', 'Products'], ['T', 'Trading and execution'], ['C', 'Clients and controls'], ['A', 'Accounting'], ['O', 'Operations'], ['K', 'Credit: Lombard and margin'], ['R', 'Regulation'], ['G', 'Graduate theory']];
  function trackDots() {
    const c = SA.COURSE, mods = Object.values(c.modules);
    return h('span', { class: 'tracks', 'aria-label': 'Tracks unlocked' }, TRACKS.map(([k, name]) => {
      const open = mods.some((m) => m.id[0] === k && SA.moduleUnlocked(app.state, m, c.modules));
      return h('span', { class: 'tk-dot ' + k + (open ? '' : ' dim'), title: open ? name : 'Not unlocked yet' }, open ? k : '');
    }));
  }
  /* ---------- light/dark toggle (data-theme is set before paint by the inline script in index.html) ---------- */
  const theme = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  function themeBtn() {
    const next = theme() === 'light' ? 'dark' : 'light';
    const b = h('button', { type: 'button', class: 'theme-btn', title: 'Switch to ' + next + ' theme', 'aria-label': 'Switch to ' + next + ' theme' }, theme() === 'light' ? '☾' : '☀');
    b.addEventListener('click', function () { document.documentElement.setAttribute('data-theme', next); try { localStorage.setItem('sa-theme', next); } catch (e) { /* ignore */ } app.refreshHeader(); });
    return b;
  }

  /* ---------- router ---------- */
  function parse() {
    const raw = (location.hash || '#/').replace(/^#\/?/, ''), parts = raw.split('/');
    let arg = parts.slice(1).join('/'); try { arg = decodeURIComponent(arg); } catch (e) { /* keep raw */ }
    return { kind: parts[0] || '', arg };
  }
  function rememberLesson() { try { localStorage.setItem(LAST, location.hash); } catch (e) { /* ignore */ } }
  function route() {
    const main = document.getElementById('app'), r = parse(), V = SA.views, token = ++routeToken;
    if (app.state && fadeDay !== SA.today()) { fadeDay = SA.today(); if (SA.decayMastery(app.state)) app.save(); } // Mastered units left overdue fade back to Proficient
    leaveFns.forEach((fn) => { try { fn(); } catch (e) { /* ignore */ } }); leaveFns = [];
    clear(main);
    try {
      switch (r.kind) {
        case '': V.tree(main); if (SA.tour) SA.tour.maybeStart(); break;
        case 'at': V.tree(main, r.arg); break; // the tree, scrolled or panned to one module (module page breadcrumb)
        case 'm': V.module(main, r.arg); break;
        case 'u': rememberLesson(); V.lesson(main, r.arg); break;
        case 'p': rememberLesson(); V.practice(main, r.arg); break;
        case 't': V.test(main, r.arg); break;
        case 'c': V.checkpoint(main, r.arg); break;
        case 'placement': V.placement(main); break;
        case 'review': V.review(main); break;
        case 'desk': V.desk(main); break;
        case 'play': V.play(main, r.arg); break;
        case 'profile': V.profile(main); break;
        default: main.appendChild(h('div', { class: 'panel narrow center' }, h('h1', null, 'Page not found'), h('a', { href: '#/', class: 'btn primary' }, 'Skill tree')));
      }
    } catch (e) {
      main.appendChild(h('div', { class: 'panel narrow' }, h('h1', null, 'Something went wrong'), h('pre', { class: 'err' }, String(e && e.stack || e))));
      if (root.console) console.error(e);
    }
    if (token === routeToken) { app.refreshHeader(); window.scrollTo(0, 0); }
  }
  app.reload = route;
  app.token = () => routeToken; // changes on every navigation; async views compare it before drawing

  function boot() {
    if (!SA.COURSE) { document.getElementById('app').textContent = 'Course data failed to load (content/index.js).'; return; }
    app.state = SA.store.load(); app.applyAccent();
    headerEl = document.getElementById('hdr');
    window.addEventListener('hashchange', route);
    route();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})(typeof globalThis !== 'undefined' ? globalThis : this);
