"""Build app/content/index.js (SA.COURSE) from syllabus/syllabus.json + sources/sources.json.
The library/ folder is an authoring reference only: nothing from it (paths, S-ids) reaches the app.
Run after build_syllabus.py and whenever unit content files are added:  python -I tools/build_course.py
app/content/unit-ids.json is APPEND-ONLY (progress-password order) — never reorder or delete entries."""
import json, pathlib, re, hashlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
APP = ROOT / "app"
GAMES = {"Order Book": "orderbook", "Dealer Desk": "dealer", "Settlement Chase": "settlement", "CA Election Desk": "caelection",
         "NAV Strike": "navstrike", "Ledger": "ledger", "Gatekeeper": "gatekeeper", "Margin Hotline": "marginhotline"}
GAME_ORDER = ["orderbook", "dealer", "settlement", "caelection", "navstrike", "ledger", "gatekeeper", "marginhotline",
              "bz_ledger", "bz_orderbook", "bz_dealer", "bz_settle", "bz_gate", "bz_nav", "bz_caelect", "bz_margin"]  # append-only (password order)

def load(p): return json.loads(pathlib.Path(p).read_text(encoding="utf-8-sig"))
def norm(t): return re.sub(r"[^a-z0-9]", "", t.lower())[:50]

syl = load(ROOT / "syllabus" / "syllabus.json")["levels"]
srcs = load(ROOT / "sources" / "sources.json")
by_id = {x["id"]: x for x in srcs if not x.get("skip")}
LINKABLE = {"regulation", "standard", "guide", "web"}
def cite(ref):
    """Plain citation for the unit expansion: 'Hull, Options, Futures and Other Derivatives (11th ed.), Ch. 4'."""
    x = by_id.get(ref["id"])
    if not x: return None
    names = [a.split(",")[0].strip() for a in (x.get("authors") or "").split(";") if a.strip()]
    who = "" if x.get("type") == "regulation" or not names else (" & ".join(names) if len(names) <= 2 else names[0] + " et al.")
    ref = dict(ref, ref=re.sub(r"[,;(]\s*(skim|reference|drills?)( only)?\)?\s*$", "", ref.get("ref", ""), flags=re.I).strip())
    # one readable line: no dashes (UI style), and no part that only repeats another ("FINRA Rulebook, FINRA Rulebook")
    title = re.sub(r"\s*[—–]\s*", ": ", x["title"]) + (f" ({x['edition']} ed.)" if x.get("edition") and x["edition"] not in x["title"] else "")
    words = lambda t: set(re.findall(r"[a-z0-9]+", t.lower()))
    if who and words(who) <= words(title): who = ""
    where = re.sub(r"\s*[—–]\s*", ": ", ref.get("ref", ""))
    # a locator that restates the end of the title keeps only what it adds ("FINRA Rulebook, FINRA Rulebook structure" -> "structure")
    for k in range(min(len(where), len(title)), 3, -1):
        if title.lower().endswith(where[:k].lower()) and (k == len(where) or not where[k].isalnum()): where = where[k:].strip(" ,:;"); break
    if where and (words(where) <= words(title) or where.lower() in ("entire", "whole", "all")): where = ""
    out = {"text": ", ".join(t for t in (who, title, where) if t)}
    if x.get("type") in LINKABLE and x.get("url") and x.get("free") is not False: out["url"] = x["url"]
    return out

ids_file = APP / "content" / "unit-ids.json"
unit_ids = load(ids_file) if ids_file.exists() else []
levels, modules, unit_meta, module_ids = [], {}, {}, []
for lv in syl:
    mids = []
    for m in lv["modules"]:
        mids.append(m["id"]); module_ids.append(m["id"])
        mg = m.get("minigame")
        modules[m["id"]] = {"id": m["id"], "title": m["title"], "track": m.get("track"), "hours": m.get("hours"), "level": lv["level"],
                            "prereqs": m.get("prereqs", []), "hook": m.get("hook", ""), "boss_items": m.get("boss_items", []),
                            "units": [u["id"] for u in m["units"]], "unit_test": m.get("unit_test", ""),
                            "minigame": ({"key": GAMES.get(mg["name"]), "name": mg["name"], "variant": mg.get("variant", "")} if mg else None)}
        for u in m["units"]:
            if u["id"] not in unit_ids: unit_ids.append(u["id"])
            built = (APP / "content" / lv["level"] / f"{u['id']}.js").exists()
            unit_meta[u["id"]] = {"id": u["id"], "title": u["title"], "minutes": u.get("minutes"), "module": m["id"], "level": lv["level"],
                                  "objectives": u.get("objectives", []), "callbacks": u.get("callbacks", []),
                                  "reading": [c for c in (cite(r) for r in u.get("sources", [])) if c], "built": built}
    levels.append({"id": lv["level"], "title": lv["title"], "hours": lv.get("hours"), "intro": lv.get("intro", ""),
                   "checkpoint": lv.get("checkpoint", ""), "modules": mids})

ids_file.parent.mkdir(parents=True, exist_ok=True)
ids_file.write_text(json.dumps(unit_ids, indent=0), encoding="utf-8")
def stamp_assets():
    """Cache-busting: hash every app file and stamp ?v=<hash> onto the script/style links in index.html, so a browser
    never keeps serving an old copy after a rebuild. The same stamp goes into SA.COURSE.build for lazily loaded units."""
    h = hashlib.sha1()
    for p in sorted(APP.rglob("*")):
        if p.is_file() and p.suffix in (".js", ".css", ".html") and "vendor" not in p.parts and p.name != "index.js":
            h.update(p.relative_to(APP).as_posix().encode()); h.update(p.read_bytes())
    for p in sorted((APP / "content").rglob("*.js")):
        if p.name != "index.js": h.update(p.read_bytes())
    return h.hexdigest()[:10]
build = stamp_assets()
course = {"build": build, "levels": levels, "modules": modules, "unitMeta": unit_meta, "unitIds": unit_ids,
          "moduleIds": module_ids, "levelIds": [l["id"] for l in levels], "games": GAME_ORDER}
(APP / "content" / "index.js").write_text("/* GENERATED by tools/build_course.py — do not edit */\nSA.COURSE = "
                                          + json.dumps(course, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
print(f"levels {len(levels)} modules {len(modules)} units {len(unit_meta)} built {sum(u['built'] for u in unit_meta.values())} "
      f"citations {sum(len(u['reading']) for u in unit_meta.values())}")
for idx in (APP / "index.html", APP / "demo.html"):  # both pages load the same engine
    if not idx.exists(): continue
    html = re.sub(r'((?:src|href)="(?:js|css|content)/[^"?]+)(?:\?v=[0-9a-f]+)?"', lambda m: m.group(1) + '?v=' + build + '"', idx.read_text(encoding="utf-8"))
    idx.write_text(html, encoding="utf-8")
print("asset stamp", build)
