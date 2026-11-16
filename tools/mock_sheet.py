"""Local stand-in for the Google Apps Script web app (same API as google-sheet-script.gs).

For testing only — never deploy. Run:
    python3 tools/mock_sheet.py            # empty store on http://127.0.0.1:8766/
    python3 tools/mock_sheet.py --seed     # starts with one sample learner "Lan"
Teacher password in the mock: test-key
Then temporarily set syncUrl in docs/data/content.js to "http://127.0.0.1:8766/"
(and restore the real /exec link before committing).
"""
import datetime
import json
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

KEY = "test-key"
DB = {}
if "--seed" in sys.argv:
    DB["P:lan"] = {"learner": "lan", "name": "Lan", "at": "2026-11-16T16:20:00Z",
                   "data": {"name": "Lan", "lid": "lan", "theory": {"np01": "2026-11-02T12:00:00Z"},
                            "quiz": {}, "speak": {}, "done": {},
                            "vs": {"np02:bus": "known", "np02:class": "learning"}, "updatedAt": 5}}


class H(BaseHTTPRequestHandler):
    def _h(self, ct="application/json"):
        self.send_response(200)
        self.send_header("Content-Type", ct)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

    def do_GET(self):
        q = {k: v[0] for k, v in parse_qs(urlparse(self.path).query).items()}
        if q.get("action") == "get":
            lid = q.get("learner", "")
            out = {"ok": True, "progress": DB.get("P:" + lid, {}).get("data"),
                   "admin": DB.get("A:" + lid, {}).get("data")}
        elif q.get("action") == "list":
            if q.get("key") != KEY:
                out = {"ok": False, "error": "key"}
            else:
                by = {}
                for k, v in DB.items():
                    o = by.setdefault(v["learner"], {"learner": v["learner"], "name": "", "updated": "",
                                                     "progress": None, "admin": None})
                    if k.startswith("P:"):
                        o.update(progress=v["data"], name=v["name"], updated=v["at"])
                    else:
                        o["admin"] = v["data"]
                out = {"ok": True, "learners": list(by.values())}
        else:
            out = {"ok": True, "hello": "Sổ Luyện Tiếng Anh (mock)"}
        self._h()
        self.wfile.write(json.dumps(out).encode())

    def do_POST(self):
        d = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
        now = datetime.datetime.utcnow().isoformat() + "Z"
        if d.get("action") == "progress":
            DB["P:" + d["learner"]] = {"learner": d["learner"], "name": d.get("name", ""), "data": d.get("data"), "at": now}
        elif d.get("action") in ("admin", "delete") and d.get("key") != KEY:
            self._h("text/plain"); self.wfile.write(b"key"); return
        elif d.get("action") == "admin":
            DB["A:" + d["learner"]] = {"learner": d["learner"], "name": d.get("name", ""), "data": d.get("data"), "at": now}
        elif d.get("action") == "delete":
            DB.pop("P:" + d["learner"], None)
            DB.pop("A:" + d["learner"], None)
        self._h("text/plain")
        self.wfile.write(b"ok")

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    HTTPServer(("127.0.0.1", 8766), H).serve_forever()
