# FACTS register (as of 2026-11-06)

Source of the questions: syllabus/open-questions.txt (Q1-Q31) plus six coordinator additions (N1-N6, L6 units C6/C7/K2).
Confidence: high / medium / low. UNRESOLVED = could not be confirmed; findings listed.
Method note: web-search summaries were cross-checked against primary documents where fetchable (SEC order, FINRA notice, CSSF circular, EC FASTER page, EU T+1 FAQ). Items marked "(secondary)" rest on law-firm or vendor commentary and should be re-verified in EUR-Lex / the Official Journal before final lesson text.

Tally: Q1-Q31 -> 19 resolved, 12 unresolved. N1-N6 -> 5 resolved, 1 partly unresolved (N6 sanctions part). M1-M4 -> 3 resolved, 1 unresolved (M3 Italy 2026 verification).

---

## A. Settlement cycles and T+1

**Q2 (L1) - Switzerland T+1 date.**
Answer: Switzerland and Liechtenstein move to T+1 on 11 Oct 2027, coordinated with EU and UK. swissSPTC recommended it in Jan 2025; SIX confirmed in Sept 2025 and will amend the SIX Swiss Exchange rulebook; a market consultation ran to 10 Oct 2025. Roadmap could shift if conditions change.
Source: SIX media release 12 Sep 2025 (six-group.com/en/newsroom/media-releases/2025/20250912-settlement-cycle-six-swissstpc.html); swissSPTC (secondary press coverage).
Confidence: high. Affects units: T1.2 (remove "to confirm").

**Q3 (L1) - EU/UK T+2 until 11 Oct 2027.**
Answer: Confirmed. EU: ESMA final report (Nov 2024) recommended 11 Oct 2027; the legal change is an amendment to CSDR Art 5(2) via Regulation (EU) 2025/2075 (number per eu-t1.eu FAQ, not independently opened). UK: Accelerated Settlement Taskforce report 6 Feb 2025; HMT/FCA/BoE endorsed 19 Feb 2025; government to legislate; FCA letter to asset managers 23 Oct 2025. No sign of any date change as of Nov 2026.
Source: ESMA T+1 report Nov 2024; eu-t1.eu/qa; FCA/HMT statements Feb 2025.
Confidence: high (date), medium (EU regulation number; UK statutory instrument status). Affects units: T1 jurisdiction note.

**Q7 (L2) - Are fund subscriptions/redemptions in scope of EU T+1?**
UNRESOLVED. Found: the CSDR amendment concerns transferable securities traded on trading venues; the eu-t1.eu FAQ lists only exemptions for privately negotiated/bilateral trades, first book-entry, and certain SFTs and says nothing about fund units. An industry roadmap item (secondary, Rankia 2026) says fund managers aim for T+2 on subscriptions/redemptions where appropriate and seek regulatory clarity on cash breaches; ETF primary-market funding gap for non-EU underlyings noted. Working assumption: fund orders are NOT mandated to T+1 but ETF secondary trading is. Check the ESMA Nov 2024 report section on UCITS/AIF and the Industry Committee handbook.
Confidence: low.

**Q17 (L4) - T2S night-time cut-offs / DCA (S329).**
UNRESOLVED. S329 is the 2015 T2S URD, so it is dated. Found: night-time settlement runs roughly 20:00 CET to ~03:00 CET (Clearstream operational page, secondary); an ESMA-hosted T+1 Coordination Committee record (5 Dec 2025) mentions a proposal to move the T2S DvP cut-off from 16:00 to 17:00 CET, adoption unconfirmed; ECB consultation on extending T2 hours (2025) is a consultation only; DCA fees rose in 2026 (DNB newsletter). Use T2S/TARGET operating schedule on ecb.europa.eu for final figures.
Confidence: low.

**Q13 (L4) - CSDR Refit: buy-ins, penalty redistribution.**
Answer: Refit Regulation (EU) 2023/2845 in force since 16 Jan 2024. Mandatory buy-in is now a last-resort tool that the Commission may switch on by implementing act for specified instruments/transactions; the Commission lists that act as not to be adopted before 1 Oct 2027 (Arendt calendar, 6 Oct 2025, secondary). Settlement discipline RTS amendment: Commission delegated act C(2026)4640 of 6 Jul 2026 amending Del. Reg. 2018/1229; enters into force 20 days after OJ publication; largely applies from 7 Dec 2026, with some obligations from 11 Oct 2027 (CMS law firm; a training site cites it as Reg (EU) 2026/1536 published 14 Oct 2026 - unverified number). Detailed redistribution mechanics (penalties passed to the receiving participant, CCP handling) not confirmed; text of C(2026)4640 was not machine-readable.
Source: CMS legal update on EC CSDR delegated regulations; Commission register C(2026)4640; Arendt regulatory calendar.
Confidence: medium (dates), low (redistribution detail). Affects units: L4 CSDR units.

