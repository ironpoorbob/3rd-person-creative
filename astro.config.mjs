// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import typography from '@tailwindcss/typography';
import Icons from 'unplugin-icons/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  base: '/', // Override with: npm run build -- --base=/designer-preview/
  site: 'https://3dinterior.mail-nearmelab.workers.dev/', // Add this line
  integrations: [
    mdx(),
    {
      name: 'separate-vite-caches',
      hooks: {
        'astro:config:setup': ({ command, config, updateConfig }) => {
          // Builds must not invalidate optimized modules used by a running dev server.
          updateConfig({
            vite: { cacheDir: fileURLToPath(new URL(`node_modules/.vite-${command}/`, config.root)) },
          });
        },
      },
    },
  ],
  vite: {
    build: {
      rolldownOptions: {
        onLog(level, log, defaultHandler) {
          // Astro 7 tracks MDX head assets via module metadata, not this generated directive.
          // Ignore only that directive's warning; preserve all other build diagnostics.
          if (
            level === 'warn' &&
            log.code === 'MODULE_LEVEL_DIRECTIVE' &&
            log.message.includes('use astro:head-inject') &&
            (log.id?.includes('astroPropagatedAssets') || log.message.includes('astroPropagatedAssets'))
          ) return;
          defaultHandler(level, log);
        },
      },
    },
    plugins: [
      basicSsl(),
      tailwindcss(),
      Icons({
        compiler: 'astro',
      }),
    ],
  },
  adapter: cloudflare({
    imageService: 'compile',
  }),
});
