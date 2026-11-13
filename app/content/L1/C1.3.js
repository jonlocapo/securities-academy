/* C1.3 Mandates: execution-only, advisory and discretionary */
SA.unit({
  id: 'C1.3',
  lesson: [
    {
      md: String.raw`## Service levels and who decides

A private bank receives instructions of three kinds. A client may ask the bank to buy 100 shares of a named company immediately. Another may ask what to do with a bond portfolio after interest rates have moved. A third may ask the bank to keep the portfolio balanced while the client is unreachable for several months.

These are three different services. They differ in who takes the investment decision, and that determines the bank's duties, the documentation required, and who bears responsibility for the outcome. The three service levels are execution-only, advisory and discretionary.`,
    },
    {
      md: String.raw`## The three service levels

| Service | Who decides | What the bank does | Main duty |
|---|---|---|---|
| **Execution-only** | The client | Takes the order and executes it, with no recommendation | Check **appropriateness** for complex products. For simple ones, warn that no check is made |
| **Advisory** | The client, after a **personal recommendation** from the bank | Recommends specific trades suited to this client, and the client accepts or declines | **Suitability** assessment before every recommendation |
| **Discretionary** (portfolio management) | The **bank**, within a signed mandate | Decides and trades without asking each time | Suitability, investment guidelines and **periodic reports** |

The further up the table, the more of the decision, and so of the responsibility, sits with the bank.

> [!recall] C1.2
> The same securities account can be run execution-only, advised or discretionary. The mandate is the agreement that sits on top of the account.`,
      check: {
        template: 'mcq',
        prompt: 'The relationship manager phones a client with a specific bond switch. The client says "go ahead". Which service is this?',
        choices: ['Advisory', 'Execution-only', 'Discretionary', 'Custody only'],
        answer: 0,
        solution: 'A personal recommendation that the client approves is advice. If the bank had done it without asking, it would be discretionary.',
      },
    },
    {
      md: String.raw`## Matching the client to a service model

Banks identify the client's preferred service model with a few questions on decision-making. The main ones are:

- Is the client interested in financial markets and in monitoring the portfolio?
- Is the client comfortable delegating decisions when short of time or know-how?
- Does the client want to take time over each decision, and is the client available for regular contact?
- Would the client like to delegate monitoring and receive a regular flow of proposals instead?

A client who wants to decide alone fits a **self-directed** (execution-only) service. A client who wants proposals but keeps the final say fits **advisory**. A client who prefers to delegate fits **discretionary**.

Behavioural segmentation gives the same picture. **Delegators** want a reliable professional to manage the money and report clearly. **Participators** enjoy taking part and expect a steady stream of ideas to choose from. **Selectors** are sophisticated investors who pick their own products and expect innovative offers and high-quality execution.

The answers are an indication only. The service legally applies from the signed agreement, and a client can move between models later.

> [!recall] C1.1
> The behavioural groups sit alongside the wealth band and source of wealth as segmentation criteria.`,
    },
    {
      md: String.raw`## The advisory process

Advice follows a structured process, which also protects the bank because it evidences what was recommended and why.

1. **Profile the client.** Record assets and liabilities (including those held elsewhere), income, tax situation and expected inheritances. Assets needed to cover specific liabilities are invested at low risk. The rest is invested according to the client's risk tolerance, which is usually measured by a questionnaire. The result sets the type of mandate, any exclusions, and the frequency and mode of contact.
2. **Propose.** The adviser builds an asset allocation, often with specialists, and issues a proposal that summarises the allocation and the recommended products.
3. **Agree and implement.** The client agrees, the portfolio is built and trades are executed. Monitoring alerts the adviser when the portfolio drifts from the agreed allocation.
4. **Review.** The client's risk and service profile are reviewed on a continuing basis.

> [!example]
> A client has EUR 1,000,000. EUR 300,000 is earmarked for a house purchase in two years, so it goes into low-risk deposits and short government bonds. The remaining EUR 700,000 is invested for a balanced profile with a 50% equity target, which is **EUR 350,000** of equities. The adviser agrees a tolerance of 5 percentage points. If equities rise to EUR 420,000 of the same EUR 700,000, the weight is 60% and an alert prompts a review.

The same four steps apply to discretionary management, except that the bank takes the decision in step 3.`,
    },
    {
      md: String.raw`## Suitability and appropriateness

MiFID II contains two separate tests.

| | **Suitability** | **Appropriateness** |
|---|---|---|
| Applies to | Advice and portfolio management | Non-advised sales of **complex** products |
| Asks | Does the product fit the client's **objectives**, **financial situation** (ability to bear a loss) and **knowledge and experience**? | Does the client have the **knowledge and experience** to understand the product? |
| If the answer is no | The bank must not recommend or trade | The bank warns the client; the client may still go ahead |

Execution-only without the appropriateness test is allowed only when three conditions hold. The product is **non-complex**, for example shares traded on a regulated market or UCITS funds. The order is placed at the **client's initiative**. The client is clearly told that the bank is not assessing suitability or appropriateness. An order placed in response to a personalised communication from the bank does not qualify, because the bank has then in effect prompted the trade. A structured note is usually complex, so a retail client buying one on his own initiative is subject to an appropriateness check.

> [!eu]
> The EU rules sit in Article 25 of [MiFID II](https://eur-lex.europa.eu/eli/dir/2014/65/oj). The ESMA suitability guidelines explain how to do the assessment, and the ESMA appropriateness guidelines explain when the execution-only exemption applies. Retail clients who receive advice must get a written **suitability statement** before the transaction. Firms need procedures that show clearly whether a transaction was advised, non-advised or execution-only.

> [!us]
> In the US, Regulation Best Interest requires a broker-dealer to act in the retail customer's best interest when making a recommendation. There is no separate appropriateness test, but a recommendation must fit the client.`,
    },
    {
      md: String.raw`## The mandate document

A service level applies only once the client has signed the corresponding agreement. For discretionary management the signed **mandate** contains:

- the **objective** (for example "balanced growth") and **risk profile**
- **investment guidelines**: allowed asset classes, limits per issuer, currencies, forbidden instruments
- **fees** and how they are charged
- **reporting**: a periodic statement every three months, or every month if the mandate allows a leveraged portfolio, plus a notice by the end of the business day if the portfolio value falls 10% below its value at the start of the reporting period (and then at each further 10% multiple).

The guidelines set the limits within which the manager decides without calling the client. Going beyond them requires a new signature.

> [!warning]
> A mandate called "discretionary" in which every order needs the client's approval is advisory, with the duties and documentation of advice. Files should be checked for this contradiction.`,
    },
    {
      md: String.raw`## Worked example: three clients, three paths

> [!example]
> **Execution-only:** a client instructs "buy 100 shares of X". The bank executes. Shares are simple, so there is no appropriateness test, only a standard warning. If the client had asked for a complex structured note, the bank would first have asked about his knowledge and experience.
>
> **Advisory:** the relationship manager proposes switching EUR 50,000 from one bond to another. She first checks the client's objectives, risk capacity and experience (suitability) and records the recommendation. The client then accepts or declines. The decision is the client's.
>
> **Discretionary:** under a signed mandate with a 60/40 target and a 10% issuer limit, the portfolio manager rebalances after a market move without calling the client and reports it in the next quarterly statement.

The same order, "buy bonds", has a different legal nature depending on who initiated it and who decided.

> [!tip]
> To classify a call, establish who first named the specific security. If the bank did, the service is at least advice.`,
    },
    {
      md: String.raw`## Summary

- **Execution-only:** client decides, no advice. Appropriateness applies to complex products, and simple ones carry a warning.
- **Advisory:** the bank gives a personal recommendation and the client decides. **Suitability** is mandatory.
- **Discretionary:** the bank decides within the signed mandate. Suitability, guidelines and **periodic reports** apply.
- Responsibility and documentation increase with each step from execution-only to discretionary.
- A mandate that needs client approval for every order is advisory, not discretionary.`,
    },
  ],

  exercises: [
    {
      id: 'sort-situations',
      template: 'bucket',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const nm = r.pick(M.names);
        const sh = r.pick(M.companies).n;
        const bd = r.pick(['a 2031 government bond', 'a corporate bond', 'a covered bond']);
        const eo = [
          () => `${nm} phones: "buy ${r.int(2, 20) * 50} shares of ${sh}" and the bank executes with no comment`,
          () => `${nm} enters a buy order for ${r.int(3, 30) * 100} ETF units in the banking app without any recommendation`,
          () => `${nm} instructs the bank to sell ${f.money(M.amt(r.int(5, 50) * 1000), CCY, 0)} of ${bd}; the bank only executes`,
          () => `${nm} sets a limit order after reading research on their own`,
          () => 'The client picks a fund in the app and taps "buy"; the bank does nothing but execute',
          () => `${nm} tells the bank "buy ${f.money(M.amt(r.int(5, 40) * 1000), CCY, 0)} of the structured note I found"; the bank only tests appropriateness`,
          () => `${nm} sends a written order to transmit ${r.int(1, 10) * 100} ${sh} shares and the bank forwards it`,
          () => `The client has decided; the relationship manager books the order without any view`,
        ];
        const adv = [
          () => `The relationship manager proposes selling ${bd} to buy another; ${nm} agrees by phone before the order`,
          () => `The bank sends ${nm} a personal recommendation to add ${sh}; ${nm} decides whether to place the order`,
          () => `At the review, the manager suggests cutting equities by ${r.int(5, 20)}%, and ${nm} signs the order`,
          () => `The adviser presents three funds that fit ${nm}'s profile; ${nm} chooses one`,
          () => `The app suggests a portfolio; ${nm} confirms each trade`,
          () => `The bank recommends a structured note after a suitability assessment; ${nm} says yes`,
          () => `Each trade is proposed by the bank and needs ${nm}'s approval first, under an advisory agreement`,
          () => `The manager calls with a specific idea in ${sh}; the client may accept or refuse`,
        ];
        const disc = [
          () => `The portfolio manager rebalances back to 60/40 without calling ${nm}, within the signed mandate`,
          () => `While ${nm} is away, the bank buys ${bd} inside the mandate's limits`,
          () => `The manager sells ${f.money(M.amt(r.int(10, 60) * 1000), CCY, 0)} of equities after the model changes and reports it in the quarterly statement`,
          () => `${nm} has delegated all decisions; the manager switches fund A into fund B`,
          () => 'The monthly deposit is invested automatically according to the mandate, without asking',
          () => `The manager buys ${sh} shares, within the 10% single-issuer limit, and tells ${nm} later`,
          () => 'The manager hedges currency exposure as allowed by the mandate guidelines',
          () => 'The bank trades the portfolio daily on its own judgement, within the investment guidelines',
        ];
        const mix = r.pick([[3, 4, 3], [4, 3, 3], [3, 3, 4]]);
        const items = [];
        [eo, adv, disc].forEach((pool, b) => r.sample(pool, mix[b]).forEach((fn) => items.push({ text: fn(), bucket: b })));
        return {
          prompt: 'Sort each situation by the type of service it describes.',
          buckets: ['Execution-only', 'Advisory', 'Discretionary'],
          items: r.shuffle(items),
          hints: ['Who decides? Client with no recommendation: execution-only. Client decides after a recommendation: advice. Bank decides: discretionary.'],
          solution: 'Execution-only: the client decides and the bank executes. Advisory: the bank recommends and the client decides. Discretionary: the bank decides within the mandate.',
        };
      },
    },
    {
      id: 'who-decides',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const A = 'The client decides; the bank has no suitability duty (only appropriateness for complex products)';
        const B = 'The client decides after the bank\'s personal recommendation; the bank must assess suitability';
        const C = 'The bank decides within the mandate; the bank must assess suitability';
        const D = 'The bank decides; no suitability assessment is needed because the client signed a mandate';
        const E = 'The client decides; the bank must assess suitability because the order is large';
        const amt = f.money(M.amt(r.int(5, 80) * 1000), CCY, 0);
        const cases = [
          { q: `A client phones in an order to buy ${amt} of an equity ETF. The bank made no suggestion.`, h: [`The client phones in an order of ${amt}, and the text says the bank made no suggestion. Decide who first named the product.`, 'Compare what each option says about who decides and about the bank’s duty. Consider whether an equity ETF is a complex product.'], a: A },
          { q: `A client buys ${amt} of shares in a listed company on the bank's trading app after reading a newspaper.`, h: [`The client reads a newspaper and places a ${amt} order on the trading app. Decide who chose the shares.`, 'Neither the app nor the bank makes a recommendation here. Compare what each option says about who decides, and whether listed shares are a complex product.'], a: A },
          { q: `The relationship manager proposes a specific ${amt} bond switch; the client says yes.`, h: [`The relationship manager proposes a specific ${amt} bond switch. Decide who first named the transaction and who has the last word.`, 'A specific proposal made to this client is a personal recommendation, and the client then accepts or refuses. Compare what each option says about the bank’s duty.'], a: B },
          { q: `After a portfolio review the bank recommends trimming ${amt} of equities; the client signs the order.`, h: [`After a portfolio review the bank recommends trimming ${amt} of equities. Decide who proposed the trade and who gave the instruction.`, 'The bank proposed the trade and the client signed the order. Compare what each option says about who decides and what assessment applies.'], a: B },
          { q: `Under a signed discretionary mandate the manager sells ${amt} of equities and informs the client later.`, h: [`The mandate is signed and the manager sells ${amt} of equities, informing the client afterwards. Decide who took the decision to sell.`, 'The client is told after the event, so no approval was needed. Compare which options place the decision with the bank and what they say about the assessment.'], a: C },
          { q: `A signed mandate lets the bank rebalance a ${amt} drift back to target without a call.`, h: [`A signed mandate lets the bank rebalance a ${amt} drift without calling the client. Decide who takes the decision to trade.`, 'The bank acts inside the mandate and does not ask for approval. Compare which options place the decision with the bank and what they say about the assessment.'], a: C },
          { q: `The client orders ${amt} of a complex structured note he found himself, with no advice from the bank.`, h: [`The client found the structured note and orders ${amt} with no advice. Decide who chose it, then consider whether a structured note is simple or complex.`, 'With no advice, the client decides. For a complex product some test still applies, so read which options mention it.'], a: A },
          { q: `The bank's advisory app recommends a fund to the client, who taps "confirm" on ${amt}.`, h: [`The advisory app recommends a fund and the client confirms ${amt}. Decide who first named the fund and who gave the final instruction.`, 'A recommendation made to this client and then confirmed by the client is advice. Compare what each option says about who decides and the bank’s duty.'], a: B },
        ];
        const c = r.pick(cases);
        const choices = [A, B, C, D, E].filter((x, i, arr) => arr.indexOf(x) === i);
        return {
          prompt: `Who takes the investment decision, and what duty does the bank have?\n\n${c.q}`,
          choices,
          answer: choices.indexOf(c.a),
          fixedOrder: false,
          hints: c.h,
          solution: `**${c.a}.**`,
        };
      },
    },
    {
      id: 'obligation-match',
      template: 'match',
      generate(r) {
        const pool = {
          'Execution-only, complex product': ['The bank tests the client\'s knowledge and experience (appropriateness) before executing', 'Appropriateness test; a warning if the product is not appropriate'],
          'Execution-only, simple listed share': ['Clear warning that the bank is not assessing suitability or appropriateness', 'No test, but the client is told that no assessment is made'],
          'Advisory': ['Suitability assessment, and a written statement of suitability for retail clients', 'Suitability assessment before every personal recommendation'],
          'Discretionary': ['Suitability assessment, investment guidelines and periodic portfolio statements', 'Signed mandate with guidelines and regular reporting to the client'],
        };
        const keys = r.shuffle(Object.keys(pool));
        return {
          prompt: 'Match each service with the obligation that characterises it.',
          pairs: keys.map((k) => [r.pick(pool[k]), k]),
          hints: ['Appropriateness is for non-advised complex products; suitability is for advice and portfolio management.'],
          solution: 'Execution-only complex: appropriateness. Execution-only simple: warning. Advisory: suitability. Discretionary: suitability, guidelines and periodic reporting.',
        };
      },
    },
    {
      id: 'ladder',
      template: 'order',
      generate(r) {
        const nm = r.pick(['Marco', 'Elena', 'Oliver', 'Sarah', 'Wei Ming', 'Ka Yan']);
        const sec = r.pick(['bonds', 'shares', 'fund units']);
        return {
          prompt: 'Put these services in order of increasing responsibility for the bank (least first).',
          items: [
            `Execution-only: ${nm} decides and places an order for ${sec}; the bank executes`,
            `Advisory: the bank recommends a trade in ${sec} and ${nm} decides`,
            `Discretionary: the bank decides and trades ${sec} within the signed mandate`,
          ],
          hints: ['The more of the decision the bank takes, the more responsibility it carries.'],
          solution: 'Execution-only, then advisory, then discretionary.',
        };
      },
    },
    {
      id: 'mandate-summary',
      template: 'spot',
      generate(r, f) {
        const nm = r.pick(['Marco Rinaldi', 'Anna Weber', 'Jan Visser', 'Sofia Laurent', 'Carmen Ruiz']);
        const no = r.int(100000, 999999);
        const amt = f.eur(r.int(2, 20) * 100000, 0);
        const type = r.pick(['disc', 'adv', 'eo']);
        const kind = r.int(0, 2);
        let lines, errIdx, why;
        if (type === 'disc') {
          lines = [
            `Client: ${nm}, no. ${no}, MiFID category: retail`,
            `Service: discretionary portfolio management, initial amount ${amt}`,
            kind === 0 ? 'Decisions: every order requires prior approval by the client' : 'Decisions: taken by the portfolio manager within the mandate, without prior client approval',
            kind === 1 ? 'Suitability assessment: not required' : 'Suitability assessment: completed at onboarding (balanced profile)',
            kind === 2 ? 'Investment guidelines: none' : 'Investment guidelines: max 60% equities, max 10% per issuer, no leveraged products',
            'Reporting: quarterly statement; notice if the portfolio loses 10% in value',
            'Fees: 1.00% a year on assets under management',
          ];
          errIdx = [2, 3, 4][kind];
          why = ['In a discretionary mandate the manager decides without prior approval for each order. Needing approval makes it advisory.', 'Suitability must be assessed for portfolio management; it cannot be waived.', 'A discretionary mandate must set investment guidelines (limits the manager may not cross).'][kind];
        } else if (type === 'adv') {
          lines = [
            `Client: ${nm}, no. ${no}, MiFID category: retail`,
            'Service: advisory agreement with personal recommendations',
            kind === 0 ? 'Decisions: the bank may trade for the client without asking' : 'Decisions: the client decides on every recommendation',
            kind === 1 ? 'Suitability assessment: not needed for recommendations' : 'Suitability assessment: completed before each recommendation',
            'Documentation: written suitability statement given before the transaction',
            'Reporting: transaction confirmations and periodic statements',
            'Fees: advisory fee of 0.60% a year',
          ];
          if (kind === 2) { lines[4] = 'Documentation: no suitability statement given to the retail client'; }
          errIdx = [2, 3, 4][kind];
          why = ['In advisory service the client takes the decision; a bank that trades without asking is acting on discretion.', 'Suitability must be assessed before any personal recommendation.', 'A retail client who receives advice must get a written suitability statement before the transaction.'][kind];
        } else {
          lines = [
            `Client: ${nm}, no. ${no}, MiFID category: retail`,
            'Service: execution-only, orders given by phone and app',
            kind === 0 ? 'Recommendations: the bank gives a personal recommendation before each order' : 'Recommendations: none; the client decides alone',
            kind === 1 ? 'Complex products: bought without any appropriateness test or warning' : 'Complex products: appropriateness test required, with a warning if not appropriate',
            kind === 2 ? 'Investment guidelines: the bank manages the portfolio within them' : 'Investment guidelines: not applicable',
            'Information: the client is told that no suitability assessment is made for simple products',
            'Fees: EUR 12 per order',
          ];
          errIdx = [2, 3, 4][kind];
          why = ['Execution-only means no recommendation. A personal recommendation makes the service advisory.', 'Complex products need an appropriateness test even when execution-only.', 'Execution-only has no portfolio management and so no investment guidelines for the bank to follow.'][kind];
        }
        return {
          prompt: 'Review this mandate summary. Flag the line that contradicts the service type.',
          title: 'Mandate summary (extract)',
          doc: lines.map((t, i) => ({ text: t, error: i === errIdx, why: i === errIdx ? why : undefined })),
          count: 1,
          hints: ['Check the line against the service named in line 2: who decides, and which test applies?'],
        };
      },
    },
  ],
});