**Q14 (L4) - CSDR penalty rates.**
Answer: The rates are in the Annex to Commission Delegated Regulation (EU) 2017/389, NOT 2018/1229 (which holds the operational RTS). Rates per day: liquid shares 1.0 bp; illiquid shares 0.5 bp; SME growth market shares 0.25 bp; sovereign debt 0.10 bp; other debt 0.20 bp; debt traded on SME growth markets 0.15 bp; all other instruments 0.5 bp. So 1.0 bp/day for liquid shares in the worked example is correct. ESMA advice (Nov 2024) proposes: liquid and SME shares unchanged, illiquid shares/non-sovereign bonds/other +50%, sovereign bonds +100%, cash-lack floor 0 -> 1; no evidence the rate annex has been amended yet.
Source: KDPW cash penalty system document (rate table quoting 2017/389 Annex); ESMA Q&A on 2017/389 Annex points 3 and 6; ESMA final report Nov 2024 via regulationtomorrow.
Confidence: medium-high (current rates), medium (no amendment adopted).
Note: fix any reference to "Art 7 of 2018/1229" for the rates.

**Q15 (L4) - ISO 15022 event codes and seev.03x mapping.**
UNRESOLVED. Not checked against SMPG/CAJWG documents. PCAL, DRAW and FCTR exist as ISO 15022 corporate action event types in the SWIFT code lists (iotafinance mirror), but the seev.03x message mapping was not verified.
Confidence: low.

**Q16 (L4) - EU retail account transfer practice by country (O5.4).**
UNRESOLVED. No source consulted. No single harmonised EU scheme is assumed; per-country notes need national sources (e.g. Spain, Nordics, Italy, Germany).
Confidence: low. Affects units: O5.4.

## B. Market structure, MiFID/MiFIR, Listing Act

**Q8 (L3) - EU consolidated tape for equities/ETFs.**
Answer: ESMA launched the selection on 20 Jun 2025 and on 19 Dec 2025 selected EuroCTP as the equities/ETF CTP. Transition period reported to end 30 Sep 2026, then a five-year term under ESMA supervision; EuroCTP targeted a July 2026 start subject to authorisation. Actual go-live date not confirmed. The bond tape was selected earlier and the derivatives tape tender is scheduled separately.
Source: ESMA CTP pages (esma.europa.eu/node/219885, interactive single rulebook Art 27da MiFIR); press coverage (secondary).
Confidence: medium (selection), low (go-live).

**Q12 (L3) - MiFIR Art 39a PFOF ban.**
Answer: Ban applies from 28 Mar 2024. Art 39a(2) allowed Member States a temporary exemption until 30 Jun 2026; Germany was the only state reported using it and it ended 1 Jul 2026 (PwC Germany). Malta expressly did not adopt it. Other states not confirmed beyond ESMA's list (page not readable).
Source: ESMA ISR Art 39a; PwC Legal Germany client alert; MFSA Dear CEO letter.
Confidence: medium.

