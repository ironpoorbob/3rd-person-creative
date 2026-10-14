import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const base = `/${(process.argv[2] ?? '').replace(/^\/+|\/+$/g, '')}`.replace(/\/?$/, '/');
const output = resolve('dist/client');
const site = join(output, base.slice(1));
assert.ok(existsSync(join(site, 'index.html')), `Build missing for ${base}`);

function* files(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

let pages = 0;
let urls = 0;
function check(url, file, asset = false) {
  if (!url.startsWith('/') || url.startsWith('//')) return;
  urls++;
  assert.ok(url.startsWith(base), `${file}: URL escapes base ${base}: ${url}`);
  if (asset) {
    const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
    assert.ok(existsSync(join(output, pathname.slice(1))), `${file}: missing asset ${url}`);
  }
}

for (const file of files(output)) {
  if (!/\.(html|css)$/.test(file)) continue;
  const content = readFileSync(file, 'utf8');
  if (file.endsWith('.html')) {
    pages++;
    for (const match of content.matchAll(/\b(href|src|action)="([^"]+)"/g)) {
      const [, attribute, url] = match;
      check(url, file, attribute === 'src' || /\.(?:css|js|svg|ico|woff2)(?:[?#]|$)/.test(url));
    }
    for (const match of content.matchAll(/\bsrcset="([^"]+)"/g)) {
      for (const candidate of match[1].split(',')) check(candidate.trim().split(/\s+/)[0], file, true);
    }
  }
  for (const match of content.matchAll(/url\(\s*['"]?([^\s)'";]+)['"]?\s*\)/g)) {
    check(match[1], file, true);
  }
}

// Homepage section links must retain the base path even from nested pages.
for (const route of ['', 'about', 'blog']) {
  const html = readFileSync(join(site, route, 'index.html'), 'utf8');
  const nav = html.match(/<nav\b[^>]*aria-label="Primary navigation"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(nav, `Missing primary navigation on ${route || 'home'}`);
  for (const section of ['approach', 'services', 'people']) {
    assert.ok(nav.includes(`href="${base}#${section}"`), `Missing base-aware ${section} link`);
  }
}

assert.ok(pages > 0 && urls > 0, 'No generated pages or URLs checked');
console.log(`Checked ${pages} pages and ${urls} local URLs for base ${base}; asset files and navigation passed.`);
