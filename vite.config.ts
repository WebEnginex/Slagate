import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';
import ViteSitemap from 'vite-plugin-sitemap';
import fs from 'fs';

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    ViteSitemap({
      hostname: 'https://slagate.fr', // Ton domaine
      generateRobotsTxt: false, // On désactive la génération automatique de robots.txt
    }),
    // Plugin personnalisé pour copier robots.txt après le build
    {
      name: 'copy-robots-txt',
      closeBundle() {
        const source = path.resolve(__dirname, 'public/robots.txt');
        const destination = path.resolve(__dirname, 'dist/robots.txt');
        if (fs.existsSync(source)) {
          fs.copyFileSync(source, destination);
          console.log('✅ robots.txt copié avec succès dans dist/');
        } else {
          console.warn('⚠️ robots.txt introuvable dans public/.');
        }
      }
    }
  ].filter(Boolean),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
