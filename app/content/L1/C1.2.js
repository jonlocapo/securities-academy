/* C1.2 Account types: what can be opened? */
SA.unit({
  id: 'C1.2',
  lesson: [
    {
      md: String.raw`## Account structures at a bank

A bank client rarely has a single account. A client has a set of accounts, each with its own purpose, holders, rules and tax treatment. Some hold money, some hold securities, some allow borrowing, and some change only the tax treatment. When a retail client asks a private bank to "open an account" to buy shares, the bank needs to establish which of these accounts is meant.

This unit lists the main account types and the questions that decide which one applies.`,
    },
    {
      md: String.raw`## Cash and securities accounts

Almost every investment relationship rests on two accounts:

| Account | What it holds | Measured in | Example entry |
|---|---|---|---|
| **Cash (current) account** | Money | Currency units | Deposit EUR 5,000; fee EUR 15 |
| **Securities (custody) account** | Financial instruments | Quantity per ISIN | 200 shares of X |

They work as a pair. A purchase of shares debits the cash account (money leaves) and credits the securities account (shares arrive). A dividend arrives in the cash account while the shares stay unchanged. A transfer of shares from another bank affects only the securities account.

> [!recall] C1.1
> A retail client would normally get this pair: a cash account and a securities account linked to it. The bank needs the client's category and personal details to set it up, not the client's wealth.

> [!tip]
> For every transaction, ask whether money moves, securities move, or both. This is the basis of the two-ledger accounting in A1.3.`,
      check: {
        template: 'mcq',
        prompt: 'A client receives a EUR 120 dividend on shares already held. Which account changes?',
        choices: ['Only the cash account', 'Only the securities account', 'Both accounts', 'Neither account'],
        answer: 0,
        solution: 'The shares remain unchanged. The dividend is a cash movement.',
      },
    },
    {
      md: String.raw`## Cash accounts and margin accounts

In a **cash account** the client pays in full for every purchase. Under Regulation T the broker must obtain full cash payment within a short set period after the purchase, and it cancels or liquidates a trade that is not paid in time.

In a **margin account** the broker may lend part of the purchase price, using the securities as collateral. This is the US term. Under the Federal Reserve's Regulation T the required margin for margin equity securities is 50% of their market value, so EUR 10,000 of shares can be bought with EUR 5,000 of the client's own money and a EUR 5,000 loan from the broker.

Private banks in Europe and Switzerland usually offer the same arrangement under another name, a **Lombard loan**: a credit line secured by the client's portfolio. The bank applies a **lending value** (a haircut) to each asset, so the client can borrow only part of the portfolio's value.

> [!warning]
> Borrowing magnifies gains and losses, and a fall in value can trigger a **margin call**. This is covered in Module 6 (K2). A loan needs its own signed agreement, separate from the account-opening form.

> [!us]
> US retail brokers distinguish cash and margin accounts. Many tax-advantaged retirement accounts, such as IRAs, generally cannot be margined.`,
    },
    {
      md: String.raw`## Account holders

The **holder** determines who can sign, who is liable and what documents the bank needs.

| Holder | Who signs | Typical documents |
|---|---|---|
| **Individual** | The holder | ID, proof of address, tax residency |
| **Joint** (two or more people) | Depends on the mandate: each holder alone ("either to sign") or all together | ID and tax data for every holder, plus the signing rule |
| **Corporate** | Authorised signatories named by the company | Company register extract, statutes, board resolution, list of directors, ultimate beneficial owners |

On a joint account every holder is identified and signs the opening form; a missing signature leaves the file incomplete. A company account is operated by individuals, so the bank must record who may give orders for it.

> [!eu]
> In the EU, banks must also identify the **ultimate beneficial owners** (the natural persons behind a company) under anti-money-laundering rules. This is covered in C1.4.`,
    },
    {
      md: String.raw`## Accounts and service agreements in private banking

In a private-banking relationship the accounts are the same, but the agreement signed on top of them sets the service level (C1.3).

| Client wants | Accounts and agreement |
|---|---|
| To decide alone | Current accounts and a securities account under a custody agreement. The bank makes no recommendations and carries no advisory responsibility |
| Advice | The same accounts plus an advisory agreement, which sets the limits of the bank's responsibility for its recommendations |
| To delegate | The same accounts plus a discretionary mandate, under which the bank selects the investments and takes the final decision |
| Credit against the portfolio | A Lombard loan agreement, with the securities pledged as collateral |

Wealthy clients often hold assets through a company, a family trust or a private foundation, each as a separate holder with its own accounts. A bank that serves philanthropy clients also sets up accounts for charitable foundations and trusts. For trusts and foundations the bank needs to identify the people behind the structure, as explained in C1.4.

Each account is also **booked** in a particular bank entity and country, called the booking centre. Large wealth managers run several. The choice affects which law, tax treatment and reporting rules apply to the account.

> [!recall] C1.1
> The segment decides how many of these accounts the client typically needs. An affluent client often has a current account and a securities account, while a UHNW family may have many accounts across structures and currencies.`,
    },
    {
      md: String.raw`## Tax wrappers and account numbers

A **tax wrapper** is an account type that gives investments special tax treatment. Inside it, a trade is booked as in an ordinary account, and only the tax treatment changes.

| Region | Example wrapper | Main feature |
|---|---|---|
| **EU** (national) | PEA in France, PIR in Italy | Tax advantages on gains if held for a minimum period and invested under national rules |
| **UK** | ISA (Individual Savings Account) | Annual allowance, tax-free gains and income, individuals only |
| **US** | IRA (Individual Retirement Account) | Retirement saving with tax deferral or tax-free growth, individuals only, usually no margin |

Rules differ by country and change often. The wrapper is recorded as a flag on the account, which the tax and reporting teams read. It does not change the debits and credits of a trade.

Most banks structure account numbers in three levels: client (the person or entity), account (cash or securities, per currency) and sub-account (a purpose or strategy, such as retirement or children's education). An example is client 004512, securities account 02, sub-account 001. Reports roll up from the bottom level to the top.`,
    },
    {
      md: String.raw`## Worked example: a family's accounts

> [!example]
> A family wants (1) one joint portfolio for the parents, (2) a separate portfolio held through their family company, and (3) a Lombard credit line against the joint portfolio.
>
> **Client 004512**
> - Cash account SGD (joint, either to sign)
> - Securities account 01 (joint), linked to the SGD cash account, with a **Lombard facility** signed by both parents
> - Securities account 02, held by **Tan Family Holdings Pte. Ltd.**, authorised signatory: the director, plus a beneficial-owner declaration
>
> A purchase of 200 shares in account 01 debits cash and credits securities (quantity +200). The Lombard facility is used only if cash is insufficient.

> [!recall] T1.3
> The shares are held through a chain: the bank's securities account structure, then a custodian, then the central securities depository. The client's securities account is a record at the bank, not a physical certificate.`,
    },
    {
      md: String.raw`## Summary

- A client usually has a **cash account** (money) and a **securities account** (instruments), linked so that trades settle.
- A **margin account** (US) or **Lombard loan** (Europe, Switzerland) lets a client borrow against securities, under a separate signed credit agreement.
- The holder structure (**individual, joint, corporate**) decides who is identified, who signs and who may give orders.
- A **tax wrapper** (PEA/PIR, ISA, IRA) changes the tax result, not the way a trade is booked.
- Account numbers run client, account, sub-account.`,
    },
  ],

  exercises: [
    {
      id: 'purpose-match',
      template: 'match',
      generate(r) {
        const pool = {
          'Cash account': ['Holds money and takes the debit when a purchase settles', 'Receives deposits, pays fees and takes dividend and coupon payments'],
          'Securities account': ['Records the quantity of each instrument per ISIN', 'Holds the shares and bonds the client owns, not the money'],
          'Margin account': ['Lets the broker lend part of the purchase price against the securities', 'Allows borrowing to buy securities, under a signed margin agreement'],
          'Joint account': ['Held by two or more people who all have to be identified', 'Operated according to a signing rule such as "either to sign"'],
          'Corporate account': ['Held by a company and operated by authorised signatories', 'Needs a register extract, statutes and beneficial-owner details'],
          'Tax wrapper': ['Changes the tax treatment but not the way a trade is booked', 'An account type such as an ISA or an IRA with special tax rules'],
        };
        const keys = r.sample(Object.keys(pool), r.int(5, 6));
        return {
          prompt: 'Match each account type with its purpose.',
          pairs: keys.map((k) => [k, r.pick(pool[k])]),
          hints: ['Cash holds money; securities hold quantities.', 'Joint and corporate describe the holder; a wrapper describes the tax.'],
          solution: 'Cash: money. Securities: instruments by quantity. Margin: borrowing against securities. Joint: several holders. Corporate: company with authorised signatories. Wrapper: tax treatment only.',
        };
      },
    },
    {
      id: 'which-account',
      template: 'bucket',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const cash = [
          () => `Deposit of ${f.money(M.amt(r.int(1, 50) * 1000), CCY, 0)} by bank transfer`,
          () => `Withdrawal of ${f.money(M.amt(r.int(1, 20) * 500), CCY, 0)} to the client's other bank`,
          () => `Dividend of ${f.money(M.amt(r.int(40, 900)), CCY, 0)} received on shares held`,
          () => `Annual custody fee of ${f.money(M.amt(r.int(30, 300)), CCY, 0)} charged`,
          () => `Bond coupon of ${f.money(M.amt(r.int(50, 700)), CCY, 0)} received`,
          () => `Interest of ${f.money(M.amt(r.int(3, 60)), CCY, 0)} credited on the deposit`,
        ];
        const sec = [
          () => `${r.int(50, 800)} shares transferred in free of payment from another bank`,
          () => `${r.int(50, 800)} shares transferred out free of payment to another bank`,
          () => `Bonus shares (${r.int(10, 40)} new shares) credited after a share issue`,
          () => `A ${r.pick([2, 3, 4])}-for-1 stock split changes the number of shares held`,
        ];
        const both = [
          () => `Purchase of ${r.int(50, 500)} shares for ${f.money(M.amt(r.int(5, 80) * 1000), CCY, 0)}`,
          () => `Sale of ${r.int(50, 500)} shares for ${f.money(M.amt(r.int(5, 80) * 1000), CCY, 0)}`,
          () => `Bond redeemed at maturity: ${f.money(M.amt(r.int(5, 50) * 1000), CCY, 0)} paid out and the bond removed`,
          () => `Purchase of ${r.int(100, 900)} fund units for ${f.money(M.amt(r.int(5, 40) * 1000), CCY, 0)}`,
        ];
        const mix = r.pick([[4, 3, 3], [3, 3, 4], [3, 2, 5 - 0]]);
        const nB = mix[2] > both.length ? both.length : mix[2];
        const total = 10;
        const counts = [mix[0], mix[1], nB];
        counts[0] += total - counts.reduce((a, b) => a + b, 0);
        const items = [];
        [cash, sec, both].forEach((pool, b) => r.sample(pool, Math.min(counts[b], pool.length)).forEach((fn) => items.push({ text: fn(), bucket: b })));
        return {
          prompt: 'Sort each transaction into the account (or accounts) it touches.',
          buckets: ['Cash account only', 'Securities account only', 'Both accounts'],
          items: r.shuffle(items),
          hints: ['Ask: does money move? do securities move?', 'Dividends and coupons are money; transfers in kind and stock splits are securities only.'],
          solution: 'Cash only: deposits, withdrawals, dividends, coupons, fees, interest. Securities only: free transfers in/out, bonus shares, splits. Both: purchases, sales and redemptions.',
        };
      },
    },
    {
      id: 'right-structure',
      template: 'mcq',
      generate(r) {
        const cases = [
          { q: 'A retired client wants to buy shares and funds through the bank and have the dividends paid in.', h: ['The client is one retired individual who wants shares and funds and wants dividends paid in. Ask whether the structure must hold both money and securities.', 'Dividends are money, and shares are held as quantities. Check which options provide a place for each, and discard any that add features the client has not asked for.'], a: 'Cash (current) account plus a linked securities account', w: ['A margin account with no cash account', 'A corporate account', 'A securities account only: dividends do not need a cash account'] },
          { q: 'A married couple wants one portfolio where either partner can give orders.', h: ['There are two holders and either partner must be able to give orders alone. Look at the option wording on who may sign.', 'Compare how each option treats the holders: one account for both, or separate accounts, and how many signatures are needed.'], a: 'A joint securities account with an "either to sign" rule', w: ['Two individual accounts that the partners must sign for together', 'A corporate account', 'A cash account only'] },
          { q: 'A German GmbH wants to invest its surplus cash in bonds.', h: ['The holder is a company, not an individual. Ask who can act for a company and which documents the bank needs.', 'A company acts through people with authority to sign. Check which option records the holder correctly and names those people.'], a: 'A corporate account with named authorised signatories', w: ['An individual account in the managing director\'s name', 'A tax wrapper for individuals', 'A joint account for the two shareholders'] },
          { q: 'A US investor wants to buy US shares with borrowed money.', h: ['The feature to look at is borrowing from the broker to buy shares, in the US. Check which options allow borrowing at all.', 'Borrowing against securities needs a signed credit agreement with the broker. Check the options for one, and for any wrapper that does not allow it.'], a: 'A margin account, with a signed margin agreement', w: ['A cash account', 'A traditional IRA that is margined', 'A securities account with no credit agreement'] },
          { q: 'A UK resident wants gains and income on his investments to be tax-free, within the annual allowance.', h: ['The need is tax treatment, and the client is a UK resident. Ask which kind of structure changes tax but not the way trades are booked.', 'Tax wrappers are national. Match the client’s country of residence to the wrapper named in each option.'], a: 'An ISA wrapper', w: ['A US-style IRA', 'A corporate account', 'A margin account'] },
          { q: 'A US resident wants to save for retirement with special tax treatment.', h: ['The need is retirement saving with special tax treatment, and the client is a US resident. Check the options that are tax wrappers.', 'Tax wrappers are national. Match the client’s country of residence to the wrapper named in each option.'], a: 'An IRA wrapper', w: ['A UK ISA', 'A joint cash account', 'A corporate margin account'] },
          { q: 'A French resident wants a tax-favoured plan for European shares.', h: ['The need is a tax-favoured plan, and the client is French. Check the options that are tax wrappers.', 'Tax wrappers are national. Match the client’s country of residence to the wrapper named in each option.'], a: 'A national plan such as the PEA', w: ['A US margin account', 'A UK ISA', 'A corporate account'] },
          { q: 'A private-banking client wants separate "retirement" and "education" pots under one relationship.', h: ['The client wants two separate pots under a single relationship. Ask how the account numbering can keep goals apart without creating a new client.', 'Account numbers run client, account, sub-account. Check which option keeps one client and separates the pots below it.'], a: 'One client number with separate sub-accounts for each goal', w: ['Two unrelated clients with no link', 'A margin account', 'A single account with no sub-structure'] },
          { q: 'A private client with a large portfolio needs short-term liquidity without selling securities.', h: ['The client needs cash now but does not want to sell. Ask which option provides money without a sale.', 'Credit against a portfolio needs an agreement and the securities as security. Check which options provide credit and which only change tax or location.'], a: 'A Lombard credit facility secured by the portfolio', w: ['A tax wrapper', 'A second custody account in a different bank', 'An execution-only account with no agreements'] },
        ];
        const c = r.pick(cases);
        const choices = [c.a].concat(c.w);
        return {
          prompt: `Which account structure fits this client?\n\n${c.q}`,
          choices,
          answer: 0,
          fixedOrder: false,
          hints: c.h,
          solution: `**${c.a}.** The other options mismatch the holder, the purpose or the jurisdiction.`,
        };
      },
    },
    {
      id: 'opening-form',
      template: 'spot',
      generate(r) {
        const first = r.pick(['Anna', 'Marco', 'Julia', 'Pieter', 'Oliver', 'Daniel', 'Mei', 'Sarah']);
        const last = r.pick(['Bianchi', 'Keller', 'Dubois', 'Jansen', 'Hughes', 'Weber', 'Tan', 'Miller']);
        const second = r.pick(['Carla', 'Hans', 'Luc', 'Elise', 'James', 'Wei']);
        const no = r.int(100000, 999999);
        const iban = `LU${r.int(10, 99)} 0019 ${r.int(1000, 9999)} ${r.int(1000, 9999)} ${r.int(1000, 9999)}`;
        const type = r.pick(['joint', 'corporate', 'margin']);
        let lines, errIdx;
        if (type === 'joint') {
          const kind = r.pick(['signatory', 'nocash']);
          lines = [
            `Client no. ${no}, securities account 01, sub-account 001`,
            `Account type: joint securities account (holders: ${first} ${last} and ${second} ${last})`,
            `ID and tax residency documents: ${first} ${last} (provided), ${second} ${last} (provided)`,
            kind === 'signatory' ? `Signatures on opening form: ${first} ${last} only` : `Signatures on opening form: ${first} ${last} and ${second} ${last}`,
            kind === 'nocash' ? 'Linked cash account: none' : `Linked cash account: EUR current account ${iban}`,
            'Signing rule: either holder may sign alone',
            'Tax wrapper: none',
          ];
          errIdx = kind === 'signatory' ? 3 : 4;
        } else if (type === 'corporate') {
          const kind = r.pick(['nosig', 'isa']);
          lines = [
            `Client no. ${no}, securities account 01, sub-account 001`,
            `Account type: corporate securities account, holder: ${last} Holding S.r.l.`,
            'Documents: register extract, statutes, board resolution, beneficial-owner declaration',
            kind === 'nosig' ? 'Authorised signatories: none listed' : `Authorised signatory: ${first} ${last}, managing director`,
            `Linked cash account: EUR current account ${iban}`,
            'Signing rule: managing director alone up to EUR 100,000, two signatures above',
            kind === 'isa' ? 'Tax wrapper: ISA (UK)' : 'Tax wrapper: none',
          ];
          errIdx = kind === 'nosig' ? 3 : 6;
        } else {
          const kind = r.pick(['noagr', 'ira']);
          lines = [
            `Client no. ${no}, securities account 01, sub-account 001`,
            `Account type: individual margin account, holder: ${first} ${last}`,
            'ID and tax residency documents: provided (US resident)',
            kind === 'noagr' ? 'Margin agreement: not signed' : 'Margin agreement: signed on opening date',
            `Linked cash account: USD account at the bank, reference ${no + 7}`,
            'Signing rule: holder alone',
            kind === 'ira' ? 'Tax wrapper: IRA (margin borrowing requested)' : 'Tax wrapper: none',
          ];
          errIdx = kind === 'noagr' ? 3 : 6;
        }
        const why = {
          joint: ['Every holder of a joint account must sign the opening form. Only one signature is on file.', 'A securities account needs a linked cash account so that trades can settle and dividends can be paid.'],
          corporate: ['A corporate account must name at least one authorised signatory; the bank cannot take orders from nobody.', 'An ISA is available to individuals only, not to companies.'],
          margin: ['A margin account needs a signed margin agreement before the bank lends against securities.', 'An IRA generally cannot be margined, so a wrapper with a margin request is inconsistent.'],
        };
        const whyText = type === 'joint' ? (errIdx === 3 ? why.joint[0] : why.joint[1]) : type === 'corporate' ? (errIdx === 3 ? why.corporate[0] : why.corporate[1]) : (errIdx === 3 ? why.margin[0] : why.margin[1]);
        return {
          prompt: 'Review this account-opening form. Flag the line that is inconsistent.',
          title: 'Account-opening form (extract)',
          doc: lines.map((t, i) => ({ text: t, error: i === errIdx, why: i === errIdx ? whyText : undefined })),
          count: 1,
          hints: ['Check holders against signatures, the account type against its wrapper, and whether trades can settle.'],
        };
      },
    },
    {
      id: 'borrowing-accounts',
      template: 'multi',
      generate(r) {
        const us = r.bool();
        const yes = us
          ? ['Individual margin account', 'Joint margin account', 'Corporate margin account', 'Margin account for a trust, with a signed agreement']
          : ['Securities account with a signed Lombard facility', 'Joint securities account with a Lombard facility signed by all holders', 'Corporate account with a credit line against its portfolio', 'Private-banking account with a portfolio-secured loan'];
        const no = us
          ? ['Cash account', 'Traditional IRA', 'Roth IRA', 'Joint cash account', 'Cash account for a minor', 'Savings deposit account']
          : ['Plain custody account with no credit agreement', 'Current account with no overdraft', 'Savings deposit account', 'Securities account of a client who signed no credit agreement', 'Tax-wrapped retirement plan with no borrowing allowed', 'Cash account held at a custodian'];
        const right = r.sample(yes, 3);
        const wrong = r.sample(no, 5);
        const all = r.shuffle(right.concat(wrong));
        return {
          prompt: us ? 'In the **US**, select the accounts in which the client can borrow from the broker to buy securities.' : 'At a **European or Swiss private bank**, select the accounts in which the client can borrow against the portfolio to buy securities.',
          choices: all,
          answers: all.map((c, i) => (right.includes(c) ? i : -1)).filter((i) => i >= 0),
          hints: [us ? 'Margin accounts allow it; cash accounts and IRAs generally do not.' : 'Borrowing needs a credit agreement; a plain account does not allow it.'],
          solution: us ? 'Margin accounts (individual, joint, corporate or trust) allow borrowing; cash accounts and IRAs do not.' : 'Accounts with a signed Lombard or portfolio-secured credit agreement allow borrowing; plain custody, savings and current accounts do not.',
        };
      },
    },
  ],
});
