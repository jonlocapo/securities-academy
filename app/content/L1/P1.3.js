/* P1.3 Debt: bonds and the promise to repay */
SA.unit({
  id: 'P1.3',
  lesson: [
    {
      md: String.raw`## Bonds

A **bond** is a debt security. The issuer promises to pay the holder interest on fixed dates and to repay the borrowed amount at maturity. Governments issue bonds to fund budgets, companies to finance investment, and supranational institutions such as the European Investment Bank (EIB) to lend for public projects.

A bond differs from a bank loan because it is divided into standard units that investors can trade. It differs from a share because the holder is a creditor with a claim to fixed payments and not an owner (P1.2). In a liquidation bondholders are paid before shareholders.

Describing a bond means listing its cash flows. A plain bond has regular interest payments and one repayment of the borrowed amount at the end. Valuation, yield and risk measures in fixed income are all calculated from this list.`,
    },
    {
      md: String.raw`## The terms of a plain bond

| Term | Meaning | Example |
|---|---|---|
| **Issuer** | Who owes the money | Italian Republic, a utility, the EIB |
| **Par / principal / face value** | The amount repaid at maturity and the base for coupons | EUR 1,000 per bond |
| **Coupon rate** | Annual interest as a percentage of par | 3% means EUR 30 a year per EUR 1,000 |
| **Maturity** | The date on which par is repaid | 5 years from issue |
| **Redemption** | The repayment of par at maturity | EUR 1,000 on the maturity date |
| **Issue price** | What investors pay when the bond is first sold | 99.5% of par |
| **Rating** | An agency's opinion of the issuer's ability to pay | AAA (strongest) down to D (default) |

The annual coupon is the coupon rate times par. Bonds with one to five years to maturity are usually called short term, five to twelve years intermediate, and over twelve years long term. The maturity matters for three reasons. It sets the period over which coupons are received. It affects the yield the market requires. It also affects how much the price moves when market yields change, because the price of a longer bond is more sensitive.

> [!example]
> A EUR 1,000 bond pays a 3% coupon and matures in 5 years. Its cash flows are EUR 30 at the end of each of years 1 to 5, plus EUR 1,000 at the end of year 5. A **zero-coupon bond** pays no coupon. The holder earns interest by buying below par, and the interest is the difference between par and the price paid.

A **floating-rate bond** resets its coupon periodically as a reference rate plus a margin. If the reference rate is 2.8% and the margin is 150 bp, the coupon for the period is 4.3%.

> [!eu]
> Euro-area government bonds have established names: **BTP** (Italy), **Bund** (Germany), **OAT** (France) and **Bono** (Spain). Coupons on most euro-area bonds are paid once a year, though some issues, such as BTPs, pay twice.

> [!us]
> US Treasury and most US corporate bonds pay coupons twice a year, so a 6% coupon on par of 1,000 is paid as 30 every six months.`,
    },
    {
      md: String.raw`## Price and current yield

Bonds are quoted as a **percentage of par**. A price of 95 means 95% of nominal, which is EUR 950 for EUR 1,000 nominal and EUR 4,750,000 for EUR 5,000,000 nominal. The quoted price excludes interest accrued since the last coupon date, which the buyer pays to the seller in addition. This quoted price is the **clean price**.

- A price above 100 is a **premium**.
- A price of 100 is **par**.
- A price below 100 is a **discount**.

The **current yield** relates the annual coupon to the price paid:

$$\text{current yield} = \frac{\text{annual coupon}}{\text{market price}}$$

> [!example]
> A EUR 1,000 bond pays a 3% coupon, which is EUR 30 a year for 5 years. It trades at 95, which is EUR 950.
> Current yield: $30 / 950 =$ **3.16%**.
> The buyer also gains EUR 50 at maturity because par is repaid, so the total return is higher than the coupon rate. Current yield ignores that gain and ignores the time value of money. **Yield to maturity** includes both and is covered in P3.

> [!recall] Q1.1
> A coupon of 3% is the decimal 0.03 and a price of 95 is the fraction 0.95.`,
      check: {
        template: 'mcq',
        prompt: 'A bond with EUR 10,000 nominal is quoted at 98.50. What does a buyer pay for the bond itself, before accrued interest?',
        choices: ['EUR 9,850', 'EUR 98.50', 'EUR 10,098.50', 'EUR 985'],
        answer: 0,
        solution: 'The price is a percentage of par: 98.50% of EUR 10,000 is EUR 9,850.',
      },
    },
    {
      md: String.raw`## Price and yield move in opposite directions

The price of a bond is the present value of its cash flows, discounted at the yield that the market requires. A fixed cash flow discounted at a higher rate has a lower present value, so the price falls when required yields rise and rises when they fall.

The coupon is fixed, so only the price can adjust to bring the bond's return in line with the market:

| Coupon rate against required yield | Price | Name |
|---|---|---|
| Coupon below required yield | Below par | Discount bond |
| Coupon equal to required yield | Par | Par bond |
| Coupon above required yield | Above par | Premium bond |

A 3% bond is less attractive when new bonds pay 5%, so buyers pay less than par for it. If market yields fall to 2%, the 3% coupon is attractive and buyers pay more than par. If yields do not change, the price of a discount or premium bond moves gradually towards par as maturity approaches.

> [!recall] F1.3
> A zero-coupon note repaying EUR 1,000 in 5 years at a 4% discount rate is worth $1{,}000 / 1.04^5 =$ EUR 821.93. At a higher rate the value is lower.

> [!example]
> A 1-year zero-coupon bond repays EUR 1,000 in one year, so its price is $1{,}000/(1+y)$.
> At a 4% market yield the price is **EUR 961.54**.
> At 5% it is **EUR 952.38**, which is lower.

Other things equal, a bond with a longer maturity or a lower coupon changes more in price for a given move in yields. Dealers that hold long-dated bonds are therefore exposed to changes in interest rates.`,
    },
    {
      md: String.raw`## Credit risk and ratings

**Credit risk** is the risk that the issuer fails to pay interest or principal on time, which is a default. Investors require a higher yield to bear it. The extra yield over a benchmark government bond of similar maturity is the **spread**, quoted in basis points. A corporate that borrows at "government plus 90 bp" pays 0.90% more than the government rate, and the spread changes as the issuer's credit quality changes.

Rating agencies (Standard & Poor's, Moody's and Fitch) publish opinions on the likelihood of default. The S&P scale runs AAA, AA, A, BBB, BB, B, CCC, CC, C and D, with + and - modifiers. Moody's uses different letters. Ratings of BBB- and above are **investment grade**. Below that is **high yield** (also called speculative grade or junk). Many funds may hold only investment-grade bonds. A downgrade raises the issuer's borrowing cost, and ratings of the same issuer by different agencies can differ.

Issuers fall into three groups:

- **Governments** (and their agencies and regional authorities). Strong governments are the safest borrowers in their own currency and their yields are the benchmark for other borrowers. Other euro governments pay a spread over Bunds.
- **Corporates**, which range from very solid utilities to speculative issuers.
- **Supranationals** such as the EIB, the ESM and the World Bank, which are owned by several states and are usually rated AAA or close to it.

> [!warning]
> A high coupon usually reflects high risk and does not indicate quality. A rating is an opinion and not a guarantee, and it changes over time.`,
    },
    {
      md: String.raw`## Worked example: reading a bond

> [!example]
> EUR 250,000 nominal of a 4.5% bond bought at 102.
> Annual coupon: $250{,}000 \times 0.045 =$ **EUR 11,250**.
> Price paid: $250{,}000 \times 1.02 =$ **EUR 255,000**.
> Current yield: $11{,}250 / 255{,}000 =$ **4.41%**, below the 4.5% coupon because the buyer paid a premium.
> At maturity only EUR 250,000 is repaid, so EUR 5,000 of the premium is lost. Current yield does not show this loss.

For a bond priced above par the current yield is below the coupon rate, and for a bond priced below par it is above the coupon rate. When price equals par, the two are equal.`,
    },
    {
      md: String.raw`## Summary

- A plain bond is a list of dated cash flows: fixed coupons and par at maturity. A zero-coupon bond has only the final payment.
- Bonds are quoted as a percentage of par. A price of 95 on EUR 1,000 nominal is EUR 950, excluding accrued interest.
- Current yield is the annual coupon divided by the price. It is below the coupon rate for premium bonds and above it for discount bonds, and it ignores the gain or loss at maturity.
- When market yields rise, bond prices fall, and the reverse, because fixed cash flows are discounted at a different rate.
- Issuers (governments, corporates, supranationals) differ in credit risk. Ratings are opinions on it, and the spread over government yields pays for it.`,
    },
  ],

  exercises: [
    {
      id: 'coupon-current-yield',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const nom = M.amt(r.pick([1000, 5000, 10000, 50000, 100000, 250000, 500000, 1000000]));
        const cpn = r.int(1, 14) * 0.5;
        const px = r.float(80, 115, 0.5);
        const coupon = f.round(nom * cpn / 100, 2);
        const paid = f.round(nom * px / 100, 2);
        // annual payers only (BTPs, gilts and US Treasuries pay twice a year)
        const gov = { DE: 'a Bund', FR: 'an OAT', ES: 'a Bono', NL: 'a Dutch State Loan' }[M.key];
        const issuer = r.pick([gov || 'a corporate bond', 'a utility bond', 'a bank bond'].concat(M.region === 'EU' ? ['an EIB bond'] : []));
        const mode = r.int(0, 2);
        if (mode === 2) {
          const half = f.round(coupon / 2, 2);
          return {
            prompt: `You hold **${f.money(nom, CCY, 0)} nominal** of a bond with a **${f.num(cpn, 1)}%** coupon paid in two equal instalments each year. How much do you receive on each coupon date? (${CCY}, 2 dp)`,
            answer: half, dp: 2, tol: { abs: 0.01 }, unit: CCY,
            hints: ['Annual coupon = nominal x coupon rate.', 'Divide the annual coupon by the number of payments per year.'],
            solution: `Annual coupon = ${f.num(nom, 0)} x ${f.num(cpn / 100, 4)} = ${f.num(coupon, 2)}. Per payment: ${f.num(coupon, 2)} / 2 = **${f.money(half, CCY)}**.`,
          };
        }
        if (mode === 0) {
          return {
            prompt: `You hold **${f.money(nom, CCY, 0)} nominal** of ${issuer} with a **${f.num(cpn, 1)}%** annual coupon. What is the annual coupon payment? (${CCY}, 2 dp)`,
            answer: coupon, dp: 2, tol: { abs: 0.01 }, unit: CCY,
            hints: ['Coupon payment = nominal x coupon rate.'],
            solution: `${f.num(nom, 0)} x ${f.num(cpn / 100, 4)} = **${f.money(coupon, CCY)}**.`,
          };
        }
        const cy = f.round(coupon / paid * 100, 2);
        return {
          prompt: `${issuer.charAt(0).toUpperCase() + issuer.slice(1)} with a **${f.num(cpn, 1)}%** annual coupon is quoted at **${f.num(px, 1)}** (% of par). What is its current yield? (answer in %, 2 dp)`,
          answer: cy, dp: 2, tol: { abs: 0.01 }, unit: '%',
          hints: [`Use a convenient nominal such as ${f.num(M.amt(1000), 0)}: coupon in ${CCY} = nominal x coupon rate.`, `Price in ${CCY} = nominal x price / 100. Then divide coupon by price.`],
          solution: `Per ${f.money(nom, CCY, 0)} nominal: coupon ${f.num(coupon, 2)}, price paid ${f.num(paid, 2)}. Current yield = ${f.num(coupon, 2)} / ${f.num(paid, 2)} = **${f.num(cy, 2)}%**.`,
        };
      },
    },
    {
      id: 'bond-terms',
      template: 'match',
      generate(r) {
        const terms = [
          ['Par (nominal)', ['The amount repaid at maturity and used as base for coupons', 'The face value printed on the bond']],
          ['Coupon', ['The fixed periodic interest, as % of par', 'The interest paid to holders on set dates']],
          ['Maturity', ['The date on which the bond ends', 'The day on which the issuer must repay par']],
          ['Issue price', ['What investors pay when the bond is first sold', 'The primary-market price, often close to 100']],
          ['Rating', ['An agency\'s opinion of the issuer\'s ability to repay', 'A letter grade for credit quality']],
          ['Redemption', ['The repayment of principal to the holder', 'The return of par at the end of the bond\'s life']],
        ];
        return {
          prompt: 'Match each bond term with its meaning.',
          pairs: r.shuffle(terms).slice(0, r.int(5, 6)).map((x) => [x[0], r.pick(x[1])]),
          hints: ['Par and redemption are related: one is the amount, the other is the act of paying it.', 'Match the pairs you are sure about first. The remaining ones narrow down quickly.'],
        };
      },
    },
    {
      id: 'price-direction',
      template: 'mcq',
      generate(r) {
        const cpn = r.pick([1.5, 2, 3, 4, 5]);
        const yieldUp = r.bool();
        const from = r.pick([2, 2.5, 3, 3.5]);
        const to = yieldUp ? from + r.pick([0.5, 1, 1.5]) : Math.max(0.5, from - r.pick([0.5, 1]));
        const issuer = r.pick(['an Italian BTP', 'a German Bund', 'a UK gilt', 'a US Treasury note', 'a Singapore Government Securities bond', 'a Hong Kong government bond', 'a corporate bond', 'an EIB bond']);
        const choices = ['The price falls', 'The price rises', 'The price stays equal to par', 'It depends only on the coupon date'];
        return {
          prompt: `You own ${issuer} with a fixed **${cpn}% coupon**. Market yields for similar bonds move from **${from}%** to **${to}%**. What happens to the price of your bond?`,
          choices, answer: yieldUp ? 0 : 1, fixedOrder: true,
          hints: [
            `The coupon of ${cpn}% is fixed. Compare it with the ${to}% that similar bonds now yield, and with the ${from}% they yielded before.`,
            `Market yields ${yieldUp ? 'rose' : 'fell'} by ${Math.abs(to - from)} percentage points. Ask whether buyers would now pay more or less for a bond paying ${cpn}% than they would have before.`,
          ],
          solution: yieldUp
            ? `Market yields rose, so new bonds pay more than your fixed ${cpn}%. Your bond must be cheaper for buyers to accept it: **the price falls**.`
            : `Market yields fell, so your fixed ${cpn}% is more attractive than new bonds. Buyers pay more: **the price rises**.`,
        };
      },
    },
    {
      id: 'issuer-types',
      template: 'bucket',
      generate(r) {
        const gov = [
          'The Italian Treasury issuing a 10-year BTP', 'The German federal government issuing a Bund', 'The French state issuing an OAT',
          'The Spanish Treasury issuing a Bono', 'A regional government issuing a bond backed by its tax revenue', 'The US Treasury issuing a note',
          'The UK Debt Management Office issuing a gilt', 'The Singapore government issuing a Singapore Government Securities bond', 'The Hong Kong government issuing a green bond',
        ];
        const corp = [
          'A listed utility financing a new power plant', 'A carmaker issuing a bond to fund a factory', 'A bank issuing senior debt',
          'A luxury group refinancing its loans', 'A telecom company issuing a hybrid bond', 'A high-yield retailer with a BB rating',
        ];
        const supra = [
          'The European Investment Bank funding infrastructure', 'The European Stability Mechanism raising funds for euro-area support', 'The World Bank issuing a euro bond',
          'The European Bank for Reconstruction and Development', 'The European Union itself issuing EU-Bonds', 'The Asian Development Bank issuing a bond',
        ];
        const items = r.shuffle([
          ...r.sample(gov, 4).map((t) => ({ text: t, bucket: 0 })),
          ...r.sample(corp, 4).map((t) => ({ text: t, bucket: 1 })),
          ...r.sample(supra, 4).map((t) => ({ text: t, bucket: 2 })),
        ]);
        return {
          prompt: 'Sort each issuer into **government**, **corporate** or **supranational**.',
          buckets: ['Government', 'Corporate', 'Supranational'],
          items,
          hints: ['Supranationals are owned by several states together.', 'Credit risk is usually lowest for strong governments and supranationals, highest for weak corporates.'],
          solution: 'Governments are single states and their agencies. Supranationals are owned by several states. Corporates are companies and banks. Typically, supranationals and strong governments carry the lowest credit risk, and corporate credit risk varies most.',
        };
      },
    },
    {
      id: 'one-year-zero',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const y = r.float(0.5, 8, 0.25);
        const nom = M.amt(r.pick([1000, 1000, 1000, 5000, 10000]));
        const pv = f.round(nom / (1 + y / 100), 2);
        return {
          prompt: `A 1-year zero-coupon bond repays **${f.money(nom, CCY, 0)}** in one year and pays no coupon. The market yield is **${f.num(y, 2)}%**. What is its price today? (${CCY}, 2 dp)`,
          answer: pv, dp: 2, tol: { abs: 0.01 }, unit: CCY,
          hints: ['Discount the single cash flow back one year.', `Price = nominal / (1 + yield) with yield = ${f.num(y / 100, 4)}.`],
          solution: `${f.num(nom, 0)} / (1 + ${f.num(y / 100, 4)}) = **${f.money(pv, CCY)}**.`,
        };
      },
    },
  ],
});
