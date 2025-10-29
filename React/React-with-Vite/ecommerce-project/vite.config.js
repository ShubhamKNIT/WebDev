import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {  // use proxy server whenever fetch start with /api or /images
      '/api': {
        target: 'http://localhost:3000'
      },
      '/images': {
        target: 'http://localhost:3000'
      },
    }
  }
})
