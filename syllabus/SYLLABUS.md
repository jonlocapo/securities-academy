# Securities Academy — syllabus map (draft for sign-off)

Generated from syllabus/levels/*.json. Structure rules: syllabus/SKELETON.md. Source ids → sources/SOURCES.md.

**8 levels · 61 modules · 371 units · 1661 exercises · ~320 h**

## L1 — Market Literacy (~30 h)

This level covers the arithmetic used in markets: percentages, basis points, powers, logarithms, compounding, discounting, annuities and returns. It describes stocks, bonds and funds, the main market participants, and how a trade moves from order to custody. It also covers client-account setup, double-entry posting of a trade, and the average, variance and normal curve.

### Q1 Algebra & Functions Refresh · 6 h · track: theory · needs: —

_Percentages, basis points, powers, logarithms and simple equations as used in fee, return and doubling-time calculations. Short drills with hints and unlimited retries._


- **Q1.1 Percentages, basis points and proportions** (45 min) — Learner can convert between percent, decimal and basis points; Learner can compute a percentage change and chain successive percentage changes; Learner can compute a fee or a weight as a percentage of an amount
  - Example: A EUR 25,000 portfolio pays a 0.45% (45 bp) annual custody fee = EUR 112.50. A fund that falls 20% and then rises 25% is exactly back at its start, because 0.80 x 1.25 = 1.00; falling 20% and rising 20% leaves it 4% short.
  - Exercises (6): cloze, match, mcq, numeric
  - Sources: S003 Ch. 1 Prerequisites (real numbers, ratios and rates), S027 Opening chapters on algebraic basics and word problems (drills), S015 Ch. 5 (return arithmetic, percentage returns)
- **Q1.2 Ratios, units and solving simple equations** (45 min) — Learner can rearrange a formula to isolate any variable; Learner can solve linear equations in one unknown from a market word problem; Learner can keep track of units (shares, EUR, EUR per share)
  - Example: How many whole shares can EUR 10,000 buy at EUR 37.60 if there is a flat EUR 9.90 fee? Solve n x 37.60 + 9.90 <= 10,000, so n = 265 shares (cost EUR 9,964.00 + 9.90 = EUR 9,973.90).
  - Exercises (6): mcq, numeric, order, spot · Callbacks: Q1.1
  - Sources: S003 Ch. 2 Equations and Inequalities, S002 Opening chapters on equations and word problems, S011 Ch. 1-2 (introductory algebra and equations)
- **Q1.3 Powers, roots and large numbers** (45 min) — Learner can apply the laws of exponents including negative and fractional exponents; Learner can convert a multi-year growth factor into a per-year factor using roots; Learner can read and write large amounts in millions, billions and scientific notation
  - Example: EUR 1 grows to EUR 1.21 in 2 years, so the yearly factor is 1.21^(1/2) = 1.10, i.e. 10% a year. A company with 3.2 x 10^9 shares at EUR 45 has a market capitalisation of EUR 144 bn.
  - Exercises (6): cloze, match, mcq, numeric · Callbacks: Q1.1, Q1.2
  - Sources: S003 Ch. 1 (exponents and scientific notation, radicals), S022 Ch. 1 Prerequisites review, S020 Algebra notes: exponents and radicals sections
- **Q1.4 Functions and graphs** (45 min) — Learner can read and evaluate function notation f(x); Learner can identify slope and intercept of a linear function and interpret them; Learner can read a piecewise function such as a tiered fee schedule and find where two lines cross
  - Example: A broker charges max(EUR 5, 0.10% of notional): the fee line is flat at EUR 5 until notional EUR 5,000 and then slopes at 0.001. Holding n shares bought at EUR 20, the profit function is P(S) = n(S - 20), a straight line with slope n.
  - Exercises (6): mcq, multi, numeric · Callbacks: Q1.2
  - Sources: S003 Ch. 3 Functions and Ch. 4 Linear functions, S022 Ch. 3 Functions, S023 Ch. 2 Functions
- **Q1.5 Exponential functions and growth** (45 min) — Learner can evaluate f(t) = a x b^t for growth and decay; Learner can tell linear from exponential growth from a table or a graph; Learner can state what the number e is for and evaluate e^x
  - Example: EUR 1,000 growing at 4% a year is worth 1,000 x 1.04^10 = EUR 1,480.24 after 10 years, versus EUR 1,400 if only the original EUR 1,000 earned 4% each year. Rule of 72: 72/4 = 18 years to double, close to the exact 17.7.
  - Exercises (6): bucket, mcq, numeric · Callbacks: Q1.3, Q1.4
  - Sources: S003 Ch. 6 Exponential and Logarithmic Functions (exponential functions, the number e), S022 Ch. 4 Exponential and Logarithmic Functions, S023 Ch. 4 Exponential and Logarithmic Functions
- **Q1.6 Logarithms** (45 min) — Learner can use a logarithm as the inverse of an exponential to solve for time or rate; Learner can apply the product, quotient and power rules; Learner can read a log-scale chart and explain why log charts show percentage moves
  - Example: How long to double at 4% a year? Solve 1.04^t = 2, so t = ln 2 / ln 1.04 = 0.6931 / 0.03922 = 17.67 years. On a log chart a 10% rise looks the same size at EUR 10 and at EUR 100.
  - Exercises (6): match, mcq, numeric, spot · Callbacks: Q1.5
  - Sources: S003 Ch. 6 (logarithmic functions, properties, exponential and logarithmic equations), S022 Ch. 4 (logarithmic functions and equations), S020 Algebra notes: logarithm functions and equations
- **Q1.7 Sequences: arithmetic and geometric** (45 min) — Learner can write the n-th term of an arithmetic and of a geometric sequence; Learner can recognise which kind of sequence a data series follows; Learner can find a missing term or the common difference/ratio
  - Example: A savings plan starts at EUR 100 a month and rises by EUR 10 each month: the 12th instalment is 100 + 11 x 10 = EUR 210 (arithmetic). A dividend of EUR 2.00 growing 5% a year pays 2.00 x 1.05^4 = EUR 2.43 in year 5 (geometric).
  - Exercises (6): bucket, mcq, numeric, table · Callbacks: Q1.5, Q1.6
  - Sources: S003 Ch. 9 Sequences, Probability and Counting Theory (sequences), S022 Ch. 13 Sequences, Probability and Counting Theory, S023 Chapter on sequences and series
- **Q1.8 Series, sigma notation and a mixed drill round** (45 min) — Learner can read and expand sigma notation; Learner can sum a finite geometric series with the formula and the infinite series when the ratio is below 1; Learner can combine percentages, powers, logs and series in a mixed set
  - Example: Sum of 1.05^-k for k = 1..5 is (1 - 1.05^-5)/0.05 = 4.3295; this is exactly the present value of EUR 1 a year for 5 years at 5%, which F1 will name an annuity factor. The infinite version gives 1/0.05 = 20.
  - Exercises (6): mcq, numeric, spot, table · Callbacks: Q1.1, Q1.5, Q1.6, Q1.7
  - Sources: S003 Ch. 9 (series and their notations; geometric series), S022 Ch. 13 (series), S011 Chapter on sequences and series (finance-related)

Unit test: 20-question mixed test on percentages/bp, equation rearrangement, exponents and roots, linear and piecewise functions, exponentials, logs and geometric series.

### F1 Money and Time · 5 h · track: theory · needs: Q1

_Simple and compound interest, present and future value, annuities and return measures, with EUR money-market and deposit examples._


- **F1.1 Simple interest and the time value of money** (50 min) — Learner can compute simple interest over a fractional period with an Act/360 style day count; Learner can explain why money today beats money later; Learner can distinguish nominal rate, period and amount
  - Example: EUR 500,000 lent for 90 days at 3.20% on Act/360: interest = 500,000 x 0.032 x 90/360 = EUR 4,000. With Act/365 the same loan pays EUR 3,945.21, which is why conventions matter.
  - Exercises (5): cloze, match, mcq, numeric · Callbacks: Q1.1, Q1.2
  - Sources: S008 Ch. 4 Time Value of Money and Ch. 5 Interest Rates (interest rate quotes), S075 Ch. 2 The Basic Theory of Interest, S220 Appendix A5 (day-count conventions), skim only
- **F1.2 Compounding and future value** (50 min) — Learner can compute future value with annual and sub-annual compounding; Learner can compute the effective annual rate (EAR) from a nominal rate and compounding frequency; Learner can compute continuously compounded growth and use it to compare rates
  - Example: EUR 20,000 for 10 years at 3% compounded annually becomes 20,000 x 1.03^10 = EUR 26,878.33. A 3% nominal rate compounded monthly gives EAR = (1 + 0.03/12)^12 - 1 = 3.042%; continuous compounding gives e^0.03 - 1 = 3.045%.
  - Exercises (5): mcq, numeric, table · Callbacks: Q1.5, Q1.6, F1.1
  - Sources: S008 Ch. 4 (compounding) and Ch. 5 (EAR, continuous compounding), S075 Ch. 2 (compounding, continuous compounding), S024 Ch. 2 Present value (compounding sections)
- **F1.3 Discounting and present value** (60 min) — Learner can compute present value by discounting a single future cash flow; Learner can compute the present value of several cash flows and compare options; Learner can solve for the discount rate or the number of periods
  - Example: A zero-coupon note repays EUR 1,000 in 5 years; at a 4% discount rate it is worth 1,000 / 1.04^5 = EUR 821.93. If it trades at EUR 800, the yield satisfies (1,000/800)^(1/5) - 1 = 4.56%.
  - Exercises (5): mcq, numeric, table · Callbacks: Q1.3, Q1.6, F1.2
  - Sources: S008 Ch. 4 Time Value of Money (valuing a stream of cash flows, NPV), S024 Ch. 2 Present Value and the Opportunity Cost of Capital, S075 Ch. 2 (present value)
- **F1.4 Annuities and perpetuities** (60 min) — Learner can price an ordinary annuity and an annuity-due with the closed formula; Learner can price a perpetuity and a growing perpetuity; Learner can compute a loan instalment from principal, rate and term
  - Example: A loan of EUR 100,000 over 10 years at 4% with yearly payments has instalment 100,000 / 8.1109 = EUR 12,329.09 (annuity factor 8.1109 from the geometric series in Q1.8). A share paying EUR 3 forever at a 6% required return is worth 3/0.06 = EUR 50.
  - Exercises (6): mcq, numeric, table · Callbacks: Q1.8, F1.3
  - Sources: S008 Ch. 4 (perpetuities, annuities, growing cash flows) and Ch. 5 (loan amortisation), S024 Ch. 2 (perpetuities and annuities), S075 Ch. 2 (annuities and amortisation)
- **F1.5 Returns: holding-period, annualised, real and nominal** (80 min) — Learner can compute a holding-period return including income; Learner can annualise and de-annualise a return; Learner can convert between nominal and real returns using inflation; Learner can compute a simple money-weighted vs time-weighted return in a two-period toy example
  - Example: A share bought at EUR 40, paying a EUR 1.20 dividend and sold at EUR 43 after 18 months, has HPR (43 - 40 + 1.20)/40 = 10.5%, or 6.9% a year geometrically. With 2.5% inflation, the real return is 1.069/1.025 - 1 = 4.3% a year.
  - Exercises (6): mcq, numeric, table · Callbacks: Q1.1, Q1.3, F1.2
  - Sources: S015 Ch. 5 Risk, Return and the Historical Record (holding-period returns, real vs nominal), S008 Ch. 5 Interest Rates (real vs nominal rates), S086 Opening chapter on return measures (preview only)

Unit test: 15-question test on simple and compound interest, EAR, discounting, annuity/perpetuity pricing, loan instalments and return arithmetic (nominal/real, annualised).

Jurisdictions: Examples use EUR and ECB/EURIBOR-style money-market conventions; US dollar and sterling conventions (Act/360 vs Act/365 for GBP) are mentioned as one-line contrasts only.

### P1 What a Security Is · 4 h · track: ops · needs: —

_The main security types (shares, bonds, funds and derivatives), their rights and cash flows, and how to classify an instrument by its terms._

Covers (boss's list): stocks, bonds, funds  

- **P1.1 Securities and why markets exist** (45 min) — Learner can define a security and distinguish it from a loan, a deposit and a contract; Learner can explain the roles of issuers, investors and intermediaries; Learner can explain primary vs secondary markets
  - Example: A company raises EUR 50 m by issuing 5,000,000 new shares at EUR 10 (primary market). When an investor later sells 1,000 of them to another investor on an exchange, the company receives nothing (secondary market).
  - Exercises (5): bucket, cloze, match, mcq, numeric · Callbacks: Q1.1
  - Sources: S004 Ch. 1 and Ch. 2 (financial system, markets and instruments), S030 Opening chapters: why markets exist and what they do, S183 Art. 4(1)(15) and Annex I Section C (definition of financial instruments)
- **P1.2 Equity: owning a slice of a company** (50 min) — Learner can describe the rights of a shareholder (dividends, voting, residual claim); Learner can compute market capitalisation and a simple dividend yield; Learner can explain why share prices move
  - Example: A listed firm has 80 m shares at EUR 25: market cap EUR 2.0 bn. It pays EUR 1.00 per share, so the dividend yield is 4.0% and total dividends are EUR 80 m. In a wind-up, shareholders are paid only after creditors.
  - Exercises (5): mcq, multi, numeric, order · Callbacks: Q1.1, F1.5
  - Sources: S004 Chapter on equity markets, S015 Ch. 2 Asset Classes and Financial Instruments (equity securities), S062 Chapters on common stock and stock markets
- **P1.3 Debt: bonds and the promise to repay** (50 min) — Learner can read the key terms of a plain bond (issuer, coupon, maturity, par); Learner can compute annual coupon payments and current yield; Learner can explain how price and market yield move in opposite directions in an intuitive example
  - Example: A EUR 1,000 bond pays a 3% coupon (EUR 30 a year) for 5 years. If it trades at 95% of par (EUR 950), the current yield is 30/950 = 3.16%; a buyer also gains EUR 50 at maturity, which is why yield exceeds the coupon rate.
  - Exercises (5): bucket, match, mcq, numeric · Callbacks: F1.3, Q1.1
  - Sources: S004 Chapter on bond markets, S030 Chapters on bonds and government debt, S045 Opening chapters: bond features and terminology
- **P1.4 Funds: pooling money and the NAV idea** (45 min) — Learner can explain what a fund is and why investors use one; Learner can compute a fund's net asset value per unit from simple balances; Learner can distinguish open-ended funds, ETFs and closed-ended funds at headline level
  - Example: A fund holds EUR 120.4 m of securities and EUR 1.6 m of cash, owes EUR 0.5 m in fees and has 1,000,000 units: NAV per unit = (122.0 - 0.5)/1.0 = EUR 121.50. Investors buy and sell units at NAV (open-ended); an ETF unit also trades on an exchange at a price that can differ slightly.
  - Exercises (5): bucket, match, mcq, numeric · Callbacks: Q1.1, F1.5
  - Sources: S004 Chapter on collective investment vehicles, S007 Opening chapters on how funds work and their costs, S015 Ch. 4 Mutual Funds and Other Investment Companies
- **P1.5 The market map: who does what** (50 min) — Learner can place an institution on the map of buyside, sellside, infrastructure and regulators; Learner can match intermediary types (broker, dealer, bank, custodian, asset manager) to what they do; Learner can sketch the European market map in one page and name an equivalent in the US and UK
  - Example: A pension fund (investor) instructs an asset manager (buy side) who uses a broker (sell side) to buy shares on a venue; trades are cleared by a CCP and settled at a CSD, with a custodian holding the shares. Equivalent names: Euronext/Deutsche Borse in EU, NYSE/Nasdaq in the US, LSE in the UK.
  - Exercises (5): bucket, match, mcq, order, spot · Callbacks: P1.1, P1.2, P1.3, P1.4
  - Sources: S004 Chapters on financial institutions and intermediaries, S062 Chapters on financial institutions and markets, S188 ESMA Interactive Single Rulebook landing page, for role names only

Unit test: 15-question test on security definitions, shareholder rights, bond terms and current yield, NAV per unit, and matching institutions on the market map.

Jurisdictions: EU first (UCITS as retail fund label, ESMA/national authorities); US and UK equivalents named once each in P1.5 (SEC/FINRA, FCA); no detailed comparison yet.

### T1 Anatomy of a Trade · 3 h · track: ops · needs: P1

_The path of an order from client to custody: the teams and systems involved at each step, and what each handover passes on._

Covers (boss's list): order & execution workflows, custodian role (settlement, safekeeping)  

- **T1.1 From idea to order to execution** (45 min) — Learner can list the data an order must contain; Learner can distinguish an order, an execution and a confirmation; Learner can describe who may be in the chain between client and venue
  - Example: A client asks to buy 200 shares of a listed company at a limit of EUR 52.40. The broker routes the order, 100 shares fill at EUR 52.30 and 100 at EUR 52.40: average price EUR 52.35, total consideration EUR 10,470.
  - Exercises (5): match, mcq, numeric, order, spot · Callbacks: P1.2, P1.5, Q1.2
  - Sources: S100 Chapters on the trade lifecycle: order, execution and trade capture, S028 Opening chapters: trade and position management overview, S004 Chapter on how securities are traded
- **T1.2 Confirmation, clearing and settlement in one picture** (45 min) — Learner can place trade date, settlement date and the settlement cycle on a timeline; Learner can explain delivery versus payment in one sentence; Learner can explain what a CCP does at headline level
  - Example: A EUR 10,470 purchase made on Monday settles in the EU on Wednesday (T+2); the same trade in the US settles on Tuesday (T+1). On settlement day the buyer's cash account is debited and the securities account credited at the same moment.
  - Exercises (5): cloze, match, mcq, numeric, timeline · Callbacks: T1.1, P1.5
  - Sources: S100 Chapters on confirmation, clearing and settlement, S005 Chapters on clearing, settlement and custody overview, S272 Release 34-96930 (summary of the T+1 rule), S250 Reg. (EU) 2025/2075 (T+1 date), skim only
- **T1.3 Custody: who holds the securities?** (45 min) — Learner can explain safekeeping and why securities are held through a chain of intermediaries; Learner can distinguish a custodian, a CSD and a client's securities account; Learner can tell what the client sees vs what sits behind it
  - Example: A client's 200 shares appear on a statement at his bank. The bank holds them at a custodian in an omnibus account, which holds them at the national CSD. When the company pays a dividend the cash flows back down the same chain.
  - Exercises (5): bucket, match, mcq, order, spot · Callbacks: T1.2, P1.5
  - Sources: S005 Chapters on custody and safekeeping, S063 Opening chapters on custody and the custody chain, S035 Euronext Securities segregation levels page, headline only
- **T1.4 A full trade from start to finish** (45 min) — Learner can walk a single trade through every stage with dates and amounts; Learner can say who is responsible for each handover; Learner can compute total settlement cash including fees
  - Example: Monday: buy 200 shares at EUR 52.35 = EUR 10,470 + EUR 15 commission = EUR 10,485 cash due. Monday evening: confirmation matched. Wednesday: DVP settlement at the CSD; the shares appear in the client's account, cash leaves. The same flow in the US would end on Tuesday.
  - Exercises (5): mcq, numeric, order, paper, table · Callbacks: T1.1, T1.2, T1.3, Q1.2
  - Sources: S100 Chapters on end-to-end trade lifecycle, S058 Chapters on trade, settlement and custody operations, S049 Opening chapters: overview of clearing, settlement and custody

Unit test: 12-question test: ordering the lifecycle, computing a settlement date and cash, and assigning stages to the right party.

Jurisdictions: EU/UK T+2 now (T+1 from 11 October 2027), US T+1 since 28 May 2024; Switzerland noted as moving in step with the EU/UK (to confirm). Details deferred to O3.

### C1 Client Accounts 101 · 3 h · track: ops · needs: P1

_How a client is identified, which account types exist, and who has authority to decide on investments (the client, the manager or an adviser)._

Covers (boss's list): client accounts, client onboarding  

- **C1.1 Client segments: retail, private banking and institutional** (45 min) — Learner can describe the three broad client segments and their typical needs; Learner can name the MiFID II categories (retail, professional, eligible counterparty) and one consequence of each; Learner can explain why segment matters for service and protection
  - Example: A salaried individual with EUR 30,000 is a retail client with the highest protection. A family with EUR 8 m is private-banking but may still be retail under MiFID unless opted up. A pension fund is an institution and normally a professional client.
  - Exercises (5): bucket, cloze, match, mcq, multi · Callbacks: P1.5
  - Sources: S031 Opening chapters on wealth management and client segments, S235 Art. 4(1)(10)-(11), Art. 30 and Annex II (client classification), headline reading, S064 Chapters on segmentation of private banking clients
- **C1.2 Account types: what can be opened?** (45 min) — Learner can distinguish a cash account, a securities (custody) account and a margin account; Learner can recognise individual, joint and corporate account holders; Learner can name one tax-advantaged account wrapper in the EU, US and UK
  - Example: An investor has a current account at the bank (cash) and a securities account linked to it. A buy debits cash and credits securities; with a margin account (US) the broker may lend part of the purchase price. A UK ISA or a US IRA is a wrapper that changes tax, not how the trade works.
  - Exercises (5): bucket, match, mcq, multi, spot · Callbacks: C1.1, T1.3
  - Sources: S031 Chapters on client accounts and service model, S087 Chapters on private banking services and account structures, S046 Chapters on customer accounts (cash vs margin), skim only
- **C1.3 Mandates: execution-only, advisory and discretionary** (45 min) — Learner can classify a service as execution-only, advisory or discretionary; Learner can say who takes the investment decision under each mandate; Learner can list one obligation that rises with each step up in service
  - Example: A client who phones 'buy 100 shares of X' is execution-only (the bank checks appropriateness for complex products only). A relationship manager who proposes a bond switch gives advice and must assess suitability. A portfolio manager who rebalances without asking, within a signed mandate, is discretionary.
  - Exercises (5): bucket, match, mcq, order, spot · Callbacks: C1.2
  - Sources: S066 Introduction and Section on scope of suitability (headline reading), S065 Sections on execution-only and appropriateness (headline reading), S096 Chapters on advisory vs discretionary client relationships, S271 Reg BI small entity guide, one-page contrast
- **C1.4 Onboarding overview: from stranger to client** (45 min) — Learner can list the steps of onboarding in order; Learner can name the documents and data typically collected; Learner can explain at headline level why KYC and risk profiling exist
  - Example: Onboarding a new private client: ID and address verified, source of wealth declared (inheritance EUR 400,000), risk profile set to 'balanced', account opened under a discretionary mandate, fee schedule signed, tax residency form filed. Only then is the account activated for trading.
  - Exercises (5): match, mcq, multi, order, spot · Callbacks: C1.1, C1.3
  - Sources: S031 Chapters on client onboarding and the advisory process, S102 Principles on client acceptance (headline only), S196 Recommendation 10 (customer due diligence), skim only

Unit test: 12-question test classifying clients, accounts and mandates, and ordering the onboarding steps.

Jurisdictions: EU (MiFID II categories) first; US cash vs margin accounts and Reg BI mentioned once; UK ISA and Swiss FinSA client segments named in one line each; detailed treatment deferred to C2-C4.

### A1 Double-Entry for Securities · 5 h · track: ops · needs: P1

_The double-entry rule for securities and cash, how a trade is posted on both sides of the ledger, and how the nightly balance check shows a missing entry._

Covers (boss's list): chart of accounts  
🎮 Minigame: **Ledger** — Gentle intro round: a stream of 8-10 simple events (deposit, buy, sell, fee) to post as balanced entries with a visible trial balance; no timer, hints allowed  

- **A1.1 Why books balance: the accounting equation** (60 min) — Learner can state the accounting equation Assets = Liabilities + Equity; Learner can classify items as asset, liability, income or expense; Learner can explain why double entry gives a built-in error check
  - Example: A client deposits EUR 10,000: the bank's asset (cash at the central bank) rises by 10,000 and its liability (client deposit) rises by 10,000. The equation still balances: 10,000 = 10,000 + 0.
  - Exercises (5): bucket, cloze, match, mcq, numeric · Callbacks: P1.4, Q1.2
  - Sources: S036 Opening chapters: accounting basics for investments, S028 Chapters on accounting and position keeping, S160 Conceptual Framework overview (definitions of asset, liability, equity)
- **A1.2 Debits, credits and T-accounts** (60 min) — Learner can apply the debit/credit rule to the five account types; Learner can post a simple event as a balanced journal entry; Learner can build a T-account and a trial balance
  - Example: Deposit of EUR 10,000: Dr Cash at bank 10,000 / Cr Client deposits 10,000. Fee income of EUR 15 on a client: Dr Client account 15 / Cr Fee income 15. A trial balance then shows total debits = total credits.
  - Exercises (6): journal, mcq, numeric, spot, table · Callbacks: A1.1
  - Sources: S036 Chapters on journal entries and ledgers, S160 Opening chapter on the accounting framework, skim only, S028 Chapter on accounting for securities transactions
- **A1.3 Two ledgers: cash and securities positions** (60 min) — Learner can explain the difference between a money ledger and a securities (position) ledger; Learner can record a securities movement by quantity and by value; Learner can state why the securities ledger is also kept in units
  - Example: A client's securities ledger shows 200 shares of X: quantity 200, average cost EUR 52.35, book value EUR 10,470, market value 200 x 55 = EUR 11,000. The cash ledger shows the matching EUR 10,485 debit from the purchase.
  - Exercises (5): bucket, match, mcq, numeric, table · Callbacks: A1.2, P1.4, T1.3
  - Sources: S036 Chapters on investment accounting for equities, S028 Chapters on position keeping, S058 Chapters on books and records and reconciliation
- **A1.4 Booking a trade: buy and sell in the ledgers** (60 min) — Learner can post a buy and a sell in both ledgers with fees; Learner can distinguish trade-date from settlement-date postings at a headline level; Learner can compute realised gain on a simple sale
  - Example: Buy 200 shares at EUR 52.35 + EUR 15 fee: Dr Securities 10,485 / Cr Cash 10,485 (fee included in cost). Later sell 200 at EUR 56 with EUR 15 fee: Dr Cash 11,185 / Cr Securities 10,485 / Cr Realised gain 700.
  - Exercises (5): journal, numeric, spot, timeline · Callbacks: A1.3, T1.4, F1.5
  - Sources: S036 Chapters on accounting for purchases and sales, S028 Chapters on trade booking and settlement accounting, S058 Chapters on trade booking and accounting
- **A1.5 Position checks and the first chart of accounts** (60 min) — Learner can reconcile an internal position against a custodian statement; Learner can read a short chart of accounts and choose the right account for an event; Learner can post a short day of events end to end
  - Example: Internal books show 1,200 shares of Y; the custodian shows 1,000 because 200 shares of a sale settled yesterday. After adjusting for the settled sale, positions agree. A mini chart: 1000 Cash, 1100 Securities, 2000 Client deposits, 4000 Fee income, 5000 Custody cost.
  - Exercises (5): journal, match, mcq, spot, table · Callbacks: A1.2, A1.4, T1.3
  - Sources: S058 Chapters on reconciliation and books and records, S036 Chapters on accounts and ledgers, S028 Chapters on reconciliation

Unit test: 15-question test on classifying accounts, posting Dr/Cr entries, buying and selling in two ledgers, and finding reconciliation breaks.

Jurisdictions: Local GAAP vs IFRS differences are not covered here; IFRS 9 classification is deferred to A7. Client-side books only in this level.

### Q2 Probability and Statistics Intuition · 4 h · track: theory · needs: Q1

_Mean, variance, standard deviation and the normal distribution, and how these define the volatility figure on a fund factsheet._


- **Q2.1 Data, averages and the shape of returns** (60 min) — Learner can compute mean, median and mode of a return list; Learner can read a histogram of returns; Learner can explain the effect of outliers on the mean
  - Example: Monthly returns of a fund (%): 1.2, -0.8, 2.0, 0.5, -3.1, 1.8. Mean = 0.27%, median = 0.85%. One -3.1% month pulls the mean below the median.
  - Exercises (5): match, mcq, numeric, table · Callbacks: F1.5, Q1.1
  - Sources: S074 Ch. 4 Expectation (mean intuition); Ch. 1 for counting, S001 Ch. 1 Combinatorial analysis, Ch. 7 Properties of expectation (skim), S039 Ch. 3 Expectation
- **Q2.2 Spread: variance and standard deviation** (60 min) — Learner can compute variance and standard deviation of a short list; Learner can annualise a monthly standard deviation by the square-root-of-time rule; Learner can say why two funds with the same average return can differ in risk
  - Example: Fund A monthly returns: 1, 1, 1, 1 (%), SD 0. Fund B: 4, -2, 3, -1: same mean 1% but sample SD = 2.94%. If monthly SD is 2.94%, annualised volatility is 2.94% x sqrt(12) = 10.2%.
  - Exercises (5): cloze, mcq, numeric, table · Callbacks: Q2.1, Q1.3
  - Sources: S074 Ch. 4 Expectation and Ch. 6 Moments (variance), S001 Ch. 4 Random variables (variance section), S039 Ch. 3 Expectation (variance)
- **Q2.3 Probability: events, conditional and independence** (60 min) — Learner can compute probabilities of simple and combined events; Learner can apply the multiplication rule for independent events and the conditional probability formula; Learner can read a probability tree
  - Example: A trade has a 2% chance of failing to settle on time (independent per trade). The chance that none of 5 independent trades fails is 0.98^5 = 90.4%, so at least one fails with probability 9.6%. Given that a trade involves a thinly-traded stock, fail probability may rise to 6%.
  - Exercises (5): mcq, numeric, order · Callbacks: Q1.1, Q1.5, T1.2
  - Sources: S074 Ch. 1 Probability and counting, Ch. 2 Conditional probability, S001 Ch. 2 Axioms of probability and Ch. 3 Conditional probability and independence, S039 Ch. 1 Probability
- **Q2.4 Distributions, the normal curve and sampling** (60 min) — Learner can compute probabilities for a binomial count in a small case; Learner can use the 68-95-99.7 rule and a z-score for a normal variable; Learner can explain the law of large numbers and the standard error of a sample mean
  - Example: If daily returns have mean 0.04% and SD 1.0%, a -2% day is a z-score of (-2 - 0.04)/1.0 = -2.04, rarer than 2.5%. A sample mean from 100 observations has standard error 1.0/10 = 0.1%; more data means a more precise average.
  - Exercises (5): mcq, numeric · Callbacks: Q2.2, Q2.3, Q1.3
  - Sources: S074 Ch. 3 Random variables, Ch. 5 Continuous random variables (normal), Ch. 10 Inequalities and limit theorems, S001 Ch. 5 Continuous random variables (normal) and Ch. 8 Limit theorems, S039 Ch. 2 Random variables and Ch. 5 Inequalities

Unit test: 12-question test on mean/median, variance/SD and annualisation, probability and conditional probability, z-scores and standard error.

**Checkpoint:** Level 1 boss quiz (about 35 minutes, 30 questions) mixing algebra and logs, compounding/discounting/annuities, security types and NAV, trade lifecycle ordering, client segments and mandates, ledger postings and probability/variance. At least 40% of questions are spaced-review callbacks to unit tests; passing awards the 'Market Literate' badge and unlocks the L2 badge, not content.

Open questions: See syllabus/FACTS.md (originals in open-questions.txt)

## L2 — Instruments (~38 h)

This level covers shares, bonds, funds, ETFs and EU structured products as securities: their rights, cash flows, NAV and market price, booking and custody. It also covers returns, volatility, correlation, and duration as a derivative. The learner can describe and read the price of each instrument.

### P2 Equities in depth · 5 h · track: ops · needs: P1

_Ordinary and preferred shares, share classes, listings, ADRs and depositary receipts, and the rights and dividend mechanics attached to each._

Covers (boss's list): stocks  

- **P2.1 What a share really is** (45 min) — Learner can list the economic and legal rights attached to an ordinary share; Learner can distinguish ordinary, preference and non-voting shares by rights ranking; Learner can read an ISIN and a share's static data (nominal/no-par, currency, market of listing)
  - Example: A company with 10m shares in issue buys back 1m: 9m carry votes and dividends, 1m treasury shares carry neither. Your 90,000 shares go from 0.90% to 1.00% of voting capital.
  - Exercises (5): bucket, cloze, mcq, numeric, spot · Callbacks: P1.1, P1.5
  - Sources: S015 chapters on the investment environment and equity securities (share characteristics), S062 chapter on common stock and market structure, S030 chapters on equities / how shares work
- **P2.2 Share classes, voting structures and local oddities** (50 min) — Learner can explain why dual-class and multiple-vote structures exist and how they separate cash-flow and voting rights; Learner can identify a share class from a market naming convention (A/B, Vz, savings shares, double-voting); Learner can state how a different share class changes custody and corporate-action handling (separate ISIN)
  - Example: Two lines of the same issuer trade on the same exchange: ordinary at 24.80 and savings shares at 21.30. Same issuer, different ISINs, different dividend floor, different voting - the discount is the price of the missing vote.
  - Exercises (5): bucket, match, mcq, multi, numeric · Callbacks: P2.1
  - Sources: S057 chapters on issuers' disclosure and listing (share structures in capital markets law), S015 equity chapters (preferred stock), S245 Arts 1-6 scope and exemptions (context for share offerings)
- **P2.3 Dividends: policy, yield and payout** (50 min) — Learner can compute dividend yield, payout ratio and cum/ex price effect; Learner can explain interim vs final dividends and the dividend-smoothing habit of boards; Learner can describe the cash flow of a dividend from declaration to payment at a high level
  - Example: Share at 40.00 EUR pays 1.60 EUR: yield 4.0%. On the ex-date it opens near 38.40 all else equal - you receive 1.60 cash instead of 1.60 of price.
  - Exercises (5): mcq, numeric, paper, timeline · Callbacks: F1.4, P2.1
  - Sources: S054 full paper: dividend irrelevance and valuation, S053 full paper: dividend smoothing, S008 chapters on payout policy, S052 chapter on cash dividends (preview of O7)
- **P2.4 Issuing shares: IPOs, follow-ons and rights** (55 min) — Learner can describe how a company raises equity (IPO, SPO, accelerated bookbuild, rights issue) and who does what; Learner can compute market capitalisation and free float, and explain why free float matters for indices and liquidity; Learner can state when a prospectus is required and when exemptions apply in the EU
  - Example: A company with 100m shares at 20.00 EUR does a 1-for-5 rights issue at 16.00 EUR: 20m new shares raise 320m EUR. The learner computes the dilution but leaves the theoretical ex-rights price for O8.
  - Exercises (5): match, mcq, numeric, order · Callbacks: P1.4, F1.2
  - Sources: S245 Arts 1-7 (scope, exemptions, prospectus content overview), S024 chapters on equity issuance and the IPO process, S303 ESMA Q&A on exemptions and thresholds
- **P2.5 Listing venues and depositary receipts** (50 min) — Learner can distinguish regulated market, MTF and unlisted trading for a share; Learner can explain how an ADR/GDR is created, what the ratio means and who holds the underlying; Learner can compute the price relationship of a DR versus the local share including FX
  - Example: An ADR represents 2 ordinary shares. Local share at 30.00 EUR, EURUSD 1.08: parity price = 2 x 30.00 x 1.08 = 64.80 USD. If the ADR quotes 65.10, the gap is 0.46%.
  - Exercises (5): bucket, cloze, mcq, numeric, order · Callbacks: P1.4, P2.1
  - Sources: S321 full bulletin (ADR structure, levels and risks), S062 chapter on global equity markets and depositary receipts, S004 chapters on equity markets
- **P2.6 Indices: how an index is built** (50 min) — Learner can compute a price index level using a divisor and update it after a constituent change; Learner can distinguish price, net total-return and gross total-return versions of the same index; Learner can explain cap-weighting, free-float adjustment and capping rules in broad market indices
  - Example: Three-stock cap-weighted index: caps 50bn, 30bn, 20bn with divisor 1,000,000,000 gives level 100. One firm is replaced with a 30bn stock; the divisor is adjusted so the level stays 100 immediately after.
  - Exercises (5): match, mcq, numeric, table · Callbacks: F1.5, Q1.4
  - Sources: S236 methodology chapters on index construction, free-float and rebalancing, S282 STOXX rulebook sections on calculation and capping, S015 chapter on equity indices

Unit test: Mixed test on share rights, dividends, issuance, ADR parity and index arithmetic.

Jurisdictions: EU first (Prospectus Regulation, multiple-vote share structures directive, local share classes in DE/IT/FR/Nordics); US only via ADR structure (SEC bulletin); UK/CH/SG/HK not covered here.

### P3 Bonds in depth · 7 h · track: ops · needs: P1, F1

_Bond terms, price and accrued interest, the calculation of settlement amount from price and nominal, and the main bond types. The learner can reconcile a confirmation amount to its components._

Covers (boss's list): bonds  

- **P3.1 Bond anatomy and who issues** (50 min) — Learner can name every term of a bond (issuer, nominal, coupon, maturity, currency, ranking); Learner can classify issuers (sovereign, agency, supranational, corporate, financial, covered); Learner can compute total cash flows of a simple bullet bond
  - Example: A 5-year, 3.00% annual bullet of 100,000 EUR nominal pays 3,000 each year and 103,000 in year 5; total cash received 115,000.
  - Exercises (5): bucket, cloze, mcq, spot, table · Callbacks: P1.2, F1.1
  - Sources: S045 chapters on features of debt securities and bond markets overview, S287 sections on bond features and types, S174 Arts 1-5 covered-bond framework (scope, dual recourse)
- **P3.2 Coupon structures and embedded options** (55 min) — Learner can identify fixed, floating, zero, step-up and inflation-linked structures and compute a coupon for each; Learner can explain how callable, puttable and convertible features shift value between issuer and holder; Learner can describe perpetuals, AT1/CoCo-style subordinated notes at a high level
  - Example: FRN pays 3-month EURIBOR + 0.60%. If EURIBOR fixes at 2.10% for a 91-day period on 1,000,000 EUR: coupon = 1,000,000 x 2.70% x 91/360 = 6,825.
  - Exercises (5): bucket, match, mcq, numeric · Callbacks: F1.3, P3.1
  - Sources: S045 chapters on bond features and embedded options, S287 sections on floating-rate and inflation-linked securities, S093 chapters on bond instruments
- **P3.3 How a bond is born and held: issuance and form** (50 min) — Learner can describe primary issuance (syndication, auction, private placement) and the roles of lead manager, paying agent and fiscal agent; Learner can explain domestic vs international (Eurobond) issuance and the role of ICSDs; Learner can explain what a global note is and how an investor ends up with a book-entry position
  - Example: A bank issues a 500m EUR 5-year Eurobond: one global note is lodged with an ICSD safekeeper, investors hold 1,000 EUR increments as book-entry credits at their custodians - nobody holds paper.
  - Exercises (5): cloze, match, mcq, order, spot · Callbacks: P1.4, T1.1
  - Sources: S221 primary market handbook sections on syndicated issuance and roles, S220 overview chapter, S004 chapters on bond markets, S245 Art. 1 and Art. 3 (prospectus thresholds) and wholesale exemption
- **P3.4 Day counts: how interest is measured** (55 min) — Learner can compute day-count fractions under ACT/ACT, 30E/360, ACT/360 and ACT/365F; Learner can pick the day count that fits a given market (EUR govvies, Eurobonds, money market, FRNs); Learner can explain why identical coupons yield different cash amounts under different conventions
  - Example: 4% on 1,000,000 EUR from 15 Jan to 31 Jul: ACT/360 = 197 days gives 21,888.89; 30E/360 = 195 days gives 21,666.67. Same coupon rate, 222 EUR apart.
  - Exercises (5): match, mcq, numeric, timeline · Callbacks: F1.1, Q1.1
  - Sources: S220 Appendix A5 day-count and accrued-interest conventions, S221 Secondary market rules, section on accrued interest, S045 section on accrued interest and conventions
- **P3.5 Accrued interest, clean and dirty price** (60 min) — Learner can compute accrued interest for a settlement date and nominal amount; Learner can convert clean price to dirty price and total settlement consideration; Learner can explain why bonds quote clean and what ex-coupon periods do to the cash
  - Example: Bund, 2.50% annual, ACT/ACT, last coupon 15 Feb, settlement 15 Jun: 120 days gives 0.8219 per 100. Clean 98.50 so dirty 99.3219; on 100,000 EUR nominal the buyer pays 99,321.92 EUR.
  - Exercises (5): journal, numeric, spot, table · Callbacks: P3.4, A1.2, A1.3
  - Sources: S220 Appendix A5 and sections on accrued interest, S045 bond pricing chapter (full price, accrued interest), S093 sections on accrued interest and settlement, S058 settlement chapters (confirmation amounts)
- **P3.6 Yields and the price-yield seesaw** (60 min) — Learner can compute price from yield and approximate yield from price for a plain bond; Learner can explain why prices fall when yields rise and compare current yield, YTM and spot rates; Learner can recognise when YTM is misleading (callable, reinvestment, default risk)
  - Example: 3-year 4% annual bond priced at 98.00 has a YTM of about 4.73%; at a 5% yield the same bond is worth 97.28, at 4% it is 100.00.
  - Exercises (5): bucket, mcq, numeric, paper · Callbacks: F1.3, F1.4, Q1.3, P3.5
  - Sources: S045 chapters on bond pricing and yield measures, S061 chapters on prices, discounting and yield-to-maturity, S075 chapter on fixed-income securities (yield, price relationship), S015 chapter on bond prices and yields
- **P3.7 Market conventions you meet in the back office** (50 min) — Learner can read standard quoting and settlement conventions for EUR govvies and corporate bonds; Learner can explain minimum denomination and tradeable increments and their effect on tradeable amounts; Learner can identify odd first coupons and ex-coupon quirks on a term sheet
  - Example: Corporate Eurobond: minimum 100,000 and increments of 1,000. A client wanting 150,500 EUR nominal cannot get it; 150,000 or 151,000 can be bought.
  - Exercises (5): match, mcq, numeric, spot, timeline · Callbacks: P3.5, T1.2
  - Sources: S221 Secondary Market Rules and Recommendations, sections on settlement and ex-coupon, S219 ICMA European secondary market reports (market structure overview), S058 chapters on bond settlement conventions
- **P3.8 Credit, ranking and what happens if the issuer fails** (40 min) — Learner can describe the capital structure ladder from senior secured to equity; Learner can explain the role of ratings and spreads in pricing credit risk; Learner can name the principle of bail-in and MREL at a conceptual level
  - Example: Senior bank debt trades at +90bp over the benchmark; subordinated at +250bp. The extra 160bp is the market price of sitting lower in the waterfall.
  - Exercises (4): match, mcq, numeric, order · Callbacks: P3.1, P3.6
  - Sources: S045 chapter on credit risk and ratings, S308 EBA report sections on covered bond framework, S089 chapter on credit risk

Unit test: Cash-flow table, day counts, accrued/dirty price, price-yield and issuance chain.

Jurisdictions: EU conventions first (ICMA, TARGET calendar, EUR govvies); US 30/360 and UST ACT/ACT and UK gilts mentioned in the day-count and conventions units; Swiss SARON and Asian conventions not covered.

### P4 Funds · 6 h · track: ops · needs: P1, F1

_Fund structures, NAV calculation and dealing cut-offs, subscription and redemption processing, and the role of the transfer agent._

Covers (boss's list): funds, NAV vs market price  
🎮 Minigame: **NAV Strike** — intro variant: assemble a simple NAV from components before the cut-off, no pricing exceptions yet  

- **P4.1 The fund landscape: UCITS, AIFs and legal forms** (60 min) — Learner can distinguish UCITS from AIFs and open-ended from closed-ended funds; Learner can name the main legal forms (SICAV, FCP, ICAV, unit trust, contractual fund) and where each lives (LU, IE, FR, DE); Learner can list the key actors: management company, depositary, administrator, transfer agent, distributor
  - Example: A Luxembourg SICAV UCITS, managed by an Irish ManCo, with a Luxembourg depositary - sold across 10 EU countries through the UCITS passport.
  - Exercises (5): bucket, cloze, match, mcq, multi · Callbacks: P1.3, C1.2
  - Sources: S179 Arts 1-5 and Chapter V eligible assets overview, S182 Arts 1-6 AIFMD scope and management, S185 EFAMA fact book, market structure sections, S007 chapters on fund types
- **P4.2 Share classes and fee structures** (55 min) — Learner can read a share-class code (accumulating/distributing, currency, hedged, institutional) and know what changes; Learner can compute the effect of TER and performance fee on a holding over time; Learner can explain why the same fund has several ISINs and prices
  - Example: Fund with 1.60% TER and 6% gross return: net 4.4%. Over 20 years of 6% gross, 10,000 EUR grows to 32,071 EUR gross but only 23,660 EUR net of a 1.60% TER.
  - Exercises (5): bucket, match, mcq, numeric · Callbacks: P1.3, F1.2, Q1.2
  - Sources: S007 chapters on costs and fees, S034 chapters on fees and costs, S185 EFAMA fact book, cost sections
- **P4.3 Subscribing and redeeming: dealing days, cut-offs and forward pricing** (60 min) — Learner can determine which NAV an order receives from the time it reaches the transfer agent; Learner can compute units issued / cash received for subscriptions and redemptions; Learner can follow the settlement cycle of fund orders and why it differs from exchange-traded securities
  - Example: Order of 50,000 EUR received at 11:40 CET before the 12:00 cut-off is dealt at that day's NAV of 125.85 later struck, giving 397.3063 units. The same order at 12:05 is dealt at the next day's NAV.
  - Exercises (5): mcq, numeric, order, timeline · Callbacks: T1.2, P4.2
  - Sources: S179 Arts 84-86 redemption and issue (suspension and pricing), S301 ESMA Q&A on UCITS (dealing), S007 chapters on buying and selling funds, S016 ISO 20022 securities settlement messages (fund orders, overview)
- **P4.4 NAV mechanics: assets minus liabilities per unit** (60 min) — Learner can compute NAV per unit from portfolio value, cash, accruals and liabilities; Learner can explain why NAV is struck after the cut-off using closing prices; Learner can describe how swing pricing and fair-value adjustments protect remaining investors
  - Example: Securities 250.0m + cash 1.2m + accrued dividends 0.8m - fees and payables 0.3m = 251.7m net assets; 2,000,000 units gives NAV 125.85.
  - Exercises (5): mcq, numeric, spot, table · Callbacks: A1.3, P4.3
  - Sources: S043 chapters on NAV and fund accounting, S170 CSSF 24/856 overview of NAV error thresholds, S177 swing pricing and liquidity tools in AIFMD II / UCITS, S007 chapters on pricing and NAV
- **P4.5 Transfer agency, registers and fund distribution** (55 min) — Learner can explain what the register of unitholders is and who maintains it; Learner can compare direct, platform (omnibus) and nominee holdings of fund units; Learner can follow a fund order through distributor, platform and transfer agent
  - Example: A client buys 20 funds from 12 managers on one platform; the platform nets orders per fund per day into a single order to each transfer agent, and appears on each register as one omnibus holder.
  - Exercises (5): bucket, match, mcq, numeric, order · Callbacks: C1.1, P4.3
  - Sources: S028 chapters on funds and transfer agency, S016 ISO 20022 introduction, securities messages, S058 chapters on fund operations, S289 UCITS V depositary obligations, overview
- **P4.6 Liquidity, gates, money market funds and fund risk** (70 min) — Learner can describe liquidity-management tools (gates, notice periods, side pockets, swing pricing) and when they apply; Learner can explain how a money market fund differs from other UCITS; Learner can compute the effect of a gate on redemption orders
  - Example: Fund NAV 400m, gate at 10% of NAV per dealing day, redemption orders 60m: orders are scaled to 40m, each investor receives 66.7% of the request and the remainder rolls forward.
  - Exercises (5): bucket, match, mcq, numeric, paper · Callbacks: P4.4, P4.3
  - Sources: S246 MMF types and key requirements, S177 AIFMD II liquidity management tools and RTS, S300 AIFMD Q&A (liquidity tools), S180 comparison overview UCITS and AIFMD

Unit test: Mixed test on structures, share classes, dealing cut-offs, NAV arithmetic and liquidity tools.

Jurisdictions: EU first (UCITS, AIFMD, MMFR, Luxembourg/Irish practice, CSSF 24/856); US 1940-Act fund and 4pm NAV cut-off mentioned in one sidebar; UK/CH/SG/HK not covered.

### P5 ETFs · 4 h · track: ops · needs: P4

_How ETFs are built and traded, creation and redemption, tracking difference and tracking error, and the costs that separate an ETF return from its index return._

Covers (boss's list): NAV vs market price, funds  
🎮 Minigame: **NAV Strike** — ETF variant: compare iNAV, NAV and quotes to decide whether to trade, create or wait  

- **P5.1 ETF anatomy: replication, structure and costs** (60 min) — Learner can distinguish physical full replication, sampling and synthetic replication; Learner can read an ETF factsheet (index, TER, tracking difference, domicile, distribution); Learner can compute tracking difference and explain tracking error
  - Example: Index returns 8.20% in the year; the ETF returns 7.95% net of a 0.20% TER. Tracking difference is -0.25%, partly offset by lending income of 0.05%.
  - Exercises (5): bucket, match, mcq, numeric, spot · Callbacks: P4.1, P4.2, P2.6
  - Sources: S034 chapters on ETF structure and replication, S187 sections on index-tracking, efficient portfolio management and securities lending, S125 paper: ETF market overview
- **P5.2 Creation and redemption: the plumbing** (60 min) — Learner can explain how authorised participants create and redeem ETF shares; Learner can compare in-kind and cash creation and their effects on tracking and tax; Learner can compute the value of a creation basket and the cash component
  - Example: Creation unit 100,000 ETF shares, NAV 52.40: basket value 5,240,000 EUR delivered as 50 stocks plus a cash component of 8,000 EUR; the AP receives 100,000 new ETF shares.
  - Exercises (5): mcq, numeric, order, table, timeline · Callbacks: P5.1, T1.2
  - Sources: S034 chapters on creation and redemption, S125 section on AP arbitrage, S004 chapters on funds and ETFs
- **P5.3 Primary vs secondary: how ETFs actually trade** (60 min) — Learner can distinguish trading ETF shares on exchange and OTC from creating them; Learner can explain the role of market makers and why ETF liquidity depends on the basket's liquidity; Learner can compute the cost of crossing the spread and market impact on a block
  - Example: ETF quotes 52.45 / 52.47: crossing costs 0.02 per share, i.e. 0.019% of price; a 2m EUR block may rather go via RFQ to a market maker and be hedged via creation.
  - Exercises (5): bucket, match, mcq, numeric · Callbacks: P5.2, T1.1
  - Sources: S034 chapters on liquidity and trading, S101 chapters on market makers and spreads, S125 paper sections on secondary-market liquidity
- **P5.4 NAV, iNAV and premiums/discounts** (60 min) — Learner can compute premium/discount of market price to NAV and to iNAV; Learner can explain what keeps ETF price near NAV and when the arbitrage band widens; Learner can explain why NAV and last price may be off-sync (stale prices, time zones)
  - Example: ETF NAV 52.40, iNAV 52.46, mid price 52.46: premium to NAV +0.115%, zero to iNAV. For a bond ETF in stress the premium to NAV may turn into a -4% discount because underlying prices are stale.
  - Exercises (5): mcq, numeric, paper, spot, table · Callbacks: P4.4, P5.3
  - Sources: S034 chapters on pricing, NAV and iNAV, S125 paper sections on pricing deviations, S187 guideline on ETF information disclosure (iNAV), S007 chapter on ETF pricing

Unit test: ETF structure, creation maths, spread cost and premium/discount.

Jurisdictions: UCITS ETF (EU) first; US in-kind creation and 40-Act ETFs mentioned as a contrast; no UK/CH/SG/HK content.

### P6 Derivatives & structured products as securities (EU bridge) · 5 h · track: ops · needs: P2, P3

_Structured notes and derivatives as securities records: ISIN, paying agent, CSD holding, statement price and KID. The learner can identify each data point for a product._

🎮 Minigame: **Dealer Desk** — secondary-market bid/ask on a certificate: set a quote around fair value and issuer credit, manage inventory  

- **P6.1 From payoff map to security map (EUSIPA bridge)** (60 min) — Learner can place any retail structured product on the EUSIPA map and name its securities form (note, certificate, warrant); Learner can state which legal form determines custody, tax and distribution rules; Learner can distinguish a capital-protected note from a certificate or a warrant from the securities side
  - Example: Learner already knows reverse convertibles and bonus certificates as payoffs. This unit re-reads them as securities: a reverse convertible note is a debt instrument with an ISIN, issuer risk and a coupon; a bonus certificate is a certificate on a basket.
  - Exercises (5): bucket, match, mcq, multi, spot · Callbacks: P1.2, P3.1, P3.2, P2.1
  - Sources: S194 EUSIPA Derivative Map 2024, categories and definitions, S193 update page, classification notes, S032 Euronext explainer on warrants and certificates, S280 SSPA Swiss Derivative Map 2025 (contrast)
- **P6.2 Issuance programmes, prospectuses and listing** (60 min) — Learner can explain the base prospectus + final terms structure and who approves what; Learner can describe the issuer chain (bank issuer vs SPV with guarantor) and where the credit sits; Learner can trace how a certificate gets an ISIN, a listing and CSD eligibility
  - Example: A bank issues 5,000 bonus certificates under a base prospectus: final terms are filed the day before the offer, the ISIN is allocated, the certificates are listed on a certificates segment and credited to the CSD.
  - Exercises (5): cloze, match, mcq, order, spot · Callbacks: P3.3, P2.5
  - Sources: S245 Arts 6-8 and 17, base prospectus and final terms concepts, S032 Euronext explainer, listing sections, S126 chapters on structuring and issuance workflow, S303 ESMA Q&A on the Prospectus Regulation
- **P6.3 Booking and custody of a structured note** (60 min) — Learner can describe how a certificate/ELN position appears in custody, in units or in nominal, and how it settles; Learner can map the structure's events (coupon, autocall, barrier breach, redemption) onto corporate action event types; Learner can book the purchase and early redemption of a note on a client ledger
  - Example: A 10,000 EUR autocallable at 100%: on the observation date the underlying is above the trigger, the note redeems early at 100 + 7.5% coupon; the CSD credits 10,750 EUR and removes the position. The corporate-action desk sees it as a mandatory full call.
  - Exercises (5): journal, match, mcq, spot, timeline · Callbacks: A1.3, A1.4, P3.5, T1.3
  - Sources: S052 chapters on redemption and early-redemption events (preview of O7), S049 chapters on settlement and custody of securities, S063 chapters on holdings and book entry, S322 Italian FTT update (national oddity)
- **P6.4 How a certificate is priced and valued on a statement** (60 min) — Learner can decompose a note into bond floor + option(s) at concept level and relate it to an indicative value; Learner can explain issuer fair value, secondary-market bid/ask and the embedded margin at issue; Learner can explain how the position is carried on a client statement and in IFRS 9 terms (FVTPL)
  - Example: Capital-protected note issued at 100: bond floor 92.5 + options 6.3 + structuring margin 1.2. After a month the issuer bid is 99.1 although the underlying is flat, because the margin is not recovered on sale.
  - Exercises (5): bucket, mcq, numeric, paper · Callbacks: P3.6
  - Sources: S083 chapters on exotic options and structured product decomposition, S126 chapters on structuring and pricing logic, S224 IFRS 9 classification and measurement sections, S072 chapters on classification of structured notes
- **P6.5 PRIIPs KID, target market and appropriateness** (60 min) — Learner can read a PRIIPs KID and extract SRI, RHP, costs and performance scenarios; Learner can explain how the KID, target market and appropriateness fit together for a distributor; Learner can decide whether a structured note is 'complex' for MiFID purposes in a simple scenario
  - Example: KID shows SRI 4 of 7, RHP 5 years, total costs RIY 1.6%, scenarios 82/96/107/121 on 100 invested. The distributor checks: target market retail with advice; execution-only is not allowed because the product is complex.
  - Exercises (5): bucket, match, mcq, spot, table · Callbacks: C1.2, P6.4
  - Sources: S252 Arts 5-8 and 2017/653 Annexes, S251 PRIIPs Regulation recitals and scope, S065 appropriateness and execution-only guidelines, S067 product governance guidelines, target market, S267 RIS provisional agreement status

Unit test: Securities form, issuance documents, booking/custody events, price decomposition and KID reading.

Jurisdictions: EU first (EUSIPA, PRIIPs, MiFID product governance); Italian FTT as a national oddity; SSPA map (CH) and Asian complex-product rules only mentioned.

### F2 Returns & risk · 4 h · track: theory · needs: F1, Q2

_Arithmetic and geometric average return, volatility, drawdown and the Sharpe ratio, and how two investments with the same average return can carry different risk._


- **F2.1 Returns: arithmetic, log and multi-period** (60 min) — Learner can compute simple, log and annualised returns and convert between them; Learner can explain why averaging arithmetic returns overstates multi-period growth; Learner can compute the geometric mean of a return series
  - Example: +50% then -50%: arithmetic average 0%, but 100 -> 150 -> 75, i.e. -25%. Log returns +0.405 and -0.693 sum to -0.288, exp = 0.75.
  - Exercises (5): cloze, mcq, numeric, table · Callbacks: F1.5, Q1.3, Q1.4
  - Sources: S015 chapters on risk and return, rates of return, S075 chapter on investment returns, S008 chapters on returns
- **F2.2 Volatility: measuring dispersion** (60 min) — Learner can compute sample variance and standard deviation of a return series; Learner can annualise volatility using the square-root-of-time rule and state its assumptions; Learner can read volatility as a probability range for returns
  - Example: Daily returns with standard deviation 1.2%: annualised 1.2% x sqrt(252) = 19.05%; a one-sigma year ranges roughly -19% to +19% around the mean.
  - Exercises (5): bucket, mcq, numeric · Callbacks: Q2.2, Q2.3, F2.1
  - Sources: S015 chapters on risk and risk aversion, S001 chapters on variance and normal distribution, S074 chapters on variance and standard deviation
- **F2.3 Covariance and correlation** (60 min) — Learner can compute covariance and correlation of two return series; Learner can read a correlation matrix and flag misleading readings; Learner can explain why correlations rise in stress
  - Example: Two stocks with volatilities 20% and 30% and covariance 0.018 have correlation 0.018/(0.20 x 0.30) = 0.30.
  - Exercises (5): match, mcq, numeric, spot · Callbacks: Q2.2, F2.2
  - Sources: S015 chapter on diversification, S074 chapter on joint distributions and covariance, S079 chapters on correlation and portfolio risk
- **F2.4 Diversification and the first risk-adjusted measure** (60 min) — Learner can compute the variance of a two-asset portfolio; Learner can explain systematic vs idiosyncratic risk and why diversification removes only the latter; Learner can compute a Sharpe ratio and use it to compare two portfolios
  - Example: 50/50 portfolio of assets with vol 20% and 30%, correlation 0.3: variance 0.0415, vol 20.4% (less than the 25% average vol).
  - Exercises (5): bucket, mcq, numeric, paper · Callbacks: F2.3, P6.4
  - Sources: S085 full paper: portfolio selection, S015 chapters on diversification and Sharpe, S079 chapters on portfolio risk

Unit test: Return calculations, volatility annualisation, correlation and two-asset diversification.

### Q3 Calculus I, gently · 7 h · track: theory · needs: Q1

_Derivatives, the slope of a curve, and the chain rule, applied to the sensitivity of a bond price to yield (DV01)._


- **Q3.1 Rate of change and slopes** (60 min) — Learner can compute the average rate of change of a function over an interval; Learner can interpret a slope as units of y per unit of x in a finance context; Learner can read a secant line from a graph
  - Example: Bond price at 3.0% yield is 97.40, at 3.5% is 95.30: slope = (95.30 - 97.40)/0.5 = -4.20 price points per 1% of yield.
  - Exercises (4): match, mcq, numeric · Callbacks: Q1.1, Q1.3, P3.6
  - Sources: S006 chapters on small differences and the idea of rate, S020 Calculus I: rates of change, S017 lectures on rates of change and derivatives
- **Q3.2 Limits, gently** (60 min) — Learner can estimate a limit numerically with a table of values; Learner can evaluate simple limits by algebra; Learner can recognise continuity and a jump
  - Example: As the compounding frequency n in (1+1/n)^n grows from 1 to 365, the value moves from 2 to 2.7146 and tends to e = 2.7183.
  - Exercises (4): mcq, numeric, table · Callbacks: Q1.3, Q3.1, F1.2
  - Sources: S020 Calculus I: limits chapter, S047 limits chapter, S006 chapters on limits as they appear informally
- **Q3.3 The derivative: definition and tangent line** (60 min) — Learner can state the derivative as the limit of the difference quotient; Learner can compute a derivative from the definition for simple functions; Learner can write the equation of a tangent line
  - Example: f(x)=x^2: difference quotient ((x+h)^2-x^2)/h = 2x+h gives f'(x)=2x. At x=3 the tangent has slope 6.
  - Exercises (4): cloze, mcq, numeric · Callbacks: Q3.1, Q3.2
  - Sources: S020 Calculus I: definition of the derivative, S017 lectures on the derivative, S011 chapter on single-variable calculus
- **Q3.4 Derivative rules: power, sum, product, quotient** (60 min) — Learner can differentiate polynomials, products and quotients using the rules; Learner can combine rules to differentiate a rational expression; Learner can check a derivative numerically
  - Example: d/dx [x^3 + 2x] = 3x^2 + 2. Product: d/dx [x * (1+x)^2] needs the product rule.
  - Exercises (5): match, numeric, spot · Callbacks: Q3.3
  - Sources: S020 Calculus I: differentiation formulas, S006 chapters on rules of differentiation, S047 differentiation rules
- **Q3.5 Chain rule, exponentials and logarithms** (60 min) — Learner can apply the chain rule to composed functions; Learner can differentiate e^x, a^x and ln x; Learner can differentiate discount-factor functions
  - Example: d/dy of 100(1+y)^(-5) = -500(1+y)^(-6); at y=3%: -418.7 per unit of yield, i.e. about -4.19 price points per 1% move.
  - Exercises (5): match, mcq, numeric · Callbacks: Q1.3, Q1.4, Q3.4, F1.2
  - Sources: S020 Calculus I: chain rule; exponential and log derivatives, S006 chapters on exponentials and logs, S017 lectures on exponential and log derivatives
- **Q3.6 Using derivatives: maxima, minima and linear approximation** (60 min) — Learner can find stationary points and classify them with the second derivative; Learner can use the tangent-line approximation to estimate small changes; Learner can set up and solve a simple optimisation problem
  - Example: Profit P(q)=-q^2+40q-100: P'(q)=-2q+40=0 gives q=20, second derivative -2 < 0 so a maximum with profit 300.
  - Exercises (4): mcq, numeric · Callbacks: Q3.3, Q3.4, Q3.5
  - Sources: S020 Calculus I: applications of derivatives, S047 applications chapter, S011 chapters on optimisation
- **Q3.7 Preview: duration as a derivative** (60 min) — Learner can compute modified duration for a zero-coupon bond as -(1/P) dP/dy; Learner can estimate the price change for a small yield move with linear approximation; Learner can compute DV01 and explain why the approximation fails for large moves (convexity preview)
  - Example: 5-year zero at 3% yield: price 86.26, modified duration 5/1.03 = 4.854. For +10bp: -4.854 x 0.001 x 86.26 = -0.419 price points.
  - Exercises (5): mcq, numeric, paper · Callbacks: Q3.5, P3.6
  - Sources: S061 chapters on duration and price sensitivity, S045 chapter on price volatility of bonds, S075 chapter on duration

Unit test: Limits, derivative from definition, rules, chain rule, optimisation and duration as a derivative.

**Checkpoint:** Boss quiz of 35-40 minutes mixing share rights and dividends, bond accrued/dirty price and yield, fund NAV and cut-off logic, ETF premium/discount, structured-note booking and KID reading, plus small return-risk and derivative calculations. About 25% are callbacks to L1 units (P1, F1, A1, Q1, Q2).

Open questions: See syllabus/FACTS.md (originals in open-questions.txt)

## L3 — Orders & Execution (~39 h)

This level covers the path of an order from instruction to execution across EU and US venues: order types, execution routes, best execution, costs, FIX messages and contract notes. It also covers integrals, Taylor approximations and the normal and lognormal distributions as applied to financial problems.

### T2 Order types & lifecycle · 6 h · track: ops · needs: T1

_Market, limit, stop and other order types, time-in-force instructions, and the states an order passes through from entry to fill, cancel or expiry._

Covers (boss's list): order & execution workflows  
🎮 Minigame: **Order Book** — Level 1: submit market/limit/stop orders against a live book, watch fills, partials and the spread  

- **T2.1 Anatomy of an order: market, limit, marketable limit** (50 min) — Learner can list the mandatory fields of an equity order and say which are optional; Learner can predict the fill of a market vs a limit order against a given book; Learner can explain why a marketable limit order is the retail default
  - Example: Book: ask 10.02 x 3,000; 10.03 x 5,000; 10.05 x 9,000. A market buy of 12,000 fills 3,000 @10.02, 5,000 @10.03 and 4,000 @10.05, VWAP 10.0342; a limit buy 12,000 @10.03 fills 8,000 and rests 4,000 on the bid.
  - Exercises (4): bucket, cloze, mcq, numeric · Callbacks: T1.1, P2.1
  - Sources: S101 Ch. 4-5 (order types, order-driven markets), S100 Ch. on order management, S030 Ch. on equity markets
- **T2.2 Conditional and hidden-liquidity order types** (50 min) — Learner can distinguish stop, stop-limit and trailing-stop triggers and their risks; Learner can explain iceberg, pegged and minimum-quantity orders and when a PM would use each; Learner can choose an order type for a stated client goal
  - Example: A client holds Eni at 14.80 and enters a sell stop at 14.20. The stock gaps to 13.90 at the open; the stop triggers and becomes a market order filled around 13.90, not 14.20 - the order type protects the trigger, not the price.
  - Exercises (4): match, mcq, numeric, timeline · Callbacks: T2.1
  - Sources: S101 Ch. 5-6 (order types and trading strategies), S037 Ch. 2-3 (order types, DMA), S265 Rule 600 definitions / Rule 611 order-type context
- **T2.3 Time in force and order validity** (45 min) — Learner can apply DAY, GTC, GTD, IOC, FOK and auction-only validity rules to a scenario; Learner can explain how venue rules cap GTC lifetime and what happens at corporate actions; Learner can say which TIFs are market-wide vs broker-managed
  - Example: A GTC limit buy at 50.00 is placed on Friday. On Monday the stock goes ex-dividend by 1.20; many venues cancel or adjust resting orders, while some brokers re-price. The learner decides which behaviour the client agreement states.
  - Exercises (4): cloze, mcq, order, spot · Callbacks: T2.1, T2.2, P2.3
  - Sources: S101 Ch. 5 (order validity and TIF), S100 Ch. on order handling, S212 FIX guidelines: TimeInForce (59) usage
- **T2.4 The order lifecycle and its states** (50 min) — Learner can trace an order from receipt to terminal state naming each state change; Learner can distinguish cancel, replace, reject, expire and done-for-day; Learner can reconcile order quantity with CumQty and LeavesQty
  - Example: Order to sell 100,000 shares: fills of 20,000 @25.10, 35,000 @25.08 and 15,000 @25.12 leave 30,000; the PM replaces the limit and the replace is rejected because the order is mid-fill. CumQty 70,000, AvgPx 25.0943.
  - Exercises (4): mcq, numeric, order, table · Callbacks: T1.2, T2.3
  - Sources: S100 Ch. on trade lifecycle and order management, S028 Ch. on trade capture, S212 FIX order state matrix
- **T2.5 Care, DMA and algos; OMS, EMS and smart routing** (55 min) — Learner can explain the difference between care, DMA, sponsored access and algorithmic orders; Learner can draw the OMS-EMS-broker-venue chain and say where each control sits; Learner can match a trading objective to an algo family
  - Example: A PM wants to sell 1.5m shares equal to 25% of ADV. She sends it 'care' to the desk who slice it with a POV 15% algo through the broker's SOR; a small tail goes DMA to a dark midpoint pool.
  - Exercises (4): bucket, match, mcq, order · Callbacks: T1.2, T2.4
  - Sources: S010 Whole article (OMS/EMS architectures), S037 Ch. 1-4 (DMA, algos), S325 Rule 15c3-5 overview, S038 Ch. 1-2 (algo taxonomy)
- **T2.6 Allocation, aggregation and block trades** (55 min) — Learner can allocate a filled block across accounts pro-rata and by average price; Learner can explain the fairness principle behind aggregation and allocation; Learner can distinguish a block, a large-in-scale order and a cross
  - Example: A PM buys 90,000 shares for three funds (A 50k, B 30k, C 10k) and the broker fills 81,000 at VWAP 12.304. Pro-rata gives A 45,000, B 27,000, C 9,000 all at 12.304; the policy says odd lots go to the largest fund.
  - Exercises (4): mcq, numeric, spot, table · Callbacks: T2.4, A1.4
  - Sources: S165 Arts 67-70 (client order handling, aggregation and allocation), S100 Ch. on allocation, S058 Ch. on trade capture and allocation
- **T2.7 Order handling duties, timestamps and record-keeping** (55 min) — Learner can list the MiFID II duties on handling client orders and the matching FINRA/SEC duties; Learner can state what must be recorded for each order and for how long; Learner can spot an order-handling breach in a case
  - Example: A limit order is received at 10:02:15.348 UTC and entered at 10:05:40 after manual rekeying; a regulator asks why the stamp differs from the client's call recording by three minutes - the learner identifies the record-keeping gap.
  - Exercises (4): cloze, mcq, paper, spot · Callbacks: T2.4, T2.6
  - Sources: S165 Arts 67-76 (order handling), Art 72-76 record keeping, S258 Art 25, S318 FINRA Rule 4511, S184 Art 16(6)-(7)

Unit test: End-of-module test: order types, TIF, state transitions, partial-fill arithmetic, allocation and order-handling duties.

Jurisdictions: EU first (MiFID II/MiFIR order handling); US comparison via Reg NMS/FINRA 4511 and Rule 15c3-5.

### T3 Venues & market structure · 6 h · track: ops · needs: T2

_Regulated markets, MTFs, systematic internalisers and dark pools, the opening, continuous and closing phases, and how venue choice depends on order type and size._

Covers (boss's list): order & execution workflows, dealer execution across venues  
🎮 Minigame: **Order Book** — Level 2: auctions, volatility interruptions, iceberg and midpoint orders, multi-venue routing against a fragmented book  

- **T3.1 The venue taxonomy: RM, MTF, OTF, SI, OTC** (50 min) — Learner can classify a venue by MiFID II category and state its key rules; Learner can say who may operate each venue type and what instruments it can list; Learner can map real EU venues to their category
  - Example: Euronext Milan is a regulated market, Turquoise is an MTF, Tradeweb's EU bond venue is an MTF, a bank's broker-crossing network is an OTF only for non-equity, and a bank quoting bilaterally in Eni under SI rules is an SI.
  - Exercises (3): bucket, match, mcq · Callbacks: T1.2, P2.2
  - Sources: S184 Art 4(1)(21)-(23), Arts 18-20, 31-32, S258 Arts 14-22 overview, S057 Part on trading venues, S124 Ch. on trading venues
- **T3.2 Order-driven markets: books, auctions and price-time priority** (55 min) — Learner can run an opening or closing auction and derive the uncrossing price; Learner can apply price-time priority and pro-rata matching to a stream of orders; Learner can explain volatility interruptions and circuit breakers
  - Example: Pre-open orders: buys 4,000@10.05, 3,000@10.04, 5,000@10.02; sells 3,500@10.01, 4,000@10.03, 6,000@10.06. Max-volume price 10.03-10.04 -> 7,000 matches at the rule-determined price; the learner applies the tie-break.
  - Exercises (4): mcq, numeric, order, table · Callbacks: T2.1, T2.4
  - Sources: S101 Ch. 4-6, 8, S037 Ch. 2, S076 Chapters on auctions and order books, S134 Ch. on market design
- **T3.3 Transparency: pre-trade, post-trade, waivers, caps** (55 min) — Learner can explain why transparency exists and the main waivers to pre-trade transparency; Learner can describe the post-MiFIR-review regime (volume cap, deferrals, tape); Learner can decide whether a trade is eligible for a waiver
  - Example: A 400,000 EUR block in a mid-cap trades via negotiated-trade waiver at the mid; it is reported post-trade within minutes while a large-in-scale deferral may delay publication of size.
  - Exercises (4): bucket, mcq, spot, timeline · Callbacks: T3.1
  - Sources: S259 Arts 3-4, 6-8, 11, 22a (consolidated tape) as amended, S176 MiFID II/MiFIR review summary, S297 ESMA transparency Q&As, S296 ESMA market structure Q&As
- **T3.4 Dark trading, SIs and periodic auctions** (50 min) — Learner can explain how dark pools, midpoint crossing and periodic auctions differ; Learner can describe SI obligations and why SI internalisation matters for best execution; Learner can weigh information leakage vs price improvement
  - Example: A 200,000-share parent is sent first to a midpoint pool (rate of fill 4%), then to a periodic auction, and finally resting in the lit book; the learner compares expected impact for each leg.
  - Exercises (4): match, mcq, multi, numeric · Callbacks: T3.1, T3.3
  - Sources: S009 Chapters on dark pools (narrative), S013 Chapters on HFT and venues (narrative), S259 SI regime (Art 14-18 as amended), S076 Dark trading chapters
- **T3.5 United States: Reg NMS and the NBBO world** (55 min) — Learner can explain NBBO, order protection and access rules; Learner can describe maker-taker pricing and its effects; Learner can compare EU and US routing duties
  - Example: A marketable order for 500 shares is routed to the venue showing the best protected quote; if another exchange has a better protected quote at that moment, trading through it is prohibited unless an exception applies.
  - Exercises (4): bucket, mcq, numeric, order · Callbacks: T3.2
  - Sources: S265 Rules 600, 605, 606, 610, 611, 612, S046 Chs. on market structure, S076 Chapters on US market structure and fragmentation
- **T3.6 Bonds and OTC: dealer markets and electronic platforms** (50 min) — Learner can explain why bonds are mostly OTC and dealer-based; Learner can compare voice, RFQ platforms and all-to-all venues; Learner can describe bond transparency and the EU consolidated tape for bonds
  - Example: A 5m EUR corporate bond block has ~3 quoting dealers; the investor sends an RFQ to 3 dealers on an MTF, receives 99.45, 99.42, 99.47 (clean) and hits the best offer - 5,000,000 x 99.42 plus accrued.
  - Exercises (4): bucket, match, mcq, numeric · Callbacks: P3.4, P3.6, T3.1
  - Sources: S056 Whole paper (BIS electronic trading), S219 Secondary market data and electronic trading papers, S117 Whole paper (auction vs search), S093 Chs. on bond trading
- **T3.7 UK, Switzerland, Singapore, Hong Kong and a venue-chooser case** (45 min) — Learner can summarise the main structural differences of UK, CH, SG and HK markets; Learner can pick the right venue strategy for a cross-border order; Learner can compare tick-size and fee models
  - Example: A 120,000-share order in a Swiss large-cap is split between SIX lit and a local midpoint pool; the learner compares expected cost with the EU split of the same sized order across Xetra and a Cboe dark book.
  - Exercises (4): match, mcq, paper, spot · Callbacks: T3.1, T3.5
  - Sources: S324 HM Treasury UK MiFID reform paper, S204 FinMIA overview, S203 FinSA venue-related provisions

Unit test: End-of-module test: venue categories, matching rules, auctions, transparency waivers, Reg NMS basics, and bond trading protocols.

Jurisdictions: EU deepest (MiFID II/MiFIR venue regime, 2024 review); US via Reg NMS; UK/CH short sections; SG/HK sidebar only.

### T4 Dealer execution · 4 h · track: ops · needs: T3, P3

_Request-for-quote trading, dealer quoting and risk management, the spread, and the decision whether to show a price on a given size._

Covers (boss's list): dealer execution across venues, order & execution workflows  
🎮 Minigame: **Dealer Desk** — Level 1: respond to a stream of RFQs, choose bid/offer and size, manage inventory and hit rate  

- **T4.1 Agency, principal and riskless principal** (45 min) — Learner can distinguish agency, principal and matched principal trades; Learner can state what capacity disclosure the client must see; Learner can compute a dealer's mark-up or spread on a riskless principal trade
  - Example: Dealer buys 5m EUR of a bond at 99.30 from the market and sells it to the client at 99.45 immediately; the 0.15 mark-up is 7,500 EUR on 5m nominal, disclosed on the confirmation.
  - Exercises (3): bucket, mcq, numeric · Callbacks: T2.5, P3.3
  - Sources: S101 Ch. 3 (dealers), S209 FINRA Rule 2121 mark-up/markdown context, S165 Arts 66-69 executions and capacity, S270 Rule 10b-10 capacity disclosure
- **T4.2 Market making and inventory** (50 min) — Learner can set bid/ask around a mid given inventory and risk limits; Learner can explain how skew and spread respond to inventory and information; Learner can compute P&L from spread capture vs inventory moves
  - Example: A market maker is long 40,000 shares against a 30,000 target; she skews quotes down by half a tick and widens the spread by 1 tick after a news flash.
  - Exercises (4): mcq, multi, numeric, table · Callbacks: F2.1, T3.2
  - Sources: S101 Ch. 8-10, S114 Whole paper (Glosten-Milgrom), S154 Ch. on market making
- **T4.3 RFQ protocols and bilateral pricing** (50 min) — Learner can describe RFQ, RFQ-to-n, request-for-stream, all-to-all; Learner can calculate the win rate and cost of information leakage across dealers; Learner can choose the right number of dealers to query
  - Example: A client sends an RFQ to 5 dealers; 3 respond within the 30-second validity window; dealer A is best but is only filled if the price is still valid. Hit rate over 20 RFQs is 35%.
  - Exercises (4): mcq, numeric, order, spot · Callbacks: T3.6
  - Sources: S117 Whole paper (Click or Call), S056 Sections on RFQ and protocols, S219 Electronic trading papers
- **T4.4 Bond trading workflows: voice vs electronic** (50 min) — Learner can trace a bond trade from inquiry to confirmation in voice and electronic workflows; Learner can convert between price and yield quotation for a quote; Learner can explain axes, runs and spread-to-benchmark quoting
  - Example: Voice: client asks for 3m of a 5y bond; dealer quotes 99.60/99.70; the trade is hit at 99.70 and captured manually; electronic: the same trade arrives via an MTF and the confirmation is auto-matched.
  - Exercises (4): match, numeric, order, spot · Callbacks: P3.4, P3.5, T2.4
  - Sources: S093 Chs. on trading, S045 Ch. on market structure and trading, S221 Secondary market rules and recommendations, S219 Reports
- **T4.5 Dealer execution across venues: SI, last look and conflicts** (45 min) — Learner can explain how a dealer decides between internalising and hedging in the market; Learner can identify conflicts (pre-hedging, last look, front-running) and the controls; Learner can apply best-execution duties to dealer quotes
  - Example: Pre-hedging a 3m EUR client order ahead of an RFQ answer can reduce dealer risk but may harm the client if the market moves; ESMA warns it is permitted only when it serves the client and is disclosed.
  - Exercises (3): mcq, multi, paper · Callbacks: T4.2, T4.3
  - Sources: S144 Chapters on best execution and conflicts, S101 Ch. on dealer markets, S189 ESMA Q&As on best execution

Unit test: End-of-module test: capacity, market-making P&L, RFQ protocols, bond quoting conventions, and dealer conflicts.

Jurisdictions: EU practice first (MiFID II capacity and SI regimes); US via FINRA mark-up concepts and TRACE; no other jurisdictions.

### T5 Best execution & TCA · 4 h · track: ops · needs: T3

_The best-execution factors under MiFID II, execution policy, and transaction cost analysis against arrival price, VWAP and other benchmarks._

Covers (boss's list): order & execution workflows, dealer execution across venues  

- **T5.1 The best-execution duty: MiFID II Art 27** (50 min) — Learner can state the duty, its sufficient steps standard and who owes it; Learner can list the execution factors and how retail 'total consideration' differs; Learner can say where the duty does not apply
  - Example: A retail client's 5,000-share order: venue A gives 12.00 with 0.50 EUR commission, venue B gives 11.99 with 0.20 EUR fee; total consideration (price x quantity plus costs) shows which venue is cheaper.
  - Exercises (4): cloze, mcq, multi, numeric · Callbacks: T3.1, T2.7
  - Sources: S184 Art 27, S165 Arts 64-66, S144 Chapter on best execution, S189 ESMA best-ex Q&As
- **T5.2 Execution policy, venue selection and monitoring** (45 min) — Learner can describe the contents of an execution policy and how it is disclosed; Learner can explain monitoring and review obligations; Learner can describe what replaced RTS 27/28 reporting after Directive 2024/790
  - Example: A firm's policy lists three venues for equities and an SI; the quarterly review finds that venue B's fill rate has dropped, so the policy committee proposes to demote it.
  - Exercises (3): bucket, mcq, spot · Callbacks: T5.1
  - Sources: S165 Arts 65-66, S167 RTS 27/28 - history only, S176 Dir 2024/790 provisions deleting RTS 27/28
- **T5.3 US best execution and related rules** (45 min) — Learner can describe FINRA 5310's reasonable-diligence standard; Learner can compare it with MiFID II Art 27; Learner can explain Rule 605/606 disclosures
  - Example: A retail broker routes 100% of equity flow to one wholesaler; Rule 606 discloses payments and the analyst compares execution quality with Rule 605 statistics.
  - Exercises (3): mcq, numeric, table · Callbacks: T3.5, T5.1
  - Sources: S208 FINRA 5310, S265 Rules 605, 606, S319 FINRA Rule 5320
- **T5.4 Measuring cost: arrival, VWAP and implementation shortfall** (55 min) — Learner can compute slippage vs arrival, VWAP and close benchmarks; Learner can compute implementation shortfall with explicit and implicit costs; Learner can choose the right benchmark for an objective
  - Example: A PM decides to buy 100,000 at 20.00; the order arrives at 20.02, executes 80,000 at 20.08 average and 20,000 remain unfilled with the price at 20.20; IS = delay + impact + opportunity cost, computed in bps.
  - Exercises (4): mcq, numeric, table · Callbacks: F2.1, T2.4
  - Sources: S038 Chs. on TCA and IS, S139 Whole paper (Almgren-Chriss intro), S154 Ch. on market impact, S101 Ch. on execution cost
- **T5.5 TCA in practice and bond best execution** (45 min) — Learner can read a TCA report and identify outliers; Learner can explain evidence challenges for bonds and RFQ; Learner can document a best-ex review
  - Example: A broker report shows average slippage of 6 bps, but one order has 38 bps; the review finds it ran in a stressed auction with low liquidity and documents the outlier.
  - Exercises (3): mcq, paper, spot · Callbacks: T5.4, T4.3
  - Sources: S076 Chapters on execution quality, S219 Bond execution evidence, S139 Whole paper

Unit test: End-of-module test: Art 27 duty, execution policy, US best-ex, slippage and implementation shortfall arithmetic.

Jurisdictions: EU first (Art 27, post-2024 reporting changes); US via FINRA 5310 and Reg NMS 605/606; no others.

### T6 Brokerage, commissions & costs · 4 h · track: ops · needs: T2

_Broker commission, exchange and clearing fees, stamp duty and financial transaction tax, and how to explain each line of a total trade cost._

Covers (boss's list): brokerage & commissions  

- **T6.1 Commission models and fee schedules** (45 min) — Learner can compute commissions under per-share, bps and tiered schedules; Learner can apply minimums and maximums; Learner can compare retail and institutional commission models
  - Example: A retail broker charges 0.10% with a 9.90 EUR minimum; a 5,000 EUR order pays 9.90 (minimum) while a 50,000 EUR order pays 50 EUR.
  - Exercises (3): mcq, numeric, table · Callbacks: T2.1
  - Sources: S101 Ch. on commissions and trading costs, S209 FINRA Rulebook fee-related rules, S058 Ch. on brokerage
- **T6.2 Venue, clearing, settlement fees and transaction taxes** (50 min) — Learner can list the cost layers between order and settlement; Learner can compute FTT / stamp duty on a trade; Learner can identify who bears which fee
  - Example: A 100,000 EUR purchase of a French large-cap incurs a 0.4% FTT (400 EUR; rate since 1 Apr 2025), exchange fee 4 EUR, clearing fee 3 EUR and broker commission 25 EUR.
  - Exercises (3): bucket, match, numeric · Callbacks: T6.1
  - Sources: S322 Italian FTT update, S058 Ch. on settlement costs, S101 Ch. on trading costs
- **T6.3 Ex-ante and ex-post costs & charges disclosure** (50 min) — Learner can list items in an ex-ante costs & charges disclosure; Learner can compute the cumulative effect of costs on return; Learner can identify when ex-post reporting is due
  - Example: A 100,000 EUR fund holding: entry 1.0%, ongoing 1.4%, transaction 0.3% per year; over 5 years at 4% gross return the illustration shows an end value reduced by several thousand EUR.
  - Exercises (3): numeric, spot, table · Callbacks: T6.2, P4.4
  - Sources: S184 Art 24(4), S165 Art 50, S252 KID costs section, S189 ESMA Q&As on costs and charges
- **T6.4 Inducements and research unbundling** (50 min) — Learner can explain the inducement rules and quality-enhancement test; Learner can describe the unbundling regime and the 2021 carve-out; Learner can spot a prohibited inducement
  - Example: A fund manager pays 200,000 EUR/year from its own P&L for research; after the 2021 change, bundled payments for issuers with market cap under 1bn EUR are allowed again under conditions.
  - Exercises (3): bucket, cloze, mcq · Callbacks: T6.1
  - Sources: S175 Dir 2021/338 and Del. Dir 2017/593, S201 FCA multi-firm review, S184 Art 24(7)-(9)
- **T6.5 Payment for order flow and venue economics** (45 min) — Learner can explain how PFOF works and why EU banned it; Learner can compare US PFOF with EU rules; Learner can describe maker-taker rebates and conflicts
  - Example: A US retail broker receives 0.15 cents per share from a wholesaler for each order; the EU bans investment firms from receiving such payments for retail order routing.
  - Exercises (3): mcq, multi, numeric · Callbacks: T3.5, T5.3
  - Sources: S259 PFOF ban provisions as amended, S265 Rule 606, S176 Dir/Reg 2024/790-791 overview, S267 RIS context

Unit test: End-of-module test: commission calculations, cost stacks, costs & charges disclosures, inducements and PFOF.

Jurisdictions: EU first (MiFID II disclosures, PFOF ban, FTT); US PFOF/606 mentioned; UK stamp duty/FCA review as sidebar.

### T7 Messaging · 3 h · track: ops · needs: T2

_The structure of FIX messages, the main tags and message types in an order flow, and how to trace an order through a raw log._

Covers (boss's list): order & execution workflows  

- **T7.1 FIX anatomy: tags, header, body, trailer** (45 min) — Learner can read a FIX message and name header, body and trailer tags; Learner can explain session vs application layer; Learner can verify BodyLength and checksum logic
  - Example: Message: 8=FIX.4.4|9=...|35=D|49=BUYER|56=BROKER|11=ORD1|55=ENI|54=1|38=1000|40=2|44=14.50|10=...; the learner decodes it.
  - Exercises (3): match, mcq, numeric · Callbacks: T2.4
  - Sources: S210 FIX Latest: message and field reference, S212 Best practices, S037 Ch. on FIX
- **T7.2 NewOrderSingle and ExecutionReport** (45 min) — Learner can build a NewOrderSingle for a described order; Learner can interpret ExecType and OrdStatus in ExecutionReports; Learner can read cancel/replace messages
  - Example: An order for 5,000 shares generates three ExecutionReports: New, Partial Fill 2,000 @9.98, Fill 3,000 @9.99; the learner computes CumQty and AvgPx.
  - Exercises (4): cloze, mcq, numeric, order · Callbacks: T2.4, T7.1
  - Sources: S210 Messages 35=D, 35=8, 35=F, 35=G, S211 FIX Orchestra overview, S037 Ch. on FIX orders
- **T7.3 Reading real-world FIX: rejections, sessions and gaps** (45 min) — Learner can diagnose a rejected order from a FIX log; Learner can recognise sequence gaps and resend requests; Learner can trace a ClOrdID chain through cancels and replaces
  - Example: The log shows a replace request with OrigClOrdID pointing to an already-filled order and a rejection with text 'Too late to cancel'; the learner explains the state.
  - Exercises (3): mcq, order, spot · Callbacks: T7.2
  - Sources: S210 Session layer FIXT 1.1, S212 Best practices, S211 FIXimate
- **T7.4 SWIFT MT vs ISO 20022 for securities** (45 min) — Learner can compare MT and MX syntax for a trade/confirmation message; Learner can name the relevant ISO 20022 families for securities; Learner can explain the migration drivers
  - Example: A settlement instruction expressed as MT540 and the same instruction as sese.023: the learner maps the key fields side by side.
  - Exercises (3): match, mcq, table · Callbacks: T1.3
  - Sources: S016 Whole booklet, S327 MyStandards overview, S306 AMI-SeCo customisation

Unit test: End-of-module test: FIX tag reading, execution report arithmetic, log diagnosis, MT vs ISO 20022 mapping.

Jurisdictions: Global standards; EU T2S/ISO 20022 usage is mentioned; no jurisdiction notes otherwise.

### O1 Contract notes & confirmations · 3 h · track: ops · needs: T2, A1

_The content of a contract note, required regulatory fields, the confirmation and affirmation cycle, and how to check and correct a disputed figure._

Covers (boss's list): contract notes  

- **O1.1 Anatomy of a contract note** (45 min) — Learner can list the mandatory contents of a contract note under MiFID II and Rule 10b-10; Learner can identify retail vs professional timing; Learner can find the capacity and venue information on a note
  - Example: A contract note must show the trading venue, the price and quantity, total commission and charges; the client is notified at the latest the first business day after execution.
  - Exercises (3): cloze, match, spot · Callbacks: T2.4, T6.1
  - Sources: S165 Art 59, S270 Rule 10b-10, S058 Ch. on confirmations
- **O1.2 Calculations on a contract note** (45 min) — Learner can compute net settlement amount for a buy and a sell; Learner can compute accrued interest on a bond contract note; Learner can reconcile trade date, value date and settlement
  - Example: Buy 1,000 shares @25.10 = 25,100 gross, commission 25, FTT 100 (FR 0.4%), net debit 25,225; a bond sale with 62 days of accrued at 4% on 1m nominal adds 6,794.52 under act/365.
  - Exercises (3): numeric, table, timeline · Callbacks: P3.5, T6.2
  - Sources: S028 Ch. on trade confirmation, S100 Ch. on trade documentation
- **O1.3 Confirmation, affirmation and trade matching** (45 min) — Learner can describe how trades are matched between parties; Learner can compare MT515/MT518 flows and modern matching platforms; Learner can diagnose a trade break
  - Example: A broker-side confirmation says 25.10 and the client says 25.01; the mismatch is a keying transposition. Matching tolerance flags it for correction before settlement.
  - Exercises (3): mcq, order, spot · Callbacks: O1.1, T7.4
  - Sources: S327 MyStandards MT515/518, S058 Ch. on confirmation/affirmation, S298 ESMA Q&As on MiFIR data reporting
- **O1.4 Booking from a contract note** (45 min) — Learner can book trade-date and settlement-date entries from a note; Learner can book fees and accrued interest correctly; Learner can identify booking errors on a note
  - Example: A buy contract note books Dr Securities, Dr Fees, Cr Payable on trade date and Dr Payable, Cr Cash on settlement date.
  - Exercises (3): journal, spot, table · Callbacks: A1.3, A1.4, O1.2
  - Sources: S028 Ch. on accounting entries, S036 Ch. on investment accounting
- **O1.5 Commission worked cases** (45 min) — Compute brokerage under ad valorem, tiered and minimum-charge schedules; Apply an FX mark-up to a cross-currency trade and show it as a separate cost line; Add the transaction taxes and fees to reach the net amount on a contract note; Detect a commission, tax or net-amount error on a contract note
  - Example: A client buys 1,000 shares of a French listed company above EUR 1bn market cap at EUR 100.00: notional EUR 100,000. Tiered brokerage 0.30% on the first EUR 50,000 (150.00) and 0.15% on the rest (75.00) is EUR 225.00. French FTT 0.4% is EUR 400.00. Net debit EUR 100,625.00. For a small buy of 100 shares at EUR 12.00 (notional 1,200), 0.30% is 3.60, so the EUR 20 minimum applies. An FX-converted USD 10,000 purchase at mid 1.1000 with a 0.50% mark-up is quoted at 1.0945, costing EUR 9,136.59 vs EUR 9,090.91 at mid.
  - Exercises (5): mcq, numeric, spot, table · Callbacks: T6.1, T6.2, O1.2, O1.4
  - Sources: S028 contract note calculations, S100 trade lifecycle: charges and net amount, S058 fees on confirmations, S101 commission models, S165 Art. 59: costs on the confirmation

Unit test: End-of-module test: contract-note content, net-amount calculation, matching and booking entries.

Jurisdictions: EU (Art 59) and US (Rule 10b-10) side by side; no others.

### Q4 Calculus II · 6 h · track: theory · needs: Q3

_Definite integrals, the link between a rate and an accumulated amount, and Taylor expansions applied to the bond price-yield curve (convexity)._


- **Q4.1 Accumulation: area under a curve and Riemann sums** (50 min) — Learner can approximate an area using left, right and midpoint sums; Learner can interpret area as accumulated quantity; Learner can write a sum in sigma notation
  - Example: Cash flow rate f(t)=100 EUR/year for 4 years: area = 400; with f(t)=50+25t, the right Riemann sum with 4 intervals is 50+75+100+125 = 350.
  - Exercises (3): mcq, numeric, table · Callbacks: Q3.1, Q1.5
  - Sources: S017 Unit 5 lectures, S006 Chs. on integration, S020 Calculus I integrals section
- **Q4.2 Antiderivatives and the Fundamental Theorem** (50 min) — Learner can find simple antiderivatives; Learner can state the FTC and use it to evaluate definite integrals; Learner can check results by differentiating
  - Example: F(x)=x^3/3 is an antiderivative of x^2, so the integral from 1 to 3 is 27/3 - 1/3 = 26/3.
  - Exercises (3): cloze, mcq, numeric · Callbacks: Q3.3
  - Sources: S017 Unit 5, S047 Ch. 5, S006 Chs. on integration
- **Q4.3 Integration rules and drills** (55 min) — Learner can integrate powers, exponentials, 1/x and sums; Learner can apply simple u-substitution; Learner can integrate by recognising derivative patterns
  - Example: Integral of 3e^{2x} dx = (3/2)e^{2x} + C; integral of 1/(x+1) dx = ln|x+1| + C.
  - Exercises (4): match, mcq, numeric, spot · Callbacks: Q3.4, Q1.6
  - Sources: S020 Calculus I integrals, S047 Ch. 5-6, S011 Ch. on integration
- **Q4.4 Integrals in finance: continuous cash flows and present value** (50 min) — Learner can compute total and present value of a continuous cash flow; Learner can connect integrals to annuity formulas; Learner can set up an integral from a word problem
  - Example: A stream paying 1,000 EUR/year for 5 years discounted continuously at 4% has PV = 1000 * (1 - e^{-0.2})/0.04 = 4,531.
  - Exercises (3): mcq, numeric, table · Callbacks: F1.4, Q4.3
  - Sources: S075 Ch. 2 (cash flows), S011 Chs. on dynamic optimisation, S015 Time value background
- **Q4.5 Exponential and logarithmic growth** (50 min) — Learner can solve y'=ky and interpret k; Learner can compute doubling times; Learner can link continuous growth to log returns
  - Example: At 3% continuous growth, wealth doubles in ln2/0.03 = 23.1 years.
  - Exercises (3): cloze, mcq, numeric · Callbacks: Q1.7, F2.1
  - Sources: S017 Unit on exponential growth, S006 Chs. on logs, S075 Ch. 2
- **Q4.6 Taylor approximation** (55 min) — Learner can build first- and second-order Taylor polynomials; Learner can estimate values using them; Learner can estimate the error roughly
  - Example: e^{0.05} ~ 1 + 0.05 + 0.00125 = 1.05125; compare with exact 1.051271.
  - Exercises (3): mcq, numeric, table · Callbacks: Q3.5
  - Sources: S047 Ch. on series, S017 Taylor lecture, S115 Ch. on Taylor
- **Q4.7 Consolidation: derivatives and integrals together; bond price curve preview** (50 min) — Learner can combine derivatives and integrals in a problem; Learner can estimate price change from yield using first- and second-order terms; Learner can interpret the curve bend
  - Example: A bond price P(y)=100e^{-5y}; linear approximation at y=4% estimates the move for +50bp; adding the second-order term reduces the error.
  - Exercises (3): mcq, numeric, paper · Callbacks: Q4.6, P3.7
  - Sources: S061 Ch. on price sensitivity, S047 Ch. 5-6, S075 Ch. 3

Unit test: End-of-module test: integration technique, FTC, financial integral applications, growth and Taylor approximation.

### Q5 Probability II · 3 h · track: theory · needs: Q2, Q3

_Continuous distributions, the normal and lognormal models for returns, expectation and variance of sums, and covariance._


- **Q5.1 Random variables, expectation, variance** (45 min) — Learner can compute expectation and variance for discrete and simple continuous variables; Learner can apply linearity rules; Learner can interpret CDF and PDF
  - Example: Return X takes -5%, 0%, +8% with probabilities 0.2, 0.5, 0.3: E=1.4%, Var=22.24 (%-squared), sd about 4.7%
  - Exercises (3): mcq, numeric · Callbacks: Q2.1, Q2.2, Q4.2
  - Sources: S001 Chs. 4-5, S074 Chs. 3-4, S020 Probability notes
- **Q5.2 The normal distribution** (45 min) — Learner can standardise and use z-scores; Learner can compute normal probabilities from tables; Learner can apply the 68-95-99.7 rule
  - Example: Monthly return ~ N(0.8%, 4%): P(return < -5%) = P(Z < -1.45) ~ 7.4%.
  - Exercises (3): mcq, numeric · Callbacks: Q5.1, F2.2
  - Sources: S001 Ch. 5, S074 Ch. 5, S015 Ch. on risk and return
- **Q5.3 Lognormal prices** (45 min) — Learner can explain why prices are modelled as lognormal; Learner can compute the mean and median of a lognormal; Learner can convert between log and simple returns
  - Example: If ln(S_T/S_0) ~ N(0.05, 0.2^2), median S_T/S_0 = e^{0.05} = 1.0513 and mean = e^{0.05+0.02}=1.0725.
  - Exercises (3): mcq, numeric · Callbacks: Q4.5, Q5.2
  - Sources: S075 Ch. 7, S012 Ch. 2, S001 Ch. 5
- **Q5.4 Law of large numbers and the CLT** (45 min) — Learner can state and use the CLT for sample means; Learner can compute standard error of an average return; Learner can explain where it fails (fat tails)
  - Example: With 60 monthly returns, sd 4%, SE = 0.52%; a 95% CI for mean return is +-1.0%.
  - Exercises (3): mcq, numeric, paper · Callbacks: Q2.4, Q5.2
  - Sources: S001 Ch. 8, S074 Ch. 10, S039 Ch. 5

Unit test: End-of-module test: random variables, normal and lognormal probabilities, LLN/CLT and standard errors.

**Checkpoint:** Level boss quiz (35-45 min) mixing all nine modules: an order-to-contract-note case (route, fills, cost, confirmation) plus calculus and probability items. Format: 25-30 mixed-template questions with 25% callbacks to L1-L2.

Open questions: See syllabus/FACTS.md (originals in open-questions.txt)

## L4 — Post-Trade & Custody (~39 h)

This level covers clearing, settlement and custody, including fails and CSDR penalties, segregation and depositary protection, transfers, and securities lending and repo collateral. It also covers the processing of mandatory corporate actions with correct dates and entitlements, and bond price, yield, duration and convexity.

### O2 Clearing & CCPs · 5 h · track: ops · needs: T1, O1

_The role of central counterparties, novation, clearing members, initial and variation margin, default funds, and intraday margin calls._

Covers (boss's list): clearing (post-trade), custodian role (settlement)  
🎮 Minigame: **Margin Hotline** — CCP edition (lite): price moves trigger VM/IM calls for a clearing member; learner computes and meets the call, then handles a client default and porting decision. Full version at K2.  

- **O2.1 Why clearing exists: counterparty risk and netting** (45 min) — Learner can explain why a bilateral trade carries counterparty risk between trade date and settlement date; Learner can compute bilateral net obligations from a list of trades; Learner can distinguish clearing from settlement
  - Example: Bank A buys 10,000 shares at EUR 20 from B and sells 6,000 at EUR 20.40 to B the same day; bilateral netting reduces two gross deliveries to a single net 4,000-share delivery and a net cash amount.
  - Exercises (4): bucket, cloze, mcq, numeric · Callbacks: T1.1, T1.3, O1.3
  - Sources: S049 chapters on clearing and netting, S100 chapter on clearing and settlement in the trade lifecycle, S162 Recommendations 1-3 (matching, netting, settlement cycles)
- **O2.2 Novation and the CCP as buyer to every seller** (50 min) — Learner can describe novation and open offer and the resulting legal position of the CCP; Learner can order the flow of obligations before and after novation; Learner can explain the role of clearing members and the difference between direct and indirect clearing
  - Example: A cash-equity trade between two brokers on a venue is novated: after novation both brokers face the CCP, not each other, and the CCP's book is flat apart from timing.
  - Exercises (4): match, mcq, order, spot · Callbacks: O2.1, T1.1
  - Sources: S099 chapters on CCP legal structure, novation and membership, S049 chapter on CCPs, S261 Art 2 definitions, Art 4 (clearing obligation) for context
- **O2.3 Multilateral netting in numbers** (45 min) — Learner can compute multilateral net positions per member and per security; Learner can calculate netting efficiency (gross vs net); Learner can explain when netting does not reduce obligations
  - Example: Five clearing members trade one share and the cash leg: gross turnover EUR 120m, net settlement obligation EUR 18m, i.e. 85% netting efficiency.
  - Exercises (4): mcq, numeric, table · Callbacks: O2.1, A1.3
  - Sources: S049 netting section, S058 chapter on clearing, S099 chapter on netting and exposure reduction
- **O2.4 CCP margin: initial, variation, default fund** (55 min) — Learner can distinguish initial margin, variation margin and default fund contributions; Learner can compute a variation margin call from a price move; Learner can explain margin period of risk and anti-procyclicality tools; Learner can name eligible collateral types and haircuts conceptually
  - Example: A member is long 100,000 shares at EUR 50; price falls to EUR 47: VM call EUR 300,000 in cash by the next morning, while IM (e.g. 12% of notional) stays posted.
  - Exercises (5): bucket, cloze, mcq, numeric · Callbacks: O2.3, F1.3
  - Sources: S099 chapters on risk management and margin, S116 chapters on CCP margin models and default fund, S261 Arts 41-42, 46 (margin, default fund, collateral), S260 margin and anti-procyclicality provisions incl. EMIR 3
- **O2.5 Default waterfall and recovery** (50 min) — Learner can list the default waterfall layers in order and who bears each; Learner can explain segregation and portability of client positions; Learner can explain cover-1/cover-2 stress testing
  - Example: A member defaults with EUR 300m of losses: its IM and DF contribution are consumed first, then the CCP's own capital, then surviving members' DF contributions absorb the rest.
  - Exercises (4): mcq, numeric, order, spot · Callbacks: O2.4, O2.2
  - Sources: S099 chapters on default management, S261 Arts 39, 45 (segregation and portability; default waterfall), S116 default fund and loss mutualisation
- **O2.6 EMIR, EMIR 3 and the CCP landscape** (55 min) — Learner can state what the EMIR clearing obligation covers and what it does not (cash-equity clearing is market-driven); Learner can describe the main EU/US CCPs and their asset classes; Learner can summarise EMIR 3 measures (active account, clearing thresholds, margin models) at a high level
  - Example: A Euronext cash trade is cleared by Euronext Clearing, an interest-rate swap by LCH SwapClear; only the latter falls under the EMIR clearing obligation.
  - Exercises (4): bucket, match, mcq, spot · Callbacks: O2.2, O2.4, P1.4
  - Sources: S260 EMIR as amended by EMIR 3 (Reg. 2024/2987): headline provisions, S295 selected clearing Q&As, S326 SEC Rule 17Ad-22 overview, S099 closing chapters on regulation

Unit test: Clearing vs settlement, novation, multilateral netting arithmetic, margin types and default waterfall order.

Jurisdictions: EU first (EMIR, EMIR 3); US sidebar (NSCC/FICC, OCC, Rule 17Ad-22); UK/CH/SG/HK limited to naming main CCPs (e.g. LCH, SIX x-clear).

### O3 Settlement · 7 h · track: ops · needs: O2

_Settlement cycles, matching, delivery versus payment, partial settlement, fails and buy-ins, and the calculation of CSDR cash penalties._

Covers (boss's list): custodian role (settlement), transfers, order & execution workflows  
🎮 Minigame: **Settlement Chase** — Resolve a stream of fails before cut-off using matching corrections, partials, shaping, borrowing and recycling; penalty meter counts basis points.  

- **O3.1 Settlement basics: instructions, DVP and finality** (50 min) — Learner can describe an instruction, matching and settlement sequence; Learner can distinguish DVP, RVP, FoP and the three BIS DVP models; Learner can explain settlement finality and book-entry transfer
  - Example: Seller delivers 5,000 shares against EUR 100,000 in a model-1 gross DVP at the CSD: securities and cash move simultaneously, trade by trade.
  - Exercises (4): cloze, match, mcq, order · Callbacks: T1.4, O2.1
  - Sources: S049 chapters on settlement, S028 settlement chapters, S162 Recommendations 6-9, S263 Art 3 (book-entry), Art 39 (finality)
- **O3.2 CSDs and ICSDs: who holds what** (50 min) — Learner can distinguish a national CSD, an ICSD and a custodian; Learner can name the main EU CSDs and ICSDs and what they settle; Learner can explain issuer CSD vs investor CSD and links
  - Example: A Eurobond issued into Euroclear Bank is held by an Italian bank via Euroclear Bank, while an Italian BTP sits in Monte Titoli and is reached by cross-border investors via a link or a custodian.
  - Exercises (4): bucket, match, mcq, spot · Callbacks: O2.2, P1.4
  - Sources: S063 chapters on CSDs and ICSDs, S021 chapters on European CSD structure, S263 Arts 16-19 (authorisation), 48-52 (links, access), S049 chapter on CSDs
- **O3.3 T2S: one platform for European settlement** (50 min) — Learner can explain the T2S architecture (CSDs, DCAs, central bank money); Learner can describe the T2S settlement day and cut-offs; Learner can explain auto-collateralisation and cross-CSD settlement
  - Example: A French investor buys German bonds: both CSDs are on T2S, so the DVP settles against central-bank-money cash on a DCA in a single cross-CSD instruction pair.
  - Exercises (4): cloze, mcq, order, timeline · Callbacks: O3.1, O3.2
  - Sources: S286 T2S overview, S328 framework agreement summary, S329 settlement-day and process sections, S021 chapters on T2S background
- **O3.4 Settlement cycles: T+2, T+1 and the 2027 shift** (55 min) — Learner can state current and upcoming settlement cycles in EU, US, UK; Learner can calculate settlement dates with holidays; Learner can describe operational impacts of T+1 (matching, FX funding, SSIs, securities lending recalls)
  - Example: A Frankfurt equity trade on Monday 11 October 2027 settles Tuesday 12 October 2027 under T+1; the same trade on Friday 8 October 2027 would have settled Tuesday 12 October under T+2.
  - Exercises (5): bucket, mcq, numeric, spot, timeline · Callbacks: O3.1, T1.4
  - Sources: S250 Reg. 2025/2075 key provisions, S168 proposal rationale and date, S186 ESMA final report on shortening the settlement cycle, S190 EU T+1 industry roadmap, S272 SEC Rule 15c6-1 release, S158 UK Accelerated Settlement Taskforce report
- **O3.5 Instruction management: matching, SSIs, hold/release, shaping** (55 min) — Learner can read the status of an instruction (unmatched, matched, on hold, pending, settled); Learner can apply hold-and-release, partial settlement and shaping; Learner can maintain correct SSIs and diagnose matching failures
  - Example: A 100,000-share sale settles only 70,000 because the account is short 30,000; a partial settles 70,000 and the remaining 30,000 recycles to the next batch.
  - Exercises (5): mcq, numeric, order, spot, table · Callbacks: O3.1, O1.2, O1.3
  - Sources: S100 chapter on settlement processing, S058 chapter on settlement, S329 matching and instruction processing sections, S294 ESMA Q&As: matching and partial settlement
- **O3.6 Fails and CSDR settlement discipline: penalties** (60 min) — Learner can list causes of settlement fails and the standard fail-management tools; Learner can calculate CSDR cash penalties using asset-class rates; Learner can distinguish prevention, monitoring and sanction measures
  - Example: A EUR 2,000,000 sale of a liquid share fails for 3 days at 1.0 bp per day: penalty EUR 200 per day, EUR 600 in total, debited from the failing participant and credited to the receiver.
  - Exercises (5): bucket, mcq, numeric, order, table · Callbacks: O3.5, O2.1
  - Sources: S263 Arts 6-7, S166 penalty mechanism (RTS 2018/1229) and rates (Del. Reg. 2017/389 Annex), S294 ESMA Q&As on penalties, S049 chapter on fails
- **O3.7 Buy-ins, CSDR Refit and the US contrast** (50 min) — Learner can explain how the buy-in regime changed under CSDR Refit (mandatory to last-resort); Learner can describe a buy-in process and cash compensation; Learner can contrast EU penalties with US fail charges and Reg SHO close-out
  - Example: A fail on an illiquid share persists past the extension period; under Refit the buy-in is not automatic and is applied only after a delay-and-assessment procedure.
  - Exercises (4): bucket, mcq, numeric, order · Callbacks: O3.6
  - Sources: S248 Refit amendments to Art 7, S247 Refit overview, S263 Art 7 original text, S294 ESMA Q&As on buy-in
- **O3.8 Settlement efficiency, internalisation and reporting** (50 min) — Learner can compute settlement efficiency rates; Learner can explain internalised settlement and its reporting; Learner can apply a fail-resolution playbook to a mixed scenario
  - Example: On a day with 2,000 instructions and 60 failing, settlement efficiency by volume is 97%; the desk resolves 40 fails by cut-off using partials, recycling and a stock borrow from the lending desk.
  - Exercises (4): mcq, numeric, order, spot · Callbacks: O3.5, O3.6, O3.7
  - Sources: S263 Art 9 (internalised settlement), S058 chapter on fails and metrics, S294 ESMA Q&As on reporting, S021 chapters on settlement efficiency

Unit test: Settlement models, CSD landscape and T2S timeline, cycle calculation including holidays, fail causes, CSDR penalty arithmetic and Refit buy-in status.

Jurisdictions: EU first (CSDR, Refit, T2S, T+1 on 11 Oct 2027); US sidebar (T+1 since 28 May 2024, DTC, Reg SHO); UK T+1 on 11 Oct 2027; CH/SG/HK not covered in this module.

### O4 Custody & safekeeping · 6 h · track: ops · needs: O3

_Custody chains, omnibus and segregated accounts, the CSD layer, depositary duties, and what happens to client assets if a custodian fails._

Covers (boss's list): custodian role (safekeeping), client accounts, chart of accounts (custody side)  

- **O4.1 The custody chain: from investor to CSD** (50 min) — Learner can map a holding chain from end investor to CSD; Learner can distinguish global custodian, sub-custodian, agent bank and depositary; Learner can list core custody services
  - Example: A Swiss pension fund holds Italian equities through its global custodian in Zurich, which uses a sub-custodian in Milan that is a participant of Monte Titoli.
  - Exercises (4): bucket, match, mcq, order · Callbacks: O3.2, C1.1
  - Sources: S063 chapters on global custody and chain, S049 custody chapters, S005 custody chapters
- **O4.2 Account structures: omnibus, segregated, nominee** (55 min) — Learner can compare omnibus and individually segregated structures; Learner can describe CSDR Art 38 client segregation options; Learner can explain nominee and street-name practice
  - Example: A custodian's Euroclear account has an omnibus pool for 40 clients; offering ICS for a large institution moves that client's position to a dedicated sub-account with higher cost.
  - Exercises (4): bucket, mcq, spot, table · Callbacks: O3.2, C1.2
  - Sources: S169 Art 38 text and ESMA reading, S035 Euronext Securities segregation levels, S063 chapters on account structures, S291 depositary asset segregation Del. Regs
- **O4.3 Asset protection and legal risk** (50 min) — Learner can explain how segregation and title protect client assets on insolvency; Learner can distinguish title transfer, pledge and bailment; Learner can compare asset-protection regimes (EU, US 15c3-3, UK CASS, DE Depotgesetz)
  - Example: On a custodian insolvency, segregated securities are returned in kind, while cash held on the custodian's own balance sheet can be an unsecured claim.
  - Exercises (4): bucket, match, mcq, spot · Callbacks: O4.2
  - Sources: S150 chapters on custodian insolvency and client assets, S273 Rule 15c3-3 overview, S312 FCA PS14/9 CASS, S214 Depotgesetz overview
- **O4.4 Forms of holding: bearer, registered, book-entry** (45 min) — Learner can compare physical, immobilised and dematerialised securities; Learner can explain registrar and share-register roles; Learner can describe CSDR Art 3 and Art 37 integrity-of-issue rules
  - Example: A global bearer note is held at Euroclear Bank by a common depositary; an Italian dematerialised share exists only as a book entry at Monte Titoli.
  - Exercises (4): bucket, cloze, match, mcq · Callbacks: O4.1, P2.4
  - Sources: S063 chapters on forms of securities, S263 Arts 3, 37, S049 chapter on immobilisation
- **O4.5 Depositaries for UCITS and AIFs** (55 min) — Learner can list the three depositary duties (safekeeping, cash monitoring, oversight); Learner can explain the strict liability rule on loss of financial instruments; Learner can distinguish depositary from custodian and sub-custodian delegation
  - Example: A Luxembourg UCITS depositary delegates to a sub-custodian in Spain: if instruments are lost, the depositary must return equivalent assets unless it can prove an external event beyond reasonable control.
  - Exercises (4): bucket, match, mcq, spot · Callbacks: O4.1, O4.3, P4.1
  - Sources: S289 UCITS V depositary Del. Reg. 2016/438, S290 AIFMD L2 depositary articles, S292 CSSF 16/644, S293 CSSF 18/697, S310 ESMA opinion on CSD delegation, S180 UCITS/AIFMD
- **O4.6 Reconciliation and operational controls** (55 min) — Learner can perform position and cash reconciliations and classify breaks; Learner can age and escalate breaks; Learner can name key statements and messages (MT535/536/537, MT940/950, semt)
  - Example: Internal book shows 10,000 shares of an ISIN, the sub-custodian statement shows 9,500: a pending sale of 500 not yet booked internally explains the difference.
  - Exercises (5): match, numeric, order, spot, table · Callbacks: A1.4, O4.2, O3.5
  - Sources: S058 chapters on reconciliation, S100 reconciliation in trade lifecycle, S327 statement message usage guidelines, S016 ISO 20022 introduction
- **O4.7 Custody economics and provider selection** (50 min) — Learner can compute custody fees from a fee schedule; Learner can describe sub-custodian due diligence and risk factors; Learner can evaluate service-level terms
  - Example: Safekeeping on EUR 400m at 20 bp for the first EUR 100m and 15 bp above costs EUR 200k + EUR 450k = EUR 650k a year (EUR 162.5k per quarter), plus transaction fees for 3,000 settlements.
  - Exercises (4): bucket, mcq, numeric, table · Callbacks: O4.1, O3.8
  - Sources: S063 chapters on custody business model, S150 sub-custodian selection

Unit test: Custody chain, segregation structures, asset protection, depositary duties and liabilities, reconciliation logic.

Jurisdictions: EU first (CSDR Art 38, UCITS V/AIFMD depositary, CSSF circulars); US sidebar (street name, 15c3-3); UK CASS; Germany Depotgesetz; CH not covered here (see R3/C3).

### O5 Transfers · 4 h · track: ops · needs: O4

_Account transfers between institutions, the instruction and matching process, handling of funds and multi-currency positions, and the checks before booking._

Covers (boss's list): transfers, client accounts  

- **O5.1 Transfer taxonomy: FoP vs DvP, internal vs external** (45 min) — Learner can distinguish FoP, DvP, internal book transfer and external transfer; Learner can name risks of FoP (no cash leg) and how to mitigate them; Learner can list data needed for a transfer instruction
  - Example: Moving 5,000 shares to another bank is a FoP delivery with no payment; selling and re-buying would instead be a DvP trade and may crystallise tax.
  - Exercises (4): bucket, cloze, match, mcq · Callbacks: O3.1, C1.2
  - Sources: S028 chapter on transfers, S049 transfer sections, S058 chapter on settlement instructions
- **O5.2 FoP transfers in practice: MT54x and sese messages** (50 min) — Learner can pick the right MT540-MT543 / sese.023 instruction for a transfer; Learner can read the main fields of a FoP instruction; Learner can handle a rejection, repair and recall
  - Example: To deliver 5,000 shares free to another custodian, the sender issues a MT542 (deliver free) or sese.023 with the receiver as account owner at the CSD.
  - Exercises (4): match, mcq, order, spot · Callbacks: O3.5, T7.1
  - Sources: S016 ISO 20022 securities message sections, S327 usage guidelines for settlement messages, S306 ISO 20022 customisation notes, S052 messaging chapters
- **O5.3 US customer account transfers: ACATS** (50 min) — Learner can describe the ACATS process and timeline; Learner can list common reject reasons; Learner can describe fraud controls for transfers
  - Example: A customer submits a TIF to the receiving broker; the delivering broker validates and releases the assets within the ACATS timeframe, rejecting on account-title mismatch if names differ.
  - Exercises (4): bucket, mcq, order, spot · Callbacks: O5.1
  - Sources: S237 NSCC Rule 50, S206 FINRA Rule 11870, S129 FINRA RN 23-06, S046 customer-protection context
- **O5.4 UK STAR, EU practice and Swiss sidebar** (45 min) — Learner can describe the UK STAR transfer standards; Learner can explain how EU transfers work without a single harmonised scheme; Learner can compare EU, UK and US models
  - Example: A UK ISA transfer runs over the STAR standards, while an Italian-to-German bank transfer is typically an FoP via the CSD/ICSD route.
  - Exercises (4): bucket, cloze, match, mcq · Callbacks: O5.2, O5.3
  - Sources: S281 STAR standards overview, S049 regional transfer practices, S124 EU investor-mobility context
- **O5.5 Fund transfers and ISO 20022** (50 min) — Learner can explain transfers of fund units (platform vs register); Learner can describe re-registration and in-kind transfers; Learner can list the ISO 20022 messages used for fund orders and transfers
  - Example: A client's Luxembourg UCITS units move from one distributor's nominee at the TA to another: the transfer agent re-registers the units; no redemption, so no tax event.
  - Exercises (4): match, mcq, order, spot · Callbacks: O5.2, P4.5
  - Sources: S016 fund messages sections, S327 usage guidelines, S052 fund-related CA/processing notes
- **O5.6 Client transfer workflow and cost-basis carry-over** (45 min) — Trace a transfer-in and a transfer-out from client instruction to completion, naming the sending and receiving party actions; Diagnose rejections and breaks (account title, quantity, unsupported security, restriction, missing signature) and the action to resolve each; Carry over cost basis and acquisition dates for transferred lots and compute the effect of missing basis; Reconcile the position and cash after a transfer between sender and receiver
  - Example: A client transfers in 1,000 shares: 400 bought on 12 Mar 2019 at EUR 18.00 and 600 on 30 Jun 2021 at EUR 22.50. Carried-over cost is 400 x 18.00 + 600 x 22.50 = EUR 20,700 (EUR 20.70 average). If the sender supplies no basis, the receiver may default to the market value on transfer date (EUR 30.00 x 1,000 = EUR 30,000), understating the gain by EUR 9,300 on a later sale at EUR 30; the client submits the lot history to correct it.
  - Exercises (5): mcq, numeric, order, spot, table · Callbacks: O3.5, O4.6, O5.1, O5.2, O5.4
  - Sources: S028 transfer and position management, S049 clearing, settlement and custody: FoP mechanics, S237 ACATS rules: transfer data and timeline, S281 STAR: UK transfer standards, S058 reconciliation after transfers, S226 IRS Pub 550: basis reporting on sales

Unit test: Transfer types, instruction messages, ACATS stages, STAR/EU comparison and fund-unit transfers.

Jurisdictions: EU first (bilateral FoP, ISO 20022); US ACATS; UK STAR; CH sidebar; SG/HK not covered.

### O6 Securities lending & repo · 5 h · track: ops · needs: O3

_Securities lending and repo mechanics, collateral types and haircuts, margining, recall rights, and the treatment of dividends during a loan._

Covers (boss's list): secured/Lombard lending (collateral basics), custodian role  

- **O6.1 Securities lending mechanics** (50 min) — Learner can describe the parties and flows of a securities loan; Learner can compute loan fees, rebates and revenue splits; Learner can explain recalls and manufactured payments
  - Example: Lending EUR 10m of a stock at 40 bp for 30 days earns EUR 10m x 0.004 x 30/360 = EUR 3,333; the agent keeps a 25% share.
  - Exercises (4): cloze, mcq, numeric, order · Callbacks: P2.3, O3.1
  - Sources: S090 securities lending chapters, S050 collateral management intro, S049 chapter on lending
- **O6.2 Repo mechanics** (50 min) — Learner can describe a repo and reverse repo; Learner can compute repurchase price and implied rate; Learner can distinguish GC and special repo, bilateral and tri-party
  - Example: EUR 10m of Bunds are repoed for 7 days at 3.00% (act/360); repurchase price = 10m x (1 + 0.03 x 7/360) = EUR 10,005,833.
  - Exercises (4): bucket, mcq, numeric · Callbacks: F1.1, P3.1
  - Sources: S152 repo market chapters, S071 ICMA ERCC guide, S090 repo chapters
- **O6.3 Collateral: haircuts, margin and eligibility** (50 min) — Learner can compute haircut and margin requirement; Learner can explain mark-to-market and margin calls on SFTs; Learner can describe eligibility and concentration rules
  - Example: Lending EUR 10m of shares against bonds with 5% haircut: collateral must be at least EUR 10.5m; if the shares rise to EUR 10.4m the requirement becomes EUR 10.92m, so a EUR 420k top-up is called.
  - Exercises (4): bucket, mcq, numeric · Callbacks: O6.1, O2.4
  - Sources: S050 collateral chapters, S320 ECB haircut guideline, S309 ECB haircut explainer
- **O6.4 Documentation: GMRA and GMSLA** (50 min) — Learner can describe the structure of GMRA/GMSLA; Learner can distinguish title transfer from pledge; Learner can explain events of default and close-out netting
  - Example: Under a GMRA, if a counterparty defaults, all repos are terminated, valued at default market value and netted into a single claim.
  - Exercises (4): bucket, mcq, order, spot · Callbacks: O6.2, O6.3
  - Sources: S216 GMRA 2011, S217 GMSLA, S150 legal analysis chapters
- **O6.5 SFTR: reporting and reuse** (50 min) — Learner can describe SFTR scope and reporting obligations; Learner can explain reuse conditions (Art 15); Learner can read key SFTR reporting fields
  - Example: A repo between two EU banks is reported to a trade repository by T+1 with a UTI and both LEIs, and every modification and collateral update is also reported.
  - Exercises (4): bucket, cloze, mcq, spot · Callbacks: O6.1, O6.4
  - Sources: S244 SFTR text: Arts 4, 13, 15, S299 ESMA Q&As, S243 SFTR
- **O6.6 Lifecycle operations and risks** (50 min) — Learner can handle corporate actions on loaned/repoed securities; Learner can explain operational and credit risks; Learner can link lending to short-selling and settlement fails
  - Example: Before a record date, the lender recalls shares to vote; the borrower must return them in the standard settlement cycle or incur fails.
  - Exercises (4): bucket, cloze, mcq, order · Callbacks: O6.1, O3.6
  - Sources: S090 operations chapters, S050 risk chapters, S253 Short Selling Regulation

Unit test: SFT mechanics, haircut/margin arithmetic, GMRA/GMSLA concepts and SFTR reporting basics.

Jurisdictions: EU first (SFTR, ICMA ERCC); US sidebar (SEC/FINRA treatment, Reg SHO); UK/CH/SG/HK limited to GMRA/GMSLA governing law.

### O7 Corporate actions I: mandatory events · 8 h · track: ops · needs: O4, P2, P3

_Dividends, splits, mergers and other mandatory events: announcement, important dates, entitlement calculation and posting to client accounts._

Covers (boss's list): all corporate actions, income accounting (event side), custodian role (asset servicing)  
🎮 Minigame: **CA Election Desk** — Mandatory-events edition: process a stream of mandatory events on the right dates, compute entitlements and match payments; elections added in O8.  

- **O7.1 The corporate action landscape and lifecycle** (45 min) — Learner can classify an event as mandatory, mandatory with choice or voluntary; Learner can order the stages of the CA lifecycle (announcement to reconciliation); Learner can name the main ISO 15022 event types for the mandatory events in this module
  - Example: A listed company announces EUR 1.20 dividend: this is a mandatory event (DVCA); the same notice offering shares or cash would be mandatory with choice (DRIP/scrip), handled in O8.
  - Exercises (5): bucket, cloze, match, mcq, order · Callbacks: P2.3, P3.2, O4.1
  - Sources: S052 opening chapters on event classification and lifecycle, S233 CAJWG market standards: event classification, S049 corporate actions chapter, S005 asset servicing chapters
- **O7.2 Key dates and entitlement: ex, record, payment** (55 min) — Learner can place announcement, last-trading, ex, record and payment dates on a timeline; Learner can determine whether a trade is entitled to an event from its trade and settlement dates; Learner can explain how the move to T+1 changes ex/record relationships
  - Example: Record date is Friday 12 June 2026: under T+2 the ex-date is Thursday 11 June, so a buyer trading on 10 June is entitled while a buyer trading on 11 June is not; under T+1 (EU from 11 Oct 2027) ex-date equals record date.
  - Exercises (5): mcq, numeric, spot, table, timeline · Callbacks: O3.4, O7.1, P2.3
  - Sources: S233 key date standards, S052 chapter on dates and entitlement, S250 T+1 impact on ex/record, S058 corporate actions chapter
- **O7.3 Cash dividends: gross, tax, net, currency** (55 min) — Learner can compute gross and net dividend entitlement from a position and a rate; Learner can apply withholding tax at source and explain reclaim-at-source concepts; Learner can describe DRIP vs cash dividend and dividend currency (pay-in-EUR vs currency option) at a basic level
  - Example: 10,000 shares x EUR 1.20 = EUR 12,000 gross; with 26% withholding the client receives EUR 8,880 and the custodian posts the tax separately.
  - Exercises (5): mcq, numeric, spot, table · Callbacks: O7.2, P2.3, A1.3
  - Sources: S052 dividend chapters, S036 income entries for dividends, S242 QI/withholding overview, S178 FASTER Directive: reclaim context, S053 dividend policy
- **O7.4 Stock dividends and bonus issues** (45 min) — Learner can compute entitlement for a stock dividend or bonus issue with fractions; Learner can explain how a bonus issue differs from a split; Learner can explain the effect on price and holdings
  - Example: 1 new share per 10 held: 1,234 shares entitle to 123 new shares and 0.4 fraction, settled as cash in lieu; the price drops by about 1/11 on the ex-date.
  - Exercises (4): mcq, numeric, table · Callbacks: O7.3, P2.1
  - Sources: S052 chapters on distributions in shares, S233 fraction handling standards, S015 equity valuation basics
- **O7.5 Splits and reverse splits** (45 min) — Learner can compute post-split holdings and prices; Learner can handle fractions in reverse splits; Learner can describe impacts on orders, options and static data
  - Example: A 4-for-1 split turns 500 shares at EUR 200 into 2,000 at EUR 50; in a 1-for-10 reverse split, 1,234 shares become 123 new shares plus a 0.4 fraction settled in cash.
  - Exercises (4): mcq, numeric, spot · Callbacks: O7.4
  - Sources: S052 chapters on splits, S233 market standards, S049 corporate actions chapter
- **O7.6 Coupons and interest payments** (50 min) — Learner can compute coupon payments with day-count conventions; Learner can apply business-day conventions to payment dates; Learner can distinguish fixed, floating and zero-coupon cases
  - Example: EUR 1,000,000 nominal at 3.5% annual: coupon EUR 35,000; if the payment date falls on a Saturday it is paid the next business day (unadjusted) without extra interest.
  - Exercises (5): mcq, numeric, spot, timeline · Callbacks: P3.2, P3.4, P3.5, O7.2
  - Sources: S052 interest payment chapters, S220 ICMA conventions, S287 fixed income reference, S233 market standards
- **O7.7 Redemptions: maturity, calls, drawings, pool factors** (50 min) — Learner can compute redemption proceeds for full and partial redemptions; Learner can apply pool factors to nominal positions; Learner can distinguish call, drawing and put (voluntary, see O8)
  - Example: A holder of EUR 1,000,000 original face sees the factor drop from 0.80 to 0.65: EUR 150,000 is repaid and the remaining nominal is EUR 650,000.
  - Exercises (5): bucket, match, numeric, table · Callbacks: O7.6, P3.1
  - Sources: S052 redemption chapters, S287 bond features, S233 partial redemption standards
- **O7.8 Mandatory reorganisations: mergers, exchanges, spin-offs** (50 min) — Learner can compute entitlements for a mandatory merger or exchange with fractions; Learner can explain demerger/spin-off treatment and squeeze-outs; Learner can describe the position and static-data changes
  - Example: A 3-for-2 share exchange turns 1,001 old shares into 1,501.5 new shares: 1,501 delivered and 0.5 settled in cash.
  - Exercises (4): mcq, numeric, spot, table · Callbacks: O7.5, O7.4
  - Sources: S052 reorganisations chapters, S233 market standards, S057 capital markets law context
- **O7.9 Identifier, name and other static-data changes** (40 min) — Learner can handle ISIN, name and other static-data changes without economic impact; Learner can map old to new identifiers in positions and tax lots; Learner can list downstream systems affected by an identifier change
  - Example: A company changes name and ISIN: the position quantity stays 10,000, the old ISIN is closed and the new opened with the same cost basis.
  - Exercises (4): match, mcq, order, table · Callbacks: O7.8
  - Sources: S052 static data events, S233 standards, S058 securities reference data
- **O7.10 Messaging and reconciliation: MT564-568 and seev** (45 min) — Learner can read an MT564/seev.031 notification; Learner can map MT564/565/566/567/568 to their ISO 20022 equivalents; Learner can reconcile an event payment and handle breaks
  - Example: An MT564 shows CAEV//DVCA, CAMV//MAND, XDTE 11 June, RDTE 12 June, PAYD 19 June and a gross rate of EUR 1.20; the desk computes expected cash and matches it with the MT566 confirmation.
  - Exercises (5): match, mcq, numeric, order, spot · Callbacks: O7.1, O7.2, T7.3
  - Sources: S052 messaging chapters, S305 AMI-SeCo CA standards, S233 market standards, S327 usage guidelines, S016 ISO 20022

Unit test: Event classification and lifecycle, key-date logic, cash and share entitlements for every mandatory event type, and notification reading.

Jurisdictions: EU first (CAJWG standards, T2S/CSD announcements, ISO 20022 seev); US sidebar (DTC announcements, record-date practice, T+1 ex-date alignment); UK/CH/SG/HK differences only noted (e.g. UK ex-coupon periods).

### F3 Fixed income maths I · 4 h · track: theory · needs: P3, Q4

_Bond price from yield, yield to maturity, duration, modified duration and convexity, and their use in estimating the price effect of a yield change._


- **F3.1 Price as present value; the price-yield relationship** (45 min) — Learner can price a fixed-coupon bond by discounting cash flows; Learner can explain why price and yield move inversely and why the curve is convex; Learner can compare coupon, yield and price (par, discount, premium)
  - Example: A 5-year 4% annual bond priced at a 3% yield: 4 x 4.5797 + 100 x 0.86261 = EUR 104.58 per 100.
  - Exercises (4): bucket, mcq, numeric, table · Callbacks: P3.7, F1.3, F1.4
  - Sources: S045 bond pricing chapters, S061 price and yield chapters, S093 bond mathematics chapters, S015 bond prices and yields
- **F3.2 Yield measures and conventions** (50 min) — Learner can compute current yield and yield to maturity approximations; Learner can solve YTM numerically by bracketing; Learner can distinguish annual, semi-annual and street conventions
  - Example: A 5-year 4% bond priced at 104.58 has YTM 3% (bracket between 2.5% and 3.5% and interpolate); current yield is 4/104.58 = 3.82%.
  - Exercises (4): match, mcq, numeric · Callbacks: F3.1, P3.6
  - Sources: S061 yield chapters, S045 yield measures, S220 ICMA conventions, S287 yield measures reference
- **F3.3 Duration: Macaulay and modified** (50 min) — Learner can compute Macaulay duration of a simple bond; Learner can derive modified duration and link it to the derivative of price w.r.t. yield; Learner can estimate price change from duration
  - Example: A 5-year 4% bond at 3% has Macaulay duration about 4.6 years, modified duration about 4.5; a +50 bp yield move implies roughly -2.2% price.
  - Exercises (4): cloze, mcq, numeric, table · Callbacks: F3.1, Q3.4
  - Sources: S061 duration chapters, S045 duration chapters, S093 duration, S006 derivative intuition
- **F3.4 DV01, portfolio duration and hedging** (45 min) — Learner can compute DV01 / PVBP; Learner can compute portfolio duration as a weighted average; Learner can size a simple duration hedge
  - Example: A EUR 10m position with modified duration 4.5 has DV01 about EUR 4,500 per bp.
  - Exercises (4): mcq, numeric · Callbacks: F3.3, O7.7
  - Sources: S061 hedging chapters, S060 risk measures, S045 portfolio chapters
- **F3.5 Convexity and second-order price change** (50 min) — Learner can compute convexity for a simple bond; Learner can apply the Taylor estimate with duration and convexity; Learner can explain negative convexity in callables
  - Example: With duration 4.5 and convexity 25, a +100 bp move: -4.5% + 0.5 x 25 x 0.0001 = -4.4%, i.e. convexity adds back about 0.125 percentage points.
  - Exercises (5): cloze, mcq, numeric, paper · Callbacks: F3.3, Q4.5
  - Sources: S061 convexity chapters, S045 convexity, S075 bond sensitivity, S017 Taylor/second derivative

Unit test: Bond pricing by PV, yield measures, duration, DV01 and convexity arithmetic.

Jurisdictions: EU conventions (ICMA) first; US street conventions as a sidebar; UK/CH/SG/HK noted only where quoting differs.

**Checkpoint:** Boss quiz (35-45 min, ~30 questions) mixing O2-O7 and F3: netting and margin arithmetic, settlement-date and penalty calculations, segregation and depositary scenarios, SFT collateral numbers, entitlement computations for each mandatory event type, and a duration/convexity estimate. Mix of numeric, timeline, spot-the-error and match items, with 20-30% spaced-review items from L1-L3.

Open questions: See syllabus/FACTS.md (originals in open-questions.txt)

## L5 — Asset Servicing & Accounting (~42 h)

This level covers voluntary corporate actions from notice to posting (rights, tenders, exchange offers, scrip, proxy votes and claims), income and gain accounting, fund NAV, P&L explain and performance measurement. It ends with the bank-side journal entries under IFRS 9.

### O8 Corporate actions II: voluntary & elective · 8 h · track: ops · needs: O7

_Rights issues, tender and exchange offers, scrip dividends, proxy votes and claims: notice, election deadlines at each layer, default options, and posting._

Covers (boss's list): all corporate actions, custodian role (settlement, safekeeping), client accounts  
🎮 Minigame: **CA Election Desk** — Voluntary events with live deadlines: rights, tender, scrip, proxy, warrants; elect before cut-offs, avoid defaults, and clear market claims; difficulty scales with the number of simultaneous events and client mandates  

- **O8.1 Voluntary, mandatory and mandatory-with-options: the CA map** (48 min) — Classify any event as mandatory, mandatory with choice, or voluntary using CAEV/CAMV logic; Trace the information and instruction chain from issuer to end investor and back; Explain default options and why silence is itself a decision
  - Example: A Dutch listed company announces a dividend payable in cash or in new shares: the CAMV is mandatory-with-choice, default cash. A client who ignores the notice gets cash; a second client holding the same shares via an omnibus account at a UK broker may face a different default.
  - Exercises (5): bucket, match, mcq, order, timeline · Callbacks: O7.1, O7.8, P2.2
  - Sources: S052 chapters introducing event types and the voluntary/mandatory classification, S005 Corporate actions chapters, S233 market standards: event classification and default-option principles, S058 Corporate actions chapter
- **O8.2 Rights issues I: mechanics, subscription ratio and TERP** (48 min) — Explain why issuers use rights issues and how nil-paid rights are created and traded; Compute the subscription ratio, theoretical ex-rights price (TERP) and the theoretical value of one right; Distinguish pre-emption rights, renounceable and non-renounceable offers
  - Example: Cum-rights price EUR 10.00; offer 1 new share at EUR 6.00 for every 4 held. TERP = (4 x 10.00 + 1 x 6.00) / 5 = EUR 9.20; theoretical value of a right = 10.00 - 9.20 = EUR 0.80. A holder of 400 shares is entitled to 100 new shares at EUR 600 total.
  - Exercises (5): mcq, numeric, spot · Callbacks: O7.4, O7.8, F1.3
  - Sources: S052 rights issue chapter, S008 equity issuance and rights offers (seasoned equity offerings), S024 equity issues and rights offers, S245 prospectus requirement for offers/admission, overview, S057 capital raising and pre-emption, EU law overview
- **O8.3 Rights issues II: client options, over-subscription and fractions** (48 min) — Calculate the cash outcome of each client option: exercise all, sell all, partial exercise, lapse; Handle fractions, odd lots and over-subscription (excess application) correctly; Explain what happens to unexercised rights at expiry in EU markets
  - Example: Client holds 1,030 shares, ratio 1:4, subscription EUR 6.00. Entitlement = 257.5 rights. She can exercise 257 rights (EUR 1,542), sell 257 rights at EUR 0.80 = EUR 205.60, or split. The half right is a fraction handled per local market rule.
  - Exercises (5): mcq, numeric, order, table · Callbacks: O8.2, O4.3, C1.3
  - Sources: S052 rights issue and instruction handling, S063 corporate actions services chapter, S233 market standards: rights and fractions, S028 corporate actions chapter
- **O8.4 Tender offers, buy-backs and Dutch auctions** (48 min) — Describe the lifecycle of a cash tender offer for equity and for bonds; Compute proration and accepted/unaccepted positions under oversubscription; Explain blocking, withdrawal rights and the early-tender premium
  - Example: Issuer will buy back up to 30m shares at EUR 12.50; holders tender 75m. Proration = 40%. A client who tenders 1,000 shares sells 400 for EUR 5,000 and the remaining 600 are unblocked at results date.
  - Exercises (5): cloze, mcq, numeric, timeline · Callbacks: O8.1, P3.1, P3.5
  - Sources: S052 tender offers and buy-backs, S005 voluntary events: offers, S057 takeover bids and tender offers in the EU, overview, S287 bond tenders, calls and redemptions chapters
- **O8.5 Exchange offers, takeovers with election and mergers with choice** (48 min) — Work out a client's entitlement under cash, share and mixed alternatives; Explain how scaleback and proration apply to a choice offer; Differentiate voluntary exchange offers from mandatory mergers already met in O7
  - Example: Bidder offers 0.8 new shares plus EUR 2.00 per target share, or EUR 14.00 cash capped at 50% of the total. If cash elections exceed the cap, cash electors get 60% cash / 40% shares by scaleback.
  - Exercises (5): match, mcq, numeric, spot · Callbacks: O7.6, O8.4, P2.1
  - Sources: S052 mergers, takeovers and exchange offers, S057 takeover regulation overview (EU), S233 market standards: offers, S145 tender offer and takeover rules (US), chapters
- **O8.6 Conversions, warrants, puts and calls, and elections on structured notes** (48 min) — Determine whether to exercise a conversion, warrant or put based on parity and intrinsic value; Process holder exercise notices for bonds, warrants and certificates; Explain how exercise of securities with a holder option differs from automatic exercise
  - Example: Convertible: EUR 1,000 nominal, conversion price EUR 25.00 gives 40 shares. Shares trade at EUR 28.00, conversion value EUR 1,120 vs bond price EUR 1,085, so converting gains EUR 35 before accrued-interest forfeiture on the converted portion.
  - Exercises (5): bucket, mcq, numeric, order · Callbacks: O8.1, P6.2, P6.3, P3.1
  - Sources: S052 conversions, warrants and put/call options, S149 convertible bond mechanics, conversion terms, S032 warrants and certificates basics (exercise and settlement), S193 EUSIPA map: which products need exercise
- **O8.7 Scrip and optional dividends, DRIPs and currency options** (48 min) — Compute scrip entitlements and compare cash against share alternatives; Process currency elections on cash distributions; Account for default options and fractions in optional dividends
  - Example: Dividend EUR 1.20 per share; scrip price fixed at EUR 24.00 means 20 rights per new share. A client with 1,000 shares gets either EUR 1,200 gross, or 50 new shares.
  - Exercises (5): mcq, numeric, timeline · Callbacks: O7.1, O8.1, P2.3
  - Sources: S052 optional dividends and dividend reinvestment, S233 market standards: dividend options, S005 dividend options
- **O8.8 Proxy voting and SRD II: shareholder identification and vote chains** (48 min) — Describe the information flow of a general meeting from issuer to ultimate shareholder; Explain SRD II rights: shareholder identification, transmission of information, facilitation of voting, vote confirmation; Handle record date, blocking, split voting and voting by proxy
  - Example: A Swiss private bank holds 50,000 shares of an Italian listed company for 12 clients in an omnibus account at an Italian sub-custodian. The bank must forward the meeting notice, collect instructions by the bank's cut-off, and give the sub-custodian split votes (30,000 for, 20,000 against) after the record date.
  - Exercises (5): match, mcq, numeric, order, timeline · Callbacks: O4.3, O4.1, P2.2
  - Sources: S172 Directive 2017/828: Arts 3a-3d (shareholder identification, info transmission, voting facilitation), S173 Implementing Regulation 2018/1212: tables and formats, S052 meeting and proxy chapters, S305 AMI-SeCo CA report: meeting processing standards
- **O8.9 Market claims, transformations and buyer protection** (48 min) — Explain why trades pending settlement over the record date create claims and transformations; Compute a market claim and decide who compensates whom; Explain buyer protection and the instruction deadline mechanics
  - Example: Seller sold 10,000 shares cum-dividend on T-2 before the ex-date, but the trade fails and settles two days after the record date. The seller still holds the shares on the record date and receives EUR 1.00 per share, so the buyer's custodian raises a market claim of EUR 10,000 net of withholding tax.
  - Exercises (5): bucket, mcq, numeric, spot, timeline · Callbacks: O3.6, O3.5, O7.8, O8.1
  - Sources: S233 market standards: claims, transformations, buyer protection (core text), S052 claims chapter, S329 T2S URD: market claims and transformations, detection and settlement, S294 ESMA Q&As on CSDR: settlement fails and corporate-action interplay
- **O8.10 Election desk workflow, controls, risks and the full event pack** (48 min) — Run an end-to-end voluntary event: capture, validation, client notification, election, instruction, confirmation and posting; Identify the key operational risks and the controls and claims process when a deadline is missed; Prioritise a day of events by deadline, value at risk and client segment
  - Example: Seven live events are open: a rights issue (3 days left), a bond tender (5), a scrip dividend (2), a class action filing (30), a proxy meeting (4), a warrant expiry (1), a consent solicitation (6). The warrant has the shortest deadline and the highest value at risk, so it is first.
  - Exercises (5): bucket, cloze, order, paper, spot · Callbacks: O8.1, O8.2, O8.8, O7.8, O4.6
  - Sources: S233 market standards: service levels, deadlines, error handling, S052 operations and risk chapters, S305 AMI-SeCo CA report, ISO 20022 CA messages, S327 SWIFT MyStandards: usage guidelines for CA messages, S058 operations risk chapter
- **O8.11 Distressed and exceptional corporate actions** (50 min) — Classify a distressed or exceptional event (bankruptcy, liquidation, delisting, squeeze-out, class action, consent solicitation, return of capital, special dividend, odd-lot offer, redenomination, bond default or restructuring) as mandatory, voluntary or claim-type and name the client action it needs; Post the position and cash effects of a bond default, a recovery distribution, a return of capital and a squeeze-out, including the realised or unrealised loss; Explain the EU squeeze-out and sell-out mechanism (Takeover Directive thresholds set by Member States between 90% and 95%) and what happens to a position that is compulsorily acquired; Decide for a delisted or insolvent issuer whether to keep the position at zero or nominal value, file a claim or write it off, and state the evidence needed
  - Example: A client holds EUR 100,000 nominal of a bond bought at 98.00 (cost EUR 98,000). The issuer defaults and the bond trades at 30: unrealised loss EUR 68,000 (Dr Unrealised loss / Cr Securities at market). The restructuring pays a 35% recovery in cash: EUR 35,000 received (Dr Cash 35,000, Dr Realised loss 63,000, Cr Securities cost 98,000). A separate EUR 2 per share return of capital on 1,000 shares is not income: Dr Cash 2,000 / Cr Cost basis 2,000, while a EUR 2 special dividend is posted to income and is subject to the usual withholding.
  - Exercises (5): bucket, journal, mcq, numeric, spot · Callbacks: O7.3, O7.7, O7.8, O8.1, O8.4, O8.10, P3.8
  - Sources: S052 chapters on distressed, class action and exceptional events, S233 market standards: mandatory and voluntary event handling, S057 takeover bids, squeeze-out and sell-out (Directive 2004/25/EC), S045 default, restructuring and recovery, S036 postings for write-offs, realised and unrealised loss

Unit test: Entitlement and cash calculations across rights, tender, scrip and exchange offers; classification of event types and defaults; deadline timeline placement; SRD II chain; claims versus transformations.

Jurisdictions: EU first: SRD II and Implementing Reg 2018/1212, T2S market claims and transformations, local rights-issue practices. US: DTC voluntary offering instructions and ATOP, proxy distribution via Broadridge (NOBO/OBO), 'protect' deadlines. UK: provisional allotment letters, renounceable rights, 'make-up' practice. CH: SIX SIS deadlines. SG/HK: short note on local tender practice and CCASS. Keep each to a few lines.

### A2 Income accounting · 6 h · track: ops · needs: A1, O7, F3

_Accrued and received coupon and dividend income, withholding tax, and the reconciliation of an income statement to cash received._

Covers (boss's list): income accounting, all corporate actions  
🎮 Minigame: **Ledger** — Income stream: post accrual, receipt, tax and amortisation entries for a stream of dividends, coupons, scrips and reclaims  

- **A2.1 Income streams and when to recognise them** (45 min) — Name every income stream of a securities portfolio and its recognition event; Distinguish cash-basis from accrual-basis income and ex-date from pay-date recognition; Explain how the client-side portfolio ledger differs from a fund or bank ledger
  - Example: Share goes ex on 12 May with EUR 0.80 per share, paid on 20 May. The client holds 5,000 shares: EUR 4,000 gross income is recognised on 12 May (Dr Dividends receivable, Cr Dividend income) and cash arrives on 20 May.
  - Exercises (4): bucket, journal, mcq, timeline · Callbacks: A1.1, A1.2, O7.1, O7.8
  - Sources: S036 income accounting chapters for equities, S028 income and CA accounting, S043 investment income recognition, S224 IFRS 9 interest revenue; dividend recognition
- **A2.2 Bond coupon accruals and accrued interest on trades** (45 min) — Accrue coupon interest daily using the correct day-count; Book purchased and sold accrued interest separately from price; Split the first coupon after purchase into interest earned and interest bought
  - Example: EUR 100,000 nominal 3% Act/Act bond bought for 99.50 clean with 62 days accrued. Accrued = 100,000 x 3% x 62/365 = EUR 509.59. The ledger shows investment EUR 99,500 and purchased accrued EUR 509.59, not income.
  - Exercises (4): journal, numeric, table · Callbacks: P3.4, P3.5, P3.6, F3.1, A2.1
  - Sources: S036 bond income accounting sections, S220 ICMA conventions for accrued interest, S045 accrued interest and pricing between coupon dates, S287 Handbook of Fixed Income Securities: accrued interest
- **A2.3 Dividend accounting: cash, stock, scrip and ex-date effects** (45 min) — Post gross dividends, withholding tax and net cash in a client ledger; Account for stock dividends, scrip and bonus issues without cash; Explain the ex-date price drop vs income recognition
  - Example: A client in Germany receives EUR 10,000 gross; 26.375% German tax is withheld at source: net cash EUR 7,362.50; the withheld EUR 2,637.50 is booked as tax withheld (receivable if reclaimable).
  - Exercises (4): journal, mcq, numeric · Callbacks: A2.1, O8.7, O7.1, O7.5
  - Sources: S036 dividends accounting, S226 IRS Pub 550: dividends and distributions, S052 income events
- **A2.4 Amortisation: premium, discount and effective interest** (45 min) — Build an effective-interest (EIR) amortisation schedule for a premium or discount bond; Compare straight-line with effective-interest methods; Explain accretion on zero-coupon instruments
  - Example: A 3-year 5% annual-coupon bond of EUR 100,000 bought at 102.78 has an EIR near 4%. Year 1 interest income = 102,780 x 4% = EUR 4,111, coupon EUR 5,000, so amortisation of EUR 889 reduces the carrying amount.
  - Exercises (5): journal, mcq, numeric, table · Callbacks: F1.4, F1.5, F3.1, P3.7
  - Sources: S072 amortised cost and EIR chapters, S224 IFRS 9 5.4 (amortised cost, EIR) and App. A definitions, S036 premium/discount amortisation, S160 Applying IFRS: financial instruments accounting
- **A2.5 Withholding tax: rates, treaties and relief at source** (45 min) — Calculate withholding tax at statutory and treaty rates, and the reclaimable excess; Explain relief at source, quick refund and long-form reclaim; Read a tax-rate matrix for a multi-country portfolio
  - Example: Italy applies 26% to a EUR 20,000 dividend paid to a French resident fund; a treaty rate of 15% implies EUR 2,200 excess to claim. Whether the client gets it depends on documents filed and the time limit.
  - Exercises (5): match, mcq, numeric, spot · Callbacks: A2.3, O4.1, C1.2
  - Sources: S242 QI Agreement and FATCA overview, S226 IRS Pub 550: foreign investor rules, S239 OECD CRS, information exchange context, S063 tax services for custodians
- **A2.6 Reclaims and the EU FASTER Directive** (45 min) — Describe what Directive (EU) 2025/50 changes for withholding tax relief procedures; Explain the role of certified financial intermediaries and the digital tax residence certificate; Compare today's patchwork with the future standard process
  - Example: Today a EUR 80,000 excess-tax claim on a foreign dividend can take a year or more and need paper certificates. FASTER aims to give EU investors a standard digital residence certificate, certified intermediaries and fixed refund windows, with exact deadlines to be verified in the directive text.
  - Exercises (4): cloze, mcq, order, timeline · Callbacks: A2.5, O8.8
  - Sources: S178 FASTER Directive: recitals and Arts 4-9 (procedures), S242 comparison with US QI approach
- **A2.7 Income on funds, structured notes and cash** (45 min) — Account for fund distributions, accumulation units, and equalisation; Accrue conditional coupons and structured note income correctly; Handle cash interest and securities-lending fees
  - Example: A memory-coupon certificate pays EUR 3 per EUR 100 per quarter if its underlying is above 70%. When the underlying was below for Q1 and Q2 and recovers in Q3, the Q3 coupon is EUR 9, but accrual before the observation is uncertain, so many clients accrue only on observation.
  - Exercises (4): journal, mcq, numeric, table · Callbacks: P4.3, P6.3, A2.2
  - Sources: S036 fund and derivatives income sections, S043 investment company income, S032 certificate payoff basics, S072 income on structured instruments
- **A2.8 Income control, projections and the Ledger** (45 min) — Run an expected-vs-received income report and clear breaks; Chase unreceived income and raise claims; Produce a client-facing income statement that ties to the ledger
  - Example: Expected EUR 38,650 for the month, received EUR 35,800: the EUR 2,850 break is one late bond coupon (EUR 2,100) and a tax-rate mismatch (EUR 750).
  - Exercises (4): bucket, journal, spot, table · Callbacks: A2.1, A2.2, A2.3, A2.5, O4.6
  - Sources: S036 income controls, S058 income processing and reconciliation, S063 income collection chapter

Unit test: Accrual and journal entries for dividends and coupons, EIR schedule, withholding tax maths and reclaim decisions.

Jurisdictions: EU first: country WHT oddities (illustrative rates), FASTER. US: QI/NRA 30% and W-8BEN. UK: no WHT on most dividends, fund equalisation. CH: 35% Verrechnungssteuer refund mechanics. SG/HK: mostly no dividend withholding, brief note.

### A3 Gain accounting & tax lots · 6 h · track: ops · needs: A1, O8

_FIFO, average-cost and specific-lot methods, realised and unrealised gains, and why different lot methods produce different reported gains._

Covers (boss's list): gain accounting, all corporate actions  

- **A3.1 Cost basis, realised and unrealised gains** (45 min) — Compute realised and unrealised gains from cost, proceeds and fees; Decide whether transaction costs enter basis or reduce proceeds in a given regime; Explain trade-date recognition and the holding period
  - Example: Buy 1,000 shares at EUR 18.40 plus EUR 25 fee (basis EUR 18,425); sell at EUR 21.10 less EUR 25 fee (proceeds EUR 21,075): realised gain EUR 2,650. If the shares are still held and the price is EUR 20.00, unrealised gain is EUR 1,575.
  - Exercises (5): journal, mcq, numeric, timeline · Callbacks: A1.4, A2.2, F2.1
  - Sources: S036 chapters on gains and cost accounting for equities, S227 IRS Pub 551, basis of assets: cost basis, fees, S226 IRS Pub 550, sales and trades of investment property
- **A3.2 Lot methods: FIFO, LIFO, HIFO and average cost** (45 min) — Match sales to purchase lots under FIFO, LIFO, HIFO and weighted average; Show how method choice changes realised gain and remaining basis, while total gain over the life of the position is identical; Complete a lot table after multiple partial sales
  - Example: Lots: 500 at EUR 10, 500 at EUR 12, 800 at EUR 15. Sell 900 at EUR 16. FIFO gain = 500 x 6 + 400 x 4 = EUR 4,600; LIFO gain = 800 x 1 + 100 x 4 = EUR 1,200; average cost (EUR 12.78) gain = EUR 2,900.
  - Exercises (5): mcq, numeric, table · Callbacks: A3.1, Q1.1
  - Sources: S036 inventory-style cost methods for investments, S227 IRS Pub 551: identifying the shares sold, S043 lot accounting in investment companies
- **A3.3 Specific identification and national regimes** (45 min) — Explain specific-lot identification and its documentation conditions; Contrast US (FIFO default, specific ID, average for funds), UK (Section 104 pool, same-day and 30-day matching), Germany (FIFO per custody account), France (PMP weighted average) and Italy; Choose the correct method for a cross-border client
  - Example: A UK client buys 200 shares on Monday and sells 300 on Friday from a pool of 1,000 at average EUR 20. Same-day and 30-day matching rules come first, then the pool. The bank's FIFO report is useless for her tax return.
  - Exercises (4): match, mcq, numeric, table · Callbacks: A3.2, C1.2
  - Sources: S227 IRS Pub 551: US specific identification, S226 IRS Pub 550, S057 tax-related references where relevant
- **A3.4 Foreign-currency holdings and bonds: splitting the gain** (45 min) — Split the EUR gain on a USD or CHF holding into price effect and FX effect, with the two summing exactly to the total gain; Convert cost at trade-date FX and proceeds at sale-date FX, and state which rate each regime requires (trade date, settlement date, monthly average); Compute the gain on a foreign bond sale excluding accrued interest, and book the accrued as income
  - Example: EUR-based client buys 1,000 USD shares at USD 50.00 with EURUSD 1.1000: cost USD 50,000 = EUR 45,454.55 (Dr Securities 45,454.55 / Cr Cash 45,454.55). Sold at USD 55.00 with EURUSD 1.2000: proceeds USD 55,000 = EUR 45,833.33, EUR gain 378.78. Price effect at the buy rate = USD 5,000 / 1.10 = +4,545.45; FX effect on sale proceeds = 55,000 x (1/1.20 - 1/1.10) = -4,166.67; sum 378.78. Bond case: USD 100,000 nominal bought at 98.50 clean + USD 1,200 accrued, sold at 99.10 clean: gain USD 600 on clean price; the accrued is income, never cost or gain.
  - Exercises (6): journal, mcq, numeric, spot, table · Callbacks: A3.1, A2.2, F2.1
  - Sources: S036 foreign currency transactions and investments (equities chapters), S045 bond pricing, accrued interest and discount/premium sections, S226 IRS Pub 550: market discount bonds, OID, bond premium sections, S224 IFRS 9 B5.7.2-B5.7.2A: FX on monetary vs non-monetary items (read with IAS 21)
- **A3.5 Cost-basis adjustments for CAs I: splits, bonus issues, spin-offs** (45 min) — Recompute per-share cost and share count after a 2-for-1 split, a 1-for-5 bonus issue and a 1-for-10 reverse split while total cost stays unchanged; Allocate parent cost basis between parent and spin-off shares using relative market values on the first trading day; State which CAs carry over holding period and acquisition date and which change total basis (cash in lieu, taxed stock dividend)
  - Example: Client holds 1,000 ABC at EUR 60.00 (cost EUR 60,000). 2-for-1 split: 2,000 shares at EUR 30.00, total unchanged. Instead a 1-for-5 bonus issue: 200 new shares, 1,200 shares at EUR 50.00; selling 300 at EUR 62.00 later gives gain 300 x (62 - 50) = EUR 3,600 before commission. Spin-off: parent cost EUR 50,000; 1 spin-co share per 10 parent shares gives 100 spin-co shares; first-day values: parent 1,000 x EUR 80 = 80,000, spin-co 100 x EUR 20 = 2,000; spin-co basis = 50,000 x 2,000/82,000 = EUR 1,219.51, parent basis EUR 48,780.49. Bank side, the custody position only changes quantity: no GL entry beyond the memo accounts.
  - Exercises (6): cloze, mcq, numeric, order, table · Callbacks: O7.4, O7.5, A3.2
  - Sources: S227 IRS Pub 551: basis after stock splits, stock dividends and spin-offs (Stocks and Bonds section), S052 splits, bonus issues and spin-offs: entitlement calculation and processing, S036 corporate action entries for equity holdings, S323 stock dividends and splits: investment accounting
- **A3.6 Cost-basis adjustments for CAs II: rights, mergers, scrip** (45 min) — Compute TERP and the theoretical value of a right, then the new average cost after exercising N rights; Compare sale of rights with exercise and show the effect on cost basis and realised gain under each; Compute the basis of shares received in a share-for-share merger with a cash component and the gain recognised; Compute the cost of scrip shares received and the income recognised
  - Example: Client holds 1,000 DEF at EUR 40.00 cost (EUR 40,000). Rights issue 1-for-4 at EUR 30.00, cum price EUR 42.00: TERP = (4 x 42 + 30)/5 = 39.60, right = 2.40. Exercising 1,000 rights buys 250 shares for EUR 7,500 (Dr Securities 7,500 / Cr Cash 7,500): 1,250 shares, basis 47,500 = EUR 38.00 each. Alternative: sell 1,000 rights at 2.40 = EUR 2,400 (basis reduction or realised gain per regime). Merger: 1,000 target shares (basis 40,000) swapped for 600 acquirer shares worth EUR 46.00 plus EUR 3.00 cash per share; in a tax-deferred reorganisation recognised gain is capped by the cash, EUR 3,000. Scrip: 1 new share per 40 rights on 1,000 shares gives 25 shares at reference price EUR 32.00 = EUR 800 basis (and EUR 800 income in regimes treating scrip as a dividend).
  - Exercises (6): journal, mcq, numeric, table · Callbacks: O8.2, O8.3, O8.5, O8.7
  - Sources: S052 rights issues, mergers and scrip dividend processing, S036 accounting for rights and bonus entitlements, S227 IRS Pub 551: rights, reorganisations, stock dividends, S054 dividend/scrip equivalence argument (Miller-Modigliani)
- **A3.7 Wash sales and loss limitations** (45 min) — Decide whether a loss sale is a wash sale under the US 30-day before/after rule and compute the disallowed loss; Compute adjusted basis and holding period of the replacement shares after a full or partial wash sale; Apply the UK same-day / 30-day matching rule ahead of the s104 pool and contrast it with the US rule
  - Example: US taxpayer bought 100 XYZ at USD 50.00 (USD 5,000) and sells all 100 on 10 Nov at USD 42.00: loss USD 800. On 20 Nov he buys 100 XYZ at USD 43.00 (USD 4,300): within 30 days, so the USD 800 loss is disallowed and added to the replacement basis: 4,300 + 800 = USD 5,100 (51.00 per share), holding period includes the original. If only 60 shares are bought back, 60% = USD 480 is disallowed and USD 320 stays deductible. UK: same-day purchases and purchases in the following 30 days are matched first, before the s104 pool.
  - Exercises (6): mcq, numeric, spot, table, timeline · Callbacks: A3.2, A3.5
  - Sources: S226 IRS Pub 550: wash sales section, S227 IRS Pub 551: adjusted basis after disallowed loss, S323 wash sale rule and basis tracking in investment accounting
- **A3.8 Gain reports, lot-to-position reconciliation and tax documents** (45 min) — Reconcile lot-level quantity and cost to the position ledger and isolate a break of N shares to a single lot or CA; Produce a realised gain report for a period from sale records and lot relief, split by holding period or tax year as the regime requires; Name the data a bank supplies on year-end tax documents (EU annual tax certificate, US 1099-B, CRS/FATCA) and which fields come from the gain ledger
  - Example: Position ledger shows 1,800 Nestle shares; lots show 1,000 @ EUR 90.00, 500 @ EUR 95.00, 300 @ EUR 100.00 = 1,800 shares, cost EUR 167,500, so quantity ties. After a sale of 600 at EUR 105.00 under FIFO: lot 1 falls to 400, realised gain 600 x 15 = EUR 9,000 before fees. Under average cost (167,500/1,800 = 93.06) the gain would be EUR 7,166.67, which explains a reported-vs-accountant gap. A break appears when the ledger says 1,200 but lots total 1,205: a 5-share lot from fractions in a CA was not removed.
  - Exercises (6): bucket, mcq, numeric, order, spot, table · Callbacks: A3.2, O4.6
  - Sources: S226 IRS Pub 550: reporting of sales and gains, S239 CRS consolidated text: due diligence and reporting data elements, S242 FATCA and QI reporting overview, S058 position reconciliation process
- **A3.9 Tax treatment of corporate actions** (50 min) — Fill a per-event tax table (cash dividend, stock dividend, bonus issue, split, spin-off, rights, merger, return of capital) stating whether the event is taxable income, a non-taxable reorganisation or a basis adjustment; Compute net cash after withholding at the statutory and treaty rates and the amount reclaimable (EU, US, UK, CH illustrative cases); Identify a deemed distribution (e.g. scrip dividend taxed on the cash equivalent) and the income to report with no cash received; Reconcile the gross, withholding, credit and net lines of a client statement and isolate a tax-line error
  - Example: A Swiss-resident client receives a Swiss-company dividend of CHF 10,000 gross: 35% federal withholding CHF 3,500, net CHF 6,500, recoverable through the tax return. A US stock paying USD 1,000 to a non-US client is withheld at 30% (USD 300) with no treaty form, or 15% (USD 150) with a valid treaty form on file, so USD 150 is reclaimable. A scrip dividend of 100 new shares worth EUR 12 each is taxed as EUR 1,200 income although no cash is received, and EUR 1,200 becomes the new-share cost basis.
  - Exercises (5): bucket, mcq, numeric, spot, table · Callbacks: O7.3, A2.5, A2.6, A3.5, A3.6
  - Sources: S226 IRS Pub 550: dividends, return of capital, stock dividends, S227 IRS Pub 551: basis after splits, spin-offs, rights and reorganisations, S052 tax aspects of corporate actions, S242 US withholding, QI and treaty-rate documentation, S178 FASTER: relief at source and quick refund, S036 accounting for tax withheld and credits

Unit test: Lot relief under FIFO/LIFO/average/specific; CA basis adjustments; wash sales; FX split of gains.

Jurisdictions: EU first: Germany FIFO, France PMP, Italy regimes, UK s104 pooling. US: specific ID, wash sale. CH: private capital gains generally untaxed. SG/HK: no capital gains tax.

### A4 Valuation: NAV vs market price · 6 h · track: ops · needs: P4, P5, A2

_Fund valuation, pricing sources, stale and fair-value prices, NAV cut-off and error handling, and the checks run before a NAV file is released._

Covers (boss's list): NAV vs market price, PnL  
🎮 Minigame: **NAV Strike** — Compute NAV before cut-off with pricing exceptions, accruals, flows, swing and tolerance checks; difficulty scales with exceptions  

- **A4.1 What NAV is: assets, liabilities and units** (45 min) — Define NAV and NAV per share/unit and list what goes in each side; Explain valuation point, dealing day, forward vs historic pricing; Distinguish NAV, market price and offer/bid prices
  - Example: Fund holds securities EUR 120.4m, cash EUR 3.1m, accrued income EUR 0.6m, payables EUR 0.9m: NAV EUR 123.2m; 10.0m units give NAV/unit EUR 12.32.
  - Exercises (4): bucket, mcq, numeric, timeline · Callbacks: P4.4, P4.5, P4.6, A1.1
  - Sources: S043 net asset valuation chapters, S036 fund accounting, S179 UCITS Directive articles on valuation and pricing, S007 mutual fund pricing concepts
- **A4.2 NAV calculation walk-through** (45 min) — Build a daily NAV sheet from positions, prices, FX, accruals and capital activity; Reflect subscriptions/redemptions and units correctly; Reconcile NAV to prior day with an explain of movements
  - Example: Prior NAV EUR 100.0m; market move +EUR 0.8m; accrued income +EUR 0.05m; accrued fees -EUR 0.02m; subscriptions +EUR 2.0m; new NAV EUR 102.83m.
  - Exercises (5): numeric, spot, table · Callbacks: A4.1, A2.2, F2.1
  - Sources: S043 daily NAV calculation procedures, S036 valuation of investments
- **A4.3 Pricing sources, hierarchy and exceptions** (45 min) — Describe a pricing policy: sources, hierarchy, and tolerance checks; Handle stale, missing and disputed prices; Explain the role of a valuation committee
  - Example: A bond quoted at 98.20 for three days while the sector moved: apply a matrix price and document the override.
  - Exercises (4): bucket, mcq, numeric, order · Callbacks: A4.2, P3.7
  - Sources: S043 pricing policy, S222 IFRS 13: inputs and valuation techniques, S036 valuation sources
- **A4.4 Fund expenses: accruals, performance fees and distributions** (45 min) — Accrue management, administration and custody fees daily; Compute a performance fee with a high-water mark; Treat dividend distributions and the NAV drop at ex-date
  - Example: A fund with EUR 200m NAV and 1.20% annual management fee accrues 200m x 1.20% / 365 = EUR 6,575 a day.
  - Exercises (4): journal, mcq, numeric · Callbacks: A4.2, A2.1, P4.3
  - Sources: S043 fees and expenses, S007 costs in funds, S036 accrual
- **A4.5 Swing pricing and anti-dilution tools** (45 min) — Calculate a swung NAV for net flows above a threshold; Distinguish full from partial swing and swing pricing from anti-dilution levies; Explain how Directive (EU) 2024/927 makes liquidity tools available
  - Example: NAV EUR 100.00, net redemptions beyond threshold, swing factor 0.40%: swung NAV EUR 99.60 for all transactions that day.
  - Exercises (4): match, mcq, numeric · Callbacks: A4.2, A4.4
  - Sources: S177 Directive 2024/927 provisions on LMTs and ESMA guidelines, S182 AIFMD, S301 ESMA Q&As UCITS
- **A4.6 NAV vs market price: ETFs, closed-end funds and iNAV** (45 min) — Compute premium or discount of market price to NAV; Explain why arbitrage keeps ETF prices near NAV and when it fails; Explain closed-end fund discounts
  - Example: ETF NAV EUR 52.30, market EUR 52.65: premium +0.67%; an AP can create units and sell at market, narrowing the premium.
  - Exercises (4): mcq, numeric, table · Callbacks: P5.1, P5.3, P5.4
  - Sources: S034 ETF pricing and arbitrage chapters, S125 ETFs: Ben-David et al., S187 ESMA Guidelines on ETFs
- **A4.7 NAV errors and CSSF 24/856** (45 min) — Classify NAV errors and apply materiality thresholds; Compute compensation to investors and the fund; Explain reporting and governance duties under CSSF 24/856
  - Example: A bond fund's NAV was overstated by 0.62% for 3 days. Redeemers on those days were overpaid at the expense of remaining investors, so the shortfall is computed day by day from flows and made good by the responsible party; the CSSF circular's thresholds determine whether investors and the regulator must be notified.
  - Exercises (4): bucket, numeric, order · Callbacks: A4.2, A4.3
  - Sources: S170 CSSF Circular 24/856, S043 errors
- **A4.8 Fair-value hierarchy and IFRS 13** (45 min) — Classify instruments in Level 1, 2 or 3; Explain principal market and bid/ask rules; Understand disclosure and structured note valuation
  - Example: Bank-issued structured note priced by model with observable inputs: Level 2. An illiquid private bond with broker-only quote: Level 3.
  - Exercises (4): bucket, match, mcq, numeric · Callbacks: A4.3, P6.5
  - Sources: S222 IFRS 13 paras 61-90, S223 IFRS 7 disclosures, S160 Applying IFRS

Unit test: NAV computation, fees, swing, premium/discount, error materiality and IFRS 13 levels.

Jurisdictions: EU/Luxembourg first: UCITS, CSSF 24/856, Directive 2024/927. US: 40 Act forward pricing and rule 22c-1 mention. UK: dual vs single pricing. CH/SG/HK: brief note.

### A5 P&L · 5 h · track: ops · needs: A3, A4

_Daily P&L, attribution to price, carry, trading and fees, and the construction of an explanation of a day's result from position data._

Covers (boss's list): PnL  

- **A5.1 Realised, unrealised and total P&L** (50 min) — Compute realised, unrealised and total P&L for a position after a partial sale, and verify total P&L = proceeds + market value - cost; Separate trading P&L from income (coupons, dividends) and fees in a daily P&L line; Explain why the same total P&L can split differently into realised and unrealised under FIFO and average cost
  - Example: Client buys 1,000 XYZ at EUR 42.10 + EUR 12 commission: cost EUR 42,112 (Dr Securities 42,112 / Cr Cash 42,112). Later sells 400 at EUR 44.00 less EUR 10 commission: proceeds EUR 17,590, cost of 400 = 16,844.80 (average 42.112), realised +745.20. The remaining 600 cost 25,267.20 and are worth 600 x 44.50 = 26,700: unrealised +1,432.80. Total P&L = 745.20 + 1,432.80 = EUR 2,178.00 = 17,590 + 26,700 - 42,112. A dividend of EUR 0.50 on 600 shares adds EUR 300 income, reported separately.
  - Exercises (6): mcq, numeric, spot, table · Callbacks: A3.1, A2.2, A4.2
  - Sources: S036 profit and loss on investments: realised/unrealised, trading accounts, S086 return and P&L basics: contribution of price and income, S058 P&L production in the operations flow
- **A5.2 Trading P&L and positions** (50 min) — Compute a desk's trading P&L for the day from trades and opening/closing positions using average cost and FIFO, getting the same total; Separate position P&L from spread-capture P&L using mid price at execution; Roll positions overnight: opening position, trades, closing position, average cost and daily P&L
  - Example: Desk buys 500 at 20.00, buys 300 at 20.40, sells 600 at 20.70; close price 20.60. Average cost = (10,000 + 6,120)/800 = 20.15; realised on 600 = 600 x 0.55 = 330; unrealised on 200 = 200 x 0.45 = 90; total 420. FIFO: realised = 12,420 - (10,000 + 100 x 20.40) = 380; unrealised = 4,120 - 4,080 = 40; total 420 again. Cash check: -10,000 - 6,120 + 12,420 + 4,120 = 420. If the mid at the sale was 20.72, spread capture on 600 = 600 x (20.70 - 20.72) = -12 in a client-facing sale, and the remainder is inventory P&L.
  - Exercises (6): mcq, numeric, spot, table · Callbacks: A3.2, T4.1, A5.1
  - Sources: S036 trading accounts and position-keeping entries, S101 dealer economics: spread and inventory, S100 trade lifecycle: position and P&L view
- **A5.3 Marking to market, carry and financing** (50 min) — Compute daily mark-to-market P&L on a bond using clean price change, accrued carry and financing cost on the right day-count; Separate carry (coupon accrual minus funding) from price P&L and sum to total; Explain how stale or off-market prices distort MTM and escalate them to the pricing hierarchy
  - Example: Desk holds EUR 2,000,000 nominal of a 3% annual bond, funded in repo at 2.00% Act/360 on EUR 2,030,000. Clean price moves from 101.50 to 101.20: price P&L = 2,000,000 x -0.30% = -6,000. Accrual for one day (Act/Act) = 2,000,000 x 3%/365 = +164.38. Financing = 2,030,000 x 2.00%/360 = -112.78. Net MTM day = -6,000 + 164.38 - 112.78 = EUR -5,948.40. Ledger: Dr Trading P&L 6,000 / Cr Trading securities 6,000; Dr Accrued interest 164.38 / Cr Interest income 164.38; Dr Interest expense 112.78 / Cr Repo accrual 112.78.
  - Exercises (6): journal, mcq, numeric, spot, table · Callbacks: A5.1, A4.3, A2.2
  - Sources: S036 mark-to-market and revaluation, S086 valuation inputs for return calculation, S061 carry, financing and rolldown, S152 repo funding of bond positions
- **A5.4 FX P&L** (50 min) — Compute FX P&L on a foreign-currency position and on foreign cash balances from the change in the EUR rate; Split position P&L into local price P&L and FX translation P&L so that they sum to the total in base currency; Explain how a hedge (forward) changes the FX component and book the forward P&L
  - Example: EUR-based client holds 2,000 USD shares bought at USD 50.00 with EURUSD 1.10 (cost EUR 90,909.09). Now USD 52.00 and EURUSD 1.16: value USD 104,000 = EUR 89,655.17, total P&L = -1,253.92. Price P&L at original rate = 4,000/1.10 = +3,636.36; FX on current value = 104,000 x (1/1.16 - 1/1.10) = -4,890.28; sum = -1,253.92. A 3-month forward sale of USD 104,000 at 1.1660 locks in a EUR value of 89,193.25.
  - Exercises (6): journal, mcq, numeric, table · Callbacks: A3.4, A5.1, A5.3
  - Sources: S036 foreign currency position accounting, S086 currency return and local vs base, S015 international investing and currency risk
- **A5.5 P&L explain: price, carry, rate, FX, new trades** (50 min) — Build a P&L explain for a mixed book, attributing a daily loss to price (delta), rates (DV01), carry, FX and new trades, with an unexplained residual; Compute rate P&L as -DV01 x change in bp, and flag an unexplained residual above the 5% tolerance; Use the explain to answer the desk-head's question in a short narrative
  - Example: Friday P&L of the book is EUR -180,000. Explain: equity price moves -110,000; rates: DV01 EUR 18,000/bp with +3 bp = -54,000; carry +14,000; FX -21,000; new trades (day-one) +3,000. Explained = -168,000; unexplained = -12,000 = 6.7% of the total, above a 5% tolerance, so it is escalated: candidates are a stale curve point, a missed intraday trade, or an FX rate cut-off difference.
  - Exercises (5): mcq, numeric, table · Callbacks: F3.2, F3.3, Q3.3, A5.3
  - Sources: S086 attribution of P&L, S061 DV01 and rate sensitivity of bonds, S083 Greeks and P&L expansion (delta, theta)
- **A5.6 P&L reconciliation and controls** (50 min) — Reconcile front-office P&L to accounting P&L and classify each break (price, FX, accrual, trade capture, timing); Apply break thresholds and ageing rules, and decide when a break is escalated; Design the daily control set: price verification, FX source check, trade completeness and sign-off
  - Example: FO P&L is EUR -180,000, the ledger shows -176,400: break EUR 3,600. Drill-down: EUR 2,500 price source (FO used vendor mid, finance used official close), EUR 800 FX cut-off (WM 16:00 vs ECB 14:15), EUR 300 missing accrual on a new bond. After correction break = 0. The control log records owner, root cause and the fix for the next day.
  - Exercises (5): bucket, numeric, order, spot, table · Callbacks: A5.5, A4.3
  - Sources: S058 reconciliation and exception handling, S081 operational risk controls: reconciliation and sign-off, S225 COSO 2013: control activities

Unit test: Total P&L, positions, MTM, FX split, explain and reconciliation.

### A6 Performance measurement · 5 h · track: ops · needs: A5, F2

_Time-weighted and money-weighted returns, benchmark selection and the reasons two reports of the same portfolio show different returns._

Covers (boss's list): PnL  

- **A6.1 Returns with cash flows and Modified Dietz** (50 min) — Compute the Modified Dietz return from beginning value, ending value and dated external flows, using the correct day weights; Distinguish external flows from income and internal transfers, and state why the naive (end - start)/start return is wrong; State the approximation error of Dietz vs true TWR for a large mid-period flow
  - Example: Portfolio starts at EUR 100,000 and ends the 30-day month at 112,000 after a deposit of 10,000 on day 10. Weight = (30 - 10)/30 = 0.6667. Return = (112,000 - 100,000 - 10,000)/(100,000 + 10,000 x 0.6667) = 2,000/106,667 = 1.875%. The naive 12.0% ignores the deposit; the base-100,000-only 2.0% overstates because it ignores capital in the portfolio for 20 days.
  - Exercises (5): mcq, numeric, table · Callbacks: F1.5, F2.1, A5.1
  - Sources: S086 returns chapter: Dietz methods, S141 performance measurement: return calculation, S215 GIPS 2020 provision 2: calculation methodology
- **A6.2 Time-weighted vs money-weighted returns** (50 min) — Compute time-weighted return by chain-linking sub-period returns at each external flow and verify the result is independent of flow size; Compute money-weighted return (IRR) for a two-flow case and explain the TWR/MWR gap; Choose TWR or MWR for manager evaluation vs client experience
  - Example: Start EUR 100,000. Half-year 1: +10% to 110,000, then the client deposits 100,000 (210,000). Half-year 2: -5% to 199,500. TWR = 1.10 x 0.95 - 1 = +4.50%. MWR: solve 100,000 y^2 + 100,000 y = 199,500 with y = 1 + r per half-year: y = 0.99833 and the annual MWR = 0.99833^2 - 1 = -0.33%. Same account, +4.5% for the manager but a small loss for the client, because most capital arrived before the fall.
  - Exercises (6): mcq, numeric, spot, table · Callbacks: F1.5, A6.1, Q1.4
  - Sources: S086 TWR and MWR chapters, S215 GIPS 2020 TWR requirement, S079 portfolio return measurement background, S075 IRR and compounding
- **A6.3 Benchmarks, risk-adjusted measures and fees** (50 min) — Select an appropriate benchmark and test it against the SAMURAI-style criteria (specified in advance, appropriate, measurable, unambiguous, investable); Compute Sharpe, Treynor, information ratio, tracking error and Jensen's alpha from a return table; Compute gross-to-net returns after management, custody and performance fees
  - Example: Portfolio return 7.0% net, benchmark 5.5%, risk-free 2.0%, volatility 10%, tracking error 3%, beta 1.1. Sharpe = (7 - 2)/10 = 0.50; information ratio = (7 - 5.5)/3 = 0.50; Treynor = 5/1.1 = 4.55%; Jensen alpha = 7 - [2 + 1.1 x (5.5 - 2)] = 1.15%. Gross return before a 0.80% fee was 7.8%. Index families (MSCI, STOXX) define the equity benchmark; a custom 60/40 benchmark needs a stated rebalance rule.
  - Exercises (5): match, mcq, numeric · Callbacks: F2.2, F2.4, A6.2
  - Sources: S086 benchmarks and risk-adjusted measures, S236 MSCI index methodology: market cap weighting, free float, S282 STOXX rulebooks: index construction, S048 CAPM, beta and alpha
- **A6.4 Single-period attribution: Brinson** (50 min) — Compute allocation, selection and interaction effects for a two-sector portfolio using Brinson-Fachler or BHB and show they sum to active return; Interpret positive/negative effects in plain language for a client; State the difference between BHB and Brinson-Fachler allocation
  - Example: Equity: portfolio weight 70%, benchmark 60%, return 8% vs 6%. Bonds: weight 30% vs 40%, return 2% vs 3%. Portfolio 6.2%, benchmark 4.8%, active 1.4%. Allocation (Brinson-Fachler, vs total benchmark): equity 0.10 x (6 - 4.8) = 0.12, bonds -0.10 x (3 - 4.8) = 0.18, total 0.30%. Selection: 0.6 x (8 - 6) = 1.20, 0.4 x (2 - 3) = -0.40, total 0.80%. Interaction: 0.10 x 2 + (-0.10) x (-1) = 0.30%. Sum 0.30 + 0.80 + 0.30 = 1.40%.
  - Exercises (5): cloze, mcq, numeric, table · Callbacks: A6.3, F2.4
  - Sources: S119 Brinson, Hood, Beebower 1986: attribution framework, S086 attribution chapters, S140 history of attribution methods
- **A6.5 Multi-period, currency and fixed-income attribution** (50 min) — Link single-period attribution across two or more periods using a smoothing algorithm (Carino) so effects add to cumulative active return; Split a foreign-asset return into local and currency components and add the currency effect to attribution; Attribute a bond portfolio's return to yield curve, spread and selection effects
  - Example: Period 1: portfolio +3%, benchmark +2%; period 2: portfolio +2%, benchmark +1.5%. Cumulative portfolio = 5.06%, benchmark = 3.53%, active = 1.53%, whereas summing monthly active gives 1.5%: effects do not add without smoothing. Carino factors: period 1 ln(1.03/1.02)/0.01 = 0.976, period 2 ln(1.02/1.015)/0.005 = 0.983, total ln(1.0506/1.0353)/0.0153 = 0.959; scale each period's effects by (total factor / period factor). Currency: USD equity +6% local, USD -4% vs EUR: EUR return = 1.06 x 0.96 - 1 = +1.76%.
  - Exercises (5): match, mcq, numeric, table · Callbacks: A6.4, F3.2
  - Sources: S086 multi-period linking, currency attribution, S140 progress in attribution: linking, S061 yield curve decomposition of returns
- **A6.6 GIPS and client reporting** (50 min) — Build a composite from portfolios following GIPS inclusion rules and compute the asset-weighted composite return; List the mandatory GIPS 2020 disclosures and presentation items (annual returns, dispersion, three-year std dev, benchmark); Map GIPS reporting to MiFID II periodic statements (Delegated Reg. 2017/565 Art. 60) and the US marketing rule
  - Example: Composite of three discretionary portfolios: A EUR 40m at 6.0%, B 25m at 5.0%, C 35m at 7.0%. Asset-weighted = (2.40 + 1.25 + 2.45)/100 = 6.10%. A GIPS presentation shows annual composite returns, number of portfolios, dispersion, composite and benchmark three-year standard deviation, firm assets and the benchmark. A MiFID II periodic statement to the portfolio-management client shows holdings, costs and performance over the period.
  - Exercises (5): cloze, match, mcq, numeric, spot · Callbacks: A6.2, A6.3
  - Sources: S215 GIPS 2020 Standards for Firms: composites, presentation, S164 Art. 60: periodic information for portfolio management, S086 GIPS chapters

Unit test: Dietz, TWR/MWR, IR, Brinson, linking, GIPS.

Jurisdictions: GIPS global; EU periodic reporting under MiFID II; US Rule 206(4)-1 marketing rule mention.

### A7 Bank-side books · 6 h · track: ops · needs: A2, A3

_Bank-side ledgers for client securities, IFRS 9 classification and measurement, journal entries, and the nightly trial-balance reconciliation._

Covers (boss's list): chart of accounts, client accounts, secured/Lombard lending  
🎮 Minigame: **Ledger** — Bank-side stream: post trades, settlement, fees, CA and loan events to the right GL accounts and keep the trial balance tied  

- **A7.1 Chart of accounts for a securities bank** (45 min) — Assign a securities-bank event to the right GL account class (asset, liability, equity, income, expense, memo); Explain why client securities in custody sit in memo accounts, not on the bank's balance sheet, while client cash is a liability; Build a trial balance from account balances and prove debits = credits; Map ledger accounts to the segregation levels required for client assets (CSDR Art. 38, CASS)
  - Example: Skeleton chart: 1100 Cash at central bank, 1200 Nostro EUR, 1210 Nostro USD, 1300 Loans to clients, 1400 Trading securities (FVTPL), 1500 Accrued interest receivable, 2100 Client deposits, 2200 Due to banks, 2300 Settlement payables, 3000 Equity, 4100 Commission income, 4200 Interest income, 5100 Interest expense, 5200 Operating costs, 9100 Memo: client securities at custody. A client buying 1,000 XYZ for EUR 42,112 reduces 2100 by 42,112 and increases memo 9100 by 1,000 units; it creates no asset on the bank balance sheet. Trial balance: debits 12,345,000 = credits 12,345,000.
  - Exercises (5): bucket, match, mcq, order, table · Callbacks: A1.1, A1.3, O4.1
  - Sources: S036 chart of accounts for investment entities, S028 Securities Operations: account structure in operations (accounting chapters), S160 financial statement presentation under IFRS, S312 client assets regime CASS: segregation, S169 CSDR Art. 38: omnibus vs individual segregation
- **A7.2 Trading-book postings and trade vs settlement date accounting** (45 min) — Post a proprietary bond purchase at trade date and settle it two days later with the right accounts and amounts; Apply trade-date vs settlement-date accounting for regular-way purchases under IFRS 9 and explain the fair value gain between the two dates; Post a sale with realised gain, splitting clean price and accrued interest
  - Example: Bank buys EUR 5,000,000 nominal of a 2.5% bond at 99.80 clean, 60 days of accrued: 5,000,000 x 2.5% x 60/365 = 20,547.95. Clean 4,990,000; dirty 5,010,547.95. Trade date: Dr Trading securities 4,990,000 / Dr Accrued interest receivable 20,547.95 / Cr Settlement payable 5,010,547.95. T+2: Dr Settlement payable 5,010,547.95 / Cr Nostro 5,010,547.95. Next-day price 99.90: Dr Trading securities 5,000 / Cr Fair value gain 5,000. Sold later at 100.10 clean: proceeds 5,005,000, carrying 4,995,000, realised +10,000 (the accrued is closed separately).
  - Exercises (5): journal, mcq · Callbacks: A2.2, A3.1, O3.1
  - Sources: S224 IFRS 9 3.1.2 and B3.1.3-B3.1.6: regular-way purchases and sales, S036 trading entries, S072 regular-way trade date and settlement date accounting
- **A7.3 Client trades and settlement postings** (45 min) — Post a client trade for the bank acting as agent/custodian: trade-date block, commission income, settlement and the memo custody entry; Reconcile the client-side entry with the bank-side entries for the same trade; Handle a failed settlement: reverse or keep the pending entries and book a CSDR cash penalty
  - Example: Client buys 1,000 XYZ at EUR 42.10 + EUR 12 commission. Client side: Dr Securities 42,112 / Cr Cash 42,112. Bank side at trade date: Dr Client account 42,112 / Cr Settlement payable 42,100 / Cr Commission income 12; memo 9100 +1,000 XYZ (pending). Settlement: Dr Settlement payable 42,100 / Cr Nostro 42,100; memo becomes settled. If the sale-side counterparty fails, the position stays pending, the client cash stays blocked and a CSDR late-settlement cash penalty (daily, rate per the ESMA schedule) is charged to the failing party and passed on to the affected participant.
  - Exercises (6): journal, mcq, order, table · Callbacks: A7.2, O3.5, O1.1
  - Sources: S036 client entries, S058 settlement accounting and fails, S262 CSDR Arts 6-7: settlement discipline, cash penalties, S166 RTS 2018/1229: penalty mechanism
- **A7.4 Fees, commissions and custody income** (45 min) — Accrue and post a custody fee on average assets and a transaction commission with a minimum; Treat third-party payments (fund retrocessions) under MiFID II inducements rules for portfolio management vs advice; Post fee income, VAT where relevant and write-offs
  - Example: Custody fee 0.12% p.a. on average assets of EUR 2,400,000: quarterly 2,400,000 x 0.12%/4 = EUR 720; daily accrual 7.89. Post each day Dr Fee receivable 7.89 / Cr Fee income 7.89; at quarter end Dr Client account 720 / Cr Fee receivable. Commission 0.05% with minimum EUR 12 on EUR 42,100 = 21.05. Retrocession: fund trail 0.60% on EUR 1,000,000 = EUR 6,000/year; for a discretionary mandate it must be passed to the client: Dr Retrocession income 6,000 / Cr Client account 6,000.
  - Exercises (6): journal, mcq, numeric, table · Callbacks: T6.1, A4.4
  - Sources: S175 Delegated Directive 2017/593 Art. 11: inducements, S160 revenue recognition under IFRS 15, S036 fee entries, S164 Art. 50: costs and charges disclosure
- **A7.5 Corporate actions and income postings bank-side** (45 min) — Post income collected as custodian: gross dividend, tax at source, net cash credited to the client; Show which corporate actions need GL entries (cash events, fees, taxes) and which are memo-only (splits, bonus); Post a market claim or income reversal after a settlement fail
  - Example: Client holds 1,000 XYZ, gross dividend EUR 0.80, Italian substitute tax 26%: gross 800, tax 208, net 592. Client side: Dr Cash 592 / Dr Tax expense 208 / Cr Dividend income 800. Bank side: Dr Nostro 592 / Cr Client account 592. A 2-for-1 split changes the memo quantity 1,000 to 2,000: no GL entry. If the client sold the shares before ex-date but the trade settles after record date, the bank claims EUR 592 from the buyer's custodian: Dr Market claim receivable 592 / Cr Client account 592 and reverses on payment.
  - Exercises (5): journal, mcq, table · Callbacks: A2.3, O8.3, O4.6, A7.3, A3.5
  - Sources: S063 income collection and custody accounting, S036 dividend and CA entries, S052 market claims and entitlement, S178 FASTER: withholding relief at source
- **A7.6 Loans and Lombard credit: postings and impairment** (45 min) — Post a Lombard loan disbursement, daily interest accrual and repayment; Compute lending value, coverage ratio and the margin-call trigger for a collateral portfolio; Compute 12-month and lifetime expected credit loss from PD, LGD and EAD and post the impairment
  - Example: Lombard loan EUR 1,000,000 at Euribor 3M 2.10% + 1.25% = 3.35% Act/360. Disbursement: Dr Loans to clients 1,000,000 / Cr Client account 1,000,000. Monthly accrual: 1,000,000 x 3.35% x 30/360 = 2,791.67: Dr Interest receivable / Cr Interest income. Collateral: equities EUR 1,000,000 at 50% = 500,000, bonds EUR 800,000 at 80% = 640,000, lending value 1,140,000, coverage 114%. Stage 1 ECL: PD 0.30% x LGD 10% x EAD 1,000,000 = 300: Dr Impairment expense 300 / Cr Loss allowance 300. After a market drop and an unmet margin call: Stage 2, PD 4% x LGD 25% x 1,000,000 = 10,000.
  - Exercises (6): bucket, journal, mcq, numeric · Callbacks: A2.2, A7.1, A7.4
  - Sources: S224 IFRS 9 5.5: impairment, stages, S026 Lombard loan risks, S161 Basel CRE22: collateral haircuts, S029 securities-backed lending basics
- **A7.7 IFRS 9 classification and measurement** (45 min) — Classify a financial asset as amortised cost, FVOCI or FVTPL from its business model and SPPI result; Compute effective-interest income and amortised carrying amount for a discount bond; Post the fair value change of an FVOCI bond through OCI and explain recycling vs the irrevocable equity election
  - Example: Bank buys EUR 2,000,000 nominal of a 4% 5-year corporate bond at 98.00 (cost 1,960,000), held to collect, SPPI passes: amortised cost. EIR solves price 98 = sum of coupons and redemption = 4.455%. Year 1 interest income = 1,960,000 x 4.455% = 87,318; coupon cash 80,000; amortisation 7,318; carrying 1,967,318: Dr Nostro 80,000 / Dr Bond 7,318 / Cr Interest income 87,318. If instead held to collect and sell (FVOCI) and the price falls to 96.5, the fair value is 1,930,000 and OCI = -37,318; a convertible note with a leverage feature fails SPPI and goes to FVTPL.
  - Exercises (6): bucket, journal, match, mcq, numeric · Callbacks: P3.1, P6.3, A4.8, A2.4, A7.2
  - Sources: S224 IFRS 9 4.1.2, 4.1.2A, B4.1: classification; 5.4.1 EIR, S072 IFRS 9 classification and measurement worked cases, S160 Applying IFRS: financial instruments, S323 ASC 320 contrast: AFS/HTM vs IFRS 9
- **A7.8 Month-end close, reconciliations and the Ledger** (45 min) — Reconcile a nostro GL balance to the bank statement (camt.053/MT950) and classify unmatched items; Run the month-end close in order: cut-off, accruals, FX revaluation, reconciliations, review, lock; Post the FX revaluation of a foreign-currency nostro and reverse accruals; Age breaks and decide escalation
  - Example: GL 1200 Nostro EUR shows 15,420,311.45; statement shows 15,418,811.45: break 1,500.00 = unposted bank fee: Dr Operating costs 1,500 / Cr Nostro 1,500. FX revaluation of a USD 2,000,000 nostro: last month's rate 1.1500 gives EUR 1,739,130.43; month-end 1.1600 gives 1,724,137.93; loss 14,992.50: Dr FX revaluation loss 14,992.50 / Cr Nostro USD 14,992.50. Close order: cut-off, accruals, revaluation, reconciliation, adjustments, trial balance tie, sign-off.
  - Exercises (5): journal, order, spot, table · Callbacks: A7.1, A7.5, O4.6, A7.3, A7.6
  - Sources: S058 reconciliation and exceptions, S081 operational risk: reconciliation breaks, S036 period-end close, S016 ISO 20022 / MT950 account statement messages

Unit test: GL postings for trades, fees, CA, loans; IFRS 9 classification; reconciliation.

Jurisdictions: EU first: IFRS (EU-endorsed), client asset segregation rules; CH: Swiss GAAP banks note; US GAAP ASC 320 difference mentioned briefly.

**Checkpoint:** Level 5 boss quiz (40 min): mixed calculations (TERP and entitlements, EIR schedule, lot relief, NAV and swing, Modified Dietz/TWR, Brinson) plus journal and spot-the-error items drawn from O8, A2-A7. About 30% spaced-review items from L4 (O7, O4, F3).

Open questions: See syllabus/FACTS.md (originals in open-questions.txt)

## L6 — Wealth, Credit & Controls (~46 h)

This level covers client onboarding and classification, suitability and appropriateness, investment limits, trading restrictions and approvals. It also covers Lombard collateral valuation, margin calls, and the matrix maths used for portfolio risk.

### C2 Onboarding & KYC/AML · 6 h · track: ops · needs: C1

_Customer due diligence, beneficial ownership, risk rating, sanctions and PEP screening, and the documented onboarding decision._

Covers (boss's list): client onboarding  

- **C2.1 Why banks know their clients: the AML/CFT frame** (50 min) — Learner can name the three stages of money laundering and map them to securities-account behaviour; Learner can state the risk-based approach and the main EU/FATF building blocks
  - Example: A new client wires EUR 2m from a third-country account and asks to buy a 3-month zero-coupon note, then to redeem it early to a different bank: walk the three stages and mark the red flags.
  - Exercises (4): bucket, match, mcq, order · Callbacks: C1.3
  - Sources: S196 Recs 1, 10, 20, 24-25, S249 Ch. I-II overview, applicability date, S068 Ch. 1-3
- **C2.2 Customer due diligence (CDD): identify, verify, understand** (55 min) — Learner can list CDD elements for a natural person and a legal entity; Learner can identify the ultimate beneficial owner by applying the 25% + control test; Learner can state when CDD must be triggered
  - Example: Alpha Holdings S.A. is 40% Beta Trust, 35% Mr Rossi, 25% public float: compute indirect ownership and name the UBOs and the documents to collect.
  - Exercises (4): multi, numeric, spot, table · Callbacks: C1.2, C2.1
  - Sources: S249 CDD chapter, beneficial-owner provisions, S196 Rec 10, 24, S102 Sections 1-2
- **C2.3 Risk rating: simplified, standard and enhanced due diligence** (50 min) — Learner can score a client on geography, product, channel and client-type risk; Learner can choose SDD, CDD or EDD and the EDD measures that follow; Learner can explain the high-risk third countries mechanism
  - Example: A Swiss-resident entrepreneur with a Panama company and discretionary mandate scores 14 on a 20-point grid: assign tier, pick EDD measures, set refresh at 12 months.
  - Exercises (4): bucket, cloze, mcq, numeric · Callbacks: C2.2
  - Sources: S102 Sections 3-4 (risk-based approach), S196 Rec 1, 10, 19, S109 country risk chapter
- **C2.4 PEPs, source of wealth and source of funds** (50 min) — Learner can define PEP, family member and close associate; Learner can distinguish source of wealth from source of funds and propose evidence for each; Learner can describe what senior-management approval and extended monitoring involve
  - Example: A client is the brother-in-law of a sitting minister and wishes to fund a EUR 5m account from a business sale: define status, list SoW and SoF evidence, set approval path.
  - Exercises (4): match, mcq, multi, order · Callbacks: C2.3
  - Sources: S102 Sections on PEPs and private banking due diligence, S064 Ch. on client acceptance, S249 PEP provisions
- **C2.5 Sanctions screening and ongoing monitoring** (55 min) — Learner can explain list-based screening vs transaction monitoring; Learner can triage name-match alerts; Learner can describe EU, UN and OFAC regimes and the 50% ownership rules
  - Example: Screening hits 'Ivanov Petr' against a list entry: compare DOB, nationality and address, then decide discount, escalate or block.
  - Exercises (4): bucket, mcq, numeric, spot · Callbacks: C2.4
  - Sources: S103 Sections 1-5, S157 Five components, S068 Ch. on monitoring and reporting
- **C2.6 Client classification: retail, professional, eligible counterparty** (55 min) — Learner can classify a client under MiFID II Annex II; Learner can run opt-up and opt-down procedures and name lost protections; Learner can compare with US (accredited / QIB) and Swiss FinSA segments
  - Example: A family office has EUR 15m balance sheet, EUR 50m turnover and EUR 1.5m own funds: test large-undertaking criteria, then the elective-professional route.
  - Exercises (5): bucket, match, mcq, numeric, paper · Callbacks: C1.1, C2.2
  - Sources: S235 Art 4(1)(10)-(11), Art 30, Annex II; Del. Reg 2017/565 Arts 45-46, S203 FinSA Arts 4-5, S066 section on client categorisation
- **C2.7 LEI, tax residency (CRS/FATCA) and the onboarding file** (60 min) — Learner can state when an LEI is needed and what it contains; Learner can complete CRS/FATCA self-certification logic; Learner can assemble an end-to-end onboarding checklist
  - Example: Onboard a Luxembourg SPV: verify LEI validity and expiry, collect FATCA classification, flag the CRS controlling persons.
  - Exercises (4): mcq, order, spot, table · Callbacks: C2.2, C2.6
  - Sources: S239 Section on due diligence, self-certification, S242 FATCA overview, QI agreement, S258 Art 26 transaction reporting identifiers (LEI/CONCAT), S031 Ch. on onboarding

Unit test: Mixed test on UBO tracing, risk tiering, PEP/SoW evidence, sanctions triage and MiFID classification.

Jurisdictions: EU first (AMLD to AMLR 2024/1624 from 10 Jul 2027, AMLA, MiFID II classification); US CDD Rule and accredited investors, Swiss CDB/FinSA categories, UK MLR, SG/HK AML noted in one paragraph each.

### C3 Account Structures & Mandates in Depth · 4 h · track: ops · needs: C2, O4

_Trusts, holding companies, joint accounts, powers of attorney and discretionary mandates: who can instruct, who owns the assets, and what documents are required._

Covers (boss's list): client accounts  

- **C3.1 Individual, joint and minor accounts** (45 min) — Learner can compare joint account forms (and/or, joint-and-several, survivorship); Learner can describe rules for minors, usufruct and guardianship; Learner can name how death or incapacity changes access
  - Example: Two spouses hold EUR 400k of securities under a joint 'either-to-sign' account; one dies: who can instruct, what does the bank freeze, who gets the securities?
  - Exercises (4): bucket, match, mcq, spot · Callbacks: C1.1, C2.2
  - Sources: S031 Ch. on client accounts, S064 Ch. on client structures, S203 FinSA Art 4 client segments
- **C3.2 Corporate, fund and institutional accounts** (45 min) — Learner can list corporate account documents and authorised signatories; Learner can explain authority limits and signing matrices; Learner can classify institutional account types
  - Example: A GmbH has two managing directors with joint signing power up to EUR 1m: classify an EUR 1.5m order instructed by one director alone.
  - Exercises (4): match, mcq, spot, table · Callbacks: C3.1, C2.7
  - Sources: S064 Ch. on institutional/corporate private clients, S031 Ch. on structures, S235 Annex II
- **C3.3 Trusts, foundations and holding vehicles** (50 min) — Learner can identify parties to a trust and their KYC roles; Learner can compare trust, foundation and personal investment company; Learner can explain why civil-law banks treat trusts carefully (Hague recognition)
  - Example: A discretionary trust with an offshore trustee opens a securities account: list every KYC party and decide who may instruct.
  - Exercises (4): bucket, match, mcq, spot · Callbacks: C2.2, C3.2
  - Sources: S064 Ch. on trusts and structures, S241 Sections on structures and KYC, S102 Principles on beneficial ownership
- **C3.4 Nominee, omnibus and segregated accounts** (50 min) — Learner can contrast omnibus and individually segregated accounts under CSDR Art 38; Learner can explain nominee/street-name holding and the beneficial-owner transparency issue; Learner can state what client-asset segregation protects in insolvency
  - Example: A private bank holds 600 different clients' ABC shares in one omnibus account at the CSD: reconcile the omnibus total, and say what happens to client 17's shares if the bank fails.
  - Exercises (4): bucket, match, mcq, numeric · Callbacks: O4.3, C3.3
  - Sources: S169 Art 38, S035 entire page, S291 Arts 1-3, S214 Depotgesetz overview, S273 Rule 15c3-3 customer protection
- **C3.5 Powers of attorney and mandates in depth** (45 min) — Learner can distinguish limited, general and trading powers of attorney; Learner can draft investment-guideline parameters for a discretionary mandate; Learner can describe revocation, death and misuse safeguards
  - Example: A client grants an external asset manager a trading-only PoA with no withdrawal right: list what the bank must still check on each order.
  - Exercises (4): bucket, mcq, order, table · Callbacks: C1.2, C3.4
  - Sources: S283 Guidelines on portfolio management, S097 Ch. on mandates and duties, S096 Ch. on investment policy statement
- **C3.6 Account lifecycle: changes, refresh, dormancy and closure** (45 min) — Process a static-data or mandate change with authentication, four-eyes approval and effective date; Schedule periodic KYC refresh by risk rating and identify trigger events that force an earlier review; Handle dormant accounts: flagging, contact attempts, restrictions and escheat or unclaimed-asset rules; Close an account correctly: holdings transferred or sold, pending events and fees settled, final statement, archive; State the audit-trail and retention rules for account records
  - Example: A private client with a high risk rating is due for KYC refresh annually. The last review was 14 months ago and the client has just moved country, which is a trigger event. The bank requests new proof of address and tax residency and updates CRS data. After the client asks to close, the file shows 300 shares, a pending dividend on 15 May and a custody fee: the account stays open until the dividend pays and the position is transferred out or sold, the fee is settled, and the final statement is issued; records are retained 5 years from closure.
  - Exercises (5): bucket, mcq, numeric, order, spot · Callbacks: C1.2, C2.2, C2.3, C2.7, C3.5
  - Sources: S249 AMLR: ongoing monitoring and record keeping, S196 FATF Recommendations: ongoing due diligence, S164 Arts 72-76: record keeping, S318 FINRA Rule 4511 books and records retention, S063 custody account closure and pending events

Unit test: Applied cases on signing authority, UBO in structures, segregation levels and PoA scope.

Jurisdictions: EU: CSDR Art 38, MiFID safeguarding, civil-law trust recognition and usufruct oddities (FR/IT), German Depotgesetz; US street name and 15c3-3; UK CASS nominee; Swiss foundations and SBA guidelines.

### C4 Suitability & Appropriateness · 6 h · track: ops · needs: C2, P6

_MiFID II suitability and appropriateness tests, client classification, product complexity and target market, and the documented recommendation._

Covers (boss's list): suitability  
🎮 Minigame: **Gatekeeper** — approve or reject advisory orders against client profile and target market, with explained reasons  

- **C4.1 The investor-protection ladder** (45 min) — Learner can place each service (execution-only, advice, discretionary) on the protection ladder; Learner can state which test applies to which service and who owes it
  - Example: A client phones to buy a barrier reverse convertible with no advice: decide appropriateness test vs execution-only and what warning applies if knowledge is lacking.
  - Exercises (4): bucket, cloze, mcq, order · Callbacks: C1.2, P6.1
  - Sources: S065 Sections on appropriateness and execution-only, S183 Arts 24-25, S164 Arts 54-57
- **C4.2 Suitability assessment: client information and profiling** (55 min) — Learner can list the five information areas of a suitability profile; Learner can compute loss-bearing capacity and map to risk bands; Learner can handle information reliability and updating
  - Example: A 52-year-old with EUR 800k liquid assets, EUR 30k annual surplus and a 7-year horizon says 'moderate': compute a loss-bearing capacity and risk band, spot inconsistent answers.
  - Exercises (4): bucket, mcq, numeric, spot · Callbacks: C4.1, C2.6
  - Sources: S066 Sections 5-6 on information collection, S096 Ch. on client profile, S044 Ch. on risk profiling
- **C4.3 Suitability assessment: matching products and the suitability report** (55 min) — Learner can run the suitability test on a portfolio level; Learner can justify a switch under the costs-and-benefits requirement; Learner can write the suitability statement contents
  - Example: Switching a client from a UCITS fund to an ELN that costs 1.2% more: test whether benefits justify costs and what must be in the report.
  - Exercises (5): mcq, numeric, order, paper, spot · Callbacks: C4.2, F2.1
  - Sources: S066 Sections 7-9, S164 Art 54, S124 Ch. on conduct of business
- **C4.4 Product governance and target markets** (55 min) — Learner can identify manufacturer vs distributor duties; Learner can derive a target market with five criteria and a negative target market; Learner can run a distributor check against the target market
  - Example: An issuer flags a capital-protected note for 'retail with basic knowledge, long horizon'; a client with a 1-year horizon asks for it: decide, document, escalate.
  - Exercises (4): bucket, match, mcq, spot · Callbacks: P6.4, C4.3
  - Sources: S067 Sections on manufacturers and distributors, S183 Arts 16(3), 24(2), S252 KID
- **C4.5 Complex products, costs and disclosures** (50 min) — Learner can state the MiFID complexity criteria; Learner can read ex-ante costs and charges and detect gaps; Learner can explain the effect of the Retail Investment Strategy (pending)
  - Example: A KID shows RIY 1.8% but the bank also charges 0.5% custody: compose the total costs the client must see.
  - Exercises (4): mcq, multi, numeric, spot · Callbacks: T6.1, P6.4
  - Sources: S252 KID RTS, S267 summary of provisional agreement, S164 Art 50, S278 FAQs complex products
- **C4.6 Reg BI, FinSA, UK and Asia comparison** (60 min) — Learner can compare the Reg BI four obligations with the MiFID suitability model; Learner can map FinSA, SFC and MAS client protection; Learner can pick the right regime in a cross-border scenario
  - Example: A Singapore client of a Swiss bank buys a Euro-denominated note: choose the governing rule set and list the conduct duties.
  - Exercises (4): bucket, match, mcq, table · Callbacks: C4.1, C4.4
  - Sources: S271 Reg BI, S317 FINRA Rule 2111, S203 FinSA/FinSO, S197 PRIN 2A, S313 COBS 9, S275 FAA-N16, S277 para 5.2, 5.5, S234 Fair Dealing guideline
- **C4.7 Suitability in practice: reviews, complaints and remediation** (45 min) — Learner can identify typical findings in file reviews; Learner can compute remediation exposure; Learner can describe recordkeeping obligations
  - Example: A review samples 40 files and finds 6 outside tolerance: derive breach rate and the remediation action.
  - Exercises (4): mcq, numeric, order, spot · Callbacks: C4.3, C4.6
  - Sources: S066 Section on arrangements, S318 Rule 4511, S164 Arts 72-76

Unit test: Case set covering test selection, profiling, target-market checks, costs and cross-regime comparisons.

Jurisdictions: EU deepest (MiFID II, ESMA guidelines, PRIIPs); US Reg BI/FINRA 2111/2090; UK COBS 9 and Consumer Duty; Swiss FinSA; SG FAA-N16 and HK SFC sidebars.

### C5 Investment Limits & Mandate Compliance · 5 h · track: ops · needs: C4, P4

_Investment limits in mandates, concentration and rating restrictions, breach detection, and the escalation and remediation steps._

Covers (boss's list): limits by issuer/group  
🎮 Minigame: **Gatekeeper** — limit-check orders against issuer, group and UCITS rules  

- **C5.1 What an investment limit is: types and layers** (45 min) — Learner can classify limits by source: regulatory, mandate, internal policy; Learner can distinguish hard, soft and warning thresholds; Learner can set and test country, sector and rating limits (e.g. maximum share per country, maximum share per sector, minimum credit rating) against a portfolio
  - Example: A discretionary mandate caps single issuers at 10%; the house caps at 8%; the regulator caps funds at 10%: which binds?
  - Exercises (4): bucket, match, mcq, numeric · Callbacks: C4.3
  - Sources: S133 Ch. on constraints, S283 SBA guidelines on limits
- **C5.2 Issuer and group limits and look-through** (55 min) — Learner can aggregate exposures to one issuer across instruments; Learner can identify group of connected issuers; Learner can handle look-through for funds and structured notes
  - Example: A portfolio holds a Bank X bond (4%), Bank X ELN (3%) and a fund with 2% in Bank X shares: aggregate and test a 8% limit.
  - Exercises (4): mcq, numeric, spot, table · Callbacks: C5.1, P6.3
  - Sources: S181 Art 52 and 54, S255 Arts 4(1)(39), 390-392, S095 Ch. on concentration risk
- **C5.3 UCITS 5/10/40 and fund investment restrictions** (55 min) — Learner can apply the UCITS Art 52 limits; Learner can apply exceptions (sovereign, covered bonds) and group limits; Learner can compute global exposure for derivatives
  - Example: A UCITS holds nine positions above 5% totalling 47%: identify the breach and the fix.
  - Exercises (4): mcq, numeric, spot, table · Callbacks: P4.1, C5.2
  - Sources: S181 Arts 50-57, S179 UCITS Directive, S301 Q&A on limits
- **C5.4 Bank-level large exposures (CRR) and Lombard concentration** (50 min) — Learner can compute a large exposure and test the 25% cap; Learner can explain connected-client groups and exemptions; Learner can link to Lombard concentration
  - Example: Bank with Tier 1 of EUR 2bn lends EUR 600m to a group: test.
  - Exercises (4): bucket, match, mcq, numeric · Callbacks: C5.2
  - Sources: S255 Arts 387-403, S161 CRE22, S095 Ch. on credit concentration
- **C5.5 Pre-trade vs post-trade compliance, breaches and cure** (55 min) — Learner can place checks pre-trade, intraday and post-trade; Learner can handle passive breaches and cure periods; Learner can document a breach and NAV-error link
  - Example: A price move lifts a position from 9.6% to 10.3% overnight: classify, remediate and record.
  - Exercises (4): mcq, numeric, order, spot · Callbacks: C5.3, A4.5
  - Sources: S170 Sections on breach, S325 Release 34-63241, S181 Art 57
- **C5.6 Mandate compliance monitoring cycle and reporting** (40 min) — Learner can design a compliance dashboard; Learner can read exception reports
  - Example: A nightly run over 300 mandates returns 14 exceptions: 9 are price-driven passive breaches, 3 are stale-rating data errors, 2 are genuine active breaches from a same-day trade; triage and assign owners.
  - Exercises (4): bucket, mcq, spot, table · Callbacks: C5.5
  - Sources: S133 Ch. on monitoring, S283 guidelines

Unit test: Limit calculations on issuer aggregation, UCITS 5/10/40, CRR large exposures and breach handling.

Jurisdictions: EU: UCITS Art 52, CRR large exposures, CSSF 24/856; US 40-Act diversification and RIC tests; Swiss SBA guidelines.

### C6 Trading Restrictions · 5 h · track: ops · needs: C2, T2

_Watch and restricted lists, insider information and MAR obligations, pre-trade blocking, and the handling of orders already in flight._

Covers (boss's list): trading restrictions  
🎮 Minigame: **Gatekeeper** — block or release orders under restricted lists, PAD and short-sale rules  

- **C6.1 The restriction landscape** (40 min) — Learner can name the four sources of a trading restriction (law, firm policy, client instruction, instrument/market) and give one example each; Learner can distinguish restricted list, watch list and grey list by who sees it, what it blocks and when an instrument moves between them; Learner can decide block / hold-for-review / release for an order given the list status and the desk (advisory, trading, asset management); Learner can run the restricted-list, watch-list and blocked-security check at order entry and decide block, hold or release, logging the attempt
  - Example: An order arrives for 20,000 shares of Alfa SpA (about EUR 310k at EUR 15.50), which sits on the restricted list because the bank advises on a pending bid: the order system blocks it, logs the attempt with timestamp and user, alerts compliance and gives the client a neutral message ('unable to accept'). The same order on the watch list would be accepted but flagged for surveillance.
  - Exercises (5): bucket, cloze, match, mcq, spot · Callbacks: T2.1
  - Sources: S057 Ch. on market abuse overview, S256 Recitals 1-2, Art. 1, S284 FinSA/FMIA conduct overview, restriction-related provisions
- **C6.2 Market abuse: inside information and MAR** (55 min) — Learner can test a fact pattern against the four limbs of inside information in MAR Art. 7 (precise, non-public, relates to issuer/instrument, price-sensitive); Learner can classify an action as insider dealing (Art. 8), unlawful disclosure (Art. 10), manipulation (Art. 12) or legitimate behaviour (Art. 9); Learner can order the steps of a market sounding under Art. 11, including the soundee's consent and records; Learner can compute the 30-day closed period for PDMR transactions from a results date
  - Example: A treasury analyst hears on 3 March that Beta plc will launch a EUR 2bn bid at a 30% premium on 12 March: the fact is precise, non-public and price-sensitive, so trading Beta shares, advising others to do so or passing the news beyond need-to-know is prohibited. If Beta reports half-year results on 28 July, its PDMRs may not trade from 28 June to 28 July (30 calendar days before).
  - Exercises (5): bucket, mcq, numeric, order, timeline · Callbacks: C6.1
  - Sources: S256 Arts. 7-12, 14, 17, 19, S257 ESMA Q&A: soundings, PDMR transactions, S302 Q&A sections on inside information and soundings
- **C6.3 Insider lists and information barriers** (50 min) — Learner can complete an insider list entry with the mandatory fields (identity, reason for inclusion, date and time of access, date of update); Learner can state who must keep a list (issuers and persons acting on their behalf) and the 5-year retention period after drawing up or updating; Learner can sequence a wall-crossing and name the controls that follow it (restricted list, PA block, surveillance)
  - Example: A banker is wall-crossed at 09:10 on 14 May for a EUR 300m bond mandate: compliance records name, ID, reason ('financing of Gamma SA, mandate'), access date and time 14/05 09:10, adds the issuer to the restricted list and blocks the banker's personal-account trades in Gamma. The entry is kept for 5 years from the last update.
  - Exercises (5): mcq, numeric, order, spot, table · Callbacks: C6.2, C6.1
  - Sources: S256 Arts. 9, 18, S257 Q&A on insider lists, S302 Q&A on insider lists
- **C6.4 Personal account dealing and conflicts** (50 min) — Learner can apply a PAD policy to a request: pre-clearance, holding period, blackout, restricted list check; Learner can identify reportable personal transactions (own account, connected persons; discretionary accounts excluded); Learner can compute the earliest permitted sale date from a purchase date and holding period; Learner can recognise front running and conflict patterns in a trade log
  - Example: An employee wants to sell a stock bought 20 days ago while the policy needs a 30-day holding period: reject, record the request and wait until day 30. A separate EUR 4,000 sale in a stock on which the bank has an advisory mandate needs pre-clearance, valid for the same trading day only.
  - Exercises (5): bucket, mcq, numeric, spot, timeline · Callbacks: C6.3, C6.2
  - Sources: S171 Arts. 28-29, S311 Market Watch 62, S183 Art. 16(2)
- **C6.5 Short-selling rules** (50 min) — Learner can compute a net short position as a % of issued share capital and compare it with the notification and disclosure thresholds; Learner can state which SSR prohibition applies to shares (Art. 12), sovereign debt (Art. 13) and sovereign CDS (Art. 14); Learner can decide whether a short sale is covered under the locate rules; Learner can contrast EU SSR with US Reg SHO rules 203, 204 and 201
  - Example: A fund is short 1.8m shares of a company with 720m shares in issue and holds no related long position: net short is 1.8/720 = 0.25%, above the 0.2% threshold for private notification to the regulator (by 15:30 on the next trading day) but below the 0.5% public-disclosure level. Adding 0.3m shares takes it to 0.2917%, so it only has to notify again on crossing the next 0.1% step (0.3%).
  - Exercises (5): bucket, match, mcq, numeric, timeline · Callbacks: O6.1, C6.2
  - Sources: S253 Arts. 5-14, S304 Q&A on net short calculation, S254 Arts. 5-14
- **C6.6 Sanctions as trading restrictions and dealing controls** (50 min) — Learner can run a sanctions pre-trade check: person, ownership/control, instrument, counterparty, CSD/custody; Learner can apply the EU ownership/control test and the OFAC 50% aggregate rule to a shareholding table; Learner can decide freeze, reject, hold for licence or accept for a given case; Learner can sequence the escalation and reporting of a sanctions hit
  - Example: A client wants to sell bonds of a Russian issuer under EU restrictions: check that the instrument is not under a transaction ban, that neither client nor buyer is listed or owned/controlled by listed persons, whether the CSD can settle, and whether a licence or wind-down exemption exists before accepting. If Entity X is 30% owned by listed person A and 25% by listed person B, OFAC aggregates to 55% and treats X as blocked; the EU test would look at majority ownership or control by listed persons instead.
  - Exercises (5): bucket, mcq, numeric, order, spot · Callbacks: C2.5, C6.1
  - Sources: S103 Sanctions screening guidance, S157 Framework: 5 components, S284 FinSA/FMIA overview, Swiss sanctions context

Unit test: Case-based test on MAR, insider lists, PAD, SSR and sanctions.

Jurisdictions: EU MAR/SSR; US Reg SHO, Reg FD; UK Market Watch; Swiss FinMIA notes.

### C7 Approvals & Controls · 4 h · track: ops · needs: C5, C6

_Four-eyes approval, override procedures, audit trails, and the evidence an auditor expects for an exception._

Covers (boss's list): approvals  
🎮 Minigame: **Gatekeeper** — four-eyes queue with mixed escalations and audit questions  

- **C7.1 Four-eyes and maker-checker** (45 min) — Learner can design a maker-checker flow for an order, a static-data change and a payment, naming maker, checker and the system block; Learner can detect a segregation-of-duties conflict in a user-rights table; Learner can decide which items need approval from a threshold table
  - Example: A EUR 5m order from a junior trader exceeds the EUR 1m single-approver limit: the system routes it to a senior approver who cannot be the maker and blocks release until both IDs are logged. A user who can both create and release payments breaches SoD, so one right is removed or a compensating review is documented.
  - Exercises (5): bucket, mcq, numeric, order, spot · Callbacks: C5.1
  - Sources: S225 Control activities principles 10-12, S081 Ch. on controls, S288 Segregation of roles
- **C7.2 Order-approval workflows and exceptions** (50 min) — Learner can read an approval matrix and route an order or exception to the correct approver; Learner can apply override limits and required evidence (written reason, copy to compliance, expiry); Learner can judge an override log for weak reasons, stale approvals and repeat users; Learner can compute how far an exception exceeds a limit and which tier it falls into
  - Example: A client order breaches the 10% issuer limit by 0.4 points (10.4% of the portfolio): the head of desk may override up to 0.5 points with a written reason, compliance receives a copy, the override expires in 5 business days and is reviewed at month-end. A 0.7-point breach would go to the chief risk officer.
  - Exercises (5): mcq, numeric, order, spot, table · Callbacks: C7.1, C5.5, C6.4
  - Sources: S081 Ch. on workflows, S325 Rule 15c3-5 risk controls, S314 FINRA RN 15-09 controls
- **C7.3 Three lines model and governance** (45 min) — Learner can assign duties to the first, second and third line from the IIA 2020 model; Learner can trace a control failure to the line that owns each part of the response; Learner can state reporting lines of risk, compliance and internal audit to the board
  - Example: A mis-booked allocation goes unnoticed for three days: the trader and operations (line 1) own the daily reconciliation control, compliance and risk (line 2) own the framework and monitor KRIs, and internal audit (line 3) later reports on both to the board's audit committee.
  - Exercises (4): bucket, cloze, match, mcq · Callbacks: C7.1, C7.2
  - Sources: S288 entire, S225 Principles 1-5, S081 Ch. on governance
- **C7.4 Operational risk, incidents and resilience** (50 min) — Learner can classify an event into the seven Basel operational-risk event types; Learner can compute gross loss, recoveries and net loss and flag reportable events; Learner can order the steps of incident handling and reporting; Learner can distinguish RCSA, KRI and loss data and say what each answers
  - Example: A mis-booked allocation causes a EUR 120k gross loss and EUR 45k is recovered from the counterparty: net loss is EUR 75k, event type 'execution, delivery and process management', and it is entered in the loss database within the policy deadline. A 4-hour outage of the order system is an ICT incident reported under the bank's DORA classification.
  - Exercises (5): bucket, match, mcq, numeric, order · Callbacks: C7.3, O3.5
  - Sources: S081 Ch. on frameworks, S205 Circular 2023/1, S138 Ch. 1-3, S307 ICT risk guidelines
- **C7.5 Records, audit trail and evidence** (35 min) — Learner can state the record-keeping and retention rules for orders, communications and approvals; Learner can retrieve the evidence set for an approval from an audit trail; Learner can detect a gap in a trail (missing timestamp, user, reason)
  - Example: An auditor asks for evidence behind an order approved on 14 March: retrieve the ticket, approver ID, timestamp, the recorded call and the override reason, all still inside the 5-year retention (so available until at least 14 March five years later).
  - Exercises (4): mcq, numeric, order, spot · Callbacks: C7.2, C7.4
  - Sources: S318 Rule 4511, S164 Arts. 72-76, S183 Art. 16(6)-(7)
- **C7.6 New product approval and delegated authorities** (45 min) — Walk an instrument through a new product approval process: proposal, product committee, target market, risk assessment, operational readiness, sign-off; Read a delegation-of-authority matrix and decide which level may approve a trading limit, credit line, limit exception or fee exception; Check that a product's target market and distribution strategy follow the ESMA product governance guidelines for both manufacturer and distributor; Maintain the approval record and run the annual recertification, including expiry and withdrawal
  - Example: A bank wants to distribute a new EU structured note: the proposer files a product paper; risk rates it, operations confirms the system and settlement set-up is ready, and compliance sets the target market (retail with advice only, not execution-only). The committee approves for 12 months with a EUR 20m distribution cap. In the illustrative matrix a fee discount up to 10% is approved by the desk head, up to 30% by the business head, and above 30% by the business head plus Compliance. A 25% discount on a EUR 50,000 fee therefore needs the business head.
  - Exercises (5): bucket, mcq, order, spot, table · Callbacks: C4.4, C5.1, C7.1, C7.2, C7.5
  - Sources: S067 ESMA product governance guidelines: manufacturer and distributor, S183 MiFID II Arts 16(3) and 24(2): product governance, S081 approval governance and operational readiness, S225 COSO control activities: authorisation, S288 three lines model: ownership of approvals

Unit test: Workflow design, three lines assignment and operational-risk classification.

Jurisdictions: EU DORA and MiFID records; US 15c3-5; Swiss FINMA circular.

### K1 Lombard Lending · 5 h · track: ops · needs: C3, A4

_Lombard loans, lending values and haircuts by asset class, concentration treatment, and the credit decision on a pledged portfolio._

Covers (boss's list): secured/Lombard lending  

- **K1.1 What a Lombard loan is** (45 min) — Learner can describe a Lombard loan: borrower, pledged portfolio, credit line, bank rights; Learner can compute LTV (loan / market value) and lending-value utilisation (loan / lending value); Learner can compute headroom from a lending value; Learner can name three use cases and three client risks
  - Example: A client pledges a EUR 2m portfolio for a EUR 800k credit line: LTV is 800/2,000 = 40%. If the portfolio's lending value is 60% of market value (EUR 1.2m), headroom is 1,200 - 800 = EUR 400k and utilisation is 66.7%. The bank cannot lend more than the lending value, however low the LTV looks.
  - Exercises (5): cloze, match, mcq, numeric · Callbacks: C3.1
  - Sources: S029 entire, S026 entire, S031 credit chapter
- **K1.2 Lending values and haircuts by asset class** (55 min) — Learner can assign lending values to assets by class using a haircut table (lending value = 1 - haircut); Learner can compute total lending value, headroom and utilisation for a mixed pool; Learner can decide whether an asset is eligible at all (0% lending value); Learner can rank two assets by haircut and explain why (liquidity, volatility, issuer, FX)
  - Example: Pool of EUR 500k: EUR 280k IG bonds at 70% = 196k; EUR 170k blue-chip equities at 50% = 85k; EUR 50k unlisted fund units at 0% = 0. Lending value 281k. With EUR 280k drawn, headroom is only EUR 1k and utilisation 99.6%: a small fall triggers a call. Reference for a benchmark: Basel CRE22 uses 15% for main-index equities and 0.5/2/4% for AAA-AA sovereigns by maturity bucket.
  - Exercises (5): bucket, mcq, numeric, table · Callbacks: K1.1, A4.2
  - Sources: S161 CRE22 supervisory haircuts, S309 explainer, S320 Guideline schedule, S026 lending value section
- **K1.3 Concentration, liquidity and stress** (50 min) — Learner can apply a concentration add-on to a single-name holding and recompute lending value; Learner can stress a pool by a market shock and compute stressed lending value and utilisation; Learner can spot wrong-way risk (pledged shares of the borrower's own company or a related issuer); Learner can identify weaknesses in a lending policy document
  - Example: A EUR 1m pool: EUR 600k in one blue-chip stock (50% lending value less a 15-point add-on = 35% -> 210k) and EUR 400k IG bonds at 70% (280k): lending value 490k. With a EUR 400k loan, utilisation is 81.6%. A -35% shock on the stock cuts it to 390k and its lending value to 136.5k; total lending value 416.5k, utilisation 96.0%, and LTV on the stressed market value (790k) is 50.6%.
  - Exercises (5): bucket, mcq, numeric, spot · Callbacks: K1.2, C5.2
  - Sources: S131 entire, S095 Ch. on credit risk, S255 Arts. 387-403 large exposures
- **K1.4 Pledge and collateral agreements** (55 min) — Learner can identify the four core clauses of a pledge agreement (pledged assets, set-off, realisation right, notice); Learner can distinguish pledge from title transfer and explain rehypothecation; Learner can order the enforcement steps and compute the net proceeds after costs; Learner can judge whether a given pledge is valid under a described case
  - Example: On default with EUR 800k principal, EUR 12k accrued interest and EUR 3k costs, the bank sells pledged securities of EUR 900k market value at a 2% realisation shortfall (EUR 882k): after EUR 815k of claims, EUR 67k surplus goes back to the client. If the agreement requires 3 business days' notice before realisation, the sale cannot start earlier unless the agreement allows immediate sale.
  - Exercises (5): match, mcq, numeric, order, spot · Callbacks: C3.4, K1.1
  - Sources: S150 Ch. on collateral, S284 FinSA/FinIA overview, S026 risk
- **K1.5 Structured products as Lombard collateral** (45 min) — Learner can compute the lending value of a structured product from bid price and a haircut by product type; Learner can apply barrier-proximity and issuer-concentration rules; Learner can classify product features by main collateral risk (issuer, barrier, liquidity, early redemption); Learner can find the error in a collateral sheet that values notes at nominal
  - Example: A EUR 300k nominal barrier reverse convertible quoted at 96.0 bid has market value EUR 288k; its lending value is 30%, i.e. EUR 86.4k. When the underlying trades 5% above the barrier, policy cuts lending value to 0% for notes within 10% of the barrier: collateral falls by EUR 86.4k and a pool drawn near its limit is short by that amount.
  - Exercises (5): bucket, mcq, numeric, spot · Callbacks: P6.4, K1.2
  - Sources: S026 entire, S131 entire, S194 categories
- **K1.6 Pricing, covenants and reviews** (35 min) — Learner can compute interest and fees with an Act/360 day count; Learner can test a facility against covenants and review dates; Learner can compute a Basel CRE22 comprehensive-approach exposure after collateral (simplified)
  - Example: A EUR 800k loan at 3M EURIBOR + 1.25% (total 4.0%) costs EUR 32,000 a year, or 800k x 4% x 92/360 = EUR 8,177.78 for a 92-day quarter. A EUR 1m limit with 0.50% commitment fee on the EUR 200k undrawn adds EUR 1,000 a year. A covenant requires collateral of at least 125% of the loan (EUR 1.0m). For capital: EUR 800k exposure vs EUR 1m equities with 15% haircut and 8% FX mismatch gives E* = 800 - 1,000 x (1 - 0.15 - 0.08) = EUR 30k (holding-period scaling ignored).
  - Exercises (5): mcq, numeric, spot · Callbacks: K1.4, F1.2
  - Sources: S029 fees, S161 CRE22 comprehensive approach, S255 Arts. 387-403
- **K1.7 Lombard credit approval and limit exceptions** (45 min) — Take a request from credit memo to limit set-up: purpose, collateral, lending value, requested limit, approval level; Decide which authority approves a temporary excess or a collateral exception from an authority table; Compute utilisation, headroom and shortfall against lending value and against the approved limit; List approval conditions, review dates and the follow-up when a condition is breached
  - Example: A client pledges EUR 2.0m of diversified securities with an illustrative lending value of 60%, so EUR 1.2m. The approved limit is EUR 1.0m, fully drawn. The client asks for EUR 1.1m for 10 days: the EUR 100k temporary excess is 10% of the limit; an illustrative authority table lets the credit officer approve up to 10% for 30 days, and collateral still covers it (EUR 1.1m is below EUR 1.2m). A request to accept a single stock at 40% lending value instead of 20% is a collateral exception and goes to the credit committee.
  - Exercises (5): mcq, numeric, order, spot, table · Callbacks: K1.2, K1.3, K1.6, C5.4, C7.2, C7.6
  - Sources: S029 securities-backed credit and approval practice, S161 CRE22 collateral recognition, S255 Arts. 387-403 large exposures, S026 Lombard risk disclosure: margin and liquidation, S131 haircutting non-cash collateral

Unit test: Lending value, LTV, haircut and pledge cases.

Jurisdictions: Swiss practice first for Lombard; EU financial collateral rules; US SBLOC.

### K2 Margin & Margin Calls · 5 h · track: ops · needs: K1, O6

_Margin thresholds, margin call calculation and notification, deadlines, forced liquidation, and the handling of a market gap._

Covers (boss's list): margin calls  
🎮 Minigame: **Margin Hotline** — price moves, LTV breach, call, cure or liquidate  

- **K2.1 Margin basics** (45 min) — Learner can define initial margin, maintenance margin and equity; Learner can compute equity, leverage and margin ratio after a price move; Learner can compute the price at which a maintenance call occurs; Learner can describe the effect of leverage on returns
  - Example: A client buys EUR 100k of shares with EUR 50k own cash and EUR 50k borrowed: equity 50k, leverage 2x. A 20% fall leaves market value 80k, equity 30k and margin ratio 37.5%, with a loss of 20k = -40% on equity. With a 25% maintenance ratio, a call occurs when loan / (1 - 25%) = 50/0.75 = EUR 66.7k, a 33.3% fall.
  - Exercises (5): match, mcq, numeric · Callbacks: K1.1
  - Sources: S266 Reg T, S046 margin chapter, S029 margin explanation
- **K2.2 Reg T and FINRA 4210** (55 min) — Learner can apply Reg T initial margin (50%) and FINRA 4210 maintenance (25% long, 30% short) to a position; Learner can compute Reg T excess equity and buying power; Learner can decide whether a call is due from a position table; Learner can compute margin for a short sale
  - Example: A client buys USD 40,000 of stock with USD 20,000 cash; maintenance is 25%, so the stock can fall to about USD 26,700 before a call (loan 20,000 / 0.75). An account with market value USD 100k and loan USD 40k has equity 60k against the Reg T 50% requirement of 50k: excess 10k, buying power 20k. A USD 30,000 short needs 50% initial (15k on top of proceeds) and 30% maintenance (USD 9,000).
  - Exercises (5): mcq, numeric, table · Callbacks: K2.1
  - Sources: S207 Rule 4210, S266 Reg T, S046 margin chapter
- **K2.3 The margin call process** (50 min) — Learner can run the call process from breach to cure or liquidation, with deadlines; Learner can compute the shortfall and the cure amount by top-up and by sell-down; Learner can decide on liquidation timing for a case; Learner can place deadlines on a timeline from the margin agreement
  - Example: After a 15% fall in the equities of the K1.2 pool (170k -> 144.5k), lending value is 196 + 72.25 = EUR 268.25k against a EUR 280k loan: shortfall EUR 11.75k. Cure options: pledge EUR 11.75k cash (100% lending value); repay EUR 11.75k; or sell EUR 23.5k of equity and repay the loan (S = 11.75 / (1 - 0.5)), after which loan 256.5k equals lending value 60.5k + 196k. If there is no response by the deadline (e.g. T+2 12:00) the bank can sell.
  - Exercises (5): mcq, numeric, order, timeline · Callbacks: K2.2, K1.3
  - Sources: S207 Rule 4210, S029 margin calls, S026 pledge risk
- **K2.4 Portfolio margin and risk-based** (50 min) — Learner can describe portfolio margin versus strategy-based margin; Learner can compute a portfolio-margin requirement as the worst loss over a scenario grid; Learner can state eligibility and risk limits of portfolio margin; Learner can name CCP-style risk-based margin (SPAN/TIMS, EMIR confidence levels)
  - Example: A client holds 5,000 shares at USD 100 and 50 protective put contracts (strike 90, bought at USD 4). Revalue at -15%, -10%, -5%, 0, +5%, +10% and +15% (intrinsic put values): P&L = 5,000 x (S - 100) + 5,000 x (max(90 - S, 0) - 4). Worst loss is -USD 70,000 at S = 85 (and at 90), so portfolio margin is USD 70,000, against USD 250,000 (50% of 500k) under Reg T.
  - Exercises (4): match, mcq, numeric · Callbacks: K2.2
  - Sources: S207 4210(g), S099 margin chapters, S260 Art. 41 EMIR
- **K2.5 Collateral management and securities finance** (50 min) — Learner can compute variation margin transfers with threshold and minimum transfer amount; Learner can compute collateral required after haircuts; Learner can compute repo cash against a bond with a haircut and the repo interest; Learner can recognise a collateral dispute and its causes
  - Example: On a EUR 50m derivatives portfolio with daily VM, a EUR 1.2m mark-to-market move triggers a call for EUR 1.2m (no threshold, MTA EUR 500k exceeded) delivered the next morning; in government bonds with a 2% haircut the bank delivers 1.2 / 0.98 = EUR 1,224,490 market value. In a 7-day repo of EUR 10m bonds at a 2% haircut the cash lent is EUR 9.8m; at 2.5% Act/360 the interest is 9.8m x 2.5% x 7/360 = EUR 4,763.89.
  - Exercises (5): mcq, numeric, table · Callbacks: O6.2, K2.3
  - Sources: S050 entire, S105 VM chapter, S216 GMRA, S228 guide, S163 Del. Reg. 2016/2251
- **K2.6 Margin Hotline: operating the desk** (40 min) — Learner can triage a morning margin queue by shortfall size, age and client response; Learner can assign liquidations using sell-down amounts; Learner can handle a price dispute and keep an audit trail; Learner can state when to escalate to credit and legal
  - Example: Morning queue: A1 loan 300k, lending value 294k (6k short, 2.0%, responds); A2 loan 500k, 490k (10k, 2.0%, responds); A3 loan 1,200k, 1,020k (180k short, 15%, no response); A4 loan 400k, 380k (20k, 5%, 3rd day, no response); A5 loan 250k, 247.5k (2.5k, disputes a bond price). Total EUR 218.5k. Priority: A3 (sell EUR 360k of 50% equity, S = 180/0.5), A4 (sell 40k), A1/A2 cure by wire, A5 re-price from a second source.
  - Exercises (5): bucket, mcq, numeric, order, spot · Callbacks: K2.3, K2.5
  - Sources: S050 entire, S163 RTS dispute resolution, S105 dispute procedures

Unit test: Reg T, maintenance, call, cure and collateral cases.

Jurisdictions: US Reg T and 4210 deepest; EU/Swiss Lombard practice; EMIR margin; UK.

### Q6 Linear Algebra · 6 h · track: theory · needs: Q4, F2

_Vectors, matrices, matrix products and inverses, and their use in portfolio variance and covariance across several assets._


- **Q6.1 Vectors and portfolio weights** (50 min) — Learner can add vectors and multiply a vector by a scalar, including a leverage scale-up; Learner can compute a dot product to get portfolio return from weights and expected returns; Learner can convert EUR holdings to a weight vector that sums to 1; Learner can compute a vector's length (norm) and state when two vectors are orthogonal
  - Example: Weights (0.5, 0.3, 0.2) and expected returns (6%, 4%, 10%): w . r = 0.03 + 0.012 + 0.02 = 6.2%. From EUR holdings (250k, 150k, 100k) the weights are holdings / 500k = (0.5, 0.3, 0.2). Scaling the weights by 1.5 gives (0.75, 0.45, 0.30), a 150% gross exposure financed by a 50% loan, and return 1.5 x 6.2% = 9.3% before interest.
  - Exercises (5): mcq, numeric, table · Callbacks: Q4.1, F2.1
  - Sources: S018 lectures 1-2, S073 Ch. 1, S011 Ch. 15
- **Q6.2 Matrices and operations** (55 min) — Learner can multiply two 2x2 matrices and a 2x2 matrix by a 2x1 vector; Learner can state when a product is defined from the dimensions; Learner can transpose a vector or matrix and recognise a symmetric matrix; Learner can use the identity matrix
  - Example: [[1,2],[3,4]] x [[0,1],[1,0]] = [[2,1],[4,3]] (multiplying by a swap matrix swaps columns). Covariance matrix [[0.04, 0.006],[0.006, 0.01]] times weights (0.5, 0.5) gives (0.023, 0.008), the first step of portfolio variance. A 2x1 times 2x1 product is undefined: the shapes do not match.
  - Exercises (5): mcq, numeric, table · Callbacks: Q6.1
  - Sources: S073 Ch. 2, S018 lectures 3-4, S077 matrix chapters
- **Q6.3 Linear systems and inverses** (55 min) — Learner can solve a 2x2 system by elimination and by the inverse; Learner can compute a 2x2 determinant and decide whether the matrix is invertible; Learner can interpret a zero determinant as perfectly dependent assets; Learner can use a solved system to find hedge weights
  - Example: Solve w1 + w2 = 1 and 0.04 w1 + 0.01 w2 = 0.025: subtracting gives 0.03 w1 = 0.015 so w1 = w2 = 0.5. By inverse: det [[1,1],[0.04,0.01]] = 0.01 - 0.04 = -0.03 and w = (1/-0.03)[[0.01,-1],[-0.04,1]](1, 0.025) = (0.5, 0.5). A covariance matrix [[0.04, 0.02],[0.02, 0.01]] (correlation 1) has determinant 0.0004 - 0.0004 = 0, so it cannot be inverted.
  - Exercises (5): mcq, numeric · Callbacks: Q6.2
  - Sources: S073 Ch. 2-5, S018 lectures 2-5, S020 linear systems notes
- **Q6.4 Covariance matrices** (55 min) — Learner can compute a covariance from volatilities and correlation, and the reverse; Learner can compute a sample covariance from a short return series; Learner can build a 2x2 and 3x3 covariance matrix; Learner can recognise an invalid covariance matrix (correlation outside [-1,1], negative variance)
  - Example: Volatilities 20% and 10% with correlation 0.3: covariance 0.3 x 0.2 x 0.1 = 0.006; matrix [[0.04, 0.006],[0.006, 0.01]]. From returns X = (2, -1, 3, 0)% and Y = (1, 0, 2, 1)%: means 1 and 1, products of deviations (0, 2, 2, 0) sum 4, sample covariance 4 / 3 = 1.33 %^2. The matrix [[0.04, 0.05],[0.05, 0.01]] implies correlation 2.5, so it is invalid.
  - Exercises (5): mcq, numeric, table · Callbacks: Q2.2, F2.3, Q6.3
  - Sources: S079 Ch. 3-4, S015 Ch. 7, S039 covariance and correlation
- **Q6.5 Portfolio variance as w'Σw** (55 min) — Learner can compute portfolio variance as w'Sigma w for 2 and 3 assets; Learner can compute the minimum-variance weights for two assets; Learner can compare portfolio volatility with the weighted average volatility; Learner can explain diversification as a consequence of correlation below 1
  - Example: With the Q6.4 assets at 50/50: variance = 0.25 x 0.04 + 0.25 x 0.01 + 2 x 0.25 x 0.006 = 0.0155, volatility 12.45%, against a weighted average of 15%. Minimum variance: w1 = (0.01 - 0.006)/(0.04 + 0.01 - 0.012) = 10.5% in the 20%-vol asset, 89.5% in the other, variance 0.00958 (vol 9.79%), below either asset alone.
  - Exercises (5): mcq, numeric · Callbacks: Q6.4
  - Sources: S085 entire, S079 Ch. 5, S075 Ch. 6
- **Q6.6 Eigenvalues and principal components** (50 min) — Learner can find the eigenvalues of a 2x2 covariance matrix from trace and determinant; Learner can find the direction (eigenvector) of the largest eigenvalue; Learner can compute the share of variance explained by each component; Learner can interpret PCA factors of a yield curve (level, slope, curvature)
  - Example: For [[0.04, 0.006],[0.006, 0.01]]: trace 0.05, determinant 0.000364, eigenvalues (0.05 +/- sqrt(0.0025 - 0.001456))/2 = 0.04116 and 0.00884. The first component explains 0.04116 / 0.05 = 82.3% of variance with direction about (0.98, 0.19), mostly the 20%-vol asset. In yield-curve PCA the first three components typically explain the vast majority of variation (level, slope, curvature).
  - Exercises (5): match, mcq, numeric · Callbacks: Q6.4, Q6.5
  - Sources: S073 Ch. 6, S132 Ch. 5, S061 term-structure factors
- **Q6.7 Consolidation: risk of a Lombard pool** (40 min) — Learner can build a 3x3 covariance matrix and compute pool volatility with w'Sigma w; Learner can convert annual volatility to a 1-day 99% loss in EUR; Learner can compare the loss figure with weighted-average risk and with lending haircuts; Learner can explain why haircuts exceed 1-day VaR (liquidation period, stress, gaps)
  - Example: Pool EUR 1m: equities 40% (vol 20%), equity fund 20% (15%), IG bonds 40% (5%), correlations 0.8, 0.1, 0.2. Variance = 0.0121, vol 11.0%, below the 13% weighted average. 1-day 99% loss = 11.0% / sqrt(252) x 2.326 x 1m = EUR 16.1k (undiversified: EUR 19.1k); 10-day 51k. Haircuts of 50%, 40%, 30% give a EUR 400k cushion, far above VaR because they cover stressed gaps and a 20-day liquidation.
  - Exercises (5): mcq, numeric, table · Callbacks: Q6.5, K1.3
  - Sources: S079 Ch. 5, S131 entire, S089 VaR chapter

Unit test: Computation tests on vectors, matrices, systems, covariance and portfolio variance.

**Checkpoint:** Boss quiz of 35 questions in 40 minutes mixing onboarding, suitability, limits, restrictions, approvals, Lombard LTV, margin and linear-algebra items. Includes 25% callbacks to L2-L5 units.

Open questions: See syllabus/FACTS.md (originals in open-questions.txt)

## L7 — Regulation & Market Theory (~43 h)

This level covers the EU rulebook in depth (MiFID II/MiFIR, MAR, PRIIPs, UCITS/AIFMD II, CSDR, EMIR, SFTR, SRD II, RIS) and compares it with the US, UK, Swiss and Asian regimes. It also covers term structure, portfolio theory, market microstructure and multivariable calculus.

### R1 EU deep dive: the rulebook behind every EU securities workflow · 10 h · track: ops · needs: C4, O3, T5

_MiFID II/MiFIR, MAR, PRIIPs, UCITS and AIFMD II, CSDR, EMIR, SFTR, SRD II and RIS: for each rule, who it applies to, which workflow it affects and the main dates._

Covers (boss's list): suitability, trading restrictions, best execution / dealer execution across venues, brokerage & commissions, settlement & safekeeping (custodian role), client accounts, limits by issuer/group, all corporate actions (SRD II)  
🎮 Minigame: **Gatekeeper** — Regulation triage: each incoming scenario (order, report, fund breach, CSD fail) must be routed to the governing EU rule and the correct action  

- **R1.1 Dossier 1: MiFID II / MiFIR architecture and the 2024 review** (60 min) — Learner can explain the Level 1 / Level 2 / Level 3 structure and place MiFID II, MiFIR, Delegated Reg 2017/565 and ESMA Q&As in it; Learner can distinguish what a Directive (needs transposition) and a Regulation (directly applicable) change for a firm; Learner can list the main changes made by Directive (EU) 2024/790 and Regulation (EU) 2024/791 and their effect on firms and venues; Learner can identify which MiFID II service or activity a given business line falls under (Annex I Sections A/B)
  - Example: Your bank receives client orders in Italian BTPs and routes them to a trading venue: map each step to Annex I (reception and transmission, execution of orders, dealing on own account) and decide which firm needs which licence.
  - Exercises (5): bucket, cloze, match, mcq, timeline · Callbacks: T3.1, C4.1, T6.1
  - Sources: S183 Arts 1-4 (scope, definitions) and Annex I, S259 Arts 1-2 (scope, definitions) as amended by Reg 2024/791, S176 Recitals and amending articles of Dir 2024/790 and Reg 2024/791, S124 chapters on MiFID II scope and structure of EU securities law, S057 chapters on sources of EU capital markets law, S144 introduction and chapters on scope, S188 MiFID II/MiFIR sections of the Interactive Single Rulebook
- **R1.2 Dossier 2: Conduct of business - classification, suitability, product governance, costs** (60 min) — Learner can apply the retail / professional / eligible counterparty tests and the opt-up / opt-down procedures; Learner can map suitability, appropriateness and execution-only to the service provided and the product type (complex vs non-complex); Learner can explain the manufacturer / distributor duties in product governance and the target-market categories; Learner can state the MiFID II rules on inducements, research payment, ex-ante and ex-post costs and charges, and the PFOF ban
  - Example: A Milan client with EUR 400k portfolio asks to buy a EUR 50k autocallable ELN through an execution-only channel. Walk the decision: is the ELN complex, may the bank proceed execution-only, what warning and what costs disclosure apply?
  - Exercises (6): bucket, mcq, multi, numeric, order, spot · Callbacks: C4.1, C4.2, C2.3, T6.2, T5.1
  - Sources: S183 Arts 24-30 and Annex II, S164 Arts 21-24, 25 and 45-50 (Delegated Reg 2017/565), S066 full guideline, S065 full guideline, S067 full guideline, S175 inducements, research (Dir 2021/338), S259 Art 39a on PFOF as amended by Reg 2024/791, S189 ESMA Q&As on investor protection, S144 chapters on conduct rules and best execution, S235 client classification extract
- **R1.3 Dossier 3: Market structure, transparency and reporting** (60 min) — Learner can distinguish regulated market, MTF, OTF, systematic internaliser and the roles of each in pre/post-trade transparency; Learner can apply the equity volume cap and the waivers (large-in-scale, reference price, negotiated trades) conceptually; Learner can describe the transaction-reporting and reference-data chain to the NCA, including what replaced RTS 27/28 reports; Learner can explain the consolidated-tape concept and the tick-size and algorithmic-trading provisions
  - Example: A EUR 8m block in a Dutch large-cap is crossed on a broker crossing network: decide whether pre-trade waivers apply, whether post-trade publication can be deferred, and what the transaction report must contain (LEI, venue MIC, buyer/seller IDs).
  - Exercises (5): bucket, match, mcq, spot, timeline · Callbacks: T3.2, T3.3, T3.5, T7.1, O1.1
  - Sources: S258 Arts 3-13 (equity and non-equity transparency), Art 26 reporting, S259 Arts 4-5 and 22a-22c as amended, S184 Arts 4, 17-20, 23 and 48-49 as amended, S296 ESMA Q&As market structures, S297 ESMA Q&As transparency, S298 ESMA Q&As data reporting, S167 RTS 27/28 (historical), S124 chapters on market structure regulation, S144 chapters on trading venues and transparency, S176 transparency and consolidated-tape provisions
- **R1.4 Dossier 4: Market abuse and short selling** (60 min) — Learner can define inside information, insider dealing, unlawful disclosure and market manipulation under MAR; Learner can describe the issuer disclosure duty, delay conditions, insider lists, PDMR notifications and market soundings; Learner can apply the EU Short Selling Regulation: net short position notification, naked short ban, locate requirement; Learner can identify the operational controls a bank needs (STOR, watch/restricted lists, information barriers) and link them to MAR articles
  - Example: Your private bank's equity desk gets an inquiry from a corporate client about a pending take-over. Decide who goes on the insider list, what the wall-crossing log must show, and whether the client may trade the stock meanwhile.
  - Exercises (5): bucket, mcq, numeric, order, spot · Callbacks: C6.1, C6.2, C6.3, T2.1
  - Sources: S256 Arts 7-19, S257 Q&A topics: insider lists, market soundings, PDMR, S302 ESMA Q&A on MAR, S253 Arts 5-15 net short position, covered short sales, S254 overview, S304 ESMA Q&A on SSR, S057 chapters on market abuse, S124 chapters on market abuse
- **R1.5 Dossier 5: Retail disclosure - PRIIPs KID, Prospectus Regulation and the Retail Investment Strategy** (60 min) — Learner can describe the PRIIPs KID structure: SRI 1-7, performance scenarios, RIY / cost tables, RHP; Learner can explain who produces and who delivers the KID, and which products are in or out of scope; Learner can explain the transition of UCITS from the KIID to the PRIIPs KID and the main 2022/23 methodology changes; Learner can summarise the content and status (Nov 2026) of the Retail Investment Strategy: value for money, inducements and disclosure changes
  - Example: An Italian ELN has a 5-year RHP and SRI 4. Read the KID: how are the performance scenarios built, what do the RIY figures say about entry, exit and ongoing costs, and what would change under the RIS draft?
  - Exercises (5): cloze, match, mcq, spot, table · Callbacks: P6.4, P6.5, C4.3, T6.3
  - Sources: S251 Arts 1-14 (KID), 5 (scope), S252 Delegated Reg 2017/653 and its amending RTS, S245 Arts 1-7 and Annexes (exemptions, summary), S303 ESMA Q&As Prospectus Regulation, S267 provisional agreement and open points, S124 chapters on product disclosure, S192 PRIIPs commentary, S194 EUSIPA map
- **R1.6 Dossier 6: UCITS, AIFMD II and money market funds** (60 min) — Learner can summarise UCITS eligible assets, diversification limits (5/10/40), leverage and use of derivatives; Learner can describe the AIFMD framework and the main changes of AIFMD II (liquidity management tools, loan origination, delegation, reporting); Learner can explain the depositary regime: safekeeping, oversight and liability under UCITS V / AIFMD; Learner can describe the MMF Regulation categories and the ETF-specific ESMA guidelines
  - Example: A Luxembourg UCITS holds 12% of NAV in one issuer's bonds and 8% in each of two others. Calculate the 40% test and decide whether the fund breaches; then decide which LMT would apply when redemptions reach 15% of NAV in a day.
  - Exercises (5): bucket, match, mcq, numeric, spot · Callbacks: P4.1, P4.3, C5.1, O4.5, A4.3
  - Sources: S179 Arts 50-57 (eligible assets, limits), Art 22-26 depositary, S181 Art 52, S182 AIFMD structure and Arts 21 (depositary), S177 AIFMD II / LMT provisions, S289 Del. Reg 2016/438 UCITS V depositary, S290 Del. Reg 231/2013 Arts 83-102, S246 MMF Regulation structure, S187 ETF guidelines, S301 UCITS Q&A, S300 AIFMD Q&A, S180 combined UCITS/AIFMD reading
- **R1.7 Dossier 7: CSDR, Refit and the move to T+1** (60 min) — Learner can summarise CSDR: CSD authorisation, settlement discipline, account segregation (Art 38), and the Refit changes; Learner can compute cash penalties and describe the status of mandatory buy-ins after Refit; Learner can explain the EU T+1 regime (Reg 2025/2075, 11 Oct 2027), its drivers and the main operational impacts; Learner can place T2S and the ISO 20022 securities messages in the EU post-trade picture
  - Example: A EUR 3m corporate bond sale fails for 6 business days because the seller's inventory arrives late: compute the CSDR cash penalty, who pays, and what alert would have appeared in the CSD's matching report.
  - Exercises (5): bucket, cloze, mcq, numeric, timeline · Callbacks: O3.3, O3.4, O3.5, O3.6, O4.2, O4.3, O5.1
  - Sources: S262 Arts 5-7 settlement discipline, 38 segregation, S248 amending provisions of Reg 2023/2845, S250 T+1 regulation text, S168 proposal and impact, S166 Del. Reg 2018/1229 (settlement discipline RTS), S186 ESMA final report on settlement cycle, S190 T+1 high-level roadmap, S294 CSDR Q&A, S286 T2S overview, S021 chapters on EU settlement history, S169 Art 38 text
- **R1.8 Dossier 8: EMIR, SFTR and SRD II** (60 min) — Learner can describe the EMIR obligations: clearing, risk mitigation, margin, reporting and the EMIR 3 changes; Learner can describe the SFTR transparency regime: SFT reporting, reuse disclosure and the data model; Learner can summarise SRD II's operational impact: shareholder identification, transmission chain, voting confirmations, engagement policy; Learner can match each regime to the lifecycle events and the party (CCP, TR, CSD, intermediary) that carries the obligation
  - Example: A pension fund lends EUR 20m of Bunds against Italian BTPs through its custodian; list the SFTR report(s) due, the data elements that link loan and collateral, and the party that reports.
  - Exercises (5): bucket, match, mcq, numeric, timeline · Callbacks: O2.1, O2.3, O2.5, O6.1, O6.4, O8.5, K2.4
  - Sources: S261 Arts 4, 9, 11, 39 (EMIR), S260 EMIR 3 amendments (Reg 2024/2987), S163 Del. Reg 2016/2251 (bilateral margin), S295 EMIR Q&A, S244 Arts 4, 15 (SFTR), S299 SFTR Q&A, S172 Arts 3a-3e SRD II, S173 Impl. Reg 2018/1212 formats, S099 chapters on EU CCP regulation, S124 chapters on derivatives and securities finance regulation

Unit test: Mixed scenario test across R1.1-R1.8: identify the governing regulation, key article/date and required action for 15 short cases.

Jurisdictions: EU-only module by design; national oddities (e.g. Italian FTT, German Depotgesetz, Luxembourg CSSF 24/856) are flagged as boxed asides, not separate units. US/UK/CH/SG/HK comparisons live in R2-R4.

### R2 United States: Acts, Reg NMS, Reg BI, customer protection · 5 h · track: ops · needs: R1

_US securities Acts, Regulation NMS, Regulation BI, customer-protection rules and FINRA, and how they compare with the EU rules in R1._

Covers (boss's list): suitability, dealer execution across venues, trading restrictions, margin calls, transfers, settlement  

- **R2.1 The statutory frame: Securities Act 1933, Exchange Act 1934 and the regulators** (50 min) — Learner can explain the roles of SEC, FINRA, CFTC, Federal Reserve and state regulators; Learner can distinguish registration under the '33 Act (offerings) from the '34 Act (markets, intermediaries); Learner can describe the main exemptions used in practice: Reg D, Rule 144A, Reg S; Learner can compare the US framework with the EU in a one-page table
  - Example: A EUR-denominated note issued by your EU bank is sold to a US QIB: which exemption applies, what legends and transfer restrictions are needed, and how does that compare with an EU Prospectus Regulation exemption?
  - Exercises (4): bucket, cloze, match, mcq · Callbacks: R1.1, R1.5, P1.2
  - Sources: S151 chapters on '33 Act and '34 Act structure, S145 chapters on registration and exemptions, S046 chapters on broker-dealer regulatory framework, S238 IOSCO principles overview, S209 FINRA Rulebook structure
- **R2.2 Market structure: Reg NMS and the trade-through world** (50 min) — Learner can describe the four pillars of Reg NMS (Rules 610, 611, 612, 600 series) and the NBBO; Learner can apply the order protection rule and exceptions on a quote screenshot; Learner can read Rule 605 and 606 disclosures and understand what they reveal about execution quality and PFOF; Learner can compare the US PFOF regime with the EU ban
  - Example: A broker sees an NBBO of 41.20 / 41.22 on NYSE while its internaliser quotes 41.23: can it internalise the buy at 41.22, and why or why not?
  - Exercises (4): match, mcq, numeric, spot · Callbacks: T3.1, T3.4, T5.1, T6.4, R1.3
  - Sources: S265 Rules 600-614 (esp. 605, 606, 610, 611, 612), S145 chapters on market structure, S009 Dark Pools, chapters on fragmentation, S013 Flash Boys, background chapters, S046 market regulation chapters, S209 FINRA Rulebook
- **R2.3 Customer-facing conduct: Reg BI, FINRA 2111/2090 and 5310** (50 min) — Learner can state the four components of Reg BI (disclosure, care, conflicts, compliance) and its scope; Learner can explain when FINRA Rule 2111 still applies and how Rule 2090 (KYC) operates; Learner can describe FINRA 5310 best execution and 5320 prohibition on trading ahead of customer orders; Learner can compare Reg BI with MiFID II suitability on retail structured products
  - Example: A rep proposes a complex note to a retail investor with a 4-year horizon: list which Reg BI obligations are triggered and which records must be kept.
  - Exercises (5): bucket, match, mcq, paper, spot · Callbacks: R1.2, C4.4, T5.2, C2.1
  - Sources: S271 Reg BI, Form CRS release, S273 Rule 15l-1, S317 FINRA 2111, S316 FINRA 2090, S208 FINRA 5310, S319 FINRA 5320, S318 FINRA 4511, S315 FINRA 2010, S046 chapters on customer protection and sales practices
- **R2.4 Customer assets: Rule 15c3-3, net capital, SIPC and margin** (50 min) — Learner can explain the possession/control requirement and the customer reserve formula in plain terms; Learner can describe net capital (15c3-1) and SIPA / SIPC protection; Learner can map Regulation T and FINRA 4210 to the margin call workflows seen in K2; Learner can describe market-access controls under Rule 15c3-5
  - Example: A broker-dealer holds customer debits of USD 80m and credits of USD 95m: compute the reserve requirement in the simple formula and say what happens if it is short at the weekly computation.
  - Exercises (5): match, mcq, numeric, order · Callbacks: K2.1, K2.2, O4.4, A7.4
  - Sources: S273 Rule 15c3-3 and customer protection, S266 Reg T Sec. 220.1-220.8, S207 FINRA 4210, S325 Rule 15c3-5, S046 chapters on net capital and customer protection, S151 SIPA overview
- **R2.5 Post-trade and FINRA in practice: T+1, ACATS, supervision** (50 min) — Learner can summarise the US T+1 transition (May 2024) and its operational changes; Learner can describe ACATS transfer steps and common rejection reasons; Learner can describe the clearing agency standards (Rule 17Ad-22) at a conceptual level; Learner can describe FINRA's supervisory and examination model
  - Example: A customer asks to move a USD 300k portfolio from a Swiss bank to a US broker via ACATS: explain why ACATS cannot be used for the Swiss leg and how the transfer actually flows.
  - Exercises (4): match, mcq, order, timeline · Callbacks: O3.2, O5.2, R1.7, O2.2
  - Sources: S272 Release 34-96930, S206 FINRA Rule 11870, S237 NSCC Rule 50, S326 Rule 17Ad-22, S129 FINRA RN 23-06, S046 chapters on clearing and settlement

Unit test: End-of-module test on R2.1-R2.5: legal sources, Reg NMS mechanics, Reg BI scope, customer protection rule calculations, ACATS/T+1 flows.

Jurisdictions: US-only module with explicit EU comparisons in each unit (PFOF, suitability vs Reg BI, T+1 timing, customer asset segregation). SG/HK/UK/CH not touched here.

### R3 United Kingdom and Switzerland · 4 h · track: ops · needs: R1

_The UK post-Brexit regime and the Swiss framework, and where each differs from the EU rulebook._

Covers (boss's list): suitability, client accounts, custodian role (safekeeping), Lombard lending, best execution  

- **R3.1 UK framework: FSMA, FCA Handbook and UK MiFIR** (50 min) — Learner can describe the UK's post-Brexit structure: FSMA 2023, FCA and PRA, onshored MiFID/MiFIR; Learner can name the main points where the UK rules differ from EU (research, transparency, CT, derivative trading obligation); Learner can describe the HM Treasury MiFID reform path; Learner can describe UK T+1 plans (Oct 2027) alongside the EU
  - Example: A UK-based fund manager buys German equities on an EU venue: map the UK and EU rules that touch the order (best ex, transaction reporting, research payment).
  - Exercises (4): bucket, match, mcq, timeline · Callbacks: R1.1, R1.3, R1.7
  - Sources: S059 chapters on FSMA and FCA, S313 PS17/14 COBS/SYSC changes, S324 HMT MiFID reform paper, S158 UK T+1 report, S201 FCA research unbundling review, S150 chapters on UK custody law
- **R3.2 UK conduct and client assets: COBS, Consumer Duty, CASS** (50 min) — Learner can describe COBS suitability and appropriateness, and compare them with MiFID II; Learner can describe the four Consumer Duty outcomes and cross-cutting rules; Learner can explain the CASS custody and client money rules and the CASS resolution pack; Learner can apply CASS reconciliations to a simple example
  - Example: A UK firm holds GBP 5m of client money and the internal ledger shows GBP 5.02m: perform the CASS 7 reconciliation, identify the shortfall treatment and the notification duty.
  - Exercises (4): match, mcq, numeric, spot · Callbacks: O4.4, C3.1, R1.2, A7.5
  - Sources: S197 PRIN 2A and PS22/9, S312 PS14/9 CASS, S313 COBS changes, S059 chapters on conduct and client assets, S150 chapters on custody and trust
- **R3.3 Switzerland: FinSA, FinIA, FinMIA and the SBA guidelines** (50 min) — Learner can describe the roles of FinSA (conduct), FinIA (institutions) and FinMIA (infrastructure); Learner can map FinSA client segmentation, suitability / appropriateness and information duties to the MiFID equivalents; Learner can explain the Swiss custody protection in a bank bankruptcy; Learner can describe the SBA portfolio-management guidelines
  - Example: A Zurich client wants to buy an EU-issued structured note: check FinSA information duties, BIB requirement and the equivalence of an EU PRIIPs KID.
  - Exercises (4): bucket, mcq, spot, table · Callbacks: R1.2, C4.5, C2.4, K1.1
  - Sources: S203 FinSA and FinSO, S202 FinIA, S204 FinMIA, S284 consolidated overview, S097 chapters on FinSA/FinIA, S283 SBA guidelines, S241 Lenz & Staehelin chapter
- **R3.4 Lombard practice and cross-border business in Switzerland and the UK** (50 min) — Learner can describe Swiss Lombard loan documentation and risk disclosure; Learner can explain how Swiss and UK rules interact with EU cross-border private banking; Learner can apply the Swiss Lombard framework to a worked LTV example; Learner can identify typical cross-border pitfalls (marketing, inbound services, reverse solicitation)
  - Example: A Geneva bank lends CHF 1.5m against a pledged portfolio of lending value CHF 2m: compute headroom and the effect of a 20% fall in the largest position.
  - Exercises (4): bucket, cloze, mcq, numeric · Callbacks: K1.1, K1.2, K1.3, R1.2
  - Sources: S026 client risk disclosure, S029 FINRA securities-backed lines, comparison, S205 FINMA Circular 2023/1, S097 chapters on cross-border business, S284 overview

Unit test: Short test on R3.1-R3.4: UK/CH legal sources, conduct rules, client asset protection and Lombard basics versus EU.

Jurisdictions: UK and Switzerland each get two units; EU comparison made explicit in every unit. UK T+1 date and Swiss equivalence status to be re-verified.

### R4 Asia sidebars: Singapore and Hong Kong · 2 h · track: ops · needs: R1

_Suitability and conduct rules in Singapore and Hong Kong, and the points that matter for a private bank booking centre there._

Covers (boss's list): suitability, client onboarding, client accounts  

- **R4.1 Singapore: SFA, FAA-N16 and fair dealing** (30 min) — Learner can describe the Customer Knowledge Assessment and Customer Account Review for specified investment products; Learner can map the MAS fair-dealing outcomes to MiFID conduct duties; Learner can identify accredited investor and institutional investor categories
  - Example: A Singapore retail customer wants to buy a callable note: determine whether CKA is required, whether a recommendation is made, and which fair-dealing outcome applies.
  - Exercises (3): bucket, match, mcq · Callbacks: R1.2, C4.6
  - Sources: S275 SFA and FAA-N16, S234 Fair Dealing Guidelines
- **R4.2 Hong Kong: SFO and the SFC Code of Conduct** (30 min) — Learner can describe SFC Code para 5.2 suitability and 5.5 complex product rules; Learner can describe professional investor classifications; Learner can compare HK with EU/Singapore on complex product safeguards
  - Example: A retail HK client buys a leveraged structured product: apply the SFC 5.5 conditions (knowledge, suitability, warning) and note the differences with a MiFID appropriateness warning.
  - Exercises (3): mcq, spot, table · Callbacks: R1.2, R4.1
  - Sources: S277 Code of Conduct paras 5.2, 5.5, S278 SFC FAQs
- **R4.3 Asia cross-border: comparison capstone** (30 min) — Learner can produce a one-page comparison of EU, US, UK, CH, SG, HK suitability regimes; Learner can pick the stricter rule for a multi-booking-centre client; Learner can identify the jurisdictions whose rules would apply to a cross-border solicitation
  - Example: A client domiciled in Italy booked in Singapore wants a note issued in Luxembourg: list the applicable regimes and the strictest requirement.
  - Exercises (3): bucket, paper, table · Callbacks: R1.2, R2.3, R3.3, R4.1, R4.2
  - Sources: S275 SFA, S277 SFC Code, S203 FinSA, S183 MiFID II Art 25

Unit test: 5-question comparison test on Asian regimes versus EU.

Jurisdictions: Sidebars only; Singapore and Hong Kong each in one unit with an EU comparison; third unit is a six-jurisdiction capstone.

### F4 Fixed income maths II: term structure, bootstrapping, spreads, FRNs · 5 h · track: theory · needs: F3, Q6

_Par yields, bootstrapping of zero rates, forward rates, credit and swap spreads, and floating-rate notes._

Covers (boss's list): bonds  

- **F4.1 Spot rates, discount factors and forward rates** (50 min) — Learner can convert between discount factors, spot rates and forward rates; Learner can price a coupon bond as a sum of discounted cash flows with different spot rates; Learner can compute implied forward rates and explain the no-arbitrage argument
  - Example: Spot rates 1y 2.0%, 2y 2.4%, 3y 2.7%: the 1y rate 2 years forward is (1.027^3 / 1.024^2) - 1, approx 3.3%. Check against the discount factor ratio.
  - Exercises (4): cloze, mcq, numeric · Callbacks: F3.1, F3.2, Q4.3, P3.5
  - Sources: S061 Ch. 1-2 (prices, discount factors, spot and forward rates), S045 chapters on bond pricing and the term structure, S075 Ch. 4 (term structure), S015 chapter on bond prices and yields
- **F4.2 Bootstrapping a zero curve from par and swap rates** (50 min) — Learner can bootstrap spot rates from par yields step by step; Learner can interpret a swap curve and a par curve and tell them apart; Learner can describe the effect of the euro risk-free transition (EURIBOR, ESTR) on curve building at a conceptual level
  - Example: Par yields 1y 2.0%, 2y 2.5%, 3y 2.9%: solve successively for Z(1), Z(2), Z(3) and verify that the 3y par bond prices to 100.
  - Exercises (4): mcq, numeric, order, table · Callbacks: F3.3, Q6.2, F4.1
  - Sources: S061 Ch. 2-3 (par rates, bootstrapping), S093 chapters on the term structure and zero curves, S060 chapters on spot and forward rate curves, S156 ISDA 2021 definitions (reference rates)
- **F4.3 Yield, return and the shape of the curve** (50 min) — Learner can explain the expectations, liquidity and preferred-habitat theories; Learner can compute holding-period return under curve shifts using duration; Learner can explain roll-down and carry
  - Example: A 5-year bond is held for 1 year with a flat curve versus an upward-sloping curve: compute carry and roll-down return.
  - Exercises (4): bucket, match, mcq, numeric · Callbacks: F3.2, F3.3, Q6.1
  - Sources: S061 Ch. 7-8 (returns, one factor), S045 chapters on term-structure theories, S287 chapters on yield curve analysis
- **F4.4 Spreads: G-spread, I-spread, Z-spread and credit spread** (50 min) — Learner can compute G-, I- and Z-spreads for a corporate bond; Learner can explain why Z-spread is preferred to nominal spread; Learner can connect spreads to default probability and recovery in a simple model
  - Example: A 5-year corporate bond yields 4.1% while the 5-year Bund yields 2.4% and the 5-year swap is 2.6%: G-spread 170bp, I-spread 150bp; solve Z-spread numerically by trial.
  - Exercises (4): match, mcq, numeric · Callbacks: P3.4, F3.3, F4.2, Q5.2
  - Sources: S061 chapters on spreads, S045 chapters on credit and spreads, S089 credit risk chapters, S149 convertible bond spreads
- **F4.5 Floating-rate notes and discount margin** (50 min) — Learner can price a FRN at reset and between resets; Learner can compute the discount margin and the effective spread; Learner can describe benchmark replacement and fallback language (EURIBOR, ESTR) at a conceptual level
  - Example: A EUR FRN pays 3M EURIBOR + 80bp, last reset at 2.20%: compute next coupon, accrued after 30 days and the price when the market demands DM of 95bp.
  - Exercises (5): mcq, numeric, spot, timeline · Callbacks: P3.2, P3.4, F4.1, P6.1
  - Sources: S061 chapters on floating-rate notes, S045 chapter on floating-rate securities, S220 ICMA conventions, S156 ISDA 2021 definitions, S287 chapters on FRNs

Unit test: End-of-module test: discount factors, bootstrapping a 3-year curve, a spread calculation and an FRN price.

Jurisdictions: EUR conventions first (annual 30/360 for Bunds, ACT/ACT for governments); EURIBOR / ESTR transition. US Treasuries (semi-annual) and SOFR noted as contrast only.

### F5 Portfolio theory and CAPM · 6 h · track: theory · needs: F2, Q6

_Mean-variance portfolio construction, the efficient frontier, diversification, beta and the CAPM._

Covers (boss's list): funds  

- **F5.1 Mean-variance preferences and the two-asset portfolio** (50 min) — Learner can compute expected return and variance of a two-asset portfolio; Learner can explain diversification via correlation; Learner can find the minimum-variance weights in a two-asset case
  - Example: Asset A 8% / 20%, asset B 4% / 8%, correlation 0.2: compute the 50/50 portfolio return and volatility and the min-variance weights.
  - Exercises (4): mcq, numeric, table · Callbacks: F2.2, F2.3, Q2.2, Q6.4
  - Sources: S085 Markowitz 1952 (sections I-III), S015 Ch. 6-7 (risk, return, diversification), S075 Ch. 6 (mean-variance), S079 Ch. 5-6
- **F5.2 N assets, matrices and the efficient frontier** (50 min) — Learner can write portfolio variance as w'Sw; Learner can describe the efficient frontier and global minimum variance portfolio; Learner can compute a 3-asset portfolio variance from a covariance matrix
  - Example: Three assets with given sigma and correlation matrix: compute portfolio variance for w = (0.5, 0.3, 0.2).
  - Exercises (4): cloze, mcq, numeric, table · Callbacks: Q6.2, Q6.3, Q6.5, F5.1
  - Sources: S015 Ch. 7 (optimal risky portfolios), S079 Ch. 6-7, S075 Ch. 6, S133 portfolio construction chapters
- **F5.3 Capital allocation, the tangency portfolio and the CML** (50 min) — Learner can find the tangency portfolio for two risky assets and a risk-free rate; Learner can draw the CML and compute the Sharpe ratio; Learner can explain the separation theorem
  - Example: Risk-free 2%, tangent portfolio 9% / 16%: Sharpe = 0.4375; a client with 12% volatility target holds 75% of tangent, 25% cash.
  - Exercises (4): match, mcq, numeric, order · Callbacks: F2.4, F5.1, F5.2, A6.3
  - Sources: S015 Ch. 6-7, S075 Ch. 6, S085 Markowitz 1952, S048 Sharpe 1964, sections 1-2
- **F5.4 CAPM, beta and the security market line** (50 min) — Learner can compute beta as covariance over variance and estimate it from a regression; Learner can compute required return from CAPM and alpha from observed return; Learner can list CAPM assumptions and their practical failures
  - Example: Beta 1.2, rf 2%, equity risk premium 5.5%: required return 8.6%; if realised is 10%, alpha is 1.4%.
  - Exercises (4): bucket, mcq, numeric · Callbacks: F2.3, Q5.1, A5.3, A6.3
  - Sources: S048 Sharpe 1964, S015 Ch. 9 (CAPM), S008 chapters on cost of capital, S075 Ch. 7, S079 Ch. 13-14
- **F5.5 Factor models: APT, Fama-French, smart beta** (50 min) — Learner can explain APT and the single- and multi-factor models; Learner can interpret the Fama-French factors and their loadings; Learner can connect factor exposures to fund performance attribution
  - Example: A fund returns 9% with beta 1.0, SMB loading 0.3, HML loading 0.4: decompose into factor premia and alpha.
  - Exercises (4): match, mcq, numeric, table · Callbacks: F5.4, A6.4, Q6.3
  - Sources: S051 Fama-French 1993, S042 chapters on factor investing, S015 Ch. 10, S107 chapters on active management, S112 chapters on factor models
- **F5.6 Market efficiency and active management** (50 min) — Learner can distinguish weak, semi-strong and strong-form efficiency; Learner can interpret the empirical tests (event studies, anomalies); Learner can connect efficiency to the case for passive / ETF investing and for active management
  - Example: Given a stock's abnormal return around a dividend announcement: test using a market model and interpret.
  - Exercises (4): bucket, mcq, numeric, paper · Callbacks: P5.3, F5.4, A6.5
  - Sources: S055 Fama 1970, S015 Ch. 11, S007 chapters on costs, S106 Barberis-Thaler overview, S148 chapters on market efficiency

Unit test: Two-asset frontier calculation, Sharpe ratio, CAPM alpha and factor decomposition in 12 questions.

### T8 Market microstructure: spreads, liquidity, impact; Kyle and Glosten-Milgrom · 6 h · track: theory · needs: T3, Q5

_Bid-ask spread components, liquidity measures, market impact, and the Kyle and Glosten-Milgrom models of informed trading._

Covers (boss's list): dealer execution across venues, order & execution workflows  
🎮 Minigame: **Order Book** — Advanced: read spread, depth and imbalance; execute a parent order with minimal impact; infer informed flow from order-book pressure  

- **T8.1 Spreads and their components** (50 min) — Learner can compute quoted, effective and realised spreads; Learner can decompose the spread into order processing, inventory and adverse selection; Learner can estimate the spread from price changes with Roll's measure
  - Example: Midpoint 20.00, buy executes at 20.01, midpoint 5 minutes later is 20.005: effective spread 2 x 0.01 = 0.02 (10bp), realised spread 2 x 0.005 = 0.01 (5bp), the rest being price impact.
  - Exercises (4): match, mcq, numeric · Callbacks: T3.1, T5.4, Q5.1
  - Sources: S101 chapters on spreads and bid-ask, S134 chapters on transaction costs, S123 chapters on the Roll model and spreads, S136 survey sections on spread components
- **T8.2 Liquidity: depth, resilience and measures** (50 min) — Learner can compute depth, Amihud illiquidity and turnover measures; Learner can identify liquidity dimensions (tightness, depth, resilience, immediacy); Learner can interpret liquidity under stress
  - Example: Given volume and absolute return per day, compute the Amihud ratio for two stocks.
  - Exercises (4): bucket, cloze, mcq, numeric · Callbacks: T8.1, P5.4, R1.6
  - Sources: S134 chapters on liquidity measures, S123 chapters on liquidity, S154 chapters on liquidity and impact, S101 liquidity chapters
- **T8.3 Price impact and optimal execution** (50 min) — Learner can describe temporary and permanent impact; Learner can apply the square-root impact law; Learner can describe the Almgren-Chriss trade-off between risk and cost
  - Example: A EUR 5m order in a stock with ADV EUR 50m and daily vol 2%: impact ~ Y*sigma*sqrt(Q/ADV) with Y=0.7: impact approx 0.7 x 2% x sqrt(0.1) = 44bp.
  - Exercises (4): match, mcq, numeric · Callbacks: T5.2, T5.3, Q5.2, T8.2
  - Sources: S139 Almgren-Chriss 2000, S154 chapters on impact, S038 chapters on impact models, S108 chapters on execution
- **T8.4 Inventory models and the market maker** (50 min) — Learner can describe how a dealer sets quotes with inventory; Learner can describe the Ho-Stoll style result that quotes shift with inventory; Learner can connect the model to RFQ and dealer desk workflows
  - Example: A dealer long 10m bonds shifts both bid and ask down 2bp: compute expected spread capture and the inventory penalty.
  - Exercises (4): bucket, mcq, numeric, spot · Callbacks: T4.1, T4.2, T8.1
  - Sources: S135 chapters on inventory models, S101 chapters on dealers, S117 Hendershott-Madhavan 2015, S056 BIS Markets Committee electronic trading
- **T8.5 Information models: Glosten-Milgrom** (50 min) — Learner can compute bid and ask in a sequential-trade model with informed and uninformed traders; Learner can explain how beliefs update after a buy or sell; Learner can derive that the spread increases with the share of informed traders
  - Example: True value is 100 or 102 with equal prior, informed share 20%: P(buy | high) = 0.2 + 0.8 x 0.5 = 0.6 and P(buy | low) = 0.4, so ask = E[V | buy] = 101.2, bid = 100.8, spread 0.4.
  - Exercises (4): mcq, numeric, order · Callbacks: Q5.1, Q2.4, T8.1
  - Sources: S114 Glosten-Milgrom 1985, S135 chapters on sequential trade, S136 survey sections on GM, S101 chapters on informed traders
- **T8.6 Information models: Kyle (1985) and empirical microstructure** (50 min) — Learner can state the Kyle model setup and equilibrium (linear pricing rule, lambda); Learner can interpret lambda as the price-impact coefficient; Learner can compare Kyle and Glosten-Milgrom and relate them to observed impact
  - Example: With value std 2 and noise-trade std 10m shares, lambda = 0.5 x 2 / 10 = 0.1 per million shares, so 1m net order flow moves the price by 0.10.
  - Exercises (4): cloze, mcq, numeric, paper · Callbacks: T8.5, Q5.3
  - Sources: S118 Kyle 1985, S135 chapters on strategic traders, S123 empirical chapters, S136 survey

Unit test: Spreads, liquidity, impact and information-model calculations; 15 questions.

Jurisdictions: Mentions MiFID tick-size regime and SI quoting only as institutional context; theory is jurisdiction-neutral.

### Q7 Multivariable calculus and optimisation · 5 h · track: theory · needs: Q4, Q6

_Partial derivatives, gradients, the multivariable chain rule and constrained optimisation with Lagrange multipliers, applied to portfolio value and risk factors._


- **Q7.1 Functions of several variables and partial derivatives** (50 min) — Learner can compute partial derivatives of functions of two or three variables; Learner can interpret a partial derivative as a sensitivity (e.g. delta); Learner can sketch level curves
  - Example: V(S, sigma) = S^2 * sigma: dV/dS = 2*S*sigma and dV/dsigma = S^2; evaluate at S = 100, sigma = 0.2.
  - Exercises (4): cloze, match, mcq, numeric · Callbacks: Q3.2, Q3.3, Q4.1
  - Sources: S080 Ch. 14 (partial derivatives), S011 Ch. 11 (functions of many variables), S020 Calc III partial derivatives, S077 Ch. 14
- **Q7.2 Gradient, directional derivative and the chain rule** (50 min) — Learner can compute the gradient and the directional derivative; Learner can use the multivariable chain rule; Learner can interpret the gradient as steepest ascent
  - Example: f(x,y) = x^2 + 3xy: gradient at (1,2) = (8, 3); rate of change along u = (0.6, 0.8) = 7.2.
  - Exercises (4): cloze, mcq, numeric · Callbacks: Q7.1, Q6.1, Q4.2
  - Sources: S080 Ch. 14.5-14.6, S011 Ch. 11, S020 Calc III gradient, S018 MIT 18.06 lectures for vector intuition
- **Q7.3 Taylor expansion in several variables; Hessian** (50 min) — Learner can write the second-order Taylor expansion of a function of two variables; Learner can compute the Hessian and classify definiteness; Learner can connect delta-gamma approximations to the expansion
  - Example: f(x,y) = x^2 + xy + y^2 has Hessian [[2,1],[1,2]], positive definite; at the minimum f is convex.
  - Exercises (4): match, mcq, numeric · Callbacks: Q4.4, Q6.2, F3.4, Q7.2
  - Sources: S080 Ch. 14.7, S011 Ch. 13, S077 Ch. 16, S073 chapters on positive definite matrices
- **Q7.4 Unconstrained optimisation** (50 min) — Learner can find stationary points of functions of two variables; Learner can apply the second-order test to classify them; Learner can model a least-squares problem as an optimisation
  - Example: Minimise sum of squared residuals for y = a + b x on 5 points via normal equations.
  - Exercises (4): mcq, numeric, order · Callbacks: Q7.3, Q6.4
  - Sources: S080 Ch. 14.7, S011 Ch. 13, S077 Ch. 17, S020 Calc III optimisation
- **Q7.5 Lagrange multipliers and applications to portfolios** (50 min) — Learner can solve a constrained optimisation with one equality constraint using Lagrange multipliers; Learner can interpret the multiplier as a shadow price; Learner can apply the method to the minimum-variance portfolio and to utility maximisation
  - Example: Minimise w'Sw subject to w'1 = 1 for a 2-asset case; recover the algebraic F5.1 formula and interpret the multiplier.
  - Exercises (4): cloze, mcq, numeric · Callbacks: F5.1, F5.2, F5.3, Q6.4, Q7.4
  - Sources: S080 Ch. 14.8 (Lagrange multipliers), S011 Ch. 14, S077 Ch. 18, S075 Ch. 6 optimisation, S085 Markowitz 1952

Unit test: Partial derivatives, gradient, Hessian classification and a Lagrange-multiplier portfolio problem.

**Checkpoint:** Level 7 boss quiz (40 min, ~35 questions): scenario triage across R1-R4 (which rule, which date, which action), plus calculation blocks from F4, F5, T8 and Q7. Mixed formats with 25% callbacks to L3-L6.

Open questions: See syllabus/FACTS.md (originals in open-questions.txt)

## L8 — Quant & Graduate Theory (~43 h)

This level covers no-arbitrage pricing, the Greeks, risk-neutral valuation, Brownian motion and Ito's lemma, asset-pricing theory, financial econometrics and measure-theoretic probability. It also covers the choice and checking of numerical methods for exotic and structured products, without coding.

### F6 Derivatives pricing & Greeks · 8 h · track: theory · needs: P6, F5, Q5

_Binomial trees, no-arbitrage pricing, Black-Scholes, put-call parity and the Greeks, applied to the pricing of a capital-protected note._

🎮 Minigame: **Dealer Desk** — Delta-hedge a small option book as spot and vol move; track hedged P&L vs gamma/theta/vega  

- **F6.1 No-arbitrage and the forward price** (60 min) — Explain arbitrage and the law of one price in a worked example; Compute a forward price with cash-and-carry, including discrete dividends; Use put-call parity to price a put from a call and to spot a violation
  - Example: Spot 100 EUR, 1y rate 3% cont., dividend 2 EUR in 6 months: F = (100 - 2e^-0.015)e^0.03; a quoted forward 3 EUR higher is an arbitrage you can construct leg by leg.
  - Exercises (5): mcq, numeric, order, spot · Callbacks: F1.3, Q1.3, P6.2
  - Sources: S083 Ch. 5 (forward prices), Ch. 11 (properties of stock options), S015 Ch. 21 (option markets) and Ch. 22 (no-arbitrage bounds), S012 Ch. 1-2
- **F6.2 One-period binomial model: replication and risk-neutral pricing** (60 min) — Replicate a call with stock and cash in a one-step tree and derive its price; Compute risk-neutral probabilities and show they are not real-world probabilities; Explain why the real-world up-probability does not enter the option price
  - Example: S0 = 100, up to 120, down to 90, r = 2%, call strike 105: delta = 15/30 = 0.5, q = (102 - 90)/30 = 0.4, price = 15 x 0.4 / 1.02 = 5.88 EUR.
  - Exercises (5): cloze, mcq, numeric, spot · Callbacks: F6.1, Q5.2, F1.3
  - Sources: S092 Ch. 1 (one-period binomial model), S012 Ch. 2, S083 Ch. 13 (binomial trees), first sections
- **F6.3 Multi-period trees (CRR) and American options** (60 min) — Build a two- and three-step CRR tree and price a European option by backward induction; Decide early exercise node by node for an American put; Calibrate u, d to a volatility and explain why dividends change the early-exercise logic for calls
  - Example: Three-step tree, S0 = 50, sigma = 30%, T = 6m, r = 3%: u = 1.130; an American put at strike 55 is exercised early at the lowest nodes, so its value exceeds the European put by a small early-exercise premium.
  - Exercises (5): bucket, mcq, numeric, table · Callbacks: F6.2, F2.2, Q1.5
  - Sources: S092 Ch. 1-4 (binomial asset pricing, American derivatives), S083 Ch. 13, S075 Ch. 12 (derivative securities, lattices)
- **F6.4 From the tree to Black-Scholes: lognormal prices and the formula** (60 min) — Explain how a many-step tree converges to lognormal stock prices; Compute a European call and put with the Black-Scholes formula using N(d1), N(d2); Interpret N(d2) as risk-neutral exercise probability and N(d1) as delta of the call
  - Example: S = 100, K = 100, r = 2%, sigma = 25%, T = 1: d1 = 0.205, d2 = -0.045, call about 10.9 EUR; N(d2) about 0.48 is the risk-neutral probability of finishing in the money.
  - Exercises (5): match, mcq, numeric, paper · Callbacks: Q5.3, F6.3, Q4.2
  - Sources: S098 Sections 1-3 (original paper), S083 Ch. 15 (Black-Scholes-Merton model), S012 Ch. 3
- **F6.5 The Black-Scholes PDE and risk-neutral valuation** (60 min) — State the Black-Scholes PDE and identify each term (theta, delta, gamma, financing); Explain why the delta-hedged portfolio earns the risk-free rate; Describe, without full proof, how the PDE and the discounted-expectation formula are two views of the same price
  - Example: For an at-the-money option with gamma 0.02 per EUR^2, sigma 25% and S = 100, theta is roughly -0.5 x 0.0625 x 10,000 x 0.02 = -6.25 EUR/year per option: time decay pays for gamma.
  - Exercises (5): bucket, cloze, mcq, numeric, order · Callbacks: F6.4, Q7.1, Q4.3
  - Sources: S083 Ch. 15 (derivation of the differential equation), Appendix on Ito, S012 Ch. 4-5, S146 Ch. 4 (BS equation), S084 Ch. 5-6
- **F6.6 The Greeks: definitions, signs and shapes** (60 min) — Define delta, gamma, vega, theta, rho and sketch each versus spot for calls and puts; Compute Greeks of a position from per-option Greeks and quantity; Explain the delta-gamma-theta Taylor approximation of option P&L
  - Example: Short 100 calls (multiplier 100): delta per call 0.55, gamma 0.03; a 2 EUR spot rise costs about 100 x 100 x (0.55 x 2 + 0.5 x 0.03 x 4) = 11,600 EUR before hedging.
  - Exercises (5): bucket, match, mcq, numeric · Callbacks: Q3.2, Q7.1, Q4.3, F3.2
  - Sources: S083 Ch. 19 (The Greek letters), S082 Ch. 6-7 (Greeks), S121 Ch. 6-7
- **F6.7 Greeks in practice: hedging P&L, implied volatility, smile and skew** (60 min) — Explain delta-hedging P&L as realised vs implied variance times gamma; Back out the direction of implied vol from quoted option prices (conceptually, no solver); Describe the smile/skew and why equity skew is negative
  - Example: A desk delta-hedges a long 25%-implied option daily while stock realises 30%: gain about 0.5 x gamma x S^2 x (0.30^2 - 0.25^2)/252 per day, positive despite theta.
  - Exercises (5): match, mcq, numeric, spot, table · Callbacks: F6.6, F2.2, T8.1
  - Sources: S082 Ch. 8-10 (volatility, smile), S121 Ch. 4, 8 (dynamic hedging, smile), S083 Ch. 20 (volatility smiles)
- **F6.8 Beyond vanilla: exotics, stochastic volatility and structured-product pricing** (60 min) — Decompose an EU capital-protected note into a zero-coupon bond plus options and price it; Explain barriers, digitals, autocallables and their Greeks, especially discontinuity risk; Contrast local vol, stochastic vol and jump models at the level of what each fixes
  - Example: 3-year 100% capital-protected note, 3y zero at 2.9% costs 91.8; remaining 8.2 EUR buys the call, so participation = 8.2 / call price (e.g., 14.2) = about 58%.
  - Exercises (5): bucket, mcq, numeric, paper · Callbacks: P6.3, F6.6, F4.1
  - Sources: S126 Chs. on barrier and autocallable structures, S149 Ch. 1-3 (convertibles as option + bond), S083 Ch. 26 (exotic options), S194 classification of retail products

Unit test: Replication, tree and BS pricing, put-call parity, Greeks of a position, structured-note decomposition.

Jurisdictions: Price conventions are market-neutral; EU structured-product examples (EUSIPA types) first; US listed options and Swiss SSPA types mentioned in unit 8.

### Q8 Stochastic processes & Itô calculus · 8 h · track: theory · needs: Q7, Q5

_Random walks, Brownian motion, quadratic variation, Ito's lemma and the change to the risk-neutral measure._


- **Q8.1 Random walks and the scaled walk** (60 min) — Compute mean, variance and distribution of a symmetric random walk after n steps; Explain scaling: why time step dt pairs with step size sqrt(dt); Describe the central-limit view of the walk converging to a normal
  - Example: Walk with step +/-1 per day for 100 days: sd = 10; scale step to sigma sqrt(dt) with sigma = 20% and dt = 1/252 and a year's sd becomes 20%.
  - Exercises (4): cloze, mcq, numeric · Callbacks: Q5.4, Q1.5, F2.2
  - Sources: S092 Ch. 3 (state prices and random walks), S078 Lectures on random walks/Brownian motion, S074 Ch. on CLT
- **Q8.2 Brownian motion: definition and properties** (60 min) — State the four defining properties of standard Brownian motion; Compute probabilities of events about W(t) using increments and the normal distribution; Explain why paths are continuous but nowhere differentiable, in words
  - Example: P(W(4) > 3) = P(Z > 1.5) = 6.7%; for X(t) = 0.05t + 0.2W(t) at t = 1, X is N(0.05, 0.04).
  - Exercises (4): multi, numeric · Callbacks: Q5.3, Q8.1, Q2.3
  - Sources: S092 Ch. 3-4 (scaled random walk and Brownian motion), S146 Ch. 3.1-3.3 (Brownian motion), S147 Ch. 2
- **Q8.3 Quadratic variation: why ordinary calculus fails** (60 min) — Compute the quadratic variation of a Brownian path and of a smooth path; Use the rule (dW)^2 = dt, dt dW = 0, (dt)^2 = 0 mechanically; Explain in a sentence why this produces the extra term in Itô's formula
  - Example: Daily log returns with sd 1.26% across 252 days give realised QV 252 x 0.0126^2 = 0.040, i.e. annualised vol 20%: the sum of squares converges, the sum of absolute values grows with finer sampling.
  - Exercises (4): mcq, numeric, table · Callbacks: Q8.2, Q3.2, F2.2
  - Sources: S146 Ch. 3.4 (quadratic variation), S012 Ch. 3, S147 Ch. 3
- **Q8.4 The Itô integral: building stochastic integrals** (60 min) — Describe the Itô integral as the limit of sums with left-endpoint evaluation; State mean-zero and Itô isometry and compute variance of simple integrals; Explain in words why the integral of W dW is (W^2 - t)/2 and not W^2/2
  - Example: The integral of W dW from 0 to T: the extra -T/2 is exactly the quadratic-variation correction; E[integral] = 0 consistent with E[W^2 - T] = 0.
  - Exercises (4): cloze, mcq, numeric · Callbacks: Q4.1, Q8.3, F6.5
  - Sources: S146 Ch. 4.1-4.3 (Itô integral), S147 Ch. 3, S012 Ch. 3
- **Q8.5 Itô's lemma: the chain rule for diffusions** (60 min) — Apply Itô's lemma to functions of W and of t and W; Derive the SDE of S^2, ln S and 1/S given dS = mu S dt + sigma S dW; Explain the -sigma^2/2 correction in the log
  - Example: For f = ln S: d ln S = (mu - sigma^2/2)dt + sigma dW; with mu = 8% and sigma = 20% the median grows at 6%, not 8%.
  - Exercises (5): mcq, numeric, order, spot, table · Callbacks: Q7.1, Q4.3, Q3.3, Q8.3
  - Sources: S146 Ch. 4.4 (Itô-Doeblin formula), S012 Ch. 3-4, S084 Ch. 4 (stochastic calculus basics)
- **Q8.6 Geometric Brownian motion and solving SDEs** (60 min) — Solve the GBM SDE explicitly and read off moments and quantiles of S(T); Simulate (conceptually) a path with the exact log-step; Compare arithmetic and geometric returns in a continuous-time setting
  - Example: S0 = 100, mu = 8%, sigma = 20%, T = 5: E[S] = 149.2, median = 100 e^{0.06x5} = 134.9, 5% quantile of the log-return distribution via z = -1.645.
  - Exercises (4): mcq, numeric · Callbacks: Q5.3, Q8.5, F2.1
  - Sources: S146 Ch. 4.4-4.5, S147 Ch. 5 (SDEs), S110 Ch. 5
- **Q8.7 Mean reversion and other SDEs: Ornstein-Uhlenbeck, CIR, Vasicek** (60 min) — Write and interpret OU / Vasicek / CIR dynamics and their long-run behaviour; Compute conditional mean and variance for an OU process; Link the PDE (Feynman-Kac) and expectation views conceptually
  - Example: Vasicek with a = 0.5, b = 3%, sigma = 1%: after 2 years the expected rate from r0 = 1% is 3% - 2% e^{-1} = 2.26%, and the stationary sd is 1%/sqrt(1) = 1%.
  - Exercises (4): bucket, match, numeric · Callbacks: F4.1, Q8.6, Q4.2
  - Sources: S146 Ch. 6 (connections with PDE) and Ch. 4, S147 Ch. 5, 8, S110 Ch. 24 (short rate models)
- **Q8.8 Girsanov, risk-neutral measure and the martingale representation** (60 min) — State what changing measure does to drift and not to volatility; Derive the risk-neutral dynamics of a stock from the real-world ones; Explain the roles of Girsanov and martingale representation in completeness of Black-Scholes
  - Example: mu = 9%, r = 2%, sigma = 20%: theta = 0.35; under Q the stock drifts at r; same volatility, so vol is observable while mu is not needed for pricing.
  - Exercises (4): cloze, mcq, numeric, paper · Callbacks: F6.2, F6.5, Q8.6
  - Sources: S146 Ch. 5 (risk-neutral pricing, Girsanov), S110 Ch. 11-12, S012 Ch. 3-4

Unit test: Brownian properties, quadratic variation, Itô's lemma computations, GBM/OU moments, Girsanov in words.

### F7 Asset pricing theory · 7 h · track: theory · needs: F5, Q8

_Stochastic discount factors, the consumption-based first-order condition, and the derivation of the CAPM and factor models from it._


- **F7.1 Preferences, utility and risk aversion** (60 min) — Compute expected utility and certainty equivalent for a lottery under CRRA and CARA; Derive absolute and relative risk aversion for given utility functions; Link risk aversion to the required premium for a risky asset
  - Example: Log utility, 50/50 gamble on wealth 80 or 120 EUR: EU = 0.5 ln 80 + 0.5 ln 120 = 4.5847, certainty equivalent 97.98 < 100, risk premium about 2.0 EUR.
  - Exercises (4): match, mcq, numeric · Callbacks: F5.1, Q3.2, Q5.2
  - Sources: S111 Ch. 1.1-1.3 (utility), S127 Ch. 1-2, S015 Ch. 6 (risk aversion)
- **F7.2 The fundamental equation: stochastic discount factor** (60 min) — Derive price = E[m x] from a two-period investor problem; Use the SDF to price a bond, a stock and a zero-cost excess return; Decompose the risk premium into -cov(m, R)
  - Example: m takes 1.1 in a bad state (p = 0.4) and 0.7 in a good state (p = 0.6); E[m] = 0.86 so Rf = 16.3%; a payoff paying 100 in the bad state only is worth 44 EUR.
  - Exercises (5): mcq, numeric, order, table · Callbacks: F6.2, F5.3, Q5.2
  - Sources: S111 Ch. 1 (Consumption-based model and overview), S127 Ch. 3-4, S112 Ch. 1-3
- **F7.3 SDF, beta pricing and the Hansen-Jagannathan bound** (60 min) — Show that any beta-pricing model corresponds to an SDF linear in factors; Use the Hansen-Jagannathan bound to bound the SDF volatility from Sharpe ratios; Compare CAPM and mean-variance frontiers in SDF language
  - Example: Equity Sharpe ratio 0.4: sigma(m)/E(m) must be at least 0.4. With CRRA = 2 and consumption growth vol 1.5%, sigma(m) is only about 3%, a large gap.
  - Exercises (4): match, mcq, numeric · Callbacks: F5.3, F5.4, F7.2, Q6.4
  - Sources: S111 Ch. 5-6 (beta representations, mean-variance frontier), Ch. 4.5 (HJ bound), S127 Ch. 5-6, S048 Sharpe 1964
- **F7.4 Consumption-based asset pricing and the equity premium puzzle** (60 min) — Compute equity premium implied by CRRA preferences and consumption growth; State the Mehra-Prescott puzzle and the risk-free rate puzzle; List the main directions out of the puzzles
  - Example: Historical premium 6%, consumption-growth vol 1.5%, correlation with stock 0.2, stock vol 16%: gamma = 6% / (0.2 x 1.5% x 16%) = 125, implausibly high.
  - Exercises (4): bucket, mcq, numeric · Callbacks: F7.3, F2.4, F5.2
  - Sources: S111 Ch. 21 (equity premium puzzle), S127 Ch. 7-8, S148 Ch. 8 (intertemporal equilibrium)
- **F7.5 Recursive preferences, habits and long-run risk** (60 min) — Distinguish risk aversion from elasticity of intertemporal substitution (Epstein-Zin); Explain why habit makes marginal utility counter-cyclical and raises risk premia; Evaluate the empirical realism of each approach
  - Example: With gamma = 10 and EIS = 1.5 the model can fit a premium of about 5-6% using persistent expected-growth shocks, unlike CRRA where gamma = 1/EIS.
  - Exercises (4): match, mcq, numeric, paper · Callbacks: F7.4, F5.5, Q1.3
  - Sources: S111 Ch. 21.2-21.3 (extensions), S127 Ch. 6, 9, S112 Ch. 5-6
- **F7.6 Factor models, APT and testing: Fama-French, Fama-MacBeth, GMM** (60 min) — Explain APT and the link between factor loadings and expected returns; Describe the two-pass Fama-MacBeth regression and what it estimates; Interpret GMM moment conditions E[m R^e] = 0 and pricing-error tests
  - Example: Three-factor regression of fund returns gives alpha = 0.25%/month, t = 1.1: significant only if t > 2; with 300 candidate factors some will clear t > 2 by chance.
  - Exercises (5): mcq, numeric, order, spot · Callbacks: F5.4, F7.3
  - Sources: S051 Fama-French 1993, S111 Ch. 12-13 (GMM, Fama-MacBeth), Ch. 9, S042 Ch. 7-8 (factor investing), S148 Ch. 6
- **F7.7 Complete markets, state prices and the fundamental theorems** (60 min) — State the two fundamental theorems of asset pricing in finite-state markets; Find state prices by solving a linear system (Arrow securities); Link SDF, risk-neutral measure and no-arbitrage through the same vector
  - Example: Two assets, three states: bond pays (1,1,1) at price 0.95, stock (80,100,130) at 97: a third security is needed to pin down state prices uniquely; incompleteness yields price intervals for a new payoff.
  - Exercises (5): match, mcq, numeric, spot · Callbacks: F6.1, Q6.2, F7.2
  - Sources: S112 Ch. 1-2 (state prices, FTAP), S120 Ch. 1-2, S111 Ch. 4, S092 Ch. 1

Unit test: SDF, HJ bound, CCAPM puzzles, factor model tests, state prices and FTAP.

### G1 Financial econometrics · 7 h · track: theory · needs: Q6, Q5

_Time-series models, stationarity, volatility estimation (GARCH), regression pitfalls and the statistical testing of a backtest._


- **G1.1 Linear regression: OLS, geometry and interpretation** (60 min) — Estimate OLS slope and intercept by hand for a small sample; Interpret coefficients, R-squared and residuals; link to projection (Q6); State the Gauss-Markov assumptions and what each buys
  - Example: Fund returns vs market for 6 months give slope (beta) = 0.92 and alpha = 0.10%/month: a CAPM regression read off in 3 lines.
  - Exercises (4): cloze, mcq, numeric · Callbacks: Q6.2, F5.3, Q2.1
  - Sources: S014 Ch. 2-3 (simple and multiple regression), S148 Ch. 1-2 (introduction), S039 Ch. 13
- **G1.2 Inference, heteroskedasticity and autocorrelation-robust errors** (60 min) — Test coefficient hypotheses with t- and F-statistics; Recognise heteroskedasticity and autocorrelation and explain what robust (White, Newey-West) standard errors fix; Compute a confidence interval and judge significance
  - Example: Estimated beta 1.1, standard error 0.40: t = 2.75; with Newey-West the se becomes 0.65, t = 1.7, no longer significant at 5%.
  - Exercises (4): bucket, mcq, numeric, spot · Callbacks: G1.1, Q2.4, F2.3
  - Sources: S014 Ch. 4, 8, 12, S122 Ch. 2 (large-sample theory), S148 Ch. 1.5
- **G1.3 Time series: stationarity, ARMA and forecasting** (60 min) — Test by reasoning whether an AR(1) is stationary and compute its moments; Interpret ACF/PACF pictures to choose AR vs MA; Produce multi-step AR(1) forecasts and show mean reversion
  - Example: AR(1) with phi = 0.8, mean 2%: shock of +1% today forecasts +0.8% tomorrow, +0.51% in 3 days; unconditional variance = sigma^2/(1-0.64).
  - Exercises (4): match, mcq, numeric · Callbacks: Q2.3, Q1.5, Q5.2
  - Sources: S153 Ch. 1-3 (difference equations, stationary ARMA), S041 Ch. 2, S148 Ch. 2
- **G1.4 Unit roots, spurious regression and cointegration** (60 min) — Distinguish trend-stationary and unit-root processes and apply the Dickey-Fuller logic; Explain why regressing two independent random walks gives spurious results; Describe cointegration and its use in pairs / basis relationships
  - Example: Two independent random walks regressed on each other show R^2 = 0.6 and t = 12: spurious; but an ETF and its NAV differ by a stationary spread (P5 callback), so they are cointegrated.
  - Exercises (4): bucket, mcq, numeric, order · Callbacks: P5.4, G1.3, Q8.1
  - Sources: S153 Ch. 15-19 (unit roots, cointegration), S041 Ch. 8, S148 Ch. 7
- **G1.5 Volatility stylised facts and ARCH** (60 min) — List stylised facts of returns: fat tails, clustering, leverage effect; Compute conditional variance from an ARCH(1) recursion; Test (conceptually) for ARCH effects
  - Example: ARCH(1) with omega = 0.00002, alpha = 0.3: after a -3% return the next-day variance is 0.00002 + 0.3 x 0.0009 = 0.00029, i.e., vol 1.70%.
  - Exercises (4): bucket, mcq, numeric · Callbacks: G1.3, F2.2, Q5.3
  - Sources: S113 Engle 1982, Sections 1-3, S041 Ch. 3, S148 Ch. 12
- **G1.6 GARCH family, forecasting volatility and VaR** (60 min) — Run a GARCH(1,1) recursion and forecast variance over a horizon; Explain persistence, half-life and why GARCH mean-reverts to long-run variance; Compute parametric VaR from a conditional variance forecast and explain EGARCH/GJR asymmetry
  - Example: omega = 0.000002, alpha = 0.08, beta = 0.90: long-run variance 0.0001 (vol 1.0%/day); persistence 0.98, half-life ln 0.5/ln 0.98 = 34 days.
  - Exercises (5): mcq, numeric, spot · Callbacks: G1.5, F2.2, Q8.7
  - Sources: S130 Bollerslev 1986, S041 Ch. 3, S089 Ch. on volatility estimation, VaR
- **G1.7 Research design: events, overfitting, multiple testing and backtests** (60 min) — Design an event study and compute a cumulative abnormal return; Explain data snooping, look-ahead and survivorship bias with examples from fund and index data; Adjust significance for multiple tests (Bonferroni idea) and judge a backtest claim
  - Example: A strategy picked as best of 40 variants shows t = 2.4; with Bonferroni the threshold for 5% overall is about t = 3.0, so the claim fails.
  - Exercises (4): numeric, paper, spot · Callbacks: F7.6, A6.1, G1.2
  - Sources: S148 Ch. 4 (event-study methodology), S107 Ch. 17, S042 Ch. 10, S014 Ch. 17

Unit test: OLS inference, ARMA, unit roots, GARCH, event-study and multiple-testing judgement.

### G2 Measure-theoretic probability & analysis bridge · 6 h · track: theory · needs: Q8

_Sigma-algebras, measures, the Lebesgue integral, and the convergence theorems used in stochastic-calculus proofs, introduced through finite examples._


- **G2.1 Why measure theory: sets, sigma-algebras and probability spaces** (60 min) — Verify whether a collection of sets is a sigma-algebra; Describe a probability space and information as a sigma-algebra (filtration idea); Explain why not every subset of [0,1] can be given a length
  - Example: Coin tossed twice: F_1 = information after toss 1 has 4 sets; F_2 is all 16 subsets; a filtration is the growing sequence.
  - Exercises (4): bucket, cloze, mcq, numeric · Callbacks: Q2.1, Q5.1, Q8.2
  - Sources: S104 Ch. 1-2, S143 Ch. 1.1, S155 Ch. 1-2 (analysis prerequisites)
- **G2.2 Random variables, distributions and modes of convergence** (60 min) — Check measurability of a function and compute the law of a random variable; Distinguish almost-sure, in probability, in L^p and in distribution convergence; Give a counterexample separating two modes
  - Example: X_n = n on a set of probability 1/n and 0 elsewhere: X_n -> 0 in probability but E|X_n| = 1 does not go to 0.
  - Exercises (4): match, mcq, numeric, spot · Callbacks: Q4.1, G2.1, Q5.4
  - Sources: S104 Ch. 3-5 (random variables, convergence), S143 Ch. 1-2 (laws of large numbers), S155 Ch. 2-3
- **G2.3 Lebesgue integral, expectation and limit theorems** (60 min) — Describe the Lebesgue integral as expectation, via simple functions; State and apply monotone and dominated convergence; Explain when E[lim] = lim E[] fails
  - Example: X_n = n 1_{(0,1/n)} on [0,1]: pointwise limit 0 but E[X_n] = 1: no dominating integrable function, so DCT is not available.
  - Exercises (4): cloze, mcq, numeric, spot · Callbacks: Q4.1, G2.2, Q5.2
  - Sources: S104 Ch. 6-9, S142 Ch. 5-6, S143 Ch. 1.4-1.5
- **G2.4 Conditional expectation as a projection** (60 min) — Compute E[X | G] for a finite partition; State tower, 'taking out what is known' and Jensen properties; Interpret conditional expectation as least-squares best predictor given information
  - Example: Three-toss tree: E[S_3 | F_1] computed node by node; also E[E[S_3|F_2]|F_1] equals the same, the tower rule in action.
  - Exercises (4): mcq, numeric, table · Callbacks: G1.1, G2.3, F6.3, Q6.3
  - Sources: S142 Ch. 9 (conditional expectation), S092 Ch. 2 (conditional expectation), S104 Ch. 13
- **G2.5 Martingales, stopping and convergence** (60 min) — Verify martingale property for a given process; Apply optional stopping to a gambler-ruin type problem; Link martingales to no-arbitrage pricing
  - Example: Fair-coin walk starting at 3, stopped at 0 or 10: P(reaches 10) = 3/10 by optional stopping on a martingale S_n.
  - Exercises (4): match, mcq, numeric · Callbacks: Q8.4, F6.2, G2.4
  - Sources: S142 Ch. 10-12, S092 Ch. 2.4-2.5, S143 Ch. 4
- **G2.6 Radon-Nikodym, change of measure and a glance at rigorous stochastic calculus** (60 min) — Compute a likelihood ratio dQ/dP on a finite space and re-weight an expectation; State Girsanov in measure-theoretic form and explain why Q and P are equivalent; Outline how Itô integrals are defined in L^2 and why the theory needs filtrations
  - Example: Binomial P(up) = 0.6, Q(up) = 0.4: Z = 4/6 on up, 6/4 on down; E_P[Z] = 1 and E_Q[X] = E_P[Z X].
  - Exercises (4): mcq, numeric, paper · Callbacks: Q8.8, F7.7, G2.5
  - Sources: S104 Ch. 10-11 (Radon-Nikodym), S146 Ch. 1.6, 5.2, S147 Ch. 4-8, S142 Ch. 14

Unit test: Sigma-algebras, modes of convergence, MCT/DCT, conditional expectation, martingales, Radon-Nikodym.

### G3 Numerical methods (concepts, no coding) · 4 h · track: theory · needs: F6

_Monte Carlo, finite-difference and tree methods for path-dependent products: method selection, test design and the checking of model output._


- **G3.1 Monte Carlo: the idea, its error and its limits** (60 min) — Describe the Monte Carlo estimator for a discounted expectation and its standard error; Compute the number of paths needed for a target accuracy; Explain the 1/sqrt(N) rate and when MC is preferred
  - Example: Payoff sd 12 EUR, wanted standard error 0.01 EUR: N = (12/0.01)^2 = 1.44 million paths; halving the error needs four times more.
  - Exercises (4): bucket, mcq, numeric · Callbacks: Q5.4, F6.4, Q8.6
  - Sources: S137 Ch. 1 (foundations) and Ch. 2, S094 Ch. on Monte Carlo, S084 Ch. 80 (Monte Carlo)
- **G3.2 Variance reduction, Greeks by simulation and American options** (60 min) — Explain antithetic variates, control variates and importance sampling in words; Compare pathwise, likelihood-ratio and bump-and-revalue Greek estimators; Describe Longstaff-Schwartz regression for early exercise
  - Example: Pricing an arithmetic Asian with the geometric Asian (closed form) as control variate cuts variance by roughly 95% at same path count.
  - Exercises (4): match, mcq, numeric, order · Callbacks: G3.1, F6.6, G2.4
  - Sources: S137 Ch. 4 (variance reduction), Ch. 7 (Greeks), Ch. 8 (American), S094 Ch. on Greeks and exotics, S084 Ch. on Monte Carlo
- **G3.3 Finite differences for the Black-Scholes PDE** (60 min) — Describe a grid in (S, t) and the explicit, implicit and Crank-Nicolson schemes; Explain stability and why explicit schemes need small time steps; Set boundary and terminal conditions for calls, puts and barriers
  - Example: Explicit scheme with dS = 1 and sigma = 25% at S = 100: stability needs dt <= dS^2/(sigma^2 S^2) = 0.0016 years, about 0.4 trading days; implicit has no such restriction.
  - Exercises (4): bucket, match, mcq, numeric · Callbacks: F6.5, Q7.1, Q4.3
  - Sources: S128 Ch. 1-4 (FDM for BS), S084 Ch. 77 (finite-difference methods), S094 Ch. on PDE methods
- **G3.4 Trees, method choice, convergence and model risk** (60 min) — Evaluate convergence of tree prices (oscillation) and why Richardson-style averaging helps; Choose method (closed form / tree / PDE / MC) for given products; Explain numerical vs model error and how to test an implementation conceptually
  - Example: Barrier note with 252-step tree vs closed form differ by 0.8 EUR because the barrier misaligns with nodes; moving to a tree aligned to the barrier cuts error to 0.05.
  - Exercises (4): mcq, paper, spot, table · Callbacks: G3.3, F6.8, P6.3
  - Sources: S094 Ch. on trees and implementation, S083 Ch. 21 (numerical procedures), S137 Ch. 1

Unit test: Method choice, error sizing for MC, finite-difference stability, convergence and validation logic.

### F8 Behavioural finance · 3 h · track: theory · needs: F5

_Prospect theory, loss aversion, mental accounting and other documented biases, and how an advisory process allows for them._


- **F8.1 Prospect theory and the standard biases** (60 min) — Compute prospect value with value function and loss aversion; Explain probability weighting and why small probabilities are over-weighted; Identify overconfidence, anchoring and mental accounting in case descriptions
  - Example: Gain of 100 vs loss of 100 with 50/50 odds and lambda = 2: value = 0.5 x 100^0.88 - 0.5 x 2 x 100^0.88 < 0, so the bet is refused although expected value is 0.
  - Exercises (4): bucket, match, mcq, numeric · Callbacks: F7.1, F2.1, F5.5
  - Sources: S106 Sections 1-3 of Barberis-Thaler, S044 Part I
- **F8.2 Limits to arbitrage, sentiment and market anomalies** (60 min) — Explain why mispricing can persist despite rational arbitrageurs; Describe momentum, value and post-earnings drift and competing explanations; Link anomalies to the efficient-market debate (F5.5)
  - Example: Closed-end fund trades at a 12% discount to NAV for years: arbitrage needs to hold the fund long, short the portfolio, and bear noise-trader risk that discount widens.
  - Exercises (4): bucket, mcq, numeric, spot · Callbacks: F5.5, P5.4, F8.1
  - Sources: S106 Sections 4-6, S055 Fama 1970, S042 Ch. 8-9
- **F8.3 Behavioural finance in advice and product design** (60 min) — Map client biases to suitability and appropriateness tasks (C4); Explain why capital-protected and autocallable notes appeal to some clients; Design a debiasing step in an advisory process
  - Example: A client who refuses to realise a loss on a position down 30% shows the disposition effect; a tax-loss swap into a similar ETF is the advice, but suitability must record the rationale.
  - Exercises (4): bucket, match, mcq, paper · Callbacks: C4.2, P6.4, F8.1
  - Sources: S044 Part II-III (private banking application), S106 Section 7, S096 Ch. on behavioural issues

Unit test: Prospect value, limits to arbitrage, behavioural countermeasures in advice.

Jurisdictions: Ties to suitability rules in C4 (MiFID II/ESMA, Reg BI, FinSA) by callback only.

**Checkpoint:** Boss quiz (40-45 min, about 30 items) mixing all seven modules: pricing and Greeks calculations, Ito computations, SDF and GARCH numerics, measure-theory concept checks and a method-selection case. Pass mark 75%; one optional paper (explain a pricing argument end to end) gives bonus XP only.

Open questions: See syllabus/FACTS.md (originals in open-questions.txt)

## Coverage of the boss's list

- stocks: 2 module(s)
- bonds: 3 module(s)
- funds: 4 module(s)
- order & execution workflows: 8 module(s)
- brokerage & commissions: 2 module(s)
- NAV: 3 module(s)
- PnL: 3 module(s)
- corporate actions: 5 module(s)
- Lombard: 4 module(s)
- margin calls: 2 module(s)
- contract notes: 1 module(s)
- income accounting: 2 module(s)
- gain accounting: 1 module(s)
- limits by issuer/group: 2 module(s)
- dealer execution: 6 module(s)
- custodian: 9 module(s)
- transfers: 3 module(s)
- suitability: 5 module(s)
- trading restrictions: 3 module(s)
- chart of accounts: 3 module(s)
- approvals: 1 module(s)
- client onboarding: 3 module(s)
- client accounts: 9 module(s)