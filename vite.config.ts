import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// BASE_PATH lets GitHub Pages serve the site from /<repo-name>/.
// The deploy workflow sets it automatically; locally it defaults to '/'.
export default defineConfig(({ mode }) => ({
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    // `npm run build:single` inlines everything into one index.html (handy for sharing a preview).
    ...(mode === 'single' ? [viteSingleFile()] : []),
  ],
}));
