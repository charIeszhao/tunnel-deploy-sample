import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: '[hash:base64:5]_[local]',
    },
  },
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: '/src/',
      },
    ],
  },
});
