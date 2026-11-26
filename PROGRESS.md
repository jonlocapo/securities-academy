# Progress

Spec: DECISIONS.md. Update this file at the end of every session.

## Step 1 — Source list (DONE 2026-11-06)
- sources/BRIEF.md — research brief + JSON schema + topic tags given to subagents.
- sources/raw/01..08-*.json — one file per cluster (maths, fin-theory, products, trading, post-trade,
  val-acc-credit, client-controls, regulation). Owned/edited by subagents.
- tools/merge-sources.ps1 — merges raw → sources/sources.json (canonical, used by the course engine)
  + sources/SOURCES.md (human review), dedupes, checks ISBN-13 checksums, prints weak tags. Run:
  `& .\tools\merge-sources.ps1` (file must stay UTF-8 *with BOM* for Windows PowerShell 5.1).
- Round 1: 226 sources after dedupe, 83 unverified; weak tags MATH-NUMERICAL, TRADE-FIX, POST-TRANSFERS, REG-SG, REG-HK.
- Round 2 + polish pass done: 288 sources (112+ books, 75 regulations, 29 standards, 23 papers), 3 unverified
  (CISI Asset Servicing edition, SMPG grid URL, AICPA guide ISBN). Removed a non-existent "CSSF Lombard Q&A".
- Known thin areas (literature genuinely sparse → lessons will lean on primary docs): fund accounting/NAV ops,
  bank chart of accounts/GL, Lombard lending, OMS/EMS & care-vs-DMA, account structures, maker-checker.
- Status facts gathered (re-check before writing lessons): EU T+1 = Reg (EU) 2025/2075, applies 11 Oct 2027;
  RTS 27/28 deleted by Dir 2024/790; EU PFOF ban (MiFIR Art 39a) fully applies since 30 Jun 2026; RIS plenary
  vote scheduled 12 Nov 2026; FR FTT 0.4% from 1 Apr 2025; IT FTT reportedly doubled from 1 Jan 2026 (verify).
- Library: tools/download-library.ps1 downloaded 81 files (95 sources, ~65 MB) into library/<tier>/ with
  library/manifest.json; merge-sources.ps1 strikes those through in SOURCES.md. EU acts come from the Publications
  Office Cellar API (EUR-Lex web blocks scripts with a WAF challenge — do not try to bypass). 54 free sources need a
  browser: library/TO-FETCH-MANUALLY.md. Link resolution in sources/download/resolved-*.json.
- Update: browser pass (built-in browser, open sites only) + user-supplied files → 106 sources struck in SOURCES.md.
  User-added files are registered in library/manual-manifest.json (title → path); 45 left in TO-FETCH-MANUALLY.md.
  Audit (pypdf page counts + first-page text): all PDFs are full documents. Multi-act entries hold one act only
  (S167 = RTS 28 only, S175 = 2021/338 only, S176 = Reg 2024/791 only). S168/S197/S267 are web pages, not legal texts.
- Later the same day: Python books removed (no-coding decision). Stable IDs now kept in sources/ids.json.
  Added the depositary rules that stand in for the members-only S159 (2016/438, 231/2013, 2018/1618-1619,
  CSSF 16/644 and 18/697) and 11 ESMA Q&A PDFs. S188 ISR = online tool only.
  Totals: 302 sources, 124 downloaded and struck, 42 left in the manual list.
  Rebuild order: download-library.ps1 → merge-sources.ps1 → make-fetch-list.ps1.
