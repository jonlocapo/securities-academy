/* Q1.8 Series, sigma notation and a mixed drill round */
SA.unit({
  id: 'Q1.8',
  lesson: [
    {
      md: String.raw`## Series and sigma notation

The sum of the terms of a sequence is called a **series**. A pension fund promised EUR 1 at the end of each of the next five years values each payment today at a discount. At 5% a year the payment in year $k$ is worth $1.05^{-k}$, and the total is

$$1.05^{-1} + 1.05^{-2} + 1.05^{-3} + 1.05^{-4} + 1.05^{-5}$$

Five terms can be written out, but 360 monthly mortgage payments cannot. **Summation notation** uses the capital Greek letter sigma, $\Sigma$, to mean "add up".

$$\sum_{k=1}^{4} (2k + 1)$$

This reads: for $k$ from 1 to 4, add the quantity $2k + 1$. Below the sigma is the index and its starting value, above it is the last value, and to the right is the term as a formula in $k$. To expand, substitute each value of $k$ and add.

> [!example]
> $\sum_{k=1}^{4} (2k+1) = 3 + 5 + 7 + 9 =$ **24**.
> $\sum_{k=1}^{3} k^2 = 1 + 4 + 9 = 14$.
> $\sum_{k=0}^{3} 2^k = 1 + 2 + 4 + 8 = 15$, a sum that starts at $k = 0$.

The number of terms is upper limit minus lower limit plus 1. A **partial sum** $S_n$ is the sum of the first $n$ terms.

> [!recall] Q1.7
> The terms $1.05^{-1}, 1.05^{-2}, \ldots$ form a geometric sequence with ratio $1/1.05$. The series is their sum.`,
      check: {
        template: 'mcq',
        prompt: 'How many terms does $\\sum_{k=2}^{7} 5k$ contain?',
        choices: ['6', '7', '5', '2'],
        answer: 0,
        solution: 'Upper limit minus lower limit plus 1 is 7 - 2 + 1 = 6 terms (k = 2, 3, 4, 5, 6, 7).',
      },
    },
    {
      md: String.raw`## Arithmetic series

The sum of the terms of an arithmetic sequence is an **arithmetic series**. Pairing the first term with the last, the second with the second last and so on gives pairs with the same total, so

$$S_n = \frac{n\,(a_1 + a_n)}{2}$$

The sum is the number of terms times the average of the first and last terms.

> [!example]
> A plan pays EUR 100 in month 1 and rises by EUR 10 each month.
> The 12th payment is $a_{12} = 210$.
> Total over 12 months: $S_{12} = 12 \times (100 + 210)/2 =$ **EUR 1,860**.

When the last term is not known, it is found first with $a_n = a_1 + (n-1)d$ (Q1.7).`,
    },
    {
      md: String.raw`## The finite geometric sum

Multiplying a geometric sum by the ratio shifts every term one place along, so most terms cancel on subtraction. Let $S = a + aq + aq^2 + \cdots + aq^{n-1}$.

1. Multiply by $q$: $qS = aq + aq^2 + \cdots + aq^{n-1} + aq^{n}$.
2. Subtract: $S - qS = a - aq^{n}$, because the middle terms cancel.
3. Factor both sides: $S(1 - q) = a(1 - q^{n})$.
4. Divide by $1 - q$, which requires $q \ne 1$:

$$S_n = a\,\frac{1 - q^{\,n}}{1 - q}$$

> [!example]
> $1 + 2 + 4 + 8 + 16$ has $a = 1$, $q = 2$ and $n = 5$.
> $S = 1 \times (1 - 2^5)/(1 - 2) = (1 - 32)/(-1) =$ **31**, which matches adding the terms directly.

> [!warning]
> $n$ is the number of terms and $a$ is the first term actually in the sum. For $\sum_{k=1}^{5} 3 \cdot 2^k$ the first term is $3 \cdot 2^1 = 6$, not 3.`,
    },
    {
      md: String.raw`## Infinite sums and convergence

If $|q| < 1$, for example $q = 0.5$, then $q^n$ approaches 0 as $n$ grows. The term $q^n$ drops out of the formula and the sum of infinitely many terms is

$$S_\infty = \frac{a}{1 - q} \qquad (|q| < 1)$$

For example $1 + \tfrac12 + \tfrac14 + \tfrac18 + \cdots$ never exceeds 2, because each term fills half of the remaining gap to 2. The formula gives $1/(1 - 0.5) = 2$.

| Ratio $q$ | Behaviour | Sum |
|---|---|---|
| 0.5 | terms shrink | converges to $a/0.5 = 2a$ |
| -0.5 | terms shrink and alternate in sign | converges to $a/1.5$ |
| 1 | terms do not shrink | diverges |
| 1.1 | terms grow | diverges |

> [!warning]
> The formula $a/(1-q)$ does not apply when $q \ge 1$ or $q \le -1$. With $q = 1.1$ it would give a negative number for a sum of growing positive terms. Such a series has no finite sum.`,
    },
    {
      md: String.raw`## Worked example: a stream of payments

An **annuity** is a series of regular payments. For the pension above the value today is $\sum_{k=1}^{5} 1.05^{-k}$.

- First term $a = 1.05^{-1} = 0.95238$.
- Ratio $q = 1/1.05 = 0.95238$.
- Number of terms $n = 5$.

Using $S = a(1 - q^n)/(1 - q)$ and $1 - q = 0.05/1.05$:

$$S = \frac{(1/1.05)\,\bigl(1 - 1.05^{-5}\bigr)}{0.05/1.05} = \frac{1 - 1.05^{-5}}{0.05}$$

With $1.05^{-5} = 0.783526$, $S = (1 - 0.783526)/0.05 = 0.216474/0.05 =$ **4.3295**.

EUR 1 a year for 5 years at 5% is worth **EUR 4.3295** today. This is less than EUR 5 because later payments are discounted. F1 names this sum an *annuity factor*.

For payments that continue indefinitely, $S_\infty = a/(1 - q) = 1/0.05 =$ **20**. EUR 1 a year for ever at 5% is worth EUR 20, a *perpetuity* in F1.

> [!eu]
> Euro-area mortgage and bond calculations use this sum with the periodic rate, which is the annual rate divided by 12 for monthly payments.`,
    },
    {
      md: String.raw`## Mixed round: choosing the tool

The tools in this module combine, and most questions use one of them or a chain of them.

| Question | Tool | Unit |
|---|---|---|
| A fee of 45 bp on EUR 80,000 | bp to decimal, then multiply | Q1.1 |
| Value after 8 years at 4% | $a\,b^t$ | Q1.5 |
| Years to double | $t = \ln 2/\ln(1+r)$ | Q1.6 |
| The 12th instalment | $a_1 + (n-1)d$ or $a_1 q^{n-1}$ | Q1.7 |
| The total of the instalments | sigma notation, arithmetic or geometric sum | Q1.8 |

> [!recall] Q1.1
> Rates are converted to decimals first: 45 bp is 0.0045 and 4% is 0.04.

> [!recall] Q1.5
> A growth rate becomes a factor, $1 + r$.

> [!recall] Q1.6
> When the unknown is in an exponent, take logarithms.

> [!tip]
> In a mixed problem, write down what is known with units, identify the tool the unknown calls for and compute step by step. Keep four extra decimals until the final step.`,
    },
    {
      md: String.raw`## Summary

- $\sum_{k=a}^{b} f(k)$ means adding $f(k)$ for each whole $k$ from $a$ to $b$, which gives $b - a + 1$ terms.
- Arithmetic series: $S_n = n(a_1 + a_n)/2$. Finite geometric series: $S_n = a(1 - q^n)/(1 - q)$, with $a$ the first term in the sum and $n$ the number of terms.
- Infinite geometric series: $a/(1 - q)$ only when $|q| < 1$. Otherwise there is no finite sum.
- $\sum_{k=1}^{n} (1+r)^{-k} = (1 - (1+r)^{-n})/r$ is the value of EUR 1 a year, and it tends to $1/r$ for a stream without end.
- The module's tools are percentages and bp (Q1.1), equations (Q1.2), powers (Q1.3), functions (Q1.4), exponentials (Q1.5), logarithms (Q1.6) and sequences (Q1.7).`,
    },
  ],

  exercises: [
    {
      id: 'expand-sigma',
      template: 'numeric',
      generate(r, f) {
        const N = r.int(3, 8);
        const kind = r.pick(['lin', 'sq', 'pow', 'sqc']);
        let expr, term;
        if (kind === 'lin') { const a = r.int(2, 9), b = r.int(-5, 9); expr = `${a}k ${b < 0 ? '-' : '+'} ${Math.abs(b) || 1}`; term = (k) => a * k + (b || (b < 0 ? -1 : 1)) * (b === 0 ? 1 : 1); if (b === 0) { expr = `${a}k + 1`; term = (k) => a * k + 1; } else { term = (k) => a * k + b; } }
        else if (kind === 'sq') { expr = 'k^2'; term = (k) => k * k; }
        else if (kind === 'sqc') { const c = r.int(1, 5); expr = `k^2 + ${c}`; term = (k) => k * k + c; }
        else { const c = r.pick([2, 3]); expr = `${c}^k`; term = (k) => Math.pow(c, k); }
        const N0 = r.pick([1, 1, 1, 0]);
        const terms = []; for (let k = N0; k <= N; k++) terms.push(term(k));
        const total = terms.reduce((a, b) => a + b, 0);
        return {
          prompt: `Evaluate $\\displaystyle\\sum_{k=${N0}}^{${N}} \\left(${expr}\\right)$.`,
          answer: total, dp: 0, tol: { abs: 0.5 }, unit: '',
          hints: [`Substitute $k = ${N0}, ${N0 + 1}, \\ldots, ${N}$ one at a time. There are ${N - N0 + 1} terms.`, `The terms are: ${terms.join(', ')}.`, 'Add them up.'],
          solution: `Terms: ${terms.join(' + ')} = **${total}**`,
        };
      },
    },
    {
      id: 'geometric-partial-sum',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const a = M.amt(r.int(1, 100) * (r.bool() ? 1 : 10));
        const q = r.pick([0.5, 0.6, 0.8, 0.9, 1.05, 1.1, 1.2]);
        const n = r.int(4, 20);
        const S = a * (1 - Math.pow(q, n)) / (1 - q);
        const qn = Math.pow(q, n);
        return {
          prompt: `A cash-flow series starts at **${CCY} ${a}** and each payment is **${f.num(q, 2)} times** the previous one, for **${n} payments** in total. What is the total of all payments? (${CCY}, 2 dp; 0.1% tolerance)`,
          answer: f.round(S, 2), dp: 2, tol: { rel: 0.001 }, unit: CCY,
          hints: ['This is a finite geometric series: $S_n = a(1-q^n)/(1-q)$.', `Here $a = ${a}$, $q = ${f.num(q, 2)}$ and $n = ${n}$.`, `Compute $q^n = ${f.num(q, 2)}^{${n}} = ${f.num(qn, 5)}$, then $1 - q^n$ and divide by $1 - q = ${f.num(1 - q, 2)}$.`],
          solution: `$q^{${n}} = ${f.num(qn, 5)}$. $S = ${a} \\times (1 - ${f.num(qn, 5)})/(1 - ${f.num(q, 2)}) = ${a} \\times ${f.num(1 - qn, 5)}/${f.num(1 - q, 2)}$ = **${f.money(S, CCY)}**`,
        };
      },
    },
    {
      id: 'infinite-geometric',
      template: 'numeric',
      generate(r, f) {
        const a = r.int(1, 60);
        const q = r.pick([-0.9, -0.8, -0.5, -0.2, 0.2, 0.3, 0.5, 0.6, 0.75, 0.8, 0.9]);
        const conv = true;
        const S = f.round(a / (1 - q), 2);
        return {
          prompt: `The series below converges because $|q| < 1$. Find its sum: $${a} + ${a}(${f.num(q, 2)}) + ${a}(${f.num(q, 2)})^2 + \\cdots$. (2 dp)`,
          answer: S, dp: 2, tol: { abs: 0.01 }, unit: '',
          hints: ['First check the ratio: a finite sum exists only if $|q| < 1$.', conv ? `Here $|q| = ${f.num(Math.abs(q), 2)} < 1$, so use $S = a/(1-q)$.` : `Here $|q| = ${f.num(Math.abs(q), 2)} \\ge 1$, so the terms do not shrink.`],
          solution: conv ? `$|q| < 1$, so $S = a/(1-q) = ${a}/(1 - ${f.num(q, 2)}) = ${a}/${f.num(1 - q, 2)}$ = **${f.num(S, 2)}**` : `$|q| = ${f.num(Math.abs(q), 2)} \\ge 1$: the terms do not shrink to zero, so the series diverges. Answer: **0**.`,
        };
      },
    },
    {
      id: 'write-in-sigma',
      template: 'mcq',
      generate(r, f) {
        const kind = r.pick(['A', 'B', 'C', 'D']);
        const N = r.int(4, 7);
        let listing, ok, bad, hs;
        if (kind === 'A') {
          const c = r.int(2, 9);
          hs = [`Compare the first terms ${c}, ${2 * c}, ${3 * c} with their positions 1, 2, 3. Describe what is done to the position number $k$ to get each term.`, `Test an option by putting $k = 1$ and $k = 2$ into its expression: you should get ${c} and ${2 * c}. Then put in the last index and check that the final term is ${N * c}.`];
          listing = `${c} + ${2 * c} + ${3 * c} + \\cdots + ${N * c}`;
          ok = `\\sum_{k=1}^{${N}} ${c}k`;
          bad = [`\\sum_{k=1}^{${N}} ${c}^k`, `\\sum_{k=1}^{${N - 1}} ${c}k`, `\\sum_{k=1}^{${N}} (k + ${c})`];
        } else if (kind === 'B') {
          const c = r.pick([2, 3]);
          hs = [`Compare the terms ${c}, ${c * c}, ${c * c * c} with their positions 1, 2, 3. Ask whether position $k$ appears as a multiplier or as an exponent.`, `Test an option by putting $k = 1$ and $k = 2$ into its expression: you should get ${c} and ${c * c}. Then check that the last term, ${Math.pow(c, N)}, comes from the last index, and that the first index gives ${c} and not 1.`];
          listing = `${c} + ${c * c} + ${c * c * c} + \\cdots + ${Math.pow(c, N)}`;
          ok = `\\sum_{k=1}^{${N}} ${c}^k`;
          bad = [`\\sum_{k=1}^{${N}} ${c}k`, `\\sum_{k=0}^{${N}} ${c}^k`, `\\sum_{k=1}^{${N}} k^{${c}}`];
        } else if (kind === 'C') {
          const c = r.int(1, 4);
          hs = [`Split each term into two parts: ${1 + c} = 1 + ${c}, ${4 + c} = 4 + ${c}, ${9 + c} = 9 + ${c}. Find the rule for 1, 4, 9 in terms of the position $k$, and the part that stays at ${c}.`, `Test an option by putting $k = 1$ and $k = 2$ into its expression: you should get ${1 + c} and ${4 + c}. Then check that the last term, ${N * N + c}, comes from the last index and that the number of terms is ${N}.`];
          listing = `${1 + c} + ${4 + c} + ${9 + c} + \\cdots + ${N * N + c}`;
          ok = `\\sum_{k=1}^{${N}} (k^2 + ${c})`;
          bad = [`\\sum_{k=1}^{${N}} (2k + ${c})`, `\\sum_{k=0}^{${N - 1}} (k^2 + ${c})`, `\\sum_{k=1}^{${N}} (k + ${c})^2`];
        } else {
          const y = r.pick([1.03, 1.04, 1.05, 1.06]);
          hs = [`The terms are ${y} raised to the powers -1, -2 and so on up to -${N}. Find how the exponent depends on the position $k$, including its sign.`, `Test an option by putting $k = 1$ into its expression: you should get $${y}^{-1}$. Then check that the last index gives $${y}^{-${N}}$ and that the number of terms is ${N}.`];
          listing = `${y}^{-1} + ${y}^{-2} + \\cdots + ${y}^{-${N}}`;
          ok = `\\sum_{k=1}^{${N}} ${y}^{-k}`;
          bad = [`\\sum_{k=0}^{${N - 1}} ${y}^{-k}`, `\\sum_{k=1}^{${N}} ${y}^{k}`, `\\sum_{k=1}^{${N}} \\dfrac{1}{${y}\\,k}`];
        }
        const all = r.shuffle([ok, ...bad]);
        return {
          prompt: `Which sigma expression equals $${listing}$?`,
          choices: all.map((s) => `$${s}$`),
          answer: all.indexOf(ok),
          fixedOrder: true,
          hints: hs,
          solution: `The $k$-th term and the range both have to match: $${ok}$.`,
        };
      },
    },
    {
      id: 'mixed-round',
      template: 'table',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const V = M.amt(r.int(5, 40) * 10000);
        const bp = r.int(2, 12) * 5;
        const gPct = r.pick([3, 4, 5, 6, 8]);
        const g = gPct / 100;
        const t = r.pick([5, 8, 10, 12]);
        const n = r.pick([5, 6, 8, 10]);
        const a1 = M.amt(r.int(2, 10) * 100), d = M.amt(r.pick([20, 25, 30, 50]));
        const fee = f.round(V * bp / 10000, 2);
        const val = f.round(V * Math.pow(1 + g, t), 2);
        const dbl = f.round(Math.log(2) / Math.log(1 + g), 2);
        const ann = f.round((1 - Math.pow(1 + g, -n)) / g, 4);
        const perp = f.round(1 / g, 2);
        const contrib = 6 * a1 + 15 * d;
        return {
          prompt: `An investor holds **${f.money(V, CCY, 0)}** that grows at **${gPct}%** a year, and pays an annual fee of **${bp} bp**. She also plans ${f.money(a1, CCY, 0)} in year 1 of savings, raising it by ${f.money(d, CCY, 0)} each year. Fill in the six results.`,
          columns: ['Quantity', 'Method', 'Result'],
          rows: [
            [`Annual fee (${CCY})`, `${bp} bp as a decimal × value`, { answer: fee, dp: 2, tol: { abs: 0.01 } }],
            [`Value after ${t} years (${CCY})`, `$V(1+g)^{${t}}$`, { answer: val, dp: 2, tol: { abs: 0.05 } }],
            ['Years to double', '$\\ln 2 / \\ln(1+g)$', { answer: dbl, dp: 2, tol: { abs: 0.02 } }],
            [`Savings in the first 6 years (${CCY})`, `$\\sum_{k=1}^{6} (${a1} + (k-1)\\cdot ${d})$`, { answer: contrib, dp: 0, tol: { abs: 0.5 } }],
            [`Value today of ${CCY} 1 a year for ${n} years at ${gPct}%`, `$\\sum_{k=1}^{${n}} (1+g)^{-k}$ (4 dp)`, { answer: ann, dp: 4, tol: { abs: 0.001 } }],
            [`Value today of ${CCY} 1 a year for ever at ${gPct}%`, '$1/g$', { answer: perp, dp: 2, tol: { abs: 0.01 } }],
          ],
          hints: [
            `Work one row at a time and keep extra decimals. Row 1: ${bp} bp is ${f.num(bp / 10000, 4)} as a decimal, to multiply by ${f.num(V, 0)}. Row 2: the growth factor ${f.num(1 + g, 2)} raised to the power ${t} is ${f.num(Math.pow(1 + g, t), 5)}, to multiply by ${f.num(V, 0)}.`,
            `Row 3: use $\\ln 2 = ${f.num(Math.log(2), 4)}$ and $\\ln ${f.num(1 + g, 2)} = ${f.num(Math.log(1 + g), 5)}$, then divide. Row 4: the first payment is ${f.num(a1, 0)} and the sixth is ${f.num(a1, 0)} + 5 × ${f.num(d, 0)} = ${f.num(a1 + 5 * d, 0)}; use $S_n = n(a_1 + a_n)/2$ with $n = 6$.`,
            `Row 5: use $(1 - (1+g)^{-${n}})/g$, where $(1+g)^{-${n}} = ${f.num(Math.pow(1 + g, -n), 5)}$ and $g = ${f.num(g, 2)}$. Row 6: divide 1 by $g = ${f.num(g, 2)}$.`,
          ],
          solution: `Fee ${f.num(fee, 2)}. Value ${f.num(val, 2)}. Doubling ${f.num(dbl, 2)} years. Savings $6a + 15d = ${6 * a1} + ${15 * d} = ${contrib}$. Annuity factor $(1 - ${f.num(Math.pow(1 + g, -n), 5)})/${f.num(g, 2)} = ${f.num(ann, 4)}$. Perpetuity $1/${f.num(g, 2)} = ${f.num(perp, 2)}$.`,
        };
      },
    },
    {
      id: 'spot-series-error',
      template: 'spot',
      generate(r, f) {
        const kind = r.pick(['n', 'first', 'diverge']);
        if (kind === 'n') {
          const a = r.int(1, 9) * 10, q = r.pick([2, 3]), N = r.int(4, 8);
          const good = a * (1 - Math.pow(q, N + 1)) / (1 - q), bad = a * (1 - Math.pow(q, N)) / (1 - q);
          return {
            prompt: 'One line of this solution is wrong. Flag it.',
            doc: [
              { text: `Task: $\\sum_{k=0}^{${N}} ${a}\\cdot ${q}^k$.`, error: false },
              { text: `First term $a = ${a}$ (at $k = 0$), ratio $q = ${q}$, number of terms $n = ${N}$.`, error: true, why: `Counting error: $k = 0$ to $${N}$ has $${N} - 0 + 1 = ${N + 1}$ terms, so $n = ${N + 1}$.` },
              { text: `$S = a(1 - q^n)/(1 - q) = ${a}(1 - ${q}^{${N}})/(1 - ${q})$`, error: false },
              { text: `$S = ${f.num(bad, 0)}$`, error: false },
            ],
          };
        }
        if (kind === 'first') {
          const c = r.int(2, 9) * 10, q = r.pick([0.5, 0.6, 0.8]), N = r.int(4, 8);
          const a = c * q;
          const good = a * (1 - Math.pow(q, N)) / (1 - q), bad = c * (1 - Math.pow(q, N)) / (1 - q);
          return {
            prompt: 'One line of this solution is wrong. Flag it.',
            doc: [
              { text: `Task: $\\sum_{k=1}^{${N}} ${c}\\cdot ${f.num(q, 1)}^k$.`, error: false },
              { text: `First term $a = ${c}$, ratio $q = ${f.num(q, 1)}$, $n = ${N}$ terms.`, error: true, why: `The first term is the $k = 1$ term: $a = ${c} \\times ${f.num(q, 1)}^1 = ${f.num(a, 2)}$, not ${c}.` },
              { text: `$S = a(1 - q^n)/(1 - q) = ${c}(1 - ${f.num(q, 1)}^{${N}})/(1 - ${f.num(q, 1)})$`, error: false },
              { text: `$S = ${f.num(bad, 2)}$`, error: false },
            ],
          };
        }
        const a = r.int(2, 9) * 10, q = r.pick([1.1, 1.2, 1.5, 2]);
        return {
          prompt: 'One line of this solution is wrong. Flag it.',
          doc: [
            { text: `Task: the infinite sum $${a} + ${a}(${q}) + ${a}(${q})^2 + \\cdots$`, error: false },
            { text: `Ratio $q = ${q}$, first term $a = ${a}$.`, error: false },
            { text: `$S = a/(1 - q) = ${a}/(1 - ${q}) = ${f.num(a / (1 - q), 1)}$`, error: true, why: `The formula only works for $|q| < 1$. Here $q = ${q} > 1$: the terms grow, so there is no finite sum (a negative answer for positive terms is absurd).` },
            { text: `So the series adds up to ${f.num(a / (1 - q), 1)}.`, error: false },
          ],
        };
      },
    },
  ],
});
