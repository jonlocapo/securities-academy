/* A1.1 Why books balance: the accounting equation */
SA.unit({
  id: 'A1.1',
  lesson: [
    {
      md: String.raw`## Why accounts are kept

Several parties need to know what a person or an organisation is worth. Owners want to see profits and what can be distributed. Creditors want evidence that debts can be repaid. Tax authorities and regulators check tax and compliance. Managers need the figures to make decisions. The source of this information is a set of accounting records, and in securities operations these records also show what is held, where it is held and what is owed.

Two ground rules apply from the start:

- **Entity.** The books record one portfolio or business. The private affairs of the owner are kept out of them.
- **Money measurement.** Only events that can be measured in money are recorded. A wage payment is recorded, while the quality of a manager's judgement is not.

This unit explains the equation behind every set of books and why recording each event twice gives a built-in check. It starts with the books of an investor's portfolio. Later units show the bank's side.`,
    },
    {
      md: String.raw`## Assets, liabilities and equity

A family's portfolio on a given day consists of:

- EUR 20,000 in cash at the bank
- shares worth EUR 80,000, which is what was paid for them
- EUR 5,000 owed for a purchase not yet paid

The IASB's Conceptual Framework, which underlies IFRS, defines the three terms. An **asset** is a present economic resource controlled by the entity as a result of past events. An economic resource is a right that has the potential to produce economic benefits. Three features are needed: a right with that potential, control and a past event. The asset need not be physical, as a patent shows, and need not be legally owned, since control is what counts. The portfolio above has assets of EUR 100,000.

A **liability** is a present obligation of the entity to transfer an economic resource as a result of past events. The obligation can be a legal debt or a customary one, such as repairing goods after the warranty has ended. An intention to buy something later is not a liability. An obligation exists once the goods have been delivered or an irrevocable agreement has been made. The portfolio above has liabilities of EUR 5,000.

What remains once the liabilities are deducted belongs to the owners. It is called **equity**, defined as the residual interest in the assets after deducting all liabilities. It is also named capital or net assets:

$$\text{Assets} = \text{Liabilities} + \text{Equity}$$

With numbers: $100{,}000 = 5{,}000 + 95{,}000$. This is the **accounting equation**. It holds at every moment because equity is defined as assets minus liabilities.

> [!recall] P1.4
> A fund's NAV is the same quantity. Rearranged, the accounting equation gives $\text{Equity} = \text{Assets} - \text{Liabilities}$, and net asset value is the equity of the fund.`,
      check: {
        template: 'numeric',
        prompt: 'A portfolio holds assets of EUR 250,000 and owes EUR 40,000. What is its equity? (EUR)',
        answer: 210000, dp: 0, tol: { abs: 0.5 }, unit: 'EUR',
        solution: 'Equity = Assets - Liabilities = 250,000 - 40,000 = EUR 210,000.',
      },
    },
    {
      md: String.raw`## Five types of account

Every record in the books belongs to one of five families.

| Family | Meaning | Examples in a client's books |
|---|---|---|
| **Asset** | What the portfolio owns | Cash at bank, securities |
| **Liability** | What it owes | A purchase not yet paid, a fee invoice not yet paid |
| **Equity** | The owners’ stake | Capital paid in by the owner, profits kept in the portfolio |
| **Income** | Increases equity from activity | Dividends, interest, gains on sales |
| **Expense** | Decreases equity from activity | Fees, custody cost, brokerage cost |

**Income** is an increase in assets, or a decrease in liabilities, that increases equity, other than contributions from the owners. It covers both revenue from ordinary activities and gains such as a profit on selling shares. An **expense** is a decrease in assets, or an increase in liabilities, that decreases equity, other than distributions to the owners. Three consequences follow. Buying shares is not an expense, because one asset replaces another and equity does not change. An owner's withdrawal is a distribution and not an expense. A fee received in advance for a service not yet performed is not income, because the cash is matched by an obligation to perform the service.

Income and expense are parts of equity. Over a period, profit equals income minus expenses, and profit increases equity. Equity also rises when the owner pays in more capital and falls when the owner takes money out or the portfolio makes a loss. Profit that is not paid out stays in the portfolio as **retained earnings**.

Each family is kept in many named **accounts**. "Cash at bank" is an asset account and "Fees expense" is an expense account. The full list of accounts is the **chart of accounts**. The course uses a small chart and adds accounts as needed. Three are used here:

| Account | Family |
|---|---|
| **Cash at bank** | Asset |
| **Capital** | Equity |
| **Client payable** | Liability, money the portfolio owes (for example a trade price not yet paid) |

> [!warning]
> "Income" in accounting means money earned. A cash deposit into the account is the owner paying in capital and is not income.`,
      check: {
        template: 'mcq',
        prompt: 'In a client\'s portfolio books, which family does "dividends received" belong to?',
        choices: ['Income', 'Asset', 'Liability', 'Equity'],
        answer: 0,
        solution: 'Dividends are earned by owning shares, so they are income. The cash that arrives is an asset, but the dividend itself is income.',
      },
    },
    {
      md: String.raw`## Double entry

A family puts EUR 10,000 into the account. Cash at bank rises by EUR 10,000 (asset) and Capital rises by EUR 10,000 (equity). The equation still holds:

| | Assets | = | Liabilities | + | Equity |
|---|---|---|---|---|---|
| Before | 0 | = | 0 | + | 0 |
| Deposit | +10,000 | | 0 | | +10,000 |
| After | 10,000 | = | 0 | + | 10,000 |

An event cannot change the books in only one place, since the equation would then break. This is the rule of **double entry**: every event is recorded twice, with equal and opposite effects on the equation. Further examples:

- **Buy shares for cash:** one asset up (shares) and another down (cash). Total assets are unchanged.
- **Buy shares on credit:** assets up (shares) and liabilities up (owed to the broker).
- **Pay an invoice:** assets down (cash) and liabilities down (payable).
- **Receive a dividend:** assets up (cash) and equity up (income).
- **Pay a custody fee:** assets down (cash) and equity down (expense).

> [!tip]
> A bank holding client money in a central bank account shows an asset (cash at the central bank) and a liability (the client's deposit). The bank-side view is used in later units.`,
    },
    {
      md: String.raw`## Statements and the balancing check

Two reports come out of the books:

- the **balance sheet** is a snapshot of assets, liabilities and equity at one date. It says nothing about the day before or the day after
- the **income statement** shows income minus expenses over a period. The result is the profit or loss that moved equity

In IFRS the two statements are called the statement of financial position and the statement of profit or loss. An item enters them (is **recognised**) only if it meets the definition of an element and can be measured reliably, and if the inflow or outflow of benefits is probable. Income and expenses are recognised when the change in assets or liabilities arises, and not when cash moves.

Elements are measured on one of several bases. **Historical cost** is what was paid at acquisition and is the most common basis in practice. **Fair value** is the price that would be received to sell an asset in an orderly transaction between market participants at the measurement date, and IFRS requires it for many financial instruments. The worked example below uses cost to keep the arithmetic short. A portfolio that holds its shares at fair value records price changes as income or expense, so its equity moves with the market. This is the reason a fund's net asset value changes daily. The statements also assume that the entity is a going concern, which means it will continue to operate for the foreseeable future.

Each event keeps the equation balanced, so the left side must equal the right side. If only one half of an event is recorded, or one amount is wrong, the totals differ and an error exists. The size of the difference helps to locate it. The balancing check has one limit. EUR 100 posted to the wrong account still balances, so balancing is necessary but not sufficient.

The list of all entries, sorted by account, is the **ledger**.`,
    },
    {
      md: String.raw`## Worked example

> [!example]
> **Event 1:** The owners deposit EUR 10,000. Assets +10,000 (cash), equity +10,000 (capital).
> **Event 2:** The portfolio buys shares for EUR 6,000 cash. Cash -6,000, shares +6,000. Total assets are unchanged.
> **Event 3:** A custody fee of EUR 50 is charged and paid. Cash -50, equity -50 (expense).
> **Event 4:** A dividend of EUR 120 is received. Cash +120, equity +120 (income).
>
> **Balance sheet:** cash 4,070 and shares at cost 6,000, so assets = **10,070**. Liabilities are 0. Equity is capital 10,000 plus retained profit 70, so equity = **10,070**. The equation holds: 10,070 = 0 + 10,070.
> **Income statement:** dividend income 120 less fee expense 50 gives a profit of **EUR 70**.

The missing-figure exercises use the same reasoning. If two of the three amounts are known, the third follows.

> [!recall] Q1.2
> Finding the missing amount means solving a simple equation: $A = L + E$, so $E = A - L$ and $L = A - E$.`,
    },
    {
      md: String.raw`## Summary

- **Assets = Liabilities + Equity** holds at every moment, and equity is what is left after debts.
- There are five families: asset, liability, equity, income and expense. Profit (income minus expenses) increases equity.
- **Double entry** means every event is recorded twice, with equal and opposite effects, so the equation stays true.
- The balance sheet (statement of financial position) is a snapshot at a date and the income statement covers a period. Historical cost is the most common measurement basis, and fair value is required for many financial instruments.
- An imbalance signals an error, but a balanced book can still hold wrong entries.`,
    },
  ],

  exercises: [
    {
      id: 'classify-items',
      template: 'bucket',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const pools = [
          [
            () => `Cash at bank of ${f.money(M.amt(r.int(2, 90) * 1000), CCY, 0)}`, () => `Shares held, cost ${f.money(M.amt(r.int(5, 200) * 1000), CCY, 0)}`,
            () => 'Bonds held in the custody account', () => 'Units of an equity fund held', () => `Dividend receivable of ${f.money(M.amt(r.int(1, 20) * 100), CCY, 0)} declared but not yet paid`,
          ],
          [
            () => 'A purchase price owed to the broker', () => 'A bank loan used to buy securities', () => 'An unpaid custody fee invoice',
            () => 'Tax due to the authority, not yet paid', () => `An overdraft of ${f.money(M.amt(r.int(1, 20) * 100), CCY, 0)}`,
          ],
          [
            () => 'Capital paid in by the owner', () => 'Profits retained from earlier years', () => 'Reserves built up from past profits', () => 'Share capital of the investment company',
          ],
          [
            () => `Dividends received of ${f.money(M.amt(r.int(1, 30) * 100), CCY, 0)}`, () => 'Interest earned on cash balances', () => 'Gain realised on selling shares', () => 'Coupon received on a bond held',
          ],
          [
            () => 'Annual custody fee charged by the bank', () => 'Fee for an account statement', () => 'Interest paid on a loan', () => 'Audit fee for the portfolio', () => 'Commission on a fund subscription charged as a cost',
          ],
        ];
        const names = ['Asset', 'Liability', 'Equity', 'Income', 'Expense'];
        const counts = r.shuffle([3, 3, 2, 2, 2]);
        const items = [];
        pools.forEach((pool, b) => r.sample(pool, Math.min(counts[b], pool.length)).forEach((fn) => items.push({ text: fn(), bucket: b })));
        return {
          prompt: 'Classify each item in a client\'s books as asset, liability, equity, income or expense.',
          buckets: names,
          items: r.shuffle(items),
          hints: ['Owned and valuable: asset. Owed: liability. Earned: income. Spent: expense. Owners\' stake: equity.'],
          solution: 'Cash, shares, bonds and fund units are assets. Loans and unpaid invoices are liabilities. Capital and reserves are equity. Dividends, interest and gains are income. Fees and interest paid are expenses.',
        };
      },
    },
    {
      id: 'missing-figure',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const scale = M.amt(r.pick([1000, 5000, 10000, 50000, 100000]));
        const L = r.int(1, 20) * scale;
        const E = r.int(2, 30) * scale;
        const A = L + E;
        const miss = r.pick(['A', 'L', 'E']);
        const label = { A: 'Assets', L: 'Liabilities', E: 'Equity' };
        const val = { A, L, E };
        const given = ['A', 'L', 'E'].filter((k) => k !== miss);
        const who = r.pick(['A family portfolio', 'A small investment company', 'A private client\'s account', 'A holding company']);
        return {
          prompt: `${who} reports ${given.map((k) => `${label[k].toLowerCase()} of ${f.money(val[k], CCY, 0)}`).join(' and ')}. Using the accounting equation, find the ${label[miss].toLowerCase()}. (${CCY})`,
          answer: val[miss], dp: 0, tol: { abs: 0.5 }, unit: CCY,
          hints: ['Write: Assets = Liabilities + Equity.', miss === 'A' ? 'Add the other two.' : 'Subtract the known item from assets (or rearrange).'],
          solution: `${label.A} = ${label.L} + ${label.E}: ${f.num(A, 0)} = ${f.num(L, 0)} + ${f.num(E, 0)}. The missing ${label[miss].toLowerCase()} is **${f.money(val[miss], CCY, 0)}**.`,
        };
      },
    },
    {
      id: 'event-effects',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const E = {
          AE: 'Assets up and equity up',
          AA: 'One asset up and another asset down (total assets unchanged)',
          LE: 'Liabilities up and equity down',
          AdLd: 'Assets down and liabilities down',
          AdEd: 'Assets down and equity down',
          AL: 'Assets up and liabilities up',
        };
        const amt = (lo, hi, st) => f.money(M.amt(r.int(lo, hi) * st), CCY, 0);
        const mk = (lo, hi, st, text, k, h1, h2) => { const a = amt(lo, hi, st); return { t: text(a), k, h: [h1(a), h2(a)] }; };
        const events = [
          mk(2, 50, 1000, (a) => `The owner pays ${a} cash into the portfolio account`, 'AE',
            (a) => `Cash rises by ${a}. Ask where the other side of the entry sits: does the portfolio owe the ${a} back, or is it the owner's stake?`,
            () => 'Money paid in by the owner is capital, which belongs to the equity family. No debt is created.'),
          mk(1, 30, 100, (a) => `The portfolio receives a dividend of ${a} in cash`, 'AE',
            (a) => `Cash rises by ${a}. Ask what the dividend itself is: an asset, a debt or something earned?`,
            () => 'A dividend is income. Income is a part of equity, and nothing is owed to anyone.'),
          mk(1, 20, 10, (a) => `Interest of ${a} is credited on the cash balance`, 'AE',
            (a) => `Cash rises by ${a}. Ask what the interest is and whether it has to be paid back.`,
            () => 'Interest received is income. Income is a part of equity, and no liability arises.'),
          mk(2, 40, 1000, (a) => `The portfolio buys shares for ${a} and pays cash at once`, 'AA',
            (a) => `Shares worth ${a} come in and ${a} of cash goes out. Classify both accounts.`,
            () => 'Both shares and cash are assets, and no debt or income or expense arises. Compare the total of assets before and after.'),
          mk(2, 40, 1000, (a) => `The portfolio sells shares at cost for ${a} and receives cash`, 'AA',
            (a) => `Shares of ${a} go out and ${a} of cash comes in. Classify both accounts.`,
            () => 'The shares are sold at cost, so there is no gain or loss. Both accounts are assets, so compare the total of assets before and after.'),
          mk(2, 30, 10, (a) => `A custody fee of ${a} is billed, to be paid next month`, 'LE',
            (a) => `No cash moves yet. The fee of ${a} is owed, so ask which family a bill not yet paid belongs to.`,
            () => 'The fee is a cost of running the portfolio, which is an expense. Expenses reduce equity, and the unpaid bill is an obligation.'),
          mk(2, 30, 10, (a) => `The portfolio pays a ${a} invoice for audit services, in cash`, 'AdEd',
            (a) => `Cash falls by ${a}. Ask what the audit service is: a purchase of an asset, or a cost of running the portfolio?`,
            () => 'The invoice is paid at once, so nothing is left owing. An expense reduces equity.'),
          mk(1, 30, 500, (a) => `The owner withdraws ${a} in cash`, 'AdEd',
            (a) => `Cash falls by ${a}. Ask whose money it is and which family records the owner's stake.`,
            () => 'A withdrawal by the owner is a distribution, which reduces equity. Nothing is owed afterwards.'),
          mk(2, 30, 500, (a) => `The portfolio pays the ${a} it owed the broker for last week's purchase`, 'AdLd',
            (a) => `Cash falls by ${a}. Ask what happened to the debt to the broker once it was paid.`,
            () => 'The purchase was recorded last week, so no new income or expense arises today. Check what cash and the amount owed each do.'),
          mk(2, 40, 1000, (a) => `The portfolio buys shares for ${a} and agrees to pay the broker later`, 'AL',
            (a) => `Shares worth ${a} come in but no cash goes out. Ask what the agreement to pay later creates.`,
            () => 'Equity is unchanged, because nothing is earned or spent. The shares come in and an amount is owed to the broker.'),
          mk(5, 50, 1000, (a) => `A bank loan of ${a} is drawn and paid into the account`, 'AL',
            (a) => `Cash rises by ${a}. Ask whether the ${a} belongs to the owner or must be repaid to the bank.`,
            () => 'A loan is not earned, so it is not income. The cash is an asset and the repayment obligation is a liability.'),
        ];
        const ev = r.pick(events);
        const others = r.sample(Object.keys(E).filter((k) => k !== ev.k), 3);
        const keys = [ev.k].concat(others);
        return {
          prompt: `${ev.t}. What are its two effects on the accounting equation?`,
          choices: keys.map((k) => E[k]),
          answer: 0,
          fixedOrder: false,
          hints: ev.h,
          solution: `**${E[ev.k]}.**`,
        };
      },
    },
    {
      id: 'terms-match',
      template: 'match',
      generate(r) {
        const defs = {
          Asset: ['A present economic resource controlled by the entity as a result of past events', 'A resource such as cash or shares that the holder controls as a result of a past event'],
          Liability: ['A present obligation to transfer an economic resource as a result of past events', 'An amount owed, such as an unpaid invoice'],
          Equity: ['The residual interest in the assets after all liabilities are deducted', 'The owners’ stake in the portfolio'],
          Income: ['An increase in assets or decrease in liabilities that raises equity, other than owners’ contributions', 'Money the portfolio earns, like interest or realised gains'],
          Expense: ['A decrease in assets or increase in liabilities that lowers equity, other than distributions to owners', 'Money spent on running the portfolio, like custody costs'],
          Ledger: ['The complete record of entries, sorted by account', 'The book in which each account\'s entries are kept'],
        };
        return {
          prompt: 'Match each accounting term to its meaning.',
          pairs: r.shuffle(Object.keys(defs)).map((k) => [k, r.pick(defs[k])]),
          hints: ['Income and expense both move equity, in opposite directions.'],
          solution: 'Asset: owned. Liability: owed. Equity: assets minus liabilities. Income: earned. Expense: spent. Ledger: the record by account.',
        };
      },
    },
    {
      id: 'why-twice',
      template: 'cloze',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const amt = f.money(M.amt(r.int(1, 90) * 1000), CCY, 0);
        const who = r.pick([r.pick([r.pick(['The Bianchi family', 'The Hughes family', 'The Tan family', 'The Miller family', 'The Weber family', 'The Wong family']), 'The Hughes family', 'The Tan family', 'The Miller family', 'The Weber family', 'The Wong family']), 'A private investor', 'A small fund', 'A client']);
        return {
          prompt: 'Complete the explanation of double entry.',
          text: `When ${who.toLowerCase()} deposits ${amt}, cash goes up and capital goes up by the same amount. Every event is recorded [[0]] times, with equal and opposite effects, so the accounting [[1]] stays in balance. If the two sides stop agreeing, there is an [[2]] to be found. Capital belongs to the [[3]] of the portfolio.`,
          blanks: [{ accept: ['two', '2', 'twice'] }, { accept: ['equation'] }, { accept: ['error', 'mistake'] }, { accept: ['owners', 'owner'] }],
          bank: r.shuffle(['two', 'equation', 'error', 'owners', 'three', 'bank', 'fee']),
          hints: ['Double entry means two sides.'],
        };
      },
    },
  ],
});
