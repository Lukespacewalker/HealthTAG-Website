import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const sitemap = await fs.readFile(path.join(root, 'public', 'sitemap.xml'), 'utf8');
const errors = [];

async function filesBelow(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(target) : [target];
  }));
  return nested.flat();
}

function walk(node, visit) {
  visit(node);
  for (const child of node.childNodes ?? []) walk(child, visit);
  if (node.content) walk(node.content, visit);
}

function attr(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value;
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  return (node.childNodes ?? []).map(textContent).join('');
}

function visibleText(node) {
  if (['script', 'style', 'template'].includes(node.nodeName)) return '';
  if (node.nodeName === '#text') return node.value ?? '';
  return (node.childNodes ?? []).map(visibleText).join(' ');
}

function routeForFile(file) {
  const relative = path.relative(dist, file).replaceAll('\\', '/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html' || relative === '404/index.html') return '/404/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative}`;
}

function outputForPath(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (!clean) return path.join(dist, 'index.html');
  if (clean === '404/' || clean === '404') return path.join(dist, '404.html');
  if (path.extname(clean)) return path.join(dist, clean);
  return path.join(dist, clean, 'index.html');
}

const htmlFiles = (await filesBelow(dist)).filter((file) => file.endsWith('.html'));
const routes = new Set(htmlFiles.map(routeForFile));
const isErrorRoute = (route) => route.endsWith('/404/');

