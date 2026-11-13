/* Q1.6 Logarithms */
SA.unit({
  id: 'Q1.6',
  lesson: [
    {
      md: String.raw`## Logarithms as inverse exponentials

Q1.5 computed the future value of EUR 1,000 by multiplying forwards. The reverse question is how many years it takes, at 4% a year, for money to double. The time $t$ is the unknown in

$$1.04^{\,t} = 2.$$

The unknown sits in the exponent, which ordinary algebra cannot isolate. The **logarithm** is the function that returns the exponent. It is the inverse of the exponential function, as division is the inverse of multiplication.

$$\log_b(x) = y \quad\Longleftrightarrow\quad b^{\,y} = x$$

- $\log_{10}(1{,}000) = 3$ because $10^3 = 1{,}000$.
- $\log_{2}(8) = 3$ because $2^3 = 8$.
- $\log_{10}(0.01) = -2$ because $10^{-2} = 0.01$.

The base $b$ is positive and not equal to 1.`,
    },
    {
      md: String.raw`## Common and natural logarithms

Calculators have two logarithm keys.

- **log** is base 10, the common logarithm: $\log(100) = 2$.
- **ln** is base $e$, the number from Q1.5, and is called the **natural logarithm**. $\ln(e) = 1$.

Each is the inverse of its exponential in both directions:

$$e^{\ln x} = x \qquad \ln(e^x) = x$$

| Value | Meaning |
|---|---|
| $\ln 1 = 0$ | $e^0 = 1$ |
| $\ln 2 = 0.6931$ | $e^{0.6931} = 2$ |
| $\ln 10 = 2.3026$ | $e^{2.3026} = 10$ |
| $\ln 0.5 = -0.6931$ | $e^{-0.6931} = 0.5$ |

The input of a logarithm must be positive. The logarithm of 0 or of a negative number does not exist, so the domain of $\ln x$ is $x > 0$. For inputs between 0 and 1 the logarithm is negative.

> [!recall] Q1.5
> $e^{x}$ and $\ln x$ undo each other. If $e^{0.4} = 1.4918$, then $\ln 1.4918 = 0.4$.`,
      check: {
        template: 'mcq',
        prompt: 'What is $\\log_{10}(10{,}000)$?',
        choices: ['4', '5', '10', '1,000'],
        answer: 0,
        solution: '$10^4 = 10{,}000$, so the logarithm is 4.',
      },
    },
    {
      md: String.raw`## The logarithm rules

A logarithm counts the factors of the base. Multiplying numbers adds the counts, so logarithms turn products into sums.

| Rule | Formula | Example (base 10) |
|---|---|---|
| Product | $\ln(ab) = \ln a + \ln b$ | $\log(200) = \log 2 + \log 100 = 0.301 + 2$ |
| Quotient | $\ln(a/b) = \ln a - \ln b$ | $\log(5) = \log 10 - \log 2 = 1 - 0.301 = 0.699$ |
| Power | $\ln(a^k) = k \ln a$ | $\log(2^{10}) = 10 \times 0.301 = 3.01$ |

The power rule brings an exponent down to the front, which the doubling problem requires.

The **change-of-base** formula converts a logarithm to any other base, so that a calculator with only log and ln keys can evaluate it:

$$\log_b x = \frac{\ln x}{\ln b}$$

For example $\log_2 8 = \ln 8/\ln 2 = 2.0794/0.6931 = 3$.

> [!warning]
> There is no rule for a sum: $\ln(a + b) \ne \ln a + \ln b$. For instance $\ln(2+3) = \ln 5 = 1.609$, while $\ln 2 + \ln 3 = \ln 6 = 1.792$.
> Likewise $\ln(a)/\ln(b) \ne \ln(a/b)$ and $(\ln a)^2 \ne \ln(a^2)$.`,
    },
    {
      md: String.raw`## Solving exponential equations

If both sides of an equation can be written as powers of the same base, the exponents are equal. Otherwise take the logarithm of both sides. To solve $a^t = b$:

1. Take the natural log of both sides: $\ln(a^t) = \ln b$.
2. Apply the power rule: $t \ln a = \ln b$.
3. Divide: $t = \dfrac{\ln b}{\ln a}$.

> [!example]
> Doubling at 4%: $1.04^t = 2$.
> $t = \dfrac{\ln 2}{\ln 1.04} = \dfrac{0.6931}{0.03922} =$ **17.67 years**.
> This is the exact value that the rule of 72 approximates as 18.

With continuous compounding the equation is $e^{rt} = 2$, so $rt = \ln 2$ and $t = 0.6931/r$. At 4% this gives 17.33 years.

The solution should be checked in the original equation: $1.04^{17.67} = 2.00$.

> [!recall] Q1.5
> The rule of 72 estimates what the logarithm gives precisely. The estimate is a useful check on the calculator result.`,
    },
    {
      md: String.raw`## Solving for the rate

If EUR 1,000 grew to EUR 1,800 in 10 years, the yearly factor $g$ solves $1000\,g^{10} = 1800$, so $g^{10} = 1.8$. Two routes give the result.

- Root (Q1.3): $g = 1.8^{1/10} = 1.0605$.
- Logarithm: $\ln g = \ln 1.8 / 10 = 0.5878/10 = 0.05878$, so $g = e^{0.05878} = 1.0605$.

Both give **about 6.05% a year**. The logarithm route replaces a root by a division.

If the unknown is the base, a root solves the equation. If the unknown is the exponent, a logarithm solves it.

> [!tip]
> The same steps give the time to reach any target multiple $M$ at growth rate $r$: $t = \ln M / \ln(1+r)$. Tripling at 5% takes $\ln 3/\ln 1.05 = 22.5$ years.`,
    },
    {
      md: String.raw`## Logarithmic charts

On a linear chart the vertical axis runs 0, 20, 40, 60 and so on. On a **logarithmic** axis equal distances represent equal ratios, so the steps 10 to 20, 20 to 40 and 40 to 80 have the same height.

This follows because $\ln(\text{end}/\text{start})$ depends only on the ratio.

- EUR 10 to EUR 11 (+10%): $\ln 1.10 = 0.0953$.
- EUR 100 to EUR 110 (+10%): $\ln 1.10 = 0.0953$, the same height on the chart.

On a linear chart the second move appears ten times larger although it is the same percentage. For long histories, a linear chart makes recent moves look large and early ones look flat, while a log chart shows percentage changes.

Log returns add. Two successive +10% moves give $\ln 1.10 + \ln 1.10 = 0.1906 = \ln 1.21$, which matches the compound +21% (Q1.1). A straight line on a log chart indicates a constant yearly percentage growth.

> [!tip]
> To compare two assets, compare the slopes on a log chart or the ratios end/start, not the absolute gains.`,
    },
    {
      md: String.raw`## Summary

- $\log_b x = y$ means $b^y = x$. A logarithm is the inverse of an exponential. ln is base $e$ and log is base 10.
- Rules: $\ln(ab) = \ln a + \ln b$, $\ln(a/b) = \ln a - \ln b$ and $\ln(a^k) = k\ln a$. There is no rule for $\ln(a+b)$.
- To solve $a^t = b$, take logarithms: $t = \ln b / \ln a$. Any base works if the same base is used on top and bottom.
- Rate from start, end and time: $g = (\text{end}/\text{start})^{1/t}$, or $\ln g = \ln(\text{end}/\text{start})/t$.
- On a log chart equal heights mean equal percentage moves, and a straight line means a constant growth rate.`,
    },
  ],

  exercises: [
    {
      id: 'years-to-target',
      template: 'numeric',
      generate(r, f) {
        const ratePct = r.float(1, 15, 0.25);
        const M = r.float(1.5, 10, 0.1);
        const t = f.round(Math.log(M) / Math.log(1 + ratePct / 100), 2);
        return {
          prompt: `An investment grows at **${f.num(ratePct, 2)}%** a year. How many years until it is worth **${f.num(M, 1)} times** its starting value? (years, 2 dp; a tolerance of 0.05 is accepted)`,
          answer: t, dp: 2, tol: { abs: 0.05 }, unit: 'years',
          hints: [`Write the equation: $${f.num(1 + ratePct / 100, 4)}^t = ${f.num(M, 1)}$.`, 'Take ln of both sides and use the power rule: $t \\ln(\\text{factor}) = \\ln(\\text{target})$.', `$t = \\ln ${f.num(M, 1)} / \\ln ${f.num(1 + ratePct / 100, 4)}$`],
          solution: `$t = \\ln ${f.num(M, 1)} / \\ln ${f.num(1 + ratePct / 100, 4)} = ${f.num(Math.log(M), 4)} / ${f.num(Math.log(1 + ratePct / 100), 5)}$ = **${f.num(t, 2)} years**`,
        };
      },
    },
    {
      id: 'evaluate-logs',
      template: 'numeric',
      generate(r, f) {
        const mode = r.pick(['log10', 'ln', 'rules']);
        if (mode === 'log10') {
          const x = r.pick([0.1, 0.25, 0.5, 2, 3, 5, 7, 20, 45, 150, 800, 1000]);
          const v = f.round(Math.log10(x), 4);
          return {
            prompt: `Evaluate $\\log_{10}(${f.num(x, x < 1 ? 2 : 0)})$ to 4 decimal places.`,
            answer: v, dp: 4, tol: { abs: 0.001 }, unit: '',
            hints: ['Use the **log** key (base 10) on your calculator.', 'If the number is below 1, expect a negative answer.'],
            solution: `$\\log_{10}(${x}) = ${f.num(v, 4)}$, because $10^{${f.num(v, 4)}} = ${x}$.`,
          };
        }
        if (mode === 'ln') {
          const x = r.pick([0.1, 0.3, 0.75, 1.5, 4, 9, 12, 60, 250, 900]);
          const v = f.round(Math.log(x), 4);
          return {
            prompt: `Evaluate $\\ln(${x})$ to 4 decimal places.`,
            answer: v, dp: 4, tol: { abs: 0.001 }, unit: '',
            hints: ['Use the **ln** key (base $e$), not log.', 'Numbers below 1 give negative logs.'],
            solution: `$\\ln(${x}) = ${f.num(v, 4)}$.`,
          };
        }
        const a = r.int(1, 5), b = r.int(1, 4), c = r.int(0, 3);
        const L2 = 0.6931, L3 = 1.0986, L5 = 1.6094;
        const v = f.round(a * L2 + b * L3 - c * L5, 4);
        const expr = `\\dfrac{2^{${a}} \\times 3^{${b}}}{5^{${c}}}`;
        return {
          prompt: `Given $\\ln 2 = 0.6931$, $\\ln 3 = 1.0986$ and $\\ln 5 = 1.6094$, use the log rules (not the calculator) to find $\\ln\\left(${expr}\\right)$. (4 dp)`,
          answer: v, dp: 4, tol: { abs: 0.002 }, unit: '',
          hints: ['Product becomes a sum, quotient becomes a difference.', 'Power rule: $\\ln(2^a) = a \\ln 2$.', `Compute ${a}(0.6931) + ${b}(1.0986) − ${c}(1.6094).`],
          solution: `$\\ln(${expr}) = ${a}\\ln 2 + ${b}\\ln 3 - ${c}\\ln 5 = ${f.num(a * L2, 4)} + ${f.num(b * L3, 4)} - ${f.num(c * L5, 4)}$ = **${f.num(v, 4)}**`,
        };
      },
    },
    {
      id: 'log-rules-match',
      template: 'match',
      generate(r) {
        const v = r.shuffle(['a', 'b', 'x', 'y', 'z', 'u', 'w', 'q']);
        const k = r.int(2, 9), m = r.int(3, 6);
        const kinds = [
          [`$\\ln(${v[0]}${v[1]})$`, `$\\ln ${v[0]} + \\ln ${v[1]}$`],
          [`$\\ln\\!\\left(\\dfrac{${v[2]}}{${v[3]}}\\right)$`, `$\\ln ${v[2]} - \\ln ${v[3]}$`],
          [`$\\ln(${v[4]}^{${k}})$`, `$${k}\\ln ${v[4]}$`],
          [`$\\ln\\!\\left(\\dfrac{1}{${v[5]}}\\right)$`, `$-\\ln ${v[5]}$`],
          [`$\\ln\\!\\left(\\sqrt[${m}]{${v[6]}}\\right)$`, `$\\dfrac{1}{${m}}\\ln ${v[6]}$`],
          [`$\\ln(e^{${v[7]}})$`, `$${v[7]}$`],
          [`$e^{\\ln ${v[0]}}$`, `$${v[0]}$`],
          [`$\\ln(1)$`, `$0$`],
        ];
        const chosen = r.sample(kinds, r.int(4, 5));
        return {
          prompt: 'Match each expression with its equal.',
          pairs: chosen,
          hints: ['Product to sum, quotient to difference, power to multiplier.', 'ln and $e^x$ undo each other.'],
          solution: 'Product rule: $\\ln(ab) = \\ln a + \\ln b$. Quotient rule: $\\ln(a/b) = \\ln a - \\ln b$. Power rule: $\\ln(a^k) = k \\ln a$. Inverse: $\\ln(e^x) = x$ and $e^{\\ln x} = x$.',
        };
      },
    },
    {
      id: 'rate-from-start-end',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const S = M.amt(r.int(5, 200) * 100);
        const t = r.int(3, 25);
        const g = r.int(10, 150) / 1000 + 1;
        const E = f.round(S * Math.pow(g, t), 0);
        const rate = f.round((Math.pow(E / S, 1 / t) - 1) * 100, 2);
        return {
          prompt: `A portfolio grows from **${f.money(S, CCY, 0)}** to **${f.money(E, CCY, 0)}** in **${t} years** with no deposits or withdrawals. What constant yearly rate does this represent? (answer in %, 2 dp)`,
          answer: rate, dp: 2, tol: { abs: 0.02 }, unit: '%',
          hints: [`Total factor: ${f.num(E, 0)} / ${f.num(S, 0)} = ${f.num(E / S, 5)}.`, `Root route: yearly factor $= ${f.num(E / S, 5)}^{1/${t}}$. Log route: $\\ln g = \\ln(${f.num(E / S, 5)})/${t}$, then $g = e^{\\ln g}$.`, 'Subtract 1 and convert to %.'],
          solution: `Root: $g = ${f.num(E / S, 5)}^{1/${t}} = ${f.num(Math.pow(E / S, 1 / t), 5)}$. Log: $\\ln g = ${f.num(Math.log(E / S), 5)}/${t} = ${f.num(Math.log(E / S) / t, 6)}$, $g = e^{${f.num(Math.log(E / S) / t, 6)}}$, same result. Rate = **${f.num(rate, 2)}%** a year.`,
        };
      },
    },
    {
      id: 'log-chart-reading',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const a0 = M.amt(r.int(5, 40) * 5), b0 = M.amt(r.int(5, 40) * 5);
        let ga, gb;
        do { ga = r.pick([1.2, 1.4, 1.6, 1.8, 2, 2.5, 3, 4]); gb = r.pick([1.2, 1.4, 1.6, 1.8, 2, 2.5, 3, 4]); } while (Math.abs(ga - gb) < 0.2);
        const a1 = f.round(a0 * ga, 0), b1 = f.round(b0 * gb, 0);
        const pa = a1 / a0, pb = b1 / b0;
        const years = r.pick([5, 8, 10]);
        return {
          prompt: `Over the same ${years} years, Asset **A** went from ${CCY} ${a0} to ${CCY} ${a1} and Asset **B** from ${CCY} ${b0} to ${CCY} ${b1}. Both are drawn on a **log-scale chart**. Which line rises more steeply on that chart?`,
          choices: ['Asset A', 'Asset B', 'Both the same', 'It depends on the size of the absolute gain'],
          answer: pa > pb ? 0 : 1,
          fixedOrder: true,
          hints: [
            `On a log axis equal percentage growth looks like equal steepness, so the steeper line is the one with the faster percentage growth, not the larger gain in ${CCY}.`,
            `Both assets are measured over the same ${years} years, so compare end / start for each: ${f.num(a1, 0)} / ${f.num(a0, 0)} for A and ${f.num(b1, 0)} / ${f.num(b0, 0)} for B.`,
            `For A the ratio is ${f.num(pa, 3)}. Work out the ratio for B and compare the two.`,
          ],
          solution: `Ratios: A = ${f.num(a1, 0)}/${f.num(a0, 0)} = ${f.num(pa, 3)}; B = ${f.num(b1, 0)}/${f.num(b0, 0)} = ${f.num(pb, 3)}. The larger ratio, ${pa > pb ? 'A' : 'B'}, is steeper on a log chart.`,
        };
      },
    },
    {
      id: 'spot-log-error',
      template: 'spot',
      generate(r, f) {
        const kind = r.pick(['sum', 'exponent', 'base']);
        if (kind === 'sum') {
          const a = r.int(2, 6), b = r.int(2, 7);
          const bad = Math.log(a) + Math.log(b), good = Math.log(a + b);
          return {
            prompt: 'One line of this solution is wrong. Flag it.',
            doc: [
              { text: `Task: compute $\\ln(${a} + ${b})$ from $\\ln ${a} = ${f.num(Math.log(a), 4)}$ and $\\ln ${b} = ${f.num(Math.log(b), 4)}$.`, error: false },
              { text: `$\\ln(${a} + ${b}) = \\ln ${a} + \\ln ${b}$`, error: true, why: `There is no log rule for a sum. $\\ln a + \\ln b = \\ln(ab)$, a product. Here $\\ln(${a + b}) = ${f.num(good, 4)}$ directly.` },
              { text: `$= ${f.num(Math.log(a), 4)} + ${f.num(Math.log(b), 4)} = ${f.num(bad, 4)}$`, error: false },
              { text: `Answer: ${f.num(bad, 4)}`, error: false },
            ],
          };
        }
        const ratePct = r.pick([3, 4, 5, 6, 7, 8, 9]), M = r.pick([2, 3, 4, 5]);
        const g = 1 + ratePct / 100;
        const t = Math.log(M) / Math.log(g);
        if (kind === 'exponent') {
          return {
            prompt: 'One line of this solution is wrong. Flag it.',
            doc: [
              { text: `Task: solve $${f.num(g, 2)}^t = ${M}$ for $t$.`, error: false },
              { text: `Take ln of both sides: $\\ln(${f.num(g, 2)}^t) = \\ln ${M}$`, error: false },
              { text: `Power rule: $\\ln(${f.num(g, 2)}^t) = \\ln ${f.num(g, 2)}$`, error: true, why: 'The exponent was dropped. The power rule moves the exponent in front as a multiplier: $\\ln(g^t) = t \\ln g$.' },
              { text: `So $t = \\ln ${M} / \\ln ${f.num(g, 2)} = ${f.num(t, 2)}$ years`, error: false },
            ],
          };
        }
        const bad = Math.log(M) / Math.log10(g);
        return {
          prompt: 'One line of this solution is wrong. Flag it.',
          doc: [
            { text: `Task: solve $${f.num(g, 2)}^t = ${M}$ for $t$.`, error: false },
            { text: `Take ln of both sides: $t \\ln ${f.num(g, 2)} = \\ln ${M}$`, error: false },
            { text: `$t = \\ln ${M} / \\ln ${f.num(g, 2)}$`, error: false },
            { text: `$t = ${f.num(Math.log(M), 4)} / ${f.num(Math.log10(g), 4)} = ${f.num(bad, 1)}$ years`, error: true, why: `Mixed bases: the denominator used $\\log_{10}$ (${f.num(Math.log10(g), 4)}) instead of $\\ln$ (${f.num(Math.log(g), 4)}). Use the same base top and bottom: $t = ${f.num(t, 2)}$.` },
          ],
        };
      },
    },
  ],
});
