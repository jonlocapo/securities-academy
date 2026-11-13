/* F1.2 Compounding and future value */
SA.unit({
  id: 'F1.2',
  lesson: [
    {
      md: String.raw`## Compound interest

In F1.1 interest was calculated on the original principal only. In most accounts the interest is added to the balance at the end of each period, and the following period's interest is calculated on the larger balance. Interest earned on previously credited interest is called **compounding**.

A client leaves EUR 20,000 in a savings account for ten years. Simple interest would pay the same amount every year. With compounding, each year's interest is larger than the one before.

Growth by a fixed percentage per period is **exponential growth**, and growth by a fixed amount per period is linear growth. Starting from 100, adding 10 each year gives 110, 120, 130. Adding 10% each year gives 110, 121, 133.1. The gap between the two widens every year.

> [!recall] F1.1
> Simple interest pays on the original principal only: $I = P\,r\,t$. Compounding applies when the interest stays in the account and earns interest itself.`,
    },
    {
      md: String.raw`## Future value

Each year the balance is multiplied by the same growth factor $1 + r$. Starting from $PV$ (present value, the amount today) and a rate $r$ per year:

- after 1 year: $PV \times (1 + r)$
- after 2 years: $PV \times (1 + r) \times (1 + r) = PV \times (1 + r)^2$
- after 3 years: $PV \times (1 + r)^3$
- after $n$ years:

$$FV = PV \times (1 + r)^n$$

$FV$ is the **future value**. The growth factor $(1+r)$ is the one from Q1.1, and repeated multiplication gives the exponential growth of Q1.5.

> [!recall] Q1.5
> A quantity that grows by a fixed percentage each period follows an exponential curve. The exponent $n$ counts the periods and is not multiplied by $r$.`,
      check: {
        template: 'mcq',
        prompt: 'EUR 1,000 grows at 5% per year, compounded annually. Which expression gives the balance after 3 years?',
        choices: ['$1{,}000 \\times 1.05^3$', '$1{,}000 \\times 1.15$', '$1{,}000 \\times 1.05 \\times 3$', '$1{,}000 \\times 0.05^3$'],
        answer: 0,
        solution: 'Each year multiplies the balance by 1.05, three times: $1.05 \\times 1.05 \\times 1.05 = 1.05^3$. The other choices add the interest three times (simple interest), or use 0.05 as the factor.',
      },
    },
    {
      md: String.raw`## Worked example

> [!example]
> EUR 20,000 for 10 years at 3% compounded annually.
> $FV = 20{,}000 \times 1.03^{10}$
> $1.03^{10} = 1.343916\ldots$
> $FV =$ **EUR 26,878.33**
>
> With simple interest: $20{,}000 \times 0.03 \times 10 = \text{EUR } 6{,}000$ of interest, so EUR 26,000.00 at the end.
> The difference of EUR 878.33 is interest on interest.

The first three years are shown below.

| Year | Opening | Interest (3%) | Closing |
|---|---|---|---|
| 1 | 20,000.00 | 600.00 | 20,600.00 |
| 2 | 20,600.00 | 618.00 | 21,218.00 |
| 3 | 21,218.00 | 636.54 | 21,854.54 |

The interest increases each year (600, 618, 636.54, ...) because it is calculated on a growing balance.

> [!tip]
> On a calculator, enter 1.03, apply the power key and enter 10. The exponent applies to the whole growth factor 1.03, so $0.03 \times 10$ must not be calculated first.`,
    },
    {
      md: String.raw`## Compounding frequency

The annual percentage rate quoted on an account is the **nominal** rate $r$. When interest is credited more than once a year, it is credited $m$ times: twice (semi-annual, $m = 2$), four times (quarterly, $m = 4$), monthly ($m = 12$) or daily ($m = 365$). Each period earns the nominal rate divided by $m$, and there are $m \times n$ periods in $n$ years:

$$FV = PV \times \left(1 + \frac{r}{m}\right)^{m\,n}$$

The table shows EUR 1,000 invested for one year at a 10% nominal rate.

| Compounding | $m$ | Value after 1 year (EUR) |
|---|---|---|
| Annual | 1 | 1,100.00 |
| Semi-annual | 2 | 1,102.50 |
| Quarterly | 4 | 1,103.81 |
| Monthly | 12 | 1,104.71 |
| Daily | 365 | 1,105.16 |

> [!example]
> EUR 3,000 at a 3% nominal rate, compounded quarterly, for 10 years.
> Per quarter: $0.03/4 = 0.0075$. Number of quarters: $4 \times 10 = 40$.
> $FV = 3{,}000 \times 1.0075^{40} =$ **EUR 4,045.05**
> Annual compounding gives $3{,}000 \times 1.03^{10} = \text{EUR } 4{,}031.75$. More frequent compounding pays slightly more.

The same formula can be solved for $PV$. To have EUR 40,000 in 18 years at 6% compounded semi-annually, the amount needed today is $40{,}000 / 1.03^{36} =$ **EUR 13,801**.`,
    },
    {
      md: String.raw`## The effective annual rate (EAR)

An account with a 6% nominal rate compounded monthly pays slightly more than 6% over a year. To compare offers with different frequencies, each is converted to the **effective annual rate**, the single yearly rate that gives the same result after one year. It is found by investing EUR 1 for one year and subtracting the EUR 1 from the result:

$$EAR = \left(1 + \frac{r}{m}\right)^{m} - 1$$

> [!example]
> Nominal 3%, monthly: $EAR = (1 + 0.03/12)^{12} - 1 = 1.0025^{12} - 1 = 3.042\%$
>
> Nominal 6% at different frequencies:
>
> | Frequency | $m$ | EAR |
> |---|---|---|
> | Annual | 1 | 6.000% |
> | Semi-annual | 2 | 6.090% |
> | Quarterly | 4 | 6.136% |
> | Monthly | 12 | 6.168% |
> | Daily | 365 | 6.183% |

The gain from compounding more often decreases quickly. Moving from yearly to monthly adds 0.17 percentage points, and moving from monthly to daily adds 0.015.

> [!warning]
> Offers with different compounding frequencies should not be ranked by their nominal rates. Convert them all to EAR first. The same applies to "APR" and "APY" quotes on retail products.`,
      check: {
        template: 'mcq',
        prompt: 'Two accounts both quote a 4% nominal rate. One compounds annually, the other quarterly. Which statement is true?',
        choices: [
          'The quarterly account has the higher effective annual rate',
          'They have the same effective annual rate',
          'The annual account has the higher effective annual rate',
          'It depends on the principal',
        ],
        answer: 0,
        solution: 'Quarterly compounding has interest earning interest within the year: $(1.01)^4 - 1 = 4.060\\%$, against 4.000% for annual. The principal does not matter, since the EAR is a rate.',
      },
    },
    {
      md: String.raw`## Continuous compounding

As $m$ increases without limit (hourly, every second, continuously), the EAR does not grow without bound but approaches a ceiling. The ceiling involves the number $e \approx 2.71828$ from Q1.5. EUR 1 invested for a year at a nominal 100% grows to EUR 2.00 with annual compounding, 2.25 semi-annually, 2.44 quarterly, 2.61 monthly and 2.71 daily, and it approaches 2.71828 as the frequency rises. With continuous compounding the formula is:

$$FV = PV \times e^{r\,t}$$

> [!example]
> EUR 1,000 at a nominal 10%, compounded continuously, for 1 year: $1{,}000 \times e^{0.10} =$ **EUR 1,105.17**.
> Nominal 3% for 1 year: $e^{0.03} - 1 = 3.045\%$.
> For comparison, annual compounding gives 3.000% and monthly compounding 3.042%.

The expression $e^{rt}$ is convenient because growth over two periods is the sum of the exponents ($e^{a}\times e^{b} = e^{a+b}$). Option pricing and risk models later in the course use it. To recover the rate from a growth factor, use the natural logarithm: if EUR 1 grew into $G$, then $r\,t = \ln G$.

> [!recall] Q1.6
> $\ln$ is the inverse of $e^{x}$. From $FV = PV\,e^{rt}$ it follows that $rt = \ln(FV/PV)$.`,
    },
    {
      md: String.raw`## Common errors and a rule of thumb

- The rate and the period must match. If the rate is per year and interest is credited monthly, use $r/12$ per month and $12\,n$ months.
- The growth factor should not be rounded early. $1.0025^{12}$ is 1.03042..., and using 1.03 loses about EUR 8 on EUR 20,000.
- Over long periods the effect of compounding is large. At 3%, money grows by about 34% in ten years and by about 81% in twenty, because the second decade earns interest on a larger balance.
- Rates with different frequencies are converted to EAR before comparison, and amounts at different dates are moved to the same date (F1.1).

The **rule of 72** gives a quick estimate: at $r\%$ per year, money doubles in roughly $72/r$ years. At 3% this gives 24 years and the exact figure is 23.4.`,
    },
    {
      md: String.raw`## Summary

- Compounding means interest earns interest: $FV = PV(1 + r)^n$.
- With $m$ periods a year: $FV = PV(1 + r/m)^{mn}$. The rate per period is $r/m$.
- Offers are compared with the effective annual rate $EAR = (1 + r/m)^m - 1$, not with nominal rates alone.
- Continuous compounding, $FV = PV\,e^{rt}$, is the upper limit as $m$ grows. It differs only slightly from monthly or daily compounding.
- Full precision is kept until the last step, and the rate is matched to the period.`,
    },
  ],

  exercises: [
    {
      id: 'fv-annual',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const PV = M.amt(r.int(1, 250) * 1000);
        const ratePct = r.float(0.5, 10, 0.25);
        const n = r.int(1, 40);
        const FV = f.round(PV * Math.pow(1 + ratePct / 100, n), 2);
        return {
          prompt: `A client deposits **${f.money(PV, CCY, 0)}** at **${f.num(ratePct, 2)}%** per year, compounded annually. The interest is left in the account. What is the balance after **${n} year${n > 1 ? 's' : ''}**? (${CCY}, 2 dp)`,
          answer: FV, dp: 2, tol: { abs: 0.02 }, unit: CCY,
          hints: [
            `The yearly growth factor is $1 + ${f.num(ratePct / 100, 4)} = ${f.num(1 + ratePct / 100, 4)}$.`,
            `Apply it ${n} times: $(${f.num(1 + ratePct / 100, 4)})^{${n}}$. Use the power key, and keep all the digits.`,
            `Multiply by the starting amount: $${f.num(PV, 0)} \\times (${f.num(1 + ratePct / 100, 4)})^{${n}}$.`,
          ],
          solution: `$FV = PV(1 + r)^n = ${f.num(PV, 0)} \\times ${f.num(1 + ratePct / 100, 4)}^{${n}}$ = **${f.money(FV, CCY)}**`,
        };
      },
    },
    {
      id: 'fv-frequency',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const PV = M.amt(r.int(1, 100) * 2500);
        const ratePct = r.float(1, 9, 0.25);
        const m = r.pick([2, 4, 12, 365]);
        const years = r.int(1, 12);
        const names = { 2: 'semi-annually', 4: 'quarterly', 12: 'monthly', 365: 'daily (365 times a year)' };
        const FV = f.round(PV * Math.pow(1 + ratePct / 100 / m, m * years), 2);
        const i = ratePct / 100 / m;
        return {
          prompt: `A bond-fund savings plan pays a **${f.num(ratePct, 2)}% nominal** annual rate, credited **${names[m]}** and reinvested. You invest **${f.money(PV, CCY, 0)}** for **${years} year${years > 1 ? 's' : ''}**. What is the final balance? (${CCY}, 2 dp)`,
          answer: FV, dp: 2, tol: { abs: 0.05 }, unit: CCY,
          hints: [
            `The rate per period is the nominal rate divided by $m = ${m}$: $${f.num(ratePct / 100, 4)}/${m}$.`,
            `The number of periods is $m \\times$ years $= ${m} \\times ${years} = ${m * years}$.`,
            `$FV = ${f.num(PV, 0)} \\times (1 + ${i.toFixed(6)})^{${m * years}}$.`,
          ],
          solution: `Rate per period $= ${f.num(ratePct / 100, 4)}/${m} = ${i.toFixed(6)}$, and periods $= ${m * years}$. Then $FV = ${f.num(PV, 0)} \\times (1 + ${i.toFixed(6)})^{${m * years}}$ = **${f.money(FV, CCY)}**`,
        };
      },
    },
    {
      id: 'nominal-to-ear',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const nom = r.float(1, 12, 0.25);
        const m = r.pick([2, 4, 12]);
        const names = { 2: 'semi-annual', 4: 'quarterly', 12: 'monthly' };
        const ear = f.round(((Math.pow(1 + nom / 100 / m, m)) - 1) * 100, 3);
        return {
          prompt: `A deposit offers a **${f.num(nom, 2)}%** nominal annual rate with **${names[m]}** compounding. What is the effective annual rate? (answer in %, 3 dp)`,
          answer: ear, dp: 3, tol: { abs: 0.001 }, unit: '%',
          hints: [
            `Rate per period: $${f.num(nom / 100, 4)}/${m} = ${(nom / 100 / m).toFixed(6)}$.`,
            `Grow ${CCY} ${f.num(M.amt(1), 0)} for ${m} periods: $(1 + ${(nom / 100 / m).toFixed(6)})^{${m}}$.`,
            'Subtract 1 and multiply by 100 to express it in %.',
          ],
          solution: `$EAR = (1 + r/m)^m - 1 = (1 + ${(nom / 100 / m).toFixed(6)})^{${m}} - 1$ = **${f.num(ear, 3)}%**`,
        };
      },
    },
    {
      id: 'growth-table',
      template: 'table',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const PV = M.amt(r.int(5, 50) * 1000);
        const ratePct = r.pick([2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8]);
        const rate = ratePct / 100;
        const simple = f.round(PV * rate, 2);
        const rows = [];
        let open = PV;
        const steps = [];
        for (let y = 1; y <= 6; y++) {
          const interest = f.round(open * rate, 2);
          const close = f.round(open + interest, 2);
          const ioi = f.round(interest - simple, 2);
          steps.push({ y, open, interest, close, ioi });
          rows.push([
            y,
            f.num(open, 2),
            { answer: interest, dp: 2, tol: { abs: 0.01 } },
            { answer: close, dp: 2, tol: { abs: 0.01 } },
            { answer: ioi, dp: 2, tol: { abs: 0.01 } },
          ]);
          open = close;
        }
        const last = steps[5];
        return {
          prompt: `**${f.money(PV, CCY, 0)}** is invested at **${f.num(ratePct, 1)}%** per year, compounded annually. Complete the schedule. Round each year's interest to 2 dp, and carry the rounded closing balance into the next year. "Interest on interest" is that year's interest minus the interest of year 1 (what simple interest would pay).`,
          columns: ['Year', `Opening balance (${CCY})`, `Interest (${CCY})`, `Closing balance (${CCY})`, `Interest on interest (${CCY})`],
          rows,
          hints: [
            'Interest = opening balance $\\times$ rate. The closing balance is opening + interest, and becomes next year\'s opening.',
            `Year 1 interest is ${f.num(simple, 2)}. This is also what simple interest would pay every year.`,
            'Interest on interest = this year\'s interest minus the year-1 interest.',
          ],
          solution: `Year 1 interest $= ${f.num(PV, 0)} \\times ${rate} = ${f.num(simple, 2)}$. Each year multiplies the balance by ${f.num(1 + rate, 3)}. After 6 years the balance is **${f.money(last.close, CCY)}**, of which year 6 alone contains ${f.money(last.ioi, CCY)} of interest on interest.`,
        };
      },
    },
    {
      id: 'rank-offers',
      template: 'mcq',
      generate(r, f) {
        const freqs = [1, 2, 4, 12, 365];
        const names = { 1: 'annually', 2: 'semi-annually', 4: 'quarterly', 12: 'monthly', 365: 'daily' };
        const ear = (nom, m) => Math.pow(1 + nom / 100 / m, m) - 1;
        let offers = null;
        for (let attempt = 0; attempt < 200 && !offers; attempt++) {
          const cand = [];
          for (let k = 0; k < 3; k++) cand.push({ nom: r.float(2, 6, 0.05), m: r.pick(freqs) });
          const es = cand.map((o) => f.round(ear(o.nom, o.m) * 100, 3)).sort((a, b) => a - b);
          if (es[1] - es[0] >= 0.01 && es[2] - es[1] >= 0.01) offers = cand;
        }
        if (!offers) offers = [{ nom: 4, m: 1 }, { nom: 3.9, m: 12 }, { nom: 3.7, m: 4 }];
        const labels = ['A', 'B', 'C'];
        const eff = offers.map((o) => f.round(ear(o.nom, o.m) * 100, 3));
        let best = 0;
        eff.forEach((e, k) => { if (e > eff[best]) best = k; });
        const desc = offers.map((o, k) => `**Offer ${labels[k]}**: ${f.num(o.nom, 2)}% nominal, ${names[o.m]}`);
        return {
          prompt: `Three term deposits are on the table:\n\n- ${desc.join('\n- ')}\n\nWhich one has the **highest effective annual rate**?`,
          choices: [...labels.map((l) => `Offer ${l}`), 'They all have the same effective annual rate'],
          answer: best,
          hints: [
            `The offers compound ${[...new Set(offers.map((o) => names[o.m]))].join(', ')}, so the nominal rates are not directly comparable. Convert each offer to an effective annual rate with $EAR = (1 + r/m)^m - 1$.`,
            `Offer A has $r = ${f.num(offers[0].nom / 100, 4)}$ and $m = ${offers[0].m}$, so the rate per period is $${(offers[0].nom / 100 / offers[0].m).toFixed(6)}$. Do the same for ${labels[1]} ($m = ${offers[1].m}$) and ${labels[2]} ($m = ${offers[2].m}$).`,
            `Offer A: $(1 + ${(offers[0].nom / 100 / offers[0].m).toFixed(6)})^{${offers[0].m}} - 1$ = ${f.num(eff[0], 3)}%. Work out the other two in the same way and take the largest.`,
          ],
          solution: offers.map((o, k) => `Offer ${labels[k]}: $(1 + ${f.num(o.nom / 100, 4)}/${o.m})^{${o.m}} - 1$ = ${f.num(eff[k], 3)}%.`).join(' ') + ` The best is **Offer ${labels[best]}**.`,
        };
      },
    },
  ],
});
