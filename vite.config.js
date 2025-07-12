import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Fix for @react-google-maps/api
      external: [
        '@react-google-maps/api',
        'react',
        'react-dom'
      ],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          '@react-google-maps/api': 'ReactGoogleMapsApi'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    // Add this to fix the Google Maps API import
    include: [
      '@react-google-maps/api'
    ]
  }
});