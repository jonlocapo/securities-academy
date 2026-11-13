/* T1.4 A full trade from start to finish */
SA.unit({
  id: 'T1.4',
  lesson: [
    {
      md: String.raw`## The trade lifecycle

A client who taps **Buy** on 200 shares on Monday sees the shares in her account on Wednesday and sees EUR 10,485 leave it. The steps in between are handled by several teams and systems. This unit combines the pieces covered so far: order and execution (T1.1), confirmation, clearing and settlement (T1.2), and custody (T1.3). The lifecycle is described in stages, from before execution to the overnight processing that follows booking.

| Stage | What happens | Mainly handled by |
|---|---|---|
| **Pre-execution** | Orders are received, checked and sometimes aggregated. Complex deals may exist first as provisional trades | Sales, front office |
| **Execution and booking** | The trade is agreed and a record is created | Trader, trading assistant |
| **Confirmation** | Both sides match records and agree every detail | Back office, middle office |
| **Post-booking** | Scrutiny, enrichment, expected cashflows, fees and duties, error reporting | Middle office, back office |
| **Settlement** | Cash and securities are exchanged, normally delivery versus payment | Settlement operations, custodian, CSD |
| **Overnight** | The trade joins end-of-day aggregation, valuation and reports | Finance, risk, operations |

Each row is a handover. The output of one team is the input of the next, and much of operations work is checking that each handover happened on time with the right data.

> [!recall] T1.1
> The first two stages are the order and execution of T1.1. The trade date T is the reference for everything that follows.`,
    },
    {
      md: String.raw`## Pre-execution, execution and booking

An **order** is an instruction to trade. It may come from a salesperson passing on a client request, from an electronic request, or from automatic generation such as a stop order or a limit order. An order can be unconditional or conditional on price or time. Orders are often aggregated, so one trade can satisfy several orders. Records must then link the trade back to its orders for audit.

> [!example]
> A trader holds five orders on one share: buy 700, sell 600, buy 950, buy 850 and sell 900. Buys total 2,500 and sells total 1,500, so one trade to **buy 1,000** satisfies all five and saves four sets of transaction costs.

A complex deal can start as a **provisional trade**, a virtual ticket kept outside the official books while legal, credit and market risk review it. The risk is that someone treats it as fully abstract when it carries obligations, or that it becomes live automatically if nobody withdraws.

**Execution** is the point at which both parties agree the trade and it becomes legally binding. The channel can be telephone, email, chat, an electronic system or a signed contract. Each has its own weakness, for example mishearing on the phone or doubtful proof of who sent an email.

**Booking** creates the record, with all details together with the time and place of the trade. A trade ticket holds general identifiers, economic terms, counterparty and settlement details, booking information and legal terms. Traders usually enter only the economic part. A trading assistant or the middle and back office completes the rest.

**Straight-through processing** (STP) means all functions work from the same data, entered once at execution, with every amendment logged. It reduces re-keying errors. The drawback is that a fully automated process also automates mistakes, so controls still need people.

> [!recall] T1.2
> The booking record carries the details that confirmation and settlement later use, so an error made here is repeated downstream.`,
    },
    {
      md: String.raw`## Confirmation and post-booking

**Confirmation** is the agreement of all trade details between the two counterparties, usually carried out by the back office. It has two activities. In **matching**, each side checks that both hold a record of the same trade, using references such as the counterparty trade identifier. In confirmation proper, the particulars (price, quantity, dates, settlement details) are compared and any differences are corrected. A fast and accurate process limits the time errors stay in the system, because the longer a mistake lives, the more it costs to fix.

After booking, the middle office examines the trade. The usual steps are:

1. **Scrutiny**: checks that the trade is correct and fits the firm's limits and processes.
2. **Enrichment**: adding details that the booker did not have, such as counterparty, settlement or custodian information.
3. **Cashflows**: calculating the cash the trade will generate, which also tests that the trade is complete.
4. **Fees and duties**: broker fees, exchange charges, commissions and taxes such as stamp duty on purchases of UK shares. These are recorded, checked and paid by their due date.
5. **Error reporting**: anything wrong is reported at once, so it does not spread to settlement.

> [!example]
> Buy 200 shares at EUR 52.35. Consideration EUR 10,470 and commission EUR 15 give cash due EUR 10,485. This is the expected cashflow that settlement later checks against the custodian.`,
      check: {
        template: 'mcq',
        prompt: 'During post-booking, a trade is found to have no settlement instructions for the custodian. Which activity adds them?',
        choices: ['Enrichment', 'Matching', 'Execution', 'Overnight aggregation'],
        answer: 0,
        solution: 'Enrichment completes details such as counterparty, settlement and custodian information that were missing at booking.',
      },
    },
    {
      md: String.raw`## Settlement

Settlement is the stage at which the parties perform their obligations to exchange. Until it happens nothing physical has changed hands, even though the trade is legally binding. Settlement can involve cash, certificates or physical goods.

**Settlement instructions** are of two main types. **Delivery versus payment (DVP)** requires both legs to happen at the same time, so one instruction goes to the custodian. **Free of payment (FOP)** lets the legs happen separately, so there are normally two instructions, one to expect a receipt and one to make a payment. The custodian holds cash and securities for the firm and transfers them to the counterparty's custodian. For euro securities the final step is at the CSD, typically on T2S.

Several dates appear on a ticket. The **trade date** is when the trade is agreed. The **value date** is when the exchange is supposed to occur. The **settlement date** is when it actually occurs. In a standard share trade the two are the same unless a fail occurs.

Payments out of the firm need two authorised individuals. **Nostro accounts**, the firm's cash accounts held with local banks in each currency, are updated on settlement and show what was paid or received.

Risks include theft, the cost of recovering money sent to the wrong account, legal claims, reputation damage, loss of use of money and knock-on effects on other settlements that depend on it. A settlement that does not happen is a **break**, and tracing breaks takes a large share of back-office time.

| Day | Event |
|---|---|
| **T** | Order, execution, booking, confirmation, matching and clearing where a CCP is used |
| **T+1** | Instructions matched at the CSD, positions prepared |
| **Settlement date** | DVP at the CSD, then custody update and reporting |

> [!recall] T1.2
> Settlement date = T + the market's cycle in business days: **T+2 in the EU until 11 October 2027**, **T+1 in the US since 28 May 2024**.`,
      check: {
        template: 'mcq',
        prompt: 'A trade is executed on Monday in a market with T+2. When does the DVP settlement take place (no holidays)?',
        choices: ['Wednesday', 'Tuesday', 'Monday', 'Friday'],
        answer: 0,
        solution: 'T = Monday, T+1 = Tuesday, T+2 = Wednesday.',
      },
    },
    {
      md: String.raw`## Cash due on settlement day

The cash needed on settlement day is more than price times quantity. The **settlement amount** is:

$$\text{cash due} = \text{consideration} + \text{fees} + \text{taxes} + \text{accrued interest (bonds only)}$$

- **Consideration** = quantity x price (for several fills, the sum of each fill).
- **Fees** = broker commission and venue and clearing fees, often a flat amount or a percentage of the consideration.
- **Taxes** = a transaction tax in some markets. France charges a **financial transaction tax** on purchases of shares of large French companies, Italy a tax on certain Italian shares, and the UK charges **stamp duty** (0.5%) on purchases of UK shares. Rates change, so the current rule applies.
- **Accrued interest**: for a bond bought between coupon dates, the buyer also pays the seller the interest earned so far.

> [!example]
> Monday: buy 200 shares at EUR 52.35 = EUR 10,470. Commission EUR 15.
> Cash due = 10,470 + 15 = **EUR 10,485**.
> With a transaction tax of 0.20% on the consideration, tax = $10{,}470 \times 0.002 =$ EUR 20.94, so cash due = $10{,}470 + 15 + 20.94 =$ **EUR 10,505.94**.

> [!recall] Q1.2
> To find how many shares a given budget buys, solve $n \times \text{price} + \text{fee} = \text{budget}$ for $n$. Units: shares x EUR per share = EUR.

> [!us]
> The US has no general stamp duty on share purchases, and the main regulatory fee falls on sales. Because the cycle is T+1, funding must be ready one day earlier than in Europe.`,
    },
    {
      md: String.raw`## One trade, day by day

> [!example]
> EU trade, T+2.
> - **Monday 2 Nov 2026**: client order, execution on Xetra at EUR 52.35 for 200 shares (EUR 10,470 + 15 commission). In the evening the confirmation is sent, the client's and the broker's records match, and the CCP clears.
> - **Tuesday 3 Nov**: the settlement instruction is checked at the CSD, and the client's account is verified to have EUR 10,485 available.
> - **Wednesday 4 Nov**: DVP at the CSD, Clearstream Banking Frankfurt (on T2S). The broker's account is credited with EUR 10,470 in central bank money, the buyer's securities account is credited with 200 shares, and the custodian updates the client's position. The client's statement shows both movements.
>
> The same trade in the US would settle on **Tuesday 3 Nov**.

> [!eu]
> From **11 October 2027** this EU flow is shortened by one day under [Regulation (EU) 2025/2075](https://eur-lex.europa.eu/eli/reg/2025/2075/oj), so a Monday trade settles on Tuesday. Operations teams have less time to fix breaks and fund the trade. Allocation, confirmation and matching, which often run into T+1 today, then have to be finished on the trade date.`,
    },
    {
      md: String.raw`## Typical breaks

| Stage | Typical break | Result |
|---|---|---|
| **Order entry** | Wrong quantity, side or limit, or missing validity | A trade nobody wanted |
| **Execution** | Fill at the wrong price, partial fill misreported | Disputed price or size |
| **Confirmation / matching** | Different price, quantity or account in the two records | Unmatched trade, to be fixed before settlement |
| **Clearing** | Member lacks margin, or trade rejected by the CCP | Trade not cleared |
| **Settlement** | Securities short, cash short, instruction mismatch | Settlement fail, with cash penalties under [CSDR](https://eur-lex.europa.eu/eli/reg/2014/909/oj) |
| **Custody / reporting** | Position not updated or statement wrong | Reconciliation break and client complaint |

The earlier an error is found, the cheaper it is to fix. A wrong quantity caught at order entry costs nothing, while the same error found at settlement can mean a fail, a penalty and a market-risk loss.

> [!recall] T1.3
> Reconciliation between the client statement and the custodian record (T1.3) is the last control in the chain.

> [!warning]
> Checking only one's own step can miss that the next team needs something that was not provided, such as the correct settlement instruction.`,
    },
    {
      md: String.raw`## Summary

- A trade passes through order, execution, confirmation and matching, clearing, settlement (DVP), custody update and reporting.
- Each step has a responsible team, and operations monitors the handovers.
- Cash due = consideration + fees + taxes (+ accrued interest for bonds).
- EU T+2 (T+1 from 11 October 2027) and US T+1 (since 28 May 2024) set how quickly each handover must take place.
- Errors are cheapest to fix early. Order entry, matching and settlement instructions are the main places where breaks start.`,
    },
  ],

  exercises: [
    {
      id: 'lifecycle-table',
      template: 'table',
      generate(r, f) {
        const M = r.market();
        const n = M.settle;
        const T = f.addBusinessDays('2026-02-02', r.int(0, 200));
        const S = f.addBusinessDays(T, n);
        const qty = r.int(2, 40) * 25;
        const px = M.px(r.float(10, 140, 0.05));
        const fee = M.amt(r.pick([9.9, 12, 15, 19.5, 25]));
        const cons = f.round(qty * px, 2);
        const due = f.round(cons + fee, 2);
        const fmts = (iso) => {
          const [y, m, d] = iso.split('-');
          const mon = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'][+m - 1];
          return [f.date(iso), iso, `${d}/${m}/${y}`, `${+d} ${mon} ${y}`, `${d}.${m}.${y}`, `${f.weekday(iso)} ${f.date(iso)}`];
        };
        const dstr = f.date(T);
        const side = r.pick(['buy', 'buy', 'buy']);
        const ccp = M.region === 'EU' ? r.pick(['Eurex Clearing', 'LCH SA', 'the CCP']) : 'the CCP';
        return {
          prompt: `A client **${side}s ${f.num(qty, 0)} shares** at **${M.ccy} ${f.num(px, 2)}** on **${f.weekday(T)} ${dstr}** on ${M.venue}, which settles at **T+${n}**, with no holidays. Commission is **${f.money(fee, M.ccy, 2)}**. Complete the lifecycle table. (Give dates like "${dstr}"; cash due in ${M.ccy}, 2 dp.)`,
          columns: ['Date', 'Event', 'Responsible team', 'Amount / status'],
          rows: [
            [dstr, 'Order executed on the venue', 'Trading desk / broker', `${f.num(qty, 0)} shares at ${f.num(px, 2)}`],
            [dstr, 'Trade confirmed and matched', { accept: ['operations', 'middle office', 'back office', 'trade operations', 'ops'] }, 'Matched'],
            [dstr, 'Clearing and netting', { accept: ['ccp', 'central counterparty', 'clearing house', 'clearing'] }, 'Cleared'],
            [{ accept: fmts(S) }, 'DVP settlement', 'CSD', { answer: due, dp: 2, tol: { abs: 0.01 } }],
            [{ accept: fmts(S) }, 'Position updated in client account', { accept: ['custodian', 'custody', 'bank', 'custody team'] }, 'Posted'],
          ],
          solution: `Consideration ${f.num(qty, 0)} x ${f.num(px, 2)} = ${f.money(cons, M.ccy)}. Adding commission ${f.money(fee, M.ccy)} gives **${f.money(due, M.ccy)}** cash due. Settlement is T+${n}: **${f.weekday(S)} ${f.date(S)}**. Confirmation and matching are done by operations, clearing by the CCP (${ccp}), and the custodian updates the position.`,
          hints: [`Count ${n} business day${n > 1 ? 's' : ''} from ${dstr}.`, 'The cash due includes the commission.'],
        };
      },
    },
    {
      id: 'cash-to-settle',
      template: 'numeric',
      generate(r, f) {
        const M = r.market();
        const qty = r.int(1, 20) * 50;
        const px = M.px(r.float(5, 150, 0.05));
        const cons = f.round(qty * px, 2);
        const flat = r.bool();
        const feePct = r.pick([0.05, 0.1, 0.15, 0.25]);
        const fee = flat ? M.amt(r.pick([4.95, 9.9, 12.5, 15, 19.5, 25])) : f.round(cons * feePct / 100, 2);
        const feeTxt = flat ? `a flat commission of ${M.ccy} ${f.num(fee, 2)}` : `a commission of ${f.num(feePct, 2)}% of the consideration`;
        const taxed = M.region === 'EU' && r.bool(0.6); // an FTT exists only in some EU markets
        const taxPct = r.pick([0.1, 0.15, 0.2]);
        const tax = taxed ? f.round(cons * taxPct / 100, 2) : 0;
        const feeUsed = f.round(fee, 2);
        const feeSolution = flat ? f.num(feeUsed, 2) : `${f.num(cons, 2)} x ${f.num(feePct / 100, 4)} = ${f.num(feeUsed, 2)}`;
        const dueC = f.round(cons + feeUsed + tax, 2);
        return {
          prompt: `A client buys **${f.num(qty, 0)} shares** on ${M.venue} at **${M.ccy} ${f.num(px, 2)}**. The broker charges ${feeTxt}.${taxed ? ` A financial transaction tax of **${f.num(taxPct, 2)}%** applies to the consideration.` : ' No transaction tax applies.'} What total cash must be available on settlement day? (${M.ccy}, 2 dp)`,
          answer: dueC, dp: 2, tol: { abs: 0.02 }, unit: M.ccy,
          hints: [
            `The consideration is the quantity times the price: $${f.num(qty, 0)} \\times ${f.num(px, 2)}$.`,
            `The consideration is ${f.num(cons, 2)}. The commission is ${flat ? `a flat ${M.ccy} ${f.num(feeUsed, 2)}` : `${f.num(feePct, 2)}% of that, which is $${f.num(cons, 2)} \\times ${f.num(feePct / 100, 4)}$`}.`,
            taxed
              ? `The tax is ${f.num(taxPct, 2)}% of the consideration, which is $${f.num(cons, 2)} \\times ${f.num(taxPct / 100, 4)}$. Add the consideration, the commission and the tax.`
              : 'No tax applies here, so add the commission to the consideration and nothing else.',
          ],
          solution: `Consideration ${f.num(qty, 0)} x ${f.num(px, 2)} = ${f.num(cons, 2)}. Commission ${feeSolution}.${taxed ? ` Tax ${f.num(cons, 2)} x ${f.num(taxPct / 100, 4)} = ${f.num(tax, 2)}.` : ''} Cash due = **${f.money(dueC, M.ccy)}**.`,
        };
      },
    },
    {
      id: 'lifecycle-order',
      template: 'order',
      generate(r, f) {
        const M = r.market();
        const qty = r.pick([100, 200, 250, 500]);
        const co = r.pick(M.companies).n;
        const steps = [
          [`Client enters an order to buy ${f.num(qty, 0)} ${co} shares`, `Order for ${f.num(qty, 0)} ${co} shares is received and checked`],
          ['The order is executed on the venue', 'A fill is received from the trading venue'],
          // the matching step names the confirmation, so the two cannot swap
          ['The broker sends a trade confirmation', 'A confirmation of the trade is issued'],
          ['That confirmation is matched against the counterparty\'s record', 'The confirmation is matched with the counterparty\'s own details'],
          ['The CCP clears the trade', 'Clearing: the CCP becomes counterparty to both sides'],
          [`DVP settlement takes place at the CSD (${M.csd})`, `Securities and cash are exchanged at ${M.csd}`],
          ['The custodian updates the client\'s position', 'The client\'s holding is updated in the custody account'],
          ['The trade appears in the client\'s statement and reports', 'The client report shows the settled trade'],
        ].map((x) => r.pick(x));
        return {
          prompt: 'Put these eight lifecycle events in the correct order, **first to last**.',
          items: steps,
          hints: ['Execution can only come after the order; clearing after matching.', 'The client sees the result in the statement last.'],
          solution: 'Order, execution, confirmation, matching, clearing, settlement, custody update, reporting.',
        };
      },
    },
    {
      id: 'break-stage',
      template: 'mcq',
      generate(r) {
        const stages = ['Order entry', 'Execution', 'Confirmation and matching', 'Clearing', 'Settlement', 'Custody and reporting'];
        const sc = [
          ['The client asked for 200 shares but the order ticket shows 2,000.', 0, ['Compare the client\'s instruction with the ticket. Ask whether the error exists before anything is sent to a venue.', 'The quantity on the ticket differs from what the client asked for. Ask which handover first records the client\'s instruction.']],
          ['A limit order has no limit price filled in.', 0, ['The problem is a missing field on the order itself. Ask whether the order has reached a venue.', 'A limit price is part of the instruction from the client. Ask where an instruction is first captured and checked.']],
          ['A buy order is filled at a price above the client\'s limit.', 1, ['The text compares the fill price with the client\'s limit. Ask where a fill price is produced.', 'The order was accepted with a limit, but the price of the fill broke it. Ask which step turns an order into a trade at a price.']],
          ['The venue reports a partial fill but the order system shows the order as fully filled.', 1, ['The text compares what the venue reports with what the order system shows. Ask which side holds the original record of the fill.', 'The disagreement is about how much of the order was filled. Ask at which step a fill, partial or full, first occurs.']],
          ['The broker\'s confirmation shows a price of 52.34, while the client\'s records show 52.43.', 2, ['The text compares a price on the broker\'s confirmation with the client\'s own record. Ask which step compares the two parties\' details of the trade.', 'The two prices differ by a few cents, which looks like a keying slip. Ask whether the trade has been cleared or settled yet, and which step catches such differences.']],
          ['The two sides\' records show different trade amounts, so the trade is unmatched.', 2, ['The text says the trade is unmatched. Ask which step pairs one side\'s record with the other\'s.', 'The difference is in the amount on each record. Ask whether this arises before a guarantee or a delivery is involved.']],
          ['The CCP rejects the trade because the clearing member has insufficient margin.', 3, ['The text names the CCP and margin. Ask what a CCP does in the chain.', 'The rejection comes from the party that guarantees the trade. Ask which step that party performs.']],
          ['On the intended settlement date the seller does not have the shares to deliver.', 4, ['The text refers to the intended settlement date and a missing delivery. Ask which step moves securities against cash.', 'The seller cannot deliver, so one leg of the exchange fails. Ask at which handover the delivery is expected.']],
          ['The two settlement instructions at the CSD do not match.', 4, ['The text names the CSD and settlement instructions. Ask which step the CSD carries out.', 'The CSD cannot pair the two instructions. Ask whether this is about agreeing the trade or about the final exchange of securities and cash.']],
          ['The shares settled on Wednesday, but the client\'s statement still shows the old position on Thursday.', 5, ['The text says the trade settled. Ask which steps are already complete by Thursday.', 'The mismatch is in what the client sees after settlement. Ask which party keeps the client\'s records and produces the statement.']],
          ['A dividend is credited to the wrong client account.', 5, ['A dividend is paid on shares that are already held, and no trade is described. Ask which steps of a trade could be involved.', 'The income went to the wrong account. Ask which party credits income to accounts and keeps those records.']],
        ];
        const [text, ans, hintList] = r.pick(sc);
        const wrong = r.sample(stages.filter((_, k) => k !== ans), 3);
        const choices = r.shuffle([stages[ans], ...wrong]);
        return {
          prompt: `At which stage did this problem arise? *${text}*`,
          choices, answer: choices.indexOf(stages[ans]), fixedOrder: true,
          hints: hintList,
          solution: `This is a **${stages[ans].toLowerCase()}** problem.`,
        };
      },
    },
    {
      id: 'explain-trade',
      template: 'paper',
      generate() {
        return {
          prompt: 'In about **150 words**, explain to a new colleague what happens between a click on "buy" and shares appearing in the client\'s account. Mention the stages, who is responsible for each, and when settlement happens (EU T+2 now; US T+1).',
          rubric: '**Good answer covers:**\n- All stages in the right order: order entry and checks, execution on a venue, confirmation and matching, clearing with a CCP, DVP settlement at a CSD, custody update and reporting.\n- The right roles: client or adviser, broker or bank, venue, CCP, CSD (T2S in the euro area), custodian.\n- The correct settlement timing: T+2 in the EU until 11 October 2027 (then T+1), T+1 in the US since 28 May 2024.\n- DVP explained in a sentence: securities and cash move together.\n- Bonus: mention that cash due includes fees and taxes.\n\nScore: 1 point per bullet, out of 5.',
          gradingPrompt: 'You are marking a short explanation for a trainee in securities operations. Score it from 0 to 5 using this rubric: (1) all stages named in the right order, (2) correct roles for each stage, (3) correct settlement timing (EU T+2 until 11 Oct 2027 then T+1, US T+1 since 28 May 2024), (4) delivery versus payment explained, (5) fees and taxes included in the cash due. Give the score and one sentence of feedback for each point. The trainee\'s answer is:\n\n{{answer}}',
        };
      },
    },
  ],
});
