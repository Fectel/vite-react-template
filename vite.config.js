import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target:"https://triumphant-beauty-production.up.railway.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\api/, ''),
      },
      // '/socket.io': {
      //   target:"https://badassmariachi.com",
      //   changeOrigin: true,
        // rewrite: (path) => path.replace(/^\socekt.io/, ''),
      // }
    },
    // hmr: {
    //   host: "https://triumphant-beauty-production.up.railway.app/webhook",
    //   protocol: "wss",
    // },
  },
  plugins: [react()],
})