for (const file of htmlFiles) {
  const route = routeForFile(file);
  const html = await fs.readFile(file, 'utf8');
  const document = parse(html);
  const nodes = [];
  walk(document, (node) => nodes.push(node));

  const elements = (name) => nodes.filter((node) => node.nodeName === name);
  const bodyText = visibleText(elements('body')[0] ?? {}).replace(/\s+/g, ' ').trim();
  const internalTerms = bodyText.match(/\b(?:baseline|owner-confirmed|site-owner|workstream|claim|claims|source-node stack|production scope|component boundary)\b/gi) ?? [];
  if (internalTerms.length) errors.push(`${route}: internal wording is visible (${[...new Set(internalTerms)].join(', ')})`);
  const metaUiPatterns = [
    /\bEach (?:organization|entry|item)\b/i,
    /\b(?:This page|This list|This overview)\s+(?:shows|lists|explains|states|applies)\b/i,
    /\b(?:How to read the labels|Relationship types on this page|shown together|shown separately)\b/i,
    /(?:แต่ละองค์กร|แต่ละรายการ).*(?:ป้ายกำกับ|แสดง|ระบุ)/i,
    /(?:หน้านี้|รายการนี้|ภาพรวมนี้).*(?:แสดง|ระบุ|อธิบาย|เป็นข้อมูล|ใช้กับ)/i,
    /(?:วิธีอ่านป้ายกำกับ|ประเภทความสัมพันธ์ในหน้านี้|แสดงไว้ในกลุ่มเดียว|แสดงแยกจากกัน)/i,
  ];
  const metaUiMatch = metaUiPatterns.find((pattern) => pattern.test(bodyText));
  if (metaUiMatch) errors.push(`${route}: public copy narrates the interface or editorial structure (${metaUiMatch})`);
  if (/Historical Network|เครือข่ายในอดีต/i.test(bodyText)) errors.push(`${route}: network relationship is incorrectly labeled historical`);
  if (bodyText.includes('—')) errors.push(`${route}: em dash remains in public copy`);
  const lang = attr(elements('html')[0], 'lang');
  const expectedLang = route.startsWith('/en/') ? 'en' : 'th';
  if (!isErrorRoute(route) && lang !== expectedLang) errors.push(`${route}: html lang=${lang ?? 'missing'}, expected ${expectedLang}`);
  if (elements('main').length !== 1) errors.push(`${route}: expected one main landmark, found ${elements('main').length}`);
  if (elements('h1').length !== 1) errors.push(`${route}: expected one h1, found ${elements('h1').length}`);
  const sharedHeader = elements('header').filter((node) => attr(node, 'class')?.split(/\s+/).includes('site-header'));
  const sharedFooter = elements('footer').filter((node) => attr(node, 'class')?.split(/\s+/).includes('footer'));
  if (sharedHeader.length !== 1 || sharedFooter.length !== 1) errors.push(`${route}: missing shared header or footer landmark`);
  if (!textContent(elements('title')[0] ?? {}).trim()) errors.push(`${route}: missing page title`);

  const metaDescription = elements('meta').find((node) => attr(node, 'name') === 'description');
  if (!attr(metaDescription ?? {}, 'content')?.trim()) errors.push(`${route}: missing meta description`);
  const metaProperty = (name) => attr(elements('meta').find((node) => attr(node, 'property') === name) ?? {}, 'content');
  const metaName = (name) => attr(elements('meta').find((node) => attr(node, 'name') === name) ?? {}, 'content');
  if (!metaProperty('og:image')?.endsWith('/og-healthtag.png')) errors.push(`${route}: missing PNG social image`);
  if (metaProperty('og:image:width') !== '1200' || metaProperty('og:image:height') !== '630') errors.push(`${route}: missing social image dimensions`);
  if (!metaProperty('og:image:alt')?.trim() || !metaName('twitter:image')?.endsWith('/og-healthtag.png') || !metaName('twitter:image:alt')?.trim()) errors.push(`${route}: incomplete social image metadata`);
  const fontPreload = elements('link').find((node) => attr(node, 'rel') === 'preload' && attr(node, 'as') === 'font');
  if (!attr(fontPreload ?? {}, 'href')?.endsWith('.woff2')) errors.push(`${route}: missing locale-specific font preload`);
  if (/fonts\.(?:googleapis|gstatic)\.com/.test(html)) errors.push(`${route}: runtime Google Fonts dependency remains`);
  const canonical = elements('link').find((node) => attr(node, 'rel') === 'canonical');
  if (!attr(canonical ?? {}, 'href')) errors.push(`${route}: missing canonical link`);
  const alternates = elements('link').filter((node) => attr(node, 'rel') === 'alternate' && attr(node, 'hreflang'));
  if (!isErrorRoute(route) && alternates.length < 3) errors.push(`${route}: expected th, en, and x-default hreflang links`);

  for (const image of elements('img')) {
    const alt = attr(image, 'alt');
    const src = attr(image, 'src');
    if (!alt?.trim()) errors.push(`${route}: image ${src ?? '(missing src)'} has empty/missing alt text`);
    if (src?.startsWith('/')) {
      try { await fs.access(outputForPath(src)); } catch { errors.push(`${route}: missing image asset ${src}`); }
    }
  }

  for (const anchor of elements('a')) {
    const href = attr(anchor, 'href');
    const label = (attr(anchor, 'aria-label') ?? textContent(anchor)).replace(/\s+/g, ' ').trim();
    if (!href || href === '#') errors.push(`${route}: anchor with missing/placeholder href (${label || 'unlabelled'})`);
    if (!label) errors.push(`${route}: unlabelled link ${href ?? '(missing href)'}`);
    if (attr(anchor, 'target') === '_blank' && !attr(anchor, 'rel')?.split(/\s+/).includes('noopener')) errors.push(`${route}: target=_blank link lacks rel=noopener (${href})`);
    if (!href || /^(?:https?:|mailto:|tel:|data:|#)/.test(href)) continue;
    const pathname = new URL(href, `https://healthtag.io${route}`).pathname;
    try { await fs.access(outputForPath(pathname)); } catch { errors.push(`${route}: broken internal link ${href}`); }
  }

  if (!isErrorRoute(route) && !sitemap.includes(`<loc>https://healthtag.io${route}</loc>`)) errors.push(`${route}: missing from sitemap.xml`);
}

for (const route of [...routes].filter((item) => !isErrorRoute(item) && !item.startsWith('/en/'))) {
  const counterpart = route === '/' ? '/en/' : `/en${route}`;
  if (!routes.has(counterpart)) errors.push(`${route}: missing English counterpart ${counterpart}`);
}

if (errors.length) {
  console.error(`Built-site validation failed with ${errors.length} issue(s):\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files: links, assets, landmarks, metadata, sitemap, and Thai/English route parity.`);
