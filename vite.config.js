import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss  from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
  // base: '/react',
  base: './r',
  plugins: [react(), tailwindcss()], 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // server: {
  //   host: "admin.localhost",
  //   port: 5173,
  // }
})
