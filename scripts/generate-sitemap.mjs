import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = path.join(root, 'src', 'content', 'publications');
const output = path.join(root, 'public', 'sitemap.xml');
const baseRoutes = [
  '/', '/interoperability/', '/phr/', '/how-it-works/', '/trust/', '/deployments/', '/network/', '/company/', '/evidence/',
  '/posts/', '/news/', '/articles/', '/awards/', '/contact/', '/support/', '/support/community-edition/user-manual/', '/privacy/',
];

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory()
    ? filesBelow(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]))).flat();
}

const detailRoutes = [];
for (const file of await filesBelow(contentRoot)) {
  if (!/\.mdx?$/.test(file)) continue;
  const source = await readFile(file, 'utf8');
  const field = (name) => source.match(new RegExp(`^${name}:\\s*["']?([^"'\\r\\n]+)`, 'm'))?.[1]?.trim();
  if (field('status') !== 'published') continue;
  const locale = field('locale');
  const kind = field('kind');
  const slug = field('slug');
  const section = kind === 'article' ? 'articles' : kind === 'award' ? 'awards' : 'news';
  if (!locale || !slug) throw new Error(`Missing sitemap fields in ${path.relative(root, file)}`);
  detailRoutes.push(`${locale === 'en' ? '/en' : ''}/${section}/${slug}/`);
}

const routes = [...baseRoutes, ...baseRoutes.map((route) => route === '/' ? '/en/' : `/en${route}`), ...detailRoutes]
  .sort((a, b) => a.localeCompare(b));
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>https://healthtag.io${route}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(output, xml, 'utf8');
console.log(`Generated sitemap.xml with ${routes.length} routes.`);
