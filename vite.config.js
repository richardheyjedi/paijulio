import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        principal: resolve(process.cwd(), 'index.html'),
        consulta: resolve(process.cwd(), 'consulta-espiritual/index.html'),
        sobre: resolve(process.cwd(), 'sobre-pai-julio/index.html'),
        trabalhos: resolve(process.cwd(), 'trabalhos-espirituais/index.html'),
        depoimentos: resolve(process.cwd(), 'depoimentos/index.html'),
        perguntas: resolve(process.cwd(), 'perguntas-frequentes/index.html'),
      },
    },
  },
});
