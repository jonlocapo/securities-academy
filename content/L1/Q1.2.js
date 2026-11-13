/* Q1.2 Ratios, units and solving simple equations */
SA.unit({
  id: 'Q1.2',
  lesson: [
    {
      md: String.raw`## The trade identity

An order such as "buy shares with EUR 10,000" is an equation with one unknown. Solving an equation means finding the number that makes the statement true.

The basic relationship in trading is the trade identity:

$$\text{amount} = \text{quantity} \times \text{price}$$

Shares × EUR per share = EUR: the unit "shares" cancels and euros remain. Checking that units cancel is a quick test for errors in a formula.

| Quantity | Unit |
|---|---|
| quantity $n$ | shares |
| price $p$ | EUR per share |
| amount $A$ | EUR |`,
    },
    {
      md: String.raw`## Isolating a variable

An equation stays true if the same operation is applied to both sides. To isolate the unknown, undo the operations applied to it, in reverse order.

Start from $A = n \times p$ and solve for $n$:

1. $A = n \times p$
2. $\dfrac{A}{p} = \dfrac{n \times p}{p}$ (divide both sides by $p$)
3. $n = \dfrac{A}{p}$ (the $p$ cancels)

In the same way $p = A / n$. If $A$ is the unknown, $A = n p$ is already solved.

> [!example]
> EUR 12,000 buys 400 shares. What was the price?
> $p = A / n = 12{,}000 / 400 =$ **EUR 30.00 per share**.
> Unit check: EUR ÷ shares = EUR per share.

> [!recall] Q1.1
> A proportional fee quoted in basis points is converted to a decimal before it enters an equation: 20 bp = 0.0020.`,
      check: {
        template: 'mcq',
        prompt: 'The formula is $A = n \\times p$ and you know $A$ and $n$. Which expression gives $p$?',
        choices: ['$p = A / n$', '$p = A \\times n$', '$p = n / A$', '$p = A - n$'],
        answer: 0,
        solution: 'Divide both sides of $A = n p$ by $n$.',
      },
    },
    {
      md: String.raw`## Equations with a fee

When a fee is added to the cost, remove the fee first and then undo the multiplication.

Total cost with a flat fee $F$:

$$C = n \times p + F$$

Solve for $n$:

1. $C = n p + F$
2. $C - F = n p$ (subtract $F$ from both sides)
3. $n = \dfrac{C - F}{p}$ (divide both sides by $p$)

With a proportional fee $c$ (as a decimal) the cost is $C = n p (1 + c)$ and $n = \dfrac{C}{p(1+c)}$.

> [!warning]
> Dividing by $p$ before removing the fee gives $C / p = n + F/p$, which is true but does not isolate $n$. Undo addition and subtraction first, then multiplication and division.

Word problems of this kind are set up in five steps: list the known quantities, name the unknown, write the equation, solve it, and state the answer with its unit. A fixed cost such as a flat fee is added as it stands, whereas a variable cost is a rate multiplied by a quantity.

> [!example]
> Broker A charges a flat EUR 9.90 per order. Broker B charges 0.10% of the order amount $A$. The two cost the same when $9.90 = 0.001\,A$, so $A = 9.90 / 0.001 =$ **EUR 9,900**. Below EUR 9,900 broker B is cheaper, and above it broker A is cheaper.`,
    },
    {
      md: String.raw`## Inequalities and whole shares

A budget is a limit, so the condition is an **inequality**: spend at most EUR 10,000. Shares can only be bought in whole numbers, so the result is rounded down.

> [!example]
> EUR 10,000 budget, share at EUR 37.60, flat fee EUR 9.90.
> Condition: $n \times 37.60 + 9.90 \le 10{,}000$.
> $n \times 37.60 \le 9{,}990.10$
> $n \le 9{,}990.10 / 37.60 = 265.7\ldots$
> Rounded down: $n = 265$ shares.
> Cost: $265 \times 37.60 =$ EUR 9,964.00, plus EUR 9.90 fee = **EUR 9,973.90**.

Inequalities are solved like equations, except that multiplying or dividing by a negative number reverses the sign ($-2x \le 6$ gives $x \ge -3$). Trading problems usually divide by positive prices.

> [!warning]
> Rounding 265.7 up to 266 shares would cost EUR 10,010.50, which exceeds the budget.`,
    },
    {
      md: String.raw`## Weighted averages

Two purchases are made: 200 shares at EUR 40, then 100 shares at EUR 49. The average price is total money spent divided by total shares held. It is not the simple mean (40 + 49) / 2, because the lots differ in size.

$$\bar p = \frac{n_1 p_1 + n_2 p_2}{n_1 + n_2}$$

Here: $\bar p = \dfrac{200 \times 40 + 100 \times 49}{300} = \dfrac{8{,}000 + 4{,}900}{300} = \dfrac{12{,}900}{300} =$ **EUR 43.00**.

A weight is a share of a total (Q1.1). This is a weighted average: each price counts in proportion to its weight $n_i / (n_1 + n_2)$.

> [!tip]
> Writing the unit next to each number helps to catch errors. EUR ÷ shares is a price, and EUR × shares has no meaning here.`,
    },
    {
      md: String.raw`## Summary

- The trade identity is $A = n \times p$: shares × EUR per share = EUR. Units should cancel.
- To isolate a variable, apply the same operation to both sides. Undo additions first, then multiplications.
- A word problem is solved by listing the known quantities, naming the unknown, writing the equation, solving it and checking the units.
- Budget questions are inequalities, and the number of shares is rounded down.
- A flat fee gives $C = np + F$ and a proportional fee gives $C = np(1+c)$, with $c$ as a decimal.
- Average price = total money spent ÷ total shares, not the simple mean of the prices.`,
    },
  ],

  exercises: [
    {
      id: 'trade-identity',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const q = r.int(10, 2000);
        const p = M.px(r.int(500, 25000) / 100);
        const A = f.round(q * p, 2);
        const hide = r.pick(['A', 'q', 'p']);
        if (hide === 'A') {
          return {
            prompt: `A client buys **${f.num(q, 0)} shares** at **${f.money(p, CCY)} per share**. How much does the purchase cost, before fees? (${CCY}, 2 dp)`,
            answer: A, dp: 2, tol: { abs: 0.01 }, unit: CCY,
            hints: ['Use amount = quantity × price.', `Shares × ${CCY} per share = ${CCY}.`],
            solution: `$A = n \\times p = ${f.num(q, 0)} \\times ${f.num(p, 2)}$ = **${f.money(A, CCY)}**`,
          };
        }
        if (hide === 'q') {
          return {
            prompt: `A client spends **${f.money(A, CCY)}** on a share priced at ${f.money(p, CCY)}. There are no fees. How many shares were bought?`,
            answer: q, dp: 0, tol: { abs: 0.5 }, unit: '',
            hints: ['Start from amount = quantity × price and isolate the quantity.', 'Divide both sides by the price.', `$n = ${f.num(A, 2)} / ${f.num(p, 2)}$`],
            solution: `$n = A / p = ${f.num(A, 2)} / ${f.num(p, 2)}$ = **${f.num(q, 0)} shares**`,
          };
        }
        return {
          prompt: `A client buys ${f.num(q, 0)} shares and pays ${f.money(A, CCY)} in total, with no fees. What was the price per share? (${CCY}, 2 dp)`,
          answer: p, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: ['Start from amount = quantity × price and isolate the price.', 'Divide both sides by the quantity.', `$p = ${f.num(A, 2)} / ${f.num(q, 0)}$`],
          solution: `$p = A / n = ${f.num(A, 2)} / ${f.num(q, 0)}$ = **${f.money(p, CCY)} per share**`,
        };
      },
    },
    {
      id: 'max-shares',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const B = M.amt(r.int(4, 100) * 500);
        const p = M.px(r.int(300, 40000) / 100);
        const flat = r.bool();
        if (flat) {
          const F = M.amt(r.int(5, 20));
          const n = Math.floor((B - F) / p + 1e-9);
          const cost = f.round(n * p, 2);
          return {
            prompt: `You have a budget of **${f.money(B, CCY, 0)}**. A share costs **${f.money(p, CCY)}** and the broker charges a flat fee of **${f.money(F, CCY, 2)}** per order. What is the maximum whole number of shares you can buy?`,
            answer: n, dp: 0, tol: { abs: 0.5 }, unit: '',
            hints: [`Write the condition: $n \\times ${f.num(p, 2)} + ${F} \\le ${f.num(B, 0)}$.`, `Subtract the fee: $n \\times ${f.num(p, 2)} \\le ${f.num(B - F, 2)}$.`, 'Divide by the price and round **down**.'],
            solution: `$n \\le (${f.num(B, 0)} - ${F}) / ${f.num(p, 2)} = ${f.num((B - F) / p, 3)}$. Rounded down: **${n} shares** (cost ${f.money(cost, CCY)} + ${f.money(F, CCY)} fee).`,
          };
        }
        const bp = r.pick([10, 15, 20, 25, 30]);
        const c = bp / 10000;
        const n = Math.floor(B / (p * (1 + c)) + 1e-9);
        return {
          prompt: `You have a budget of **${f.money(B, CCY, 0)}**. A share costs **${f.money(p, CCY)}** and the broker charges **${bp} bp** on the traded amount, added on top. What is the maximum whole number of shares you can buy?`,
          answer: n, dp: 0, tol: { abs: 0.5 }, unit: '',
          hints: [`${bp} bp = ${f.num(c, 4)} as a decimal, so each share effectively costs $p(1+c)$.`, `Effective price: ${f.num(p, 2)} × ${f.num(1 + c, 4)} = ${f.num(p * (1 + c), 4)}.`, 'Divide the budget by the effective price and round **down**.'],
          solution: `$n \\le B / (p(1+c)) = ${f.num(B, 0)} / (${f.num(p, 2)} \\times ${f.num(1 + c, 4)}) = ${f.num(B / (p * (1 + c)), 3)}$. Rounded down: **${n} shares**.`,
        };
      },
    },
    {
      id: 'rearrange-steps',
      template: 'order',
      generate(r) {
        const bank = [
          // every step shows the equation it produces, and each one works only on the previous step's equation,
          // so exactly one order is correct
          { eq: 'C = n p + F', u: 'n', steps: ['Start from $C = n p + F$', 'Subtract $F$ from both sides: $C - F = n p$', 'Divide both sides by $p$: $(C - F)/p = n$', 'Swap the sides: $n = (C - F)/p$'], h: ['In $C = n p + F$ the unknown $n$ is multiplied by $p$, and $F$ is added on afterwards. Undo the addition before the multiplication.', 'The first operation is on $F$: subtract it from both sides, which leaves $n p$ alone on the right.'] },
          { eq: 'w = H / T', u: 'T', steps: ['Start from $w = H / T$', 'Multiply both sides by $T$: $w T = H$', 'Divide both sides by $w$: $T = H / w$', 'Check by substituting back: $H / (H/w) = w$'], h: ['In $w = H / T$ the unknown $T$ is in the denominator, so first move it out of the denominator by multiplying both sides by $T$.', 'After multiplying by $T$ you have $w T = H$.'] },
          { eq: 'A = n p', u: 'p', steps: ['Start from $A = n p$', 'Divide both sides by $n$: $A/n = p$', 'Swap the sides: $p = A/n$', 'Check by substituting back: $n \\times A/n = A$'], h: ['In $A = n p$ the unknown $p$ is multiplied by $n$, so the operation to undo is the multiplication by $n$.', 'Divide both sides by $n$ first.'] },
          { eq: 'F = V b', u: 'V', steps: ['Start from $F = V b$', 'Divide both sides by $b$: $F / b = V$', 'Swap the sides: $V = F / b$', 'Check by substituting back: $(F/b) \\times b = F$'], h: ['In $F = V b$ the unknown $V$ is multiplied by $b$, so the operation to undo is the multiplication by $b$.', 'Divide both sides by $b$ first.'] },
          { eq: 'C = n p (1 + c)', u: 'n', steps: ['Start from $C = n p (1 + c)$', 'Divide both sides by $p(1+c)$: $C / (p(1+c)) = n$', 'Swap the sides: $n = C / (p(1+c))$', 'Check by substituting back: $C/(p(1+c)) \\times p(1+c) = C$'], h: ['In $C = n p (1 + c)$ the unknown $n$ is multiplied by the whole product $p(1+c)$, and nothing is added or subtracted. Undo that one multiplication.', 'Divide both sides by $p(1+c)$ as a single step, not by $p$ and $(1+c)$ separately.'] },
          { eq: 'P = (C + F) / n', u: 'C', steps: ['Start from $P = (C + F)/n$', 'Multiply both sides by $n$: $P n = C + F$', 'Subtract $F$ from both sides: $P n - F = C$', 'Swap the sides: $C = P n - F$'], h: ['In $P = (C + F)/n$ the unknown $C$ sits inside a bracket that is divided by $n$. Undo the division by $n$ first, then the addition of $F$.', 'Multiply both sides by $n$ to get $P n = C + F$.'] },
        ];
        const b = r.pick(bank);
        return {
          prompt: `Put the steps in the right order to solve $${b.eq}$ for $${b.u}$.`,
          items: b.steps,
          hints: [`Each step must start from the equation the previous step produced, and the first item is the starting equation $${b.eq}$.`, ...b.h],
          solution: 'Each step works on the equation from the step before: ' + b.steps.map((s) => s.match(/\$[^$]+\$$/)[0]).join(', then ') + '.',
        };
      },
    },
    {
      id: 'pick-rearrangement',
      template: 'mcq',
      generate(r) {
        const sets = r.pick([['n', 'p', 'F', 'C'], ['q', 'x', 'k', 'T']]);
        const [n, p, F, C] = sets;
        const bank = [
          { ask: `${n}`, eq: `${C} = ${n}${p} + ${F}`, ok: `${n} = \\dfrac{${C} - ${F}}{${p}}`, bad: [`${n} = \\dfrac{${C}}{${p}} - ${F}`, `${n} = \\dfrac{${C} + ${F}}{${p}}`, `${n} = ${p}(${C} - ${F})`], h: [`In $${C} = ${n}${p} + ${F}$ the unknown $${n}$ is multiplied by $${p}$ and then $${F}$ is added. Undo the addition of $${F}$ first.`, `After removing $${F}$ from the side with $${C}$, only the multiplication by $${p}$ is left to undo. Check whether each option subtracts $${F}$ from the whole of $${C}$ before dividing.`] },
          { ask: `${p}`, eq: `A = ${n}${p}`, ok: `${p} = \\dfrac{A}{${n}}`, bad: [`${p} = A${n}`, `${p} = \\dfrac{${n}}{A}`, `${p} = A - ${n}`], h: [`In $A = ${n}${p}$ the unknown $${p}$ is multiplied by $${n}$. The operation that undoes a multiplication is a division by $${n}$.`, `Apply that division to both sides. Discard options that multiply, subtract, or put $${n}$ on top of the fraction.`] },
          { ask: `T`, eq: `w = \\dfrac{H}{T}`, ok: `T = \\dfrac{H}{w}`, bad: [`T = wH`, `T = \\dfrac{w}{H}`, `T = H - w`], h: ['In $w = H/T$ the unknown $T$ is in the denominator. Multiply both sides by $T$ to bring it up, which gives $wT = H$.', 'Then divide both sides by $w$. Check which option has $H$ on top and $w$ underneath after that step.'] },
          { ask: `${n}`, eq: `${C} = ${n}${p}(1 + c)`, ok: `${n} = \\dfrac{${C}}{${p}(1 + c)}`, bad: [`${n} = \\dfrac{${C}}{${p}} + c`, `${n} = \\dfrac{${C}}{${p}} - 1 - c`, `${n} = ${C}${p}(1 + c)`], h: [`In $${C} = ${n}${p}(1 + c)$ the unknown $${n}$ is multiplied by the product $${p}(1 + c)$. Nothing is added to or subtracted from that product, so there is no addition to undo first.`, `Divide both sides by the whole of $${p}(1 + c)$. Reject options that move the $c$ or the $1$ to the other side separately.`] },
          { ask: `V`, eq: `${F} = V b`, ok: `V = \\dfrac{${F}}{b}`, bad: [`V = ${F} b`, `V = \\dfrac{b}{${F}}`, `V = ${F} - b`], h: [`In $${F} = V b$ the unknown $V$ is multiplied by $b$. The operation that undoes a multiplication is a division by $b$.`, `Apply that division to both sides. Discard options that multiply, subtract, or put $b$ on top of the fraction.`] },
          { ask: `${p}`, eq: `${C} = ${n}${p} - ${F}`, ok: `${p} = \\dfrac{${C} + ${F}}{${n}}`, bad: [`${p} = \\dfrac{${C} - ${F}}{${n}}`, `${p} = ${n}(${C} + ${F})`, `${p} = \\dfrac{${C}}{${n}} + ${F}`], h: [`In $${C} = ${n}${p} - ${F}$ the term $${F}$ is subtracted, so undoing it means adding $${F}$ to both sides. Watch the sign.`, `After that step only the multiplication by $${n}$ is left to undo, and it applies to the whole of the other side, not to one term.`] },
        ];
        const b = r.pick(bank);
        const choices = r.shuffle([b.ok, ...b.bad]).map((s) => `$${s}$`);
        return {
          prompt: `Given $${b.eq}$, which expression correctly isolates $${b.ask}$?`,
          choices,
          answer: choices.indexOf(`$${b.ok}$`),
          fixedOrder: true,
          hints: [`Write down the equation $${b.eq}$ and name the operations applied to $${b.ask}$. Undo them one at a time, with the same operation on both sides.`, ...b.h],
          solution: `The correct rearrangement is $${b.ok}$. The others either undo steps in the wrong order, use the wrong sign, or invert the fraction.`,
        };
      },
    },
    {
      id: 'average-price',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const n1 = r.int(5, 50) * 10, n2 = r.int(5, 50) * 10;
        const p1 = M.amt(r.int(100, 1200) / 10), p2 = M.amt(r.int(100, 1200) / 10);
        const tot = n1 * p1 + n2 * p2;
        const avg = f.round(tot / (n1 + n2), 2);
        return {
          prompt: `An investor buys **${n1} shares at ${f.money(p1, CCY)}** and later **${n2} shares at ${f.money(p2, CCY)}**. What is the average price paid per share? (${CCY}, 2 dp, ignore fees)`,
          answer: avg, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: ['Do not average the two prices. Weight them by the number of shares.', `Total spent: ${n1} × ${f.num(p1, 2)} + ${n2} × ${f.num(p2, 2)} = ${f.num(tot, 2)}.`, `Divide by total shares: ${n1} + ${n2} = ${n1 + n2}.`],
          solution: `Total cost = ${f.num(tot, 2)} and total shares = ${n1 + n2}, so average price = ${f.num(tot, 2)} / ${n1 + n2} = **${f.money(avg, CCY)}**. The simple mean ${f.money((p1 + p2) / 2, CCY)} ignores the lot sizes.`,
        };
      },
    },
    {
      id: 'spot-the-slip',
      template: 'spot',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const kind = r.pick(['fee', 'bp', 'ops']);
        if (kind === 'fee') {
          const B = M.amt(r.int(4, 40) * 500), F = M.amt(r.int(5, 25)), p = M.px(r.int(500, 9000) / 100);
          const net = B - F;
          const x = net / p;
          const x2 = B / p;
          const nn = Math.floor(x + 1e-9);
          const n2 = Math.floor(x2 + 1e-9);
          return {
            prompt: 'Find the faulty line in this hand calculation.',
            doc: [
              { text: `Task: ${f.money(B, CCY, 0)} budget, share at ${f.money(p, CCY)}, flat fee ${f.money(F, CCY)}. Max whole shares?`, error: false },
              { text: `Money available for shares = ${f.num(B, 2)}`, error: true, why: `The flat fee of ${f.money(F, CCY)} must be subtracted first: available = ${f.num(B, 0)} − ${F} = ${f.num(net, 2)}.` },
              { text: `n ≤ ${f.num(B, 2)} / ${f.num(p, 2)} = ${f.num(x2, 3)}`, error: false },
              { text: `Rounding down: n = ${n2} shares`, error: false },
            ],
          };
        }
        if (kind === 'bp') {
          const V = M.amt(r.int(5, 80) * 5000), bp = r.int(2, 18) * 5;
          const d = bp / 10000, bad = bp / 100;
          return {
            prompt: 'Find the faulty line in this hand calculation.',
            doc: [
              { text: `Task: annual custody fee on ${f.money(V, CCY, 0)} at ${bp} bp.`, error: false },
              { text: `${bp} bp = ${bp} / 100 = ${f.num(bad, 2)}`, error: true, why: `Mixed up bp and %: ${bp} bp is ${bp} / 10,000 = ${f.num(d, 4)} as a decimal (${f.num(bad, 2)}% is the percentage, not the decimal).` },
              { text: `Fee = ${f.num(V, 0)} × ${f.num(bad, 2)} = ${f.num(V * bad, 2)}`, error: false },
              { text: `Answer: ${f.money(V * bad, CCY)} per year`, error: false },
            ],
          };
        }
        const n = r.int(5, 40) * 10, p = M.px(r.int(2500, 9000) / 100), F = M.amt(r.int(5, 20));
        const A = f.round(n * p, 2);
        return {
          prompt: 'Find the faulty line in this hand calculation.',
          doc: [
            { text: `Task: buy ${n} shares at ${f.money(p, CCY)} with a flat fee of ${f.money(F, CCY)}. Total cost?`, error: false },
            { text: `Cost of shares = ${n} ÷ ${f.num(p, 2)} = ${f.num(n / p, 2)}`, error: true, why: `Divided instead of multiplying. Amount = quantity × price = ${n} × ${f.num(p, 2)} = ${f.num(A, 2)}.` },
            { text: `Add the fee: ${f.num(n / p, 2)} + ${F} = ${f.num(n / p + F, 2)}`, error: false },
            { text: `Total cost = ${f.money(n / p + F, CCY)}`, error: false },
          ],
        };
      },
    },
  ],
});
