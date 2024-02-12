import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import { Crypto } from "@peculiar/webcrypto"
import path from "path"

const crypto = new Crypto()

export default defineConfig({
  plugins: [
    nodePolyfills(),
    TanStackRouterVite(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
