#!/usr/bin/env python3
"""Holt Erics Profil vom Schweizer Karateverband (SKF) und speichert es in assets/skf.json.

Quelle: https://www.karate.ch/nationalkader/athlet/timmer-eric/ (normale Webseite, kein API).
Gelesen werden: Kaderangaben, Medaillenbilanz (Gold/Silber/Bronze/Starts), Resultat-Tabelle
und Kaderzugehörigkeit. Die Webseite zeigt die Daten aus skf.json auf erfolge.html an.
Läuft täglich per GitHub Action (.github/workflows/skf.yml). Schlägt etwas fehl oder sieht
die SKF-Seite anders aus, wird NICHTS verändert.

Test ohne Internet:  python3 scripts/update_skf.py --file gespeicherte-seite.html
"""
import datetime, html, json, pathlib, re, sys, time, urllib.request

URL = "https://www.karate.ch/nationalkader/athlet/timmer-eric/"
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "skf.json"

MON = {"jan": 1, "feb": 2, "mär": 3, "mrz": 3, "mar": 3, "apr": 4, "mai": 5, "jun": 6, "jul": 7,
       "aug": 8, "sep": 9, "okt": 10, "oct": 10, "nov": 11, "dez": 12, "dec": 12}


def fetch(url):
    last = None
    for i in range(4):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (compatible; erictimmer.ch SKF sync)",
                "Accept": "text/html,*/*", "Accept-Language": "de-CH,de;q=0.9"})
            with urllib.request.urlopen(req, timeout=40) as r:
                return r.read().decode("utf-8", "replace")
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(5 * (i + 1))
    raise SystemExit(f"karate.ch nicht erreichbar: {last}")


def text(s):
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def block(page, cls, tag=r"\w+"):
    """Inhalt des ersten Elements mit dieser Klasse (einfach, reicht für diese Seite)."""
    m = re.search(rf'<({tag})[^>]*class="[^"]*\b{re.escape(cls)}\b[^"]*"[^>]*>', page)
    if not m:
        return None
    t = m.group(1)
    i, depth, pos = m.end(), 1, m.end()
    for mm in re.finditer(rf"<(/?){t}\b[^>]*>", page[pos:]):
        depth += -1 if mm.group(1) else 1
        if depth == 0:
            return page[i:pos + mm.start()]
    return None


def date(s):
    m = re.match(r"(\d{1,2})\.\s*([A-Za-zäÄ]+)\.?\s*(\d{4})", s.strip())
    if not m:
        raise SystemExit(f"Datum nicht lesbar: {s!r}")
    mon = MON.get(m.group(2).lower()[:3])
    if not mon:
        raise SystemExit(f"Monat nicht lesbar: {s!r}")
    return f"{int(m.group(3)):04d}-{mon:02d}-{int(m.group(1)):02d}"


def parse(page):
    i = page.find('class="skf-prof"')
    head = block(page, "skf-prof", "div")
    if i < 0 or not head or "TIMMER" not in head.upper():
        raise SystemExit("Erics SKF-Profil nicht gefunden (Seitenaufbau geändert?)")
    prof = page[i:]  # Kopf und die folgenden Abschnitte (Resultate, Kader, Graduierung)
    d = {"source": URL}
    club = block(prof, "skf-prof__club")
    d["club"] = text(club) if club else ""
    facts = {}
    for dt, dd in re.findall(r"<dt[^>]*>(.*?)</dt>\s*<dd[^>]*>(.*?)</dd>", block(prof, "skf-prof__facts") or "", re.S):
        facts[text(dt)] = text(dd)
    d["facts"] = facts
    med = block(prof, "skf-prof__medals") or ""
    nums = {}
    for n, lab in re.findall(r"<b[^>]*>\s*(\d+)\s*</b>\s*([^<]+)", med):
        nums[lab.strip().lower()] = int(n)
    d["medals"] = {"gold": nums.get("gold", 0), "silver": nums.get("silber", 0),
                   "bronze": nums.get("bronze", 0), "starts": nums.get("starts", 0)}
    tbl = block(prof, "skf-proftable", "div") or ""
    res = []
    for row in re.findall(r"<tr[^>]*>(.*?)</tr>", tbl, re.S):
        cells = [text(c) for c in re.findall(r"<td[^>]*>(.*?)</td>", row, re.S)]
        if len(cells) < 4:
            continue
        place = re.sub(r"\D", "", cells[0])
        res.append({"place": int(place) if place else None, "tournament": cells[1],
                    "category": cells[2], "date": date(cells[3])})
    d["results"] = res
    hist = []
    for y, meta in re.findall(r'skf-prof__year[^>]*>\s*(\d{4})\s*<.*?skf-prof__histmeta[^>]*>(.*?)</span>', block(prof, "skf-prof__hist", "ul") or "", re.S):
        hist.append({"year": int(y), "meta": text(meta)})
    d["history"] = hist
    dan = block(prof, "skf-dangrad__list", "ul")
    d["dan"] = text(dan).replace(" · ", ", ") if dan else ""
    # Plausibilität
    m = d["medals"]
    if not res:
        raise SystemExit("Keine Resultate gefunden")
    if m["starts"] and (m["gold"] + m["silver"] + m["bronze"] > m["starts"]):
        raise SystemExit(f"Unplausible Medaillen: {m}")
    if not facts.get("Kaderstufe"):
        raise SystemExit("Kaderangaben fehlen")
    return d


def main():
    if len(sys.argv) == 3 and sys.argv[1] == "--file":
        page = pathlib.Path(sys.argv[2]).read_text(encoding="utf-8")
    else:
        page = fetch(URL)
    d = parse(page)
    old = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    keep = {k: v for k, v in old.items() if k != "checked"}
    if keep == d:
        print("SKF-Daten unverändert.")
        return
    d["checked"] = datetime.date.today().isoformat()
    OUT.write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    m = d["medals"]
    print(f"SKF-Daten aktualisiert: {m['gold']} Gold, {m['silver']} Silber, {m['bronze']} Bronze, {m['starts']} Starts, {len(d['results'])} Resultate")


if __name__ == "__main__":
    main()
