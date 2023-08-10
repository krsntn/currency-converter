/* eslint-disable no-undef */
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Currency Converter",
        short_name: "CC",
        description: "Currency Converter App",
        theme_color: "#000000",
        icons: [
          {
            src: "src/assets/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "src/assets/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
