/* Q2.3 Probability: events, conditional and independence */
SA.unit({
  id: 'Q2.3',
  lesson: [
    {
      md: String.raw`## Sample space and events

Probability assigns a number between 0 and 1 (or 0% and 100%) to an uncertain outcome, so that such numbers can be combined consistently. A settlement desk sends a trade to settlement and the trade either settles on its due date or fails. A failed trade costs money and can attract penalties, so desks track how likely failure is.

> [!recall] T1.2
> A trade fails when it does not settle on its due date.

- The **sample space** is the set of all possible outcomes. For one trade it is {settles, fails}.
- An **event** is a set of outcomes of interest, such as "the trade fails".
- The **probability** $P(A)$ of an event is a number from 0 (impossible) to 1 (certain). When all outcomes are equally likely, $P(A)$ is the number of outcomes in $A$ divided by the number of all outcomes.

> [!recall] Q1.1
> Probabilities behave like proportions: 2% is 0.02.`,
    },
    {
      md: String.raw`## Counting equally likely outcomes

When the outcomes are equally likely, probability reduces to counting. Two rules cover most cases.

- **Multiplication rule.** If one choice can be made in $a$ ways and a second choice in $b$ ways, the pair can be made in $a \times b$ ways.
- **Combinations.** The number of ways to choose $k$ items from $n$ when order does not matter is $\binom{n}{k} = \dfrac{n!}{k!\,(n-k)!}$.

> [!example]
> A reviewer picks 3 of 12 failed trades at random for review. 4 of the 12 are in thinly traded stocks.
> Number of possible samples: $\binom{12}{3} = 220$.
> Samples made only of thin trades: $\binom{4}{3} = 4$.
> Probability that all three reviewed trades are thin: $4/220 =$ **1.8%**.

The counting must treat every outcome alike. Treating "all three thin" and "two thin, one liquid" as two equal outcomes would give 50%, which is wrong because the second event contains far more samples than the first. Listing the equally likely outcomes first avoids this error.`,
    },
    {
      md: String.raw`## Complement and union

New events are built from existing ones.

- The **complement** $A^c$ ("not $A$") has probability $P(A^c) = 1 - P(A)$. If the fail probability is 2%, the settle probability is 98%.
- The **intersection** $A \cap B$ means that both events happen.
- The **union** $A \cup B$ means that $A$ or $B$ or both happen:

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

The intersection is subtracted because adding $P(A)$ and $P(B)$ counts it twice.

> [!example]
> A day has 200 trades. Of these, 30 are in thinly traded stocks (event $T$), 24 are above EUR 1 million (event $L$) and 6 are both.
> $P(T \cup L) = 30/200 + 24/200 - 6/200 = 48/200 =$ **24%**.

The complement is often the shorter route. The probability that nothing goes wrong is computed first and subtracted from 1 to give the probability that something goes wrong.

Events that cannot happen together are **mutually exclusive**, and then $P(A \cup B) = P(A) + P(B)$ because the intersection is empty.`,
      check: {
        template: 'mcq',
        prompt: 'The probability that a trade fails is 3%. What is the probability that it does not fail?',
        choices: ['97%', '3%', '0.97%', '103%'],
        answer: 0,
        solution: 'The complement: $1 - 0.03 = 0.97 = 97\\%$.',
      },
    },
    {
      md: String.raw`## Conditional probability

The **conditional probability** $P(A \mid B)$ is the probability of $A$ once it is known that $B$ has happened. The cases are narrowed to those where $B$ is true, and the frequency of $A$ among them is measured:

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$

Rearranged, this gives the multiplication rule $P(A \cap B) = P(B)\,P(A \mid B)$.

> [!example]
> A day's trades, 1,000 in all:
>
> | | Failed | Settled | Total |
> |---|---|---|---|
> | Thinly traded | 30 | 270 | 300 |
> | Liquid | 20 | 680 | 700 |
> | Total | 50 | 950 | 1,000 |
>
> Overall fail rate: $50/1{,}000 = 5\%$.
> Fail rate among thinly traded trades: $P(F \mid T) = 30/300 = 10\%$.
> Fail rate among liquid trades: $20/700 = 2.9\%$.

The direction of conditioning matters. $P(T \mid F) = 30/50 = 60\%$ differs from $P(F \mid T) = 10\%$. Most fails come from thin stocks, but most thin trades do not fail.`,
    },
    {
      md: String.raw`## Independent events

Events $A$ and $B$ are **independent** when knowing that one happened does not change the probability of the other: $P(A \mid B) = P(A)$. The multiplication rule then reduces to a product:

$$P(A \cap B) = P(A) \times P(B)$$

In the table above, $P(F \mid T) = 10\%$ differs from $P(F) = 5\%$, so failing and being thinly traded are not independent. A table can be checked in this way before any multiplication is done.

> [!example]
> Five trades, each failing independently with probability 2%.
> Probability that none fails: $0.98^5 = 0.9039$, which is **90.4%**.
> Probability that at least one fails is the complement: $1 - 0.9039 = 0.0961$, which is **9.6%**.

For $n$ independent trades the probability that none fails is $(1-p)^n$, the same decay pattern as the compounding in Q1.5. The probability that at least one fails is $1 - (1-p)^n$. A single trade carries a 2% risk and a batch of five carries close to 10%.

> [!warning]
> Independent is not the same as mutually exclusive. If two events with positive probability cannot both happen, learning that one occurred makes the other impossible, so they are dependent.
>
> The product rule holds only for independent events. Failures often share a cause, such as a stock that cannot be borrowed or a system outage. The probability that all trades settle then differs from the product, and the product understates the risk of clusters of fails.`,
      check: {
        template: 'mcq',
        prompt: 'Four trades fail independently, each with probability 10%. What is the probability that none fails?',
        choices: ['$0.9^4 = 65.6\\%$', '$1 - 0.1^4 = 99.99\\%$', '$4 \\times 0.9 = 360\\%$', '$0.1^4 = 0.01\\%$'],
        answer: 0,
        solution: 'Each trade succeeds with probability 0.9, and independent events multiply: $0.9^4 = 0.6561$.',
      },
    },
    {
      md: String.raw`## Probability trees

A **probability tree** lays out events in stages. Each branch carries its probability, which is conditional on the branches before it. Probabilities are multiplied along a path to give the probability of that end point. Paths that lead to the same result are added.

> [!example]
> A compliance alert system. 1% of orders are truly suspicious. The system flags 95% of suspicious orders (the hit rate) and also flags 5% of normal orders (false alarms).
>
> | Path | Calculation | Probability |
> |---|---|---|
> | Suspicious, flagged | $0.01 \times 0.95$ | 0.0095 |
> | Suspicious, not flagged | $0.01 \times 0.05$ | 0.0005 |
> | Normal, flagged | $0.99 \times 0.05$ | 0.0495 |
> | Normal, not flagged | $0.99 \times 0.95$ | 0.9405 |
>
> Probability of an alert: $0.0095 + 0.0495 = 0.059$.
> Probability that an order is suspicious given an alert: $0.0095 / 0.059 =$ **16.1%**.

The four paths cover every case, so their probabilities sum to 1.

The alert probability was found by adding the paths that end in an alert. This is the **law of total probability**: if the events $B_1, \dots, B_k$ are disjoint and cover every case, then $P(A) = \sum P(A \mid B_i)\,P(B_i)$. Here $P(\text{alert}) = 0.95 \times 0.01 + 0.05 \times 0.99 = 0.059$.`,
    },
    {
      md: String.raw`## Bayes' rule

The last step of the tree example is **Bayes' rule**. It reverses the direction of conditioning, from $P(\text{alert} \mid \text{suspicious})$ to $P(\text{suspicious} \mid \text{alert})$:

$$P(\text{suspicious} \mid \text{alert}) = \frac{P(\text{alert} \mid \text{suspicious})\,P(\text{suspicious})}{P(\text{alert})}$$

The denominator adds all paths that end in an alert. The **base rate**, the share of suspicious orders before any alert, is part of the calculation. With a base rate of 1%, an alert from a system with a 95% hit rate is genuine in about one case in six, because normal orders are far more numerous than suspicious ones.

Tree problems follow five steps:
1. List the events and the given probabilities.
2. Draw the first split.
3. Draw the second split with conditional probabilities.
4. Multiply along each path.
5. Add the paths that match the question and, for a conditional probability, divide by the probability of the condition.

Common errors:
- Adding where multiplication is required. "Both" is a product for independent events, while "either" is a sum minus the overlap.
- Treating events as independent when they share a cause.
- Confusing $P(A \mid B)$ with $P(B \mid A)$.
- Leaving out the base rate.
- Treating an outcome as due. For independent trades, four fails in a row leave the next trade's fail probability unchanged.`,
    },
    {
      md: String.raw`## Summary

- Probability lies between 0 and 1. With equally likely outcomes it is a ratio of counts, and the complement rule is $P(\text{not } A) = 1 - P(A)$.
- The union rule is $P(A) + P(B) - P(A \cap B)$, and the conditional probability is $P(A \mid B) = P(A \cap B)/P(B)$.
- For independent events probabilities multiply, so "at least one of $n$ fails" is $1 - (1-p)^n$. Independence is checked with $P(A \mid B) = P(A)$.
- A probability tree multiplies along paths and adds paths with the same result, which is the law of total probability.
- Bayes' rule reverses a conditional probability and needs the base rate.`,
    },
  ],

  exercises: [
    {
      id: 'none-or-at-least-one',
      template: 'numeric',
      generate(r, f) {
        const p = r.float(0.5, 8, 0.25);
        const n = r.int(2, 20);
        const none = r.bool();
        const q = Math.pow(1 - p / 100, n);
        const ans = f.round((none ? q : 1 - q) * 100, 2);
        const ctx = r.pick(['settlement', 'delivery', 'confirmation matching']);
        return {
          prompt: `Each trade independently has a **${f.num(p, 2)}%** chance of failing ${ctx}. A desk sends **${n} trades**. What is the probability that **${none ? 'none' : 'at least one'}** fails? (answer in %, 2 dp)`,
          answer: ans, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [
            `One trade succeeds with probability $1 - ${f.num(p / 100, 4)} = ${f.num(1 - p / 100, 4)}$.`,
            `All ${n} succeed (independent): $${f.num(1 - p / 100, 4)}^{${n}} = ${f.num(q, 4)}$.`,
            none ? 'That is already the "none fails" answer; express it in %.' : 'At least one fails is the complement: $1 -$ that number.',
          ],
          solution: `$P(\\text{none fails}) = ${f.num(1 - p / 100, 4)}^{${n}} = ${f.num(q, 4)}$.${none ? '' : ` So $P(\\text{at least one}) = 1 - ${f.num(q, 4)} = ${f.num(1 - q, 4)}$.`} Answer: **${f.num(ans, 2)}%**`,
        };
      },
    },
    {
      id: 'conditional-from-table',
      template: 'numeric',
      generate(r, f) {
        const ctxs = [
          { e1: 'failed to settle', e2: 'settled on time', g1: 'thinly traded', g2: 'liquid', thing: 'trades' },
          { e1: 'triggered an alert', e2: 'raised no alert', g1: 'from a retail client', g2: 'from an institutional client', thing: 'orders' },
          { e1: 'was rejected', e2: 'was accepted', g1: 'a large order', g2: 'a small order', thing: 'orders' },
          { e1: 'needed manual repair', e2: 'went straight through', g1: 'cross-border', g2: 'domestic', thing: 'payments' },
        ];
        const c = r.pick(ctxs);
        const a = r.int(5, 120), b = r.int(40, 400), cc = r.int(5, 120), d = r.int(60, 500);
        const total = a + b + cc + d;
        const kind = r.int(0, 2);
        let num, den, text, sol;
        if (kind === 0) { num = a; den = a + b; text = `that a ${c.g1} ${c.thing.slice(0, -1)} ${c.e1}`; sol = `$${a}/(${a}+${b})$`; }
        else if (kind === 1) { num = a; den = a + cc; text = `that a ${c.thing.slice(0, -1)} that ${c.e1} was ${c.g1}`; sol = `$${a}/(${a}+${cc})$`; }
        else { num = cc; den = cc + d; text = `that a ${c.g2} ${c.thing.slice(0, -1)} ${c.e1}`; sol = `$${cc}/(${cc}+${d})$`; }
        const ans = f.round(num / den * 100, 2);
        const lead = kind === 1 ? 'Given' : 'Given';
        return {
          prompt: `A back office reviews **${total}** ${c.thing}.\n\n| | ${c.e1} | ${c.e2} |\n|---|---|---|\n| ${c.g1} | ${a} | ${b} |\n| ${c.g2} | ${cc} | ${d} |\n\nOne item is chosen at random. What is the probability ${text}? (answer in %, 2 dp)`,
          answer: ans, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [
            kind === 1 ? 'The condition is in the sentence "that ... was ...": narrow the table to the column of items that ' + c.e1 + '.' : 'Narrow the table to the row named in the condition and ignore the other row.',
            'Divide the count that matches both the event and the condition by the count that matches the condition.',
          ],
          solution: `$P(A \\mid B) = \\dfrac{\\text{count}(A \\text{ and } B)}{\\text{count}(B)}$ = ${sol} = **${f.num(ans, 2)}%**`,
        };
      },
    },
    {
      id: 'independent-or-not',
      template: 'mcq',
      generate(r, f) {
        const choices = ['Independent', 'Not independent', 'Impossible to say'];
        if (r.bool()) {
          const u = r.int(2, 9) * 10, v = r.int(2, 9) * 10, k = r.int(1, 9);
          let a = u / 10 * k, b = u / 10 * (10 - k), c = v / 10 * k, d = v / 10 * (10 - k);
          const indep = r.bool();
          if (!indep) { const delta = r.int(1, Math.min(b - 1, 8)) || 1; a += delta; b -= delta; }
          const isInd = a * d === b * c;
          const g = r.pick([['a trade is in a thinly traded stock', 'the trade fails'], ['an order is large', 'the order is rejected'], ['a client is retail', 'the client complains']]);
          return {
            prompt: `Of ${a + b + c + d} items, the counts are:\n\n| | ${g[1]} | not |\n|---|---|---|\n| ${g[0]} | ${a} | ${b} |\n| not | ${c} | ${d} |\n\nAre the events "${g[0]}" and "${g[1]}" independent?`,
            choices,
            answer: isInd ? 0 : 1,
            hints: ['Independent means the share with the second event is the same inside and outside the first event.', `Compare ${a}/${a + b} with ${c}/${c + d}, or check whether $a \\times d = b \\times c$.`],
            solution: `${a}/${a + b} = ${f.num(a / (a + b), 3)} and ${c}/${c + d} = ${f.num(c / (c + d), 3)}. ${isInd ? 'They are equal, so the events are independent.' : 'They differ, so the events are not independent.'}`,
          };
        }
        const pool = [
          ['Two separate tosses of a fair coin: heads on the first, heads on the second', true],
          ['A fair die roll and an unrelated coin toss', true],
          ['Trade 1 fails in Frankfurt and trade 2 fails in Paris, with no common cause', true],
          ['Today\'s lottery numbers and tomorrow\'s weather', true],
          ['A stock closes down 5% and a put option on it rises in value', false],
          ['A bond issuer is downgraded and its bond price falls', false],
          ['Two trades in the same illiquid stock both fail because the stock cannot be borrowed', false],
          ['A person is over 90 years old and the person is retired', false],
        ];
        const it = r.pick(pool);
        return {
          prompt: `Are these two events independent?\n\n*${it[0]}*`,
          choices,
          answer: it[1] ? 0 : 1,
          hints: ['Ask: if one happens, does it change how likely the other is?'],
          solution: it[1] ? 'Knowing one outcome tells you nothing about the other, so they are independent.' : 'One event changes the likelihood of the other (they share a cause or a link), so they are not independent.',
        };
      },
    },
    {
      id: 'tree-steps',
      template: 'order',
      generate(r, f) {
        const ctxs = [
          { evt: 'a compliance alert is real', c1: 'order is suspicious', c2: 'alert is raised' },
          { evt: 'a trade that failed was thinly traded', c1: 'stock is thinly traded', c2: 'trade fails' },
          { evt: 'a borrower who defaulted was rated BB', c1: 'borrower is rated BB', c2: 'borrower defaults' },
          { evt: 'a flagged payment is fraudulent', c1: 'payment is fraudulent', c2: 'payment is flagged' },
        ];
        const c = r.pick(ctxs);
        const p1 = r.int(1, 9), p2 = r.int(80, 99), p3 = r.int(2, 9);
        return {
          prompt: `You want the probability that **${c.evt}** (given the evidence). The given facts are: P(${c.c1}) = ${p1}%, P(${c.c2} | yes) = ${p2}%, P(${c.c2} | no) = ${p3}%. Put the steps of the tree method in the correct order.`,
          items: [
            `Write down the events and the given probabilities (${p1}%, ${p2}%, ${p3}%).`,
            `Draw the first split: ${c.c1}, or not (${p1}% / ${100 - p1}%).`,
            `From each branch draw the second split: ${c.c2}, or not, with the conditional probabilities.`,
            'Multiply the probabilities along each path to get the probability of each end point.',
            'Add the end points that match the condition, then divide the path you want by that total.',
          ],
          hints: [
            `Begin with what is given: the three figures ${p1}%, ${p2}% and ${p3}%. The step that divides one path by a total comes last.`,
            `The first split uses P(${c.c1}) = ${p1}% and its complement ${100 - p1}%. The second split hangs off both branches, using ${p2}% after the "yes" branch and ${p3}% after the "no" branch. You cannot multiply along paths until both splits are drawn.`,
            `After both splits, multiply along each path. The path you want is "${c.c1}" then "${c.c2}", which has probability ${p1}% × ${p2}%. Adding the end points that match the condition and dividing comes after the multiplying.`,
          ],
          solution: 'List the facts, draw the first split, draw the second split, multiply along paths, then add the matching end points and divide.',
        };
      },
    },
    {
      id: 'bayes-alert',
      template: 'numeric',
      generate(r, f) {
        const base = r.float(0.5, 5, 0.25);
        const hit = r.int(80, 99);
        const fp = r.int(1, 10);
        const b = base / 100, h = hit / 100, q = fp / 100;
        const hitProb = b * h;
        const alertProb = hitProb + (1 - b) * q;
        const ans = f.round(hitProb / alertProb * 100, 2);
        const sys = r.pick(['compliance monitoring system', 'trade-surveillance model', 'AML screening tool']);
        return {
          prompt: `A ${sys} raises an alert. Facts: **${f.num(base, 2)}%** of orders are truly problematic; the system flags **${hit}%** of problematic orders (hit rate) and wrongly flags **${fp}%** of normal orders (false-positive rate). An alert has come up. What is the probability the order is really problematic? (answer in %, 2 dp)`,
          answer: ans, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [
            `Problematic and flagged: $${f.num(b, 4)} \\times ${f.num(h, 2)} = ${f.num(hitProb, 5)}$.`,
            `Normal and flagged: $${f.num(1 - b, 4)} \\times ${f.num(q, 2)} = ${f.num((1 - b) * q, 5)}$. Add both to get P(alert) $= ${f.num(alertProb, 5)}$.`,
            'Divide the first number by P(alert).',
          ],
          solution: `$P(\\text{problem} \\mid \\text{alert}) = \\dfrac{${f.num(hitProb, 5)}}{${f.num(alertProb, 5)}}$ = **${f.num(ans, 2)}%**. Most alerts are false alarms because genuine cases are rare.`,
        };
      },
    },
  ],
});
