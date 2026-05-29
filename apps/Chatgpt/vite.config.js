import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname),
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 3003
  },
  build: {
    outDir: resolve(__dirname, '../../dist/chatgpt'),
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@sb': resolve(__dirname, '../../node_modules/@seguros-bolivar/ui-bundle/dist')
    }
  }
});
