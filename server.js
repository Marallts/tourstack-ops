// Single-page app: the whole tool is one HTML file that talks directly to
// Supabase (auth + data + realtime). This server's only job is to serve it.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const INDEX_PATH = path.join(__dirname, "public", "index.html");

const server = http.createServer((req, res) => {
  fs.readFile(INDEX_PATH, (err, html) => {
    if (err) { res.writeHead(500); res.end("Could not load the app."); return; }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });
});

server.listen(PORT, () => console.log(`Tourstack Ops listening on port ${PORT}`));
