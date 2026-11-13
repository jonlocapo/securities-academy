/* T1.1 From idea to order to execution */
SA.unit({
  id: 'T1.1',
  lesson: [
    {
      md: String.raw`## Orders

A trade starts as an **order**, which is an instruction to a trader to deal. An order can come from three places:

- a salesperson who passes on a client's request
- an electronic request from a client or another financial firm
- an automatic rule, such as a stop order that sells an instrument when its price falls to a stated level

An order may be **unconditional**, so that it definitely results in a trade, or **conditional** on a price, a time or some other factor. Orders can also be **aggregated**, which means that several orders in the same instrument are executed as one trade to save transaction costs.

A client asks a bank to buy 200 shares of a listed utility at no more than EUR 52.40. Nothing has happened in the market at that point. The rest of this unit follows the order up to the moment it becomes a booked trade, and T1.2 takes over from there.

> [!warning]
> It is easy to treat an instruction as a completed deal. An order may not yet have become a trade because of human error, a system fault or a delay. Pending orders should therefore be visible to traders and to the market and credit risk functions, since they will change the firm's exposures when they execute.`,
    },
    {
      md: String.raw`## Order, execution, booking, confirmation

Four terms describe the stages around the moment of dealing.

- An **order** is the instruction: buy or sell this instrument, in this quantity, on these conditions.
- An **execution** (a fill) occurs when both parties have agreed a trade. From that point the trade is live and legally binding. One order can produce several executions.
- **Booking** is the creation of the firm's record of the executed trade. It holds the details together with the time and place of the transaction. Once booked, the trade carries the legal obligations to deliver what it promises.
- **Confirmation** is the stage at which both counterparties check and agree all the particulars of the trade. It involves matching the two records and then agreeing the details (T1.2). The client also receives a document that evidences the result.

The day on which the trade is agreed and executed is the **trade date**, abbreviated **T**. The trade is exposed to market movements from that date, and later steps are dated relative to it.

> [!example]
> Order: buy 200 shares, limit EUR 52.40. Executions: 100 at EUR 52.30, then 100 at EUR 52.40. Booking: one trade ticket for 200 shares at an average of EUR 52.35. Confirmation: both sides agree the quantity, price, amount and settlement date.`,
      check: {
        template: 'mcq',
        prompt: 'A client tells her bank: "Sell 500 shares if the price reaches EUR 30." At that moment, what exists?',
        choices: ['An order, with no execution yet', 'A confirmed trade', 'An execution', 'A settled trade'],
        answer: 0,
        solution: 'A client instruction is an order. Executions, booking and confirmation come only after the order meets a counterparty.',
      },
    },
    {
      md: String.raw`## The trade ticket

The **trade ticket** collects all the details of a trade. The order itself needs only a few fields, and the system adds the rest during booking. The fields on a ticket fall into groups, each used by a different part of the firm.

| Group | Typical fields | Used for |
|---|---|---|
| **General** | Trade identifier, asset class, type (spot), status, trade date, transaction time and place | Every process, to know which trade it is acting on and where it stands |
| **Economic** | Buy or sell, quantity, instrument (ISIN or ticker), venue, currency, price | Valuing the trade |
| **Sales** | Salesperson, sales credits | Rewarding the sales team, with no effect on value |
| **Legal** | Governing law, special terms, master agreement for complex trades | Documenting the obligations |
| **Booking** | Desk, book, trader | Placing the trade in the firm's records |
| **Counterparty** | Name, reference, settlement date, settlement instructions, delivery type (DvP or free of payment) | Confirming and settling |

For a client order in shares, the minimum content is the side, the instrument, the quantity, the price type, the validity (for example the day, or good till a date) and the client account. A missing side, instrument or quantity makes the order impossible to act on. A missing validity leaves it unclear whether the order is still live the next day.

> [!recall] P1.2
> The instrument is an ordinary share, the unit of ownership from P1.2. Orders for bonds and funds carry the same basic fields, plus items such as accrued interest or the dealing day.`,
    },
    {
      md: String.raw`## Price instructions

There are three common ways to state the price:

- **Market order**: buy or sell at the best price available now. It is almost certain to execute, but the price is not known in advance.
- **Limit order**: buy or sell at the stated price or better. A buy limit is a ceiling and a sell limit is a floor. The price is controlled, but the order may not execute.
- **Stop order**: becomes an order to sell (or buy) once the market reaches a stated trigger level. A sell stop below the market limits a loss on a position already held.

> [!example]
> The best offer on the screen is EUR 52.31.
> - Buy limit 52.40: executes now at 52.31, which is better than the limit.
> - Buy limit 52.20: does not execute now. It rests in the order book until a seller reaches 52.20.
> - Sell limit 52.40: does not execute now, because the best bid is below 52.40.

A limit order is never filled at a price worse than the limit, but it can be filled at a better price.

> [!warning]
> An input error (limit 524.00 instead of 52.40) can turn a protective limit into a very expensive market order. Many firms apply automatic **price collars** to reject orders far from the reference price.`,
    },
    {
      md: String.raw`## Parties and ways of dealing

Several parties can stand between the client and the venue:

1. **Client** or adviser, who originates the order.
2. **Relationship bank or online broker**, which receives the order and validates it (whether the client may trade, whether cash is available, whether the product is suitable).
3. **Executing broker** or trading desk, which decides how to execute (algorithm, split, venue).
4. **Execution venue**: a regulated market, an MTF, a systematic internaliser or a market maker.
5. **Counterparty**: the other side of the trade, usually anonymous on an exchange.

Ordinary sizes are handled **automatically** (straight through, with a smart order router). A **care order** is worked by a human trader, for instance a block of 500,000 shares in a thinly traded stock.

The method used to agree a trade carries its own risks.

| Method | Main weakness |
|---|---|
| Telephone | No lasting record, and details can be misheard or omitted. Recording and written back-up reduce the risk |
| Email | Doubtful legal validity, risk of impersonation, and unclear timing of agreement |
| Electronic chat | Similar to email but faster, so timing doubts are smaller |
| Electronic system | Fast and accurate, but it handles only standard trades and depends on continuous access |
| In person or by post | Needs fast and accurate entry into the booking system, and post is slow |

> [!recall] P1.5
> These are the sell-side and infrastructure roles from P1.5: broker, venue and, after the trade, CCP and CSD.

> [!eu]
> [MiFID II](https://eur-lex.europa.eu/eli/dir/2014/65/oj) requires firms to keep detailed order records and to "take all sufficient steps to obtain [...] the best possible result" for clients (Art. 27(1), **best execution**). The factors are price, costs, speed, likelihood of execution and settlement, size and nature of the order. For a retail client the result is judged by total consideration, which is the price plus the costs of execution. A specific client instruction, such as a named venue, is followed.

> [!us]
> In the US, [Regulation NMS](https://www.law.cornell.edu/cfr/text/17/part-242) requires trading centres to avoid trading through better displayed prices on other venues, so a smart order router checks several venues. In Europe, best execution is judged across venues under the firm's own execution policy and there is no hard trade-through rule.`,
    },
    {
      md: String.raw`## Worked example: fills and aggregation

> [!example]
> Buy 200 shares, limit EUR 52.40. The broker routes the order and two executions follow:
> - 100 shares at EUR 52.30 = $100 \times 52.30 =$ EUR 5,230.00
> - 100 shares at EUR 52.40 = $100 \times 52.40 =$ EUR 5,240.00
>
> Total consideration = EUR 10,470.00. Average price = $10{,}470 / 200 =$ **EUR 52.35**.

The average price is a weighted average, so it is the total euros divided by the total shares. It is the same as the simple average of the two prices only when the fills are of equal size.

When a desk holds several orders in one stock, it can execute their net quantity once.

> [!example]
> A desk holds orders to buy 300, buy 450, sell 200 and sell 150 shares in the same stock. The net position is $300 + 450 - 200 - 150 =$ **buy 400 shares**. One purchase of 400 shares satisfies all four orders. The firm then needs a record that links the single trade back to the four orders, so that each client can be allocated the right quantity and price.

> [!recall] Q1.2
> Units help to check the arithmetic: shares multiplied by EUR per share give EUR, and EUR divided by shares gives EUR per share.`,
    },
    {
      md: String.raw`## Booking, straight-through processing and order status

A trade is usually booked electronically, with all its details, the time and the place of dealing. Both counterparties keep a record unless one responds to an offer on an electronic exchange. In that case the system sends the details to both sides. A trader may record only the economic details and a few internal ones, and leave the rest to assistants and the middle and back office to complete.

**Straight-through processing (STP)** means a single capture of the trade at execution. Every later step, from checks to confirmation to settlement, reuses that record instead of re-keying it, with a full audit trail of amendments. The shorter the time and the fewer the hands between execution and booking, the lower the risk of error. STP also has risks. Automated mistakes are also automated, and a system built for existing trade types is hard to change when new ones appear.

**Order status** moves from **New** to **Partially filled** (some shares executed) to **Filled** (all executed). An order can also end as **Cancelled** (by the client) or **Expired** (validity ended). The venue reports the status through **execution reports**.

Common pitfalls are treating a "done" message as the final confirmation, leaving a good-till-cancelled order live from last month, and quoting the simple average of two unequal fills.`,
    },
    {
      md: String.raw`## Summary

- An order is an instruction. An execution is a trade agreed with a counterparty, and booking records it. Confirmation is the later agreement of all details between the two sides. The trade date is T.
- A ticket has general, economic, sales, legal, booking and counterparty details. An order needs at least side, instrument, quantity, price type, validity and account.
- A market order trades now at any price. A limit order protects the price but may not fill. A stop order is triggered by a price level.
- Several parties can sit between client and venue, and automated and care orders follow different paths. Each way of agreeing a trade has its own risks.
- Average fill price = total consideration divided by total quantity.`,
    },
  ],

  exercises: [
    {
      id: 'order-steps',
      template: 'order',
      generate(r) {
        const care = r.bool();
        const auto = [
          'Client sends the order through the app',
          'Pre-trade checks validate the order (cash, limits, suitability)',
          'The smart order router selects a venue',
          'The venue matches the order with a counterparty',
          'An execution report returns to the broker',
          'The trade is captured in the booking system',
          'The client receives the confirmation',
        ];
        const hand = [
          'Client phones the adviser with the instruction',
          'The sales trader records the order ticket',
          'Pre-trade checks validate the order (cash, limits, suitability)',
          'The trader works the order and routes it to the venue',
          'The venue matches the order with a counterparty',
          'An execution report returns to the trader',
          'The trade is booked and the client is informed',
        ];
        const base = care ? hand : auto;
        const drop = r.int(0, 3);
        const items = drop === 0 ? base : base.filter((_, k) => k !== [0, 1, 5, 6][drop]);
        const n = items.length;
        return {
          prompt: `Put these ${n} steps in order, from the client's instruction to the end of the process (${care ? 'a care order worked by a trader' : 'an automated order'}).`,
          items,
          hints: [
            `"${items.find((x) => /venue matches/.test(x))}" is the middle of the process. The steps that prepare and route the order come before it, and the steps that record the outcome come after it.`,
            items.some((x) => /Pre-trade checks/.test(x))
              ? `"${items.find((x) => /Pre-trade checks/.test(x))}" has to come before "${items.find((x) => /router|routes/.test(x))}", because nothing is routed before it has been checked.`
              : `"${items.find((x) => /router|routes/.test(x))}" has to come before "${items.find((x) => /venue matches/.test(x))}", because an order cannot be matched before it reaches a venue.`,
            `The first step of the ${n} is "${items[0]}".`,
          ],
          solution: 'Instruction, order entry and checks, routing, matching at the venue, execution report, then booking and confirmation.',
        };
      },
    },
    {
      id: 'average-fill',
      template: 'numeric',
      generate(r, f) {
        const M = r.market();
        const n = r.int(2, 4);
        const base = r.float(5, 120, 0.05);
        const fills = [];
        for (let k = 0; k < n; k++) {
          fills.push({ q: r.int(4, 100) * 5, p: M.px(f.round(base + r.int(-6, 6) * 0.05, 2)) });
        }
        const qty = fills.reduce((a, x) => a + x.q, 0);
        const cons = f.round(fills.reduce((a, x) => a + x.q * x.p, 0), 2);
        const avg = f.round(cons / qty, 4);
        const lines = fills.map((x, k) => `- Fill ${k + 1}: ${f.num(x.q, 0)} shares at ${M.ccy} ${f.num(x.p, 2)}`).join('\n');
        const co = r.pick(M.companies).n;
        if (r.int(0, 2) === 0) {
          const bq = r.int(2, 12) * 50;
          let bq2 = r.int(2, 12) * 50;
          const sq = r.int(2, 12) * 50;
          const sq2 = r.int(1, 6) * 50;
          if (bq + bq2 === sq + sq2) bq2 += 50;
          const net = bq + bq2 - sq - sq2;
          const dir = net >= 0 ? 'buy' : 'sell';
          return {
            prompt: `A desk holds four client orders in the shares of ${co}: buy ${f.num(bq, 0)}, buy ${f.num(bq2, 0)}, sell ${f.num(sq, 0)} and sell ${f.num(sq2, 0)}. It aggregates them and executes the net quantity as one trade. Enter the net quantity as a positive number if the desk buys and as a negative number if it sells. (shares)`,
            answer: net, dp: 0, tol: { abs: 0 }, unit: 'shares',
            hints: ['Add the buy orders and subtract the sell orders.', 'A negative result means the desk sells.'],
            solution: `${f.num(bq, 0)} + ${f.num(bq2, 0)} - ${f.num(sq, 0)} - ${f.num(sq2, 0)} = **${f.num(net, 0)}**, so one trade to ${dir} ${f.num(Math.abs(net), 0)} shares settles all four orders.`,
          };
        }
        if (r.bool()) {
          return {
            prompt: `A broker buys shares in ${co} for a client in ${n} partial fills:\n\n${lines}\n\nWhat is the total consideration? (${M.ccy}, 2 dp)`,
            answer: cons, dp: 2, tol: { abs: 0.01 }, unit: M.ccy,
            hints: ['Multiply quantity by price for each fill, then add.'],
            solution: fills.map((x) => `${f.num(x.q, 0)} x ${f.num(x.p, 2)}`).join(' + ') + ` = **${f.money(cons, M.ccy)}**.`,
          };
        }
        return {
          prompt: `A broker buys shares in ${co} for a client in ${n} partial fills:\n\n${lines}\n\nWhat is the average execution price? (${M.ccy}, 4 dp)`,
          answer: avg, dp: 4, tol: { abs: 0.0001 }, unit: M.ccy,
          hints: ['Average price = total consideration / total shares (a weighted average).', 'Do not average the prices without weighting by quantity.'],
          solution: `Total consideration ${f.money(cons, M.ccy)} over ${f.num(qty, 0)} shares = **${M.ccy} ${f.num(avg, 4)}**.`,
        };
      },
    },
    {
      id: 'order-fields',
      template: 'match',
      generate(r, f) {
        const M = r.market();
        const sides = ['Buy', 'Sell'];
        const qty = r.pick([100, 150, 200, 250, 300, 500, 1000, 2500]);
        const isin = r.pick(M.companies).isin;
        const px = f.num(M.px(r.float(5, 120, 0.05)), 2);
        const valid = r.pick(['Day order', 'Good till cancelled', 'Good till 30 November', 'Immediate or cancel']);
        const acct = r.pick(['Custody account 000123', 'Client account 004587', 'Portfolio account 117290']);
        const pool = [
          ['Side', r.pick(sides)],
          ['Quantity', `${f.num(qty, 0)} shares`],
          ['Instrument identifier', isin],
          ['Limit price', `${M.ccy} ${px}`],
          ['Validity', valid],
          ['Account', acct],
        ];
        return {
          prompt: 'Match each order field with an example value.',
          pairs: r.sample(pool, 5),
          hints: ['An ISIN is 12 characters starting with two letters.', 'Validity says how long the order stays alive.'],
        };
      },
    },
    {
      id: 'ticket-check', multiCcy: true,
      template: 'spot',
      generate(r, f) {
        const cos = [];
        Object.keys(SA.MARKETS).forEach((k) => SA.MARKETS[k].companies.forEach((c) => cos.push({ n: c.n, i: c.isin, m: SA.MARKETS[k].mic, c: SA.MARKETS[k].ccy })));
        const co = r.pick(cos);
        const other = r.pick(cos.filter((c) => c.i !== co.i));
        const side = r.pick(['BUY', 'SELL']);
        const opp = side === 'BUY' ? 'SELL' : 'BUY';
        const qty = r.pick([100, 200, 250, 300, 500, 750, 1000]);
        const px = f.round(r.float(8, 120, 0.05), 2);
        const date = f.addBusinessDays('2026-03-02', r.int(0, 120));
        const qtyBad = qty * 10;
        const badCcy = co.c === 'USD' ? 'EUR' : 'USD';
        const segs = [
          { text: `Client instruction: ${side} ${f.num(qty, 0)} ${co.n} at limit ${co.c} ${f.num(px, 2)}, valid for the day`, ok: true },
          { text: `Side: ${side}` },
          { text: `Instrument: ${co.n}, ISIN ${co.i}` },
          { text: `Quantity: ${f.num(qty, 0)}` },
          { text: `Order type / limit: LIMIT / ${co.c} ${f.num(px, 2)}` },
          { text: `Validity: DAY (order date ${f.date(date)})` },
          { text: `Currency: ${co.c}` },
          { text: `Venue: ${co.m}` },
        ];
        const kinds = [
          { pos: 1, text: `Side: ${opp}`, why: `The client instruction says ${side} but the ticket says ${opp}: the side was keyed the wrong way round.` },
          { pos: 2, text: `Instrument: ${co.n}, ISIN ${other.i}`, why: `ISIN ${other.i} belongs to ${other.n}, not to ${co.n}. The ticket would trade the wrong security.` },
          { pos: 3, text: `Quantity: ${f.num(qtyBad, 0)}`, why: `The instruction is for ${f.num(qty, 0)} shares, but the ticket says ${f.num(qtyBad, 0)}: ten times too large.` },
          { pos: 4, text: `Order type / limit: MARKET / ${co.c} ${f.num(px, 2)}`, why: 'A market order has no limit price. The ticket contradicts itself and the client asked for a limit order.' },
          { pos: 4, text: 'Order type / limit: LIMIT / (blank)', why: 'A limit order must carry a limit price. Without it the system cannot protect the client.' },
          { pos: 4, text: `Order type / limit: LIMIT / ${co.c} ${f.num(px * 10, 2)}`, why: `The client's limit is ${co.c} ${f.num(px, 2)}, but the ticket shows ${f.num(px * 10, 2)}: a decimal-place slip that would defeat the price protection.` },
          { pos: 5, text: `Validity: GTD ${f.date(f.addDays(date, -3))} (order date ${f.date(date)})`, why: 'The instruction was valid for the day. The ticket has a good-till-date three days before the order date, which is already expired and inconsistent.' },
          { pos: 6, text: `Currency: ${badCcy}`, why: `${co.n} is quoted in ${co.c} on ${co.m}; a ${badCcy} order currency would trade or settle in the wrong currency.` },
        ];
        const nErr = r.int(1, 2);
        const chosen = [];
        for (const k of r.shuffle(kinds)) {
          if (chosen.length < nErr && !chosen.some((c) => c.pos === k.pos)) chosen.push(k);
        }
        const doc = segs.map((s, k) => {
          const e = chosen.find((c) => c.pos === k);
          return e ? { text: e.text, error: true, why: e.why } : { text: s.text, error: false };
        });
        return {
          title: 'Order ticket',
          prompt: 'The first line is what the client asked for. **Flag every field on the ticket that does not agree with it** (or is not valid).',
          doc,
          hints: ['Compare side, ISIN, quantity and price with the client instruction line.', 'Is the order type consistent with the price field?'],
        };
      },
    },
    {
      id: 'limit-executes',
      template: 'mcq',
      generate(r, f) {
        const M = r.market();
        const side = r.pick(['buy', 'sell']);
        const mkt = M.px(r.float(10, 120, 0.05));
        const gap = M.px(r.pick([0, 0.05, 0.1, 0.2, 0.5, 1]));
        const goes = r.bool(0.5);
        let lim;
        if (side === 'buy') lim = goes ? mkt + gap : mkt - (gap || M.px(0.1));
        else lim = goes ? mkt - gap : mkt + (gap || M.px(0.1));
        lim = f.round(lim, 2);
        const m = f.round(mkt, 2);
        const exec = side === 'buy' ? m <= lim : m >= lim;
        const choices = ['It executes immediately, at the market price or better', 'It does not execute now; it waits in the order book', 'It executes immediately at exactly the limit price', 'The venue rejects it'];
        return {
          prompt: `A client enters a **${side} limit order at ${M.ccy} ${f.num(lim, 2)}**. The ${side === 'buy' ? 'best offer (lowest sell price)' : 'best bid (highest buy price)'} on the screen is **${M.ccy} ${f.num(m, 2)}**. What happens?`,
          choices, answer: exec ? 0 : 1, fixedOrder: true,
          hints: [side === 'buy' ? 'A buy limit is a ceiling: the buyer accepts that price or lower.' : 'A sell limit is a floor: the seller accepts that price or higher.'],
          solution: exec
            ? `The market price is ${side === 'buy' ? 'at or below' : 'at or above'} the limit, so the order trades **at the market price (or better)**, not at the limit.`
            : `The market price is ${side === 'buy' ? 'above' : 'below'} the limit, so no counterparty is available yet. The order rests in the book.`,
        };
      },
    },
  ],
});
