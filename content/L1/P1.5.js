/* P1.5 The market map: who does what */
SA.unit({
  id: 'P1.5',
  lesson: [
    {
      md: String.raw`## Who supplies capital and who needs it

Three groups of players stand at the centre of the financial markets. **Firms** are net demanders of capital, which they raise to pay for plant, equipment and other investment. **Households** are typically net suppliers, because they buy the securities that firms issue. **Governments** can be borrowers or lenders, but they usually borrow by issuing bonds to cover a budget deficit.

Issuers do not sell most of their securities directly to individuals. Financial institutions stand in between, and they are called **financial intermediaries**. Banks, investment companies, insurers and pension funds are examples. A small investor cannot easily find a suitable borrower, spread the risk across many borrowers or assess a borrower's credit. Intermediaries pool the money of many savers, diversify across many borrowers and build expertise through volume. Firms in turn hire **investment banks** to advise them and to sell new securities to investors.

This unit divides the market into four groups: the **buy side**, the **sell side**, **market infrastructure** and **regulators**.

> [!recall] P1.1
> Issuers raise money, investors supply it and intermediaries carry out the process. The four groups below break the intermediaries down further.`,
    },
    {
      md: String.raw`## Buy side and sell side

The **buy side** consists of those who invest money and buy services from the market. It includes asset managers, pension funds, insurers, sovereign wealth funds, hedge funds, and private-banking and retail clients. An investment company such as a mutual fund pools the money of many investors, who receive a prorated share and pay a management fee. A hedge fund also pools money, but it is open only to institutions and wealthy individuals, follows more complex and higher-risk strategies, and usually keeps part of its trading profit as a fee.

The **sell side** consists of those who sell services to the buy side, such as execution, financing, research and advice. The main sell-side firms are investment banks, brokers and dealers. An investment bank advises issuers, underwrites new issues, trades securities, and provides research and sometimes asset management. **Underwriting** means that the bank agrees to buy whatever securities investors do not take up.

Two intermediary roles are distinguished:

- A **broker** acts as an **agent**. It executes an order on the client's behalf and earns a commission. It does not take the other side of the trade and does not take market risk.
- A **dealer** (or **market maker**) acts as **principal**. It continuously quotes a price at which it will buy (bid) and a price at which it will sell (offer) and trades from its own book. Its profit is the spread between the two, and it needs capital to bear the risk.

Many banks do both, so the role depends on the capacity in which the firm acts in a given trade. A firm that does both is a broker-dealer.

> [!eu]
> Under [MiFID II](https://eur-lex.europa.eu/eli/dir/2014/65/oj) a firm that executes client orders or deals on its own account is an **investment firm**. A dealer that executes client orders against its own book in an organised and systematic way is a **systematic internaliser**.`,
      check: {
        template: 'mcq',
        prompt: 'A firm executes a client order as an agent for a commission and does not take the other side of the trade. Which role is it playing?',
        choices: ['A broker', 'A dealer (principal)', 'A CCP', 'A regulator'],
        answer: 0,
        solution: 'Agency execution for a fee is the broker role. A dealer trades as principal and earns the spread.',
      },
    },
    {
      md: String.raw`## Trading venues

A **trading venue** is where buyers and sellers are matched. A stock exchange traditionally regulates which companies may list, provides a mechanism to form prices, supervises trading, admits members, arranges settlement and publishes prices and trade data. Today some of these tasks are done by separate bodies, and trading has also moved to computerised systems that compete with exchanges.

Venues use one of two methods, or a mixture:

- In an **order-driven** system, buy and sell orders are collected in an order book and matched against each other by price.
- In a **quote-driven** system, market makers post firm bid and offer prices for stated quantities, and brokers deal with them for clients.

Large institutional trades can also be executed away from public order books, for example in **dark pools**, where prices are shown only after the deal. Their use is controversial because less price information reaches the public market.

> [!eu]
> Euronext (Milan, Paris, Amsterdam and other markets) and Xetra of Deutsche Boerse are regulated exchanges. Alternative European venues such as Cboe Europe and Turquoise compete with them. Trading venues in the EU are governed by MiFID II and MiFIR.

For scale: the combined value of shares listed worldwide is of the same order as world GDP, and the two US exchanges, NYSE and Nasdaq, list around half of it. Bond markets are larger than equity markets. In the US the largest single segment is Treasury debt, followed by mortgage-backed and corporate bonds. In the euro area, government bonds dominate.`,
    },
    {
      md: String.raw`## Clearing, settlement and custody

After a trade is matched, three further steps take place:

- **Clearing** covers everything between the commitment to trade and payment. Most exchange trades are cleared by a clearing house that acts as counterparty to both sides. This is a **central counterparty (CCP)**, and it reduces settlement risk, which is the risk that a trade will not be paid for.
- **Settlement** is the exchange of the securities for the money. Securities are delivered against payment (**delivery versus payment**), so neither side hands over its asset without receiving the other. Settlement is on a rolling basis, a fixed number of days after the trade date, and it records ownership by book entry. A **central securities depository (CSD)** keeps the master record.
- **Custody**. A **custodian** looks after securities for pension funds, mutual funds and similar clients. It also carries out settlement, handles stock lending where the client permits it, notifies the client of corporate actions such as rights issues and AGMs, collects and passes on dividends, and reclaims withholding tax.

| Role | EU example | US equivalent | UK equivalent |
|---|---|---|---|
| **Trading venue** | Euronext, Xetra | NYSE, Nasdaq | London Stock Exchange |
| **CCP** | Eurex Clearing, LCH SA | NSCC (part of DTCC) | LCH Ltd |
| **CSD** | Euronext Securities Milan, Clearstream Banking Frankfurt, Euroclear France | DTC (part of DTCC) | Euroclear UK & International |
| **ICSD** (international CSD for Eurobonds and cross-border trades) | Euroclear Bank, Clearstream Banking Luxembourg | none | none |
| **Custodian** | Banks with a custody business | Banks with a custody business | Banks with a custody business |

> [!eu]
> [T2S](https://www.ecb.europa.eu/paym/target/t2s/html/index.en.html) (TARGET2-Securities) is the Eurosystem's common settlement platform. It settles securities against cash in central-bank money for most EU CSDs, including Euronext Securities Milan, Clearstream Banking Frankfurt and Euroclear France. EU settlement is on T+2 and is due to move to T+1 on 11 October 2027.`,
    },
    {
      md: String.raw`## Regulators and supervisors

Rules are written and supervised at several levels. In Europe:

- **National authorities** supervise firms and markets in each country. Examples are CONSOB and Banca d'Italia (Italy), BaFin (Germany), the AMF (France) and the CNMV (Spain).
- **[ESMA](https://www.esma.europa.eu/)** (European Securities and Markets Authority) is the European supervisory authority for financial markets. It belongs to the European System of Financial Supervisors, with the banking authority (EBA) and the insurance and pensions authority (EIOPA). These authorities issue guidelines and conduct peer reviews and stress tests alongside national supervisors.
- **The ECB**, through the Single Supervisory Mechanism, supervises the largest euro-area banks directly and leaves the others to national supervisors.

> [!us]
> The **SEC** oversees securities markets. **FINRA** is the self-regulatory organisation for broker-dealers. The Federal Reserve and the OCC supervise banks.

> [!uk]
> The **FCA** supervises conduct and markets. The **PRA**, part of the Bank of England, supervises banks and insurers. The Bank of England also oversees market infrastructure.

> [!ch]
> Switzerland has one supervisor, **FINMA**. SIX operates the main exchange and the CSD (SIX SIS).`,
    },
    {
      md: String.raw`## Worked example: one trade across the participants

> [!example]
> A pension fund (investor) instructs its asset manager (buy side) to buy 40,000 shares. The asset manager sends the order to a broker (sell side), who routes it to Xetra (trading venue).
> Once matched, the trade is cleared by a CCP, which becomes counterparty to both sides.
> Two business days later the shares are delivered through the CSD (Clearstream Banking Frankfurt) against cash.
> The pension fund's custodian holds the shares and collects dividends.
> Throughout, the regulator (BaFin, with ESMA setting common rules) supervises the broker, the venue and the infrastructure.
>
> In the US the same chain runs through NYSE or Nasdaq, NSCC and DTC. In the UK it runs through the LSE, LCH and Euroclear UK & International.

> [!recall] P1.2
> The shares in this trade are the equity of P1.2. For bonds (P1.3) the chain is similar. ETFs trade through the exchange chain, while open-ended fund units (P1.4) are dealt with the fund's transfer agent.

A custodian holds assets for its clients, while a CSD holds the master record for the whole market. The CCP guarantees the trade, while the CSD delivers it.`,
    },
    {
      md: String.raw`## Summary

- The market has four groups: the buy side invests, the sell side serves, infrastructure trades, clears, settles and holds, and regulators set and enforce rules.
- A broker acts as agent for a commission. A dealer acts as principal and earns the bid-offer spread.
- The venue matches orders, the CCP is counterparty to both sides, the CSD records ownership and settles, and the custodian safekeeps for clients.
- EU supervision is national first, with ESMA and the other European authorities coordinating and the ECB supervising the largest banks.
- Each EU role has a US and a UK counterpart.`,
    },
  ],

  exercises: [
    {
      id: 'role-match',
      template: 'match',
      generate(r) {
        const bank = [
          ['A pension fund', 'Invests members\' contributions for retirement'],
          ['An asset manager', 'Runs portfolios and funds on behalf of investors'],
          ['A hedge fund', 'Pursues absolute returns using flexible strategies'],
          ['A life insurer', 'Invests premiums to cover long-term policy promises'],
          ['A sovereign wealth fund', 'Invests a state\'s financial reserves'],
          ['A retail investor', 'Buys securities with personal savings'],
          ['A private-banking client', 'Wealthy individual served by a bank\'s advisers'],
          ['An investment bank', 'Executes, underwrites and advises for clients'],
          ['A broker', 'Executes client orders as agent for a commission'],
          ['A market maker', 'Quotes buy and sell prices from its own book'],
          ['A research analyst', 'Writes opinions on companies for clients'],
          ['A prime broker', 'Provides financing and custody to hedge funds'],
          ['A stock exchange', 'Operates a venue that matches orders'],
          ['A multilateral trading facility', 'Alternative venue run under MiFID II rules'],
          ['A central counterparty', 'Stands between buyer and seller after the trade'],
          ['A national CSD', 'Keeps the master record of ownership and settles by book entry'],
          ['An international CSD', 'Settles cross-border Eurobonds across markets'],
          ['A global custodian', 'Safekeeps assets for institutions across many markets'],
          ['A transfer agent', 'Maintains the register of fund unit holders'],
          ['A depositary bank', 'Independently safekeeps fund assets and oversees the manager'],
          ['A national securities regulator', 'Supervises firms and markets in one country'],
          ['ESMA', 'Coordinates securities regulation across the EU'],
          ['The ECB', 'Supervises the largest euro-area banks and runs T2S'],
          ['A rating agency', 'Gives opinions on issuers\' credit quality'],
          ['A trade repository', 'Collects reports of derivatives and securities financing trades'],
          ['An index provider', 'Compiles benchmark indices that funds track'],
          ['A fund administrator', 'Calculates the fund\'s NAV and keeps its books'],
          ['An issuer', 'Raises money by creating securities'],
        ];
        return {
          prompt: 'Pair each institution with its role on the market map.',
          pairs: r.sample(bank, 8),
          hints: ['Start with the pairs you are sure about; the remaining ones narrow down quickly.'],
        };
      },
    },
    {
      id: 'map-region',
      template: 'bucket',
      generate(r) {
        const M = r.market();
        const buy = ['Pension fund', 'Asset manager', 'Insurance company', 'Hedge fund', 'Sovereign wealth fund', 'Retail investor'];
        const sell = ['Investment bank', 'Broker', 'Market maker', 'Prime broker', 'Securities research house', 'Corporate broker'];
        const infra = [`Stock exchange (e.g. ${M.venue})`, 'Central counterparty (CCP)', `Central securities depository (CSD, e.g. ${M.csd})`, 'Trade repository', 'Settlement platform such as T2S', 'International CSD'];
        const reg = ['National securities regulator (e.g. CONSOB)', 'ESMA', 'The SEC', 'FINMA', 'The FCA', 'BaFin', 'MAS (Singapore)', 'The SFC (Hong Kong)'];
        const items = r.shuffle([
          ...r.sample(buy, 3).map((t) => ({ text: t, bucket: 0 })),
          ...r.sample(sell, 3).map((t) => ({ text: t, bucket: 1 })),
          ...r.sample(infra, 3).map((t) => ({ text: t, bucket: 2 })),
          ...r.sample(reg, 3).map((t) => ({ text: t, bucket: 3 })),
        ]);
        return {
          prompt: 'Place each institution in the right region of the market map.',
          buckets: ['Buy side', 'Sell side', 'Infrastructure', 'Regulator'],
          items,
          hints: ['Who invests, and who serves the investors?', 'Infrastructure matches, clears, settles or records; it does not invest or advise.'],
          solution: 'Buy side: those who invest. Sell side: those who sell execution, financing and research. Infrastructure: venues, CCPs, CSDs, repositories, settlement platforms. Regulators: those who write and enforce rules.',
        };
      },
    },
    {
      id: 'retail-journey',
      template: 'order',
      generate(r) {
        const M = r.market();
        const drop = r.int(0, 3);
        const base = [
          'Retail client places the order',
          'Retail bank or online broker receives the order',
          'Executing broker routes the order to a venue',
          `Trading venue (${M.venue}) matches the order`,
          'CCP becomes counterparty to both sides',
          `CSD (${M.csd}) settles the trade and updates ownership records`,
          'Custodian holds the shares for the client\'s bank',
        ];
        const items = base.filter((_, k) => !(drop === 1 && k === 1) && !(drop === 2 && k === 4) && !(drop === 3 && (k === 1 || k === 4)));
        return {
          prompt: 'Put the actors in the order in which they take part in a retail share purchase, **from the client down to custody**.',
          items,
          hints: ['Orders flow from the client towards the venue; settlement and custody come after the match.', 'The CCP steps in right after the trade is matched.'],
          solution: 'Client, then the bank or online broker, then the executing broker, then the venue, then the CCP, then the CSD and finally the custodian.',
        };
      },
    },
    {
      id: 'who-does-it',
      template: 'mcq',
      generate(r) {
        const tasks = [
          ['Holds a pension fund\'s shares for safekeeping and collects the dividends', 'Custodian', ['The task has two parts: safekeeping the shares and collecting the income on them. Ask who looks after assets for the pension fund.', 'The pension fund owns the shares, so the party in the task acts for it and does not trade or decide. Ask which participant provides safekeeping.']],
          ['Matches buy and sell orders under published rules', 'Trading venue', ['The task is about bringing buy and sell orders together. Ask who provides the place where they meet.', 'The words "published rules" describe how the meeting place works. Ask which participant does not itself buy or sell for clients.']],
          ['Supervises market participants and sets conduct rules', 'Regulator', ['The task is about supervising and setting rules, not about trading or holding assets. Ask which region of the map does that.', 'The party supervises others rather than serving investors. Ask which participant writes and enforces conduct rules.']],
          ['Becomes the counterparty to both sides so that a default does not break the chain', 'CCP', ['The task describes standing between buyer and seller. Ask at which stage of the trade that happens.', 'The words "a default does not break the chain" describe a risk. Ask who takes the counterparty risk after the match.']],
          ['Keeps the master record of legal ownership of the securities and settles by book entry', 'CSD', ['The task has two parts: the master record of ownership and settlement by book entry. Ask who keeps records at the top of the chain.', 'Book entry means ownership moves by changing accounts. Ask which infrastructure participant does the final recording and settling.']],
          ['Sends a client\'s order to a venue and earns a commission as agent', 'Broker', ['The task is about passing a client\'s order to a venue. Ask who stands between the client and the venue.', 'The words "as agent" and "commission" show the party acts for the client and does not trade on its own account. Ask which participant does that.']],
          ['Creates new shares to raise capital', 'Issuer', ['The task creates new shares. Ask who needs the capital and who receives the money.', 'The party in the task raises money for itself and does not invest it for others. Ask which participant creates securities.']],
          ['Runs a portfolio on behalf of a pension fund', 'Asset manager', ['The party in the task decides what to buy and sell, but on behalf of another owner. Ask on which side of the market that sits.', 'The task is about running a portfolio for a client. Ask which participant manages money for institutions.']],
          ['Quotes a bid and an offer price and trades from its own book, earning the spread', 'Market maker', ['The task has a bid, an offer and a spread. Ask who quotes both prices at once.', 'The words "from its own book" show the party trades on its own account and is not acting as agent. Ask which participant does that.']],
          ['Agrees to buy any new shares that investors leave unsold in an issue', 'Investment bank', ['The shares in the task are new, so the task belongs to a primary issue. Ask who helps the issuer sell them.', 'The words "leave unsold" describe a promise to take up the shares. Ask which participant gives that promise to the issuer.']],
        ];
        const roles = ['Custodian', 'Trading venue', 'Regulator', 'CCP', 'CSD', 'Broker', 'Issuer', 'Asset manager', 'Market maker', 'Investment bank'];
        const [task, ans, hintList] = r.pick(tasks);
        const wrong = r.sample(roles.filter((x) => x !== ans), 3);
        const choices = r.shuffle([ans, ...wrong]);
        return {
          prompt: `Who performs this task? *${task}*`,
          choices, answer: choices.indexOf(ans), fixedOrder: true,
          hints: hintList,
          solution: `That is the job of the **${ans.toLowerCase()}**.`,
        };
      },
    },
    {
      id: 'wrong-role',
      template: 'spot',
      generate(r) {
        const investor = r.pick(['a pension fund', 'an insurer', 'a foundation']);
        const M = r.market();
        const mk = { venue: M.venue, csd: M.csd };
        const kind = r.int(0, 3);
        const variant = r.int(0, 1);
        const good = [
          `${investor.charAt(0).toUpperCase() + investor.slice(1)} (the investor) hires an asset manager, which sits on the buy side.`,
          'The asset manager sends its buy order to a broker on the sell side, which acts as agent for a commission.',
          `The broker routes the order to ${mk.venue}, the trading venue that matches buyers and sellers.`,
          'After the match, a CCP becomes buyer to the seller and seller to the buyer.',
          `Settlement takes place at ${mk.csd}, the CSD, which moves the shares against the payment.`,
          'The custodian safekeeps the shares for the investor and collects the dividends, while the regulator supervises the firms and the venue.',
        ];
        const bad = [
          ['The asset manager sends its buy order to a regulator, which executes it as agent for a commission.', 'The regulator supervises and writes rules; it never executes client orders. Execution is the job of a broker on the sell side.'],
          [`The broker routes the order to a custodian, the trading venue that matches buyers and sellers.`, 'A custodian safekeeps assets. Matching buyers and sellers is done by a trading venue such as an exchange.'],
          ['After the match, a CCP records the legal ownership of the shares in book-entry form.', 'The CCP guarantees performance as counterparty to both sides. Recording ownership is the CSD\'s job.'],
          [`Settlement takes place at the stock exchange, which moves the shares against the payment.`, 'The exchange matches orders. Settlement and ownership records belong to the CSD (here ' + mk.csd + ').'],
          ['After the match, the CSD becomes buyer to the seller and seller to the buyer, guaranteeing the trade.', 'That is the CCP\'s role. The CSD settles and keeps the ownership record, but does not take counterparty risk in this way.'],
          ['The exchange safekeeps the shares for the investor and collects the dividends, while the regulator supervises the firms and the venue.', 'Safekeeping and income collection are custody tasks, not the exchange\'s.'],
          ['The asset manager sends its buy order to a custodian on the sell side, which acts as agent for a commission.', 'A custodian holds assets; the sell-side agent that executes orders is a broker.'],
          ['The custodian safekeeps the shares for the investor and collects the dividends, while the CCP supervises the firms and the venue.', 'Supervision is the regulator\'s role. A CCP manages counterparty risk after the trade.'],
        ];
        // kind selects which sentence is replaced (position, index into bad)
        const map = [[1, 0 + 6 * variant], variant === 0 ? [2, 1] : [3, 4], variant === 0 ? [3, 2] : [4, 3], [5, variant === 0 ? 5 : 7]];
        const [pos, bi] = map[kind];
        const pair = bad[bi];
        const doc = good.map((t, k) => (k === pos ? { text: pair[0], error: true, why: pair[1] } : { text: t, error: false }));
        return {
          title: 'How a share purchase works',
          prompt: 'Read the description of a share purchase. **Flag the sentence with the wrong role.**',
          doc,
          hints: ['Check each sentence against the four regions: buy side, sell side, infrastructure, regulator.'],
        };
      },
    },
  ],
});
