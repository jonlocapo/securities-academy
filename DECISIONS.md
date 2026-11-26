# Securities Academy — design decisions (agreed 2026-11-06)

Read this first in any new session. It is the spec.

## Goal
Self-study, Khan-Academy-style gamified course that takes one learner (EU-based structured-products specialist)
from Italian high-school maths to specialist + PhD-entry level in investment securities operations and theory.
Target load 5–8 h/week, 6–12 months (~300 h).

## Learner baseline
- Knows structured products well (EU products), RFQ, term sheets; Greeks only conceptually.
- Maths: good Italian HS; calculus is shaky → math track starts with pre-calculus refresh, slow calculus with drills.

## Scope (boss's list — all required)
Stocks, bonds, funds; order & execution workflows; brokerage & commissions; NAV vs market price; PnL;
all corporate actions; secured/Lombard lending; margin calls; contract notes; income accounting; gain accounting;
limits by issuer/group; dealer execution across venues; custodian role (settlement, safekeeping); transfers;
suitability; trading restrictions; chart of accounts; approvals; client onboarding; client accounts.
All client segments (retail, private banking/wealth, institutional).
Plus: theory track (probability, calculus, linear algebra, stochastic calculus, asset pricing, fixed-income maths,
microstructure, econometrics) to PhD-entry. Optional bridge: structured products as securities (EU focus).

## Jurisdictions (notability rule: more important = longer, deeper modules)
1. EU — deepest (MiFID II/MiFIR, CSDR, SFTR, EMIR, PRIIPs, UCITS/AIFMD, SRD II, T2S).
2. US (Reg BI, Reg NMS, T+1, FINRA).
3. UK, Switzerland (FinSA/FIDLEG, Lombard practice).
4. Singapore, Hong Kong — sidebars.
National EU (FR/DE/IT…) only where a notable local oddity exists; same tier as each other. No dedicated Italy sidebar.

## Accounting
Both: client-side portfolio accounting first (income, gains, cost methods, tax lots), then bank-side (chart of accounts, GL postings).

## NOT in scope
- Company system / Jira / internal docs (irrelevant; no "link to our module").
- Certification mapping (CISI/CFA) — not required.
- AI auto-grading, capstone, leaderboard, multi-user.
- Programming (Python etc.): user's view is AI does the coding. Numerical methods taught conceptually, no code exercises.

## Source IDs
Permanent: sources/ids.json (normalised title -> id). Removed sources retire their id; never renumber.

## Sources
- Books/papers/regulations/standards are SOURCES and reference material; lessons are original, digestible text.
- Recent editions; older complete classics allowed. Overlap preferred over gaps. 20–50+ sources fine.
- User gathers documents; we only provide the list (title, edition, year, ISBN, where to get).
- Reading list lives INSIDE the course, stratified (foundation/core/advanced/reference).
- Number of levels decided AFTER source review.

## Course format
- Local static site (HTML/JS), performant, no build step; may move to GitHub Pages later.
- Folder: C:\Users\cristiano.t\Documents\securities-academy\
- Single-player. Progress in localStorage + old-school progress password (encoded state + checksum) to transfer.
- Branching skill tree; math units unlock alongside the finance units that need them; suggested levels per module OK.
- PROGRESSION is the core of the gamification. Be creative: practical examples, callbacks to earlier units, minigames for hard concepts.
- Exercises: MCQ, fill-in-the-blank, numeric. Built from ~5–10 scalable parameterised templates (Khan-style), many of them.
  Each exercise 5–10 min max; occasional longer checkpoint quizzes.
- Optional self-graded papers: grading prompt + rubric hidden until answer submitted; learner pastes into own chatbot and
  self-reports score. Gives XP but cannot unlock gates alone (AI grading is stochastic).
- English only for now.

## Interface design (user, 2026-11-26)
- If a control needs an explanation on screen, the design is wrong: fix the design instead. No placeholder text,
  helper captions, "e.g." hints or explanatory tooltips. The one exception is a guide the user asked for and opens
  on purpose (the calculator's ? button).
- Nothing the user asked for in conversation shows up in the product as a description of itself: no labels like
  "now X" or "X, as requested", no notes about how a feature works behind the scenes.
- Syllabus text written for lesson authors (jurisdiction notes, minigame variants, unit-test specs, open questions)
  never reaches the course pages.
- Hidden systems stay hidden (for example the hint weighting on mastery): no hints, tooltips or wording that reveal them.
- Visual changes are shown as mockups first and built only after the user approves.
- After every merge to main, publish to gh-pages (tools/publish-pages.sh) so the change is visible on the live site.

## Process
1. Verified source list → user review.
2. Syllabus map (levels, modules, outcomes, sources per module) → user sign-off. No bulk content before this.
3. Engine + Level 1 pilot.
4. Remaining levels in batches (~1 level per session); PROGRESS.md updated after each batch.

## Model use
User is on Pro: do NOT use Opus for bulk work. Delegate research/drafting/exercise generation liberally to
Sonnet/Haiku subagents; main session only plans and reviews.

## Sources in waves (user, 2026-11-11)
Books are added one Module at a time. The user supplies the paid books for the next Module (library/TO-FETCH-MANUALLY.md
is grouped by wave), Claude registers them (library/manual-manifest.json, field `ids`), and only then is that Module's
content written, source-led. No Module's content is written from model knowledge while its books are missing.
