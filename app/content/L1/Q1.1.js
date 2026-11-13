/* Q1.1 Percentages, basis points and proportions */
SA.unit({
  id: 'Q1.1',
  lesson: [
    {
      md: String.raw`## Percentages, per mille and basis points

A percentage is a fraction written out of 100, and the symbol % stands for "per hundred". Two related units are used for smaller quantities.

- 1% = 1/100 = 0.01
- 1 per mille (‰) = 1/1,000 = 0.001
- 1 **basis point** (bp) = 1/10,000 = 0.0001 = 0.01%

Rates and fees in markets are small and are quoted precisely, so they are given in basis points. A statement such as "custody costs 45 bp, and Bund yields are up 25 bp" uses this unit throughout. "Half a per cent" can be misheard; "50 bp" is unambiguous.`,
    },
    {
      md: String.raw`## Converting between the three forms

Per cent, decimal and basis points express the same number in different units, so converting only moves the decimal point.

| Form | Example | Conversion |
|---|---|---|
| Per cent | 0.45% | as quoted in a brochure |
| Decimal | 0.0045 | divide the per cent by 100 |
| Basis points | 45 bp | multiply the per cent by 100 |

Therefore 1% = 100 bp and 0.45% = 45 bp. Formulas use the decimal form.

> [!example]
> A EUR 25,000 portfolio pays a 45 bp annual custody fee.
> Step 1: 45 bp = 45 / 10,000 = 0.0045.
> Step 2: fee = EUR 25,000 × 0.0045 = **EUR 112.50** per year.`,
      check: {
        template: 'mcq',
        prompt: 'A fund charges 0.80% a year. How many basis points is that?',
        choices: ['80 bp', '8 bp', '0.8 bp', '800 bp'],
        answer: 0,
        solution: '1% = 100 bp, so 0.80% = 0.80 × 100 = 80 bp.',
      },
    },
    {
      md: String.raw`## Percentage change and the growth factor

A percentage change is a change measured as a fraction of the original amount. A rise of 20% means the new value is 100% + 20% = 120% of the old value, which is a multiplication by 1.20. This multiplier is the **growth factor**. A change of a fixed percentage each period is exponential growth, whereas a change of a fixed amount each period is linear growth.

$$\text{new} = \text{old} \times (1 + r) \qquad\qquad r = \frac{\text{new} - \text{old}}{\text{old}} = \frac{\text{new}}{\text{old}} - 1$$

Here $r$ is the percentage change as a decimal. A fall of 35% is $r = -0.35$, with growth factor $0.65$. The percentage change is always measured against the old value.

> [!example]
> A share goes from EUR 40.00 to EUR 46.00.
> $r = (46 - 40) / 40 = 6/40 = 0.15$, a rise of **15%**.
> If it then rises another 10%: $46.00 \times 1.10 =$ **EUR 50.60**.`,
    },
    {
      md: String.raw`## Chaining percentage changes

Each change applies to a different base, so successive changes are combined by multiplying growth factors. Percentages are not added.

A fund falls 20% and then rises 25%: $0.80 \times 1.25 = 1.00$, which returns it to the starting value.

A fund falls 20% and then rises 20%: $0.80 \times 1.20 = 0.96$, which leaves it 4% below the starting value.

For several changes $r_1, r_2, r_3$:

$$1 + r_{\text{total}} = (1 + r_1)(1 + r_2)(1 + r_3)$$

> [!warning]
> After a loss, a larger percentage gain is needed to recover. A 50% fall requires a rise of 100%, since $0.50 \times 2.00 = 1.00$.`,
    },
    {
      md: String.raw`## Percentage points and weights

A **percentage-point** change is the difference between two percentages. If a yield moves from 2.0% to 2.5%, it has risen by 0.5 percentage points, which is 50 bp. In relative terms it has risen by 25% (0.5 / 2.0), but this figure is not used for yields. The usual statement is "up 50 bp".

> [!warning]
> "Rates rose 0.5%" is ambiguous. Write "rose 50 bp" or "rose 0.5 percentage points".

A **weight** is a share of a total. A EUR 40,000 holding in a EUR 250,000 portfolio has weight
$40{,}000 / 250{,}000 = 0.16 = 16\%$. The weights of all holdings in a portfolio add to 100%.

> [!eu]
> European key-information documents and fee tables usually show costs in % per year, while institutional fee schedules quote basis points. Both forms are in use and must be converted in either direction.`,
    },
    {
      md: String.raw`## Summary

- 1% = 0.01 = 100 bp, and 1 bp = 0.0001. Formulas use the decimal form.
- Percentage change = new/old − 1. Successive changes are combined by multiplying factors $(1+r)$, not by adding percentages.
- A fall of 20% followed by a rise of 25% returns to the starting value. A larger percentage gain than the loss is needed to recover.
- A yield moving from 2.0% to 2.5% rose by 50 bp (0.5 percentage points).
- A weight is part / total, and all weights add to 100%.`,
    },
  ],

  exercises: [
    {
      id: 'pct-decimal-bp',
      template: 'mcq',
      generate(r, f) {
        const p = r.float(0.05, 3.5, 0.05);
        const bp = f.round(p * 100, 2);
        const dec = f.round(p / 100, 6);
        const fmt = (d, b) => `${d} = ${f.num(b, b % 1 ? 1 : 0)} bp`;
        const correct = fmt(dec, bp);
        const choices = [
          correct,
          fmt(f.round(dec * 10, 6), f.round(bp * 10, 2)),
          fmt(f.round(dec / 10, 7), f.round(bp / 10, 2)),
          fmt(f.round(p, 4), f.round(p, 2)),
        ];
        return {
          prompt: `Which line gives the correct decimal and basis-point equivalent of **${f.num(p, 2)}%**?`,
          choices,
          answer: 0,
          hints: [
            `Start from the fact that 1% = 0.01 = 100 bp. Your figure, ${f.num(p, 2)}%, is ${f.num(p, 2)} times that.`,
            `For the decimal, move the decimal point of ${f.num(p, 2)} two places to the left. For basis points, move it two places to the right.`,
            `Check each option twice: the decimal must be 100 times smaller than ${f.num(p, 2)}, and the basis-point figure 100 times larger. Options that are out by a factor of 10 fail one of these checks.`,
          ],
          solution: `${f.num(p, 2)}% ÷ 100 = ${dec}, and ${f.num(p, 2)} × 100 = ${f.num(bp, 0)} bp. The other options are off by a factor of 10 or confuse the per cent with the decimal.`,
        };
      },
    },
    {
      id: 'fee-from-bp',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const V = M.amt(r.int(5, 2000) * 1000);
        const bp = r.int(1, 30) * 5;
        const fee = f.round(V * bp / 10000, 2);
        return {
          prompt: `A private-banking client holds a portfolio worth **${f.money(V, CCY, 0)}**. The annual custody fee is **${bp} bp**. What is the fee for one year? (${CCY}, 2 dp)`,
          answer: fee, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: [
            `Convert basis points to a decimal: ${bp} bp = ${bp} / 10,000.`,
            `${bp} / 10,000 = ${f.num(bp / 10000, 4)}.`,
            `Multiply: ${f.num(V, 0)} × ${f.num(bp / 10000, 4)}.`,
          ],
          solution: `${bp} bp = ${f.num(bp / 10000, 4)}. Fee = ${f.num(V, 0)} × ${f.num(bp / 10000, 4)} = **${f.money(fee, CCY)}**.`,
        };
      },
    },
    {
      id: 'pct-change-or-price',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const p0 = M.amt(r.int(500, 50000) / 100);
        const mv = r.float(-35, 60, 0.5);
        const p1 = f.round(p0 * (1 + mv / 100), 2);
        if (r.bool()) {
          const ch = f.round((p1 / p0 - 1) * 100, 2);
          return {
            prompt: `A share closes at **${f.money(p0, CCY)}** on Monday and **${f.money(p1, CCY)}** on Friday. What is the percentage change over the week? (answer in %, 2 dp)`,
            answer: ch, dp: 2, tol: { abs: 0.01 }, unit: '%',
            hints: ['Percentage change = (new − old) / old.', `New − old = ${f.num(p1, 2)} − ${f.num(p0, 2)} = ${f.num(p1 - p0, 2)}.`, 'Divide by the old price and multiply by 100.'],
            solution: `(${f.num(p1, 2)} − ${f.num(p0, 2)}) / ${f.num(p0, 2)} = ${f.num((p1 - p0) / p0, 4)}, i.e. **${f.num(ch, 2)}%**.`,
          };
        }
        const fac = 1 + mv / 100;
        return {
          prompt: `A share is at **${f.money(p0, CCY)}**. It then moves by **${mv > 0 ? '+' : ''}${f.num(mv, 1)}%**. What is the new price? (${CCY}, 2 dp)`,
          answer: p1, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: [`Turn the move into a factor: 1 + (${f.num(mv, 1)}/100) = ${f.num(fac, 4)}.`, 'Multiply the old price by that factor.'],
          solution: `Factor = ${f.num(fac, 4)}. New price = ${f.num(p0, 2)} × ${f.num(fac, 4)} = **${f.money(p1, CCY)}**.`,
        };
      },
    },
    {
      id: 'chained-moves',
      template: 'numeric',
      generate(r, f) {
        const n = r.pick([2, 3]);
        const moves = [];
        while (moves.length < n) { const m = r.int(-30, 40); if (m !== 0) moves.push(m); }
        const facs = moves.map((m) => 1 + m / 100);
        const total = f.round((facs.reduce((a, b) => a * b, 1) - 1) * 100, 2);
        const txt = moves.map((m) => (m > 0 ? '+' : '') + m + '%').join(', then ');
        return {
          prompt: `A fund returns **${txt}** in successive periods. What is the total percentage change over the whole time? (answer in %, 2 dp)`,
          answer: total, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: ['Do not add the percentages. Convert each move to a factor $(1 + r)$.', `Factors: ${facs.map((x) => f.num(x, 2)).join(' × ')}.`, 'Multiply all factors, subtract 1, then multiply by 100.'],
          solution: `${facs.map((x) => f.num(x, 2)).join(' × ')} = ${f.num(facs.reduce((a, b) => a * b, 1), 4)}. Total change = factor − 1 = **${f.num(total, 2)}%**.`,
        };
      },
    },
    {
      id: 'headline-readings',
      template: 'match',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const a = r.pick([1.0, 1.5, 2.0, 2.5, 3.0, 3.5]);
        const d = r.pick([10, 20, 25, 40, 50, 75]);
        const b = f.round(a + d / 100, 2);
        const x = M.amt(r.int(20, 120));
        const fall = r.pick([10, 20, 25, 30, 40]);
        const y = f.round(x * (1 - fall / 100), 2);
        const fee0 = r.pick([1.2, 1.6, 2.0, 2.4]);
        const cut = r.pick([0.2, 0.3, 0.4]);
        const fee1 = f.round(fee0 - cut, 2);
        const rel = f.round(cut / fee0 * 100, 1);
        const rate0 = r.pick([2.5, 3.0, 3.5, 4.0]);
        const cbp = r.pick([25, 50]);
        const rate1 = f.round(rate0 - cbp / 100, 2);
        const H = M.amt(r.pick([20, 30, 40, 60]) * 1000);
        const T = M.amt(r.pick([200, 250, 400]) * 1000);
        const kinds = [
          [`The 10-year yield rises from ${f.num(a, 2)}% to ${f.num(b, 2)}%`, `Up ${d} bp, i.e. ${f.num(d / 100, 2)} percentage points`],
          [`A share falls from ${CCY} ${f.num(x, 2)} to ${CCY} ${f.num(y, 2)}`, `A ${fall}% drop in price (percentage change)`],
          [`A fund cuts its fee from ${f.num(fee0, 2)}% to ${f.num(fee1, 2)}%`, `Down ${f.num(cut * 100, 0)} bp, a relative cut of ${f.num(rel, 1)}%`],
          [`A central bank at ${f.num(rate0, 2)}% cuts by ${cbp} bp`, `New policy rate of ${f.num(rate1, 2)}%`],
          [`A ${CCY} ${f.num(H, 0)} holding in a ${CCY} ${f.num(T, 0)} portfolio`, `A weight of ${f.num(H / T * 100, 1)}% of the portfolio`],
        ];
        const k = r.int(4, 5);
        const chosen = r.sample(kinds, k);
        return {
          prompt: 'Match each headline with its correct reading.',
          pairs: chosen,
          hints: ['A change in a rate or yield is a difference: 100 bp = 1 percentage point.', 'A change in a price is relative to the old price.'],
          solution: 'Yield and rate moves are read as differences in bp or percentage points. Price moves are relative changes against the old price. A weight is part ÷ total.',
        };
      },
    },
    {
      id: 'fee-statement',
      template: 'cloze',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const V = M.amt(r.int(2, 40) * 25000);
        const bp = r.int(2, 24) * 5;
        const up = r.pick([5, 10, 15, 20]);
        const fee = f.round(V * bp / 10000, 2);
        return {
          prompt: 'Complete the fee statement.',
          text: `A client holds ${f.money(V, CCY, 0)}. The manager charges ${bp} bp a year. As a percentage that is [[0]] %, as a decimal [[1]], and the annual fee is [[2]] ${CCY}. If the fee rises by ${up} bp the new fee is [[3]] bp, and a move quoted in bp is also called a change in [[4]].`,
          blanks: [
            { numeric: { answer: f.round(bp / 100, 2), dp: 2, tol: { abs: 0.005 } } },
            { numeric: { answer: f.round(bp / 10000, 4), dp: 4, tol: { abs: 0.00005 } } },
            { numeric: { answer: fee, dp: 2, tol: { abs: 0.01 } } },
            { numeric: { answer: bp + up, dp: 0, tol: { abs: 0.5 } } },
            { accept: ['basis points', 'basis point', 'bp'] },
          ],
          bank: r.shuffle(['basis points', 'percentage points', 'per mille', 'decimals']),
          hints: ['Divide bp by 100 for per cent and by 10,000 for the decimal.', 'Fee = amount × decimal.'],
        };
      },
    },
  ],
});
