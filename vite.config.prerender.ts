/**
 * Vite config for prerendering SEO pages
 * Usage: vite build --config vite.config.prerender.ts
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Pages principales à pré-rendre pour le SEO
const PRERENDER_ROUTES = [
  '/',
  '/vendre',
  '/entreprises',
  '/estimer',
  '/tarifs',
  '/blog',
  '/faq',
  '/contact',
  '/mentions-legales',
  '/cgv',
  '/equipe',
  '/success-stories',
  '/matching-ia',
  '/outils-gratuits',
  '/lexique-btp',
  '/entreprises-rge',
  '/ressources',
  '/comment-ca-marche',
  '/secteur/energies-renouvelables',
  '/secteur/photovoltaique',
  '/secteur/panneaux-solaires',
  '/secteur/pompe-a-chaleur',
  '/secteur/isolation-thermique',
  '/secteur/installation-chauffage',
];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
  // SSR config for prerendering
  ssr: {
    noExternal: ['react-helmet-async'],
  },
});