- Triage of the manual list (sources/download/triage.json, applied with tools/apply-triage.ps1). Rule: sources behind
  registration or unreachable from India get a free alternative (several docs if needed) or are skipped; online-only
  tools stay as links. Alternatives are in raw/09-alternatives.json. Result: 327 sources; 191 struck in SOURCES.md
  (downloaded, online-only or skipped); manual list is EMPTY. Files dropped into library/ by the user are registered in
  library/manual-manifest.json (MIT OCW zips, G30 1988, T+1 roadmap, ISO 20022 for Dummies, Paul's notes, Ross, Gelfand, OpenStax, MSCI).
- Next: USER REVIEW of sources/SOURCES.md, then Step 2.

## Step 2 — Syllabus map (SIGNED OFF 2026-11-06)
- Done: L5 (A3.4–A7) and L6 (C6, C7, K1, K2, Q6) refined → 1,626 exercises, 0 validator problems.
  syllabus/FACTS.md = facts register (27 resolved, 14 unresolved — mostly chapter refs / ISO codes; verify while
  writing lessons). Corrections applied to levels: FR FTT 0.4%, CSDR penalty rates in Del. Reg. 2017/389.
  Level open_questions now point to FACTS.md. Lesson writers MUST read FACTS.md (e.g. FINRA PDT rule replaced by
  intraday margin 4 Jun 2026; Reg NMS tick/access-fee relief to Nov 2027; MAR PDMR EUR 20k; Dir 2024/2811 = research).
- (history below)
- syllabus/SKELETON.md = structure authority (8 levels, 61 modules, prerequisites, 12 exercise templates, 8 minigames,
  gamification spec). Lending track prefix is K (K1 Lombard, K2 margin) to avoid clashing with level names.
- syllabus/levels/L1..L8.json drafted by Sonnet agents per syllabus/LEVEL-BRIEF.md: 364 units, 1,545 exercises.
  Validator/assembler: `python -I tools/build_syllabus.py` → syllabus/syllabus.json + syllabus/SYLLABUS.md. 0 problems.
- Encrypted PDFs (S170, S241, S292, S293, S311, S313, S323) open without password and are complete — no decryption needed.
- REMAINING before user sign-off (agents were stopped mid-run; files unchanged by them):
  1. Refine thin units: L5 A3.4–A3.8, A5, A6, A7; L6 C6, C7, K1, K2, Q6 (same prompts: richer objectives, worked
     examples with numbers, specific exercise params; then re-run validator).
  2. Fact-check syllabus/open-questions.txt (31 items) → syllabus/FACTS.md (facts register; not yet created).
  3. Chapter refs for books are mostly from memory/topic-level — verify when writing lessons.
  4. Rebuild SYLLABUS.md and send it to the user for sign-off (optionally a visual skill-tree page).
## Step 3 — Engine + Level 1 pilot (IN PROGRESS). Syllabus SIGNED OFF by user 2026-11-06.
- app/js/core.js: pure logic (registry, seeded RNG, formatters, parseNum, 12 graders + answer keys, mastery, XP,
  session composition, progress password). Self-tests: `node tools/validate-content.js --core` -> CORE OK
  (password = 351 chars for the full course; round-trip + tamper rejection tested on 200 random states).
- tools/build_course.py -> app/content/index.js (SA.COURSE, 8 levels / 61 modules / 364 units / 306 sources, 166 with
  local files). app/content/unit-ids.json is APPEND-ONLY (password order). Re-run after adding unit files ("built" flag).
- app/CONTENT-CONTRACT.md = binding brief for content authors (L2–L8 reuse it). Golden unit: app/content/L1/F1.1.js.
- tools/validate-content.js <file|dir>: 50 seeds per exercise, shape/answer-key/distractor/determinism/forbidden-API checks.
- app/vendor/katex = KaTeX 0.16.11 (user approved). .claude/launch.json "academy" = python http.server on 8765
  (open http://localhost:8765/app/index.html); real target is double-clicking app/index.html (file://).
- DONE (pilot ready for user test): UI (app/index.html, css/app.css, js/storage|markdown|render|views|app.js), all 35 L1
  units (app/content/L1, validator OK), Ledger minigame (js/games/ledger.js, levels 1-3; tools/smoke-ledger.js OK).
  Checks: validate-content --core, validate-content app/content/L1, tools/smoke-ui.js, tools/smoke-ledger.js — all OK.
  Browser-tested over http (routes, practice with Italian number format, KaTeX, locking). file:// not testable in the
  browser pane — user to confirm by double-clicking app/index.html.
- Known gaps / to do: Ledger "5100 Withholding tax" account only used at game level 2+ (teach in A5/A7); unit test only
  draws from built units; source chapter refs mostly unverified (FACTS.md / PROGRESS Step 2 item 3); mobile 375px and
  dark mode not visually checked; password is 351 chars.
- User feedback round 1 (2026-11-06): (a) prose read as AI-written -> binding "Voice" rules in CONTENT-CONTRACT.md;
  all 35 L1 lessons + 61 module hooks + 8 level intros rewritten plainly. (b) UI too generic -> restyled after finiq.com's
  design language (dark default, copper-amber gradient italic-serif headings, tan labels; light 'parchment' theme).
  Checked dark + light + 375px in browser.
- User feedback round 2 (2026-11-11), DONE:
  - Library is an AUTHORING reference only. Removed from the app: #/library route, [!source] callouts, S-ids, local-file
    links, SA.COURSE.sources. build_course.py now emits unitMeta.reading = plain citations (links only for free
    regulation/standard/guide URLs). library/ stays on disk (622 MB, inside the served folder: move it out before sharing).
  - Content is source-led: CONTENT-CONTRACT.md "Source-led authoring"; extracted texts cached in library/_text/S###.txt.
    Laws link only to vetted URLs in syllabus/LINKS.json (validator enforces). Validator also enforces British English,
    no em dashes, <=1 semicolon per card/field, no S-ids. 35 L1 units reworked by 5 Sonnet agents, then a Haiku
    proofread (validator OK). Only 32 of 107 L1 citations exist in the library (paid textbooks missing). Honest split:
    REBUILT FROM SOURCES: Q1.x, Q2.x (OpenStax, Ross), F1.1-F1.2 (ICMA, OpenStax), P1.1, P1.4, C1.1-C1.4, T1.1-T1.4
    (MiFID II, CSDR, Reg T, ESMA guidelines, FATF, Wolfsberg, T+1 texts). CLEANED ONLY (no source available, still
    agent knowledge): F1.3-F1.5, P1.2, P1.3, P1.5, A1.1-A1.5. Fix needs user decision: own copies of the textbooks, or
    switch those units to free open textbooks (OpenStax Principles of Finance / Principles of Accounting).
    "Further reading" lists the syllabus citations, not necessarily the texts each lesson was built from.
  - UI: theme toggle (data-theme set before paint; saved per browser), sentence case everywhere, no boxes/eyebrows,
    no subtitles/legend padlock text; levels shown as "Module 1..8", nodes keep codes (F1, Q2) with full titles (no
    ellipsis); tree edges re-routed (0 edges above their band); "Rings" layout toggle (concentric levels, nodes placed by
    prerequisite angle, labels on hover); objectives + further reading moved to expandable unit rows; header = XP +
    streak + theme only.
  - Gamification: one-time lesson XP (card 2, quick check 5, finish 15), combo +5 every 3rd first-try answer, live XP
    float + header count-up, small motion (all off under prefers-reduced-motion). Placement quiz (#/placement, pure
    logic SA.placement* in core, tested in --core). Practice feedback setting (after each question | at the end);
    unit tests and checkpoints now always mark at the end with a review list.
  - Syllabus: 7 units added for boss-brief gaps (O1.5, O5.6, O8.11, A3.9, C3.6, C7.6, K1.7) + objectives on country/
    sector/rating limits (C5.1) and restricted-list checks (C6.1). Some new-unit facts need FACTS.md checks before
    writing L3-L6 content (squeeze-out thresholds, withholding rates, KYC refresh cycles, retention periods).
- Round 3 (2026-11-11): progress password -> short "progress code" (SA.encodeCode, v2: run-length + crc16, UUID-like
  groups; 28 chars new learner, ~130 for the whole course; v1 passwords still load). A true fixed-length UUID would
  need a server to hold the data. Rank ladder (SA.rankOf: 50*L*(L-1) XP; Trainee..Managing director) with rewards:
  streak freezes (+1 per rank-up, max 3, auto-used on missed days), Challenge practice at rank 3 (no hints/retries,
  double XP), colour themes at ranks 4/7/11/16/22. Header shows rank + mini bar. Placement quiz only in Profile
  until the tutorial exists. Core tests cover code round trip/typos, ranks and freezes.
  Source gap acknowledged to user: TO-FETCH-MANUALLY.md (120 paid items) was only written in round 2; it should have
  been a Step 1 blocker. Do not write Module 2+ content until its sources are on disk or replaced by open textbooks.
- Books wave 1 (2026-11-11): user supplied 12 paid books (registered in library/manual-manifest.json with `ids`):
  S004, S007, S008, S011, S015, S027, S036, S045, S049, S058, S063, S064 (+ S020 PDFs). Luenberger (S075) and Simmons
  (S028) arrived as unfinished .crdownload files. L1 coverage 30% -> 60%; every L1 unit has >=1 book on disk.
  The 11 knowledge-only units were rebuilt from the books: F1.3-F1.5 (Berk-DeMarzo ch4-5, BKM ch5), P1.2/P1.3/P1.5
  (Valdez ch5-8, BKM ch1-2, Fabozzi ch1-3,8), A1.1-A1.5 (Subramani app.A+ch2, Dickinson ch13-14). Verbatim check
  (8-word shingles vs library/_text) found 1 close phrase (reworded) + 2 generic ones. Stale 2014 market sizes and
  "Chi-X" removed from P1.5. All 35 L1 units are now source-led. TO-FETCH-MANUALLY.md is grouped in waves.
- Wave 1 closed (2026-11-11): also registered S074, S039, S075, S086, S100, S160, S087 and S005 (CISI Asset Servicing
  workbook, ed. 22, March 2026, full 227 pp.). Skipped (no legal copy): S031, S028, S046, S024, S030, S062, S096, S023,
  each with its substitute noted in sources.json. Free replacements for Fanto added to LINKS.json (SEC 15c3-1/15c3-3,
  FINRA Rules, ESMA Interactive Single Rulebook). Nothing left to fetch for Module 1. One duplicate Bacon PDF recycled.
- Next: rebuild the L1 units that gained books (T1.x Baker, Q2.x Blitzstein/Wasserman, F1 Luenberger, F1.5 Bacon,
  A1.x Picker, C1.x Collardi), then Step 4 (L2 content: same pipeline — build_course.py after writing units).

## Calculator (2026-11-26)
- js/calc.js: maths editor beside numeric fields (inputs marked `data-calc`: numeric, numeric cloze blanks, journal
  amounts, table number cells, Ledger amounts). / makes a fraction from the operand before it, ^ a power, * ×, : ÷;
  typed names sqrt, root, ln, log (then _ for a base), exp, pi, ans, ncr become functions; n!, %, Ans, history of 5.
  "Use in answer" writes plain digits (12 significant figures) that parseNum reads. Setting settings.calc =
  auto | button | off (Profile), carried in the progress code (2 bits after the stats; older codes read as auto).
  Engine test: tools/smoke-calc.js. Asset stamps were refreshed with the stamp_assets() logic because sources/ was
  not available; the next build_course.py run will restamp as usual.

## Step 4 — Remaining levels: not started

## Round 4: rewards subsystems (2026-11-11)
- Daily goal ring (header; 5/10/20 setting in Profile), achievements shelf (19, in Profile and the progress code), Refresher queue (`#/review`, header badge when units are due; Mastered decays to Proficient if left overdue).
- Desk (`#/desk`): blitz games, 60 s clock, personal bests. Proof of concept: only Ledger Blitz (rank 2) is built. Other games (bz_orderbook … bz_margin) stay reserved in `SA.REWARDS`/`GAME_ORDER` but are hidden until built; add each as its Module is written.
- Header "Back to lesson" returns to the last lesson or practice page.
- Leaderboard: later.
- v0.1.0 (2026-11-13): first public release (GitHub Pages serves the gh-pages branch = app/, via tools/publish-pages.sh). Since round 3: metal mastery rings
  (bronze/silver/gold arcs per level, ===) joins) and shimmering level tags; module recommendation star (lowest
  0-3 point progress, ties by dependants, level, unstarted units); progress code as v4 UUIDs carrying settings,
  theme, daily goal and stats; custom daily goal (1-100); "Looking ahead" for recalls of units not yet met;
  "right with help" outcome in the answer review; instance-specific hints for 52 exercises; guided tour on first
  visit (js/tour.js, replay in Profile); demo.html slideshow with an in-memory sample learner (js/demo.js);
  state-machine fixes (timeline lock, Ledger timer after end, stale async views, mastery fade on day change,
  multi-select choices not rendered). library/ and sources/ stay out of the repository.
