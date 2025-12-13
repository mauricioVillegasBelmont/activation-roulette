import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
       registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /.*\.(mp4|webm|avi|mov)/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'video-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: {
                statuses: [200]
              }
            }
          },
          {
            urlPattern: /\.json$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'config-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              }
            }
          },
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'navigation-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              }
            }
          }
        ]
      },
      manifest: {
        "name": "Ruleta de Premios",
        "short_name": "Ruleta",
        "description": "Aplicación de ruleta para premios y desafíos",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#4f46e5",
        "icons": [
          {
            "src": "/vite.svg",
            "sizes": "192x192",
            "type": "image/svg+xml"
          },
          {
            "src": "/vite.svg",
            "sizes": "512x512",
            "type": "image/svg+xml"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      pages: "/src/pages",
      store: "/src/store",
      roulette: "/src/roulette",
      gui: "/src/gui",
      utils: "/src/utils",
      animatedBackground: "/src/animatedBackground",
    }
  }
})
