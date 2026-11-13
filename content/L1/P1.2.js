/* P1.2 Equity: owning a slice of a company */
SA.unit({
  id: 'P1.2',
  lesson: [
    {
      md: String.raw`## Ordinary shares

An **ordinary share** (common stock in US usage) is a unit of ownership in a company. A holder of 2,000 out of 80,000,000 shares owns 0.0025% of it. That share carries a proportional claim on profits and assets and a vote on matters put to shareholders. In British usage "stocks" can mean shares or bonds, while "shares" always means ownership in a company.

Shares of a **listed** company trade on a stock exchange and have a public price. Shares of an **unlisted** (private) company carry the same rights but have no public price and are harder to sell.

Shareholders elect a board of directors, and the board appoints the managers who run the company day to day. A shareholder who cannot attend the annual general meeting (AGM) may vote by proxy. Owners and managers are different people, so managers may pursue aims that differ from the owners' interests. Board oversight, pay linked to results, scrutiny by analysts and creditors, and the threat of a takeover all limit this.

An ordinary share is an ownership claim, while a bond is a debt claim with fixed payments (P1.3). What remains of the profit after lenders are paid belongs to shareholders. The company can pay it out as a **dividend** or retain it and reinvest it in the business.`,
    },
    {
      md: String.raw`## Shareholder rights

An ordinary shareholder typically holds these rights:

1. **Dividends**: a share of the profit that the company decides to distribute. Unlike interest on a loan, a dividend is not a contractual obligation, and the company may pay nothing.
2. **Vote**: usually one vote per share on the election of the board, the accounts and major transactions.
3. **Residual claim**: shareholders come last in line. In a liquidation they receive what is left after tax authorities, employees, suppliers, bondholders and other creditors have been paid. For a going concern the residual is the operating profit left after interest and tax.
4. **Pre-emption**: when the company issues new shares for cash, existing holders can normally subscribe first, in proportion to their holding.

**Limited liability** caps the loss at the amount paid for the shares. Creditors of the company cannot claim the shareholder's house or other assets. The potential gain has no upper limit, because the price has no ceiling.

> [!eu]
> Across most of Europe the law requires pre-emptive rights for new shares issued for cash. A company may ask shareholders to waive them for a particular issue.

> [!us]
> Pre-emptive rights are less firmly established in the US, and a company can often sell new shares without offering them first to existing holders.`,
      check: {
        template: 'mcq',
        prompt: 'An investor buys shares in a limited company that later fails with large debts. Which statement about the investor\'s loss is correct?',
        choices: ['It cannot exceed the amount paid for the shares', 'It can exceed the amount paid, up to the size of the company\'s debts', 'It is unlimited, because creditors can claim the investor\'s personal assets', 'It is limited to the dividends already received'],
        answer: 0,
        solution: 'Limited liability means the shareholder can lose the whole purchase price but nothing more.',
      },
    },
    {
      md: String.raw`## Market capitalisation, dividend yield and P/E

Three figures summarise a listed share.

**Market capitalisation** is the market value of all shares in issue:

$$\text{market cap} = \text{number of shares} \times \text{price per share}$$

**Dividend yield** compares the yearly dividend with the current price:

$$\text{dividend yield} = \frac{\text{dividend per share}}{\text{price per share}}$$

The **price/earnings (P/E) ratio** divides the price by the profit (earnings) per share. It shows how many euros buyers pay for one euro of annual profit, and it allows a share to be compared with similar companies. The **dividend cover** is earnings per share divided by dividend per share. A cover below 1 means the dividend is not covered by that year's profit and must be paid from reserves.

> [!example]
> A listed firm has 80,000,000 shares at EUR 25.00. It pays a dividend of EUR 1.00 per share and earns EUR 2.00 per share.
> Market cap: $80{,}000{,}000 \times 25 =$ **EUR 2,000,000,000**.
> Dividend yield: $1.00 / 25 = 0.04 =$ **4.0%**.
> Total dividends: $80{,}000{,}000 \times 1.00 =$ **EUR 80,000,000**.
> P/E: $25 / 2 =$ **12.5**.
> Dividend cover: $2.00 / 1.00 =$ **2.0**. Half of the profit, EUR 80,000,000, is retained.

> [!recall] Q1.1
> A yield of 4.0% is the fraction 0.04, which is 400 bp.

> [!recall] F1.5
> Dividend yield is only part of the return. Total return adds the price change, so a share that pays a 4% dividend and falls 10% has lost money.`,
    },
    {
      md: String.raw`## Raising new capital: rights issues

A company that needs more capital can offer new shares to its existing shareholders in proportion to their holdings. This is a **rights issue**. The new shares are offered at a discount to the market price, and the discount lowers the average price of all shares. The market price therefore adjusts when the shares go **ex-rights**.

> [!example]
> A company offers 1 new share for every 4 held at EUR 20.00. The shares trade at EUR 24.00.
> Value of a block of 5 shares: $4 \times 24 + 1 \times 20 = 116$.
> Theoretical ex-rights price: $116 / 5 =$ **EUR 23.20**.
> Each new share carries a right worth $23.20 - 20.00 =$ **EUR 3.20**.
> A holder of 400 shares owns EUR 9,600 before the issue. If she subscribes for 100 new shares (EUR 2,000), she holds 500 shares at 23.20, which is EUR 11,600. If she sells the rights instead, she holds 400 shares worth EUR 9,280 plus EUR 320 in cash, which is EUR 9,600 again.

The discount is therefore apparent rather than real. A holder who neither subscribes nor sells the rights loses value. If the market price falls below the subscription price before the issue closes, nobody will subscribe. For this reason a rights issue is **underwritten** by banks, which agree to buy the shares that investors leave unsold. Markets also examine what the new money will be used for.`,
    },
    {
      md: String.raw`## Ranking in a wind-up

If a company is liquidated, claims are met in a legal order. In simplified form, from the top:

1. **Senior secured creditors**, who hold a pledge or mortgage on specific assets and are paid from them.
2. **Senior unsecured creditors**, such as suppliers and bondholders without security, who have a general claim on all other assets.
3. **Subordinated creditors**, who agreed to rank below the senior debt.
4. **Preferred shareholders**. Preferred stock pays a fixed dividend, usually has no vote and resembles a perpetual bond. The company has no contractual duty to pay the dividend, but unpaid preferred dividends usually accumulate and must be settled before ordinary shareholders receive anything.
5. **Ordinary shareholders**, who receive what is left, which is often nothing.

A higher legal rank does not guarantee payment in full. If the company's assets are insufficient, even senior creditors may take a loss.

> [!uk]
> UK insolvency law follows the same broad order of priority, with some statutory preferences (certain employee and tax claims) ahead of other unsecured creditors. National rules differ in detail.

> [!us]
> In the US the order is set by the Bankruptcy Code. Common stock again ranks last.`,
    },
    {
      md: String.raw`## Why share prices move

A share price is what the market is prepared to pay. Buyers look at the two rewards from owning a share, which are dividends and a rise in the price, and both depend on future profits. The price moves when expectations about them change or when buying and selling pressure changes.

- **Company news**: earnings above or below expectations, a profit warning, a dividend cut or a takeover bid.
- **Macroeconomic news**: interest rates, inflation and growth data. Higher rates make future profits worth less today and also make bonds more attractive, so share prices tend to fall.
- **Sector or regulatory news**: a new tax, a rule change or a rival's product.
- **Flows**: a large fund selling, or an index change that forces tracker funds to buy or sell. A share added to a widely tracked index often rises on the day.

Facts about one holder, such as the purchase price, the size of the holding or the broker used, do not move the price.

> [!warning]
> When a share goes ex-dividend its price typically falls by about the dividend, because new buyers no longer receive it. The fall is a transfer from share price to cash and not a loss of value.

> [!example]
> A holder owns 1,500 shares at EUR 40.00. After a profit warning the price falls 15%.
> Value before: $1{,}500 \times 40 =$ **EUR 60,000**.
> New price: $40 \times (1 - 0.15) =$ **EUR 34.00**.
> Value after: $1{,}500 \times 34 =$ **EUR 51,000**, a loss of **EUR 9,000**.
> To return to EUR 40.00 the share must rise by $6/34 = 17.6\%$, which is more than 15%.

Further points to watch:

- Market cap values the equity only. A firm with large debts has a higher total value, called enterprise value.
- A very high dividend yield can signal trouble, because the price may have collapsed and the dividend may be cut.
- A share split changes the number of shares and the price in opposite directions and leaves market cap unchanged.`,
    },
    {
      md: String.raw`## Summary

- A share is a unit of ownership with these typical rights: dividend if declared, vote, residual claim and, for cash issues in most of Europe, pre-emption.
- Limited liability caps losses at the amount invested, but shareholders rank last in a liquidation, after creditors and preferred shareholders.
- Market cap is shares times price. Dividend yield is dividend per share divided by price. P/E is price divided by earnings per share.
- A rights issue sells new shares at a discount to existing holders, and the share price adjusts to a lower ex-rights level.
- Prices move on changing expectations and on flows, not on what any investor paid. A fall of x% needs a rise of more than x% to recover.`,
    },
  ],

  exercises: [
    {
      id: 'cap-and-yield',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const sh = r.int(10, 500);
        const price = M.px(r.int(3, 300));
        const yPct = r.int(1, 14) * 0.5;
        const dps = f.round(price * yPct / 100, 2);
        const capM = sh * price;
        const co = r.pick([`a ${M.city}-listed insurer`, `a ${M.adj} chemicals group`, `a ${M.city}-listed bank`, `a ${M.adj} utility`]);
        const kind = r.int(0, 4);
        if (kind === 0) {
          return {
            prompt: `${co.charAt(0).toUpperCase() + co.slice(1)} has **${sh} million** shares in issue, trading at **${CCY} ${price}**. What is its market capitalisation? (${CCY} million, no decimals)`,
            answer: capM, dp: 0, tol: { abs: 0.5 }, unit: CCY,
            hints: ['Market cap = number of shares x price.'],
            solution: `${sh} m x ${price} = **${CCY} ${f.num(capM, 0)} m**.`,
          };
        }
        if (kind === 1) {
          const dpsC = f.round(price * (r.int(1, 12) * 0.5) / 100, 2);
          const yld = f.round(dpsC / price * 100, 2);
          return {
            prompt: `A share trades at **${CCY} ${price}** and the company pays a dividend of **${CCY} ${f.num(dpsC, 2)}** per share per year. What is the dividend yield? (answer in %, 2 dp)`,
            answer: yld, dp: 2, tol: { abs: 0.01 }, unit: '%',
            hints: ['Yield = dividend per share / price.', 'Convert the fraction to a percentage.'],
            solution: `${f.num(dpsC, 2)} / ${price} = ${f.num(dpsC / price, 4)} = **${f.num(yld, 2)}%**.`,
          };
        }
        if (kind === 3) {
          const n = r.int(2, 40) * 10;
          const dpsB = f.round(price * (r.int(2, 10) * 0.5) / 100, 2);
          const amount = n * price;
          const inc = f.round(n * dpsB, 2);
          return {
            prompt: `An investor spends **${f.money(amount, CCY, 0)}** on shares of ${co} priced at **${CCY} ${price}**. The company pays a dividend of **${CCY} ${f.num(dpsB, 2)}** per share per year. What is her annual dividend income? (${CCY}, 2 dp)`,
            answer: inc, dp: 2, tol: { abs: 0.01 }, unit: CCY,
            hints: ['Number of shares = amount spent / price.', 'Dividend income = number of shares x dividend per share.'],
            solution: `Shares bought: ${f.num(amount, 0)} / ${price} = ${n}. Income = ${n} x ${f.num(dpsB, 2)} = **${f.money(inc, CCY)}**.`,
          };
        }
        if (kind === 4) {
          const eps = f.round(price / r.pick([8, 10, 12.5, 15, 20]), 2);
          const pe = f.round(price / eps, 1);
          return {
            prompt: `A share trades at **${CCY} ${price}** and the company earns **${CCY} ${f.num(eps, 2)}** per share. What is the price/earnings ratio? (1 dp)`,
            answer: pe, dp: 1, tol: { abs: 0.1 }, unit: '',
            hints: ['P/E = price per share / earnings per share.'],
            solution: `${price} / ${f.num(eps, 2)} = **${f.num(pe, 1)}**.`,
          };
        }
        const total = f.round(sh * dps, 2);
        return {
          prompt: `${co.charAt(0).toUpperCase() + co.slice(1)} has **${sh} million** shares at **${CCY} ${price}** and a dividend yield of **${f.num(yPct, 1)}%**. How much does it pay out in total dividends? (${CCY} million, 2 dp)`,
          answer: total, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: ['Dividend per share = price x yield.', 'Total dividends = dividend per share x number of shares.'],
          solution: `Dividend per share = ${price} x ${f.num(yPct / 100, 4)} = ${f.num(dps, 2)}. Total = ${sh} m x ${f.num(dps, 2)} = **${CCY} ${f.num(total, 2)} m**.`,
        };
      },
    },
    {
      id: 'shareholder-right',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const sc = [
          ['The AGM votes on electing the board of the company.', 0, ['The situation is a decision taken at a meeting. Ask who takes part in that decision and what gives them a say.', 'Electing the board is a choice made at the AGM. Ask which of the four rights lets a holder take part in such a choice.']],
          ['Shareholders are asked to approve the annual accounts at the meeting.', 0, ['The shareholders are asked to approve something at a meeting. Ask what a holder does at an AGM.', 'Approval of the accounts is a decision put to the holders. Ask which right lets them decide.']],
          [`The AGM has approved a dividend of ${CCY} ${f.num(M.amt(0.6), 2)} per share and you held the share on the record date.`, 1, ['The dividend has been approved, and a record date is mentioned. Ask what the record date decides.', 'You held the share on the record date, so ask what the company now owes you per share.']],
          ['The board has paid out the declared interim dividend to all holders on the register.', 1, ['The word "declared" and the payment to holders on the register describe a cash payment per share. Ask what a holder is owed once it is declared.', 'The money goes to all holders on the register. Ask which right this payment belongs to.']],
          [`The company launches a ${CCY} ${f.num(M.amt(400), 0)} m capital increase and offers the new shares first to existing holders.`, 2, ['A capital increase creates new shares. Ask who is offered them first and what that does to existing holders.', 'Offering new shares first to existing holders protects something about their stake. Ask what that is.']],
          ['A rights issue offers one new share for every five held, at a discount.', 2, ['A rights issue offers new shares in proportion to the shares already held. Ask what the offer protects.', 'The offer is tied to the number of shares held, one new share for every five. Ask which right gives existing holders that first call.']],
          [`A shareholder demands that the company repays her original ${CCY} ${f.num(M.amt(10000), 0)} on a fixed date.`, 3, ['The shareholder asks for repayment of her original amount on a fixed date. Ask whether the company has to repay equity capital to a holder.', 'Compare the demand with what you know about debt. Ask whether a share has a maturity date or a promised repayment.']],
          ['A shareholder asks to take home a company vehicle in proportion to her stake.', 3, ['The shareholder asks for an asset of the company, not a vote, a dividend or new shares. Ask which of the four rights covers that.', 'Ask whether a holder can claim a specific company asset during normal operations, or only a share of what remains at the end.']],
          ['A holder of non-voting savings shares asks to vote at the ordinary AGM.', 3, ['Read the share type in the text: it is described as non-voting. Ask what that says about the right to vote.', 'The holder owns a class of share that differs from the ordinary share. Ask whether it carries the rights of the ordinary share.']],
          ['A shareholder asks for a guaranteed minimum dividend each year.', 3, ['The request is for a guaranteed minimum dividend. Ask whether a dividend is promised before the company declares it.', 'Compare a guaranteed payment with a declared dividend. Ask which one an ordinary share gives.']],
        ];
        const [text, ans, hintList] = r.pick(sc);
        const choices = ['The right to vote', 'The right to a declared dividend', 'The right to subscribe new shares first (pre-emption)', 'No such right: it is not part of an ordinary share'];
        const why = ['Voting at the meeting is a core shareholder right.', 'Once declared, the dividend is owed to holders on the record date.', 'Pre-emption lets existing holders keep their percentage ownership.', 'Ordinary shares carry no right to repayment of capital, to assets in kind or to a guaranteed dividend, and non-voting classes have no vote.'][ans];
        return {
          prompt: `Which shareholder right applies in this situation? *${text}*`,
          choices, answer: ans, fixedOrder: true,
          hints: hintList,
          solution: why,
        };
      },
    },
    {
      id: 'liquidation-order',
      template: 'order',
      generate(r) {
        const all = ['Secured creditor (bank with a pledge)', 'Unsecured senior creditor (supplier)', 'Subordinated bondholder', 'Preferred shareholder', 'Ordinary shareholder'];
        const drop = r.pick([1, 2, 3]);
        const items = all.filter((_, k) => k !== drop);
        return {
          prompt: 'The company is liquidated. Put the claims in the order in which they are paid, **first to last**.',
          items,
          hints: ['Debt is paid before any kind of equity, and secured debt before unsecured.', 'Ordinary shareholders come last, after preferred shareholders.'],
          solution: 'Secured creditors are paid first, then unsecured senior creditors, then subordinated creditors, then preferred shareholders. Ordinary shareholders receive what is left.',
        };
      },
    },
    {
      id: 'price-drivers',
      template: 'multi',
      generate(r) {
        const yes = ['A profit warning from the company', 'Earnings well above analysts\' expectations', 'A takeover bid at a premium', 'A rise in market interest rates', 'A dividend cut announcement', 'A new regulation hitting the company\'s sector', 'A large fund selling its stake', 'A rating downgrade of the company', 'A strong inflation surprise'];
        const no = ['The colour of the company logo', 'The price an individual investor originally paid', 'The ISIN check digit', 'Which broker a client uses', 'The font used in the annual report', 'The weekday an account was opened', 'The investor\'s own tax bracket', 'The name of the investor', 'The number of shares a small private investor holds'];
        const k = r.int(3, 5);
        const pairs = r.shuffle([...r.sample(yes, k).map((t) => [t, true]), ...r.sample(no, 12 - k).map((t) => [t, false])]);
        return {
          prompt: 'Select **all** the factors that can move the market price of a listed share.',
          choices: pairs.map((p) => p[0]),
          answers: pairs.map((p, i) => (p[1] ? i : -1)).filter((i) => i >= 0),
          hints: ['Prices respond to news about the future profits of the company and to the general level of interest rates.', 'Facts about one particular investor do not change what everybody else will pay.'],
        };
      },
    },
    {
      id: 'holding-move',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const sh = r.int(1, 50) * 100;
        const price = M.px(r.float(8, 120, 0.5));
        const mv = r.pick([-15, -12, -10, -8, -5, -3, 4, 6, 8, 10, 12, 15, 18, 20]);
        const v0 = f.round(sh * price, 2);
        const p1 = f.round(price * (1 + mv / 100), 4);
        const v1 = f.round(v0 * (1 + mv / 100), 2);
        const ask = r.int(0, 1);
        if (ask === 0) {
          return {
            prompt: `You hold **${f.num(sh, 0)} shares** priced at **${CCY} ${f.num(price, 2)}**. The price changes by **${mv > 0 ? '+' : ''}${mv}%**. What is the value of the holding afterwards? (${CCY}, 2 dp)`,
            answer: v1, dp: 2, tol: { abs: 0.01 }, unit: CCY,
            hints: ['Value before = shares x price.', `Multiply by ${f.num(1 + mv / 100, 2)}.`],
            solution: `Before: ${f.num(sh, 0)} x ${f.num(price, 2)} = ${f.num(v0, 2)}. After: ${f.num(v0, 2)} x ${f.num(1 + mv / 100, 2)} = **${f.money(v1, CCY)}**.`,
          };
        }
        const diff = f.round(v1 - v0, 2);
        return {
          prompt: `You hold **${f.num(sh, 0)} shares** priced at **${CCY} ${f.num(price, 2)}**. The price changes by **${mv > 0 ? '+' : ''}${mv}%**. What is the profit (+) or loss (-) on the holding, in ${CCY}? (2 dp, use a minus sign for a loss)`,
          answer: diff, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: ['Value before = shares x price.', 'Change = value before x the percentage move as a decimal.'],
          solution: `Value before ${f.num(v0, 2)}; change = ${f.num(v0, 2)} x ${f.num(mv / 100, 2)} = **${f.money(diff, CCY)}**.`,
        };
      },
    },
  ],
});
