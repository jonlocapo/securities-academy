/* Securities Academy - storage. localStorage key 'sa-state-v1'; every call wrapped; falls back to memory. */
(function (root) {
  'use strict';
  const SA = root.SA || (root.SA = {});
  const KEY = 'sa-state-v1';
  let mem = null;
  function normalise(o) {
    const base = SA.newState();
    if (!o || typeof o !== 'object') return base;
    const st = Object.assign(base, o);
    st.settings = Object.assign(SA.newState().settings, o.settings || {});
    ['units', 'modTests', 'checkpoints', 'badges', 'games', 'lessons', 'stats', 'ach'].forEach((k) => { if (!st[k] || typeof st[k] !== 'object') st[k] = {}; });
    if (!st.daily || typeof st.daily !== 'object') st.daily = { d: 0, n: 0, done: 0 };
    ['xp', 'streak', 'lastDay', 'freezes'].forEach((k) => { if (typeof st[k] !== 'number' || !isFinite(st[k])) st[k] = 0; });
    return st;
  }
  SA.store = {
    load() {
      try {
        const raw = root.localStorage.getItem(KEY);
        if (raw) return normalise(JSON.parse(raw));
      } catch (e) { /* storage unavailable or corrupt */ }
      if (mem) { try { return normalise(JSON.parse(mem)); } catch (e) { /* ignore */ } }
      return SA.newState();
    },
    save(st) {
      let s;
      try { s = JSON.stringify(st); } catch (e) { return false; }
      mem = s;
      try { root.localStorage.setItem(KEY, s); return true; } catch (e) { return false; }
    },
    clear() { mem = null; try { root.localStorage.removeItem(KEY); } catch (e) { /* ignore */ } },
    isPersistent() {
      try { root.localStorage.setItem(KEY + '-probe', '1'); root.localStorage.removeItem(KEY + '-probe'); return true; } catch (e) { return false; }
    },
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
