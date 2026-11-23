"""Run before every commit that changes docs/: gives the site a new version number.

Updates window.BUILD and the ?v= of the data scripts in docs/index.html, and docs/version.json.
Browsers that still show an old copy see the new number in version.json and reload once.
    python3 tools/bump_version.py
"""
import datetime, json, pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
v = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
idx = root / "docs" / "index.html"
s = idx.read_text(encoding="utf-8")
s, n1 = re.subn(r'window\.BUILD="[^"]*"', f'window.BUILD="{v}"', s)
s, n2 = re.subn(r'(data/(?:content|vocab3000)\.js)\?v=[^"]*"', rf'\1?v={v}"', s)
assert n1 == 1 and n2 == 2, (n1, n2)
idx.write_text(s, encoding="utf-8")
(root / "docs" / "version.json").write_text(json.dumps({"v": v}) + "\n", encoding="utf-8")
print("version", v)
