# Content contract — unit files (binding for every content author)

Read first: DECISIONS.md, syllabus/FACTS.md (facts override anything in your memory), the unit's entry in
syllabus/levels/<L>.json (objectives, worked example, exercises, callbacks, sources), and the golden unit
app/content/L1/F1.1.js. Copy its patterns.

## Source-led authoring (binding)
The lessons are aggregated from the reference library, not invented. The library is for authors only and is never
shown to or linked for learners.
- Resolve the unit's `sources` ids (S###) via library/manifest.json and library/manual-manifest.json (field `ids`
  → `path`). Extract text with `python -I -c "import pypdf; ..."` (or read .html/.txt directly). Read the cited
  chapter(s) before writing.
- Follow the sources' sequence of ideas, their definitions, their worked-example patterns and their problem types.
  Prefer a textbook's standard example structure over a new one. Paraphrase closely, in your own sentences.
- Do not copy copyrighted text verbatim. Short verbatim quotes are allowed only from public legal texts
  (regulations, directives, rulebooks), in quotation marks.
- Never mention source ids (S###) in learner text and never use `[!source]` callouts. Don't narrate where facts
  come from ("The ICMA guide says…", "Textbooks such as…"): state the fact. Name a source only when the term or rule
  belongs to it (ICMA day-count rules, ISDA definitions, a regulation), at most once or twice per lesson. The unit's
  sources are listed on the module page automatically.
- If a cited source is missing from the library, use the unit's other sources and FACTS.md. Note any claim you
  could not back from a source in your reply.
- When a lesson names a law, regulation or official rulebook, link it once with a URL from syllabus/LINKS.json
  (e.g. `[MiFID II](https://eur-lex.europa.eu/eli/dir/2014/65/oj)`). Only URLs in that file are allowed. If you
  need one that is missing, say so in your reply instead of guessing.

## File
`app/content/<Level>/<unitId>.js`, e.g. `app/content/L1/F1.1.js`. It is a classic script: it calls `SA.unit({...})`, with no
`import`, `export`, `fetch`, `require`, DOM access, `Math.random` or `Date.now`. It is ASCII or UTF-8 and has no secrets.

```js
SA.unit({
  id: 'F1.1',
  lesson: [ { md: '...', check: { template: 'mcq', ... } /* optional, no XP */ }, ... ],   // 4–8 cards
  exercises: [ { id: 'simple-interest', template: 'numeric', generate(r, f) { ...; return instance; } }, ... ],
});
```

## Lesson cards (`md`)
- Markdown subset:
  - `#`, `##` and `###` headings
  - paragraphs
  - `**bold**`, `*italic*` and `` `code` ``
  - `-` lists and `1.` lists
  - tables with `| a | b |` and a `|---|---|` header separator
  - `[text](url)` links
- Maths:
  - `$...$` for inline maths and `$$...$$` for display maths (KaTeX).
  - Escape backslashes in JS strings (`'$\\frac{a}{b}$'`), or use template literals with `String.raw`.
- Inside `$...$`, words render as italic maths. Keep currency amounts and words **outside** the maths
  (`$500{,}000 \\times 0.032$ = **EUR 16,000.00**`), or wrap them in `\\text{EUR }`. Use `{,}` for thousands separators inside maths.
- MCQ choices must not give the answer away. For example, don't put the computed value in the correct choice only.
- Callouts are blockquotes whose first line is a type tag:
  - `> [!example]` for a worked example
  - `> [!tip]`
  - `> [!warning]`
  - `> [!eu]`, `> [!us]`, `> [!uk]`, `> [!ch]` and `> [!asia]` for jurisdiction boxes
  - `> [!recall] Q1.3` for a callback to an earlier unit (the engine links it)
- Pedagogy:
  - Order the cards: concrete case → idea → formula → worked example with real EUR numbers → pitfalls.
  - Each card should take about 1–3 minutes to read.
  - The last card is a 3–5 bullet "Summary".

## Voice (binding — the user rejected an "AI cadence")
- **British English**: -ise/-isation, colour, centre, analyse, per cent, cheque, towards, programme
  (except computer program). The validator rejects common American forms.
- **Punctuation**: no em dashes. At most one semicolon per card or field, ideally none: split into two sentences.
  En dashes are only for ranges (Ch. 4–5, 2–3 days).
Write like a good operations manual or a sober textbook (Hull, Berk–DeMarzo, a central-bank explainer). The reader is a
professional colleague, not someone you need to impress or entertain.
- **Plain declarative sentences.** State the fact, define the term, give the example, note the exception. Let sentence
  length vary naturally; don't build rhythm on purpose.
- **No hooks or theatre.** No "Your first morning on the desk…" openers, no invented client quotes for colour, no
  "imagine…", no scene-setting. A case is just data: "A client holds 2,000 shares of a listed company."
- **No setup-and-reveal.** Banned: "The core idea:", "the answer fits in one sentence:", "Here's the thing", "It turns out",
  "The key is", a colon or dash leading to a punchline, or a rhetorical question answered in the next sentence.
- **No zingers.** Don't end a paragraph on a short aphorism ("Creditors cannot come after your house.", "That is the whole
  trick."). Don't write "not X, but Y" contrasts unless the contrast is the fact being taught.
- **No selling the content.** Don't announce importance ("this idea underlies the whole course", "which is why every desk…",
  "the most common slip"). If something matters, give the reason in one factual clause.
