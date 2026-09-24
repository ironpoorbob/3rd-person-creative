// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import typography from '@tailwindcss/typography';
import Icons from 'unplugin-icons/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://3dinterior.mail-nearmelab.workers.dev/', // Add this line
  integrations: [mdx()],
  vite: {
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