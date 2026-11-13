/* Q2.1 Data, averages and the shape of returns */
SA.unit({
  id: 'Q2.1',
  lesson: [
    {
      md: String.raw`## The mean

A list of numbers is hard to interpret directly, so it is summarised by a few typical values and a description of its shape. The running data set is six monthly returns of a fund, in per cent:

$$1.2,\ -0.8,\ 2.0,\ 0.5,\ -3.1,\ 1.8$$

The **mean** (arithmetic average) shares the total equally. All values are added and the sum is divided by their number:

$$\bar x = \frac{x_1 + x_2 + \cdots + x_n}{n}$$

> [!example]
> Sum $= 1.2 - 0.8 + 2.0 + 0.5 - 3.1 + 1.8 = 1.6$.
> Mean $= 1.6/6 =$ **0.27%** per month.

The mean is the balance point of the data. If each value is a weight on a rod, the rod balances at the mean, and the deviations from the mean add to zero.

`,
    },
    {
      md: String.raw`## Expected value and linearity

When outcomes are not equally likely, each is weighted by its probability. This weighted average is the **expected value** $E(X) = \sum x\,P(X = x)$. The mean of a list is the special case in which every value has the same weight $1/n$. The mean of a list of past data is called the sample mean, and the expected value is the mean of the underlying distribution that the data are drawn from. The sample mean is used as an estimate of it.

> [!example]
> A strategy returns -10% with probability 20%, +2% with probability 50% and +8% with probability 30%.
> $E = 0.20 \times (-10) + 0.50 \times 2 + 0.30 \times 8 =$ **1.4%**.

The expected value need not be a value that can occur. The strategy above never returns exactly 1.4%. A loan of EUR 100 that pays back EUR 100 with probability 98% and EUR 40 with probability 2% has an expected repayment of EUR 98.80, which is not one of the two outcomes.

Expected values add up. For any two random quantities, and for constants $a$ and $b$,

$$E(aX + bY) = a\,E(X) + b\,E(Y)$$

This holds whether or not $X$ and $Y$ are related. A portfolio with 60% in a fund with expected return 5% and 40% in a fund with expected return 3% has expected return $0.6 \times 5 + 0.4 \times 3 =$ **4.2%**, whatever the link between the two funds.

An event can be counted with an indicator that equals 1 if it occurs and 0 otherwise. Its expected value is the probability of the event, so the expected number of occurrences is the sum of the probabilities.

> [!example]
> A bank holds 50 loans, each with a 2% chance of default over the year. The expected number of defaults is $50 \times 0.02 =$ **1**.
> This needs no assumption about independence, so it holds even if defaults tend to come together.

> [!recall] Q1.1
> A monthly return of 1.2% means the fund grew by a factor 1.012 that month. Each return is measured against its own starting value.`,
    },
    {
      md: String.raw`## Median and mode

The **median** is the middle value of the sorted list, or the average of the two middle values if $n$ is even. Half of the values lie at or below it and half at or above it. The **mode** is the value that occurs most often, or for a continuous distribution the value where the density peaks. A list may have one mode, several or none, and a distribution with two peaks is called bimodal.

> [!example]
> Sorted returns: $-3.1,\ -0.8,\ 0.5,\ 1.2,\ 1.8,\ 2.0$.
> There are 6 values, so the median is the average of the 3rd and 4th: $(0.5 + 1.2)/2 =$ **0.85%**.
> No value repeats, so there is no mode.
> The mean (0.27%) is below the median (0.85%) because one bad month, -3.1%, pulls the mean down.

The mode is the only one of the three that also applies to categories, such as the most common order type.

The three averages answer different questions. The mean is the value with the smallest total squared distance to the data, and the median is the value with the smallest total absolute distance. The mean is therefore pulled towards extreme values and the median is not.`,
      check: {
        template: 'mcq',
        prompt: 'What is the median of the returns 2, -1, 4, 0, 3?',
        choices: ['2', '1.6', '0', '4'],
        answer: 0,
        solution: 'Sort: -1, 0, 2, 3, 4. The middle (3rd) value is 2. The mean is 1.6, which is a different number.',
      },
    },
    {
      md: String.raw`## Outliers

An **outlier** is a value far from the rest. The mean uses every value in its sum, so one extreme number moves it. The median depends only on the middle of the sorted list and changes little.

> [!example]
> Seven monthly bonuses on a desk (EUR): 4,000, 4,500, 5,000, 5,000, 5,500, 6,000, 60,000.
> Mean $= 90{,}000/7 =$ EUR 12,857. Median $=$ EUR 5,000.
> Six of the seven people received at most EUR 6,000, so the mean does not describe a typical case.

The median is called **robust** because outliers hardly affect it. The mean is sensitive to them.

- For roughly symmetric data without outliers, the mean and median agree and the mean is used.
- For skewed data or data with outliers, such as incomes, house prices, trade sizes or losses in a crisis, the median is reported as well as the mean, or instead of it.

> [!warning]
> A large gap between mean and median indicates skew or outliers. The cause should be identified before choosing between them.`,
    },
    {
      md: String.raw`## Histograms

A table of 200 returns is hard to read. A **histogram** groups the values into **bins**, for instance each 1% wide, counts how many fall in each bin and draws a bar for each count. The counts are the **frequencies**.

> [!example]
> 20 daily returns, bin width 1%:
>
> | Bin | Frequency | Relative frequency |
> |---|---|---|
> | -3% to < -2% | 1 | 5% |
> | -2% to < -1% | 3 | 15% |
> | -1% to < 0% | 5 | 25% |
> | 0% to < 1% | 7 | 35% |
> | 1% to < 2% | 3 | 15% |
> | 2% to < 3% | 1 | 5% |
>
> The tallest bar is "0% to < 1%". This is the **modal bin**, the nearest equivalent of a mode for continuous data.

Dividing each frequency by the total gives the relative frequency, and these add up to 100%. Bins should be wide enough to show a pattern and narrow enough to keep detail.`,
    },
    {
      md: String.raw`## Distribution shapes

The outline of a histogram shows the risk profile of the data.

| Shape | What it looks like | What it means |
|---|---|---|
| **Symmetric** | Mirror image around the centre, mean close to median | Gains and losses of a given size are equally likely |
| **Right-skewed** | Long tail of large gains, mean above median | Occasional large gains with modest typical outcomes |
| **Left-skewed** | Long tail of large losses, mean below median | Frequent small gains and rare large losses |
| **Fat tails** | More extreme values on both sides than a bell curve gives | Crashes and spikes occur more often than a simple model expects |

Many income-generating strategies, including some structured products, show steady results most of the time and a rare large loss. A histogram reveals this where the headline average does not.

The running example has a mean (0.27%) below its median (0.85%) because of one large negative month, which gives a mildly left-skewed shape.`,
    },
    {
      md: String.raw`## The geometric mean

The arithmetic mean adds returns, but wealth multiplies growth factors (F1.5). The average that reproduces the final result is the **geometric mean**:

$$1 + \bar r_{geo} = \big[(1+r_1)(1+r_2)\cdots(1+r_n)\big]^{1/n}$$

> [!example]
> The six months have growth factors $1.012,\ 0.992,\ 1.020,\ 1.005,\ 0.969,\ 1.018$.
> Their product is 1.0151, so the six-month growth is 1.51%.
> Geometric mean $= 1.0151^{1/6} - 1 =$ **0.25%** per month, slightly below the arithmetic 0.27%.

The two means are close for calm data and diverge as returns become more volatile. Returns of +50% and then -50% have an arithmetic mean of 0% and a geometric mean of -13.4%, and the investor ends with 75% of the starting capital.

The arithmetic mean estimates a typical single period. The geometric mean describes what was earned over several periods.

> [!recall] F1.5
> Compound results come from multiplying growth factors. Averaging them with a geometric mean reproduces the final wealth, and the arithmetic mean overstates it whenever the returns differ.`,
    },
    {
      md: String.raw`## Summary

- Mean is the total divided by the count. Median is the middle of the sorted list and mode is the most frequent value. With unequal weights the mean becomes an expected value, which need not be a possible outcome.
- Expected values add, so the expected return of a portfolio is the weighted average of the expected returns of its parts, whatever the links between them.
- Outliers move the mean but hardly affect the median. A large gap between them calls for a look at the shape of the data.
- A histogram counts values per bin. The shape can be symmetric, skewed or fat-tailed.
- For multi-period returns the geometric mean matches the final wealth, and the arithmetic mean overstates it when returns differ.`,
    },
  ],

  exercises: [
    {
      id: 'mean-median-mode',
      template: 'numeric',
      generate(r, f) {
        const stat = r.pick(['mean', 'median', 'mode']);
        const n = r.int(6, 12);
        const copies = r.int(2, 3);
        const pool = [];
        for (let t = -16; t <= 16; t++) pool.push(t / 2);
        const v = r.pick(pool);
        const rest = r.sample(pool.filter((x) => x !== v), n - copies);
        const vals = r.shuffle(Array(copies).fill(v).concat(rest));
        const sorted = vals.slice().sort((a, b) => a - b);
        const mean = vals.reduce((a, b) => a + b, 0) / n;
        const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
        const list = vals.map((x) => f.num(x, 1)).join(', ');
        const ans = stat === 'mean' ? f.round(mean, 2) : stat === 'median' ? f.round(median, 2) : v;
        const hints = {
          mean: [`Add all ${n} values.`, `Divide the sum (${f.num(vals.reduce((a, b) => a + b, 0), 1)}) by ${n}.`],
          median: ['Sort the values from smallest to largest.', n % 2 ? 'With an odd count, take the middle value.' : 'With an even count, average the two middle values.'],
          mode: ['Look for the value that appears more than once.', 'Count how often each value occurs.'],
        }[stat];
        return {
          prompt: `Monthly returns of a fund (%): **${list}**. What is the **${stat}**? (answer in %, 2 dp)`,
          answer: ans, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints,
          solution: `Mean $= ${f.num(vals.reduce((a, b) => a + b, 0), 1)}/${n} = ${f.num(mean, 2)}$. Sorted: ${sorted.map((x) => f.num(x, 1)).join(', ')}. Median $= ${f.num(median, 2)}$. Mode $= ${f.num(v, 1)}$ (appears ${copies} times). The answer is the **${stat}**: **${f.num(ans, 2)}%**.`,
        };
      },
    },
    {
      id: 'representative-average',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const scenarios = [
          { what: `monthly bonuses on a trading desk (${CCY})`, base: 5000 },
          { what: `trade sizes in a client account (${CCY})`, base: 20000 },
          { what: `house prices in a mortgage portfolio (${CCY} thousand)`, base: 300 },
          { what: `annual fees paid by private-banking clients (${CCY})`, base: 8000 },
          { what: `daily P&L of a desk (${CCY})`, base: 10000 },
          { what: 'time to settle trades after a system fault (minutes)', base: 40 },
          { what: `balances of savings accounts (${CCY})`, base: 12000 },
          { what: `claims paid by an insurer (${CCY})`, base: 3000 },
        ];
        const sc = r.pick(scenarios);
        const typical = [];
        const used = new Set();
        while (typical.length < 6) {
          const x = Math.round(sc.base * (0.75 + r.int(0, 50) / 100));
          if (!used.has(x)) { used.add(x); typical.push(x); }
        }
        const out = sc.base * r.int(9, 16);
        const all = r.shuffle(typical.concat([out]));
        const mean = all.reduce((a, b) => a + b, 0) / 7;
        const sorted = all.slice().sort((a, b) => a - b);
        const median = sorted[3];
        const meanNo = typical.reduce((a, b) => a + b, 0) / 6;
        const sortedNo = typical.slice().sort((a, b) => a - b);
        const medianNo = (sortedNo[2] + sortedNo[3]) / 2;
        const list = all.map((x) => f.num(x, 0)).join(', ');
        const q = r.int(0, 1);
        if (q === 0) {
          return {
            prompt: `Seven observations of ${sc.what}: **${list}**. One value is far larger than the rest. Which statistic best describes a typical observation?`,
            choices: ['The median', 'The mean', 'The largest value', 'The sum of all values'],
            answer: 0,
            hints: ['Which average is hardly affected by one extreme value?'],
            solution: `The mean is ${f.num(mean, 0)} (pulled up by ${f.num(out, 0)}), while the median is ${f.num(median, 0)}. The median is robust to the outlier, so it describes a typical observation better.`,
          };
        }
        return {
          prompt: `Seven observations of ${sc.what}: **${list}**. The largest value is removed. Which statistic changes more?`,
          choices: ['The mean', 'The median', 'Both change by the same amount', 'Neither changes'],
          answer: 0,
          hints: ['The mean uses the size of every value; the median uses only their order.'],
          solution: `The mean drops from ${f.num(mean, 0)} to ${f.num(meanNo, 0)}; the median moves only from ${f.num(median, 0)} to ${f.num(medianNo, 0)}. The mean is far more sensitive to the outlier.`,
        };
      },
    },
    {
      id: 'frequency-table',
      template: 'table',
      generate(r, f) {
        let tenths, counts;
        for (let t = 0; t < 100; t++) {
          tenths = [];
          for (let i = 0; i < 20; i++) tenths.push(r.int(-15, 14) + r.int(-15, 14));
          counts = [0, 0, 0, 0, 0, 0];
          tenths.forEach((x) => { counts[Math.floor(x / 10) + 3]++; });
          const mx = Math.max(...counts);
          if (counts.filter((c) => c === mx).length === 1) break;
        }
        const mx = Math.max(...counts);
        const labels = ['-3% to < -2%', '-2% to < -1%', '-1% to < 0%', '0% to < 1%', '1% to < 2%', '2% to < 3%'];
        const list = tenths.map((x) => f.num(x / 10, 1)).join(', ');
        const rows = labels.map((l, k) => [l, { answer: counts[k], dp: 0, tol: { abs: 0.01 } }, { accept: [counts[k] === mx ? 'yes' : 'no'] }]);
        return {
          prompt: `Twenty daily returns of a share (%): **${list}**. Count how many fall in each 1% bin (a bin includes its lower edge, not its upper edge). Then mark the bin with the tallest bar with *yes* and the others with *no*.`,
          columns: ['Bin', 'Count', 'Tallest bar? (yes/no)'],
          rows,
          hints: [
            `Go through the list once, in order, and tally each value into its bin. The first value, ${f.num(tenths[0] / 10, 1)}%, belongs in the bin "${labels[Math.floor(tenths[0] / 10) + 3]}".`,
            `Next: ${f.num(tenths[1] / 10, 1)}% goes in "${labels[Math.floor(tenths[1] / 10) + 3]}", ${f.num(tenths[2] / 10, 1)}% in "${labels[Math.floor(tenths[2] / 10) + 3]}" and ${f.num(tenths[3] / 10, 1)}% in "${labels[Math.floor(tenths[3] / 10) + 3]}". A value equal to a bin's lower edge belongs in that bin.`,
            `Check your tally in two ways: the six counts must add up to 20, and the three bins below 0% must together hold ${tenths.filter((x) => x < 0).length} values, the number of negative returns in the list.`,
          ],
          solution: `Counts: ${labels.map((l, k) => `${l}: ${counts[k]}`).join(', ')}. The most frequent bin is **${labels[counts.indexOf(mx)]}**.`,
        };
      },
    },
    {
      id: 'arith-vs-geo',
      template: 'numeric',
      generate(r, f) {
        const n = r.int(4, 6);
        let rets;
        for (let t = 0; t < 100; t++) {
          rets = [];
          for (let i = 0; i < n; i++) rets.push(r.int(-20, 30));
          if (rets.some((x) => x < 0) && rets.some((x) => x > 0)) break;
        }
        const prod = rets.reduce((a, b) => a * (1 + b / 100), 1);
        const geo = f.round((Math.pow(prod, 1 / n) - 1) * 100, 2);
        const arith = rets.reduce((a, b) => a + b, 0) / n;
        const list = rets.map((x) => (x >= 0 ? '+' : '') + x + '%').join(', ');
        return {
          prompt: `A fund returned **${list}** in ${n} consecutive years. What is the **geometric** (compound) average yearly return? (answer in %, 2 dp)`,
          answer: geo, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [
            'Turn each return into a growth factor: for +12%, use 1.12; for -5%, use 0.95.',
            `Multiply all ${n} factors together.`,
            `Take the ${n}-th root (power $1/${n}$) and subtract 1.`,
          ],
          solution: `Product of factors $= ${f.num(prod, 4)}$; $${f.num(prod, 4)}^{1/${n}} - 1$ = **${f.num(geo, 2)}%** a year. The arithmetic mean is ${f.num(arith, 2)}%, which overstates the compound result.`,
        };
      },
    },
    {
      id: 'shape-match',
      template: 'match',
      generate(r) {
        const groups = {
          'Symmetric': [
            'Bars mirror each other around the centre; mean and median are nearly equal',
            'Equal-sized gains and losses are equally common; the histogram looks like a bell',
            'The centre bar is tallest and the left and right halves look alike',
          ],
          'Right-skewed (long tail of large gains)': [
            'Most values are small, a few very large positive values stretch the right side; mean above median',
            'A long right tail; the median sits to the left of the mean',
            'Frequent modest outcomes with occasional big wins, like a lottery',
          ],
          'Left-skewed (long tail of large losses)': [
            'Most values are small gains, a few very large losses stretch the left side; mean below median',
            'A long left tail; the median sits to the right of the mean',
            'Steady small gains punctuated by rare big losses',
          ],
          'Fat tails': [
            'The centre looks bell-shaped, but extreme values appear on both sides more often than a bell curve predicts',
            'Bars in the far ends of both tails are taller than a normal curve would give',
            'Crashes and spikes happen more often than a simple model suggests',
          ],
        };
        const names = r.shuffle(Object.keys(groups));
        return {
          prompt: 'Pair each description of a return histogram with its shape.',
          pairs: names.map((nm) => [r.pick(groups[nm]), nm]),
          hints: ['Look at which side the long tail points to and where the mean sits relative to the median.', 'Fat tails refer to both ends of the histogram.'],
          solution: 'Symmetric: mirror image. Right-skewed: tail of large gains, mean above median. Left-skewed: tail of large losses, mean below median. Fat tails: extreme values on both sides, more often than a bell curve would give.',
        };
      },
    },
  ],
});
