import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, relative, isAbsolute } from 'node:path';

// Offline integrity check. A normal checkout/build never contacts the legacy site.
const root = fileURLToPath(new URL('../', import.meta.url));
const manifestUrls = [
  new URL('./legacy-assets.json', import.meta.url),
  new URL('./community-edition-assets.json', import.meta.url),
];
const manifests = await Promise.all(manifestUrls.map(async (url) => JSON.parse(await readFile(url, 'utf8'))));
const seen = new Set();
const errors = [];
for (const asset of manifests.flatMap((manifest) => manifest.assets)) {
  const path = resolve(root, asset.target);
  const within = relative(resolve(root, 'src/assets/legacy'), path);
  if (!within || within.startsWith('..') || isAbsolute(within) || seen.has(asset.target)) {
    errors.push(`Invalid or repeated destination: ${asset.target}`);
    continue;
  }
  seen.add(asset.target);
  try {
    const bytes = await readFile(path);
    const sha = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
    if (sha !== asset.sha) errors.push(`Source checksum mismatch: ${asset.target}`);
  } catch {
    errors.push(`Missing source asset: ${asset.target}`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Verified ${seen.size} original images against the legacy Git blob hashes.`);
}
