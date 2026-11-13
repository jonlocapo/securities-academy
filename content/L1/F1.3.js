/* F1.3 Discounting and present value */
SA.unit({
  id: 'F1.3',
  lesson: [
    {
      md: String.raw`## Timelines and the value of a promise

F1.2 moved money forward in time. This unit moves it back. A corporate client offers to settle an invoice of EUR 10,000 in five years instead of paying now. What the promise is worth today depends on how much would have to be invested now to produce EUR 10,000 in five years.

Problems of this kind start with a **timeline**. Date 0 is today and each later date is the end of a period. Cash received is positive and cash paid out is negative.

| Date (years) | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Cash flow (EUR) | -5,000 | 2,000 | 2,000 | 2,000 |

The timeline shows an outlay of EUR 5,000 today and three receipts of EUR 2,000. Drawing it first makes it harder to miss a payment or to put one on the wrong date.`,
    },
    {
      md: String.raw`## The three rules of time travel

Three rules govern amounts that fall on different dates.

1. Only amounts at the same date can be compared or added.
2. To move an amount forward in time, compound it: $FV = C \times (1+r)^n$.
3. To move an amount back in time, discount it: $PV = C \div (1+r)^n$.

The rate $r$ is the return available in the market on money of similar risk. It is called the **discount rate** and it is the opportunity cost of holding the money. The **present value** (PV) of a future amount is the sum that would have to be invested today at the discount rate to produce it.

The fraction $\dfrac{1}{(1+r)^n}$ is the **discount factor**. By the exponent laws of Q1.3 it equals $(1+r)^{-n}$.

| Years $n$ | Discount factor at 5% |
|---|---|
| 1 | 0.9524 |
| 2 | 0.9070 |
| 3 | 0.8638 |
| 10 | 0.6139 |

> [!recall] Q1.3
> A negative exponent means the reciprocal: $(1.05)^{-3} = 1/1.05^3$.

A higher discount rate or a longer wait lowers the factor and therefore the present value.`,
      check: {
        template: 'mcq',
        prompt: 'A future payment is discounted first at 3% and then at 6%, over the same number of years. How do the two present values compare?',
        choices: [
          'The 6% present value is lower',
          'The 6% present value is higher',
          'They are equal',
          'It depends on the size of the payment',
        ],
        answer: 0,
        solution: 'A higher discount rate gives a smaller discount factor $1/(1+r)^n$, so the present value is lower. The size of the payment scales both results equally.',
      },
    },
    {
      md: String.raw`## Worked example: a single future payment

A **zero-coupon note** pays no interest during its life and repays one amount at maturity.

> [!example]
> EUR 1,000 repaid in 5 years, discount rate 4%.
> $PV = \dfrac{1{,}000}{1.04^5} = \dfrac{1{,}000}{1.216653} =$ **EUR 821.93**
>
> Check by compounding: EUR 821.93 invested at 4% for 5 years grows to EUR 1,000.

For the invoice above, EUR 10,000 in five years at 3% has a present value of $10{,}000/1.03^5 = \text{EUR } 8{,}626.09$. The delay costs EUR 1,373.91.

> [!tip]
> For a positive rate the PV is smaller than the future amount. A larger result means the amount was multiplied instead of divided.`,
    },
    {
      md: String.raw`## A stream of cash flows

Most securities pay several amounts at different dates. Each amount is discounted to date 0 (rule 3) and the results are added (rule 1):

$$PV = \sum_{n=0}^{N} \frac{C_n}{(1+r)^n}$$

> [!example]
> A borrower promises to repay a lender EUR 2,000 at the end of year 1 and EUR 5,000 at the end of each of years 2, 3 and 4. The lender's alternative is a deposit at 5%. The amount the lender should be willing to advance today is the present value of the promises.
>
> | Year | Payment | Discount factor | PV |
> |---|---|---|---|
> | 1 | 2,000 | 0.9524 | 1,904.76 |
> | 2 | 5,000 | 0.9070 | 4,535.15 |
> | 3 | 5,000 | 0.8638 | 4,319.19 |
> | 4 | 5,000 | 0.8227 | 4,113.51 |
> | Total | 17,000 | | **14,872.61** |
>
> The lender advances less than the EUR 17,000 that comes back because of the time value of money. EUR 14,872.61 left on deposit grows to EUR 18,077.75 after four years. Depositing each repayment on the day it arrives gives the same balance at year 4.

The future value of a stream at date $n$ is its present value compounded forward, $FV_n = PV \times (1+r)^n$. Both routes agree because both obey the three rules.

The table shows factors to four decimals but the PV column uses unrounded factors. A calculation with rounded factors can differ by a few cents, so the rounding used should be stated.`,
    },
    {
      md: String.raw`## Net present value

A decision to invest compares the present value of the benefits with the present value of the costs. The **net present value** (NPV) is the difference:

$$NPV = PV(\text{benefits}) - PV(\text{costs})$$

On a timeline, outlays are negative amounts and the NPV is the present value of the whole stream. A positive NPV means the project is worth more than it costs at the chosen discount rate.

> [!example]
> A project costs EUR 2,000 today and pays EUR 900 at the end of each of the next 3 years. The discount rate is 8%.
> $PV(\text{benefits}) = 900/1.08 + 900/1.08^2 + 900/1.08^3 = 833.33 + 771.60 + 714.45 = 2{,}319.39$
> $NPV = 2{,}319.39 - 2{,}000 =$ **EUR 319.39**
>
> The project is equivalent to receiving EUR 319.39 today. A firm could borrow EUR 2,319.39 at 8%, repay the loan from the three receipts and keep EUR 319.39.

Two payment plans are compared the same way. For money received the plan with the higher PV is better, and for money paid the lower PV is better, whatever the undiscounted totals say.

> [!warning]
> Spreadsheet NPV functions usually treat the first value as arriving at date 1. A payment at date 0 has to be added separately without discounting. A blank cell may also be skipped, which moves later payments one period earlier.`,
    },
    {
      md: String.raw`## Solving for the rate or the time

Sometimes the discount rate or the number of years is the unknown. The **internal rate of return** (IRR) is the discount rate at which the NPV of a set of cash flows is zero. With one payment out and one payment in, a root gives it. Starting from $P \times (1+r)^n = FV$:

$$r = \left(\frac{FV}{P}\right)^{1/n} - 1$$

This is the compound annual growth rate of the investment, and it uses the root rule of Q1.3.

> [!example]
> The zero-coupon note repays EUR 1,000 in 5 years and trades at EUR 800.
> $r = (1{,}000/800)^{1/5} - 1 = 1.25^{0.2} - 1 = 4.56\%$. This is the note's **yield**, the annual return from buying at EUR 800 and holding to maturity.

For the number of years, take logarithms. The rule $\ln(a^n) = n\ln a$ brings the exponent down:

$$n = \frac{\ln(FV/P)}{\ln(1+r)}$$

> [!example]
> Time for EUR 700 to grow to EUR 1,000 at 4%: $n = \ln(1{,}000/700)/\ln(1.04) = 0.3567/0.0392 = 9.09$ years.

> [!recall] Q1.6
> $\ln(a^n) = n \ln a$ converts an unknown exponent into an ordinary division.

With five or more periods and uneven cash flows there is no closed formula for $r$. The IRR is then found by trial and error, which a spreadsheet or financial calculator automates.`,
    },
    {
      md: String.raw`## Summary

- Only amounts at the same date can be compared. Moving an amount back in time divides it by $(1+r)^n$, and $(1+r)^{-n}$ is the discount factor.
- The PV of a stream is the sum of the discounted payments. NPV is the PV of the benefits minus the PV of the costs.
- The discount rate is the opportunity cost of money of similar risk, so a higher rate gives a lower PV. The rate and the period must match.
- For a single payment the rate is $(FV/P)^{1/n} - 1$ and the time is $\ln(FV/P)/\ln(1+r)$.
- Uneven cash flows need trial and error to find the IRR.`,
    },
  ],

  exercises: [
    {
      id: 'pv-single',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const FV = M.amt(r.int(1, 200) * 500);
        const ratePct = r.float(0.5, 10, 0.25);
        const n = r.int(1, 30);
        const PV = f.round(FV / Math.pow(1 + ratePct / 100, n), 2);
        return {
          prompt: `A counterparty promises to pay you **${f.money(FV, CCY, 0)}** in **${n} year${n > 1 ? 's' : ''}**. Your discount rate is **${f.num(ratePct, 2)}%** per year. What is the present value of this promise? (${CCY}, 2 dp)`,
          answer: PV, dp: 2, tol: { abs: 0.02 }, unit: CCY,
          hints: [
            `The growth factor is $1 + ${f.num(ratePct / 100, 4)} = ${f.num(1 + ratePct / 100, 4)}$.`,
            `Raise it to the power ${n}, then **divide** the future amount by the result.`,
            `$PV = ${f.num(FV, 0)} / ${f.num(1 + ratePct / 100, 4)}^{${n}}$`,
          ],
          solution: `$PV = \\dfrac{FV}{(1+r)^n} = \\dfrac{${f.num(FV, 0)}}{${f.num(1 + ratePct / 100, 4)}^{${n}}}$ = **${f.money(PV, CCY)}**`,
        };
      },
    },
    {
      id: 'pv-table',
      template: 'table',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const k = r.int(3, 5);
        const ratePct = r.pick([1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8]);
        const rate = ratePct / 100;
        const cfs = [];
        for (let i = 0; i < k; i++) cfs.push(M.amt(r.int(2, 100) * 50));
        const rows = [];
        let total = 0;
        for (let i = 0; i < k; i++) {
          const df = f.round(1 / Math.pow(1 + rate, i + 1), 4);
          const pv = f.round(cfs[i] * df, 2);
          total = f.round(total + pv, 2);
          rows.push([i + 1, f.num(cfs[i], 2), df.toFixed(4), { answer: pv, dp: 2, tol: { abs: 0.01 } }]);
        }
        rows.push(['Total', f.num(cfs.reduce((a, b) => a + b, 0), 2), '', { answer: total, dp: 2, tol: { abs: 0.02 } }]);
        return {
          prompt: `A structured note pays the cash flows below at the end of each year. The discount rate is **${f.num(ratePct, 1)}%**. The discount factors are given (rounded to 4 dp). Compute each PV as cash flow $\\times$ factor, rounded to the cent, then add them up.`,
          columns: ['Year', `Cash flow (${CCY})`, 'Discount factor', `Present value (${CCY})`],
          rows,
          hints: [
            `Each present value is the cash flow times the factor shown in the same row, not a factor you recompute at ${f.num(ratePct, 1)}%.`,
            `Year 1: $${f.num(cfs[0], 2)} \\times ${rows[0][2]}$. Year ${k}: $${f.num(cfs[k - 1], 2)} \\times ${rows[k - 1][2]}$.`,
            `Round the ${k} present values to the cent, starting with year 1 at ${f.num(rows[0][3].answer, 2)}. The total is the sum of those ${k} rounded figures.`,
          ],
          solution: `Row by row: ${rows.slice(0, k).map((row, i) => `${f.num(cfs[i], 2)} $\\times$ ${row[2]} = ${f.num(row[3].answer, 2)}`).join(', ')}. The sum is **${f.money(total, CCY)}**, less than the undiscounted total of ${f.money(cfs.reduce((a, b) => a + b, 0), CCY)}.`,
        };
      },
    },
    {
      id: 'zero-yield',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        let n = r.int(1, 20), pct = r.int(40, 98);
        for (let t = 0; t < 30 && Math.pow(100 / pct, 1 / n) - 1 > 0.3; t++) { n = r.int(1, 20); pct = r.int(40, 98); }
        if (Math.pow(100 / pct, 1 / n) - 1 > 0.3) { n = 20; pct = 60; }
        const payoff = M.amt(r.pick([1000, 2000, 5000, 10000, 20000, 50000]));
        const price = payoff * pct / 100;
        const y = f.round((Math.pow(payoff / price, 1 / n) - 1) * 100, 2);
        return {
          prompt: `A zero-coupon note repays **${f.money(payoff, CCY, 0)}** in **${n} year${n > 1 ? 's' : ''}** and costs **${f.money(price, CCY, 0)}** today (${pct}% of its payoff). What yearly yield do you earn if you hold it to maturity? (answer in %, 2 dp)`,
          answer: y, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [
            `Write the equation: $${f.num(price, 0)} \\times (1 + r)^{${n}} = ${f.num(payoff, 0)}$.`,
            `Isolate the bracket: $(1 + r)^{${n}} = ${f.num(payoff, 0)}/${f.num(price, 0)} = ${f.num(payoff / price, 4)}$.`,
            `Take the ${n}-th root (power $1/${n}$), then subtract 1.`,
          ],
          solution: `$1 + r = (${f.num(payoff, 0)}/${f.num(price, 0)})^{1/${n}} = ${f.num(payoff / price, 4)}^{1/${n}}$, so $r$ = **${f.num(y, 2)}%** per year.`,
        };
      },
    },
    {
      id: 'solve-years',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const payoff = M.amt(r.pick([1000, 2000, 5000, 10000, 25000, 100000]));
        const pct = r.int(40, 95);
        const price = payoff * pct / 100;
        const ratePct = r.float(2, 9, 0.5);
        const n = f.round(Math.log(payoff / price) / Math.log(1 + ratePct / 100), 2);
        return {
          prompt: `A zero-coupon note repays **${f.money(payoff, CCY, 0)}** at maturity. It is priced at **${f.money(price, CCY, 0)}**, which corresponds to a yield of **${f.num(ratePct, 2)}%** per year. How many years to maturity does it have? (years, 2 dp; a tolerance of 0.05 is accepted)`,
          answer: n, dp: 2, tol: { abs: 0.05 }, unit: 'years',
          hints: [
            `Equation: $(1 + ${f.num(ratePct / 100, 4)})^{n} = ${f.num(payoff, 0)}/${f.num(price, 0)}$.`,
            'Take the natural logarithm of both sides; the exponent $n$ comes down in front.',
            `$n = \\ln(${f.num(payoff / price, 4)}) / \\ln(${f.num(1 + ratePct / 100, 4)})$`,
          ],
          solution: `$n = \\dfrac{\\ln(${f.num(payoff / price, 4)})}{\\ln(${f.num(1 + ratePct / 100, 4)})} = \\dfrac{${f.num(Math.log(payoff / price), 4)}}{${f.num(Math.log(1 + ratePct / 100), 4)}}$ = **${f.num(n, 2)} years**`,
        };
      },
    },
    {
      id: 'better-plan',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const ratePct = r.pick([2, 3, 4, 5, 6, 7, 8, 10]);
        const rate = ratePct / 100;
        const pvOf = (c) => c.reduce((s, v, i) => s + v / Math.pow(1 + rate, i), 0);
        let A, B;
        for (let t = 0; t < 300; t++) {
          const len = 4;
          A = []; B = [];
          for (let i = 0; i < len; i++) { A.push(M.amt(r.int(2, 40) * 100)); B.push(M.amt(r.int(2, 40) * 100)); }
          const a = pvOf(A), b = pvOf(B);
          if (Math.abs(a - b) / Math.max(a, b) > 0.03) break;
        }
        const a = f.round(pvOf(A), 2), b = f.round(pvOf(B), 2);
        const sumA = A.reduce((x, y) => x + y, 0), sumB = B.reduce((x, y) => x + y, 0);
        const row = (c) => c.map((v) => f.num(v, 0)).join(' | ');
        const best = a > b ? 0 : 1;
        const ctx = r.pick(['A client is offered', 'A supplier offers you', 'A fund proposes to pay you']);
        return {
          prompt: `${ctx} two payment plans (in ${CCY}), received at the end of years 0, 1, 2 and 3. The discount rate is **${ratePct}%**.\n\n| Plan | Year 0 | Year 1 | Year 2 | Year 3 |\n|---|---|---|---|---|\n| Plan A | ${row(A)} |\n| Plan B | ${row(B)} |\n\nWhich plan is worth more today?`,
          choices: ['Plan A', 'Plan B', 'They have the same present value', 'The plan with the larger total, always'],
          answer: best,
          hints: [
            'Do not compare the plain totals: the payments fall on different dates.',
            `Discount each payment: year $k$ is divided by $${f.num(1 + rate, 2)}^{k}$. Year 0 is not discounted.`,
          ],
          solution: `PV of Plan A $= ${f.num(a, 2)}$ and PV of Plan B $= ${f.num(b, 2)}$, so **Plan ${best === 0 ? 'A' : 'B'}** is worth more. The plain totals are ${f.num(sumA, 0)} and ${f.num(sumB, 0)}.`,
        };
      },
    },
  ],
});
