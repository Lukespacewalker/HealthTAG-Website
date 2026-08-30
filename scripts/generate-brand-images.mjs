import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lightLogo = path.join(root, 'src/assets/legacy/brand/logo-light.png');
const darkLogo = path.join(root, 'src/assets/legacy/brand/logo-dark.png');
const publicDir = path.join(root, 'public');

const wordmark = await sharp(darkLogo).resize({ width: 530 }).png().toBuffer();
const editorialOverlay = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <g fill="none" stroke="#365158" stroke-width="1" opacity="0.65">
      <path d="M0 116h1200M0 514h1200M732 0v630M1018 0v630"/>
      <rect x="760" y="116" width="228" height="150" rx="14"/>
      <rect x="760" y="286" width="228" height="150" rx="14"/>
      <rect x="1018" y="116" width="182" height="320"/>
    </g>
    <path d="M780 190h188M780 360h188" stroke="#36a99f" stroke-width="3"/>
    <path d="M1044 190h130M1044 360h130" stroke="#d9a15f" stroke-width="3" stroke-dasharray="9 7"/>
    <text x="86" y="346" fill="#DDF3EB" font-family="IBM Plex Sans, sans-serif" font-size="43" font-weight="500">Healthcare interoperability</text>
    <text x="86" y="401" fill="#DDF3EB" font-family="IBM Plex Sans, sans-serif" font-size="43" font-weight="500">with hospitals in control.</text>
    <text x="86" y="493" fill="#9FC8C3" font-family="IBM Plex Mono, monospace" font-size="20">HL7 FHIR R4 · IDENTITY · AUTHORIZATION · AUDIT</text>
    <text x="780" y="162" fill="#8BD9D1" font-family="IBM Plex Mono, monospace" font-size="15">CLINICAL DATA</text>
    <text x="780" y="332" fill="#8BD9D1" font-family="IBM Plex Mono, monospace" font-size="15">AUTHORIZED APPS</text>
    <text x="1044" y="162" fill="#F1C28D" font-family="IBM Plex Mono, monospace" font-size="15">AUDIT EVENTS</text>
    <text x="1044" y="462" fill="#F1C28D" font-family="IBM Plex Mono, monospace" font-size="13">NO CLINICAL</text>
    <text x="1044" y="484" fill="#F1C28D" font-family="IBM Plex Mono, monospace" font-size="13">RECORDS ON</text>
    <text x="1044" y="506" fill="#F1C28D" font-family="IBM Plex Mono, monospace" font-size="13">BLOCKCHAIN</text>
  </svg>
`);

await sharp({
  create: { width: 1200, height: 630, channels: 4, background: '#102f36' },
})
  .composite([
    { input: wordmark, left: 84, top: 88 },
    { input: editorialOverlay, left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(path.join(publicDir, 'og-healthtag.png'));

await sharp(lightLogo)
  .extract({ left: 0, top: 0, width: 136, height: 136 })
  .resize(128, 128, { fit: 'contain' })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(path.join(publicDir, 'favicon.png'));

console.log('Generated public/og-healthtag.png (1200×630) and public/favicon.png (128×128).');
