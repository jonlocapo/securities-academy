/* F1.4 Annuities and perpetuities */
SA.unit({
  id: 'F1.4',
  lesson: [
    {
      md: String.raw`## Perpetuities

Discounting each payment one by one (F1.3) is slow when payments are many and equal. Regular patterns have shortcuts. A **perpetuity** is a stream of equal payments at regular intervals that never ends. The first payment falls one period from today, which is called payment in arrears. UK government consols were bonds of this kind.

The value follows from building the same cash flows yourself. A deposit of $P$ at rate $r$ earns $rP$ over a period. If the interest is withdrawn each period and the deposit is left in place, the deposit produces a perpetuity of $C = rP$. The two have the same cash flows, so they have the same value:

$$PV = \frac{C}{r}$$

> [!example]
> A foundation wants to pay a prize of EUR 40,000 a year for ever, starting in one year. The endowment earns 5%.
> $PV = 40{,}000/0.05 =$ **EUR 800,000**

If the first payment is later than one period away, the formula values the stream one period before the first payment. Suppose the first prize is paid in three years. The formula gives EUR 800,000 at date 2, and that amount is then discounted for two periods:

$800{,}000/1.05^2 = \text{EUR } 725{,}623.58$

> [!warning]
> Discounting the formula result once more than needed, for example three times here, is a frequent mistake. The perpetuity formula already discounts to one period before the first payment, and the same applies to every formula in this unit.

> [!recall] F1.3
> A single amount at a later date is discounted with $1/(1+r)^n$. Here the perpetuity value at date 2 is such an amount.`,
    },
    {
      md: String.raw`## Annuities

An **annuity** is a stream of $N$ equal payments at regular intervals. It is a perpetuity that stops. Loan instalments, rent and many bond coupons follow this pattern. The first payment is again one period away.

The same do-it-yourself argument gives its value. Invest $P$ at rate $r$ and withdraw the interest $C = rP$ each period. After $N$ periods, close the account and take the principal back. These cash flows are an annuity of $C$ for $N$ periods plus $P$ at date $N$. Because they cost $P$ to create:

$$PV(\text{annuity}) = P - \frac{P}{(1+r)^N}$$

With $P = C/r$ this becomes

$$PV = C \times \frac{1 - (1+r)^{-N}}{r}$$

The fraction is the **annuity factor**. It is the perpetuity value $C/r$ minus the value of the payments that would start after year $N$.

> [!example]
> EUR 1,000 is invested at 4% and EUR 40 is withdrawn each year for 10 years. The principal is then returned.
> The annuity of EUR 40 for 10 years is worth $1{,}000 - 1{,}000/1.04^{10} = 1{,}000 - 675.56 =$ **EUR 324.44**.
> The annuity factor is $(1 - 1.04^{-10})/0.04 = 8.1109$ and $40 \times 8.1109 = 324.44$.

> [!recall] Q1.8
> The geometric series formula gives the same result. The payments form a series with first term $C/(1+r)$ and ratio $1/(1+r)$.`,
      check: {
        template: 'mcq',
        prompt: 'An annuity pays EUR 1,000 a year. Compared with a 10-year annuity at the same rate, a 20-year annuity is worth:',
        choices: [
          'More than the 10-year annuity, but less than double',
          'Exactly double',
          'The same',
          'More than double',
        ],
        answer: 0,
        solution: 'The later payments are discounted more, so each extra year adds less than the one before. Twice the payments is worth less than twice as much.',
      },
    },
    {
      md: String.raw`## Annuity-due, future value and non-annual payments

An **annuity-due** pays the first amount today, as with rent paid in advance. With $N$ payments in total, the first is already a present value and the remaining $N-1$ form an ordinary annuity. Equivalently, every payment arrives one period earlier than in the ordinary case:

$$PV_{due} = PV_{ordinary} \times (1+r)$$

> [!example]
> EUR 1,000 a year for 5 years at 5%. The annuity factor is $(1 - 1.05^{-5})/0.05 = 4.3295$.
> Ordinary: $1{,}000 \times 4.3295 = \text{EUR } 4{,}329.48$.
> Due: $4{,}329.48 \times 1.05 =$ **EUR 4,545.95**.

The **future value of an annuity** is the value at the date of the last payment. It is the present value compounded forward, $FV = C \times \dfrac{(1+r)^N - 1}{r}$.

The formulas work for any period length as long as the rate and the count use the same period. A saver deposits EUR 200 at the end of each month for 5 years at a nominal 4.8% a year, compounded monthly. The monthly rate is $0.048/12 = 0.4\%$ and there are 60 payments.

$FV = 200 \times (1.004^{60} - 1)/0.004 =$ **EUR 13,532.04**

Deposits are EUR 12,000 and interest is EUR 1,532.04.`,
    },
    {
      md: String.raw`## Growing perpetuity

When payments grow at a constant rate $g$ for ever, the value is again a closed formula. The convention is that the first payment $C_1$ comes at date 1 and does not include growth. The payment at date $n$ is $C_1(1+g)^{n-1}$.

$$PV = \frac{C_1}{r - g}$$

The formula requires $r > g$. If growth is as high as the discount rate or higher, the sum does not converge and the formula gives no meaningful value.

> [!example]
> A share is expected to pay EUR 2.40 next year, and the dividend is expected to grow at 3% a year indefinitely. Investors require 8%.
> $PV = 2.40/(0.08 - 0.03) = 2.40/0.05 =$ **EUR 48.00**

A **growing annuity** has the same pattern for a fixed number of years. It has its own formula, which this course does not need. It can be handled as the difference between two growing perpetuities.

> [!warning]
> $C_1$ is the next payment, not the one just paid. If the last dividend was EUR 2.33, then $C_1 = 2.33 \times 1.03 = 2.40$.`,
    },
    {
      md: String.raw`## Loan instalments and amortisation

A loan repaid by equal instalments is an annuity from the lender's side. The amount borrowed is the present value of the instalments, discounted at the loan rate. Solving the annuity formula for $C$ gives the instalment:

$$C = \frac{P}{\text{annuity factor}} = \frac{P \, r}{1 - (1+r)^{-N}}$$

> [!example]
> A bank lends EUR 100,000 over 10 years at 4%, repaid in equal yearly instalments.
> $C = 100{,}000/8.1109 =$ **EUR 12,329.09** a year.
> The client pays EUR 123,290.90 in total, of which EUR 23,290.90 is interest.

When payments are monthly, the loan quote has to be converted. A loan of EUR 18,000 at 4.8% a year, paid monthly over 3 years, uses $r = 0.048/12 = 0.4\%$ and $N = 36$. The instalment is $18{,}000/\text{factor} = \text{EUR } 537.86$ a month.

Such a loan is **amortising**. Each instalment pays the interest on the balance and the rest repays principal.

| Year | Opening | Interest (4%) | Principal repaid | Closing |
|---|---|---|---|---|
| 1 | 100,000.00 | 4,000.00 | 8,329.09 | 91,670.91 |
| 2 | 91,670.91 | 3,666.84 | 8,662.25 | 83,008.66 |
| 3 | 83,008.66 | 3,320.35 | 9,008.74 | 73,999.92 |
| 4 | 73,999.92 | 2,960.00 | 9,369.09 | 64,630.83 |

The outstanding balance at any date is the present value of the remaining instalments at the loan rate. After one year of the monthly loan above, 24 instalments remain and the balance is $537.86 \times \text{factor}(0.4\%, 24) \approx \text{EUR } 12{,}285$.`,
    },
    {
      md: String.raw`## Choosing the formula

The pattern of the cash flows determines the tool. Questions to ask:

1. How many payments are there? A single payment is a lump sum (F1.3).
2. Are the amounts equal? If they grow at a constant rate, the pattern is a growing perpetuity or growing annuity.
3. Does the stream end? If not, it is a perpetuity. If it does, it is an annuity with $N$ payments.
4. When is the first payment? One period from now gives the ordinary formula and today gives the annuity-due.

Common errors:
- Mixing periods, such as a yearly rate with monthly payments.
- Dividing by the factor when the payment is known, or multiplying when the price is known.
- Discounting a perpetuity value once too often when the first payment is delayed.
- Comparing leases and purchases by undiscounted totals. Both are converted to present values first.

> [!example]
> A machine costs EUR 60,000, or can be leased for EUR 14,000 at the end of each of 5 years. The discount rate is 6%. The lease has a present value of $14{,}000 \times 4.2124 = \text{EUR } 58{,}974$, which is below the purchase price, so leasing costs less before resale value and tax are considered.

When the annuity payment and price are known but the rate is not, the rate is the IRR of the stream. It is found by trial and error, as in F1.3.`,
    },
    {
      md: String.raw`## Summary

- A perpetuity of $C$ is worth $C/r$, and a growing perpetuity is worth $C_1/(r-g)$ when $g < r$.
- An annuity is worth $C \times \dfrac{1 - (1+r)^{-N}}{r}$. An annuity-due is worth $(1+r)$ times the ordinary annuity.
- All these formulas value the stream one period before the first payment.
- A loan instalment is the principal divided by the annuity factor, and the outstanding balance is the present value of the remaining instalments.
- The rate and the period must match, and alternatives are compared by present value.`,
    },
  ],

  exercises: [
    {
      id: 'annuity-pv',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const C = M.amt(r.int(1, 200) * 100);
        const ratePct = r.float(1, 9, 0.25);
        const n = r.int(2, 30);
        const due = r.bool(0.35);
        const rate = ratePct / 100;
        const af = (1 - Math.pow(1 + rate, -n)) / rate;
        const PV = f.round(C * af * (due ? 1 + rate : 1), 2);
        const timing = due ? 'at the **start** of each year (the first payment is made today)' : 'at the **end** of each year (the first payment is in one year)';
        return {
          prompt: `A pension scheme pays **${f.money(C, CCY, 0)}** ${timing}, for **${n} years**. The discount rate is **${f.num(ratePct, 2)}%**. What is the present value of the payments? (${CCY}, 2 dp)`,
          answer: PV, dp: 2, tol: { abs: 0.05 }, unit: CCY,
          hints: [
            `Annuity factor: $\\dfrac{1 - (1 + ${f.num(rate, 4)})^{-${n}}}{${f.num(rate, 4)}} = ${f.num(af, 4)}$.`,
            'Multiply the payment by the factor to get the value of an ordinary annuity.',
            due ? `The payments come at the start of the year, so multiply once more by $(1 + ${f.num(rate, 4)})$.` : 'The first payment is a year away, so this is an ordinary annuity: no extra factor.',
          ],
          solution: `Factor $= ${f.num(af, 4)}$. ${due ? `Annuity-due: $PV = ${f.num(C, 0)} \\times ${f.num(af, 4)} \\times ${f.num(1 + rate, 4)}$` : `Ordinary: $PV = ${f.num(C, 0)} \\times ${f.num(af, 4)}$`} = **${f.money(PV, CCY)}**`,
        };
      },
    },
    {
      id: 'loan-instalment',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const P = M.amt(r.int(2, 100) * 5000);
        const ratePct = r.float(1, 8, 0.25);
        const n = r.int(3, 30);
        const rate = ratePct / 100;
        const af = (1 - Math.pow(1 + rate, -n)) / rate;
        const pay = f.round(P / af, 2);
        return {
          prompt: `A bank lends **${f.money(P, CCY, 0)}** at **${f.num(ratePct, 2)}%** per year, to be repaid in **${n} equal yearly instalments**, the first one a year from now. What is the yearly instalment? (${CCY}, 2 dp)`,
          answer: pay, dp: 2, tol: { abs: 0.05 }, unit: CCY,
          hints: [
            'The loan amount is the present value of the instalments: $P = C \\times$ annuity factor.',
            `Annuity factor $= (1 - ${f.num(1 + rate, 4)}^{-${n}})/${f.num(rate, 4)} = ${f.num(af, 4)}$.`,
            `Solve for $C$: divide the loan by the factor.`,
          ],
          solution: `$C = \\dfrac{P}{\\text{factor}} = \\dfrac{${f.num(P, 0)}}{${f.num(af, 4)}}$ = **${f.money(pay, CCY)}** per year.`,
        };
      },
    },
    {
      id: 'amortisation-table',
      template: 'table',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const P = M.amt(r.int(4, 40) * 5000);
        const ratePct = r.pick([2, 2.5, 3, 3.5, 4, 4.5, 5, 6]);
        const n = r.int(5, 15);
        const rate = ratePct / 100;
        const af = (1 - Math.pow(1 + rate, -n)) / rate;
        const pay = f.round(P / af, 2);
        const rows = [];
        let open = P;
        const calc = [];
        for (let y = 1; y <= 4; y++) {
          const interest = f.round(open * rate, 2);
          const principal = f.round(pay - interest, 2);
          const close = f.round(open - principal, 2);
          calc.push({ interest, principal, close });
          rows.push([
            y,
            f.num(open, 2),
            { answer: interest, dp: 2, tol: { abs: 0.01 } },
            { answer: principal, dp: 2, tol: { abs: 0.01 } },
            { answer: close, dp: 2, tol: { abs: 0.01 } },
          ]);
          open = close;
        }
        return {
          prompt: `A **${f.money(P, CCY, 0)}** loan at **${f.num(ratePct, 1)}%** is repaid in **${n} equal yearly instalments of ${f.money(pay, CCY)}** (first payment after one year). Complete the first four rows of the schedule. Round interest to 2 dp. The opening balances shown are the true ones.`,
          columns: ['Year', 'Opening balance', 'Interest', 'Principal repaid', 'Closing balance'],
          rows,
          hints: [
            `Year 1 interest is the opening balance times the rate: $${f.num(P, 2)} \\times ${f.num(rate, 4)}$.`,
            `Year 1 principal repaid is the instalment less that interest: ${f.num(pay, 2)} minus the year 1 interest of ${f.num(calc[0].interest, 2)}.`,
            `The closing balance is the opening balance minus the principal repaid, and it is the next row's opening balance, so year 2 interest is ${f.num(rate, 4)} times the year 2 opening balance shown.`,
          ],
          solution: `Year 1: interest $= ${f.num(P, 0)} \\times ${rate} = ${f.num(calc[0].interest, 2)}$ and principal $= ${f.num(pay, 2)} - ${f.num(calc[0].interest, 2)} = ${f.num(calc[0].principal, 2)}$, so the closing balance is ${f.num(calc[0].close, 2)}. The interest part falls each year (${calc.map((c) => f.num(c.interest, 2)).join(', ')}) and the principal part grows.`,
        };
      },
    },
    {
      id: 'perpetuity',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const growing = r.bool();
        const ratePct = r.float(4, 10, 0.25);
        const C = M.amt(r.int(1, 200) * 0.5);
        if (!growing) {
          const PV = f.round(C / (ratePct / 100), 2);
          return {
            prompt: `A preference share pays a fixed dividend of **${f.money(C, CCY, 2)}** per year, forever (the first dividend is in one year). Investors require a return of **${f.num(ratePct, 2)}%**. What is a fair price per share? (${CCY}, 2 dp)`,
            answer: PV, dp: 2, tol: { abs: 0.02 }, unit: CCY,
            hints: ['Equal payments that never end: a perpetuity.', `$PV = C/r$ with $r = ${f.num(ratePct / 100, 4)}$.`],
            solution: `$PV = C/r = ${f.num(C, 2)}/${f.num(ratePct / 100, 4)}$ = **${f.money(PV, CCY)}**`,
          };
        }
        const gPct = f.round(r.float(0.5, ratePct - 1.5, 0.25), 2);
        const PV = f.round(C / ((ratePct - gPct) / 100), 2);
        return {
          prompt: `A share will pay **${f.money(C, CCY, 2)}** as next year's dividend. The dividend is expected to grow by **${f.num(gPct, 2)}%** a year forever. Investors require **${f.num(ratePct, 2)}%**. What is a fair price per share? (${CCY}, 2 dp)`,
          answer: PV, dp: 2, tol: { abs: 0.02 }, unit: CCY,
          hints: ['Payments that grow at a constant rate forever: a growing perpetuity.', `$PV = C_1/(r - g)$. First compute $r - g = ${f.num(ratePct, 2)}\\% - ${f.num(gPct, 2)}\\%$.`],
          solution: `$PV = \\dfrac{C_1}{r - g} = \\dfrac{${f.num(C, 2)}}{${f.num((ratePct - gPct) / 100, 4)}}$ = **${f.money(PV, CCY)}**`,
        };
      },
    },
    {
      id: 'which-formula',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const types = ['Ordinary annuity', 'Annuity-due', 'Perpetuity', 'Growing perpetuity', 'Lump sum (single discounting)'];
        const a = M.amt(r.int(2, 30) * 100), n = r.int(3, 25), pct = r.int(2, 9), g = r.int(1, 2);
        const pool = [
          [0, `A loan is repaid with ${f.money(a, CCY, 0)} at the end of each year for ${n} years.`, [
            `The loan is repaid by ${f.money(a, CCY, 0)} a year, so the payments repeat and are all equal.`,
            `They stop after ${n} years, and each one falls at the end of its year, so the first is one year from now.`]],
          [0, `A bond-like contract pays ${f.money(a, CCY, 0)} at the end of every year for ${n} years.`, [
            `The contract pays the same ${f.money(a, CCY, 0)} repeatedly, not once.`,
            `The run ends after ${n} years, and the payments come at the end of the year, so none is paid today.`]],
          [1, `A tenant pays ${f.money(a, CCY, 0)} rent at the **start** of each year for ${n} years, the first payment today.`, [
            `The rent of ${f.money(a, CCY, 0)} repeats every year for ${n} years, so there is a fixed number of equal payments.`,
            'Check when the first payment falls: the text says today, which is earlier than in the usual end-of-year pattern.']],
          [1, `A lease requires ${f.money(a, CCY, 0)} paid in advance every year for ${n} years.`, [
            `The lease asks for ${f.money(a, CCY, 0)} every year for ${n} years, a fixed number of equal payments.`,
            'Check what "in advance" means for the timing of the first payment compared with the end-of-year pattern.']],
          [2, `An undated bond pays ${f.money(a, CCY, 0)} every year and never matures.`, [
            `The bond pays the same ${f.money(a, CCY, 0)} every year, so the payments repeat and are equal.`,
            'The text gives no maturity date. Count how many payments there are and check whether the amount changes.']],
          [2, `A foundation will receive ${f.money(a, CCY, 0)} a year for ever.`, [
            `The foundation receives the same ${f.money(a, CCY, 0)} each year, so the payments repeat and are equal.`,
            'The words "for ever" tell you how many payments there are. Check whether the amount grows.']],
          [3, `A share's next dividend is ${f.money(a / 100, CCY, 2)}, and dividends are expected to grow ${g}% a year indefinitely.`, [
            `There is a stream of dividends starting at ${f.money(a / 100, CCY, 2)} next year, not one payment.`,
            `The text gives ${g}% annual growth and no end date. Check what that does to the payment amounts and to the number of payments.`]],
          [3, `A fund pays out ${f.money(a, CCY, 0)} next year and then ${g}% more each year, without end.`, [
            `The first payment is ${f.money(a, CCY, 0)} next year, and the later payments are not equal to it.`,
            `Each payment is ${g}% larger than the last and the text says "without end". Check what that implies for the number of payments.`]],
          [4, `A zero-coupon note repays ${f.money(a * 10, CCY, 0)} in ${n} years and nothing before.`, [
            `Count the payments: the note pays ${f.money(a * 10, CCY, 0)} once, in year ${n}.`,
            'The words "nothing before" tell you there is no stream of payments to value.']],
          [4, `An invoice of ${f.money(a * 10, CCY, 0)} is due in ${n} years; there are no other payments.`, [
            `Count the payments: the invoice is one amount of ${f.money(a * 10, CCY, 0)}, due ${n} years from now.`,
            `With no other payments, the only step is moving that amount back ${n} years at ${pct}%.`]],
        ];
        const pick = r.pick(pool);
        const stem = r.pick(['Which formula fits this cash-flow pattern?', 'Which tool values this cash-flow pattern?']);
        return {
          prompt: `${pick[1]} The discount rate is ${pct}%.\n\n${stem}`,
          choices: types,
          answer: pick[0],
          hints: pick[2],
          solution: `This is a **${types[pick[0]].toLowerCase()}**.`,
        };
      },
    },
    {
      id: 'lease-vs-buy',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const ratePct = r.float(3, 8, 0.5);
        const rate = ratePct / 100;
        const n = r.int(3, 8);
        const B = M.amt(r.int(40, 120) * 1000);
        const resalePct = r.int(15, 40);
        const S = B * resalePct / 100;
        const L = r.int(Math.max(1, Math.floor(B / n / 2000)), Math.ceil(B / n / 1000)) * 1000;
        const af = (1 - Math.pow(1 + rate, -n)) / rate;
        const pvLease = L * af;
        const pvBuy = B - S / Math.pow(1 + rate, n);
        const diff = f.round(pvBuy - pvLease, 2);
        return {
          prompt: `A company can **buy** a machine for **${f.money(B, CCY, 0)}** and sell it after **${n} years** for **${f.money(S, CCY, 0)}** (${resalePct}% of the price), or **lease** it for **${f.money(L, CCY, 0)}** at the end of each year for ${n} years. The company discounts at **${f.num(ratePct, 1)}%**.\n\nCompute the present value of the net cost of buying minus the present value of leasing. A **positive** number means leasing is cheaper. (${CCY}, 2 dp, may be negative)`,
          answer: diff, dp: 2, tol: { abs: 0.1 }, unit: CCY,
          hints: [
            `Lease: an annuity. Factor $= (1 - ${f.num(1 + rate, 3)}^{-${n}})/${f.num(rate, 3)} = ${f.num(af, 4)}$, so $PV_{lease} = ${f.num(L, 0)} \\times ${f.num(af, 4)}$.`,
            `Buy: pay ${f.num(B, 0)} now, then receive the resale value in year ${n}, which is discounted: $${f.num(S, 0)}/${f.num(1 + rate, 3)}^{${n}}$.`,
            '$PV_{buy}$ is the price minus the present value of the resale. Subtract the lease PV from it.',
          ],
          solution: `$PV_{lease} = ${f.num(pvLease, 2)}$. $PV_{buy} = ${f.num(B, 0)} - ${f.num(S / Math.pow(1 + rate, n), 2)} = ${f.num(pvBuy, 2)}$. Difference $PV_{buy} - PV_{lease}$ = **${f.money(diff, CCY)}**, so ${diff > 0 ? 'leasing is cheaper' : 'buying is cheaper'}.`,
        };
      },
    },
  ],
});
