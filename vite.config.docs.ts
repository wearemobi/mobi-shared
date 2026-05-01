import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Vite config for building the interactive docs/example as a static site.
 * Used by Cloudflare Pages (or any static host).
 *
 * Build command: npm run build:docs
 * Output: docs-dist/
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  root: 'example',
  base: '/',
  build: {
    outDir: '../docs-dist',
    emptyOutDir: true,
  },
});
