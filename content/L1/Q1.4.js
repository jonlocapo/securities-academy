/* Q1.4 Functions and graphs */
SA.unit({
  id: 'Q1.4',
  lesson: [
    {
      md: String.raw`## Functions and function notation

A **function** is a rule that gives one output only for each input. The set of allowed inputs is the **domain** and the set of outputs that actually occur is the **range**. The output is said to be a function of the input.

A broker's price list assigns one fee to each trade size, so the fee is a function of the trade size. The reverse does not hold: two different trade sizes can carry the same fee (for example, every trade below EUR 5,000 under a EUR 5 minimum), so a fee does not identify a unique trade size.

Function notation names the rule. $f(x)$ is read "$f$ of $x$" and means the output of $f$ for the input $x$. The parentheses show that $x$ is the input. They do not mean multiplication.

$$f(x) = 0.001\,x$$

This is the fee on a trade of notional $x$ at 0.10%. To evaluate it, replace $x$ by the input. For a EUR 20,000 trade, $f(20{,}000) = 0.001 \times 20{,}000 = 20$, a fee of EUR 20. The input can also be an expression: $f(a + b)$ means "add $a$ and $b$, then apply $f$".

> [!recall] Q1.2
> The trade identity $A = n \times p$ is a function: for a fixed number of shares $n$, the amount $A$ is a function of the price $p$.`,
    },
    {
      md: String.raw`## Domain and range

The domain contains the inputs for which the rule works in practice and in arithmetic. A notional cannot be negative, so the domain of the fee function is $N \ge 0$. A formula also excludes any input that would divide by zero.

Interval notation writes the domain compactly. A square bracket includes an endpoint and a round bracket excludes it, so $[0, \infty)$ means every number from 0 upwards. The range of the fee function is also $[0, \infty)$, because no fee is negative.

A function can be given in words, as a formula, as a table or as a graph. Each form carries the same information. In a table, one row is one input and its output. On a graph, a curve represents a function if no vertical line meets it in more than one point.

| Notional (EUR) | Fee (EUR) |
|---|---|
| 5,000 | 5.00 |
| 10,000 | 10.00 |
| 20,000 | 20.00 |`,
      check: {
        template: 'mcq',
        prompt: 'A table lists the fee charged for each notional. Which statement is true for the table to define the fee as a function of the notional?',
        choices: ['Each notional in the table has one fee only', 'Each fee in the table has one notional only', 'Fees must increase as notional increases', 'Notionals must be whole thousands'],
        answer: 0,
        solution: 'A function gives one output per input. Several notionals may share one fee, but one notional may not have two fees.',
      },
    },
    {
      md: String.raw`## Linear functions: slope and intercept

A **linear function** has the form

$$f(x) = m\,x + c$$

The **intercept** $c$ is the value at $x = 0$, the starting value or fixed part. The **slope** $m$ is the rate of change: the change in output per one unit of input. It can be found from any two points on the line.

$$m = \frac{\text{change in output}}{\text{change in input}} = \frac{y_2 - y_1}{x_2 - x_1}$$

A positive slope gives an increasing function (the graph rises from left to right). A negative slope gives a decreasing function. A slope of zero gives a constant function with a horizontal graph.

> [!example]
> An account costs EUR 6 a month plus EUR 0.50 per trade. The cost of $x$ trades is $f(x) = 0.50\,x + 6$.
> Slope: EUR 0.50 per trade. Intercept: EUR 6, paid even with no trades.
> From a table, $f(2) = 7$ and $f(10) = 11$, so $m = (11 - 7)/(10 - 2) = 4/8 = 0.50$.`,
      check: {
        template: 'mcq',
        prompt: 'A fee is $f(x) = 0.002\\,x + 8$ with $x$ the notional in EUR. What does the number 8 mean?',
        choices: ['A fixed charge of EUR 8, even for a tiny trade', 'The fee per EUR of notional', 'The notional at which the fee is zero', 'The maximum fee'],
        answer: 0,
        solution: 'It is the intercept, the value of $f$ when $x = 0$.',
      },
    },
    {
      md: String.raw`## Modelling with linear functions

To build a linear model from a description, identify the variables, find the slope and the starting value, and write $f(x) = mx + c$. Then check that the result is reasonable.

A holder buys $n$ shares at EUR 20. If the price later becomes $S$, the profit is $P(S) = n(S - 20) = nS - 20n$. The slope is $n$, because each EUR 1 move in the price changes the profit by EUR $n$. The intercept is $-20n$, the loss if the price fell to zero.

> [!example]
> $n = 100$ shares at EUR 20.
> $P(S) = 100(S - 20) = 100\,S - 2{,}000$.
> $P(25) = 100 \times 5 =$ EUR 500 and $P(18) = 100 \times (-2) =$ **-EUR 200**.
> The graph crosses zero at $S = 20$, the **break-even** price.

The point where the output is zero is the horizontal intercept. Setting $f(x) = 0$ and solving for $x$ finds it.

This straight-line payoff is the profile of owning a share. Options and structured products later change its shape.`,
    },
    {
      md: String.raw`## Where two lines cross

Two linear models can be compared by finding the input at which their outputs are equal. Graphically this is the point where the lines intersect. Algebraically it is the solution of $f_1(x) = f_2(x)$.

Broker A charges $f_A(N) = 4 + 0.0005\,N$. Broker B charges $f_B(N) = 0.001\,N$ with no fixed part.

1. Set the fees equal: $4 + 0.0005\,N = 0.001\,N$.
2. Subtract $0.0005\,N$ from both sides: $4 = 0.0005\,N$.
3. Divide by 0.0005: $N = 4 / 0.0005 = 8{,}000$.

At $N = 8{,}000$ both give EUR 8. Below this size B is cheaper, because its fixed part is lower. Above it A is cheaper, because its slope is lower.

> [!tip]
> To compare two pricing schemes, compare the fixed parts, compare the slopes and find where the schemes cross.`,
    },
    {
      md: String.raw`## Piecewise functions: floors, caps and tiers

A **piecewise** function uses a different formula on each part of its domain. Fee schedules and payoffs are often of this kind. They can be written with a formula for each piece or with $\max$ and $\min$.

- **Minimum fee**: $f(N) = \max(5,\; 0.001\,N)$, the larger of the two numbers.
- **Cap**: $f(N) = \min(0.001\,N,\; 50)$, the smaller of the two.

The rule changes where the two pieces are equal. For the minimum fee, $5 = 0.001\,N$ gives $N = 5/0.001 = 5{,}000$.

> [!example]
> Fee $= \max(5,\; 0.001\,N)$.
> $N = 2{,}000$: $0.001 \times 2{,}000 = 2$, which is below 5, so the fee is **EUR 5**.
> $N = 5{,}000$: both pieces give 5.
> $N = 30{,}000$: $0.001 \times 30{,}000 = 30$, which is above 5, so the fee is **EUR 30**.

The graph is flat at 5 up to EUR 5,000 and then rises with slope 0.001. A capped fee has the opposite shape: it rises and then becomes flat. A tiered schedule, with a different rate for each band of notional, has a kink at each band boundary.

> [!eu]
> Many EU retail brokers charge a minimum ticket fee plus a percentage, sometimes with a maximum per order.`,
    },
    {
      md: String.raw`## Quadratic functions and the vertex

A **quadratic** function has a squared term: $f(x) = a x^2 + b x + c$ with $a \ne 0$. Its graph is a parabola. For $a > 0$ the parabola opens upwards and has a lowest point, the **vertex**, at

$$x^* = -\frac{b}{2a}$$

The minimum value of the function is $f(x^*)$. For $a < 0$ the parabola opens downwards and the vertex is a maximum. The domain is all real numbers, and the range starts or ends at the vertex value.

A cost model gives an example. Very small orders carry a high fixed cost per unit, and very large orders move the market price, so total cost has a lowest point at an intermediate size.

> [!example]
> Cost of executing $q$ lots: $C(q) = 2q^2 - 24q + 100$.
> Vertex: $q^* = -(-24)/(2 \times 2) = 24/4 = 6$.
> Minimum cost: $C(6) = 2 \times 36 - 144 + 100 =$ **28**.
> A neighbouring value is higher: $C(5) = 50 - 120 + 100 = 30$.

> [!warning]
> $(x+3)^2$ equals $x^2 + 6x + 9$, not $x^2 + 9$. The whole bracket is squared.`,
    },
    {
      md: String.raw`## Summary

- A function gives one output for each input. $f(x)$ is the output at $x$, and the domain lists the allowed inputs.
- A linear function $f(x) = mx + c$ has slope $m$, the change in output per unit of input, and intercept $c$, the value at $x = 0$.
- A long share position has a straight-line profit with slope equal to the number of shares and a zero at the purchase price.
- Piecewise fees use $\max$ for a floor and $\min$ for a cap, and the graph changes direction where the pieces are equal.
- Two schedules cost the same where $f_1(x) = f_2(x)$. A quadratic $ax^2 + bx + c$ has its vertex at $x = -b/(2a)$.`,
    },
  ],

  exercises: [
    {
      id: 'evaluate-fee-function',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const mn = M.amt(r.int(3, 15));
        const rt = r.int(5, 25) / 10000;
        const capped = r.bool();
        const cap = capped ? M.amt(r.int(2, 10) * 10) + mn : null;
        const thr = mn / rt;
        const N = r.pick([0.2, 0.5, 0.9, 1.5, 3, 6, 12, 25, 60]) * thr;
        const Nr = Math.round(N / 100) * 100;
        let v = Math.max(mn, rt * Nr);
        if (capped) v = Math.min(v, cap);
        v = f.round(v, 2);
        const rule = capped
          ? `fee = min( max(${CCY} ${mn}, ${f.num(rt * 100, 2)}% of notional), ${CCY} ${cap} )`
          : `fee = max(${CCY} ${mn}, ${f.num(rt * 100, 2)}% of notional)`;
        return {
          prompt: `A broker's rule is: **${rule}**. What is the fee on a trade with notional **${f.money(Nr, CCY, 0)}**? (${CCY}, 2 dp)`,
          answer: v, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: [`Compute the percentage part first: ${f.num(rt, 4)} × ${f.num(Nr, 0)}.`, `Take the larger of that and the minimum ${CCY} ${mn}.`, capped ? `Then take the smaller of the result and the cap ${CCY} ${cap}.` : 'That larger number is the fee.'],
          solution: `Percentage part = ${f.num(rt * Nr, 2)}. ${capped ? `max with the minimum, then min with the cap: ` : 'Larger of this and the minimum: '}**${f.money(v, CCY)}**.`,
        };
      },
    },
    {
      id: 'match-situation-graph',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const D = {
          prop: 'A straight line through the origin, rising',
          floor: 'Flat at first, then rising (kink upward)',
          cap: 'Rising at first, then flat (a cap)',
          fall: 'A straight line, falling',
          rise: 'A straight line, rising, but not through the origin',
        };
        const mn = M.amt(r.int(3, 15)), c = M.amt(r.int(20, 80)), n = r.int(50, 500), K = M.px(r.int(10, 90)), mo = M.amt(r.int(100, 900)), fl = r.pick([80, 90, 95]);
        const rp = r.pick([0.05, 0.1, 0.2]), rf = r.pick([0.1, 0.15]), rc = r.pick([0.1, 0.2]), bal = M.amt(10000), ra = r.pick([0.1, 0.25]);
        const nx = M.amt(1000000), nk = M.amt(1000);
        const S = [
          { t: `The fee is ${f.num(rp, 2)}% of notional, with no minimum or maximum. Fee against notional.`, a: 'prop',
            h: [`The fee is ${f.num(rp, 2)}% of the notional and nothing else. Work out the fee when the notional is zero.`, `Compare the fee on a notional of ${CCY} ${f.num(nx, 0)} (${CCY} ${f.num(rp / 100 * nx, 0)}) with the fee on twice that notional. Ask whether each extra block of notional adds the same amount, and whether any limit applies.`] },
          { t: `The fee is the larger of ${CCY} ${mn} and ${f.num(rf, 2)}% of notional. Fee against notional.`, a: 'floor',
            h: [`Work out the fee at a very small notional: the larger of ${CCY} ${mn} and ${f.num(rf, 2)}% of it is ${CCY} ${mn}. Then see what happens at a very large notional.`, `The two parts are equal when ${f.num(rf, 2)}% of N = ${CCY} ${mn}, that is N = ${f.num(mn / (rf / 100), 0)}. Decide what the graph does on each side of that notional.`] },
          { t: `The fee is ${f.num(rc, 2)}% of notional but never more than ${CCY} ${c}. Fee against notional.`, a: 'cap',
            h: [`The fee is ${f.num(rc, 2)}% of notional up to a limit of ${CCY} ${c}. Work out the fee at a small notional, then at a very large one.`, `The limit is reached when ${f.num(rc, 2)}% of N = ${CCY} ${c}, that is N = ${f.num(c / (rc / 100), 0)}. Decide what the graph does on each side of that notional.`] },
          { t: `Your cash account holds ${CCY} ${f.num(bal, 0)} and ${CCY} ${mo} leaves it every month. Balance against months.`, a: 'fall',
            h: [`Start from ${CCY} ${f.num(bal, 0)} at month 0. Work out the balance after 1 month and after 2 months.`, `The balance changes by the same ${CCY} ${mo} each month, so look at whether the direction is up or down and whether the steps are equal.`] },
          { t: `You hold ${n} shares bought at ${CCY} ${K}. Profit against the current share price.`, a: 'rise',
            h: [`Profit = ${n} × (price − ${K}). Work out the profit when the share price is zero.`, `The profit at a price of ${K} is zero. Compare the profit at ${K + 10} with the profit at ${K + 20}, and ask whether the profit is zero at a price of zero.`] },
          { t: `A note repays the larger of ${fl}% of your capital and the index value. Payout against the final index level.`, a: 'floor',
            h: [`With 100 as the starting level, the payout is the larger of ${fl} and the index level. Work out the payout when the index ends at 50 and at 150.`, `The two are equal at an index level of ${fl}. Decide what the graph does below and above that level.`] },
          { t: `An account charges ${CCY} ${mn} a year plus ${f.num(ra, 2)}% of assets. Cost against assets.`, a: 'rise',
            h: [`The cost is a fixed ${CCY} ${mn} plus ${f.num(ra, 2)}% of assets. Work out the cost when assets are zero.`, `Each extra ${CCY} ${f.num(nk, 0)} of assets adds ${CCY} ${f.num(ra / 100 * nk, 2)} to the cost, with no limit. Decide whether the line starts at the origin.`] },
        ];
        const s = r.pick(S);
        const others = r.shuffle(Object.keys(D).filter((k) => k !== s.a)).slice(0, 3);
        const keys = r.shuffle([s.a, ...others]);
        return {
          prompt: `Which description fits the graph of this situation?\n\n${s.t}`,
          choices: keys.map((k) => D[k]),
          answer: keys.indexOf(s.a),
          fixedOrder: true,
          hints: s.h,
          solution: `The right shape is: ${D[s.a].toLowerCase()}.`,
        };
      },
    },
    {
      id: 'break-even-schedules',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const d = r.pick([0.0005, 0.001, 0.0015, 0.002]);
        const Ns = M.amt(r.int(2, 40) * 1000);
        const b1 = r.pick([0.0005, 0.001, 0.0015]);
        const b2 = f.round(b1 + d, 4);
        const diff = f.round(d * Ns, 2);
        const a2 = M.amt(r.int(2, 10));
        const a1 = f.round(a2 + diff, 2);
        const [x, y] = r.bool() ? ['A', 'B'] : ['Alpha', 'Beta'];
        return {
          prompt: `Broker **${x}** charges **${CCY} ${f.num(a1, 2)} + ${f.num(b1 * 100, 2)}%** of notional. Broker **${y}** charges **${CCY} ${f.num(a2, 2)} + ${f.num(b2 * 100, 2)}%**. At what notional do both charge the same fee? (${CCY}, 0 dp)`,
          answer: Ns, dp: 0, tol: { abs: 1 }, unit: CCY,
          hints: [`Set the two fees equal: ${f.num(a1, 2)} + ${f.num(b1, 4)}N = ${f.num(a2, 2)} + ${f.num(b2, 4)}N.`, 'Collect the N terms on one side and the numbers on the other.', `${f.num(a1, 2)} − ${f.num(a2, 2)} = (${f.num(b2, 4)} − ${f.num(b1, 4)})N`],
          solution: `${f.num(a1 - a2, 2)} = ${f.num(b2 - b1, 4)}N, so N = ${f.num(a1 - a2, 2)} / ${f.num(b2 - b1, 4)} = **${f.money(Ns, CCY, 0)}**. Below this size ${y}, with the smaller fixed part, is cheaper.`,
        };
      },
    },
    {
      id: 'slope-from-table',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const m = r.int(2, 16) / 4;
        const c = M.amt(r.int(2, 15));
        const x0 = M.amt(r.int(1, 5) * 5), st = M.amt(r.pick([5, 10, 20]));
        const xs = [0, 1, 2, 3].map((k) => x0 + st * k);
        const ys = xs.map((x) => f.round(c + m * x, 2));
        const askSlope = r.bool();
        return {
          prompt: `A fee schedule gives these fees (${CCY}) for notionals in ${CCY} thousands:\n\n| Notional (${CCY} k) | ${xs.join(' | ')} |\n|---|---|---|---|---|\n| Fee (${CCY}) | ${ys.map((y) => f.num(y, 2)).join(' | ')} |\n\nThe schedule is linear. What is the ${askSlope ? `**slope** (${CCY} of fee per ${CCY} k of notional)` : `**intercept** (the fixed fee in ${CCY})`}? (2 dp)`,
          answer: askSlope ? m : c, dp: 2, tol: { abs: 0.01 }, unit: askSlope ? '' : CCY,
          hints: ['Slope = change in fee ÷ change in notional between any two columns.', `Between the first two columns: (${f.num(ys[1], 2)} − ${f.num(ys[0], 2)}) / (${xs[1]} − ${xs[0]}).`, askSlope ? 'That ratio is the slope.' : 'Intercept = fee − slope × notional, using any column.'],
          solution: `Slope = (${f.num(ys[1], 2)} − ${f.num(ys[0], 2)}) / ${st} = ${f.num(m, 2)}. Intercept = ${f.num(ys[0], 2)} − ${f.num(m, 2)} × ${xs[0]} = ${f.num(c, 2)}. Answer: **${f.num(askSlope ? m : c, 2)}**.`,
        };
      },
    },
    {
      id: 'true-statements',
      template: 'multi',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const shape = r.int(0, 3);
        let intro, T, F, hs;
        if (shape === 0) {
          const mn = M.amt(r.int(3, 12)), rt = r.pick([0.0005, 0.001, 0.002, 0.0025]), thr = f.round(mn / rt, 0);
          intro = `A fee is $f(N) = \\max(${mn},\\; ${rt}\\,N)$ in ${CCY} for notional $N$.`;
          T = [`The fee is never below ${CCY} ${mn}`, `The graph has a kink at $N = ${f.num(thr, 0)}$`, `Above a notional of ${f.num(thr, 0)} the slope is ${rt}`, `$f(${f.num(thr, 0)}) = ${mn}$`];
          F = ['The graph is one straight line', 'The fee is zero when the notional is zero', `The slope is ${rt} for every notional`, `The fee is capped at ${CCY} ${mn}`];
          hs = [`The fee is the larger of the fixed ${CCY} ${mn} and ${rt} × N. Work out which of the two is bigger at N = 0 and at a large notional.`, `The two parts are equal where ${rt} × N = ${mn}, that is N = ${mn} / ${rt}. Compute it and compare it with the numbers in the statements.`, `For N below that point the fee is flat at ${CCY} ${mn}; above it the fee is ${rt} × N. Check each statement against both ranges.`];
        } else if (shape === 1) {
          const n = r.int(2, 9) * 50, K = M.px(r.int(10, 80));
          intro = `The profit on ${n} shares bought at ${CCY} ${K} is $P(S) = ${n}(S - ${K})$, with $S$ the current price.`;
          T = [`The slope of the graph is ${n}`, `$P(${K}) = 0$ (break-even)`, `$P$ is negative whenever the price is below ${K}`, `$P(S + 1) - P(S) = ${n}$ for any $S$`];
          F = [`The graph passes through the origin`, `The slope is ${K}`, `$P$ is positive when the price is below ${K}`, `$P$ cannot be negative`];
          hs = [`$P(S) = ${n}(S - ${K})$ is a straight line in $S$. Read the slope from the number multiplying the bracket and the break-even price from inside it.`, `Substitute $S = 0$, $S = ${K}$ and a price above and below ${K}, such as ${K + 10} and ${Math.max(K - 5, 1)}, and note the sign of $P$ each time.`, `$P(S + 1) - P(S)$ is the same for every $S$ on a straight line. Work out its value from the formula for $P$.`];
        } else if (shape === 2) {
          const rt = r.pick([0.0005, 0.001, 0.002, 0.0025]), cap = M.amt(r.int(2, 9) * 10), thr = f.round(cap / rt, 0);
          intro = `A fee is $f(N) = \\min(${rt}\\,N,\\; ${cap})$ in ${CCY} for notional $N$.`;
          T = [`The fee never exceeds ${CCY} ${cap}`, `The graph is flat for notionals above ${f.num(thr, 0)}`, `$f(0) = 0$`, `The graph is increasing up to $N = ${f.num(thr, 0)}$`];
          F = ['The fee keeps rising forever', `The fee is at least ${CCY} ${cap}`, `The graph is flat for notionals below ${f.num(thr, 0)}`, `$f(0) = ${cap}$`];
          hs = [`The fee is the smaller of ${rt} × N and the cap ${CCY} ${cap}. Work out which is smaller at N = 0 and at a large notional.`, `The two parts are equal where ${rt} × N = ${cap}, that is N = ${cap} / ${rt}. Compute it and compare it with the numbers in the statements.`, `Below that point the fee is ${rt} × N and above it the fee is ${CCY} ${cap}. Check each statement against both ranges.`];
        } else {
          const B = M.amt(r.int(3, 20) * 1000), c = M.amt(r.int(2, 8) * 100), t0 = f.round(B / c, 2);
          intro = `A cash balance is $B(t) = ${f.num(B, 0)} - ${c}\\,t$ in ${CCY} after $t$ months.`;
          T = [`The graph is a falling straight line`, `The intercept is ${f.num(B, 0)}`, `The balance hits zero at $t = ${f.num(t0, 2)}$`, `The slope is $-${c}$`];
          F = [`The balance is zero at $t = 0$`, `The slope is $+${c}$`, `The balance hits zero at $t = ${f.num(c / B, 4)}$`, `The graph is a curve with a vertex`];
          hs = [`$B(t) = ${f.num(B, 0)} - ${c}\\,t$ is a straight line. The number on its own is the value at $t = 0$, and the number multiplying $t$ is the slope, with its sign.`, `The balance hits zero when ${f.num(B, 0)} - ${c} t = 0. Solve it for t.`, `Check the sign of the slope against the wording of each statement, then test $t = 0$ in the formula.`];
        }
        const k = r.int(1, 3);
        const chosenT = r.sample(T, k), chosenF = r.sample(F, 4 - k);
        const all = r.shuffle([...chosenT.map((t) => ({ t, ok: true })), ...chosenF.map((t) => ({ t, ok: false }))]);
        return {
          prompt: `${intro} Select **all** true statements.`,
          choices: all.map((a) => a.t),
          answers: all.map((a, i) => (a.ok ? i : -1)).filter((i) => i >= 0),
          fixedOrder: true,
          hints: hs,
          solution: 'Check each statement against the formula: evaluate at the points mentioned and read slope and intercept from the coefficients.',
        };
      },
    },
    {
      id: 'quadratic-cost',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const a = M.amt(r.int(1, 5)), qs = r.int(2, 12), b = -2 * a * qs, c = M.amt(r.int(10, 100));
        const fmt = `C(q) = ${a === 1 ? '' : a}q^2 ${b < 0 ? '−' : '+'} ${Math.abs(b)}q + ${c}`;
        const mode = r.pick(['vertex', 'min', 'eval']);
        const minC = a * qs * qs + b * qs + c;
        if (mode === 'vertex') {
          return {
            prompt: `An execution-cost model is $${fmt.replace('−', '-')}$ (${CCY} thousands) for order size $q$ (lots). At which size $q$ is the cost lowest?`,
            answer: qs, dp: 2, tol: { abs: 0.01 }, unit: '',
            hints: ['The lowest point of $ax^2 + bx + c$ with $a>0$ is at $x = -b/(2a)$.', `Here $a = ${a}$ and $b = ${b}$.`],
            solution: `$q^* = -b/(2a) = ${-b}/${2 * a}$ = **${qs}**`,
          };
        }
        if (mode === 'min') {
          return {
            prompt: `An execution-cost model is $${fmt.replace('−', '-')}$ (${CCY} thousands) for order size $q$ (lots). What is the lowest possible cost? (2 dp)`,
            answer: minC, dp: 2, tol: { abs: 0.01 }, unit: '',
            hints: ['Find the vertex first: $q^* = -b/(2a)$.', `$q^* = ${qs}$. Now substitute it into $C(q)$.`],
            solution: `$q^* = ${-b}/${2 * a} = ${qs}$. $C(${qs}) = ${a}\\cdot${qs * qs} ${b < 0 ? '-' : '+'} ${Math.abs(b * qs)} + ${c}$ = **${minC}**`,
          };
        }
        const q = r.int(1, 15), v = a * q * q + b * q + c;
        return {
          prompt: `An execution-cost model is $${fmt.replace('−', '-')}$ (${CCY} thousands) for order size $q$ (lots). What is the cost at $q = ${q}$? (2 dp)`,
          answer: v, dp: 2, tol: { abs: 0.01 }, unit: '',
          hints: [`Square first: $${q}^2 = ${q * q}$.`, `Then compute ${a} × ${q * q}, ${b} × ${q} and add ${c}.`],
          solution: `$C(${q}) = ${a}\\cdot${q * q} ${b < 0 ? '-' : '+'} ${Math.abs(b * q)} + ${c}$ = **${v}**`,
        };
      },
    },
  ],
});
