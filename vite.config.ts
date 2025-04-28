import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// No componentTagger here

export default defineConfig({
  base: './',  // <-- correct for Vercel
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), // only react plugin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
