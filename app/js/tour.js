/* Securities Academy - guided tour. Runs once on the skill tree for a new learner (settings.toured), replayable from
   Profile. Spotlights real elements of the page; ends by offering the placement quiz. No state besides settings.toured. */
(function (root) {
  'use strict';
  const SA = root.SA;
  const h = (tag, attrs, ...kids) => {
    const e = document.createElement(tag);
    for (const k in attrs || {}) { const v = attrs[k]; if (v == null) continue; if (k.indexOf('on') === 0) e.addEventListener(k.slice(2), v); else e.setAttribute(k, v); }
    kids.flat().forEach((k) => { if (k != null) e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k); });
    return e;
  };

  const STEPS = [
    { title: 'Welcome to Securities Academy', text: 'The course covers how securities work and how they are handled, from market arithmetic to operations. This tour shows how the site works and takes about a minute.' },
    { sel: '.tree-svg', title: 'The skill tree', text: 'Each circle is a module. The lines show which modules lead to which. A module opens once the modules before it are Proficient.' },
    { sel: '.node .node-title.rec', up: '.node', title: 'Progress rings and the star', text: 'The ring round a module fills as its units progress: bronze for Familiar, silver for Proficient, gold for Mastered. The ✪ marks the module to take next, the open module with the least progress.' },
    { sel: '.node .node-title.rec', up: '.node', title: 'Inside a module', text: 'Each unit has a lesson (Learn) and a practice set (Practise). Hints and retries are always available, but an answer only counts when it is right first time without them. All right in one set makes the unit Proficient. A correct refresher on a later day makes it Mastered.' },
    { sel: '.hdr .stats', title: 'Your progress', text: 'XP, rank, streak and the daily goal. Ranks unlock rewards such as colour themes and Challenge mode. A badge appears here when units are due for a refresher.' },
    { sel: 'a.nav-link[href="#/desk"]', title: 'The Desk', text: 'Short games that drill the same skills against the clock. They open as you rank up.' },
    { sel: 'a.nav-link[href="#/profile"]', title: 'Profile', text: 'Settings, achievements and the progress code. Progress is saved in this browser only, so copy the code to carry it to another device.' },
    { title: 'Where to start', text: 'If you already know some of the material, the placement quiz marks those modules Proficient so you can start further in. It takes about 15 minutes and can be taken later from Profile.', end: true },
  ];

  let box = null, k = 0, onKey = null, onResize = null;

  function finish(go) {
    if (!box) return;
    box.remove(); box = null;
    root.removeEventListener('keydown', onKey, true); root.removeEventListener('resize', onResize);
    const st = SA.app.state; st.settings.toured = 1; SA.app.save();
    if (go) location.hash = go;
  }

  function target(step) {
    if (!step.sel) return null;
    let el = document.querySelector(step.sel);
    if (el && step.up) el = el.closest(step.up) || el;
    return el && el.getBoundingClientRect().width ? el : null;
  }

  function show() {
    const step = STEPS[k], el = target(step);
    box.textContent = '';
    const hole = h('div', { class: 'tour-hole' + (el ? '' : ' none') });
    const card = h('div', { class: 'tour-card', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'tour-t' },
      h('p', { class: 'tour-step' }, 'Step ' + (k + 1) + ' of ' + STEPS.length),
      h('h2', { id: 'tour-t' }, step.title),
      h('p', null, step.text));
    const rec = SA.recommendModule ? SA.recommendModule(SA.app.state) : null;
    const row = h('div', { class: 'btn-row' });
    if (step.end) {
      row.appendChild(h('button', { type: 'button', class: 'btn primary', onclick: () => finish('#/placement') }, 'Take the placement quiz'));
      row.appendChild(h('button', { type: 'button', class: 'btn', onclick: () => finish(rec ? '#/m/' + rec : '#/') }, 'Start from the beginning'));
    } else {
      if (k) row.appendChild(h('button', { type: 'button', class: 'btn ghost', onclick: () => { k--; show(); } }, 'Back'));
      row.appendChild(h('button', { type: 'button', class: 'btn primary', onclick: () => { k++; show(); } }, k ? 'Next' : 'Show me'));
      row.appendChild(h('button', { type: 'button', class: 'btn ghost tour-skip', onclick: () => { k = STEPS.length - 1; show(); } }, 'Skip the tour'));
    }
    card.appendChild(row);
    box.appendChild(hole); box.appendChild(card);
    const big = el && el.getBoundingClientRect().height > root.innerHeight * 0.6;
    if (big) {
      // a target taller than the screen (the tree): show its top part, outline what is visible, centre the card
      root.scrollTo(0, Math.max(0, root.scrollY + el.getBoundingClientRect().top - 80));
      const r = el.getBoundingClientRect(), vh = root.innerHeight, top = Math.max(8, r.top - 6);
      Object.assign(hole.style, { left: (r.left - 6) + 'px', top: top + 'px', width: (r.width + 12) + 'px', height: (Math.min(vh - 8, r.bottom + 6) - top) + 'px' });
      card.classList.add('centre');
    } else if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'auto' });
      const r = el.getBoundingClientRect(), pad = 6, vw = root.innerWidth, vh = root.innerHeight;
      Object.assign(hole.style, { left: (r.left - pad) + 'px', top: (r.top - pad) + 'px', width: (r.width + 2 * pad) + 'px', height: (r.height + 2 * pad) + 'px' });
      const cw = Math.min(380, vw - 32), below = r.bottom + 14 + 220 < vh, cTop = below ? r.bottom + 14 : Math.max(16, r.top - 14 - card.offsetHeight);
      Object.assign(card.style, { width: cw + 'px', left: Math.max(16, Math.min(vw - cw - 16, r.left + r.width / 2 - cw / 2)) + 'px', top: Math.min(Math.max(16, cTop), vh - card.offsetHeight - 16) + 'px' });
    } else card.classList.add('centre');
    const first = card.querySelector('.btn.primary'); if (first) first.focus();
  }

  function start() {
    if (box) return;
    if (location.hash && location.hash !== '#/' && location.hash !== '#') { location.hash = '#/'; setTimeout(start, 300); return; }
    k = 0; box = h('div', { class: 'tour' }); document.body.appendChild(box);
    onKey = (e) => {
      if (!box) return;
      if (e.key === 'Escape') { e.preventDefault(); if (STEPS[k].end) finish(); else { k = STEPS.length - 1; show(); } } // skipping leads to the placement offer first
      else if (e.key === 'ArrowRight' && !STEPS[k].end) { e.preventDefault(); k++; show(); }
      else if (e.key === 'ArrowLeft' && k) { e.preventDefault(); k--; show(); }
      else if (e.key === 'Tab') { const f = box.querySelectorAll('button'); if (!f.length) return; const i = Array.prototype.indexOf.call(f, document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
    };
    onResize = () => { if (box) show(); };
    root.addEventListener('keydown', onKey, true); root.addEventListener('resize', onResize);
    show();
  }

  // first visit: a learner with no progress who has not seen the tour
  function maybeStart() {
    const st = SA.app && SA.app.state; if (!st || st.settings.toured || box) return;
    if (st.xp > 0 || Object.keys(st.units).length) { st.settings.toured = 1; SA.app.save(); return; }
    setTimeout(start, 400);
  }

  SA.tour = { start, maybeStart, steps: STEPS };
})(typeof window !== 'undefined' ? window : globalThis);
