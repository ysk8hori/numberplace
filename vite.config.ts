import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
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
      includeAssets: ['*.png'],
      // devOptions: {
      //   enabled: true,
      //   /* other options */
      // },
    }),
  ],
});
