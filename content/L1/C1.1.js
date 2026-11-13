/* C1.1 Client segments: retail, private banking and institutional */
SA.unit({
  id: 'C1.1',
  lesson: [
    {
      md: String.raw`## Client types

A private bank in Luxembourg serves clients of very different size. An individual with EUR 30,000 of savings who wants to invest in funds, a family with EUR 8 million of investable assets who want a portfolio managed across generations, and a pension fund buying EUR 200 million of government bonds and hedging them all need different services and documents. They are also protected by the law to different degrees.

Two separate classifications apply to each client: the bank's commercial segment, and the legal category under MiFID II. This unit covers both. Accounts, mandates and onboarding in the rest of the client track depend on them.`,
    },
    {
      md: String.raw`## Segments

Banks group clients by size and needs. The labels differ between banks, but three segments are common:

| Segment | Who | Typical needs | Typical services |
|---|---|---|---|
| **Retail** | Individuals with modest savings | Everyday banking, saving, a first investment | Current account, savings, funds, online brokerage, mortgages |
| **Private banking / wealth** | Wealthy individuals and families (often from about EUR 1 m of investable assets, the threshold varies by bank) | Preserving and growing wealth, tax and succession planning | Dedicated relationship manager, advice, discretionary portfolios, Lombard loans, bespoke products |
| **Institutional** | Pension funds, insurers, asset managers, corporates, sovereign funds, banks | Large-scale investing, hedging, financing, safekeeping | Execution and algorithmic trading, repo and securities lending, global custody, OTC derivatives, issuance |

A segment is a commercial label. It decides which team serves the client and which price list applies. Legal protection is decided by a second classification, described below.`,
      check: {
        template: 'mcq',
        prompt: 'A bank puts a family with EUR 8 m into its "private banking" segment. What does that label decide?',
        choices: [
          'Which team serves them and which services and prices apply',
          'That they are automatically a professional client under MiFID II',
          'That they lose all investor-protection rules',
          'That they are an eligible counterparty',
        ],
        answer: 0,
        solution: 'The segment is the bank\'s own commercial grouping. The legal protection category is decided separately, under MiFID II.',
      },
    },
    {
      md: String.raw`## Segmenting private-banking clients

Clients with similar wealth can have very different needs, so private banks segment on more than one criterion. Wealth comes first because a minimum level of investable assets is the entry condition. The usual bands form a **wealth pyramid**. Banks define the thresholds differently, so the figures below are only indicative.

| Band | Investable assets (indicative) |
|---|---|
| Affluent | About 100,000 to 500,000 |
| High net worth (HNW) | From about 0.5 m or 1 m |
| Very high net worth | From about 5 m or 20 m, depending on the bank |
| Ultra high net worth (UHNW) | Above about 50 m |

A bank forms dedicated teams for a band only when it has enough clients in it. Further criteria refine the band:

- **Geographic origin or home base**, which affects the applicable law, tax, currency and typical products.
- **Source of wealth**, for example a first-generation entrepreneur, an heir, an executive or a professional. Each has a different need for business, succession or liquidity advice.
- **Behaviour**, meaning how the client wants to take decisions. Delegators hand decisions to the bank, participators want a regular flow of ideas, and selectors choose their own products. UHNW clients are often treated as a fourth group with institutional-style demands.
- **Life-cycle stage**, such as building, preserving or transferring wealth.

A larger client is not always more profitable. Bigger clients negotiate lower fees and may need dedicated staff.

> [!example]
> Client A has EUR 3 m and pays 0.90% a year, which is EUR 27,000. Servicing costs EUR 12,000, so the margin is EUR 15,000 or 0.50% of assets.
> Client B has EUR 60 m and pays 0.30%, which is EUR 180,000. Servicing costs EUR 150,000 including a dedicated trader, so the margin is EUR 30,000 or **0.05%** of assets.
> Client B is twenty times larger and earns the bank only twice as much.`,
    },
    {
      md: String.raw`## MiFID II client categories

In the EU, [MiFID II](https://eur-lex.europa.eu/eli/dir/2014/65/oj) requires every investment firm to classify each client into one of three categories (Art. 4(1)(10)-(11), Art. 30 and Annex II):

| Category | Default for | Protection | Typical consequences |
|---|---|---|---|
| **Retail** | Every individual unless proven otherwise, and small companies | Highest | Full disclosure, suitability and appropriateness checks, a KID before buying a PRIIP such as a structured note |
| **Professional** | Credit institutions, investment firms, insurers, funds and their managers, pension funds, large undertakings, governments and central banks ("per se"), plus retail clients who opted up | Medium | Fewer disclosures. The firm may presume experience and knowledge for the entities that are professional per se, but not for clients who opted up |
| **Eligible counterparty (ECP)** | Investment firms, credit institutions, insurers, UCITS and their managers, pension funds, other regulated financial institutions, national governments and central banks, for executing orders, dealing on own account or receiving and transmitting orders | Lowest | Several conduct rules (best execution, client-order handling, suitability) do not apply to those services. The firm must still act honestly, fairly and professionally |

A **large undertaking** is one that meets at least two of three tests: balance sheet total of EUR 20 m, net turnover of EUR 40 m, own funds of EUR 2 m.

> [!recall] P1.5
> In the market map, the investor sits at one end and the sell side at the other. The MiFID classification determines how much protection the investor at the end of the chain receives.`,
    },
    {
      md: String.raw`## Opting up and opting down

Wealth does not change the default category. Applied to the three clients above:

> [!example]
> The individual with EUR 30,000, salaried: **retail**, with the highest protection.
> The family with EUR 8 m: a private-banking client for the bank, but **retail** under MiFID II.
> The pension fund: an institution and normally a **professional** client.

Clients can move between categories, with safeguards:

- **Opt up (retail to professional):** the client asks in writing. The firm assesses expertise, experience and knowledge, and the client must meet at least two of three tests. The first is significant transactions at an average of 10 per quarter over the previous four quarters. The second is a portfolio of cash deposits and financial instruments above EUR 500,000. The third is at least one year in a professional position in the financial sector that requires knowledge of the transactions. The firm must warn the client in writing which protections are lost, and the client must confirm that it understands.
- **Opt down:** professional clients and ECPs may ask for a higher level of protection. An ECP can ask for it generally or trade by trade.

> [!warning]
> A high net worth does not make a client professional. An individual with EUR 100 m is retail until the opt-up procedure is passed. Opting up is the client's request, and a bank cannot reclassify a client to reduce its own paperwork.

> [!us]
> The US has no MiFID-style three-way split. Regulation Best Interest protects "retail customers", while "accredited investors" (an income or net-worth test) get access to private offerings.

> [!uk]
> The UK FCA rulebook keeps the same three categories (retail, professional, eligible counterparty).

> [!ch]
> Switzerland's FinSA uses retail, professional and institutional clients; wealthy retail clients can opt out of retail status.`,
    },
    {
      md: String.raw`## Effects of the category in daily work

The category is stored on the client record and determines what the system allows:

1. **Information:** retail clients get more detailed risk warnings and cost disclosure. A structured note sold to a retail client needs a KID.
2. **Checks on advice:** when advising, the bank must assess suitability (whether the product fits the client's goals, knowledge and capacity to bear losses). For non-advised complex products it checks appropriateness. The detail is in C1.3, and the checks are strictest for retail clients.
3. **Execution:** best-execution duties apply in full to retail clients, and in a lighter form to professionals.
4. **Reporting:** statements, cost reports and complaints handling follow the category.

Working rules:

- Read the category before acting on an instruction.
- A change of category must be documented and signed.
- If the category is unclear, treat the client as retail, since wrongly treating a retail client as professional removes protections the client is entitled to.`,
    },
    {
      md: String.raw`## Summary

- Segments (retail, private banking, institutional) are the bank's commercial grouping. They set service and pricing, not legal protection.
- Private-banking clients are segmented first by wealth band, then by origin, source of wealth, behaviour and life-cycle stage. Wealth bands vary by bank, and a bigger client is not always more profitable.
- MiFID II has three categories: retail (highest protection), professional and eligible counterparty (lowest). Wealth does not change the default, so a wealthy family is retail unless it passes the opt-up procedure.
- Opting up needs a written request, an assessment and a written warning about lost protections; ECPs and professionals can always opt down.
- The category determines information, suitability and appropriateness checks, best execution and reporting.`,
    },
  ],

  exercises: [
    {
      id: 'sort-profiles',
      template: 'bucket',
      generate(r, f) {
        const nm = r.pick(['Marta', 'Luca', 'Jan', 'Pierre', 'Oliver', 'Sarah', 'Wei Ming', 'Ka Yan', 'Priya', 'Daniel']);
        const retail = [
          () => `${nm}, 29, salaried employee, ${f.eur(r.int(5, 40) * 1000, 0)} in savings`,
          () => `A retired teacher with ${f.eur(r.int(20, 120) * 1000, 0)} to invest in funds`,
          () => `A student receiving ${f.eur(r.int(3, 15) * 1000, 0)} from a grandparent`,
          () => `A self-employed plumber with ${f.eur(r.int(10, 90) * 1000, 0)} on deposit`,
          () => `A couple saving ${f.eur(r.int(200, 900), 0)} a month into a fund plan`,
          () => `A nurse who wants to buy ETF units for ${f.eur(r.int(2, 20) * 1000, 0)}`,
        ];
        const pb = [
          () => `A business-owning family with EUR ${r.int(3, 20)} m of investable assets`,
          () => `An entrepreneur who sold her firm and holds EUR ${r.int(2, 15)} m in cash`,
          () => `A surgeon with EUR ${r.int(2, 6)} m portfolio who asks for a dedicated relationship manager`,
          () => `A family seeking succession planning on EUR ${r.int(8, 40)} m of assets`,
          () => `A retired executive with EUR ${r.int(3, 12)} m who wants a Lombard loan against her portfolio`,
          () => `A footballer with EUR ${r.int(2, 9)} m of earnings to invest`,
        ];
        const inst = [
          () => `A pension fund managing EUR ${r.int(2, 40)} bn for members`,
          () => `An insurance company investing EUR ${r.int(500, 5000)} m of premiums`,
          () => `A regional bank placing a EUR ${r.int(50, 400)} m bond order`,
          () => `A corporate treasurer hedging EUR ${r.int(20, 300)} m of FX exposure`,
          () => `An asset manager running ${r.int(5, 60)} UCITS funds`,
          () => `A sovereign wealth fund seeking global custody for EUR ${r.int(5, 80)} bn`,
        ];
        const mix = r.pick([[3, 4, 3], [4, 3, 3], [3, 3, 4]]);
        const items = [];
        [retail, pb, inst].forEach((pool, b) => {
          r.sample(pool, mix[b]).forEach((fn) => items.push({ text: fn(), bucket: b }));
        });
        return {
          prompt: 'Sort each client profile into the segment a bank would normally place it in.',
          buckets: ['Retail', 'Private banking', 'Institutional'],
          items: r.shuffle(items),
          hints: ['Consider scale and needs: who needs a relationship manager and who needs custody and execution at scale?', 'Individuals or families with several million euros are private banking; legal entities investing members\' or premium money are institutional.'],
          solution: 'Retail: individuals with modest savings. Private banking: wealthy individuals and families with tailored needs. Institutional: pension funds, insurers, banks, corporates, asset managers and sovereign funds.',
        };
      },
    },
    {
      id: 'category-consequence',
      template: 'match',
      generate(r) {
        const pool = {
          'Retail': [
            'Receives the most detailed disclosures and the strongest conduct protection',
            'Bank must check suitability when advising and appropriateness for complex products',
            'Must get a KID before buying a PRIIP such as a structured note',
          ],
          'Professional (per se)': [
            'Fewer disclosures, because the bank may presume knowledge for products in its field',
            'Bank may presume experience, so the appropriateness test is generally not needed',
            'Lighter information and reporting duties than for retail',
          ],
          'Eligible counterparty': [
            'Best execution and client-order handling rules do not apply to its counterparty services',
            'Dealt with as a counterparty, under the lightest conduct regime',
            'May ask to be treated as professional or retail for more protection',
          ],
          'Retail client opted up to professional': [
            'Asked in writing and passed an assessment, so some protections are lost',
            'Must be warned in writing which protections it gives up',
            'Needs two of three tests, such as a portfolio above EUR 500,000',
          ],
        };
        const keys = r.shuffle(Object.keys(pool));
        return {
          prompt: 'Match each client category with a consequence that applies to it.',
          pairs: keys.map((k) => [k, r.pick(pool[k])]),
          hints: ['Protection falls from retail to professional to eligible counterparty.', 'Opting up is a client request with an assessment and a written warning.'],
          solution: 'Retail has the highest protection. Professional clients are presumed to know their field. Eligible counterparties are outside many conduct rules. Opted-up clients have given up protections after an assessment and a warning.',
        };
      },
    },
    {
      id: 'default-category',
      template: 'mcq',
      generate(r, f) {
        const cases = [
          () => { const sv = f.eur(r.int(10, 80) * 1000, 0); return { t: `A salaried employee with ${sv} in savings, who has made no request about categorisation.`, a: 0, h: [`The client is an individual with ${sv} in savings and has made no request. Check whether any size test or opt-up applies to an individual.`, 'The size tests are for companies, and an opt-up needs a written request, an assessment and a warning. Look for each of them in the description.'] }; },
          () => { const m = r.int(5, 20); return { t: `A family with EUR ${m} m of investable assets, who has not asked for any change of category.`, a: 0, h: [`The family has EUR ${m} m, but wealth alone does not set the MiFID category. Look for a request to change it.`, 'Without a written request, an assessment and a written warning, the default for an individual applies whatever the wealth.'] }; },
          () => { const p = r.int(300, 700); return { t: `A fund manager (individual) with a EUR ${p},000 portfolio who has not requested professional treatment.`, a: 0, h: [`The client is an individual with a EUR ${p},000 portfolio. Professional treatment for an individual is elective, so look for a request.`, 'The text says no request was made. Check whether the client’s job or portfolio size can replace the opt-up procedure.'] }; },
          () => { const bs = r.int(2, 6), to = r.int(3, 9), fo = r.int(3, 9); return { t: `A small company with balance sheet EUR ${bs} m, turnover EUR ${to} m and own funds EUR 0.${fo} m.`, a: 0, h: ['A company is professional by default only if it meets two of three thresholds: EUR 20 m balance sheet, EUR 40 m turnover and EUR 2 m own funds.', `Compare the figures with the thresholds: balance sheet EUR ${bs} m, turnover EUR ${to} m and own funds EUR 0.${fo} m. Count how many of the three reach their threshold.`] }; },
          () => { const m = r.int(50, 400); return { t: `A pension fund placing a EUR ${m} m mandate with the bank.`, a: 1, h: [`Look at the type of client first: a pension fund placing a EUR ${m} m mandate with the bank. Check the list of institutions presumed to know the market.`, 'The fund is a client of the bank, not a financial firm dealing as a counterparty in an eligible service. Decide which category fits an institutional client by default.'] }; },
          () => { const m = r.int(20, 200); return { t: `An insurance company placing a EUR ${m} m portfolio with the bank's asset management arm.`, a: 1, h: [`Look at the type of client first: an insurance company placing EUR ${m} m with the bank. Check the list of institutions presumed to know the market.`, 'Placing a portfolio with an asset management arm is a client relationship and not counterparty trading. Decide which category fits an institutional client by default.'] }; },
          () => { const bs = r.int(25, 80), to = r.int(45, 120), fo = r.int(3, 10); return { t: `A company with balance sheet EUR ${bs} m, turnover EUR ${to} m and own funds EUR ${fo} m.`, a: 1, h: ['A company is professional by default if it meets two of three thresholds: EUR 20 m balance sheet, EUR 40 m turnover and EUR 2 m own funds.', `Compare the figures with the thresholds: balance sheet EUR ${bs} m, turnover EUR ${to} m and own funds EUR ${fo} m. Count how many of the three reach their threshold.`] }; },
          () => { const pm = r.int(1, 9), tr = r.int(12, 20); return { t: `An individual with a EUR 1.${pm} m portfolio, ${tr} large trades per quarter for four quarters, who asked in writing to be treated as professional, was warned in writing and was accepted by the bank.`, a: 1, h: ['An individual starts as retail. Check which steps of the opt-up procedure the description mentions: request, assessment, written warning and acceptance.', `The portfolio is EUR 1.${pm} m and the trading is ${tr} large trades per quarter over four quarters. Compare both with the usual criteria of EUR 500,000 and 10 large trades per quarter.`] }; },
          () => ({ t: 'Another credit institution that trades bonds with your bank as counterparty, in a service eligible for ECP treatment, with no request for a different category.', a: 2, h: ['The client is a financial firm and the service is bond trading with your bank as counterparty. Check what the text says about the service and about any request.', 'MiFID II keeps a separate category for financial firms dealing with each other as counterparties in certain services. Decide whether this description matches it.'] }),
        ];
        const c = r.pick(cases)();
        const names = ['Retail', 'Professional', 'Eligible counterparty', 'Private banking (a fourth MiFID category)'];
        return {
          prompt: `Under the default MiFID II rules, which category fits this client?\n\n${c.t}`,
          choices: names,
          answer: c.a,
          fixedOrder: false,
          hints: c.h,
          solution: `Correct answer: **${names[c.a]}**. Retail is the default for individuals and small companies. Per se professionals are institutions and large undertakings (two of: EUR 20 m balance sheet, EUR 40 m turnover, EUR 2 m own funds). Elective professionals must have opted up. ECP applies to financial firms dealing as counterparties.`,
        };
      },
    },
    {
      id: 'segment-services',
      template: 'multi',
      generate(r) {
        const pools = {
          Retail: ['Current account with debit card', 'Consumer mortgage', 'Savings deposit', 'Online broker for ETFs and funds', 'Overdraft facility', 'Branch-based advice on a savings plan'],
          'Private banking': ['Dedicated relationship manager', 'Discretionary portfolio management', 'Lombard loan against a portfolio', 'Succession and estate planning', 'Access to private-market funds', 'Bespoke structured notes'],
          Institutional: ['Prime brokerage and securities lending', 'Repo financing', 'Direct market access and algorithmic execution', 'Global custody and settlement', 'OTC derivatives for hedging', 'Bond issuance and underwriting'],
        };
        const segs = Object.keys(pools);
        const seg = r.pick(segs);
        const right = r.sample(pools[seg], 4);
        const others = [].concat(...segs.filter((s) => s !== seg).map((s) => pools[s]));
        const wrong = r.sample(others, 4);
        const all = r.shuffle(right.concat(wrong));
        return {
          prompt: `Select every service that is **typical for the ${seg.toLowerCase()} segment**.`,
          choices: all,
          answers: all.map((c, i) => (right.includes(c) ? i : -1)).filter((i) => i >= 0),
          hints: [`Decide who the ${seg.toLowerCase()} client is: ${{ Retail: 'an individual with everyday banking and modest savings', 'Private banking': 'a wealthy individual or family with tailored needs', Institutional: 'a financial institution or large company that needs market access at scale' }[seg]}. Then ask which of the eight services that client would use.`,
            `Four services belong to the ${seg.toLowerCase()} segment and four belong to the other two. Go through the list and drop each service that fits a ${seg === 'Retail' ? 'wealthy client or an institution' : seg === 'Private banking' ? 'mass-market customer or an institution' : 'private individual or a mass-market customer'} better.`],
          solution: `Typical ${seg.toLowerCase()} services: ${right.join(', ')}.`,
        };
      },
    },
    {
      id: 'why-categorise',
      template: 'cloze',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const who = r.pick(['Marta', 'A teacher', 'A young couple', 'A small business owner']);
        const amt = f.money(M.amt(r.int(5, 60) * 1000), CCY, 0);
        return {
          prompt: 'Complete the paragraph with the right terms.',
          text: `${who} invests ${amt} and is treated as retail. The category exists to set the right level of [[0]]. A retail client receives the most [[1]] about risks and costs, and a bank that advises must check [[2]]. A retail client can ask to be treated as professional through an [[3]] procedure, but loses some protections.`,
          blanks: [{ accept: ['protection'] }, { accept: ['information', 'disclosure'] }, { accept: ['suitability'] }, { accept: ['opt-up', 'opt up', 'optup'] }],
          bank: r.shuffle(['protection', 'information', 'suitability', 'opt-up', 'commission', 'dividend']),
          hints: ['Retail clients are the ones the rules aim to shield most.', 'The check made when a bank gives advice is called suitability.'],
        };
      },
    },
  ],
});
