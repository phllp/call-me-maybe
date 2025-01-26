import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: process.env.ENV !== 'development' && {
      key: fs.readFileSync(path.resolve(__dirname, './certs/staging-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './certs/staging.pem')),
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
