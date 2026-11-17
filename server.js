const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname);
const game2dDir = path.join(root, "games", "the-park-2d");
const game3dDir = path.join(root, "games", "the-park");
const doorsDir = path.join(root, "games", "the-park", "100-doors");
const port = 3000;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function sendFile(filePath, response) {
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(resolved, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    const type = mimeTypes[path.extname(resolved)] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
    response.end(data);
  });
}

function serveFrom(baseDir, relativePath, response) {
  const relative = path.normalize(relativePath).replace(/^([.][.][\\/])+/, "");
  if (relative.startsWith("..")) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  sendFile(path.join(baseDir, relative), response);
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requested = decodeURIComponent(url.pathname);

  if (requested === "/" || requested === "/2d" || requested === "/2d/") {
    sendFile(path.join(game2dDir, "index.html"), response);
    return;
  }
  if (requested.startsWith("/2d/")) {
    serveFrom(game2dDir, requested.slice(4), response);
    return;
  }
  if (requested === "/3d" || requested === "/3d/") {
    sendFile(path.join(game3dDir, "index.html"), response);
    return;
  }
  if (requested.startsWith("/3d/")) {
    serveFrom(game3dDir, requested.slice(4), response);
    return;
  }
  if (requested === "/doors" || requested === "/doors/") {
    sendFile(path.join(doorsDir, "index.html"), response);
    return;
  }
  if (requested.startsWith("/doors/")) {
    serveFrom(doorsDir, requested.slice(7), response);
    return;
  }
  if (requested.startsWith("/node_modules/")) {
    sendFile(path.join(root, requested), response);
    return;
  }
  response.writeHead(404);
  response.end("Not found");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`The Park is running at http://127.0.0.1:${port}/`);
});
