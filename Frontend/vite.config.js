import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Lexora/', 
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['pdfjs-dist'], // Exclude pdfjs-dist from dependency optimization
  },
  build: {
    rollupOptions: {
      external: ['pdfjs-dist'], // Mark pdfjs-dist as external if not bundling
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  }
})
