#!/usr/bin/env python3
"""Holt Erics WKF-Ranking und schreibt es in die Webseite.

Quelle: öffentliche Profil-Schnittstelle der WKF (liefert ein HTML-Fragment mit
Rang, Punkten und Kämpfen). Die Zahlen werden an allen Stellen der Seite ersetzt
(Texte in DE/EN/FR, Meta-Beschreibungen, Rang-Marker). Läuft täglich per GitHub
Action (.github/workflows/ranking.yml). Schlägt etwas fehl, wird NICHTS verändert.
"""
import datetime, html, json, pathlib, re, sys, time, urllib.request

ATHLETE = "SUI02254"
URL = f"https://www.wkf.net/api/Sportdata/athletes/profile/{ATHLETE}"
ROOT = pathlib.Path(__file__).resolve().parent.parent

MONTHS = {
    "de": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    "en": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "fr": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
}


def fetch(url):
    last = None
    for i in range(4):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (compatible; erictimmer.ch ranking sync)",
                "Accept": "text/html,*/*"})
            with urllib.request.urlopen(req, timeout=40) as r:
                return r.read().decode("utf-8", "replace")
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(5 * (i + 1))
    raise SystemExit(f"WKF nicht erreichbar: {last}")


def parse(frag):
    if "TIMMER" not in frag.upper() or ATHLETE not in frag:
        raise SystemExit("Antwort enthält Erics Profil nicht")
    m = re.search(r'<span class="rank medal[^"]*"[^>]*>\s*(\d+)\s*</span>\s*<span class="fw-bold fs-2">RANK</span>\s*<span class="fs-3">\s*([\d.,\' ]+?)\s*points\s*</span>', frag)
    if not m:
        raise SystemExit("Rang/Punkte nicht gefunden (Seitenaufbau der WKF geändert?)")
    rank = int(m.group(1))
    points = int(re.sub(r"\D", "", m.group(2)))
    mb = re.search(r"Total Bouts:\s*(\d+)", frag)
    cat = re.search(r'fs-4 text-primary fw-bold">\s*([^<]+?)\s*</span>', frag)
    if not mb or not cat:
        raise SystemExit("Kämpfe/Kategorie nicht gefunden")
    category = html.unescape(cat.group(1))
    if "Male Kumite" not in category or "60" not in category:
        raise SystemExit(f"Unerwartete Kategorie: {category}")
    if not (1 <= rank <= 5000) or points <= 0:
        raise SystemExit(f"Unplausible Werte: Rang {rank}, Punkte {points}")
    return rank, points, int(mb.group(1)), category


def num(n, lang):
    if n < 1000:
        return str(n)
    s = f"{n:,}"
    return {"de": s.replace(",", "’"), "en": s, "fr": s.replace(",", " ")}[lang]