- **Bold** only for a term at its first definition and for final numeric answers in examples. No bold sentences, no
  italics for drama.
- Banned words: notice, imagine, think of, simply, just, exactly, crucial, key (as an adjective), powerful, magic,
  journey, dive, unlock, superpower, "let's".
- Headings name the topic ("Simple interest", "Day-count conventions"), never a slogan ("Money has a price").
- Don't use exclamation marks. Use "you" sparingly, and only for instructions.

Before/after:
> ✗ It is the oldest question in markets, and the answer fits in one sentence: **you own a slice of the company, and the
> slice comes with rights, not promises.**
> ✓ An ordinary share is a unit of ownership in a company. It gives the holder rights (to vote, to receive declared
> dividends, to a residual claim in liquidation) but no promise of payment.

## Exercises
- Make one exercise per syllabus exercise entry, in the same order, with the same template.
- The `id` is a short kebab-case slug, unique within the unit.
- `generate(r, f)` must be **pure and deterministic**: use only `r` (RNG) and `f` (formatters). It returns an instance and
  must give varied instances across seeds (vary the numbers, names, cases and order). Pick values so the answers are clean
  where that suits the topic.
- Templates with fixed facts (mcq/match/bucket…) still vary: draw from a pool of 8+ items with `r.sample` and shuffle.

### RNG `r`
- `r.int(lo, hi)`: inclusive.
- `r.float(lo, hi, step)`: snapped to `step` (e.g. `r.float(1, 6, 0.05)`).
- `r.pick(arr)`, `r.sample(arr, k)`, `r.shuffle(arr)` (returns a copy) and `r.bool(p)`.
- `r.market(opts)` gives one coherent example market from `SA.MARKETS` (DE, FR, NL, IT, ES, UK, US, SG, HK, weighted towards the EU): `{ key, region, country, adj, ccy, city, venue, mic, csd, settle, names, companies: [{ n, isin }] }`. `opts.only` / `opts.except` take regions or keys.

### Example mix
Examples are not all Italian or all EUR. Any generator with money, a person, a company, a venue or a city picks `const M = r.market()` once and takes everything from it, so an instance never mixes markets. Use `f.money(x, M.ccy)` and `unit: M.ccy`. Write amounts at euro size and wrap each one in `M.amt(x)` where it is generated, so a Hong Kong instance shows about 10x the number (HKD 5,000,000, not HKD 500,000) and Singapore about 1.5x. A per-share price uses `M.px(x)` instead (HKD 2x, SGD 0.5x), because Hong Kong shares mostly trade at HKD 10 to 600, not at ten times euro prices. Compute answers from the scaled values. The validator renders each seed in EUR and in HKD and fails when the HKD amounts are not scaled. Keep a generator EU-only (`r.market({ only: ['EU'] })` or plain EUR) when its logic rests on an EU rule such as MiFID categories, T2S or CSDR. Add a company only with a real ISIN; the validator checks the check digit and fails any instance that shows two currencies unless the exercise sets `multiCcy: true`.

