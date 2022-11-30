import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'mask-icon-512.png',
        'mask-icon-192.png',
      ],
      manifest: {
        name: 'Bouldering Tracker',
        short_name: 'BoulderTrack',
        description: 'My Personal Bouldering Tracker',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'mask-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'mask-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    }),
  ],
  base: "./",
  build: {
    outDir: "./docs"
  },
})
