import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    preview: {
        port: 5173,
        strictPort: true,
    },
    resolve: {
        alias: {
            assets: "/src/assets",
            data: "/src/data",
            components: "/src/components",
            constants: "/src/constants",
            hooks: "/src/hooks",
            pages: "/src/pages",
            services: "/src/services",
            store: "/src/store",
            types: "/src/types",
            utils: "/src/utils",
            motion: "/src/motion",
            interfaces: "/src/interfaces",
        },
    },
    server: {
        port: 5173,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:5173",
    },
});
