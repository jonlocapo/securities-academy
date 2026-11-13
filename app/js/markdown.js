/* Securities Academy - markdown subset (see app/CONTENT-CONTRACT.md). Produces HTML strings; maths via KaTeX in hydrate(). */
(function (root) {
  'use strict';
  const SA = root.SA || (root.SA = {});
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const LABELS = { example: 'Worked example', tip: 'Tip', warning: 'Watch out', eu: 'EU', us: 'US', uk: 'UK', ch: 'Switzerland', asia: 'Asia', recall: 'Recall' };

  function safeUrl(u) {
    u = String(u).trim();
    if (/^(https?:\/\/|mailto:|#|\/|\.\.?\/)/i.test(u) || u.indexOf(':') < 0) return u;
    return '#';
  }
  function mathHtml(tex, display) {
    return '<span class="math' + (display ? ' math-d' : '') + '" data-d="' + (display ? 1 : 0) + '" data-tex="' + esc(tex) + '">' + esc(tex) + '</span>';
  }

  function inline(src) {
    const toks = [];
    const put = (html) => { toks.push(html); return '\u0001' + (toks.length - 1) + '\u0002'; };
    let s = String(src == null ? '' : src);
    s = s.replace(/`([^`\n]+)`/g, (m, c) => put('<code>' + esc(c) + '</code>'));
    s = s.replace(/\$\$([\s\S]+?)\$\$/g, (m, t) => put(mathHtml(t.trim(), true)));
    s = s.replace(/\$([^\s$](?:[^$\n]*?[^\s$\\])?)\$(?!\d)/g, (m, t) => put(mathHtml(t, false)));
    s = esc(s);
    s = s.replace(/\*\*([^\s*](?:[^*]*?[^\s*])?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^\s*](?:[^*]*?[^\s*])?)\*/g, '<em>$1</em>');
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => {
      const url = safeUrl(u.replace(/&amp;/g, '&')), ext = /^https?:/i.test(url);
      return '<a href="' + esc(url) + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + t + '</a>';
    });
    return s.replace(/\u0001(\d+)\u0002/g, (m, i) => toks[+i]);
  }

  function splitRow(line) {
    let t = line.trim();
    if (t[0] === '|') t = t.slice(1);
    if (t[t.length - 1] === '|' && t[t.length - 2] !== '\\') t = t.slice(0, -1);
    const cells = []; let cur = '', inMath = false;
    for (let i = 0; i < t.length; i++) {
      const ch = t[i];
      if (ch === '\\' && t[i + 1] === '|') { cur += '|'; i++; continue; }
      if (ch === '$' && t[i - 1] !== '\\') inMath = !inMath;
      if (ch === '|' && !inMath) { cells.push(cur.trim()); cur = ''; } else cur += ch;
    }
    cells.push(cur.trim());
    return cells;
  }
  const isSep = (l) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l) && l.indexOf('-') >= 0;
  const isRule = (t) => /^(-{3,}|\*{3,}|_{3,})$/.test(t);
  const isUl = (l) => /^\s*[-*+]\s+/.test(l);
  const isOl = (l) => /^\s*\d+[.)]\s+/.test(l);
  const isHead = (l) => /^#{1,3}\s+/.test(l);
  function startsBlock(lines, i) {
    const l = lines[i], t = l.trim();
    return isHead(l) || /^\s*>/.test(l) || isUl(l) || isOl(l) || t.indexOf('$$') === 0 || isRule(t) || (t[0] === '|' && i + 1 < lines.length && isSep(lines[i + 1]));
  }

  function callout(type, arg, bodyLines) {
    const C = SA.COURSE || {};
    let title = LABELS[type] || (type.charAt(0).toUpperCase() + type.slice(1)), lead = '';
    if (type === 'recall' && arg) {
      const id = arg.trim().split(/\s+/)[0], meta = C.unitMeta && C.unitMeta[id];
      // a "recall" of a unit the learner has not met yet (not practised, lesson not finished) reads as a look ahead
      const st = SA.app && SA.app.state, u = st && st.units && st.units[id], ls = st && st.lessons && st.lessons[id];
      if (!(u && u.lv >= 1) && !(ls && ls.d)) title = 'Looking ahead';
      lead = '<p class="callout-lead"><a href="#/u/' + esc(id) + '">' + esc(id) + (meta ? ' · ' + esc(meta.title) : '') + '</a></p>';
    } else if (arg) title += ': ' + arg;
    return '<aside class="callout c-' + esc(type) + '"><div class="callout-title">' + esc(title) + '</div><div class="callout-body">' + lead + blocks(bodyLines.join('\n')) + '</div></aside>';
  }

  function blocks(src) {
    const lines = String(src == null ? '' : src).replace(/\r\n?/g, '\n').split('\n');
    const out = []; let i = 0;
    while (i < lines.length) {
      const ln = lines[i], t = ln.trim();
      if (!t) { i++; continue; }
      let m;
      if (t.indexOf('$$') === 0) {
        m = /^\$\$([\s\S]*?)\$\$(.*)$/.exec(t);
        if (m && !m[2].trim()) { out.push('<div class="math-block">' + mathHtml(m[1].trim(), true) + '</div>'); i++; continue; }
        if (!m) {
          const buf = [t.slice(2)]; i++;
          while (i < lines.length && lines[i].indexOf('$$') < 0) { buf.push(lines[i]); i++; }
          if (i < lines.length) { buf.push(lines[i].slice(0, lines[i].indexOf('$$'))); i++; }
          out.push('<div class="math-block">' + mathHtml(buf.join('\n').trim(), true) + '</div>'); continue;
        }
      }
      if ((m = /^(#{1,3})\s+(.*)$/.exec(t))) { const lv = Math.max(2, m[1].length); out.push('<h' + lv + '>' + inline(m[2]) + '</h' + lv + '>'); i++; continue; }
      if (isRule(t)) { out.push('<hr>'); i++; continue; }
      if (/^\s*>/.test(ln)) {
        const q = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
        const cm = /^\[!(\w+)\]\s*(.*)$/.exec((q[0] || '').trim());
        if (cm) out.push(callout(cm[1].toLowerCase(), cm[2], q.slice(1)));
        else out.push('<blockquote>' + blocks(q.join('\n')) + '</blockquote>');
        continue;
      }
      if (t[0] === '|' && i + 1 < lines.length && isSep(lines[i + 1])) {
        const head = splitRow(t); i += 2; const rows = [];
        while (i < lines.length && lines[i].trim()[0] === '|') { rows.push(splitRow(lines[i])); i++; }
        out.push('<div class="table-wrap"><table><thead><tr>' + head.map((c) => '<th>' + inline(c) + '</th>').join('') + '</tr></thead><tbody>' +
          rows.map((r) => '<tr>' + head.map((_, k) => '<td>' + inline(r[k] || '') + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>');
        continue;
      }
      if (isUl(ln) || isOl(ln)) {
        const ordered = isOl(ln), items = [];
        while (i < lines.length && (ordered ? isOl(lines[i]) : isUl(lines[i]))) {
          let item = lines[i].replace(/^\s*(?:[-*+]|\d+[.)])\s+/, ''); i++;
          while (i < lines.length && lines[i].trim() && /^\s{2,}\S/.test(lines[i]) && !isUl(lines[i]) && !isOl(lines[i])) { item += '\n' + lines[i].trim(); i++; }
          items.push(item);
        }
        const tag = ordered ? 'ol' : 'ul';
        out.push('<' + tag + '>' + items.map((x) => '<li>' + inline(x).replace(/\n/g, '<br>') + '</li>').join('') + '</' + tag + '>');
        continue;
      }
      const buf = [t]; i++;
      while (i < lines.length && lines[i].trim() && !startsBlock(lines, i)) { buf.push(lines[i].trim()); i++; }
      out.push('<p>' + buf.map(inline).join('<br>') + '</p>');
    }
    return out.join('\n');
  }

  function hydrate(el) {
    if (!el || typeof root.katex === 'undefined' || !el.querySelectorAll) return;
    el.querySelectorAll('.math:not(.math-done)').forEach((n) => {
      try { root.katex.render((n.getAttribute('data-tex') || '').replace(/(\d),(?=\d{3}(?!\d))/g, '$1{,}'), n, { throwOnError: false, displayMode: n.getAttribute('data-d') === '1' }); } catch (e) { /* leave raw text */ }
      n.classList.add('math-done');
    });
  }
  function into(el, src, isInline) { el.innerHTML = isInline ? inline(src) : blocks(src); hydrate(el); return el; }

  SA.md = { render: blocks, inline, hydrate, into, esc };
  if (typeof module !== 'undefined' && module.exports) module.exports = SA.md;
})(typeof globalThis !== 'undefined' ? globalThis : this);
