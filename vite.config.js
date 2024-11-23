import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      name: 'CanvasPreset',
      fileName: (format) => `canvas-preset.${format}.js`
    },
    rollupOptions: {
      external: [], // Agrega aquí dependencias externas como "react" o "vue"
      output: {
        globals: {}
      }
    }
  }
});