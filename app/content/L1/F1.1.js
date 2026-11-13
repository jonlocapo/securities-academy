/* F1.1 Simple interest and the time value of money. GOLDEN UNIT: the reference pattern for all content authors. */
SA.unit({
  id: 'F1.1',
  lesson: [
    {
      md: String.raw`## Interest and the time value of money

A sum of money available today is worth more than the same sum available later. Money held today can be invested and earn a return until the later date. It can also be spent now, and it carries no risk that a promised future payment fails. A lender therefore charges for the use of money over time. That charge is **interest**.

Banks quote the price of short-term deposits and loans as an annual rate together with a day-count convention, for example "3.20% Act/360". This unit shows how to turn such a quote into an amount in euros.`,
    },
    {
      md: String.raw`## Simple interest

A deposit or loan is described by three quantities:

| Term | Symbol | Example |
|---|---|---|
| **Principal**, the amount lent | $P$ | EUR 500,000 |
| **Rate**, quoted per year | $r$ | 3.20% = 0.032 |
| **Term**, in years | $t$ | 90 days = 90/360 years |

Under **simple interest**, interest accrues only on the original principal:

$$I = P \times r \times t$$

At maturity the lender receives principal plus interest, $P + I = P(1 + r\,t)$.

> [!recall] Q1.1
> The rate enters the formula as a decimal: 3.20% is 0.032.`,
      check: {
        template: 'mcq',
        prompt: 'A deposit pays 2.5% per year. What value of $r$ goes into $I = P \\times r \\times t$?',
        choices: ['0.025', '2.5', '0.25', '25'],
        answer: 0,
        solution: '2.5% means 2.5 per 100, which is 0.025.',
      },
    },
    {
      md: String.raw`## Day-count conventions

Rates are quoted per year, while deposits run for a number of days. The **day count** $D$ as the number of days in the term, counted from and including the value date up to but excluding the maturity date. The **annual basis** $B$ is the number of days assumed in a year. The **day count fraction** is the ratio $D/B$, and it is the term $t$ in the interest formula.

The two bases used in short-term money markets are:

- **Act/360**: actual days divided by 360. Used in the euro money market (EURIBOR, €STR) and the US dollar money market (SOFR).
- **Act/365 (Fixed)**: actual days divided by 365. Used in the sterling money market (SONIA).

A money-market rate follows the convention of the wholesale market in the currency of the loan, and the convention is part of the quote. At the same nominal rate, Act/360 pays slightly more than Act/365, because each day counts as 1/360 of a year instead of 1/365.

Bonds follow different conventions. Actual/Actual (ICMA) is the customary basis for fixed-rate bonds in currencies other than the US dollar. It divides the days in the accrual period by the days in the coupon period and the number of coupons per year. Bond conventions are covered in P3.

> [!eu]
> The ECB publishes €STR for each TARGET business day. Like EURIBOR, it uses Act/360.`,
    },
    {
      md: String.raw`## Worked example

> [!example]
> EUR 500,000 deposited from 2 March 2026 to 31 May 2026 at 3.20%, Act/360.
> Days: from and including 2 March to but excluding 31 May is 90 days.
> $t = 90/360 = 0.25$
> $I = 500{,}000 \times 0.032 \times 0.25$ = **EUR 4,000.00**
> Amount repaid at maturity: **EUR 504,000.00**.
>
> The same deposit on Act/365:
> $I = 500{,}000 \times 0.032 \times 90/365$ = **EUR 3,945.21**, which is EUR 54.79 less.
> On EUR 50 million the difference would be EUR 5,479.

To limit rounding error, multiply the numerator terms first and divide once at the end: $500{,}000 \times 0.032 \times 90 \div 360$. Round only the final result to the cent.`,
    },
    {
      md: String.raw`## Comparing amounts at different dates

Two amounts paid on different dates can only be compared after moving them to the same date. If money can be invested at rate $r$ for one year, EUR 1,000 today grows to $1{,}000 \times (1 + r)$ after a year.

Choice between EUR 1,000 today and EUR 1,040 in one year:

- At $r = 3\%$, EUR 1,000 grows to EUR 1,030, which is less than 1,040, so the later payment is worth more.
- At $r = 5\%$, it grows to EUR 1,050, so the payment today is worth more.

Bond pricing, fund returns and loan pricing later in the course use the same comparison.

Simple interest is used for money-market deals of up to about one year. For longer periods interest is normally added to the principal and earns interest itself, which is **compound interest**. For EUR 1,000 invested at a nominal 10% for one year: annual compounding gives EUR 1,100.00, quarterly compounding EUR 1,103.81 and daily compounding EUR 1,105.16. The more often interest is added, the higher the result for the same nominal rate. F1.2 covers this.`,
    },
    {
      md: String.raw`## Summary

- Interest is the charge for the use of money over time, and a sum today is worth more than the same sum later.
- Simple interest is $I = P\,r\,t$, with $r$ as a decimal and $t$ in years.
- The day count fraction is days divided by the annual basis, 360 for Act/360 and 365 for Act/365 Fixed. The days run from and including the start date to but excluding the maturity date.
- The convention is part of the quote and changes the amount of interest.
- Amounts paid on different dates are compared after moving them to the same date.`,
    },
  ],

  exercises: [
    {
      id: 'simple-interest',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const P = M.amt(r.int(1, 500) * 10000);
        const ratePct = r.float(0.5, 6, 0.05);
        const days = r.pick([7, 14, 30, 31, 60, 90, 91, 120, 180, 182, 270, 360]);
        const basis = r.pick([360, 365]);
        const I = f.round(P * ratePct / 100 * days / basis, 2);
        return {
          prompt: `A client places **${f.money(P, CCY, 0)}** on deposit for **${days} days** at **${f.num(ratePct, 2)}%**, **Act/${basis}**. How much interest is earned? (${CCY}, 2 dp)`,
          answer: I, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: [
            `Convert the rate to a decimal: ${f.num(ratePct, 2)}% = ${f.num(ratePct / 100, 4)}.`,
            `The day count fraction is ${days}/${basis}.`,
            `$I = ${f.num(P, 0)} \\times ${f.num(ratePct / 100, 4)} \\times ${days}/${basis}$`,
          ],
          solution: `The rate as a decimal is ${f.num(ratePct / 100, 4)} and the day count fraction is ${days}/${basis}. Then $I = P \\times r \\times t = ${f.num(P, 0)} \\times ${f.num(ratePct / 100, 4)} \\times ${days}/${basis}$ = **${f.money(I, CCY)}**.`,
        };
      },
    },
    {
      id: 'maturity-amount',
      template: 'numeric',
      generate(r, f) {
        const MK = r.market(), CCY = MK.ccy; // M is the maturity amount here
        const P = MK.amt(r.int(2, 400) * 5000);
        const ratePct = r.float(1, 5.5, 0.05);
        const days = r.pick([30, 45, 60, 90, 92, 120, 150, 180, 240, 300]);
        const basis = r.pick([360, 365]);
        const start = f.addDays('2026-01-05', r.int(0, 300));
        const end = f.addDays(start, days);
        const I = f.round(P * ratePct / 100 * days / basis, 2);
        const M = f.round(P + I, 2);
        return {
          prompt: `A company lends ${f.money(P, CCY, 0)} to the bank from ${f.date(start)} (value date) to ${f.date(end)} (maturity date) at ${f.num(ratePct, 2)}% (Act/${basis}). Ignore business-day adjustments. What total amount does the company receive at maturity? (${CCY}, 2 dp)`,
          answer: M, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: [
            `Count the days from and including ${f.date(start)} to but excluding ${f.date(end)}. The basis for $t$ is ${basis}.`,
            `$I = ${f.num(P, 0)} \\times ${f.num(ratePct / 100, 4)} \\times ${days}/${basis}$`,
            `The interest comes to ${f.money(I, CCY)}. The company receives this on top of the ${f.money(P, CCY, 0)} it lent.`,
          ],
          solution: `The term runs ${days} days, so $t = ${days}/${basis}$. Interest is $I = ${f.num(P, 0)} \\times ${f.num(ratePct / 100, 4)} \\times ${days}/${basis} = ${f.num(I, 2)}$. The maturity amount is ${f.money(P, CCY, 0)} + ${f.money(I, CCY)} = **${f.money(M, CCY)}**.`,
        };
      },
    },
    {
      id: 'now-or-later',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const X = M.amt(r.int(5, 100) * 100);
        const ratePct = r.float(2, 6, 0.25);
        const fv = f.round(X * (1 + ratePct / 100), 2);
        const Y = f.round(fv * (r.bool() ? 1 + r.float(0.006, 0.03, 0.001) : 1 - r.float(0.006, 0.03, 0.001)), 0);
        const nowBetter = fv > Y;
        return {
          prompt: `You can receive **${f.money(X, CCY, 0)} today** or **${f.money(Y, CCY, 0)} in one year**. You can invest at **${f.num(ratePct, 2)}%** per year (simple interest). Which do you prefer?`,
          choices: [
            `Take ${f.money(X, CCY, 0)} today`,
            `Wait for ${f.money(Y, CCY, 0)} in one year`,
            'They are worth the same',
            'Cannot be decided without knowing inflation',
          ],
          answer: nowBetter ? 0 : 1,
          fixedOrder: false,
          hints: [
            `Move the ${f.money(X, CCY, 0)} forward one year at ${f.num(ratePct, 2)}%: $${f.num(X, 0)} \\times (1 + ${f.num(ratePct / 100, 4)})$.`,
            `After one year, ${f.money(X, CCY, 0)} invested today is worth ${f.money(fv, CCY)}. Compare this with ${f.money(Y, CCY, 0)}, which is also a one-year-ahead amount.`,
          ],
          solution: `Today's amount grows to ${f.money(X, CCY, 0)} × (1 + ${f.num(ratePct / 100, 4)}) = ${f.money(fv, CCY)} after one year. The alternative is ${f.money(Y, CCY, 0)} at the same date, so ${nowBetter ? 'taking the money today is better' : 'waiting pays more'}.`,
        };
      },
    },
    {
      id: 'tvm-cloze',
      template: 'cloze',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const P = M.amt(r.int(1, 50) * 1000), ratePct = r.float(1, 5, 0.25), months = r.pick([3, 6, 9]);
        const who = r.pick(['A saver', 'A pension fund', 'A small company', 'A private-banking client']);
        return {
          prompt: 'Fill in the blanks with the correct terms.',
          text: `${who} lends ${f.money(P, CCY, 0)} for ${months} months at ${f.num(ratePct, 2)}% per year. The ${f.money(P, CCY, 0)} is the [[0]], ${f.num(ratePct, 2)}% is the [[1]], ${months} months is the [[2]], and the extra amount paid back at the end are the [[3]].`,
          blanks: [{ accept: ['principal'] }, { accept: ['rate', 'interest rate'] }, { accept: ['term', 'tenor', 'maturity'] }, { accept: ['interest'] }],
          bank: r.shuffle(['principal', 'rate', 'term', 'interest', 'coupon', 'dividend']),
          hints: ['The amount lent is not the interest.'],
        };
      },
    },
    {
      id: 'day-count-match', multiCcy: true,
      template: 'match',
      generate(r) {
        const groups = {
          'Act/360': ['EUR deposit priced off EURIBOR', 'Overnight deposit at €STR', 'USD loan priced off SOFR', 'USD commercial paper'],
          'Act/365 (Fixed)': ['GBP deposit priced off SONIA', 'Sterling money-market deposit'],
          'Act/Act (ICMA)': ['German Bund coupon', 'Italian BTP coupon', 'French OAT coupon'],
          '30/360': ['US corporate bond coupon', 'US agency bond coupon'],
        };
        const conventions = r.shuffle(Object.keys(groups));
        return {
          prompt: 'Match each instrument with the day-count convention it normally uses. Bond conventions are previewed here and covered fully in P3.',
          pairs: conventions.map((c) => [r.pick(groups[c]), c]),
          hints: ['Money markets in EUR and USD divide by 360.', 'Euro-area government bonds count actual days in the coupon period.'],
          solution: 'EUR and USD money markets use Act/360. Sterling money markets use Act/365 Fixed. Euro government bonds use Act/Act (ICMA). US corporate and agency bonds use 30/360.',
        };
      },
    },
  ],
});
