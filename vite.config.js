import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/3D-Threejs-Portfolio",
  plugins: [react()],
  server: {
    host: true,
  },
});
