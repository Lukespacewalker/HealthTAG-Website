import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const isoDate = z.string().regex(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/, 'Use YYYY, YYYY-MM, or YYYY-MM-DD');
const sourceUrl = z.string().refine((value) => value.startsWith('/') || URL.canParse(value), 'Use an absolute web URL or a root-relative site path');
const sha256 = z.string().regex(/^sha256:[a-f0-9]{64}$/i, 'Use a sha256: checksum');

const publications = defineCollection({
  loader: glob({
    base: './src/content/publications',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\.(?:md|mdx)$/i, ''),
  }),
  schema: ({ image }) => z.object({
    kind: z.enum(['news', 'article', 'award']),
    title: z.string().min(1),
    summary: z.string().min(1).max(320),
    author: z.string().min(1).default('HealthTAG'),
    locale: z.enum(['th', 'en']),
    translationKey: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    category: z.string().min(1),
    status: z.enum(['draft', 'published']),
    publishedAt: isoDate,
    modifiedAt: isoDate.optional(),
    migratedAt: isoDate,
    eventDate: isoDate.optional(),
    eventEndDate: isoDate.optional(),
    sources: z.array(z.object({
      label: z.string().min(1),
      url: sourceUrl.optional(),
      organization: z.string().min(1),
      type: z.enum(['first-party', 'primary', 'context', 'archive', 'owner-confirmed']),
    })).min(1),
    images: z.array(z.object({
      src: image(),
      alt: z.string().min(1),
      credit: z.string().min(1),
      sourceUrl: z.string().url(),
      checksum: sha256,
    })).min(1).max(3),
    resultStatus: z.string().min(1).optional(),
    confirmedResult: z.array(z.string().min(1)).optional(),
  }).superRefine((item, ctx) => {
    if (item.modifiedAt && item.publishedAt && item.modifiedAt < item.publishedAt) {
      ctx.addIssue({ code: 'custom', path: ['modifiedAt'], message: 'modifiedAt cannot be before publishedAt' });
    }
    if (item.eventEndDate && !item.eventDate) {
      ctx.addIssue({ code: 'custom', path: ['eventEndDate'], message: 'eventEndDate requires eventDate' });
    }
    if (item.eventDate && item.eventEndDate && item.eventEndDate < item.eventDate) {
      ctx.addIssue({ code: 'custom', path: ['eventEndDate'], message: 'eventEndDate cannot be before eventDate' });
    }
    if (item.kind === 'award' && (!item.resultStatus || !item.confirmedResult?.length)) {
      ctx.addIssue({ code: 'custom', path: ['confirmedResult'], message: 'Awards require resultStatus and confirmedResult' });
    }
  }),
});

export const collections = { publications };
