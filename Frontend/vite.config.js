import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';


// https://vite.dev/config/
export default defineConfig({
  base: '/Lexora/', 
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['pdfjs-dist'], 
  },
  build: {
    rollupOptions: {
      external: ['pdfjs-dist'], 
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  },
  server:{
    host:true,
    port:5173,


  }
})
