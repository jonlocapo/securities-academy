"""Validate syllabus/levels/L*.json against SKELETON.md + sources, then write syllabus/syllabus.json and SYLLABUS.md.
Run: python -I tools/build_syllabus.py   (prints only a validation report)"""
import json, re, pathlib, collections

ROOT = pathlib.Path(__file__).resolve().parent.parent
SYL = ROOT / "syllabus"
TEMPLATES = {"mcq", "multi", "cloze", "numeric", "order", "match", "bucket", "journal", "timeline", "table", "spot", "paper"}
BOSS = ["stocks", "bonds", "funds", "order & execution workflows", "brokerage & commissions", "NAV", "PnL",
        "corporate actions", "Lombard", "margin calls", "contract notes", "income accounting", "gain accounting",
        "limits by issuer/group", "dealer execution", "custodian", "transfers", "suitability", "trading restrictions",
        "chart of accounts", "approvals", "client onboarding", "client accounts"]

# skeleton: module id -> (level, prereqs)
skel, level = {}, None
raw_lines = (SYL / "SKELETON.md").read_text(encoding="utf-8").splitlines()
joined = []
for ln in raw_lines:  # join wrapped bullet continuations ("  ..." lines)
    if ln.startswith("  ") and joined and joined[-1].startswith("- "):
        joined[-1] += " " + ln.strip()
    else:
        joined.append(ln)
for line in joined:
    line = line.replace("prereq: none", "none")
    m = re.match(r"### (L\d)", line)
    if m:
        level = m.group(1)
    m = re.match(r"- ([A-Z]\d) .*\((\d+)\) — (.*)$", line)
    if m and level:
        pre = [] if m.group(3).strip() == "none" else [p.strip() for p in m.group(3).split(",")]
        skel[m.group(1)] = {"level": level, "hours": int(m.group(2)), "prereqs": pre}

srcs = {s["id"]: s for s in json.loads((ROOT / "sources" / "sources.json").read_text(encoding="utf-8"))}
levels, problems = [], []
for p in sorted((SYL / "levels").glob("L*.json")):
    try:
        levels.append(json.loads(p.read_text(encoding="utf-8")))
    except Exception as e:
        problems.append(f"{p.name}: invalid JSON {e}")

units, unit_level, order = {}, {}, []
for lv in levels:
    for m in lv.get("modules", []):
        for u in m.get("units", []):
            units[u["id"]] = u; unit_level[u["id"]] = lv["level"]; order.append(u["id"])

stats = collections.Counter(); used_src = collections.Counter(); boss_hit = collections.Counter()
seen_mods = set()
for lv in levels:
    L = lv["level"]
    for m in lv.get("modules", []):
        mid = m["id"]; seen_mods.add(mid)
        sk = skel.get(mid)
        if not sk: problems.append(f"{L}: module {mid} not in skeleton"); continue
        if sk["level"] != L: problems.append(f"{mid}: in {L}, skeleton says {sk['level']}")
        if sorted(m.get("prereqs", [])) != sorted(sk["prereqs"]): problems.append(f"{mid}: prereqs {m.get('prereqs')} != skeleton {sk['prereqs']}")
        mins = 0
        for b in m.get("boss_items", []):
            for k in BOSS:
                if k.lower() in b.lower() or b.lower() in k.lower(): boss_hit[k] += 1
        for u in m.get("units", []):
            stats["units"] += 1; mins += u.get("minutes", 0)
            if not u["id"].startswith(mid + "."): problems.append(f"{u['id']}: id not under {mid}")
            ex = u.get("exercises", [])
            stats["exercises"] += len(ex)
            if not 3 <= len(ex) <= 6: problems.append(f"{u['id']}: {len(ex)} exercises")
            for e in ex:
                if e.get("template") not in TEMPLATES: problems.append(f"{u['id']}: bad template {e.get('template')}")
                stats["t_" + str(e.get("template"))] += 1
            for c in u.get("callbacks", []):
                if c not in units: problems.append(f"{u['id']}: callback {c} unknown")
                elif order.index(c) >= order.index(u["id"]): problems.append(f"{u['id']}: callback {c} is not earlier")
            for s in u.get("sources", []):
                sid = s.get("id")
                if sid not in srcs: problems.append(f"{u['id']}: unknown source {sid}")
                elif srcs[sid].get("skip"): problems.append(f"{u['id']}: skipped source {sid}")
                used_src[sid] += 1
            if not u.get("sources"): problems.append(f"{u['id']}: no sources")
        if abs(mins / 60 - sk["hours"]) > max(1.5, 0.35 * sk["hours"]):
            problems.append(f"{mid}: units total {mins/60:.1f} h vs skeleton {sk['hours']} h")
