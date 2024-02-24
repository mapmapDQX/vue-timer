import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA(
      {
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        manifest: {
          name: "トリニティ・タイマー",
          short_name: "trinity-timer",
          description: "トリニティ専用タイマー",
          icons: [
            {
              src: "mapmap_dot_Ash1.png",
              type: "image/png",
              sizes: "192x192"
            }
          ],
          start_url: "index.html",
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#000000",
          lang: "ja"
        }
      }
    )
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
