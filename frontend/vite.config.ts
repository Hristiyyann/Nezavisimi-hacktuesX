import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        assets: '/src/assets',
        components: '/src/components',
        contexts: '/src/contexts',
        hooks: '/src/hooks',
        types: '/src/types',
        pages: '/src/pages',
        styles: '/src/styles',
        utils: '/src/utils',
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          relativeUrls: true,
          javascriptEnabled: true,
        },
      },
    },
})
