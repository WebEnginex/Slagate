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
  },  plugins: [
    react(),
    mode === 'development' && !process.env.DISABLE_TAGGER && componentTagger(),
    ViteSitemap({
      hostname: 'https://slagate.fr', // Ton domaine
      generateRobotsTxt: false, // On désactive la génération automatique de robots.txt
    }),
    // Plugin personnalisé pour copier robots.txt après le build
    {
      name: 'copy-robots-txt',
      closeBundle() {
        const source = path.resolve(__dirname, 'public/robots.txt');
        const destinationDir = path.resolve(__dirname, 'dist');
        const destination = path.join(destinationDir, 'robots.txt');

        // Vérifie que le dossier dist existe, sinon le crée
        if (!fs.existsSync(destinationDir)) {
          fs.mkdirSync(destinationDir, { recursive: true });
        }

        // Si robots.txt n'existe pas dans public, il est créé automatiquement
        if (!fs.existsSync(source)) {
          console.warn('⚠️ robots.txt introuvable dans public/. Un fichier par défaut sera créé.');
          fs.writeFileSync(source, 'User-agent: *\nDisallow:', 'utf8');
        }

        // Copie robots.txt de public vers dist
        fs.copyFileSync(source, destination);
        console.log('✅ robots.txt copié avec succès dans dist/');
      }
    }
  ].filter(Boolean),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, // Désactiver les sourcemaps en production pour réduire la taille
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: (id) => {
          // Vendor chunks pour les bibliothèques principales
          if (id.includes('node_modules')) {
            if (id.includes('react') && !id.includes('react-router') && !id.includes('react-icons')) {
              return 'react-vendor';
            }
            if (id.includes('react-router-dom')) {
              return 'router-vendor';
            }
            if (id.includes('@radix-ui') || id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'ui-vendor';
            }
            if (id.includes('@supabase') || id.includes('supabase')) {
              return 'supabase-vendor';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'icons-vendor';
            }
            if (id.includes('swr') || id.includes('use-swr')) {
              return 'swr-vendor';
            }
            if (id.includes('@tanstack') || id.includes('react-query')) {
              return 'query-vendor';
            }
            // Autres vendors
            return 'vendor';
          }
          
          // Pages chunks pour le code splitting par page
          if (id.includes('src/pages/builds_chasseurs/')) {
            return 'builds-page';
          }
          if (id.includes('src/pages/ennio/')) {
            return 'ennio-page';
          }
          if (id.includes('src/pages/bdg/')) {
            return 'bdg-page';
          }
          if (id.includes('src/pages/atelier/')) {
            return 'atelier-page';
          }
          if (id.includes('src/pages/guides/')) {
            return 'guides-page';
          }
          if (id.includes('src/pages/legal/')) {
            return 'legal-page';
          }
          
          // Configs et services
          if (id.includes('src/config/')) {
            return 'config';
          }
          if (id.includes('src/services/')) {
            return 'services';
          }
        }
      },
    },
    // Augmenter la limite pour éviter les warnings sur les chunks volontairement gros
    chunkSizeWarningLimit: 600,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
