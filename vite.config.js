import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { quasar } from '@quasar/vite-plugin'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue({
          template: {
            compilerOptions: {
              isCustomElement: (tag) =>
                tag.startsWith("arcgis-") || tag.startsWith("calcite-"),
            },
          },
        }),
  quasar()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
   define: {
    'process.env': {}
  }
})
