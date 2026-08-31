import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const redirectFile = path.join(root, 'public', '_redirects');
const dist = path.join(root, 'dist');
const required = new Map([
  ['/how-it-work', '/how-it-works/'],
  ['/product', '/phr/'],
  ['/en/product', '/en/phr/'],
  ['/about-us/vision', '/company/'],
  ['/about-us/team', '/company/'],
  ['/awards', '/evidence/'],
  ['/th/awards', '/evidence/'],
  ['/support', '/support/'],
  ['/en/support', '/en/support/'],
  ['/posts', '/posts/'],
  ['/news', '/news/'],
  ['/articles', '/articles/'],
  ['/en/posts', '/en/posts/'],
  ['/en/news', '/en/news/'],
  ['/en/articles', '/en/articles/'],
]);

const lines = (await fs.readFile(redirectFile, 'utf8'))
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'));
const rules = lines.map((line) => {
  const [source, destination, status] = line.split(/\s+/);
  return { source, destination, status };
});
const errors = [];

for (const rule of rules) {
  if (!rule.source || !rule.destination || rule.status !== '301') errors.push(`Malformed/non-permanent rule: ${JSON.stringify(rule)}`);
  if (rule.source.includes('*')) errors.push(`Wildcard redirect requires explicit content review: ${rule.source}`);
  if (rule.destination === '/') errors.push(`Unrelated redirect to Home is not allowed: ${rule.source}`);
  const target = path.join(dist, rule.destination.replace(/^\/+|\/+$/g, ''), 'index.html');
  try { await fs.access(rule.destination === '/' ? path.join(dist, 'index.html') : target); }
  catch { errors.push(`Redirect destination is not built: ${rule.source} → ${rule.destination}`); }
}

for (const [source, destination] of required) {
  const rule = rules.find((item) => item.source === source);
  if (!rule || rule.destination !== destination || rule.status !== '301') errors.push(`Missing required redirect: ${source} → ${destination} 301`);
}

if (errors.length) {
  console.error(`Redirect validation failed with ${errors.length} issue(s):\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exit(1);
}

console.log(`Validated ${rules.length} explicit Cloudflare Pages redirects; no wildcard or Home catch-all rules.`);
