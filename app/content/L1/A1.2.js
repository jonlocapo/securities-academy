/* A1.2 Debits, credits and T-accounts */
SA.unit({
  id: 'A1.2',
  lesson: [
    {
      md: String.raw`## Debit and credit

In bookkeeping, **debit (Dr)** and **credit (Cr)** mean left and right. They carry no judgement of good or bad. A bank app, by contrast, shows a credit as money received and a debit as money leaving.

Every account is drawn as a letter T with a left side and a right side. An amount placed on the left is a debit and an amount placed on the right is a credit. Which side increases which kind of account follows from the accounting equation.

Events pass through three steps. Each event is first written in the **journal** as a balanced entry. The lines are then **posted** to the T-accounts of the ledger. At the end of the day the account balances are listed in a **trial balance** to prove that debits equal credits.`,
    },
    {
      md: String.raw`## Rules derived from the equation

Write the accounting equation with the "=" as a dividing line:

$$\underbrace{\text{Assets}}_{\text{left}} = \underbrace{\text{Liabilities} + \text{Equity}}_{\text{right}}$$

- **Assets** sit on the left, so they increase on the left (debit) and decrease on the right (credit).
- **Liabilities and equity** sit on the right, so they increase on the right (credit) and decrease on the left (debit).
- **Income** raises equity, so it behaves like equity and increases on the right (credit).
- **Expenses** reduce equity, so they behave in the opposite way and increase on the left (debit).

| Account family | Increases with | Normal balance |
|---|---|---|
| Asset | Debit | Debit |
| Expense | Debit | Debit |
| Liability | Credit | Credit |
| Equity | Credit | Credit |
| Income | Credit | Credit |

The normal balance is the side on which an account usually ends up.

> [!recall] A1.1
> Debits equal credits for the same reason that the left side of the equation equals the right side. Every event affects two sides by equal amounts.`,
      check: {
        template: 'mcq',
        prompt: 'Which side increases an expense account such as "Fees expense"?',
        choices: ['Debit (left)', 'Credit (right)', 'Either, depending on the amount', 'Neither, because expenses are only recorded at year end'],
        answer: 0,
        solution: 'Expenses reduce equity, so they behave opposite to equity. Equity increases on the right, so expenses increase on the left, the debit side.',
      },
    },
    {
      md: String.raw`## What each account family means

The five families are the elements defined in the IASB Conceptual Framework. The debit and credit rules above follow directly from these definitions.

| Element | Definition (summarised) |
|---|---|
| **Asset** | A present economic resource controlled by the entity as a result of past events. An economic resource is a right that can produce economic benefits |
| **Liability** | A present obligation of the entity to transfer an economic resource, arising from past events |
| **Equity** | The residual interest in the assets after deducting all liabilities |
| **Income** | Increases in assets or decreases in liabilities that increase equity, other than contributions from the holders of equity claims |
| **Expense** | Decreases in assets or increases in liabilities that decrease equity, other than distributions to the holders of equity claims |

Three consequences matter when posting entries.

- Income and expenses are defined through changes in assets and liabilities. Every income or expense line therefore has a counterpart on an asset or liability account, as in Dr Cash at bank / Cr Interest income.
- Owners' deposits and withdrawals are contributions and distributions. They are posted to Capital and never to income or expense.
- Buying an asset for cash swaps one asset for another and does not change equity, so it creates no expense. Dr Securities at cost / Cr Cash at bank leaves total assets unchanged.

Cash received before the service is performed is a liability. If a client pays EUR 600 in January for a year of custody services, the entry is Dr Cash at bank 600 / Cr Deferred income 600. Each month Dr Deferred income 50 / Cr Fee income 50 moves EUR 50 into income as the service is delivered.

> [!recall] A1.1
> The definitions are the same as in A1.1. Equity = assets minus liabilities, so an entry that raises income or lowers an expense raises equity.`,
    },
    {
      md: String.raw`## Journal entries

An event is recorded as a **journal entry**: a date, a list of lines that each name an account and a debit or credit amount, and a short narration saying what happened. Total debits must equal total credits. Debit lines are written first. The chart of accounts used so far:

| Account | Family | Normal side |
|---|---|---|
| Cash at bank | Asset | Dr |
| Client payable | Liability | Cr |
| Capital | Equity | Cr |
| Interest income | Income | Cr |
| Fees expense | Expense | Dr |

Examples from a family portfolio:

| Event | Debit | Credit |
|---|---|---|
| Owners deposit EUR 10,000 | Cash at bank 10,000 | Capital 10,000 |
| Fee EUR 15 charged and paid | Fees expense 15 | Cash at bank 15 |
| Same fee, to be paid next month | Fees expense 15 | Client payable 15 |
| Interest EUR 8 credited | Cash at bank 8 | Interest income 8 |
| Owners withdraw EUR 2,000 | Capital 2,000 | Cash at bank 2,000 |

The first line agrees with the equation: assets up (Dr cash) and equity up (Cr capital). The last line is the reverse: equity down (Dr capital) and assets down (Cr cash).

A full entry carries its narration, for example: *3 Mar, Dr Cash at bank 10,000 / Cr Capital 10,000, being the initial deposit by the owners*. The narration lets a reviewer match the entry to the contract note or statement it came from.`,
    },
    {
      md: String.raw`## T-accounts and running balance

Each journal line is **posted** to its account. A T-account lists the debits on the left and the credits on the right. After the deposit, the paid fee, the interest and the withdrawal above, the cash account looks like this:

| Cash at bank: Dr | Cash at bank: Cr |
|---|---|
| 10,000 (deposit) | 15 (fee) |
| 8 (interest) | 2,000 (withdrawal) |

Total debits are 10,008 and total credits are 2,015, so the **balance is 7,993 Dr**. A debit balance is normal for an asset.

| Capital: Dr | Capital: Cr |
|---|---|
| 2,000 (withdrawal) | 10,000 (deposit) |

The balance is 8,000 Cr, which is normal for equity. The running balance is this net amount, updated after each posting. At the close of the period the balance is carried down to open the next period.

> [!warning]
> The balance of an account is the larger side minus the smaller side, shown on the larger side. An asset account with a credit balance is overdrawn and should be checked.`,
    },
    {
      md: String.raw`## The trial balance

At the end of a day every account is listed with its balance in the debit or the credit column, and each column is added.

| Account | Debit | Credit |
|---|---|---|
| Cash at bank | 7,993 | |
| Fees expense | 15 | |
| Capital | | 8,000 |
| Interest income | | 8 |
| **Total** | **8,008** | **8,008** |

The **trial balance** must show equal totals. If it does not, an entry was one-sided, an amount was mistyped or a column was added wrongly. It does not detect a posting to the wrong account, because balancing is necessary but not sufficient, as in A1.1. The entries themselves must also be reviewed.`,
    },
    {
      md: String.raw`## Worked example

> [!example]
> Events: (1) deposit EUR 10,000, (2) fee EUR 15 billed and unpaid, (3) interest EUR 8 credited, (4) the fee paid.
>
> 1. Dr Cash at bank 10,000 / Cr Capital 10,000
> 2. Dr Fees expense 15 / Cr Client payable 15
> 3. Dr Cash at bank 8 / Cr Interest income 8
> 4. Dr Client payable 15 / Cr Cash at bank 15
>
> Balances: Cash 9,993 Dr, Client payable 0, Fees expense 15 Dr, Capital 10,000 Cr, Interest income 8 Cr.
> Trial balance: debits 9,993 + 15 = **10,008** and credits 10,000 + 8 = **10,008**.

Events 2 and 4 show a liability created and then settled. The fee is an expense when it is billed, and paying it only moves cash against the payable.`,
    },
    {
      md: String.raw`## Summary

- **Debit is left and credit is right.** They are positions and carry no good or bad meaning.
- Assets and expenses increase with debits. Liabilities, equity and income increase with credits.
- A **journal entry** has two or more lines, and total debits equal total credits.
- A **T-account** shows the postings, and its balance is the net of the two sides, on the account's normal side.
- A **trial balance** lists all balances, and debits must equal credits. If they do not, an error exists.`,
    },
  ],

  exercises: [
    {
      id: 'post-event',
      template: 'journal',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const amt = M.amt(r.pick([10, 25, 40, 75, 120, 250, 500, 1200, 2500, 7500, 15000, 40000, 100000]));
        const who = r.pick([r.pick([r.pick(['The Bianchi family', 'The Hughes family', 'The Tan family', 'The Miller family', 'The Weber family', 'The Wong family']), 'The Hughes family', 'The Tan family', 'The Miller family', 'The Weber family', 'The Wong family']), 'A private investor', 'A client']);
        const kinds = [
          { t: `${who} deposits ${f.money(amt, CCY, 0)} into the portfolio account`, lines: [{ account: 'Cash at bank', dr: amt }, { account: 'Capital', cr: amt }], h: [`Cash at bank rises by ${f.money(amt, CCY, 0)}. Decide which family cash belongs to and which side increases it, then find what the owner's money is recorded as.`, `The money paid in by an owner is the owner's stake in the portfolio. Cash at bank is the debit line, and the other line balances it on the opposite side.`] },
          { t: `${who} withdraws ${f.money(amt, CCY, 0)} from the portfolio account`, lines: [{ account: 'Capital', dr: amt }, { account: 'Cash at bank', cr: amt }], h: [`Cash at bank falls by ${f.money(amt, CCY, 0)}. Decide which side decreases an asset, then find the account that records what the owner has taken out.`, `The owner's stake in the portfolio goes down by the same amount. Cash at bank is the credit line, and the other line balances it on the opposite side.`] },
          { t: `A fee of ${f.money(amt, CCY, 0)} is charged to the portfolio and paid at once from cash`, lines: [{ account: 'Fees expense', dr: amt }, { account: 'Cash at bank', cr: amt }], h: [`The fee of ${f.money(amt, CCY, 0)} is paid at once, so cash leaves. Decide which side decreases Cash at bank, and which account records the cost of the fee.`, 'The cost of the fee is an expense, and an expense increases on the debit side. The credit line is the account that falls.'] },
          { t: `A fee of ${f.money(amt, CCY, 0)} is billed to the portfolio and will be paid next month`, lines: [{ account: 'Fees expense', dr: amt }, { account: 'Client payable', cr: amt }], h: [`The fee of ${f.money(amt, CCY, 0)} is billed but no cash moves yet. Decide which account records the cost, and which account records the fact that the amount is owed.`, 'The cost of the fee is an expense, and an expense increases on the debit side. The amount owed is a liability, and a liability increases on the credit side.'] },
          { t: `Interest of ${f.money(amt, CCY, 0)} is credited to the cash account`, lines: [{ account: 'Cash at bank', dr: amt }, { account: 'Interest income', cr: amt }], h: [`Cash at bank rises by ${f.money(amt, CCY, 0)}. Decide which side increases an asset, then find the account that records what the portfolio has earned.`, 'Interest received is income, and the debit line is the account that rises as an asset.'] },
        ];
        const k = r.pick(kinds);
        return {
          prompt: `Post this event: ${k.t}.`,
          accounts: r.shuffle(['Cash at bank', 'Capital', 'Fees expense', 'Client payable', 'Interest income', 'Dividend income', 'Securities at cost']),
          lines: k.lines,
          hints: k.h,
          solution: k.lines.map((l) => (l.dr ? `Dr ${l.account} ${f.num(l.dr, 0)}` : `Cr ${l.account} ${f.num(l.cr, 0)}`)).join(' / '),
        };
      },
    },
    {
      id: 'increase-side',
      template: 'mcq',
      generate(r) {
        const accts = [
          ['Cash at bank', 'asset', 0], ['Securities at cost', 'asset', 0], ['Fees expense', 'expense', 0], ['Custody cost', 'expense', 0],
          ['Client payable', 'liability', 1], ['Loan payable', 'liability', 1], ['Capital', 'equity', 1], ['Interest income', 'income', 1], ['Dividend income', 'income', 1], ['Realised gains', 'income', 1],
        ];
        const a = r.pick(accts);
        const inc = r.bool();
        const ans = inc ? a[2] : 1 - a[2];
        return {
          prompt: `Which side ${inc ? 'increases' : 'decreases'} the account **${a[0]}** (${a[1]})?`,
          choices: ['Debit (left)', 'Credit (right)', 'Either, depending on the amount', 'Neither: balances change only at year end'],
          answer: ans,
          fixedOrder: true,
          hints: [`${a[0]} is ${/^[aeiou]/.test(a[1]) ? 'an' : 'a'} ${a[1]} account. Recall which families are debit-normal and which are credit-normal.`, `Assets and expenses increase on the same side. Liabilities, equity and income increase on the other. The question asks about ${inc ? 'an increase' : 'a decrease'}, so check whether you need the normal side or the opposite side.`],
          solution: `A${/^[aeiou]/.test(a[1]) ? 'n' : ''} ${a[1]} account increases with a ${a[2] === 0 ? 'debit' : 'credit'} and decreases with a ${a[2] === 0 ? 'credit' : 'debit'}.`,
        };
      },
    },
    {
      id: 'post-t-accounts',
      template: 'table',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const D = M.amt(r.int(5, 40) * 1000), F1 = M.amt(r.int(2, 9) * 10), F2 = M.amt(r.int(2, 9) * 10), W = M.amt(r.int(1, 4) * 500);
        const pool = [
          { t: `Fee of ${f.money(F1, CCY, 0)} billed, unpaid`, dr: 'Fees expense', cr: 'Client payable', a: F1 },
          { t: `Billed fee of ${f.money(F1, CCY, 0)} paid`, dr: 'Client payable', cr: 'Cash at bank', a: F1, after: 0 },
          { t: `Fee of ${f.money(F2, CCY, 0)} charged and paid at once`, dr: 'Fees expense', cr: 'Cash at bank', a: F2 },
          { t: `Owners withdraw ${f.money(W, CCY, 0)}`, dr: 'Capital', cr: 'Cash at bank', a: W },
        ];
        const keep = r.shuffle(pool.filter((e, i) => i !== 1)).slice(0, r.int(2, 3));
        const events = [{ t: `Owners deposit ${f.money(D, CCY, 0)}`, dr: 'Cash at bank', cr: 'Capital', a: D }].concat(keep);
        // optional payment of the billed fee after it was billed
        if (keep.includes(pool[0]) && r.bool()) events.push(pool[1]);
        const acc = ['Cash at bank', 'Capital', 'Fees expense', 'Client payable'];
        const dr = {}, cr = {};
        acc.forEach((a) => { dr[a] = 0; cr[a] = 0; });
        events.forEach((e) => { dr[e.dr] += e.a; cr[e.cr] += e.a; });
        const normalDr = { 'Cash at bank': true, 'Fees expense': true, Capital: false, 'Client payable': false };
        const rows = acc.map((a) => {
          const bal = normalDr[a] ? dr[a] - cr[a] : cr[a] - dr[a];
          return [a, { answer: dr[a], dp: 0, tol: { abs: 0.5 } }, { answer: cr[a], dp: 0, tol: { abs: 0.5 } }, { answer: bal, dp: 0, tol: { abs: 0.5 } }];
        });
        const list = events.map((e, i) => `${i + 1}. ${e.t}: Dr ${e.dr} / Cr ${e.cr} ${f.num(e.a, 0)}`).join('\n');
        return {
          prompt: `Post these entries to T-accounts, then fill in total debits, total credits and the balance on each account's normal side (assets and expenses: debit minus credit; liabilities and equity: credit minus debit). Amounts in ${CCY}.\n\n${list}`,
          columns: ['Account', 'Total debits', 'Total credits', 'Balance (normal side)'],
          rows,
          hints: [`Start with event 1: ${f.money(D, CCY, 0)} goes on the debit side of Cash at bank and the credit side of Capital. Then take the other events in order.`,
            `Cash at bank is on the debit side in event ${events.map((e, i) => (e.dr === 'Cash at bank' ? i + 1 : 0)).filter(Boolean).join(', ')} and on the credit side in event ${events.map((e, i) => (e.cr === 'Cash at bank' ? i + 1 : 0)).filter(Boolean).join(', ') || 'none'}. Add each side separately, then take the difference for the balance.`],
          solution: rows.map((x) => `${x[0]}: Dr ${f.num(x[1].answer, 0)}, Cr ${f.num(x[2].answer, 0)}, balance ${f.num(x[3].answer, 0)}`).join('. '),
        };
      },
    },
    {
      id: 'closing-balance',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const cashAcct = r.bool();
        const open = M.amt(r.int(5, 60) * 1000);
        const a = M.amt(r.int(1, 20) * 500), b = M.amt(r.int(1, 15) * 300), c = M.amt(r.int(1, 12) * 250);
        const acct = cashAcct ? 'Cash at bank' : 'Client payable';
        // cash (asset): debits increase; payable (liability): credits increase
        const incr = [a, c], decr = [b];
        const close = open + incr.reduce((x, y) => x + y, 0) - decr.reduce((x, y) => x + y, 0);
        const sideInc = cashAcct ? 'debit' : 'credit', sideDec = cashAcct ? 'credit' : 'debit';
        return {
          prompt: `The account **${acct}** opens with a ${cashAcct ? 'debit' : 'credit'} balance of ${f.money(open, CCY, 0)}. During the day: debits/credits posted are ${cashAcct ? `Dr ${f.num(a, 0)}, Cr ${f.num(b, 0)}, Dr ${f.num(c, 0)}` : `Cr ${f.num(a, 0)}, Dr ${f.num(b, 0)}, Cr ${f.num(c, 0)}`}. What is the closing balance, on the ${cashAcct ? 'debit' : 'credit'} side? (${CCY})`,
          answer: close, dp: 0, tol: { abs: 0.5 }, unit: CCY,
          hints: [`${acct} is ${cashAcct ? 'an asset' : 'a liability'}: ${sideInc}s increase it and ${sideDec}s decrease it.`],
          solution: `${f.num(open, 0)} + ${f.num(a, 0)} − ${f.num(b, 0)} + ${f.num(c, 0)} = **${f.money(close, CCY, 0)}** (${cashAcct ? 'Dr' : 'Cr'}).`,
        };
      },
    },
    {
      id: 'spot-bad-entry',
      template: 'spot',
      generate(r, f) {
        const mk = (kind, a) => {
          switch (kind) {
            case 'dep': return { ok: `Dr Cash at bank ${f.num(a, 0)} / Cr Capital ${f.num(a, 0)}`, ev: `Owner deposit` };
            case 'wd': return { ok: `Dr Capital ${f.num(a, 0)} / Cr Cash at bank ${f.num(a, 0)}`, ev: `Owner withdrawal` };
            case 'fee': return { ok: `Dr Fees expense ${f.num(a, 0)} / Cr Cash at bank ${f.num(a, 0)}`, ev: `Fee paid` };
            case 'bill': return { ok: `Dr Fees expense ${f.num(a, 0)} / Cr Client payable ${f.num(a, 0)}`, ev: `Fee billed, unpaid` };
            default: return { ok: `Dr Cash at bank ${f.num(a, 0)} / Cr Interest income ${f.num(a, 0)}`, ev: `Interest credited` };
          }
        };
        const kinds = r.shuffle(['dep', 'wd', 'fee', 'bill', 'int']);
        const amts = kinds.map((k) => (k === 'dep' ? r.int(5, 40) * 1000 : k === 'wd' ? r.int(1, 8) * 500 : r.int(2, 30) * 10));
        const entries = kinds.map((k, i) => ({ k, a: amts[i], e: mk(k, amts[i]) }));
        const bad = r.int(0, entries.length - 1);
        const kind = r.pick(['swap', 'mismatch', 'wrong']);
        const doc = entries.map((x, i) => {
          let text = `JE ${i + 1} (${x.e.ev}): ${x.e.ok}`;
          let why;
          if (i === bad) {
            if (kind === 'swap') {
              const m = x.e.ok.match(/^Dr (.+?) ([\d,]+) \/ Cr (.+?) ([\d,]+)$/);
              text = `JE ${i + 1} (${x.e.ev}): Dr ${m[3]} ${m[4]} / Cr ${m[1]} ${m[2]}`;
              why = 'The sides are swapped. The debit and credit accounts are reversed, which would record the opposite of what happened.';
            } else if (kind === 'mismatch') {
              const m = x.e.ok.match(/^(Dr .+?) ([\d,]+) \/ (Cr .+?) ([\d,]+)$/);
              const wrongAmt = f.num(x.a + 10 * r.int(1, 9), 0);
              text = `JE ${i + 1} (${x.e.ev}): ${m[1]} ${m[2]} / ${m[3]} ${wrongAmt}`;
              why = 'Debits and credits differ, so the entry does not balance.';
            } else {
              const swapAcct = x.k === 'int' ? ['Interest income', 'Fees expense'] : x.k === 'dep' ? ['Capital', 'Interest income'] : x.k === 'wd' ? ['Capital', 'Fees expense'] : x.k === 'fee' ? ['Fees expense', 'Capital'] : ['Fees expense', 'Capital'];
              text = `JE ${i + 1} (${x.e.ev}): ${x.e.ok.replace(swapAcct[0], swapAcct[1])}`;
              why = `The entry balances, but the wrong account is used: ${swapAcct[1]} is the wrong account for this event. It should be ${swapAcct[0]}.`;
            }
          }
          return { text, error: i === bad, why };
        });
        return {
          prompt: 'Review these journal entries. Flag the entry that is wrong.',
          title: 'Journal extract',
          doc,
          count: 1,
          hints: ['Check three things in each line: do debits equal credits, are the sides right for the account types, and is it the right account?'],
        };
      },
    },
    {
      id: 'trial-balance',
      template: 'table',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const cash = M.amt(r.int(20, 120) * 1000), sec = M.amt(r.int(10, 90) * 1000), fees = M.amt(r.int(2, 30) * 10);
        const pay = M.amt(r.int(1, 9) * 100), int = M.amt(r.int(2, 20) * 10), div = M.amt(r.int(3, 30) * 10);
        const dr = cash + sec + fees;
        const capital = dr - pay - int - div;
        const accts = [
          ['Cash at bank', 'Dr', cash], ['Securities at cost', 'Dr', sec], ['Fees expense', 'Dr', fees],
          ['Client payable', 'Cr', pay], ['Capital', 'Cr', capital], ['Interest income', 'Cr', int], ['Dividend income', 'Cr', div],
        ];
        const hidden = r.int(0, accts.length - 1);
        const rows = accts.map((a, i) => {
          const cell = i === hidden ? { answer: a[2], dp: 0, tol: { abs: 0.5 } } : f.num(a[2], 0);
          return a[1] === 'Dr' ? [a[0], cell, '–'] : [a[0], '–', cell];
        });
        rows.push(['Total', f.num(dr, 0), f.num(dr, 0)]);
        return {
          prompt: `This trial balance totals ${f.money(dr, CCY, 0)} on each side, but one balance is missing. Fill it in. (${CCY})`,
          columns: ['Account', 'Debit', 'Credit'],
          rows,
          hints: [`Both columns total ${f.money(dr, CCY, 0)}. The missing figure is the balance of ${accts[hidden][0]}, a ${accts[hidden][1] === 'Dr' ? 'debit' : 'credit'} balance, so look only at the ${accts[hidden][1] === 'Dr' ? 'Debit' : 'Credit'} column.`,
            `The other balances in the ${accts[hidden][1] === 'Dr' ? 'Debit' : 'Credit'} column add up to ${f.num(accts.filter((x, i) => i !== hidden && x[1] === accts[hidden][1]).reduce((t, x) => t + x[2], 0), 0)}. Take that away from the column total of ${f.num(dr, 0)}.`],
          solution: `The missing balance of ${accts[hidden][0]} is **${f.money(accts[hidden][2], CCY, 0)}**, because debits and credits must both total ${f.num(dr, 0)}.`,
        };
      },
    },
  ],
});
