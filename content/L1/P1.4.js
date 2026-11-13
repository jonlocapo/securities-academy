/* P1.4 Funds: pooling money and the NAV idea */
SA.unit({
  id: 'P1.4',
  lesson: [
    {
      md: String.raw`## Pooled investment

An investor with EUR 100,000 who wants exposure to forty companies would have to place forty small trades, each with its own cost, and monitor forty companies. A **fund** pools the money of many investors and invests it together under professional management. Pooling gives investors diversification, a lower cost per euro invested, access to markets that are hard to reach individually and professional administration.

Each investor receives **units** (or shares) of the fund, which are a proportional claim on the pool. The fund's holdings belong to the fund and are kept by an independent depositary for the investors. The fund unit is itself a security (P1.1).`,
    },
    {
      md: String.raw`## Units and NAV

The value per unit of a fund is the **net asset value (NAV) per unit**:

$$\text{NAV per unit} = \frac{\text{assets} - \text{liabilities}}{\text{units outstanding}}$$

- **Assets** are the securities at market value, plus cash and accrued income.
- **Liabilities** are fees owed to the manager and the depositary, taxes and other payables.
- **Units outstanding** are the units issued minus those redeemed.

> [!example]
> A fund holds EUR 120.4 million of securities and EUR 1.6 million of cash, and owes EUR 0.5 million in fees. It has 1,000,000 units.
> NAV per unit: $(122.0 - 0.5) / 1.0 =$ **EUR 121.50**.
> An investor who subscribes EUR 24,300 at this NAV receives $24{,}300 / 121.50 =$ **200 units**.

The fund administrator calculates the NAV, usually at the close of each business day. An investor's holding is units times NAV, so it changes only when the NAV changes or when units are bought or sold.`,
      check: {
        template: 'mcq',
        prompt: 'A fund has assets of EUR 80 million, liabilities of EUR 2 million and 1 million units. What is the NAV per unit?',
        choices: ['EUR 78', 'EUR 80', 'EUR 82', 'EUR 0.78'],
        answer: 0,
        solution: '$(80 - 2) / 1 =$ EUR 78 per unit. Liabilities are subtracted and units are in millions as well.',
      },
    },
    {
      md: String.raw`## Open-ended funds, ETFs and closed-end funds

| Type | How investors get in and out | Price |
|---|---|---|
| **Open-ended fund** (for example a UCITS mutual fund) | The fund issues units on subscription and cancels them on redemption, dealing directly with the investor. | The **NAV**, plus or minus any fees |
| **ETF** (exchange-traded fund) | Investors buy and sell units on an exchange from other investors. Specialised dealers create and redeem units with the fund. | A **market price**, usually very close to NAV |
| **Closed-end fund** | A fixed number of shares is issued once and then traded on the market. There are no redemptions. | A market price that can be well above or below NAV |

In an open-ended fund the fund itself is the counterparty at NAV. In an ETF or a closed-end fund the investor trades with other investors.

An ETF has a creation and redemption mechanism that a closed-end fund lacks. An authorised dealer can deliver a basket of the underlying securities to the fund and receive new ETF units, or hand units back and receive securities. If the ETF price rises above the value of the basket, dealers create units and sell them. If it falls below, they buy units and redeem them. This arbitrage keeps the market price near NAV. A closed-end fund has no such mechanism and often trades at a **discount** to NAV.

> [!warning]
> Most open-ended funds use **forward pricing**. An order placed before the daily cut-off is dealt at that day's NAV, which is not known until after the market closes. The investor therefore does not know in advance how many units an order buys.`,
    },
    {
      md: String.raw`## UCITS and fund costs

**UCITS** (Undertakings for Collective Investment in Transferable Securities) is the EU framework for retail funds. A fund that meets the [UCITS Directive](https://eur-lex.europa.eu/eli/dir/2009/65/oj) (diversification limits, liquid assets, an independent depositary and a standard information document) can be sold across the EU under a passport. Funds with other strategies, usually for professional investors, fall under the [AIFMD](https://eur-lex.europa.eu/eli/dir/2011/61/oj) regime.

Funds charge a **management fee**, which is deducted from the fund's assets and not billed to the investor. Ongoing costs are summarised by the **TER** (total expense ratio), a percentage of average assets per year:

$$\text{TER} = \frac{\text{annual costs}}{\text{average fund assets}}$$

> [!recall] Q1.1
> A TER of 0.40% equals 40 bp or the decimal 0.004. On a EUR 250,000 holding it is EUR 1,000 a year.

> [!recall] F1.5
> The return the investor keeps is the gross return minus the TER. Over 20 years, a difference of 1 percentage point a year compounds into a large gap.

> [!us]
> The US equivalent of an open-ended UCITS is the **mutual fund**, regulated under the Investment Company Act of 1940. US funds quote an **expense ratio**.

> [!uk]
> In the UK, the open-ended equivalent is the **OEIC** or unit trust. Investment trusts are the UK closed-end funds.`,
    },
    {
      md: String.raw`## Worked example: a subscription

> [!example]
> Subscription of EUR 60,000 into an equity UCITS fund. NAV on the dealing day: EUR 148.20. Ongoing charges (TER): 1.20%.
> Units received: $60{,}000 / 148.20 =$ **404.858 units**.
> Yearly cost of holding: $60{,}000 \times 0.012 =$ **EUR 720**, already reflected in the NAV and not billed separately.
>
> For the same amount in an ETF with a 0.20% TER, the yearly cost is EUR 120. Over 10 years at a flat EUR 60,000, the cost difference is EUR 6,000 before compounding.

Common pitfalls:

- NAV is not the same as the price of an ETF on screen. The two are close but not identical.
- Diversification reduces the risk of a single holding. It does not reduce the risk that the whole market falls.
- The TER excludes some costs, such as dealing commissions paid by the investor and the bid-offer spread of an ETF.`,
    },
    {
      md: String.raw`## Summary

- A fund pools investors' money, and each investor owns units that represent a share of the pool.
- NAV per unit is assets minus liabilities, divided by units outstanding.
- Open-ended funds deal with investors at NAV. ETFs trade on an exchange at a price near NAV. Closed-end funds trade at a price that can differ widely from NAV.
- UCITS is the EU retail fund framework with a cross-border passport.
- TER is the yearly cost as a percentage of fund assets, and it reduces the investor's return.`,
    },
  ],

  exercises: [
    {
      id: 'nav-per-unit',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const assetsM = M.amt(r.int(50, 500));
        const secM = f.round(assetsM * r.pick([0.95, 0.96, 0.97, 0.98]), 1);
        const cashM = f.round(assetsM - secM, 1);
        const liabPct = r.int(1, 10) * 0.2;
        const liabK = f.round(assetsM * 1000 * liabPct / 100, 0);
        const units = r.int(1, 10) * 0.5;
        const nav = f.round((assetsM * 1e6 - liabK * 1e3) / (units * 1e6), 2);
        return {
          prompt: `A fund holds **${CCY} ${f.num(secM, 1)} m** of securities and **${CCY} ${f.num(cashM, 1)} m** of cash. It owes **${CCY} ${f.num(liabK, 0)} thousand** in fees and expenses. There are **${f.num(units, 1)} million units** outstanding. What is the NAV per unit? (${CCY}, 2 dp)`,
          answer: nav, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: [
            `Total assets are ${CCY} ${f.num(secM, 1)} m of securities plus ${CCY} ${f.num(cashM, 1)} m of cash.`,
            `Liabilities are ${CCY} ${f.num(liabK, 0)} thousand, which is ${CCY} ${f.num(liabK / 1000, 3)} m. Subtract them from the total assets to get the net assets.`,
            `Net assets are total assets less liabilities, both in ${CCY} m. Divide that by the ${f.num(units, 1)} million units outstanding.`,
          ],
          solution: `Assets ${f.num(secM + cashM, 1)} m - liabilities ${f.num(liabK / 1000, 3)} m = ${f.num(assetsM - liabK / 1000, 3)} m. Divided by ${f.num(units, 1)} m units = **${f.money(nav, CCY)}** per unit.`,
        };
      },
    },
    {
      id: 'units-issued',
      template: 'numeric',
      generate(r, f) {
        const amt = r.int(10, 10000) * 100;
        const nav = r.float(10, 300, 0.25);
        const units = f.round(amt / nav, 3);
        const fund = r.pick(['an equity UCITS fund', 'a euro bond UCITS fund', 'a balanced UCITS fund', 'a money market fund']);
        return {
          prompt: `An investor subscribes **${f.eur(amt, 0)}** into ${fund}. The NAV per unit on the dealing day is **EUR ${f.num(nav, 2)}**. How many units does she receive? (3 dp)`,
          answer: units, dp: 3, tol: { abs: 0.001 }, unit: '',
          hints: [
            `Units are the amount invested divided by the NAV per unit: $${f.num(amt, 0)} / ${f.num(nav, 2)}$.`,
            `Use the full EUR ${f.num(amt, 0)}, since no subscription fee is taken. Round only the final number of units to 3 dp.`,
          ],
          solution: `${f.num(amt, 0)} / ${f.num(nav, 2)} = **${f.num(units, 3)} units**.`,
        };
      },
    },
    {
      id: 'fund-type',
      template: 'bucket',
      generate(r) {
        const open = [
          'Investors subscribe and redeem units directly with the fund at the daily NAV',
          'A UCITS mutual fund that issues new units whenever money comes in',
          'Units are cancelled by the fund when an investor redeems',
          'A balanced fund that sells units to retail clients at the end-of-day NAV',
          'The number of units outstanding changes every day with flows',
        ];
        const etf = [
          'Units trade on Xetra throughout the day at a market price close to NAV',
          'Authorised dealers create and redeem units; ordinary investors trade on the exchange',
          'A fund tracking an index whose units can be bought through any broker',
          'Intraday price available on a screen, with a market maker quoting a spread',
          'A UCITS ETF listed on Euronext Amsterdam',
        ];
        const closed = [
          'A fixed number of shares was issued once and cannot be redeemed',
          'Shares trade at a persistent 12% discount to the NAV',
          'A listed property company vehicle with a fixed share count, trading at a premium or discount',
          'Investors who want out must sell to another investor on the exchange; the fund never buys shares back',
          'An investment trust listed in London with a fixed capital',
        ];
        const items = r.shuffle([...r.sample(open, 3).map((t) => ({ text: t, bucket: 0 })), ...r.sample(etf, 3).map((t) => ({ text: t, bucket: 1 })), ...r.sample(closed, 3).map((t) => ({ text: t, bucket: 2 }))]);
        return {
          prompt: 'Which kind of fund does each description fit?',
          buckets: ['Open-ended fund', 'ETF', 'Closed-end fund'],
          items,
          hints: ['Who deals with the investor: the fund itself, or other investors on an exchange?', 'A fixed share count and no redemptions point to closed-end.'],
          solution: 'Open-ended: units created and cancelled by the fund at NAV. ETF: exchange-traded, price near NAV thanks to dealers. Closed-end: fixed share count, price can differ widely from NAV.',
        };
      },
    },
    {
      id: 'fund-terms',
      template: 'match',
      generate(r) {
        const t = [
          ['NAV', ['The value of one unit: net assets divided by units', 'Assets minus liabilities, per unit']],
          ['TER', ['The yearly ongoing cost as a percentage of fund assets', 'The total running cost ratio of the fund']],
          ['Unit', ['A proportional claim on the fund\'s pool of assets', 'What the investor receives in exchange for money invested']],
          ['Redemption', ['The investor sells units back to an open-ended fund', 'Cashing in units at the NAV']],
          ['UCITS', ['The EU label for retail funds with a cross-border passport', 'The harmonised EU framework for retail investment funds']],
          ['Diversification', ['Spreading the money over many holdings to reduce the impact of one failure', 'Not putting all the eggs in one basket']],
        ];
        return {
          prompt: 'Match each fund term with its meaning.',
          pairs: r.shuffle(t).slice(0, r.int(5, 6)).map((x) => [x[0], r.pick(x[1])]),
          hints: ['NAV and TER are both ratios, but one is about value and the other about cost.'],
        };
      },
    },
    {
      id: 'ter-from-fee',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const holding = M.amt(r.pick([100000, 200000, 250000, 400000, 500000, 800000, 1000000]));
        const pct = r.pick([0.2, 0.25, 0.4, 0.5, 0.75, 1, 1.25, 1.5, 2]);
        const fee = f.round(holding * pct / 100, 0);
        const correct = `${f.num(pct, 2)}%`;
        const wrong = [pct * 10, pct / 10, pct * 2].map((x) => `${f.num(x, 2)}%`);
        const choices = [correct, ...wrong];
        return {
          prompt: `A client holds **${f.money(holding, CCY, 0)}** in a fund and pays **${f.money(fee, CCY, 0)}** a year in fund costs. What is the TER?`,
          choices, answer: 0,
          hints: [
            `The TER is the yearly cost divided by the amount held: ${f.money(fee, CCY, 0)} out of ${f.money(holding, CCY, 0)}.`,
            `Work out ${f.num(fee, 0)} / ${f.num(holding, 0)}, then multiply by 100 to express it as a percentage. Check the size against the four options: the cost is a small fraction of the holding.`,
          ],
          solution: `${f.num(fee, 0)} / ${f.num(holding, 0)} = ${f.num(fee / holding, 4)} = **${correct}**.`,
        };
      },
    },
  ],
});
