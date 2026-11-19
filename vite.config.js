import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: la app se publica en https://alejo234506.github.io/cuenta_bancaria/
export default defineConfig({
  base: '/cuenta_bancaria/',
  plugins: [react()],
});
