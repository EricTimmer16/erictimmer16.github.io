#!/usr/bin/env python3
"""Holt den WKF-Turnierkalender und schreibt die Turniere, bei denen Eric am Start ist, nach assets/calendar.json.

Zur Auswahl stehen: Karate 1 Series A, Karate 1 Premier League, Europameisterschaft
(EKF Senior), Senior-Weltmeisterschaft und die WM-Quali (Qualification Phase Event).
Quelle: https://www.wkf.net/calendar (die Daten stehen schon im ausgelieferten HTML),
Ort und genaues Datum kommen von der Detailseite jedes Turniers.
Läuft täglich per GitHub Action (.github/workflows/calendar.yml).
Schlägt etwas fehl oder sieht die Seite anders aus als erwartet, wird NICHTS verändert.

Dazu kommen die Turniere der Swiss Karate Federation (Swiss Karate League, Schweizermeisterschaft)
aus scripts/skf_events.json, alle mit «Ich bin am Start» (die SKF-Agenda ist nicht abrufbar, deshalb von Hand gepflegt).

Nur Turniere, bei denen Eric am Start ist, kommen in den Kalender: Turnier-Nummer (die Zahl in der WKF-Adresse nach «!/»)
in scripts/eric_am_start.txt eintragen, eine pro Zeile.
"""
import datetime, html, json, pathlib, re, sys, time, urllib.request

BASE = "https://www.wkf.net"
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "calendar.json"
MARKS = ROOT / "scripts" / "eric_am_start.txt"
SKF = ROOT / "scripts" / "skf_events.json"
SKF_URL = "https://www.karate.ch/service/agenda/"
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August",
          "September", "October", "November", "December"]
MONTH_NO = {m: i for i, m in enumerate(MONTHS, 1)}


def fetch(url):
    last = None
    for i in range(4):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (compatible; erictimmer.ch calendar sync)",
                "Accept": "text/html,*/*"})
            with urllib.request.urlopen(req, timeout=40) as r:
                return r.read().decode("utf-8", "replace")
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(5 * (i + 1))
    raise SystemExit(f"WKF nicht erreichbar ({url}): {last}")


def clean(s):
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


TOKEN = re.compile(
    r'<div class="container h1[^"]*">\s*(?P<year>\d{4})\s*</div>'
    r'|<header class="text-center h5[^"]*">\s*(?P<month>[A-Za-z]+)\s*</header>'
    r'|<td class="[^"]*fw-semibold[^"]*">\s*(?P<days>[^<]*?)\s*</td>\s*<td[^>]*>\s*'
    r'<a [^>]*href="(?P<href>/(?P<cat>[a-z\-]+)/championship/!/(?P<id>\d+)/[^"]*)"[^>]*>(?P<name>[^<]*)</a>',
    re.S)


def parse_grid(page):
    """Jahr/Monat/Tage/Name/Adresse aller Turniere der Monatsübersicht (einmal pro Turnier)."""
    year = month = None
    events = {}
    for m in TOKEN.finditer(page):
        if m.group("year"):
            year = int(m.group("year"))
        elif m.group("month"):
            month = MONTH_NO.get(m.group("month").capitalize())
        elif year and month:
            eid = int(m.group("id"))
            if eid in events:  # mehrmonatige Turniere stehen in beiden Monaten
                continue
            d = re.match(r"^(\d+)(?:\s*-\s*(\d+))?$", clean(m.group("days")))
            if not d:
                continue
            d1 = int(d.group(1))
            d2 = int(d.group(2) or d1)
            start = datetime.date(year, month, d1)
            em, ey = month, year
            if d2 < d1:
                em += 1
                if em == 13:
                    em, ey = 1, year + 1
            end = datetime.date(ey, em, d2)
            events[eid] = {
                "id": eid, "cat_path": m.group("cat"), "href": m.group("href"),
                "name": re.sub(r"^\d{4}\s+", "", clean(m.group("name"))),
                "start": start, "end": end}
    return events


def categorize(cat_path, name):
    n = name.lower()
    if cat_path == "karate-one":
        if "youth" in n:
            return None
        if "series a" in n:
            return "series-a"
        if "premier league" in n:
            return "premier-league"
    if cat_path == "continental-championships":
        if "ekf" in n and "senior" in n and not re.search(r"cadet|junior|u21", n):
            return "em"
    if cat_path == "world-championships" and "senior" in n:
        return "quali" if "qualif" in n else "wm"
    return None


