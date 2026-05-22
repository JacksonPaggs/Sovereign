import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';

const PORT = 3000;
const ROOT = fileURLToPath(new URL('.', import.meta.url));

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

createServer(async (req, res) => {
  let path = req.url.split('?')[0];

  if (path === '/download') {
    try {
      const data = await readFile(join(ROOT, 'index.html'));
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="sovereign.html"',
      });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
    return;
  }

  if (path === '/download/handoff') {
    try {
      const data = await readFile(join(ROOT, 'HANDOFF.md'));
      res.writeHead(200, {
        'Content-Type': 'text/markdown',
        'Content-Disposition': 'attachment; filename="HANDOFF.md"',
      });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
    return;
  }

  if (path === '/download/gameplan') {
    try {
      const data = await readFile(join(ROOT, 'docs/Sovereign - Jackson & Dawson Game Plan.md'));
      res.writeHead(200, {
        'Content-Type': 'text/markdown',
        'Content-Disposition': 'attachment; filename="Sovereign - Jackson & Dawson Game Plan.md"',
      });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
    return;
  }

  if (path === '/') path = '/index.html';
  const file = join(ROOT, path);
  try {
    const data = await readFile(file);
    const type = MIME[extname(file)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => {
  console.log(`Sovereign dev server running at http://localhost:${PORT}`);
  console.log(`Download the file at  http://localhost:${PORT}/download`);
});