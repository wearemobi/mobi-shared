import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  },
  build: {
    outDir: 'dist-embed',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/embed-loader.tsx'),
      name: 'MobiEdge',
      formats: ['iife'], // IIFE is best for direct <script> tag inclusion
      fileName: () => 'mobi-embed.js',
    },
    rollupOptions: {
      // In this build, we DO NOT externalize react/react-dom
      // We want them bundled inside the output file
      output: {
        extend: true,
        // Ensure styles are bundled or at least predictable
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'mobi-embed.css';
          return assetInfo.name;
        },
      },
    },
  },
});
