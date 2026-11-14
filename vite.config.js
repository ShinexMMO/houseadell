import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Serve /impressum and /datenschutz locally the same way Vercel does (cleanUrls).
const cleanUrls = () => {
  const rewrite = (req, _res, next) => {
    const path = req.url.split('?')[0];
    if (path === '/impressum' || path === '/datenschutz') req.url = path + '.html';
    next();
  };
  return {
    name: 'clean-urls',
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
};

export default defineConfig({
  plugins: [react(), cleanUrls()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        impressum: resolve(import.meta.dirname, 'impressum.html'),
        datenschutz: resolve(import.meta.dirname, 'datenschutz.html'),
      },
    },
  },
});
