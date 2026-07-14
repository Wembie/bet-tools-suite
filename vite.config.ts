import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readFileSync } from 'fs'

const appVersion = readFileSync('./VERSION', 'utf-8').trim()

export default defineConfig({
  plugins: [react()],
  base: '/bet-recovery-calculator/',
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-dom') || (id.includes('react') && !id.includes('recharts') && !id.includes('react-hook-form'))) return 'vendor'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('recharts') || id.includes('d3-') || id.includes('victory-')) return 'charts'
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) return 'forms'
          if (id.includes('@radix-ui')) return 'radix'
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/utils/**', 'src/hooks/**'],
      thresholds: {
        global: {
          lines: 90,
          functions: 90,
          branches: 90,
          statements: 90,
        },
      },
    },
  },
})
