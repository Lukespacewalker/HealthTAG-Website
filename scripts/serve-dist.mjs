import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const portFlag = process.argv.indexOf('--port');
const port = Number(portFlag >= 0 ? process.argv[portFlag + 1] : process.env.PORT ?? 4321);
const types = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`).pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.endsWith('/') ? `${pathname.slice(1)}index.html` : pathname.slice(1);
    const target = path.resolve(dist, relative);
    if (!target.startsWith(`${dist}${path.sep}`) && target !== path.join(dist, 'index.html')) throw new Error('Path traversal rejected');
    const body = await fs.readFile(target);
    response.writeHead(200, { 'Content-Type': types.get(path.extname(target)) ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    const body = await fs.readFile(path.join(dist, '404.html'));
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(body);
  }
});

server.listen(port, '127.0.0.1', () => console.log(`Serving dist at http://127.0.0.1:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
