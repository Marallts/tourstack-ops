// Single-page app: the whole tool is one HTML file that talks directly to
// Supabase (auth + data + realtime). This server's only job is to serve it.
//
// Looks in a couple of likely spots for index.html so a small repo-layout
// slip (e.g. the file ending up at the repo root instead of inside public/)
// doesn't take the whole app down.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const CANDIDATES = [
  path.join(__dirname, "public", "index.html"),
  path.join(__dirname, "index.html"),
];
const INDEX_PATH = CANDIDATES.find(p => fs.existsSync(p));

if (!INDEX_PATH) {
  console.error("Could not find index.html in any of:", CANDIDATES);
}

const server = http.createServer((req, res) => {
  if (!INDEX_PATH) { res.writeHead(500); res.end("Could not load the app — index.html not found."); return; }
  fs.readFile(INDEX_PATH, (err, html) => {
    if (err) { res.writeHead(500); res.end("Could not load the app."); return; }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });
});

server.listen(PORT, () => console.log(`Tourstack Ops listening on port ${PORT} (serving ${INDEX_PATH})`));
