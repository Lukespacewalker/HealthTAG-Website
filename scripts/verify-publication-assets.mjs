import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const manifestUrl = new URL('./publication-assets.json', import.meta.url);
const rootUrl = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));

for (const item of manifest) {
  const fileUrl = new URL(item.path.replaceAll('\\', '/'), rootUrl);
  const binary = await readFile(fileUrl);
  const checksum = createHash('sha256').update(binary).digest('hex').toUpperCase();
  const metadata = await sharp(binary).metadata();
  if (checksum !== item.sha256 || metadata.width !== item.width || metadata.height !== item.height) {
    throw new Error(`Publication asset mismatch: ${item.path}`);
  }
}

console.log(`Verified ${manifest.length} publication assets.`);
