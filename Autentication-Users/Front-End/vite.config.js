import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite o acesso de fora do container
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // Use localhost para desenvolvimento local
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    }
  }
})
