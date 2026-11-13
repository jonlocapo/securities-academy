/* Q1.5 Exponential functions and growth */
SA.unit({
  id: 'Q1.5',
  lesson: [
    {
      md: String.raw`## Linear and exponential growth

EUR 1,000 is left in an account paying 4% a year for ten years. Two banks pay in different ways.

- **Bank L (linear)** pays 4% of the original EUR 1,000 each year, which is EUR 40. After 10 years the balance is $1{,}000 + 10 \times 40 =$ **EUR 1,400**.
- **Bank E (exponential)** pays 4% each year on the whole balance, interest included. After 10 years the balance is $1{,}000 \times 1.04^{10} =$ **EUR 1,480.24**.

The difference of EUR 80.24 comes from interest earning interest, and it widens as the period lengthens.

> [!recall] Q1.4
> Bank L is a linear function with intercept 1,000 and slope 40 EUR per year. Bank E is not linear, because its yearly change grows with the balance.`,
    },
    {
      md: String.raw`## The exponential function

An **exponential function** has a positive constant base, other than 1, raised to a variable exponent. Each period the amount is multiplied by the same factor, so after $t$ periods it has been multiplied $t$ times.

$$f(t) = a \times b^{\,t}$$

- $a$ is the starting value, the value at $t = 0$.
- $b$ is the **growth factor** per period.
- $t$ is the number of periods.

The growth rate $r$ and the factor $b$ are related by $b = 1 + r$. A function with $b > 1$ models growth and a function with $0 < b < 1$ models decay.

| Situation | Rate $r$ | Factor $b$ |
|---|---|---|
| Account paying 4% | $+0.04$ | $1.04$ |
| Asset losing 3% of its value a year | $-0.03$ | $0.97$ |
| Fund fee drag of 1.5% | $-0.015$ | $0.985$ |

To evaluate $f(t)$, substitute $t$ and calculate the power first, then multiply by $a$. The exponent may be a fraction: $1.04^{0.5} = \sqrt{1.04}$ is the factor for half a year.

> [!recall] Q1.3
> A fractional exponent is a root, and a negative exponent is a reciprocal: $1.04^{-1} = 1/1.04$.`,
      check: {
        template: 'mcq',
        prompt: 'A cost loses 6% of its value each year. What is the yearly factor $b$ in $f(t) = a\\,b^t$?',
        choices: ['0.94', '1.06', '0.06', '0.60'],
        answer: 0,
        solution: '$b = 1 - 0.06 = 0.94$. A decay has a factor below 1.',
      },
    },
    {
      md: String.raw`## Graph of an exponential function

The graph of $f(t) = a\,b^t$ with $a > 0$ passes through $(0, a)$. Its domain is all real numbers and its range is all positive numbers, because a positive base raised to any power stays positive.

- For $b > 1$ the graph rises, slowly at first and then ever more steeply.
- For $0 < b < 1$ the graph falls and flattens towards zero.
- In both cases the horizontal axis is an asymptote: the curve approaches it without reaching it.

A decaying amount falls by smaller and smaller sums while the percentage loss stays constant. Starting at 1,000 with $b = 0.5$ gives 1,000, 500, 250 and 125.`,
    },
    {
      md: String.raw`## Linear or exponential

A table of values is linear if the change from one row to the next is constant, and exponential if the ratio is constant.

| Year | Bank L | Bank E |
|---|---|---|
| 0 | 1,000 | 1,000.00 |
| 1 | 1,040 | 1,040.00 |
| 2 | 1,080 | 1,081.60 |
| 3 | 1,120 | 1,124.86 |

- Bank L adds the same difference (+40) each year, so it is linear.
- Bank E multiplies by the same ratio each year (1,040 to 1,081.60 is a factor of 1.04), so it is exponential.

> [!example]
> The sequence 80, 96, 115.20, 138.24 has differences 16, 19.20 and 23.04, which are not constant.
> The ratios $96/80$, $115.20/96$ and $138.24/115.20$ all equal 1.2.
> The sequence is **exponential with $b = 1.2$**, a rise of 20% per step.

An exponential model can also be built from two data points. If a value is $y_1$ at $t = 0$ and $y_2$ at $t = 1$, then $a = y_1$ and $b = y_2/y_1$.`,
    },
    {
      md: String.raw`## Compounding and the number e

Interest can be paid more than once a year. With $n$ payments a year at yearly rate $r$, the value after $t$ years is

$$A = P\left(1 + \frac{r}{n}\right)^{nt}$$

Take a rate of 100% a year on EUR 1, which makes the pattern easy to see:

| Compounding | Formula | Value after 1 year |
|---|---|---|
| Yearly | $(1 + 1)^1$ | 2.0000 |
| Half-yearly | $(1 + 1/2)^2$ | 2.2500 |
| Quarterly | $(1 + 1/4)^4$ | 2.4414 |
| Monthly | $(1 + 1/12)^{12}$ | 2.6130 |
| Daily | $(1 + 1/365)^{365}$ | 2.7146 |
| Continuous | limit | 2.71828… |

As the frequency rises, the value approaches a limit, the number $e \approx 2.71828$. Compounding continuously at yearly rate $r$ for $t$ years multiplies the amount by $e^{rt}$. Calculators have an $e^x$ key.

> [!example]
> EUR 1,000 at 4% continuously for 10 years: $1{,}000 \times e^{0.04 \times 10} = 1{,}000 \times e^{0.4} =$ **EUR 1,491.82**.
> Yearly compounding gave EUR 1,480.24, so continuous compounding adds EUR 11.58.

For small $x$, $e^x \approx 1 + x$. For example $e^{0.02} = 1.0202$, close to 1.02.`,
    },
    {
      md: String.raw`## Doubling time and the rule of 72

The time to double falls as the growth rate rises. A common approximation is

$$\text{years to double} \approx \frac{72}{\text{rate in \%}}$$

> [!example]
> At 4% a year, $72 / 4 = 18$ years to double.
> The exact answer is 17.67 years, so the approximation is within 2%.
> Check: $1.04^{18} = 2.03$.

The approximation fits for rates of roughly 2% to 15% and the error grows outside that range. The exact formula uses logarithms and is derived in Q1.6.

For decay the corresponding measure is the **half-life**, the time for an amount to halve. At 3.5% yearly inflation, purchasing power halves in about $72/3.5 \approx 20.6$ years.

> [!tip]
> The rule of 72 serves as a check on an answer. A product advertised as doubling in 5 years implies a return of about 14% a year ($72/5 = 14.4$).`,
    },
    {
      md: String.raw`## Summary

- Linear growth adds a constant amount each period and exponential growth multiplies by a constant factor.
- $f(t) = a\,b^t$ with $b = 1 + r$ for growth and $b = 1 - d$ for decay. The graph passes through $(0, a)$ and has the horizontal axis as an asymptote.
- In a table, constant differences indicate linear growth and constant ratios indicate exponential growth.
- With $n$ payments a year the value is $P(1 + r/n)^{nt}$. Continuous compounding gives $Pe^{rt}$, where $e \approx 2.71828$.
- Rule of 72: doubling time is about 72 divided by the rate in per cent, accurate for roughly 2% to 15%.`,
    },
  ],

  exercises: [
    {
      id: 'value-after-t',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const P = M.amt(r.int(5, 1000) * 100);
        const ratePct = r.float(0.5, 12, 0.25);
        const t = r.int(1, 40);
        const V = f.round(P * Math.pow(1 + ratePct / 100, t), 2);
        return {
          prompt: `A client invests **${f.money(P, CCY, 0)}** at **${f.num(ratePct, 2)}% a year**, interest reinvested every year (yearly compounding). What is it worth after **${t} years**? (${CCY}, 2 dp)`,
          answer: V, dp: 2, tol: { abs: 0.02 }, unit: CCY,
          hints: [`The yearly growth factor is $1 + ${f.num(ratePct / 100, 4)} = ${f.num(1 + ratePct / 100, 4)}$.`, `Raise it to the power ${t}: ${f.num(1 + ratePct / 100, 4)} ^ ${t}.`, `Multiply by the starting amount ${f.num(P, 0)}.`],
          solution: `$V = ${f.num(P, 0)} \\times ${f.num(1 + ratePct / 100, 4)}^{${t}} = ${f.num(P, 0)} \\times ${f.num(Math.pow(1 + ratePct / 100, t), 5)}$ = **${f.money(V, CCY)}**`,
        };
      },
    },
    {
      id: 'linear-or-exponential',
      template: 'bucket',
      generate(r, f) {
        const nLin = r.int(3, 5);
        const items = [];
        const starts = [100, 200, 400, 500, 1000];
        for (let i = 0; i < nLin; i++) {
          const a = r.pick(starts), d = r.pick([-10, 5, 10, 15, 20, 25, 50]);
          items.push({ text: [0, 1, 2, 3, 4].map((k) => f.num(a + d * k, 2).replace(/\.00$/, '')).join(', '), bucket: 0 });
        }
        for (let i = 0; i < 8 - nLin; i++) {
          const a = r.pick(starts), g = r.pick([1.1, 1.2, 1.25, 1.5, 2, 0.5, 0.8, 0.9]);
          items.push({ text: [0, 1, 2, 3, 4].map((k) => f.num(a * Math.pow(g, k), 2).replace(/\.00$/, '')).join(', '), bucket: 1 });
        }
        const seen = new Set();
        const uniq = items.filter((it) => (seen.has(it.text) ? false : (seen.add(it.text), true)));
        return {
          prompt: 'Sort each series into **linear** (constant difference) or **exponential** (constant ratio).',
          buckets: ['Linear', 'Exponential'],
          items: r.shuffle(uniq),
          hints: ['Subtract consecutive terms: is the difference constant?', 'Divide consecutive terms: is the ratio constant?'],
          solution: 'Linear series add the same amount each step; exponential series multiply by the same factor each step (a factor below 1 is a decay).',
        };
      },
    },
    {
      id: 'decay-remaining',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const P = M.amt(r.int(10, 500) * 1000);
        const dPct = r.float(1, 8, 0.25);
        const t = r.int(5, 30);
        const what = r.pick([
          (d) => `Inflation of **${d}%** a year erodes the purchasing power of a cash balance`,
          (d) => `An annual fee drag of **${d}%** reduces the value of a portfolio`,
          (d) => `Currency depreciation of **${d}%** a year reduces the value of a foreign deposit`,
        ]);
        const b = 1 - dPct / 100;
        const V = f.round(P * Math.pow(b, t), 2);
        return {
          prompt: `${what(f.num(dPct, 2))}. Starting from **${f.money(P, CCY, 0)}**, what is the value (in today's money) after **${t} years**? (${CCY}, 2 dp)`,
          answer: V, dp: 2, tol: { abs: 0.02 }, unit: CCY,
          hints: [`Decay factor: $b = 1 - ${f.num(dPct / 100, 4)} = ${f.num(b, 4)}$.`, `Raise to the power ${t}.`, `Multiply by ${f.num(P, 0)}.`],
          solution: `$V = ${f.num(P, 0)} \\times ${f.num(b, 4)}^{${t}} = ${f.num(P, 0)} \\times ${f.num(Math.pow(b, t), 5)}$ = **${f.money(V, CCY)}**`,
        };
      },
    },
    {
      id: 'rule-of-72',
      template: 'numeric',
      generate(r, f) {
        const rate = r.int(4, 30) / 2;
        const est = 72 / rate;
        const exact = f.round(Math.log(2) / Math.log(1 + rate / 100), 2);
        const diff = f.round(est - exact, 2);
        return {
          prompt: `An investment grows at **${f.num(rate, 1)}%** a year. The exact doubling time is **${f.num(exact, 2)} years**. Use the rule of 72 for an estimate: by how many years does the estimate **exceed** the exact value? (negative if it is lower; 2 dp)`,
          answer: diff, dp: 2, tol: { abs: 0.02 }, unit: 'years',
          hints: [`Rule of 72: years ≈ 72 ÷ rate in % = 72 / ${f.num(rate, 1)}.`, `That gives ${f.num(est, 2)} years.`, `Subtract the exact value ${f.num(exact, 2)}.`],
          solution: `Estimate = 72 / ${f.num(rate, 1)} = ${f.num(est, 2)} years. Estimate − exact = ${f.num(est, 2)} − ${f.num(exact, 2)} = **${f.num(diff, 2)} years**.`,
        };
      },
    },
    {
      id: 'growth-shape',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const D = {
          lin: 'A straight rising line',
          exp: 'A curve that rises faster and faster',
          dec: 'A curve that falls, flattening towards zero',
          sat: 'A curve that rises quickly, then levels off',
        };
        const P = M.amt(r.int(2, 50) * 500), k = r.int(2, 9), pct = r.pick([3, 4, 5, 6, 7, 8]);
        const kA = M.amt(k * 100), kB = M.amt(k * 1000);
        const g1 = P * pct / 100, g2 = P * (1 + pct / 100) * pct / 100;
        const l1 = P * pct / 100, l2 = P * (1 - pct / 100) * pct / 100;
        const S = [
          { t: `${CCY} ${f.num(P, 0)} grows at ${pct}% a year with interest reinvested. Value against time.`, a: 'exp',
            h: [`Compare how much value is added in year 1 and in year 2. Year 1 adds ${pct}% of ${CCY} ${f.num(P, 0)}, which is ${CCY} ${f.num(g1, 2)}.`, `In year 2 the ${pct}% applies to ${CCY} ${f.num(P + g1, 2)}, not to ${CCY} ${f.num(P, 0)}. Work out that amount and ask whether the yearly addition is staying the same, shrinking or growing.`] },
          { t: `You start with ${CCY} ${f.num(P, 0)} and add ${CCY} ${kA} every year; no interest is paid. Balance against time.`, a: 'lin',
            h: [`Write the balance after 1, 2 and 3 years: ${CCY} ${f.num(P, 0)} plus ${CCY} ${kA} each year.`, `Each year adds the same amount of ${CCY} ${kA}, because no interest is earned on earlier additions. Decide what a constant yearly addition does to the shape.`] },
          { t: `Purchasing power of ${CCY} ${f.num(P, 0)} in cash when prices rise ${pct}% a year. Real value against time.`, a: 'dec',
            h: [`After one year the cash buys what ${CCY} ${f.num(P / (1 + pct / 100), 2)} bought at the start, since prices are ${f.num(1 + pct / 100, 2)} times higher. The direction of the change is down.`, `Each year the real value is divided by the same ${f.num(1 + pct / 100, 2)}, so the loss in money terms is a smaller amount each year. Decide whether the curve can reach zero or below.`] },
          { t: `A position of ${CCY} ${f.num(P, 0)} loses ${pct}% of its value each year to fees. Value against time.`, a: 'dec',
            h: [`Year 1 removes ${pct}% of ${CCY} ${f.num(P, 0)}, which is ${CCY} ${f.num(l1, 2)}, leaving ${CCY} ${f.num(P - l1, 2)}.`, `Year 2 removes ${pct}% of ${CCY} ${f.num(P - l1, 2)}, which is ${CCY} ${f.num(l2, 2)}, a smaller amount than in year 1. Ask whether the value can ever reach zero or below.`] },
          { t: `Share of a large order already filled over the day: fast at first, slower as the market thins. Fraction filled against time.`, a: 'sat',
            h: [`The fraction filled can only go up during the day, and it can never exceed 100%. Ask how the amount filled per hour changes between morning and afternoon.`, `The description says the filling slows down. Decide what a falling rate of increase does to the shape, given the fixed ceiling of 100%.`] },
          { t: `A bond fund adds a fixed ${CCY} ${kB} of new money every month and nothing else. Assets against months.`, a: 'lin',
            h: [`Write the assets after 1, 2 and 3 months, adding ${CCY} ${kB} each time.`, `Each month adds the same amount, with no growth on earlier money. Decide what a constant monthly addition does to the shape.`] },
          { t: `A balance doubles every ${k} years. Balance against time.`, a: 'exp',
            h: [`Starting from 1 unit, the balance is 2 after ${k} years and 4 after ${2 * k} years.`, `Compare the increase over the first ${k} years (1 unit) with the increase over the next ${k} years (2 units). Ask whether equal periods bring equal increases.`] },
          { t: `Chance that at least one of many independent control checks catches an error, as the number of checks grows.`, a: 'sat',
            h: [`The chance rises with each extra check, but it is a probability and cannot go above 100%.`, `Once the chance is already high, an extra check adds only a small amount. Decide what shrinking additions and a fixed ceiling do to the shape.`] },
        ];
        const s = r.pick(S);
        const keys = r.shuffle(Object.keys(D));
        return {
          prompt: `Which curve matches this description?\n\n${s.t}`,
          choices: keys.map((k2) => D[k2]),
          answer: keys.indexOf(s.a),
          fixedOrder: true,
          hints: s.h,
          solution: `Best match: ${D[s.a].toLowerCase()}.`,
        };
      },
    },
    {
      id: 'e-to-the-x',
      template: 'numeric',
      generate(r, f) {
        let x = r.int(-10, 20) / 100;
        if (x === 0) x = 0.05;
        const v = f.round(Math.exp(x), 4);
        return {
          prompt: `Evaluate $e^{${f.num(x, 2)}}$ to 4 decimal places. (Use the $e^x$ key of your calculator.)`,
          answer: v, dp: 4, tol: { abs: 0.0005 }, unit: '',
          hints: ['Find the key labelled $e^x$ (often shift + ln).', `Enter ${f.num(x, 2)} and press it.`, `For comparison, $1 + x = ${f.num(1 + x, 2)}$.`],
          solution: `$e^{${f.num(x, 2)}} = ${f.num(v, 4)}$. The approximation $1 + x = ${f.num(1 + x, 2)}$ is off by ${f.num(Math.abs(v - (1 + x)), 4)}.`,
        };
      },
    },
  ],
});
