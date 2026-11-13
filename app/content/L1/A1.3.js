/* A1.3 Two ledgers: cash and securities positions */
SA.unit({
  id: 'A1.3',
  lesson: [
    {
      md: String.raw`## Cash and securities ledgers

A securities back office keeps two sets of records for a portfolio. One shows euros: deposits, fees and a cash balance such as EUR 4,310.00. The other shows quantities per security, for example "ISIN DE000XXXXXXX1, 200". They are kept separately because euros and shares are measured in different units and cannot be added.

This unit covers the two ledgers, how they relate, and why the securities ledger is kept in units as well as in value.`,
    },
    {
      md: String.raw`## The cash ledger and the position ledger

| | **Cash (money) ledger** | **Securities (position) ledger** |
|---|---|---|
| Records | Amounts of money | Quantities of securities |
| Unit | A currency (EUR, USD) | Shares, units, or **nominal** (face amount) of a bond |
| Key | Client, account, currency | Client, account, **security (ISIN)** |
| Moves when | Money is paid or received | Securities are delivered or received |
| Example | Cash at bank EUR 4,310.00 | 200 shares of X |

A single trade affects both ledgers. A purchase of 200 shares appears in the cash ledger as a **debit** (money leaves) and in the securities ledger as **+200** shares.

> [!recall] A1.2
> The cash ledger is the Cash at bank account from A1.2. The securities ledger is a second set of books, with its own debits and credits, kept per ISIN.

> [!recall] T1.3
> The client's position at the bank is a record. Behind it, the bank holds the shares at a custodian and ultimately at the depository. Reconciling these records is covered in A1.5.`,
      check: {
        template: 'mcq',
        prompt: 'A client buys 500 units of a fund. Which entries appear?',
        choices: ['Cash ledger: money out. Securities ledger: +500 units', 'Cash ledger only', 'Securities ledger only', 'Neither, because the trade is recorded at settlement only'],
        answer: 0,
        solution: 'A purchase moves both: money out of the cash ledger and units into the securities ledger.',
      },
    },
    {
      md: String.raw`## Measuring a position

A client holds shares of X that were bought at different times. The securities ledger records the following measures.

| Term | Meaning |
|---|---|
| **Quantity** (or **nominal** for bonds) | How many units, or the face amount, are held |
| **Average cost** | Total cost of the units held divided by their quantity |
| **Book value** (cost basis) | What was paid for the units held: quantity × average cost |
| **Market value** | What the position is worth now: quantity × current price |

When a security is bought in several lots, the average cost is the **weighted average**. It is the total cost of all lots divided by the total quantity, which is not the plain average of the prices. FIFO and LIFO are alternative ways to decide which cost leaves the books on a sale (A1.4).

The difference between market value and book value is the **unrealised gain**, or loss if negative. It is unrealised because nothing has been sold and no cash has changed hands.

Revaluing a position needs a price. A long position is valued at the bid price, which is what the market would pay if the shares were sold. A short position would be valued at the offer price, which is what it would cost to buy the shares back. A closing price is an indicative figure, since the price actually obtained on a sale can differ.

> [!warning]
> Market value changes continuously, while book value changes only when the client trades. The books keep cost (the account is called **Securities at cost**), and market value comes from a price feed.

> [!recall] P1.4
> A fund's NAV is built by valuing every position at market price, as market value is calculated here.`,
    },
    {
      md: String.raw`## Worked example

> [!example]
> **Lot 1:** 120 shares at EUR 50.00 plus EUR 12 commission, cost EUR 6,012.00.
> **Lot 2:** 80 shares at EUR 56.00 plus EUR 8 commission, cost EUR 4,488.00.
> **Securities ledger:** quantity 200, book value 6,012 + 4,488 = **EUR 10,500.00**, average cost 10,500 / 200 = **EUR 52.50**.
> **Market price today (bid):** EUR 55.00, so market value = 200 × 55.00 = **EUR 11,000.00** and unrealised gain = 11,000 − 10,500 = **EUR 500.00**.
> **Cash ledger:** two debits to Cash at bank, EUR 6,012 and EUR 4,488, a total of EUR 10,500.

The plain average of the two prices is EUR 53.00, and 200 × 53.00 would give EUR 10,600. The weighted average is lower because the cheaper lot is the larger one.

Each ledger line is identified by three keys: client (who owns it), account (where it is held) and security (which ISIN). Reports roll up from there.

Quantity is the primary fact, because the custodian reports quantities and the books must be reconciled with them. A value can be recalculated from a quantity and a price, but a quantity cannot be recovered from a value.`,
    },
    {
      md: String.raw`## Ownership, location and the bank's books

The securities ledger can be read in two ways. By **ownership** it shows who the position belongs to, such as the bank's trading desk or a client account. By **location** it shows where the securities are held, such as a custodian or a broker. For every security the two views must total the same quantity.

| EUR 5,150,000 nominal of a bond | By ownership | By location |
|---|---|---|
| Trading desk | 5,000,000 | |
| Client accounts | 150,000 | |
| Custodian A | | 5,000,000 |
| Custodian B | | 150,000 |
| **Total** | **5,150,000** | **5,150,000** |

A purchase that has not settled shows in the ownership view at once, because the books are kept by trade date. The location view still shows the securities at the broker until delivery. A1.5 uses this difference.

Two further points apply to a bank:

- Client securities are not the bank's own assets. They sit in custody, segregated from the bank's balance sheet, and are recorded in the position ledger per client.
- The bank's own books (its own cash, its own securities, its own income) are a separate set. The fees a client pays become the bank's income. A client's EUR 10,000 deposit is the bank's liability to the client, while the client's own books show it as an asset.

One more account joins the chart. A **dividend** is cash income and does not change the quantity:

| Event | Debit | Credit |
|---|---|---|
| Dividend EUR 200 received | Cash at bank 200 | **Dividend income** 200 |

The chart now holds Cash at bank, Securities at cost, Client payable, Capital, Fees expense, Interest income and Dividend income.`,
    },
    {
      md: String.raw`## Summary

- There are two ledgers: **cash** (amounts in currency) and **securities positions** (quantity per ISIN).
- A buy or sell touches both ledgers. A dividend touches cash only, and a free transfer touches securities only.
- **Book value** is quantity × average cost (a weighted average over all lots), **market value** is quantity × current price, and **unrealised gain** is market value minus book value.
- Quantity is the primary fact because custodians report quantities. The ledger is read by owner and by location, and both views total the same.
- The chart now includes **Securities at cost** (asset) and **Dividend income** (income).`,
    },
  ],

  exercises: [
    {
      id: 'position-table',
      template: 'table',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const names = r.shuffle(['Alpha AG shares', 'Beta SA shares', 'Gamma NV shares', 'Delta plc shares', 'Omega Fund units', 'Sigma SE shares']).slice(0, 3);
        const raw = [];
        const rows = names.map((n) => {
          const q = r.int(1, 40) * 25;
          const cost = M.px(r.float(5, 200, 0.25));
          const price = M.px(r.float(5, 200, 0.25));
          const bv = f.round(q * cost, 2), mv = f.round(q * price, 2), ug = f.round(mv - bv, 2);
          raw.push({ n, q, cost, price });
          return [n, f.num(q, 0), f.num(cost, 2), { answer: bv, dp: 2, tol: { abs: 0.01 } }, f.num(price, 2), { answer: mv, dp: 2, tol: { abs: 0.01 } }, { answer: ug, dp: 2, tol: { abs: 0.01 } }];
        });
        return {
          prompt: `Complete the position table. Quantity and average cost are from the securities ledger and price is today's market price. Book value is quantity × average cost, market value is quantity × price, and unrealised gain is market value minus book value (negative for a loss). Amounts in ${CCY}.`,
          columns: ['Security', 'Quantity', 'Average cost', 'Book value', 'Price', 'Market value', 'Unrealised gain'],
          rows,
          hints: [`Take ${raw[0].n} first. Book value uses the average cost column and market value uses the price column, both multiplied by the quantity of ${f.num(raw[0].q, 0)}.`,
            `For ${raw[0].n}: book value is ${f.num(raw[0].q, 0)} × ${f.num(raw[0].cost, 2)}, market value is ${f.num(raw[0].q, 0)} × ${f.num(raw[0].price, 2)}, and the unrealised gain is the second result minus the first. Repeat for ${raw[1].n} and ${raw[2].n}.`],
          solution: rows.map((x) => `${x[0]}: BV ${f.num(x[3].answer, 2)}, MV ${f.num(x[5].answer, 2)}, gain ${f.num(x[6].answer, 2)}`).join('. '),
        };
      },
    },
    {
      id: 'ledger-buckets',
      template: 'bucket',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const nm = r.pick(['Alpha AG', 'Beta SA', 'Gamma NV', 'Delta plc']);
        const cash = [
          () => `A deposit of ${f.money(M.amt(r.int(1, 40) * 1000), CCY, 0)} arrives`, () => `A dividend of ${f.money(M.amt(r.int(2, 90) * 10), CCY, 0)} on ${nm} is paid`,
          () => `A custody fee of ${f.money(M.amt(r.int(2, 40) * 10), CCY, 0)} is charged`, () => `The client withdraws ${f.money(M.amt(r.int(1, 20) * 500), CCY, 0)}`,
          () => `Interest of ${f.money(M.amt(r.int(2, 40) * 5), CCY, 0)} is credited`,
        ];
        const sec = [
          () => `${r.int(1, 20) * 50} shares of ${nm} are transferred in free of payment`, () => `${r.int(1, 20) * 50} shares of ${nm} are transferred out free of payment`,
          () => `A ${r.pick([2, 3, 5])}-for-1 split of ${nm} shares takes effect`, () => `${r.int(1, 10) * 10} bonus shares of ${nm} are credited`,
        ];
        const both = [
          () => `Buy ${r.int(1, 20) * 50} ${nm} shares for ${f.money(M.amt(r.int(5, 60) * 1000), CCY, 0)}`, () => `Sell ${r.int(1, 20) * 50} ${nm} shares for ${f.money(M.amt(r.int(5, 60) * 1000), CCY, 0)}`,
          () => `A bond is redeemed at maturity for ${f.money(M.amt(r.int(5, 50) * 1000), CCY, 0)}`, () => `Subscribe to ${r.int(1, 20) * 10} fund units for ${f.money(M.amt(r.int(2, 30) * 1000), CCY, 0)}`,
        ];
        const mix = r.pick([[4, 3, 3], [3, 3, 4], [3, 4, 3]]);
        const items = [];
        [cash, sec, both].forEach((pool, b) => r.sample(pool, mix[b]).forEach((fn) => items.push({ text: fn(), bucket: b })));
        return {
          prompt: 'Sort each event by which ledger it changes.',
          buckets: ['Moves cash only', 'Moves securities only', 'Moves both'],
          items: r.shuffle(items),
          hints: ['Ask separately: does money move? do securities move?'],
          solution: 'Cash only: deposits, dividends, fees, withdrawals, interest. Securities only: free transfers, splits, bonus shares. Both: purchases, sales, redemptions and subscriptions.',
        };
      },
    },
    {
      id: 'unrealised',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const q = r.int(2, 80) * 25;
        const cost = M.px(r.float(5, 300, 0.25));
        const price = M.px(r.float(5, 300, 0.25));
        const bv = f.round(q * cost, 2), mv = f.round(q * price, 2), ug = f.round(mv - bv, 2);
        const ask = r.pick(['mv', 'gain', 'gain', 'avg']);
        if (ask === 'avg') {
          const q1 = r.int(2, 40) * 10, q2 = r.int(2, 40) * 10, p1 = M.amt(r.float(5, 150, 0.25)), p2 = M.amt(r.float(5, 150, 0.25));
          const tot = f.round(q1 * p1 + q2 * p2, 2), avg = f.round(tot / (q1 + q2), 4);
          return {
            prompt: `A client bought ${f.num(q1, 0)} shares at ${f.money(p1, CCY)} and later ${f.num(q2, 0)} more shares of the same company at ${f.money(p2, CCY)}. Ignore commission. What is the average cost per share held? (${CCY}, 2 dp)`,
            answer: avg, dp: 2, tol: { abs: 0.01 }, unit: CCY,
            hints: ['Add the cost of both lots first.', 'Divide the total cost by the total quantity, not by 2.'],
            solution: `Total cost is ${f.num(q1, 0)} × ${f.num(p1, 2)} + ${f.num(q2, 0)} × ${f.num(p2, 2)} = ${f.num(tot, 2)}. Total quantity is ${f.num(q1 + q2, 0)}. Average cost is ${f.num(tot, 2)} / ${f.num(q1 + q2, 0)} = **${f.money(avg, CCY)}**.`,
          };
        }
        const pre = `A client holds ${f.num(q, 0)} shares with an average cost of ${f.money(cost, CCY)} each. Today's price is ${f.money(price, CCY)}.`;
        return ask === 'mv' ? {
          prompt: `${pre} What is the market value of the position? (${CCY}, 2 dp)`,
          answer: mv, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: ['Market value = quantity × current price.'],
          solution: `${f.num(q, 0)} × ${f.num(price, 2)} = **${f.money(mv, CCY)}**.`,
        } : {
          prompt: `${pre} What is the unrealised gain (negative for a loss)? (${CCY}, 2 dp)`,
          answer: ug, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: ['Market value minus book value.', 'Book value = quantity × average cost.'],
          solution: `Book value is ${f.num(bv, 2)} and market value is ${f.num(mv, 2)}, so the unrealised gain is **${f.money(ug, CCY)}**.`,
        };
      },
    },
    {
      id: 'which-ledger',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const E = {
          a: 'Cash ledger down and securities ledger up',
          b: 'Cash ledger up and securities ledger down',
          c: 'Cash ledger up only; securities ledger unchanged',
          d: 'Cash ledger down only; securities ledger unchanged',
          e: 'Securities ledger up only; cash ledger unchanged',
          g: 'Securities ledger down only; cash ledger unchanged',
          h: 'Quantity up with book value unchanged; cash ledger unchanged',
        };
        const q = r.int(1, 20) * 50;
        const mk = (text, k, h1, h2) => ({ t: text, k, h: [h1, h2] });
        const buyAmt = f.money(M.amt(q * r.int(5, 50)), CCY, 0), sellAmt = f.money(M.amt(q * r.int(5, 50)), CCY, 0);
        const divAmt = f.money(M.amt(r.int(2, 90) * 10), CCY, 0), depAmt = f.money(M.amt(r.int(1, 40) * 1000), CCY, 0), feeAmt = f.money(M.amt(r.int(2, 40) * 10), CCY, 0);
        const events = [
          mk(`The client buys ${q} shares for ${buyAmt}`, 'a', `Ask two questions. Does money change hands for the ${buyAmt}, and do the ${q} shares appear or leave?`, 'A purchase is paid for in cash and the shares are received. Decide the direction of each ledger.'),
          mk(`The client sells ${q} shares for ${sellAmt}`, 'b', `Ask two questions. Does money change hands for the ${sellAmt}, and do the ${q} shares appear or leave?`, 'A sale delivers the shares and brings in cash. Decide the direction of each ledger.'),
          mk(`A dividend of ${divAmt} is paid on shares held`, 'c', `Ask whether the shares held change when the dividend of ${divAmt} is paid, and whether cash changes.`, 'The holder keeps the same number of shares and receives money. Decide which ledgers that touches.'),
          mk(`The client deposits ${depAmt}`, 'c', `Ask whether a deposit of ${depAmt} involves any securities, and whether it adds to or takes from cash.`, 'No shares or units are bought, sold or moved. Decide the direction of the cash ledger.'),
          mk(`A custody fee of ${feeAmt} is paid from the account`, 'd', `Ask whether a fee of ${feeAmt} changes the quantity of any security, and which way cash moves.`, 'A fee is paid out of the cash balance and no securities are bought or sold. Decide which ledgers that touches.'),
          mk(`${q} shares are delivered in from another bank, free of payment`, 'e', `Free of payment means no cash is exchanged for the ${q} shares. Decide which ledgers can change.`, 'The shares arrive at this bank. Decide the direction of the securities ledger.'),
          mk(`${q} shares are delivered out to another bank, free of payment`, 'g', `Free of payment means no cash is exchanged for the ${q} shares. Decide which ledgers can change.`, 'The shares leave this bank. Decide the direction of the securities ledger.'),
          mk(`A 2-for-1 stock split on ${q} shares held`, 'h', `Ask whether any cash changes hands in a split of ${q} shares, and whether the number of shares held changes.`, 'A split changes the number of shares but not what was paid for them in total. Decide which ledgers are affected.'),
        ];
        const ev = r.pick(events);
        const keys = [ev.k].concat(r.sample(Object.keys(E).filter((k) => k !== ev.k), 3));
        return {
          prompt: `${ev.t}. Which ledgers change, and in which direction?`,
          choices: keys.map((k) => E[k]),
          answer: 0,
          fixedOrder: false,
          hints: ev.h,
          solution: `**${E[ev.k]}.**`,
        };
      },
    },
    {
      id: 'term-match',
      template: 'match',
      generate(r) {
        const d = {
          'Book value': ['Quantity multiplied by average cost: what was paid', 'The cost basis of the position held'],
          'Market value': ['Quantity multiplied by the current price', 'What the position would be worth at today\'s market price'],
          'Nominal': ['The face amount of a bond held', 'The principal amount on which a bond pays interest'],
          'Quantity': ['The number of shares or units held', 'How many units appear in the securities ledger'],
          'Average cost': ['Total cost divided by the quantity held', 'The cost per unit across all purchases'],
        };
        return {
          prompt: 'Match each term with its definition.',
          pairs: r.shuffle(Object.keys(d)).map((k) => [k, r.pick(d[k])]),
          hints: ['Book is what you paid, market is what it is worth now.'],
          solution: 'Book value: quantity × average cost. Market value: quantity × price. Nominal: face amount. Quantity: units held. Average cost: total cost ÷ quantity.',
        };
      },
    },
  ],
});
