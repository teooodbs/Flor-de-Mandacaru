import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Flor-de-Mandacaru/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        contato: 'contato.html',
      },
    },
  },
});
