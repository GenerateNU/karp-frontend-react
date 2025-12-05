import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: ["oyster-app-84rij.ondigitalocean.app"]
  },
  preview: {
    host: true,
    port: 3000,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'oyster-app-84rij.ondigitalocean.app',
      '.ondigitalocean.app',
    ],
  },
});
