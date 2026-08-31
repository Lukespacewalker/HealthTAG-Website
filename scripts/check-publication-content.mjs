import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = path.join(root, 'src', 'content', 'publications');
const errors = [];
const translations = new Map();
const awardLocales = { th: 0, en: 0 };
const ownerConfirmedNews = new Set([
  'siriraj-registration-site-visit-2024',
  'centre-health-innovation-fellowship-visit-2022',
  'tan-tock-seng-hospital-visit-2022',
  'siriraj-youth-phr-presentation-2022',
]);

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory()
    ? filesBelow(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]))).flat();
}

function field(source, name) {
  return source.match(new RegExp(`^${name}:\\s*["']?([^"'\\r\\n]+)`, 'm'))?.[1]?.trim();
}

for (const file of (await filesBelow(contentRoot)).filter((item) => /\.mdx?$/.test(item))) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const source = await readFile(file, 'utf8');
  const locale = field(source, 'locale');
  const translationKey = field(source, 'translationKey');
  const kind = field(source, 'kind');
  if (field(source, 'author') !== 'HealthTAG') errors.push(`${relative}: author must be HealthTAG`);
  if (field(source, 'status') !== 'published') errors.push(`${relative}: content must be published or removed from the public collection`);
  if (!/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(field(source, 'publishedAt') ?? '')) errors.push(`${relative}: missing or invalid publishedAt precision`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(field(source, 'migratedAt') ?? '')) errors.push(`${relative}: missing migratedAt`);
  if (!translationKey || !locale) errors.push(`${relative}: missing locale or translationKey`);
  else translations.set(translationKey, new Set([...(translations.get(translationKey) ?? []), locale]));
  if (source.includes('—') || source.includes('–')) errors.push(`${relative}: Humanizer punctuation check failed`);

  const body = source.split(/^---\s*$/m).slice(2).join('\n').trim();
  const summary = field(source, 'summary') ?? '';
  const firstParagraph = body.split(/\n\s*\n/).find((block) => !block.trim().startsWith('#'))?.replace(/[*_`>#\[\]()]/g, '').trim() ?? '';
  if (body.length < 40) errors.push(`${relative}: full body is missing or too short`);
  if ((kind === 'award' || kind === 'article' || ownerConfirmedNews.has(translationKey)) && summary && firstParagraph && (summary === firstParagraph || firstParagraph.startsWith(summary))) errors.push(`${relative}: summary must be written independently from the body opening`);
  if (kind === 'award') {
    if (locale === 'th' || locale === 'en') awardLocales[locale] += 1;
    if (/(?:ไม่ยืนยัน|ไม่ได้หมายความ|ไม่ใช่การรับรอง|does not confirm|does not establish|not a certification)/i.test(source)) errors.push(`${relative}: award copy must state the confirmed result positively`);
  }

  const imageMatches = [...source.matchAll(/^[ \t]+- src:\s*["']?([^"'\r\n]+)["']?[\s\S]*?^[ \t]+checksum:\s*["']?sha256:([a-f0-9]{64})["']?/gim)];
  if (imageMatches.length < 1 || imageMatches.length > 3) errors.push(`${relative}: expected 1 to 3 images`);
  for (const match of imageMatches) {
    const imagePath = path.resolve(path.dirname(file), match[1].trim());
    const checksum = createHash('sha256').update(await readFile(imagePath)).digest('hex');
    if (checksum.toLowerCase() !== match[2].toLowerCase()) errors.push(`${relative}: image checksum mismatch for ${match[1]}`);
  }
}

for (const [key, locales] of translations) {
  if (locales.size !== 2 || !locales.has('th') || !locales.has('en')) errors.push(`${key}: expected Thai and English entries`);
}
if (awardLocales.th !== 10 || awardLocales.en !== 10) errors.push(`Awards collection must contain 10 Thai and 10 English records; found th=${awardLocales.th}, en=${awardLocales.en}`);

if (errors.length) {
  console.error(`Publication content validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exit(1);
}

console.log(`Validated ${translations.size * 2} publication files across ${translations.size} bilingual entries.`);
