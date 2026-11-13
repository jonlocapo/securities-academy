/* Blitz: Ledger. An event on a client portfolio's books: pick the right debit / credit pair. Reference game for the
   blitz contract (see blitz.js). Accounts follow units A1.1-A1.5. */
(function (root) {
  'use strict';
  const SA = root.SA;
  const NAMES = ['ENI', 'Enel', 'Siemens', 'TotalEnergies', 'ASML', 'Allianz', 'Iberdrola', 'Nestle', 'BNP Paribas', 'Intesa Sanpaolo'];
  const BONDS = ['BTP 2031', 'Bund 2030', 'OAT 2033', 'EIB 2029', 'Bonos 2032'];
  // each event: [min item number, prompt(r, f), debit, credit, plausible wrong accounts]
  const EV = [
    [0, (r, f) => 'The owner pays ' + f.eur(r.int(5, 200) * 1000, 0) + ' into the portfolio.', 'Cash', 'Capital', ['Income', 'Payable to broker']],
    [0, (r, f) => 'Buys ' + r.int(1, 20) * 100 + ' ' + r.pick(NAMES) + ' for ' + f.eur(r.int(2, 90) * 1000, 0) + ', paid the same day.', 'Securities', 'Cash', ['Fees expense', 'Capital']],
    [0, (r, f) => 'Cash dividend of ' + f.eur(r.int(50, 3000), 0) + ' from ' + r.pick(NAMES) + ' arrives.', 'Cash', 'Dividend income', ['Securities', 'Capital']],
    [0, (r, f) => 'Custody fee of ' + f.eur(r.int(20, 600), 0) + ' is debited from the account.', 'Fees expense', 'Cash', ['Securities', 'Capital']],
    [3, (r, f) => 'Coupon of ' + f.eur(r.int(100, 5000), 0) + ' on the ' + r.pick(BONDS) + ' is paid.', 'Cash', 'Interest income', ['Dividend income', 'Securities']],
    [3, (r, f) => 'The owner withdraws ' + f.eur(r.int(1, 50) * 1000, 0) + '.', 'Capital', 'Cash', ['Fees expense', 'Income']],
    [6, (r, f) => 'Trade date: buys ' + r.pick(NAMES) + ' shares for ' + f.eur(r.int(5, 80) * 1000, 0) + '. Settlement is T+2.', 'Securities', 'Payable to broker', ['Cash', 'Capital']],
    [6, (r, f) => 'Settlement day: the purchase booked on trade date for ' + f.eur(r.int(5, 80) * 1000, 0) + ' settles.', 'Payable to broker', 'Cash', ['Securities', 'Receivable from broker']],
    [9, (r, f) => 'Settlement day: proceeds of ' + f.eur(r.int(5, 80) * 1000, 0) + ' from a sale booked on trade date arrive.', 'Cash', 'Receivable from broker', ['Securities', 'Payable to broker']],
    [9, (r, f) => 'Ex-date: a dividend of ' + f.eur(r.int(50, 3000), 0) + ' is earned but will be paid next week.', 'Dividend receivable', 'Dividend income', ['Cash', 'Securities']],
  ];
  SA.blitz.register({
    key: 'bz_ledger', name: 'Ledger Blitz', icon: 'book',
    blurb: 'An event hits the books. Pick the debit and the credit.',
    item(r, f, k) {
      const [, prompt, dr, cr, wrongs] = r.pick(EV.filter((e) => e[0] <= k));
      const pair = (a, b) => '**Dr** ' + a + ' / **Cr** ' + b;
      const opts = [pair(dr, cr), pair(cr, dr), pair(dr, r.pick(wrongs)), pair(r.pick(wrongs), cr)];
      const choices = opts.filter((c, i) => opts.indexOf(c) === i).slice(0, 4);
      return { prompt: prompt(r, f), choices, answer: 0 };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
