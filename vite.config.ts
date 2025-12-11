import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  logLevel: mode === "development" ? "error" : "info",
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    VitePWA({
      disable: true,
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'logo-hd.png', 'robots.txt', 'offline.html'],
      manifest: {
        name: 'CessionBTP - Cession d\'entreprises BTP',
        short_name: 'CessionBTP',
        description: 'Plateforme n°1 pour acheter et vendre des entreprises du BTP en France',
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        categories: ['business', 'productivity'],
        lang: 'fr',
        icons: [
          {
            src: '/favicon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/logo-hd.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        navigateFallback: '/',
        navigateFallbackDenylist: [/^\/api\//, /^\/auth\//],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/xfxfblhxdlzivowodpeg\.supabase\.co\/rest\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api-rest',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 5 * 60
              },
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/xfxfblhxdlzivowodpeg\.supabase\.co\/functions\/.*/i,
            handler: 'NetworkOnly',
            options: {
              cacheName: 'supabase-functions'
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 7
              }
            }
          },
          {
            urlPattern: /\.html$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-pages',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          }
        ],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      devOptions: {
        enabled: false
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Production optimizations
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core vendor - toujours chargé
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/')) {
            return 'vendor-core';
          }
          
          // Supabase - chargé à la demande
          if (id.includes('@supabase/')) {
            return 'vendor-supabase';
          }
          
          // UI Components (Radix) - chargé avec les pages
          if (id.includes('@radix-ui/')) {
            return 'vendor-ui';
          }
          
          // Charts & visualizations
          if (id.includes('recharts') || id.includes('d3-')) {
            return 'vendor-charts';
          }
          
          // Animation libraries
          if (id.includes('framer-motion')) {
            return 'vendor-animation';
          }
          
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform/') || id.includes('zod')) {
            return 'vendor-forms';
          }
          
          // Map libraries (heavy)
          if (id.includes('leaflet') || id.includes('react-leaflet')) {
            return 'vendor-maps';
          }
          
          // PDF generation (heavy)
          if (id.includes('jspdf') || id.includes('html2canvas')) {
            return 'vendor-pdf';
          }
          
          // Markdown & content
          if (id.includes('react-markdown')) {
            return 'vendor-content';
          }
          
          // TanStack Query
          if (id.includes('@tanstack/')) {
            return 'vendor-query';
          }
          
          // Pages SEO (lazy loaded)
          if (id.includes('/pages/seo/') || id.includes('/pages/secteur/')) {
            return 'pages-seo';
          }
          
          // Pages Admin (lazy loaded)
          if (id.includes('/pages/admin/')) {
            return 'pages-admin';
          }
          
          // Pages Dashboard (lazy loaded)
          if (id.includes('/pages/dashboard/') || id.includes('Dashboard')) {
            return 'pages-dashboard';
          }
          
          // Blog pages
          if (id.includes('/pages/blog/')) {
            return 'pages-blog';
          }
        },
      },
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
    sourcemap: mode !== "production",
    // Target modern browsers for smaller bundle
    target: 'es2020',
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
}));
