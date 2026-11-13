/* A1.5 Position checks and the first chart of accounts */
SA.unit({
  id: 'A1.5',
  lesson: [
    {
      md: String.raw`## Why positions are checked

A firm needs to know what it holds and where it is held. A record that says EUR 1,000 in the bank is misleading if a cheque for EUR 350 has been issued and not booked. A payment of EUR 900 then looks affordable and causes an overdraft. **Reconciliation** is the comparison of two sets of records to find and explain every difference. It applies to cash and to securities.

There are two ways to see the task:

1. Compare **internal records** (the ledger) with **external records** such as a bank statement, a custodian statement or a broker statement.
2. Compare **ownership** of an asset (the firm's own or a client's) with its **location** (custodian, broker or counterparty).

The books are kept by trade date, because the front office considers its activity from the trade. Operations staff reconcile from a settlement perspective, because the external party reports what has settled. Trades that are open or have failed therefore explain many differences.

> [!recall] T1.3
> The custodian holds the shares for the bank or for its clients, so its record is the external proof that the shares exist.`,
      check: {
        template: 'mcq',
        prompt: 'Our books show 800 shares and the custodian shows 800. What do we record?',
        choices: ['A match: no action', 'A break of 800', 'A break to be fixed with a journal entry', 'A timing difference'],
        answer: 0,
        solution: 'Equal quantities are a match. Only differences are breaks.',
      },
    },
    {
      md: String.raw`## Types and methods of reconciliation

Five types are in common use.

| Type | Compares | Against |
|---|---|---|
| Trade by trade | Individual trades | Front office and operations records (internal) |
| Traded position | Totals per book or client | Front office and operations records (internal) |
| Open trades | Individual trades | Custodian, broker or counterparty (external) |
| Depot position | Securities totals | Custodian (external) |
| Cash position | Balances and movements in a nostro account | Bank (external) |

The first two are internal and check that the dealers' records agree with the settlement system. The other three are external. A **nostro account** is the firm's account held with a bank in another currency or market.

A securities portfolio can be reconciled on one date for every security, which is the **total count method**. In the **rolling stock method** each security is reconciled on its own date, and all must be covered within a set period such as six months. The total count method has a heavy workload on one date. The rolling method spreads the work but needs controls so that no position is missed.

> [!tip]
> A difference is a **break**. Every break needs an explanation, an owner and a fix.`,
    },
    {
      md: String.raw`## Depot reconciliation

The depot reconciliation compares the position per security in the books with the custodian's settled position, in quantity.

| Security | Our books | Custodian | Difference | Explanation |
|---|---|---|---|---|
| Alpha AG | 1,000 | 1,000 | 0 | None |
| Beta SA | 600 | 800 | -200 | Sale of 200 traded, settles tomorrow |
| Gamma NV | 700 | 300 | +400 | Purchase of 400 failed, seller lacks availability |
| Delta plc | 1,500 | 750 | +750 | Bonus issue of 1 for 1 not yet received |

The difference is books minus custodian. Each break is explained by a known item, so the portfolio reconciles. The breaks still need to be chased. A failed trade is followed up with the counterparty, and a corporate action entitlement is checked against the expected receipt date.

Items that commonly explain a difference are:

- **open trades**, which are traded and not yet at settlement date
- **failed trades**, which have reached settlement date without delivery
- **corporate actions** such as a bonus issue where the new shares have not yet arrived
- **securities lending and borrowing** movements
- an entry that was never booked, or one booked twice

> [!warning]
> A position can show no difference while hiding two breaks. A purchase of 500 and a sale of 500 that both failed cancel each other out. The trade-level detail still has to be checked.`,
    },
    {
      md: String.raw`## Cash reconciliation

A cash reconciliation follows a fixed procedure.

1. Confirm that both sides start from the same figure: yesterday's closing ledger balance must equal the statement's opening balance.
2. Tick off the entries common to both records. One bank credit can combine several cheques.
3. Classify what is left. Four kinds of unmatched item are possible:
   - (a) receipts in the ledger that the bank has not yet credited
   - (b) payments in the ledger that the bank has not yet debited, such as cheques not presented
   - (c) items the bank deducted that are not in the ledger, such as charges
   - (d) items the bank credited that are not in the ledger
4. Prepare a reconciliation statement that starts from one balance and ends at the other.

Items of type (c) and (d) may need to be booked. They may also be bank errors, which are reported to the bank. A payment that nobody authorised is investigated first, and it can be held in a temporary account so that the ledger agrees with the bank in the meantime.

> [!example]
> Ledger balance EUR 5,200.00. Bank statement balance EUR 6,030.00. Unmatched items: (a) EUR 400 received in the ledger and not yet credited by the bank, (b) a EUR 250 cheque not yet presented, (c) bank charges of EUR 20 not in the ledger, and (d) a EUR 1,000 credit not in the ledger.
>
> Start from the bank balance: 6,030 + 400 (a) − 250 (b) + 20 (c) − 1,000 (d) = **EUR 5,200.00**, which equals the ledger balance.

If the result differs from the ledger balance, an item is missing or wrong and the reconciliation is not finished. Items (c) and (d) are then booked in the ledger.`,
    },
    {
      md: String.raw`## The chart of accounts

Once the books have more than a few accounts, each account gets a **code** and a **group**. The course chart for a client-side portfolio is:

| Code | Account | Group |
|---|---|---|
| 1000 | Cash at bank | Assets |
| 1100 | Securities at cost | Assets |
| 2000 | Client payable | Liabilities |
| 3000 | Capital | Equity |
| 4000 | Interest income | Income |
| 4100 | Dividend income | Income |
| 4200 | Realised gains | Income |
| 5000 | Fees expense | Expenses |

The numbering follows the five families: 1xxx assets, 2xxx liabilities, 3xxx equity, 4xxx income and 5xxx expenses. A code therefore shows the account's family and its normal balance. Gaps in the numbering leave room to add accounts without renumbering. This numbering is a course convention and firms use their own.

> [!recall] A1.2
> Codes 1xxx and 5xxx are debit-normal, and 2xxx, 3xxx and 4xxx are credit-normal.

Mapping events to accounts is the daily task:

| Event | Debit | Credit |
|---|---|---|
| Client deposit | 1000 | 3000 |
| Purchase of shares | 1100 | 1000 (or 2000 until paid) |
| Fee charged and paid | 5000 | 1000 |
| Fee billed, unpaid | 5000 | 2000 |
| Dividend | 1000 | 4100 |
| Interest | 1000 | 4000 |
| Sale at a profit | 1000 | 1100 and 4200 |`,
    },
    {
      md: String.raw`## A short day, end to end

> [!example]
> **Events:** (1) deposit EUR 20,000, (2) buy 100 shares at EUR 150 with no commission, (3) custody fee EUR 25 paid, (4) dividend EUR 120 received.
>
> | # | Debit | Credit | Amount |
> |---|---|---|---|
> | 1 | 1000 Cash at bank | 3000 Capital | 20,000 |
> | 2 | 1100 Securities at cost | 1000 Cash at bank | 15,000 |
> | 3 | 5000 Fees expense | 1000 Cash at bank | 25 |
> | 4 | 1000 Cash at bank | 4100 Dividend income | 120 |
>
> **Trial balance:** 1000 Cash 5,095 Dr (20,000 − 15,000 − 25 + 120), 1100 Securities 15,000 Dr, 5000 Fees 25 Dr, 3000 Capital 20,000 Cr and 4100 Dividends 120 Cr. Debits 20,120 = credits 20,120.
>
> **Position check:** securities ledger +100 shares, custodian shows 100. The cash ledger is also compared with the bank statement.

Both checks pass and the day can close. With automated reconciliation software the comparison is made as the trades and statements arrive, and staff work only on the exceptions.

> [!recall] A1.4
> The purchase is the Dr Securities at cost / Cr Cash entry from the trade unit. The other events use the same logic.

> [!warning]
> A balanced trial balance does not prove that the entries are correct. A fee posted to the wrong account still balances, so the position check and a review of each entry's account code are also needed.`,
    },
    {
      md: String.raw`## Summary

- **Reconciliation** compares internal records with external ones, and ownership with location, and explains every break.
- The usual explanations are open trades, failed trades, pending corporate actions, unbooked or duplicated entries and cash items not yet cleared.
- Reconcile cash by matching items and classifying the four kinds of unmatched item. Reconcile securities by quantity per ISIN.
- The **chart of accounts** gives each account a code and a group (1xxx assets to 5xxx expenses), and every event is mapped to a debit and a credit account.
- A balanced trial balance does not prove that the right accounts were used.`,
    },
  ],

  exercises: [
    {
      id: 'reconcile',
      template: 'table',
      generate(r, f) {
        const names = r.shuffle(['Alpha AG', 'Beta SA', 'Gamma NV', 'Delta plc', 'Omega SE', 'Sigma Fund', 'Kappa Corp', 'Theta SpA']).slice(0, r.int(4, 6));
        const nBreaks = r.int(1, 2);
        const breakIdx = r.sample(names.map((_, i) => i), nBreaks);
        const rows = names.map((n, i) => {
          const q = r.int(2, 60) * 50;
          let internal = q, cust = q;
          if (breakIdx.includes(i)) {
            const kind = r.pick(['timing', 'wrong', 'missing']);
            if (kind === 'timing') cust = q - r.int(1, 4) * 50;
            else if (kind === 'wrong') { internal = q + r.int(1, 9) * 10; }
            else { internal = 0; }
          }
          const diff = internal - cust;
          return [n, f.num(internal, 0), f.num(cust, 0), { answer: diff, dp: 0, tol: { abs: 0.5 } }, { accept: diff === 0 ? ['match', 'matched', 'ok'] : ['break', 'breaks'] }];
        });
        return {
          prompt: 'Reconcile the internal position list with the custodian statement. For each security compute the difference (internal minus custodian) and type **Match** or **Break** in the status column.',
          columns: ['Security', 'Internal quantity', 'Custodian quantity', 'Difference', 'Status (Match or Break)'],
          rows,
          hints: ['Subtract the custodian quantity from the internal quantity.', 'Any non-zero difference is a break, and it still needs an explanation such as an open trade, a failed trade or a missing booking.'],
          solution: rows.map((x) => `${x[0]}: difference ${f.num(x[3].answer, 0)}, ${x[3].answer === 0 ? 'match' : 'break'}`).join('. '),
        };
      },
    },
    {
      id: 'mini-day',
      template: 'journal',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const q = r.int(2, 50) * 10, p = M.px(r.float(10, 120, 0.5));
        const cost = f.round(q * p, 2);
        const fee = M.amt(r.int(2, 40) * 5);
        const div = M.amt(r.int(2, 40) * 10);
        const unit = M.amt(1000);
        const dep = Math.ceil((cost + fee) / unit) * unit + r.int(1, 20) * unit;
        const cashNet = f.round(dep - cost - fee + div, 2);
        const lines = [
          { account: '1000 Cash at bank', dr: cashNet }, { account: '1100 Securities at cost', dr: cost }, { account: '5000 Fees expense', dr: fee },
          { account: '3000 Capital', cr: dep }, { account: '4100 Dividend income', cr: div },
        ];
        return {
          prompt: `Post the whole day to the chart of accounts. Events: (1) the owner deposits **${f.money(dep, CCY, 0)}**, (2) the portfolio buys **${f.num(q, 0)} shares at ${f.money(p, CCY)}** (no commission), (3) a custody fee of **${f.money(fee, CCY, 0)}** is paid in cash, (4) a dividend of **${f.money(div, CCY, 0)}** is received. Show one line per account with its **net** amount.`,
          accounts: r.shuffle(['1000 Cash at bank', '1100 Securities at cost', '2000 Client payable', '3000 Capital', '4000 Interest income', '4100 Dividend income', '4200 Realised gains', '5000 Fees expense']),
          lines,
          tol: { abs: 0.01 },
          hints: ['Post the four events one by one, then net the cash movements into a single Cash line.', `Cash net = ${f.num(dep, 0)} − purchase − fee + dividend.`],
          solution: `Cash: ${f.num(dep, 0)} − ${f.num(cost, 2)} − ${f.num(fee, 0)} + ${f.num(div, 0)} = ${f.num(cashNet, 2)} Dr. Securities ${f.num(cost, 2)} Dr, Fees ${f.num(fee, 0)} Dr, Capital ${f.num(dep, 0)} Cr, Dividend income ${f.num(div, 0)} Cr.`,
        };
      },
    },
    {
      id: 'event-code',
      template: 'match',
      generate(r, f) {
        const defs = [
          ['1000 Cash at bank', ['Cash arrives from the client: account debited', 'Fee paid in cash: account credited']],
          ['1100 Securities at cost', ['Shares bought for the portfolio: account debited', 'Shares sold: account credited at cost']],
          ['2000 Client payable', ['Fee billed but not yet paid: account credited', 'Purchase agreed but not yet paid: account credited']],
          ['3000 Capital', ['Owner pays money into the portfolio: account credited', 'Owner withdraws money: account debited']],
          ['4000 Interest income', ['Interest credited on the cash balance: income account credited', 'Bank pays interest on a deposit: income account credited']],
          ['4100 Dividend income', ['Dividend received on shares held: income account credited', 'Cash dividend paid by a company held: income account credited']],
          ['4200 Realised gains', ['Shares sold above cost: gain account credited', 'Profit on selling shares after costs: account credited']],
          ['5000 Fees expense', ['Custody fee charged: expense account debited', 'Account maintenance fee paid: expense account debited']],
        ];
        return {
          prompt: 'Pair each event with the chart-of-accounts code that should be used.',
          pairs: r.shuffle(defs).map(([code, evs]) => [r.pick(evs), code]),
          hints: ['1xxx assets, 2xxx liabilities, 3xxx equity, 4xxx income, 5xxx expenses.'],
          solution: 'Cash is 1000, securities 1100, amounts owed 2000, owner money 3000, interest 4000, dividends 4100, gains on sale 4200 and fees 5000.',
        };
      },
    },
    {
      id: 'diagnose-break',
      template: 'mcq',
      generate(r, f) {
        const C = {
          open: 'Open trade: traded but not yet at settlement date',
          fail: 'Failed trade: settlement date passed without delivery',
          missing: 'Missing booking: a trade or transfer was never entered internally',
          ca: 'Corporate action: a bonus issue or split whose shares have not yet arrived',
          dup: 'Duplicate booking: the same trade entered twice',
        };
        const q = r.int(2, 30) * 100, s2 = r.int(1, 5) * 100;
        const nm = r.pick(['Alpha AG', 'Beta SA', 'Gamma NV', 'Delta plc']);
        const cases = [
          { k: 'open', t: `${nm}: our books ${f.num(q - s2, 0)}, custodian ${f.num(q, 0)}. A sale of ${f.num(s2, 0)} shares was agreed today and settles the day after tomorrow.`,
            h: [`The books are ${f.num(s2, 0)} shares below the custodian, the same quantity as the sale. Check whether that sale has reached its settlement date.`, 'Our books record a sale on trade date, but the custodian moves the shares only when the trade settles. Compare today with the settlement date.'] },
          { k: 'open', t: `${nm}: our books ${f.num(q + s2, 0)}, custodian ${f.num(q, 0)}. A purchase of ${f.num(s2, 0)} shares was traded yesterday and the settlement date is still two days away.`,
            h: [`The books are ${f.num(s2, 0)} shares above the custodian, the same quantity as the purchase. Check whether that purchase has reached its settlement date.`, 'Our books record a purchase on trade date, but the custodian receives the shares only when the trade settles. Compare today with the settlement date.'] },
          { k: 'fail', t: `${nm}: our books ${f.num(q + s2, 0)}, custodian ${f.num(q, 0)}. A purchase of ${f.num(s2, 0)} shares was due to settle yesterday, and the counterparty reports that it does not have the shares available.`,
            h: [`The books are ${f.num(s2, 0)} shares above the custodian, the same quantity as the purchase. Check the settlement date against today.`, 'The settlement date has already passed, so waiting for settlement no longer explains the difference. Use the counterparty report to decide what has happened to the delivery.'] },
          { k: 'missing', t: `${nm}: our books 0, custodian ${f.num(q, 0)}. A free transfer in from another bank arrived last week.`,
            h: [`Our books show 0 and the custodian shows ${f.num(q, 0)}. The custodian already holds the shares, so ask whether our system ever recorded the transfer.`, 'The transfer arrived a week ago and no trade or settlement date is pending. Decide whether anything is still in transit or whether an entry is absent.'] },
          { k: 'ca', t: `${nm}: our books ${f.num(q * 2, 0)}, custodian ${f.num(q, 0)}. Our books already include a 1-for-1 bonus issue, and the custodian has not yet received the bonus shares.`,
            h: [`Our books are ${f.num(q * 2, 0)} and the custodian shows ${f.num(q, 0)}, so the books are double. Read what the text says our books already include.`, 'The difference equals the number of bonus shares our books have recorded and the custodian has not. Decide whether this is a booking error or a pending event.'] },
          { k: 'dup', t: `${nm}: our books ${f.num(q * 2, 0)}, custodian ${f.num(q, 0)}. One purchase of ${f.num(q, 0)} shares was agreed, and there are two identical lines in our system.`,
            h: [`Our books are ${f.num(q * 2, 0)} and the custodian shows ${f.num(q, 0)}, so the books are double. Count the purchases that were agreed and the lines in our system.`, 'There is no bonus issue or split in the text. Compare the number of agreed trades with the number of entries for them.'] },
          { k: 'missing', t: `${nm}: our books ${f.num(q, 0)}, custodian ${f.num(q + s2, 0)}. A purchase of ${f.num(s2, 0)} shares settled last week and was never booked.`,
            h: [`The custodian is ${f.num(s2, 0)} shares above our books, the same quantity as the purchase. Check the settlement date against today.`, 'The purchase settled last week, so it is no longer pending. Check the text for whether our system holds an entry for it.'] },
        ];
        const c = r.pick(cases);
        const keys = [c.k].concat(r.sample(Object.keys(C).filter((k) => k !== c.k), 3));
        return {
          prompt: `What is the most likely cause of this break?\n\n${c.t}`,
          choices: keys.map((k) => C[k]),
          answer: 0,
          fixedOrder: false,
          hints: c.h,
          solution: `**${C[c.k]}.**`,
        };
      },
    },
    {
      id: 'spot-ledger',
      template: 'spot',
      generate(r, f) {
        const M = r.market();
        const dep = M.amt(r.int(5, 50) * 1000), cost = M.amt(r.int(2, 40) * 500), fee = M.amt(r.int(2, 30) * 5), div = M.amt(r.int(2, 40) * 10), gain = M.amt(r.int(2, 30) * 50);
        const items = [
          { ok: ['1000 Cash at bank', '3000 Capital', dep], ev: 'Client deposit', wrong: ['1000 Cash at bank', '4000 Interest income'], why: 'A deposit by the owner is capital, not interest income.' },
          { ok: ['1100 Securities at cost', '1000 Cash at bank', cost], ev: 'Purchase of shares', wrong: ['5000 Fees expense', '1000 Cash at bank'], why: 'Shares bought are an asset, debited to Securities at cost (1100), not expensed to Fees expense (5000).' },
          { ok: ['5000 Fees expense', '1000 Cash at bank', fee], ev: 'Custody fee paid', wrong: ['3000 Capital', '1000 Cash at bank'], why: 'A custody fee is an expense (5000), not a reduction of capital.' },
          { ok: ['1000 Cash at bank', '4100 Dividend income', div], ev: 'Dividend received', wrong: ['1000 Cash at bank', '4000 Interest income'], why: 'A dividend belongs in Dividend income (4100), not Interest income (4000).' },
          { ok: ['1000 Cash at bank', '4200 Realised gains', gain], ev: 'Gain on a sale (gain part only)', wrong: ['1000 Cash at bank', '5000 Fees expense'], why: 'A gain on a sale is credited to Realised gains (4200), not to an expense account.' },
        ];
        const order = r.shuffle(items).slice(0, 5);
        const bad = r.int(0, order.length - 1);
        const doc = order.map((it, i) => {
          const dr = i === bad ? it.wrong[0] : it.ok[0], cr = i === bad ? it.wrong[1] : it.ok[1];
          return { text: `JE ${100 + i} (${it.ev}): Dr ${dr} ${f.num(it.ok[2], 0)} / Cr ${cr} ${f.num(it.ok[2], 0)}`, error: i === bad, why: i === bad ? it.why : undefined };
        });
        return {
          prompt: 'This ledger extract balances line by line. Flag the entry that uses the wrong account.',
          title: 'Ledger extract',
          doc,
          count: 1,
          hints: ['Every line balances, so check the account used for each event against the chart.'],
        };
      },
    },
  ],
});
