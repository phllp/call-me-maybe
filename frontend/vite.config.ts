import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: path.resolve(__dirname, './certs/localhost-key.pem'),
      cert: path.resolve(__dirname, './certs/localhost-cert.pem'),
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/presentation/pages'),
      '@components': path.resolve(__dirname, './src/presentation/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
      '@external': path.resolve(__dirname, './src/external'),
      '@store': path.resolve(__dirname, './src/store'),
      '@core': path.resolve(__dirname, './src/core'),
    },
  },
});
