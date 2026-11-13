# Securities Academy

A gamified, self-paced course on securities: market arithmetic, instruments, the trade lifecycle, client accounts,
bookkeeping and probability, building up to operations and the post-trade chain. It is a static site with no server and no
build step at run time. Progress is kept in the browser and can be carried between devices with a progress code.

- **Course:** `app/index.html` (open it directly, or via the GitHub Pages site)
- **Demo:** `app/demo.html`, an interactive slideshow with a sample learner (nothing is saved)

Version 0.1.0 contains Level 1 (Market Literacy).

## Working on it

- Course data is generated from `syllabus/` by `python tools/build_course.py` (run after every change; it also stamps cache-busting versions).
- Checks: `node tools/validate-content.js --core`, `node tools/validate-content.js app/content/L1`, `node tools/smoke-ui.js`, `node tools/smoke-ledger.js`, `node tools/validate-blitz.js`.
- Publishing: commit on `main`, then `sh tools/publish-pages.sh` updates the `gh-pages` branch that GitHub Pages serves.
- Authoring rules: `app/CONTENT-CONTRACT.md`. Project decisions and status: `DECISIONS.md`, `PROGRESS.md`.

The reference library used to write the lessons is not part of this repository.
