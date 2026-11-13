/* Q1.7 Sequences: arithmetic and geometric */
SA.unit({
  id: 'Q1.7',
  lesson: [
    {
      md: String.raw`## Sequences and their notation

A **sequence** is a list of numbers, called terms, written in a specific order. A savings plan may pay in EUR 100 in month 1, EUR 110 in month 2 and EUR 120 in month 3. A share may pay a dividend of EUR 2.00 this year, EUR 2.10 next year and EUR 2.205 the year after. Each term has a position, or index, $n = 1, 2, 3, \ldots$

The terms are written $a_1, a_2, a_3, \ldots$ and the general term $a_n$ is the $n$-th term.

A sequence can be defined in two ways.

- An **explicit** (closed-form) formula gives $a_n$ directly from $n$. For example $a_n = 3n + 1$ gives 4, 7, 10, 13, …
- A **recursive** formula gives each term from the previous term or terms and states the first term. For example $a_1 = 4$ and $a_n = a_{n-1} + 3$ gives the same list.

Two patterns cover most financial sequences. In 100, 110, 120, 130, … the **difference** between terms is constant. In 2.00, 2.10, 2.205, … the **ratio** between terms is constant. These are the discrete counterparts of the linear and exponential functions of Q1.4 and Q1.5.

> [!recall] Q1.5
> A table with constant differences is linear and one with constant ratios is exponential. A sequence reads such a table one index at a time.`,
    },
    {
      md: String.raw`## Arithmetic sequences

An **arithmetic sequence** has a constant difference $d$ between consecutive terms, called the common difference. The recursive formula is $a_n = a_{n-1} + d$. To go from term 1 to term $n$ takes $n - 1$ steps of size $d$, so the explicit formula is

$$a_n = a_1 + (n - 1)\,d$$

Term 1 is the starting point with no step taken, and term 2 is one step in.

> [!example]
> The savings plan has $a_1 = 100$ and $d = 10$.
> The 12th instalment is $a_{12} = 100 + 11 \times 10 =$ **EUR 210**.
> From month 1 to month 12 there are 11 steps.

The difference can be found from any two terms: $d = \dfrac{a_j - a_i}{j - i}$. This is the slope formula from Q1.4.

The explicit formula also finds the number of terms. A plan that starts at EUR 100 and rises by EUR 10 reaches EUR 300 when $100 + (n-1)\times 10 = 300$, so $n = 21$.`,
      check: {
        template: 'mcq',
        prompt: 'An arithmetic sequence has $a_1 = 30$ and $d = 5$. What is $a_{10}$?',
        choices: ['75', '80', '50', '300'],
        answer: 0,
        solution: '$a_{10} = 30 + 9 \\times 5 = 75$. There are 9 steps from term 1 to term 10.',
      },
    },
    {
      md: String.raw`## Geometric sequences

A **geometric sequence** has a constant ratio $q$ between consecutive terms, called the common ratio. It is found by dividing any term by the previous one. The recursive formula is $a_n = q\,a_{n-1}$. After $n - 1$ steps the first term has been multiplied $n - 1$ times, so

$$a_n = a_1 \times q^{\,n-1}$$

For growth of $g$ per period $q = 1 + g$ (Q1.5), and for a decline of $d$ the ratio is $q = 1 - d$.

> [!example]
> A dividend of EUR 2.00 growing 5% a year has $q = 1.05$, and year 1 pays EUR 2.00.
> Year 5: $a_5 = 2.00 \times 1.05^{4} = 2.00 \times 1.21551 =$ **EUR 2.43**.
> From year 1 to year 5 there are 4 steps.

The ratio can be found from two terms. Since $a_j / a_i = q^{\,j-i}$, the ratio is $q = (a_j/a_i)^{1/(j-i)}$, a root as in Q1.3.

The position of the term that reaches a target is found by solving $a_1 q^{n-1} = T$ with logarithms (Q1.6). For the dividend to double, $1.05^{n-1} = 2$, so $n - 1 = \ln 2/\ln 1.05 = 14.2$ years.

> [!recall] Q1.6
> When the unknown is the index $n$ in an exponent, take logarithms of both sides.`,
    },
    {
      md: String.raw`## Identifying the type of sequence

Two tests apply to any list.

1. If the differences between neighbours are constant, the sequence is arithmetic.
2. If the ratios between neighbours are constant, the sequence is geometric.
3. If neither holds, it is neither.

| Series | Differences | Ratios | Type |
|---|---|---|---|
| 5, 8, 11, 14 | 3, 3, 3 | 1.6, 1.375, 1.27 | arithmetic |
| 5, 10, 20, 40 | 5, 10, 20 | 2, 2, 2 | geometric |
| 5, 6, 8, 11 | 1, 2, 3 | 1.2, 1.33, 1.375 | neither |
| 100, 110, 100, 110 | +10, -10, +10 | 1.1, 0.909, 1.1 | neither |

> [!warning]
> "Increases by 10" can mean +10 (arithmetic) or +10% (geometric). The unit should always be written: "EUR 10" or "10%".

A flat fee that rises by a fixed amount each year is arithmetic. A balance earning a fixed percentage, or a fee charged as a percentage of a declining balance, is geometric.`,
    },
    {
      md: String.raw`## Worked problems

Problems on sequences usually give two terms and ask for another term or a parameter. The steps are the same for each: write the formula, substitute the known terms, solve for the unknown.

> [!example]
> An arithmetic sequence has $a_3 = 17$ and $a_8 = 42$.
> Difference: $d = (42 - 17)/(8 - 3) = 5$.
> First term: $a_1 = a_3 - 2d = 17 - 10 = 7$.
> Twentieth term: $a_{20} = 7 + 19 \times 5 =$ **102**.

> [!example]
> A geometric sequence has $a_2 = 300$ and $a_5 = 2{,}400$.
> Ratio: $q^3 = 2{,}400/300 = 8$, so $q = 2$.
> First term: $a_1 = 300/2 = 150$.
> Seventh term: $a_7 = 150 \times 2^{6} =$ **9,600**.

An annual fee of EUR 50 that rises by EUR 5 each year is arithmetic and the fee in year 10 is $50 + 9 \times 5 =$ EUR 95. A fee of EUR 50 that rises by 5% each year is geometric and the fee in year 10 is $50 \times 1.05^{9} =$ EUR 77.57.`,
    },
    {
      md: String.raw`## Summary

- A sequence is an ordered list $a_1, a_2, \ldots$ defined by an explicit formula for $a_n$ or by a recursive rule with a stated first term.
- Arithmetic: constant difference $d$ and $a_n = a_1 + (n-1)d$. It is a linear function evaluated at whole numbers.
- Geometric: constant ratio $q$ and $a_n = a_1 q^{n-1}$. It is an exponential function evaluated at whole numbers.
- From the first term to the $n$-th there are $n - 1$ steps.
- Find $d$ by subtracting and dividing, find $q$ by dividing and taking a root, and find $n$ with logarithms.`,
    },
  ],

  exercises: [
    {
      id: 'arith-nth-term',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        let a1, d, n, v;
        do {
          a1 = M.amt(r.int(4, 100) * 5);
          d = M.amt(r.pick([-20, -10, -5, 5, 10, 15, 20, 25, 30, 40, 50]));
          n = r.int(5, 60);
          v = a1 + (n - 1) * d;
        } while (v < M.amt(10));
        const who = r.pick(['An investor raises her monthly contribution', 'A fund manager raises a fixed monthly fee', 'A client changes a standing order']);
        return {
          prompt: `${who}: the first amount is **${CCY} ${a1}**, and each month it ${d > 0 ? 'rises' : 'falls'} by **${CCY} ${Math.abs(d)}**. What is the amount in month **${n}**? (${CCY})`,
          answer: v, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: ['This is arithmetic: the same amount is added every month.', `Between month 1 and month ${n} there are ${n - 1} steps.`, `$a_n = ${a1} + ${n - 1} \\times (${d})$`],
          solution: `$a_{${n}} = a_1 + (n-1)d = ${a1} + ${n - 1} \\times (${d}) = ${a1} ${d * (n - 1) < 0 ? '−' : '+'} ${Math.abs(d * (n - 1))}$ = **${CCY} ${f.num(v, 2)}**`,
        };
      },
    },
    {
      id: 'geom-nth-term',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const a1 = M.amt(r.int(100, 20000) / 100);
        const ratePct = r.float(1, 15, 0.5);
        const n = r.int(3, 30);
        const v = f.round(a1 * Math.pow(1 + ratePct / 100, n - 1), 2);
        const what = r.pick(['A dividend', 'A coupon-linked payment', 'An annual management charge']);
        return {
          prompt: `${what} is **${f.money(a1, CCY)}** in year 1 and grows by **${f.num(ratePct, 1)}%** every year. What is it in year **${n}**? (${CCY}, 2 dp)`,
          answer: v, dp: 2, tol: { abs: 0.02 }, unit: CCY,
          hints: [`The ratio is $q = 1 + ${f.num(ratePct / 100, 3)} = ${f.num(1 + ratePct / 100, 3)}$.`, `From year 1 to year ${n} there are ${n - 1} steps, so the exponent is ${n - 1}.`, `$a_n = ${f.num(a1, 2)} \\times ${f.num(1 + ratePct / 100, 3)}^{${n - 1}}$`],
          solution: `$a_{${n}} = a_1 q^{n-1} = ${f.num(a1, 2)} \\times ${f.num(1 + ratePct / 100, 3)}^{${n - 1}} = ${f.num(a1, 2)} \\times ${f.num(Math.pow(1 + ratePct / 100, n - 1), 5)}$ = **${f.money(v, CCY)}**`,
        };
      },
    },
    {
      id: 'classify-sequences',
      template: 'bucket',
      generate(r, f) {
        const show = (arr) => arr.map((x) => f.num(x, 2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')).join(', ');
        const items = [];
        const nNeither = r.int(1, 2), nArith = r.int(2, 3);
        const nGeo = 8 - nNeither - nArith;
        for (let i = 0; i < nArith; i++) {
          const a = r.int(2, 40) * 5, d = r.pick([-5, 3, 4, 6, 7, 10, 12, 15]);
          items.push({ text: show([0, 1, 2, 3, 4].map((k) => a + d * k + (d < 0 ? 40 : 0))), bucket: 0 });
        }
        for (let i = 0; i < nGeo; i++) {
          const a = r.pick([4, 5, 8, 10, 20, 50, 100, 200]), q = r.pick([1.1, 1.2, 1.5, 2, 3, 0.5, 0.9]);
          items.push({ text: show([0, 1, 2, 3, 4].map((k) => a * Math.pow(q, k))), bucket: 1 });
        }
        for (let i = 0; i < nNeither; i++) {
          const a = r.int(1, 10), type = r.pick(['quad', 'alt']);
          if (type === 'quad') { const s = r.pick([1, 2, 3]); items.push({ text: show([0, 1, 2, 3, 4].map((k) => a + s * k * k)), bucket: 2 }); }
          else { const u = r.pick([5, 10, 20]), w = r.pick([2, 3]); items.push({ text: show([a * 10, a * 10 + u, a * 10 + u + w * u, a * 10 + 2 * u + w * u, a * 10 + 2 * u + 2 * w * u]), bucket: 2 }); }
        }
        const seen = new Set();
        const uniq = items.filter((it) => (seen.has(it.text) ? false : (seen.add(it.text), true)));
        return {
          prompt: 'Classify each series: **arithmetic** (constant difference), **geometric** (constant ratio) or **neither**.',
          buckets: ['Arithmetic', 'Geometric', 'Neither'],
          items: r.shuffle(uniq),
          hints: ['Subtract neighbours: are all differences equal?', 'Divide neighbours: are all ratios equal?'],
          solution: 'Equal differences mean arithmetic, equal ratios mean geometric. Series whose differences themselves grow steadily, or alternate, are neither.',
        };
      },
    },
    {
      id: 'find-ratio-or-difference',
      template: 'numeric',
      generate(r, f) {
        const i = r.int(1, 4), j = i + r.int(2, 5);
        if (r.bool()) {
          const d = r.int(-12, 30) / 2 || 2.5, a1 = r.int(10, 60) * 5;
          const ai = a1 + (i - 1) * d, aj = a1 + (j - 1) * d;
          return {
            prompt: `An arithmetic sequence has $a_{${i}} = ${f.num(ai, 2)}$ and $a_{${j}} = ${f.num(aj, 2)}$. What is the common difference $d$? (2 dp)`,
            answer: d, dp: 2, tol: { abs: 0.01 }, unit: '',
            hints: [`From term ${i} to term ${j} there are ${j - i} steps.`, `The total change is ${f.num(aj, 2)} − ${f.num(ai, 2)} = ${f.num(aj - ai, 2)}.`, 'Divide the total change by the number of steps.'],
            solution: `$d = (a_{${j}} - a_{${i}})/(${j} - ${i}) = ${f.num(aj - ai, 2)}/${j - i}$ = **${f.num(d, 2)}**`,
          };
        }
        const q = r.pick([1.05, 1.1, 1.2, 1.25, 1.5, 2, 0.9, 0.8, 0.5]), a1 = r.int(2, 20) * 50;
        const ai = f.round(a1 * Math.pow(q, i - 1), 2), aj = f.round(a1 * Math.pow(q, j - 1), 2);
        return {
          prompt: `A geometric sequence has $a_{${i}} = ${f.num(ai, 2)}$ and $a_{${j}} = ${f.num(aj, 2)}$. What is the common ratio $q$? (3 dp)`,
          answer: q, dp: 3, tol: { abs: 0.003 }, unit: '',
          hints: [`From term ${i} to term ${j} the ratio is applied ${j - i} times: $q^{${j - i}} = a_{${j}}/a_{${i}}$.`, `$a_{${j}}/a_{${i}} = ${f.num(aj / ai, 5)}$.`, `Take the ${j - i}-th root: type ${f.num(aj / ai, 5)} ^ ( 1 / ${j - i} ).`],
          solution: `$q^{${j - i}} = ${f.num(aj, 2)}/${f.num(ai, 2)} = ${f.num(aj / ai, 5)}$, so $q = ${f.num(aj / ai, 5)}^{1/${j - i}}$ = **${f.num(q, 3)}**`,
        };
      },
    },
    {
      id: 'complete-table',
      template: 'table',
      generate(r, f) {
        const geo = r.bool();
        const a1 = geo ? r.pick([100, 200, 400, 500, 800]) : r.int(2, 20) * 10;
        const step = geo ? r.pick([1.1, 1.2, 1.5, 2, 0.5, 0.9]) : r.pick([-10, 5, 10, 15, 20, 25]);
        const val = (k) => (geo ? a1 * Math.pow(step, k) : a1 + step * k + (step < 0 ? 100 : 0));
        const rows = [];
        const blankA = [2, 4, 6, 7];
        const blankC = [1, 2];
        for (let k = 0; k < 8; k++) {
          const v = f.round(val(k), 2);
          const chg = k === 0 ? '-' : geo ? f.round(val(k) / val(k - 1), 4) : f.round(val(k) - val(k - 1), 2);
          const cellA = blankA.includes(k) ? { answer: v, dp: 2, tol: { abs: 0.05 } } : f.num(v, 2);
          const cellC = k === 0 ? chg : blankC.includes(k) ? { answer: chg, dp: geo ? 3 : 2, tol: { abs: 0.002 } } : f.num(chg, geo ? 3 : 2);
          rows.push([k + 1, cellA, cellC]);
        }
        return {
          prompt: `Complete the first 8 terms of this ${geo ? 'sequence (third column: the ratio $a_n/a_{n-1}$, 3 dp)' : 'sequence (third column: the difference $a_n - a_{n-1}$)'}. Fill every blank.`,
          columns: ['n', '$a_n$', geo ? '$a_n / a_{n-1}$' : '$a_n - a_{n-1}$'],
          rows,
          hints: [geo ? 'The ratio between neighbours is the same all the way down.' : 'The difference between neighbours is the same all the way down.', geo ? 'Multiply the previous term by the ratio to get the next.' : 'Add the difference to the previous term to get the next.'],
          solution: geo
            ? `Ratio $q = ${f.num(step, 3)}$; each term is the previous one times $q$: ${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => f.num(val(k), 2)).join(', ')}.`
            : `Difference $d = ${step}$; each term is the previous one plus $d$: ${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => f.num(val(k), 2)).join(', ')}.`,
        };
      },
    },
    {
      id: 'model-the-situation',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const x = r.int(2, 9) * 5, y = r.int(2, 9) * 5, g = r.pick([3, 4, 5, 6, 8]);
        const X = M.amt(x), Y = M.amt(y), D0 = M.amt(x / 5 + 1), L0 = M.amt(x * 10), DP = M.amt(x * 20);
        const q = 1 + g / 100, w = 1 - g / 100;
        const S = [
          { t: `A custody fee is ${CCY} ${X} in the first quarter and rises by ${CCY} ${Y} every quarter.`, a: 0,
            h: [`List the fee for the first three quarters: quarter 1 is ${CCY} ${X}, and quarter 2 comes from adding ${CCY} ${Y} to it.`, `Quarter 2 is ${CCY} ${f.num(X + Y, 2)}. Work out quarter 3, then compare the gap between consecutive quarters with the ratio between them.`] },
          { t: `A dividend of ${CCY} ${D0} grows ${g}% a year.`, a: 1,
            h: [`List the dividend for the first three years: year 1 is ${CCY} ${D0}, and each later year is the previous one increased by ${g}%.`, `Year 2 is ${CCY} ${f.num(D0, 2)} × ${f.num(q, 2)} = ${CCY} ${f.num(D0 * q, 2)}. Work out year 3, then compare the gaps with the ratios between consecutive years.`] },
          { t: `A loan balance falls ${g}% each year (declining balance).`, a: 1,
            h: [`Take a starting balance of 100. After one year the balance is 100 less ${g}% of 100.`, `Year 1 gives ${f.num(100 * w, 2)}, and year 2 takes ${g}% off that figure, not off 100. Work out year 2, then compare the gaps with the ratios between consecutive years.`] },
          { t: `A savings plan starts at ${CCY} ${L0} and adds ${CCY} ${Y} to the monthly instalment each month.`, a: 0,
            h: [`The instalment is ${CCY} ${L0} in month 1, and each month it is raised by ${CCY} ${Y}. List months 1 to 3.`, `Month 2 is ${CCY} ${f.num(L0 + Y, 2)}. Work out month 3, then compare the gap between consecutive months with the ratio between them.`] },
          { t: `A machine is depreciated by a fixed ${CCY} ${DP} every year (straight line).`, a: 0,
            h: [`The book value is reduced by ${CCY} ${DP} each year. Take a starting value of ${CCY} ${f.num(DP * 10, 0)} and list years 0 to 3.`, `Year 1 is ${CCY} ${f.num(DP * 9, 0)}. Work out years 2 and 3, then compare the gap between consecutive years with the ratio between them.`] },
          { t: `A portfolio earns ${g}% a year with all gains reinvested.`, a: 1,
            h: [`Take a starting value of 100. Each year the value is multiplied by ${f.num(q, 2)}.`, `Year 1 gives ${f.num(100 * q, 2)}. Work out year 2, then compare the gaps with the ratios between consecutive years.`] },
          { t: `Monthly trading volume alternately rises ${g}% and falls ${g}%.`, a: 2,
            h: [`Take a starting volume of 100. Month 2 is a rise of ${g}%, month 3 is a fall of ${g}%, month 4 is a rise again.`, `Month 2 is ${f.num(100 * q, 2)}. Work out months 3 and 4, then check whether the gaps are all equal and whether the ratios are all equal.`] },
          { t: `Each month's fee is the sum of the previous two months' fees.`, a: 2,
            h: [`Start with fees of 1 and 2 in the first two months and apply the rule. Month 3 is 1 + 2 = 3.`, `Work out months 4 and 5, then check whether the gaps are all equal and whether the ratios are all equal.`] },
        ];
        const s = r.pick(S);
        return {
          prompt: `Which kind of sequence models this situation?\n\n${s.t}`,
          choices: ['Arithmetic (constant difference)', 'Geometric (constant ratio)', 'Neither'],
          answer: s.a,
          fixedOrder: true,
          hints: s.h,
          solution: `${['Arithmetic: a fixed amount is added each period.', 'Geometric: a fixed percentage multiplies each period.', 'Neither: no constant difference and no constant ratio.'][s.a]}`,
        };
      },
    },
  ],
});
