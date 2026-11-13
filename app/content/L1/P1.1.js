/* P1.1 Securities and why markets exist */
SA.unit({
  id: 'P1.1',
  lesson: [
    {
      md: String.raw`## Why markets exist

Households and firms with surplus money want a return on it. Companies, governments and banks need money for projects and obligations. A financial system connects the two groups, and a **financial market** is a place or network where the claims that carry out this connection are issued and traded.

Funding can pass through a bank, which takes deposits and makes loans. It can also pass directly from savers to borrowers through **securities**, which are claims that investors hold and trade among themselves. This unit defines a security, names the parties around it and distinguishes the markets in which it is issued and traded.

> [!recall] Q1.1
> Percentages are decimals in calculations: a fee of 3% is 0.03.`,
    },
    {
      md: String.raw`## A security is a tradable claim

A **security** is a financial claim, recorded in a standard form, that can be **transferred** from one holder to another. The claim can be:

- a piece of ownership (a share),
- a right to be repaid with interest (a bond),
- a share in a pool of assets (a fund unit),
- or a right to buy, sell or be paid by reference to another security or an index (a warrant, a listed certificate).

Some items resemble securities but are not:

| Thing | Why it is not a security |
|---|---|
| Bank deposit | A private claim on one bank. It cannot be sold to someone else on a market. |
| Bilateral loan | A contract between lender and borrower. Transfer needs both sides to agree. |
| Trade invoice | A claim on a customer. It is sold only through a separate arrangement (factoring). |
| Insurance policy, employment contract | A contract with obligations on both sides, not a standardised tradable claim. |
| Cash | A means of payment and not a claim that is negotiated on the capital market. |

Securities share two properties. They are **transferable**, so they can be passed on without a new agreement with the issuer. They are **fungible**, so one unit of an issue is interchangeable with another unit of the same issue, like two 10-euro notes.

> [!eu]
> [MiFID II](https://eur-lex.europa.eu/eli/dir/2014/65/oj) defines transferable securities as classes of securities that are negotiable on the capital market, other than instruments of payment (Art. 4(1)(44)). Annex I, Section C lists the financial instruments: transferable securities, money-market instruments, units in collective investment undertakings, derivatives and emission allowances. Providing investment services in these instruments is regulated.`,
      check: {
        template: 'mcq',
        prompt: 'Why is a EUR 20,000 term deposit at a bank not a security?',
        choices: ['It is a private claim on one bank that cannot be traded freely on a market', 'It is not denominated in a foreign currency', 'It pays interest only at maturity', 'It is too small to be a security'],
        answer: 0,
        solution: 'A deposit is a contract with one bank. A security is standardised and transferable between investors.',
      },
    },
    {
      md: String.raw`## Issuers, investors and intermediaries

Three kinds of party appear around every security:

- The **issuer** creates the security to raise money. Issuers are companies, governments, banks and funds.
- The **investor** supplies the money and receives the claim. Investors include pension funds, insurers, funds and private clients.
- The **intermediary** connects the two or services the process. Brokers, dealers, banks, exchanges and depositaries are intermediaries (P1.5).

Direct finance through securities lets an issuer reach many investors and lets each investor hold a small, diversified part of many issues. Intermediaries reduce the cost of finding a counterparty and of checking and settling a trade.

> [!warning]
> "Investor" does not mean "private individual". In Europe most listed shares and bonds are held by institutions such as funds, insurers and pension schemes.`,
    },
    {
      md: String.raw`## Primary and secondary markets

The **primary market** is where a security is created and sold for the first time. The issuer receives the money. Examples are an initial public offering (IPO), a rights issue, a new bond placed through bookbuilding and a government bond auction.

The **secondary market** is where existing securities change hands between investors, for example on Xetra, the London Stock Exchange, Nasdaq or HKEX. The money passes from buyer to seller and the issuer receives nothing. The issuer still follows the price, because it affects the cost of raising money next time.

> [!example]
> A company raises **GBP 50,000,000** by issuing 5,000,000 new shares at GBP 10 (primary market).
> Later an investor sells 1,000 of those shares to another investor on an exchange at GBP 11.20, so GBP 11,200 changes hands (secondary market).
> The company's cash is unchanged by the second trade.

The two markets depend on each other. Investors are willing to buy new issues because they can sell later, and a liquid secondary market lowers the cost of raising capital.`,
    },
    {
      md: String.raw`## Identifiers

Systems identify a security by code and not by name. Two codes matter:

- The **ISIN** (International Securities Identification Number) has 12 characters: a two-letter country code, nine characters for the national number and one check digit. It identifies the **instrument**. GB0005405286 is the ordinary share of HSBC Holdings, whether it trades in London or in Hong Kong.
- The **LEI** (Legal Entity Identifier) has 20 characters and identifies the **legal entity**, such as an issuer or a counterparty. It is used in MiFID II and EMIR reporting.

An ISIN does not state where the security trades or in which currency. A trade record therefore pairs the ISIN with the **MIC** (market identifier code of the venue) and the currency. The same HSBC share is XLON in GBP on the London Stock Exchange and XHKG in HKD on HKEX.`,
    },
    {
      md: String.raw`## Worked example: issuer proceeds

> [!example]
> A company issues 8,000,000 new shares at EUR 25. Underwriting fees are 2.5% of the gross amount.
> Gross proceeds: $8{,}000{,}000 \times 25 =$ **EUR 200,000,000**
> Fees: $200{,}000{,}000 \times 0.025 =$ **EUR 5,000,000**
> Net proceeds to the issuer: **EUR 195,000,000**
>
> Investors pay EUR 200 million and the issuer keeps EUR 195 million. The underwriting banks earn EUR 5 million for finding buyers and guaranteeing the placement.

Common errors:

- Treating a secondary-market trade as a capital raise. Only primary issues bring money to the issuer.
- Confusing ISIN and LEI. The ISIN identifies the product and the LEI identifies the legal person.
- Treating the price on one venue as the only price. The same ISIN can trade on several venues at slightly different prices.`,
    },
    {
      md: String.raw`## Summary

- A security is a standardised, transferable, fungible claim: ownership, debt, a pool share or a derivative-type right. Deposits and bilateral loans are not securities.
- Issuers raise money, investors supply it and intermediaries carry out the process.
- In the primary market new securities are sold and the issuer is paid. In the secondary market existing securities change hands and the issuer is not paid.
- The ISIN identifies the instrument (12 characters) and the LEI the legal entity (20 characters).
- The MiFID II list of financial instruments is the legal boundary for regulated investment services.`,
    },
  ],

  exercises: [
    {
      id: 'security-or-not',
      template: 'bucket',
      generate(r) {
        const sec = [
          ['Ordinary share of a London-listed bank', 'a share is a transferable ownership claim'],
          ['Preference share', 'a share with priority on dividends, still transferable'],
          ['US Treasury note', 'a tradable debt security'],
          ['German Bund', 'a tradable debt security'],
          ['Corporate bond listed on Euronext Dublin', 'a tradable debt security'],
          ['Zero-coupon bond', 'a tradable debt security that pays no coupon'],
          ['Covered bond (Pfandbrief)', 'a tradable debt security backed by a cover pool'],
          ['Convertible bond', 'a tradable debt security with an equity option'],
          ['UCITS fund unit', 'a fund unit is on the MiFID II list of financial instruments'],
          ['ETF share traded on Xetra', 'an exchange-traded fund share is a transferable security'],
          ['Depositary receipt (ADR/GDR)', 'a tradable claim on foreign shares'],
          ['Listed warrant', 'a tradable right created by the issuer'],
          ['Listed structured certificate', 'a tradable note issued by a bank'],
          ['Rights issue entitlement', 'a tradable right to subscribe new shares'],
          ['Newly issued perpetual bond', 'a tradable debt security without a maturity date'],
        ];
        const non = [
          ['Current account balance', 'a private claim on one bank'],
          ['Three-year term deposit', 'a private claim on one bank, not freely transferable'],
          ['Bilateral bank loan to a company', 'a contract that cannot be passed on without consent'],
          ['Mortgage loan', 'a contract between bank and borrower'],
          ['Unpaid trade invoice', 'a commercial receivable, not a standardised security'],
          ['Life insurance policy', 'an insurance contract'],
          ['Employment contract', 'a contract for services'],
          ['Physical gold bar', 'a physical asset, no claim on an issuer'],
          ['Banknotes in a safe', 'cash is a medium of payment, not a security'],
          ['Credit card balance', 'a bilateral debt'],
          ['Savings account', 'a private claim on one bank'],
          ['Shareholder loan to a private company', 'a bilateral loan'],
          ['Purchase order for machinery', 'a commercial contract'],
          ['Apartment in Singapore', 'real estate is not a financial claim'],
          ['Bank guarantee issued to a landlord', 'a bilateral contract'],
        ];
        const k = r.int(4, 6);
        const picked = [...r.sample(sec, k).map((x) => ({ text: x[0], bucket: 0, why: x[1] })), ...r.sample(non, 10 - k).map((x) => ({ text: x[0], bucket: 1, why: x[1] }))];
        const items = r.shuffle(picked);
        return {
          prompt: 'Sort each item into **security** or **not a security**.',
          buckets: ['Security', 'Not a security'],
          items: items.map((x) => ({ text: x.text, bucket: x.bucket })),
          hints: ['A security is standardised and transferable between investors on a market.', 'Private claims on a single bank and bilateral contracts are not securities.'],
          solution: items.map((x) => `**${x.text}**: ${x.bucket === 0 ? 'security' : 'not a security'}, ${x.why}.`).join(' '),
        };
      },
    },
    {
      id: 'player-roles',
      template: 'match',
      generate(r) {
        const roles = [
          ['Issuer', ['Creates the security to raise money', 'Receives the proceeds of a primary issue']],
          ['Investor', ['Supplies money in exchange for a claim', 'Holds the security for income or growth']],
          ['Broker', ['Sends client orders to a venue', 'Acts as agent and earns a commission']],
          ['Exchange', ['Runs the venue where buy and sell orders meet', 'Matches orders under published rules']],
          ['CSD', ['Records legal ownership in book-entry form at the top of the chain', 'Settles trades by moving securities between accounts']],
          ['Custodian', ['Safekeeps securities and collects income for clients', 'Holds assets for investors and handles corporate actions']],
          ['Regulator', ['Supervises firms and markets and sets conduct rules', 'Authorises investment firms and enforces market rules']],
        ];
        const chosen = r.sample(roles, r.int(5, 6));
        return {
          prompt: 'Pair each player with the role it plays in the securities chain.',
          pairs: chosen.map((x) => [x[0], r.pick(x[1])]),
          hints: ['The CSD and the custodian are both about holding, but at different levels of the chain.', 'The broker acts for clients, the exchange provides the meeting place.'],
        };
      },
    },
    {
      id: 'primary-or-secondary',
      template: 'mcq',
      generate(r) {
        const sc = [
          ['A software company lists for the first time and sells 20 million new shares to investors.', 0, ['The company sells 20 million shares of its own. Ask whether those shares existed before this sale.', 'The company is the seller here. Ask whether it receives the cash from the investors.']],
          ['The UK Debt Management Office sells a new 10-year gilt at auction.', 0, ['The gilt is described as new. Ask whether it existed before the auction.', 'The seller is the UK Debt Management Office on behalf of the issuer. Ask who is paid by the bidders.']],
          ['A listed utility sells new shares to existing shareholders in a rights issue.', 0, ['The shares are new, and the utility sells them. Ask who is paid for them.', 'The buyers are existing shareholders, but the seller is the utility itself. Ask where the cash goes.']],
          ['A pension fund subscribes for a newly issued corporate bond through bookbuilding.', 0, ['The word "subscribes" and the phrase "newly issued" describe where this bond comes from. Ask whether it existed before.', 'Bookbuilding is how an issuer collects orders for its own new bond. Ask who receives the money from the pension fund.']],
          ['A fund manager buys 5,000 shares of a listed bank on Xetra from another investor.', 1, ['Check who the seller is: the text names another investor, not the bank.', 'Ask whether the bank issues anything or receives any cash in this trade.']],
          ['An insurer sells a Bund it has held for two years on the MTS platform.', 1, ['The Bund has been held for two years, so it existed before this sale. Ask what that implies for its creation.', 'The insurer is the seller, not the issuer. Ask who receives the cash.']],
          ['A private client sells 300 shares of a listed carmaker through her broker on HKEX.', 1, ['Check who is selling: a private client, not the carmaker.', 'The shares are already listed, and the sale goes through a broker on HKEX. Ask whether the carmaker is paid.']],
          ['An investor in Singapore buys DBS shares on SGX from another investor.', 1, ['The text names the seller as another investor. Ask whether DBS creates any shares in this trade.', 'The trade takes place on SGX between two investors. Ask who receives the cash.']],
          ['An investor buys an ETF on the exchange from a market maker.', 1, ['An ETF unit bought on the exchange is already listed. Check who sells it: a market maker, not the fund issuing new units.', 'Ask whether the ETF issuer is paid in this trade, and whether any new unit is created by it.']],
          ['A retail client opens a term deposit at her bank.', 2, ['Check what the client receives from the bank: ask whether it is a transferable instrument that can be sold on to other investors.', 'A term deposit is a private claim on one bank. Ask whether a market for it exists.']],
          ['A company borrows USD 5 m from its bank under a bilateral loan agreement.', 2, ['The agreement is bilateral, between the company and its bank. Ask whether anyone else can buy or sell it.', 'Ask whether the loan is a standardised, transferable instrument, which a market needs in order to trade it.']],
        ];
        const [text, ans, hintList] = r.pick(sc);
        const choices = ['Primary market: the issuer receives the money', 'Secondary market: the money goes from the seller to the buyer', 'Neither: no security is traded'];
        const why = ['New securities are created and the issuer is paid, so this is the primary market.', 'An existing security changes hands between investors and the issuer receives nothing, so this is the secondary market.', 'A deposit or bilateral loan is not a security, so no market is involved.'][ans];
        return {
          prompt: `Classify this transaction: *${text}*`,
          choices, answer: ans, fixedOrder: true,
          hints: hintList,
          solution: why,
        };
      },
    },
    {
      id: 'fungible-cloze',
      template: 'cloze',
      generate(r) {
        const co = r.pick(['Enel', 'Siemens', 'TotalEnergies', 'ASML', 'AstraZeneca', 'HSBC', 'Apple', 'DBS', 'Tencent']);
        const v = r.int(0, 1);
        const text = v === 0
          ? `All ordinary shares of ${co} are [[0]]: any one can replace another. The [[1]] is the 12-character code that identifies the share, while the [[2]] is the 20-character code that identifies ${co} as a legal entity, the [[3]] of the share.`
          : `The [[1]] is a 12-character code for a security, and the [[2]] is a 20-character code for a legal entity. Because the shares of ${co} are [[0]], an investor does not care which particular share she receives. ${co} is the [[3]].`;
        return {
          prompt: 'Complete the sentence using the word bank.',
          text,
          blanks: [{ accept: ['fungible'] }, { accept: ['ISIN'] }, { accept: ['LEI'] }, { accept: ['issuer'] }],
          bank: r.shuffle(['fungible', 'ISIN', 'LEI', 'issuer', 'investor', 'IBAN', 'custodian']),
          hints: ['One code is for the instrument, the other for the legal person.'],
        };
      },
    },
    {
      id: 'issue-proceeds',
      template: 'numeric',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const sh = r.int(1, 20);
        const price = M.px(r.int(5, 60));
        const fee = r.int(2, 8) * 0.5;
        const gross = sh * 1e6 * price;
        const feeAmt = f.round(gross * fee / 100, 0);
        const net = gross - feeAmt;
        const co = r.pick([`a ${M.city}-listed utility`, `a ${M.adj} software firm`, `an industrial group listed in ${M.city}`, `a ${M.adj} bank`]);
        return {
          prompt: `${co.charAt(0).toUpperCase() + co.slice(1)} issues **${sh} million** new shares at **${CCY} ${price}** per share in a primary offering. Underwriting fees are **${f.num(fee, 1)}%** of the gross amount. What are the net proceeds to the issuer? (${CCY}, no decimals)`,
          answer: net, dp: 0, tol: { abs: 1 }, unit: CCY,
          hints: ['Gross proceeds = shares x price.', `The fee is ${f.num(fee, 1)}% = ${f.num(fee / 100, 4)} of the gross amount.`],
          solution: `Gross proceeds are ${f.num(gross, 0)}. The fee is ${f.num(gross, 0)} x ${f.num(fee / 100, 4)} = ${f.num(feeAmt, 0)}. Net proceeds are **${f.money(net, CCY, 0)}**.`,
        };
      },
    },
  ],
});
