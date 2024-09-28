import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      // Rollup failed to resolve import "workbox-window" from "/@vite-plugin-pwa/virtual:pwa-register".
      // This is most likely unintended because it can break your application at runtime.
      // If you do want to externalize this module explicitly add it to
      // `build.rollupOptions.external`
      external: ['workbox-window'],
    },
  },
  optimizeDeps: { esbuildOptions: { target: 'esnext' } },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        // https://realfavicongenerator.net/
        // で生成した site.webmanifest をここに転機
        name: 'numberp',
        short_name: 'numberp',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,ttf}'],
      },
    }),
  ],
});
