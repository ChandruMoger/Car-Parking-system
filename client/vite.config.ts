import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from "vite-plugin-environment"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all")],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: './setupFiles.js'
  }
})
