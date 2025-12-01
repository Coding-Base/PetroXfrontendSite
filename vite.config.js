// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      // ensure these important runtime deps are NOT treated as external for browser bundles
      // keep this empty or list only server-only externals if you must.
      external: []
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  // Force Vite to pre-bundle these modules so Rollup/Vite can resolve them properly at build time.
  // This usually fixes the "failed to resolve import 'react-redux'" error on Render/Vite builds.
  optimizeDeps: {
    include: [
      'react-redux',
      '@reduxjs/toolkit',
      'redux',
      'axios'
    ]
  },

  // If your build environment (or SSR mode) tries to externalize node_modules,
  // tell Vite not to externalize these packages so they are bundled for the client.
  ssr: {
    noExternal: [
      'react-redux',
      '@reduxjs/toolkit',
      'redux',
      'axios'
    ]
  }
});