missing = [k for k, v in skel.items() if k not in seen_mods and v["level"] in {lv['level'] for lv in levels}]
for k in missing: problems.append(f"module {k} missing")

# outputs
(SYL / "syllabus.json").write_text(json.dumps({"levels": levels}, ensure_ascii=False, indent=1), encoding="utf-8")
md = ["# Securities Academy — syllabus map (draft for sign-off)", "",
      "Generated from syllabus/levels/*.json. Structure rules: syllabus/SKELETON.md. Source ids → sources/SOURCES.md.", ""]
tot_h = sum(lv.get("hours", 0) for lv in levels)
md.append(f"**{len(levels)} levels · {sum(len(lv['modules']) for lv in levels)} modules · {stats['units']} units · "
          f"{stats['exercises']} exercises · ~{tot_h} h**\n")
for lv in levels:
    md += [f"## {lv['level']} — {lv['title']} (~{lv.get('hours')} h)", "", lv.get("intro", ""), ""]
    for m in lv["modules"]:
        pre = ", ".join(m.get("prereqs", [])) or "—"
        mg = m.get("minigame")
        md += [f"### {m['id']} {m['title']} · {m.get('hours')} h · track: {m.get('track')} · needs: {pre}", "",
               f"_{m.get('hook','')}_", ""]
        if m.get("boss_items"): md.append(f"Covers (boss's list): {', '.join(m['boss_items'])}  ")
        if mg: md.append(f"🎮 Minigame: **{mg.get('name')}** — {mg.get('variant')}  ")
        md.append("")
        for u in m["units"]:
            ex = ", ".join(sorted({e['template'] for e in u.get('exercises', [])}))
            src = ", ".join(f"{s['id']} {s.get('ref','')}".strip() for s in u.get("sources", []))
            md.append(f"- **{u['id']} {u['title']}** ({u.get('minutes')} min) — " + "; ".join(u.get("objectives", [])))
            md.append(f"  - Example: {u.get('worked_example','')}")
            md.append(f"  - Exercises ({len(u.get('exercises', []))}): {ex}" + (f" · Callbacks: {', '.join(u['callbacks'])}" if u.get("callbacks") else ""))
            md.append(f"  - Sources: {src}")
        md += ["", f"Unit test: {m.get('unit_test','')}", ""]
        if m.get("jurisdiction_notes"): md += [f"Jurisdictions: {m['jurisdiction_notes']}", ""]
    md += [f"**Checkpoint:** {lv.get('checkpoint','')}", ""]
    if lv.get("open_questions"): md += ["Open questions: " + " · ".join(lv["open_questions"]), ""]
md += ["## Coverage of the boss's list", ""] + [f"- {k}: {boss_hit[k]} module(s)" for k in BOSS]
(SYL / "SYLLABUS.md").write_text("\n".join(md), encoding="utf-8")

print(f"levels {len(levels)} | modules {len(seen_mods)}/{len(skel)} | units {stats['units']} | exercises {stats['exercises']}")
print("templates:", {k[2:]: v for k, v in stats.items() if k.startswith('t_')})
print(f"distinct sources used: {len(used_src)} of {len(srcs)}")
print("boss items with 0 modules:", [k for k in BOSS if not boss_hit[k]])
print(f"PROBLEMS ({len(problems)}):"); [print("  ", x) for x in problems[:80]]