**Q4 (L2) - Directive (EU) 2024/2810 multiple-vote shares.**
Answer: In force 4 Dec 2024; transposition deadline 5 Dec 2026 (EP Legislative Observatory; Ireland's department cites 4 Dec 2026). Transposition is under way, not complete (e.g. Belgium draft bill approved 3 Jul 2026); a state-by-state table was not obtained.
Source: oeil.europarl.europa.eu summary id 1795332; gov.ie consultation page.
Confidence: high (deadline), low (national status).

**Q27 (L7) - Research after the Listing Act; PDMR; Art 24(9a).**
Answer: Directive (EU) 2024/2811 (not a PRIIPs/UCITS act) amends MiFID II research unbundling; EUR-Lex listing gives transposition 5 Jun 2026 and application 6 Jun 2026 (secondary report of this). Complementary Commission Delegated Directive (EU) 2026/374 amending 2017/593 was reported published 2 Jun 2026 (single source). The SME issuer limit (market cap up to EUR 1bn) is from background knowledge and could not be confirmed in the sources reached. PDMR threshold: see N1.
Confidence: medium (directive/dates), low (EUR 1bn and the Art 24(9a) numbering).
Contradiction: the syllabus attributes research bundling to "Dir 2024/2811" correctly in Q27 but Q5 calls 2024/2811 a Regulation about PRIIPs/UCITS; that is wrong.

**Q11 (L3) and Q28 (L7) - SEC Reg NMS tick size, access fee, Rule 605.**
Answer: By order of 11 Jun 2026 (Release 34-105656) the SEC extended temporary exemptive relief for the amended minimum pricing increment (Rules 600(b)(89)(i)(F), 612) and the amended access fee caps (Rule 610(c)) to the first business day of November 2027 (earlier relief ran to 2 Nov 2026). The SEC also proposed rescinding Rule 611 (press report). Rule 605 amendments: compliance date moved to 1 Aug 2026 by a Sept 2025 final rule; an April 2026 exemptive order (34-105136) added relief for fractional-share execution; whether any further delay occurred after 1 Aug 2026 was not confirmed. Round lot/odd-lot information dates not confirmed.
Source: SEC Release 34-105656 (sec.gov/files/rules/exorders/2026/34-105656.pdf), read directly; SEC Release 34-105136 (Federal Register 6 Apr 2026).
Confidence: high (tick/access fee Nov 2027), medium (Rule 605 Aug 2026), low (round lot).
Contradiction: syllabus assumes Nov 2025 / Nov 2026 compliance. Affects units: L3 US market structure, L7 US.

**Q28 (L7) - US Treasury clearing mandate.**
Answer: SEC extended compliance dates on 25 Feb 2025: cash Treasury trades 31 Dec 2026; repo/reverse repo 30 Jun 2027. No 2026 change located in searches (latest items are Sept 2025 commentary), so re-check SEC news before teaching.
Source: SEC extension (Feb 2025; Federal Register 4 Mar 2025); DTCC/ICI summaries.
Confidence: medium.

**Q10 (L3) - ISO 20022 equivalents of MT515/MT518.**
UNRESOLVED. Found only that ISO 20022 post-trade work (Securities Trade, "setr", business area; SWIFT/Omgeo proposal) was reverse-engineered from MT515/MT517 among others. No message identifiers confirmed. Check the ISO 20022 message catalogue / SWIFT MT-MX mapping.
Confidence: low.

## C. Taxes and FTT

**Q9 (L3) - FTT rates.**
Answer: France 0.4% (raised from 0.3% in April 2025) on shares of French listed companies above EUR 1bn market cap, plus 0.01% on cancelled/modified orders (HFT). Italy: cash equities doubled in January 2026 - 0.2% on regulated-market trades, 0.4% OTC (previously 0.1% / 0.2%); derivatives taxed on notional by schedule, reduced to one-fifth on regulated markets; HFT 0.04%. Spain 0.2% on listed Spanish companies above EUR 1bn.
Source: Tax Foundation "Financial Transaction Taxes in Europe" (country table as of June 2026, fetched).
Confidence: medium-high (confirm with French DGFiP and Italian Agenzia delle Entrate before final text).
Contradiction: syllabus uses FR 0.3%.

**Q18 (L5) - FASTER Directive (EU) 2025/50 (A2.6).**
Answer: Adopted 10 Dec 2024, OJ 10 Jan 2025, in force 30 Jan 2025. Transposition by 31 Dec 2028; national rules apply from 1 Jan 2030. Quick refund: European Commission page says 50 days from payment (one summary says 60 days after request, another says four months - treat as unresolved detail; use 50 days). Digital tax residence certificate: Commission page says issued within one working day of request; other sources say 14 days - conflicting. Relief at source applies treaty rate at payment.
Source: taxation-customs.ec.europa.eu FASTER page (fetched); KPMG/Sprintax summaries.
Confidence: high (dates), medium (refund days), low (certificate timing). Affects units: A2.6.

**Q20 (L5) - CSSF 24/856, WHT rates, lot methods, LMT.**
Answer (CSSF): Circular in force 1 Jan 2025 and repeals 02/77. Tolerance thresholds for NAV calculation errors, % of NAV: money market funds 0.20%; UCITS bond and mixed 0.50%; UCITS equity and other assets 1.00%; Part II UCIs/ELTIFs open to non-professional investors same 0.5% / 1.0%; others set by fund board, capped at 5%. Source: CSSF Circular 24/856 text (S170 in library).
Answer (LMT): Directive (EU) 2024/927 transposition deadline 16 Apr 2026; ESMA LMT guidelines published 12 Mar 2026 and apply from 16 Apr 2026 with Delegated Regs (EU) 2026/465 and 2026/466; existing funds have until 16 Apr 2027; fund must hold at least two LMTs; national transposition uneven, no complete table.
UNRESOLVED sub-parts: national WHT rates; Italian/UK/German lot-method details (A2.5, A3.3, A4.7).
Confidence: high (CSSF), medium (LMT), none (WHT, lot methods). Affects units: A2.5, A3.3, A4.7.

## D. Retail products, KID, suitability, RIS

**Q5 (L2) - PRIIPs KID reform and UCITS KIID-to-KID.**
Answer: There is no "Regulation (EU) 2024/2811" on PRIIPs; 2024/2811 is a Listing Act Directive amending MiFID II. UCITS switched from the KIID to the PRIIPs KID on 1 Jan 2023 (exemption ended 31 Dec 2022); non-retail UCITS may use either. The pending PRIIPs reform is part of the Retail Investment Strategy (see Q26). UK: the FCA UCITS KIID exemption runs to 31 Dec 2026 (UK regime separate).
Source: iqeq/Irish SI 262/2022 summary; FCA statement on UCITS KIID.
Confidence: medium-high.
Contradiction: syllabus's citation and framing.

**Q26 (L7) - Retail Investment Strategy.**
Answer: Provisional agreement 18 Dec 2025; Coreper approved 5 Jun 2026; ECON approved 23 Jun 2026; plenary indicative date 11 Nov 2026 (Legislative Observatory, procedure 2023/0167(COD)). Not yet in the OJ. Once published: entry into force on day 20, transposition within 24 months, application 30 months after entry into force (secondary); Commission requested ESMA Level 2 advice by 1 Oct 2027. Expected PRIIPs amendments apply 18 months after entry into force per the draft (older, treat as unverified).
Confidence: medium. Do not teach fixed application dates beyond "2028-29".

**Q25 (L6) - FinSA article numbers and ESMA suitability guideline date.**
Answer: FinSA Art 58 is the key information document (basic information sheet) duty, not a prospectus article; prospectus rules start at Art 35. Arts 8 and 9 are information duties (content/form; timing/form). Exact scope of Arts 7-17 not verified. ESMA revised suitability guidelines (ESMA35-43-3172) were issued 3 Apr 2023 and apply from 3 Oct 2023 (translations published 3 Apr 2023 + 6 months), replacing the 2018 guidelines.
Source: Fedlex FinSA (via droit-bilingue.ch); NBS/AMF/Central Bank of Ireland notices on the guidelines.
Confidence: high (guidelines, Art 58), medium (Arts 7-17 not individually checked). Affects units: L6 FinSA units.

**Q24 (L6) - AMLR, CTA, Lombard, UCITS Art 52.**
Answer: AMLR (EU) 2024/1624 applies from 10 Jul 2027 (background knowledge; searches returned nothing on it) - medium. US CTA: FinCEN interim final rule (Mar 2025) removed domestic companies and US persons from beneficial-ownership reporting; only foreign reporting companies remain; status of a final rule not checked - medium. UCITS Art 52: 5% per issuer (Member State option to 10%, with 40% aggregate cap on positions above 5%), 20% deposits per body, 35% for sovereign/public issuers (Art 52(2)); combined cap 35% per body; 20% index replication (35% single issuer) sits in Art 53; covered bonds up to 25% for pre-8 Jul 2022 bonds. Lombard lending-value percentages: UNRESOLVED (illustrative bank practice, no authoritative source; keep labelled as illustrative).
Confidence: medium; high on Art 52 text mapped from ESMA ISR.

**Q22 (L6) - MAR PDMR threshold.** See N1.

## E. Margin and US rules

**Q23 (L6) - FINRA pattern day trader rule.**
Answer: It is no longer pending. The SEC approved FINRA's Rule 4210 amendments on 14 Apr 2026. FINRA Regulatory Notice 26-10 (20 Apr 2026): effective 4 Jun 2026; members needing system changes may phase in until 20 Oct 2027. The PDT designation and the USD 25,000 minimum equity are replaced by an "intraday margin" standard (intraday margin deficit computed on days with IML-reducing trades). Portfolio margin: the USD 5 million threshold is preserved; under new (g)(1)(K) accounts with less than USD 5m equity must hold margin for intraday risk substantially similar to end-of-day risk, and (g)(1)(J) requires written risk-methodology procedures for intraday risk.
Source: FINRA Regulatory Notice 26-10 (fetched).
Confidence: high.
Contradiction: syllabus says replacement is "pending SEC approval as of Nov 2026". Affects units: L6 margin units.

## F. Fund NAV and conduct (L6 additions)

**N1 - MAR PDMR notification threshold after the Listing Act.**
Answer: Regulation (EU) 2024/2809 raised the default PDMR notification threshold to EUR 20,000 per calendar year from EUR 5,000, applying from 4 Dec 2024. NCAs may raise it to EUR 50,000 or lower it to EUR 10,000 (the old NCA option was up to EUR 20,000). Germany (BaFin) moved to EUR 50,000 from 1 Jan 2026; Finland stays at EUR 20,000. Other Listing Act MAR changes (protracted-process disclosure, delayed-disclosure notifications) apply from 5 Jun 2026. Some vendor pages wrongly describe EUR 20,000 as effective June 2026.
Source: Hannes Snellman, Heuking, FI (Finland) PDMR page (secondary); verify article text in Reg 2024/2809 amending MAR Art 19(8).
Confidence: medium-high. Affects units: C6, C7 (and Q22).
Contradiction: syllabus's "EUR 15,000" (and old 5k/15k/20k option) is outdated.

**N2 - Insider lists after the Listing Act.**
Answer: The alleviated (simplified) insider-list format, previously for SME growth market issuers, is extended to all issuers by a new Commission Implementing Regulation (EU) 2026/1291 (adopted 12 Jun 2026, in force 5 Jul 2026 per Eubelius; secondary). Two templates (event-based and permanent) with fewer personal-data fields (e.g. birth surname dropped). Earlier Listing Act change (applies from 5 Sept 2025 per Arthur Cox) concerned the format revisions of the ITS; permanent-insider section limits not confirmed.
Confidence: medium; low on exact field list and permanent-insider scope.

**N3 - Short Selling Regulation thresholds.**
Answer: Notification to the NCA at 0.1% of issued share capital and every 0.1% step above; public disclosure at 0.5% and every 0.1% step. The 0.1% notification threshold is permanent in the sense that Commission Delegated Regulation (EU) 2022/27 (in force 31 Jan 2022) set it at 0.1% on a lasting basis, replacing the original 0.2% and the temporary Covid-19 ESMA measures. Calculation as of end of trading day, disclosure by 15:30 next trading day (per Bulgaria's FSC).
Source: MFSA net short positions page; Bank of Lithuania; legislation.gov.uk Art 6 text; secondary.
Confidence: medium-high. Affects units: C6/C7/K2 (whichever covers short selling).

**N4 - Reg T payment period under T+1.**
Answer: Reg T (12 CFR 220.8) payment period = the standard settlement cycle + 2 business days, so under T+1 it is T+3 (was T+4 under T+2). FINRA Regulatory Notice 23-15: extension requests under T+1 from 31 May 2024. The formula ties itself to Rule 15c6-1, so no separate Fed amendment was needed.
Source: FINRA Regulatory Notice 23-15 (finra.org/rules-guidance/notices/23-15).
Confidence: high (T+3, i.e. S+2 business days after settlement date). Wording tip: "settlement date plus two business days".

**N5 - FINRA Rule 4210 portfolio margin key facts.**
Answer (partial): under the 2026 amendments the USD 5 million equity threshold is preserved with new paragraph (g)(1)(K) intraday-risk margin for portfolio margin accounts below that; (g)(1)(J) requires written intraday risk procedures; the effective date is 4 Jun 2026 with transition to 20 Oct 2027. UNRESOLVED: base minimum equity requirement for portfolio margin accounts (commonly stated as USD 100,000 for the original program; confirm in Rule 4210(g)), haircut methodology (TIMS / OCC), and eligible products list - not verified in this pass.
Source: FINRA Regulatory Notice 26-10.
Confidence: high (amendment items), low (the rest).

**N6a - DORA application date and scope.**
Answer: Regulation (EU) 2022/2554 entered into force 16 Jan 2023 and applies from 17 Jan 2025 (Art 64). Scope: Art 2(1) lists about 20-21 categories of financial entities (credit institutions, investment firms, payment/e-money institutions, CSDs, CCPs, trading venues, trade repositories, UCITS ManCos, AIFMs, insurers, crypto-asset service providers etc.), no size threshold but proportionality; ICT third-party service providers are covered through the register of information (Art 28(3)) and the oversight regime for critical ICT third-party providers (ESAs designated 19 CTPPs on 18 Nov 2025 per a single secondary source). Subcontractors of direct providers are outside the register of information (EBA Q&A 2024_7089).
Confidence: high (date), medium (scope counts, CTPP designation).

**N6b - EU Reg 833/2014 restrictions relevant to brokers.**
UNRESOLVED (partial). Found: Regulation 833/2014 has been amended by the 20th package (Council Reg (EU) 2026/506, 23 Apr 2026; adds Art 5bb crypto-asset service provider ban from 24 May 2026) and Art 5a covers CSD/assets separate accounting. From background knowledge (not verified here): Art 5 restricts dealing in transferable securities/money-market instruments issued by listed Russian state-linked entities after specified dates; Art 5b bars deposits above EUR 100,000 from Russian nationals/residents and CSD services (Art 5a(1)/5f contexts); Art 5f bans sales of EU-denominated securities to Russian persons. Article numbers and exemptions for brokers need to be checked against the consolidated EUR-Lex text after 2026/506 and the Commission FAQs.
Confidence: low.

## G. SRD II and corporate actions

**Q19 (L5) - SRD II Arts 3a-3d, IR 2018/1212, seev messages.**
UNRESOLVED. Searches returned nothing relevant. Reminder: Arts 3a-3e of Dir 2007/36/EC as amended by SRD II (identification, transmission, facilitation, non-discrimination, proportionality); IR 2018/1212 applied from 3 Sep 2020; message names (seev.045/046 for identification, seev.001-seev.008 meeting family) not checked. Check SMPG shareholder identification and meeting market standards.
Confidence: low.

## H. Textbook and cross-reference items (no regulatory fact)

**Q1 (L1) - Chapter numbering, S008/S015/S001/S074.**
UNRESOLVED (partly). S001 (Ross, A First Course in Probability, 10th ed.) is in the library; table of contents: 1 Combinatorial Analysis, 2 Axioms of Probability, 3 Conditional Probability and Independence, 4 Random Variables, 5 Continuous Random Variables, 6 Jointly Distributed Random Variables, 7 Properties of Expectation, 8 Limit Theorems, 9 Additional Topics in Probability, 10 Simulation. S008, S015, S074 are NOT in the library folder, so chapters cannot be checked; keep references topic-based.
Confidence: high (S001), none (others).

**Q6 (L2), Q21 (L5), Q28 (L7 books), Q29 (L8), Q31 (L8) - book chapter numbers.**
UNRESOLVED. Library holds no PDFs for S015, S083, S092, S146, S111, S153, S094, S084 (checked by filename), nor Fabozzi/Tuckman-Serrat/Stewart. Reference by topic or chapter title only; TOC checks are needed when copies are obtained (see TO-FETCH-MANUALLY.md).
Confidence: none. Q31: Wilmott "Introduces" (S084) is the single-volume edition; chapter numbers such as "Ch. 77/80" belong to the larger Wilmott volumes, so remove them.

**Q30 (L8) - Callback ids reconciliation.**
UNRESOLVED. Internal consistency task, not a verifiable fact; do after final L1-L7 files exist.

---

## I. L5 refinement additions (accounting units A3-A7)

**M1 - MiFID II Delegated Reg (EU) 2017/565 Arts 60 and 63: statement frequency.**
Answer: Art 60 (portfolio management periodic statement): retail clients every three months by default (confirmed in the consolidated text via legislation.gov.uk). Exceptions in the article (from background knowledge, paragraph wording not re-read): where the client elects transaction-by-transaction reports, the statement can be less frequent (at least every 12 months); a longer interval applies if the client has online access to the portfolio; the interval is monthly if the portfolio holds leveraged positions or contingent-liability instruments. Art 63 (statement of client financial instruments or funds): at least quarterly, as soon as possible after period end (ESMA Q&A on the deadline for the Art 63(1) quarterly statement); monthly for accounts with leveraged instruments/contingent liabilities (Art 63(2)); more frequent on request at commercial cost. Quarterly is therefore the baseline for both, with the leveraged monthly rule.
Source: Delegated Reg (EU) 2017/565 Arts 60, 63 (EUR-Lex 32017R0565); ESMA Q&A 2148.
Confidence: medium (quarterly baseline high; exception paragraphs need re-reading). Affects units: A3-A7 client reporting.

**M2a - UK share matching (CGT).**
Answer: Disposals of shares of the same class in the same company are matched in this order: (1) shares acquired on the same day (TCGA 1992 s.105); (2) shares acquired in the 30 days after the disposal ("bed and breakfast", s.106A(5)), provided the person was UK resident; (3) the s.104 holding (pool, average cost). Shares matched under (2) are kept out of the pool (s.106A(5ZA)). Surplus same-day acquisitions go into the pool unless matched under the 30-day rule. HMRC CG51560 covers (1) and (2); HS284 helpsheet (2026) lists the same order.
Source: gov.uk HMRC Capital Gains Manual CG51560; HS284 Shares and CGT 2026.
Confidence: high. Note: the ordering applies to individuals; companies use different pooling (not checked).

**M2b - US wash sale (IRC s.1091).**
Answer: A loss on a sale of stock/securities is disallowed if substantially identical securities are bought within 30 days before or after the sale (61-day window including the sale date). The disallowed loss is added to the basis of the replacement shares (s.1091(d)), and the replacement shares take the holding period of the shares sold (s.1223(3)). Loss in an IRA is permanently lost (no basis step-up). Worked example: bought 1,000, sold 750, repurchased 800 -> disallowed 250, new basis 1,050.
Source: IRS Publication 550 / IRC s.1091 (via secondary summaries; the IRS PDF was not opened).
Confidence: medium-high.

**M3 - Italian tax on dividends and capital gains for individuals.**
Answer: UNRESOLVED against primary 2026 law; searches only confirmed that the 2026 Budget Law (Law 199/2025) raised the crypto-asset gains rate to 33% (26% in 2025) and revised PEX/dividend rules for companies. From background knowledge, still to be confirmed with the Agenzia delle Entrate: financial income of resident individuals is taxed by 26% substitute tax (dividends: 26% withholding by the intermediary on listed shares; capital gains 26% under the declaration, administered (amministrato) or managed (gestito) regimes), 12.5% on Italian government bonds and equivalent (white-list foreign sovereign) bonds. No 2026 change to the 26%/12.5% rates was found.
Confidence: medium (26% and 12.5%), low (2026 verification). Affects units: A4.7 and the Italian lot-method note (see Q20).

**M4 - Carino linking: definition of the k factor.**
Answer: For a period t with portfolio return R_t and benchmark return B_t: k_t = [ln(1+R_t) - ln(1+B_t)] / (R_t - B_t). For the whole horizon with compounded R and B: K = [ln(1+R) - ln(1+B)] / (R - B). Each period's arithmetic effect a_t is scaled to a_t * (k_t / K); the scaled effects sum exactly to R - B. When R_t = B_t the limit is k_t = 1 / (1 + R_t). Origin: D. Carino, "Combining Attribution Effects Over Time", Journal of Performance Measurement (1999) / Russell Research Commentary.
Source: Eagle/Carino-99 documentation (confirms method and log basis, formulas not rendered); formula stated from background knowledge.
Confidence: medium-high (standard result; recommend checking Carino 1999 or Bacon, Practical Portfolio Performance Measurement and Attribution, ch. 8).

---

## Contradictions with syllabus assumptions (summary)
1. French FTT is 0.4%, not 0.3%; Italian rates doubled in Jan 2026 (0.2% on-venue, 0.4% OTC).
2. MAR PDMR threshold default is EUR 20,000 (range 10k-50k), not EUR 15,000.
3. FINRA PDT rule has been replaced (effective 4 Jun 2026), not pending.
4. Reg NMS tick-size/access-fee compliance is now Nov 2027, not Nov 2026.
5. CSDR penalty rates sit in Del. Reg. 2017/389 Annex, not 2018/1229.
6. "Regulation (EU) 2024/2811" is a MiFID II research Directive, not a PRIIPs/UCITS Regulation.
