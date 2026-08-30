import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, basename, resolve } from 'node:path';

// One-time migration only. Normal builds never depend on the legacy host.
const manifest = JSON.parse(await readFile(new URL('./legacy-assets.json', import.meta.url), 'utf8'));
const blobSha = (bytes) => createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
const publicOrigin = 'https://healthtag.io';
const candidateUrls = new Set();
const jsUrls = new Set();
const errors = [];

async function get(url, headers = {}) {
  try {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });
    if (!response.ok) return null;
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length > 8 * 1024 * 1024) return null;
    return bytes;
  } catch { return null; }
}

function collect(text) {
  const normalized = text.replaceAll('&amp;', '&').replaceAll('\\/', '/').replaceAll('\\u0026', '&');
  for (const match of normalized.matchAll(/(?:https:\/\/healthtag\.io)?\/(?:_next|_astro|images)\/[^\s"'<>\\]+/g)) {
    try {
      let url = new URL(match[0], publicOrigin);
      if (url.pathname === '/_next/image' && url.searchParams.has('url')) url = new URL(url.searchParams.get('url'), publicOrigin);
      if (url.origin !== publicOrigin) continue;
      if (/\.(png|jpe?g|webp)(\?|$)/i.test(url.href)) {
        candidateUrls.add(url.href);
        // Astro also publishes the original imported asset beside optimized renditions.
        if (url.pathname.startsWith('/_astro/') && /_\w+\.webp$/i.test(url.pathname)) {
          for (const extension of ['png', 'jpg']) {
            candidateUrls.add(new URL(url.pathname.replace(/_\w+\.webp$/i, `.${extension}`), publicOrigin).href);
          }
        }
      }
      if (/\.js(\?|$)/i.test(url.href)) jsUrls.add(url.href);
    } catch { /* Ignore malformed URLs; never follow another host. */ }
  }
}

if (process.argv.includes('--from-public')) {
  const pages = ['/', '/network', '/about/team', '/about-us/team', '/about-us/vision'];
  await Promise.all(pages.map(async (path) => { const bytes = await get(publicOrigin + path); if (bytes) collect(bytes.toString('utf8')); }));
  await Promise.all([...jsUrls].slice(0, 35).map(async (url) => { const bytes = await get(url); if (bytes) collect(bytes.toString('utf8')); }));
  console.log(`Discovered ${candidateUrls.size} same-origin image candidates.`);
}

const sourceDir = process.env.LEGACY_SOURCE_DIR;
const hasPublic = process.argv.includes('--from-public');
for (const asset of manifest.assets) {
  if (!asset.target.startsWith('src/assets/legacy/') || asset.target.includes('..')) throw new Error('Unexpected destination');
  let bytes;
  try { bytes = await readFile(asset.target); } catch { /* Not imported yet. */ }
  if (bytes && blobSha(bytes) === asset.sha) { console.log(`Verified ${asset.target}`); continue; }
  bytes = null;
  if (sourceDir) {
    try { const local = await readFile(resolve(sourceDir, asset.source)); if (blobSha(local) === asset.sha) bytes = local; } catch { /* Report below. */ }
  }
  if (!bytes && hasPublic) {
    const file = basename(asset.source);
    const stem = file.replace(/\.[^.]+$/, '');
    const aliases = [stem];
    const number = stem.match(/(?:hospital-partner|jospital-partner)(\d)/)?.[1];
    if (number) aliases.push(`Partner${number}`, `partner${number}`);
    const direct = asset.source.includes('/public/') ? [publicOrigin + asset.source.split('/public/')[1].replace(/^/, '/')] : [];
    const candidates = [...direct, ...[...candidateUrls].filter((url) => aliases.some((alias) => basename(new URL(url).pathname).toLowerCase().startsWith(alias.toLowerCase() + '.')))];
    for (let i = 0; i < candidates.length; i += 6) {
      const batch = await Promise.all(candidates.slice(i, i + 6).map((url) => get(url)));
      bytes = batch.find((candidate) => candidate && blobSha(candidate) === asset.sha) ?? null;
      if (bytes) break;
    }
  }
  if (!bytes) { errors.push(asset.target); console.error(`Missing verified source: ${asset.source}`); continue; }
  await mkdir(dirname(asset.target), { recursive: true });
  await writeFile(asset.target, bytes);
  console.log(`Imported ${asset.target} (${bytes.length} bytes; source SHA matched)`);
}
if (errors.length) {
  console.error(`${errors.length} assets unavailable. No unverified replacement was accepted. Use LEGACY_SOURCE_DIR with a local source checkout.`);
  process.exitCode = 1;
} else console.log(`All ${manifest.assets.length} assets match the source repository.`);
