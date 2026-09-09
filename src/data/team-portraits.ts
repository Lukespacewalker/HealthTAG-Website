import type { ImageMetadata } from 'astro';
import dechowat from '../assets/legacy/team/dechowat.png';
import aumphon from '../assets/team/current/aumphon-kaewatsadorn-cutout.png';
import kornnaphat from '../assets/team/current/kornnaphat-khumphuak-cutout.png';
import pensirinapang from '../assets/team/current/pensirinapang-jaitaboot-cutout.png';
import purin from '../assets/team/current/purin-janbai-cutout.png';
import suttisak from '../assets/team/current/suttisak-denduangchai-cutout.png';
import tanapon from '../assets/team/current/tanapon-inprasit-cutout.png';
import tanawat from '../assets/team/current/tanawat-udom-cutout.png';

export type PortraitId = 'dechowat' | 'aumphon' | 'kornnaphat' | 'pensirinapang' | 'purin' | 'suttisak' | 'tanapon' | 'tanawat';
export const portraits: Record<PortraitId, ImageMetadata> = {
  dechowat,
  aumphon,
  kornnaphat,
  pensirinapang,
  purin,
  suttisak,
  tanapon,
  tanawat,
};

// Current mappings use the owner-supplied roster and matching filenames.
// Dechowat's established legacy portrait remains in use until a newer portrait is supplied.
const sourceNames: Array<[string, PortraitId]> = [
  ['Dechowat Promda', 'dechowat'],
  ['Aumphon Kaewatsadorn', 'aumphon'],
  ['Kornnaphat Khumphuak', 'kornnaphat'],
  ['Pensirinapang Jaitaboot', 'pensirinapang'],
  ['Purin Janbai', 'purin'],
  ['Suttisak Denduangchai', 'suttisak'],
  ['Tanapon Inprasit', 'tanapon'],
  ['Tanawat Udom', 'tanawat'],
];

export function portraitForName(name: string): ImageMetadata | undefined {
  const matched = sourceNames.find(([sourceName]) => name === sourceName || name.startsWith(`${sourceName},`));
  return matched ? portraits[matched[1]] : undefined;
}