DATE = re.compile(r"^([A-Za-z]+) (\d+)(?: - (?:([A-Za-z]+) )?(\d+))?, (\d{4})$")


def parse_detail(page):
    """Ort und exaktes Datum von der Detailseite. Gibt (city, start, end) zurück, fehlendes = None."""
    city = None
    m = re.search(r'class="[^"]*\bcity\b[^"]*">\s*([^<]*?)\s*<', page)
    if m:
        city = clean(m.group(1)) or None
    start = end = None
    for m in re.finditer(r'<span class="[^"]*fw-bold[^"]*">\s*([^<]*?)\s*</span>', page):
        d = DATE.match(clean(m.group(1)))
        if not d or d.group(1) not in MONTH_NO:
            continue
        m1 = MONTH_NO[d.group(1)]
        d1 = int(d.group(2))
        d2 = int(d.group(4) or d1)
        m2 = MONTH_NO.get(d.group(3), m1) if d.group(3) else m1
        y2 = int(d.group(5))
        y1 = y2 - 1 if m1 > m2 else y2
        try:
            start, end = datetime.date(y1, m1, d1), datetime.date(y2, m2, d2)
        except ValueError:
            start = end = None
        break
    return city, start, end


def read_marks():
    ids = set()
    if MARKS.exists():
        for line in MARKS.read_text(encoding="utf-8").splitlines():
            line = line.split("#")[0].strip()
            if line.isdigit():
                ids.add(int(line))
    return ids


def build(grid, today, fetch_detail):
    marks = read_marks()
    out = []
    for e in grid.values():
        cat = categorize(e["cat_path"], e["name"])
        if not cat or e["end"] < today or e["id"] not in marks:
            continue  # nur Turniere, bei denen Eric am Start ist (scripts/eric_am_start.txt)
        city, start, end = fetch_detail(BASE + e["href"])
        start, end = start or e["start"], end or e["end"]
        if end < today:
            continue
        item = {"id": e["id"], "cat": cat, "name": e["name"], "city": city or "",
                "start": start.isoformat(), "end": end.isoformat(), "url": BASE + e["href"]}
        if e["id"] in marks:
            item["eric"] = True
        out.append(item)
    out.sort(key=lambda x: (x["start"], x["id"]))
    return out


def skf_events(today):
    """Swiss Karate League und Schweizermeisterschaft aus scripts/skf_events.json (von Hand gepflegt)."""
    if not SKF.exists():
        return []
    out = []
    for e in json.loads(SKF.read_text(encoding="utf-8")).get("events", []):
        start = datetime.date.fromisoformat(e["start"])
        end = datetime.date.fromisoformat(e.get("end") or e["start"])
        if end < today:
            continue
        out.append({"id": 800000000 + int(start.strftime("%Y%m%d")), "cat": e["cat"], "name": e["name"],
                    "city": e.get("city", ""), "start": start.isoformat(), "end": end.isoformat(),
                    "url": e.get("url") or SKF_URL, "src": e.get("src", "skf"), "eric": True})
    return out


def main():
    today = datetime.date.today()
    grid = parse_grid(fetch(BASE + "/calendar"))
    if len(grid) < 30:
        raise SystemExit(f"Kalender sieht anders aus als erwartet ({len(grid)} Turniere gefunden), nichts geändert")

    def fetch_detail(url):
        try:
            return parse_detail(fetch(url))
        except SystemExit as e:
            print("Detailseite übersprungen:", e, file=sys.stderr)
            return None, None, None

    events = build(grid, today, fetch_detail)
    if not events:
        raise SystemExit("Keine passenden Turniere gefunden, nichts geändert")
    events = sorted(events + skf_events(today), key=lambda x: (x["start"], x["id"]))
    old = None
    if OUT.exists():
        try:
            old = json.loads(OUT.read_text(encoding="utf-8")).get("events")
        except ValueError:
            old = None
    if old == events:
        print(f"Keine Änderung ({len(events)} Turniere).")
        return
    data = {"source": BASE + "/calendar", "generated": today.isoformat(), "events": events}
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{len(events)} Turniere geschrieben, nächstes: {events[0]['name']} ({events[0]['start']}).")


if __name__ == "__main__":
    main()
