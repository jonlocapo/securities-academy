/* T1.2 Confirmation, clearing and settlement in one picture */
SA.unit({
  id: 'T1.2',
  lesson: [
    {
      md: String.raw`## Clearing and settlement

After execution the trade is booked and legally binding, but nothing physical has changed hands. Cash and securities move only when a sequence of **post-trade** steps is complete. Two terms describe the later part of that sequence.

- **Clearing** is the preparation of the trade for settlement. It covers matching, recording and processing the settlement instructions, and it may include netting.
- **Settlement** is the completion of the trade. The seller delivers the securities, the buyer pays, and ownership passes.

The steps run in this order:

1. **Confirmation and matching**: both sides agree the details of the trade.
2. **Clearing**: instructions are sent to the clearing or settlement system and matched. A CCP may step in and net the positions.
3. **Settlement**: the securities and the cash are exchanged, normally by book entry at a CSD.

Information moves in two directions. The buyer and the seller agree the trade details with each other, and each then passes its settlement instruction down its own chain of intermediaries to the CSD.

> [!recall] T1.1
> The booked trade ticket from T1.1 is the input. The trade date T is the reference day from which later steps are counted.`,
    },
    {
      md: String.raw`## Matching and confirmation

Before details can be confirmed, the two records must be matched so that both sides know they refer to the same trade. A trade identifier recorded at execution makes this easy. Without one, the trade is matched on time, trader and headline details, and small differences in the records are accepted as long as the trade is clearly the same.

A trade that cannot be matched at all was either never received by the counterparty or was booked against the wrong counterparty. In the second case the real counterparty looks for its own match and contacts the firm that made the error.

Once matched, the details are confirmed. Three situations call for an amendment:

- **Omission**: a detail is missing and must be agreed and added. Back-office staff can usually do this without the traders unless an economic term such as the currency is missing.
- **Error**: one side has recorded a detail wrongly. The error is corrected or the two sides dispute it, and disputes are settled between them or, rarely, by a court.
- **Ambiguity**: a detail is incompletely filled in, and the traders are asked what they intended.

When a broker trades for a client, two-way confirmation is replaced by a different step. The broker states the trade against the client, who **affirms** it by agreeing the details or rejects it. A client who trades a block for several accounts also tells the broker how to split it (**allocation**).

> [!warning]
> The longer an error stays in the lifecycle, the more it costs to correct. A confirmation process that is quick and accurate also shows other firms that the organisation is a reliable counterparty.`,
    },
    {
      md: String.raw`## Clearing instructions, CCPs and netting

Both sides send **settlement instructions** to the clearing or settlement system. The buyer instructs it to receive securities against payment. The seller instructs it to deliver securities against payment. The system validates each instruction and then tries to pair a delivery with a receipt. Paired instructions are **matched** and can go forward to settlement. **Unmatched** instructions cannot settle. A custodian cannot change its client's instruction unless the agreement allows it, so the difference is reported and the trading party sends a corrected instruction.

For most exchange-traded shares in Europe a **CCP** (central counterparty) also takes part. The CCP **novates** the trade, which means that it becomes the buyer to the seller and the seller to the buyer. The original parties each hold a contract against the CCP and no longer against each other. A clearing house that does not novate is not exposed to counterparty risk, whereas a CCP takes on that risk and guarantees performance if a member defaults.

To control its own risk the CCP monitors members' positions and collects **margin**. **Initial margin** is called when a position is opened. **Variation margin** is paid or received each day and reflects the profit or loss on open positions.

The CCP also **nets**. Netting offsets purchases and sales so that each member settles one position in each security and one cash amount, and not every trade separately (gross).

> [!example]
> During one day a broker buys 8,000 shares at EUR 25.00, sells 3,000 at EUR 25.10 and sells 2,000 at EUR 24.90.
> - Gross: three settlements, with 13,000 shares moving and EUR 200,000.00 payable, EUR 75,300.00 receivable and EUR 49,800.00 receivable.
> - Net: one delivery instruction for **3,000 shares received** and one net cash payment of $200{,}000 - 75{,}300 - 49{,}800 =$ **EUR 74,900.00**.

Netting reduces the number of movements, the cash needed and the chance of a fail.`,
    },
    {
      md: String.raw`## Delivery versus payment

**Delivery versus payment (DVP)** is a settlement mechanism in which securities are delivered only if payment is made, and payment is made only if the securities are delivered. The two transfers happen at the same time and cannot be separated. The seller calls this DVP and the buyer calls it receipt versus payment (RVP), but the term DVP is used for both.

When the two legs are separate, one side is exposed. A buyer who pays first may not receive the securities, and a seller who delivers first may not be paid. This is **principal risk**, the risk of losing the full value of the trade. Delays and deliveries to the wrong place add further problems.

Three structures are used to achieve DVP.

| Model | Securities | Cash |
|---|---|---|
| 1 | Settled trade by trade (gross) | Settled trade by trade (gross), at the same moment |
| 2 | Settled trade by trade (gross) | Settled net at the end of the cycle |
| 3 | Settled net at the end of the cycle | Settled net, at the same moment |

In the euro area, DVP settlement takes place on **T2S**, the Eurosystem's platform. A participant needs a securities account at a CSD connected to T2S and a cash account at a national central bank, and the two sit side by side on the platform. Settlement is in **central bank money**. T2S offers partial settlement and auto-collateralisation to keep fails low. Euroclear Bank and Clearstream Banking are international CSDs and apply the same DVP principle.

> [!warning]
> **Free of payment (FOP)** or delivery-free instructions move securities without cash. They are used for transfers between a client's own accounts, for example from one custodian to another, and not for trades. Two separate instructions are needed, so the principal risk that DVP removes is back.`,
      check: {
        template: 'mcq',
        prompt: 'What does DVP protect against?',
        choices: ['One party delivering and not being paid (or paying and not receiving)', 'Share prices falling after the trade', 'The broker charging too high a commission', 'The company cancelling its dividend'],
        answer: 0,
        solution: 'DVP links the securities leg to the cash leg so that neither can happen without the other.',
      },
    },
    {
      md: String.raw`## The settlement cycle: T+1, T+2

The **settlement cycle** states how many business days after the trade date settlement takes place. **T+2** means two business days after the trade date, so a Monday trade settles on Wednesday. Business days exclude weekends and the market's closing days. For euro settlement the closing days are the **TARGET** holidays: 1 January, Good Friday, Easter Monday, 1 May, 25 and 26 December.

Two dates on a ticket are easy to confuse. The **value date** is the date on which the exchange is supposed to take place, and the **settlement date** is the date on which it actually does. In most share trades the two coincide, and some firms use the terms interchangeably.

| Market | Standard cycle |
|---|---|
| European Union (euro and most EU securities) | **T+2** until 11 October 2027, then **T+1** |
| United Kingdom | T+2 now, T+1 planned from 11 October 2027 |
| Switzerland | T+2 now, T+1 planned from 11 October 2027 |
| United States | **T+1** since 28 May 2024 |

Shorter cycles reduce the time during which either side can default, and they free capital that CCPs hold as margin.

> [!eu]
> The EU move to T+1 is set by [Regulation (EU) 2025/2075](https://eur-lex.europa.eu/eli/reg/2025/2075/oj), which amends Article 5(2) of CSDR and applies from **11 October 2027**. Until then, the intended settlement date of trades on trading venues is no later than the second business day. The new rule does not apply to privately negotiated trades executed on a venue, bilateral trades reported to a venue, the first book-entry recording of securities, or securities lending and repo documented as two linked operations.

> [!us]
> The SEC amended Rule 15c6-1 in 2023 (Release 34-96930), applying from **28 May 2024**. A US-listed share therefore settles one day earlier than a Euronext share bought on the same day. A new Rule 15c6-2 pushes broker-dealers and institutional clients to complete allocations, confirmations and affirmations by the end of trade date.

> [!uk]
> The UK Accelerated Settlement Taskforce recommended moving to T+1 in line with the EU on 11 October 2027, and legislation is in preparation. Switzerland and Liechtenstein plan the same date.`,
    },
    {
      md: String.raw`## Worked example: settlement dates

> [!example]
> Buy EUR 10,470 of shares on Monday 2 November 2026.
> - EU (T+2): settles on **Wednesday 4 November 2026**. On that day the buyer's cash account is debited and the securities account credited at the same moment.
> - US (T+1): the same trade in a US-listed share settles on **Tuesday 3 November 2026**.
>
> With a holiday: a trade on Thursday 2 April 2026. Good Friday (3 April) and Easter Monday (6 April) are TARGET holidays, so there is no settlement on those days. T+1 is Tuesday 7 April and T+2 is **Wednesday 8 April**.

Timeline of an equity trade on T+2:
- **T**: execution, allocation, confirmation and matching, CCP clearing, and settlement instructions sent down the custody chain.
- **T+1**: instructions are matched at the CSD, any mismatch is fixed, and the securities and cash positions are prepared (this may involve borrowing shares or an FX transaction).
- **T+2**: DVP settlement at the CSD.

With T+1 settlement these steps must mostly be complete on the trade date, because the intermediate day disappears.

> [!recall] P1.5
> The roles on the timeline are those of the market map in P1.5: broker (confirmation), CCP (clearing), CSD and T2S (settlement) and custodian (holding).`,
    },
    {
      md: String.raw`## Settlement fails

A **settlement fail** occurs when a trade does not settle on its intended settlement date. A trade that is unmatched at the clearing stage cannot settle at all. Otherwise the usual causes are:

- **Securities short**: the seller does not have the shares on the settlement date, often because the seller's own purchase has not arrived (a chain fail). The seller may be able to borrow the shares or to offer a partial delivery.
- **Cash short**: the buyer does not have the cash, collateral or credit.
- **Instruction mismatch**: the two sides' instructions disagree on quantity, amount, date or account, so the CSD cannot match them.

A fail leaves one party without cash or securities and can cascade along a chain of trades. A party that is left waiting loses the use of the money, and a late settlement can delay other trades that depended on it. The counterparty that caused the delay usually compensates the other side through an **interest claim** from its counterparty, calculated on the settlement amount.

> [!example]
> A purchase with a settlement amount of EUR 250,000.00 fails to settle for one day because the buyer's instruction was matched late. The seller claims interest at 4.50% on an Act/360 basis.
> Claim = $250{,}000 \times 0.045 \times 1/360 =$ **EUR 31.25**.

Settlement breaks take a large share of back-office time. They are expensive to trace, and unpaid items that no one chases can build up.

> [!eu]
> Under [CSDR](https://eur-lex.europa.eu/eli/reg/2014/909/oj), CSDs apply daily **cash penalties** to the participant that causes the fail. The penalty mechanics and the buy-in rules were reworked by the CSDR Refit, and the details are covered in L4.

> [!warning]
> Common pitfalls are counting calendar days instead of business days, overlooking that a local holiday in the settlement market shifts the date, and treating "confirmed" as "settled".`,
    },
    {
      md: String.raw`## Summary

- After execution come confirmation and matching, clearing (instructions, a CCP and netting) and settlement (at the CSD). Unmatched instructions cannot settle.
- DVP links the delivery of securities to the payment, so either both happen or neither does. Free-of-payment transfers lack this protection.
- A CCP becomes buyer to every seller and seller to every buyer, nets positions, calls margin and guarantees performance.
- Settlement cycles: EU, UK and Switzerland T+2 until 11 October 2027, then T+1. The US moved to T+1 on 28 May 2024. Dates count business days and skip the settlement market's closed days.
- A fail can be securities short, cash short or an instruction mismatch, and the party at fault pays an interest claim or a CSDR penalty.`,
    },
  ],

  exercises: [
    {
      id: 'settlement-timeline',
      template: 'timeline',
      generate(r, f) {
        const M = r.market({ only: ['EU'] }); // TARGET holidays and T2 closure are euro-area facts
        const hols = [
          ['2026-01-01', 'New Year\'s Day'], ['2026-04-03', 'Good Friday'], ['2026-04-06', 'Easter Monday'], ['2026-05-01', 'Labour Day'],
          ['2026-12-25', 'Christmas Day'], ['2027-01-01', 'New Year\'s Day'], ['2027-03-26', 'Good Friday'], ['2027-03-29', 'Easter Monday'],
        ];
        const hset = hols.map((h) => h[0]);
        const isBd = (d) => { const w = f.weekday(d); return w !== 'Sat' && w !== 'Sun' && !hset.includes(d); };
        const addBd = (d, n) => { let k = 0; const s = n < 0 ? -1 : 1; while (k < Math.abs(n)) { d = f.addDays(d, s); if (isBd(d)) k++; } return d; };
        const n = r.int(1, 2);
        const h = r.pick(hols.filter((x) => isBd(f.addDays(x[0], -1)) || isBd(f.addDays(x[0], -3))));
        const k = r.int(1, n);
        const T = addBd(h[0], -k);
        const S = addBd(T, n);
        const days = [];
        for (let i = 0; i <= f.dayDiff(T, S) + 1; i++) days.push(f.addDays(T, i));
        const slots = days.map((d) => `${f.weekday(d)} ${f.date(d)}${hset.includes(d) ? ' (TARGET holiday)' : ''}`);
        const hi = days.indexOf(h[0]);
        const events = r.shuffle([
          { text: 'Trade is executed on the venue', slot: 0 },
          { text: 'Trade details are confirmed and matched', slot: 0 },
          { text: 'CCP clears the trade and becomes counterparty to both sides', slot: 0 },
          { text: `Delivery versus payment at the CSD (T+${n})`, slot: days.indexOf(S) },
          { text: `${h[1]}: the CSD and T2 are closed, nothing settles`, slot: hi },
        ]);
        return {
          prompt: `A share trade is executed on **${f.weekday(T)} ${f.date(T)}** on ${M.venue}, a euro venue, with **T+${n}** settlement. Place each event on the day it happens. Weekends and TARGET holidays are not settlement days.`,
          slots, events,
          hints: ['Execution, confirmation and clearing all happen on the trade date.', `Count ${n} business day${n > 1 ? 's' : ''} forward from the trade date, skipping weekends and the holiday.`],
          solution: `Trade date ${f.date(T)}; T+${n} lands on **${f.weekday(S)} ${f.date(S)}** because ${h[1]} (${f.date(h[0])}) is skipped.`,
        };
      },
    },
    {
      id: 'settlement-date',
      template: 'numeric',
      generate(r, f) {
        const M = r.market();
        const mkt = { name: `a share listed on ${M.venue}`, n: M.settle };
        const T = f.addBusinessDays('2026-01-05', r.int(0, 230));
        const closed = [];
        const nClosed = r.int(0, 2);
        const isBd0 = (d) => { const w = f.weekday(d); return w !== 'Sat' && w !== 'Sun'; };
        let cur = T;
        for (let i = 0; i < nClosed; i++) {
          cur = f.addBusinessDays(cur, r.int(1, 2));
          if (!closed.includes(cur)) closed.push(cur);
        }
        const isBd = (d) => isBd0(d) && !closed.includes(d);
        let S = T, k = 0;
        while (k < mkt.n) { S = f.addDays(S, 1); if (isBd(S)) k++; }
        const diff = f.dayDiff(T, S);
        const lst = closed.length ? closed.map((d) => `${f.weekday(d)} ${f.date(d)}`).join(' and ') : 'none';
        return {
          prompt: `A client buys ${mkt.name} on **${f.weekday(T)} ${f.date(T)}**. The cycle is **T+${mkt.n}**. Non-settlement days besides weekends: **${lst}**. How many **calendar days** after the trade date does the trade settle?`,
          answer: diff, dp: 0, tol: { abs: 0 }, unit: '',
          hints: [
            `The trade date is ${f.weekday(T)} ${f.date(T)} and settlement is T+${mkt.n}. Skip Saturdays, Sundays${closed.length ? ` and ${lst}` : ' (no other closed days apply)'} when you count.`,
            mkt.n === 1
              ? `Step forward one calendar day at a time from ${f.date(T)} until you reach the first business day. That is the settlement date.`
              : `The first business day after ${f.date(T)} is ${(() => { let d = T; do { d = f.addDays(d, 1); } while (!isBd(d)); return `${f.weekday(d)} ${f.date(d)}`; })()}. Count one more business day from there.`,
            `Once you have the settlement date, count the calendar days from ${f.date(T)} to that date, including weekends and closed days.`,
          ],
          solution: `Settlement is **${f.weekday(S)} ${f.date(S)}**, which is **${diff} calendar days** after ${f.date(T)}.`,
        };
      },
    },
    {
      id: 'dvp-cloze',
      template: 'cloze',
      generate(r, f) {
        const M = r.market();
        const amt = M.amt(r.int(10, 900) * 1000);
        const co = r.pick(M.companies).n;
        const v = r.int(0, 1);
        const text = v === 0
          ? `A buyer purchases ${f.money(amt, M.ccy, 0)} of shares in ${co}. Under DVP, the [[0]] of the shares happens only if the [[1]] is made, and the two transfers are [[2]]. This removes the risk that one [[3]] gives up its asset and is not paid.`
          : `With ${f.money(amt, M.ccy, 0)} of ${co} shares at stake, settlement is "delivery versus payment": the buyer's [[1]] and the seller's [[0]] are [[2]], so neither side can be left exposed to its [[3]].`;
        return {
          prompt: 'Complete the description of delivery versus payment.',
          text,
          blanks: [{ accept: ['delivery'] }, { accept: ['payment'] }, { accept: ['simultaneous', 'simultaneously'] }, { accept: ['counterparty'] }],
          bank: r.shuffle(['delivery', 'payment', 'simultaneous', 'counterparty', 'netting', 'custody']),
          hints: ['DVP links two legs: one of securities and one of cash.'],
        };
      },
    },
    {
      id: 'fail-reason',
      template: 'mcq',
      generate(r) {
        const M = r.market();
        const ago = M.settle === 1 ? 'one business day' : 'two business days';
        const sc = [
          [`On the settlement date the seller's account holds none of the shares it sold. The shares it bought ${ago} ago have not arrived.`, 0, ['Look at the seller\'s account on the settlement date. Ask which asset it holds and which asset the buyer is waiting for.', `The shares the seller bought ${ago} ago have not arrived. Ask which leg of the DVP this prevents.`]],
          ['A hedge fund has sold shares it had borrowed, but the lender recalled them the day before settlement.', 0, ['The fund sold borrowed shares, and the lender took them back. Ask what the fund holds on settlement day.', 'The recall happened the day before settlement. Ask which side of the trade now has nothing to deliver.']],
          ['The buyer\'s bank account is short of the cash needed for the purchase on settlement day.', 1, ['The text describes a shortage on the buyer\'s side. Ask which asset the buyer is missing.', 'Ask whether the missing asset is what the buyer owes in the DVP, or what it is waiting to receive.']],
          [`The buyer's funding line was cancelled in the evening and no cash is available at ${M.csd}.`, 1, ['The text says what is missing at the CSD on settlement day. Ask whether it is a security or money.', 'The buyer\'s funding line was cancelled. Ask which leg of the DVP the buyer can no longer fund.']],
          ['The buyer instructs 5,000 shares, the seller instructs 500 shares: the CSD cannot match them.', 2, ['Compare the two quantities in the text: 5,000 against 500. Ask whether both sides sent the same instruction.', 'The text says the CSD cannot match them. Ask whether the cause is a missing asset, or a difference between the two instructions.']],
          ['The two instructions show different settlement amounts after one side forgot the commission.', 2, ['The text says the amounts on the two instructions differ. Ask whether the two sides agree on the trade details.', 'One side forgot the commission. Ask whether the shares or the cash are missing, or whether the two sides disagree.']],
          ['The two instructions show different settlement dates.', 2, ['The text compares the two instructions, not the accounts. Ask which detail differs between them.', 'Ask whether the CSD can pair two instructions that carry different dates, and whether any asset is missing.']],
          ['Both instructions match, the securities are in the seller\'s account and the cash is available.', 3, ['Check each item in the text in turn: the two instructions, the securities and the cash.', 'Ask whether any of the three items is missing or in disagreement.']],
        ];
        const [text, ans, hintList] = r.pick(sc);
        const choices = ['Securities short: the seller cannot deliver', 'Cash short: the buyer cannot pay', 'Instruction mismatch: the two sides disagree', 'No problem: the trade settles normally'];
        const why = ['The delivering side lacks the securities, so DVP cannot complete.', 'The paying side lacks the cash, so DVP cannot complete.', 'The instructions do not match, so the CSD cannot pair them for settlement. Fix by correcting and re-sending.', 'Everything needed is in place: DVP settles on the intended date.'][ans];
        return {
          prompt: `What is the cause in this scenario? *${text}*`,
          choices, answer: ans, fixedOrder: true,
          hints: hintList,
          solution: why,
        };
      },
    },
    {
      id: 'infra-functions',
      template: 'match',
      generate(r) {
        const M = r.market();
        const eu = M.region === 'EU'; // Eurex Clearing and T2S are euro-area facts
        const roles = [
          [eu ? ['CCP', 'Eurex Clearing'] : ['CCP'], ['Becomes buyer to every seller and seller to every buyer', 'Nets positions and guarantees the settlement obligation', 'Calls initial and variation margin from its members']],
          [['CSD', M.csd], ['Holds the master record of ownership and settles by book entry', 'Runs the securities accounts in which DVP takes place']],
          [['ICSD', 'Euroclear Bank'], ['Settles cross-border and Eurobond trades across several markets', 'Provides settlement and custody for international securities']],
          [['Custodian', 'A global custody bank'], ['Safekeeps the client\'s securities and collects income', 'Holds assets for institutions and handles corporate actions']],
          [['Broker', 'An executing broker'], ['Executes orders as agent and sends the confirmation', 'Routes client orders to a venue for a commission']],
          [['T2S', 'TARGET2-Securities'], ['Settles securities against cash in central bank money for many EU CSDs', 'Common ECB platform for euro DVP settlement']],
        ].filter((x) => eu || x[0][0] !== 'T2S');
        const chosen = r.sample(roles, 5);
        return {
          prompt: 'Match each infrastructure name with its function.',
          pairs: chosen.map((x) => [r.pick(x[0]), r.pick(x[1])]),
          hints: ['CCP is about guaranteeing the trade; CSD is about recording and settling ownership.'],
        };
      },
    },
  ],
});
