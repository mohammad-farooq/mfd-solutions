const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname);
const port = Number(process.env.PORT) || 3000;
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method not allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch (error) {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  const filePath = path.resolve(root, `.${pathname}`);
  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    const target = !statError && stats.isDirectory()
      ? path.join(filePath, 'index.html')
      : filePath;

    fs.readFile(target, (readError, contents) => {
      if (readError) {
        response.writeHead(readError.code === 'ENOENT' ? 404 : 500);
        response.end(readError.code === 'ENOENT' ? 'Not found' : 'Server error');
        return;
      }

      response.writeHead(200, {
        'Content-Type': contentTypes[path.extname(target).toLowerCase()] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(request.method === 'HEAD' ? undefined : contents);
    });
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`MFD Solutions is running at http://localhost:${port}`);
});
