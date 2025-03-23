import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs/promises';

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
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
        const imageBannerContent = await fs.readFile('assets/images/og-banner.png');
        const imagePreviewContent = await fs.readFile('assets/images/og-preview.png');
        const imageThumbContent = await fs.readFile('assets/images/og-thumb.png');
        this.emitFile({
          type: 'asset',
          fileName: 'assets/og-banner.png',
          source: imageBannerContent
        });
        this.emitFile({
          type: 'asset',
          fileName: 'assets/og-preview.png',
          source: imagePreviewContent
        });
        this.emitFile({
          type: 'asset',
          fileName: 'assets/og-thumb.png',
          source: imageThumbContent
        });
      }
    }
  ]
}); 