def apply(text, rank, points, bouts, today):
    de_m, en_m, fr_m = (f"{MONTHS[l][today.month - 1]} {today.year}" for l in ("de", "en", "fr"))
    fr_ord = "er" if rank == 1 else "e"
    pos = min(max(rank, 1), 100)
    subs = [
        # Rang in Texten
        (r"(Nummer )\d+( der WKF-Weltrangliste)", rf"\g<1>{rank}\g<2>"),
        (r"(Nummer )\d+( der Welt\.)", rf"\g<1>{rank}\g<2>"),
        (r"(world number )\d+(\.)", rf"\g<1>{rank}\g<2>"),
        (r"(number )\d+( in the WKF world ranking)", rf"\g<1>{rank}\g<2>"),
        (r"(numéro )\d+( mondial\.)", rf"\g<1>{rank}\g<2>"),
        (r"(numéro )\d+( du classement mondial WKF)", rf"\g<1>{rank}\g<2>"),
        (r"(Platz )\d+(\. Und weiter nach oben\.)", rf"\g<1>{rank}\g<2>"),
        (r"(No\. )\d+(\. And still climbing\.)", rf"\g<1>{rank}\g<2>"),
        (r"\d+<sup>e(?:r)?</sup>( place\. Et ce n’est pas fini\.)", rf"{rank}<sup>{fr_ord}</sup>\g<1>"),
        (r"(Heute: Nr\. )\d+", rf"\g<1>{rank}"),
        (r"(Today: No\. )\d+", rf"\g<1>{rank}"),
        (r"(Aujourd’hui : n° )\d+", rf"\g<1>{rank}"),
        # grosse Rangzahl
        (r'(<small>Nr\.</small><span class="count" data-to=")\d+(">)\d+(</span>)', rf"\g<1>{rank}\g<2>{rank}\g<3>"),
        # Punkte + Stand
        (r"\d[\d’.,\u202f]* Ranglistenpunkte · Stand [^<'\"]+?\d{4}", f"{num(points, 'de')} Ranglistenpunkte · Stand {de_m}"),
        (r"\d[\d’.,\u202f]* ranking points · as of [A-Za-z]+ \d{4}", f"{num(points, 'en')} ranking points · as of {en_m}"),
        (r"\d[\d’.,\u202f]* points au classement · état [^'<\"]+?\d{4}", f"{num(points, 'fr')} points au classement · état {fr_m}"),
        # Kämpfe
        (r'(data-to=")\d+(">)\d+(</span> (?:Kämpfe|bouts|combats))', rf"\g<1>{bouts}\g<2>{bouts}\g<3>"),
        # Fusszeile
        (r"(WKF-Athletenprofil \(Stand )[^)]+?\d{4}(\))", rf"\g<1>{de_m}\g<2>"),
        (r"(WKF athlete profile \(as of )[^)]+?\d{4}(\))", rf"\g<1>{en_m}\g<2>"),
        (r"(profil d’athlète WKF \(état )[^)]+?\d{4}(\))", rf"\g<1>{fr_m}\g<2>"),
        # Rang-Marker (JS + CSS)
        (r"(el === tb\) me\.style\.left = ')\d+(%')", rf"\g<1>{pos}\g<2>"),
        (r"(läuft beim Einblenden von 100 auf )\d+", rf"\g<1>{rank}"),
        (r"(#me \{ left: )\d+(%)", rf"\g<1>{pos}\g<2>"),
    ]
    for pat, rep in subs:
        text = re.sub(pat, rep, text)
    return text


def main():
    rank, points, bouts, category = parse(fetch(URL))
    today = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=2))).date()
    print(f"WKF: Rang {rank}, {points} Punkte, {bouts} Kämpfe ({category})")
    changed = []
    for p in sorted(list(ROOT.glob("*.html")) + [ROOT / "assets/site.js", ROOT / "assets/site.css"]):
        old = p.read_text(encoding="utf-8")
        new = apply(old, rank, points, bouts, today)
        if new != old:
            p.write_text(new, encoding="utf-8")
            changed.append(p.name)
    data = {"athlete": ATHLETE, "category": category, "rank": rank, "points": points, "bouts": bouts,
            "month": f"{today.year}-{today.month:02d}"}
    jp = ROOT / "assets/ranking.json"
    old_json = jp.read_text(encoding="utf-8") if jp.exists() else ""
    new_json = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    if new_json != old_json:
        jp.write_text(new_json, encoding="utf-8")
        changed.append("ranking.json")
    if any(c in ("site.js", "site.css") for c in changed):
        v = datetime.datetime.now().strftime("%Y%m%d%H%M")
        for h in ROOT.glob("*.html"):
            t = h.read_text(encoding="utf-8")
            n = re.sub(r"(site\.(?:js|css))\?v=\d+", rf"\1?v={v}", t)
            if n != t:
                h.write_text(n, encoding="utf-8")
    print("Geändert:", ", ".join(changed) if changed else "nichts (Seite ist aktuell)")


if __name__ == "__main__":
    sys.exit(main())
