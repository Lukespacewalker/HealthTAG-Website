import { getCollection, type CollectionEntry } from 'astro:content';

export type PublicationEntry = CollectionEntry<'publications'>;
export type PublicationKind = PublicationEntry['data']['kind'];
export type PublicationLocale = PublicationEntry['data']['locale'];

export const pageSize = 8;

export async function getPublishedPublications(locale?: PublicationLocale, kind?: PublicationKind) {
  const entries = await getCollection('publications', ({ data }) =>
    data.status === 'published' && (!locale || data.locale === locale) && (!kind || data.kind === kind));

  return entries.sort((a, b) => {
    const date = (b.data.publishedAt ?? b.data.eventDate ?? b.data.migratedAt).localeCompare(a.data.publishedAt ?? a.data.eventDate ?? a.data.migratedAt);
    return date || a.data.title.localeCompare(b.data.title, locale === 'th' ? 'th' : 'en');
  });
}

export function publicationSection(kind: PublicationKind) {
  return kind === 'article' ? 'articles' : kind === 'award' ? 'awards' : 'news';
}

export function publicationPath(entry: PublicationEntry) {
  const prefix = entry.data.locale === 'en' ? '/en' : '';
  return `${prefix}/${publicationSection(entry.data.kind)}/${entry.data.slug}/`;
}

export function pairedPublication(entry: PublicationEntry, entries: PublicationEntry[]) {
  return entries.find((candidate) =>
    candidate.data.translationKey === entry.data.translationKey && candidate.data.locale !== entry.data.locale);
}

export function formatPublicationDate(date: string, locale: PublicationLocale) {
  if (/^\d{4}$/.test(date)) return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-GB', { year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(Number(date), 0, 1)));
  const [year, month, day] = date.split('-').map(Number);
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function publicationSearchText(entry: PublicationEntry) {
  return [entry.data.title, entry.data.summary, entry.data.category, entry.data.author]
    .join(' ').normalize('NFKC').toLocaleLowerCase(entry.data.locale);
}
