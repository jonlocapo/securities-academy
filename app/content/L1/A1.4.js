/* A1.4 Booking a trade: buy and sell in the ledgers */
SA.unit({
  id: 'A1.4',
  lesson: [
    {
      md: String.raw`## Booking a trade

A client buys 200 shares of a listed company at EUR 52.35 and pays a EUR 15 commission. Booking the trade combines the earlier units: two accounts in the cash ledger, a movement in the position ledger, a fee and, later, a gain.

This unit covers booking a **purchase**, booking a **sale** with its **realised gain**, and the difference between **trade date** and **settlement date**.`,
    },
    {
      md: String.raw`## Booking a purchase

A buy converts cash into securities. In double-entry terms:

- **Debit Securities at cost**, the asset that arrives.
- **Credit Cash at bank**, the asset that leaves.

The amount is the price of the shares plus the commission paid to acquire them. The commission is part of the cost of acquiring the position, so it is added to the cost.

> [!example]
> Buy 200 shares at EUR 52.35, commission EUR 15.
> Gross = 200 × 52.35 = EUR 10,470. Total cost = 10,470 + 15 = **EUR 10,485**.
>
> | Debit | Credit |
> |---|---|
> | Securities at cost 10,485 | Cash at bank 10,485 |
>
> Position ledger: **+200 shares**, book value EUR 10,485, average cost 10,485 / 200 = EUR 52.425.

The gross amount (quantity × price) is only part of the cash that leaves. A purchase never produces a gain or loss. Nothing is earned until the shares are sold, and the gain is then the difference between cost and the amount received.

> [!recall] A1.3
> Book value in the securities ledger is the accumulated debits to Securities at cost.

> [!warning]
> Treating the buy commission as part of cost is the rule used throughout this course, and many frameworks do the same. Some accounting rules, for assets measured at fair value through profit or loss, expense the commission immediately instead (Dr Fees expense). The cash is the same under either rule and only the account changes.`,
      check: {
        template: 'mcq',
        prompt: 'Buying 100 shares at EUR 20 with a EUR 10 commission: what is debited to Securities at cost?',
        choices: ['EUR 2,010', 'EUR 2,000', 'EUR 10', 'EUR 1,990'],
        answer: 0,
        solution: 'Cost includes the commission: 100 × 20 + 10 = 2,010.',
      },
    },
    {
      md: String.raw`## Booking a sale and the realised gain

A sale is the opposite of a purchase. Shares leave and cash arrives. The commission reduces the proceeds, so the cash received is net:

$$\text{Net proceeds} = \text{quantity} \times \text{price} - \text{commission}$$

Securities leave the books at cost, which is the amount in the ledger, and the difference is a gain or loss:

$$\text{Realised gain} = \text{Net proceeds} - \text{Cost of the shares sold}$$

> [!example]
> The client sells all 200 shares at EUR 56 with a EUR 15 commission.
> Net proceeds = 200 × 56 − 15 = **EUR 11,185**. Cost = **EUR 10,485**. Gain = **EUR 700**.
>
> | Debit | Credit |
> |---|---|
> | Cash at bank 11,185 | Securities at cost 10,485 |
> | | **Realised gains 700** |
>
> Debits 11,185 = credits 10,485 + 700.

A loss goes on the debit side of the same account. If the same shares are sold at EUR 50, net proceeds are 200 × 50 − 15 = 9,985 against a cost of 10,485:

| Debit | Credit |
|---|---|
| Cash at bank 9,985 | Securities at cost 10,485 |
| **Realised gains 500** (a loss, so a debit) | |

A realised gain or loss is recognised on the trade date of the sale, and not on the day the cash arrives.

Selling part of a position removes only that part of the cost, and three conventions decide which cost it is:

- **FIFO** matches the sale with the earliest purchases.
- **LIFO** matches it with the latest purchases.
- **Weighted average cost** uses the average cost of all units held.

Take purchases of 100 shares at EUR 20.00, 100 at EUR 22.00 and 200 at EUR 21.00, ignoring commission. The weighted average is 8,400 / 400 = EUR 21.00. A sale of 100 shares at EUR 22.50 gives a gain of EUR 250 under FIFO (cost 20.00), EUR 150 under LIFO (cost 21.00, the latest lot) and EUR 150 under weighted average (cost 21.00). The last two agree only because the latest lot happens to cost the same as the average. All conventions are acceptable provided the same one is used consistently.

> [!recall] F1.5
> The realised gain of EUR 700 on a cost of EUR 10,485 is a holding-period return of about 6.7%. Accounting gives the amount in euros, and returns express it as a percentage.`,
    },
    {
      md: String.raw`## Trade date and settlement date

The trade is agreed on **trade date (T)**. The shares and the cash change hands on **settlement date (S)**. Settlement is T+2 in the EU and UK today and T+1 in the US. The EU and UK move to T+1 on 11 October 2027 under [Regulation (EU) 2025/2075](https://eur-lex.europa.eu/eli/reg/2025/2075/oj). Between T and S the trade is pending. On exchange the clearing system settles automatically. In over-the-counter trades the parties use **delivery versus payment**, which exchanges the securities and the cash at the same moment so that neither side delivers without being paid.

Under **trade-date accounting** the asset and the liability are recorded on the trade date, and the liability is removed when the payment is made. Under **settlement-date accounting** nothing is recorded until settlement. US practice requires trade-date accounting for regular-way trades of broker-dealers and investment companies, and IFRS allows either method if it is applied consistently. This course uses trade date.

| When | Postings | Securities ledger |
|---|---|---|
| **Trade date (T)** | The amount owed is recorded: Dr Securities at cost / Cr **Client payable** (the broker or counterparty is the creditor) | Position shows **+200 as pending** (unsettled) |
| **T+1** (in a T+2 market) | Nothing posted, and the confirmation is matched | Nothing |
| **Settlement date (S)** | Cash leaves: Dr Client payable / Cr Cash at bank | Position becomes **settled**, and the shares are delivered |

For a sale the pattern reverses. On trade date the books show a receivable from the buyer in place of the shares (Dr Amount receivable / Cr Securities and the gain), and on settlement date the cash arrives (Dr Cash at bank / Cr Amount receivable).

The journal exercises in this unit post the whole trade directly to cash, as if it settled at once. The result is the same on the day after settlement.

> [!recall] T1.4
> In the full-trade unit, cash and securities swap on settlement day. The postings above are the bookkeeping behind that swap.`,
    },
    {
      md: String.raw`## Common booking errors

- **Fee twice.** The commission is part of the cost or a separate expense and never both. If Securities includes 10,485 and Fees expense also receives 15, the entry credits cash with 10,500, which is wrong.
- **Gain on a buy.** A purchase never creates a gain. If the price rises afterwards, the result is an unrealised gain, which books kept at cost do not record.
- **Wrong side.** A buy debits securities and credits cash, and a sale does the reverse. Debiting cash on a buy leaves the totals balanced but makes the position negative.
- **Sale fee ignored.** Net proceeds must be after the sale commission. Omitting it overstates both cash and the gain.
- **Cost mixed with market price.** Securities leave at cost and not at the sale price.

> [!tip]
> Any sale entry must balance, and the sign of the gain must agree with proceeds minus cost.`,
    },
    {
      md: String.raw`## Summary

- **Buy:** Dr Securities at cost (price × quantity + fee) / Cr Cash at bank.
- **Sell:** Dr Cash at bank (net of fee) / Cr Securities at cost (cost of the shares sold) / Cr or Dr Realised gains (gain or loss).
- Realised gain is net proceeds minus cost, and a loss is a debit to Realised gains.
- Trade date records the obligation and the pending position, and settlement date moves cash and securities.
- Common errors are a fee booked twice, a gain on a buy and the wrong side.`,
    },
  ],

  exercises: [
    {
      id: 'book-buy',
      template: 'journal',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const q = r.int(5, 100) * 10;
        const p = M.px(r.float(5, 150, 0.05));
        const fee = M.amt(r.int(5, 20));
        const gross = f.round(q * p, 2);
        const total = f.round(gross + fee, 2);
        const nm = r.pick(['Alpha AG', 'Beta SA', 'Gamma NV', 'Delta plc']);
        return {
          prompt: `The portfolio buys **${f.num(q, 0)} shares of ${nm} at ${f.money(p, CCY)}** with a flat commission of **${f.money(fee, CCY)}**. The commission is included in cost. Post the purchase (assume cash settles at once).`,
          accounts: r.shuffle(['Cash at bank', 'Securities at cost', 'Fees expense', 'Realised gains', 'Client payable', 'Capital']),
          lines: [{ account: 'Securities at cost', dr: total }, { account: 'Cash at bank', cr: total }],
          tol: { abs: 0.01 },
          hints: [`Work out the gross amount first: ${f.num(q, 0)} shares × ${f.num(p, 2)}. Then add the commission of ${f.money(fee, CCY)}, since it is included in cost.`, `The gross amount is ${f.num(gross, 2)}. Add the commission to get the amount that goes on both lines. Securities at cost is the asset that rises and Cash at bank is the asset that falls, so decide the side of each.`],
          solution: `Gross ${f.num(q, 0)} × ${f.num(p, 2)} = ${f.num(gross, 2)}, plus ${f.num(fee, 2)} fee = ${f.num(total, 2)}. Dr Securities at cost ${f.num(total, 2)} / Cr Cash at bank ${f.num(total, 2)}.`,
        };
      },
    },
    {
      id: 'book-sell',
      template: 'journal',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const q = r.int(5, 100) * 10;
        const p0 = M.amt(r.float(5, 150, 0.05));
        const fee0 = M.amt(r.int(5, 20)), fee1 = M.amt(r.int(5, 20));
        const cost = f.round(q * p0 + fee0, 2);
        let p1 = f.round(p0 * (1 + r.float(-0.25, 0.25, 0.01)), 2);
        if (f.round(q * p1 - fee1, 2) === cost) p1 = f.round(p1 + 0.05, 2);
        const proceeds = f.round(q * p1 - fee1, 2);
        const gain = f.round(proceeds - cost, 2);
        const nm = r.pick(['Alpha AG', 'Beta SA', 'Gamma NV', 'Delta plc']);
        const lines = [{ account: 'Cash at bank', dr: proceeds }, { account: 'Securities at cost', cr: cost }];
        if (gain > 0) lines.push({ account: 'Realised gains', cr: gain }); else lines.push({ account: 'Realised gains', dr: -gain });
        return {
          prompt: `The portfolio holds **${f.num(q, 0)} shares of ${nm}** with a book value (cost, including the purchase commission) of **${f.money(cost, CCY)}**. It sells **all of them at ${f.money(p1, CCY)}** with a commission of **${f.money(fee1, CCY)}** deducted from the proceeds. Post the sale; a loss goes as a debit to Realised gains.`,
          accounts: r.shuffle(['Cash at bank', 'Securities at cost', 'Realised gains', 'Fees expense', 'Capital', 'Dividend income']),
          lines,
          tol: { abs: 0.01 },
          hints: [`Net proceeds are ${f.num(q, 0)} × ${f.num(p1, 2)} less the commission of ${f.money(fee1, CCY)}. That is the amount received in cash.`, `Gross proceeds are ${f.num(f.round(q * p1, 2), 2)}. After the commission, compare net proceeds with the cost of ${f.num(cost, 2)}. The result is a ${gain > 0 ? 'gain' : 'loss'}, which decides the side of the Realised gains line. Securities at cost is released at its book value.`],
          solution: `Net proceeds ${f.num(q, 0)} × ${f.num(p1, 2)} − ${f.num(fee1, 2)} = ${f.num(proceeds, 2)}. Gain = ${f.num(proceeds, 2)} − ${f.num(cost, 2)} = **${f.money(gain, CCY)}**${gain < 0 ? ' (a loss)' : ''}.`,
        };
      },
    },
    {
      id: 'realised-gain',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        if (r.bool(0.3)) {
          const q1 = r.int(2, 30) * 10, q2 = r.int(2, 30) * 10, p1 = M.amt(r.float(10, 100, 0.25)), p2 = M.amt(r.float(10, 100, 0.25));
          const qs = r.int(1, Math.min(q1, q1 + q2 - 1) / 10) * 10, ps = f.round((p1 + p2) / 2 * (1 + r.float(-0.1, 0.15, 0.01)), 2);
          const useWac = r.bool();
          const wac = (q1 * p1 + q2 * p2) / (q1 + q2);
          const cost = useWac ? qs * wac : qs * p1;
          const gain = f.round(qs * ps - cost, 2);
          return {
            prompt: `A client buys ${f.num(q1, 0)} shares at ${f.money(p1, CCY)} and then ${f.num(q2, 0)} shares at ${f.money(p2, CCY)} (ignore commission). The client sells **${f.num(qs, 0)}** shares at **${f.money(ps, CCY)}**. Using **${useWac ? 'weighted average cost' : 'FIFO'}**, what is the realised gain? Negative for a loss. (${CCY}, 2 dp)`,
            answer: gain, dp: 2, tol: { abs: 0.01 }, unit: CCY,
            hints: [useWac ? 'Average cost = total cost of both lots divided by total quantity.' : 'FIFO releases the cost of the earliest purchase first.', 'Gain = sale proceeds minus the cost released.'],
            solution: `Proceeds are ${f.num(qs, 0)} × ${f.num(ps, 2)} = ${f.num(qs * ps, 2)}. The cost released is ${f.num(qs, 0)} × ${f.num(useWac ? wac : p1, 4)} = ${f.num(cost, 2)}. The gain is **${f.money(gain, CCY)}**.`,
          };
        }
        const q = r.int(5, 100) * 10;
        const pb = M.amt(r.float(5, 150, 0.05));
        const ps = f.round(pb * (1 + r.float(-0.2, 0.3, 0.01)), 2);
        const fb = M.amt(r.int(5, 25)), fs = M.amt(r.int(5, 25));
        const gain = f.round(q * ps - fs - (q * pb + fb), 2);
        return {
          prompt: `A client buys **${f.num(q, 0)}** shares at **${f.money(pb, CCY)}** (buy commission ${f.money(fb, CCY)}, added to cost) and later sells them all at **${f.money(ps, CCY)}** (sell commission ${f.money(fs, CCY)}, deducted from proceeds). What is the realised gain? Negative for a loss. (${CCY}, 2 dp)`,
          answer: gain, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: ['Cost = quantity × buy price + buy fee.', 'Net proceeds = quantity × sell price − sell fee.'],
          solution: `Cost is ${f.num(q * pb + fb, 2)} and net proceeds are ${f.num(q * ps - fs, 2)}, so the gain is **${f.money(gain, CCY)}**.`,
        };
      },
    },
    {
      id: 'settlement-timeline',
      template: 'timeline',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const cyc = r.pick([1, 2]);
        const start = r.pick(['2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '2026-11-09', '2026-11-10', '2026-11-11']);
        const dates = [0, 1, 2].slice(0, cyc + 1).map((d) => f.addBusinessDays(start, d));
        const slots = dates.map((d, i) => (i === 0 ? `T (trade date) ${f.date(d)}` : i === cyc ? `T+${i} (settlement) ${f.date(d)}` : `T+${i} ${f.date(d)}`));
        const q = r.int(2, 40) * 10, p = M.px(r.float(10, 120, 0.5)), tot = f.round(q * p + M.amt(12), 2);
        const events = [
          { text: `Dr Securities at cost ${f.num(tot, 2)} / Cr Client payable ${f.num(tot, 2)}`, slot: 0 },
          { text: `Securities ledger shows +${f.num(q, 0)} shares as a pending position`, slot: 0 },
          { text: `Dr Client payable ${f.num(tot, 2)} / Cr Cash at bank ${f.num(tot, 2)}`, slot: cyc },
          { text: `The ${f.num(q, 0)} shares are delivered and the position becomes settled`, slot: cyc },
        ];
        if (cyc === 2) events.push({ text: 'Trade confirmation matched; no entry posted', slot: 1 });
        return {
          prompt: `A client buys ${f.num(q, 0)} shares on ${f.date(start)} for ${f.money(tot, CCY)} including commission. The market settles T+${cyc}. Place each posting on the day it is made (trade-date accounting).`,
          slots,
          events: r.shuffle(events),
          hints: [`The trade is on ${f.date(dates[0])} and the market settles T+${cyc}, on ${f.date(dates[cyc])}. Cash and delivery of the ${f.num(q, 0)} shares cannot move before the settlement date.`, `Client payable of ${f.num(tot, 2)} is created before it is cleared, so the entry that creates it goes earlier than the entry that clears it. The pending position is recorded when the trade is made.`],
          solution: 'Trade date: Dr Securities / Cr Client payable and the pending position. Settlement date: Dr Client payable / Cr Cash, and the position settles.',
        };
      },
    },
    {
      id: 'spot-purchase',
      template: 'spot',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const q = r.int(5, 100) * 10;
        const p = M.px(r.float(5, 150, 0.05));
        const fee = M.amt(r.int(5, 20));
        const nm = r.pick(['Alpha AG', 'Beta SA', 'Gamma NV', 'Delta plc']);
        const gross = f.round(q * p, 2);
        const tot = f.round(gross + fee, 2);
        const g2 = (x) => f.num(x, 2);
        const kind = r.pick(['fee2', 'gain', 'side', 'gross']);
        const lines = [
          `Trade ticket: BUY ${f.num(q, 0)} ${nm} shares at ${f.money(p, CCY)}, commission ${f.money(fee, CCY)}`,
          `Gross amount: ${f.num(q, 0)} × ${g2(p)} = ${g2(kind === 'gross' ? gross + M.amt(10 * r.int(1, 9)) : gross)}`,
          `Total cost including commission: ${g2(tot)}`,
          kind === 'fee2' ? `Entry: Dr Securities at cost ${g2(tot)} / Dr Fees expense ${g2(fee)} / Cr Cash at bank ${g2(tot + fee)}` : kind === 'side' ? `Entry: Dr Cash at bank ${g2(tot)} / Cr Securities at cost ${g2(tot)}` : `Entry: Dr Securities at cost ${g2(tot)} / Cr Cash at bank ${g2(tot)}`,
          `Securities ledger: +${f.num(q, 0)} ${nm} shares, book value ${g2(tot)}`,
          kind === 'gain' ? `Revaluation: Dr Securities at cost ${g2(M.amt(20))} / Cr Realised gains ${g2(M.amt(20))} (closing price above cost)` : 'Realised gain on this trade: none',
          `Cash ledger: debit ${g2(tot)}`,
        ];
        const idx = { gross: 1, fee2: 3, side: 3, gain: 5 }[kind];
        const why = {
          gross: 'The gross amount is wrong. Quantity times price does not give that figure, and the total cost does not agree with it.',
          fee2: 'The commission is posted twice: it is already inside the cost, so a separate Fees expense debit would double count it and overcredit cash.',
          side: 'The sides are reversed. A purchase debits Securities at cost and credits Cash at bank.',
          gain: 'A purchase creates no realised gain. A rise in price after the buy is unrealised, and securities stay at cost until sold.',
        }[kind];
        return {
          prompt: 'Review the booking of this purchase. Flag the line that is wrong.',
          title: 'Purchase booking (extract)',
          doc: lines.map((t, i) => ({ text: t, error: i === idx, why: i === idx ? why : undefined })),
          count: 1,
          hints: ['Recompute the gross and the total, then check the sides and look for fees or gains that should not be there.'],
        };
      },
    },
  ],
});
