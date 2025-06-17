import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite o acesso de fora do container
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://backend:3000',  // Nome do serviço Docker
        changeOrigin: true,
        secure: false
      },
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    }
  }
})
