const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Add the build's base path to an unprefixed site-root URL; preserve external and fragment URLs. */
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${base}${path}`;
}

/** Get the route without the deployment prefix for navigation comparisons. */
export function withoutBase(path: string): string {
  const route = base && (path === base || path.startsWith(`${base}/`))
    ? path.slice(base.length)
    : path;
  return route.replace(/\/+$/, '') || '/';
}
