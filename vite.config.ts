import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import viteCompression from 'vite-plugin-compression'

import manifest from './manifest.json'

export default defineConfig({
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    VitePWA({
      manifest,
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
      // switch to 'true' to enable sw on development
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
      },
    }),
    viteCompression({
      algorithm: 'brotliCompress',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
    modules: {
      generateScopedName: '[folder]_[local]__[hash:base64:5]',
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@configs', replacement: '/src/configs' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@enums', replacement: '/src/enums' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@store', replacement: '/src/store' },
      { find: '@services', replacement: '/src/services' },
      { find: '@components', replacement: '/src/components' },
      { find: '@views', replacement: '/src/views' },
      { find: '@images', replacement: '/src/assets/images' },
      { find: '@styles', replacement: '/src/assets/styles' },
    ],
  },
})