### Formatters `f`
- `f.round(x, dp)` and `f.num(x, dp)`. `f.num` gives `"4,000.00"` with English separators.
- `f.money(x, M.ccy, dp=2)` gives `"GBP 4,000.00"`. `f.eur(x, dp)` is for EU-only exercises.
- `f.pct(frac, dp=2)` takes a **fraction**: 0.032 → `"3.20%"`. `f.bp(frac)`: 0.0045 → `"45 bp"`.
- Dates are ISO strings `'2026-03-02'`:
  - `f.date(iso)` gives "2 Mar 2026".
  - `f.addDays`, `f.addBusinessDays` (weekends only) and `f.dayDiff(a, b)`.
  - `f.weekday(iso)`.
- Always compute the answer from the same numbers you display, and round the displayed inputs first
  (`P = r.int(...)*1000`, `rate = r.float(...)`) so the learner sees exactly what you computed with.

### Instance fields (all templates)
- `prompt`: md, required.
- `hints`: [md], 1–3 hints, progressively revealing.
- `solution`: md, the full worked solution shown after answering. Required for numeric/table/journal.

### Fields per template

**mcq**
- `{ choices: [md…], answer: idx }`
- Use 3–5 choices. The engine shuffles them unless `fixedOrder: true`.
- Distractors must be plausible mistakes (wrong day count, forgot to divide by 100…) and distinct after formatting.

**multi**
- `{ choices: [md…], answers: [idx…] }`
- At least one choice is correct and at least one is wrong.

**numeric**
- `{ answer: number, dp: 2, tol: { abs } | { rel }, unit: 'EUR' | '%' | 'bp' | 'years' | '' }`
- The default tolerance is half a unit in the last decimal place.
- For percent answers, set `unit: '%'` and give `answer` in **percent units** (3.2 means 3.2%). Say "answer in %, 2 dp" in the
  prompt.
- The parser accepts `4000`, `4,000.00`, `4.000,00`, `EUR 4000` and `3.2%`.

**cloze**
- `{ text: md with [[0]], [[1]] … placeholders, blanks: [ { accept: ['principal', 'capital'] } | { numeric: { answer, dp, tol } } ], bank?: [words] }`
- Text matching ignores case and accents.

**order**
- `{ items: [md…] }` in the **correct** order. The engine shuffles them.

**match**
- `{ pairs: [[left, right], …] }` with 4–6 pairs and unique right-hand sides.

**bucket**
- `{ buckets: ['Equity', 'Debt', …], items: [ { text, bucket: idx }, … ] }` with 5–8 items.

**timeline**
- `{ slots: ['T (trade date)', 'T+1', …] or dates, events: [ { text, slot: idx }, … ] }`

**journal**
- `{ accounts: [names…, including 2+ distractors], lines: [ { account, dr: amt } | { account, cr: amt } ], tol?: { abs } }`
- It is graded on the net amount per account plus balance, so line order and split lines don't matter.

**table**
- `{ columns: [..], rows: [[cell…]…] }`
- A cell is given as a string or number, or is a blank to fill: `{ answer: num, dp, tol }` or `{ accept: [...] }`.

**spot**
- `{ title?, doc: [ { text, error: true | false, why: md } … ], count?: n }`
- The learner flags the wrong segments. Every segment with `error: true` needs a `why`.

**paper**
- `{ prompt, rubric: md, gradingPrompt: 'text containing {{answer}}' }`
- It is self-graded, gives XP only, and never counts towards mastery.

## Nothing for authors reaches the learner (binding)
- Scoping notes in the syllabus ("at headline level", "conceptually", "preview only", "for role names only") guide you;
  they never appear in lesson text, questions or hints.
- Write to the learner, never about them: no "the learner can".
- Refer to levels as "Module N" (the course's name for them), never "L4" or "Level 4". Module codes such as P3 are fine.
- No notes on how the course works (drills, retries, callbacks, XP, unlocks) and no TODO or TBD.

## Validation (required before you reply)
`node tools/validate-content.js app/content/L1/F1.1.js` runs every generator with 50 seeds. It checks:
- the fields;
- that the answer key grades as correct;
- that distractors grade as wrong;
- that the output has no NaN, `undefined` or empty strings;
- that there are no forbidden APIs.

Then run `node tools/lint-copy.js`, which fails on anything from "Nothing for authors reaches the learner".

Fix everything they report.
