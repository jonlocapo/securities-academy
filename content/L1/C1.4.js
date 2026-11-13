/* C1.4 Onboarding overview: from stranger to client */
SA.unit({
  id: 'C1.4',
  lesson: [
    {
      md: String.raw`## Onboarding steps

A new customer cannot trade on the day the account is requested, even when the funds are available. **Onboarding** is the process between first contact and the first trade. It establishes who the customer is, where the money comes from, what the customer needs, what loss the customer can bear and what the customer has agreed to. It protects the client, the bank and the financial system. Errors in the client file usually start here, so operations staff work with the file throughout the life of the account.

For a private individual the usual sequence is:

1. **First contact:** understand the need, propose a segment and a service level (C1.1, C1.3).
2. **Identification and verification:** identity document and proof of address, checked against the person.
3. **Source of wealth, source of funds and purpose of the account:** how the wealth was built, where the money for the account comes from and what the account will be used for.
4. **Screening:** sanctions lists, politically exposed persons (PEPs) and adverse media.
5. **Risk profile and investment objectives:** knowledge and experience, financial situation and capacity to bear losses, and goals.
6. **Agreements:** account-opening form, terms and conditions, mandate (if any), fee schedule and tax self-certification.
7. **Approval:** a person other than the relationship manager, normally compliance, signs off the file.
8. **Activation:** the accounts are opened for trading and funded.

After activation the file is updated on a defined schedule, more often for higher-risk clients, and whenever major changes occur.

> [!recall] C1.1
> The client category (retail, professional, eligible counterparty) is fixed during onboarding, as is any opt-up. A wrong category at this point carries through every later check.`,
      check: {
        template: 'mcq',
        prompt: 'In the usual onboarding sequence, which step comes last before the client can trade?',
        choices: ['Activation of the account after approval', 'Setting the risk profile', 'Collecting the identity document', 'Signing the fee schedule'],
        answer: 0,
        solution: 'Everything else, including approval, comes first. The account is activated only when the file is complete and approved.',
      },
    },
    {
      md: String.raw`## What the client goes through

The client meets onboarding as a series of conversations and requests, led by the relationship manager. The first meeting covers what the client wants from the bank and how the client prefers to take decisions. The bank then asks the questions that its anti-money-laundering checks require:

- Can the client's identity and address be verified?
- Why does the client want to open the account?
- Where has the wealth come from, and what pattern of transactions is likely?

The client should expect to provide the following, which the bank checks against independent evidence:

| Item | Typical evidence |
|---|---|
| Identity and address | Passport or national identity card, a recent utility bill or bank letter |
| Tax residency | Self-certification form and tax identification number |
| Source of wealth | Documents that fit the story, such as a sale contract, probate certificate, company accounts or employment contract |
| Source of the first deposit | The sending bank and country |
| Investment profile | Completed questionnaire, discussed with the relationship manager |

The bank collects this data once and reuses it for compliance, monitoring and client service, so a client should not be asked for the same document twice. Delays come mainly from missing evidence of the source of wealth and from unsigned forms. A file that is incomplete cannot be activated, however advanced the discussion on investments.

> [!recall] C1.3
> The profile discussion in onboarding is the first step of the advisory process. Its output is used again for suitability whenever the bank advises or manages the portfolio.`,
    },
    {
      md: String.raw`## Identification and verification

Customer due diligence (CDD) is the set of checks a bank must complete before it accepts a client. The international standard is FATF Recommendation 10. It requires the bank to identify the customer and verify the identity from reliable, independent documents or data. It also requires the bank to identify the **beneficial owner**, the natural person who ultimately owns or controls the account, and to understand the purpose of the relationship.

Verification depends on the type of client:

| Client | Identity is verified from |
|---|---|
| Individual | Official identity papers, with name, date of birth and address recorded |
| Company, partnership or foundation | Documents proving that it was properly formed and exists |
| Trust | Evidence of formation, plus identification of the trustees |

Identity documents must be current when the account is opened, and the bank keeps copies. Verification normally happens before the relationship starts. Where a client is not met face to face, for example in an online process, the bank applies measures that establish identity by other means.

Beneficial ownership is established for every account. For a company the bank understands the ownership structure well enough to find the individuals who provide the funds and who direct the directors. For a trust it identifies the settlor, the trustees, anyone who can remove the trustees and the beneficiaries. A signature authority on an account does not by itself make the signatory the beneficial owner, but the identity of each authorised signer is still established.

Where an intermediary introduces clients or manages the account for them, the bank assesses the intermediary and decides how far it can rely on the intermediary's own due diligence.

> [!eu]
> EU anti-money-laundering rules are being consolidated in a directly applicable Regulation (AMLR, (EU) 2024/1624) that applies from 10 July 2027. Until then, national laws based on the AML directives apply.`,
    },
    {
      md: String.raw`## Client profile and enhanced due diligence

After identification the bank records enough information for an independent reviewer to understand the client and the relationship. The profile covers:

- **source of wealth**: how the client's wealth was obtained, for example business ownership, employment, inheritance or investments
- **net worth**
- **source of initial funding**: the bank and country from which the first deposit will arrive, which is a separate point from source of wealth
- **account information**: purpose of the account, expected size and expected activity
- occupation and the nature of the client's or owner's business
- the role of any attorney or authorised third party

The bank checks this information against documents or reliable sources in proportion to the risk. Unless other measures are enough, such as reliable references, a representative of the bank meets the client before the account is opened.

Some clients need **enhanced due diligence** and, often, senior management approval. The usual indicators are residence in or funds from a country with weak anti-money-laundering standards, activity in a sector prone to money laundering, and status as a **politically exposed person** (PEP). A PEP is someone who holds or has held a prominent public position, together with close family and associates. Relationships with PEPs are entered only with senior management approval. The bank also states which categories of client it will not accept at all.

Prospective clients are screened against applicable sanctions lists before acceptance, and existing clients are screened again when the lists change.

> [!warning]
> A numbered account or one under an alternative name is allowed only after the bank has verified who the client and the beneficial owner are, exactly as for any other account. Anonymous accounts, and accounts in names that are plainly invented, are not allowed at all.`,
    },
    {
      md: String.raw`## Risk profile, tax and agreements

The investment profile has five dimensions.

| Dimension | What is asked |
|---|---|
| **Objectives** | Liquidity needs, reference currency, planned expenses, target return and benchmark |
| **Risk capacity** | Investment horizon, dependence on the portfolio to cover living costs, stability of income, likelihood of unplanned outflows |
| **Risk tolerance** | Investment and product experience, reaction to past losses, comfort with annual swings in value |
| **Decision making** | Interest in markets, available time, willingness to delegate (C1.3) |
| **Special requirements** | Tax, legal and investment constraints |

Capacity is a matter of fact and tolerance is a matter of attitude. A client's tolerance can exceed capacity, for example an enthusiastic investor whose children's school fees depend on the portfolio. Where the two differ, the bank helps the client reconcile them or at least uses the more conservative one.

Two further items complete the file.

| Data | Purpose |
|---|---|
| **Tax residency self-certification** (CRS, and FATCA forms for US persons) | Determines which tax authority receives reports on the account |
| **Signed agreements** (account opening, terms, mandate, fee schedule) | Legal basis for what the bank does for the client |

The risk profile and the mandate must agree. A conservative client is not placed in an aggressive growth mandate. The file is complete when the client has signed the correct documents, and an unsigned form leaves it incomplete.`,
    },
    {
      md: String.raw`## Ongoing review and records

The relationship manager is responsible for keeping the client file up to date, on a defined schedule and after major changes such as a new country of residence, a new beneficial owner or a change in the source of funds. Account activity is monitored against the file. Activity that does not fit the profile, large cash transactions and pass-through transactions, in which funds arrive and leave again quickly, are typical triggers for a review. If the activity has no plausible explanation, the control function decides whether to continue the relationship with closer monitoring, end it, or report it to the authorities.

If a bank cannot complete due diligence, it does not open the account or start the relationship. If due diligence cannot be completed on an existing relationship, the bank ends it and considers a suspicious transaction report.

Records are kept for at least five years. For CDD records the period runs from the end of the business relationship. The records must be sufficient to reconstruct individual transactions.`,
    },
    {
      md: String.raw`## Worked example: an inheritance

> [!example]
> **Emily Clarke**, 52, a London resident, wants to invest an inheritance of GBP 400,000.
>
> 1. ID and address verified.
> 2. Source of wealth: inheritance from her mother, supported by the probate certificate. Purpose of the account: long-term wealth growth.
> 3. Screening clear.
> 4. Risk profile: **balanced** (questionnaire, ten years' experience with funds).
> 5. Service: **discretionary mandate**, guideline maximum 60% equities.
> 6. Fee schedule and tax self-certification (UK resident) signed.
> 7. Approval by compliance, a second person beyond the relationship manager.
>
> The account is then activated for trading and the GBP 400,000 can be received.

> [!recall] C1.3
> The risk profile (balanced) and the mandate (discretionary, 60% equity cap) are consistent. With a conservative profile, the mandate would have to be changed before activation.

For a company the sequence adds company documents, the beneficial owners and authorised signatories, and screening of the company and of the people behind it.`,
    },
    {
      md: String.raw`## Summary

- Onboarding runs in order: identification, source of wealth and funds, screening, risk profile, agreements, approval, activation.
- Customer due diligence means identifying and verifying the client and the **beneficial owner**, and understanding the purpose of the relationship.
- Higher-risk clients, including PEPs, need enhanced due diligence and senior management approval.
- The **risk profile** must agree with the mandate, and tax residency is self-certified and decides the reporting country.
- The file is reviewed on a defined schedule, and records are kept for at least five years.`,
    },
  ],

  exercises: [
    {
      id: 'onboarding-order',
      template: 'order',
      generate(r) {
        const corp = r.bool();
        const nm = r.pick(['Luca Ferri', 'Anna Weber', 'Oliver Hughes', 'Sarah Miller', 'Tan Wei Ming', 'Wong Ka Yan', 'Pierre Martin']);
        const co = r.pick(['Alfa Trading', 'Nova Logistics', 'Delta Consulting', 'Solaris Energy']);
        // only steps that depend on each other: steps banks run in parallel (source of funds, risk profile,
        // agreements) are left out so that exactly one order is correct
        const items = corp ? [
          `First contact with ${co}: needs, service level and segment`,
          'Collect the company documents: register extract, statutes, board resolution',
          'From those documents, identify the beneficial owners and verify their IDs',
          `Screen ${co} and the verified owners against sanctions and PEP lists`,
          'Compliance approves the completed file',
          'Activate the account for trading',
        ] : [
          `First contact with ${nm}: needs, service level and segment`,
          'Collect and verify the identity document and proof of address',
          'Screen the verified name against sanctions and PEP lists',
          'Compliance approves the completed file',
          'Activate the account for trading',
        ];
        return {
          prompt: `Put the onboarding steps for ${corp ? 'a company' : 'a private individual'} in the right order.`,
          items,
          hints: corp ? [`${co} is a company, so the people behind it are not known until its documents are collected. Decide which step produces the names that the screening step needs.`, `Screening covers ${co} and the verified owners, so it comes after the owners are identified. The sequence starts with first contact and ends with approval and then activation.`] : [`Screening checks ${nm}'s name against sanctions and PEP lists, so decide which step makes that name reliable first.`, `The name is reliable only after the identity document and proof of address are verified. The sequence starts with first contact with ${nm} and ends with approval and then activation.`],
          solution: corp ? 'Contact, company documents, beneficial owners identified from those documents, screening of the company and owners, approval, activation.' : 'Contact, identification, screening of the verified name, approval, activation.',
        };
      },
    },
    {
      id: 'required-documents',
      template: 'multi',
      generate(r) {
        const kinds = {
          'a private individual': ['Passport or national ID card', 'Proof of address dated within the last 3 months', 'Tax residency self-certification', 'Declaration of source of wealth, with evidence for large amounts', 'Signed account-opening form and terms and conditions', 'Completed knowledge and risk-profile questionnaire'],
          'a married couple opening a joint account': ['Passport or ID card for each partner', 'Proof of address for each partner', 'Tax residency self-certification for each partner', 'Declaration of source of wealth', 'Signed form with the signing rule, signed by both', 'Risk-profile questionnaire'],
          'a small company': ['Commercial register extract', 'Statutes of the company', 'Board resolution naming authorised signatories', 'Beneficial-owner declaration with IDs of the owners', 'ID of each director or signatory', 'Entity tax self-certification'],
        };
        const noise = ['Birth certificate of the client\'s grandparents', 'Payroll records of all staff of the client\'s employer', 'Copy of the client\'s holiday bookings', 'School reports of the client\'s children', 'Passport of the client\'s accountant', 'Credit-card statement of a relative who is not a holder', 'Full customer list of an unrelated company'];
        const who = r.pick(Object.keys(kinds));
        const right = r.sample(kinds[who], 4);
        const wrong = r.sample(noise, 4);
        const all = r.shuffle(right.concat(wrong));
        return {
          prompt: `Select the documents normally required to onboard **${who}**.`,
          choices: all,
          answers: all.map((c, i) => (right.includes(c) ? i : -1)).filter((i) => i >= 0),
          hints: [who === 'a small company' ? 'For a company the bank must see that it exists, who may act for it and who owns it. Look for documents that show each of those.' : who === 'a married couple opening a joint account' ? 'Every holder of a joint account must be identified and must sign. Look for documents that identify each partner and show how the account is operated.' : 'For an individual the bank must know who the person is, where they live, which country taxes them, where the wealth comes from and that they agreed to the terms. Look for a document for each of those.', `Eight documents are listed and four are required for ${who}. Discard any document that belongs to a person or company other than the client and its holders.`],
          solution: `Required: ${right.join(', ')}.`,
        };
      },
    },
    {
      id: 'client-file',
      template: 'spot',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const nm = r.pick(M.names);
        const home = M.country.replace(/^the /, ''), addr = M.city === home ? home : M.city + ', ' + home;
        const other = r.pick(['Brazil', 'Canada', 'Australia']);
        const prof = r.pick([['conservative', 'income, max 20% equities'], ['balanced', '60/40 equity-bond, 10% issuer limit'], ['growth', 'up to 80% equities']]);
        const clashMandate = prof[0] === 'conservative' ? 'aggressive growth, up to 90% equities' : 'capital preservation only, no equities';
        const amt = f.money(M.amt(r.int(2, 30) * 50000), CCY, 0);
        const kind = r.pick(['noid', 'residency', 'riskmandate', 'nosign']);
        const lines = [
          `Client: ${nm}, new private-banking client, amount to be invested ${amt}`,
          kind === 'noid' ? 'Identity document: not yet received' : 'Identity document: passport, verified in person',
          `Residential address: ${addr}`,
          kind === 'residency' ? `Tax residency declared: ${other}, with no explanation and no supporting document` : `Tax residency declared: ${home}`,
          'Source of wealth: sale of a family business, sale agreement on file',
          `Risk profile: ${prof[0]}`,
          `Mandate: discretionary, ${kind === 'riskmandate' ? clashMandate : prof[1]}`,
          kind === 'nosign' ? 'Signed account-opening form: not signed by the client' : 'Signed account-opening form: signed by the client on the opening date',
        ];
        const idx = { noid: 1, residency: 3, riskmandate: 6, nosign: 7 }[kind];
        const why = {
          noid: 'Identity must be verified before the account can be activated. A missing ID makes the file incomplete.',
          residency: 'The declared tax residency conflicts with the address and nothing explains it. Tax reporting could go to the wrong country, so the point must be clarified first.',
          riskmandate: 'The mandate does not agree with the risk profile, which makes the service unsuitable.',
          nosign: 'Without the client\'s signature the agreements have no legal basis, so the file is not complete.',
        }[kind];
        return {
          prompt: 'This client file is about to go for approval. Flag the line that blocks activation.',
          title: 'Client file (extract)',
          doc: lines.map((t, i) => ({ text: t, error: i === idx, why: i === idx ? why : undefined })),
          count: 1,
          hints: ['Check, line by line: ID, address vs tax residency, risk profile vs mandate, signature.'],
        };
      },
    },
    {
      id: 'data-purpose',
      template: 'match',
      generate(r) {
        const all = [
          ['Passport copy', 'KYC: confirms who the client is'],
          ['Recent utility bill', 'KYC: confirms where the client lives'],
          ['Probate certificate for an inheritance', 'KYC: explains where the wealth comes from'],
          ['Expected deposits and the intended use of the account', 'KYC: shows the purpose of the relationship'],
          ['Years of experience with funds and bonds', 'Risk profile: what the client understands'],
          ['Question: how large a loss could you accept?', 'Risk profile: how much loss the client can bear'],
          ['Self-certification of tax residency', 'Tax: decides which country receives reporting'],
          ['Investment guidelines such as an equity cap', 'Mandate: the limits the manager must respect'],
          ['Signed fee schedule', 'Agreements: what the client agrees to pay'],
          ['Beneficial-owner declaration for a company', 'KYC: reveals the real people behind the entity'],
        ];
        const pairs = r.sample(all, 6);
        return {
          prompt: 'Pair each onboarding data point with its purpose.',
          pairs,
          hints: ['Consider the four groups: KYC, risk profile, tax and mandate/agreements.'],
          solution: pairs.map((p) => `${p[0]}: ${p[1]}`).join('. '),
        };
      },
    },
    {
      id: 'can-activate',
      template: 'mcq',
      generate(r, f) {
        const M = r.market(), CCY = M.ccy;
        const nm = r.pick(M.names);
        const amt = f.money(M.amt(r.int(1, 20) * 50000), CCY, 0);
        const missing = r.pick([null, 'id', 'sow', 'risk', 'sign', 'approve']);
        const tick = (k, text) => `- ${text}: ${missing === k ? 'MISSING' : 'done'}`;
        const file = [
          tick('id', 'Identity and address verified'),
          tick('sow', 'Source of wealth documented'),
          '- Screening: clear',
          tick('risk', 'Risk profile set'),
          tick('sign', 'Agreements and fee schedule signed'),
          tick('approve', 'Compliance approval'),
        ].join('\n');
        const choices = [
          'Yes: the file is complete, so the account can be activated',
          'No: identity and address are not verified',
          'No: the source of wealth is not documented',
          'No: the risk profile has not been set',
          'No: the agreements are not signed',
          'No: compliance has not approved the file',
        ];
        const order = [null, 'id', 'sow', 'risk', 'sign', 'approve'];
        const ans = order.indexOf(missing);
        const chosen = [ans].concat(r.sample([0, 1, 2, 3, 4, 5].filter((i) => i !== ans), 3));
        const finalIdx = r.shuffle(chosen);
        return {
          prompt: `${nm} wants to invest ${amt}. This is the state of the file:\n\n${file}\n\nCan the account be activated for trading?`,
          choices: finalIdx.map((i) => choices[i]),
          answer: finalIdx.indexOf(ans),
          fixedOrder: false,
          hints: missing ? [`One line of the checklist reads MISSING. Read the lines for ${nm}'s file and find it.`, 'Activation needs every step to be done, so decide what an outstanding step means for the account. Then find the option that names that step.'] : [`Read each line of ${nm}'s checklist and look for any line marked MISSING.`, 'Activation needs identity, source of wealth, screening, risk profile, agreements and approval. Count how many of the six are marked done.'],
          solution: `**${choices[ans]}.**`,
        };
      },
    },
  ],
});
