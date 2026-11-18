/* Q1.3 Powers, roots and large numbers */
SA.unit({
  id: 'Q1.3',
  lesson: [
    {
      md: String.raw`## Powers

A fund report may state that a fund doubled in seven years. To judge this, total growth over several years is converted into a yearly growth rate, which requires powers and their inverse, roots. Large amounts must also be read correctly: a market capitalisation of EUR 144 bn contains nine zeros.

A **power** is repeated multiplication:

$$b^n = \underbrace{b \times b \times \cdots \times b}_{n \text{ times}}$$

For example $1.05^3 = 1.05 \times 1.05 \times 1.05 = 1.157625$, which is EUR 1 growing 5% a year for three years.

> [!recall] Q1.1
> A yearly return of 5% is the growth factor 1.05. Growth over several years is the product of the yearly factors, which is a power.`,
    },
    {
      md: String.raw`## The laws of exponents

The exponent counts how many times the base is multiplied, and the laws follow from that count.

| Law | Example | Reason |
|---|---|---|
| $b^m \times b^n = b^{m+n}$ | $2^3 \times 2^2 = 2^5 = 32$ | 3 twos, then 2 more twos |
| $b^m / b^n = b^{m-n}$ | $2^5 / 2^2 = 2^3 = 8$ | 2 twos cancel |
| $(b^m)^n = b^{mn}$ | $(2^3)^2 = 2^6 = 64$ | 2 groups of 3 twos |
| $b^0 = 1$ | $7^0 = 1$ | $b^n / b^n = 1$ |
| $(ab)^n = a^n b^n$ | $(2 \times 5)^2 = 2^2 \times 5^2 = 100$ | each factor is multiplied $n$ times |
| $(a/b)^n = a^n / b^n$ | $(6/3)^2 = 36/9 = 4$ | each part is raised to the power |

> [!warning]
> There is no rule for $b^m + b^n$. Here $2^3 + 2^2 = 8 + 4 = 12$, which is not $2^5$.

Signs need care: $-3^2$ means $-(3^2) = -9$, whereas $(-3)^2 = 9$. Several laws are often combined in one expression, for example $\dfrac{2^5 \times 2^{-2}}{2^4} = 2^{5-2-4} = 2^{-1} = 0.5$.`,
      check: {
        template: 'mcq',
        prompt: 'Which of these is equal to $3^4 \\times 3^2$?',
        choices: ['$3^6$', '$3^8$', '$9^6$', '$3^2$'],
        answer: 0,
        solution: 'Same base, so the exponents add: 4 + 2 = 6.',
      },
    },
    {
      md: String.raw`## Negative and fractional exponents

A negative exponent means division instead of multiplication. A fractional exponent is a root.

$$b^{-n} = \frac{1}{b^n} \qquad\qquad b^{1/n} = \sqrt[n]{b}$$

- $10^{-2} = 1/100 = 0.01$, which is the 1% of Q1.1.
- $1.05^{-3} = 1/1.05^3 = 0.8638$ is the value today of EUR 1 received in three years if money grows 5% a year. This calculation recurs from F1 onwards.
- $9^{1/2} = \sqrt{9} = 3$ and $8^{1/3} = 2$, since $2 \times 2 \times 2 = 8$.

> [!example]
> EUR 1 grows to EUR 1.21 in 2 years. What is the yearly factor $g$?
> $g^2 = 1.21$, so $g = 1.21^{1/2} = 1.10$, which is **10% a year**.

> [!recall] Q1.2
> Solving for a yearly factor uses the same step as rearranging a formula: apply the inverse operation. The inverse of squaring is the square root, and the inverse of "to the power $n$" is "to the power $1/n$".`,
    },
    {
      md: String.raw`## From total return to yearly return

If a value grows by a total factor $G$ over $n$ years, the yearly factor $g$ satisfies $g^n = G$. Therefore:

$$g = G^{1/n} \qquad\qquad \text{yearly rate} = g - 1$$

> [!example]
> A fund that doubled in seven years: $G = 2$, $n = 7$.
> $g = 2^{1/7} = 1.1041$, so the yearly rate is about **10.4%**.
> Check: $1.1041^7 \approx 2.00$.
>
> A 5-year total return of +60%: $G = 1.60$.
> $g = 1.60^{1/5} = 1.0985$, so about **9.85% a year**. Dividing the total by the number of years (60 / 5 = 12%) gives a wrong figure.

The simple average of 12% overstates the yearly rate, because under compounding each year's growth also earns growth.

On a calculator the exponent goes in brackets: enter \`1.6 ^ ( 1 / 5 )\`. Entering \`1.6 ^ 1 / 5\` computes $1.6^1$ and then divides by 5.`,
    },
    {
      md: String.raw`## Large numbers and scientific notation

Market figures are large, so they are written with units and in **scientific notation**: a number between 1 and 10 multiplied by a power of ten.

| Word | Power of ten | Example |
|---|---|---|
| thousand (k) | $10^3$ | EUR 12 k = 12,000 |
| million (m) | $10^6$ | EUR 250 m = $2.5 \times 10^8$ |
| billion (bn) | $10^9$ | EUR 144 bn = $1.44 \times 10^{11}$ |
| trillion (tn) | $10^{12}$ | EUR 1 tn = $10^{12}$ |

To write a number in scientific notation, move the decimal point until one non-zero digit stands before it, and count the places moved. Moving left gives a positive exponent, so 144,000,000,000 is $1.44 \times 10^{11}$. Moving right gives a negative exponent, so 0.0045 is $4.5 \times 10^{-3}$.

> [!example]
> A company has $3.2 \times 10^9$ shares at EUR 45. Market capitalisation:
> $3.2 \times 10^9 \times 45 = 144 \times 10^9 =$ **EUR 144 bn**.
> In scientific notation: $1.44 \times 10^{11}$ EUR.
> The rule used: multiply the numbers, add the exponents, then move the decimal point so the number lies between 1 and 10.

> [!eu]
> European reporting uses "EUR 144 bn" with billion = $10^9$. Some older British and some continental texts use "milliard" for $10^9$ and "billion" for $10^{12}$, so the number of zeros should be checked in unfamiliar documents.`,
    },
    {
      md: String.raw`## Summary

- A power is repeated multiplication. Same-base exponents add when multiplying and subtract when dividing, and $(b^m)^n = b^{mn}$.
- $b^{-n} = 1/b^n$, $b^{1/n} = \sqrt[n]{b}$ and $b^0 = 1$.
- A total growth factor $G$ over $n$ years gives the yearly factor $G^{1/n}$. The total return is not divided by $n$.
- 1 bn = $10^9$, 1 m = $10^6$. In scientific notation, multiply the numbers and add the exponents.
- On a calculator the exponent goes in brackets: ^ ( 1 / n ).`,
    },
  ],

  exercises: [
    {
      id: 'evaluate-power',
      template: 'numeric',
      generate(r, f) {
        const b = r.int(2, 12);
        const mode = r.pick(['single', 'product', 'quotient']);
        if (mode === 'single') {
          const e = r.int(-4, 6);
          const v = Math.pow(b, e);
          return {
            prompt: `Evaluate $${b}^{${e}}$ and enter the result as a decimal number. (Give at least 4 significant figures; an answer within 0.1% is accepted.)`,
            answer: v, dp: 8, tol: { rel: 0.001 }, unit: '',
            hints: e < 0 ? [`A negative exponent means reciprocal: $${b}^{${e}} = 1/${b}^{${-e}}$.`, `$${b}^{${-e}} = ${f.num(Math.pow(b, -e), 0)}$.`] : [`Multiply ${b} by itself ${e} times (or use the \`^\` key).`],
            solution: e < 0 ? `$${b}^{${e}} = 1/${b}^{${-e}} = 1/${f.num(Math.pow(b, -e), 0)} = ${v.toPrecision(5)}$` : `$${b}^{${e}} = ${f.num(v, 0)}$`,
          };
        }
        let m, n, e;
        do { m = r.int(-3, 6); n = r.int(-3, 6); e = mode === 'product' ? m + n : m - n; } while (e < -4 || e > 7);
        const v = Math.pow(b, e);
        const sym = mode === 'product' ? `${b}^{${m}} \\times ${b}^{${n}}` : `\\dfrac{${b}^{${m}}}{${b}^{${n}}}`;
        return {
          prompt: `Evaluate $${sym}$ and enter the result as a decimal number. Combining the powers first makes it easier. (Give at least 4 significant figures; an answer within 0.1% is accepted.)`,
          answer: v, dp: 8, tol: { rel: 0.001 }, unit: '',
          hints: [`Same base, so ${mode === 'product' ? 'add' : 'subtract'} the exponents.`, `The exponent becomes ${m} ${mode === 'product' ? '+' : '−'} (${n}) = ${e}.`, `Now evaluate $${b}^{${e}}$.`],
          solution: `$${sym} = ${b}^{${e}} = ${e < 0 ? '1/' + f.num(Math.pow(b, -e), 0) + ' = ' + v.toPrecision(5) : f.num(v, 0)}$`,
        };
      },
    },
    {
      id: 'yearly-rate-from-total',
      template: 'numeric',
      generate(r, f) {
        const G = r.int(105, 300) / 100;
        const n = r.int(2, 20);
        const g = Math.pow(G, 1 / n);
        const rate = f.round((g - 1) * 100, 2);
        return {
          prompt: `An investment multiplies by **${f.num(G, 2)}** (i.e. a total return of ${f.num((G - 1) * 100, 0)}%) over **${n} years**. What is the constant yearly growth rate? (answer in %, 2 dp)`,
          answer: rate, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [`The yearly factor $g$ satisfies $g^{${n}} = ${f.num(G, 2)}$.`, `So $g = ${f.num(G, 2)}^{1/${n}}$. Type it as ${f.num(G, 2)} ^ ( 1 / ${n} ).`, 'Subtract 1 from $g$ and multiply by 100 to get a percentage.'],
          solution: `$g = ${f.num(G, 2)}^{1/${n}} = ${f.num(g, 5)}$, so the yearly rate is $g - 1$ = **${f.num(rate, 2)}% a year**. (Dividing the total by ${n} would wrongly give ${f.num((G - 1) * 100 / n, 2)}%.)`,
        };
      },
    },
    {
      id: 'exponent-laws-match',
      template: 'match',
      generate(r) {
        // one letter throughout, so pairs cannot be matched by letter: the exponent rule has to be applied
        const v = r.pick(['x', 'y', 'z', 't', 'u']);
        let a, b, c, d, e;
        do { a = r.int(2, 6); b = r.int(2, 5); c = r.int(7, 9); d = r.int(2, 6); e = r.int(2, 4); } while (new Set([a + b, c - b, a * e]).size < 3); // distinct results: each match is unambiguous
        const kinds = [
          [`${v}^{${a}} \\times ${v}^{${b}}`, `${v}^{${a + b}}`],
          [`\\dfrac{${v}^{${c}}}{${v}^{${b}}}`, `${v}^{${c - b}}`],
          [`(${v}^{${a}})^{${e}}`, `${v}^{${a * e}}`],
          [`${v}^{-${d}}`, `\\dfrac{1}{${v}^{${d}}}`],
          [`${v}^{1/${e + 1}}`, `\\sqrt[${e + 1}]{${v}}`],
        ];
        const k = r.int(4, 5);
        const chosen = r.sample(kinds, k).map(([l, rr]) => [`$${l}$`, `$${rr}$`]);
        return {
          prompt: 'Match each expression with its simplified form.',
          pairs: chosen,
          hints: ['Multiplying same-base powers: add exponents. Dividing: subtract.', 'A power of a power: multiply the exponents. Negative exponent: reciprocal. Exponent 1/n: n-th root.'],
          solution: 'Product: add exponents. Quotient: subtract. Power of a power: multiply. Negative exponent: 1 over the positive power. Exponent $1/n$: the $n$-th root.',
        };
      },
    },
    {
      id: 'big-number-headlines',
      template: 'cloze',
      generate(r, f) {
        const MK = r.market(), CCY = MK.ccy; // M is taken below
        const B = MK.amt(r.int(15, 9500) / 10);
        let k = 0; while (B / Math.pow(10, k + 1) >= 1) k++;
        const mant = f.round(B / Math.pow(10, k), 4);
        const exp = 9 + k;
        const M = MK.amt(r.int(3, 1900) * 50);
        return {
          prompt: 'Rewrite the figures in other units. (Scientific notation: a number between 1 and 10 times a power of ten.)',
          text: `A listed company has a market capitalisation of ${CCY} ${f.num(B, 1)} bn. In ${CCY} m that is [[0]]. In scientific notation it is [[1]] × 10^[[2]] ${CCY}. Its average daily turnover is ${CCY} ${f.num(M, 0)} m, which is [[3]] ${CCY} bn.`,
          blanks: [
            { numeric: { answer: B * 1000, dp: 0, tol: { abs: 0.5 } } },
            { numeric: { answer: mant, dp: 4, tol: { abs: 0.0005 } } },
            { numeric: { answer: exp, dp: 0, tol: { abs: 0.1 } } },
            { numeric: { answer: M / 1000, dp: 3, tol: { abs: 0.0005 } } },
          ],
          hints: ['1 bn = 1,000 m.', `${CCY} 1 bn = $10^9$ ${CCY}. Write ${f.num(B, 1)} × 10^9 and then move the decimal point so the number is between 1 and 10, adjusting the exponent.`],
        };
      },
    },
    {
      id: 'larger-quantity',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const kind = r.pick(['bn', 'm', 'pct']);
        let valB, textB, how;
        if (kind === 'bn') { const k = M.amt(r.int(5, 900) / 10); valB = k * 1e9; textB = `${CCY} ${f.num(k, 1)} bn`; how = `${f.num(k, 1)} bn means ${f.num(k, 1)} × $10^9$, since 1 bn = $10^9$.`; }
        else if (kind === 'm') { const k = M.amt(r.int(300, 90000)); valB = k * 1e6; textB = `${CCY} ${f.num(k, 0)} m`; how = `${f.num(k, 0)} m means ${f.num(k, 0)} × $10^6$, since 1 m = $10^6$.`; }
        else { const Q = M.amt(r.int(2, 60)), p = r.int(2, 80) / 2; valB = p / 100 * Q * 1e9; textB = `${f.num(p, 1)}% of ${CCY} ${Q} bn`; how = `${f.num(p, 1)}% is the decimal ${f.num(p / 100, 3)}, and ${Q} bn is ${Q} × $10^9$, so multiply the decimal by that total.`; }
        let e = Math.floor(Math.log10(valB) + 1e-9);
        const ratio = r.pick([0.6, 0.8, 0.9, 0.95, 1.05, 1.1, 1.3, 1.6]);
        const mant = f.round(valB / Math.pow(10, e) * ratio, 1);
        const valA = mant * Math.pow(10, e);
        const textA = `${CCY} $${f.num(mant, 1)} \\times 10^{${e}}$`;
        const aFirst = r.bool();
        const first = aFirst ? textA : textB, second = aFirst ? textB : textA;
        const vFirst = aFirst ? valA : valB, vSecond = aFirst ? valB : valA;
        const rel = Math.abs(vFirst - vSecond) / Math.max(vFirst, vSecond);
        const ans = rel < 1e-9 ? 2 : vFirst > vSecond ? 0 : 1;
        return {
          prompt: `Which is larger?\n\n- **First:** ${first}\n- **Second:** ${second}`,
          choices: ['The first is larger', 'The second is larger', 'They are equal', 'They cannot be compared without a currency rate'],
          answer: ans,
          fixedOrder: true,
          hints: [
            `One amount is written as ${textB} and the other in the form ${textA}. Rewrite both in plain ${CCY} units before comparing.`,
            `For ${textB}: ${how}`,
            `In plain units ${textB} is ${f.num(valB, 0)}, and the other amount is ${f.num(mant, 1)} × $10^{${e}}$. Write that out in full and compare the two numbers, matching the order in which they were given.`,
          ],
          solution: `In plain units: first = ${f.num(vFirst, 0)}, second = ${f.num(vSecond, 0)}. ${ans === 2 ? 'They are equal.' : ans === 0 ? 'The first is larger.' : 'The second is larger.'}`,
        };
      },
    },
    {
      id: 'five-year-to-yearly',
      template: 'numeric',
      generate(r, f) {
        const R = r.int(-20, 120);
        const g = Math.pow(1 + R / 100, 1 / 5);
        const y = f.round((g - 1) * 100, 2);
        return {
          prompt: `A fund reports a **total return of ${R > 0 ? '+' : ''}${R}%** over **5 years**. What is the average yearly (compound) return? (answer in %, 2 dp)`,
          answer: y, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [`Total factor $G = 1 + ${f.num(R / 100, 2)} = ${f.num(1 + R / 100, 2)}$.`, `Yearly factor $g = G^{1/5}$: type ${f.num(1 + R / 100, 2)} ^ ( 1 / 5 ).`, 'Subtract 1 and convert to %.'],
          solution: `$G = ${f.num(1 + R / 100, 2)}$ and $g = G^{1/5} = ${f.num(g, 5)}$, so the yearly return is **${f.num(y, 2)}%**. The naive ${R}/5 = ${f.num(R / 5, 2)}% is wrong because of compounding.`,
        };
      },
    },
  ],
});
