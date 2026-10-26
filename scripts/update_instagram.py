#!/usr/bin/env python3
"""Holt Erics neuste Instagram-Beiträge über Behold (behold.so) und legt sie auf der Webseite ab.

Behold verbindet sich mit dem Instagram-Konto @ericsskf und stellt einen JSON-Feed bereit.
Dieses Skript lädt den Feed jede Stunde (GitHub Action .github/workflows/instagram.yml),
speichert die Bilder in images/instagram/ und die Angaben in assets/instagram.json.
Die Webseite lädt dadurch nichts direkt von Instagram oder Behold.

Feed-Adresse: unten bei FEED_URL eintragen (aus Behold: Feed → «JSON» → Feed URL).
Ist FEED_URL leer oder schlägt etwas fehl, bleibt die Seite unverändert.
"""
import json, pathlib, re, sys, time, urllib.request

FEED_URL = "https://feeds.behold.so/pvzxmjA1UwxrMH4jIfBY"  # Behold-Feed «Webseite erictimmer.ch»
MAX_POSTS = 6

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "instagram.json"
IMG = ROOT / "images" / "instagram"


def get(url, binary=False):
    last = None
    for i in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; erictimmer.ch instagram sync)"})
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read()
                return data if binary else data.decode("utf-8", "replace")
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(5 * (i + 1))
    raise SystemExit(f"Nicht erreichbar: {url} ({last})")


def pick_size(p):
    sizes = p.get("sizes") or {}
    for k in ("medium", "large", "small", "full"):
        s = sizes.get(k) or {}
        if s.get("mediaUrl"):
            return s["mediaUrl"], s.get("width"), s.get("height")
    url = p.get("thumbnailUrl") if p.get("mediaType") == "VIDEO" else p.get("mediaUrl")
    return url, None, None


def main():
    src = sys.argv[2] if len(sys.argv) == 3 and sys.argv[1] == "--file" else None
    if not src and not FEED_URL:
        print("Noch keine Behold-Feed-Adresse eingetragen, nichts zu tun.")
        return
    feed = json.loads(pathlib.Path(src).read_text(encoding="utf-8") if src else get(FEED_URL))
    posts = feed.get("posts") if isinstance(feed, dict) else feed
    if not isinstance(posts, list) or not posts:
        raise SystemExit("Feed enthält keine Beiträge")
    IMG.mkdir(parents=True, exist_ok=True)
    out, keep = [], set()
    for p in posts[:MAX_POSTS]:
        pid = re.sub(r"[^\w-]", "", str(p.get("id", "")))
        url, w, h = pick_size(p)
        if not pid or not url or not p.get("permalink"):
            continue
        ext = ".webp" if ".webp" in url.split("?")[0] or "behold" in url else ".jpg"
        name = pid + ext
        keep.add(name)
        f = IMG / name
        if not f.exists():
            data = pathlib.Path(url).read_bytes() if src and not url.startswith("http") else get(url, binary=True)
            if len(data) < 500:
                raise SystemExit(f"Bild zu klein / fehlerhaft: {url}")
            f.write_bytes(data)
        out.append({
            "id": pid, "permalink": p["permalink"], "type": p.get("mediaType", "IMAGE"),
            "reel": bool(p.get("isReel")), "img": f"images/instagram/{name}", "w": w, "h": h,
            "caption": (p.get("prunedCaption") or p.get("caption") or "").strip()[:300],
            "date": str(p.get("timestamp", ""))[:10],
        })
    if not out:
        raise SystemExit("Keine brauchbaren Beiträge im Feed")
    for old in IMG.iterdir():
        if old.is_file() and old.name not in keep:
            old.unlink()
    d = {"username": feed.get("username", "ericsskf") if isinstance(feed, dict) else "ericsskf", "posts": out}
    old = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else None
    if old == d:
        print("Instagram unverändert.")
        return
    OUT.write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"Instagram aktualisiert: {len(out)} Beiträge")


if __name__ == "__main__":
    main()
