import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import path from "path"
// import juno from "@junobuild/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills(),
    // juno(),
    TanStackRouterVite(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  }
})
