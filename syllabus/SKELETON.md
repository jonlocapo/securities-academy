# Syllabus skeleton (v1, 2026-11-06) — design authority for all syllabus work

Read DECISIONS.md first. This file fixes structure; detail lives in syllabus/levels/L*.json.

## Shape
- ~320 h total over 8 levels (~6–12 months at 5–8 h/week).
- Two interleaved tracks: **Ops & Business** (boss's list, required) and **Theory** (maths → PhD-entry). A level mixes both;
  maths modules sit in the level where the finance that needs them appears.
- Skill tree: each module has prerequisites (module ids). Level = suggested order, not a hard gate. A module unlocks when
  all prerequisites are at least "Proficient". A level's checkpoint (boss quiz) unlocks the next level's badge, not content.
- Module = 3–8 units. Unit = 30–60 min = a short lesson + 3–6 exercises of 5–10 min each. Unit test at the end of a module.

## Tracks / id prefixes
Q maths · F finance theory · P products · T trading & execution · O post-trade & custody · A valuation & accounting ·
C clients & controls · K lending & margin (credit) · R regulation · G graduate theory

## Exercise templates (every exercise must use one; parameterised so it can regenerate with new numbers/cases)
1 `mcq` single answer · 2 `multi` multi-select · 3 `cloze` fill-in-the-blank (typed or word bank) ·
4 `numeric` parameterised calculation with tolerance and step hints · 5 `order` put steps in sequence ·
6 `match` pair items · 7 `bucket` sort items into categories · 8 `journal` build Dr/Cr entries with amounts ·
9 `timeline` place events/dates on a timeline (trade, ex, record, pay, settlement…) ·
10 `table` complete a computed table (tax-lot table, amortisation schedule, NAV sheet) ·
11 `spot` spot-the-error in a document (contract note, CA notice, order ticket, term sheet) ·
12 `paper` optional self-graded written answer: grading prompt + rubric hidden until submit; XP only, never gates.

## Minigames (practical drills; each tied to modules, reusable across levels with harder parameters)
- **Order Book** (T2/T3/T8): match incoming orders, auctions, price-time priority, see spread/impact.
- **Dealer Desk** (T4): quote RFQs, manage inventory and hit-rate.
- **Settlement Chase** (O3/O5): resolve fails before cut-off; partials, shaping, penalties.
- **CA Election Desk** (O7/O8): process events on the right dates, elections, default options, entitlements.
- **NAV Strike** (A4): compute NAV before the cut-off with pricing exceptions and accruals.
- **Ledger** (A1/A7): post the right journal entries for a stream of events.
- **Gatekeeper** (C4–C7): approve/reject orders against suitability, restrictions, limits, four-eyes.
- **Margin Hotline** (K1/K2): price moves → LTV breach → call, cure, or liquidate.

## Gamification (spec for engine; syllabus refers to it)
XP per exercise; Khan-style mastery per unit (Attempted → Familiar → Proficient → Mastered); module unit test;
level checkpoint = longer boss quiz (30–45 min) mixing all modules of the level; **callbacks**: 20–30% of later
exercises are spaced-review items from earlier units (each module lists which earlier units it calls back);
badges for minigame high scores and streaks; progress password (encoded state + checksum).

## Levels and modules (hours are estimates)

### L1 Market Literacy (~30 h)
- Q1 Algebra & functions refresh — %, powers, exponentials, logs, sequences & series (6) — prereq: none
- F1 Money & time — interest, compounding, discounting, annuities, returns (5) — Q1
- P1 What a security is — equity, debt, funds; issuers, investors, intermediaries; the market map (4) — none
- T1 Anatomy of a trade — order → execution → confirmation → clearing → settlement → custody, bird's-eye (3) — P1
- C1 Client accounts 101 — account types, mandates (execution-only, advisory, discretionary), onboarding overview (3) — P1
- A1 Double-entry for securities — debits/credits, T-accounts, cash vs securities ledgers, positions (5) — P1
- Q2 Probability & statistics intuition — mean, variance, distributions, sampling (4) — Q1

### L2 Instruments (~38 h)
- P2 Equities in depth — share classes, rights, dividends, listing, DRs, indices (5) — P1
- P3 Bonds in depth — types, coupons, conventions, day counts, accrued interest, clean/dirty price, yields (7) — P1, F1
- P4 Funds — UCITS/AIF, open/closed, share classes, subscriptions/redemptions, cut-offs, NAV mechanics, transfer agency (6) — P1, F1
- P5 ETFs — creation/redemption, primary vs secondary market, NAV vs market price, iNAV, premiums/discounts (4) — P4
- P6 Derivatives & structured products as securities (EU focus) — warrants, certificates, ELNs, EUSIPA map, PRIIPs KID,
  how notes are booked, held in custody and priced (5) — P2, P3
- F2 Returns & risk — arithmetic vs log returns, volatility, correlation, diversification (4) — F1, Q2
- Q3 Calculus I, gently — limits, derivative as rate of change, drills; previews duration (7) — Q1

### L3 Orders & Execution (~39 h)
- T2 Order types & lifecycle — market/limit/stop, TIF, care vs DMA, OMS/EMS, allocations, block trades (6) — T1
- T3 Venues & market structure — exchanges, MTF/OTF/SI, dark pools, auctions, OTC; EU vs US structure (6) — T2
- T4 Dealer execution — agency vs principal, market making, RFQ, bond trading workflows, voice vs electronic (4) — T3, P3
- T5 Best execution & TCA — MiFID II Art 27, FINRA 5310, slippage, implementation shortfall (4) — T3
- T6 Brokerage, commissions & costs — fee schedules, ex-ante/ex-post costs & charges, inducements, research unbundling, PFOF (4) — T2
- T7 Messaging — FIX basics (NewOrderSingle, ExecutionReport), SWIFT MT vs ISO 20022 (3) — T2
- O1 Contract notes & confirmations — required content (Del. Reg. 2017/565 Art 59, SEC 10b-10), MT515/518, trade matching (3) — T2, A1
- Q4 Calculus II — integrals, exponential/log growth, Taylor approximation; previews convexity (6) — Q3
- Q5 Probability II — random variables, expectation, normal & lognormal, CLT (3) — Q2, Q3

### L4 Post-Trade & Custody (~39 h)
- O2 Clearing & CCPs — netting, novation, CCP margin, default waterfall, EMIR (5) — T1, O1
- O3 Settlement — DVP models, CSDs/ICSDs, T2S, cycles (US T+1 2024; EU/UK T+1 Oct 2027), fails, CSDR penalties & buy-ins (7) — O2
- O4 Custody & safekeeping — custody chain, sub-custodians, omnibus vs segregated, asset protection, depositaries (UCITS/AIFMD), reconciliation (6) — O3
- O5 Transfers — FoP vs DvP, account/portfolio transfers (ACATS, STAR, EU practice), fund transfers (ISO 20022 sese) (4) — O4
- O6 Securities lending & repo — mechanics, collateral, GMRA/GMSLA, SFTR (5) — O3
- O7 Corporate actions I: mandatory events — cash/stock dividends, coupons, redemptions, splits/reverse splits, bonus issues,
  mandatory mergers, identifier changes; key dates; MT564–568 / seev (8) — O4, P2, P3
- F3 Fixed income maths I — price/yield, duration, convexity (4) — P3, Q4

### L5 Asset Servicing & Accounting (~42 h)
- O8 Corporate actions II: voluntary & elective — rights issues (TERP), tenders, exchange offers, scrip options, conversions,
  proxy voting & SRD II, market claims, transformations, buyer protection (8) — O7
- A2 Income accounting — coupon & dividend accruals, ex vs pay-date accounting, withholding tax & reclaims (FASTER), effective-interest amortisation (6) — A1, O7, F3
- A3 Gain accounting & tax lots — FIFO/LIFO/average/specific lot, realised vs unrealised, CA cost-basis adjustments, wash sales (6) — A1, O8
- A4 Valuation: NAV vs market price — NAV calculation, pricing sources, swing pricing, NAV errors (CSSF 24/856), fair-value hierarchy (IFRS 13) (6) — P4, P5, A2
- A5 P&L — trading P&L, MTM, P&L explain/attribution, FX P&L (5) — A3, A4
- A6 Performance measurement — TWR vs MWR, benchmarks, attribution, GIPS (5) — A5, F2
- A7 Bank-side books — chart of accounts, GL postings for trades/settlement/fees/CA/loans, client money, IFRS 9 classification & measurement (6) — A2, A3

### L6 Wealth, Credit & Controls (~46 h)
- C2 Onboarding & KYC/AML — CDD/EDD, PEPs, sanctions screening, client classification (retail/professional/ECP), LEI (6) — C1
- C3 Account structures & mandates in depth — joint, corporate, trust, nominee, omnibus, powers of attorney (4) — C2, O4
- C4 Suitability & appropriateness — ESMA guidelines, product governance & target market, Reg BI, FinSA, SFC/MAS (6) — C2, P6
- C5 Investment limits & mandate compliance — issuer/group/concentration limits (UCITS 5/10/40, CRR large exposures), pre- vs post-trade compliance (5) — C4, P4
- C6 Trading restrictions — restricted/watch lists, MAR insider lists, PA dealing, short-selling rules, sanctions, information barriers (5) — C2, T2
- C7 Approvals & controls — four-eyes, maker-checker, order-approval workflows, exceptions, three lines model, operational risk (4) — C5, C6
- K1 Lombard lending — lending values, LTV, haircuts by asset class, concentration, pledge/collateral agreements (5) — C3, A4
- K2 Margin & margin calls — Reg T/FINRA 4210, call process, cure/liquidation, portfolio margin, collateral management (5) — K1, O6
- Q6 Linear algebra — vectors, matrices, covariance matrices, portfolio maths (6) — Q4, F2

### L7 Regulation & Market Theory (~43 h)
- R1 EU deep dive — MiFID II/MiFIR (+2024 review), MAR, PRIIPs, UCITS/AIFMD II, CSDR (+Refit, T+1), SFTR, EMIR, SRD II, Retail Investment Strategy (10) — C4, O3, T5
- R2 United States — '33/'34 Acts, Reg NMS, Reg BI, Rule 15c3-3, T+1, FINRA (5) — R1
- R3 UK & Switzerland — COBS/CASS, Consumer Duty, UK MiFIR; FinSA/FinIA/FinMIA, SBA guidelines (4) — R1
- R4 Asia sidebars — Singapore (SFA, FAA-N16, fair dealing), Hong Kong (SFO, Code of Conduct) (2) — R1
- F4 Fixed income maths II — term structure, bootstrapping, spreads, FRNs (5) — F3, Q6
- F5 Portfolio theory & CAPM — mean-variance, efficient frontier, CAPM, factor models, market efficiency (6) — F2, Q6
- T8 Market microstructure — spreads, liquidity, price impact; Kyle & Glosten–Milgrom (6) — T3, Q5
- Q7 Multivariable calculus & optimisation — partial derivatives, gradients, Lagrange multipliers (5) — Q4, Q6

### L8 Quant & Graduate Theory (~43 h)
- F6 Derivatives pricing & Greeks — no-arbitrage, binomial trees, Black–Scholes, Greeks in practice (8) — P6, F5, Q5
- Q8 Stochastic processes & Itô calculus — random walks, Brownian motion, Itô's lemma, SDEs (8) — Q7, Q5
- F7 Asset pricing theory — SDF, consumption-based models, Cochrane/Campbell (7) — F5, Q8
- G1 Financial econometrics — regression, time series, volatility models (GARCH) (7) — Q6, Q5
- G2 Measure-theoretic probability & analysis bridge (6) — Q8
- G3 Numerical methods (concepts, no coding) — Monte Carlo, finite differences, trees (4) — F6
- F8 Behavioural finance (3) — F5

## Coverage check (boss's list → modules)
stocks P2 · bonds P3/F3/F4 · funds P4/P5/A4 · order & execution workflows T1/T2/T3 · brokerage & commissions T6 ·
NAV/market price A4/P5 · PnL A5 · all corporate actions O7/O8/A2/A3 · secured/Lombard financing K1 · margin calls K2 ·
contract notes O1 · income accounting A2 · gain accounting A3 · limits by issuer/group C5 · dealer execution via venues T3/T4/T5 ·
custodian settlement & safekeeping O3/O4 · transfers O5 · suitability C4 · trading restrictions C6 · chart of accounts A7 ·
approvals C7 · client onboarding C2 · client accounts C1/C3.
