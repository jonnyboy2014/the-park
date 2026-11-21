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
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4"
};

function sendFile(filePath, response, request) {
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (path.extname(resolved) === ".mp4") {
    sendVideo(resolved, request, response);
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

function sendVideo(filePath, request, response) {
  fs.stat(filePath, (error, stat) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const range = request?.headers.range;
    const match = range ? /^bytes=(\d*)-(\d*)$/.exec(range) : null;
    let start = 0;
    let end = stat.size - 1;
    if (match && !match[1] && match[2]) {
      start = Math.max(0, stat.size - Number(match[2]));
    } else if (match) {
      start = Number(match[1]);
      end = match[2] ? Math.min(Number(match[2]), end) : end;
    }

    if ((range && !match) || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= stat.size || end < start) {
      response.writeHead(416, { "Content-Range": `bytes */${stat.size}` });
      response.end();
      return;
    }

    const headers = {
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-store",
      "Content-Length": end - start + 1
    };
    if (range) {
      headers["Content-Range"] = `bytes ${start}-${end}/${stat.size}`;
    }
    response.writeHead(range ? 206 : 200, headers);
    if (request?.method === "HEAD") {
      response.end();
      return;
    }
    const stream = fs.createReadStream(filePath, { start, end });
    stream.on("error", () => response.destroy());
    stream.pipe(response);
  });
}

function serveFrom(baseDir, relativePath, response, request) {
  const relative = path.normalize(relativePath).replace(/^([.][.][\\/])+/, "");
  if (relative.startsWith("..")) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  sendFile(path.join(baseDir, relative), response, request);
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
  if (requested === "/doors/trailer" || requested === "/doors/trailer/") {
    sendFile(path.join(doorsDir, "trailer", "index.html"), response);
    return;
  }
  if (requested.startsWith("/doors/")) {
    serveFrom(doorsDir, requested.slice(7), response, request);
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
