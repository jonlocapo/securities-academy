/* T1.3 Custody: who holds the securities? */
SA.unit({
  id: 'T1.3',
  lesson: [
    {
      md: String.raw`## Custody

**Custody** is the safekeeping of securities and other assets. At its simplest it means keeping an owner's certificates in a safe. A bank custodian offers more than that. It also provides **asset servicing** (collecting income, processing corporate actions such as splits, rights issues and takeovers), **asset optimisation** (for example securities lending) and banking services such as foreign exchange and cash management. It charges a fee, often based on the value of assets held and the number of transactions.

Clearing and settlement happen centrally, and so does safekeeping. The securities of a domestic market are held at the local **CSD**, and between the investor and the CSD sit one or more intermediaries. A purchase of 200 shares therefore results in an **electronic entry**, and the record of that entry is kept by an intermediary for the investor.

> [!recall] T1.2
> At settlement (T1.2), the CSD credits the buyer's securities account and debits the seller's. Custody covers what happens to the holding afterwards.

> [!eu]
> European CSDs such as Euronext Securities Milan, Clearstream Banking Frankfurt and Euroclear France keep the national securities records.`,
      check: {
        template: 'mcq',
        prompt: 'How does a private client typically "hold" shares of a listed company today?',
        choices: ['As a book entry in a securities account at a bank or broker', 'As a paper certificate in a drawer', 'As a deposit at the central bank', 'As a claim on the stock exchange'],
        answer: 0,
        solution: 'Securities are dematerialised: ownership is an electronic entry in an account held through intermediaries.',
      },
    },
    {
      md: String.raw`## Forms of securities and transfer of ownership

An issuer either needs to know who owns its securities or does not.

- **Registered** securities are recorded against the owner's name on a register kept by the issuer's agent (the **registrar** or transfer agent). Ownership is evidenced by the name on the register. In the certificated form the name also appears on the certificate.
- **Bearer** securities carry no owner's name. The holder of the certificate is the owner, or a depository holds the whole issue and its participants hold interests in it.

Securities can also be **certificated** (paper) or **non-certificated**. In mature markets paper has been replaced by **dematerialised** holding (no certificate exists) or **immobilised** holding (certificates sit with a depository). Transfers then take place by **book entry**.

For a bearer security, ownership passes when the seller delivers the certificate or, without paper, when the CSD debits the seller's account and credits the buyer's. For a registered security there is one more step. The issuer's register must show the new owner, so the registrar is told of the change. Paper trades use a stock transfer form for this, and electronic markets pass the information on automatically after settlement.

> [!example]
> A seller holds 2,400 shares and sells 500 to a buyer who holds 1,000. The register shows the seller at 1,900 and the buyer at 1,500. The total of 3,400 shares is unchanged.

An investor whose name is on the register has a direct relationship with the issuer, who can send notices and dividends straight to the investor. This is awkward if the investor also uses a custodian. Sale instructions may need the investor's signature, the custodian does not see the issuer's notices, and the issuer does not recognise the custodian when a payment goes missing.`,
    },
    {
      md: String.raw`## Legal and beneficial ownership

The awkwardness above can be removed by registering the securities in the custodian's name. The custodian then settles and administers the holding with one instruction, and the issuer deals with the custodian. The cost to the investor is the risk that the custodian is now the legal owner. If the custodian fails, it may be hard to show that the customers were the true owners.

The solution is to separate **legal ownership** from **beneficial ownership**. The beneficial owner is the investor, who is entitled to the securities and their income. A **nominee company** holds legal title. It is a company in its own right, legally separate from the custodian, with staff supplied by the custodian. It does not lend, invest or take risk, so it cannot default in its own right. If the custodian fails, the nominee company continues. The investor receives dividends in the usual way, paid by the custodian and not by the issuer, and loses only the direct relationship with the issuer.

> [!us]
> In the US, most shares are held in "street name". The registered owner is a nominee (Cede & Co., the nominee of DTC), while the beneficial owners are recorded in brokers' books.

> [!ch]
> In Switzerland, the legal construct of "intermediated securities" (Bucheffekten) recognises the investor's rights although the securities are held through a chain.`,
    },
    {
      md: String.raw`## Omnibus and segregated accounts

A nominee name can be used in two ways.

- **Omnibus (pooled) account**: all the customers' securities are registered in one nominee name. The register shows one holding, and the custodian's own records show who owns what.
- **Segregated (designated) account**: each customer's securities are registered in the nominee name with a designation, so the register shows a separate account for each customer.

> [!example]
> Five customers hold 8,000, 12,000, 15,000, 30,000 and 35,000 shares, 100,000 in all. The issuer pays EUR 0.40 per share.
> - Omnibus: the issuer pays EUR 40,000 to the nominee, and the custodian splits it as EUR 3,200, 4,800, 6,000, 12,000 and 14,000.
> - Segregated: the issuer pays the same five amounts to the five designated accounts.
>
> The customer with 15,000 shares instructs a sale of 20,000. In an omnibus account the register holds enough shares, but only 15,000 belong to this customer. The custodian can deliver 15,000 or wait for a purchase to settle. Delivering 20,000 would use other customers' shares, unless they have agreed in writing to lend them.

| | Omnibus | Segregated |
|---|---|---|
| Administration | Simpler, with one holding to reconcile against the register | Heavier, with many accounts to maintain |
| Identifying owners | Harder, and dividends and votes take longer to allocate | Easier from the register, and claims are easier to prove if the custodian fails |
| Risk of misuse | A weak custodian might use one client's shares for another's trade | Smaller, but a holding can be designated to the wrong client |
| Cost | Lower | Higher |

In both cases client assets are not the custodian's own assets. If the custodian fails, the client's securities should not be available to its creditors, provided the records are accurate and the assets were kept apart from the custodian's own.

> [!eu]
> CSDR Article 38 requires a CSD to keep records that allow a participant to hold the securities of different clients in one account (**omnibus client segregation**) or to separate the securities of a single client (**individual client segregation**). A participant must offer its clients at least this choice and tell them the costs and risks of each option. CSDs and participants must also publish the levels of protection and the costs, including the main legal implications and the insolvency law that applies. A CSD may not use securities that do not belong to it unless the participant has given express consent. [MiFID II](https://eur-lex.europa.eu/eli/dir/2014/65/oj) safeguarding rules require the intermediary to keep clear records, separate from its own assets.

> [!uk]
> The FCA's **CASS** rules govern how UK firms safeguard client assets. They set a minimum frequency for reconciling the firm's records with those of the custodian, and firms usually reconcile more often.`,
    },
    {
      md: String.raw`## The custody chain

An investor who holds securities of its home market has three options. It can appoint a **custodian** whatever the number of brokers used. It can leave the securities in its broker's participant account at the CSD. In some markets it can open a **direct account** at the CSD. A custodian costs more but adds services, while the broker option leaves the investor with reports from several sources if it uses several brokers.

An investor that holds securities in many markets would otherwise need local relationships, legal agreements and deadlines everywhere. It can use a **regional custodian** for neighbouring markets or, more often, a **global custodian**. This is a single custodian that provides multi-currency custody, settlement and reporting across markets. Where it has no branch of its own it appoints a local bank, the **sub-custodian**, as its agent. The sub-custodian is the entry point to the local market and is a participant of the local CSD.

The chain for a cross-border holding therefore reads as follows:

1. **Client**: sees a securities account on the statement.
2. **Bank or broker**: keeps the client's account in its own books and holds the shares for the client at a custodian.
3. **Global custodian**: holds the bank's positions and manages its network of agents.
4. **Sub-custodian** in the market of the security: a participant of the local CSD.
5. **CSD**: holds the master record of the issue.

At each level, the party above is a client and the party below is the holder of record. A domestic purchase may involve three layers and a cross-border one five. An **ICSD** such as Euroclear Bank or Clearstream Banking sits in the chain for international securities. It is regarded as market infrastructure and not as an agent of the client, and its instruction deadlines are fixed, whereas a global custodian may allow more flexible deadlines because it must also meet those of its sub-custodians and the CSD.`,
    },
    {
      md: String.raw`## Custodian services and reconciliation

Custodians group their services into two sets.

- **Core services** are standard across the industry: safekeeping, settlement, income collection, corporate actions, proxy voting, cash management, foreign exchange, tax reclaims, record keeping and reporting.
- **Value-added services** vary between providers and include securities lending, investment accounting, valuation, performance measurement, derivatives clearing, fund administration and compliance monitoring. More of them are becoming part of the standard offer.

A custodian also relays settlement instructions and settlement status to the client, either on paper or as electronic reports that the client can sort by date or by security.

**Reconciliation** is the control that checks that the assets the client believes it owns agree with the assets the custodian holds for it. Both sides compare listings that show the account, security identifier, quantity (ledger, settled and pending), depository, and value. A difference may come from a clerical error, a trade still waiting to settle or, in the worst case, misuse of assets. Each break is queried until it is explained, and an exception report shows only the securities that need action.`,
    },
    {
      md: String.raw`## Worked example: a dividend through the chain

> [!example]
> A company pays **EUR 0.80** per share. A client holds 1,500 shares through his bank, which holds all its clients' shares in an omnibus account at a custodian, which is a participant of the CSD.
> - The CSD credits the custodian for the positions of the bank's clients, say 400,000 shares, so EUR 320,000.
> - The custodian credits the bank EUR 320,000.
> - The bank credits the client $1{,}500 \times 0.80 =$ **EUR 1,200** (before any withholding tax).
>
> The client's statement shows the dividend on the payment date. If the figure does not match what the custodian reports, a **reconciliation break** is opened.

The cash flows back down the same chain that the securities came through: CSD, custodian, bank, client.

> [!recall] P1.5
> The custodian, CSD and ICSD are the infrastructure and intermediary roles from P1.5. In the custody chain they are stacked one above the other.

Common pitfalls are assuming that the client's name appears at the CSD (it usually does not), confusing the custodian (safekeeping) with the broker (execution), and overlooking that cross-border chains have more points of failure.`,
    },
    {
      md: String.raw`## Summary

- Securities are held in book-entry form, so ownership is an entry in an account and not a certificate. Registered securities also need the issuer's register updated.
- Legal title can sit with a nominee company while the investor keeps beneficial ownership. Omnibus accounts pool clients, and segregated accounts identify each client.
- Between the client and the CSD there is a chain of intermediaries: bank or broker, global custodian, sub-custodian and CSD.
- Custodians provide safekeeping and asset servicing as core services, and add value-added services.
- Income flows back down the chain, and reconciliation compares the client record with the custodian record.`,
    },
  ],

  exercises: [
    {
      id: 'custody-chain',
      template: 'order',
      generate(r) {
        const M = r.market();
        const variants = [
          ['Client (sees the account statement)', 'Bank or broker (keeps the client account)', `National CSD, ${M.csd} (master record)`],
          ['Client (sees the account statement)', 'Bank or broker (keeps the client account)', 'Custodian (holds the bank\'s positions)', `National CSD, ${M.csd} (master record)`],
          ['Client (sees the account statement)', 'Bank or broker (keeps the client account)', 'Global custodian', 'Local sub-custodian in the foreign market', `Local CSD, ${M.csd} (master record)`],
          ['Client (sees the account statement)', 'Bank or broker (keeps the client account)', 'Global custodian', 'International CSD (e.g. Euroclear Bank)'],
        ];
        const items = r.pick(variants);
        return {
          prompt: `Order the layers of this custody chain **from the client down to the master record** (${items.length} layers).`,
          items,
          hints: [
            `Each layer holds an account at the layer below it. "${items[0]}" is at the top, and the chain ends with "${items[items.length - 1]}".`,
            items.length === 3
              ? 'Only one layer sits between the client and the CSD: it is the one that keeps the client account.'
              : `"${items[1]}" keeps the client account, so it sits directly under the client. Place the remaining ${items.length - 3} layer${items.length - 3 > 1 ? 's' : ''} between it and the end of the chain by asking who holds an account at whom.`,
          ],
          solution: 'Each party keeps an account for the party above it and holds its own account at the party below, ending at the CSD with the master record.',
        };
      },
    },
    {
      id: 'task-type',
      template: 'bucket',
      generate(r) {
        const cust = ['Keeping the shares safe in a securities account', 'Collecting the dividend and passing it on', 'Processing a rights issue election for the client', 'Reclaiming withholding tax on a foreign dividend', 'Producing the monthly holdings statement', 'Reconciling the bank\'s records with the custodian\'s', 'Providing proxy-voting services for the AGM', 'Applying a stock split to the positions'];
        const trade = ['Sending an order to the venue', 'Quoting a bid and offer as a market maker', 'Slicing a large order with an algorithm', 'Checking best execution before routing', 'Matching a buy and a sell order at the exchange', 'Choosing the venue for the order', 'Sending an execution report to the client', 'Entering a limit price on an order'];
        const clear = ['Netting the buys and sells of a member', 'Acting as buyer to every seller (novation)', 'Calling margin from clearing members', 'Managing the default fund', 'Calculating the net settlement obligations', 'Registering the matched trade for clearing', 'Guaranteeing the trade if one member defaults', 'Monitoring members\' risk limits'];
        const items = r.shuffle([...r.sample(cust, 4).map((t) => ({ text: t, bucket: 0 })), ...r.sample(trade, 4).map((t) => ({ text: t, bucket: 1 })), ...r.sample(clear, 4).map((t) => ({ text: t, bucket: 2 }))]);
        return {
          prompt: 'Sort each task into **custody**, **trading** or **clearing**.',
          buckets: ['Custody', 'Trading', 'Clearing'],
          items,
          hints: ['Custody looks after what you already own. Trading creates the deal, and clearing manages the risk between execution and settlement.'],
          solution: 'Custody: safekeeping, income, corporate actions, reporting. Trading: orders, quotes, execution. Clearing: netting, novation, margin and default management.',
        };
      },
    },
    {
      id: 'who-is-responsible',
      template: 'mcq',
      generate(r) {
        const M = r.market();
        const co = `${r.pick(['a utility', 'a bank', 'a carmaker'])} listed on ${M.venue}`;
        const sc = [
          [`The shares of ${co} bought by a client fall 18% in a week.`, 0, 'Market risk is borne by the investor; custody does not protect against price falls.', ['The text describes a fall of 18% in a price. Ask whether any record, account or system is wrong.', 'Nothing in the text has been lost, mis-recorded or interrupted. Ask who owns the shares when their price moves.']],
          ['A client sells shares and later finds the market moved against her, as she wanted a higher price.', 0, 'Price movements are the investor\'s risk, not a custody risk.', ['The text is about the price at which the shares were sold. Ask whether any record or system failed.', 'The complaint is that the market moved against the client. Ask who decides when to sell and who carries the result of a price move.']],
          ['A bank wrongly debits 300 shares from a client\'s account because of an error in its own books.', 1, 'The bank keeps the client account and is responsible for the accuracy of its records.', ['The text describes a wrong entry for 300 shares in a client\'s account. Ask who keeps that account.', 'The error is in "its own books", and the bank is named. Ask who is responsible for the accuracy of an account it keeps.']],
          ['A broker records a client\'s securities in the wrong account because of a keying mistake.', 1, 'The intermediary that keeps the client account is responsible for correct recording.', ['The text describes a keying mistake in a record. Ask which party made the entry.', 'The mistake put the client\'s securities in the wrong account. Ask who is responsible for the client-level records.']],
          ['Securities held for a UCITS fund are lost through a failure at a sub-custodian.', 2, 'Under UCITS rules the fund\'s depositary is liable to the fund for the loss of financial instruments held in custody, even when it delegated custody.', ['The text names a UCITS fund and the loss of its securities. Ask which party the UCITS rules make answerable to the fund.', 'The failure occurred at a sub-custodian, which is a delegate. Ask whether delegation moves the responsibility for the fund\'s assets.']],
          ['A fund\'s assets held at a delegate custodian cannot be returned after the delegate\'s operational failure.', 2, 'The depositary remains liable towards the fund for assets held in custody.', ['The text is about a fund\'s assets that cannot be returned. Ask which party oversees the safekeeping of a fund\'s assets.', 'The assets were held at a delegate. Ask whether the party that appointed the delegate stays answerable to the fund.']],
          ['The CSD\'s own settlement system is down for a day and trades settle late.', 3, 'The CSD operates the settlement system and is responsible for its operational resilience.', ['The text names the failing system: it is the CSD\'s own. Ask who operates and maintains it.', 'The effect is late settlement across trades, not an error in one client account. Ask who is answerable for the system as a whole.']],
          ['A CSD records a transfer incorrectly in its own books because of a software bug.', 3, 'Errors in the CSD\'s own records are the CSD operator\'s responsibility.', ['The text says the error is in the CSD\'s own books. Ask who keeps those books.', 'The cause is a software bug in the CSD\'s record. Ask who is responsible for the master record.']],
        ];
        const [text, ans, why, hintList] = r.pick(sc);
        const choices = ['The investor (market risk)', 'The bank or broker that keeps the client\'s securities account', 'The fund\'s depositary', 'The CSD operator'];
        return {
          prompt: `Who bears the responsibility in this case? *${text}*`,
          choices, answer: ans, fixedOrder: true,
          hints: hintList,
          solution: why,
        };
      },
    },
    {
      id: 'custody-terms',
      template: 'match',
      generate(r) {
        const t = [
          ['Safekeeping', ['Holding securities for a client and keeping the records', 'The core custody service of holding assets safely']],
          ['Sub-custodian', ['A local custodian that holds assets for a global custodian in its market', 'The local agent in the chain, a participant of the local CSD']],
          ['Omnibus account', ['An account holding the securities of several clients together', 'One pooled account for many clients at the next level']],
          ['Segregated account', ['An account kept only for one client\'s assets', 'A separately identified account for a single client']],
          ['Book-entry', ['Ownership recorded electronically, without paper certificates', 'The dematerialised form in which most securities exist']],
          ['Nominee company', ['A separate company whose name is on the register as legal owner for the clients of the custodian', 'Holds legal title while the investor keeps beneficial ownership']],
          ['Beneficial owner', ['The investor who is entitled to the securities and their income', 'The party that owns the economic interest, even if another name is on the register']],
          ['Asset servicing', ['Collecting income and processing corporate actions for holders', 'Dividends, interest and corporate actions handled on behalf of the client']],
        ];
        return {
          prompt: 'Match each custody term with its meaning.',
          pairs: r.shuffle(t).slice(0, 5).map((x) => [x[0], r.pick(x[1])]),
          hints: ['Omnibus pools clients together, and segregated keeps one client apart.', 'Legal title and beneficial ownership can sit with different parties.'],
        };
      },
    },
    {
      id: 'holdings-recon',
      template: 'spot',
      generate(r, f) {
        const M = r.market();
        // a euro-area portfolio can span several EU markets; elsewhere the holdings stay in one market
        const pool = [];
        Object.keys(SA.MARKETS).filter((k) => (M.region === 'EU' ? SA.MARKETS[k].region === 'EU' : k === M.key)).forEach((k) => SA.MARKETS[k].companies.forEach((c) => pool.push([c.n, c.isin])));
        const hold = r.sample(pool, Math.min(pool.length, r.int(3, 5)));
        const qty = hold.map(() => r.int(2, 50) * 50);
        const bad = r.int(0, hold.length - 1);
        const q = qty[bad];
        const kind = r.int(0, 2);
        let wrong;
        let why;
        if (kind === 0) { wrong = q + 100; why = `The client statement shows ${f.num(q + 100, 0)} but the custodian record shows ${f.num(q, 0)}: a difference of 100 shares that is not a trade in transit. Investigate; the client record is overstated.`; }
        else if (kind === 1) { wrong = Math.round(q / 2); why = `The client statement shows ${f.num(Math.round(q / 2), 0)} but the custodian holds ${f.num(q, 0)}. Half the position is missing from the client record: maybe a booking not processed.`; }
        else { wrong = q * 10; why = `The client statement shows ${f.num(q * 10, 0)} against ${f.num(q, 0)} at the custodian: ten times too many, a keying error.`; }
        const doc = [{ text: `Reconciliation as of ${f.date(f.addBusinessDays('2026-05-04', r.int(0, 100)))}, account CL-${r.int(1000, 9999)}`, error: false }];
        hold.forEach((h, k) => {
          const stm = k === bad ? wrong : qty[k];
          doc.push({ text: `${h[0]} (${h[1]}): client statement ${f.num(stm, 0)} | custodian record ${f.num(qty[k], 0)}`, error: k === bad, why: k === bad ? why : undefined });
        });
        if (r.bool()) {
          const k0 = (bad + 1) % hold.length;
          const pend = 100;
          doc.splice(1 + k0, 1, { text: `${hold[k0][0]} (${hold[k0][1]}): client statement ${f.num(qty[k0] + pend, 0)} (trade date) | custodian record ${f.num(qty[k0], 0)} (settled) + ${pend} buy pending settlement tomorrow`, error: false });
        }
        return {
          title: 'Holdings reconciliation',
          prompt: 'Compare the client statement with the custodian record line by line. **Flag the line that does not reconcile.** (A position that differs only because a trade is pending settlement is explained, not an error.)',
          doc,
          hints: ['Look for a quantity that differs without an explanation.', 'Trade-date and settled positions can legitimately differ for a day or two.'],
        };
      },
    },
  ],
});
