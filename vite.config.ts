import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@types": "/src/types",
    },
  },
  server: {
    port: 3000,
  },
});
