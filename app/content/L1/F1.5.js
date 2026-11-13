/* F1.5 Returns: holding-period, annualised, real and nominal */
SA.unit({
  id: 'F1.5',
  lesson: [
    {
      md: String.raw`## Holding-period return

The result of an investment is measured by comparing what the investor received with the amount put in. The simplest case is a zero-coupon bond. It is bought at price $P$ and repaid at a face value of EUR 100, with no income in between. The percentage increase in value is its return over the holding period:

$$r = \frac{100}{P} - 1$$

Most securities also pay income. The **holding-period return** (HPR) is the price change plus the income received, divided by the starting price:

$$HPR = \frac{P_1 - P_0 + D}{P_0}$$

The two parts can be separated. $D/P_0$ is the **dividend yield** and $(P_1 - P_0)/P_0$ is the rate of capital gain, so HPR is their sum. The formula treats the dividend as received at the end of the period. A dividend received earlier can be reinvested, and the reinvestment income would then also be counted.

The same idea applies to a whole portfolio. The **wealth ratio** $V_E/V_S$ is the end value divided by the start value, and it equals $1 + r$. A portfolio that grows from EUR 80 million to EUR 86 million has a wealth ratio of 1.075 and a return of 7.5%. The values should be economic values: trades that have been made but not yet settled, dividends declared but not yet paid and accrued bond interest all belong in the valuation.

Dividends and coupons that stay in the portfolio are **internal cash flows** and form part of the return. Money that the investor adds or withdraws is an **external cash flow** and is not part of the return. The last two cards deal with external cash flows.

> [!example]
> A client buys a share at EUR 40, receives EUR 1.20 in dividends and sells at EUR 43.
> $HPR = (43 - 40 + 1.20)/40 = 4.20/40 =$ **10.5%**
> The dividend yield is 3.0% and the capital gain is 7.5%.

> [!recall] Q1.1
> A return is a proportion of the starting amount. 4.20 out of 40 is 0.105, which is 10.5%.`,
      check: {
        template: 'mcq',
        prompt: 'A share bought at EUR 50 pays a EUR 2 dividend and is sold at EUR 49. What is the holding-period return?',
        choices: ['2.0%', '-2.0%', '6.0%', '4.0%'],
        answer: 0,
        solution: '$(49 - 50 + 2)/50 = 1/50 = 2\\%$. The price loss is more than offset by the dividend. A return that ignores income would be -2%.',
      },
    },
    {
      md: String.raw`## Comparing returns over different horizons

A return needs its holding period. Total returns on investments of different length are compared after expressing each as an **effective annual rate** (EAR), the percentage increase in value per year.

For a horizon of $T$ years with total return $R$:

$$(1 + EAR)^{T} = 1 + R \quad\Rightarrow\quad EAR = (1 + R)^{1/T} - 1$$

For a horizon under a year, $T < 1$ and the exponent is above 1. A half-year return is compounded twice, a quarterly return four times. For a horizon over a year, the exponent is below 1, so the formula is a root. The reverse conversion from a yearly figure to a shorter period is $(1 + EAR)^{T} - 1$.

> [!example]
> A zero-coupon bond with a face value of EUR 100 costs EUR 98.10 and matures in six months. The return is $100/98.10 - 1 = 1.94\%$ for the half-year. Compounded over two half-years, $1.0194^2 - 1 =$ **3.91%** a year.
> A three-year zero costs EUR 88.00. The total return is $100/88 - 1 = 13.64\%$ and the yearly figure is $1.1364^{1/3} - 1 =$ **4.35%**.

Short-term rates are often quoted differently. An **annual percentage rate** (APR) takes the rate for a short period and multiplies it by the number of periods in a year, which ignores compounding. A card charging 1.2% a month has an APR of 14.4%. Its EAR is $1.012^{12} - 1 = 15.39\%$. The more often interest is added, the larger the gap between APR and EAR. An effective rate of 8% a year needs a nominal rate of 7.85% compounded half-yearly (1.0392 each half-year) or 7.72% compounded monthly (1.00643 each month). With continuous compounding the nominal rate is $\ln(1.08) = 7.70\%$. Continuously compounded returns have one practical property: $\ln(1+r)$ adds across periods, while simple returns must be multiplied.

> [!recall] Q1.3
> The exponent $1/T$ is a root. For $T = 1.5$ it is $0.6667$, which should be entered as a fraction and not rounded.`,
    },
    {
      md: String.raw`## Worked example: 18 months

> [!example]
> The share bought at EUR 40 pays EUR 1.20 and is sold at EUR 43 after 18 months.
> 1. $HPR = 4.20/40 = 10.5\%$, so the growth factor is 1.105.
> 2. $T = 18/12 = 1.5$ years.
> 3. $EAR = 1.105^{1/1.5} - 1 = 1.0688 - 1 =$ **6.9%** a year.
>
> Check: $1.0688^{1.5} = 1.105$.

Dividing the return by the number of years gives $10.5\%/1.5 = 7.0\%$. That is a simple-interest shortcut. It ignores compounding, and the error grows with longer horizons and higher returns.

A fund that returned 8% in a year earned $1.08^{3/12} - 1 = 1.94\%$ over 3 months, whereas $8\%/4$ would give 2.00%.

> [!tip]
> A return stated without its horizon cannot be compared with another return.

> [!warning]
> Performance reports do not annualise periods shorter than a year, because that assumes the rate of the year to date continues for the rest of the year. The conversion is shown here to compare horizons, and a report would normally show the cumulative return instead.`,
    },
    {
      md: String.raw`## Nominal and real returns

A nominal return is the rate at which the euro value of an investment grows. A real return is the rate at which its purchasing power grows. A consumer price index measures the cost of a fixed basket of goods, and the inflation rate $i$ is the growth of that cost.

> [!example]
> A client deposits EUR 1,000 at 3.5% and collects EUR 1,035 after a year. A basket of goods cost EUR 100 a year ago and costs EUR 102 now. A year ago the deposit bought 10 baskets and now it buys $1{,}035/102 = 10.147$. Purchasing power rose by 1.47%.

Purchasing power grows by the ratio of the growth of funds to the growth of prices:

$$1 + r_{real} = \frac{1 + r_{nominal}}{1 + i} \quad\Rightarrow\quad r_{real} = \frac{r_{nominal} - i}{1 + i}$$

The approximation $r_{real} \approx r_{nominal} - i$ gives 1.5% in the example. It overstates the real rate by the factor $1 + i$ and is best for low inflation. With the exact formula, the example gives $1.035/1.02 - 1 = 1.47\%$.

The **Fisher relation** states that nominal rates move with expected inflation, $r_{nominal} \approx r_{real} + E(i)$. Investors need a higher nominal rate when they expect higher inflation, to keep the real return unchanged. A bond with a fixed nominal rate still has a risky real return, because actual inflation can differ from the expectation.

> [!eu]
> In the euro area inflation is measured by the HICP (Harmonised Index of Consumer Prices). The ECB's medium-term inflation target is 2%.

When inflation exceeds the nominal return the real return is negative. The investor has more euros and can buy less.`,
    },
    {
      md: String.raw`## Arithmetic and geometric averages

Yearly returns multiply. A fund returns -20% in year 1 and +20% in year 2. The arithmetic average is 0%, yet EUR 100 becomes $100 \times 0.80 \times 1.20 = \text{EUR } 96$. The gain in year 2 applies to a smaller base. To recover from a loss of 20% the fund needs a gain of 25%. The order of the two returns does not change the result.

The **arithmetic average** is the sum of the returns divided by their number. The **geometric average** is the constant yearly rate that compounds to the same final value:

$$1 + \bar r_{geo} = \big[(1+r_1)(1+r_2)\cdots(1+r_n)\big]^{1/n}$$

> [!example]
> Four years: +20%, -10%, +15%, -5%.
> Arithmetic average: $(20 - 10 + 15 - 5)/4 = 5.0\%$.
> Compound factor: $1.20 \times 0.90 \times 1.15 \times 0.95 = 1.1799$, so the geometric average is $1.1799^{1/4} - 1 = 4.22\%$.
> EUR 10,000 ends at EUR 11,799. At 5% a year it would end at EUR 12,155.

The geometric average is the **annualised return**. Compounded over the same number of years it reproduces the cumulative return, whereas the arithmetic average compounds to a larger figure. In the example, 4.22% for four years gives 1.1799 and 5% gives 1.2155. The arithmetic average is therefore biased upwards as a description of what happened, though it is the usual estimate of the expected return for a future year.

The more volatile the returns, the further the geometric average falls below the arithmetic one. For roughly normal returns the gap is about half the variance of the yearly returns, so that $\bar r_{geo} \approx \bar r_A - \sigma^2/2$. An arithmetic average of 12% with a standard deviation of 10% gives roughly $12\% - (0.10)^2/2 = 12\% - 0.5\% = 11.5\%$.

> [!recall] F1.2
> Compounding multiplies growth factors, so the average that matches the final wealth is geometric.`,
      check: {
        template: 'mcq',
        prompt: 'A portfolio returns +40% in year 1 and -40% in year 2. What happened to EUR 1,000 invested?',
        choices: ['It fell to EUR 840', 'It stayed at EUR 1,000', 'It fell to EUR 800', 'It grew to EUR 1,160'],
        answer: 0,
        solution: '$1{,}000 \\times 1.40 = 1{,}400$, then $1{,}400 \\times 0.60 = 840$. Losses apply to a larger base, so the average of 0% hides a net loss of 16%.',
      },
    },
    {
      md: String.raw`## Time-weighted and money-weighted returns

Chain-linking and the wealth ratio work only while the portfolio receives no external cash flows. When the investor adds or withdraws money, the ratio of end value to start value mixes the cash flow with the investment result. Two families of method deal with this.

A **time-weighted return (TWR)** values the portfolio at each external cash flow. It calculates the return of each sub-period from the value just before the flow and chain-links the sub-period returns. Every sub-period has the same weight, whatever amount was invested in it. A **money-weighted return (MWR)** is the internal rate of return of the investor's cash flows, so periods in which more money was invested carry more weight.

> [!example]
> Start: EUR 1,000. Year 1: +10%, so EUR 1,100. At the end of year 1 the investor adds EUR 1,000, giving EUR 2,100. Year 2: -10%, so EUR 1,890.
>
> The **TWR** ignores the cash added: $1.10 \times 0.90 - 1 = -1.0\%$ over two years, or $0.99^{1/2} - 1 = -0.5\%$ a year.
>
> The **MWR** is the yearly rate that reproduces the investor's cash flows. With $x = 1 + \text{MWR}$, $1{,}000x^2 + 1{,}000x = 1{,}890$, so $x^2 + x - 1.89 = 0$. The quadratic formula gives $x = (-1 + \sqrt{1 + 7.56})/2 = 0.9629$ and MWR $= -3.7\%$ a year.

The manager lost 1% over the two years and the investor lost more, because the extra EUR 1,000 was exposed to the losing year. In money terms the investor lost EUR 110 on EUR 2,000 paid in.

The internal rate of return needs an iterative or quadratic solution. The **simple Dietz** method approximates it by dividing the gain by the average capital invested, which is the start value plus half of the external cash flow $C$:

$$r = \frac{V_E - V_S - C}{V_S + C/2}$$

In the example this is $(1{,}890 - 1{,}000 - 1{,}000)/(1{,}000 + 500) = -7.3\%$ over two years, close to the exact MWR of $0.9629^2 - 1 = -7.3\%$. The **modified Dietz** method weights each flow by the fraction of the period for which it was invested. Both Dietz methods are money-weighted, even though the modified version is sometimes described as an approximation of the TWR.`,
    },
    {
      md: String.raw`## Choosing between the two

The two measures answer different questions. The TWR measures how the assets performed, independent of the amount invested and of when the client paid in or withdrew. The MWR measures what the investor's own money earned, including the effect of timing.

> [!warning]
> A TWR can be positive when the investor lost money. A portfolio starts at EUR 200 and gains 50%, giving EUR 300. The investor then adds EUR 2,000 and the portfolio falls 20%, to EUR 1,840. The TWR is $1.50 \times 0.80 - 1 = +20\%$. The investor paid in EUR 2,200 and holds EUR 1,840, a loss of EUR 360. The large deposit was exposed only to the fall.

A manager does not control when clients deposit or withdraw. For comparing managers with each other and with a benchmark index, which is itself time-weighted, the TWR is therefore the standard measure. The MWR suits cases where the manager controls the timing of cash flows, such as private equity funds that call and return capital, and it suits reports to a private client on the result of his own money.

The TWR has a cost. It needs a valuation at every external cash flow, and a wrong valuation on that date permanently distorts the linked return. Many institutional managers therefore chain-link monthly modified Dietz returns, which is a hybrid of the two methods. Pooled funds avoid the problem with **unit prices**. A client buys or redeems units at the net asset value per unit, so the return between any two dates is the ratio of the unit prices, and the cash flows do not matter.

> [!tip]
> If the aim is to compare returns, use the time-weighted return. If the aim is to state the investor's profit relative to his money, the money-weighted return or the profit in euro is more informative.

> [!recall] P1.4
> A fund's NAV per unit is the quantity on which time-weighted fund returns are based.`,
    },
    {
      md: String.raw`## Summary

- Holding-period return is $(P_1 - P_0 + D)/P_0$, the sum of dividend yield and capital gain.
- Returns over different horizons are compared as effective annual rates, $(1+R)^{1/T} - 1$. The return is not divided by the number of years, and an APR ignores compounding.
- Real return is $(1 + r_{nominal})/(1 + i) - 1$. Nominal minus inflation is an approximation.
- Yearly returns multiply. The geometric average matches the final wealth and is below the arithmetic average when returns vary.
- Time-weighted return chain-links sub-period returns and ignores the size of cash flows. It is the standard for comparing managers and benchmarks. Money-weighted return is the internal rate of return of the investor's flows, approximated by the Dietz methods, and shows the investor's own result.`,
    },
  ],

  exercises: [
    {
      id: 'hpr',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const P0 = M.amt(r.int(5, 300));
        const D = f.round(P0 * r.float(0, 6, 0.5) / 100, 2);
        const chg = r.float(-20, 30, 0.5);
        const P1 = f.round(P0 * (1 + chg / 100), 2);
        const hpr = f.round((P1 - P0 + D) / P0 * 100, 2);
        return {
          prompt: `An investor buys a share at **${f.money(P0, CCY, 2)}**. During the holding period it pays dividends of **${f.money(D, CCY, 2)}** in total, and the investor sells at **${f.money(P1, CCY, 2)}**. What is the holding-period return? (answer in %, 2 dp)`,
          answer: hpr, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [
            `Price change: ${f.num(P1, 2)} $-$ ${f.num(P0, 2)} $=$ ${f.num(P1 - P0, 2)}.`,
            `Add the income: ${f.num(P1 - P0, 2)} $+$ ${f.num(D, 2)} $=$ ${f.num(P1 - P0 + D, 2)}.`,
            `Divide by the starting price ${f.num(P0, 2)} and multiply by 100.`,
          ],
          solution: `$HPR = \\dfrac{P_1 - P_0 + D}{P_0} = \\dfrac{${f.num(P1, 2)} - ${f.num(P0, 2)} + ${f.num(D, 2)}}{${f.num(P0, 2)}}$ = **${f.num(hpr, 2)}%**`,
        };
      },
    },
    {
      id: 'annualise',
      template: 'numeric',
      generate(r, f) {
        const toYear = r.bool();
        if (toYear) {
          const months = r.pick([3, 4, 6, 9, 15, 18, 24, 30, 36, 48, 60]);
          const R = r.float(-30, 80, 0.5);
          const T = months / 12;
          const ann = f.round((Math.pow(1 + R / 100, 1 / T) - 1) * 100, 2);
          return {
            prompt: `A fund returned **${f.num(R, 2)}%** in total over **${months} months**. What is the equivalent annualised (compound yearly) return? (answer in %, 2 dp)`,
            answer: ann, dp: 2, tol: { abs: 0.01 }, unit: '%',
            hints: [
              `Growth factor: $1 + ${f.num(R / 100, 4)} = ${f.num(1 + R / 100, 4)}$. The horizon is $${months}/12 = ${f.num(T, 4)}$ years.`,
              `Raise the factor to the power $1/T = 12/${months}$.`,
              'Subtract 1 and express in %.',
            ],
            solution: `$R_{annual} = (1 + R)^{12/${months}} - 1 = ${f.num(1 + R / 100, 4)}^{${f.num(1 / T, 4)}} - 1$ = **${f.num(ann, 2)}%** a year.${months < 12 ? ' This assumes the same rate repeats for the rest of the year, so a report would show the cumulative return for a period this short.' : ''}`,
          };
        }
        const months = r.pick([1, 2, 3, 4, 6, 9, 18, 30]);
        const Ra = r.float(-30, 80, 0.5);
        const T = months / 12;
        const ret = f.round((Math.pow(1 + Ra / 100, T) - 1) * 100, 2);
        return {
          prompt: `A strategy returns **${f.num(Ra, 2)}%** a year (compound). What return does that imply over **${months} month${months > 1 ? 's' : ''}**? (answer in %, 2 dp)`,
          answer: ret, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [
            `The horizon is $${months}/12 = ${f.num(T, 4)}$ years.`,
            `Raise the yearly factor ${f.num(1 + Ra / 100, 4)} to the power $${months}/12$.`,
            'Subtract 1 and express in %.',
          ],
          solution: `$(1 + R_{annual})^{${months}/12} - 1 = ${f.num(1 + Ra / 100, 4)}^{${f.num(T, 4)}} - 1$ = **${f.num(ret, 2)}%**`,
        };
      },
    },
    {
      id: 'real-return',
      template: 'numeric',
      generate(r, f) {
        const nom = r.float(-5, 15, 0.1);
        const inf = r.float(0, 8, 0.1);
        const real = f.round(((1 + nom / 100) / (1 + inf / 100) - 1) * 100, 2);
        return {
          prompt: `A portfolio earned a nominal return of **${f.num(nom, 1)}%** in a year in which euro-area inflation was **${f.num(inf, 1)}%**. What was the real return? (answer in %, 2 dp; use the exact relation, not nominal minus inflation)`,
          answer: real, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [
            `Growth factors: nominal $${f.num(1 + nom / 100, 3)}$, prices $${f.num(1 + inf / 100, 3)}$.`,
            'Divide the nominal factor by the price factor.',
            'Subtract 1 and multiply by 100.',
          ],
          solution: `$r_{real} = \\dfrac{${f.num(1 + nom / 100, 3)}}{${f.num(1 + inf / 100, 3)}} - 1$ = **${f.num(real, 2)}%**. (The approximation $${f.num(nom, 1)} - ${f.num(inf, 1)}$ would give ${f.num(nom - inf, 1)}%.)`,
        };
      },
    },
    {
      id: 'five-year-table',
      template: 'table',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const start = M.amt(r.int(5, 100) * 1000);
        const rets = [];
        for (let i = 0; i < 5; i++) rets.push(r.int(-25, 35));
        const rows = [];
        let val = start;
        for (let i = 0; i < 5; i++) {
          val = f.round(val * (1 + rets[i] / 100), 2);
          const cum = f.round((val / start - 1) * 100, 2);
          rows.push([i + 1, (rets[i] >= 0 ? '+' : '') + rets[i] + '%', { answer: val, dp: 2, tol: { abs: 0.02 } }, { answer: cum, dp: 2, tol: { abs: 0.02 } }]);
        }
        const years = 5;
        const geo = f.round((Math.pow(val / start, 1 / years) - 1) * 100, 2);
        return {
          prompt: `A portfolio starts with **${f.money(start, CCY, 0)}** and has the yearly returns shown. Fill in the value at the end of each year (round to 2 dp each year, and carry the rounded value forward) and the cumulative return since the start, in % (2 dp, computed from the rounded value).`,
          columns: ['Year', 'Return', `Value at year end (${CCY})`, 'Cumulative return (%)'],
          rows,
          hints: [
            'Value at year end = previous value $\\times (1 + \\text{return})$.',
            `Year 1 starts from ${f.num(start, 0)}.`,
            'Cumulative return = (value / starting value $-$ 1) $\\times$ 100.',
          ],
          solution: `Each year multiplies the previous value by $1 + r$. After 5 years the portfolio is worth **${f.money(val, CCY)}**, a cumulative ${f.num((val / start - 1) * 100, 2)}%, which is ${f.num(geo, 2)}% a year compound.`,
        };
      },
    },
    {
      id: 'arithmetic-vs-geometric',
      template: 'numeric',
      generate(r, f) {
        let rets, arith, geo;
        for (let t = 0; t < 200; t++) {
          rets = [r.int(-30, 50), r.int(-30, 50), r.int(-30, 50), r.int(-30, 50)];
          if (!rets.some((x) => x < 0)) continue;
          arith = rets.reduce((a, b) => a + b, 0) / 4;
          geo = (Math.pow(rets.reduce((a, b) => a * (1 + b / 100), 1), 1 / 4) - 1) * 100;
          if (arith - geo > 0.2) break;
        }
        const gap = f.round(arith - geo, 2);
        const list = rets.map((x) => (x >= 0 ? '+' : '') + x + '%').join(', ');
        return {
          prompt: `A fund's four yearly returns are **${list}**. By how many percentage points does the arithmetic average yearly return exceed the compound (geometric) average yearly return? (percentage points, 2 dp)`,
          answer: gap, dp: 2, tol: { abs: 0.02 }, unit: '%',
          hints: [
            `Arithmetic: add the four returns and divide by 4 to get ${f.num(arith, 2)}%.`,
            'Geometric: multiply the four factors $(1+r)$, take the fourth root, subtract 1.',
            'Subtract the geometric figure from the arithmetic one.',
          ],
          solution: `Arithmetic ${f.num(arith, 2)}%. Product of factors $= ${f.num(rets.reduce((a, b) => a * (1 + b / 100), 1), 4)}$, fourth root minus 1 $= ${f.num(geo, 2)}\\%$. Gap = **${f.num(gap, 2)} points**: the volatility drags down the compound result.`,
        };
      },
    },
    {
      id: 'twr-vs-mwr',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const start = M.amt(r.int(2, 20) * 5000);
        const top = M.amt(r.int(1, 10) * 5000);
        const up = r.pick([10, 12, 15, 20, 25]);
        const down = r.pick([8, 10, 12, 15, 20]);
        const flip = r.bool();
        // Portfolio P: gain first then loss. Portfolio Q: loss first then gain.
        const finalP = f.round((start * (1 + up / 100) + top) * (1 - down / 100), 2);
        const finalQ = f.round((start * (1 - down / 100) + top) * (1 + up / 100), 2);
        const names = flip ? ['Portfolio X', 'Portfolio Y'] : ['Portfolio Y', 'Portfolio X'];
        const [nP, nQ] = names;
        const winner = finalQ > finalP ? nQ : nP;
        const loser = winner === nP ? nQ : nP;
        const choices = [
          `Same time-weighted return; ${winner} ends with more money`,
          `Same time-weighted return; ${loser} ends with more money`,
          `${winner} has the higher time-weighted return because it ends with more money`,
          `${loser} has the higher time-weighted return because it lost less at first`,
        ];
        return {
          prompt: `Two clients each start with **${f.money(start, CCY, 0)}** and add **${f.money(top, CCY, 0)}** at the end of year 1.\n\n- **${nP}**: year 1 **+${up}%**, year 2 **-${down}%**\n- **${nQ}**: year 1 **-${down}%**, year 2 **+${up}%**\n\nWhich statement is correct?`,
          choices,
          answer: 0,
          hints: [
            'Time-weighted return only multiplies the yearly growth factors; the deposit does not matter for it.',
            `Compare $(1 + ${up / 100})(1 - ${down / 100})$ for both portfolios. Then compute the end values.`,
          ],
          solution: `Both factors multiply to ${f.num((1 + up / 100) * (1 - down / 100), 4)}, so the time-weighted returns are identical. End values: ${nP} ${f.money(finalP, CCY)}, ${nQ} ${f.money(finalQ, CCY)}. The deposit was exposed to the gain in ${winner}'s case and to the loss in the other, so **${winner}** ends with more money.`,
        };
      },
    },
  ],
});
