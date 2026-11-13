/* Q2.4 Distributions, the normal curve and sampling */
SA.unit({
  id: 'Q2.4',
  lesson: [
    {
      md: String.raw`## Random variables and distributions

A **random variable** is a quantity whose value depends on a random outcome, such as the number of failed trades in a day or the return of a share tomorrow. Its **distribution** gives the probability of each value or range of values.

A discrete random variable takes separate values (0, 1, 2 fails) and a probability is attached to each value. A continuous random variable, such as a return, takes any value in a range, and probabilities are attached to ranges. This unit covers one distribution of each type, then shows how precisely an average can be estimated from a sample.

> [!recall] Q2.3
> Probabilities of independent events multiply. A distribution is the list of these probabilities over all possible outcomes.`,
    },
    {
      md: String.raw`## The binomial distribution

Ten independent trades are sent, each failing with probability $p = 5\%$. The number of fails $X$ can be 0, 1, 2, up to 10. A count of successes in $n$ independent trials with the same probability $p$ follows the **binomial** distribution:

$$P(X = k) = \binom{n}{k}\, p^{k}\,(1-p)^{n-k}$$

The formula has two parts:
- $p^k(1-p)^{n-k}$ is the probability of one particular pattern with $k$ fails and $n-k$ successes, from the multiplication rule of Q2.3.
- $\binom{n}{k} = \dfrac{n!}{k!\,(n-k)!}$ is the number of such patterns. For $k=1$ it is $n$, and for $k=2$ it is $n(n-1)/2$.

> [!example]
> $n = 10$, $p = 0.05$:
> - $P(X=0) = 0.95^{10} = 59.9\%$
> - $P(X=1) = 10 \times 0.05 \times 0.95^{9} = 31.5\%$
> - $P(X=2) = 45 \times 0.05^2 \times 0.95^{8} = 7.5\%$
>
> At most one fail occurs on about 9 days in 10. The probability of at least one fail is $1 - P(X=0) = 40.1\%$.

The mean of a binomial count is $np$ and its variance is $np(1-p)$. The mean follows from adding $n$ indicators, each with expected value $p$. Here the mean is $10 \times 0.05 = 0.5$ fails a day and the SD is $\sqrt{10 \times 0.05 \times 0.95} = 0.69$. The count of fails is a whole number, so a mean of 0.5 means 0.5 fails per day on average over many days.`,
      check: {
        template: 'mcq',
        prompt: 'Among 3 independent trades, each failing with probability 10%, how many different patterns have one fail?',
        choices: ['3', '1', '10', '0.3'],
        answer: 0,
        solution: '$\\binom{3}{1} = 3$: the fail can be the first, the second or the third trade. Each pattern has probability $0.1 \\times 0.9^2$.',
      },
    },
    {
      md: String.raw`## The normal distribution and the z-score

Daily returns on a liquid share are often modelled by a **normal distribution**. Its density is a symmetric bell centred on the mean $\mu$, and its width is set by the standard deviation $\sigma$ (Q2.2). These two numbers describe the whole curve.

Any normal variable $X$ can be converted to a standard normal variable, with mean 0 and SD 1, by the **z-score**:

$$z = \frac{x - \mu}{\sigma}$$

A $z$ of 0 is the mean, +1 is one SD above it and -2 is two SDs below it. Tables of the standard normal then apply to every normal variable.

> [!example]
> Daily returns have mean 0.04% and SD 1.0%. For a day of -2%:
> $z = \dfrac{-2 - 0.04}{1.0} =$ **-2.04**.
> The return is a little over two SDs below the mean. About 2% of days are this bad or worse.

The same $z$ indicates the same rarity for any series, whether returns, spreads or trade sizes. Risk reports therefore state moves in "sigmas".`,
    },
    {
      md: String.raw`## The 68-95-99.7 rule

For a normal variable, fixed shares of the values fall within given distances of the mean:

| Range | Share of values |
|---|---|
| within $\pm 1$ SD ($z$ from -1 to 1) | about 68% |
| within $\pm 2$ SD | about 95% |
| within $\pm 3$ SD | about 99.7% |

The curve is symmetric, so the share outside a range is split evenly between the tails. Beyond 2 SD on both sides is 5%, so 2.5% lies below -2 SD and 2.5% above +2 SD.

> [!example]
> A fund has a mean annual return of 6% and a volatility (SD) of 12%.
> - 68% of years lie between $6 - 12 = -6\%$ and $6 + 12 = 18\%$.
> - 95% of years lie between $6 - 24 = -18\%$ and $6 + 24 = 30\%$.
> - A loss worse than -18% (below -2 SD) occurs in about 2.5% of years, or once in 40.

> [!warning]
> Real returns have fatter tails than the normal curve (Q2.1). Falls of four or five SDs occur much more often than a normal curve predicts, so the rule is a first approximation and not a safety limit.`,
    },
    {
      md: String.raw`## Sample mean and the law of large numbers

Only a **sample** of returns is observed, and the **sample mean** is the estimate of the true mean. Two results describe how good the estimate is.

1. **Law of large numbers.** As the number of independent observations grows, the sample mean settles close to the true mean.
2. **Standard error.** The sample mean has its own spread, which is much smaller than the spread of single observations. For $n$ independent observations with SD $\sigma$:

$$SE = \frac{\sigma}{\sqrt{n}}$$

The standard error is the standard deviation of an estimate, here of the sample mean. The true $\sigma$ is not known in practice, so the sample SD $s$ (Q2.2, with $n-1$ in the denominator) replaces it and gives the estimated standard error $s/\sqrt{n}$. Averaging cancels part of the random ups and downs. The cancellation follows a square-root law, like the scaling of volatility with time in Q2.2.

> [!example]
> Daily returns have SD 1.0%.
> - With $n = 100$ days, $SE = 1.0/\sqrt{100} = 0.10\%$.
> - With $n = 400$ days, $SE = 1.0/\sqrt{400} = 0.05\%$. Four times the data halves the standard error.
>
> A sample mean from 100 days is accurate to roughly $\pm 0.2\%$ (two standard errors), while a typical daily move is 1%. The average of a short sample of returns is therefore noisy and says little about whether a fund is skilled.

> [!recall] Q1.3
> Square roots: $\sqrt{100} = 10$ and $\sqrt{400} = 20$.`,
      check: {
        template: 'mcq',
        prompt: 'The standard error of a sample mean is 0.40% with 25 observations. What is it with 100 observations from the same source?',
        choices: ['0.20%', '0.10%', '0.80%', '0.40%'],
        answer: 0,
        solution: 'Four times the data halves the standard error: $0.40\\% / \\sqrt{4} = 0.20\\%$.',
      },
    },
    {
      md: String.raw`## Sample means are approximately normal

The **central limit theorem** says that the sum or average of many independent observations with the same distribution is approximately normal, whatever the shape of the single observations. The approximation improves as $n$ grows, and it is poorer for strongly skewed or fat-tailed data. The centre of the approximating curve is the true mean and its SD is the standard error $\sigma/\sqrt{n}$.

The 68-95-99.7 rule then applies to the sample mean. About 95% of sample means lie within two standard errors of the true mean. Turned round, the true mean is usually within two standard errors of the sample mean, which gives an approximate 95% interval $\bar x \pm 2\,SE$.

> [!example]
> Over 250 days a share has a sample mean daily return of 0.06% and a sample SD of 1.2%.
> $SE = 1.2/\sqrt{250} = 0.076\%$.
> The approximate 95% interval is $0.06 \pm 2 \times 0.076$, from -0.09% to 0.21%.
> The interval includes zero, so the data do not show that the true mean daily return differs from zero.

> [!recall] Q2.3
> Applied to a count of fails out of $n$ trades with fail probability $p$, the same result gives the standard error of the observed fail rate: $\sqrt{p(1-p)/n}$. With $p = 2\%$ and $n = 400$ it is $\sqrt{0.02 \times 0.98 / 400} = 0.7\%$.`,
    },
    {
      md: String.raw`## Common errors

- A z-score is a distance in SD units and not a probability. The 68-95-99.7 rule or a table converts it into a probability.
- The standard error is not the standard deviation. The SD describes individual returns and the SE describes the precision of their average.
- Precision improves slowly with data. Halving the error takes four times the data, and cutting it to a tenth takes a hundred times.
- The normal distribution is an approximation. Return series have fat tails and volatility clusters, so the rules above understate rare events.
- The SE and the binomial formula assume independent observations. Overlapping or related data make the sample look larger than it is.
- The law of large numbers concerns long-run averages and does not balance individual streaks. After five losing days, a gain is not due on the sixth.`,
    },
    {
      md: String.raw`## Summary

- Binomial: the probability of $k$ events in $n$ independent trials is $\binom{n}{k}p^k(1-p)^{n-k}$.
- The z-score $(x - \mu)/\sigma$ counts SDs from the mean. Normal values lie within 1, 2 and 3 SDs of the mean about 68%, 95% and 99.7% of the time.
- A sample mean approaches the true mean as data grows (law of large numbers), and its standard error is $\sigma/\sqrt{n}$, estimated with the sample SD. Four times the data halves the standard error.
- For large $n$ the sample mean is approximately normal, so about 95% of sample means lie within two standard errors of the true mean.
- Real returns are fat-tailed, so normal-curve probabilities are a first approximation.`,
    },
  ],

  exercises: [
    {
      id: 'z-score',
      template: 'numeric',
      generate(r, f) {
        const mu = r.float(-0.5, 1.5, 0.05);
        const sd = r.float(0.5, 3, 0.1);
        const kz = r.float(-4, 4, 0.25);
        const x = f.round(mu + kz * sd, 2);
        const z = f.round((x - mu) / sd, 2);
        const verdict = Math.abs(z) < 1 ? 'within the normal range (inside 1 SD)' : Math.abs(z) < 2 ? 'moderately unusual (between 1 and 2 SD)' : Math.abs(z) < 3 ? 'unusual (between 2 and 3 SD)' : 'extreme (beyond 3 SD)';
        const what = r.pick(['daily return', 'monthly return', 'weekly return']);
        return {
          prompt: `A fund's ${what} has mean **${f.num(mu, 2)}%** and standard deviation **${f.num(sd, 2)}%**. This period the return was **${f.num(x, 2)}%**. What is its z-score? (2 dp)`,
          answer: z, dp: 2, tol: { abs: 0.02 }, unit: '',
          hints: [
            `Subtract the mean: ${f.num(x, 2)} $-$ ${f.num(mu, 2)} $=$ ${f.num(x - mu, 2)}.`,
            `Divide by the standard deviation ${f.num(sd, 2)}.`,
          ],
          solution: `$z = \\dfrac{x - \\mu}{\\sigma} = \\dfrac{${f.num(x, 2)} - ${f.num(mu, 2)}}{${f.num(sd, 2)}}$ = **${f.num(z, 2)}**. That is ${verdict}.`,
        };
      },
    },
    {
      id: 'empirical-rule',
      template: 'numeric',
      generate(r, f) {
        const mu = r.float(-0.5, 1.5, 0.1);
        const sd = r.float(0.5, 3, 0.1);
        const val = (k) => f.round(mu + k * sd, 1);
        const cases = [
          { p: 68, text: (m) => `between **${f.num(val(-1), 1)}%** and **${f.num(val(1), 1)}%**` },
          { p: 95, text: () => `between **${f.num(val(-2), 1)}%** and **${f.num(val(2), 1)}%**` },
          { p: 99.7, text: () => `between **${f.num(val(-3), 1)}%** and **${f.num(val(3), 1)}%**` },
          { p: 16, text: () => `**above ${f.num(val(1), 1)}%**` },
          { p: 2.5, text: () => `**below ${f.num(val(-2), 1)}%**` },
          { p: 0.3, text: () => `**outside** the range ${f.num(val(-3), 1)}% to ${f.num(val(3), 1)}% (either side)` },
          { p: 47.5, text: () => `between the mean (**${f.num(mu, 1)}%**) and **${f.num(val(2), 1)}%**` },
          { p: 81.5, text: () => `between **${f.num(val(-1), 1)}%** and **${f.num(val(2), 1)}%**` },
          { p: 0.15, text: () => `**above ${f.num(val(3), 1)}%**` },
          { p: 34, text: () => `between the mean (**${f.num(mu, 1)}%**) and **${f.num(val(1), 1)}%**` },
        ];
        const c = r.pick(cases);
        return {
          prompt: `Daily returns of a share are roughly normal with mean **${f.num(mu, 1)}%** and standard deviation **${f.num(sd, 1)}%**. Using the 68-95-99.7 rule, what is the approximate probability that a day's return is ${c.text()}? (answer in %)`,
          answer: c.p, dp: 2, tol: { abs: 0.06 }, unit: '%',
          hints: [
            `Convert the limits to SD multiples: (limit $-$ ${f.num(mu, 1)}) / ${f.num(sd, 1)}.`,
            'Recall: 68% within 1 SD, 95% within 2 SD, 99.7% within 3 SD.',
            'Use symmetry: the share outside a range is split equally between the two tails.',
          ],
          solution: `In SD units the limits are ${c.text().replace(/\*\*/g, '')}. Using 68-95-99.7 and symmetry the probability is about **${c.p}%**.`,
        };
      },
    },
    {
      id: 'standard-error',
      template: 'numeric',
      generate(r, f) {
        const sd = r.float(0.5, 3, 0.1);
        if (r.bool(0.7)) {
          const n = r.pick([4, 9, 16, 25, 36, 64, 100, 144, 225, 400]);
          const se = f.round(sd / Math.sqrt(n), 3);
          return {
            prompt: `Daily returns of a share have a standard deviation of **${f.num(sd, 1)}%**. You estimate the mean from **${n} independent days**. What is the standard error of the sample mean? (answer in %, 3 dp)`,
            answer: se, dp: 3, tol: { abs: 0.001 }, unit: '%',
            hints: [`$SE = \\sigma/\\sqrt{n}$ with $n = ${n}$.`, `$\\sqrt{${n}} = ${Math.sqrt(n)}$.`],
            solution: `$SE = \\dfrac{${f.num(sd, 1)}}{\\sqrt{${n}}} = \\dfrac{${f.num(sd, 1)}}{${Math.sqrt(n)}}$ = **${f.num(se, 3)}%**`,
          };
        }
        const k = r.pick([2, 4, 5, 10]);
        const target = sd / k;
        const nreq = k * k;
        return {
          prompt: `Daily returns have a standard deviation of **${f.num(sd, 1)}%**. How many independent days of data do you need so that the standard error of the sample mean falls to **${f.num(target, 3)}%**? (number of days)`,
          answer: nreq, dp: 0, tol: { abs: 1 }, unit: '',
          hints: [`$SE = \\sigma/\\sqrt{n}$, so $\\sqrt{n} = \\sigma / SE = ${f.num(sd, 1)}/${f.num(target, 3)} = ${k}$.`, 'Square both sides to get $n$.'],
          solution: `$\\sqrt{n} = ${f.num(sd, 1)}/${f.num(target, 3)} = ${k}$, so $n = ${k}^2$ = **${nreq}** days.`,
        };
      },
    },
    {
      id: 'sampling-statements',
      template: 'mcq',
      generate(r, f) {
        const k = r.pick([4, 9, 16]);
        const rt = Math.sqrt(k);
        const m = r.pick([25, 100, 400]);
        const trues = [
          `Multiplying the number of independent observations by ${k} divides the standard error of the sample mean by ${rt}.`,
          'As the number of independent observations grows, the sample mean tends to settle close to the true mean.',
          'The standard error measures the uncertainty of the sample mean, not the spread of individual returns.',
          `A sample mean based on ${m * 4} independent daily returns is more precise than one based on ${m}, from the same source.`,
          'The standard error of the mean is smaller than the standard deviation of single observations when n > 1.',
        ];
        const falses = [
          `Doubling the number of observations halves the standard error of the sample mean.`,
          'After a long run of losses, a gain becomes more likely because the law of large numbers balances things out.',
          'The standard error equals the standard deviation whatever the sample size.',
          'With only 10 observations, the sample mean is exactly the true mean.',
          'The law of large numbers says the total of the outcomes gets ever closer to its expected value in absolute euros.',
          'A larger sample makes the individual returns less volatile.',
          'The standard error grows as the sample gets bigger, because there are more values to average.',
        ];
        const t = r.pick(trues);
        const fs = r.sample(falses, 3);
        const choices = r.shuffle([t, ...fs]);
        return {
          prompt: 'Which statement about sampling and the law of large numbers is **correct**?',
          choices,
          answer: choices.indexOf(t),
          fixedOrder: true,
          hints: ['Recall $SE = \\sigma/\\sqrt{n}$.', 'The law of large numbers is about averages in the long run, not about streaks balancing out.'],
          solution: `Correct: "${t}" The others contradict $SE = \\sigma/\\sqrt{n}$ (the error falls with the square root of the sample size) or confuse averages with streaks and totals.`,
        };
      },
    },
    {
      id: 'binomial-prob',
      template: 'numeric',
      generate(r, f) {
        const n = r.int(3, 10);
        const pPct = r.pick([5, 10, 15, 20, 25, 30]);
        const k = r.int(0, Math.min(3, n));
        const p = pPct / 100;
        let comb = 1;
        for (let i = 1; i <= k; i++) comb = comb * (n - k + i) / i;
        const prob = comb * Math.pow(p, k) * Math.pow(1 - p, n - k);
        const ans = f.round(prob * 100, 2);
        return {
          prompt: `Each of **${n}** independent trades has a **${pPct}%** chance of failing to settle. What is the probability that the number of fails is **${k}**? (answer in %, 2 dp)`,
          answer: ans, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [
            `Number of patterns: $\\binom{${n}}{${k}} = ${f.num(comb, 0)}$.`,
            `Probability of one pattern: $${f.num(p, 2)}^{${k}} \\times ${f.num(1 - p, 2)}^{${n - k}}$.`,
            'Multiply the number of patterns by the probability of one pattern.',
          ],
          solution: `$P(X=${k}) = \\binom{${n}}{${k}}\\, ${f.num(p, 2)}^{${k}}\\, ${f.num(1 - p, 2)}^{${n - k}} = ${f.num(comb, 0)} \\times ${f.num(Math.pow(p, k) * Math.pow(1 - p, n - k), 6)}$ = **${f.num(ans, 2)}%**`,
        };
      },
    },
  ],
});
