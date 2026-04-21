import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname),
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 3000,
    cors: true,
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy': "frame-ancestors *"
    }
  },
  build: {
    outDir: resolve(__dirname, '../../dist/live'),
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@sb': resolve(__dirname, '../../node_modules/@seguros-bolivar/ui-bundle/dist')
    }
  }
});
