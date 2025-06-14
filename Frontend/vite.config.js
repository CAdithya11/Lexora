import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';


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
  },
  server:{
    host:'0.0.0.0',
    port:5173,
    https: {
      key: fs.readFileSync('./192.168.1.2-key.pem'),
      cert: fs.readFileSync('./192.168.1.2.pem'),
    }
  }
})
