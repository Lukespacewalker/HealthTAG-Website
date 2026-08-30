import type { ImageMetadata } from 'astro';
import dechowat from '../assets/legacy/team/dechowat.png';
import suttisak from '../assets/legacy/team/suttisak.png';
import tanawat from '../assets/legacy/team/tanawat.jpg';

export type PortraitId = 'dechowat' | 'suttisak' | 'tanawat';
export const portraits: Record<PortraitId, ImageMetadata> = { dechowat, suttisak, tanawat };

// These mappings are established by site.ts/card.ts in healthtag.io-nx,
// not inferred from a photograph or an ambiguous filename.
const sourceNames: Array<[string, PortraitId]> = [
  ['Dechowat Promda', 'dechowat'],
  ['Suttisak Denduangchai', 'suttisak'],
  ['Tanawat Udom', 'tanawat'],
];

export function portraitForName(name: string): ImageMetadata | undefined {
  const matched = sourceNames.find(([sourceName]) => name === sourceName || name.startsWith(`${sourceName},`));
  return matched ? portraits[matched[1]] : undefined;
}
