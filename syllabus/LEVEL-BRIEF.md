# Brief for syllabus-detailing agents

You detail ONE level of a self-study, Khan-Academy-style gamified course on investment securities. Read first:
1. C:\Users\cristiano.t\Documents\securities-academy\DECISIONS.md — learner profile & rules (EU-based structured-products
   specialist; good Italian high-school maths, weak calculus; goal specialist + PhD-entry; 5–8 h/week; no coding;
   EU deepest, then US, then UK/CH, SG/HK sidebars).
2. C:\Users\cristiano.t\Documents\securities-academy\syllabus\SKELETON.md — the structure you must follow (module ids,
   hours, prerequisites, exercise templates, minigames, gamification). Do not add, drop or rename modules.
3. C:\Users\cristiano.t\Documents\securities-academy\syllabus\source-index.tsv — the ONLY sources you may cite (by id).
   You may open files under C:\Users\cristiano.t\Documents\securities-academy\library\ (PDF tables of contents) to give
   precise chapter/section/article references, but this is optional — use your knowledge of the books where reliable.

This is a SYLLABUS MAP, not lessons: plan units, outcomes, exercises and sources. Write in your own words; never copy text
from the sources (cite chapter/section numbers only). Keep facts correct as of Nov 2026 (e.g. US T+1 since May 2024;
EU T+1 Reg (EU) 2025/2075 applies 11 Oct 2027; RTS 27/28 reports deleted by Dir 2024/790; EU PFOF ban fully applies
since 30 Jun 2026; Retail Investment Strategy not yet adopted as of Nov 2026). If unsure of a fact, flag it in "open_questions".

Pedagogy: progressive (concrete example → concept → formalism), lots of small exercises, every exercise 5–10 min,
practical worked examples with realistic numbers (EUR, EU market conventions first), callbacks to earlier units, and a
minigame where a concept is better drilled in a simulated environment. Each module should feel like a game level:
a short story/scenario hook (e.g. "your first week on the custody desk") is welcome.

## Output
Write ONE JSON file (UTF-8, valid JSON) to the path given in your task:
{
  "level": "L3",
  "title": "...",
  "hours": 39,
  "intro": "2–3 sentences: what the learner can do after this level",
  "modules": [
    {
      "id": "T2", "title": "...", "track": "ops|theory", "hours": 6, "prereqs": ["T1"],
      "boss_items": ["order & execution workflows"],           // which items of the boss's list it covers (may be [])
      "hook": "1–2 sentence scenario",
      "units": [
        {
          "id": "T2.1", "title": "...", "minutes": 45,
          "objectives": ["Learner can ...", "..."],            // 2–4, measurable verbs
          "key_concepts": ["...", "..."],
          "worked_example": "one concrete example with numbers/case, 1–3 sentences",
          "exercises": [                                        // 3–6 per unit
            {"template": "numeric", "task": "what the learner does", "params": "what varies between generated instances"}
          ],
          "callbacks": ["Q1.3", "F1.2"],                       // earlier unit ids revisited here (may be [])
          "sources": [{"id": "S123", "ref": "Ch. 4 / Art. 27 / pp. 10–25", "use": "core|deeper|reference"}]
        }
      ],
      "minigame": {"name": "Order Book", "variant": "what is drilled here"} | null,
      "unit_test": "what the end-of-module test covers, 1 sentence",
      "jurisdiction_notes": "EU first; what US/UK/CH/SG/HK differences are mentioned" | null
    }
  ],
  "checkpoint": "level boss-quiz: scope and format, 2 sentences",
  "open_questions": ["facts to double-check", "..."]
}
Unit ids are <module>.<n>. Callbacks may only point to units of EARLIER levels or earlier units of the same module/level
whose ids follow the same pattern (you may guess earlier-level unit ids as <module>.1…<module>.n using that module's
skeleton topics in order). Validate the JSON parses (python -I -c "import json;json.load(open(r'<path>',encoding='utf-8'))").
Reply ONLY: modules × units count, total exercises, and up to 3 open questions (max 80 words).
