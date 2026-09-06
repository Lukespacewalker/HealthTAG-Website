import { readdirSync } from 'node:fs';
import path from 'node:path';

/** All static HTML routes, including pages omitted from the sitemap. */
export function builtRoutes() {
  return readdirSync('dist', { recursive: true })
    .filter(file => typeof file === 'string' && file.endsWith('.html'))
    .map(file => '/' + file.split(path.sep).join('/').replace(/index\.html$/, ''));
}
