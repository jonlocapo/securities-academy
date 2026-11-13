/* Q2.2 Spread: variance and standard deviation */
SA.unit({
  id: 'Q2.2',
  lesson: [
    {
      md: String.raw`## Spread

Two funds can have the same average return and very different behaviour. Fund A's monthly returns are 1, 1, 1, 1 (%) and Fund B's are 4, -2, 3, -1 (%). Both average 1% a month, but Fund A is constant and Fund B varies widely.

The mean shows where the returns are centred and not how widely they scatter. The scatter, or **spread**, is the simplest form of what finance calls risk.

The simplest measure of spread is the **range**, the largest value minus the smallest. Fund B's range is $4 - (-2) = 6$ points and Fund A's is 0. The range uses only two values and ignores the rest, so a measure that uses all the data is needed.

> [!recall] Q2.1
> The mean is the balance point of the data. The spread measures how far the data lie from that balance point.`,
    },
    {
      md: String.raw`## Variance and standard deviation

The spread can be measured by averaging the distance of each value from the mean. The **deviations** $x_i - \bar x$ always add up to zero, because the mean is the balance point, so their plain average says nothing. Each deviation is therefore **squared** first. This makes all terms positive and gives larger deviations more weight.

Fund B has returns $4, -2, 3, -1$ and mean $\bar x = 1$.

| Return $x$ | Deviation $x - 1$ | Squared deviation |
|---|---|---|
| 4 | 3 | 9 |
| -2 | -3 | 9 |
| 3 | 2 | 4 |
| -1 | -2 | 4 |
| Sum | 0 | 26 |

The **variance** is the average of the squared deviations, which is the expected squared distance from the mean. The **standard deviation** (SD) is its square root, which returns the result to the units of the returns (per cent, not per cent squared):

$$\sigma^2 = \frac{\sum (x_i - \bar x)^2}{n} \qquad \sigma = \sqrt{\sigma^2}$$

An equivalent form saves work when the mean is not a round number: the variance is the average of the squares minus the square of the mean, $\sigma^2 = \overline{x^2} - \bar x^2$. For Fund B, $(16 + 4 + 9 + 1)/4 - 1^2 = 7.5 - 1 = 6.5$, which equals $26/4$.

> [!recall] Q1.3
> A square root undoes a square, so $\sqrt{9} = 3$. The root is taken at the end, after the variance has been calculated.`,
      check: {
        template: 'mcq',
        prompt: 'Why are the deviations squared before they are averaged?',
        choices: [
          'Plain deviations always add up to zero, and squaring makes every term positive',
          'Squaring makes the numbers smaller',
          'Returns must be expressed in per cent squared',
          'The mean is not defined without squares',
        ],
        answer: 0,
        solution: 'The deviations from the mean cancel out (positives against negatives), so their average is always 0. Squares are non-negative and give large misses extra weight.',
      },
    },
    {
      md: String.raw`## Population and sample variance

Two versions of the formula exist.

- **Population** variance is used when all the data are available. It divides by $n$.
- **Sample** variance is used when the data are a sample from a larger process, for example past returns used to estimate the spread of future ones. It divides by $n - 1$.

The mean is computed from the same data, so the deviations are slightly smaller than they would be from the true mean. The sample mean sits as close to the data as any single number can, which makes the squared deviations too small on average. Dividing by $n - 1$ instead of $n$ corrects this, and the resulting sample variance is correct on average over many samples. The sample SD, its square root, is still slightly too low on average, and the effect is small except for very short samples. For a short list of historical returns the sample version is standard.

> [!example]
> Fund B: the sum of squared deviations is 26.
> Sample variance $= 26/3 = 8.67$ and sample SD $= \sqrt{8.67} =$ **2.94%**.
> Population variance $= 26/4 = 6.50$ and population SD $= 2.55\%$.
> Fund A: all deviations are 0, so its SD is 0.

With a lot of data the difference is negligible, because dividing 1,000 squared deviations by 1,000 or by 999 gives almost the same result. With 4 values it matters, so the version used should be stated.`,
    },
    {
      md: String.raw`## Effect of scaling and shifting

The spread responds to changes in the data in a fixed way.

- Adding the same constant to every return moves the mean by that constant and leaves the variance and SD unchanged. A fee of 0.1% taken from every month shifts all returns down equally and does not change the spread.
- Multiplying every return by a constant $k$ multiplies the SD by $|k|$ and the variance by $k^2$. A position of twice the size has twice the SD and four times the variance.

In symbols, $\text{Var}(kX + c) = k^2\,\text{Var}(X)$.

> [!example]
> Fund B has a sample SD of 2.94%. A client holds twice as much, so the monthly returns on the holding are doubled.
> SD of the holding: $2 \times 2.94\% =$ **5.88%**.
> Variance: $4 \times 8.67 = 34.67$, which is $5.88^2$.`,
    },
    {
      md: String.raw`## Volatility and the square-root-of-time rule

In markets the standard deviation of returns is called **volatility**. Quoted volatilities are almost always annual, while data often arrive monthly or daily. The **square-root-of-time rule** converts between them.

If returns in different months are unrelated, variances add: $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$. Twelve months' variance is then twelve times one month's. The SD is the root of the variance and therefore grows with the square root of time:

$$\sigma_{year} = \sigma_{month} \times \sqrt{12} \qquad \sigma_{year} = \sigma_{day} \times \sqrt{252}$$

There are about 252 trading days in a year. To convert in the other direction, divide.

> [!example]
> Fund B's monthly SD is 2.94%.
> $\sigma_{year} = 2.94\% \times \sqrt{12} = 2.94 \times 3.4641 =$ **10.2%**.
> A share with a daily SD of 1.2% has $1.2 \times \sqrt{252} = 1.2 \times 15.875 = 19.05\%$ a year.

> [!warning]
> The rule assumes that returns in different periods are unrelated and have the same spread. It is a first approximation, because real markets show clusters of calm and turbulent weeks.
> The rule applies to the SD. The mean return scales linearly with time, so twelve months give twelve times the monthly mean.`,
    },
    {
      md: String.raw`## Judging spread

Spread can often be judged without calculation.

- With the same mean, a wider scatter means a higher SD. The list 0, 2, 0, 2 (mean 1) has a lower SD than 5, -3, 4, -2 (mean 1).
- The range is quick but depends on two values, so one unusual value changes it completely. The SD uses every value.
- The variance is in squared units (per cent squared), which is hard to interpret, so the SD is quoted.

Chebyshev's inequality gives a guarantee that holds for any data or distribution: at most $1/k^2$ of the values lie $k$ or more SDs from the mean. At least 75% of values therefore lie within 2 SDs and at least 89% within 3 SDs. The bound is loose, and for bell-shaped data the shares are higher (68%, 95% and 99.7% for the normal curve in Q2.4).

> [!example]
> Two funds have the same average return of 6% a year. Fund C has a volatility of 4% and Fund D of 18%.
> Fund D can lose 12% in a bad year and gain 24% in a good one, both within about one SD of its mean. Fund C rarely moves outside the range 2% to 10%.
> Fund C is the better fit for a cautious client.

Risk measures later in the course, such as Value at Risk, beta and the Sharpe ratio, are built on the standard deviation.`,
    },
    {
      md: String.raw`## Summary

- The mean gives the centre and the spread gives the risk. Two series with the same mean can differ widely.
- Variance is the average squared deviation from the mean, equal to the mean of the squares minus the square of the mean. SD is its square root in the units of the data.
- Sample versions divide by $n - 1$ and population versions by $n$. Short samples of history use $n - 1$.
- Multiplying the data by $k$ multiplies the SD by $|k|$, and adding a constant leaves it unchanged.
- Volatility is the SD of returns. A monthly SD is annualised by $\sqrt{12}$ and a daily SD by $\sqrt{252}$, assuming unrelated periods.`,
    },
  ],

  exercises: [
    {
      id: 'variance-sd',
      template: 'numeric',
      generate(r, f) {
        const n = r.int(4, 8);
        const M = r.int(-1, 3);
        let xs;
        for (let t = 0; t < 200; t++) {
          xs = [];
          for (let i = 0; i < n - 1; i++) xs.push(r.int(-6, 8));
          const last = n * M - xs.reduce((a, b) => a + b, 0);
          xs.push(last);
          if (last >= -8 && last <= 10) break;
        }
        const sample = r.bool();
        const wantSd = r.bool();
        const SS = xs.reduce((a, x) => a + (x - M) * (x - M), 0);
        const div = sample ? n - 1 : n;
        const variance = SS / div;
        const ans = f.round(wantSd ? Math.sqrt(variance) : variance, 2);
        const list = xs.map((x) => f.num(x, 0)).join(', ');
        const kind = sample ? 'sample (divide by $n - 1$)' : 'population (divide by $n$)';
        return {
          prompt: `Monthly returns of a fund (%): **${list}**. The mean is ${f.num(M, 0)}%. Compute the ${kind} **${wantSd ? 'standard deviation' : 'variance'}**. (${wantSd ? 'answer in %, 2 dp' : 'answer in %², 2 dp'})`,
          answer: ans, dp: 2, tol: { abs: 0.01 }, unit: wantSd ? '%' : '',
          hints: [
            `Deviations from the mean ${f.num(M, 0)}: ${xs.map((x) => f.num(x - M, 0)).join(', ')}.`,
            `Square them and add: the sum of squares is ${f.num(SS, 0)}.`,
            `Divide by ${div}${wantSd ? ', then take the square root' : ''}.`,
          ],
          solution: `Sum of squared deviations $= ${f.num(SS, 0)}$. Variance $= ${f.num(SS, 0)}/${div} = ${f.num(variance, 2)}$${wantSd ? `, standard deviation $= \\sqrt{${f.num(variance, 2)}}$ = **${f.num(ans, 2)}%**` : ` = **${f.num(ans, 2)}**`}.`,
        };
      },
    },
    {
      id: 'annualise-sd',
      template: 'numeric',
      generate(r, f) {
        const mode = r.pick(['monthly', 'daily', 'toMonthly']);
        if (mode === 'monthly') {
          const sd = r.float(0.3, 5, 0.05);
          const ans = f.round(sd * Math.sqrt(12), 2);
          return {
            prompt: `A fund has a **monthly** standard deviation of **${f.num(sd, 2)}%**. What is its annualised volatility? (answer in %, 2 dp; assume unrelated months)`,
            answer: ans, dp: 2, tol: { abs: 0.01 }, unit: '%',
            hints: ['There are 12 months in a year.', 'Multiply by $\\sqrt{12} = 3.4641$.'],
            solution: `$${f.num(sd, 2)} \\times \\sqrt{12} = ${f.num(sd, 2)} \\times 3.4641$ = **${f.num(ans, 2)}%**`,
          };
        }
        if (mode === 'daily') {
          const sd = r.float(0.3, 2.5, 0.05);
          const ans = f.round(sd * Math.sqrt(252), 2);
          return {
            prompt: `A share has a **daily** standard deviation of **${f.num(sd, 2)}%**. Using 252 trading days, what is its annualised volatility? (answer in %, 2 dp)`,
            answer: ans, dp: 2, tol: { abs: 0.01 }, unit: '%',
            hints: ['The scaling factor is the square root of the number of trading days.', '$\\sqrt{252} = 15.8745$.'],
            solution: `$${f.num(sd, 2)} \\times \\sqrt{252} = ${f.num(sd, 2)} \\times 15.8745$ = **${f.num(ans, 2)}%**`,
          };
        }
        const ann = r.float(5, 25, 0.5);
        const ans = f.round(ann / Math.sqrt(12), 2);
        return {
          prompt: `A fund has an annualised volatility of **${f.num(ann, 1)}%**. What is its typical **monthly** standard deviation? (answer in %, 2 dp)`,
          answer: ans, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: ['Going from a year to a month reverses the multiplication.', 'Divide by $\\sqrt{12} = 3.4641$.'],
          solution: `$${f.num(ann, 1)} / \\sqrt{12} = ${f.num(ann, 1)} / 3.4641$ = **${f.num(ans, 2)}%**`,
        };
      },
    },
    {
      id: 'rank-risk',
      template: 'mcq',
      generate(r, f) {
        const patterns = [[-2, -1, 0, 1, 2], [-3, -1, 0, 1, 3], [-2, -2, 1, 1, 2], [-3, 0, 1, 1, 1], [-1, -1, 0, 1, 1]];
        const base = r.pick(patterns);
        const ks = r.sample([0.5, 1, 1.5, 2, 2.5, 3], 3);
        const m = r.int(0, 4);
        const labels = ['A', 'B', 'C'];
        const lists = ks.map((k) => r.shuffle(base).map((d) => m + k * d));
        const sd = lists.map((l) => Math.sqrt(l.reduce((a, x) => a + (x - m) * (x - m), 0) / 4));
        const highest = r.bool();
        let target = 0;
        sd.forEach((s, i) => { if (highest ? s > sd[target] : s < sd[target]) target = i; });
        const desc = lists.map((l, i) => `**Fund ${labels[i]}**: ${l.map((x) => f.num(x, 1)).join(', ')}`);
        return {
          prompt: `Three funds have the same average monthly return of ${f.num(m, 0)}%. Their last five monthly returns (%) are:\n\n- ${desc.join('\n- ')}\n\nWhich fund has the **${highest ? 'highest' : 'lowest'}** volatility?`,
          choices: [...labels.map((l) => `Fund ${l}`), 'All three carry the same risk, since the means are equal'],
          answer: target,
          hints: ['Look at how far each fund strays from its mean of ' + f.num(m, 0) + '%.', 'You do not need the exact SD: compare the size of the swings.'],
          solution: `The standard deviations are ${labels.map((l, i) => `${l}: ${f.num(sd[i], 2)}%`).join(', ')}. The ${highest ? 'highest' : 'lowest'} is **Fund ${labels[target]}**. Equal means do not mean equal risk.`,
        };
      },
    },
    {
      id: 'variance-cloze',
      template: 'cloze',
      generate(r, f) {
        const v = r.pick(['def', 'def', 'sd', 'num', 'annual']);
        const fund = r.pick(['Fund A', 'Fund B', 'the equity fund', 'the bond fund', 'the portfolio']);
        if (v === 'def') {
          return {
            prompt: 'Complete the recipe for the variance of a return series.',
            text: `To get the variance of ${fund}'s returns: take each return's [[0]] from the [[1]], [[2]] it, then take the [[3]] of the results.`,
            blanks: [{ accept: ['deviation', 'distance'] }, { accept: ['mean', 'average'] }, { accept: ['square', 'squared'] }, { accept: ['average', 'mean'] }],
            bank: r.shuffle(['deviation', 'mean', 'square', 'average', 'median', 'range']),
            hints: ['Variance is the average squared deviation from the mean.'],
          };
        }
        if (v === 'sd') {
          return {
            prompt: `Complete the sentence about ${fund}.`,
            text: `The standard deviation is the [[0]] [[1]] of the variance, so it is measured in the same [[2]] as the returns.`,
            blanks: [{ accept: ['square'] }, { accept: ['root'] }, { accept: ['units', 'unit'] }],
            bank: r.shuffle(['square', 'root', 'units', 'cube', 'mean', 'range']),
            hints: ['The root undoes the square.'],
          };
        }
        if (v === 'num') {
          const M0 = r.int(0, 4), a = r.int(-4, 0), b = r.int(1, 5);
          const arr = [a, b, 3 * M0 - a - b];
          const mean = M0;
          const pv = f.round(arr.reduce((s, x) => s + (x - mean) * (x - mean), 0) / 3, 2);
          return {
            prompt: `Three monthly returns of ${fund}: ${arr.join('%, ')}%.`,
            text: `The mean return is [[0]]%, and the population variance is [[1]] (in %², 2 dp).`,
            blanks: [{ numeric: { answer: mean, dp: 2, tol: { abs: 0.01 } } }, { numeric: { answer: pv, dp: 2, tol: { abs: 0.01 } } }],
            hints: ['Mean first, then the deviations, then the average of their squares.'],
          };
        }
        return {
          prompt: 'Fill in the scaling factors for volatility.',
          text: `Multiply a monthly standard deviation by the square root of [[0]] to annualise it; for a daily standard deviation use the square root of [[1]] trading days.`,
          blanks: [{ numeric: { answer: 12, dp: 0, tol: { abs: 0.01 } } }, { numeric: { answer: 252, dp: 0, tol: { abs: 0.01 } } }],
          hints: ['Months in a year; trading days in a year.'],
        };
      },
    },
    {
      id: 'deviation-table',
      template: 'table',
      generate(r, f) {
        const n = 5;
        const M = r.int(0, 3);
        let xs;
        for (let t = 0; t < 200; t++) {
          xs = [];
          for (let i = 0; i < n - 1; i++) xs.push(r.int(-5, 9));
          const last = n * M - xs.reduce((a, b) => a + b, 0);
          xs.push(last);
          if (last >= -6 && last <= 10) break;
        }
        const SS = xs.reduce((a, x) => a + (x - M) * (x - M), 0);
        const rows = xs.map((x) => [f.num(x, 0), { answer: x - M, dp: 0, tol: { abs: 0.01 } }, { answer: (x - M) * (x - M), dp: 0, tol: { abs: 0.01 } }]);
        rows.push([f.num(xs.reduce((a, b) => a + b, 0), 0) + ' (total)', { answer: 0, dp: 0, tol: { abs: 0.01 } }, { answer: SS, dp: 0, tol: { abs: 0.01 } }]);
        rows.push(['Sample variance (total squares / 4)', '', { answer: f.round(SS / 4, 2), dp: 2, tol: { abs: 0.01 } }]);
        return {
          prompt: `Five monthly returns of a fund (%) have a mean of **${f.num(M, 0)}%**. Complete the deviation table: each deviation, each squared deviation, the two totals and the sample variance (divide by $n - 1 = 4$, answer in %², 2 dp).`,
          columns: ['Return (%)', 'Deviation (return - mean)', 'Squared deviation'],
          rows,
          hints: [
            `Deviation = return minus the mean of ${f.num(M, 0)}%. For the first return, ${f.num(xs[0], 0)}%, that is ${f.num(xs[0], 0)} - ${f.num(M, 0)}. Subtract the same ${f.num(M, 0)} from each of the five returns.`,
            `Square each deviation, keeping the sign in mind: a negative deviation gives a positive square. For the second return, ${f.num(xs[1], 0)}%, work out ${f.num(xs[1], 0)} - ${f.num(M, 0)} and then square it.`,
            `The five deviations must add up to 0, because ${f.num(M, 0)}% is the mean. For the variance, add the five squares and divide that total by 4, not by 5.`,
          ],
          solution: `Deviations: ${xs.map((x) => f.num(x - M, 0)).join(', ')} (sum 0). Squares add to **${f.num(SS, 0)}**, so the sample variance is ${f.num(SS, 0)}/4 = **${f.num(SS / 4, 2)}**, and the SD is ${f.num(Math.sqrt(SS / 4), 2)}%.`,
        };
      },
    },
  ],
});
