import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000
  },
  server: {
    port: parseInt(process.env.PORT) || 3000,
    host: '0.0.0.0', // Esto permite que la app sea accesible desde fuera de localhost
  }, 
})
