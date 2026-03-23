import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Kat'nbehhna ghir melli it'fata l-chunk 1000kB (1MB) blast 500kB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Hna kanksemmo l-code l'ajza' sghira (Code Splitting)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Gemini SDK bouhdha f'chunk
            if (id.includes('@google/generative-ai')) {
              return 'gemini-vendor';
            }
            // Framer Motion w Lucide (dial l-icons w l-anims) f'chunk khor
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            // Ay haja khora f'node_modules ghadi t'mshi l'vendor general
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})