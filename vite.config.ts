import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/send-discord-webhook': {
        target: 'https://pqgphylharoznvxvfcwz.supabase.co/functions/v1/send-discord-webhook',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/send-discord-webhook/, ''),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
