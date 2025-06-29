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
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
<<<<<<< HEAD
=======
        manualChunks: {
          // Garder React ensemble pour éviter les problèmes de contexte
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-accordion', '@radix-ui/react-avatar', '@radix-ui/react-collapsible'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-icons': ['lucide-react', 'react-icons'],
          'vendor-swr': ['swr']
        }
>>>>>>> 34d132e (fix: Correction bordure noire sur cartes chasseurs - Remplacement LazyImage par img normale pour background)
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
