import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { compression } from 'vite-plugin-compression2';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Gzip & Brotli Compression for production assets
    compression({
      algorithms: ['gzip', 'brotliCompress'],
      threshold: 1024,
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
  ],
  build: {
    target: 'esnext',
    cssMinify: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
              return 'vendor-vercel';
            }
            if (id.includes('react-google-recaptcha') || id.includes('@emailjs')) {
              return 'vendor-contact-utils';
            }
            return 'vendor-others';
          }
        },
      },
    },
  },
});
