import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs/promises';

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 100 * 1024,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          'smooth-scroll': ['./src/js/main.js']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 9000,
    open: true
  },
  plugins: [
    {
      name: 'copy-og-image',
      enforce: 'post',
      async generateBundle() {
        const imageCoverContent = await fs.readFile('assets/images/og-cover.png');
        const imageThumbnailContent = await fs.readFile('assets/images/og-thumbnail.png');
        this.emitFile({
          type: 'asset',
          fileName: 'assets/og-cover.png',
          source: imageCoverContent
        });
        this.emitFile({
          type: 'asset',
          fileName: 'assets/og-thumbnail.png',
          source: imageThumbnailContent
        });
      }
    }
  ]
}); 