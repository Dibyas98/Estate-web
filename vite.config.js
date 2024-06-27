import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': {
        target: `https://estate-server-33gj.onrender.com/`,
        secure:false
      }

    }
  },
  plugins: [react()],
})
