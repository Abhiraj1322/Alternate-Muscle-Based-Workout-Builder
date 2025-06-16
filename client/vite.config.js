import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // SVGR options
      svgrOptions: {
        icon: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // Disable plugins that remove useful attributes
                  removeViewBox: false,
                  removeUnknownsAndDefaults: false,
                  convertShapeToPath: false,
                  mergePaths: false,
                  cleanupIDs: false
                }
              }
            }
          ]
        }
      }
    }),
    tailwindcss(),
  ],
})